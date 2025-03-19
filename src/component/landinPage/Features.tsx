import React, { useState } from 'react';
import {
    TruckIcon,
    CreditCardIcon,
    RotateCcwIcon,
    HeadphonesIcon,
} from 'lucide-react';

const Features = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const features = [
        {
            icon: <TruckIcon size={32} />,
            title: 'Free Delivery',
            description: 'Free shipping on orders over $50',
            gradientFrom: 'from-blue-600',
            gradientTo: 'to-blue-400',
            lightBg: 'bg-blue-50',
        },
        {
            icon: <CreditCardIcon size={32} />,
            title: 'Secure Payment',
            description: 'Multiple secure payment methods',
            gradientFrom: 'from-green-600',
            gradientTo: 'to-green-400',
            lightBg: 'bg-green-50',
        },
        {
            icon: <RotateCcwIcon size={32} />,
            title: 'Easy Returns',
            description: '15-day return policy',
            gradientFrom: 'from-blue-500',
            gradientTo: 'to-green-500',
            lightBg: 'bg-blue-50',
        },
        {
            icon: <HeadphonesIcon size={32} />,
            title: '24/7 Support',
            description: 'Customer support available anytime',
            gradientFrom: 'from-green-500',
            gradientTo: 'to-blue-500',
            lightBg: 'bg-green-50',
        },
    ];

    return (
        <section className="py-16 border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-12 text-center bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                    Why Shop With Us
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-500 transform ${
                                hoveredIndex === index ? 'scale-105 shadow-lg' : ''
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Animated Icon Container */}
                            <div
                                className={`mb-5 p-4 rounded-full ${feature.lightBg} relative overflow-hidden transition-all duration-500 ${
                                    hoveredIndex === index ? 'shadow-md' : ''
                                }`}
                            >
                                {/* Animated background gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradientFrom} ${feature.gradientTo} opacity-0 transition-opacity duration-500 ${
                                        hoveredIndex === index ? 'opacity-20' : ''
                                    }`}
                                ></div>

                                {/* Icon with color transition */}
                                <div className={`transition-colors duration-500 ${
                                    hoveredIndex === index
                                        ? 'text-gradient bg-gradient-to-r bg-clip-text text-transparent ' + feature.gradientFrom + ' ' + feature.gradientTo
                                        : 'text-gray-700'
                                }`}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title with animated underline */}
                            <div className="relative">
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <div
                                    className={`h-0.5 bg-gradient-to-r ${feature.gradientFrom} ${feature.gradientTo} w-0 mx-auto transition-all duration-500 ${
                                        hoveredIndex === index ? 'w-full' : ''
                                    }`}
                                ></div>
                            </div>

                            {/* Description with fade-in effect */}
                            <p
                                className={`text-gray-600 mt-2 transition-all duration-500 ${
                                    hoveredIndex === index ? 'opacity-100' : 'opacity-80'
                                }`}
                            >
                                {feature.description}
                            </p>

                            {/* Learn More Link - appears on hover */}
                            <a
                                href="#"
                                className={`mt-3 text-sm font-medium bg-gradient-to-r ${feature.gradientFrom} ${feature.gradientTo} bg-clip-text text-transparent transition-all duration-500 transform ${
                                    hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                                }`}
                            >
                                Learn More
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
