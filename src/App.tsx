import React, { useState, useEffect } from 'react';
import { Smartphone, BadgeCheck, Sparkles, Star, Clock, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import PopularAttractions from './components/PopularAttractions';
import AdBanner from './components/AdBanner';
import TrustBar from './components/TrustBar';
import RecentlyViewed from './components/RecentlyViewed';
import Footer from './components/Footer';
import ActivitiesPage from './components/ActivitiesPage';
import AllAttractionsPage from './components/AllAttractionsPage';
import AttractionDetailModal from './components/AttractionDetailModal';
import WishlistSidebar from './components/WishlistSidebar';
import { useSettings } from './contexts/SettingsContext';
import { useAuth } from './contexts/AuthContext';
import { POPULAR_ATTRACTIONS } from './data/mockData';
import { Attraction } from './types';

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const { t } = useSettings();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'all-attractions'>('home');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedAttractionId, setSelectedAttractionId] = useState<string | null>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recentlyViewed');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse recently viewed from local storage', e);
      return [];
    }
  });

  const recentlyViewedItems = React.useMemo(() => {
    try {
      return recentlyViewedIds
        .map(id => POPULAR_ATTRACTIONS.find(a => a.id === id))
        .filter((a): a is Attraction => !!a);
    } catch (e) {
      console.error('Error computing recently viewed items', e);
      return [];
    }
  }, [recentlyViewedIds]);

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewedIds(prev => {
      try {
        const filtered = prev.filter(item => item !== id);
        const updated = [id, ...filtered].slice(0, 20);
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
        return updated;
      } catch (e) {
        console.error('Failed to save recently viewed to local storage', e);
        return prev;
      }
    });
  };

  const clearRecentlyViewed = () => {
    try {
      setRecentlyViewedIds([]);
      localStorage.removeItem('recentlyViewed');
    } catch (e) {
      console.error('Failed to clear recently viewed from local storage', e);
    }
  };

  // Handle loading attraction from URL query params (e.g., when opened in a new tab)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const attrId = params.get('attraction');
      if (attrId) {
        setSelectedAttractionId(attrId);
        // Ensure it is in recently viewed
        setRecentlyViewedIds(prev => {
          const filtered = prev.filter(item => item !== attrId);
          const updated = [attrId, ...filtered].slice(0, 20);
          localStorage.setItem('recentlyViewed', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (e) {
      console.error('Error handling initial attraction from URL', e);
    }
  }, []);

  const handleCloseDetail = () => {
    setSelectedAttractionId(null);
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('attraction')) {
        url.searchParams.delete('attraction');
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {
      console.error('Error rewriting URL on detail close', e);
    }
  };

  const handleViewAttraction = (id: string) => {
    addToRecentlyViewed(id);
    
    // Always open the activity booking page in a new window/tab
    try {
      const url = `${window.location.origin}${window.location.pathname}?attraction=${encodeURIComponent(id)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Failed to open booking page in a new tab', e);
      // Fallback to state-based detail box if window.open fails
      setSelectedAttractionId(id);
      window.scrollTo(0, 0);
    }
  };

  const mainContent = () => {
    if (selectedAttractionId) {
      return (
        <AttractionDetailModal 
          attractionId={selectedAttractionId} 
          onClose={handleCloseDetail}
          onViewAttraction={handleViewAttraction}
        />
      );
    }

    if (selectedDestination) {
      return (
        <ActivitiesPage 
          destination={selectedDestination} 
          onBack={() => {
            setSelectedDestination(null);
            window.scrollTo(0, 0);
          }} 
          onViewAttraction={handleViewAttraction}
        />
      );
    }

    if (currentPage === 'all-attractions') {
      return <AllAttractionsPage onSelectDestination={setSelectedDestination} onViewAttraction={handleViewAttraction} />;
    }

    return (
      <main>
        <Hero onSelectDestination={setSelectedDestination} />
        <RecentlyViewed 
          items={recentlyViewedItems} 
          onSelect={handleViewAttraction}
          onClear={clearRecentlyViewed}
        />
        <FeaturedDestinations onSelectDestination={setSelectedDestination} />
        <AdBanner 
          onNavigate={(page) => { setSelectedDestination(null); setCurrentPage(page as any); window.scrollTo(0, 0); }}
          onSelectDestination={setSelectedDestination}
        />
        <PopularAttractions onViewAttraction={handleViewAttraction} />
      </main>
    );
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen max-w-full overflow-x-clip bg-[#f8f9fa] dark:bg-slate-950 font-sans selection:bg-brand/10 selection:text-brand transition-colors duration-300">
        <Header 
          activePage={currentPage}
          activeDestination={selectedDestination}
          onWishlistOpen={() => setWishlistOpen(true)}
          onExplore={() => { setSelectedDestination(null); setSelectedAttractionId(null); setCurrentPage('home'); }} 
          onSearch={(q) => { 
            const queryLower = q.toLowerCase().trim();
            const matchingAttraction = POPULAR_ATTRACTIONS.find(
              a => a.name.toLowerCase() === queryLower || a.id.toLowerCase() === queryLower
            );
            if (matchingAttraction) {
              setSelectedDestination(matchingAttraction.city);
            } else {
              setSelectedDestination(q); 
            }
            setSelectedAttractionId(null);
            setCurrentPage('home'); 
            window.scrollTo(0, 0);
          }}
          onNavigate={(page) => { setSelectedDestination(null); setSelectedAttractionId(null); setCurrentPage(page as any); window.scrollTo(0, 0); }}
        />
        {mainContent()}
        <TrustBar />
        <Footer />

        <AnimatePresence>
          {wishlistOpen && (
            <WishlistSidebar 
              isOpen={wishlistOpen} 
              onClose={() => setWishlistOpen(false)} 
              onViewAttraction={handleViewAttraction} 
            />
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}

