import React, { useState } from 'react';
import { Globe, Instagram, Facebook, ChevronDown, ArrowRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import SettingsModal from './SettingsModal';

export default function Footer({ onExplore, onNavigate }: { onExplore?: () => void, onNavigate?: (page: 'home' | 'attractions-and-museums' | 'hot-deals') => void }) {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { currency } = useSettings();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-10 pb-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 block">
                Tiqsey<span className="text-brand">.</span>
              </span>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-sm mb-4">
                Making culture accessible to everyone. We help you find and book the best tickets for museums and attractions worldwide.
              </p>
            </div>
            

          </div>

          {/* Links block */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm mt-4 lg:mt-0 lg:pl-16">
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-2 font-semibold text-gray-400">
                <li><a href="#" onClick={(e) => { e.preventDefault(); if (onExplore) onExplore(); }} className="hover:text-brand transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-brand transition-colors font-bold text-amber-400" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('hot-deals'); }}>Hot Deals 🔥</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Gift Cards</a></li>
              </ul>
            </div>
          
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-2 font-semibold text-gray-400">
                <li><a href="#" className="hover:text-brand transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-2 font-semibold text-gray-400">
                <li><a href="#" className="hover:text-brand transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Cancellation</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col border-t border-white/10 pt-6 md:flex-row justify-between items-center gap-6 text-xs font-bold text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <p>© {currentYear} Tiqsey. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-10 flex-col sm:flex-row w-full sm:w-auto">
            <div className="flex items-center gap-6">
              {[
                { icon: Instagram, name: 'Instagram', hoverColor: 'hover:text-[#E4405F]' },
                { icon: Facebook, name: 'Facebook', hoverColor: 'hover:text-[#1877F2]' },
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className={`text-gray-400 ${social.hoverColor} transition-colors block transform hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <button 
              onClick={() => setSettingsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full transition-all border border-white/10 hover:border-white/20 text-white shadow-lg w-full sm:w-auto"
            >
              <Globe className="w-4 h-4 text-brand" />
              <span className="uppercase tracking-wider">{currency.code}</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>
      </div>

      <SettingsModal 
        isOpen={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </footer>
  );
}
