import axios from 'axios';
import { ProductsResponse, GoldPriceResponse } from '../types/Product';

// Use environment variable for production or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const productAPI = {
  // Get all products with optional filtering
  getProducts: async (filters?: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
  }): Promise<ProductsResponse> => {
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
    const response = await axios.get(`${API_BASE_URL}/gold-price`);
    return response.data;
  }
};