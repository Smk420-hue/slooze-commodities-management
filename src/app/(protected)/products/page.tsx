//src/app/(protected)/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductList from '@/components/products/ProductList';
import { ManagerOrStoreKeeper } from '@/components/auth/RoleGuard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Plus, Download } from 'lucide-react';
import Link from 'next/link';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Premium Wheat',
    category: 'Grains',
    stock: 450,
    price: 245,
    unit: 'ton',
    status: 'In Stock',
    lastUpdated: '2024-02-15',
    supplier: 'AgriCorp Ltd',
  },
  {
    id: '2',
    name: 'Organic Corn',
    category: 'Grains',
    stock: 380,
    price: 189,
    unit: 'ton',
    status: 'In Stock',
    lastUpdated: '2024-02-14',
    supplier: 'Green Fields Inc',
  },
  {
    id: '3',
    name: 'Arabica Coffee Beans',
    category: 'Beverages',
    stock: 125,
    price: 320,
    unit: 'kg',
    status: 'Low Stock',
    lastUpdated: '2024-02-13',
    supplier: 'Global Coffee Co',
  },
  {
    id: '4',
    name: 'Raw Sugar',
    category: 'Sweeteners',
    stock: 410,
    price: 156,
    unit: 'ton',
    status: 'In Stock',
    lastUpdated: '2024-02-12',
    supplier: 'SweetSource Ltd',
  },
  {
    id: '5',
    name: 'Soybeans',
    category: 'Oilseeds',
    stock: 290,
    price: 512,
    unit: 'ton',
    status: 'In Stock',
    lastUpdated: '2024-02-11',
    supplier: 'AgriProduce Corp',
  },
  {
    id: '6',
    name: 'Palm Oil',
    category: 'Oils',
    stock: 85,
    price: 890,
    unit: 'ton',
    status: 'Critical',
    lastUpdated: '2024-02-10',
    supplier: 'Tropical Oils Ltd',
  },
  {
    id: '7',
    name: 'Cocoa Beans',
    category: 'Beverages',
    stock: 95,
    price: 1250,
    unit: 'kg',
    status: 'Low Stock',
    lastUpdated: '2024-02-09',
    supplier: 'ChocoSource',
  },
  {
    id: '8',
    name: 'Cotton',
    category: 'Fibers',
    stock: 320,
    price: 180,
    unit: 'bale',
    status: 'In Stock',
    lastUpdated: '2024-02-08',
    supplier: 'Textile Traders',
  },
];

const categories = ['All', 'Grains', 'Beverages', 'Sweeteners', 'Oilseeds', 'Oils', 'Fibers'];
const statuses = ['All', 'In Stock', 'Low Stock', 'Critical'];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedStatus, products]);

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(product => product.status === selectedStatus);
    }

    setFilteredProducts(filtered);
  };

  const getStockStats = () => {
    const total = products.length;
    const inStock = products.filter(p => p.status === 'In Stock').length;
    const lowStock = products.filter(p => p.status === 'Low Stock').length;
    const critical = products.filter(p => p.status === 'Critical').length;

    return { total, inStock, lowStock, critical };
  };

  const stats = getStockStats();

  return (
    <ManagerOrStoreKeeper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Commodity Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and monitor all your commodity inventory
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Link href="/products/add">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">In Stock</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.inStock}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Low Stock</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.lowStock}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Critical</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.critical}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products, categories, suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-48">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold">{products.length}</span> products
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Product List */}
        <ProductList 
          products={filteredProducts} 
          isLoading={isLoading}
          onRefresh={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 500);
          }}
        />
      </div>
    </ManagerOrStoreKeeper>
  );
}