import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/mockData';
import {
  AccountError,
  createAccount,
  hashPassword,
} from '@/lib/server/authStore';
import { setSessionCookie } from '@/lib/server/cookies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const USERNAME_RE = /^[A-Za-z0-9_-]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = String(body.username ?? '').trim();
    const email = String(body.email ?? '').trim();
    const password = String(body.password ?? '');

    if (!USERNAME_RE.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-20 characters: letters, numbers, _ or -' },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }
    if (password.length < 6 || password.length > 200) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await createAccount(username, email, passwordHash, {
      email: currentUser.email,
      username: currentUser.username,
    });

    const response = NextResponse.json({ user });
    setSessionCookie(response, request, user.id);
    return response;
  } catch (error) {
    if (error instanceof AccountError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
