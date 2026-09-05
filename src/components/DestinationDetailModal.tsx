import React from 'react';
import { DestinationHighlight, TourPackage } from '../types';
import { X, MapPin, Calendar, Compass, Car, Utensils, CheckCircle2, ArrowRight } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: DestinationHighlight | null;
  onClose: () => void;
  onSelectPackageForBooking?: (pkgId: string) => void;
  onOpenInquiry?: (service: string, dest: string) => void;
  availablePackages: TourPackage[];
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onSelectPackageForBooking,
  onOpenInquiry,
  availablePackages,
}) => {
  if (!destination) return null;

  const matchedPackages = availablePackages.filter((pkg) =>
    destination.recommendedPackageIds.includes(pkg.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1A1A1A]/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-4xl border border-[#1A1A1A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-72 shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 border border-white/30 bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-5 right-5 text-[#FAF9F6]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 border border-white/40 bg-[#FAF9F6] text-[#1A1A1A]">
                {destination.region}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 border border-white/20 bg-black/40 text-[#C4A484]">
                Indoworld Verified Route
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-tight">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF9F6]/85 font-sans mt-1 max-w-2xl">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1A1A1A]">
          {/* Overview */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/60 block mb-1">
              Destination Overview
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-[#1A1A1A]/85 font-sans">
              {destination.overview}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-[#1A1A1A]/20">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1A1A1A] mb-1.5">
                <Calendar className="w-4 h-4 text-[#C4A484]" />
                <span>Best Time to Travel</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
                {destination.bestTimeToVisit}
              </p>
            </div>

            <div className="bg-white p-4 border border-[#1A1A1A]/20">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#1A1A1A] mb-1.5">
                <Car className="w-4 h-4 text-[#C4A484]" />
                <span>Transit from Vaishali / Delhi NCR</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
                {destination.routeFromDelhiNCR}
              </p>
            </div>
          </div>

          {/* Top Attractions & Must-Try Food */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#1A1A1A] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C4A484]" />
                <span>Key Sights & Experiences</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#1A1A1A]/85 font-sans">
                {destination.topAttractions.map((sight, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2.5 border border-[#1A1A1A]/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A484] shrink-0 mt-0.5" />
                    <span>{sight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-serif font-bold text-[#1A1A1A] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#C4A484]" />
                  <span>Regional Culinary Highlights</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.popularFood.map((food, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white border border-[#1A1A1A]/20 px-3 py-1.5 font-sans text-[#1A1A1A]/85"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#F2EFE9] p-4 border border-[#1A1A1A]/20">
                <h4 className="text-xs font-serif font-bold text-[#1A1A1A] mb-2">
                  Indoworld Vaishali Desk Tips
                </h4>
                <ul className="space-y-1.5 text-xs text-[#1A1A1A]/80 font-sans">
                  {destination.curatedTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#C4A484] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Tour Packages */}
          {matchedPackages.length > 0 && (
            <div className="pt-2 border-t border-[#1A1A1A]/15">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                  Curated Packages for {destination.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
                  Direct Vaishali Pickup Available
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white border border-[#1A1A1A]/25 p-4 flex flex-col justify-between hover:border-[#1A1A1A] transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4A484]">
                        {pkg.duration}
                      </span>
                      <h4 className="font-serif text-base text-[#1A1A1A] font-bold mt-0.5">
                        {pkg.title}
                      </h4>
                      <p className="text-xs text-[#1A1A1A]/70 font-sans mt-1">
                        Starting from ₹{pkg.startingPrice.toLocaleString('en-IN')} per person
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectPackageForBooking) {
                            onSelectPackageForBooking(pkg.id);
                          }
                        }}
                        className="text-[10px] uppercase font-bold tracking-widest text-[#FAF9F6] bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] px-3.5 py-2 border border-[#1A1A1A] cursor-pointer transition-all flex items-center gap-1"
                      >
                        <span>Book Online</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {onOpenInquiry && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenInquiry('Tour Package', destination.name);
                          }}
                          className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:underline px-2 py-1 cursor-pointer"
                        >
                          Customize
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#1A1A1A]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#1A1A1A]/70 font-sans text-center sm:text-left">
            Need customized travel dates or group vehicle? Visit our Ansal Plaza Vaishali office.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#1A1A1A]/30 text-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest hover:bg-[#FAF9F6] cursor-pointer"
            >
              Close Guide
            </button>
            {onOpenInquiry && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry('Custom Itinerary', destination.name);
                }}
                className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 border border-[#1A1A1A] shadow-xs cursor-pointer transition-all"
              >
                Inquire for {destination.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
