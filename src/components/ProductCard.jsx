import React from 'react';
import { Link } from 'react-router-dom'; // 🚀 Link import kiya
import { StarIcon } from './Icons';
import { Heart } from 'lucide-react';
import useCartStore from '../store/useCartStore'; 
import useWishlistStore from '../store/useWishlistStore';

const ProductCard = ({ product, buttonStyle = "full" }) => {
  const addToCart = useCartStore(state => state.addToCart); 
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 group hover:shadow-2xl hover:border-blue-200 transition-all duration-300 relative flex flex-col h-full overflow-hidden">
      
      {/* 🌟 Wishlist Button */}
      <button 
        onClick={(e) => {
          e.preventDefault(); 
          toggleWishlist(product);
        }}
        className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all cursor-pointer group/heart border border-slate-100"
      >
        <Heart 
          size={18} 
          className={`transition-colors duration-300 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-slate-400 group-hover/heart:text-red-500'}`} 
        />
      </button>

      {/* Sale Badge */}
      {product.badge && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-sm">
          {product.badge}
        </span>
      )}
      
      {/* 🔗 IMAGE LINK: Ab image pe click hoga */}
      <Link to={`/product/${product.id}`} className="h-48 w-full mb-4 relative overflow-hidden bg-slate-50/50 rounded-xl block cursor-pointer">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out p-4" />
      </Link>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(star => <StarIcon key={star} filled={star <= product.rating} />)}
          <span className="text-[11px] font-bold text-slate-400 ml-1">({product.reviews})</span>
        </div>
        
        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1.5">{product.brand}</p>
        
        {/* 🔗 NAME LINK: Ab naam pe click hoga */}
        <Link to={`/product/${product.id}`} className="font-bold text-slate-800 text-sm mb-4 leading-snug group-hover:text-blue-600 transition-colors flex-1 cursor-pointer block">
          {product.name}
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-black text-slate-900">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
          {product.oldPrice && <span className="text-xs font-bold text-slate-400 line-through">₹{parseFloat(product.oldPrice).toLocaleString('en-IN')}</span>}
        </div>

        {/* Add to Cart Button */}
        {buttonStyle === "full" ? (
          <button 
            onClick={() => addToCart(product)} 
            className="w-full py-3 bg-slate-100 text-slate-700 font-extrabold text-sm rounded-xl hover:bg-blue-600 hover:text-white transition-all hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 cursor-pointer"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-auto">
            <span className="text-xs text-green-600 font-bold">In Stock</span>
            <button 
              onClick={() => addToCart(product)} 
              className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;