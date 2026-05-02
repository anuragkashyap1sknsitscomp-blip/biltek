import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-blue-600">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Contact */}
          <div>
            <a href="/" className="text-3xl font-extrabold tracking-tight text-white mb-6 block">
              BIL<span className="text-blue-500">TEK</span>
            </a>
            <p className="text-sm mb-6 text-slate-400">
              The ultimate destination for premium auto parts and accessories. Quality guaranteed.
            </p>
            <div className="space-y-2 text-sm">
              <p>📍 123 Automotive Ave, NY 10012</p>
              <p>📞 +1 (800) 123-4567</p>
              <p>✉️ support@biltek.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/About" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/Trackorder" className="hover:text-blue-400 transition-colors">Track Order</a></li>
              <li><a href="/Returns" className="hover:text-blue-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="/Terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="/Privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Brake Systems</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Engine Components</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Oils & Fluids</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Suspension & Steering</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tools & Equipment</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm mb-4 text-slate-400">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full px-4 py-3 text-sm outline-none text-white focus:bg-slate-700 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-3 text-white font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Biltek Auto Parts. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Payment Icons Placeholders */}
            <span className="bg-slate-800 px-3 py-1 rounded">Visa</span>
            <span className="bg-slate-800 px-3 py-1 rounded">Mastercard</span>
            <span className="bg-slate-800 px-3 py-1 rounded">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;