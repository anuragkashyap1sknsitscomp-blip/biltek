import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Loader2, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuthStore();
  
  const [isLoginView, setIsLoginView] = useState(location.pathname !== '/register');
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLoginView) await login(email, password);
      else await register(name, email, password);
      navigate('/'); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // FULL SCREEN WRAPPER - NO SCROLL
    <div className="h-screen w-full bg-slate-100 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* 3D BACKGROUND GLOWS (Ambient Lights) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>

      {/* Back Button (Floating on background) */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 px-5 py-2.5 bg-white/50 backdrop-blur-md rounded-2xl shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all cursor-pointer z-50 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Store
      </Link>

      {/* MAIN 3D FLOATING CARD (Fixed max-height to prevent scroll) */}
      <div className="w-[92%] max-w-[1000px] h-[85vh] max-h-[650px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] flex relative z-10 overflow-hidden border border-white/60">
        
        {/* LEFT: FORM SECTION */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 relative bg-white">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {isLoginView ? 'Welcome Back 👋' : 'Create Account 🚀'}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {isLoginView 
                ? 'Enter your details to access your dashboard.' 
                : 'Join us for premium auto parts and fast delivery.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Smooth height transition for Sign Up fields */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLoginView ? 'max-h-0 opacity-0' : 'max-h-[100px] opacity-100'}`}>
              <div className="relative group">
                <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" required={!isLoginView} value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name" 
                  className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all placeholder:text-slate-400 placeholder:font-medium"
                />
              </div>
            </div>

            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>

            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="password" required minLength="6" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all placeholder:text-slate-400 placeholder:font-medium"
              />
              {isLoginView && (
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
                  Forgot?
                </button>
              )}
            </div>

            {/* 3D Button */}
            <button 
              type="submit" disabled={isLoading}
              className="w-full mt-4 h-14 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black rounded-2xl transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:shadow-none cursor-pointer hover:-translate-y-1 active:translate-y-0 active:shadow-none"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : (isLoginView ? 'Sign In Securely' : 'Create Account')}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  navigate(isLoginView ? '/register' : '/login', { replace: true });
                }}
                className="font-black text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                {isLoginView ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT: 3D IMAGE CONTAINER */}
        <div className="hidden lg:block w-[55%] p-4 h-full bg-white">
          <div className="w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group">
            
            {/* Image with zoom effect */}
            <img 
              src="https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=1000&q=80" 
              alt="Auto Parts" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* Glassmorphism Top Badge */}
            <div className="relative z-20 p-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-bold text-sm shadow-xl">
                <ShieldCheck size={18} className="text-blue-400" /> Secure Encryption
              </div>
            </div>

            {/* Bottom Content with gradient fade */}
            <div className="relative z-20 p-10 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent pt-32">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-3xl mb-6 shadow-lg border border-blue-400/30">
                B
              </div>
              <h2 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                Unlock Premium <br/> Auto Experience.
              </h2>
              <div className="flex items-center gap-3 text-blue-100/80 font-medium">
                <Zap size={20} className="text-blue-400" />
                Faster Checkouts & Order Tracking
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;