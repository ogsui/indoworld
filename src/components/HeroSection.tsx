import React, { useState } from 'react';
import { Search, MapPin, ShieldCheck, Award, ArrowRight, Sparkles, CheckCircle2, Plane, Building2, Compass, Globe2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/businessData';

interface HeroSectionProps {
  onSearch: (searchTerm: string, category: string) => void;
  onOpenInquiry: (initialService?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onOpenInquiry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
    const element = document.getElementById('packages-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickDestination = (dest: string) => {
    setSearchTerm(dest);
    onSearch(dest, 'all');
    const element = document.getElementById('packages-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#FAF9F6] text-[#0B2545] border-b border-[#0B2545]/20 overflow-hidden">
      {/* Dynamic atmospheric background with subtle radial grid and animated gradient glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:28px_28px]"></div>
      
      {/* Animated soft aura elements */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#002FA7]/20 via-[#DC2626]/10 to-amber-200/20 blur-[130px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Verification & Location Badge with Motion */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#0B2545]/30 bg-white shadow-xs text-[10px] uppercase tracking-widest font-bold text-[#0B2545]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Sector 1, Vaishali, Ghaziabad</span>
            <span className="text-[#0B2545]/30">•</span>
            <span>Est. {BUSINESS_INFO.established} (17+ Years)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B2545] text-white text-[10px] uppercase tracking-widest font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Govt. GST Registered ({BUSINESS_INFO.gstin})</span>
          </div>
        </motion.div>

        {/* Hero Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#0B2545] leading-[1.08]">
            Curated Holidays & <br className="hidden sm:inline" />
            <span className="text-[#DC2626] italic font-normal">Artistic Journeys</span> from Vaishali.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#0B2545]/85 font-normal leading-relaxed max-w-2xl mx-auto">
            Welcome to <strong className="text-[#0B2545] font-bold">Indoworld Tourism Services</strong>. 
            Over 17 years crafting personalized holiday tour packages, verified 3–5 star hotel stays, 
            exclusive domestic & international flight ticketing, and custom itineraries for travelers across Ghaziabad, Noida, and Delhi NCR.
          </p>

          {/* Quick value props list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider font-bold text-[#0B2545]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#002FA7] shrink-0" />
              100% Custom Itineraries
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#002FA7] shrink-0" />
              Verified Star Stays
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#002FA7] shrink-0" />
              Direct Airline Ticketing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#002FA7] shrink-0" />
              Transparent Pricing & GST Invoicing
            </span>
          </motion.div>
        </motion.div>

        {/* Search & Filter Bar with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-4 sm:p-5 border-2 border-[#0B2545] shadow-lg text-[#0B2545] grid grid-cols-1 md:grid-cols-12 gap-4"
          >
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <label htmlFor="hero-search-input" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#0B2545]/70 mb-1">
                Search Destination or Theme
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-[#0B2545]/40" />
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Kashmir, Himachal, Bali, Dubai..."
                  className="w-full pl-9 pr-4 py-2.5 bg-[#FAF9F6] border border-[#0B2545]/30 focus:border-[#002FA7] text-sm text-[#0B2545] placeholder-[#0B2545]/40 focus:outline-hidden font-medium"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="md:col-span-4">
              <label htmlFor="hero-category-select" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#0B2545]/70 mb-1">
                Travel Category
              </label>
              <select
                id="hero-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF9F6] hover:bg-white focus:bg-white border border-[#0B2545]/30 focus:border-[#002FA7] text-sm text-[#0B2545] focus:outline-hidden font-medium"
              >
                <option value="all">All Holiday Packages</option>
                <option value="domestic">Domestic Holidays</option>
                <option value="international">International Escapes</option>
                <option value="spiritual">Spiritual / Yatra Tours</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="md:col-span-3 flex items-end">
              <button
                id="hero-search-button"
                type="submit"
                className="w-full bg-[#002FA7] hover:bg-[#DC2626] border border-[#002FA7] text-white font-bold py-2.5 px-4 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer text-xs uppercase tracking-widest shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find Tours</span>
              </button>
            </div>
          </form>

          {/* Quick Destination Suggestions & Custom Planner Link */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#0B2545]/70 mr-1">
              Popular Quick Filters:
            </span>
            {['Kashmir', 'Himachal', 'Dubai', 'Kerala', 'Char Dham', 'Bali'].map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => handleQuickDestination(dest)}
                className="bg-white hover:bg-[#002FA7] hover:text-white text-[#0B2545] border border-[#0B2545]/20 px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors cursor-pointer"
              >
                {dest}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('custom-itinerary-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-3.5 py-1 text-[11px] font-bold tracking-wide transition-colors cursor-pointer flex items-center gap-1 ml-2 shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>We Do More Destinations → Custom AI Planner</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
