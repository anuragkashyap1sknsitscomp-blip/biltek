import React from 'react';
import { Link } from 'react-router-dom';
import { HeartCrack, ArrowRight, Heart, Sparkles } from 'lucide-react';
import useWishlistStore from '../store/useWishlistStore';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const wishlistItems = useWishlistStore(state => state.wishlist);

  // 💔 EMPTY STATE - Ultra Premium Look
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#f8fafc] flex flex-col items-center justify-center py-20 px-4 font-sans">
        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-lg w-full text-center relative overflow-hidden group">
          
          {/* Ambient Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-100/50 rounded-full blur-[80px] -z-10 group-hover:bg-red-200/50 transition-colors duration-700"></div>
          
          <div className="w-28 h-28 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-red-200/50 relative">
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 border-2 border-red-400 rounded-full animate-ping opacity-20"></div>
            <HeartCrack size={48} className="text-red-500 drop-shadow-md" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Empty Wishlist</h2>
          <p className="text-slate-500 font-medium mb-10 text-sm md:text-base leading-relaxed px-4">
            Looks like you haven't saved any parts yet. Start exploring our premium collection and build your dream ride!
          </p>
          
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 bg-slate-900 text-white font-extrabold px-8 py-4 rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Explore Parts Collection
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  // ❤️ FILLED WISHLIST STATE - Beautiful Grid & Header
  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 lg:py-16 pb-24 font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Premium Header Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          
          {/* Decorative Red Blur background element */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-red-100 p-2.5 rounded-xl text-red-500 shadow-inner">
                <Heart size={24} className="fill-red-500" />
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                My Wishlist
              </h1>
            </div>
            <p className="text-slate-500 font-medium flex items-center gap-2 mt-3">
              <Sparkles size={16} className="text-yellow-400" />
              You have <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{wishlistItems.length} premium items</span> saved for later.
            </p>
          </div>
          
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-white transition-colors bg-blue-50 px-6 py-3.5 rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 cursor-pointer border border-blue-100 hover:border-transparent group"
          >
            <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {wishlistItems.map((product) => (
            // FIX: Removed quotes from variables! It's {product} NOT "{product}"
            <ProductCard key={product.id} product={product} buttonStyle="full" />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;