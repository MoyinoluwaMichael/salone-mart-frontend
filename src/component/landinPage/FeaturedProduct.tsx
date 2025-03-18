import React from 'react'
import ProductCard from './ProductCard'


const FeaturedProducts = () => {
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
    },
    {
      id: 3,
      name: 'Portable Power Bank 10000mAh',
      price: 29.99,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isNew: true,
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
    },
    {
      id: 6,
      name: 'Laptop Backpack with USB Port',
      price: 39.99,
      rating: 4.6,
      image:
        'https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isNew: true,
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
    },
    {
      id: 8,
      name: 'Smart Home Security Camera',
      price: 79.99,
      rating: 4.4,
      image:
        'https://images.unsplash.com/photo-1580483046931-628c4d4de926?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isNew: true,
    },
  ]
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <a href="#" className="text-orange-500 hover:underline">
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}


export default FeaturedProducts;
