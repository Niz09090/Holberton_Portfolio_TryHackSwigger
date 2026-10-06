import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/mockData';
import {
  clearFailures,
  findAccountByLogin,
  isLockedOut,
  recordFailure,
  verifyPassword,
} from '@/lib/server/authStore';
import { setSessionCookie } from '@/lib/server/cookies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INVALID = { error: 'Invalid email or password' };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const identifier = String(body.email ?? body.username ?? '').trim();
    const password = String(body.password ?? '');

    if (!identifier || !password) {
      return NextResponse.json(INVALID, { status: 401 });
    }

    const key = identifier.toLowerCase();
    if (isLockedOut(key)) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    // Registered accounts
    const account = findAccountByLogin(identifier);
    if (account) {
      if (!(await verifyPassword(password, account.passwordHash))) {
        recordFailure(key);
        return NextResponse.json(INVALID, { status: 401 });
      }
      clearFailures(key);
      const response = NextResponse.json({ user: account.user });
      setSessionCookie(response, request, account.user.id);
      return response;
    }

    // Built-in demo account
    if (key === currentUser.email.toLowerCase() && password === 'password123') {
      clearFailures(key);
      const response = NextResponse.json({ user: currentUser });
      setSessionCookie(response, request, currentUser.id);
      return response;
    }

    recordFailure(key);
    return NextResponse.json(INVALID, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
