import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, ShoppingBag, TrendingUp } from 'lucide-react';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState<any>({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const offers = [
    {
      title: 'Flash Sale',
      description: 'Up to 50% off on selected items',
      image:
          'https://images.unsplash.com/photo-1611243705491-5e77c3c3e1e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-red-600',
      textColor: 'text-red-700',
      accentColor: 'bg-red-500',
      lightBg: 'bg-red-50',
      icon: <Clock size={24} />,
      endTime: '2025-03-29T23:59:59',
    },
    {
      title: 'Free Shipping',
      description: 'On orders over $50. Limited time offer!',
      image:
          'https://images.unsplash.com/photo-1586784029379-a4d9c7e5d1e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-700',
      textColor: 'text-blue-700',
      accentColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      icon: <ShoppingBag size={24} />,
    },
    {
      title: 'New Arrivals',
      description: 'Check out our latest spring collection',
      image:
          'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-600',
      textColor: 'text-green-700',
      accentColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      icon: <TrendingUp size={24} />,
    },
  ];

  // Memoize the offers array to prevent re-rendering
  const offersEndTimes = offers
      .map(offer => offer.endTime)
      .filter(Boolean);

  // Calculate time remaining for countdown
  useEffect(() => {
    const calculateTimeLeft = () => {
      const timeLeftData: any = {};

      offers.forEach((offer, index) => {
        if (offer.endTime) {
          const difference = new Date(offer.endTime).getTime() - new Date().getTime();

          if (difference > 0) {
            timeLeftData[index] = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
            };
          }
        }
      });

      setTimeLeft(timeLeftData);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [offersEndTimes.join(',')]); // Only depend on the end times

  return (
      <section className="py-12 px-4 relative">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
              Special Offers
            </h2>
            <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium"
            >
              View All Offers
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
                <div
                    key={index}
                    className={`rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                        hoveredIndex === index ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${offer.gradientFrom} ${offer.gradientTo} opacity-20 z-10`}></div>
                    <img
                        src={offer.image}
                        alt={offer.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                            hoveredIndex === index ? 'scale-110' : ''
                        }`}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <div className={`${offer.lightBg} ${offer.textColor} p-2 rounded-full`}>
                        {offer.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 border-t-4 ${offer.accentColor} bg-white`}>
                    <h3 className={`text-xl font-bold ${offer.textColor} mb-2 flex items-center`}>
                      {offer.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{offer.description}</p>

                    {/* Countdown Timer */}
                    {offer.endTime && timeLeft[index] && (
                        <div className="mb-5">
                          <p className={`text-sm font-medium ${offer.textColor} mb-2`}>Ends in:</p>
                          <div className="flex space-x-2">
                            <div className={`${offer.lightBg} px-3 py-2 rounded-lg text-center`}>
                        <span className={`text-lg font-bold ${offer.textColor}`}>
                          {String(timeLeft[index].days).padStart(2, '0')}
                        </span>
                              <p className="text-xs text-gray-600">Days</p>
                            </div>
                            <div className={`${offer.lightBg} px-3 py-2 rounded-lg text-center`}>
                        <span className={`text-lg font-bold ${offer.textColor}`}>
                          {String(timeLeft[index].hours).padStart(2, '0')}
                        </span>
                              <p className="text-xs text-gray-600">Hours</p>
                            </div>
                            <div className={`${offer.lightBg} px-3 py-2 rounded-lg text-center`}>
                        <span className={`text-lg font-bold ${offer.textColor}`}>
                          {String(timeLeft[index].minutes).padStart(2, '0')}
                        </span>
                              <p className="text-xs text-gray-600">Mins</p>
                            </div>
                            <div className={`${offer.lightBg} px-3 py-2 rounded-lg text-center`}>
                        <span className={`text-lg font-bold ${offer.textColor}`}>
                          {String(timeLeft[index].seconds).padStart(2, '0')}
                        </span>
                              <p className="text-xs text-gray-600">Secs</p>
                            </div>
                          </div>
                        </div>
                    )}

                    {/* Button with Animation */}
                    <a
                        href="#"
                        className={`bg-gradient-to-r ${offer.gradientFrom} ${offer.gradientTo} text-white py-2 px-6 rounded-lg font-medium inline-flex items-center group transition-all duration-300 hover:shadow-lg`}
                    >
                      Shop Now
                      <ArrowRight size={16} className={`ml-1 transform transition-transform duration-300 ${
                          hoveredIndex === index ? 'translate-x-1' : ''
                      }`} />
                    </a>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default SpecialOffers;
