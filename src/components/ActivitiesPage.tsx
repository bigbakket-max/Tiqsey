import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DESTINATIONS } from "../data/mockData";
import {
  Star,
  ArrowLeft,
  Loader2,
  Flame,
  Search,
  SlidersHorizontal,
  Compass,
  Building,
  Trees,
  Ship,
  Utensils,
  Ticket,
  Map,
  Layers,
  Award,
  Tag,
  Check,
  X,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import SearchBar from "./SearchBar";
import { ApiService } from "../services/apiService";
import { Attraction } from "../types";
import ErrorMessage from "./ErrorMessage";
import AttractionCard from "./AttractionCard";

interface ActivitiesPageProps {
  destination: string;
  onBack: () => void;
  onViewAttraction?: (id: string) => void;
}

const getSubRegionName = (location: string, dest: string): string => {
  const parts = location
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return "";

  const destLower = dest.toLowerCase();

  // If the destination is "Europe" or similar continents...
  if (destLower === "europe") {
    const last = parts[parts.length - 1];
    if (last.toLowerCase() === "uk") return "United Kingdom";
    if (last.toLowerCase() === "usa") return "United States";
    return last;
  }

  // Work backwards. Find the parts of location.
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    const partLower = part.toLowerCase();

    // If this part is exactly the destination name, continue to more specific part
    if (
      partLower === destLower ||
      destLower.includes(partLower) ||
      partLower.includes(destLower)
    ) {
      continue;
    }

    // Check if some common country names are redundant when filtering inside a specific country
    if (
      partLower === "japan" ||
      partLower === "usa" ||
      partLower === "uae" ||
      partLower === "australia"
    ) {
      continue;
    }

    // Found a part that is more specific. Map abbreviations for nice display.
    if (partLower === "uk") return "United Kingdom";
    if (partLower === "usa") return "United States";
    if (partLower === "uae") return "United Arab Emirates";
    return part;
  }

  // Default fallback to first part if no specific part found
  if (
    parts[0] &&
    parts[0].toLowerCase() !== destLower &&
    !destLower.includes(parts[0].toLowerCase())
  ) {
    return parts[0];
  }
  return "";
};

// Map each category to an expressive icon and tailwind color accent
const getCategoryMeta = (category: string) => {
  const cat = category.toLowerCase();
  if (
    cat.includes("museum") ||
    cat.includes("art") ||
    cat.includes("gallery") ||
    cat.includes("culture")
  ) {
    return {
      icon: Palette,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
    };
  }
  if (
    cat.includes("landmark") ||
    cat.includes("historic") ||
    cat.includes("building") ||
    cat.includes("palace") ||
    cat.includes("monument")
  ) {
    return {
      icon: Building,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
    };
  }
  if (
    cat.includes("nature") ||
    cat.includes("park") ||
    cat.includes("garden") ||
    cat.includes("mountain") ||
    cat.includes("outdoor")
  ) {
    return {
      icon: Trees,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    };
  }
  if (
    cat.includes("adventure") ||
    cat.includes("thrill") ||
    cat.includes("sport") ||
    cat.includes("climb") ||
    cat.includes("theme park")
  ) {
    return {
      icon: Compass,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/30",
    };
  }
  if (
    cat.includes("cruise") ||
    cat.includes("boat") ||
    cat.includes("water") ||
    cat.includes("river")
  ) {
    return { icon: Ship, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/30" };
  }
  if (
    cat.includes("food") ||
    cat.includes("wine") ||
    cat.includes("drink") ||
    cat.includes("culinary") ||
    cat.includes("cooking")
  ) {
    return {
      icon: Utensils,
      color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30",
    };
  }
  if (
    cat.includes("show") ||
    cat.includes("theater") ||
    cat.includes("concert") ||
    cat.includes("event") ||
    cat.includes("broadway")
  ) {
    return {
      icon: Ticket,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
    };
  }
  if (
    cat.includes("tour") ||
    cat.includes("walking") ||
    cat.includes("sightseeing") ||
    cat.includes("guide")
  ) {
    return { icon: Map, color: "text-teal-500 bg-teal-50 dark:bg-teal-950/30" };
  }
  return {
    icon: Layers,
    color: "text-slate-500 bg-slate-50 dark:bg-slate-950/30",
  };
};

// Simple Fallback Palette Icon
const Palette = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03442 19.1758 5.12234 19.2638 5.16361 19.3496C5.19946 19.4241 5.2 19.507 5.16524 19.581C5.12528 19.666 5.03606 19.7497 4.85761 19.9172L4.28014 20.4593C3.93175 20.7863 3.75756 20.9498 3.75385 21.1044C3.75051 21.2435 3.82138 21.3734 3.94073 21.4468C4.0772 21.5307 4.31295 21.5307 4.78446 21.5307H12Z" />
    <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
  </svg>
);

