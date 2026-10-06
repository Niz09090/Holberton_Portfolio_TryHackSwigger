import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { User } from '@/lib/types';

// Server-side account storage. Accounts live in DATA_DIR/users.json (a Docker volume
// in production), so they work from any browser or PC that reaches this server.

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SECRET_FILE = path.join(DATA_DIR, 'auth-secret');

export const SESSION_COOKIE = 'tryhackswigger_session';
export const SESSION_MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days

export interface StoredAccount {
  user: User;
  passwordHash: string; // "salt:key" (hex), scrypt
}

// ---------- tiny file lock + atomic write ----------

let queue: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T> | T): Promise<T> {
  const run = queue.then(() => fn());
  queue = run.catch(() => undefined);
  return run;
}

function readAccounts(): StoredAccount[] {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')) as StoredAccount[];
  } catch (err) {
    console.error('Failed to read users file:', err);
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${USERS_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(accounts, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, USERS_FILE);
}

// ---------- password hashing (scrypt) ----------

function scrypt(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password, salt);
  return `${salt.toString('hex')}:${key.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, keyHex] = stored.split(':');
  if (!saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, 'hex');
  const actual = await scrypt(password, Buffer.from(saltHex, 'hex'));
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

// ---------- signed session tokens ----------

let cachedSecret: string | null = null;
function getSecret(): string {
  if (cachedSecret) return cachedSecret;
  if (process.env.AUTH_SECRET) {
    cachedSecret = process.env.AUTH_SECRET;
    return cachedSecret;
  }
  // No AUTH_SECRET set: generate one once and keep it in the data dir
  try {
    if (fs.existsSync(SECRET_FILE)) {
      cachedSecret = fs.readFileSync(SECRET_FILE, 'utf8').trim();
    } else {
      cachedSecret = crypto.randomBytes(48).toString('hex');
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(SECRET_FILE, cachedSecret, { mode: 0o600 });
    }
  } catch {
    cachedSecret = crypto.randomBytes(48).toString('hex'); // sessions reset on restart
  }
  return cachedSecret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createSessionToken(userId: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_S;
  const payload = Buffer.from(`${userId}|${exp}`).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const [userId, exp] = Buffer.from(payload, 'base64url').toString().split('|');
  if (!userId || !exp || Number(exp) < Date.now() / 1000) return null;
  return userId;
}

// ---------- login throttling (in memory) ----------

const failures = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 8;

export function isLockedOut(key: string): boolean {
  const entry = failures.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

export function recordFailure(key: string) {
  const entry = failures.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    failures.set(key, { count: 1, first: Date.now() });
  } else {
    entry.count += 1;
  }
}

export function clearFailures(key: string) {
  failures.delete(key);
}

// ---------- accounts ----------

export function findAccountByLogin(identifier: string): StoredAccount | undefined {
  const id = identifier.trim().toLowerCase();
  return readAccounts().find(
    a => a.user.email.toLowerCase() === id || a.user.username.toLowerCase() === id
  );
}

export function findUserById(id: string): User | undefined {
  return readAccounts().find(a => a.user.id === id)?.user;
}

export class AccountError extends Error {}

export function createAccount(
  username: string,
  email: string,
  passwordHash: string,
  reserved: { email: string; username: string }
): Promise<User> {
  return withLock(() => {
    const accounts = readAccounts();
    const emailKey = email.toLowerCase();
    const usernameKey = username.toLowerCase();

    if (emailKey === reserved.email.toLowerCase() || accounts.some(a => a.user.email.toLowerCase() === emailKey)) {
      throw new AccountError('An account with this email already exists');
    }
    if (usernameKey === reserved.username.toLowerCase() || accounts.some(a => a.user.username.toLowerCase() === usernameKey)) {
      throw new AccountError('This username is already taken');
    }

    // Fresh account: everything starts at zero, no mock data
    const user = {
      id: `${Date.now()}${crypto.randomInt(100, 999)}`,
      username,
      displayName: username,
      email,
      rank: 'Newbie',
      points: 0,
      level: 0,
      xp: 0,
      xpToNextLevel: 100,
      streak: 0,
      joinDate: new Date().toISOString(),
      country: '',
      isVip: false,
      badges: { earned: [], locked: [] },
    } as unknown as User;

    writeAccounts([...accounts, { user, passwordHash }]);
    return user;
  });
}

// Fields a signed-in user may change about themselves
const UPDATABLE_FIELDS = [
  'displayName', 'bio', 'country', 'avatar',
  'points', 'level', 'xp', 'xpToNextLevel', 'streak', 'rank', 'badges',
] as const;

export function updateUserById(id: string, patch: Partial<User>): Promise<User | null> {
  return withLock(() => {
    const accounts = readAccounts();
    const index = accounts.findIndex(a => a.user.id === id);
    if (index === -1) return null;

    const safePatch: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (field in patch) safePatch[field] = (patch as Record<string, unknown>)[field];
    }
    accounts[index] = { ...accounts[index], user: { ...accounts[index].user, ...safePatch } as User };
    writeAccounts(accounts);
    return accounts[index].user;
  });
}
