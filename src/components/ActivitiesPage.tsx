import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../data/mockData';
import { Star, ArrowLeft, Loader2, Flame, Search, SlidersHorizontal } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import SearchBar from './SearchBar';
import { ApiService } from '../services/apiService';
import { Attraction } from '../types';
import ErrorMessage from './ErrorMessage';
import AttractionCard from './AttractionCard';

interface ActivitiesPageProps {
  destination: string;
  onBack: () => void;
  onViewAttraction?: (id: string) => void;
}

const getSubRegionName = (location: string, dest: string): string => {
  const parts = location.split(',').map(p => p.trim()).filter(Boolean);
  if (parts.length === 0) return '';

  const destLower = dest.toLowerCase();

  // If the destination is "Europe" or similar continents...
  if (destLower === 'europe') {
    const last = parts[parts.length - 1];
    if (last.toLowerCase() === 'uk') return 'United Kingdom';
    if (last.toLowerCase() === 'usa') return 'United States';
    return last;
  }

  // Work backwards. Find the parts of location.
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    const partLower = part.toLowerCase();

    // If this part is exactly the destination name, continue to more specific part
    if (partLower === destLower || destLower.includes(partLower) || partLower.includes(destLower)) {
      continue;
    }

    // Check if some common country names are redundant when filtering inside a specific country
    if (partLower === 'japan' || partLower === 'usa' || partLower === 'uae' || partLower === 'australia') {
      continue;
    }

    // Found a part that is more specific. Map abbreviations for nice display.
    if (partLower === 'uk') return 'United Kingdom';
    if (partLower === 'usa') return 'United States';
    if (partLower === 'uae') return 'United Arab Emirates';
    return part;
  }

  // Default fallback to first part if no specific part found
  if (parts[0] && parts[0].toLowerCase() !== destLower && !destLower.includes(parts[0].toLowerCase())) {
    return parts[0];
  }
  return '';
};

