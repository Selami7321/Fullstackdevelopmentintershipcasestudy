import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, TrendingUp, Award, Users, Zap } from 'lucide-react';
import ProductCarousel from './components/ProductCarousel';
import FilterPanel from './components/FilterPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ProductModal from './components/ProductModal';
import { productAPI } from './services/api';
import { Product } from './types/Product';

interface FilterState {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [goldPrice, setGoldPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async (filterParams?: FilterState) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productAPI.getProducts(filterParams);
      
      if (response.success) {
        setProducts(response.data);
        setGoldPrice(response.goldPrice);
        setTotalProducts(response.totalProducts);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Unable to connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 text-red-800 rounded-lg p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => fetchProducts(filters)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Luxury Engagement Rings
                </h1>
                <p className="text-sm text-gray-600">
                  Exquisite designs crafted with precision
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Real-time gold pricing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span>Premium quality</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Ring
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each ring is carefully crafted with premium materials and priced dynamically based on 
            real-time gold market rates. Choose from our collection of stunning engagement rings.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">10,000+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Real-time Pricing</span>
            </div>
          </div>
        </section>

        {/* Filter Panel */}
        <FilterPanel
          onFilterChange={handleFilterChange}
          goldPrice={goldPrice}
          totalProducts={totalProducts}
        />

        {/* Products Section */}
        <section>
          {loading ? (
            <LoadingSpinner />
          ) : products.length > 0 ? (
            <ProductCarousel 
              products={products} 
              onProductSelect={handleProductSelect}
            />
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filter criteria to see more products.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    fetchProducts();
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              © 2025 Luxury Engagement Rings. All rights reserved.
            </p>
            <p className="text-sm">
              Prices are calculated based on real-time gold market rates and may fluctuate.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;