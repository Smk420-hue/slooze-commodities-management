//src/app/(protected)/products/add/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/products/ProductForm';
import { ManagerOrStoreKeeper } from '@/components/auth/RoleGuard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Product added:', data);
    
    // In a real app, you would:
    // 1. Call API to add product
    // 2. Show success message
    // 3. Redirect to products page
    
    setIsSubmitting(false);
    router.push('/products');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ManagerOrStoreKeeper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add New Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Add a new commodity to your inventory
            </p>
          </div>
        </div>

        {/* Product Form */}
        <ProductForm
          mode="add"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* Help Text */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> This is a demo application. Form submissions are simulated and 
            won't persist data. In a real application, this would connect to a backend API.
          </p>
        </div>
      </div>
    </ManagerOrStoreKeeper>
  );
}