export default function ActivitiesPage({ destination, onBack, onViewAttraction }: ActivitiesPageProps) {
  const { t, formatPrice } = useSettings();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'All' | 'budget' | 'mid' | 'premium'>('All');
  const [selectedSort, setSelectedSort] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc'>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Auto-reset region and category filters when destination changes
  useEffect(() => {
    setSelectedRegion(null);
    setSelectedCategory(null);
  }, [destination]);

  const destinationData = useMemo(() => 
    DESTINATIONS.find(d => d.name.toLowerCase() === destination.toLowerCase()) || 
    DESTINATIONS.find(d => d.id.toLowerCase() === destination.toLowerCase())
  , [destination]);
  
  useEffect(() => {
    let isMounted = true;
    
    async function fetchAttractions() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ApiService.getAttractionsByDestination(destination);
        if (isMounted) {
          setAttractions(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAttractions();
    return () => { isMounted = false; };
  }, [destination, retryCount]);

  const handleRetry = () => setRetryCount(prev => prev + 1);

  const heroImages = useMemo(() => {
    const images = [];
    if (destinationData?.imageUrl) images.push(destinationData.imageUrl);
    const attractionImages = attractions.map(a => a.imageUrl).filter(img => img !== destinationData?.imageUrl);
    return [...images, ...attractionImages].slice(0, 5);
  }, [destinationData, attractions]);

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const heroImage = heroImages[currentHeroIndex] || 'https://images.unsplash.com/photo-1473951574080-01fe45ec8643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  const isKnownDestination = !!destinationData || 
                             ['europe', 'singapore', 'thailand', 'australia', 'japan', 'usa', 'uae', 'switzerland'].includes(destination.toLowerCase());

  const categories = useMemo(() => {
    const cats = new Set(attractions.map(a => a.category));
    return Array.from(cats).sort();
  }, [attractions]);

  const regionsInDestination = useMemo(() => {
    const list = new Set<string>();
    attractions.forEach(attr => {
      const name = getSubRegionName(attr.location, destination);
      if (name) {
        list.add(name);
      }
    });
    return Array.from(list).sort();
  }, [attractions, destination]);

  const finalAttractions = useMemo(() => {
    let result = attractions.filter(attr => {
      const matchesCategory = !selectedCategory || attr.category === selectedCategory;
      const matchesRegion = !selectedRegion || getSubRegionName(attr.location, destination) === selectedRegion;
      const matchesSearch = !searchQuery || 
        attr.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        attr.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const itemPrice = attr.discountPrice || attr.price;
      const matchesPrice = selectedPriceRange === 'All' ||
        (selectedPriceRange === 'budget' && itemPrice <= 20) ||
        (selectedPriceRange === 'mid' && itemPrice > 20 && itemPrice <= 50) ||
        (selectedPriceRange === 'premium' && itemPrice > 50);

      return matchesCategory && matchesRegion && matchesSearch && matchesPrice;
    });

    if (selectedSort === 'priceAsc') {
      result = [...result].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (selectedSort === 'priceDesc') {
      result = [...result].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (selectedSort === 'ratingDesc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [attractions, selectedCategory, selectedRegion, searchQuery, selectedPriceRange, selectedSort]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6">
        <ErrorMessage 
          onRetry={handleRetry} 
          message={error}
        />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300">
      
      {/* Hero Header Section */}
      <div className="relative w-full h-[260px] md:h-[320px] bg-slate-900 overflow-hidden mb-0">
          <div 
            key={heroImage}
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            {/* Elegant dark overlay */}
            <div className="absolute inset-0 bg-black/45" />
          </div>

         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
            
            <button 
              onClick={onBack}
              className="absolute top-5 left-4 md:left-6 flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors group whitespace-nowrap shrink-0 bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Return to Explore
            </button>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl mt-6"
            >
              <span className="block text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Curated Collection
              </span>
              <h1 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-2 capitalize drop-shadow-md">
                {destination}
              </h1>
              <p className="text-xs md:text-sm text-white/80 font-medium leading-relaxed max-w-lg mb-1">
                {isKnownDestination 
                  ? `Discover a handpicked selection of refined experiences and cultural highlights across ${destination}.`
                  : `Showing exclusive experiences matching your search for "${destination}".`
                }
              </p>
            </motion.div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto pb-16 relative z-20 px-4 md:px-6 mt-8 md:mt-10">
        <div className="w-full">
          
          <div className="max-w-xl mb-8">
            <SearchBar 
              onSearch={(q) => setSearchQuery(q)}
              placeholder={`Search experiences in ${destination}...`}
            />
          </div>

          {/* Mobile Filter Toggle Button & Filter Summary Banner */}
          <div className="lg:hidden flex items-center justify-between gap-4 mb-6 select-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="text-xs">
              <span className="text-gray-400 dark:text-slate-500 font-semibold block text-[10px] uppercase tracking-wider">Active Filters</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">
                {[
                  selectedRegion ? selectedRegion : null,
                  selectedCategory ? selectedCategory : null,
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
                  {(selectedRegion || selectedCategory || selectedPriceRange !== 'All' || searchQuery !== '') && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion(null);
                        setSelectedCategory(null);
                        setSelectedPriceRange('All');
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-brand hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Dynamic sub-region/country filter (Region) */}
                {regionsInDestination.length > 1 && (
                  <div className="mb-6">
                    <span className="block text-[10px] uppercase tracking-widest font-black text-[#5E6D77] dark:text-slate-400 mb-3 select-none">
                      Filter by Area
                    </span>
                    <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar-y">
                      <button
                        onClick={() => {
                          setSelectedRegion(null);
                          if (window.innerWidth < 1024) setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedRegion === null 
                            ? 'bg-brand text-white border-brand shadow-md shadow-brand/20 font-extrabold' 
                            : 'bg-gray-50 dark:bg-slate-950 text-gray-750 dark:text-slate-350 border-transparent hover:border-brand/30 hover:bg-gray-150 dark:hover:bg-slate-900'
                        }`}
                      >
                        All Areas
                      </button>
                      {regionsInDestination.map(region => (
                        <button
                          key={region}
                          onClick={() => {
                            setSelectedRegion(region);
                            if (window.innerWidth < 1024) setShowMobileFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            selectedRegion === region 
                              ? 'bg-brand text-white border-brand shadow-md shadow-brand/20 font-extrabold' 
                              : 'bg-gray-50 dark:bg-slate-950 text-gray-755 dark:text-slate-350 border-transparent hover:border-brand/30 hover:bg-gray-150 dark:hover:bg-slate-900'
                          }`}
                        >
                          {region}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Filter Section */}
                <div className="mb-6">
                  <span className="block text-[10px] uppercase tracking-widest font-black text-[#5E6D77] dark:text-slate-400 mb-3 select-none">
                    Activity Category
                  </span>
                  <div className="flex flex-col gap-1.5 max-h-[260px] overflow-y-auto pr-1 no-scrollbar-y">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        if (window.innerWidth < 1024) setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedCategory === null 
                          ? 'bg-brand text-white border-brand shadow-md shadow-brand/20 font-extrabold' 
                          : 'bg-gray-50 dark:bg-slate-950 text-gray-755 dark:text-slate-350 border-transparent hover:border-brand/30 hover:bg-gray-150 dark:hover:bg-slate-900'
                      }`}
                    >
                      All Experiences
                    </button>
                    {categories.map(cat => {
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            if (window.innerWidth < 1024) setShowMobileFilters(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            isSelected 
                              ? 'bg-brand text-white border-brand shadow-md shadow-brand/20 font-extrabold' 
                              : 'bg-gray-50 dark:bg-slate-950 text-gray-755 dark:text-slate-350 border-transparent hover:border-brand/30 hover:bg-gray-150 dark:hover:bg-slate-900'
                          }`}
                        >
                          {cat}
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
                    <span>Loading available experiences...</span>
                  ) : (
                    <span>
                      Found <span className="text-brand font-black">{finalAttractions.length}</span> matching experiences
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5E6D77]">Sort By:</span>
                  <div className="relative flex items-center bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-805 rounded-xl px-3 py-1.5 shadow-xs shrink-0">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value as any)}
                      className="bg-transparent text-xs font-black text-gray-755 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
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
                    <p className="text-gray-500 font-medium text-xs">Curating outstanding options in {destination}...</p>
                  </div>
                ) : finalAttractions.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                  >
                    <AnimatePresence>
                      {finalAttractions.map(attr => (
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
                    <p className="text-gray-500 text-xs max-w-sm mx-auto">We couldn't spot any experiences in {destination} that match your selected filters. Let's start fresh!</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion(null);
                        setSelectedCategory(null);
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
    </div>
  );
}
