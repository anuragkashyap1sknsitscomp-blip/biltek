import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, MapPin, Search, Calendar, Box, ArrowRight } from 'lucide-react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState('');

  // 🚀 ASLI (REAL) API CALL HANDLER
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTrackingData(null);

    // Basic frontend validation
    if (orderId.trim().length < 5) {
      setError('Invalid Order ID. Please check and try again.');
      setIsLoading(false);
      return;
    }

    try {
      // Yahan apne Asli Backend ka URL daalein
      // Example: 'http://localhost:5000/api/orders/track'
      const response = await fetch('http://localhost:5000/api/orders/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          orderId: orderId.trim().toUpperCase(), 
          email: email.trim().toLowerCase() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Agar order nahi mila (e.g., 404 status code)
        setError(data.message || 'Order not found. Please check your details.');
        setIsLoading(false);
        return;
      }

      // Agar order mil gaya toh state update karein
      // Backend ko exact wahi format bhejna hoga jo niche use ho raha hai
      setTrackingData(data.order);
      
    } catch (err) {
      console.error("Tracking Error:", err);
      // Agar API se connect nahi ho paaya (Server down)
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Status Stepper Logic
  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Package, description: 'We have received your order' },
    { id: 'processing', label: 'Processing', icon: Box, description: 'Order is being packed' },
    { id: 'shipped', label: 'Shipped', icon: Truck, description: 'Handed over to courier' },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, description: 'Arriving today' },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2, description: 'Package delivered' }
  ];

  const getCurrentStepIndex = (status) => {
    return steps.findIndex(s => s.id === status);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Search size={32} strokeWidth={2} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Track Your Order</h1>
          <p className="text-slate-500 font-medium text-lg">Enter your Order ID and Email to get real-time delivery updates.</p>
        </div>

        {/* TRACKING FORM */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 relative z-10">
          <form onSubmit={handleTrackOrder} className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Order ID</label>
              <input 
                required 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-123456" 
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800 uppercase" 
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Billing Email</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com" 
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800" 
              />
            </div>
            <div className="flex items-end mt-2 md:mt-0">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto bg-blue-600 hover:bg-slate-900 text-white font-black px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Track Now <ArrowRight size={20} /></>
                )}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm font-bold mt-4 text-center bg-red-50 py-2 rounded-lg">{error}</p>}
        </div>

        {/* TRACKING RESULTS */}
        {trackingData && !isLoading && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-500">
            
            {/* Order Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</p>
                  <p className="text-lg font-black text-slate-900">{trackingData.id}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Delivery</p>
                  <p className="text-lg font-black text-slate-900">{trackingData.estimatedDelivery}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Courier Partner</p>
                  <p className="text-sm font-black text-slate-900">{trackingData.courier}</p>
                  <p className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">{trackingData.trackingNumber}</p>
                </div>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 overflow-hidden">
              <h3 className="text-xl font-black text-slate-900 mb-10">Delivery Status</h3>
              
              <div className="relative flex flex-col md:flex-row justify-between">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-slate-100 -z-10"></div>
                
                {/* Progress Line (Desktop) */}
                <div 
                  className="hidden md:block absolute top-6 left-0 h-1 bg-blue-600 -z-10 transition-all duration-1000 ease-in-out" 
                  style={{ width: `${(getCurrentStepIndex(trackingData.status) / (steps.length - 1)) * 100}%` }}
                ></div>

                {/* Connecting Line (Mobile) */}
                <div className="md:hidden absolute top-0 left-6 w-1 h-full bg-slate-100 -z-10"></div>
                
                {/* Progress Line (Mobile) */}
                <div 
                  className="md:hidden absolute top-0 left-6 w-1 bg-blue-600 -z-10 transition-all duration-1000 ease-in-out" 
                  style={{ height: `${(getCurrentStepIndex(trackingData.status) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                  const isCompleted = index <= getCurrentStepIndex(trackingData.status);
                  const isCurrent = index === getCurrentStepIndex(trackingData.status);
                  const StepIcon = step.icon;

                  return (
                    <div key={step.id} className="relative flex md:flex-col items-center md:justify-start gap-6 md:gap-4 mb-8 md:mb-0 w-full md:w-1/5 group">
                      
                      {/* Icon Circle */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${
                        isCompleted 
                          ? 'bg-blue-600 border-white text-white shadow-[0_0_0_4px_rgba(37,99,235,0.2)]' 
                          : 'bg-white border-slate-200 text-slate-400'
                      } ${isCurrent ? 'scale-110 shadow-[0_0_0_6px_rgba(37,99,235,0.2)]' : ''}`}>
                        <StepIcon size={20} strokeWidth={isCompleted ? 3 : 2} />
                      </div>
                      
                      {/* Text */}
                      <div className="md:text-center">
                        <p className={`font-black text-sm md:text-base ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{step.description}</p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Address & Items */}
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col md:flex-row justify-between gap-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
              
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <MapPin size={20} />
                  <h3 className="font-bold text-lg text-white">Delivery Address</h3>
                </div>
                <p className="text-slate-400 leading-relaxed font-medium">{trackingData.address}</p>
              </div>

              <div className="w-full md:w-px bg-slate-800"></div>

              <div className="flex-1 space-y-4">
                <h3 className="font-bold text-lg text-white mb-4">Items in this shipment</h3>
                <div className="space-y-3">
                  {trackingData.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300 font-medium"><span className="text-blue-400 font-bold mr-2">{item.qty}x</span> {item.name}</span>
                      <span className="font-bold text-white">₹{item.price?.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;