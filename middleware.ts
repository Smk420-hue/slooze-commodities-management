import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

// Define route permissions (clean, declarative)
const routeConfig = {
  public: ['/', '/login', '/api/mock/auth'],
  managerOnly: ['/dashboard', '/analytics', '/users'],
  bothRoles: ['/products', '/products/add', '/products/edit'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public routes
  if (routeConfig.public.some(route => pathname.startsWith(route))) {
    // Redirect authenticated users away from login
    if (pathname === '/login') {
      const token = request.cookies.get('auth_token')?.value;
      if (token) {
        const payload = await verifyToken(token);
        if (payload) {
          return NextResponse.redirect(
            new URL(payload.role === 'MANAGER' ? '/dashboard' : '/products', request.url)
          );
        }
      }
    }
    return NextResponse.next();
  }

  // 2. Check authentication
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Verify JWT and get role
  const payload = await verifyToken(token);
  
  if (!payload) {
    // Invalid token - clear it and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token');
    return response;
  }

  // 4. Role-based access control
  const isManagerOnly = routeConfig.managerOnly.some(route => pathname.startsWith(route));
  const isBothRoles = routeConfig.bothRoles.some(route => pathname.startsWith(route));

  if (isManagerOnly && payload.role !== 'MANAGER') {
    // Store Keeper trying to access Manager-only route
    return NextResponse.redirect(new URL('/products', request.url));
  }

  if (!isManagerOnly && !isBothRoles && !pathname.startsWith('/api')) {
    // Unknown route - redirect to appropriate dashboard based on role
    return NextResponse.redirect(
      new URL(payload.role === 'MANAGER' ? '/dashboard' : '/products', request.url)
    );
  }

  // 5. Allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};