import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/mockData';
import { SESSION_COOKIE, findUserById, readSessionToken } from '@/lib/server/authStore';
import { clearSessionCookie } from '@/lib/server/cookies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const userId = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!userId) {
    return NextResponse.json({ user: null });
  }

  const user = userId === currentUser.id ? currentUser : findUserById(userId);
  if (!user) {
    // Session for an account that no longer exists
    const response = NextResponse.json({ user: null });
    clearSessionCookie(response);
    return response;
  }

  return NextResponse.json({ user });
}
