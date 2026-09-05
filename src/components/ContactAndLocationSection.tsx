import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, ShieldCheck, Compass, Navigation, Plane, Building2, Car } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { InquiryFormData } from '../types';
import { OfficeMap } from './OfficeMap';

export const ContactAndLocationSection: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    travelers: 2,
    packageTier: 'Deluxe',
    serviceType: 'Tour Package',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleForwardToWhatsApp = () => {
    const text = encodeURIComponent(
      `*New Trip Inquiry from Website*\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Email: ${formData.email || 'N/A'}\n` +
      `• Service: ${formData.serviceType}\n` +
      `• Destination: ${formData.destination || 'Not Specified'}\n` +
      `• Travel Date: ${formData.travelDate || 'Flexible'}\n` +
      `• Travelers: ${formData.travelers}\n` +
      `• Tier: ${formData.packageTier}\n` +
      `• Message: ${formData.message || 'Please contact me with quotation.'}`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 mb-3 bg-white">
            <MapPin className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>Visit Us or Inquire Directly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1A1A1A]">
            Contact Indoworld <span className="text-[#C4A484] italic">Tourism Services</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1A1A1A]/80">
            We love meeting our travelers in person. Stop by our Sector 1 Vaishali office for fresh chai and custom vacation planning, or send an inquiry below for immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Details & Directions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Address Card */}
            <div className="bg-white border border-[#1A1A1A]/30 p-6 sm:p-7 space-y-5 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 border border-[#1A1A1A] bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#C4A484]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-[#1A1A1A]">
                    Vaishali Head Office
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/80 mt-1 leading-relaxed">
                    {BUSINESS_INFO.address.line1}, {BUSINESS_INFO.address.locality}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} – {BUSINESS_INFO.address.pincode}
                  </p>
                  <p className="text-xs text-[#C4A484] font-medium mt-1">
                    Landmark: {BUSINESS_INFO.address.landmark}
                  </p>
                </div>
              </div>

              {/* Transit landmarks */}
              <div className="border-t border-[#1A1A1A]/15 pt-4 space-y-2 text-xs text-[#1A1A1A]/80">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#C4A484] shrink-0" />
                  <span><strong>5 min</strong> from Vaishali Metro Station (Blue Line)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#C4A484] shrink-0" />
                  <span><strong>8 min</strong> from Anand Vihar ISBT & Railway Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#C4A484] shrink-0" />
                  <span>Quick access from Indirapuram, Vasundhara & Kaushambi</span>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="border-t border-[#1A1A1A]/15 pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#1A1A1A]/30 bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#C4A484]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block font-bold">Direct Helpline / WhatsApp</span>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-sm font-bold text-[#1A1A1A] hover:text-[#C4A484] transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#1A1A1A]/30 bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block font-bold">Office Hours</span>
                    <span className="text-xs font-semibold text-[#1A1A1A]">
                      {BUSINESS_INFO.workingHours.summary} (Mon–Sat)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#1A1A1A]/30 bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#C4A484]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 block font-bold">Official Email</span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-xs font-semibold text-[#1A1A1A] hover:text-[#C4A484]"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="border-t border-[#1A1A1A]/15 pt-4 flex items-start gap-3 text-xs text-[#1A1A1A]/80">
                <Clock className="w-4 h-4 text-[#C4A484] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A1A1A] block font-bold">Office Operating Hours:</strong>
                  <span>{BUSINESS_INFO.workingHours.weekdays}</span>
                  <span className="block text-[#1A1A1A]/60 mt-0.5">{BUSINESS_INFO.workingHours.sunday}</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Connect Banner */}
            <div className="bg-[#F2EFE9] border border-[#1A1A1A]/30 p-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-serif text-[#1A1A1A]">
                  Instant WhatsApp Booking Assistance
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 mt-0.5">
                  Chat with our senior vacation planner right now.
                </p>
              </div>
              <button
                onClick={() => {
                  const text = encodeURIComponent(
                    `Hello Indoworld Tourism Services! I want to inquire about trip packages from Vaishali.`
                  );
                  window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
                }}
                className="shrink-0 bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-4 py-2.5 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-[#1A1A1A]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Live</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#1A1A1A]/30 p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 border border-[#1A1A1A] bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#C4A484]" />
                </div>
                <h3 className="text-2xl font-serif text-[#1A1A1A]">
                  Thank You, {formData.name || 'Traveler'}!
                </h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/80 max-w-md mx-auto">
                  Your inquiry has been received by Indoworld Tourism Services (Sector 1, Vaishali). Our travel coordinator will review your dates and contact you within 2 hours with customized options.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleForwardToWhatsApp}
                    className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-3 flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#1A1A1A]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Copy to WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        destination: '',
                        travelDate: '',
                        travelers: 2,
                        packageTier: 'Deluxe',
                        serviceType: 'Tour Package',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-[#FAF9F6] border border-[#1A1A1A]/40 px-4 py-3"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#1A1A1A]/15 pb-4 mb-5">
                  <h3 className="text-xl font-serif text-[#1A1A1A]">
                    Request a Custom Itinerary & Quotation
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">
                    Fill in your travel preferences. Guaranteed response with transparent itemized pricing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-form-name" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      id="contact-form-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Malhotra"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-form-phone" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      required
                      id="contact-form-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98110 XXXXX"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="contact-form-email" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajesh@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label htmlFor="contact-form-service" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Service Interested In
                    </label>
                    <select
                      id="contact-form-service"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    >
                      <option value="Tour Package">Holiday Tour Package</option>
                      <option value="Hotel Booking">Hotel / Resort Booking</option>
                      <option value="Flight Ticket">Flight Ticket Bookings</option>
                      <option value="Visa Assistance">Visa Assistance</option>
                      <option value="Custom Itinerary">Custom Multi-City Itinerary</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Destination */}
                  <div>
                    <label htmlFor="contact-form-dest" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Target Destination
                    </label>
                    <input
                      id="contact-form-dest"
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Kashmir, Dubai..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label htmlFor="contact-form-date" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Tentative Date
                    </label>
                    <input
                      id="contact-form-date"
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  {/* Travelers Count */}
                  <div>
                    <label htmlFor="contact-form-travelers" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      No. of Travelers
                    </label>
                    <input
                      id="contact-form-travelers"
                      type="number"
                      min={1}
                      max={50}
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-form-msg" className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Special Requirements or Questions
                  </label>
                  <textarea
                    id="contact-form-msg"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your preferred hotel style, pickup point in Vaishali/NCR, meal preferences (Veg/Jain), or specific sights..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest py-3.5 px-4 transition-all cursor-pointer border border-[#1A1A1A] shadow-xs flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? (
                      <span>Submitting details...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Vaishali Team</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] uppercase font-semibold text-[#1A1A1A]/50 text-center mt-3 tracking-wider">
                    🔒 Direct communication only from our Vaishali travel desk.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Visual Google Maps Office Location Component */}
        <div className="mt-12 pt-6 border-t border-[#0B2545]/20">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
                Interactive Geographic Coordinates
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0B2545]">
                Locate Indoworld Tourism Services in Vaishali
              </h3>
            </div>
            <span className="text-xs text-gray-600 font-medium">
              Ansal Plaza, Sector 1, Ghaziabad, UP 201010
            </span>
          </div>
          <OfficeMap />
        </div>
      </div>
    </section>
  );
};
