import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  RotateCcw,
  Compass,
  Sparkles,
  MapPin,
  Globe,
  X,
} from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { POPULAR_ATTRACTIONS } from "../data/mockData";
import AttractionCard from "./AttractionCard";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onBackToHome: () => void;
  onViewAttraction: (id: string) => void;
}

export default function AttractionsAndMuseumsPage({
  onBackToHome,
  onViewAttraction,
}: Props) {
  const { t } = useSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [sortBy, setSortBy] = useState<
    "popularity" | "rating" | "price-asc" | "price-desc"
  >("popularity");

  // Dynamically extract categories and cities from POPULAR_ATTRACTIONS
  const categories = useMemo(() => {
    const cats = new Set(
      POPULAR_ATTRACTIONS.map((a) => a.category).filter(Boolean),
    );
    return ["All", ...Array.from(cats)];
  }, []);

  const regions = useMemo(() => {
    const regs = new Set(
      POPULAR_ATTRACTIONS.map((a) => a.region).filter(Boolean),
    );
    return ["All", ...Array.from(regs)];
  }, []);

  const cities = useMemo(() => {
    const filteredByRegion =
      selectedRegion === "All"
        ? POPULAR_ATTRACTIONS
        : POPULAR_ATTRACTIONS.filter((a) => a.region === selectedRegion);
    const cits = new Set(filteredByRegion.map((a) => a.city).filter(Boolean));
    return ["All", ...Array.from(cits)];
  }, [selectedRegion]);

  // Filter and sort attractions automatically
  const filteredAndSortedAttractions = useMemo(() => {
    let result = [...POPULAR_ATTRACTIONS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.description || "").toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Region filter
    if (selectedRegion !== "All") {
      result = result.filter((a) => a.region === selectedRegion);
    }

    // City filter
    if (selectedCity !== "All") {
      result = result.filter((a) => a.city === selectedCity);
    }

    // Sort
    result.sort((a, b) => {
      const priceA = a.discountPrice ?? a.price;
      const priceB = b.discountPrice ?? b.price;

      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "popularity":
        default:
          return (
            (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) ||
            b.reviewsCount - a.reviewsCount
          );
      }
    });

    return result;
  }, [searchQuery, selectedCategory, selectedRegion, selectedCity, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedRegion("All");
    setSelectedCity("All");
    setSortBy("popularity");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 pb-20 pt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back action */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer select-none active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
              Explore the World
            </span>
            <span className="text-sm font-black text-[#1A2B48] dark:text-slate-200">
              All Experiences in One Place
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 md:p-16 mb-10 shadow-xl border border-slate-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay opacity-20" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Access Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Attractions & Museums
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-0">
              Browse, filter, and lock in all premium entry passes, private
              museum visits, skip-the-line bookings, and incredible city
              adventures. All listed experiences are automatically compiled here
              in real-time.
            </p>
          </div>
        </div>

        {/* Dynamic Interactive Controls Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-850 p-5 mb-8 shadow-sm flex flex-col gap-5">
          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by attraction name, description, city, or category..."
                className="w-full pl-11 pr-11 py-3 bg-[#F4F7F9] dark:bg-slate-950 text-[#1A2B48] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl font-semibold border border-transparent focus:border-brand/30 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all text-sm shadow-inner focus:shadow-md focus:ring-2 focus:ring-brand/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer select-none"
                  title="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0 select-none">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Sort By:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#F4F7F9] dark:bg-slate-950 text-[#1A2B48] dark:text-slate-100 font-bold border border-transparent rounded-xl focus:border-brand/40 focus:outline-none transition-colors text-sm cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating (Highest First)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Region Filter Row */}
          <div className="flex flex-col gap-2.5 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5 flex items-center gap-1.5 select-none">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter by Region:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setSelectedCity("All"); // Reset city when region changes
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all select-none cursor-pointer ${
                    selectedRegion === region
                      ? "border-brand bg-brand/5 text-brand dark:bg-brand/10 dark:border-brand"
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {region === "All" ? "All Regions" : region}
                </button>
              ))}
            </div>
          </div>

          {/* City Filter Row */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5 flex items-center gap-1.5 select-none">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter by Destination:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all select-none cursor-pointer ${
                    selectedCity === city
                      ? "border-brand bg-brand/5 text-brand dark:bg-brand/10 dark:border-brand"
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {city === "All" ? "All Destinations" : city}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-col gap-2.5 border-t border-slate-100 dark:border-slate-850/60 pt-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5 flex items-center gap-1.5 select-none">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter by Category:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all select-none cursor-pointer ${
                    selectedCategory === category
                      ? "border-brand bg-brand/5 text-brand dark:bg-brand/10 dark:border-brand"
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {category === "All" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counter & Clear state */}
        <div className="flex items-center justify-between mb-6 select-none">
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
            Showing{" "}
            <span className="text-brand font-extrabold">
              {filteredAndSortedAttractions.length}
            </span>{" "}
            out of{" "}
            <span className="text-slate-800 dark:text-slate-100 font-extrabold">
              {POPULAR_ATTRACTIONS.length}
            </span>{" "}
            listed experiences
          </p>
          {(searchQuery ||
            selectedCategory !== "All" ||
            selectedRegion !== "All" ||
            selectedCity !== "All") && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-brand hover:underline cursor-pointer select-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Grid List with Animation */}
        <AnimatePresence mode="popLayout">
          {filteredAndSortedAttractions.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredAndSortedAttractions.map((attr, idx) => (
                <motion.div
                  key={attr.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(idx * 0.04, 0.4),
                  }}
                >
                  <AttractionCard attr={attr} onClick={onViewAttraction} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl p-12 text-center max-w-md mx-auto mt-12"
            >
              <Compass className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-black text-[#1A2B48] dark:text-slate-200 mb-2">
                No matching experiences
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                We couldn't find any activities matching your filters. Try
                adjusting your search query or choosing another category or
                city.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer select-none"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
