import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight, Truck, Package, RefreshCw, ThumbsUp, Plus, Minus } from 'lucide-react';

const ProductDetailPage = () => {
  // Product data (normally would come from an API)
  const product = {
    id: 1,
    name: "Premium Men's Casual Summer T-Shirt",
    brand: "FashionBrand",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    rating: 4.7,
    reviewCount: 238,
    availability: "In Stock",
    deliveryTime: "3-5 business days",
    description: "This premium casual t-shirt is perfect for summer days. Made from 100% organic cotton, it offers superior comfort with a modern fit. The breathable fabric ensures you stay cool during hot weather while the reinforced seams provide excellent durability.",
    features: [
      "100% organic cotton material",
      "Breathable fabric for hot weather",
      "Reinforced seams for durability",
      "Machine washable",
      "Available in multiple colors",
      "Regular fit"
    ],
    specifications: [
      { name: "Material", value: "100% Organic Cotton" },
      { name: "Fit", value: "Regular" },
      { name: "Neckline", value: "Crew Neck" },
      { name: "Sleeve", value: "Short Sleeve" },
      { name: "Care", value: "Machine Wash Cold" },
      { name: "Country of Origin", value: "Italy" }
    ],
    colors: ["White", "Black", "Navy Blue", "Grey", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800"
    ],
    relatedProducts: [
      { id: 2, name: "Men's Cotton Polo Shirt", price: 34.99, image: "/api/placeholder/300/400", rating: 4.5 },
      { id: 3, name: "Casual Slim Fit Shorts", price: 24.99, image: "/api/placeholder/300/400", rating: 4.3 },
      { id: 4, name: "Summer Lightweight Jacket", price: 59.99, image: "/api/placeholder/300/400", rating: 4.8 }
    ],
    sellerInfo: {
      name: "FashionOutlet Store",
      rating: 4.9,
      responseRate: "98%",
      shipOnTime: "97%",
      memberSince: "June 2020"
    },
    reviews: [
      { id: 1, user: "James K.", rating: 5, date: "2 weeks ago", comment: "Excellent quality t-shirt. The fabric is really soft and comfortable. I've ordered two more in different colors!" },
      { id: 2, user: "Sarah L.", rating: 4, date: "1 month ago", comment: "Great fit and nice material. Shipping was fast too. Would recommend." }
    ]
  };

  // State management
  const [mainImage, setMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  // Handle add to cart with animation
  const handleAddToCart = () => {
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 2000);
  };

  // Image gallery navigation
  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setMainImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Quantity controls
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <Star className="absolute top-0 left-0 w-4 h-4 fill-yellow-400 text-yellow-400 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </span>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li><a href="#" className="text-gray-500 hover:text-blue-600">Home</a></li>
            <li><span className="text-gray-500 mx-1">/</span></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-600">Clothing</a></li>
            <li><span className="text-gray-500 mx-1">/</span></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-600">T-Shirts</a></li>
            <li><span className="text-gray-500 mx-1">/</span></li>
            <li className="font-medium text-blue-600 truncate">{product.name}</li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            {/* Product Image Gallery */}
            <div className="md:w-1/2 p-4">
              <div className="relative h-96 md:h-full rounded-lg overflow-hidden mb-4 bg-gray-100">
                <motion.img
                  key={mainImage}
                  src={product.images[mainImage]}
                  alt={`${product.name} - View ${mainImage + 1}`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md text-gray-800 transition-all duration-300"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md text-gray-800 transition-all duration-300"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto py-2">
                {product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    className={`border-2 rounded-md overflow-hidden flex-shrink-0 ${mainImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setMainImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
                <p className="text-sm text-gray-500">Brand: <span className="font-medium text-gray-700">{product.brand}</span></p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.rating}) · {product.reviewCount} reviews</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="ml-2 line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium">-{product.discount}%</span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center mb-4 text-sm">
                <span className="text-green-600 font-medium flex items-center">
                  <ThumbsUp size={16} className="mr-1" />
                  {product.availability}
                </span>
                <span className="mx-2">·</span>
                <span className="text-gray-600">Delivery: {product.deliveryTime}</span>
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <motion.button
                      key={color}
                      className={`px-3 py-1 rounded-full border ${selectedColor === color 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-gray-400'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <motion.button
                      key={size}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border ${selectedSize === size 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' 
                        : 'border-gray-300 hover:border-gray-400'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <motion.button 
                    className="w-8 h-8 rounded-l-md bg-gray-100 flex items-center justify-center border border-gray-300"
                    onClick={decreaseQuantity}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus size={16} />
                  </motion.button>
                  <input 
                    type="text" 
                    className="w-12 h-8 text-center border-t border-b border-gray-300" 
                    value={quantity} 
                    readOnly 
                  />
                  <motion.button 
                    className="w-8 h-8 rounded-r-md bg-gray-100 flex items-center justify-center border border-gray-300"
                    onClick={increaseQuantity}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                  
                  <AnimatePresence>
                    {cartAnimation && (
                      <motion.div 
                        className="absolute inset-0 bg-green-500 flex items-center justify-center"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-white font-medium flex items-center">
                          <ThumbsUp className="mr-2" size={20} />
                          Added to Cart!
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                <motion.button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.button
                  className={`flex items-center text-sm ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`mr-1 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} size={18} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </motion.button>
                
                <motion.button
                  className="flex items-center text-sm text-gray-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="mr-1" size={18} />
                  Share
                </motion.button>
              </div>

              {/* Delivery Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start mb-2">
                  <Truck className="mr-2 text-gray-500 flex-shrink-0" size={18} />
                  <p className="text-sm text-gray-600">
                    Free shipping for orders above $50. Standard delivery in {product.deliveryTime}.
                  </p>
                </div>
                <div className="flex items-start mb-2">
                  <Package className="mr-2 text-gray-500 flex-shrink-0" size={18} />
                  <p className="text-sm text-gray-600">
                    Secure packaging ensures your items arrive in perfect condition.
                  </p>
                </div>
                <div className="flex items-start">
                  <RefreshCw className="mr-2 text-gray-500 flex-shrink-0" size={18} />
                  <p className="text-sm text-gray-600">
                    Easy 30-day return policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <h3 className="font-medium text-gray-900 mb-2">Key Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{spec.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                      <div className="flex items-center mt-1">
                        {renderStars(product.rating)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center mb-1">
                          <div className="w-10 text-sm text-gray-600">{star} star</div>
                          <div className="w-full h-2 mx-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-yellow-400 rounded-full" 
                              style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%` }} 
                            />
                          </div>
                          <div className="w-10 text-xs text-gray-500">
                            {star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : star === 2 ? '3%' : '2%'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                    {product.reviews.map((review) => (
                      <div key={review.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">{review.user}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                    <motion.button
                      className="text-blue-600 font-medium mt-4 flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      See all reviews
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Seller Information */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Seller Information</h2>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="sm:w-1/2">
              <p className="font-medium text-gray-900">{product.sellerInfo.name}</p>
              <div className="flex items-center mt-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm">{product.sellerInfo.rating} rating</span>
              </div>
              <p className="text-sm text-gray-600">Member since: {product.sellerInfo.memberSince}</p>
            </div>
            <div className="sm:w-1/2 mt-4 sm:mt-0">
              <div className="flex items-center mb-2">
                <div className="w-32 text-sm text-gray-700">Response Rate:</div>
                <div className="text-sm font-medium text-gray-900">{product.sellerInfo.responseRate}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm text-gray-700">Ships on Time:</div>
                <div className="text-sm font-medium text-gray-900">{product.sellerInfo.shipOnTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center mb-1">
                    {renderStars(item.rating)}
                  </div>
                  <p className="font-bold text-blue-600">${item.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;