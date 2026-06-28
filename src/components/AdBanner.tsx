import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Landmark, 
  Sun, 
  Sparkles, 
  Flame, 
  Copy, 
  CheckCircle2, 
  MousePointerClick,
  ArrowRight,
  Ticket,
  Compass
} from 'lucide-react';

interface AdBannerProps {
  onSelectDestination?: (dest: string) => void;
}

export default function AdBanner({ onSelectDestination }: AdBannerProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleCardClick = (target: string) => {
    if (target === 'deals') {
      const el = document.getElementById('hot-deals');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'tournament') {
      const el = document.getElementById('popular-attractions') || document.getElementById('destinations');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'summer') {
      const el = document.getElementById('hot-deals');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'destinations') {
      if (onSelectDestination) {
        onSelectDestination('Kuala Lumpur');
      } else {
        const el = document.getElementById('destinations');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-4 overflow-hidden select-none" id="promotional-banner">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col mb-6">
          <span className="text-[#e3000f] font-bold text-xs mb-1 block tracking-wide">Exclusive offers</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Activities Promotions
          </h2>
        </div>

        {/* Carousel Outer wrapper - Responsive Grid/Flex */}
        <div className="relative">
          
          {/* Horizontal Drag/Scroll Container Track */}
          <div 
            className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible scrollbar-none pb-3 md:pb-0 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {/* -------------------- CARD 1: Purple Playful DEALS Card -------------------- */}
            <div 
              onClick={() => handleCardClick('deals')}
              className="w-[280px] sm:w-[325px] md:w-full shrink-0 md:shrink aspect-[16/7.8] bg-gradient-to-br from-[#7700e6] via-[#5c03c4] to-[#3a018a] rounded-[1.25rem] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer shadow-sm select-none snap-start group/card hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              {/* Halftone Dot pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1.5px)',
                  backgroundSize: '16px 16px'
                }}
              />
              
              {/* Star sparks & lighting */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none" />

              {/* Floating Ticket elements exactly styled */}
              <motion.div 
                initial={{ rotate: 12 }}
                className="absolute top-4 left-5 w-10 sm:w-11 aspect-[1.8/1] bg-gradient-to-r from-amber-300 to-yellow-400 rounded shadow border border-yellow-250/20 flex items-center justify-between px-1.5 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -left-0.5 absolute" />
                <span className="font-black text-purple-950 text-xs italic mx-auto">%</span>
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -right-0.5 absolute" />
              </motion.div>

              <motion.div 
                initial={{ rotate: -20 }}
                className="absolute top-5 right-11 w-10 sm:w-11 aspect-[1.8/1] bg-gradient-to-r from-amber-300 to-yellow-400 rounded shadow border border-yellow-250/20 flex items-center justify-between px-1.5 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -left-0.5 absolute" />
                <span className="font-black text-purple-950 text-xs italic mx-auto">%</span>
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -right-0.5 absolute" />
              </motion.div>

              <motion.div 
                initial={{ rotate: -15 }}
                className="absolute bottom-8 left-6 w-11 sm:w-12 aspect-[1.8/1] bg-gradient-to-r from-amber-300 to-yellow-400 rounded shadow border border-yellow-250/20 flex items-center justify-between px-1.5 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -left-0.5 absolute" />
                <span className="font-black text-purple-950 text-sm italic mx-auto">%</span>
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -right-0.5 absolute" />
              </motion.div>

              <motion.div 
                initial={{ rotate: 28 }}
                className="absolute bottom-6 right-10 w-10 sm:w-11 aspect-[1.8/1] bg-gradient-to-r from-amber-300 to-yellow-400 rounded shadow border border-yellow-250/20 flex items-center justify-between px-1.5 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -left-0.5 absolute" />
                <span className="font-black text-purple-950 text-xs italic mx-auto">%</span>
                <div className="w-1.5 h-1.5 bg-[#5c03c4] rounded-full -right-0.5 absolute" />
              </motion.div>

              {/* Top info row */}
              <div className="z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-400 text-purple-950 text-[9px] font-black uppercase tracking-wider shadow-sm">
                  <Flame className="w-2.5 h-2.5 text-orange-600 fill-orange-500" />
                  <span>PLAY DEAL</span>
                </div>
              </div>

              {/* Central Title Splash Block */}
              <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
                <span className="block text-yellow-300 font-extrabold text-[11px] sm:text-xs italic tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] transform -rotate-1">
                  Grab all your
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-[1000] tracking-tighter text-white italic leading-none select-none uppercase drop-shadow-[0_2.5px_0px_#1e004a] filter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] my-1 transform group-hover/card:scale-105 transition-transform duration-300">
                  PLAY PASSES
                </h1>
                <div className="flex items-center justify-center gap-1 relative">
                  <span className="block text-lg sm:text-xl font-black text-[#ff22ab] drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] uppercase italic tracking-widest transform rotate-2">
                    here!
                  </span>
                  <div className="bg-slate-900/60 p-0.5 rounded-full border border-white/20 shadow">
                    <MousePointerClick className="w-3 h-3 text-yellow-300 fill-yellow-200" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Footer row containing interactive Code copiers */}
              <div className="z-10 flex items-center justify-between border-t border-white/10 pt-1.5">
                <span className="text-[8.5px] text-white/75 font-semibold uppercase tracking-wider">
                  🎉 Code: <span className="text-yellow-300 font-extrabold font-mono">TIQSEYPLAY</span>
                </span>
                
                <button
                  onClick={(e) => handleCopy(e, 'TIQSEYPLAY')}
                  title="Copy coupon code"
                  className="px-1.5 py-0.5 rounded bg-slate-950/60 hover:bg-slate-950 border border-yellow-400/30 text-[8px] text-white flex items-center gap-0.5 font-bold transition-colors"
                >
                  {copiedCode === 'TIQSEYPLAY' ? (
                    <>
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5 text-yellow-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* -------------------- CARD 2: Teal World Football Tournament -------------------- */}
            <div 
              onClick={() => handleCardClick('tournament')}
              className="w-[280px] sm:w-[325px] md:w-full shrink-0 md:shrink aspect-[16/7.8] bg-gradient-to-tr from-[#022f36] via-[#055c63] to-[#01888f] rounded-[1.25rem] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer shadow-sm select-none snap-start group/card hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              {/* Left Top ribbon stamp banner exactly matching visual layout */}
              <div className="absolute top-0 left-0 bg-[#ffcdd2] text-[#c2185b] font-black px-2 py-1 rounded-br-lg shadow-sm flex items-center gap-0.5 z-10 text-[8px] sm:text-[8.5px] uppercase tracking-wider">
                <Ticket className="w-2.5 h-2.5" />
                <span>STADIUM PASS</span>
              </div>

              {/* Guided Tours Badge */}
              <div className="mt-1.5 self-center z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/40 border border-white/10 text-white text-[9px] font-bold shadow-sm backdrop-blur-md">
                  <Globe className="w-3 h-3 text-[#00bfa5] animate-spin-slow" />
                  <span>Guided Tours</span>
                </div>
              </div>

              {/* Tournament stadium arcs simulated inside vector overlays */}
              <svg className="absolute inset-x-0 bottom-0 w-full h-1/2 opacity-15 pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M 0,200 Q 100,120 200,200 T 400,200" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="200" cy="180" r="50" fill="none" stroke="white" strokeWidth="1" />
              </svg>

              {/* Central text display */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1 z-10 my-0.5">
                <div className="px-2 py-0.5 rounded-lg bg-[#ce183a] border border-[#fff5f6]/30 text-white text-[8px] sm:text-[9px] font-black tracking-widest uppercase shadow mb-1 italic rotate-1">
                  World Football Tournament
                </div>
                <h3 className="text-sm sm:text-base md:text-base lg:text-[17px] text-white font-[950] tracking-tight leading-none text-center transform group-hover/card:scale-[1.03] transition-transform duration-300 drop-shadow-sm">
                  Match-Day Tours
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300 mt-0.5">& Stadium Passes</span>
                </h3>
              </div>

              {/* Card Footer T&Cs apply */}
              <div className="z-10 flex items-center justify-between border-t border-white/5 pt-1.5 text-[8.5px]">
                <span className="text-white/50 font-semibold uppercase tracking-wider">
                  T&Cs apply
                </span>
                <span className="text-[#00bfa5] font-black uppercase flex items-center gap-0.5 group-hover/card:underline">
                  <span>Explore Tickets</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>

            </div>

            {/* -------------------- CARD 3: Green Summer Surf & Save -------------------- */}
            <div 
              onClick={() => handleCardClick('summer')}
              className="w-[280px] sm:w-[325px] md:w-full shrink-0 md:shrink aspect-[16/7.8] bg-gradient-to-br from-[#00b906] via-[#049408] to-[#015403] rounded-[1.25rem] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer shadow-sm select-none snap-start group/card hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              {/* Left Top Resort Ribbon Stamp */}
              <div className="absolute top-0 left-0 bg-[#ffe0b2] text-[#e65100] font-black px-2 py-1 rounded-br-lg shadow-sm flex items-center gap-0.5 z-10 text-[8px] sm:text-[8.5px] uppercase tracking-wider">
                <Compass className="w-2.5 h-2.5 text-orange-500 fill-orange-400" />
                <span>WATER PARKS</span>
              </div>

              {/* Layout splits into characters left and highlight promotion block right */}
              <div className="flex-1 flex items-center justify-between gap-2 mt-3 z-10">
                
                {/* Left graphics */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="relative bg-gradient-to-br from-amber-300 to-orange-400 text-orange-950 font-black px-2 py-1 rounded-lg border border-white shadow shadow-sm rotate-[-2deg]">
                    <span className="block text-[7px] uppercase tracking-tight text-center leading-none text-orange-100 font-bold">SUMMER</span>
                    <span className="block text-[9px] text-white uppercase font-black leading-none tracking-tighter drop-shadow-sm">Break</span>
                  </div>

                  {/* Character surfing graphics scaled down */}
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="relative flex flex-col items-center"
                    >
                      <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center shadow-sm">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 bg-white rounded-full flex items-center justify-center"><div className="w-0.5 h-0.5 bg-black rounded-full" /></div>
                          <div className="w-1 h-1 bg-white rounded-full flex items-center justify-center"><div className="w-0.5 h-0.5 bg-black rounded-full" /></div>
                        </div>
                      </div>
                      <div className="w-7 h-1 bg-yellow-400 rounded-full border border-yellow-250 mt-0.5 transform rotate-[-3deg]" />
                    </motion.div>

                    <motion.div 
                      className="relative flex flex-col items-center"
                    >
                      <div className="w-4 h-6 bg-amber-400 rounded-full border border-white flex items-center justify-center shadow-sm">
                        <div className="w-3 h-1.5 bg-black rounded absolute top-1 border border-white/25" />
                      </div>
                      <div className="w-7 h-1 bg-sky-500 rounded-full border border-sky-300 mt-0.5 transform rotate-[3deg]" />
                    </motion.div>
                  </div>
                </div>

                {/* Right highlight block matching the glossy save box */}
                <div className="flex-1 bg-[#00600a]/95 backdrop-blur-sm border border-green-300/20 rounded-xl p-2 text-center max-w-[150px]">
                  <h4 className="text-[10px] sm:text-xs text-white font-black uppercase leading-tight tracking-wider transform group-hover/card:scale-105 transition-transform duration-300">
                    Swim, slide & save
                  </h4>
                  
                  {/* Highlight pill */}
                  <div className="bg-[#daff14] border border-white rounded-lg px-2 py-0.5 mt-1.5 text-[#014002] font-black text-[10px] sm:text-[11px] tracking-tight hover:brightness-105 shadow-sm">
                    Extra 15% off
                  </div>
                </div>

              </div>

              {/* Card Footer T&Cs apply */}
              <div className="z-10 flex items-center justify-between border-t border-white/5 pt-1.5 text-[8.5px] text-green-200">
                <span className="font-semibold uppercase tracking-wider">
                  T&Cs apply
                </span>
                <span className="font-extrabold uppercase flex items-center gap-0.5">
                  <span>Park Specials</span>
                </span>
              </div>

            </div>

            {/* -------------------- CARD 4: Pink/Rose City Destinations -------------------- */}
            <div 
              onClick={() => handleCardClick('destinations')}
              className="w-[280px] sm:w-[325px] md:w-full shrink-0 md:shrink aspect-[16/7.8] bg-gradient-to-br from-pink-600 via-rose-500 to-amber-500 rounded-[1.25rem] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer shadow-sm select-none snap-start group/card hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              {/* Particle overlay and radial gradient lights */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1.5px)',
                  backgroundSize: '12px 12px'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-black/20 pointer-events-none" />

              {/* Stamp on Top Left */}
              <div className="absolute top-0 left-0 bg-[#ffe0b2] text-[#e65100] font-black px-2 py-1 rounded-br-lg shadow-sm flex items-center gap-0.5 z-10 text-[8px] sm:text-[8.5px] uppercase tracking-wider">
                <Landmark className="w-2.5 h-2.5 text-orange-600" />
                <span>CITY GUIDE</span>
              </div>

              {/* Featured destination badge/indicator */}
              <div className="mt-1.5 self-end z-10">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 border border-white/10 text-white text-[9px] font-bold shadow-sm backdrop-blur-md">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                  <span>Featured City</span>
                </div>
              </div>

              {/* Central typography */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1 z-10 my-0.5">
                <span className="block text-rose-100 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest drop-shadow-sm">
                  Discover top picks in
                </span>
                <h3 className="text-sm sm:text-base md:text-base lg:text-[17px] text-white font-[1000] tracking-tighter leading-none text-center transform group-hover/card:scale-[1.03] transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] uppercase my-1">
                  Kuala Lumpur
                </h3>
                <span className="block text-[8px] sm:text-[9px] text-amber-150 font-bold tracking-wide italic">
                  Explore iconic towers & cultural hubs
                </span>
              </div>

              {/* Card Footer */}
              <div className="z-10 flex items-center justify-between border-t border-white/10 pt-1.5 text-[8.5px] text-rose-100">
                <span className="font-semibold uppercase tracking-wider opacity-90">
                  Best price guaranteed
                </span>
                <span className="font-extrabold uppercase flex items-center gap-0.5 text-yellow-300 group-hover/card:underline">
                  <span>Explore Now</span>
                  <ArrowRight className="w-2.5 h-2.5 text-yellow-300 transition-transform group-hover/card:translate-x-0.5" />
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
