import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'rose' | 'white'>('yellow');
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const colorOptions = [
    { key: 'yellow', name: 'Yellow Gold', color: '#FFD700' },
    { key: 'rose', name: 'Rose Gold', color: '#E8B4B8' },
    { key: 'white', name: 'White Gold', color: '#F5F5F5' }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" 
                style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}>
          <div className="flex space-x-3">
            <button
              onClick={handleViewDetails}
              className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              className="bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              title="Quick Add to Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
        
        {/* Popularity badge */}
        {product.popularityScore > 0.85 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Popular</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex space-x-2">
          {colorOptions.map((color) => (
            <button
              key={color.key}
              onClick={() => setSelectedColor(color.key as 'yellow' | 'rose' | 'white')}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                selectedColor === color.key 
                  ? 'border-gray-800 shadow-lg scale-110 ring-2 ring-white' 
                  : 'border-white shadow-md hover:scale-105 hover:shadow-lg'
              }`}
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(product.starRating || 0)}
            </div>
            <span className="text-sm text-gray-600">
              ({product.starRating?.toFixed(1)})
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {product.weight}g
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <button 
            onClick={handleViewDetails}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
          >
            <span>View Details</span>
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;