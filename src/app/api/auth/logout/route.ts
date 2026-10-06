import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/server/cookies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
