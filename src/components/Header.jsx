import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 🔥 useNavigate add kiya
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronRight, LogOut } from 'lucide-react';
import useCartStore from '../store/useCartStore'; 
import useAuthStore from '../store/useAuthStore'; 
import useWishlistStore from '../store/useWishlistStore';

const Header = () => {
  const navigate = useNavigate(); // 🔥 navigation ke liye initialize kiya

  const cartItemCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());
  const { user, isAuthenticated, logout } = useAuthStore();
  
  // States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 🔥 Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll effect logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 150 && !isMobileMenuOpen) {
        setIsHidden(true); 
      } else {
        setIsHidden(false); 
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // 🔥 Handle Search Function
  const handleSearch = (e) => {
    e.preventDefault(); // Page refresh hone se rokega
    if (searchQuery.trim()) {
      // User ko shop page par bhejenge query parameters ke sath
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); // Mobile menu band kar denge search ke baad
      setSearchQuery(''); // Optional: Search hone ke baad input clear karna
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-sm border-transparent' 
            : 'bg-white border-b border-slate-200'
        }`}
      >
        {/* Top thin bar */}
        <div className={`bg-slate-50 border-b border-slate-100 text-xs text-slate-500 transition-all duration-300 hidden md:block ${isScrolled ? 'h-0 overflow-hidden opacity-0 py-0 border-transparent' : 'h-8 py-1.5 opacity-100'}`}>
          <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-full">
            <div className="flex gap-4">
              <span>📞 +44 (0) 1234 567 89</span>
              <span>✉️ support@biltek.com</span>
            </div>
            <div className="flex gap-4">
              <Link to="/track" className="hover:text-blue-600 transition-colors">Track Order</Link>
              <select className="bg-transparent outline-none cursor-pointer"><option>English</option></select>
              <select className="bg-transparent outline-none cursor-pointer"><option>USD</option></select>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Hamburger & Logo */}
          <div className="flex items-center gap-4 lg:gap-0">
            <button 
              className="lg:hidden text-slate-700 hover:text-blue-600 transition-colors p-1 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>

            <Link to="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-slate-900 transition-colors">B</div>
              <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 hidden sm:block">BIL<span className="text-blue-600 group-hover:text-slate-900 transition-colors">TEK</span></span>
            </Link>
          </div>

          {/* 🔥 Desktop Search Bar (Form me convert kiya) */}
          <form 
            onSubmit={handleSearch} 
            className="hidden lg:flex flex-1 max-w-3xl border-2 border-blue-600 rounded-full overflow-hidden h-12 bg-white focus-within:shadow-md focus-within:shadow-blue-600/20 transition-all"
          >
            <select className="px-4 border-r border-slate-200 text-sm outline-none bg-slate-50 text-slate-600 cursor-pointer min-w-[150px] hover:bg-slate-100 transition-colors">
              <option>Select Vehicle</option>
              <option>BMW M3</option>
              <option>Audi RS6</option>
            </select>
            <input 
              type="text" 
              placeholder="Enter keyword, part number or VIN..." 
              className="flex-1 px-4 text-sm outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 px-6 text-white hover:bg-slate-900 transition-colors flex items-center justify-center group cursor-pointer">
              <Search size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Auth Conditional Rendering */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Welcome</span>
                  <span className="text-sm font-black text-slate-900 capitalize leading-none">{user.name}</span>
                </div>
                <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-slate-50 rounded-full hover:bg-red-50 cursor-pointer">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="hidden lg:flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <User size={22} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Sign In</span>
              </Link>
            )}
            
            {/* Dynamic Wishlist Icon */}
            <Link to="/wishlist" className="hidden lg:flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 relative transition-colors cursor-pointer group">
              <Heart size={22} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile Search Toggle */}
            <button 
              className="lg:hidden text-slate-700 hover:text-blue-600 transition-colors p-1 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Search size={24} />
            </button>

            {/* Dynamic Cart Icon */}
            <Link to="/cart" className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 relative transition-colors group p-1 lg:p-0 cursor-pointer">
              <ShoppingCart size={24} className="lg:w-[22px] lg:h-[22px] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-wider hidden lg:block">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 w-5 h-5 lg:w-4 lg:h-4 bg-red-500 text-white text-[10px] lg:text-[9px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce-short">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Category Links (Desktop) */}
        <nav className="hidden lg:flex container mx-auto px-8 pb-3 gap-8 text-sm font-bold text-slate-800">
          <Link to="/shop" className="hover:text-blue-600 transition-colors">All Parts</Link>
          <Link to="/shop?category=engine" className="hover:text-blue-600 transition-colors">Engine Parts</Link>
          <Link to="/shop?category=tires" className="hover:text-blue-600 transition-colors">Tires & Wheels</Link>
          <Link to="/shop?category=brakes" className="hover:text-blue-600 transition-colors">Brakes</Link>
          <Link to="/shop?category=performance" className="hover:text-blue-600 transition-colors">Performance</Link>
          <Link to="/shop?sale=true" className="text-red-500 hover:text-red-600 transition-colors">Sale -30%</Link>
        </nav>
      </header>

      {/* MOBILE SIDEBAR */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[60] lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">B</div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">BILTEK</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 bg-white rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          
          {/* 🔥 Mobile Search Bar (Form me convert kiya) */}
          <div className="px-4 mb-6">
            <form onSubmit={handleSearch} className="flex items-center border-2 border-blue-600 rounded-lg overflow-hidden h-12">
              <input 
                type="text" 
                placeholder="Search parts..." 
                className="flex-1 px-4 text-sm outline-none" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 h-full px-4 text-white cursor-pointer"><Search size={18} /></button>
            </form>
          </div>

          <div className="px-2">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
            {[
              { name: 'All Parts', path: '/shop' },
              { name: 'Engine Parts', path: '/shop?category=engine' },
              { name: 'Tires & Wheels', path: '/shop?category=tires' },
              { name: 'Brakes', path: '/shop?category=brakes' },
              { name: 'Performance', path: '/shop?category=performance' },
            ].map((link, idx) => (
              <Link 
                key={idx} to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                {link.name} <ChevronRight size={16} className="text-slate-400" />
              </Link>
            ))}
            <Link to="/shop?sale=true" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2 cursor-pointer">
              Sale -30% Off
            </Link>
          </div>

          <hr className="my-6 border-slate-100" />

          {/* Mobile Auth & User Actions */}
          <div className="px-2">
            {isAuthenticated ? (
              <>
                <div className="p-3 text-sm font-bold text-slate-700 bg-blue-50 rounded-lg mb-2">
                  Hello, <span className="capitalize">{user.name}</span> 👋
                </div>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                  className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center gap-3 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <User size={18} className="text-slate-400" /> Sign In / Register
              </Link>
            )}
            
            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg mt-2 cursor-pointer">
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-slate-400" /> Wishlist
              </div>
              {wishlistCount > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{wishlistCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;