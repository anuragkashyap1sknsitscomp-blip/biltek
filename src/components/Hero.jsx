import React from 'react';

const Hero = () => {
  return (
    <section className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 font-semibold text-sm mb-6 border border-blue-500/30">
            Premium Automotive Parts
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Add Your Car. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Find Perfect Parts.
            </span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Discover a wide selection of top-quality OEM and aftermarket parts specifically designed for your vehicle's peak performance.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-600/30 transition-all">
              Shop Now
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm transition-all border border-white/20">
              Select Vehicle
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          {/* Using a clean product or engine image here */}
          <img 
            src="https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=800&q=80" 
            alt="Car Engine Parts" 
            className="rounded-2xl shadow-2xl object-cover h-[400px] w-full border border-slate-700/50"
          />
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-xl shadow-xl flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600 font-bold">100%</div>
            <div>
              <p className="font-bold text-sm">Genuine Parts</p>
              <p className="text-xs text-slate-500">Guaranteed Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;