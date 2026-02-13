'use client';

import { create } from 'zustand';
import { User } from '@/types/auth';
import { decodeToken } from '@/lib/auth/jwt';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  
  // Actions
  login: (user: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,

  login: (user) => {
    set({ user, isLoading: false });
  },

  logout: async () => {
    await fetch('/api/mock/auth/logout', { method: 'POST' });
    set({ user: null, isLoading: false });
  },

  setUser: (user) => set({ user }),
  
  setLoading: (loading) => set({ isLoading: loading }),

  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Check if we have a token via cookie
      const response = await fetch('/api/mock/auth');
      
      if (response.ok) {
        // For demo, we need to decode the JWT to get user info
        // In production, you'd have a /me endpoint
        // Since we're using HTTP-only cookies, we can't access the token directly
        // Let's create a /me endpoint or store user in localStorage temporarily for demo
        
        // TEMP FIX FOR DEMO: Check localStorage for user data
        // In production, replace this with a proper /me endpoint
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          set({ user, isLoading: false });
        } else {
          set({ user: null, isLoading: false });
        }
      } else {
        localStorage.removeItem('user');
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      localStorage.removeItem('user');
      set({ user: null, isLoading: false });
    }
  },
}));

// Custom hooks
export const useCurrentUser = () => useUserStore((state) => state.user);
export const useUserRole = () => useUserStore((state) => state.user?.role);
export const useAuthLoading = () => useUserStore((state) => state.isLoading);
export const useIsManager = () => useUserStore((state) => state.user?.role === 'MANAGER');
export const useIsStoreKeeper = () => useUserStore((state) => state.user?.role === 'STORE_KEEPER');