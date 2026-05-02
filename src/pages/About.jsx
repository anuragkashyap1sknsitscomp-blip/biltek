import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Wrench, Users, Target, Zap, ArrowRight, TrendingUp, Award, Box } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen overflow-hidden selection:bg-blue-200">
      
      {/* 1. HERO SECTION (Premium Brand Focus) */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm mb-8">
            <Award size={16} /> India's Fastest Growing Auto Parts Network
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            Driven by Quality. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Powered by Technology.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
            We are revolutionizing the automotive aftermarket industry. By combining cutting-edge e-commerce technology with a massive inventory of OEM and performance parts, we make car maintenance smarter, faster, and more reliable.
          </p>
        </div>
      </section>

      {/* 2. COMPANY STATS (Glassmorphism UI) */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl -mt-10 mb-24 relative z-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-900/20 text-white relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center relative z-10 divide-x-0 md:divide-x-2 divide-slate-800">
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-black text-white">100K+</h3>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Orders Fulfilled</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-black text-white">15K+</h3>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Genuine Parts</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-black text-white">4.8/5</h3>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Customer Rating</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-black text-white">24hrs</h3>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Average Dispatch</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY SECTION */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl mb-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">The Gearheads Behind The Code.</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              It started with a simple frustration: finding the right, authentic auto part locally was too hard, and dealership prices were too high. We realized the automotive aftermarket was stuck in the past.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              So, we built this platform. A place where mechanics, car enthusiasts, and daily drivers could find exact-fit components with a click. Today, we partner directly with top-tier global manufacturers to bypass middlemen, ensuring you get 100% genuine parts at unbeatable prices.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="text-blue-600" size={32} />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xl">Our Vision for 2026</p>
                <p className="text-slate-500">To be the default homepage for every car owner's needs.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 md:h-64 bg-slate-200 rounded-[2rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=600&auto=format&fit=crop" alt="Warehouse" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="h-48 md:h-64 bg-slate-200 rounded-[2rem] overflow-hidden mt-8">
                <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600&auto=format&fit=crop" alt="Mechanic" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS VALUES (B2C & B2B Trust) */}
      <section className="bg-white py-24 border-y border-slate-100 mb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The Pillars of Our Business</h2>
            <p className="text-slate-500 text-lg">We operate on strict core values that prioritize our customers' safety, time, and budget.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] hover:bg-blue-50 transition-colors duration-300 group">
              <ShieldCheck size={40} className="text-slate-400 group-hover:text-blue-600 mb-6 transition-colors" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">OEM & OES Standards</h3>
              <p className="text-slate-600">We strictly source Original Equipment Manufacturer parts to guarantee your vehicle performs exactly as it left the factory.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[2rem] hover:bg-blue-50 transition-colors duration-300 group">
              <Box size={40} className="text-slate-400 group-hover:text-blue-600 mb-6 transition-colors" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Warehousing</h3>
              <p className="text-slate-600">Our AI-driven inventory system ensures we always have the fastest-moving parts in stock, minimizing your wait time.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[2rem] hover:bg-blue-50 transition-colors duration-300 group">
              <Users size={40} className="text-slate-400 group-hover:text-blue-600 mb-6 transition-colors" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">B2B & Workshop Supply</h3>
              <p className="text-slate-600">We don't just serve individuals; we are the trusted supply chain partner for hundreds of local garages and service centers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (Premium Banner) */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl mb-24">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Ready to experience the new standard of auto parts?</h2>
            <p className="text-blue-200 text-lg mb-10">Search by your vehicle make and model, and let our smart-fitment technology find exactly what you need.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold text-lg px-10 py-5 rounded-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            >
              Explore Catalog <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;