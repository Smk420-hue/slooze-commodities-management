//src/components/products/ProductCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUserRole } from '@/store/user.store';
import { Button } from '@/components/ui/Button';
import { 
  Edit, 
  Package, 
  TrendingUp, 
  Truck,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  lastUpdated: string;
  supplier: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const userRole = useUserRole();
  const canEdit = userRole === 'MANAGER' || userRole === 'STORE_KEEPER';

  const getStatusIcon = () => {
    switch (product.status) {
      case 'In Stock':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Low Stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'Critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (product.status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStockColor = () => {
    if (product.stock > 300) return 'text-green-600 dark:text-green-400';
    if (product.stock > 100) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div
      className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getStatusColor()} bg-opacity-20`}>
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
              {product.name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.category}
            </span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {product.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Package className="w-3.5 h-3.5" />
              <span>Stock</span>
            </div>
            <p className={`font-bold text-lg ${getStockColor()}`}>
              {product.stock.toLocaleString()} {product.unit}
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Price</span>
            </div>
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString()}/{product.unit}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Truck className="w-3.5 h-3.5" />
            <span>Supplier</span>
          </div>
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {product.supplier}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {product.lastUpdated}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            product.status === 'In Stock' ? 'bg-green-500' :
            product.status === 'Low Stock' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}></div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.status === 'Critical' ? 'Urgent restock needed' :
             product.status === 'Low Stock' ? 'Consider restocking' :
             'Stock levels good'}
          </span>
        </div>
        
        <Link href={canEdit ? `/products/edit/${product.id}` : '#'}>
          <Button
            variant={isHovered ? "default" : "outline"}
            size="sm"
            className="gap-1.5 transition-all"
            disabled={!canEdit}
            title={!canEdit ? "Edit permission required" : "Edit product"}
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </Button>
        </Link>
      </div>

      {/* Role restriction message */}
      {!canEdit && (
        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-md">
          <p className="text-xs text-yellow-700 dark:text-yellow-400 text-center">
            Edit access requires Store Keeper or Manager role
          </p>
        </div>
      )}

      {/* Hover effect indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
}