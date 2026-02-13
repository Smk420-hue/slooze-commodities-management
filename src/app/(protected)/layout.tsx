//src/app/(protected)/layout.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore, useCurrentUser, useUserRole, useAuthLoading } from '@/store/user.store';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Loader2 } from 'lucide-react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const user = useCurrentUser();
  const userRole = useUserRole();
  const isLoading = useAuthLoading();
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!user) {
        router.push('/login');
        return;
      }

      // Role-based route protection
      if (pathname.startsWith('/dashboard') && userRole !== 'MANAGER') {
        router.push('/products');
        return;
      }

      if (pathname.startsWith('/analytics') && userRole !== 'MANAGER') {
        router.push('/products');
        return;
      }

      if (pathname.startsWith('/users') && userRole !== 'MANAGER') {
        router.push('/products');
        return;
      }
    }
  }, [user, userRole, isLoading, pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated - don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  // Authenticated - render protected layout
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}