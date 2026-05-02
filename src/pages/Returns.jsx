import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCcw, CreditCard, Clock, AlertTriangle, CheckCircle2, ChevronDown, PackageCheck, HeadphonesIcon } from 'lucide-react';

const Returns = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20 selection:bg-blue-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-100 rounded-full blur-3xl -z-10"></div>
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCcw size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Returns & Refunds</h1>
          <p className="text-lg text-slate-500 font-medium">
            We want you to be 100% satisfied with your purchase. If a part doesn't fit or you changed your mind, our hassle-free return policy has got you covered.
          </p>
        </div>

        {/* POLICY HIGHLIGHTS (CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">15-Day Return</h3>
            <p className="text-slate-500 text-sm">You have 15 days from the date of delivery to initiate a return for unused items.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Refunds</h3>
            <p className="text-slate-500 text-sm">Once approved, refunds are processed to your original payment method within 5-7 business days.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Free Pickup</h3>
            <p className="text-slate-500 text-sm">We offer free doorstep pickup for defective or incorrect parts across all major cities.</p>
          </div>
        </div>

        {/* HOW TO RETURN (STEP-BY-STEP) */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">How to Return an Item?</h2>
          
          <div className="space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 -z-10 hidden sm:block"></div>
            
            {[
              { title: "Initiate Return", desc: "Go to your 'Orders' page, select the item, and click 'Return Item'. Choose a reason for the return." },
              { title: "Pack the Item", desc: "Place the item back in its original packaging along with all manuals, accessories, and tags." },
              { title: "Handover to Courier", desc: "Our delivery partner will pick up the package within 2-3 business days. Keep the return slip handy." },
              { title: "Quality Check & Refund", desc: "Once we receive the part, our team will inspect it. If approved, your refund will be initiated immediately." }
            ].map((step, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_0_6px_rgba(37,99,235,0.1)]">
                  {index + 1}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RULES & CONDITIONS (Dark Section) */}
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="text-red-400" size={28} />
            <h2 className="text-2xl md:text-3xl font-black">Return Conditions</h2>
          </div>
          
          <ul className="space-y-4">
            {[
              "The item must be unused, uninstalled, and in the same condition that you received it.",
              "It must be in the original box/packaging with all manufacturer seals intact.",
              "Electronic parts, sensors, and custom-made items are non-returnable unless defective out-of-the-box.",
              "Clearance sale items marked as 'Final Sale' cannot be returned."
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-slate-300 font-medium leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT SUPPORT */}
        <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <HeadphonesIcon size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Still need help?</h2>
          <p className="text-slate-600 font-medium mb-8 max-w-lg mx-auto">
            If you received a damaged item or have any doubts regarding fitment before returning, our expert team is ready to assist you.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-900 transition-all shadow-lg hover:shadow-slate-900/30"
          >
            Contact Customer Support
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Returns;