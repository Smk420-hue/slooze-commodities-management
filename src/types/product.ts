//src/types/product.ts

export type ProductStatus = 'In Stock' | 'Low Stock' | 'Critical';

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  unit: string;
  status: ProductStatus;  // This must be the union type, not string
  description?: string;
  supplier: string;
  lastUpdated: string;
  createdAt?: string;
}

export interface ProductFormData {
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  unit: string;
  status: ProductStatus;
  description?: string;
  supplier: string;
}

export interface ProductFilters {
  category?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters?: ProductFilters;
}

export interface ProductStats {
  total: number;
  inStock: number;
  lowStock: number;
  critical: number;
  totalValue: number;
}
