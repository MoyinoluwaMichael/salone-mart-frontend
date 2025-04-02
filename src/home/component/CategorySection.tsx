import React, { useEffect, useState, useRef } from "react";
import {
    CATEGORIES_DATA_TYPE,
    CATEGORY_DETAILS,
    ProductCategory
} from "@/product/productService";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

const CategorySection = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);

    const placeholderIcons = [
        "electronic-devices", "fashion", "home-appliances",
        "health-beauty", "groceries", "sports", "toys",
        "books", "automotive", "garden"
    ];

    const categories = Object.values(CATEGORIES_DATA_TYPE);

    // Simulate data loading and set isLoading to false
    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkScroll = () => {
            if (containerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
                setShowLeftScroll(scrollLeft > 0);
                setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            checkScroll();
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            const newScrollLeft = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const getPlaceholderImage = (category: ProductCategory, index: number) => {
        // First try to use the category's icon if available
        if (category.icon) {
            return category.icon;
        }

        // Fall back to placeholder icons with proper path
        return `/assets/icons/${placeholderIcons[index % placeholderIcons.length]}.png`;
    };

    return (
        <section className="py-10 px-4 relative bg-gradient-to-r from-gray-50 to-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                        Shop By Category
                    </h2>
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium"
                    >
                        View All Categories
                        <ArrowRight size={16} className="ml-1" />
                    </a>
                </div>

                {/* Category Scroll Controls */}
                <div className="relative">
                    {showLeftScroll && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-blue-50 transition-colors border border-gray-100"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} className="text-blue-600" aria-hidden="true"/>
                        </button>
                    )}

                    {showRightScroll && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-blue-50 transition-colors border border-gray-100"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} className="text-blue-600" aria-hidden="true"/>
                        </button>
                    )}

                    {/* Loading state */}
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow animate-pulse h-32"></div>
                            ))}
                        </div>
                    ) : (
                        <div
                          ref={containerRef}
                          className="flex overflow-x-auto gap-4 py-4 scrollbar-hide scroll-smooth"
                        >
                          {categories.map((category, index) => {
                            const isActive = activeCategory === index;
                            const categoryDetails = CATEGORY_DETAILS[category];

                            return (
                              <div
                                key={index}
                                className="flex-shrink-0 w-36 sm:w-40 md:w-44"
                                onMouseEnter={() => setActiveCategory(index)}
                                onMouseLeave={() => setActiveCategory(null)}
                              >
                                <a
                                  href="#"
                                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-4 h-full border-2 border-transparent
                                  ${isActive ? 'border-blue-500 scale-105' : 'hover:border-green-400'}`}
                                >
                                  {/* Image Container */}
                                  <div
                                    className={`w-16 h-16 rounded-full overflow-hidden mb-3 bg-gradient-to-r from-blue-100 to-green-100 p-1 flex items-center justify-center transition-transform duration-300
                                    ${isActive ? 'scale-110 rotate-6' : ''}`}
                                  >
                                    <img
                                      src={getPlaceholderImage(categoryDetails, index)}
                                      alt={categoryDetails.description}
                                      className="w-full h-full object-cover rounded-full"
                                      onError={(e) => {
                                        // If image fails to load, set a fallback
                                        (e.target as HTMLImageElement).src = `/assets/icons/placeholder.png`;
                                      }}
                                    />
                                  </div>

                                  {/* Category Description */}
                                  <span className="font-medium text-gray-800 transition-colors duration-300">
                                    {categoryDetails.description}
                                  </span>

                                  {/* "Explore" Text */}
                                  <span
                                    className={`text-xs text-gray-500 mt-1 max-h-0 overflow-hidden transition-all duration-300
                                    ${isActive ? 'max-h-10 opacity-100' : 'opacity-0'}`}
                                  >
                                    Explore &rarr;
                                  </span>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                    )}
                </div>

                {/* Feature Categories */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                        <h3 className="text-xl font-bold mb-2">Featured Electronics</h3>
                        <p className="text-blue-100 mb-4">Discover the latest tech products with amazing deals</p>
                        <a href="#" className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
                            Shop Now <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                        <h3 className="text-xl font-bold mb-2">Fashion Collection</h3>
                        <p className="text-green-100 mb-4">Explore trending styles and outfits for every occasion</p>
                        <a href="#" className="inline-flex items-center bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-50 transition-colors">
                            Shop Now <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
