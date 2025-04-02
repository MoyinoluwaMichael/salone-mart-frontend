import React from 'react';
import { Heart } from 'lucide-react';

const WhishlistTab = () => {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Your Wishlist</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                            <div className="relative h-48 bg-gray-100">
                                <div className="absolute top-2 right-2">
                                    <button className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300">
                                        <Heart size={18} fill="currentColor" />
                                    </button>
                                </div>
                                <div className="h-full w-full flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-medium text-lg mb-1 truncate">Product Name {index + 1}</h3>
                                <p className="text-gray-500 mb-2 text-sm">Category</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-lg">${(29.99 + (index * 10)).toFixed(2)}</p>
                                    <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-md hover:from-blue-700 hover:to-green-700 transition-colors duration-300 text-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhishlistTab;
