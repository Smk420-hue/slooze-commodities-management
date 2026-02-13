//src/lib/auth/auth.ts

import { LoginCredentials, User, AuthResponse } from '@/types/auth';
import { useUserStore } from '@/store/user.store';

// Mock login function
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await new Promise(resolve => setTimeout(resolve, 500));

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
  
  if (!user || credentials.password !== 'demo123') {
    throw new Error('Invalid credentials');
  }

  const token = `mock-jwt-token-${user.id}-${Date.now()}`;
  
  // Use Zustand store
  useUserStore.getState().login(user);

  return { user, token };
}

// Logout function
export async function logout(): Promise<void> {
  await fetch('/api/mock/auth/logout', { method: 'POST' });
  useUserStore.getState().logout();
}

// Get current user
export function getCurrentUser(): User | null {
  return useUserStore.getState().user;
}
