import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/mockData';
import { SESSION_COOKIE, readSessionToken, updateUserById } from '@/lib/server/authStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest) {
  const userId = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!userId) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  // The demo account is read-only on the server; its changes stay in the browser
  if (userId === currentUser.id) {
    return NextResponse.json({ user: currentUser });
  }

  const patch = await request.json().catch(() => null);
  if (!patch || typeof patch !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const user = await updateUserById(userId, patch);
  if (!user) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 });
  }
  return NextResponse.json({ user });
}
