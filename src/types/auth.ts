//src/types/auth.ts
import { Role } from '@/lib/auth/roles';

export type { Role };

export interface User {
  id: string;
  email: string;
  password?: string; // Optional since we don't want to send it to client
  name: string;
  role: Role;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface AuthSession {
  user: Omit<User, 'password'> | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginError {
  message: string;
  code?: string;
}
