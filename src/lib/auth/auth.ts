//src/lib/auth/auth.ts

import { LoginCredentials, User, AuthResponse } from '@/types/auth';
import { setSession, clearSession, getSession } from './session';

// Mock login function
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock authentication
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'manager@slooze.com',
      name: 'John Manager',
      role: 'MANAGER',
    },
    {
      id: '2',
      email: 'storekeeper@slooze.com',
      name: 'Jane StoreKeeper',
      role: 'STORE_KEEPER',
    },
  ];

  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Mock password check (in real app, this would be server-side)
  const validPassword = credentials.password === 'demo123';
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  const authResponse: AuthResponse = { user, token };

  // Store session
  setSession(user, token);

  return authResponse;
}

// Logout function
export function logout(): void {
  clearSession();
}

// Check authentication status
export function checkAuth(): boolean {
  const session = getSession();
  return !!session.token && !!session.user;
}

// Get current user
export function getCurrentUser(): User | null {
  const session = getSession();
  return session.user;
}

// Mock function to refresh token
export async function refreshToken(): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const session = getSession();
  
  if (!session.token) {
    throw new Error('No token to refresh');
  }

  const newToken = `mock-jwt-token-refreshed-${Date.now()}`;
  return newToken;
}

// Mock function to validate token
export async function validateToken(token: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return token.startsWith('mock-jwt-token');
}