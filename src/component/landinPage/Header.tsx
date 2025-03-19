import React, { useState, useEffect } from 'react';
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  HelpCircleIcon,
  MenuIcon,
  ChevronDownIcon,
} from 'lucide-react';
import { fetchProductCategories, ProductCategory } from "../../service/productService.ts";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchProductCategories();
        setCategories(response.productCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
      <header className="bg-white shadow-md">
        {/* Top bar */}
        <div className="bg-orange-500 text-white text-sm py-1">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="hidden md:flex space-x-4">
              <a href="#" className="hover:underline">
                Sell on Salone Mart
              </a>
              <a href="#" className="hover:underline flex items-center">
                <HelpCircleIcon size={16} className="mr-1" /> Help
              </a>
            </div>
            <div className="text-center md:text-right w-full md:w-auto">
              FREE DELIVERY on orders over $50
            </div>
          </div>
        </div>
        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="text-2xl font-bold text-orange-500">
                Salone Mart
              </a>
            </div>
            {/* Search bar */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                    type="text"
                    placeholder="Search products, brands and categories"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-md">
                  <SearchIcon size={20} />
                </button>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a
                  href="#"
                  className="flex flex-col items-center text-gray-700 hover:text-orange-500"
              >
                <UserIcon size={20} />
                <span className="text-xs mt-1">Account</span>
              </a>
              <a
                  href="#"
                  className="flex flex-col items-center text-gray-700 hover:text-orange-500"
              >
                <HeartIcon size={20} />
                <span className="text-xs mt-1">Saved</span>
              </a>
              <a
                  href="#"
                  className="flex flex-col items-center text-gray-700 hover:text-orange-500"
              >
                <div className="relative">
                  <ShoppingCartIcon size={20} />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
                </div>
                <span className="text-xs mt-1">Cart</span>
              </a>
            </div>
          </div>
        </div>

        {/* Categories navigation */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="md:hidden py-2">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center text-gray-700"
              >
                <MenuIcon size={20} className="mr-2" />
                <span className=''>Categories</span>
                <ChevronDownIcon size={16} className="ml-1" />
              </button>
              {isMenuOpen && (
                  <div className="mt-2 bg-white border rounded shadow-lg py-2">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {category.description}
                        </a>
                    ))}
                  </div>
              )}
            </div>
            <nav className="hidden md:flex py-3 overflow-x-auto md:justify-center">
              {categories.map((category, index) => (
                  <a
                      key={index}
                      href="#"
                      className="whitespace-nowrap px-4 text-gray-700 hover:text-orange-500 text-sm font-medium"
                  >
                    {category.description}
                  </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;
