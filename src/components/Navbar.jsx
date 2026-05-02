import React from 'react';
import { SearchIcon, CartIcon, UserIcon, MenuIcon } from './Icons';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar */}
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-slate-700 hover:text-blue-600 transition-colors">
            <MenuIcon />
          </button>
          <a href="/" className="text-3xl font-extrabold tracking-tight text-slate-900">
            BIL<span className="text-blue-600">TEK</span>
          </a>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-12 relative">
          <select className="absolute left-0 top-0 h-full bg-slate-100 border-r border-slate-300 px-4 text-sm text-slate-600 rounded-l-full outline-none focus:ring-2 focus:ring-blue-600">
            <option>All Categories</option>
            <option>Engine Parts</option>
            <option>Brakes</option>
          </select>
          <input 
            type="text" 
            placeholder="Search by part name, brand or OEM code..." 
            className="w-full pl-36 pr-12 py-3 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-600 border border-transparent focus:border-transparent transition-all"
          />
          <button className="absolute right-0 top-0 h-full px-5 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors">
            <SearchIcon />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-slate-700">
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <UserIcon />
            <span className="hidden lg:block text-sm font-medium">Sign In</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors relative">
            <div className="relative">
              <CartIcon />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </div>
            <span className="hidden lg:block text-sm font-medium">$124.00</span>
          </button>
        </div>
      </div>

      {/* Category Menu (Desktop) */}
      <div className="hidden lg:block border-t border-slate-100 bg-white">
        <div className="container mx-auto px-8 flex gap-8">
          {['Tires & Wheels', 'Engine Parts', 'Brake System', 'Suspension', 'Oil & Fluids', 'Accessories', 'Special Offers'].map((item, idx) => (
            <a key={idx} href="#" className="py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-b-2 border-blue-600 transition-all">
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;