import { NextRequest, NextResponse } from 'next/server';
import { terminateContainer } from '@/lib/docker';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { containerId } = body;

    if (!containerId) {
      return NextResponse.json(
        { error: 'Missing required field: containerId' },
        { status: 400 }
      );
    }

    const success = await terminateContainer(containerId);

    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error terminating container:', error);
    return NextResponse.json(
      { error: 'Failed to terminate container' },
      { status: 500 }
    );
  }
}
