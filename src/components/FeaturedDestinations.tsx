import React, { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { ApiService } from "../services/apiService";
import { Destination } from "../types";
import ErrorMessage from "./ErrorMessage";

interface FeaturedDestinationsProps {
  onSelectDestination: (destination: string) => void;
}

export default function FeaturedDestinations({
  onSelectDestination,
}: FeaturedDestinationsProps) {
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
          setError(
            err instanceof Error ? err.message : "Failed to load destinations",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchDestinations();
    return () => {
      isMounted = false;
    };
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
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [destinations.length]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
      scrollRef.current.scrollBy({
        left: -(cardWidth + 24),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
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
            <span className="text-brand font-bold text-xs mb-2 block tracking-wide">
              Take a look
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              {t("popularDestinations")}
            </h2>
          </div>
        </div>

        <div className="relative group/slider">
          {!isLoading && destinations.length > 0 && (
            <>
              <button
                onClick={scrollLeft}
                disabled={!showLeftScroll}
                className={`absolute -left-3 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100 active:bg-brand active:text-white active:border-brand active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-0 ${
                  !showLeftScroll
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft
                  className="w-4 h-4 md:w-5 md:h-5 text-current"
                  strokeWidth={2.5}
                />
              </button>
              <button
                onClick={scrollRight}
                disabled={!showRightScroll}
                className={`absolute -right-3 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100 active:bg-brand active:text-white active:border-brand active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-0 ${
                  !showRightScroll
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight
                  className="w-4 h-4 md:w-5 md:h-5 text-current"
                  strokeWidth={2.5}
                />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory no-scrollbar m-0 p-0 border-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="shrink-0 snap-start w-[220px] sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]"
                  >
                    <div className="aspect-[12/5] rounded-2xl bg-gray-200 dark:bg-slate-800 animate-pulse relative overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 p-4 pb-6 flex flex-col items-start gap-2">
                        <div className="h-6 w-2/3 bg-gray-300 dark:bg-slate-700 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                ))
              : destinations.slice(0, 10).map((dest) => {
                  return (
                    <div
                      key={dest.id}
                      className="group cursor-pointer shrink-0 snap-start w-[220px] sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]"
                      onClick={() => onSelectDestination(dest.name)}
                    >
                      <div className="relative aspect-[12/5] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 group-hover:border-brand/30 transition-all duration-500 hover:shadow-md hover:-translate-y-1">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />

                        {/* Gradient overlay and Left-aligned city text matches layout screenshot */}
                        <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 flex flex-col justify-end p-4 pb-4 text-left transition-opacity">
                          <h3 className="text-white text-base sm:text-lg lg:text-[20px] font-black leading-none group-hover:text-brand transition-colors tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                            {dest.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
                            <Search className="w-3 h-3 text-brand" />
                            <span>Search {dest.name.split(",")[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}
