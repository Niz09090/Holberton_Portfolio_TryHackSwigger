import { NextRequest, NextResponse } from 'next/server';
import Docker from 'dockerode';

const docker = new Docker({
  socketPath: process.platform === 'win32' ? '//./pipe/docker_engine' : '/var/run/docker.sock'
});

// In-memory mapping of labId to containerId (in production, use a database)
const labContainerMap = new Map<string, string>();

export async function POST(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  try {
    const { labId } = params;
    const body = await request.json();
    const { containerId } = body;

    if (!containerId) {
      return NextResponse.json(
        { error: 'containerId is required' },
        { status: 400 }
      );
    }

    // Store the mapping
    labContainerMap.set(labId, containerId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing lab-container mapping:', error);
    return NextResponse.json(
      { error: 'Failed to store mapping' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  try {
    const { labId } = params;
    const containerId = labContainerMap.get(labId);

    if (!containerId) {
      return NextResponse.json(
        { error: 'No active container found for this lab' },
        { status: 404 }
      );
    }

    // Get container info to find the mapped host port
    const container = docker.getContainer(containerId);
    const containerInfo = await container.inspect();

    // Extract the mapped host port from NetworkSettings.Ports
    const ports = containerInfo.NetworkSettings.Ports;
    const portKeys = Object.keys(ports);
    
    // Find the first non-terminal port (terminal is usually 7681)
    const firstPortKey = portKeys.find(key => key !== '7681/tcp') || portKeys[0];
    
    if (!firstPortKey) {
      return NextResponse.json(
        { error: 'No exposed ports found on container' },
        { status: 500 }
      );
    }

    const portMapping = ports[firstPortKey]?.[0];
    const hostPort = portMapping?.HostPort;

    if (!hostPort) {
      return NextResponse.json(
        { error: 'Host port not mapped' },
        { status: 500 }
      );
    }

    // Get the path from the request
    const url = new URL(request.url);
    const path = url.pathname.replace(`/api/lab-proxy/${labId}`, '') || '/';
    const searchParams = url.search;

    // Construct the target URL using localhost and the mapped host port
    const targetUrl = `http://localhost:${hostPort}${path}${searchParams}`;

    // Proxy the request to the container
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        host: `localhost:${hostPort}`,
      },
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined,
    });

    // Return the response
    const responseData = await response.text();
    
    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error proxying request:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
