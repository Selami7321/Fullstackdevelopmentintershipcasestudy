import axios from 'axios';
import { ProductsResponse, GoldPriceResponse } from '../types/Product';
import productsData from '../../products.json';

// Use environment variable for production or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Mock data for production when backend is not available
const mockGoldPrice = 65.50;

// Helper function to calculate product price
function calculatePrice(popularityScore: number, weight: number) {
  return Math.round(((popularityScore + 1) * weight * mockGoldPrice) * 100) / 100;
}

// Helper function to convert popularity score to 5-star rating
function convertToStarRating(popularityScore: number) {
  return Math.round((popularityScore * 5) * 10) / 10;
}

// Check if we're in production and backend is not available
const isProduction = import.meta.env.PROD;

export const productAPI = {
  // Get all products with optional filtering
  getProducts: async (filters?: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
  }): Promise<ProductsResponse> => {
    // In production, use mock data if backend is not available
    if (isProduction) {
      try {
        // Try to reach the backend first
        const response = await axios.get(`${API_BASE_URL}/products`, { timeout: 5000 });
        return response.data;
      } catch (error) {
        // If backend is not available, use mock data
        console.log('Backend not available, using mock data');
        
        let products = productsData.map(product => ({
          ...product,
          price: calculatePrice(product.popularityScore, product.weight),
          starRating: convertToStarRating(product.popularityScore)
        }));

        // Apply filters if provided
        if (filters?.minPrice) {
          products = products.filter(p => p.price >= filters.minPrice!);
        }
        if (filters?.maxPrice) {
          products = products.filter(p => p.price <= filters.maxPrice!);
        }
        if (filters?.minPopularity) {
          products = products.filter(p => p.popularityScore >= filters.minPopularity!);
        }
        if (filters?.maxPopularity) {
          products = products.filter(p => p.popularityScore <= filters.maxPopularity!);
        }

        return {
          success: true,
          data: products,
          goldPrice: mockGoldPrice,
          totalProducts: products.length
        };
      }
    }

    const params = new URLSearchParams();
    
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.minPopularity) params.append('minPopularity', filters.minPopularity.toString());
    if (filters?.maxPopularity) params.append('maxPopularity', filters.maxPopularity.toString());

    const response = await axios.get(`${API_BASE_URL}/products?${params}`);
    return response.data;
  },

  // Get current gold price
  getGoldPrice: async (): Promise<GoldPriceResponse> => {
    if (isProduction) {
      try {
        const response = await axios.get(`${API_BASE_URL}/gold-price`, { timeout: 5000 });
        return response.data;
      } catch (error) {
        return {
          success: true,
          goldPrice: mockGoldPrice,
          currency: 'USD',
          unit: 'per gram',
          lastUpdated: new Date().toISOString()
        };
      }
    }
    
    const response = await axios.get(`${API_BASE_URL}/gold-price`);
    return response.data;
  }
};