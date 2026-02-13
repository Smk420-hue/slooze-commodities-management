'use client';

import { useUserStore, useCurrentUser, useUserRole } from '@/store/user.store';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Package, LayoutDashboard } from 'lucide-react';
import { LogOut, User, Menu, X } from 'lucide-react';
import slozicon from "../../assets/slozicon.png";
import NextImage from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const user = useCurrentUser();
  const userRole = useUserRole();
  const logout = useUserStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'MANAGER':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'STORE_KEEPER':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4 h-16 flex items-center justify-between">
        {/* Left section - Logo & Brand */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Logo */}
            <div className="rounded-lg flex items-center justify-center">
              <NextImage 
                src={slozicon} 
                alt="Sloz Icon" 
                width={36} 
                height={36}
                className="sm:w-[45px] sm:h-[45px] w-8 h-8"
              />
            </div>
            
            {/* Brand name - hidden on smallest screens */}
            <h1 className="text-base sm:text-xl font-bold tracking-tight hidden xs:inline">
              Slooze
            </h1>
            <span className="text-xs sm:text-base font-bold tracking-tight text-gray-600 dark:text-gray-400 hidden xs:inline">
              Commodities
            </span>
            
            {/* Role badge - hidden on mobile, shown on tablet+ */}
            {userRole && (
              <span className={`hidden md:inline text-xs px-2 py-1 rounded-full font-medium ${getRoleBadgeColor(userRole)}`}>
                {userRole.replace('_', ' ')}
              </span>
            )}
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* User info - hidden on mobile, shown on desktop */}
          {user && (
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium max-w-[120px] truncate">{user.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole?.replace('_', ' ')}
                </span>
              </div>
            </div>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Logout button - icon only on mobile, with text on tablet+ */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Mobile menu toggle - only shown when needed */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-in">
          <div className="container mx-auto px-4 py-4">
            {/* User info for mobile */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleBadgeColor(userRole || '')}`}>
                    {userRole?.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-2">
              <Link 
                href="/products" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package className="w-4 h-4" />
                <span>Products</span>
              </Link>
              {userRole === 'MANAGER' && (
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom breakpoint for extra small devices */}
      <style jsx>{`
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }
        @media (max-width: 479px) {
          .xs\\:inline {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}


