import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. useNavigate import kiya
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const navigate = useNavigate(); // 2. navigate hook initialize kiya

  // Zustand store se data fetch kar rahe hain
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 150.00 : 0; 
  const tax = subtotal * 0.18; 
  const total = subtotal + shipping + tax;

  // 3. Checkout handle karne ke liye function
  const handleCheckout = () => {
    // Yahan aap chaho toh check kar sakte ho ki user logged in hai ya nahi
    // Agar sab theek hai, toh /checkout page par bhej do
    navigate('/checkout');
  };

  // 🛒 EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        {/* ... (Empty cart UI remains same) ... */}
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 max-w-lg w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10"></div>
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag size={40} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Your Cart is Empty</h2>
          <p className="text-slate-500 font-medium mb-8 text-sm md:text-base">
            Looks like you haven't added anything to your cart yet. Discover our premium auto parts and upgrade your ride today!
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900/30 transition-all group cursor-pointer"
          >
            Start Shopping 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  // 🛒 FILLED CART STATE
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 tracking-tight">
          Shopping Cart <span className="text-slate-400 text-2xl">({cart.length} items)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT: CART ITEMS (Same as before) */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-6 items-center group">
                    <div className="col-span-6 flex items-center gap-6 w-full">
                      <div className="w-24 h-24 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.brand}</p>
                        <Link to={`/product/${item.id}`} className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {item.name}
                        </Link>
                        <p className="text-sm font-black text-slate-900 mt-2 md:hidden">₹{parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="col-span-3 flex justify-center w-full md:w-auto">
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold text-slate-800 text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right hidden md:block">
                      <span className="text-lg font-black text-slate-900">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-end w-full md:w-auto mt-4 md:mt-0">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 sticky top-32">
              <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm font-medium text-slate-600 border-b border-slate-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-slate-900 font-bold">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (18% GST)</span>
                  <span className="text-slate-900 font-bold">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-3xl font-black text-slate-900">₹{total.toFixed(2)}</span>
              </div>

              {/* 4. onClick handler yahan attach kiya */}
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-green-500" /> Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;