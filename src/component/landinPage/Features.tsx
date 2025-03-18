import React from 'react'
import {
  TruckIcon,
  CreditCardIcon,
  RotateCcwIcon,
  HeadphonesIcon,
} from 'lucide-react'
 const Features = () => {
  const features = [
    {
      icon: <TruckIcon size={32} className="text-orange-500" />,
      title: 'Free Delivery',
      description: 'Free shipping on orders over $50',
    },
    {
      icon: <CreditCardIcon size={32} className="text-orange-500" />,
      title: 'Secure Payment',
      description: 'Multiple secure payment methods',
    },
    {
      icon: <RotateCcwIcon size={32} className="text-orange-500" />,
      title: 'Easy Returns',
      description: '15-day return policy',
    },
    {
      icon: <HeadphonesIcon size={32} className="text-orange-500" />,
      title: '24/7 Support',
      description: 'Customer support available anytime',
    },
  ]
  return (
    <section className="py-10 border-t border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features;
