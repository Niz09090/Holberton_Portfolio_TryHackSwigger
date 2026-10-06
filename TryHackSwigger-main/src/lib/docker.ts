import Docker from 'dockerode';

const docker = new Docker(
  process.platform === 'win32'
    ? { socketPath: '//./pipe/docker_engine' }
    : { socketPath: '/var/run/docker.sock' }
);

const LAB_NETWORK = 'hackforge-labs';
const LAB_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours
const MEMORY_LIMIT = 512 * 1024 * 1024; // 512MB
const CPU_LIMIT = 0.5;

// Pull image only if it doesn't exist locally
async function pullImageIfNeeded(imageName: string): Promise<void> {
  try {
    await docker.getImage(imageName).inspect();
    console.log(`Image ${imageName} already exists locally, skipping pull`);
    return;
  } catch {
    // Image doesn't exist locally, try to pull
    console.log(`Pulling image ${imageName}...`);
    return new Promise((resolve, reject) => {
      docker.pull(imageName, (err: Error | null, stream: NodeJS.ReadableStream) => {
        if (err) return reject(err);
        docker.modem.followProgress(stream, (err: Error | null) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  }
}

export interface ContainerConfig {
  labId: string;
  userId: string;
  dockerImage: string;
  ports: number[];
  terminalEnabled: boolean;
}

export interface ContainerInfo {
  containerId: string;
  ip: string;
  port: number;
  expiresAt: Date;
  terminalPort?: number;
}

export interface ContainerStatus {
  status: 'running' | 'stopped' | 'expired' | 'not_found';
  timeRemaining: number;
  ip: string;
  port: number;
  terminalPort?: number;
}

// Ensure the lab network exists
export async function ensureLabNetwork(): Promise<void> {
  try {
    const networks = await docker.listNetworks();
    const networkExists = networks.some(n => n.Name === LAB_NETWORK);
    
    if (!networkExists) {
      await docker.createNetwork({
        Name: LAB_NETWORK,
        Driver: 'bridge',
        Internal: false,
        CheckDuplicate: true
      });
    }
  } catch (error) {
    console.error('Error ensuring lab network:', error);
    throw new Error('Failed to ensure lab network exists');
  }
}

// Deploy a new container for a lab
export async function deployContainer(config: ContainerConfig): Promise<ContainerInfo> {
  try {
    await ensureLabNetwork();
    
    // Pull the image only if it doesn't exist locally
    await pullImageIfNeeded(config.dockerImage);
    
    // Generate a unique container name
    const containerName = `lab-${config.labId}-${config.userId}-${Date.now()}`;
    
    // Prepare port bindings
    const portBindings: { [key: string]: Array<Record<string, string>> } = {};
    const exposedPorts: { [key: string]: {} } = {};
    
    config.ports.forEach(port => {
      const portKey = `${port}/tcp`;
      exposedPorts[portKey] = {};
      portBindings[portKey] = [{ HostPort: '0' }]; // Let Docker assign a random port
    });
    
    // Add terminal port if enabled
    let terminalPort: number | undefined;
    if (config.terminalEnabled) {
      const terminalPortKey = '7681/tcp';
      exposedPorts[terminalPortKey] = {};
      portBindings[terminalPortKey] = [{ HostPort: '0' }];
    }
    
    // Create and start the container
    const container = await docker.createContainer({
      name: containerName,
      Image: config.dockerImage,
      ExposedPorts: exposedPorts,
      HostConfig: {
        PortBindings: portBindings,
        Memory: MEMORY_LIMIT,
        CpuQuota: CPU_LIMIT * 100000,
        NetworkMode: LAB_NETWORK,
        AutoRemove: false
      },
      Labels: {
        'lab-id': config.labId,
        'user-id': config.userId,
        'expires-at': new Date(Date.now() + LAB_TIMEOUT_MS).toISOString()
      }
    });
    
    await container.start();
    
    // Get container info
    const containerInfo = await container.inspect();
    const networkSettings = containerInfo.NetworkSettings.Networks[LAB_NETWORK];
    
    // Get the mapped ports
    const ports = containerInfo.NetworkSettings.Ports;
    const firstPortKey = `${config.ports[0]}/tcp`;
    const portMapping = ports[firstPortKey]?.[0];
    const hostPort = portMapping ? parseInt(portMapping.HostPort) : config.ports[0];
    
    // Get terminal port if enabled
    let terminalHostPort: number | undefined;
    if (config.terminalEnabled) {
      const terminalPortKey = '7681/tcp';
      const terminalMapping = ports[terminalPortKey]?.[0];
      terminalHostPort = terminalMapping ? parseInt(terminalMapping.HostPort) : undefined;
    }
    
    return {
      containerId: container.id,
      ip: networkSettings?.IPAddress || 'localhost',
      port: hostPort,
      expiresAt: new Date(Date.now() + LAB_TIMEOUT_MS),
      terminalPort: terminalHostPort
    };
  } catch (error) {
    console.error('Error deploying container:', error);
    throw new Error('Failed to deploy container');
  }
}

// Terminate a container
export async function terminateContainer(containerId: string): Promise<boolean> {
  try {
    const container = docker.getContainer(containerId);
    
    // Stop the container
    await container.stop({ t: 10 });
    
    // Remove the container
    await container.remove();
    
    return true;
  } catch (error) {
    console.error('Error terminating container:', error);
    throw new Error('Failed to terminate container');
  }
}

// Get container status
export async function getContainerStatus(containerId: string): Promise<ContainerStatus> {
  try {
    const container = docker.getContainer(containerId);
    const containerInfo = await container.inspect();
    
    const state = containerInfo.State;
    const labels = containerInfo.Config.Labels || {};
    const expiresAt = labels['expires-at'] ? new Date(labels['expires-at']) : new Date(Date.now() + LAB_TIMEOUT_MS);
    
    // Get network info
    const networkSettings = containerInfo.NetworkSettings.Networks[LAB_NETWORK];
    const ip = networkSettings?.IPAddress || 'localhost';
    
    // Get port mappings
    const ports = containerInfo.NetworkSettings.Ports;
    const portKeys = Object.keys(ports);
    const firstPortKey = portKeys.find(key => key !== '7681/tcp') || portKeys[0];
    const portMapping = ports[firstPortKey]?.[0];
    const port = portMapping ? parseInt(portMapping.HostPort) : 80;
    
    // Get terminal port if available
    let terminalPort: number | undefined;
    const terminalMapping = ports['7681/tcp']?.[0];
    if (terminalMapping) {
      terminalPort = parseInt(terminalMapping.HostPort);
    }
    
    // Determine status
    let status: 'running' | 'stopped' | 'expired' | 'not_found';
    const now = new Date();
    
    if (state.Running) {
      if (now > expiresAt) {
        status = 'expired';
      } else {
        status = 'running';
      }
    } else if (state.Status === 'exited') {
      status = 'stopped';
    } else {
      status = 'not_found';
    }
    
    const timeRemaining = Math.max(0, expiresAt.getTime() - now.getTime());
    
    return {
      status,
      timeRemaining,
      ip,
      port,
      terminalPort
    };
  } catch (error) {
    console.error('Error getting container status:', error);
    return {
      status: 'not_found',
      timeRemaining: 0,
      ip: 'localhost',
      port: 0
    };
  }
}

// Reset a container (terminate and deploy fresh)
export async function resetContainer(config: ContainerConfig, oldContainerId: string): Promise<ContainerInfo> {
  try {
    // Terminate old container
    await terminateContainer(oldContainerId);
    
    // Deploy new container
    return await deployContainer(config);
  } catch (error) {
    console.error('Error resetting container:', error);
    throw new Error('Failed to reset container');
  }
}

// Clean up expired containers (should be run periodically)
export async function cleanupExpiredContainers(): Promise<number> {
  try {
    const containers = await docker.listContainers({ all: true });
    let cleaned = 0;
    
    for (const containerInfo of containers) {
      const labels = containerInfo.Labels || {};
      const expiresAt = labels['expires-at'];
      
      if (expiresAt && new Date(expiresAt) < new Date()) {
        const container = docker.getContainer(containerInfo.Id);
        try {
          await container.stop({ t: 5 });
          await container.remove();
          cleaned++;
        } catch (error) {
          console.error(`Error cleaning up container ${containerInfo.Id}:`, error);
        }
      }
    }
    
    return cleaned;
  } catch (error) {
    console.error('Error cleaning up expired containers:', error);
    return 0;
  }
}
