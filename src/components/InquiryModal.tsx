import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { InquiryFormData } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDestination?: string;
  customNote?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Tour Package',
  initialDestination = '',
  customNote = '',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    destination: initialDestination,
    travelDate: '',
    travelers: 2,
    packageTier: 'Deluxe',
    serviceType: initialService as any,
    message: customNote,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      destination: initialDestination || prev.destination,
      serviceType: (initialService as any) || prev.serviceType,
      message: customNote || prev.message,
    }));
    setSubmitted(false);
  }, [initialService, initialDestination, customNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `*Trip Inquiry - Indoworld Tourism (Vaishali)*\n` +
      `• Name: ${formData.name || 'Traveler'}\n` +
      `• Phone: ${formData.phone || 'N/A'}\n` +
      `• Service: ${formData.serviceType}\n` +
      `• Destination: ${formData.destination || 'Flexible'}\n` +
      `• Date: ${formData.travelDate || 'Flexible'}\n` +
      `• Travelers: ${formData.travelers} Pax\n` +
      `• Preference: ${formData.packageTier}\n` +
      `• Note: ${formData.message || 'Please send customized package details.'}`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1A1A1A]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-lg border border-[#1A1A1A] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1A1A1A] text-[#FAF9F6] p-5 sm:p-6 flex items-center justify-between border-b border-[#1A1A1A]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4A484]">
              Indoworld Tourism Services
            </div>
            <h3 className="text-lg sm:text-xl font-serif mt-1">
              Plan Your Journey with Vaishali Desk
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 border border-[#1A1A1A] bg-white text-[#1A1A1A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#C4A484]" />
              </div>
              <h4 className="text-xl font-serif text-[#1A1A1A]">
                Inquiry Successfully Logged!
              </h4>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/80">
                Our team at Sector 1, Vaishali has received your request. We will contact you at <strong>{formData.phone}</strong> shortly.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest py-3 flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#1A1A1A] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward Details to WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-white py-2.5 border border-[#1A1A1A]/30 mt-1 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Amit Kumar"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9811X XXXXX"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Kashmir, Dubai..."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Travel Service
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="Tour Package">Tour Package</option>
                    <option value="Hotel Booking">Hotel Booking</option>
                    <option value="Flight Ticket">Flight Ticket</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Custom Itinerary">Custom AI Itinerary</option>
                    <option value="Spiritual Yatra">Spiritual Yatra</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                  Specific Requests or Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Special preferences, pickup location in Vaishali/NCR, or questions..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest py-3 border border-[#1A1A1A] shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Submitting...' : 'Send Inquiry to Travel Desk'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest py-2.5 border border-[#1A1A1A] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>Direct WhatsApp Connect</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
