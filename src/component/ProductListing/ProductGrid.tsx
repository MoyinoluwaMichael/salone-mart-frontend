import React from 'react';
import { motion } from 'framer-motion';
// import { Star } from 'lucide-react';
import { products } from '@/constant/data';
import ProductCard from '@/common/ProductCard';




const ProductGrid = () => {


  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8  p-3
       shadow-lg bg-gradient-to-r from-green-700 via-green-400 to-blue-600
      ">Clothing Collection</h1>
      {/* from-blue-700 via-blue-600 to-green-600 */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map(product => (
        //   <motion.div 
        //     key={product.id}
        //     className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        //     variants={productVariants}
        //     whileHover={{ y: -5 }}
        //   >
        //     <div className="relative overflow-hidden group">
        //       <img 
        //         src={product.image} 
        //         alt={product.name} 
        //         className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        //       />
              
        //       <motion.div 
        //         className="absolute inset-0 bg-black bg-opacity-0 flex items-end justify-center group-hover:bg-opacity-20 transition-all duration-300"
        //         initial={{ opacity: 0 }}
        //         whileHover={{ opacity: 1 }}
        //       >
        //         <motion.button
        //           onClick={() => handleAddToCart(product.id)}
        //           className={`mb-4 px-4 py-2 rounded-full ${addedToCart[product.id] ? 'bg-green-500' : 'bg-blue-600'} text-white font-medium flex items-center gap-2 transform transition-all duration-300`}
        //           initial={{ y: 20, opacity: 0 }}
        //           whileHover={{ scale: 1.05 }}
        //           whileInView={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
        //         >
        //           <ShoppingCart size={18} />
        //           {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'}
        //         </motion.button>
        //       </motion.div>
        //     </div>
            
        //     <div className="p-4">
        //       <div className="flex justify-between items-start">
        //         <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        //         <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
        //       </div>
              
        //       <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
              
        //       <div className="mt-2 flex items-center">
        //         <div className="flex items-center">
        //           {renderStars(product.rating)}
        //         </div>
        //         <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
        //       </div>
        //     </div>
        //   </motion.div>
        <ProductCard {...product} />
        ))}
      </motion.div>
    </div>
  );
};

export default ProductGrid;