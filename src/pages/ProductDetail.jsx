import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, ArrowRightLeft, ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';

// Data (In a real app, this comes from an API using the ID)
const DUMMY_PRODUCTS = [
  { id: 1, name: "Premium Synthetic Motor Oil 5W-30 5L", brand: "CASTROL", price: "3500", oldPrice: "4200", category: "engine", rating: 5, reviews: 124, inStock: true, image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3ed?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Ceramic Brake Pads Set Front Axle", brand: "BREMBO", price: "7500", category: "brakes", rating: 4, reviews: 34, inStock: true, badge: "Best Seller", image: "https://images.unsplash.com/photo-1632220199727-b50a04944b02?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Gas Shock Absorber Rear Pair", brand: "MONROE", price: "12500", oldPrice: "14000", category: "performance", rating: 5, reviews: 82, inStock: false, badge: "-15%", image: "https://images.unsplash.com/photo-1536640712-4d4c36ef0e52?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Air Filter High Performance", brand: "BOSCH", price: "1500", category: "engine", rating: 4, reviews: 56, inStock: true, image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Iridium Spark Plugs Set of 4", brand: "NGK", price: "3200", category: "engine", rating: 5, reviews: 120, inStock: true, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "High Power Car Battery 12V 65Ah", brand: "EXIDE", price: "8500", oldPrice: "9500", category: "performance", rating: 4, reviews: 19, inStock: true, badge: "Sale", image: "https://images.unsplash.com/photo-1620050857367-5d2ea61b4bd1?auto=format&fit=crop&w=800&q=80" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find product
  const product = DUMMY_PRODUCTS.find(p => p.id === parseInt(id));

  // Global Stores
  const { addToCart, updateQuantity, cart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  
  // Local States
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0); // For image gallery

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 font-sans">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h2>
        <p className="text-slate-500 mb-8">The auto part you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-900 transition-colors">
          Back to Store
        </Link>
      </div>
    );
  }

  // Check if item is already in wishlist
  const isWishlisted = isInWishlist(product.id);
  
  // Handle Add to Cart with quantity
  const handleAddToCart = () => {
    addToCart(product);
    // Short delay to ensure it's added, then update to selected quantity
    setTimeout(() => {
      const cartItem = useCartStore.getState().cart.find(item => item.id === product.id);
      if (cartItem) {
        // If it was already in cart, we just add the selected quantity to existing
        const newQty = cartItem.quantity === 1 && quantity > 1 ? quantity : cartItem.quantity - 1 + quantity;
        updateQuantity(product.id, quantity);
      }
    }, 50);
  };

  // Mock Gallery Images (Duplicating main image for effect)
  const galleryImages = [product.image, product.image, product.image];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20 font-sans">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
          <Link to="/" className="hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
          <span className="text-slate-300">/</span>
          <Link to="/shop" className="hover:text-blue-600 transition-colors cursor-pointer">Shop</Link>
          <span className="text-slate-300">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-blue-600 transition-colors cursor-pointer">{product.category}</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-4 lg:p-8 flex flex-col xl:flex-row gap-10">
          
          {/* 🖼️ LEFT: IMAGE GALLERY */}
          <div className="w-full xl:w-1/2 flex flex-col gap-4">
            
            <div className="w-full aspect-square bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-center relative overflow-hidden group cursor-crosshair">
              {product.badge && (
                <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider z-10 shadow-sm">
                  {product.badge}
                </span>
              )}
              {/* Main Image with Zoom Effect */}
              <img 
                src={galleryImages[activeImage]} 
                alt={product.name} 
                className="w-4/5 h-4/5 object-contain mix-blend-multiply group-hover:scale-125 transition-transform duration-500 ease-out" 
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center p-2 cursor-pointer transition-all flex-shrink-0 ${activeImage === idx ? 'border-blue-600 bg-white' : 'border-slate-100 bg-slate-50 hover:border-blue-300'}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* 📋 RIGHT: PRODUCT DETAILS */}
          <div className="w-full xl:w-1/2 flex flex-col justify-between py-2">
            
            <div>
              <p className="text-blue-600 font-black tracking-widest uppercase text-xs mb-3">{product.brand}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-4 tracking-tight">
                {product.name}
              </h1>

              {/* Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={18} className={star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">
                  {product.reviews} Verified Reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 mb-8 pb-8 border-b border-slate-100">
                <span className="text-4xl font-black text-slate-900">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
                {product.oldPrice && (
                  <span className="text-xl font-bold text-slate-400 line-through mb-1">
                    ₹{parseFloat(product.oldPrice).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Highlights */}
              <ul className="space-y-3 mb-10 text-slate-600 font-medium text-sm">
                <li className="flex items-center gap-3"><Check size={18} className="text-blue-600" /> Exact OEM Replacement fit</li>
                <li className="flex items-center gap-3"><Check size={18} className="text-blue-600" /> Premium grade materials for longevity</li>
                <li className="flex items-center gap-3"><Check size={18} className="text-blue-600" /> 1-Year Manufacturer Warranty included</li>
              </ul>
            </div>

            {/* Sticky Action Area */}
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mt-auto">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  <span className={`text-sm font-black uppercase tracking-wider ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                    {product.inStock ? 'In Stock & Ready to Ship' : 'Currently Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-2 h-16 w-full sm:w-1/3">
                  <button 
                    onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-black text-slate-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 h-16 bg-blue-600 hover:bg-slate-900 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-slate-900/30 flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:shadow-none cursor-pointer hover:-translate-y-1 active:translate-y-0"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`h-16 w-16 sm:w-20 flex-shrink-0 flex items-center justify-center rounded-2xl transition-all cursor-pointer border ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50'}`}
                >
                  <Heart size={24} className={isWishlisted ? 'fill-red-500' : ''} />
                </button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <Truck size={24} className="text-slate-400" />
                  <div>
                    <p className="text-xs font-black text-slate-900">Free Shipping</p>
                    <p className="text-[10px] font-bold text-slate-400">On orders over ₹10,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={24} className="text-slate-400" />
                  <div>
                    <p className="text-xs font-black text-slate-900">Genuine Parts</p>
                    <p className="text-[10px] font-bold text-slate-400">100% Original</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRightLeft size={24} className="text-slate-400" />
                  <div>
                    <p className="text-xs font-black text-slate-900">Easy Returns</p>
                    <p className="text-[10px] font-bold text-slate-400">30 Days Policy</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 📚 TABS SECTION: Description & Specs */}
        <div className="mt-12 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 lg:p-12">
          
          <div className="flex flex-wrap gap-8 border-b border-slate-100 pb-4 mb-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`text-lg font-black pb-4 -mb-4 transition-colors cursor-pointer border-b-4 ${activeTab === 'description' ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Product Description
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`text-lg font-black pb-4 -mb-4 transition-colors cursor-pointer border-b-4 ${activeTab === 'specs' ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Specifications
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="prose max-w-none text-slate-600 font-medium">
              <p className="mb-4">
                Upgrade your vehicle's performance with the industry-leading <strong>{product.name}</strong> by {product.brand}. Engineered for extreme conditions, this product guarantees maximum durability and a perfect fit for a wide range of car models.
              </p>
              <p>
                Whether you are driving in the harsh heat of summer or freezing winter mornings, our auto parts are rigorously tested to meet or exceed OEM specifications. Installing genuine {product.brand} parts ensures your vehicle runs smoother, safer, and longer.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium text-slate-600">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-3 font-bold text-slate-900">Brand</td><td className="py-3">{product.brand}</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-3 font-bold text-slate-900">Part Number</td><td className="py-3">BTK-{Math.floor(Math.random() * 90000) + 10000}</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-3 font-bold text-slate-900">Category</td><td className="py-3 capitalize">{product.category}</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-3 font-bold text-slate-900">Warranty</td><td className="py-3">1 Year Replacement</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-3 font-bold text-slate-900">Weight</td><td className="py-3">Approx. 2.5 kg</td></tr>
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;