import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { ApiService } from '../services/apiService';
import { Destination } from '../types';
import ErrorMessage from './ErrorMessage';

interface FeaturedDestinationsProps {
  onSelectDestination: (destination: string) => void;
}

export default function FeaturedDestinations({ onSelectDestination }: FeaturedDestinationsProps) {
  const { t } = useSettings();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDestinations() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ApiService.getDestinations();
        if (isMounted) {
          setDestinations(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load destinations');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchDestinations();
    return () => { isMounted = false; };
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [destinations.length]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ErrorMessage 
            onRetry={() => window.location.reload()} 
            message={error}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 md:py-6 bg-transparent" id="destinations">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-5 text-center md:flex md:items-end md:justify-between md:text-left">
          <div>
            <span className="text-brand font-bold text-xs mb-2 block tracking-wide">Take a look</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">{t('popularDestinations')}</h2>
          </div>
          {!isLoading && destinations.length > 0 && (
            <div className="hidden md:flex items-center gap-3 mt-6 md:mt-0">
              <button 
                onClick={scrollLeft}
                disabled={!showLeftScroll}
                className={`p-3.5 rounded-full border transition-all ${
                  !showLeftScroll ? 'border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white hover:border-brand hover:text-brand hover:bg-brand/5 active:scale-95 shadow-sm hover:shadow-md'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRight}
                disabled={!showRightScroll}
                className={`p-3.5 rounded-full border transition-all ${
                  !showRightScroll ? 'border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white hover:border-brand hover:text-brand hover:bg-brand/5 active:scale-95 shadow-sm hover:shadow-md'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="relative group/slider min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-brand animate-spin" />
              <p className="text-gray-500 dark:text-slate-400 font-medium tracking-tight">Finding top destinations...</p>
            </div>
          ) : (
            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar after:content-[''] after:w-4 after:shrink-0 md:after:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {destinations.slice(0, 10).map((dest) => (
                <div
                  key={dest.id}
                  className="group cursor-pointer shrink-0 snap-start w-[180px] md:w-[220px]"
                  onClick={() => onSelectDestination(dest.name)}
                >
                  <div className="relative aspect-square rounded-[1.75rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 group-hover:border-brand/30 transition-all duration-500 hover:shadow-md hover:-translate-y-1">
                    <img 
                      src={dest.imageUrl} 
                      alt={dest.name} 
                      className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute z-20 inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end items-center p-4 text-center pb-6 opacity-100 transition-opacity">
                      <h3 className="text-white text-base md:text-lg font-black mb-1 leading-tight group-hover:text-brand transition-colors tracking-tight">{dest.name}</h3>
                      <p className="text-white/80 text-[9px] font-bold uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">{dest.attractionsCount} places</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
