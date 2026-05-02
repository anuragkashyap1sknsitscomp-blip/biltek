import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, MapPin, CheckCircle2, ShoppingBag, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Checkout = () => {
  const navigate = useNavigate();
  
  // Safe Data Fetch & Calculation
  const cart = useCartStore((state) => state.cart) || [];
  
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 1;
    return sum + (price * qty);
  }, 0);

  const shipping = subtotal > 0 ? 150.00 : 0; 
  const tax = subtotal * 0.18; 
  const total = subtotal + shipping + tax;

  // 🎯 REAL FUNCTIONALITY: State to hold form data and payment method
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Yahan aap real project mein API call kar sakte hain
    const orderDetails = {
      user: formData,
      items: cart,
      paymentMethod: paymentMethod,
      totalAmount: total
    };
    
    console.log("Order Placed Details:", orderDetails);
    
    alert(`Success! Your order via ${paymentMethod.toUpperCase()} has been placed. 🎉`);
    navigate('/'); 
  };

  // 🛒 EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 text-base md:text-lg">Looks like you haven't added any auto parts yet.</p>
          <button 
            onClick={() => navigate('/shop')} 
            className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // 💳 CHECKOUT STATE
  return (
    <div className="bg-slate-50/50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Top Navigation & Header */}
        <div className="mb-8 md:mb-10">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Secure Checkout</h1>
            <p className="text-slate-500 mt-2 font-medium">Complete your order securely.</p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: SHIPPING & PAYMENT DETAILS */}
          <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
            
            {/* 📍 Shipping Details Box */}
            <div className="bg-white rounded-3xl md:rounded-[2rem] shadow-sm border border-slate-200 p-5 md:p-10">
              <div className="flex items-center gap-4 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-slate-100">
                <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-md">
                  <MapPin size={24} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Shipping Details</h2>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Where should we send your order?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" placeholder="Doe" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" placeholder="john@example.com" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" placeholder="House No, Street, Landmark" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" placeholder="New Delhi" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pincode</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} pattern="[0-9]{6}" title="Please enter a valid 6-digit pincode" className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" placeholder="110001" />
                </div>
              </div>
            </div>

            {/* 💳 Payment Method Box (FIXED) */}
            <div className="bg-white rounded-3xl md:rounded-[2rem] shadow-sm border border-slate-200 p-5 md:p-10">
              <div className="flex items-center gap-4 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-slate-100">
                <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-md shadow-blue-600/20">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Payment Method</h2>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Choose how you want to pay.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Card Option Box */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                >
                  {paymentMethod === 'card' && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>}
                  <div className="flex items-center gap-4 md:gap-5 ml-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'border-blue-600' : 'border-slate-300'}`}>
                      {paymentMethod === 'card' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div>
                      <p className={`font-bold text-base md:text-lg leading-tight ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-700'}`}>Online Payment</p>
                      <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">UPI, Credit/Debit Cards, NetBanking</p>
                    </div>
                  </div>
                  <CreditCard className={`hidden sm:block flex-shrink-0 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}`} size={28} strokeWidth={1.5} />
                </div>

                {/* COD Option Box */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`relative flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                >
                  {paymentMethod === 'cod' && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>}
                  <div className="flex items-center gap-4 md:gap-5 ml-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cod' ? 'border-blue-600' : 'border-slate-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <div>
                      <p className={`font-bold text-base md:text-lg leading-tight ${paymentMethod === 'cod' ? 'text-blue-900' : 'text-slate-700'}`}>Cash on Delivery</p>
                      <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">Pay when you receive the package</p>
                    </div>
                  </div>
                  <Truck className={`hidden sm:block flex-shrink-0 ${paymentMethod === 'cod' ? 'text-blue-600' : 'text-slate-400'}`} size={28} strokeWidth={1.5} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl md:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 lg:sticky lg:top-24">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
                Order Summary
                <span className="bg-slate-100 text-slate-600 text-sm py-1 px-3 rounded-full">{cart.length} Items</span>
              </h2>
              
              {/* Mini Cart Items (Scrollable) */}
              <div className="max-h-60 overflow-y-auto pr-2 mb-6 space-y-4 custom-scrollbar">
                {cart.map((item, index) => (
                  <div key={item.id || index} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex-shrink-0 group-hover:border-blue-200 transition-colors">
                      <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">{item.name}</p>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-black text-slate-900 whitespace-nowrap">
                      ₹{((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Details */}
              <div className="space-y-3.5 text-sm font-semibold text-slate-500 border-t border-b border-slate-100 py-6 mb-6">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-slate-800 font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-slate-800 font-bold">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Tax (18%)</span>
                  <span className="text-slate-800 font-bold">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-slate-900">Total to Pay</span>
                <span className="text-3xl md:text-4xl font-black text-blue-600 tracking-tight">₹{total.toFixed(2)}</span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-1 active:translate-y-0 text-base md:text-lg"
              >
                Place Order <CheckCircle2 size={22} strokeWidth={2.5} />
              </button>

              {/* Trust Badge */}
              <div className="mt-5 flex flex-col items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest text-center bg-slate-50 py-3 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" /> 
                  <span className="text-slate-500 mt-0.5">100% Secure Transaction</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;