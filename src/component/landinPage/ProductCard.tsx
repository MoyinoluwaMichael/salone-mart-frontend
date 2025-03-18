import React from 'react'
import { ShoppingCartIcon, HeartIcon, StarIcon } from 'lucide-react'
interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  discount?: number
  isNew?: boolean
}
 const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  rating,
  image,
  discount,
  isNew,
}) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        {/* New badge */}
        {isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        {/* Wishlist button */}
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
          <HeartIcon size={18} className="text-gray-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1 truncate">{name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size={14}
              className={
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-800">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-500 text-sm line-through ml-2">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button className="bg-orange-500 text-white p-1.5 rounded-full hover:bg-orange-600 transition-colors">
            <ShoppingCartIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}


export default ProductCard;