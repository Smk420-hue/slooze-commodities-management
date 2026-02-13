//src/app/api/mock/products/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Mock product database
const mockProducts = [
  {
    id: '1',
    name: 'Premium Wheat',
    category: 'Grains',
    stock: 450,
    price: 245,
    unit: 'ton',
    status: 'In Stock',
    description: 'High-quality wheat grain for flour production',
    supplier: 'AgriCorp Ltd',
    lastUpdated: '2024-02-15',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Organic Corn',
    category: 'Grains',
    stock: 380,
    price: 189,
    unit: 'ton',
    status: 'In Stock',
    description: 'Organic non-GMO corn for feed and food',
    supplier: 'Green Fields Inc',
    lastUpdated: '2024-02-14',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Arabica Coffee Beans',
    category: 'Beverages',
    stock: 125,
    price: 320,
    unit: 'kg',
    status: 'Low Stock',
    description: 'Premium Arabica coffee beans from Ethiopia',
    supplier: 'Global Coffee Co',
    lastUpdated: '2024-02-13',
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    name: 'Raw Sugar',
    category: 'Sweeteners',
    stock: 410,
    price: 156,
    unit: 'ton',
    status: 'In Stock',
    description: 'Raw cane sugar for industrial use',
    supplier: 'SweetSource Ltd',
    lastUpdated: '2024-02-12',
    createdAt: '2024-01-05',
  },
  {
    id: '5',
    name: 'Soybeans',
    category: 'Oilseeds',
    stock: 290,
    price: 512,
    unit: 'ton',
    status: 'In Stock',
    description: 'High-protein soybeans for oil and feed',
    supplier: 'AgriProduce Corp',
    lastUpdated: '2024-02-11',
    createdAt: '2024-01-25',
  },
  {
    id: '6',
    name: 'Palm Oil',
    category: 'Oils',
    stock: 85,
    price: 890,
    unit: 'ton',
    status: 'Critical',
    description: 'Refined palm oil for cooking and industrial use',
    supplier: 'Tropical Oils Ltd',
    lastUpdated: '2024-02-10',
    createdAt: '2024-01-30',
  },
  {
    id: '7',
    name: 'Cocoa Beans',
    category: 'Beverages',
    stock: 95,
    price: 1250,
    unit: 'kg',
    status: 'Low Stock',
    description: 'Premium cocoa beans for chocolate production',
    supplier: 'ChocoSource',
    lastUpdated: '2024-02-09',
    createdAt: '2024-02-01',
  },
  {
    id: '8',
    name: 'Cotton',
    category: 'Fibers',
    stock: 320,
    price: 180,
    unit: 'bale',
    status: 'In Stock',
    description: 'High-grade cotton for textile industry',
    supplier: 'Textile Traders',
    lastUpdated: '2024-02-08',
    createdAt: '2024-01-28',
  },
  {
    id: '9',
    name: 'Rice - Jasmine',
    category: 'Grains',
    stock: 275,
    price: 420,
    unit: 'ton',
    status: 'In Stock',
    description: 'Fragrant jasmine rice from Thailand',
    supplier: 'Asian Grains Inc',
    lastUpdated: '2024-02-07',
    createdAt: '2024-02-02',
  },
  {
    id: '10',
    name: 'Almonds',
    category: 'Nuts',
    stock: 65,
    price: 950,
    unit: 'kg',
    status: 'Critical',
    description: 'California almonds for snacks and baking',
    supplier: 'Nut Harvesters',
    lastUpdated: '2024-02-06',
    createdAt: '2024-01-22',
  },
];

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (category && category !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (status && status !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.supplier.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        category,
        status,
        search,
      },
    });

  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint for creating new products
export async function POST(request: NextRequest) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'category', 'stock', 'price', 'unit', 'supplier'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create new product
    const newProduct = {
      id: (mockProducts.length + 1).toString(),
      name: body.name,
      category: body.category,
      stock: parseInt(body.stock),
      price: parseFloat(body.price),
      unit: body.unit,
      status: body.status || 'In Stock',
      description: body.description || '',
      supplier: body.supplier,
      lastUpdated: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };

    // In a real app, you would save to database
    // mockProducts.push(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });

  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}