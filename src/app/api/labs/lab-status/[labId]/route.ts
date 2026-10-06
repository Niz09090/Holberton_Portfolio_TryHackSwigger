import { NextRequest, NextResponse } from 'next/server';
import Docker from 'dockerode';
import os from 'os';
import { mockLabs } from '@/lib/mockData';
import { LabTeamType } from '@/lib/types';

export const dynamic = 'force-dynamic';

const docker = new Docker(
  os.platform() === 'win32'
    ? { socketPath: '//./pipe/docker_engine' }
    : { socketPath: '/var/run/docker.sock' }
);

const LAB_NETWORK = 'tryhackswigger-network';
const LAB_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours

export async function GET(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  try {
    const { labId } = params;

    if (!labId) {
      return NextResponse.json(
        { error: 'Missing labId' },
        { status: 400 }
      );
    }

    // Check if this is a BLUE_TEAM lab
    const lab = mockLabs.find(l => l.id === labId);
    if (lab?.type === LabTeamType.BLUE_TEAM) {
      return NextResponse.json({
        running: true,
        containerId: `blue-${labId}`,
        containerIP: 'localhost',
        timeRemaining: 1000 * 60 * 60 * 4,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
        isBlueTeam: true
      });
    }

    // Find running container by lab ID label
    const containers = await docker.listContainers({ all: true });
    const containerInfo = containers.find(c => 
      c.Labels['lab-id'] === labId && 
      c.State === 'running'
    );

    if (!containerInfo) {
      return NextResponse.json({ running: false });
    }

    const container = docker.getContainer(containerInfo.Id);
    const containerDetails = await container.inspect();
    
    // Get the container's internal IP on the Docker network
    const networkSettings = containerDetails.NetworkSettings.Networks[LAB_NETWORK];
    const containerIP = networkSettings?.IPAddress || 'unknown';
    
    // Get expires-at label
    const labels = containerDetails.Config.Labels || {};
    const expiresAt = labels['expires-at'] ? new Date(labels['expires-at']) : new Date(Date.now() + LAB_TIMEOUT_MS);
    
    // Calculate time remaining
    const timeRemaining = Math.max(0, expiresAt.getTime() - Date.now());
    
    // Get the base URL from environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    return NextResponse.json({
      running: true,
      containerId: containerInfo.Id,
      containerIP: containerIP,
      accessUrl: `${baseUrl}/api/lab-proxy/${labId}/`,
      timeRemaining,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error getting lab status:', error);
    return NextResponse.json(
      { error: 'Failed to get lab status' },
      { status: 500 }
    );
  }
}
