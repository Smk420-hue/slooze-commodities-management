//src/components/layout/Sidebar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserRole, useIsManager } from '@/store/user.store';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle,
  Menu,
  X,
  BarChart3,
  Users
} from 'lucide-react';

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  allowedRoles: string[];
  subItems?: MenuItem[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const userRole = useUserRole() || 'STORE_KEEPER';
  const isUserManager = useIsManager();

  // Define menu items based on roles
  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      allowedRoles: ['MANAGER'],
    },
    {
      label: 'Products',
      href: '/products',
      icon: <Package className="w-5 h-5" />,
      allowedRoles: ['MANAGER', 'STORE_KEEPER'],
      subItems: [
        {
          label: 'All Products',
          href: '/products',
          icon: <Package className="w-4 h-4" />,
          allowedRoles: ['MANAGER', 'STORE_KEEPER'],
        },
        {
          label: 'Add Product',
          href: '/products/add',
          icon: <PlusCircle className="w-4 h-4" />,
          allowedRoles: ['MANAGER', 'STORE_KEEPER'],
        },
      ],
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      allowedRoles: ['MANAGER'],
    },
    {
      label: 'Users',
      href: '/users',
      icon: <Users className="w-5 h-5" />,
      allowedRoles: ['MANAGER'],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item =>
    item.allowedRoles.includes(userRole)
  );

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href === '/products' && pathname.startsWith('/products')) return true;
    if (href === '/analytics' && pathname === '/analytics') return true;
    if (href === '/users' && pathname === '/users') return true;
    return pathname === href;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 lg:top-0 left-0 z-40
          w-64 h-[calc(100vh-4rem)] 
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col p-4 overflow-y-auto">
          {/* User role info */}
          <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Role
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isUserManager
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}
              >
                {userRole.replace('_', ' ')}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {isUserManager ? 'Full access to all features' : 'Product management only'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {filteredMenuItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${isActive(item.href)
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>

                {/* Sub-items - only show when parent is active */}
                {item.subItems && isActive(item.href) && (
                  <div className="ml-10 mt-1 space-y-1">
                    {item.subItems
                      .filter(subItem => subItem.allowedRoles.includes(userRole))
                      .map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors
                            ${pathname === subItem.href
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }
                          `}
                        >
                          {subItem.icon}
                          {subItem.label}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Feature access info */}
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Access Level
            </h4>
            <ul className="space-y-2 text-sm">
              {isUserManager ? (
                <>
                  <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Dashboard Access
                  </li>
                  <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Product Management
                  </li>
                  <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    User Management
                  </li>
                  <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Analytics Access
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    Dashboard Access
                  </li>
                  <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Product Management
                  </li>
                  <li className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    User Management
                  </li>
                  <li className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    Analytics Access
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* App version */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}