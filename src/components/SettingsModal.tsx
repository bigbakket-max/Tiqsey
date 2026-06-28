import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Globe, Coins } from 'lucide-react';
import { useSettings, CURRENCIES } from '../contexts/SettingsContext';
import { motion, AnimatePresence } from 'motion/react';
import { getCurrencyFlag } from '../utils/currencyFlags';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getCurrencyLabel = (curr: typeof CURRENCIES[0], isSelected: boolean) => {
  const code = curr.code;
  let name = curr.name;
  
  if (code === 'AED') name = 'United Arab Emirates Dirham';
  if (code === 'USD') name = 'United States Dollar';
  if (code === 'AZN') name = 'Azerbaijani manat';
  if (code === 'AUD') name = 'Australian Dollar';
  if (code === 'BHD') name = 'Bahraini Dinar';
  if (code === 'BRL') name = 'Brazilian Real';
  if (code === 'BYN') name = 'Belarusian ruble';
  if (code === 'CAD') name = 'Canadian Dollar';
  if (code === 'CHF') name = 'Swiss Franc';
  if (code === 'CLP') name = 'Chilean Peso';
  if (code === 'CNY') name = 'Chinese Yuan';
  if (code === 'COP') name = 'Colombian Peso';
  if (code === 'DKK') name = 'Danish Krone';
  if (code === 'EUR') name = 'Euro';
  if (code === 'GBP') name = 'British Pound';
  if (code === 'HKD') name = 'Hong Kong Dollar';
  if (code === 'IDR') name = 'Indonesian Rupiah';
  if (code === 'ILS') name = 'Israeli New Shekel';
  if (code === 'JOD') name = 'Jordanian Dinar';
  if (code === 'JPY') name = 'Japanese Yen';
  if (code === 'KRW') name = 'Korean Won';
  if (code === 'KWD') name = 'Kuwaiti Dinar';
  if (code === 'KZT') name = 'Kazakhstani tenge';
  if (code === 'LAK') name = 'Lao Kip';
  if (code === 'MNT') name = 'Mongolian Tugrik';
  if (code === 'MOP') name = 'Macau Pataca';
  if (code === 'MXN') name = 'Mexican Peso';
  if (code === 'MYR') name = 'Malaysian Ringgit';
  if (code === 'NZD') name = 'New Zealand Dollar';
  if (code === 'OMR') name = 'Omani Rial';
  if (code === 'PHP') name = 'Philippine Peso';
  if (code === 'PKR') name = 'Pakistani Rupee';
  if (code === 'PLN') name = 'Polish Zloty';
  if (code === 'QAR') name = 'Qatari Riyal';
  if (code === 'RUB') name = 'Russian Ruble';
  if (code === 'SAR') name = 'Saudi Riyal';
  if (code === 'SEK') name = 'Swedish Krona';
  if (code === 'SGD') name = 'Singapore Dollar';
  if (code === 'THB') name = 'Thai Baht';
  if (code === 'TRY') name = 'Turkish Lira';
  if (code === 'TWD') name = 'New Taiwan Dollar';
  if (code === 'VND') name = 'Vietnamese Dong';
  if (code === 'ZAR') name = 'South African Rand';

  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AUD: 'AU$',
    HKD: 'HK$',
    KRW: '₩',
    MXN: 'Mex$',
  };
  
  const sym = symbols[code];
  const flag = getCurrencyFlag(code);
  
  if (isSelected) {
    return (
      <span className="text-[13px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2 truncate">
        <span className="text-base select-none shrink-0" role="img" aria-label={`${code} flag`}>{flag}</span>
        <span className="truncate">
          <strong className="font-extrabold mr-1">{code}</strong>
          <span>- {name}</span>
          {sym && <span> ({sym})</span>}
        </span>
      </span>
    );
  }

  return (
    <span className="text-[13px] font-[500] text-slate-700 dark:text-slate-300 flex items-center gap-2 truncate group-hover:text-slate-900 dark:group-hover:text-white">
      <span className="text-base select-none shrink-0" role="img" aria-label={`${code} flag`}>{flag}</span>
      <span className="truncate">
        <strong className="font-extrabold text-[#1a2b49] dark:text-slate-100 mr-1">{code}</strong>
        <span className="text-slate-600 dark:text-slate-400 font-medium">- {name}</span>
        {sym && <span className="text-slate-400 dark:text-slate-500 font-normal"> ({sym})</span>}
      </span>
    </span>
  );
};

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { currency, setCurrency, detectedLocalCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Autofocus search on open or tab change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard controls: Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const sortedAllCurrencies = [...CURRENCIES].sort((a, b) => {
    if (a.code === currency.code) return -1;
    if (b.code === currency.code) return 1;
    return a.code.localeCompare(b.code);
  });

  const handleSelectCurrency = (curr: typeof CURRENCIES[0]) => {
    setCurrency(curr);
    onClose();
  };

  // Filters
  const topCurrencyCodes = Array.from(
    new Set([
      detectedLocalCurrency.code,
      'GBP',
      'AED',
      'EUR',
      'USD',
      'SGD',
    ])
  );

  const filteredTopCurrencies = topCurrencyCodes
    .map(code => CURRENCIES.find(c => c.code === code))
    .filter((c): c is typeof CURRENCIES[0] => !!c)
    .filter(c =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredAllCurrencies = sortedAllCurrencies.filter((curr) =>
    curr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    curr.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSearching = searchQuery.trim() !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-[3px]"
            id="settings-modal-backdrop"
          />

          {/* Centered Modal Overlay Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-[800px] h-[640px] max-h-[90vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans border border-slate-100 dark:border-slate-800 transition-colors duration-300"
              id="settings-modal-container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Inline Custom Scrollbar style logic */}
              <style>{`
                #settings-modal-content-container::-webkit-scrollbar {
                  width: 6px;
                }
                #settings-modal-content-container::-webkit-scrollbar-track {
                  background: transparent;
                }
                #settings-modal-content-container::-webkit-scrollbar-thumb {
                  background: #e2e8f0;
                  border-radius: 9999px;
                }
                .dark #settings-modal-content-container::-webkit-scrollbar-thumb {
                  background: #334155;
                }
                #settings-modal-content-container::-webkit-scrollbar-thumb:hover {
                  background: #cbd5e1;
                }
                .dark #settings-modal-content-container::-webkit-scrollbar-thumb:hover {
                  background: #475569;
                }
              `}</style>

              {/* STICKY TOP HEADER CONTROL PANEL */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 z-20 shrink-0 flex flex-col border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
                {/* Tab buttons Row */}
                <div className="flex items-center justify-between px-6 md:px-8 pt-6 relative">
                  <div className="flex gap-6 md:gap-8 relative" id="modal-title">
                    <button
                      className="pb-4 text-base md:text-[17px] font-extrabold tracking-tight relative cursor-default outline-none select-none text-[#1A2B48] dark:text-white"
                      id="tab-currency"
                    >
                      Currency
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1A2B48] dark:bg-white rounded-full z-10"
                        transition={{ type: 'spring', damping: 30, stiffness: 380 }}
                      />
                    </button>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-6 md:right-8 p-1.5 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-250 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center outline-none select-none"
                    title="Close"
                    aria-label="Close settings"
                    id="close-settings-modal"
                  >
                    <X className="w-5.5 h-5.5" strokeWidth={2.4} />
                  </button>
                </div>

                {/* Sticky Search bar row */}
                <div className="px-6 md:px-8 pb-4 pt-3 bg-white dark:bg-slate-900 transition-colors duration-300">
                  <div className="relative flex items-center group">
                    <span className="absolute left-4 text-slate-400 dark:text-slate-500 transition-colors duration-200 group-focus-within:text-blue-500">
                      <Search className="w-4.5 h-4.5" />
                    </span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder='Search currencies...'
                      className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-[13.5px] font-medium text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950/70 focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 transition-all duration-200"
                    />
                    {isSearching && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-150 cursor-pointer"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SCROLLABLE CONTENT BODY */}
              <div
                className="p-6 md:p-8 overflow-y-auto flex-1 scroll-smooth bg-white dark:bg-slate-900/40 transition-colors duration-300"
                id="settings-modal-content-container"
                style={{ scrollbarWidth: 'thin' }}
              >
                {/* CURRENCY CONTAINER */}
                {isSearching ? (
                    filteredAllCurrencies.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <div className="text-[13px] font-bold text-slate-400 dark:text-slate-550 select-none tracking-wide uppercase">
                          Search Results
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                          {filteredAllCurrencies.map((curr) => {
                            const isSelected = currency.code === curr.code;
                            return (
                              <button
                                key={`search-${curr.code}`}
                                onClick={() => handleSelectCurrency(curr)}
                                className={`px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer outline-none group select-none ${
                                  isSelected
                                    ? 'bg-slate-100 dark:bg-slate-800/95 font-bold'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-transparent'
                                }`}
                                id={`curr-search-${curr.code}`}
                              >
                                {getCurrencyLabel(curr, isSelected)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Currencies Empty Result */
                      <div className="py-16 text-center flex flex-col items-center justify-center">
                        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-full mb-3 text-slate-400">
                          <Coins className="w-8 h-8" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          No currencies found
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[280px]">
                          We couldn't find any currency matching "{searchQuery}"
                        </p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-4 px-4 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-full transition-all duration-200 cursor-pointer"
                        >
                          Reset search
                        </button>
                      </div>
                    )
                  ) : (
                    /* Default Sections (Top + All) when NOT searching */
                    <div className="flex flex-col gap-6">
                      {/* Top Currencies */}
                      {filteredTopCurrencies.length > 0 && (
                        <div className="flex flex-col gap-3">
                          <div className="text-[14px] font-bold text-slate-800 dark:text-slate-200 select-none">
                            Top currencies
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                            {filteredTopCurrencies.map((curr) => {
                              const isSelected = currency.code === curr.code;
                              return (
                                <button
                                  key={`top-${curr.code}`}
                                  onClick={() => handleSelectCurrency(curr)}
                                  className={`px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer outline-none group select-none ${
                                    isSelected
                                      ? 'bg-slate-100 dark:bg-slate-800 font-bold'
                                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-transparent'
                                  }`}
                                  id={`curr-top-${curr.code}`}
                                >
                                  {getCurrencyLabel(curr, isSelected)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800/60 my-1 transition-colors duration-300" />

                      {/* All Currencies */}
                      <div className="flex flex-col gap-3">
                        <div className="text-[14px] font-bold text-slate-800 dark:text-slate-200 select-none">
                          All currencies
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
                          {sortedAllCurrencies.map((curr) => {
                            const isSelected = currency.code === curr.code;
                            return (
                              <button
                                key={`all-${curr.code}`}
                                onClick={() => handleSelectCurrency(curr)}
                                className={`px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer outline-none group select-none ${
                                  isSelected
                                    ? 'bg-slate-100 dark:bg-slate-800 font-bold'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-transparent'
                                  }`}
                                id={`curr-all-${curr.code}`}
                              >
                                {getCurrencyLabel(curr, isSelected)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>

              {/* Disclaimer footer */}
              <div className="px-6 md:px-8 py-2 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 shrink-0 select-none transition-colors duration-300">
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Where applicable, prices will be converted and shown in the currency you select. The currency you pay in may differ based on your reservation.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
