import React, { useState, useEffect } from 'react';
import { Globe, User, Menu, X, ChevronDown, Sun, Moon, Smartphone, Home, Flame, Ticket, Map, LogOut, Search, FerrisWheel, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import SettingsModal from './SettingsModal';
import SearchBar from './SearchBar';
import { POPULAR_ATTRACTIONS } from '../data/mockData';
import { getCurrencyFlag } from '../utils/currencyFlags';

export default function Header({ 
  onExplore, 
  onSearch, 
  onNavigate,
  onWishlistOpen,
  activePage = 'home',
  activeDestination = null
}: { 
  onExplore?: () => void, 
  onSearch?: (q: string) => void, 
  onNavigate?: (page: string) => void,
  onWishlistOpen?: () => void,
  activePage?: string,
  activeDestination?: string | null
}) {
  const { user, setAuthModalOpen, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);

  const { currency, theme, setTheme, t } = useSettings();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showHeaderSearch = scrolled || activePage !== 'home' || activeDestination !== null;

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const headerActive = true;

  return (
    <>
      <header 
        className={`sticky top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${!scrolled && activePage === 'home' && !activeDestination ? 'bg-[#F4F7F9] dark:bg-slate-950 shadow-none' : 'bg-white dark:bg-slate-900 shadow-sm'}`}
      >
        <div className={`h-[54px] sm:h-[60px] relative z-50 backdrop-blur-md transition-colors ${!scrolled && activePage === 'home' && !activeDestination ? 'bg-[#F4F7F9]/95 dark:bg-slate-950/95 border-b border-gray-200/60 dark:border-slate-800/50 md:border-b-transparent' : 'bg-white/95 dark:bg-slate-900/95 border-b border-gray-100/80 dark:border-slate-850/80'}`}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3 sm:gap-4 md:gap-8">
            <div 
              className="flex items-center cursor-pointer shrink-0 transition-all duration-300 hover:opacity-90 active:scale-95 select-none"
              onClick={() => {
                if (onExplore) onExplore();
                window.scrollTo(0, 0);
              }}
            >
              <span className="font-black tracking-tighter text-[26px] sm:text-[31px] text-[#e3000f] dark:text-[#e3000f] transition-colors leading-none">
                Tiqsey
              </span>
            </div>

            {/* Desktop Navigation & Actions (Renders together to eliminate empty center space) */}
            <div className="hidden md:flex items-center justify-end flex-1 h-full min-w-0 gap-5 lg:gap-7 xl:gap-[32px]">
              <nav className="flex items-center h-full relative select-none gap-4 lg:gap-6 xl:gap-[28px]">
                {[
                  { name: 'Home', label: t('navHome'), active: activePage === 'home' && !activeDestination, items: [], icon: Home },
                  { 
                    name: 'Attractions & Tours', 
                    label: t('navAttractionsAndTours'),
                    active: activePage === 'all-attractions', 
                    items: [],
                    icon: FerrisWheel
                  }
                ].map((item, idx) => (
                  <div key={idx} className="group relative h-full flex items-center">
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.name === 'Attractions & Tours') {
                          if (onNavigate) onNavigate('all-attractions');
                        } else {
                          if (onExplore) onExplore();
                        }
                      }}
                      className={`text-[13.5px] lg:text-[14.5px] xl:text-[15px] font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 h-full border-b-[2px] transition-all duration-200 ${
                        item.active 
                          ? 'text-brand border-brand' 
                          : 'text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand border-transparent hover:border-brand/20'
                      }`}
                    >
                      {item.icon && <item.icon className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] xl:w-[19px] xl:h-[19px] text-current shrink-0" strokeWidth={1.75} />}
                      <span>{item.label}</span>
                      {item.items.length > 0 && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-250 group-hover:text-brand" />}
                    </a>
                    
                    {/* Mega Menu Dropdown */}
                    {item.items.length > 0 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white dark:bg-slate-900 shadow-2xl shadow-brand/10 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 w-[90vw] lg:w-[840px] max-w-full grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 transform origin-top translate-y-2 group-hover:translate-y-0 transition-transform duration-300 relative">
                          {item.items.map((col, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-5">
                              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1A2B48] dark:text-slate-300 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-slate-800">
                                {col.title}
                              </h4>
                              <div className="flex flex-col gap-2.5 max-h-[280px] overflow-y-auto pr-1 select-none scrollbar-thin">
                                {col.links.map((link, linkIdx) => (
                                  <a 
                                    key={linkIdx} 
                                    href="#" 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      link.action();
                                    }}
                                    className="group/link text-xs font-semibold text-gray-500 dark:text-slate-400 hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-brand/50 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
                                    <span className="truncate" title={link.name}>{link.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Desktop Actions */}
              <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
              {showHeaderSearch && (
                <div className="w-[180px] lg:w-[240px] xl:w-[320px] shrink-0 transition-all duration-300">
                  <SearchBar 
                    isCompact={true} 
                    onSearch={(query) => {
                      if (onSearch) onSearch(query);
                    }}
                    placeholder={t('searchPlaceholder') || "Search attractions..."}
                  />
                </div>
              )}



              {/* Combined Settings Trigger */}
              <button 
                onClick={() => setSettingsModalOpen(true)}
                className="flex items-center gap-2 h-10 px-4 rounded-full text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand hover:bg-brand/5 dark:hover:bg-brand/10 border border-[#e3000f]/20 dark:border-[#e3000f]/30 hover:border-[#e3000f]/50 transition-all active:scale-95 select-none cursor-pointer shrink-0 shadow-sm shadow-brand/[0.01]"
                title={`${currency.code.toUpperCase()}`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-slate-150 dark:bg-slate-850">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <span className="w-[1px] h-3.5 bg-slate-200/80 dark:bg-slate-750 shrink-0" />
                <span className="text-[13.5px] font-bold text-[#1A2B48] dark:text-slate-200 tracking-wide">{currency.code}</span>
              </button>

              {/* Desktop Wishlist Button */}
              <button 
                onClick={onWishlistOpen}
                className="relative flex items-center justify-center p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all active:scale-95 select-none cursor-pointer shrink-0"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 transition-colors ${wishlist.length > 0 ? 'text-[#e3000f] fill-[#e3000f]' : 'text-current'}`} strokeWidth={2} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#e3000f] text-white text-[9.5px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white dark:border-slate-900 select-none">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Desktop Menu Button & Compact Submenus */}
              <div className="relative">
                <button
                  onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                  className={`flex items-center justify-center p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all active:scale-95 select-none cursor-pointer shrink-0 ${
                    desktopMenuOpen ? 'bg-slate-100/90 dark:bg-slate-800 text-brand' : ''
                  }`}
                  title="Menu"
                >
                  <Menu className="w-5 h-5 text-current" strokeWidth={2.25} />
                </button>

                <AnimatePresence>
                  {desktopMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-[55]" 
                        onClick={() => setDesktopMenuOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-3 right-0 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-[60] overflow-hidden text-left"
                      >
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setDesktopMenuOpen(false);
                              if (onExplore) onExplore();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#1A2B48] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm transition-colors text-left cursor-pointer"
                          >
                            <Home className="w-4.5 h-4.5 text-slate-500" strokeWidth={1.75} />
                            <span>Home</span>
                          </button>
                          <button
                            onClick={() => {
                              setDesktopMenuOpen(false);
                              if (onNavigate) onNavigate('all-attractions');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#1A2B48] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm transition-colors text-left cursor-pointer"
                          >
                            <FerrisWheel className="w-4.5 h-4.5 text-slate-550" strokeWidth={1.75} />
                            <span>Attractions & Tours</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

            {/* Mobile Menu Toggle & Wishlist button */}
            <div className="flex md:hidden items-center gap-1">
              <button 
                onClick={onWishlistOpen}
                className="relative p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-brand hover:bg-slate-105/50 dark:hover:bg-slate-800/50 transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 transition-colors ${wishlist.length > 0 ? 'text-[#e3000f] fill-[#e3000f]' : 'text-current'}`} strokeWidth={2} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#e3000f] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-slate-900 select-none scale-90">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button 
                className="p-2 ml-1 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-900 dark:text-slate-100" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-900 dark:text-slate-100" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Row for Sticky Search Bar on Mobile */}
        <AnimatePresence>
          {showHeaderSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.32 }}
              className="md:hidden w-full border-t border-gray-100 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2.5 shadow-sm overflow-visible"
            >
              <SearchBar 
                isCompact={true} 
                onSearch={(query) => {
                  if (onSearch) onSearch(query);
                }}
                placeholder="Search attractions..."
              />
            </motion.div>
          )}
        </AnimatePresence>



        {/* Universal Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-[#1A2B48]/40 dark:bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[360px] bg-white dark:bg-slate-950 z-[70] shadow-2xl flex flex-col overflow-y-auto"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-black tracking-tighter text-3xl text-[#e3000f] dark:text-[#e3000f] select-none">
                      Tiqsey
                    </span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col p-6 gap-6 flex-1">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A2B48] dark:text-slate-400 px-1 mb-2">{t('explore')}</span>
                    {[
                      { name: 'Home', label: t('navHome'), active: activePage === 'home' && !activeDestination, icon: Home },
                      { name: 'Attractions & Tours', label: t('navAttractionsAndTours'), active: activePage === 'all-attractions', icon: FerrisWheel }
                    ].map((item) => (
                      <button 
                        key={item.name}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (item.name === 'Attractions & Tours') {
                            if (onNavigate) onNavigate('all-attractions');
                          } else {
                            if (onExplore) onExplore();
                          }
                        }}
                        className={`flex items-center justify-between text-left gap-3 text-lg font-bold py-3 px-4 rounded-xl transition-colors ${
                          item.active 
                            ? 'bg-brand/5 text-brand dark:bg-brand/10' 
                            : 'text-gray-900 hover:bg-gray-50 dark:text-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="w-5 h-5 text-current" />}
                          <span>{item.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A2B48] dark:text-slate-400 px-1 mb-2">Currency</span>
                    <button 
                      onClick={() => { setSettingsModalOpen(true); setMobileMenuOpen(false); }}
                      className="flex items-center gap-3 text-lg font-medium text-gray-900 hover:bg-gray-50 dark:hover:bg-slate-900 dark:text-slate-100 py-3 px-4 rounded-xl transition-colors"
                    >
                      <span className="text-xl select-none leading-none shrink-0">{getCurrencyFlag(currency.code)}</span>
                      <span className="uppercase font-semibold">{currency.code}</span>
                    </button>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-2">
                    <a href="#" className="flex items-center gap-3 text-lg font-bold text-[#1A2B48] hover:bg-gray-50 dark:hover:bg-slate-900 dark:text-slate-100 py-3 px-4 rounded-xl transition-colors">
                      Support
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <SettingsModal 
        isOpen={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </>
  );
}
