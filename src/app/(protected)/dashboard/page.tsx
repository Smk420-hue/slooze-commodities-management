'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import CommodityChart from '@/components/dashboard/CommodityChart';
import { ManagerOnly } from '@/components/auth/RoleGuard';
import { 
  TrendingUp, 
  Package, 
  IndianRupee, 
  Users,
  AlertTriangle,
  BarChart3,
  ChevronRight
} from 'lucide-react';

// Mock data for dashboard
const mockStats = [
  {
    title: 'Total Commodities',
    value: '1,248',
    change: '+12%',
    icon: <Package className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: 'bg-blue-500',
    description: 'Across all categories',
  },
  {
    title: 'Monthly Revenue',
    value: '₹84,560',
    change: '+18.2%',
    icon: <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: 'bg-green-500',
    description: 'From commodity sales',
  },
  {
    title: 'Active Suppliers',
    value: '42',
    change: '+3',
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: 'bg-purple-500',
    description: 'Registered suppliers',
  },
  {
    title: 'Low Stock Items',
    value: '17',
    change: '-4',
    icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: 'bg-orange-500',
    description: 'Need restocking',
  },
];

const recentActivities = [
  { id: 1, action: 'New shipment received', user: 'Warehouse Team', time: '10 min ago' },
  { id: 2, action: 'Price updated for Wheat', user: 'John Manager', time: '25 min ago' },
  { id: 3, action: 'New supplier added', user: 'Jane StoreKeeper', time: '1 hour ago' },
  { id: 4, action: 'Monthly report generated', user: 'System', time: '2 hours ago' },
  { id: 5, action: 'Low stock alert triggered', user: 'System', time: '3 hours ago' },
];

const topCommodities = [
  { id: 1, name: 'Wheat', stock: 450, price: 245, change: '+5.2%' },
  { id: 2, name: 'Corn', stock: 380, price: 189, change: '+3.8%' },
  { id: 3, name: 'Soybeans', stock: 290, price: 512, change: '-1.2%' },
  { id: 4, name: 'Coffee', stock: 125, price: 320, change: '+8.7%' },
  { id: 5, name: 'Sugar', stock: 410, price: 156, change: '+2.1%' },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ManagerOnly
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Access Restricted
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              This dashboard is only accessible to Managers.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
              Welcome back! Here's what's happening with your commodities today.
            </p>
          </div>
          
          {/* Manager Badge - Responsive */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm font-medium">
              Manager View
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Time Period Selector - Mobile Optimized */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Today', 'Week', 'Month', 'Quarter', 'Year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period.toLowerCase())}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                selectedPeriod === period.toLowerCase()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {mockStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              description={stat.description}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Charts and Activities - Responsive Stacking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Chart - Full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Commodity Price Trends
                </h3>
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">This Month</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                  </div>
                </div>
              </div>
              <div className="h-64 sm:h-80">
                <CommodityChart />
              </div>
            </div>
          </div>

          {/* Recent Activities - Mobile: 3 items, Desktop: 5 items */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h3>
              <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.slice(0, 3).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                      <span className="truncate">by {activity.user}</span>
                      <span>•</span>
                      <span className="flex-shrink-0">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile View More Link */}
            <div className="mt-4 sm:hidden">
              <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 border-t border-gray-200 dark:border-gray-800">
                View 2 more activities
              </button>
            </div>
          </div>
        </div>

        {/* Top Commodities Table - Responsive */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Top Performing Commodities
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Based on stock levels and price changes
                </p>
              </div>
              <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 self-start">
                View Report <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          
          {/* Mobile: Card View */}
          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {topCommodities.map((commodity) => (
                <div key={commodity.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {commodity.name}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        commodity.change.startsWith('+')
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {commodity.change}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Stock:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-white">{commodity.stock} tons</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Price:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-white">₹{commodity.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Commodity
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stock (tons)
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price/Unit
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {topCommodities.map((commodity) => (
                  <tr key={commodity.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {commodity.name}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-white">{commodity.stock}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-white">₹{commodity.price}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          commodity.change.startsWith('+')
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {commodity.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm opacity-90">Avg. Order Value</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 sm:mt-2">₹1,240</p>
              </div>
              <IndianRupee className="w-6 h-6 sm:w-8 sm:h-8 opacity-90" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm opacity-90">Inventory Turnover</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 sm:mt-2">4.2x</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 opacity-90" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm opacity-90">Order Fulfillment</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 sm:mt-2">98.5%</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </ManagerOnly>
  );
}