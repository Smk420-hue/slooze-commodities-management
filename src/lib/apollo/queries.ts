//src/lib/apollo/queries.ts

import { gql } from '@apollo/client';

// Product Queries
export const GET_PRODUCTS = gql`
  query GetProducts(
    $category: String
    $status: String
    $search: String
    $page: Int
    $limit: Int
  ) {
    products(
      category: $category
      status: $status
      search: $search
      page: $page
      limit: $limit
    ) {
      id
      name
      category
      stock
      price
      unit
      status
      description
      supplier
      lastUpdated
      createdAt
    }
    productStats {
      total
      inStock
      lowStock
      critical
      totalValue
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      category
      stock
      price
      unit
      status
      description
      supplier
      lastUpdated
      createdAt
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      category
      stock
      price
      unit
      status
      description
      supplier
      lastUpdated
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      category
      stock
      price
      unit
      status
      description
      supplier
      lastUpdated
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Dashboard Queries
export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      totalProducts
      totalValue
      lowStockItems
      criticalItems
      recentOrders
      monthlyRevenue
      topProducts {
        id
        name
        sales
        revenue
      }
    }
    monthlyTrends {
      month
      revenue
      orders
    }
  }
`;

// Auth Queries
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        name
        role
      }
      token
    }
  }
`;

export const VERIFY_TOKEN = gql`
  query VerifyToken {
    verifyToken {
      user {
        id
        email
        name
        role
      }
      valid
    }
  }
`;

// User Queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      role
      createdAt
    }
  }
`;

// Mock data for development (when GraphQL endpoint is not available)
export const mockProductsData = {
  products: [
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
  ],
  productStats: {
    total: 2,
    inStock: 2,
    lowStock: 0,
    critical: 0,
    totalValue: 127350,
  },
};

export const mockDashboardStats = {
  dashboardStats: {
    totalProducts: 1248,
    totalValue: 1845600,
    lowStockItems: 17,
    criticalItems: 5,
    recentOrders: 42,
    monthlyRevenue: 84560,
    topProducts: [
      { id: '1', name: 'Premium Wheat', sales: 450, revenue: 110250 },
      { id: '2', name: 'Organic Corn', sales: 380, revenue: 71820 },
      { id: '3', name: 'Arabica Coffee', sales: 125, revenue: 40000 },
    ],
  },
  monthlyTrends: [
    { month: 'Jan', revenue: 75000, orders: 38 },
    { month: 'Feb', revenue: 84560, orders: 42 },
    { month: 'Mar', revenue: 92000, orders: 45 },
  ],
};