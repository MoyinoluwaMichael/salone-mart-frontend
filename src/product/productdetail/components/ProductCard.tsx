import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import {Product} from "@/product/productService";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: Product;
}


const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const navigate = useNavigate();
  const { id, name, price, originalPrice, discount, image, isNew, rating }: Product = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(true);

    // Add actual cart logic here

    // Reset button state after animation
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`, { state: { product } });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
            <Star
                key={i}
                size={14}
                className="text-yellow-400 fill-yellow-400"
                aria-hidden="true"
            />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
            <Star
                key={i}
                size={14}
                className="text-yellow-400 fill-yellow-400 opacity-50"
                aria-hidden="true"
            />
        );
      } else {
        stars.push(
            <Star
                key={i}
                size={14}
                className="text-gray-300"
                aria-hidden="true"
            />
        );
      }
    }
    return stars;
  };

  return (
      <div
          className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCardClick}
      >
        <a href={`/products/${id}`} aria-label={name}>
          <div className="relative aspect-square overflow-hidden">
            <img
                src={image || '/placeholder-product.jpg'}
                alt={name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                    isHovered ? 'scale-110' : 'scale-100'
                }`}
            />
            <div
                className={`absolute top-2 right-2 flex flex-col space-y-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                aria-hidden={!isHovered}
            >
              <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full shadow-md bg-white transition-all duration-300 ${
                      isFavorite ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                  className="p-2 rounded-full shadow-md bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  aria-label="Quick view"
              >
                <Eye size={18} />
              </button>
            </div>
            <div className="absolute top-2 left-2 flex flex-col space-y-2">
              {discount && discount > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {discount}% OFF
              </span>
              )}
              {isNew && (
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                NEW
              </span>
              )}
            </div>
          </div>
        </a>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
              {renderStars()}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating?.toFixed(1)})</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900">${price?.toFixed(2) || originalPrice?.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through ml-2">
              ${originalPrice?.toFixed(2)}
            </span>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-4 flex items-center justify-center text-white font-medium text-sm transition-all duration-300 ${
                  isAddedToCart
                      ? 'bg-green-600'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'
              } ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}
              aria-hidden={!isHovered}
              aria-label="Add to cart"
          >
            <ShoppingCart size={18} className={`mr-2 ${isAddedToCart ? 'animate-bounce' : ''}`} />
            {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
  );
};

export default ProductCard;
