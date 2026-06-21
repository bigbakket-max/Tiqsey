import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowLeft, Loader2 } from 'lucide-react';
import { ApiService } from '../services/apiService';
import { Attraction } from '../types';
import AttractionCard from './AttractionCard';

const CATEGORIES = [
  'All',
  'Museum',
  'Architecture',
  'Landmark',
  'Nature',
  'Cruise',
  'Fun',
  'Arts',
  'History'
];

const REGIONS = [
  'All Regions',
  'Europe',
  'Japan',
  'South East Asia',
  'USA',
  'UAE',
  'Australia'
];

const getRegionForAttraction = (location: string): string => {
  const loc = location.toLowerCase();
  if (
    loc.includes('spain') || 
    loc.includes('france') || 
    loc.includes('switzerland') || 
    loc.includes('italy') || 
    loc.includes('netherlands') || 
    loc.includes('portugal') || 
    loc.includes('greece') || 
    loc.includes('london') || 
    loc.includes('uk') || 
    loc.includes('united kingdom') || 
    loc.includes('turkey') || 
    loc.includes('istanbul') || 
    loc.includes('athens') || 
    loc.includes('florence') || 
    loc.includes('amsterdam') || 
    loc.includes('paris') || 
    loc.includes('barcelona') || 
    loc.includes('lisbon') ||
    loc.includes('europe')
  ) {
    return 'Europe';
  }
  if (loc.includes('japan') || loc.includes('tokyo') || loc.includes('osaka')) {
    return 'Japan';
  }
  if (
    loc.includes('singapore') || 
    loc.includes('thailand') || 
    loc.includes('bangkok') || 
    loc.includes('phuket') || 
    loc.includes('kuala lumpur') || 
    loc.includes('vietnam') || 
    loc.includes('bali')
  ) {
    return 'South East Asia';
  }
  if (loc.includes('usa') || loc.includes('new york') || loc.includes('ny') || loc.includes('united states')) {
    return 'USA';
  }
  if (loc.includes('uae') || loc.includes('dubai') || loc.includes('abu dhabi') || loc.includes('emirates')) {
    return 'UAE';
  }
  if (loc.includes('australia') || loc.includes('sydney') || loc.includes('melbourne')) {
    return 'Australia';
  }
  return 'Other';
};

