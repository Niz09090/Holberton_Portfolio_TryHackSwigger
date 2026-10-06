import { NextRequest, NextResponse } from 'next/server';
import Docker from 'dockerode';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { mockLabs } from '@/lib/mockData';
import { LabTeamType } from '@/lib/types';

const docker = new Docker(
  os.platform() === 'win32'
    ? { socketPath: '//./pipe/docker_engine' }
    : { socketPath: '/var/run/docker.sock' }
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const labId = params.id;
    console.log('Download logs request for lab ID:', labId);

    // Check if this is a BLUE_TEAM lab
    const lab = mockLabs.find(l => l.id === labId);
    if (lab?.type === LabTeamType.BLUE_TEAM) {
      const logFilePath = path.join(process.cwd(), 'public', 'logs', `${labId}.log`);

      if (!fs.existsSync(logFilePath)) {
        console.log('Log file not found for BLUE_TEAM lab:', labId);
        return NextResponse.json(
          { error: 'Log file not found for this lab' },
          { status: 404 }
        );
      }

      const logContent = fs.readFileSync(logFilePath, 'utf-8');

      return new NextResponse(logContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="incident-${labId}.log"`,
          'Content-Length': logContent.length.toString(),
        },
      });
    }

    // Find the container by name pattern
    const containers = await docker.listContainers({ all: true });
    
    const containerInfo = containers.find(c => 
      c.Names[0]?.includes(`lab-${labId}-`) && 
      c.State === 'running'
    );

    if (!containerInfo) {
      console.log('Container not found for labId:', labId);
      return NextResponse.json(
        { error: 'Lab container not found or not running' },
        { status: 404 }
      );
    }

    console.log('Found container:', containerInfo.Names[0]);
    
    const container = docker.getContainer(containerInfo.Id);

    // Get the access.log file from the container
    const stream = await container.getArchive({
      path: '/var/log/nginx/access.log'
    });

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const logBuffer = Buffer.concat(chunks);

    // Return the log file as a download
    return new NextResponse(logBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="access-log-${labId}-${Date.now()}.log"`,
        'Content-Length': logBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error downloading logs:', error);
    return NextResponse.json(
      { error: 'Failed to download logs from container' },
      { status: 500 }
    );
  }
}
