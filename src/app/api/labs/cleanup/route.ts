import { NextRequest, NextResponse } from 'next/server';
import Docker from 'dockerode';

export const dynamic = 'force-dynamic';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export async function POST(request: NextRequest) {
  try {
    console.log('Cleaning up all lab containers...');

    // List all containers
    const containers = await docker.listContainers({ all: true });
    
    let removedCount = 0;
    
    for (const container of containers) {
      const containerName = container.Names[0]?.replace(/^\//, '');
      const labels = container.Labels || {};
      
      // Check if this is a lab container (has lab-id label or name starts with lab-)
      if (labels['lab-id'] || (containerName && containerName.startsWith('lab-'))) {
        console.log('Removing container:', containerName);
        const containerObj = docker.getContainer(container.Id);
        
        try {
          // Stop the container if it's running
          if (container.State === 'running') {
            await containerObj.stop();
          }
          // Remove the container
          await containerObj.remove();
          removedCount++;
        } catch (error) {
          console.error('Error removing container:', containerName, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${removedCount} lab containers`
    });
  } catch (error) {
    console.error('Error during cleanup:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup lab containers' },
      { status: 500 }
    );
  }
}
