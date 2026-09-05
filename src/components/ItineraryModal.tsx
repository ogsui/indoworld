import React from 'react';
import { X, Clock, Calendar, Check, AlertCircle, MessageCircle, MapPin, Star, IndianRupee } from 'lucide-react';
import { TourPackage } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

interface ItineraryModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onOpenInquiry: (initialService?: string, initialDestination?: string) => void;
  onBookPackage?: (pkg: TourPackage) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ pkg, onClose, onOpenInquiry, onBookPackage }) => {
  if (!pkg) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Indoworld Tourism Services! I am interested in the "${pkg.title}" package (${pkg.duration}, starting ₹${pkg.startingPrice.toLocaleString('en-IN')}). Please provide detailed quotation and date availability.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1A1A1A]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-3xl border border-[#1A1A1A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header with Image Banner */}
        <div className="relative h-48 sm:h-60 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 border border-white/20 bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-[#FAF9F6]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 border border-white/40 bg-[#FAF9F6] text-[#1A1A1A]">
                {pkg.duration}
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 border border-white/20 bg-black/40 backdrop-blur-xs text-white flex items-center gap-1">
                <Star className="w-3 h-3 text-[#C4A484] fill-[#C4A484]" />
                {pkg.rating} ({pkg.reviewsCount} reviews)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif leading-tight">
              {pkg.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#FAF9F6]/80 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C4A484] shrink-0" />
              <span>{pkg.destination}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#1A1A1A]">
          {/* Price & Season Banner */}
          <div className="bg-white p-5 border border-[#1A1A1A]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 block font-bold">Starting From</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  ₹{pkg.startingPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#1A1A1A]/60">/ person (twin sharing)</span>
              </div>
            </div>
            <div className="text-xs text-[#1A1A1A]/80 bg-[#FAF9F6] px-3.5 py-2 border border-[#1A1A1A]/20">
              <strong className="text-[#1A1A1A] block font-serif">Best Time to Visit:</strong>
              <span>{pkg.bestTimeToVisit}</span>
            </div>
          </div>

          {/* Day-wise Itinerary */}
          <div>
            <h3 className="text-lg font-serif text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C4A484]" />
              <span>Day-by-Day Detailed Itinerary</span>
            </h3>
            <div className="space-y-3">
              {pkg.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="border border-[#1A1A1A]/30 p-4 bg-white hover:border-[#1A1A1A] transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-serif text-[#1A1A1A] uppercase tracking-wide">
                    <span className="w-6 h-6 border border-[#1A1A1A] bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center font-bold text-[10px]">
                      D{day.day}
                    </span>
                    <span className="font-bold">{day.title}</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-[#1A1A1A]/75 leading-relaxed pl-8">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#1A1A1A]/30 p-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C4A484]" />
                Package Inclusions
              </h4>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A]/80">
                {pkg.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#C4A484] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#1A1A1A]/30 p-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/70 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#1A1A1A]/50" />
                Package Exclusions
              </h4>
              <ul className="space-y-1.5 text-xs text-[#1A1A1A]/70">
                {pkg.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#1A1A1A]/40">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Local Vaishali Assurance Note */}
          <div className="text-xs text-[#1A1A1A]/75 bg-[#F2EFE9] p-3.5 border border-[#1A1A1A]/20 flex items-start gap-2">
            <span className="text-[#1A1A1A] font-serif font-bold shrink-0">Note:</span>
            <span>
              All itineraries can be customized for group size, preferred hotel category, and travel dates. 
              Doorstep pickup options available from Vaishali, Indirapuram, Vasundhara, and Noida.
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#1A1A1A]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 border border-[#1A1A1A]/30 text-[#1A1A1A] hover:bg-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest cursor-pointer"
          >
            Close Itinerary
          </button>
          
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
            <button
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest px-3 py-2.5 border border-[#1A1A1A] shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#C4A484]" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry('Tour Package', pkg.destination);
              }}
              className="flex-1 sm:flex-none px-3.5 py-2.5 border border-[#1A1A1A] hover:bg-[#FAF9F6] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest cursor-pointer"
            >
              Customize
            </button>
            {onBookPackage && (
              <button
                onClick={() => {
                  onClose();
                  onBookPackage(pkg);
                }}
                className="flex-1 sm:flex-none bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 border border-[#1A1A1A] shadow-xs transition-all cursor-pointer"
              >
                Book & Pay Online
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
