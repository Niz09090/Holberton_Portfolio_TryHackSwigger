import Docker from 'dockerode';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import * as tar from 'tar-fs';

// Skip Docker initialization during build
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

let docker: Docker | null = null;

if (!isBuildPhase) {
  docker = new Docker(
    process.platform === 'win32'
      ? { socketPath: '//./pipe/docker_engine' }
      : { socketPath: '/var/run/docker.sock' }
  );
  
  // Test Docker connection on startup
  docker?.ping((err) => {
    if (err) {
      console.error('Docker connection failed:', err);
    } else {
      console.log('Docker connection successful');
    }
  });
}

export const LAB_NETWORK = 'tryhackswigger-network';
const LAB_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours

/** True when this Node process is running inside a Docker container. */
export function isRunningInDockerContainer(): boolean {
  try {
    return fs.existsSync('/.dockerenv');
  } catch {
    return false;
  }
}

/**
 * Resolve the host-published port for a container port (default 80).
 * Checks NetworkSettings.Ports first, then Docker Desktop port labels.
 */
export function getMappedHostPort(
  containerDetails: Docker.ContainerInspectInfo,
  containerPort = 80
): number | null {
  const portKey = `${containerPort}/tcp`;
  const hostPort = containerDetails.NetworkSettings?.Ports?.[portKey]?.[0]?.HostPort;
  if (hostPort) {
    return parseInt(hostPort, 10);
  }

  const labelKey = `desktop.docker.io/ports/${containerPort}/tcp`;
  const labelValue = containerDetails.Config?.Labels?.[labelKey];
  if (labelValue) {
    const match = labelValue.match(/:(\d+)$/);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return null;
}

/**
 * Build the base URL for proxying to a lab container.
 * Uses localhost + mapped host port when running on the host; uses the
 * container's bridge-network IP when this app runs inside Docker.
 */
export function getLabProxyBaseUrl(
  containerDetails: Docker.ContainerInspectInfo,
  containerPort = 80
): string | null {
  if (isRunningInDockerContainer()) {
    const containerIP =
      containerDetails.NetworkSettings?.Networks?.[LAB_NETWORK]?.IPAddress;
    if (containerIP) {
      return `http://${containerIP}:${containerPort}`;
    }
  }

  const hostPort = getMappedHostPort(containerDetails, containerPort);
  if (hostPort) {
    return `http://localhost:${hostPort}`;
  }

  return null;
}
const MEMORY_LIMIT = 512 * 1024 * 1024; // 512MB
const CPU_LIMIT = 0.5;

// Lab ID to Dockerfile path mapping (using /app/docker inside container)
// Lab IDs from mockData.ts:
// 1: SQL Injection → sqli-basic
// 2: XSS → xss-reflected
// 3: CSRF → csrf-bypass
// 4: SSRF → ssrf-basic
// 5: XXE → xxe-injection
// 6: IDOR → idor-basic
// 7: JWT → jwt-bypass
// 8: Privilege Escalation → privesc-linux
// 9: File Upload → file-upload
// 10: Command Injection → cmd-injection
// 11: LFI → lfi-basic
// 12: Buffer Overflow → bof-basic
const LAB_DOCKERFILE_MAP: { [key: string]: string } = {
  '1': '/app/docker/sqli-basic',
  '2': '/app/docker/xss-reflected',
  '3': '/app/docker/csrf-bypass',
  '4': '/app/docker/ssrf-basic',
  '5': '/app/docker/xxe-injection',
  '6': '/app/docker/idor-basic',
  '7': '/app/docker/jwt-bypass',
  '8': '/app/docker/privesc-linux',
  '9': '/app/docker/file-upload',
  '10': '/app/docker/cmd-injection',
  '11': '/app/docker/lfi-basic',
  '12': '/app/docker/bof-basic'
};

// Build image from local Dockerfile if it doesn't exist
async function buildImageIfNeeded(labId: string, dockerImage: string, labType?: 'RED_TEAM' | 'BLUE_TEAM'): Promise<string> {
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

  // BLUE_TEAM labs reuse existing images, skip Dockerfile lookup
  if (labType === 'BLUE_TEAM') {
    console.log(`BLUE_TEAM lab, pulling image ${dockerImage} instead of building from Dockerfile`);
    try {
      await docker.pull(dockerImage);
      console.log(`Successfully pulled image ${dockerImage}`);
      return dockerImage;
    } catch (err) {
      console.error('Error pulling image:', err);
      throw new Error(`Failed to pull image ${dockerImage} for BLUE_TEAM lab`);
    }
  }

  const dockerfilePath = LAB_DOCKERFILE_MAP[labId];
  if (!dockerfilePath) {
    throw new Error(`No Dockerfile found for lab ID: ${labId}`);
  }

  const imageName = `tryhackswigger/${dockerfilePath.split('/').pop()}:latest`;
  
  try {
    await docker.getImage(imageName).inspect();
    console.log(`Image ${imageName} already exists locally, skipping build`);
    return imageName;
  } catch (err) {
    console.log(`Building image ${imageName} from ${dockerfilePath}...`);

    if (!fs.existsSync(dockerfilePath)) {
      throw new Error(
        `Build context not found for ${imageName} at ${dockerfilePath}. ` +
        `Make sure the docker/ folder is mounted at /app/docker in the container.`
      );
    }

    const tarStream = tar.pack(dockerfilePath);

    return new Promise((resolve, reject) => {
      docker.buildImage(
        tarStream as unknown as NodeJS.ReadableStream,
        { t: imageName },
        (error: Error | null, stream: NodeJS.ReadableStream | undefined) => {
          if (error) {
            console.error('Error building image:', error);
            return reject(error);
          }
          if (!stream) {
            return reject(new Error('Build stream is undefined'));
          }
          docker.modem.followProgress(
            stream,
            (err: Error | null) => {
              if (err) {
                console.error('Build failed:', err);
                return reject(err);
              }
              console.log(`Successfully built image ${imageName}`);
              resolve(imageName);
            },
            (event: { stream?: string; error?: string }) => {
              if (event.stream) process.stdout.write(event.stream);
              if (event.error) console.error('Build error:', event.error);
            }
          );
        }
      );
    });
  }
}

export interface ContainerConfig {
  labId: string;
  userId: string;
  dockerImage: string;
  ports: number[];
  terminalEnabled: boolean;
  labType?: 'RED_TEAM' | 'BLUE_TEAM';
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
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

  try {
    console.log('Ensuring lab network exists:', LAB_NETWORK);
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
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error('Failed to ensure lab network exists');
  }
}

// Deploy a new container for a lab
export async function deployContainer(config: ContainerConfig): Promise<ContainerInfo> {
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

  try {
    console.log('Deploying container for lab:', config.labId);
    await ensureLabNetwork();
    
    // Build the image from local Dockerfile if it doesn't exist
    const imageName = await buildImageIfNeeded(config.labId, config.dockerImage, config.labType);
    
    // Generate a unique container name
    const containerName = `lab-${config.labId}-${config.userId}-${Date.now()}`;
    
    // Prepare port bindings - expose to host with random port
    const portBindings: { [key: string]: Array<Record<string, string>> } = {};
    const exposedPorts: { [key: string]: {} } = {};
    
    // Generate random port between 30000-35000
    const randomPort = Math.floor(Math.random() * (35000 - 30000 + 1)) + 30000;
    
    config.ports.forEach(port => {
      const portKey = `${port}/tcp`;
      exposedPorts[portKey] = {};
      portBindings[portKey] = [{ HostPort: randomPort.toString() }];
    });
    
    // Add terminal port if enabled
    let terminalHostPort: number | undefined;
    if (config.terminalEnabled) {
      const terminalPortKey = '7681/tcp';
      exposedPorts[terminalPortKey] = {};
      const terminalRandomPort = Math.floor(Math.random() * (35000 - 30000 + 1)) + 30000;
      portBindings[terminalPortKey] = [{ HostPort: terminalRandomPort.toString() }];
      terminalHostPort = terminalRandomPort;
    }
    
    // Create and start the container
    const container = await docker.createContainer({
      name: containerName,
      Image: imageName,
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
        'expires-at': new Date(Date.now() + LAB_TIMEOUT_MS).toISOString(),
        'lab-type': config.labType || 'RED_TEAM'
      },
      Env: config.labType === 'BLUE_TEAM' ? [
        'LAB_TYPE=BLUE_TEAM',
        'SEED_MALICIOUS_LOGS=true'
      ] : []
    });
    
    await container.start();

    // Seed malicious logs for BLUE_TEAM labs
    if (config.labType === 'BLUE_TEAM') {
      await seedMaliciousLogs(container.id);
    }
    
    // Get container info
    const containerInfo = await container.inspect();
    
    // Get the container's internal IP on the Docker network
    const networkSettings = containerInfo.NetworkSettings.Networks[LAB_NETWORK];
    const containerIP = networkSettings?.IPAddress || 'unknown';
    
    // Get the mapped host port
    const ports = containerInfo.NetworkSettings.Ports;
    const firstPortKey = `${config.ports[0]}/tcp`;
    const portMapping = ports[firstPortKey]?.[0];
    const hostPort = portMapping ? parseInt(portMapping.HostPort) : randomPort;
    
    // Get terminal port if enabled
    let terminalPort: number | undefined;
    if (config.terminalEnabled && terminalHostPort) {
      terminalPort = terminalHostPort;
    }
    
    return {
      containerId: container.id,
      ip: containerIP,
      port: hostPort,
      expiresAt: new Date(Date.now() + LAB_TIMEOUT_MS),
      terminalPort
    };
  } catch (error) {
    console.error('Error deploying container:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error('Failed to deploy container');
  }
}

// Terminate a container
export async function terminateContainer(containerId: string): Promise<boolean> {
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

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
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

  try {
    const container = docker.getContainer(containerId);
    const containerInfo = await container.inspect();
    
    const state = containerInfo.State;
    const labels = containerInfo.Config.Labels || {};
    const expiresAt = labels['expires-at'] ? new Date(labels['expires-at']) : new Date(Date.now() + LAB_TIMEOUT_MS);
    
    // Get network info - use container's internal IP on Docker network
    const networkSettings = containerInfo.NetworkSettings.Networks[LAB_NETWORK];
    const ip = networkSettings?.IPAddress || 'unknown';
    
    // Get host port from port mappings
    const ports = containerInfo.NetworkSettings.Ports;
    const portKeys = Object.keys(ports).filter(k => k !== '7681/tcp');
    const firstPortKey = portKeys[0];
    const portMapping = ports[firstPortKey]?.[0];
    const port = portMapping ? parseInt(portMapping.HostPort) : 0;
    
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
    console.log('Resetting container for lab:', config.labId);
    // Terminate old container
    await terminateContainer(oldContainerId);
    
    // Deploy new container
    return await deployContainer(config);
  } catch (error) {
    console.error('Error resetting container:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error('Failed to reset container');
  }
}

// Clean up expired containers (should be run periodically)
export async function cleanupExpiredContainers(): Promise<number> {
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

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

// Seed malicious logs for BLUE_TEAM labs
async function seedMaliciousLogs(containerId: string): Promise<void> {
  if (!docker) {
    throw new Error('Docker is not available during build phase');
  }

  try {
    const container = docker.getContainer(containerId);
    
    // Generate realistic malicious log entries simulating SQL injection attacks
    const maliciousLogs = [
      // Normal traffic
      '192.168.1.50 - - [10/Jan/2024:14:30:25 +0000] "GET / HTTP/1.1" 200 1234 "-" "Mozilla/5.0"',
      '192.168.1.50 - - [10/Jan/2024:14:30:26 +0000] "GET /about HTTP/1.1" 200 567 "-" "Mozilla/5.0"',
      // Attacker reconnaissance
      '192.168.1.100 - - [10/Jan/2024:14:35:10 +0000] "GET /login HTTP/1.1" 200 890 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:35:15 +0000] "GET /search?q=test HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      // SQL injection attempts
      '192.168.1.100 - - [10/Jan/2024:14:36:22 +0000] "GET /search?q=test\' OR \'1\'=\'1 HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:36:25 +0000] "GET /search?q=test\' UNION SELECT NULL,NULL,NULL-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:36:30 +0000] "GET /search?q=test\' UNION SELECT username,password FROM users-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:36:35 +0000] "GET /search?q=test\' OR 1=1-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:36:40 +0000] "GET /search?q=test\'; DROP TABLE users-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      // More normal traffic
      '192.168.1.75 - - [10/Jan/2024:14:40:00 +0000] "GET /products HTTP/1.1" 200 2345 "-" "Mozilla/5.0"',
      '192.168.1.75 - - [10/Jan/2024:14:40:05 +0000] "GET /contact HTTP/1.1" 200 789 "-" "Mozilla/5.0"',
      // Attacker continues
      '192.168.1.100 - - [10/Jan/2024:14:42:15 +0000] "GET /search?q=test\' UNION SELECT 1,2,3,4-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:42:20 +0000] "GET /search?q=test\' UNION SELECT column_name FROM information_schema.columns-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
      '192.168.1.100 - - [10/Jan/2024:14:42:25 +0000] "GET /search?q=test\' AND 1=1-- HTTP/1.1" 200 456 "-" "Mozilla/5.0"',
    ];
    
    const logContent = maliciousLogs.join('\n') + '\n';
    
    // Append logs to /var/log/nginx/access.log inside the container
    const exec = await container.exec({
      Cmd: ['sh', '-c', `echo '${logContent}' >> /var/log/nginx/access.log`],
      AttachStdout: true,
      AttachStderr: true,
    });
    
    await exec.start({ hijack: false, stdin: false });
    
    console.log('Successfully seeded malicious logs for BLUE_TEAM container:', containerId);
  } catch (error) {
    console.error('Error seeding malicious logs:', error);
    // Don't throw - allow container to start even if log seeding fails
  }
}
