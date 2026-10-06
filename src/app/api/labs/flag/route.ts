import { NextRequest, NextResponse } from 'next/server';
import { mockLabs } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { labId, flag, userId } = body;

    if (!labId || !flag) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Check if the flag is correct
    const submittedFlag = flag.trim();
    const correctFlag = lab.flag.trim();
    
    console.log('Flag submission:', {
      labId,
      submitted: submittedFlag,
      expected: correctFlag,
      match: submittedFlag === correctFlag
    });

    if (submittedFlag === correctFlag) {
      // Award points and mark as completed
      return NextResponse.json({
        correct: true,
        points: lab.points,
        message: `Correct! You earned ${lab.points} points`
      });
    } else if (submittedFlag.toLowerCase() === correctFlag.toLowerCase()) {
      // Case-insensitive fallback
      console.log('Flag matched with case-insensitive comparison');
      return NextResponse.json({
        correct: true,
        points: lab.points,
        message: `Correct! You earned ${lab.points} points`
      });
    } else {
      return NextResponse.json({
        correct: false,
        message: 'Incorrect flag. Try again!'
      });
    }
  } catch (error) {
    console.error('Flag submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
