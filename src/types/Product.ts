export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  price?: number;
  starRating?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  goldPrice: number;
  totalProducts: number;
}

export interface GoldPriceResponse {
  success: boolean;
  goldPrice: number;
  currency: string;
  unit: string;
  lastUpdated: string;
}