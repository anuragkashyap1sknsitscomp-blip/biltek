import React from 'react';

const PromoBanner = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl overflow-hidden relative shadow-xl">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-50 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        
        <div className="relative z-10 p-10 lg:p-16 flex flex-col items-start max-w-xl">
          <div className="bg-red-500 text-white font-bold px-3 py-1 rounded mb-4 inline-block">Flash Sale - 35% OFF</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Upgrade Your Ride Today.</h2>
          <p className="text-blue-100 mb-8">Get massive discounts on high-performance wheels and suspension kits. Limited time offer.</p>
          <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-slate-100 transition-colors">
            Claim Discount
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;