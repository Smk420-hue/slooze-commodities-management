//src/lib/auth/roles.ts

export const ROLES = {
  MANAGER: 'MANAGER',
  STORE_KEEPER: 'STORE_KEEPER',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// Helper function to check if user has a specific role
export function hasRole(userRole: Role, requiredRole: Role): boolean {
  return userRole === requiredRole;
}

// Helper to check if user has manager role
export function isManager(role: Role): boolean {
  return role === ROLES.MANAGER;
}

// Helper to check if user has store keeper role
export function isStoreKeeper(role: Role): boolean {
  return role === ROLES.STORE_KEEPER;
}

// Helper to check if user has any of the allowed roles
export function hasAnyRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

// Helper to get all roles
export function getAllRoles(): Role[] {
  return Object.values(ROLES);
}

// Role-based access control rules
export const ROLE_PERMISSIONS = {
  [ROLES.MANAGER]: {
    canAccessDashboard: true,
    canViewProducts: true,
    canAddEditProducts: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canExportData: true,
    canDeleteProducts: true,
  },
  [ROLES.STORE_KEEPER]: {
    canAccessDashboard: false,
    canViewProducts: true,
    canAddEditProducts: true,
    canManageUsers: false,
    canViewAnalytics: false,
    canExportData: false,
    canDeleteProducts: false,
  },
} as const;

// Type for permissions
export type Permissions = typeof ROLE_PERMISSIONS[Role];

// Helper to check if role has specific permission
export function hasPermission(role: Role, permission: keyof Permissions): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.[permission] ?? false;
}

// Role display names for UI
export const ROLE_DISPLAY_NAMES: Record<Role, string> = {
  [ROLES.MANAGER]: 'Manager',
  [ROLES.STORE_KEEPER]: 'Store Keeper',
};

// Role descriptions
export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [ROLES.MANAGER]: 'Full access to all features including dashboard, analytics, and user management',
  [ROLES.STORE_KEEPER]: 'Can manage products and inventory, no access to dashboard or user management',
};

// Role badge colors (Tailwind classes)
export const ROLE_BADGE_COLORS: Record<Role, string> = {
  [ROLES.MANAGER]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [ROLES.STORE_KEEPER]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

// Role icon names (for use with lucide-react)
export const ROLE_ICONS: Record<Role, string> = {
  [ROLES.MANAGER]: 'UserCog',
  [ROLES.STORE_KEEPER]: 'Package',
};

// Check if role can access a specific route
export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  '/dashboard': [ROLES.MANAGER],
  '/analytics': [ROLES.MANAGER],
  '/users': [ROLES.MANAGER],
  '/products': [ROLES.MANAGER, ROLES.STORE_KEEPER],
  '/products/add': [ROLES.MANAGER, ROLES.STORE_KEEPER],
  '/products/edit': [ROLES.MANAGER, ROLES.STORE_KEEPER],
};

// Helper to check if role can access route
export function canAccessRoute(role: Role, pathname: string): boolean {
  // Check exact matches
  if (ROUTE_PERMISSIONS[pathname]) {
    return ROUTE_PERMISSIONS[pathname].includes(role);
  }
  
  // Check pattern matches (for dynamic routes)
  if (pathname.startsWith('/products/edit/')) {
    return ROUTE_PERMISSIONS['/products/edit'].includes(role);
  }
  
  // Default to false for unknown routes
  return false;
}
