import { NextRequest, NextResponse } from 'next/server';
import Docker from 'dockerode';
import os from 'os';
import { getLabProxyBaseUrl, getMappedHostPort } from '@/lib/docker';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const docker = new Docker(
  os.platform() === 'win32'
    ? { socketPath: '//./pipe/docker_engine' }
    : { socketPath: '/var/run/docker.sock' }
);

/**
 * Internal helper for src/middleware.ts: tells it whether a lab is terminal-only
 * (ttyd on 7681, no web service on 80) and where that terminal can be reached
 * from this server. Only answers requests that come from this machine itself.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { labId: string } }
) {
  const host = (request.headers.get('host') || '').replace(/:\d+$/, '');
  const fromLoopback =
    (host === '127.0.0.1' || host === 'localhost') &&
    !request.headers.get('x-forwarded-for') &&
    !request.headers.get('x-forwarded-host') &&
    request.headers.get('x-internal-lab-proxy') === '1';

  if (!fromLoopback) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const labId = params.labId;
    const containers = await docker.listContainers({ all: false });
    const containerInfo = containers.find(
      c => c.Names[0]?.includes(`lab-${labId}-`) && c.State === 'running'
    );
    if (!containerInfo) {
      return NextResponse.json({ kind: 'none' });
    }

    const details = await docker.getContainer(containerInfo.Id).inspect();
    const webPort = getMappedHostPort(details, 80);
    const terminalPort = getMappedHostPort(details, 7681);

    if (!webPort && terminalPort) {
      const target = getLabProxyBaseUrl(details, 7681);
      if (target) {
        return NextResponse.json({ kind: 'terminal', target });
      }
    }

    return NextResponse.json({ kind: 'web' });
  } catch (error) {
    console.error('proxy-target error:', error);
    return NextResponse.json({ kind: 'none' });
  }
}
