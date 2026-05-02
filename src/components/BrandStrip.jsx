import React from 'react';

const BrandStrip = () => {
  const brands = ['BOSCH', 'BREMBO', 'CASTROL', 'MICHELIN', 'NGK', 'VALEO'];
  
  return (
    <div className="bg-white border-b border-slate-200 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Trusted by Top Brands</p>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, idx) => (
            <h3 key={idx} className="text-2xl font-black tracking-tighter text-slate-800 cursor-pointer hover:text-blue-600 transition-colors">
              {brand}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStrip;