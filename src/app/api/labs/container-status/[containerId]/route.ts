import { NextRequest, NextResponse } from 'next/server';
import { getContainerStatus } from '@/lib/docker';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { containerId: string } }
) {
  try {
    const { containerId } = params;

    if (!containerId) {
      return NextResponse.json(
        { error: 'Missing containerId' },
        { status: 400 }
      );
    }

    // Handle BLUE_TEAM labs without Docker calls
    if (containerId.startsWith('blue-')) {
      return NextResponse.json({
        status: 'running',
        timeRemaining: 1000 * 60 * 60 * 4,
        ip: 'localhost',
        port: 0,
        isBlueTeam: true
      });
    }

    const status = await getContainerStatus(containerId);

    return NextResponse.json(status);
  } catch (error) {
    console.error('Error getting container status:', error);
    return NextResponse.json(
      { error: 'Failed to get container status' },
      { status: 500 }
    );
  }
}
