import React from 'react';

const Categories = () => {
  const categories = [
    { name: 'Engine Parts', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=200&q=80' },
    { name: 'Brake Pads', img: 'https://images.unsplash.com/photo-1632220199727-b50a04944b02?auto=format&fit=crop&w=200&q=80' },
    { name: 'Suspension', img: 'https://images.unsplash.com/photo-1536640712-4d4c36ef0e52?auto=format&fit=crop&w=200&q=80' },
    { name: 'Filters', img: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=200&q=80' },
    { name: 'Batteries', img: 'https://images.unsplash.com/photo-1620050857367-5d2ea61b4bd1?auto=format&fit=crop&w=200&q=80' },
    { name: 'Fluids & Oil', img: 'https://images.unsplash.com/photo-1615900119312-2acd3a71f3ed?auto=format&fit=crop&w=200&q=80' },
  ];

  return (
    <section className="py-16 container mx-auto px-4 lg:px-8">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Browse Categories</h2>
        <a href="#" className="text-blue-600 font-semibold hover:underline">View All</a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50 overflow-hidden flex items-center justify-center">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="font-medium text-slate-800 text-sm">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;