import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import ProductCard from '@/product/productdetail/components/ProductCard';
import {mapProductToCardProps, Product, searchProducts} from "@/product/productService";
import {AppPageResponse} from "@/utils/apputils";


const ProductGrid = () => {

    const [products, setProducts] = React.useState<Product[] | null>(null);
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fetchProducts = async () => {
        try {
            const response: AppPageResponse<Product> = await searchProducts(6);
            setProducts(response.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


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
                {products?.map(product => (
                    <ProductCard product={mapProductToCardProps(product)} />
                ))}
            </motion.div>
        </div>
    );
};

export default ProductGrid;
