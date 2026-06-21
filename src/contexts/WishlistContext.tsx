import React, { createContext, useContext, useState, useEffect } from 'react';
import { Attraction } from '../types';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: Attraction[];
  toggleWishlist: (attraction: Attraction) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Attraction[]>([]);

  // Determine the key for localStorage based on current auth state
  const storageKey = user ? `tiqsey_wishlist_${user.id}` : 'tiqsey_wishlist_guest';

  // Load wishlist when storageKey changes (e.g. user logs in / logs out / profile updates)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setWishlist(JSON.parse(stored));
      } else {
        // If we just logged in, check if there was a guest wishlist we should migrate
        if (user) {
          const guestStored = localStorage.getItem('tiqsey_wishlist_guest');
          if (guestStored) {
            const guestWishlist: Attraction[] = JSON.parse(guestStored);
            if (guestWishlist.length > 0) {
              setWishlist(guestWishlist);
              localStorage.setItem(storageKey, JSON.stringify(guestWishlist));
              // Clear guest wishlist after successful migration
              localStorage.removeItem('tiqsey_wishlist_guest');
              return;
            }
          }
        }
        setWishlist([]);
      }
    } catch (e) {
      console.error('Error loading wishlist from localStorage', e);
      setWishlist([]);
    }
  }, [storageKey, user]);

  const toggleWishlist = (attraction: Attraction) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === attraction.id);
      let updated: Attraction[];
      if (exists) {
        updated = prev.filter((item) => item.id !== attraction.id);
      } else {
        updated = [...prev, attraction];
      }
      
      // Save directly to localStorage
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update wishlist in localStorage', e);
      }
      return updated;
    });
  };

  const isWishlisted = (id: string): boolean => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error('Failed to clear wishlist from localStorage', e);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
