import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Star, Calendar, Users, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, 
  MapPin, Clock, Languages, ShieldAlert, Check, Flame, CreditCard, Sparkles, Ticket,
  Phone, ArrowLeft, Image, Smartphone, Zap, BookOpen, Compass, Info, RotateCcw, Map,
  MessageSquare, Plus, ChevronLeft, ChevronRight, Heart, Share2, Copy, Mail, ExternalLink,
  Tag
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { POPULAR_ATTRACTIONS } from '../data/mockData';
import AttractionCard from './AttractionCard';
import { Breadcrumb } from './Breadcrumb';

interface Props {
  attractionId: string;
  onClose: () => void;
  onNavigateToBookings?: () => void;
  onViewAttraction?: (id: string) => void;
}

export default function AttractionDetailModal({ attractionId, onClose, onNavigateToBookings, onViewAttraction }: Props) {
  const { formatPrice, t, currency } = useSettings();
  const { user, addBooking } = useAuth();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const formatPriceScreenshotWay = (val: number) => {
    const converted = val * currency.rate;
    const formattedVal = converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(2);
    // Standardize to uppercase currency code space value, like EUR 55
    return `${currency.code} ${formattedVal}`;
  };
  
  const attraction = useMemo(() => {
    return POPULAR_ATTRACTIONS.find(a => a.id === attractionId);
  }, [attractionId]);

  const dynamicPackages = useMemo(() => {
    if (!attraction) return [];
    
    // Clean up the attraction name if it ends with ":" or has "Ticket" already
    const cleanName = attraction.name.includes(':') 
      ? attraction.name.split(':')[0] 
      : attraction.name.replace(/Entrance Tickets|Entrance Ticket|Tickets|Ticket/gi, '').trim();

    const basePrice = attraction.discountPrice || attraction.price;

    return [
      { 
        id: 'general', 
        listName: "1-Day Admission Ticket",
        name: `${cleanName} – Same Day Entry Ticket (Instant Confirmation & Guaranteed Admission)`, 
        shortName: `${cleanName} Entry Ticket`,
        priceOffset: 0,
        couponDiscount: 3.80,
        description: `Admission to ${cleanName} permanent collection. Timed entry slots guarantee immediate access without waiting.`,
        duration: '2 Hours'
      },
      { 
        id: 'non-stop-2day', 
        listName: "Non-stop 2-Day Admission Ticket",
        name: `${cleanName} – Non-stop 2-Day Admission Ticket (Fast Track Entry)`, 
        shortName: `${cleanName} 2-Day Fast Track`,
        priceOffset: Math.round(basePrice * 0.15),
        couponDiscount: 4.36,
        description: `Experience two days of unrestricted exploration with fast-track admission past standard queues.`,
        duration: 'Flexible 48 Hours'
      },
      { 
        id: '2day-7days', 
        listName: "2-Day Admission Ticket (2 Visits within 7 Days)",
        name: `${cleanName} – 2-Day Admission Ticket (2 Visits within 7 Days)`, 
        shortName: `${cleanName} 2-Visit Pass`,
        priceOffset: Math.round(basePrice * 0.45),
        couponDiscount: 5.52,
        description: `Visit twice at any time within a 7-day period. Perfect for paced discovery of temporary galleries.`,
        duration: '7 Days Validity'
      }
    ];
  }, [attraction]);

  const [bookingDate, setBookingDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().substring(0, 10);
  });

  const [guestCount, setGuestCount] = useState(2); // default to 2 like the image
  const [selectedPackageId, setSelectedPackageId] = useState('general');
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>('general');

  const selectedPackage = useMemo(() => {
    return dynamicPackages.find(p => p.id === selectedPackageId) || dynamicPackages[0] || { id: 'general', name: 'General Admission Entrance Ticket', priceOffset: 0 };
  }, [dynamicPackages, selectedPackageId]);

  const [showPackageDropdown, setShowPackageDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);

  const [calendarYear, setCalendarYear] = useState(() => new Date(bookingDate || Date.now()).getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(bookingDate || Date.now()).getMonth());

  const MONTH_NAMES = useMemo(() => [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ], []);

  const handlePrevMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 0) {
        setCalendarYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 11) {
        setCalendarYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const daysInMonth = useMemo(() => {
    return new Date(calendarYear, calendarMonth + 1, 0).getDate();
  }, [calendarYear, calendarMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(calendarYear, calendarMonth, 1).getDay();
  }, [calendarYear, calendarMonth]);

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [daysInMonth, firstDayOfWeek]);

  const handleSelectDay = (day: number) => {
    const monthStr = String(calendarMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setBookingDate(`${calendarYear}-${monthStr}-${dayStr}`);
    setShowCalendarDropdown(false);
  };

  const formattedDate = useMemo(() => {
    if (!bookingDate) return 'Select travel date';
    const split = bookingDate.split('-');
    if (split.length !== 3) return bookingDate;
    const y = parseInt(split[0]);
    const m = parseInt(split[1]) - 1;
    const d = parseInt(split[2]);
    const dateObj = new Date(y, m, d);
    return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }, [bookingDate]);
  
  const [guestName, setGuestName] = useState(user?.name || 'Guest');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'guest@securebookings.com');
  
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Share Activity Link States & Helpers
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (!attraction) return '';
    return `${window.location.origin}${window.location.pathname}?attraction=${attraction.id}`;
  }, [attraction?.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: attraction?.name || 'Check out this amazing activity!',
          text: attraction?.description || 'Found this wonderful activity on Secure Bookings.',
          url: shareUrl,
        });
      } catch (err) {
        // Fallback to our custom dialog if user cancelled or it failed
        setIsShareModalOpen(true);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Accordion Expandable States
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isGettingThereOpen, setIsGettingThereOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);

  if (!attraction) return null;

  // Compute final price with package offset
  const basePrice = attraction.discountPrice || attraction.price;
  const pricePerItem = basePrice + selectedPackage.priceOffset;
  const totalPriceFloat = pricePerItem * guestCount;

  // Multi-image bento layout: Left image tall, 4 right images in a 2x2 grid
  const galleryUrls = attraction.galleryUrls && attraction.galleryUrls.length > 0 ? attraction.galleryUrls : [];
  
  const galleryImages = useMemo(() => {
    const urls: string[] = [];
    if (attraction.imageUrl) {
      urls.push(attraction.imageUrl);
    }
    for (const url of galleryUrls) {
      if (!urls.includes(url)) {
        urls.push(url);
      }
    }
    const defaultGallery = [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800', // flowers
      'https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&q=80&w=800', // gallery view
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800', // museum hall
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800', // classical face portrait
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'  // brushes paint
    ];
    for (const img of defaultGallery) {
      if (urls.length >= 5) break;
      if (!urls.includes(img)) {
        urls.push(img);
      }
    }
    return urls.slice(0, 5);
  }, [attraction, galleryUrls]);

  const mainImage = galleryImages[0] || attraction.imageUrl || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800';

  // Find 4 other attractions in the destination "Customers also bought"
  const customersAlsoBought = useMemo(() => {
    // 1. Get other attractions in the exact same city
    const sameCity = POPULAR_ATTRACTIONS.filter(
      a => a.id !== attraction.id && a.city === attraction.city
    );
    
    // 2. If we don't have enough (we need 4), get attractions from the same region
    let list = [...sameCity];
    if (list.length < 4) {
      const sameRegion = POPULAR_ATTRACTIONS.filter(
        a => a.id !== attraction.id && a.region === attraction.region && !list.some(item => item.id === a.id)
      );
      list.push(...sameRegion);
    }
    
    // 3. If we still don't have 4, get other popular attractions
    if (list.length < 4) {
      const otherPopular = POPULAR_ATTRACTIONS.filter(
        a => a.id !== attraction.id && !list.some(item => item.id === a.id)
      );
      list.push(...otherPopular);
    }
    
    return list.slice(0, 4);
  }, [attraction]);

  // Calculate highlights for this attraction
  const highlightsList = useMemo(() => {
    if (attraction?.id === 'ams-rijksmuseum') {
      return [
        'Skip-the-line entry to the Rijksmuseum.',
        'View masterpieces by Rembrandt, Vermeer, and other Dutch masters.',
        'See the famous The Night Watch.',
        'Explore Dutch art and history at your own pace.',
        'Learn fascinating stories behind the museum\'s collection.',
        'Enjoy a memorable cultural experience in Amsterdam.'
      ];
    }
    if (attraction?.id === 'ams-van-gogh') {
      return [
        'Enjoy skip-the-line entry for a hassle-free visit.',
        'Admire the iconic masterpieces of Vincent van Gogh.',
        'Explore the museum at your own pace.',
        'Learn about Van Gogh\'s artistic techniques, influences, and inspirations.',
        'Experience a smooth, engaging, and enriching museum visit.'
      ];
    }
    if (attraction?.id === 'lis-jeronimos') {
      return [
        'Enjoy entry to the magnificent Jerónimos Monastery, a masterpiece of Portuguese architecture.',
        'Admire the stunning Manueline-style design, renowned for its intricate stone carvings and maritime motifs.',
        'Explore the beautiful cloisters, considered among the finest in Europe.',
        'Learn about Portugal’s Age of Discovery and the monastery’s historical significance.',
        'Visit the tombs of renowned figures, including Vasco da Gama and Luís de Camões.',
        'Discover a Jerónimos Monastery UNESCO World Heritage Site that reflects Portugal’s rich cultural heritage.',
        'Explore the monument at your own pace and enjoy a memorable journey through history.'
      ];
    }
    if (attraction?.highlights && attraction.highlights.length > 0) {
      return attraction.highlights;
    }
    return [
      'Enjoy hassle-free entry with pre-booked entry tickets.',
      'Explore the beautiful exhibition galleries at your own leisure.',
      'Admire the incredible structures and local historic collections.',
      'Learn about fascinating histories and stories behind the exhibitions.',
      'Create unforgettable and delightful memories with family and friends.'
    ];
  }, [attraction]);

  // Handle checking availability block
  const handleCheckAvailability = () => {
    setIsChecking(true);
    setCheckoutError(null);
    setTimeout(() => {
      setIsChecking(false);
      setAvailabilityChecked(true);
    }, 1200);
  };

  const handleScrollToPackages = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Smoothly scroll to the Select Package Options section
    const target = document.getElementById('select-package-options-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    
    if (!bookingDate) {
      setCheckoutError('Please select a preferred travel date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const guestInfo = !user ? { name: guestName, email: guestEmail } : undefined;
      const response = await addBooking(
        attraction.id,
        `${attraction.name} - ${selectedPackage.name}`,
        mainImage,
        attraction.city,
        bookingDate,
        guestCount,
        pricePerItem,
        guestInfo
      );
      setBookingSuccess(response);
    } catch (err: any) {
      setCheckoutError(err.message || 'An error occurred during booking process.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [reviewsList, setReviewsList] = useState<Array<{ name: string; rating: number; date: string; comment: string }>>([]);
  const [reviewFilter, setReviewFilter] = useState<number | 'all'>('all');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewSuccess, setNewReviewSuccess] = useState(false);

  useEffect(() => {
    if (attraction) {
      setReviewsList([
        { name: 'Travel37810392548', rating: 5, date: 'May 2026', comment: `An old center of ${attraction.city} is quite large, so if you are there for the first time, it is really useful to have some guidance. You can also learn quite a lot about art, history, and local traditions.` },
        { name: 'Wander22969920823', rating: 4, date: 'March 2026', comment: `Because our feet were hurting, we took the smart audio tour and stopped at some lovely cafes in ${attraction.city}. Beautiful experiences!` },
        { name: '347odilev', rating: 3, date: 'August 2025', comment: 'Self-guided smart exploration which requires standard mobile access. Beautiful content but make sure your phone battery is charged!' },
        { name: 'Ewan_T', rating: 5, date: 'July 2025', comment: `It was like walking around ${attraction.city} with a funny and smart friend who knows all the interesting details — art, landmarks, and funny historical stories! Highly recommended experience and so smooth to book.` },
        { name: 'Sarah_K', rating: 5, date: 'April 2026', comment: `This booking saved us so much hassle. Slipped past the queue effortlessly. The ${attraction.name} collection is mindblowing!` },
        { name: 'Jordi_V', rating: 4, date: 'February 2026', comment: 'Loved it. Very structured pathways and beautiful presentation. Recommended for families!' }
      ]);
      setReviewFilter('all');
      setShowAllReviews(false);
      setIsWritingReview(false);
      setNewReviewName('');
      setNewReviewComment('');
      setNewReviewRating(5);
      setNewReviewSuccess(false);
    }
  }, [attractionId, attraction]);

  // Dynamic calculations of reviews statistics
  const averageRating = useMemo(() => {
    if (!reviewsList || reviewsList.length === 0) return 0;
    const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / reviewsList.length).toFixed(1));
  }, [reviewsList]);

  const ratingCounts = useMemo(() => {
    const counts: { [rating: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsList.forEach(r => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating]++;
      }
    });
    return counts;
  }, [reviewsList]);

  const filteredReviews = useMemo(() => {
    return reviewsList.filter(r => reviewFilter === 'all' || r.rating === reviewFilter);
  }, [reviewsList, reviewFilter]);

  // Determine the display set based on "Read More" collapse toggle
  const visibleReviews = useMemo(() => {
    if (showAllReviews) return filteredReviews;
    return filteredReviews.slice(0, 4);
  }, [filteredReviews, showAllReviews]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newReview = {
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: 'Today',
      comment: newReviewComment.trim()
    };

    setReviewsList(prev => [newReview, ...prev]);
    setNewReviewSuccess(true);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);

    setTimeout(() => {
      setNewReviewSuccess(false);
      setIsWritingReview(false);
    }, 2000);
  };

  return (
    <div id="booking-detail-modal-root" className="bg-slate-50 dark:bg-slate-950 font-sans min-h-screen pb-16">
      
      {/* Top pristine Header Navigation bar */}
      <div id="booking-sticky-header" className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            id="back-list-btn"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-750 dark:text-slate-350 hover:text-brand transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to exploring
          </button>
          
          <h1 className="hidden sm:block text-xs font-black uppercase text-gray-400 tracking-wider font-mono">
            Secure Booking Portal
          </h1>

          <button 
            id="close-icon-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-850 text-gray-600 dark:text-slate-350 transition-all active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!bookingSuccess && (
        <div id="gallery-hero-section" className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2 select-none">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden group pointer-events-auto">
            {/* Main single image */}
            <div className="relative w-full h-full overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img 
                id="main-hero-img"
                src={mainImage} 
                alt={attraction.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105 cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Hot deals badge */}
            {attraction.discountPrice && (
              <div className="absolute top-4 left-4 z-10">
                <span className="self-start bg-brand text-white text-[10px] lg:text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 leading-none select-none">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  Hot Ticket Deals
                </span>
              </div>
            )}

            {/* Floating Share Button */}
            {attraction && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleShare}
                className="absolute top-4 right-[4.25rem] z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/95 shadow-lg border border-slate-100/60 dark:border-slate-800/60 backdrop-blur-xs transition-colors cursor-pointer group/share"
                title="Share Activity"
                aria-label="Share Activity"
              >
                <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover/share:text-brand transition-colors" />
              </motion.button>
            )}

            {/* Wishlist/Favorite Floating Button */}
            {attraction && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleWishlist(attraction)}
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/95 shadow-lg border border-slate-100/60 dark:border-slate-800/60 backdrop-blur-xs transition-colors cursor-pointer group/fav"
                title={isWishlisted(attraction.id) ? "Remove from Wishlist" : "Save to Wishlist"}
                aria-label={isWishlisted(attraction.id) ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <motion.div
                  animate={isWishlisted(attraction.id) ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <Heart 
                    className={`w-5.5 h-5.5 transition-colors duration-200 ${
                      isWishlisted(attraction.id) 
                        ? 'fill-[#e3000f] text-[#e3000f]' 
                        : 'text-slate-600 dark:text-slate-400 group-hover/fav:text-[#e3000f] dark:group-hover/fav:text-[#e3000f]'
                    }`} 
                  />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 lg:py-10">
        {!bookingSuccess ? (
          <div>
            {/* Two Column Layout Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Details, alert, accordion lists (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Ratings Line */}
            <div id="booking-title-section" className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-5 border-b border-gray-200/60 dark:border-slate-900 gap-4">
              <div className="space-y-2">
                {/* Micro-badges for travel product value propositions */}
                <div className="flex flex-wrap items-center gap-1.5 select-none">
                  {attraction.isPopular && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-500/10 dark:bg-amber-500/5 text-amber-700 dark:text-amber-400 border border-amber-500/15 dark:border-amber-500/5 px-2.5 py-0.5 rounded-full">
                      <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                      Bestseller
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3.5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {attraction.name}
                </h1>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand" />
                    <span>{attraction.location || `${attraction.city}, Europe`}</span>
                  </span>
                  {/* Removed duration and opening hours block */}
                </div>
              </div>
              
              {/* Star rating pill box stacked for high visual balance */}
              <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 bg-slate-50/50 dark:bg-slate-900/30 p-2 sm:p-3 rounded-2xl border border-gray-150 dark:border-slate-850 md:border-none md:bg-transparent md:p-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/20 px-3.5 py-1.5 rounded-2xl border border-amber-200/60 dark:border-amber-900/30 shadow-xs select-none">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                    <span className="text-sm font-black text-amber-800 dark:text-amber-400 leading-none">
                      Rating {attraction.rating} / 5
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand/40 dark:hover:border-brand/40 rounded-xl transition-all cursor-pointer shadow-3xs active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share Link
                </button>
              </div>
            </div>

                {/* Highlights Panel */}
                <div id="highlights-section" className="space-y-4 pt-2">
                  <div className="flex items-center gap-2.5 border-l-4 border-brand pl-3 select-none">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wider leading-none uppercase">
                      Highlights
                    </h3>
                  </div>
                  <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 sm:p-6 rounded-3xl border border-slate-150 dark:border-slate-800">
                    <ul className="list-disc pl-5 space-y-2.5 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm leading-relaxed">
                      {highlightsList.map((item, idx) => (
                        <li key={idx} className="marker:text-[#e3000f]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select Package Options Panel styled according to uploaded mockup layout */}
                <div id="select-package-options-section" className="space-y-4 pt-1">
                  <div className="bg-[#f4f7f9] dark:bg-slate-900/60 p-4 sm:p-5 md:p-6 rounded-[24px] border border-[#e2e8f0] dark:border-slate-800/65 space-y-4">
                    <div className="flex items-center gap-2.5 select-none">
                      <div className="w-[5px] h-[20px] sm:h-[22px] bg-[#f95e00] rounded-[2px] shrink-0" />
                      <h2 className="text-[19px] sm:text-[21px] font-bold text-[#111e38] dark:text-white tracking-tight leading-none">
                        Select Package Options
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {dynamicPackages.map((pkg, index) => {
                        const isSelected = selectedPackageId === pkg.id;
                        
                        return (
                          <div
                            key={pkg.id}
                            id={index === 0 ? "package-card-first" : `package-card-${pkg.id}`}
                            onClick={() => {
                              setSelectedPackageId(pkg.id);
                              setExpandedPackageId(pkg.id);
                            }}
                            className={`relative bg-white dark:bg-slate-900 rounded-xl transition-all duration-300 select-none outline-none scroll-mt-24 cursor-pointer ${
                              isSelected
                                ? 'border-2 border-[#e3000f] p-4 sm:p-5 shadow-sm'
                                : 'border border-[#dce6f0] dark:border-slate-800 p-4 sm:p-5 hover:border-[#c5d6e6] dark:hover:border-slate-700 hover:shadow-xs'
                            }`}
                          >

                            {isSelected ? (
                              /* ================== EXPANDED STATE (Screenshot 2) ================== */
                              <div>
                                {index === 0 && (
                                  <div className="mb-2">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-black bg-[#00875a] text-white px-2 py-0.5 rounded-[4px] uppercase tracking-wide">
                                      ★ MOST BOOKED
                                    </span>
                                  </div>
                                )}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                  <div className="flex items-start gap-3">
                                    {/* Red dot custom radio button */}
                                    <div className="w-[18px] h-[18px] rounded-full bg-white border-2 border-[#e3000f] flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-2.5 h-2.5 rounded-full bg-[#e3000f]" />
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-[15px] sm:text-base font-bold text-[#111e38] dark:text-white leading-snug pr-2">
                                        {pkg.name}
                                      </h4>
                                      
                                      {/* Clock icon with duration */}
                                      <div className="flex items-center gap-1.5 mt-2 text-[#111e38] dark:text-slate-200 text-[13px] font-medium">
                                        <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                                        <span>{pkg.duration}</span>
                                      </div>
                                      
                                      {/* HIDE DETAILS text link */}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedPackageId(null);
                                          setSelectedPackageId('');
                                        }}
                                        className="text-[11px] font-bold text-[#e3000f] hover:text-[#be000b] uppercase tracking-wider block mt-4 text-left cursor-pointer transition-colors"
                                      >
                                        HIDE DETAILS
                                      </button>
                                    </div>
                                  </div>

                                  {/* Solid Red BOOK NOW CTA */}
                                  <div className="shrink-0 self-stretch md:self-center flex items-center justify-end">
                                    <a
                                      href={
                                        attraction?.id === 'ams-rijksmuseum'
                                          ? 'https://www.getyourguide.com/amsterdam-l36/amsterdam-rijksmuseum-entry-ticket-t7135/?partner_id=N778SV2&currency=EUR&travel_agent=1&cmp=share_to_earn'
                                          : attraction?.id === 'ams-van-gogh'
                                          ? 'https://www.tiqets.com/amsterdam-attractions-c75061/tickets-for-van-gogh-museum-p974079/?partner=bigbakket'
                                          : attraction?.id === 'lis-jeronimos'
                                          ? 'https://www.tiqets.com/lisbon-attractions-c76528/tickets-for-jeronimos-monastery-entry-p1012358/?partner=bigbakket'
                                          : `https://www.tiqets.com/en/${attraction ? attraction.city.toLowerCase() : 'amsterdam'}-attractions-c75061/?partner=bigbakket&q=${encodeURIComponent(attraction ? attraction.name : '')}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full md:w-auto inline-flex px-6 py-2.5 bg-[#e3000f] hover:bg-[#be000b] text-white rounded-[8px] text-[13px] font-bold uppercase transition-all items-center justify-center shadow-sm hover:shadow active:scale-95"
                                    >
                                      BOOK NOW
                                    </a>
                                  </div>
                                </div>

                                {/* Footer block: Tickets are Non-Refundable */}
                                <div className="mt-5 pt-3.5 border-t border-[#f4f7f9] dark:border-slate-800/80 flex items-center gap-1.5 text-[13px] text-[#e3000f] select-none">
                                  <Info className="w-4 h-4 shrink-0" />
                                  <span>Tickets are Non-Refundable</span>
                                </div>
                              </div>
                            ) : (
                              /* ================== COLLAPSED STATE (Screenshot 1) ================== */
                              <div className="flex items-stretch justify-between gap-4">
                                <div className="flex-1 flex flex-col">
                                  {index === 0 && (
                                    <div className="mb-2">
                                      <span className="inline-flex items-center gap-1 text-[10px] font-black bg-[#00875a] text-white px-2 py-0.5 rounded-[4px] uppercase tracking-wide">
                                        ★ MOST BOOKED
                                      </span>
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="text-[15px] sm:text-base font-bold text-[#111e38] dark:text-white leading-snug">
                                      {pkg.name}
                                    </h4>
                                  </div>

                                  {/* Pricing left side */}
                                  {(() => {
                                    const basePriceVal = attraction.discountPrice || attraction.price;
                                    const currentPriceRaw = basePriceVal + pkg.priceOffset;
                                    const originalPriceRaw = Math.round(currentPriceRaw / 0.85) - 0.10;
                                    return (
                                      <div className="mt-3 flex flex-col items-start leading-none">
                                        <span className="line-through decoration-[#94a3b8] text-[#94a3b8] font-medium text-[13px]">
                                          {currency.code} {(originalPriceRaw * currency.rate).toFixed(2)}
                                        </span>
                                        <div className="flex items-baseline text-[#c22015] mt-1">
                                          <span className="text-xs font-bold mr-1">{currency.code}</span>
                                          <span className="text-[22px] font-extrabold tracking-tight">
                                            {(currentPriceRaw * currency.rate).toFixed(2)}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>

                                <div className="flex flex-col justify-end items-end shrink-0 pl-2">
                                  {/* Book Now pill button */}
                                  <a 
                                    href={
                                      attraction?.id === 'ams-rijksmuseum'
                                        ? 'https://www.getyourguide.com/amsterdam-l36/amsterdam-rijksmuseum-entry-ticket-t7135/?partner_id=N778SV2&currency=EUR&travel_agent=1&cmp=share_to_earn'
                                        : attraction?.id === 'ams-van-gogh'
                                        ? 'https://www.tiqets.com/amsterdam-attractions-c75061/tickets-for-van-gogh-museum-p974079/?partner=bigbakket'
                                        : attraction?.id === 'lis-jeronimos'
                                        ? 'https://www.tiqets.com/lisbon-attractions-c76528/tickets-for-jeronimos-monastery-entry-p1012358/?partner=bigbakket'
                                        : `https://www.tiqets.com/en/${attraction ? attraction.city.toLowerCase() : 'amsterdam'}-attractions-c75061/?partner=bigbakket&q=${encodeURIComponent(attraction ? attraction.name : '')}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-6 py-2 bg-[#e3000f] hover:bg-[#be000b] text-white rounded-[8px] text-[13px] font-bold uppercase transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer flex items-center justify-center whitespace-nowrap"
                                  >
                                    Book Now
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
              
              {/* RIGHT COLUMN: Interactive Checkout Pane & Highlights Box */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 z-10 self-start">
                
                {/* Dynamic Interactive checkout Box in screenshot theme styling */}
                <div id="booking-checkout-box" className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm select-none">
                  
                  {/* High-Fidelity Price Section matching the screenshot exactly */}
                  {(() => {
                    // Calculate original and current price cleanly
                    const originalPricePerItem = attraction.discountPrice 
                      ? (attraction.price + selectedPackage.priceOffset) 
                      : Math.round(pricePerItem / (1 - 0.44));
                    const discountPercent = Math.round(((originalPricePerItem - pricePerItem) / originalPricePerItem) * 100);
                    return (
                      <div className="flex flex-col mb-8 mt-2">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-[-2px]">From</span>
                            <span className="line-through decoration-slate-400 text-slate-500 font-medium text-sm">{formatPriceScreenshotWay(originalPricePerItem)}</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-[1000] text-[#E03A2B] tracking-tight leading-none">
                              {formatPriceScreenshotWay(pricePerItem)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="pb-5 mb-5 border-b border-gray-150 dark:border-slate-800">
                    <div className="text-slate-800 dark:text-slate-200 text-[15px] font-medium leading-snug">
                      {selectedPackage.name}
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="p-3 mb-4 bg-rose-500/10 text-rose-500 text-xs font-semibold rounded-xl flex items-center gap-2 select-none">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{checkoutError}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      id="finalize-booking-cta-btn"
                      type="button"
                      onClick={handleScrollToPackages}
                      className="w-full bg-brand hover:bg-[#be000b] text-white text-[16px] sm:text-[17px] font-bold rounded-[6px] py-3.5 sm:py-4 border border-brand transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
                    >
                      <span>Book Now</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* RELATED ATTRACTIONS SLIDER: "Customers also bought" Section */}
            {customersAlsoBought.length > 0 && (
              <div id="related-bought-attractions" className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-900 space-y-6">
                <div className="flex items-center gap-2.5 border-l-4 border-brand pl-3 select-none">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wider leading-none uppercase">
                    Customers also bought
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {customersAlsoBought.map(attr => (
                    <div id={`related-card-${attr.id}`} key={attr.id} className="h-full transform hover:scale-[1.01] transition-transform duration-300">
                      <AttractionCard 
                        attr={attr}
                        onClick={(id) => {
                          onClose();
                          if (onViewAttraction) {
                            setTimeout(() => onViewAttraction(id), 10);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS GRID: "Guest Reviews" Premium Section */}
            <div id="booking-reviews-feed" className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-900">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 select-none">
                <div className="flex items-start gap-2.5 border-l-4 border-brand pl-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wider leading-none uppercase">
                      Guest Reviews ({attraction.reviewsCount.toLocaleString()})
                    </h3>
                    <p className="text-xs text-slate-400 font-bold mt-1.5">
                      Genuine feedback from verified travelers who booked this experience
                    </p>
                  </div>
                </div>
                
                {/* Write a Review triggering button */}
                <button
                  type="button"
                  onClick={() => setIsWritingReview(!isWritingReview)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    isWritingReview 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                      : 'border-2 border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand hover:text-brand'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {isWritingReview ? 'Close Form' : 'Write a Review'}
                </button>
              </div>

              {/* Collapsible Write Review Form */}
              <AnimatePresence>
                {isWritingReview && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mb-8"
                  >
                    <form 
                      onSubmit={handleAddReview}
                      className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs"
                    >
                      <h4 className="text-sm font-black uppercase tracking-widest text-brand flex items-center gap-2">
                        <span>Share Your Experience</span>
                      </h4>

                      {newReviewSuccess ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-650 dark:text-emerald-400 p-4 rounded-2xl flex items-center gap-3 font-bold text-xs">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>Review posted successfully! Your rating has been logged in real-time.</span>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Guest Name */}
                            <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 block mb-2">
                                Your Full Name
                              </label>
                              <input 
                                type="text"
                                required
                                placeholder="e.g. Wanderer_NL"
                                value={newReviewName}
                                onChange={(e) => setNewReviewName(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold outline-hidden focus:border-brand focus:ring-1 focus:ring-brand text-slate-800 dark:text-neutral-100 placeholder-slate-400"
                              />
                            </div>

                            {/* Dynamic Rating selector */}
                            <div>
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 block mb-2">
                                Rating (Select Stars)
                              </label>
                              <div className="flex items-center gap-1.5 h-10 select-none">
                                {[1, 2, 3, 4, 5].map((starIdx) => (
                                  <button
                                    key={starIdx}
                                    type="button"
                                    onClick={() => setNewReviewRating(starIdx)}
                                    className="p-1 rounded-md transition-colors hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                                  >
                                    <Star 
                                      className={`w-6 h-6 transition-all ${
                                        starIdx <= newReviewRating 
                                          ? 'text-amber-400 fill-amber-300 scale-110' 
                                          : 'text-slate-300 dark:text-slate-700'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Review Comment */}
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 block mb-2">
                              Your Comment
                            </label>
                            <textarea 
                              required
                              rows={3}
                              placeholder="Describe your tour details, guides, entry details, or audio headsets..."
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 text-xs sm:text-sm font-semibold outline-hidden focus:border-brand focus:ring-1 focus:ring-brand text-slate-800 dark:text-neutral-100 placeholder-slate-400 resize-none"
                            />
                          </div>

                          <div className="pt-2 text-right">
                            <button
                              type="submit"
                              className="px-6 py-3 bg-brand hover:bg-[#be000b] text-white text-xs font-black uppercase tracking-widest rounded-full transition-transform active:scale-98 shadow-sm cursor-pointer"
                            >
                              Post Verified Review
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RATINGS SUMMARY OVERVIEW DASHBOARD */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row gap-8 items-stretch select-none">
                
                {/* Total Average Card */}
                <div className="flex flex-col items-center justify-center text-center md:border-r border-slate-100 dark:border-slate-800/85 md:pr-10 lg:pr-12 shrink-0">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    {attraction.rating}
                  </span>
                  
                  {/* Big Stars bar */}
                  <div className="flex items-center gap-0.5 text-amber-400 mt-3 mb-2">
                    {Array.from({ length: 5 }).map((_, rIdx) => {
                      const starVal = rIdx + 1;
                      const isHalf = starVal - 0.5 <= attraction.rating && starVal > attraction.rating;
                      const isFull = starVal <= attraction.rating;
                      
                      return (
                        <Star 
                          key={rIdx} 
                          className={`w-5 h-5 shrink-0 ${
                            isFull 
                              ? 'text-amber-400 fill-amber-400' 
                              : isHalf 
                                ? 'text-amber-400 fill-amber-400 opacity-70' 
                                : 'text-slate-200 dark:text-slate-850'
                          }`} 
                        />
                      );
                    })}
                  </div>
                  
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e3000f]/90 bg-brand/10 dark:bg-brand/5 px-2.5 py-1 rounded-md mt-1.5 shadow-3xs border border-brand/10">
                    {attraction.reviewsCount.toLocaleString()} Verified Logs
                  </span>
                </div>

                {/* Rating Distribution Bar Breakdown and Pill Filters */}
                <div className="grow flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = ratingCounts[stars] || 0;
                      const totalCount = reviewsList.length || 1;
                      const percentage = Math.round((count / totalCount) * 100);
                      const isCurrentFilter = reviewFilter === stars;
                      
                      return (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setReviewFilter(isCurrentFilter ? 'all' : stars)}
                          className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
                            isCurrentFilter 
                              ? 'bg-brand/[0.04] border-brand dark:border-brand shadow-3xs' 
                              : 'bg-slate-50/40 dark:bg-slate-900/40 border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-black text-slate-850 dark:text-slate-250">
                            <span className="flex items-center gap-1">
                              {stars} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            </span>
                            <span className="font-extrabold text-brand">{count}</span>
                          </div>
                          
                          {/* Small visual bar indicator */}
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                            <div 
                              style={{ width: `${percentage}%` }}
                              className={`h-full rounded-full transition-all duration-300 ${
                                isCurrentFilter ? 'bg-brand' : 'bg-emerald-600 group-hover:bg-brand'
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Filter Pills row */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/40 select-none">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 mr-1.5">
                      Quick View:
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => setReviewFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        reviewFilter === 'all'
                          ? 'bg-brand text-white shadow-3xs'
                          : 'bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      All ({reviewsList.length})
                    </button>
                    
                    {[5, 4, 3].map((stars) => {
                      const c = ratingCounts[stars] || 0;
                      return (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setReviewFilter(stars)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            reviewFilter === stars
                              ? 'bg-brand text-white shadow-3xs'
                              : 'bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {stars} Stars ({c})
                        </button>
                      );
                    })}
                  </div>

                </div>

              </div>

              {/* REVIEW list display elements with layout transition and staggers */}
              {filteredReviews.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-3xl p-10 text-center select-none shadow-3xs">
                  <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-850 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500 mb-3.5 border border-slate-100 dark:border-slate-800">
                    <Star className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-widest">No reviews found</h4>
                  <p className="text-xs text-slate-400 font-bold mt-1 max-w-sm mx-auto leading-relaxed">
                    There are currently no guest ratings matching your selection score. Feel free to log a review above!
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
                    {visibleReviews.map((rev, idx) => {
                      // Get initials for profile picture
                      const nameKey = rev.name || 'Anonymous';
                      const initials = nameKey.substring(0, 2).toUpperCase();
                      
                      // Assign color shades based on determinism
                      const colors = [
                        'bg-teal-500/10 text-teal-600 border-teal-500/10 dark:text-teal-400 dark:bg-teal-500/5',
                        'bg-rose-500/10 text-rose-600 border-rose-500/10 dark:text-rose-400 dark:bg-rose-500/5',
                        'bg-amber-500/10 text-amber-600 border-amber-500/10 dark:text-amber-400 dark:bg-amber-500/5',
                        'bg-blue-500/10 text-blue-600 border-blue-500/10 dark:text-blue-400 dark:bg-blue-500/5',
                        'bg-orange-500/10 text-orange-600 border-orange-500/10 dark:text-orange-400 dark:bg-orange-500/5',
                        'bg-emerald-500/10 text-emerald-600 border-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/5'
                      ];
                      const colorIndex = Math.abs(nameKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
                      const selectedColorClass = colors[colorIndex];

                      return (
                        <div 
                          id={`review-card-${idx}`}
                          key={idx} 
                          className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-800/80 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xs transition-all duration-200"
                        >
                          <div>
                            {/* Stars row + Verified pill */}
                            <div className="flex items-center justify-between gap-3 mb-3.5">
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {Array.from({ length: 5 }).map((_, rIdx) => (
                                  <Star 
                                    key={rIdx} 
                                    className={`w-4 h-4 fill-current ${rIdx < rev.rating ? 'text-amber-400' : 'text-slate-100 dark:text-slate-850'}`} 
                                  />
                                ))}
                              </div>
                              
                              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/15">
                                <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0 stroke-[2.5]" />
                                Verified Guest
                              </span>
                            </div>
                            
                            {/* Review content quotes */}
                            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-350 leading-relaxed italic mb-5 pl-1.5 border-l-2 border-slate-150 dark:border-slate-800">
                              "{rev.comment}"
                            </p>
                          </div>

                          {/* Profile and Date footer */}
                          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 dark:border-slate-850 select-none">
                            <div className="flex items-center gap-2.5">
                              {/* Avatar circle */}
                              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 ${selectedColorClass}`}>
                                {initials}
                              </div>
                              <span className="font-extrabold text-slate-900 dark:text-white truncate max-w-[120px] sm:max-w-none">
                                {rev.name}
                              </span>
                            </div>
                            <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0">{rev.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Fully responsive and solid pagination / read toggle controls */}
                  {filteredReviews.length > 4 && (
                    <div className="mt-8 text-center animate-fade-in">
                      <button
                        id="read-more-reviews-btn"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="px-6 py-3 border-2 border-slate-200 dark:border-slate-800 hover:border-brand dark:hover:border-brand rounded-full text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand transition-colors cursor-pointer inline-flex items-center gap-2 select-none"
                      >
                        {showAllReviews ? 'View Fewer Reviews' : `Read All ${filteredReviews.length} Reviews`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        ) : (
          
          /* BOOKING CONFIRMED RECEIPT SCREEN */
          <motion.div 
            id="receipt-success-screen"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl mx-auto p-6 md:p-10 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl shadow-lg mt-8 text-center"
          >
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/15">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase">
              Booking successfully completed!
            </h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Your entrance passes have been fully compiled and authorized. Instant confirmation and barcodes of purchase tickets are arriving at your email connection shortly.
            </p>

            {/* Digitized boarding Pass visualization typical of travel apps */}
            <div className="bg-gray-50 dark:bg-slate-950 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 text-left relative overflow-hidden mb-8 shadow-xs">
              
              {/* Card notches represent booking slip visual details */}
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-850" />
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-850" />

              <div className="flex gap-4 items-center mb-5 border-b border-dashed border-gray-200 dark:border-slate-800 pb-4">
                <img src={mainImage} className="w-16 h-16 object-cover rounded-xl shrink-0 border border-gray-200 dark:border-slate-850" alt="Attraction summary ticket" referrerPolicy="no-referrer" />
                <div>
                  <span className="text-[10px] font-black uppercase text-brand tracking-widest leading-none block mb-1">Explorer Ticket Pass</span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{attraction.name}</h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mt-0.5">Order Ref#: {bookingSuccess.bookingRef || 'AMS-2910817'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-xs font-bold leading-normal">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Reservation date</span>
                  <span className="text-[#1a1a1a] dark:text-slate-200 font-extrabold">{bookingSuccess.bookingDate || bookingDate}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Participants</span>
                  <span className="text-[#1a1a1a] dark:text-slate-200 font-extrabold">{bookingSuccess.ticketsCount || guestCount} Adults ({selectedPackage.name})</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Amount Processed</span>
                  <span className="text-brand text-sm font-black">{formatPrice(bookingSuccess.totalPrice ?? totalPriceFloat)}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Pass Status</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 uppercase text-[10px] font-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Active admission QR
                  </span>
                </div>
              </div>

              {/* Digital entry ticket barcode / QR illustration */}
              <div className="mt-6 pt-5 border-t border-gray-200 dark:border-slate-800/80 flex flex-col items-center justify-center gap-2">
                <div className="w-24 h-24 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_all_about_QR_codes_on_English_Wikipedia.svg" 
                    alt="Digital Boarding Pass Admission QR code" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest select-none">
                  Ticket pass UUID: {bookingSuccess.id || 'CONF-8172901-AMS'}
                </span>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <button
                id="view-my-tickets-btn"
                onClick={() => {
                  onClose();
                  if (onNavigateToBookings) {
                    onNavigateToBookings();
                  }
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-brand hover:bg-[#be000b] active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                View My Tickets
              </button>
              <button
                id="continue-explore-btn"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 dark:bg-slate-805 hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Continue Traveling
              </button>
            </div>

          </motion.div>
        )}
      </div>

      {/* Custom Share Modal Dialog */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-150 dark:border-slate-800 overflow-hidden z-10 p-6 flex flex-col gap-5 select-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-brand" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Share Activity
                  </h3>
                </div>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Activity Mini-Preview */}
              <div className="flex gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                <img
                  src={mainImage}
                  alt={attraction.name}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200/50 dark:border-slate-800/80 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {attraction.name}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand" />
                    {attraction.city}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-400">
                      {attraction.rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy URL Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Activity Link URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-brand text-white hover:bg-[#be000b] active:scale-95'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Share Platforms */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Quick Share
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      `Check out ${attraction.name}`
                    )}&body=${encodeURIComponent(
                      `I found this amazing activity on Secure Bookings:\n\n${attraction.name}\n${attraction.description}\n\nView here: ${shareUrl}`
                    )}`}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850/80 border border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand transition-colors text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wide">
                      Email
                    </span>
                  </a>

                  {/* Twitter/X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Planning my next adventure: ${attraction.name}! Check it out:`
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850/80 border border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand transition-colors text-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wide">
                      Twitter
                    </span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Check out this amazing activity on Secure Bookings: ${attraction.name} - ${shareUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850/80 border border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand transition-colors text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wide">
                      WhatsApp
                    </span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850/80 border border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand transition-colors text-center"
                  >
                    <Compass className="w-4 h-4" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wide">
                      Facebook
                    </span>
                  </a>
                </div>
              </div>

              {/* Secure QR Code Pass */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2">
                <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-150 shadow-xs flex items-center justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_all_about_QR_codes_on_English_Wikipedia.svg"
                    alt="Scan to share activity link"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
                  Scan QR code to open on mobile
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
