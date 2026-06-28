import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Navigation,
  Landmark,
  X,
  Clock,
  Trash2,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { POPULAR_ATTRACTIONS, DESTINATIONS } from "../data/mockData";
import { useSettings } from "../contexts/SettingsContext";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isCompact?: boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  onSearch,
  isCompact = false,
  className = "",
  placeholder,
  autoFocus = false,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { formatPrice, t } = useSettings();

  // Load recent searches on mount
  useEffect(() => {
    const stored = localStorage.getItem("tiqsey_recent_searches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;
    setRecentSearches((prev) => {
      const updated = [
        cleaned,
        ...prev.filter((q) => q.toLowerCase() !== cleaned.toLowerCase()),
      ].slice(0, 5);
      localStorage.setItem("tiqsey_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter(
        (q) => q.toLowerCase() !== query.toLowerCase(),
      );
      if (updated.length > 0) {
        localStorage.setItem("tiqsey_recent_searches", JSON.stringify(updated));
      } else {
        localStorage.removeItem("tiqsey_recent_searches");
        // setShowSuggestions(false); // don't close, show popular activities
      }
      return updated;
    });
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("tiqsey_recent_searches");
  };

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setSuggestions([]);
    }
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        const isMatch = (target: string | undefined, query: string) => {
          if (!target) return false;
          const cleanTarget = target.toLowerCase().replace(/[^a-z0-9]/g, "");
          const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "");
          return (
            cleanTarget.includes(cleanQuery) ||
            target.toLowerCase().includes(query.toLowerCase())
          );
        };

        const filteredDestinations = DESTINATIONS.filter((d) =>
          isMatch(d.name, searchQuery),
        ).map((d) => ({ ...d, type: "destination" }));

        const filteredAttractions = POPULAR_ATTRACTIONS.filter(
          (a) =>
            isMatch(a.name, searchQuery) ||
            isMatch(a.city, searchQuery) ||
            isMatch(a.description, searchQuery),
        ).map((a) => ({ ...a, type: "attraction" }));

        setSuggestions(
          [...filteredDestinations, ...filteredAttractions].slice(0, 8),
        );
        setShowSuggestions(true);
        setIsSearching(false);
      } else {
        setSuggestions([]);
        if (isFocused) {
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
        setIsSearching(false);
      }
      setSelectedIndex(-1); // reset selection
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    const handleKeyDownGlobal = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    const handleScroll = () => {
      if (showSuggestions) {
        setShowSuggestions(false);
        setIsFocused(false);
        // Optional: blur the active element if it's our input
        if (
          document.activeElement instanceof HTMLElement &&
          dropdownRef.current?.contains(document.activeElement)
        ) {
          document.activeElement.blur();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDownGlobal);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDownGlobal);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showSuggestions]);

  const handleBookingRedirect = (id: string) => {
    window.open(
      `${window.location.origin}/activities/${encodeURIComponent(id)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      // Check if we selected something via keyboard
      if (selectedIndex >= 0 && suggestions.length > 0) {
        const selected = suggestions[selectedIndex];
        handleSuggestionClick(selected);
        return;
      }

      // If there's an exact match or first suggestion is an attraction, redirect if it's the only one
      const topAttraction = suggestions.find((s) => s.type === "attraction");
      if (topAttraction && suggestions.length === 1) {
        handleBookingRedirect(topAttraction.id);
      } else {
        onSearch(searchQuery.trim());
      }
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (item: any) => {
    saveRecentSearch(item.name);
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setIsFocused(false);

    if (item.type === "attraction" && item.id) {
      handleBookingRedirect(item.id);
    } else {
      onSearch(item.name);
    }
  };

  const handlePopularActivityClick = (item: any) => {
    saveRecentSearch(item.name);
    setSearchQuery(item.name);
    setShowSuggestions(false);
    setIsFocused(false);
    handleBookingRedirect(item.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const highlightText = (text: string | undefined, query: string) => {
    if (!text) return null;
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-brand font-extrabold bg-brand/5">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const [selectedDestForActivities, setSelectedDestForActivities] = useState<string>(DESTINATIONS[0]?.name || "Tokyo, Japan");

  const popularActivities = React.useMemo(() => {
    const city = selectedDestForActivities.split(",")[0].trim();
    const filtered = POPULAR_ATTRACTIONS.filter(
      (a) => a.city.toLowerCase() === city.toLowerCase()
    );
    if (filtered.length > 0) {
      return filtered.slice(0, 4);
    }
    return POPULAR_ATTRACTIONS.slice(0, 4);
  }, [selectedDestForActivities]);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <form
        onSubmit={handleSearch}
        className={`relative z-30 group w-full flex items-center ${
          isCompact
            ? "bg-white dark:bg-slate-900 rounded-none h-10 border border-slate-200 dark:border-slate-800 focus-within:border-brand/50 transition-colors shadow-sm overflow-hidden"
            : "bg-white dark:bg-slate-900 rounded-full p-2 pl-6 md:pl-8 h-16 md:h-[72px] border-[6px] border-black/10 dark:border-white/10 hover:border-black/20 focus-within:border-brand/30 shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
        }`}
      >
        {!isCompact && (
          <Search
            className="w-6 h-6 text-slate-400 dark:text-slate-500 mr-3 shrink-0"
            strokeWidth={2.5}
          />
        )}
        <input
          id={isCompact ? "compact-search-input" : undefined}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            (isCompact
              ? "search..."
              : "Search destinations, activities, tours, attractions...")
          }
          autoFocus={autoFocus}
          className={`focus:outline-none transition-all duration-300 ease-in-out font-sans leading-normal ${
            isCompact
              ? "text-[14px] flex-1 bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 px-3 py-0 h-full focus:ring-0 focus:border-none focus:outline-none"
              : "w-full text-slate-900 dark:text-white text-base md:text-lg bg-transparent border-none p-0 focus:ring-0 focus:border-none focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 pr-4 font-medium"
          }`}
        />
        {searchQuery && !isCompact && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer mr-2 shrink-0"
            title="Clear search"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}
        {isCompact ? (
          <>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  onSearch("");
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer mr-1 bg-transparent"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            )}
            <button
              type="submit"
              className="h-full px-5 bg-brand text-white flex items-center justify-center hover:bg-brand/95 transition-colors shrink-0 text-sm font-bold tracking-wide"
              aria-label="Submit search"
            >
              Search
            </button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="h-12 md:h-14 px-8 flex items-center justify-center gap-2 text-base md:text-lg text-white rounded-full font-bold hover:brightness-110 transition-all bg-brand shrink-0 shadow-md cursor-pointer"
          >
            <span className="hidden md:inline">Search</span>
            <Search className="w-5 h-5 md:hidden" strokeWidth={2.5} />
          </motion.button>
        )}
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full mt-2.5 bg-white dark:bg-slate-900 shadow-[0_24px_54px_rgba(0,0,0,0.16)] border border-gray-100 dark:border-slate-800 overflow-hidden z-[999999] ${
              isCompact
                ? "right-0 w-[calc(100vw-32px)] md:w-[600px] rounded-none"
                : "left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] sm:w-[500px] md:w-[580px] lg:w-[640px] rounded-[20px]"
            }`}
          >
            {isSearching ? (
              <div className="p-10 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-100 dark:border-slate-800 border-t-brand rounded-full animate-spin"></div>
                <p className="text-sm text-slate-400 mt-4 font-medium">
                  Searching amazing experiences...
                </p>
              </div>
            ) : searchQuery.trim().length < 2 ? (
              <div className="max-h-[500px] overflow-y-auto">
                {recentSearches.length > 0 && (
                  <div className="mb-2">
                    <div className="px-5 py-3 bg-gray-50/80 dark:bg-slate-900/60 flex items-center justify-between border-b border-gray-100/50 dark:border-slate-800/50">
                      <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAllRecentSearches();
                        }}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand dark:hover:text-brand transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All
                      </button>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-slate-800">
                      {recentSearches.map((item, index) => (
                        <div
                          key={`recent-${index}`}
                          className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors px-5 py-3 group cursor-pointer"
                          onClick={() => {
                            onSearch(item);
                            setSearchQuery(item);
                            saveRecentSearch(item);
                            setShowSuggestions(false);
                            setIsFocused(false);
                          }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand dark:group-hover:text-brand transition-colors truncate">
                              {item}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRecentSearch(item);
                            }}
                            className="p-1.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800/80 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-2">
                  <div className="px-5 py-3 bg-gray-50/80 dark:bg-slate-900/60 border-b border-gray-100/50 dark:border-slate-800/50">
                    <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-brand" />
                      Popular Destinations
                    </span>
                  </div>
                  <div className="flex gap-3 p-4 bg-white dark:bg-slate-950 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {DESTINATIONS.slice(0, 5).map((item, index) => {
                      const isSelected = selectedDestForActivities === item.name;
                      return (
                        <button
                          key={`dest-${index}`}
                          onMouseEnter={() => setSelectedDestForActivities(item.name)}
                          onClick={() => {
                            if (isSelected) {
                              saveRecentSearch(item.name);
                              setSearchQuery(item.name);
                              setShowSuggestions(false);
                              setIsFocused(false);
                              onSearch(item.name);
                            } else {
                              setSelectedDestForActivities(item.name);
                            }
                          }}
                          className={`flex flex-col gap-2 min-w-[100px] shrink-0 rounded-2xl p-2 transition-all duration-300 text-center group items-center ${
                            isSelected 
                              ? "bg-gray-50 dark:bg-slate-900/60 shadow-sm" 
                              : "hover:bg-gray-50 dark:hover:bg-slate-800/60"
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-sm transition-all duration-300 ${
                            isSelected 
                              ? "scale-110 border-2 border-gray-400 dark:border-slate-500" 
                              : "border-2 border-transparent group-hover:border-gray-300 dark:group-hover:border-slate-700"
                          }`}>
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <h4 className={`text-xs font-bold transition-colors truncate w-full px-1 ${
                            isSelected 
                              ? "text-gray-900 dark:text-slate-100 font-extrabold" 
                              : "text-gray-500 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-100"
                          }`}>
                            {item.name}
                          </h4>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="px-5 py-3 bg-gray-50/80 dark:bg-slate-900/60 border-b border-gray-100/50 dark:border-slate-800/50">
                    <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-brand" />
                      Popular Activities in {selectedDestForActivities.split(",")[0]}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 p-4 bg-white dark:bg-slate-950">
                    {popularActivities.map((item, index) => (
                      <button
                        key={`pop-${index}`}
                        onClick={() => handlePopularActivityClick(item)}
                        className="flex flex-col gap-2 pb-3 rounded-2xl hover:shadow-md transition-all text-left group border border-gray-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
                      >
                        <div className="w-full h-28 shrink-0 relative overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0 px-3 pt-1">
                          <h4 className="text-[13px] font-bold text-gray-900 dark:text-slate-100 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-1 mt-1.5">
                            <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium flex items-center gap-1">
                              <Landmark className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
                              {item.city}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800">
                {/* Destinations Section */}
                {suggestions.some((item) => item.type === "destination") && (
                  <div>
                    <div className="px-5 py-2.5 bg-gray-50/80 dark:bg-slate-900/60 sticky top-0 z-10">
                      <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                        Destinations
                      </p>
                    </div>
                    {suggestions
                      .filter((item) => item.type === "destination")
                      .map((item, index) => {
                        const absoluteIndex = suggestions.findIndex(
                          (s) => s === item,
                        );
                        return (
                          <button
                            key={`dest-${index}`}
                            onClick={() => handleSuggestionClick(item)}
                            className={`w-full flex items-center gap-4 px-5 py-3 transition-colors text-left group ${absoluteIndex === selectedIndex ? "bg-brand/5 dark:bg-brand/10" : "hover:bg-gray-50 dark:hover:bg-slate-800/60"}`}
                          >
                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-brand dark:group-hover:text-brand transition-colors truncate">
                                  {highlightText(item.name, searchQuery)}
                                </h4>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-brand/10 text-brand uppercase tracking-wider shrink-0">
                                  City
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">
                                {item.attractionsCount}+ Attractions
                              </p>
                            </div>
                            <Navigation className="w-3.5 h-3.5 text-gray-300 dark:text-slate-500 group-hover:text-brand dark:group-hover:text-brand" />
                          </button>
                        );
                      })}
                  </div>
                )}

                {/* Attractions Section */}
                {suggestions.some((item) => item.type === "attraction") && (
                  <div>
                    <div className="px-5 py-2.5 bg-gray-50/80 dark:bg-slate-900/60 sticky top-0 z-10">
                      <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                        Activities & Attractions
                      </p>
                    </div>
                    {suggestions
                      .filter((item) => item.type === "attraction")
                      .map((item, index) => {
                        const absoluteIndex = suggestions.findIndex(
                          (s) => s === item,
                        );
                        return (
                          <button
                            key={`attr-${index}`}
                            onClick={() => handleSuggestionClick(item)}
                            className={`w-full flex items-center gap-4 px-5 py-3 transition-colors text-left group ${absoluteIndex === selectedIndex ? "bg-brand/5 dark:bg-brand/10" : "hover:bg-gray-50 dark:hover:bg-slate-800/60"}`}
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-brand dark:group-hover:text-brand transition-colors truncate">
                                  {highlightText(item.name, searchQuery)}
                                </h4>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                                  {item.category || "Activity"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5 max-w-[250px] sm:max-w-[300px]">
                                {highlightText(item.description, searchQuery)}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                  <Landmark className="w-3 h-3 text-gray-300 dark:text-slate-500" />
                                  {highlightText(item.city, searchQuery)}
                                </span>
                                {item.rating && (
                                  <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                                    <Star className="w-3 h-3 fill-amber-500" />
                                    {item.rating}{" "}
                                    <span className="text-gray-400 font-medium">
                                      ({item.reviews})
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <p className="text-[8px] font-bold text-gray-400 dark:text-slate-500 uppercase leading-none mb-1 tracking-wider">
                                FROM
                              </p>
                              <p className="text-sm font-black text-brand leading-none">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            ) : searchQuery.trim().length >= 2 ? (
              <div className="p-10 text-center dark:bg-slate-900">
                <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  No activities found
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                  Try searching for something else like "Paris" or "Louvre"
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
