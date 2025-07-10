'use server';

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


function getSecretKey(): Uint8Array {
  const secret = process.env.TOKEN;
  if (!secret) throw new Error('Missing TOKEN env variable');
  return new TextEncoder().encode(secret);
}

async function openSessionToken(token: string): Promise<JWTPayload> {
  const secret = getSecretKey();
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function createSessionToken(payload: JWTPayload = {}) {
  const secret = getSecretKey();

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  const { exp } = await openSessionToken(session);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
  });
}

export async function isSessionValid(): Promise<boolean> {
  const CokieStore = await cookies()
  const sessionCookie = CokieStore.get('session');

  if (!sessionCookie) return false;

  try {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const now = Date.now();
    return typeof exp === 'number' && now < exp * 1000;
  } catch {
    return false;
  }
}

export async function deleteSessionToken() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    expires: new Date(0),
    path: '/',
    httpOnly: true,
  });
}
