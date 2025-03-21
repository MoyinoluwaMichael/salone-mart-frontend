import React from 'react';
import {motion} from 'framer-motion';
import {products} from '@/constant/data';
import ProductCard from '@/common/ProductCard';


const ProductGrid = () => {

    const containerVariants = {
        hidden: {opacity: 0},
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
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {products.map(product => (
                    <ProductCard {...product} />
                ))}
            </motion.div>
        </div>
    );
};

export default ProductGrid;
