import { NextRequest, NextResponse } from 'next/server';
import { resetContainer } from '@/lib/docker';
import { mockLabs } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { containerId, labId, userId } = body;

    if (!containerId || !labId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: containerId, labId, and userId' },
        { status: 400 }
      );
    }

    // Find the lab
    const lab = mockLabs.find(l => l.id === labId);
    if (!lab) {
      return NextResponse.json(
        { error: 'Lab not found' },
        { status: 404 }
      );
    }

    // Reset the container
    const containerInfo = await resetContainer({
      labId,
      userId,
      dockerImage: lab.dockerImage,
      ports: lab.ports,
      terminalEnabled: lab.terminalEnabled
    }, containerId);

    return NextResponse.json({
      containerId: containerInfo.containerId,
      ip: containerInfo.ip,
      port: containerInfo.port,
      expiresAt: containerInfo.expiresAt,
      terminalPort: containerInfo.terminalPort
    });
  } catch (error) {
    console.error('Error resetting container:', error);
    return NextResponse.json(
      { error: 'Failed to reset container' },
      { status: 500 }
    );
  }
}
