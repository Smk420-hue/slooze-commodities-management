//src/components/layout/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800"
        aria-label="Loading theme"
      >
        <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-10 h-10 rounded-lg flex items-center justify-center
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        focus:ring-offset-white dark:focus:ring-offset-gray-900
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Current: ${theme} mode`}
    >
      {/* Sun icon for light mode */}
      <Sun
        className={`
          absolute w-5 h-5 text-yellow-500
          transition-all duration-300 ease-in-out
          ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
        `}
      />
      
      {/* Moon icon for dark mode */}
      <Moon
        className={`
          absolute w-5 h-5 text-blue-400
          transition-all duration-300 ease-in-out
          ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}
        `}
      />
      
      {/* Theme indicator pill */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
        <div className={`
          w-6 h-1 rounded-full
          transition-all duration-300
          ${theme === 'light' 
            ? 'bg-yellow-500/30' 
            : 'bg-blue-500/30'
          }
        `} />
      </div>
    </button>
  );
}
