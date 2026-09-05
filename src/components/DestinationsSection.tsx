import React, { useState } from 'react';
import { DESTINATION_HIGHLIGHTS } from '../data/travelFeaturesData';
import { DestinationHighlight, TourPackage } from '../types';
import { DestinationDetailModal } from './DestinationDetailModal';
import { Compass, ArrowUpRight, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface DestinationsSectionProps {
  availablePackages: TourPackage[];
  onSelectPackageForBooking?: (pkgId: string) => void;
  onOpenInquiry?: (service: string, destination: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  availablePackages,
  onSelectPackageForBooking,
  onOpenInquiry,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<DestinationHighlight | null>(null);

  return (
    <section id="destinations-section" className="py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#C4A484]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/60">
                Flagship Subcontinent Horizons
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1A1A]">
              Key Destination Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-sans mt-1 max-w-2xl">
              Promoting premier tourism across Himachal, Uttarakhand, Rajasthan, Kerala, and Asian escapes since 2008. Click any destination to view curated travel intel, routes, and verified itineraries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4A484] px-3 py-1.5 border border-[#1A1A1A]/20 bg-white">
              5 Handpicked Regions
            </span>
          </div>
        </div>

        {/* Dynamic Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATION_HIGHLIGHTS.map((dest, idx) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className={`group cursor-pointer bg-white border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isFeatured ? 'lg:col-span-2 md:col-span-2' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${isFeatured ? 'h-64 sm:h-80' : 'h-56'}`}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent"></div>

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-2.5 py-1 bg-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A]">
                      {dest.region}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDestination(dest);
                    }}
                    className="absolute top-4 right-4 w-9 h-9 border border-white/30 bg-[#1A1A1A]/60 group-hover:bg-[#1A1A1A] text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label={`Open guide for ${dest.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#C4A484] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 text-[#FAF9F6]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#C4A484] font-sans mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Direct NCR Doorstep Pickup</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#FAF9F6]/85 font-sans mt-1 line-clamp-1">
                      {dest.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#1A1A1A]/75 font-sans leading-relaxed line-clamp-2">
                    {dest.overview}
                  </p>

                  {/* Highlights Pill Preview */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/50 block">
                      Key Experiences
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.topAttractions.slice(0, isFeatured ? 4 : 2).map((sight, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] bg-[#FAF9F6] border border-[#1A1A1A]/15 px-2.5 py-1 text-[#1A1A1A]/80 font-sans"
                        >
                          {sight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A484] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Reliable Scraped Travel Intel</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] group-hover:text-[#C4A484] transition-colors flex items-center gap-1">
                      <span>View Full Guide</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* We Do More Destinations Banner */}
        <div className="mt-12 bg-[#0B2545] text-white p-6 sm:p-8 border-2 border-[#002FA7] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#DC2626] text-white text-[9px] uppercase font-extrabold px-2 py-0.5 tracking-widest">
                Unlimited Destinations
              </span>
              <span className="text-xs text-[#FAF9F6]/80">
                120+ Domestic & International Destinations Covered
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1.5">
              Want to Travel Somewhere Else?
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-xl font-sans">
              From high-altitude Himalayan expeditions in Spiti to cherry blossoms in Japan or island retreats in Vietnam — our Vaishali team crafts customized day-by-day itineraries with verified hotels, curated sightseeing, and flight ticketing.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('custom-itinerary-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#002FA7] hover:bg-[#DC2626] text-white text-xs uppercase font-bold tracking-widest px-6 py-3.5 transition-colors cursor-pointer shrink-0 shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Design Custom Itinerary</span>
          </button>
        </div>
      </div>

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onSelectPackageForBooking={onSelectPackageForBooking}
        onOpenInquiry={onOpenInquiry}
        availablePackages={availablePackages}
      />
    </section>
  );
};
