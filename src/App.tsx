import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { CustomItineraryGenerator } from './components/CustomItineraryGenerator';
import { DestinationsSection } from './components/DestinationsSection';
import { TripCostCalculator } from './components/TripCostCalculator';
import { HotelBookingSection } from './components/HotelBookingSection';
import { AboutAndVerificationSection } from './components/AboutAndVerificationSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { ContactAndLocationSection } from './components/ContactAndLocationSection';
import { Footer } from './components/Footer';
import { ItineraryModal } from './components/ItineraryModal';
import { InquiryModal } from './components/InquiryModal';
import { BookingAndPaymentModal } from './components/BookingAndPaymentModal';
import { TravelChatBot } from './components/TravelChatBot';
import { TourPackage } from './types';
import { MessageCircle, Phone, Sparkles, Bot } from 'lucide-react';
import { BUSINESS_INFO, TOUR_PACKAGES } from './data/businessData';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal States
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<TourPackage | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string>('Tour Package');
  const [inquiryDestination, setInquiryDestination] = useState<string>('');
  const [inquiryCustomNote, setInquiryCustomNote] = useState<string>('');

  // Booking & Payment System States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingPkg, setSelectedBookingPkg] = useState<TourPackage | null>(null);

  // Gemini AI Chatbot States
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [chatBotPrompt, setChatBotPrompt] = useState<string | null>(null);

  const handleHeroSearch = (term: string, category: string) => {
    setSearchTerm(term);
    setCategoryFilter(category);
  };

  const handleOpenInquiry = (service?: string, destination?: string, note?: string) => {
    setInquiryService(service || 'Tour Package');
    setInquiryDestination(destination || '');
    setInquiryCustomNote(note || '');
    setInquiryModalOpen(true);
  };

  const handleOpenBooking = (pkg?: TourPackage) => {
    setSelectedBookingPkg(pkg || TOUR_PACKAGES[0] || null);
    setBookingModalOpen(true);
  };

  const handleSelectPackageForBooking = (pkgId: string) => {
    const found = TOUR_PACKAGES.find((p) => p.id === pkgId);
    if (found) {
      handleOpenBooking(found);
    } else {
      handleOpenBooking();
    }
  };

  const handleOpenChatWithPrompt = (prompt: string) => {
    setChatBotPrompt(prompt);
    setChatBotOpen(true);
  };

  const openWhatsAppFloating = () => {
    const text = encodeURIComponent(
      `Hello Indoworld Tourism Services (Vaishali)! I need quick travel assistance and package details.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0B2545] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        onOpenInquiry={handleOpenInquiry}
        onOpenBooking={() => handleOpenBooking()}
        onOpenChat={() => setChatBotOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Search & Filter */}
        <HeroSection
          onSearch={handleHeroSearch}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Custom Itinerary Generator for ANY Destination Worldwide */}
        <CustomItineraryGenerator
          onOpenInquiry={handleOpenInquiry}
          onOpenChatWithPrompt={handleOpenChatWithPrompt}
        />

        {/* Featured Holiday Packages */}
        <PackagesSection
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          onSelectCategory={(cat) => setCategoryFilter(cat)}
          onViewItinerary={(pkg) => setSelectedItineraryPkg(pkg)}
          onOpenInquiry={handleOpenInquiry}
          onBookPackage={handleOpenBooking}
        />

        {/* Dynamic Key Destinations Highlights */}
        <DestinationsSection
          availablePackages={TOUR_PACKAGES}
          onSelectPackageForBooking={handleSelectPackageForBooking}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Live Trip Cost Estimator */}
        <TripCostCalculator onOpenInquiry={handleOpenInquiry} />

        {/* Verified Hotel Booking Services */}
        <HotelBookingSection onOpenInquiry={handleOpenInquiry} />

        {/* About Indoworld Tourism in Sector 1, Vaishali */}
        <AboutAndVerificationSection onOpenInquiry={handleOpenInquiry} />

        {/* Editorial Blog & Destination Guides */}
        <BlogSection onOpenInquiry={handleOpenInquiry} />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact, Directions & Booking Form */}
        <ContactAndLocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons for Instant AI Concierge, WhatsApp & Online Booking */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* AI Travel Concierge Floating Launcher */}
        <button
          onClick={() => setChatBotOpen(true)}
          className="group flex items-center gap-2 bg-[#002FA7] hover:bg-[#0B2545] text-white border-2 border-white px-4 py-2.5 shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer relative"
          title="Chat with Indoworld AI Travel Specialist"
          aria-label="Open AI Travel Concierge"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626]"></span>
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-[10px] uppercase font-extrabold tracking-widest">
            AI Concierge
          </span>
        </button>

        {/* Online Booking Button */}
        <button
          onClick={() => handleOpenBooking()}
          className="group flex items-center gap-2 bg-[#FAF9F6] hover:bg-[#0B2545] text-[#0B2545] hover:text-[#FAF9F6] border border-[#0B2545] px-3.5 py-2 shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
          title="Instant Online Booking & Payment"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
          <span className="text-[10px] uppercase font-bold tracking-widest">
            Book Online
          </span>
        </button>

        {/* Direct Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="w-11 h-11 bg-[#0B2545] hover:bg-[#002FA7] text-white border border-[#0B2545] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
          title="Call Indoworld Office"
          aria-label="Call Indoworld Tourism Office"
        >
          <Phone className="w-4 h-4 text-[#DC2626] hover:text-white" />
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={openWhatsAppFloating}
          className="group flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white border border-[#22C55E] px-4 py-2.5 shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
          title="Chat on WhatsApp"
          aria-label="Chat with Indoworld Tourism on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline group-hover:inline">
            WhatsApp Desk
          </span>
        </button>
      </div>

      {/* Day-by-Day Itinerary Detail Modal */}
      <ItineraryModal
        pkg={selectedItineraryPkg}
        onClose={() => setSelectedItineraryPkg(null)}
        onOpenInquiry={handleOpenInquiry}
        onBookPackage={handleOpenBooking}
      />

      {/* Fast Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={inquiryService}
        initialDestination={inquiryDestination}
        customNote={inquiryCustomNote}
      />

      {/* Secure Online Booking & Instant Payment Simulation Modal */}
      <BookingAndPaymentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedPackage={selectedBookingPkg}
        allPackages={TOUR_PACKAGES}
      />

      {/* Multi-Turn Gemini Chatbot Modal / Drawer */}
      <TravelChatBot
        isOpen={chatBotOpen}
        onClose={() => setChatBotOpen(false)}
        onOpenInquiry={handleOpenInquiry}
        initialPrompt={chatBotPrompt}
        onClearInitialPrompt={() => setChatBotPrompt(null)}
      />
    </div>
  );
}
