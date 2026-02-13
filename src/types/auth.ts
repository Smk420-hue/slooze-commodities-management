//src/types/auth.ts
import { Role } from '@/lib/auth/roles';

export interface User {
  id: string;
  email: string;
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
  user: User;
  token: string;
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginError {
  message: string;
  code?: string;
}