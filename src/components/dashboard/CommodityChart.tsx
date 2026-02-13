//src/components/dashboard/CommodityChart.tsx

'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const mockData = {
  wheat: [420, 380, 450, 510, 490, 530, 560],
  corn: [320, 350, 310, 380, 400, 420, 450],
  coffee: [180, 210, 240, 220, 250, 280, 300],
};

export default function CommodityChart() {
  const [selectedCommodity, setSelectedCommodity] = useState<'wheat' | 'corn' | 'coffee'>('wheat');
  const [chartWidth, setChartWidth] = useState(0);
  
  const data = mockData[selectedCommodity];
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const currentValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  const change = ((currentValue - prevValue) / prevValue) * 100;
  const isPositive = change >= 0;

  // Responsive bar width based on screen size
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBarWidth = () => {
    if (chartWidth < 640) return 'w-4 sm:w-6'; // Mobile
    if (chartWidth < 768) return 'w-6 sm:w-8'; // Tablet
    return 'w-8'; // Desktop
  };

  const getCommodityColor = (commodity: string) => {
    switch (commodity) {
      case 'wheat': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'corn': return 'bg-green-500 hover:bg-green-600';
      case 'coffee': return 'bg-amber-900 hover:bg-amber-950';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Chart Controls - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Commodity Selector - Horizontal Scroll on Mobile */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {(['wheat', 'corn', 'coffee'] as const).map((commodity) => (
            <button
              key={commodity}
              onClick={() => setSelectedCommodity(commodity)}
              className={`
                px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium 
                whitespace-nowrap transition-all duration-200
                ${selectedCommodity === commodity
                  ? `${getCommodityColor(commodity)} text-white shadow-md`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {commodity.charAt(0).toUpperCase() + commodity.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Change Indicator - Responsive */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <div className={`
            flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg
            transition-all duration-200
            ${isPositive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }
          `}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
            <span className="text-xs sm:text-sm font-medium">
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Last 7 months
          </span>
        </div>
      </div>

      {/* Chart - Responsive Height */}
      <div className="relative h-48 sm:h-56 md:h-64">
        {/* Y-axis labels - Responsive */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="text-[10px] sm:text-xs">₹{maxValue.toLocaleString()}</span>
          <span className="text-[10px] sm:text-xs">₹{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
          <span className="text-[10px] sm:text-xs">₹{minValue.toLocaleString()}</span>
        </div>

        {/* Chart area - Responsive */}
        <div className="ml-10 sm:ml-12 h-full flex items-end">
          <div className="flex-1 h-full flex items-end justify-around sm:justify-between gap-1 sm:gap-2">
            {data.map((value, index) => {
              const height = (value / maxValue) * 100;
              const isMobile = chartWidth < 640;
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-end h-full flex-1 max-w-[40px] sm:max-w-none"
                >
                  {/* Value label - Hidden on mobile, shown on hover */}
                  <div className="mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                      ₹{value.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Bar - Responsive width */}
                  <div
                    className={`
                      ${isMobile ? 'w-4' : 'w-6 sm:w-8'} 
                      rounded-t-lg transition-all duration-300 
                      ${getCommodityColor(selectedCommodity)}
                      hover:opacity-90 hover:scale-105
                    `}
                    style={{ height: `${Math.max(height * (isMobile ? 0.8 : 1), 4)}%` }}
                  >
                    {/* Tooltip on hover - Mobile friendly */}
                    <div className="relative group">
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          ₹{value.toLocaleString()}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Month label - Responsive */}
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2">
                    {isMobile ? months[index].charAt(0) : months[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid lines - Responsive opacity */}
        <div className="absolute inset-0 ml-10 sm:ml-12 pointer-events-none">
          <div className="h-full border-t border-gray-200 dark:border-gray-700 opacity-50"></div>
          <div className="h-1/2 border-t border-gray-200 dark:border-gray-700 opacity-30"></div>
          <div className="h-1/4 border-t border-gray-200 dark:border-gray-700 opacity-20"></div>
        </div>
      </div>

      {/* Legend - Responsive */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Wheat</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Corn</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-900"></div>
          <span className="text-gray-700 dark:text-gray-300">Coffee</span>
        </div>
      </div>

      {/* Mobile Summary Card - Shows only on small screens */}
      <div className="block sm:hidden mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {selectedCommodity.charAt(0).toUpperCase() + selectedCommodity.slice(1)} Price
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{currentValue.toLocaleString()}
            </p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${
            isPositive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-medium">
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          vs previous month: ₹{prevValue.toLocaleString()}
        </div>
      </div>

      {/* Custom scrollbar hide class */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}