export default function AllAttractionsPage({ 
  onSelectDestination, 
  onViewAttraction 
}: { 
  onSelectDestination: (dest: string | null) => void;
  onViewAttraction?: (id: string) => void;
}) {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'All' | 'budget' | 'mid' | 'premium'>('All');
  const [selectedSort, setSelectedSort] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc'>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await ApiService.getPopularAttractions();
        if (isMounted) {
          setAttractions(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const filteredAttractions = useMemo(() => {
    let result = attractions.filter((attr) => {
      const matchesSearch = attr.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            attr.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All Regions' || getRegionForAttraction(attr.location) === selectedRegion;
      const matchesCategory = selectedCategory === 'All' || attr.category === selectedCategory;
      
      const itemPrice = attr.discountPrice || attr.price;
      const matchesPrice = selectedPriceRange === 'All' ||
        (selectedPriceRange === 'budget' && itemPrice <= 20) ||
        (selectedPriceRange === 'mid' && itemPrice > 20 && itemPrice <= 50) ||
        (selectedPriceRange === 'premium' && itemPrice > 50);

      return matchesSearch && matchesRegion && matchesCategory && matchesPrice;
    });

    if (selectedSort === 'priceAsc') {
      result = [...result].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (selectedSort === 'priceDesc') {
      result = [...result].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (selectedSort === 'ratingDesc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [attractions, searchQuery, selectedRegion, selectedCategory, selectedPriceRange, selectedSort]);

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300">
      
      {/* Hero Header Section */}
      <div className="relative w-full h-[260px] md:h-[320px] bg-slate-900 overflow-hidden mb-0">
         <div className="absolute inset-0">
           <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="Landscape" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
           <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
            
            <button 
              onClick={() => onSelectDestination(null)}
              className="absolute top-5 left-4 md:left-6 flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors group whitespace-nowrap shrink-0 bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <motion.h1 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-2 drop-shadow-md mt-6"
            >
              Attractions & Tours<span className="text-yellow-400">.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm text-white/80 font-medium leading-relaxed max-w-lg mb-1"
            >
              Discover places and things to do
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 md:mt-5 bg-white dark:bg-slate-900 rounded-2xl p-1 flex items-center w-full max-w-3xl shadow-lg border border-gray-100/50 dark:border-slate-800/50"
            >
               <div className="flex-1 px-4">
                  <input 
                    type="text" 
                    placeholder="Search places and things to do" 
                    className="w-full outline-none text-gray-950 dark:text-white text-sm md:text-base font-semibold placeholder:text-gray-400 bg-transparent" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                  />
               </div>
               <button className="bg-brand hover:brightness-110 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-md shadow-brand/10">
                 <Search className="w-4 h-4" />
                 <span className="hidden md:inline text-xs md:text-sm">Search</span>
               </button>
            </motion.div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto pb-16 relative z-20 px-4 md:px-6 mt-8 md:mt-10 animate-fade-in">
        
        {/* Mobile Filter Toggle Button & Filter Summary Banner */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6 select-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="text-xs">
            <span className="text-gray-400 dark:text-slate-500 font-semibold block text-[10px] uppercase tracking-wider">Active Filters</span>
            <span className="font-bold text-gray-800 dark:text-slate-200">
              {[
                selectedRegion !== 'All Regions' ? selectedRegion : null,
                selectedCategory !== 'All' ? selectedCategory : null,
                selectedPriceRange !== 'All' ? (selectedPriceRange === 'budget' ? 'Under €20' : selectedPriceRange === 'mid' ? '€20-€50' : 'Over €50') : null
              ].filter(Boolean).join(', ') || 'No filters applied'}
            </span>
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-brand/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side Filters Sidebar - Sticky on Desktop */}
          <div className={`w-full lg:w-72 lg:shrink-0 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200/80 dark:border-slate-800/80 shadow-xs lg:sticky lg:top-24">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-150 dark:border-slate-800">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand" />
                  Filters
                </h3>
                {(selectedRegion !== 'All Regions' || selectedCategory !== 'All' || selectedPriceRange !== 'All' || searchQuery !== '') && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('All Regions');
                      setSelectedCategory('All');
                      setSelectedPriceRange('All');
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider text-brand hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Regions Filter Section */}
              <div className="mb-6">
                <span className="block text-[10px] uppercase tracking-widest font-black text-[#5E6D77] dark:text-slate-400 mb-3 select-none">
                  Select Region
                </span>
                <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar-y">
                  {REGIONS.map(region => {
                    const isSelected = selectedRegion === region;
                    return (
                      <button
                        key={region}
                        onClick={() => {
                          setSelectedRegion(region);
                          // Auto scroll-up on mobile after choosing filter
                          if (window.innerWidth < 1024) setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isSelected 
                            ? 'bg-brand text-white border-brand shadow-md shadow-brand/20 font-extrabold' 
                            : 'bg-gray-50 dark:bg-slate-950 text-gray-750 dark:text-slate-350 border-transparent hover:border-brand/30 hover:bg-gray-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {region === 'All Regions' ? 'All Regions' : region}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categories Filter Section */}
              <div className="mb-6">
                <span className="block text-[10px] uppercase tracking-widest font-black text-[#5E6D77] dark:text-slate-400 mb-3 select-none">
                  Activity Category
                </span>
                <div className="flex flex-col gap-1.5 max-h-[260px] overflow-y-auto pr-1 no-scrollbar-y">
                  {CATEGORIES.map(category => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          if (window.innerWidth < 1024) setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          isSelected 
                            ? 'bg-brand text-white border-brand shadow-md shadow-brand/20 font-extrabold' 
                            : 'bg-gray-50 dark:bg-slate-950 text-gray-755 dark:text-slate-350 border-transparent hover:border-brand/30 hover:bg-gray-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        {category === 'All' ? 'All Experiences' : category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Filter Results & Grid Area */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Top Bar with Dynamic Stats and Sophisticated Sorting */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between select-none">
              <div className="text-xs text-gray-500 dark:text-slate-400 font-bold font-mono">
                {isLoading ? (
                  <span>Loading available curations...</span>
                ) : (
                  <span>
                    Found <span className="text-brand font-black">{filteredAttractions.length}</span> matching activities
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5E6D77]">Sort By:</span>
                <div className="relative flex items-center bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-805 rounded-xl px-3 py-1.5 shadow-xs shrink-0">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value as any)}
                    className="bg-transparent text-xs font-black text-gray-750 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="recommended" className="dark:bg-slate-900 font-bold">Recommended</option>
                    <option value="priceAsc" className="dark:bg-slate-900 font-bold">Price: Low - High</option>
                    <option value="priceDesc" className="dark:bg-slate-900 font-bold">Price: High - Low</option>
                    <option value="ratingDesc" className="dark:bg-slate-900 font-bold">Top Rated FIRST</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Activities Grid Rendering */}
            <div className="w-full">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-xs">
                  <Loader2 className="w-10 h-10 text-brand animate-spin mb-4" />
                  <p className="text-gray-500 font-medium text-xs">Curating outstanding options...</p>
                </div>
              ) : filteredAttractions.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                >
                  <AnimatePresence>
                    {filteredAttractions.map(attr => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        key={attr.id}
                        className="h-full"
                      >
                        <AttractionCard 
                          attr={attr} 
                          onClick={onViewAttraction} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-800 shadow-xs text-center p-6">
                  <Search className="w-12 h-12 text-gray-300 dark:text-slate-700 mb-4" />
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">No activities found</h3>
                  <p className="text-gray-500 text-xs max-w-sm mx-auto">We couldn't spot any experiences that match your selected filters. Let's start fresh!</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('All Regions');
                      setSelectedCategory('All');
                      setSelectedPriceRange('All');
                    }}
                    className="mt-6 px-6 py-2.5 bg-brand/10 text-brand text-xs font-black uppercase tracking-wider rounded-xl hover:bg-brand/20 transition-all active:scale-95 cursor-pointer"
                  >
                    Clear Filter Set
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
