import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Compass, ShieldCheck, Menu, X, Clock, Plane, Building2, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { IndoworldLogo } from './IndoworldLogo';

interface HeaderProps {
  onOpenInquiry: (initialService?: string, initialDestination?: string) => void;
  onOpenBooking?: () => void;
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, onOpenBooking, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Indoworld Tourism Services (Vaishali)! I am looking to plan a trip. Please share details and packages.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#0B2545]/20 shadow-xs">
      {/* Top Announcement Bar for Address, Real Data & Trust Credentials */}
      <div className="bg-[#0B2545] text-[#FAF9F6] text-xs py-2 px-4 border-b border-[#0B2545]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-[#FAF9F6]/95">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
              <span>Ansal Plaza, Sector 1, Vaishali, Ghaziabad</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#FAF9F6]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
              <span>GSTIN: <strong className="text-white font-mono">{BUSINESS_INFO.gstin}</strong></span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-2 text-[#FAF9F6]/80">
              <span className="bg-[#DC2626] text-white text-[9px] uppercase font-extrabold px-1.5 py-0.2">Official</span>
              <span>Flights • Verified Hotels • Tailor-Made Holiday Packages</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              id="top-bar-phone-link"
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1 text-[#FAF9F6] hover:text-[#DC2626] transition-colors font-semibold tracking-wide"
            >
              <Phone className="w-3 h-3 text-[#DC2626]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-[#FAF9F6]/30 hidden sm:inline">|</span>
            <button
              id="top-bar-whatsapp-btn"
              onClick={openWhatsApp}
              className="flex items-center gap-1.5 text-white hover:text-[#DC2626] transition-colors uppercase tracking-widest text-[10px] font-bold cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>WhatsApp Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Authentic Brand Logo & Name */}
          <div
            id="brand-logo-container"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <IndoworldLogo size="md" variant="color" />
            <div className="hidden sm:flex flex-col border-l border-[#0B2545]/20 pl-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#0B2545]">
                Vaishali • Ghaziabad
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-500">
                Since 2008 • Ansal Plaza
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] uppercase tracking-[0.18em] font-bold text-[#0B2545]">
            <button
              id="nav-packages"
              onClick={() => handleNavClick('packages-section')}
              className="hover:text-[#DC2626] transition-colors cursor-pointer py-1"
            >
              Packages
            </button>
            <button
              id="nav-destinations"
              onClick={() => handleNavClick('destinations-section')}
              className="hover:text-[#DC2626] transition-colors cursor-pointer py-1"
            >
              Destinations
            </button>
            <button
              id="nav-hotels"
              onClick={() => handleNavClick('hotels-section')}
              className="hover:text-[#DC2626] transition-colors cursor-pointer py-1"
            >
              Hotels
            </button>
            <button
              id="nav-calculator"
              onClick={() => handleNavClick('calculator-section')}
              className="hover:text-[#DC2626] transition-colors cursor-pointer py-1"
            >
              Cost Estimator
            </button>
            <button
              id="nav-blog"
              onClick={() => handleNavClick('blog-section')}
              className="hover:text-[#DC2626] transition-colors cursor-pointer py-1"
            >
              Guides
            </button>
            <button
              id="nav-custom-itinerary"
              onClick={() => handleNavClick('custom-itinerary-section')}
              className="text-[#DC2626] hover:text-[#002FA7] transition-colors cursor-pointer py-1 flex items-center gap-1 font-extrabold"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Custom Itinerary</span>
            </button>
            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact-section')}
              className="hover:text-[#DC2626] transition-colors cursor-pointer py-1 text-[#002FA7]"
            >
              Office & Map
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenBooking && (
              <button
                id="header-book-button"
                onClick={onOpenBooking}
                className="border border-[#002FA7] bg-white hover:bg-[#002FA7] hover:text-white text-[#002FA7] text-[10px] uppercase font-bold tracking-widest px-3.5 py-2.5 transition-all duration-200 cursor-pointer shadow-xs"
              >
                Book & Pay
              </button>
            )}
            <button
              id="header-quote-button"
              onClick={() => onOpenInquiry('Tour Package')}
              className="border border-[#0B2545] bg-[#0B2545] text-white hover:bg-[#DC2626] hover:border-[#DC2626] text-[10px] uppercase font-bold tracking-widest px-4 py-2.5 transition-all duration-200 cursor-pointer shadow-xs"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="mobile-inquiry-trigger"
              onClick={() => onOpenInquiry('Tour Package')}
              className="sm:hidden border border-[#0B2545] bg-[#0B2545] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5"
            >
              Quote
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B2545] hover:bg-[#002FA7]/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#DC2626]" /> : <Menu className="w-6 h-6 text-[#0B2545]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#0B2545]/30 px-5 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0B2545]">
            <button
              onClick={() => handleNavClick('packages-section')}
              className="text-left py-2 hover:text-[#DC2626] transition-colors border-b border-[#0B2545]/10"
            >
              Tour Packages (India & Global)
            </button>
            <button
              onClick={() => handleNavClick('destinations-section')}
              className="text-left py-2 hover:text-[#DC2626] transition-colors border-b border-[#0B2545]/10"
            >
              Key Destinations
            </button>
            <button
              onClick={() => handleNavClick('hotels-section')}
              className="text-left py-2 hover:text-[#DC2626] transition-colors border-b border-[#0B2545]/10"
            >
              Verified Hotel Bookings
            </button>
            <button
              onClick={() => handleNavClick('calculator-section')}
              className="text-left py-2 hover:text-[#DC2626] transition-colors border-b border-[#0B2545]/10"
            >
              Trip Cost Estimator
            </button>
            <button
              onClick={() => handleNavClick('blog-section')}
              className="text-left py-2 hover:text-[#DC2626] transition-colors border-b border-[#0B2545]/10"
            >
              Travel Guides & Intel
            </button>
            <button
              onClick={() => handleNavClick('custom-itinerary-section')}
              className="text-left py-2 text-[#DC2626] font-extrabold hover:text-[#002FA7] transition-colors border-b border-[#0B2545]/10 flex items-center justify-between"
            >
              <span>Custom Itinerary (Any Destination)</span>
              <span className="bg-[#DC2626] text-white text-[8px] px-1.5 py-0.5 uppercase">AI</span>
            </button>
            <button
              onClick={() => handleNavClick('contact-section')}
              className="text-left py-2 hover:text-[#DC2626] transition-colors text-[#002FA7]"
            >
              Office Location & Google Map
            </button>
          </div>

          <div className="pt-3 border-t border-[#0B2545]/20 flex flex-col gap-2.5">
            {onOpenBooking && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#002FA7] text-white hover:bg-[#0B2545] py-3 text-[10px] uppercase font-bold tracking-widest text-center transition-colors border border-[#002FA7]"
              >
                Book & Pay Online
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry('Tour Package');
              }}
              className="w-full bg-white text-[#0B2545] hover:bg-[#FAF9F6] py-3 text-[10px] uppercase font-bold tracking-widest text-center transition-colors border border-[#0B2545]/30"
            >
              Get a Free Quote
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 border border-[#0B2545] py-2.5 text-[#0B2545] text-[10px] uppercase font-bold tracking-widest hover:bg-[#0B2545] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Call Vaishali Desk: {BUSINESS_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
