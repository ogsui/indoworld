import React from 'react';
import { Compass, MapPin, Phone, Mail, ShieldCheck, Clock, MessageCircle, Heart, Plane, Building2, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { IndoworldLogo } from './IndoworldLogo';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2545] text-[#FAF9F6]/80 text-xs border-t-2 border-[#002FA7]">
      {/* Top Banner */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-4">
              <IndoworldLogo variant="white" size="md" />

              <p className="text-xs text-[#FAF9F6]/80 leading-relaxed font-sans mt-2">
                Incorporated in 2008 in Vaishali, Ghaziabad. Providing genuine flights, verified hotel bookings, and tailored tour packages across India and international destinations.
              </p>

              <div className="flex items-center gap-2 text-[#FAF9F6] text-[11px] bg-white/5 p-3 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>GSTIN: <strong className="text-white font-mono">{BUSINESS_INFO.gstin}</strong></span>
              </div>
            </div>

            {/* Core Offerings */}
            <div>
              <h4 className="text-xs font-serif font-bold text-white mb-3 uppercase tracking-wider">
                Services & Packages
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => scrollTo('packages-section')} className="hover:text-[#DC2626] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                    <span>Domestic Packages (Himachal, Kashmir, Kerala)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('packages-section')} className="hover:text-[#DC2626] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                    <span>International Packages (Dubai, Bali, Thailand)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('contact-section')} className="hover:text-[#DC2626] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    <span>Domestic & International Flight Reservations</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('hotels-section')} className="hover:text-[#DC2626] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    <span>Verified Hotel & Resort Stays</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('custom-itinerary-section')} className="hover:text-[#DC2626] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Custom AI Itinerary Generator (Any Destination)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('calculator-section')} className="hover:text-[#DC2626] transition-colors cursor-pointer text-left">
                    <span>Live Trip Cost Estimator</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Local Coverage Areas */}
            <div>
              <h4 className="text-xs font-serif font-bold text-white mb-3 uppercase tracking-wider">
                Delhi NCR Service Areas
              </h4>
              <ul className="space-y-1.5 text-xs text-[#FAF9F6]/80 font-sans">
                <li>• Vaishali (Sector 1 to Sector 9)</li>
                <li>• Indirapuram (Ahinsa Khand, Nyay Khand)</li>
                <li>• Vasundhara (Sector 1 to Sector 19)</li>
                <li>• Kaushambi & Anand Vihar ISBT / Metro</li>
                <li>• Noida (Sector 62, 63, 18, Expressway)</li>
                <li>• East Delhi (Mayur Vihar, Laxmi Nagar)</li>
                <li>• IGI Airport Flight Coordination</li>
              </ul>
            </div>

            {/* Contact details */}
            <div>
              <h4 className="text-xs font-serif font-bold text-white mb-3 uppercase tracking-wider">
                Ansal Plaza Vaishali Office
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white hover:text-[#DC2626] font-semibold">
                    {BUSINESS_INFO.displayPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-white hover:text-[#DC2626]">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-white/70 shrink-0 mt-0.5" />
                  <span>Mon – Sat: 9:30 AM – 8:00 PM<br/>Sun: 10:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 bg-[#06182C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#FAF9F6]/60">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. GST Registered Entity in Ghaziabad, UP.
          </div>
          <div className="flex items-center gap-4">
            <span>Genuine Invoicing & Direct Supplier Rates</span>
            <span>•</span>
            <button onClick={() => scrollTo('contact-section')} className="hover:text-white underline">
              View Office on Google Maps
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
