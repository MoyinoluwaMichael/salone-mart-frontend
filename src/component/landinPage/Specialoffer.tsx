import React from 'react'


const SpecialOffers = () => {
  const offers = [
    {
      title: 'Flash Sale',
      description: 'Up to 50% off on selected items',
      image:
        'https://images.unsplash.com/photo-1611243705491-5e77c3c3e1e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      backgroundColor: 'bg-red-100',
      textColor: 'text-red-800',
      buttonColor: 'bg-red-600',
      endTime: '2023-07-15T23:59:59',
    },
    {
      title: 'Free Shipping',
      description: 'On orders over $50',
      image:
        'https://images.unsplash.com/photo-1586784029379-a4d9c7e5d1e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      backgroundColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      buttonColor: 'bg-blue-600',
    },
    {
      title: 'New Arrivals',
      description: 'Check out the latest products',
      image:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      backgroundColor: 'bg-green-100',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-600',
    },
  ]
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden shadow-md ${offer.backgroundColor}`}
          >
            <div className="h-40 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className={`text-xl font-bold ${offer.textColor} mb-2`}>
                {offer.title}
              </h3>
              <p className="text-gray-700 mb-4">{offer.description}</p>
              {offer.endTime && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Ends in:</p>
                  <div className="flex space-x-2 mt-1">
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="text-lg font-bold">02</span>
                      <p className="text-xs text-gray-500">Days</p>
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="text-lg font-bold">18</span>
                      <p className="text-xs text-gray-500">Hours</p>
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="text-lg font-bold">45</span>
                      <p className="text-xs text-gray-500">Mins</p>
                    </div>
                  </div>
                </div>
              )}
              <a
                href="#"
                className={`${offer.buttonColor} text-white py-2 px-4 rounded font-medium inline-block hover:opacity-90 transition-opacity`}
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


export default SpecialOffers;