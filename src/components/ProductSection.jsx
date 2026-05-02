import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title }) => {
  // Dummy data generated for context
  const products = [
    { id: 1, name: "Premium Synthetic Motor Oil 5W-30", brand: "CASTROL", price: 34.99, oldPrice: 45.00, discount: 22, reviews: 124, image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3ed?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Ceramic Brake Pads Set (Front & Rear)", brand: "BREMBO", price: 89.50, reviews: 89, image: "https://images.unsplash.com/photo-1632220199727-b50a04944b02?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "High Performance Spark Plugs x4", brand: "NGK", price: 24.00, oldPrice: 30.00, discount: 20, reviews: 342, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Halogen Headlight Bulbs Pair", brand: "OSRAM", price: 18.90, reviews: 56, image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <section className="py-12 container mx-auto px-4 lg:px-8">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <a href="#" className="text-blue-600 font-semibold hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;