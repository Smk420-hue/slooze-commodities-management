import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import  ApolloProvider  from '@/lib/apollo/client';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Slooze Commodities Management',
  description: 'Role-based commodities management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ApolloProvider>
            <div className="min-h-screen bg-background text-foreground">
              {children}
            </div>
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}