export default function ActivitiesPage({
  destination,
  onBack,
  onViewAttraction,
}: ActivitiesPageProps) {
  const { t, formatPrice } = useSettings();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    "All" | "budget" | "mid" | "premium"
  >("All");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<
    "recommended" | "priceAsc" | "priceDesc" | "ratingDesc"
  >("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Auto-reset state filters when destination changes
  useEffect(() => {
    setSelectedRegion(null);
    setSelectedCategory(null);
    setSelectedPriceRange("All");
    setSelectedRating(null);
    setSearchQuery("");
  }, [destination]);

  const destinationData = useMemo(
    () =>
      DESTINATIONS.find(
        (d) => d.name.toLowerCase() === destination.toLowerCase(),
      ) ||
      DESTINATIONS.find(
        (d) => d.id.toLowerCase() === destination.toLowerCase(),
      ),
    [destination],
  );

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
          setError(
            err instanceof Error ? err.message : "An unexpected error occurred",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAttractions();
    return () => {
      isMounted = false;
    };
  }, [destination, retryCount]);

  const handleRetry = () => setRetryCount((prev) => prev + 1);

  const heroImages = useMemo(() => {
    const images = [];
    if (destinationData?.imageUrl) images.push(destinationData.imageUrl);
    const attractionImages = attractions
      .map((a) => a.imageUrl)
      .filter((img) => img !== destinationData?.imageUrl);
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

  const heroImage =
    heroImages[currentHeroIndex] ||
    "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  const isKnownDestination =
    !!destinationData ||
    [
      "europe",
      "singapore",
      "thailand",
      "australia",
      "japan",
      "usa",
      "uae",
      "switzerland",
    ].includes(destination.toLowerCase());

  // 1. Categories extracted from ALL attractions in the current city
  const categories = useMemo(() => {
    const cats = new Set(attractions.map((a) => a.category));
    return Array.from(cats).sort();
  }, [attractions]);

  // 2. Sub-regions extracted from ALL attractions in the current city
  const regionsInDestination = useMemo(() => {
    const list = new Set<string>();
    attractions.forEach((attr) => {
      const name = getSubRegionName(attr.location, destination);
      if (name) {
        list.add(name);
      }
    });
    return Array.from(list).sort();
  }, [attractions, destination]);

  // 3. Pre-calculated counts based on original dataset for rich metadata
  const filterCounts = useMemo(() => {
    const regionCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    let budget = 0;
    let mid = 0;
    let premium = 0;
    let stars45 = 0;
    let stars40 = 0;
    let stars35 = 0;

    attractions.forEach((attr) => {
      // Region
      const reg = getSubRegionName(attr.location, destination);
      if (reg) {
        regionCounts[reg] = (regionCounts[reg] || 0) + 1;
      }

      // Category
      categoryCounts[attr.category] = (categoryCounts[attr.category] || 0) + 1;

      // Price ranges
      const price = attr.discountPrice || attr.price;
      if (price <= 20) budget++;
      else if (price <= 50) mid++;
      else premium++;

      // Star levels
      if (attr.rating >= 4.5) stars45++;
      if (attr.rating >= 4.0) stars40++;
      if (attr.rating >= 3.5) stars35++;
    });

    return {
      regions: regionCounts,
      categories: categoryCounts,
      prices: { budget, mid, premium, total: attractions.length },
      ratings: { stars45, stars40, stars35, total: attractions.length },
    };
  }, [attractions, destination]);

  // 4. City statistics banner values
  const cityStats = useMemo(() => {
    if (attractions.length === 0) return null;

    let minPrice = Infinity;
    let maxRating = 0;
    let totalReviews = 0;

    attractions.forEach((a) => {
      const p = a.discountPrice || a.price;
      if (p < minPrice) minPrice = p;
      if (a.rating > maxRating) maxRating = a.rating;
      totalReviews += a.reviewsCount || 0;
    });

    return {
      totalCount: attractions.length,
      startingPrice: minPrice === Infinity ? 0 : minPrice,
      maxRating: maxRating || 4.8,
      totalReviews,
    };
  }, [attractions]);

  // 5. Final filtered collection
  const finalAttractions = useMemo(() => {
    let result = attractions.filter((attr) => {
      const matchesCategory =
        !selectedCategory || attr.category === selectedCategory;
      const matchesRegion =
        !selectedRegion ||
        getSubRegionName(attr.location, destination) === selectedRegion;
      const matchesSearch =
        !searchQuery ||
        attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attr.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attr.location.toLowerCase().includes(searchQuery.toLowerCase());

      const itemPrice = attr.discountPrice || attr.price;
      const matchesPrice =
        selectedPriceRange === "All" ||
        (selectedPriceRange === "budget" && itemPrice <= 20) ||
        (selectedPriceRange === "mid" && itemPrice > 20 && itemPrice <= 50) ||
        (selectedPriceRange === "premium" && itemPrice > 50);

      const matchesRating = !selectedRating || attr.rating >= selectedRating;

      return (
        matchesCategory &&
        matchesRegion &&
        matchesSearch &&
        matchesPrice &&
        matchesRating
      );
    });

    if (selectedSort === "priceAsc") {
      result = [...result].sort(
        (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
      );
    } else if (selectedSort === "priceDesc") {
      result = [...result].sort(
        (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
      );
    } else if (selectedSort === "ratingDesc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [
    attractions,
    selectedCategory,
    selectedRegion,
    searchQuery,
    selectedPriceRange,
    selectedRating,
    selectedSort,
  ]);

  const hasActiveFilters =
    selectedRegion ||
    selectedCategory ||
    selectedPriceRange !== "All" ||
    selectedRating ||
    searchQuery !== "";

  const handleClearAll = () => {
    setSelectedRegion(null);
    setSelectedCategory(null);
    setSelectedPriceRange("All");
    setSelectedRating(null);
    setSearchQuery("");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6">
        <ErrorMessage onRetry={handleRetry} message={error} />
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfa] dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300">
      {/* Dynamic Animated Hero Header */}
      <div className="relative w-full h-[280px] md:h-[350px] bg-slate-950 overflow-hidden mb-0">
        <div
          key={heroImage}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-8">
          <button
            onClick={onBack}
            className="absolute top-5 left-4 md:left-6 flex items-center gap-2 text-xs font-bold text-white/90 hover:text-white transition-all bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 group select-none shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Explore</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand/90 text-white rounded-full text-[9px] font-black uppercase tracking-widest mb-3 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Curated Experiences</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-3 capitalize">
              {destination}
            </h1>
            <p className="text-xs md:text-sm text-white/80 font-medium leading-relaxed max-w-xl">
              {isKnownDestination
                ? `Immerse yourself in a refined suite of high-fidelity cultural tours, local secrets, and premium events curated in ${destination}.`
                : `Showing matching highlights and unique experiences tailored to your request for "${destination}".`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="max-w-7xl mx-auto pb-20 px-4 md:px-6 mt-8">
        {/* Bento Stats Ribbon Bar */}
        {cityStats && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">
                  Available Tours
                </span>
                <span className="text-base font-black text-slate-800 dark:text-slate-150">
                  {cityStats.totalCount} Curated Options
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">
                  Quality Assurance
                </span>
                <span className="text-base font-black text-slate-800 dark:text-slate-150">
                  Top-Rated {cityStats.maxRating}★ Class
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">
                  Starting Rate
                </span>
                <span className="text-base font-black text-slate-800 dark:text-slate-150">
                  From {formatPrice(cityStats.startingPrice)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search Engine and Chips area */}
        <div className="space-y-4 mb-6">
          <div className="max-w-xl">
            <SearchBar
              onSearch={(q) => setSearchQuery(q)}
              placeholder={`Find museum tickets, cruises, walking guides in ${destination}...`}
            />
          </div>

          {/* Active Filters List Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 select-none">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-1">
                Active:
              </span>

              {searchQuery && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-brand transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedRegion && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-semibold">
                  <MapPin className="w-3 h-3" />
                  <span>Area: {selectedRegion}</span>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedCategory && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-semibold">
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedPriceRange !== "All" && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-semibold">
                  <span>
                    Price:{" "}
                    {selectedPriceRange === "budget"
                      ? `Under ${formatPrice(20)}`
                      : selectedPriceRange === "mid"
                        ? `${formatPrice(20)} - ${formatPrice(50)}`
                        : `Over ${formatPrice(50)}`}
                  </span>
                  <button
                    onClick={() => setSelectedPriceRange("All")}
                    className="hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedRating && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-semibold">
                  <Star className="w-3 h-3 fill-brand stroke-none" />
                  <span>Rating: {selectedRating}+ ★</span>
                  <button
                    onClick={() => setSelectedRating(null)}
                    className="hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <button
                onClick={handleClearAll}
                className="text-xs font-extrabold text-brand hover:underline px-2.5 py-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Filters and Grid Split-View */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Mobile Filters Trigger */}
          <div className="lg:hidden w-full flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm select-none">
            <div className="text-xs">
              <span className="text-slate-400 dark:text-slate-500 font-extrabold block text-[9px] uppercase tracking-wider">
                Active Filters
              </span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {[
                  selectedRegion || null,
                  selectedCategory || null,
                  selectedPriceRange !== "All"
                    ? selectedPriceRange === "budget"
                      ? "Budget"
                      : selectedPriceRange === "mid"
                        ? "Mid"
                        : "Premium"
                    : null,
                  selectedRating ? `${selectedRating}+ ★` : null,
                ]
                  .filter(Boolean)
                  .join(", ") || "No filters applied"}
              </span>
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-brand/20 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {showMobileFilters ? "Hide Filters" : "Filter Options"}
              </span>
            </button>
          </div>

          {/* Filters Sidebar Module */}
          <div
            className={`w-full lg:w-72 lg:shrink-0 space-y-6 ${showMobileFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100/80 dark:border-slate-800/80 shadow-xs lg:sticky lg:top-24">
              {/* Header inside Filters sidebar */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100 dark:border-slate-800 select-none">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand" />
                  <span>Refine Search</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAll}
                    className="text-[10px] font-black uppercase tracking-wider text-brand hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Area sub-region Filter block */}
              {regionsInDestination.length > 1 && (
                <div className="mb-6 select-none">
                  <span className="block text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 mb-3">
                    Sub-Regions
                  </span>
                  <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1 no-scrollbar-y">
                    <button
                      onClick={() => {
                        setSelectedRegion(null);
                        if (window.innerWidth < 1024)
                          setShowMobileFilters(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedRegion === null
                          ? "bg-brand/5 text-brand border-brand/20 font-black"
                          : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <span>All Sub-Regions</span>
                      <span className="text-[10px] font-black font-mono bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                        {attractions.length}
                      </span>
                    </button>
                    {regionsInDestination.map((region) => {
                      const isSelected = selectedRegion === region;
                      const count = filterCounts.regions[region] || 0;
                      return (
                        <button
                          key={region}
                          onClick={() => {
                            setSelectedRegion(region);
                            if (window.innerWidth < 1024)
                              setShowMobileFilters(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-brand/5 text-brand border-brand/20 font-black"
                              : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <span className="truncate pr-2">{region}</span>
                          <span
                            className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-brand/15 text-brand"
                                : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dynamic Categories filter block */}
              {categories.length > 1 && (
                <div className="mb-6 select-none">
                  <span className="block text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 mb-3">
                    Categories
                  </span>
                  <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1 no-scrollbar-y">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        if (window.innerWidth < 1024)
                          setShowMobileFilters(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedCategory === null
                          ? "bg-brand/5 text-brand border-brand/20 font-black"
                          : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>All Experiences</span>
                      </div>
                      <span className="text-[10px] font-black font-mono bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                        {attractions.length}
                      </span>
                    </button>
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat;
                      const count = filterCounts.categories[cat] || 0;
                      const meta = getCategoryMeta(cat);
                      const IconComponent = meta.icon;

                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            if (window.innerWidth < 1024)
                              setShowMobileFilters(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-brand/5 text-brand border-brand/20 font-black"
                              : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <IconComponent
                              className={`w-3.5 h-3.5 ${meta.color} p-0.5 rounded-sm shrink-0`}
                            />
                            <span className="truncate">{cat}</span>
                          </div>
                          <span
                            className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-brand/15 text-brand"
                                : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Filter section */}
              <div className="mb-6 select-none">
                <span className="block text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 mb-3">
                  Pricing Tiers
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedPriceRange("All");
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedPriceRange === "All"
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <span>Any Price</span>
                    <span className="text-[10px] font-black font-mono bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                      {filterCounts.prices.total}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPriceRange("budget");
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedPriceRange === "budget"
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="truncate">
                      Budget (Under {formatPrice(20)})
                    </span>
                    <span
                      className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                        selectedPriceRange === "budget"
                          ? "bg-brand/15 text-brand"
                          : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {filterCounts.prices.budget}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPriceRange("mid");
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedPriceRange === "mid"
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="truncate">
                      {formatPrice(20)} - {formatPrice(50)}
                    </span>
                    <span
                      className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                        selectedPriceRange === "mid"
                          ? "bg-brand/15 text-brand"
                          : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {filterCounts.prices.mid}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPriceRange("premium");
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedPriceRange === "premium"
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="truncate">
                      Premium (Over {formatPrice(50)})
                    </span>
                    <span
                      className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                        selectedPriceRange === "premium"
                          ? "bg-brand/15 text-brand"
                          : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {filterCounts.prices.premium}
                    </span>
                  </button>
                </div>
              </div>

              {/* Rating level filter */}
              <div className="select-none">
                <span className="block text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 mb-3">
                  Minimum Rating
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedRating(null);
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedRating === null
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <span>Any Rating</span>
                    <span className="text-[10px] font-black font-mono bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                      {filterCounts.ratings.total}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRating(4.5);
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedRating === 4.5
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      </div>
                      <span>4.5+ Stars</span>
                    </div>
                    <span
                      className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                        selectedRating === 4.5
                          ? "bg-brand/15 text-brand"
                          : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {filterCounts.ratings.stars45}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRating(4.0);
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedRating === 4.0
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 text-amber-400" />
                      </div>
                      <span>4.0+ Stars</span>
                    </div>
                    <span
                      className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                        selectedRating === 4.0
                          ? "bg-brand/15 text-brand"
                          : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {filterCounts.ratings.stars40}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRating(3.5);
                      if (window.innerWidth < 1024) setShowMobileFilters(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedRating === 3.5
                        ? "bg-brand/5 text-brand border-brand/20 font-black"
                        : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <Star className="w-3 h-3 text-amber-400" />
                        <Star className="w-3 h-3 text-amber-400" />
                      </div>
                      <span>3.5+ Stars</span>
                    </div>
                    <span
                      className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded-full ${
                        selectedRating === 3.5
                          ? "bg-brand/15 text-brand"
                          : "bg-slate-100 dark:bg-slate-805 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {filterCounts.ratings.stars35}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Activities Grid Panel */}
          <div className="flex-1 w-full space-y-5">
            {/* Grid Top Sorting & Count details bar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between select-none">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-extrabold font-mono">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand" />
                    <span>Loading authentic tours...</span>
                  </div>
                ) : (
                  <span>
                    Found{" "}
                    <span className="text-brand font-black">
                      {finalAttractions.length}
                    </span>{" "}
                    luxury matches
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
                  Sort By:
                </span>
                <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-xs">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value as any)}
                    className="bg-transparent text-xs font-black text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
                  >
                    <option
                      value="recommended"
                      className="dark:bg-slate-900 font-bold"
                    >
                      Recommended Matches
                    </option>
                    <option
                      value="priceAsc"
                      className="dark:bg-slate-900 font-bold"
                    >
                      Price: Low to High
                    </option>
                    <option
                      value="priceDesc"
                      className="dark:bg-slate-900 font-bold"
                    >
                      Price: High to Low
                    </option>
                    <option
                      value="ratingDesc"
                      className="dark:bg-slate-900 font-bold"
                    >
                      Top Guest Ratings First
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Attractions rendering grid */}
            <div className="w-full">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
                  <Loader2 className="w-12 h-12 text-brand animate-spin mb-4" />
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">
                    Curating unique experiences in {destination}...
                  </p>
                </div>
              ) : finalAttractions.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5"
                >
                  <AnimatePresence>
                    {finalAttractions.map((attr) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
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
                <div className="flex flex-col items-center justify-center py-28 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs text-center p-6">
                  <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
                  <h3 className="text-base font-black text-slate-800 dark:text-white mb-2 uppercase tracking-wider">
                    No matching activities
                  </h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">
                    We couldn't spot any experiences in {destination} matching
                    your current filters. Let's widen the lens!
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="px-6 py-2.5 bg-brand text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-brand/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
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
