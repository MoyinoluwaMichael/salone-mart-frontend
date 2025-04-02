import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import images from "@/constant/images";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      image: images.landingPage.sale,
      title: "Big Sale Weekend",
      subtitle: "Up to 70% off on electronics",
      ctaText: "Shop Now",
    },
    {
      id: 2,
      image: images.landingPage.openshop,
      title: "New Fashion Collection",
      subtitle: "Get the latest trends at amazing prices",
      ctaText: "Discover",
    },
    {
      id: 3,
      image: images.landingPage.clothingShop,
      title: "Home Essentials",
      subtitle: "Everything you need for your home",
      ctaText: "Browse",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 py-4">
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full h-full relative">
                <div className=" absolute top-0 left-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-[#0000007a] bg-opacity-30 flex flex-col justify-center p-8 md:p-16">
                  <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-white text-lg md:text-xl mb-6">
                    {slide.subtitle}
                  </p>
                  <a
                    href="#"
                    className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium w-fit hover:bg-orange-600 transition-colors"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon size={24} className="text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next slide"
          >
            <ChevronRightIcon size={24} className="text-black" />
          </button>
          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index
                    ? "bg-orange-500"
                    : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
