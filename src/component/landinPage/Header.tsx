import React, { useState, useEffect, useRef } from 'react';
import { applicationConstants } from '@/constant/data';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  HelpCircle,
  Menu,
  ChevronDown,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import {
  CATEGORIES_DATA_TYPE,
  CATEGORY_DETAILS
} from "@/service/productService";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = Object.values(CATEGORIES_DATA_TYPE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Focus search input when search is opened
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
      <header className="bg-white w-full shadow-sm">
        {/* Top bar - Minimal height on mobile */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 text-white py-1 md:py-2">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <a href={`tel:${applicationConstants.phone}`} className="hover:text-yellow-300 transition-colors flex items-center">
                  <Phone size={14} className="mr-1" />
                  <span>{applicationConstants.phone}</span>
                </a>
                <a href={`mailto:${applicationConstants.email}`} className="hover:text-yellow-300 transition-colors flex items-center">
                  <Mail size={14} className="mr-1" />
                  <span>{applicationConstants.email}</span>
                </a>
              </div>
              {/* Mobile - Keep it minimal */}
              <div className="md:hidden text-xs flex items-center">
                <span className="font-medium">FREE DELIVERY over $50</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="hover:text-yellow-300 transition-colors hidden md:block">
                  Sell on {applicationConstants.name}
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors flex items-center text-xs md:text-sm">
                  <HelpCircle size={14} className="mr-1" /> Help
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Menu button */}
            <div className="flex items-center">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden flex items-center text-blue-700 mr-2 p-1"
                  aria-label="Toggle menu"
              >
                <Menu size={22} />
              </button>
              <a href="#" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                {applicationConstants.name}
              </span>
              </a>
            </div>

            {/* Search bar - Desktop only */}
            <div className="hidden md:flex w-full md:w-1/2 mx-4">
              <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search products, brands and categories"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-r-md">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Mobile search button */}
            <div className="flex md:hidden items-center">
              <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-blue-700 p-1"
              >
                <Search size={22} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <a href="#" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User size={20} />
                <span className="text-xs mt-1 hidden md:block">Account</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
                <div className="relative">
                  <Heart size={20} />
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
                </div>
                <span className="text-xs mt-1 hidden md:block">Saved</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
                <div className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
                </div>
                <span className="text-xs mt-1 hidden md:block">Cart</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Categories navigation */}
        <div className="hidden md:block border-t border-gray-200">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-4 py-2">
              {categories.map((category, index) => (
                  <li key={index}>
                    <a
                        href="#"
                        className="block px-3 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {CATEGORY_DETAILS[category].description}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile search page */}
        {isSearchOpen && (
            <div className="fixed inset-0 bg-white z-50 md:hidden animate-fadeIn">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Search</h2>
                  <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-gray-700 p-1"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="relative w-full">
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search products, brands and categories"
                        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-r-md">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">POPULAR SEARCHES</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Phones', 'Electronics', 'Fashion', 'Home', 'Groceries'].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {item}
                        </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">CATEGORIES</h3>
                  <ul className="space-y-2">
                    {categories.slice(0, 5).map((category, index) => (
                        <li key={index}>
                          <a href="#" className="flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-100">
                            <span>{CATEGORY_DETAILS[category].description}</span>
                            <ChevronDown size={16} />
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
        )}

        {/* Mobile side menu */}
        {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fadeIn">
              <div
                  ref={menuRef}
                  className="bg-white w-4/5 h-full shadow-lg py-2 px-4 animate-slideRight overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                  <span className="text-lg font-medium">Categories</span>
                  <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-1">
                  {categories.map((category, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0">
                        <button
                            onClick={() => setActiveCategoryId(activeCategoryId === category.id ? null : category.id)}
                            className="w-full flex items-center justify-between py-3 text-gray-800 hover:text-blue-600 transition-colors"
                        >
                          <span>{CATEGORY_DETAILS[category].description}</span>
                          <ChevronDown
                              size={16}
                              className={`transform transition-transform duration-300 ${activeCategoryId === category.id ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {activeCategoryId === category.id && (
                            <div className="pl-4 pb-2 animate-slideDown">
                              {[1, 2, 3].map((subItem) => (
                                  <a
                                      key={subItem}
                                      href="#"
                                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                                  >
                                    {CATEGORY_DETAILS[category].description} Subcategory {subItem}
                                  </a>
                              ))}
                            </div>
                        )}
                      </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  {categories.length === 0 ? (
                      <p className="text-gray-500">Loading categories...</p>
                  ) : (
                      categories.map((category, index) => (
                          <a key={index} href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                            {CATEGORY_DETAILS[category].description}
                          </a>
                      ))
                  )}
                  <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    Help Center
                  </a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    Sell on {applicationConstants.name}
                  </a>
                  <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
        )}
      </header>
  );
};

export default Header;
