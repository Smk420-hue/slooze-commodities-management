'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user.store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';


export default function LoginForm() {
  const router = useRouter();
  const { login } = useUserStore();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mock/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user in localStorage for demo (since we can't access HTTP-only cookie from client)
      localStorage.setItem('user', JSON.stringify(data.user));
      
      login(data.user);
      router.push(data.user.role === 'MANAGER' ? '/dashboard' : '/products');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'MANAGER' | 'STORE_KEEPER') => {
    setCredentials({
      email: role === 'MANAGER' ? 'manager@slooze.com' : 'storekeeper@slooze.com',
      password: 'demo123',
    });
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleDemoLogin('MANAGER')}
          disabled={isLoading}
          className="flex-1"
        >
          Demo as Manager
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleDemoLogin('STORE_KEEPER')}
          disabled={isLoading}
          className="flex-1"
        >
          Demo as Store Keeper
        </Button>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        <p>Demo credentials:</p>
        <p>manager@slooze.com / demo123</p>
        <p>storekeeper@slooze.com / demo123</p>
      </div>
    </form>
  );
}