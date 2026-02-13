//src/components/products/ProductForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertTriangle, CheckCircle, Package, IndianRupee, Truck, BarChart3, Save, X } from 'lucide-react';

interface ProductFormData {
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  supplier: string;
  description?: string;
}

interface ProductFormProps {
  product?: ProductFormData;
  mode: 'add' | 'edit';
  onSubmit?: (data: ProductFormData) => void;
  onCancel?: () => void;
}

const categories = ['Grains', 'Beverages', 'Sweeteners', 'Oilseeds', 'Oils', 'Fibers', 'Metals', 'Energy'];
const units = ['ton', 'kg', 'lb', 'bale', 'barrel', 'gallon', 'liter', 'bag'];
const statusOptions = ['In Stock', 'Low Stock', 'Critical'];

export default function ProductForm({ product, mode, onSubmit, onCancel }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Grains',
    stock: 0,
    price: 0,
    unit: 'ton',
    status: 'In Stock',
    supplier: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Supplier is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default mock submission
      console.log('Form submitted:', formData);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
        router.push('/products');
      }, 1500);
    }
  };

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  // Calculate status based on stock
  const calculateStatus = (stock: number): 'In Stock' | 'Low Stock' | 'Critical' => {
    if (stock > 200) return 'In Stock';
    if (stock > 50) return 'Low Stock';
    return 'Critical';
  };

  const getStockColor = (stock: number) => {
    if (stock > 200) return 'text-green-600 dark:text-green-400';
    if (stock > 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {mode === 'add' ? 'Add New Product' : 'Edit Product'}
              </CardTitle>
              <CardDescription>
                {mode === 'add' 
                  ? 'Add a new commodity to your inventory' 
                  : `Editing: ${formData.name}`}
              </CardDescription>
            </div>
          </div>
          {mode === 'edit' && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(formData.status)}`}>
              {formData.status}
            </span>
          )}
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Product {mode === 'add' ? 'Added' : 'Updated'} Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Redirecting to products page...
              </p>
            </div>
          ) : (
            <>
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Product Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter product name"
                      error={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter product description"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
                    rows={3}
                  />
                </div>
              </div>

              {/* Stock & Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  Stock & Pricing
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Stock Quantity *
                    </label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        handleChange('stock', value);
                        // Auto-update status based on stock
                        handleChange('status', calculateStatus(value));
                      }}
                      placeholder="Enter stock quantity"
                      error={!!errors.stock}
                      min="0"
                    />
                    {errors.stock && (
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.stock}</p>
                    )}
                    <p className={`text-sm font-medium ${getStockColor(formData.stock)}`}>
                      Status will be: {calculateStatus(formData.stock)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </div>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="pl-8"
                        error={!!errors.price}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.price}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Unit
                    </label>
                    <select
                      value={formData.unit}
                      onChange={(e) => handleChange('unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleChange('status', status)}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          formData.status === status
                            ? `${getStatusColor(status)} border-transparent`
                            : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Supplier Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Supplier Information
                </h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Supplier Name *
                  </label>
                  <Input
                    value={formData.supplier}
                    onChange={(e) => handleChange('supplier', e.target.value)}
                    placeholder="Enter supplier name"
                    error={!!errors.supplier}
                  />
                  {errors.supplier && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.supplier}</p>
                  )}
                </div>
              </div>

              {/* Form Level Errors */}
              {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    <p className="font-medium">Please fix the errors above before submitting</p>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>

        {!isSuccess && (
          <CardFooter className="flex justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === 'add' ? 'Adding...' : 'Updating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {mode === 'add' ? 'Add Product' : 'Update Product'}
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}