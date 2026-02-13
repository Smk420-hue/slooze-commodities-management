'use server';

import { cookies } from 'next/headers';
import { verifyToken, JWTPayload } from './jwt';

export async function getServerSession(): Promise<{
  user: JWTPayload | null;
  isAuthenticated: boolean;
}> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { user: null, isAuthenticated: false };
  }

  const payload = await verifyToken(token);
  
  if (!payload) {
    return { user: null, isAuthenticated: false };
  }

  return {
    user: payload,
    isAuthenticated: true,
  };
}

export async function getServerRole(): Promise<string | null> {
  const session = await getServerSession();
  return session.user?.role || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return session.isAuthenticated;
}

export async function isManager(): Promise<boolean> {
  const session = await getServerSession();
  return session.user?.role === 'MANAGER';
}

export async function hasRole(role: string): Promise<boolean> {
  const session = await getServerSession();
  return session.user?.role === role;
}