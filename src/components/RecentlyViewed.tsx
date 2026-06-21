import React, { useRef, useState, useEffect } from 'react';
import { Clock, Navigation2, Star, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Attraction } from '../types';
import { useSettings } from '../contexts/SettingsContext';

interface RecentlyViewedProps {
  items: Attraction[];
  onSelect: (itemId: string) => void;
  onClear: () => void;
}

export default function RecentlyViewed({ items, onSelect, onClear }: RecentlyViewedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const { formatPrice } = useSettings();

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
  }, [items.length]);

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

  if (items.length === 0) return null;

  return (
    <section className="py-4 md:py-6 bg-gray-50/80 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-white flex items-center justify-center text-brand shadow-xl shadow-brand/5 border border-brand/5">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-1">Recently viewed</h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] md:text-xs text-brand font-black tracking-wide leading-none">History</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <p className="text-[10px] md:text-xs text-gray-500 font-bold tracking-wide leading-none">Jump back into your favorites</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={scrollLeft}
                disabled={!showLeftScroll}
                className={`p-3.5 rounded-2xl border transition-all ${
                  !showLeftScroll ? 'border-gray-100 text-gray-200 cursor-not-allowed' : 'border-gray-200 text-gray-900 hover:border-brand hover:text-brand hover:bg-brand/5 active:scale-95 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRight}
                disabled={!showRightScroll}
                className={`p-3.5 rounded-2xl border transition-all ${
                  !showRightScroll ? 'border-gray-100 text-gray-200 cursor-not-allowed' : 'border-gray-200 text-gray-900 hover:border-brand hover:text-brand hover:bg-brand/5 active:scale-95 shadow-sm'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={onClear}
              className="group flex items-center gap-2 px-6 h-12 rounded-2xl bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-300 shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Clear
            </button>
          </div>
        </div>

        <div className="relative group/slider">
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="group cursor-pointer shrink-0 snap-start w-[180px] md:w-[210px] bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-850/80 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative aspect-[1.4/1] overflow-hidden">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 animate-pulse" />
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15 pointer-events-none" />
                  

                  <div className="absolute bottom-2.5 left-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none">
                    <div className="flex items-center gap-1 bg-black/80 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest shadow-md">
                      View
                    </div>
                  </div>
                </div>
                
                <div className="p-3.5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate max-w-[100px]">
                        {item.category || 'Attraction'}
                      </span>
                      <div className="flex items-center gap-0.5 px-2 py-0.5 bg-[#FFF9EB] dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-full h-5">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 shrink-0" />
                        <span className="text-[10px] font-black text-amber-900 dark:text-amber-200 leading-none">{item.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs md:text-[13px] leading-snug group-hover:text-brand transition-colors line-clamp-1 tracking-tight mb-3">
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between gap-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-850/60 mt-auto">
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-350 transition-colors truncate">
                      <Navigation2 className="w-2.5 h-2.5 fill-current shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-wider leading-none truncate max-w-[65px]">
                        {item.city}
                      </span>
                    </div>
                    
                    <div className="text-right flex flex-col items-end shrink-0 select-none whitespace-nowrap">
                      <span className="text-[8px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-wider leading-none mb-0.5">
                        From
                      </span>
                      <span className="text-[11px] md:text-xs font-black text-slate-950 dark:text-slate-200 leading-none">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
