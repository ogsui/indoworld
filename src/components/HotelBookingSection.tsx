import React, { useState } from 'react';
import { Hotel, Star, MapPin, Check, ShieldCheck, PhoneCall, ArrowUpRight } from 'lucide-react';
import { HOTEL_SERVICES, BUSINESS_INFO } from '../data/businessData';

interface HotelBookingSectionProps {
  onOpenInquiry: (initialService?: string, initialDestination?: string) => void;
}

export const HotelBookingSection: React.FC<HotelBookingSectionProps> = ({ onOpenInquiry }) => {
  const [selectedCity, setSelectedCity] = useState('All');

  const cities = ['All', 'Srinagar', 'Manali', 'Goa', 'Dubai', 'Jaipur', 'Munnar'];

  const filteredHotels = selectedCity === 'All'
    ? HOTEL_SERVICES
    : HOTEL_SERVICES.filter((h) => h.city.toLowerCase().includes(selectedCity.toLowerCase()));

  return (
    <section id="hotels-section" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 mb-3 bg-white">
            <Hotel className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>Verified Hotel Reservation Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1A1A1A]">
            Curated Resorts & <span className="text-[#C4A484] italic">Star Stays</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1A1A1A]/80">
            As a registered hotel booking specialist in Ghaziabad, Indoworld Tourism partners with over 4,500+ luxury resorts, heritage havelis, and boutique stays worldwide. Enjoy negotiated B2B corporate tariffs, early check-in assistance, and guaranteed confirmed vouchers.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all duration-150 cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] border border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              id={`hotel-card-${hotel.id}`}
              className="group bg-white border border-[#1A1A1A]/30 hover:border-[#1A1A1A] shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#1A1A1A]/90 text-[#C4A484] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 flex items-center gap-1 shadow-xs">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C4A484]" />
                    ))}
                    <span className="text-white ml-0.5">{hotel.starRating}-Star</span>
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-[#C4A484] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-xs">
                    {hotel.tag}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A]/60 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C4A484] shrink-0" />
                    <span>{hotel.city}, {hotel.country}</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#1A1A1A] group-hover:text-[#C4A484] transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">
                    {hotel.proximity}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {hotel.amenities.map((am, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A]/80 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5"
                      >
                        {am}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1A1A1A]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 block">
                      Contracted Tariff
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-serif italic font-bold text-[#1A1A1A]">
                        ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 font-semibold">/ night</span>
                    </div>
                  </div>

                  <button
                    id={`check-rates-btn-${hotel.id}`}
                    onClick={() => onOpenInquiry('Hotel Booking', `${hotel.name} (${hotel.city})`)}
                    className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-4 py-2 transition-all flex items-center gap-1 cursor-pointer border border-[#1A1A1A]"
                  >
                    <span>Check Rates</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Hotel Request Banner */}
        <div className="mt-10 bg-[#F2EFE9] border border-[#1A1A1A]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-xl font-serif text-[#1A1A1A]">
              Need a hotel anywhere in India or abroad?
            </h4>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/80 mt-1">
              Have a specific property or budget in mind? Send us your destination, dates, and requirements. We will secure the best corporate rates through our wholesale hotel network.
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry('Hotel Booking')}
            className="shrink-0 bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-3 transition-all cursor-pointer border border-[#1A1A1A]"
          >
            Request Custom Hotel Quote
          </button>
        </div>
      </div>
    </section>
  );
};
