import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth/jwt';
import { User, Role } from '@/types/auth';

// Mock user database with proper typing
const mockUsers: User[] = [
  {
    id: '1',
    email: 'manager@slooze.com',
    password: 'demo123',
    name: 'John Manager',
    role: 'MANAGER' as Role,
  },
  {
    id: '2',
    email: 'storekeeper@slooze.com',
    password: 'demo123',
    name: 'Jane StoreKeeper',
    role: 'STORE_KEEPER' as Role,
  },
  {
    id: '3',
    email: 'admin@slooze.com',
    password: 'demo123',
    name: 'Admin User',
    role: 'MANAGER' as Role,
  },
];

export async function POST(request: NextRequest) {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create user without password for response
    const { password: _, ...userWithoutPassword } = user;
    
    // Sign JWT token
    const token = await signToken(user);

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful',
    });

    // Set HTTP-only cookie with JWT
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for session validation
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Just return success if cookie exists
    return NextResponse.json({ 
      valid: true,
      message: 'Session active' 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
