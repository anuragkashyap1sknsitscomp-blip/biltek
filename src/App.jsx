import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Auth from './pages/Auth'; 
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import About from './pages/About';
import TrackOrder from "./pages/TrackOrder.jsx"; // .jsx add karke dekho // 👈 Naya page import kiya
import Returns from './pages/Returns';       // 👈 Naya page import kiya
import Terms from './pages/Terms';           // 👈 Naya page import kiya
import Privacy from './pages/Privacy';       // 👈 Naya page import kiya

// Custom Component to hide Header/Footer on specific pages
const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Check kar rahe hain ki konsa page open hai
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isCheckoutPage = location.pathname === '/checkout';

  return (
    <>
      {/* Login/Register page pe Header hide kar diya for clean look */}
      {!isAuthPage && <Header />} 
      
      <main className={`flex-grow flex flex-col ${!isAuthPage ? 'pt-[140px] lg:pt-[150px]' : ''}`}>
        {children}
      </main>

      {/* Pro Tip: Footer ko Auth aur Checkout pages par hide kar diya taaki user distract na ho */}
      {!isAuthPage && !isCheckoutPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col relative">
        <MainLayout>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* User & Checkout */}
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Company Info & Legal */}
            <Route path="/about" element={<About />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </MainLayout>

        <ToastContainer 
          position="bottom-right" 
          autoClose={2500} 
          hideProgressBar={false}
          newestOnTop={true} 
          closeOnClick 
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
