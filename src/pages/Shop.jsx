import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown, Check, Search, X } from 'lucide-react';

// 🚀 DUMMY DATA (Updated with INR prices)
const DUMMY_PRODUCTS = [
  { id: 1, name: "Premium Synthetic Motor Oil 5W-30 5L", brand: "CASTROL", price: "3500", category: "engine", rating: 5, reviews: 12, image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3ed?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Ceramic Brake Pads Set Front Axle", brand: "BREMBO", price: "7500", category: "brakes", rating: 4, reviews: 34, badge: "Best Seller", image: "https://images.unsplash.com/photo-1632220199727-b50a04944b02?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Gas Shock Absorber Rear Pair", brand: "MONROE", price: "12500", oldPrice: "14000", category: "performance", rating: 5, reviews: 8, badge: "-15%", image: "https://images.unsplash.com/photo-1536640712-4d4c36ef0e52?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Air Filter High Performance", brand: "BOSCH", price: "1500", category: "engine", rating: 4, reviews: 56, image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Iridium Spark Plugs Set of 4", brand: "NGK", price: "3200", category: "engine", rating: 5, reviews: 120, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "High Power Car Battery 12V 65Ah", brand: "EXIDE", price: "8500", oldPrice: "9500", category: "performance", rating: 4, reviews: 19, badge: "Sale", image: "https://images.unsplash.com/photo-1620050857367-5d2ea61b4bd1?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "All-Season Performance Tire 225/45 R17", brand: "MICHELIN", price: "10500", category: "tires", rating: 5, reviews: 88, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Sport Drilled Brake Rotors Pair", brand: "BOSCH", price: "15000", oldPrice: "18000", category: "brakes", rating: 5, reviews: 45, badge: "Sale", image: "https://images.unsplash.com/photo-1632220199727-b50a04944b02?auto=format&fit=crop&w=400&q=80" },
];

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get params from URL
  const categoryParam = searchParams.get('category');
  const saleParam = searchParams.get('sale');
  const searchParam = searchParams.get('search'); // 🔥 URL se search keyword nikaala
  
  // ⚡ DYNAMIC MAXIMUM PRICE
  const highestPriceInData = Math.max(...DUMMY_PRODUCTS.map(p => parseFloat(p.price)));
  
  // States
  const [pageTitle, setPageTitle] = useState('All Auto Parts');
  const [searchQuery, setSearchQuery] = useState(searchParam || ''); // 🔥 State ko URL param se initialize kiya
  const [maxPrice, setMaxPrice] = useState(highestPriceInData); 
  const [selectedBrands, setSelectedBrands] = useState([]); 
  const [sortBy, setSortBy] = useState('recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // 🧠 DYNAMIC EXTRACTORS
  const dynamicCategories = useMemo(() => {
    const cats = [...new Set(DUMMY_PRODUCTS.map(p => p.category))];
    return cats.map(c => ({
      id: c,
      label: c.charAt(0).toUpperCase() + c.slice(1) + (c === 'performance' ? '' : ' Parts'),
      count: DUMMY_PRODUCTS.filter(p => p.category === c).length
    }));
  }, []);

  const dynamicBrands = useMemo(() => {
    const brands = [...new Set(DUMMY_PRODUCTS.map(p => p.brand))];
    return brands.map(b => ({
      name: b,
      count: DUMMY_PRODUCTS.filter(p => p.brand === b).length
    }));
  }, []);

  // 🔥 Sync URL Search Param with Local Search State (Agar koi Header se search karke aaye)
  useEffect(() => {
    setSearchQuery(searchParam || '');
  }, [searchParam]);

  // Set Title
  useEffect(() => {
    if (searchParam) setPageTitle(`Search Results for "${searchParam}"`);
    else if (saleParam) setPageTitle('Flash Sale - Up to 30% Off');
    else if (categoryParam) {
      const formatCat = dynamicCategories.find(c => c.id === categoryParam);
      setPageTitle(formatCat ? formatCat.label : 'Auto Parts');
    } 
    else setPageTitle('All Auto Parts');
  }, [categoryParam, saleParam, searchParam, dynamicCategories]);

  // Handlers
  const handleCategoryClick = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryParam === cat) newParams.delete('category');
    else { newParams.set('category', cat); newParams.delete('sale'); }
    setSearchParams(newParams);
  };

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // 🔥 Real-time Search Update Handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Update URL instantly as user types
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // 🔥 Clear Search Logic
  const handleClearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({}); // Yeh URL se sab parameters (search, category, sale) hata dega
    setSearchQuery('');
    setMaxPrice(highestPriceInData);
    setSelectedBrands([]);
  };

  // 🌪️ MASTER FILTER ENGINE
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...DUMMY_PRODUCTS];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (categoryParam) result = result.filter(p => p.category === categoryParam);
    if (saleParam) result = result.filter(p => p.oldPrice || p.badge === 'Sale' || p.badge?.includes('%'));
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    result = result.filter(p => parseFloat(p.price) <= maxPrice);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
      case 'price-high': result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [categoryParam, saleParam, maxPrice, sortBy, searchQuery, selectedBrands]);

  // Check if any filters are active
  const hasActiveFilters = categoryParam || saleParam || searchParam || selectedBrands.length > 0 || maxPrice < highestPriceInData;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      
      {/* 🌟 Header Banner */}
      <div className="bg-slate-900 text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <p 
            className="inline-block text-blue-400 font-extrabold text-[10px] tracking-widest uppercase mb-3 cursor-pointer hover:text-blue-300 transition-colors bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30"
            onClick={clearAllFilters}
          >
            Store / Collection
          </p>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight">{pageTitle}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* 🎛️ LEFT SIDEBAR - DYNAMIC FILTERS */}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-32">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-blue-600" />
                <h3 className="font-black text-slate-900 text-lg">Filters</h3>
              </div>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer bg-red-50 px-2 py-1 rounded-md">
                  Clear All
                </button>
              )}
            </div>
            
            {/* Dynamic Categories */}
            <div className="mb-8">
              <h4 className="font-black text-xs text-slate-400 mb-4 uppercase tracking-widest">Categories</h4>
              <ul className="space-y-1">
                {dynamicCategories.map(cat => (
                  <li 
                    key={cat.id} onClick={() => handleCategoryClick(cat.id)}
                    className={`flex justify-between items-center cursor-pointer group px-3 py-2 rounded-xl transition-all ${categoryParam === cat.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                  >
                    <span className={`text-sm transition-colors ${categoryParam === cat.id ? 'text-blue-600 font-bold' : 'text-slate-600 font-medium group-hover:text-slate-900'}`}>
                      {cat.label}
                    </span> 
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${categoryParam === cat.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm'}`}>
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Brands (Checkboxes) */}
            <div className="mb-8">
              <h4 className="font-black text-xs text-slate-400 mb-4 uppercase tracking-widest">Brands</h4>
              <div className="space-y-3 px-2">
                {dynamicBrands.map(brand => (
                  <label key={brand.name} className="flex justify-between items-center cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedBrands.includes(brand.name) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400 bg-white'}`}>
                        {selectedBrands.includes(brand.name) && <Check size={12} className="text-white" strokeWidth={4} />}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{brand.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{brand.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider (INR) */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest">Max Price</h4>
                <span className="text-blue-600 font-black bg-blue-50 px-2 py-1 rounded-md text-sm">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" min="0" max={highestPriceInData} step="500"
                value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer hover:accent-blue-700 transition-all" 
              />
              <div className="flex justify-between text-[10px] font-extrabold text-slate-400 mt-2">
                <span>₹0</span>
                <span>₹{highestPriceInData.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>
        </div>

        {/* 📦 RIGHT SIDE - CONTENT AREA */}
        <div className="w-full flex-1">
          
          {/* Top Bar: Search & Sort */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 mb-6 flex flex-col xl:flex-row justify-between items-center gap-4 z-20 relative">
            
            {/* Professional Search Bar (Updated with handleSearchChange) */}
            <div className="w-full xl:w-96 relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by part name or brand..." 
                value={searchQuery}
                onChange={handleSearchChange} // 🔥 Updated handler
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={handleClearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 bg-slate-100 p-1 rounded-full cursor-pointer">
                  <X size={14} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
              <p className="text-sm text-slate-500 font-medium whitespace-nowrap">
                <span className="font-black text-slate-900">{filteredAndSortedProducts.length}</span> Results
              </p>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 relative">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider hidden sm:block">Sort:</span>
                <div 
                  className="relative border-2 border-slate-100 rounded-xl bg-white px-4 py-2.5 cursor-pointer flex items-center gap-2 hover:border-blue-600 hover:shadow-sm transition-all w-48 justify-between group"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <span className="text-sm font-bold text-slate-800 truncate">
                    {sortOptions.find(opt => opt.id === sortBy)?.label}
                  </span>
                  <ChevronDown size={16} className={`text-slate-400 group-hover:text-blue-600 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </div>

                {isSortOpen && (
                  <div className="absolute top-[110%] right-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 p-2">
                    {sortOptions.map(option => (
                      <div 
                        key={option.id} onClick={() => { setSortBy(option.id); setIsSortOpen(false); }}
                        className={`px-3 py-2.5 rounded-xl text-sm font-bold cursor-pointer flex justify-between items-center transition-all ${sortBy === option.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        {option.label}
                        {sortBy === option.id && <Check size={16} className="text-blue-600" strokeWidth={3} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">Search: "{searchQuery}" <X size={12} className="cursor-pointer hover:text-red-500" onClick={handleClearSearch}/></div>}
              {categoryParam && <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">Category: {dynamicCategories.find(c=>c.id===categoryParam)?.label} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => handleCategoryClick(categoryParam)}/></div>}
              {selectedBrands.map(b => <div key={b} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">Brand: {b} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => toggleBrand(b)}/></div>)}
              {maxPrice < highestPriceInData && <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">Up to ₹{maxPrice.toLocaleString('en-IN')} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => setMaxPrice(highestPriceInData)}/></div>}
            </div>
          )}

          {/* 🎁 Product Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} buttonStyle="full" />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-slate-200 rounded-3xl py-20 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No matching parts found</h3>
              <p className="text-slate-500 font-medium mb-8 max-w-sm">We couldn't find any products matching your current filters and search term.</p>
              <button 
                onClick={clearAllFilters}
                className="bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-600/30 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Shop;