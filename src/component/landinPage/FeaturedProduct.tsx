import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  CATEGORIES_DATA_TYPE,
  CATEGORY_DETAILS
} from "@/service/productService";

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isInView, setIsInView] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Categories for filtering
  const categories = Object.values(CATEGORIES_DATA_TYPE);

  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.5,
      image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      discount: 25,
      category: 'electronics',
    },
    {
      id: 2,
      name: 'Smart Watch with Fitness Tracker',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.2,
      image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      discount: 20,
      category: 'electronics',
    },
    {
      id: 3,
      name: 'Portable Power Bank 10000mAh',
      price: 29.99,
      rating: 4.7,
      image:
          'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isNew: true,
      category: 'electronics',
    },
    {
      id: 4,
      name: 'Smartphone with 128GB Storage',
      price: 399.99,
      originalPrice: 449.99,
      rating: 4.8,
      image:
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      discount: 10,
      category: 'electronics',
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.0,
      image:
          'https://images.unsplash.com/photo-1583863788434-e62bd6bf5aab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      discount: 30,
      category: 'electronics',
    },
    {
      id: 6,
      name: 'Laptop Backpack with USB Port',
      price: 39.99,
      rating: 4.6,
      image:
          'https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isNew: true,
      category: 'accessories',
    },
    {
      id: 7,
      name: 'Bluetooth Wireless Speaker',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.3,
      image:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      discount: 15,
      category: 'electronics',
    },
    {
      id: 8,
      name: 'Smart Home Security Camera',
      price: 79.99,
      rating: 4.4,
      image:
          'https://images.unsplash.com/photo-1580483046931-628c4d4de926?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isNew: true,
      category: 'electronics',
    },
  ];

  const getFilteredProducts = () => {
    if (activeCategory === 'all') return products;
    if (activeCategory === 'new') return products.filter(product => product.isNew);
    if (activeCategory === 'discounted') return products.filter(product => product.discount);
    return products.filter(product => product.category === activeCategory);
  };

  const updateScrollButtonsState = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;

      setCanScrollLeft(scrollLeft > 0);

      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scrollCategoryLeft = () => {
    if (categoryScrollRef.current && canScrollLeft) {
      categoryScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollCategoryRight = () => {
    if (categoryScrollRef.current && canScrollRight) {
      categoryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = categoryScrollRef.current;
    if (scrollContainer) {
      updateScrollButtonsState();

      scrollContainer.addEventListener('scroll', updateScrollButtonsState);

      window.addEventListener('resize', updateScrollButtonsState);

      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollButtonsState);
        window.removeEventListener('resize', updateScrollButtonsState);
      };
    }
  }, []);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        },
        { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
      <section
          ref={sectionRef}
          className={`py-8 px-3 md:py-10 md:px-6 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col mb-6 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent pb-1 relative group">
              Featured Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-700 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </h2>

            {/* Category scroll controls for mobile */}
            <div className="flex items-center space-x-2">
              <button
                  onClick={scrollCategoryLeft}
                  disabled={!canScrollLeft}
                  className={`flex-shrink-0 p-1.5 rounded-full shadow-md transition-colors ${
                      canScrollLeft
                          ? 'bg-white text-gray-700 hover:bg-gray-100 cursor-pointer'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll categories left"
              >
                <ChevronLeft size={18} />
              </button>

              <div
                  ref={categoryScrollRef}
                  className="flex space-x-2 overflow-x-auto scrollbar-hide py-1 flex-grow"
              >
                {categories.map((category) => (
                    <button
                        key={CATEGORY_DETAILS[category].id}
                        onClick={() => setActiveCategory(CATEGORY_DETAILS[category].name)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                            activeCategory === CATEGORY_DETAILS[category].name
                                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {CATEGORY_DETAILS[category].description}
                    </button>
                ))}
              </div>

              <button
                  onClick={scrollCategoryRight}
                  disabled={!canScrollRight}
                  className={`flex-shrink-0 p-1.5 rounded-full shadow-md transition-colors ${
                      canScrollRight
                          ? 'bg-white text-gray-700 hover:bg-gray-100 cursor-pointer'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll categories right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* View All link */}
          <div className="flex justify-end mb-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center group">
              View all
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* 2-column grid for mobile, 4-column for desktop */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {getFilteredProducts().map((product, index) => (
                <div
                    key={product.id}
                    className={`transition-all duration-500 ${
                        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard {...product} />
                </div>
            ))}
          </div>

          {/* Empty state when no products match filter */}
          {getFilteredProducts().length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500">Try changing your filter or check back later for new items.</p>
                </div>
                <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  View All Products
                </button>
              </div>
          )}
        </div>
      </section>
  );
};

export default FeaturedProducts;
