//src/app/(protected)/products/edit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/components/products/ProductForm';
import { ManagerOrStoreKeeper } from '@/components/auth/RoleGuard';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Mock product for editing
const mockProduct = {
  id: '1',
  name: 'Premium Wheat',
  category: 'Grains',
  stock: 450,
  price: 245,
  unit: 'ton',
  status: 'In Stock' as const,
  supplier: 'AgriCorp Ltd',
  description: 'High-quality wheat grain for flour production',
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(mockProduct);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching product data
    const fetchProduct = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would fetch the product by ID from API
      console.log('Fetching product with ID:', params.id);
      
      setIsLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Product updated:', data);
    console.log('Product ID:', params.id);
    
    // In a real app, you would:
    // 1. Call API to update product
    // 2. Show success message
    // 3. Redirect to products page
    
    setIsSubmitting(false);
    router.push('/products');
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading product data...
          </p>
        </div>
      </div>
    );
  }

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
              Edit Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Update commodity information
            </p>
          </div>
        </div>

        {/* Product Form */}
        <ProductForm
          product={product}
          mode="edit"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* Help Text */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Demo Note:</strong> This edit form is pre-filled with mock data. 
            Changes won't persist between page reloads. In production, this would 
            fetch real product data from an API.
          </p>
        </div>
      </div>
    </ManagerOrStoreKeeper>
  );
}