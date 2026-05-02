import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuthStore();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      // Reset form on success
      setName(''); setEmail(''); setPassword('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />
      
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-slate-900">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={closeAuthModal}
            className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {!isLoginView && (
            <div className="mb-4 relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>
          )}

          <div className="mb-4 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="mb-6 relative">
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              {isLoginView && <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>}
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" required minLength="6" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Register')}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-center text-sm text-slate-600">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-bold text-blue-600 hover:underline"
          >
            {isLoginView ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;