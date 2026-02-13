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

// Role-based access control rules
export const ROLE_PERMISSIONS = {
  [ROLES.MANAGER]: {
    canAccessDashboard: true,
    canViewProducts: true,
    canAddEditProducts: true,
    canManageUsers: true,
  },
  [ROLES.STORE_KEEPER]: {
    canAccessDashboard: false,
    canViewProducts: true,
    canAddEditProducts: true,
    canManageUsers: false,
  },
} as const;