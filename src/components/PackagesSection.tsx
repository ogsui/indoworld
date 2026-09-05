import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  Eye, 
  CreditCard, 
  ArrowRight,
  Filter,
  Search,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOUR_PACKAGES } from '../data/businessData';
import { TourPackage } from '../types';

interface PackagesSectionProps {
  searchTerm: string;
  categoryFilter: string;
  onSelectCategory: (category: string) => void;
  onViewItinerary: (pkg: TourPackage) => void;
  onOpenInquiry: (initialService?: string, initialDestination?: string) => void;
  onBookPackage?: (pkg: TourPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  searchTerm,
  categoryFilter,
  onSelectCategory,
  onViewItinerary,
  onOpenInquiry,
  onBookPackage,
}) => {
  const [internalSearch, setInternalSearch] = useState(searchTerm);

  useEffect(() => {
    setInternalSearch(searchTerm);
  }, [searchTerm]);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'domestic', label: 'Domestic' },
    { id: 'international', label: 'International' },
    { id: 'spiritual', label: 'Spiritual' },
  ];

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    const matchesCategory =
      categoryFilter === 'all' || pkg.category === categoryFilter;

    const term = internalSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      pkg.title.toLowerCase().includes(term) ||
      pkg.destination.toLowerCase().includes(term) ||
      pkg.description.toLowerCase().includes(term) ||
      pkg.highlights.some((h) => h.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="packages-section" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#0B2545]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545] border border-[#0B2545]/30 px-3 py-1 mb-3 bg-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Handcrafted Travel Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#0B2545]">
              Featured <span className="text-[#DC2626] italic font-normal">Vacation</span> Packages
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#0B2545]/80 max-w-2xl">
              Carefully curated vacation packages with pre-booked star hotels, curated local sightseeing, and verified itinerary routes tailored for Ghaziabad & Delhi NCR travelers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-all duration-150 cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#0B2545] text-[#FAF9F6] border border-[#0B2545] shadow-xs'
                    : 'bg-white text-[#0B2545] border border-[#0B2545]/30 hover:border-[#0B2545]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search refinement bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-[#0B2545]/30 shadow-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              placeholder="Filter by city, state, or country..."
              className="w-full pl-3 pr-8 py-2 text-xs bg-[#FAF9F6] border border-[#0B2545]/30 focus:border-[#002FA7] text-[#0B2545] placeholder:text-[#0B2545]/40 focus:outline-hidden"
            />
            <Search className="w-3.5 h-3.5 text-[#0B2545]/40 absolute right-3 top-3" />
          </div>

          <div className="text-xs text-[#0B2545]/70 flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="font-semibold">{filteredPackages.length} packages found</span>
            {internalSearch && (
              <button
                onClick={() => setInternalSearch('')}
                className="text-[10px] uppercase font-bold tracking-wider text-[#DC2626] hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid with Animation */}
        {filteredPackages.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredPackages.map((pkg, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={pkg.id}
                  id={`pkg-card-${pkg.id}`}
                  className="bg-white border-2 border-[#0B2545]/20 hover:border-[#002FA7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/25 to-transparent"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {pkg.badge && (
                        <span className="bg-[#DC2626] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 shadow-xs">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-[#0B2545]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {pkg.rating}
                      </span>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-3 left-3 right-3 text-[#FAF9F6]">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1 mb-0.5">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                      <div className="text-xs text-[#FAF9F6] flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#DC2626] shrink-0" />
                        <span className="truncate">{pkg.destination}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0B2545] group-hover:text-[#002FA7] transition-colors line-clamp-1">
                        {pkg.title}
                      </h3>

                      {/* Highlights */}
                      <div className="mt-3.5 space-y-2">
                        {pkg.highlights.slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#0B2545]/80">
                            <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="mt-6 pt-4 border-t border-[#0B2545]/15">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#0B2545]/60 tracking-widest block">
                            Starts at
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-serif font-bold text-[#0B2545]">
                              ₹{pkg.startingPrice.toLocaleString('en-IN')}
                            </span>
                            {pkg.originalPrice && (
                              <span className="text-xs text-[#0B2545]/40 line-through">
                                ₹{pkg.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#0B2545]/60 font-semibold">per person</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id={`itinerary-btn-${pkg.id}`}
                          onClick={() => onViewItinerary(pkg)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 border border-[#0B2545] hover:bg-[#0B2545] hover:text-white text-[#0B2545] text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Itinerary</span>
                        </button>
                        <button
                          id={`book-btn-${pkg.id}`}
                          onClick={() => {
                            if (onBookPackage) {
                              onBookPackage(pkg);
                            } else {
                              onOpenInquiry('Tour Package', pkg.destination);
                            }
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#002FA7] hover:bg-[#DC2626] text-white text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer shadow-xs border border-[#002FA7]"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Book Online</span>
                        </button>
                      </div>

                      <div className="mt-2 text-center">
                        <button
                          id={`inquire-btn-${pkg.id}`}
                          onClick={() => onOpenInquiry('Tour Package', pkg.destination)}
                          className="text-[10px] uppercase font-bold tracking-widest text-[#0B2545]/70 hover:text-[#DC2626] cursor-pointer underline transition-colors"
                        >
                          Or Inquire / Customize Route
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="bg-white border border-[#0B2545]/30 p-8 text-center max-w-md mx-auto">
            <p className="text-[#0B2545] text-sm mb-3">
              No packages found matching &quot;{internalSearch}&quot;.
            </p>
            <button
              onClick={() => {
                setInternalSearch('');
                onSelectCategory('all');
              }}
              className="text-xs uppercase tracking-widest font-bold text-[#DC2626] hover:text-[#0B2545] underline cursor-pointer"
            >
              Reset filters to see all packages
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
