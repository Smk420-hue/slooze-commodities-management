//src/lib/utils.ts
// Utility functions for the application

/**
 * Format currency value
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format large numbers with K, M suffixes
 */
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Generate a random ID (for mock data)
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Get status color class based on stock level
 */
export function getStockStatusColor(stock: number, lowThreshold = 100, criticalThreshold = 50): string {
  if (stock <= criticalThreshold) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
  if (stock <= lowThreshold) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  }
  return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
}

/**
 * Get status text based on stock level
 */
export function getStockStatus(stock: number, lowThreshold = 100, criticalThreshold = 50): string {
  if (stock <= criticalThreshold) {
    return 'Critical';
  }
  if (stock <= lowThreshold) {
    return 'Low Stock';
  }
  return 'In Stock';
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Parse JWT token (mock for demo)
 */
export function parseJWT(token: string): any {
  try {
    // This is a mock implementation for demo
    // In a real app, you would use jwt-decode or similar
    if (token.startsWith('mock-jwt-token-')) {
      const parts = token.split('-');
      return {
        id: parts[3] || 'unknown',
        iat: Date.now(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
}

/**
 * Calculate price with tax
 */
export function calculateWithTax(price: number, taxRate: number = 0.1): number {
  return price * (1 + taxRate);
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate mock data for charts
 */
export function generateChartData(
  count: number,
  min: number = 100,
  max: number = 1000,
  trend: 'up' | 'down' | 'flat' = 'up'
): number[] {
  const data: number[] = [];
  let current = Math.random() * (max - min) + min;
  
  for (let i = 0; i < count; i++) {
    data.push(Math.round(current));
    
    if (trend === 'up') {
      current += (Math.random() - 0.2) * (max - min) / 10;
    } else if (trend === 'down') {
      current -= (Math.random() - 0.2) * (max - min) / 10;
    } else {
      current += (Math.random() - 0.5) * (max - min) / 20;
    }
    
    // Keep within bounds
    current = Math.max(min, Math.min(max, current));
  }
  
  return data;
}
