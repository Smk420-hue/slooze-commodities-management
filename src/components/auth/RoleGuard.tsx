'use client';

import { ReactNode } from 'react';
import { useUserRole } from '@/store/user.store';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

export default function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const userRole = useUserRole();
  
  // If no user role (not logged in), show fallback
  if (!userRole) {
    return fallback || (
      <div className="p-4 text-center">
        <p className="text-red-600 dark:text-red-400">Unauthorized: Please log in</p>
      </div>
    );
  }

  // Check if user role is in allowed roles
  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    return fallback || (
      <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium">Access Denied</p>
            <p className="text-sm mt-1">
              You need <span className="font-semibold">{allowedRoles.join(' or ')}</span> role to access this content.
              Your role: <span className="font-semibold">{userRole}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function ManagerOnly({ children, fallback }: Omit<RoleGuardProps, 'allowedRoles'>) {
  return (
    <RoleGuard allowedRoles={['MANAGER']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function StoreKeeperOnly({ children, fallback }: Omit<RoleGuardProps, 'allowedRoles'>) {
  return (
    <RoleGuard allowedRoles={['STORE_KEEPER']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function ManagerOrStoreKeeper({ children, fallback }: Omit<RoleGuardProps, 'allowedRoles'>) {
  return (
    <RoleGuard allowedRoles={['MANAGER', 'STORE_KEEPER']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}