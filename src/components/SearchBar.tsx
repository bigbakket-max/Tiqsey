import React, { useState, useEffect, useRef } from 'react';
import { Search, Navigation, Landmark, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { POPULAR_ATTRACTIONS, DESTINATIONS } from '../data/mockData';
import { useSettings } from '../contexts/SettingsContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isCompact?: boolean;
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ onSearch, isCompact = false, className = '', placeholder }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { formatPrice, t } = useSettings();

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const isMatch = (target: string, query: string) => {
        const cleanTarget = target.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanTarget.includes(cleanQuery) || target.toLowerCase().includes(query.toLowerCase());
      };

      const filteredDestinations = DESTINATIONS.filter(d => 
        isMatch(d.name, searchQuery)
      ).map(d => ({ ...d, type: 'destination' }));

      const filteredAttractions = POPULAR_ATTRACTIONS.filter(a => 
        isMatch(a.name, searchQuery) ||
        isMatch(a.city, searchQuery)
      ).map(a => ({ ...a, type: 'attraction' }));

      setSuggestions([...filteredDestinations, ...filteredAttractions].slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (item: any) => {
    onSearch(item.name);
    setSearchQuery(item.name);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSearch} className="relative z-30 group w-full flex items-center">
        {isCompact && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none transition-colors text-slate-400 dark:text-slate-500 group-focus-within:text-brand">
            <Search className="w-4 h-4 text-current" strokeWidth={2.25} />
          </div>
        )}
        <input 
          id={isCompact ? "compact-search-input" : undefined}
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder || t('searchPlaceholder')}
          className={`w-full text-slate-900 dark:text-white focus:outline-none transition-all duration-300 ease-in-out placeholder:text-slate-400/80 font-medium leading-normal ${
            isCompact 
              ? 'text-xs lg:text-[13px] h-10 pl-9 pr-8 bg-white dark:bg-slate-950 rounded-[6px] border-[1.5px] border-black dark:border-slate-300 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 shadow-sm hover:border-black/80 dark:hover:border-slate-200' 
              : 'text-base md:text-lg h-14 md:h-16 pl-6 md:pl-8 pr-14 md:pr-48 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-brand/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full border border-gray-200 dark:border-slate-800'
          }`}
        />
        {isCompact ? (
          searchQuery && (
            <button 
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSearch('');
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <X className="w-3 h-3" strokeWidth={2.5} />
            </button>
          )
        ) : (
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="absolute right-2 md:right-2 top-1/2 -translate-y-1/2 w-12 md:w-auto h-12 md:h-[calc(100%-16px)] flex items-center justify-center gap-2 text-base md:text-lg text-white rounded-full font-bold hover:brightness-110 transition-all bg-brand md:px-8"
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline">Search</span>
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
            className={`absolute top-full mt-2.5 bg-white dark:bg-slate-900 rounded-[20px] shadow-[0_24px_54px_rgba(0,0,0,0.16)] border border-gray-100 dark:border-slate-800 overflow-hidden z-[999999] ${
              isCompact 
                ? 'right-0 left-auto w-[calc(100vw-32px)] sm:w-[460px] md:w-[540px]' 
                : 'left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] sm:w-[500px] md:w-[580px] lg:w-[640px]'
            }`}
          >
            {suggestions.length > 0 ? (
              <div className="max-h-[450px] overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800">
                {/* Destinations Section */}
                {suggestions.some(item => item.type === 'destination') && (
                  <div>
                    <div className="px-5 py-2.5 bg-gray-50/80 dark:bg-slate-900/60">
                      <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Destinations</p>
                    </div>
                    {suggestions.filter(item => item.type === 'destination').map((item, index) => (
                      <button
                        key={`dest-${index}`}
                        onClick={() => handleSuggestionClick(item)}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-brand dark:group-hover:text-brand transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">
                            {item.attractionsCount}+ Attractions
                          </p>
                        </div>
                        <Navigation className="w-3.5 h-3.5 text-gray-300 dark:text-slate-500 group-hover:text-brand dark:group-hover:text-brand" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Attractions Section */}
                {suggestions.some(item => item.type === 'attraction') && (
                  <div>
                    <div className="px-5 py-2.5 bg-gray-50/80 dark:bg-slate-900/60">
                      <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Activities & Attractions</p>
                    </div>
                    {suggestions.filter(item => item.type === 'attraction').map((item, index) => (
                      <button
                        key={`attr-${index}`}
                        onClick={() => handleSuggestionClick(item)}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-brand dark:group-hover:text-brand transition-colors truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium flex items-center gap-1">
                              <Landmark className="w-3 h-3 text-gray-300 dark:text-slate-500" />
                              {item.city}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[8px] font-bold text-gray-300 dark:text-slate-500 uppercase leading-none mb-0.5 tracking-wider">FROM</p>
                          <p className="text-sm font-black text-brand leading-none">{formatPrice(item.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : searchQuery.trim().length >= 2 ? (
              <div className="p-10 text-center dark:bg-slate-900">
                <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No results found</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Try searching for something else like "Paris" or "Louvre"</p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
