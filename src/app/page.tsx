//src/app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore, useCurrentUser, useAuthLoading } from '@/store/user.store';
import { Loader2 } from 'lucide-react';
import slozicon from "../assets/slozicon.png";
import NextImage from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const user = useCurrentUser();
  const isLoading = useAuthLoading();
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.role === 'MANAGER') {
          router.push('/dashboard');
        } else {
          router.push('/products');
        }
      } else {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16  rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-white font-bold text-2xl"><NextImage 
        src={slozicon} 
        alt="Sloz Icon" 
        width={45} 
        height={45} 
      /></span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Slooze Commodities Management
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}