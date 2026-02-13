'use client';

import { ManagerOnly } from '@/components/auth/RoleGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart3, TrendingUp, IndianRupee, Package, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

// Mock data
const monthlyData = [
  { month: 'Jan', revenue: 75000, orders: 38, products: 1240 },
  { month: 'Feb', revenue: 84560, orders: 42, products: 1248 },
  { month: 'Mar', revenue: 92000, orders: 45, products: 1255 },
  { month: 'Apr', revenue: 88700, orders: 43, products: 1262 },
  { month: 'May', revenue: 95400, orders: 47, products: 1270 },
  { month: 'Jun', revenue: 102000, orders: 51, products: 1285 },
];

const categoryData = [
  { name: 'Grains', value: 45, revenue: 384000 },
  { name: 'Beverages', value: 25, revenue: 212000 },
  { name: 'Oils', value: 15, revenue: 128000 },
  { name: 'Sweeteners', value: 10, revenue: 85000 },
  { name: 'Fibers', value: 5, revenue: 42000 },
];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const avgOrders = Math.round(monthlyData.reduce((sum, month) => sum + month.orders, 0) / monthlyData.length);
  const growth = ((monthlyData[monthlyData.length - 1].revenue - monthlyData[0].revenue) / monthlyData[0].revenue * 100).toFixed(1);

  return (
    <ManagerOnly
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Analytics are only available to Managers.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive insights and performance metrics
            </p>
          </div>
          
          {/* Period Selector */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setSelectedPeriod('1m')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === '1m'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              1M
            </button>
            <button
              onClick={() => setSelectedPeriod('3m')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === '3m'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              3M
            </button>
            <button
              onClick={() => setSelectedPeriod('6m')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === '6m'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              6M
            </button>
            <button
              onClick={() => setSelectedPeriod('1y')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === '1y'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              1Y
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ₹{totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    ↑ {growth}% vs last period
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {avgOrders}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    ↑ 12% vs last period
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    1,285
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    ↑ 3.6% this month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Suppliers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    42
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    +3 new this month
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between gap-2">
              {monthlyData.map((month, index) => {
                const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));
                const height = (month.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex justify-center">
                      <div
                        className="w-12 bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${height * 0.6}px` }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                            ₹{month.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{month.month}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{month.orders} orders</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category.value}% ₹{(category.revenue / 1000).toFixed(0)}k)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyData.slice(-3).reverse().map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{month.month} 2024</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{month.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹{month.revenue.toLocaleString()}</p>
                      <p className={`text-sm ${
                        month.revenue > monthlyData[monthlyData.length - 2].revenue 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {month.revenue > monthlyData[monthlyData.length - 2].revenue ? '↑' : '↓'} 
                        {((month.revenue - monthlyData[monthlyData.length - 2].revenue) / monthlyData[monthlyData.length - 2].revenue * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>
    </ManagerOnly>
  );
}