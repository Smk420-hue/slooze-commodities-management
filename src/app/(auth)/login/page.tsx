import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import slozicon from "../../../assets/slozicon.png";
import NextImage from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-gray-200 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="  rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"><NextImage 
        src={slozicon} 
        alt="Sloz Icon" 
        width={65} 
        height={65} 
      /></span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your Slooze Commodities account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>Demo Accounts:</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <p className="font-medium">Manager</p>
                  <p>manager@slooze.com</p>
                  <p>password: demo123</p>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <p className="font-medium">Store Keeper</p>
                  <p>storekeeper@slooze.com</p>
                  <p>password: demo123</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{' '}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}