import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../../product/productdetail/component/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CATEGORIES_DATA_TYPE,
  CATEGORY_DETAILS,
  mapProductToCardProps,
  Product, PRODUCT_LIST,
  ProductsResponse,
  searchProducts
} from "@/product/productService";
import {retrieveFromStorage} from "@/utils/storageservice";
import {ProductCardSkeleton} from "@/product/productdetail/component/ProductCardSkeleton";

// Define a union type for active category
type ActiveCategoryType = "all" | "new" | "discounted" | CATEGORIES_DATA_TYPE;


const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategoryType>("all");
  const [isInView, setIsInView] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>(() => []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const categories = Object.values(CATEGORIES_DATA_TYPE);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response: ProductsResponse = await searchProducts(6);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getFilteredProducts = (): Product[] => {
    if (activeCategory === "all") return products;
    if (activeCategory === "new") {
      return products.slice(0, 3);
    }
    if (activeCategory === "discounted") {
      return products.filter(product => product.discountedPrice && product.discountedPrice < product.price);
    }

    // Use type casting to ensure type safety
    return products.filter(product =>
        product.category.name === activeCategory as CATEGORIES_DATA_TYPE
    );
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
      categoryScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollCategoryRight = () => {
    if (categoryScrollRef.current && canScrollRight) {
      categoryScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollContainer = categoryScrollRef.current;
    if (scrollContainer) {
      updateScrollButtonsState();

      scrollContainer.addEventListener("scroll", updateScrollButtonsState);
      window.addEventListener("resize", updateScrollButtonsState);

      return () => {
        scrollContainer.removeEventListener("scroll", updateScrollButtonsState);
        window.removeEventListener("resize", updateScrollButtonsState);
      };
    }
  }, []);

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

  const filteredProducts = getFilteredProducts();
  const hasProducts = !loading && !error && filteredProducts.length > 0;
  const noProductsFound = !loading && !error && filteredProducts.length === 0;

  // Create an array of skeleton placeholders
  const skeletonArray = Array(4).fill(null).map((_, index) => (
      <div
          key={`skeleton-${index}`}
          className={`transition-all duration-500 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${Math.min(index * 100, 500)}ms` }}
      >
        <ProductCardSkeleton />
      </div>
  ));

  return (
      <section
          ref={sectionRef}
          className={`py-8 px-3 md:py-10 md:px-6 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          aria-label="Featured Products Section"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col mb-6 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent pb-1 relative group">
              Featured Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-700 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </h2>

            {/* Category scroll controls */}
            <div className="flex items-center space-x-2">
              <button
                  onClick={scrollCategoryLeft}
                  disabled={!canScrollLeft}
                  className={`flex-shrink-0 p-1.5 rounded-full shadow-md transition-colors ${
                      canScrollLeft
                          ? "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Scroll categories left"
              >
                <ChevronLeft size={18} />
              </button>

              <div
                  ref={categoryScrollRef}
                  className="flex space-x-2 overflow-x-auto scrollbar-hide py-1 flex-grow"
                  role="tablist"
                  aria-label="Product categories"
              >
                <button
                    onClick={() => setActiveCategory("all")}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        activeCategory === "all"
                            ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    role="tab"
                    aria-selected={activeCategory === "all"}
                    aria-controls="all-products-panel"
                >
                  All Products
                </button>

                <button
                    onClick={() => setActiveCategory("new")}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        activeCategory === "new"
                            ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    role="tab"
                    aria-selected={activeCategory === "new"}
                    aria-controls="new-products-panel"
                >
                  New Arrivals
                </button>

                <button
                    onClick={() => setActiveCategory("discounted")}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        activeCategory === "discounted"
                            ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    role="tab"
                    aria-selected={activeCategory === "discounted"}
                    aria-controls="discounted-products-panel"
                >
                  On Sale
                </button>

                {categories.map((category) => (
                    <button
                        key={CATEGORY_DETAILS[category].id}
                        onClick={() =>
                            setActiveCategory(category)
                        }
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                            activeCategory === category
                                ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        role="tab"
                        aria-selected={activeCategory === category}
                        aria-controls={`${category.toLowerCase()}-products-panel`}
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
                          ? "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Scroll categories right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* View All link */}
          <div className="flex justify-end mb-4">
            <a
                href="/products"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center group"
                aria-label="View all products"
            >
              View all
              <ChevronRight
                  size={16}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* Products grid with skeletons during loading */}
          <div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4"
              role="region"
              aria-label={`${activeCategory} products`}
              id={`${activeCategory}-products-panel`}
          >
            {loading ? (
                // Show skeletons when loading
                skeletonArray
            ) : hasProducts ? (
                // Show actual products when loaded
                filteredProducts.map((product: Product, index: number) => (
                    <div
                        key={product.id}
                        className={`transition-all duration-500 ${
                            isInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                        style={{ transitionDelay: `${Math.min(index * 100, 500)}ms` }}
                    >
                      <ProductCard product={mapProductToCardProps(product)} />
                    </div>
                ))
            ) : null}
          </div>

          {/* Error state */}
          {error && (
              <div className="text-center py-12 text-red-500" aria-live="assertive">
                <p>{error}</p>
                <button
                    onClick={fetchProducts}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
          )}

          {/* Empty state when no products match filter */}
          {noProductsFound && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center" aria-live="polite">
                <div className="text-gray-400 mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 mx-auto mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try changing your filter or check back later for new items.
                  </p>
                </div>
                <button
                    onClick={() => setActiveCategory("all")}
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
