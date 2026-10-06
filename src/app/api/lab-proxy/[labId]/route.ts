import { NextRequest, NextResponse } from 'next/server';
import Docker from 'dockerode';
import os from 'os';
import { getLabProxyBaseUrl } from '@/lib/docker';

export const dynamic = 'force-dynamic';

const docker = new Docker(
  os.platform() === 'win32'
    ? { socketPath: '//./pipe/docker_engine' }
    : { socketPath: '/var/run/docker.sock' }
);

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 5, delay = 1000): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('ECONNREFUSED') || err.message.includes('fetch failed')) {
        if (i < maxRetries - 1) {
          console.log(`Fetch failed (attempt ${i + 1}/${maxRetries}), retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}


export async function GET(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  return handleProxy(request, params.labId, []);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  return handleProxy(request, params.labId, []);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  return handleProxy(request, params.labId, []);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  return handleProxy(request, params.labId, []);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  return handleProxy(request, params.labId, []);
}

async function handleProxy(
  request: NextRequest,
  labId: string,
  path: string[]
) {
  try {
    console.log('=== Proxy Request ===');
    console.log('labId received:', labId);
    console.log('path:', path);
    console.log('full URL:', request.url);
    
    // Find the container by name pattern
    const containers = await docker.listContainers({ all: true });
    console.log('Total containers:', containers.length);
    
    // Log all container names and labels for debugging
    console.log('All running containers:');
    containers.forEach(c => {
      console.log(`  - Name: ${c.Names[0]}, Labels: ${JSON.stringify(c.Labels)}, State: ${c.State}`);
    });
    
    // Find container by name pattern "lab-{labId}-"
    const containerInfo = containers.find(c => 
      c.Names[0]?.includes(`lab-${labId}-`) && 
      c.State === 'running'
    );

    if (!containerInfo) {
      console.log('Container not found for labId:', labId);
      console.log('Looking for name pattern: lab-${labId}-');
      return NextResponse.json(
        { error: 'Lab container not found or not running' },
        { status: 404 }
      );
    }

    console.log('Found container:', containerInfo.Names[0], 'ID:', containerInfo.Id.substring(0, 12));
    
    const container = docker.getContainer(containerInfo.Id);
    const containerDetails = await container.inspect();

    const proxyBaseUrl = getLabProxyBaseUrl(containerDetails);
    if (!proxyBaseUrl) {
      console.log('No proxy target available for container');
      return NextResponse.json(
        { error: 'No host port mapping found for lab container' },
        { status: 500 }
      );
    }

    console.log('Proxy base URL:', proxyBaseUrl);

    const pathString = path.length > 0 ? `/${path.join('/')}` : '/';
    const targetUrl = `${proxyBaseUrl}${pathString}${request.nextUrl.search}`;

    console.log('Proxying to:', targetUrl);

    const proxyHost = new URL(proxyBaseUrl).host;

    const response = await fetchWithRetry(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        host: proxyHost,
        'Accept-Encoding': 'identity',
      },
      body: request.body,
      // @ts-ignore
      duplex: 'half',
    });

    console.log('Response status:', response.status);
    
    // Return the response
    const responseBody = await response.arrayBuffer();
    
    // Filter out problematic headers
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding' && 
          key.toLowerCase() !== 'transfer-encoding' &&
          key.toLowerCase() !== 'content-length') {
        responseHeaders.set(key, value);
      }
    });
    
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        ...Object.fromEntries(responseHeaders.entries()),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { error: 'Failed to proxy request to lab container' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}
