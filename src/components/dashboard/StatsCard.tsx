//src/components/dashboard/StatsCard.tsx
'use client';

import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  color: string;
  description?: string;
  isLoading?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  color,
  description,
  isLoading = false,
}: StatsCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700">
      <div className="flex items-start justify-between gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
            {title}
          </p>
          
          {isLoading ? (
            <div className="mt-1 sm:mt-2">
              <div className="h-6 sm:h-8 w-16 sm:w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              <div className="h-3 sm:h-4 w-20 sm:w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1 sm:mt-2"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col xs:flex-row xs:items-baseline gap-1 xs:gap-2 mt-1 sm:mt-2">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {value}
                </p>
                <span
                  className={`
                    inline-flex items-center gap-0.5 sm:gap-1 
                    px-1.5 sm:px-2 py-0.5 sm:py-1 
                    rounded-full text-xs sm:text-sm font-medium
                    w-fit
                    ${isPositive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }
                  `}
                >
                  <span className="text-[10px] sm:text-xs">{isPositive ? '↑' : '↓'}</span>
                  <span className="truncate max-w-[60px] sm:max-w-none">{change}</span>
                </span>
              </div>
              
              {description && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 truncate">
                  {description}
                </p>
              )}
            </>
          )}
        </div>
        
        {/* Icon - Responsive sizing */}
        <div className={`
          ${color} 
          w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 
          rounded-lg sm:rounded-xl 
          flex items-center justify-center 
          text-white flex-shrink-0
          shadow-sm
        `}>
          <div className="scale-75 sm:scale-90 lg:scale-100">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Progress bar - Hidden on mobile, shown on tablet+ */}
      {!isLoading && (
        <div className="hidden sm:block mt-4 lg:mt-6">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{isPositive ? 'Increased' : 'Decreased'}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 lg:h-2">
            <div
              className={`h-1.5 lg:h-2 rounded-full transition-all duration-500 ${
                isPositive ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: isPositive ? '75%' : '40%' }}
            ></div>
          </div>
        </div>
      )}

      {/* Mobile mini progress indicator */}
      {!isLoading && (
        <div className="sm:hidden mt-3">
          <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1">
            <span>30d trend</span>
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {isPositive ? '↑' : '↓'} {change}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1">
            <div
              className={`h-1 rounded-full ${
                isPositive ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: isPositive ? '75%' : '40%' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}