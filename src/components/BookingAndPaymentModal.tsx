import React, { useState, useEffect } from 'react';
import { TourPackage, BookingRecord, BookingPassenger } from '../types';
import { BUSINESS_INFO } from '../data/businessData';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  CheckCircle2,
  Calendar,
  Users,
  Plus,
  Trash2,
  Download,
  MessageCircle,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface BookingAndPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: TourPackage | null;
  allPackages: TourPackage[];
  onBookingSuccess?: (record: BookingRecord) => void;
}

export const BookingAndPaymentModal: React.FC<BookingAndPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  allPackages,
  onBookingSuccess,
}) => {
  if (!isOpen) return null;

  // Selected package state
  const [currentPackage, setCurrentPackage] = useState<TourPackage>(
    selectedPackage || allPackages[0]
  );

  // Form step: 1: Details & Passengers, 2: Payment, 3: Confirmation
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Booking fields
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });

  const [passengers, setPassengers] = useState<BookingPassenger[]>([
    { fullName: '', age: 30, gender: 'male' },
  ]);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('Vaishali, Ghaziabad');
  const [specialRequests, setSpecialRequests] = useState('');
  const [includeInsurance, setIncludeInsurance] = useState(true);

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Payment method & choices
  const [paymentOption, setPaymentOption] = useState<'advance' | 'full'>('advance');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing state
  const [processing, setProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    if (selectedPackage) {
      setCurrentPackage(selectedPackage);
    }
  }, [selectedPackage]);

  // Calculations
  const passengerCount = Math.max(1, passengers.length);
  const baseRate = currentPackage.startingPrice;
  const subtotal = baseRate * passengerCount;
  const insuranceTotal = includeInsurance ? 249 * passengerCount : 0;
  const gst = Math.round((subtotal + insuranceTotal) * 0.05);
  const rawTotal = subtotal + insuranceTotal + gst;
  const grandTotal = Math.max(0, rawTotal - couponDiscount);
  const advanceAmount = Math.round(grandTotal * 0.3); // 30% advance token
  const payableAmount = paymentOption === 'advance' ? advanceAmount : grandTotal;
  const balanceRemaining = grandTotal - payableAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'VAISHALI10') {
      const disc = Math.round(subtotal * 0.1);
      setCouponDiscount(disc);
      setCouponMessage('VAISHALI10 applied: 10% Local Resident Discount!');
    } else if (code === 'INDONCR') {
      setCouponDiscount(1500);
      setCouponMessage('INDONCR applied: ₹1,500 Special Savings!');
    } else {
      setCouponDiscount(0);
      setCouponMessage('Invalid coupon code. Try VAISHALI10 or INDONCR');
    }
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { fullName: '', age: 28, gender: 'female' }]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const handlePassengerChange = (index: number, field: keyof BookingPassenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const validateDetailsStep = () => {
    if (!contactName.trim()) {
      alert('Please enter primary contact name.');
      return false;
    }
    if (!contactPhone.trim() || contactPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile/WhatsApp number.');
      return false;
    }
    if (!contactEmail.trim() || !contactEmail.includes('@')) {
      alert('Please enter a valid email address for confirmation delivery.');
      return false;
    }
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].fullName.trim()) {
        alert(`Please enter passenger ${i + 1} full name.`);
        return false;
      }
    }
    return true;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetailsStep()) {
      setStep('payment');
    }
  };

  const handleProcessPayment = () => {
    setProcessing(true);

    // Simulate secure 256-bit payment gateway verification
    setTimeout(() => {
      const orderId = `IWT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const txnRef = `TXN-${Date.now().toString().slice(-8)}`;

      const record: BookingRecord = {
        id: orderId,
        packageId: currentPackage.id,
        packageTitle: currentPackage.title,
        destination: currentPackage.destination,
        travelDate,
        passengers,
        contactName,
        contactEmail,
        contactPhone,
        pickupAddress,
        specialRequests,
        baseAmount: subtotal,
        gstAmount: gst,
        totalAmount: grandTotal,
        advancePaid: payableAmount,
        paymentMethod,
        paymentStatus: 'completed',
        transactionRef: txnRef,
        bookingDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        emailSentTo: contactEmail,
      };

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('indoworld_bookings') || '[]');
        localStorage.setItem('indoworld_bookings', JSON.stringify([record, ...existing]));
      } catch (err) {
        console.error('Failed to save to local storage', err);
      }

      setConfirmedBooking(record);
      setProcessing(false);
      setStep('confirmed');

      if (onBookingSuccess) {
        onBookingSuccess(record);
      }
    }, 1400);
  };

  const handleDownloadReceipt = () => {
    if (!confirmedBooking) return;
    const receiptText = `
============================================================
           INDOWORLD TOURISM SERVICES
      Ansal Plaza, UG SR-5B, Vaishali, Ghaziabad (UP)
      GSTIN: ${BUSINESS_INFO.gstin} | Ph: ${BUSINESS_INFO.phone}
============================================================
OFFICIAL TOUR BOOKING CONFIRMATION & TAX INVOICE
Booking Reference : ${confirmedBooking.id}
Transaction Ref   : ${confirmedBooking.transactionRef}
Booking Date      : ${confirmedBooking.bookingDate}
Status            : CONFIRMED (Payment Verified)
------------------------------------------------------------
TOUR DETAILS:
Package           : ${confirmedBooking.packageTitle}
Destination       : ${confirmedBooking.destination}
Departure Date    : ${confirmedBooking.travelDate}
Pickup Point      : ${confirmedBooking.pickupAddress || 'Vaishali / NCR Office'}
------------------------------------------------------------
PASSENGERS (${confirmedBooking.passengers.length}):
${confirmedBooking.passengers
  .map((p, idx) => `  ${idx + 1}. ${p.fullName} (Age: ${p.age}, Gender: ${p.gender})`)
  .join('\n')}
------------------------------------------------------------
CONTACT INFORMATION:
Lead Guest        : ${confirmedBooking.contactName}
Mobile/WhatsApp   : ${confirmedBooking.contactPhone}
Voucher Delivery  : ${confirmedBooking.emailSentTo}
Special Notes     : ${confirmedBooking.specialRequests || 'None'}
------------------------------------------------------------
PAYMENT BREAKDOWN:
Base Tour Cost    : INR ${confirmedBooking.baseAmount.toLocaleString('en-IN')}
GST (5% SAC 998555): INR ${confirmedBooking.gstAmount.toLocaleString('en-IN')}
Total Tour Cost   : INR ${confirmedBooking.totalAmount.toLocaleString('en-IN')}
Amount Paid Now   : INR ${confirmedBooking.advancePaid.toLocaleString('en-IN')}
Balance Due       : INR ${(confirmedBooking.totalAmount - confirmedBooking.advancePaid).toLocaleString('en-IN')}
Payment Channel   : ${confirmedBooking.paymentMethod.toUpperCase()} (Secure Tokenized)
------------------------------------------------------------
CONFIRMATION DISPATCH:
* Stamped PDF Vouchers & Hotel Confirmations emailed to:
  ${confirmedBooking.emailSentTo}
* 24x7 Vaishali Travel Desk Help: ${BUSINESS_INFO.phone}
============================================================
Thank you for choosing Indoworld Tourism Services (Est. 2008)
    `;

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Indoworld_Booking_${confirmedBooking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShareToWhatsApp = () => {
    if (!confirmedBooking) return;
    const msg = encodeURIComponent(
      `*New Online Tour Booking Confirmation*\n` +
        `Booking ID: ${confirmedBooking.id}\n` +
        `Package: ${confirmedBooking.packageTitle}\n` +
        `Lead Traveler: ${confirmedBooking.contactName} (${confirmedBooking.contactPhone})\n` +
        `Travel Date: ${confirmedBooking.travelDate}\n` +
        `Travelers: ${confirmedBooking.passengers.length}\n` +
        `Paid: ₹${confirmedBooking.advancePaid.toLocaleString('en-IN')} via ${confirmedBooking.paymentMethod.toUpperCase()}\n` +
        `Voucher sent to: ${confirmedBooking.emailSentTo}\n\n` +
        `Please confirm our hotel vouchers and driver details from Vaishali office.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1A1A1A]/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-3xl border border-[#1A1A1A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#1A1A1A] text-[#FAF9F6] p-5 sm:p-6 flex items-center justify-between border-b border-[#1A1A1A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4A484]">
                Indoworld Tourism Services
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#FAF9F6]/10 text-[#FAF9F6]/70 border border-[#FAF9F6]/15">
                256-Bit SSL Secure
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif mt-0.5">
              {step === 'details' && 'Step 1: Tour Dates & Passenger Details'}
              {step === 'payment' && 'Step 2: Instant Secure Payment'}
              {step === 'confirmed' && 'Booking Confirmed & Email Dispatched!'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1A1A1A]">
          {/* STEP 1: DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Package Selector */}
              <div className="bg-white p-4 border border-[#1A1A1A]/20">
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1.5">
                  Selected Tour Package
                </label>
                <select
                  value={currentPackage.id}
                  onChange={(e) => {
                    const found = allPackages.find((p) => p.id === e.target.value);
                    if (found) setCurrentPackage(found);
                  }}
                  className="w-full text-xs sm:text-sm font-serif font-bold p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                >
                  {allPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} — ₹{pkg.startingPrice.toLocaleString('en-IN')}/person ({pkg.duration})
                    </option>
                  ))}
                </select>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1A1A1A]/70 font-sans pt-2 border-t border-[#1A1A1A]/10">
                  <span>Destination: <strong>{currentPackage.destination}</strong></span>
                  <span>Duration: <strong>{currentPackage.duration}</strong></span>
                  <span>
                    Starting Rate: <strong className="text-[#1A1A1A]">₹{currentPackage.startingPrice.toLocaleString('en-IN')}</strong> / traveler
                  </span>
                </div>
              </div>

              {/* Date & Pickup Point */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C4A484]" />
                    <span>Departure Date *</span>
                  </label>
                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Pickup Location (Vaishali / Delhi NCR) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="e.g. Sector 1 Vaishali / Indirapuram / Noida"
                    className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Passenger List Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C4A484]" />
                    <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Passenger Details ({passengers.length} Traveler{passengers.length > 1 ? 's' : ''})
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPassenger}
                    className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:text-[#C4A484] flex items-center gap-1 bg-white border border-[#1A1A1A]/20 px-2.5 py-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Traveler</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {passengers.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 border border-[#1A1A1A]/20 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                    >
                      <div className="sm:col-span-1 text-[10px] font-bold text-[#1A1A1A]/50">
                        #{idx + 1}
                      </div>

                      <div className="sm:col-span-5">
                        <label className="block text-[9px] uppercase font-bold tracking-wider text-[#1A1A1A]/60 mb-0.5">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={p.fullName}
                          onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                          placeholder="As on Aadhaar / Passport"
                          className="w-full text-xs p-1.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[9px] uppercase font-bold tracking-wider text-[#1A1A1A]/60 mb-0.5">
                          Age
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={110}
                          value={p.age}
                          onChange={(e) => handlePassengerChange(idx, 'age', Number(e.target.value))}
                          className="w-full text-xs p-1.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase font-bold tracking-wider text-[#1A1A1A]/60 mb-0.5">
                          Gender
                        </label>
                        <select
                          value={p.gender}
                          onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                          className="w-full text-xs p-1.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        {passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePassenger(idx)}
                            className="text-[#1A1A1A]/40 hover:text-rose-600 p-1 cursor-pointer"
                            title="Remove passenger"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Contact & Confirmation Email */}
              <div className="bg-white p-4 border border-[#1A1A1A]/20 space-y-3">
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Primary Contact (Voucher & Invoice Recipient)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Contact Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Email Address (For Vouchers) *
                    </label>
                    <input
                      required
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="youremail@gmail.com"
                      className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 9811X XXXXX"
                      className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Special Requests / Dietary Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Pure vegetarian/Jain food, ground floor room for senior citizens, infant baby seat, etc."
                    className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-[#F2EFE9] p-5 border border-[#1A1A1A]/25 space-y-2.5">
                <div className="flex justify-between text-xs font-sans">
                  <span>Base Fare ({passengerCount} Traveler{passengerCount > 1 ? 's' : ''} × ₹{baseRate.toLocaleString('en-IN')})</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-sans">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="accent-[#1A1A1A]"
                    />
                    <span>Travel Assistance & Medical Insurance (₹249/person)</span>
                  </label>
                  <span className="font-bold">₹{insuranceTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-xs font-sans text-[#1A1A1A]/80">
                  <span>Govt. GST (5% SAC 998555 - Travel Agency)</span>
                  <span className="font-bold">₹{gst.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-xs font-sans text-emerald-700 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-[#1A1A1A]/15 flex items-center gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo Code (VAISHALI10 / INDONCR)"
                    className="text-xs p-1.5 bg-white border border-[#1A1A1A]/30 uppercase tracking-wider flex-1 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="text-[10px] uppercase font-bold tracking-widest px-3 py-2 bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#C4A484] hover:text-[#1A1A1A] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] text-[#1A1A1A]/80 font-sans italic">{couponMessage}</p>
                )}

                <div className="pt-3 border-t border-[#1A1A1A]/20 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/60 block">
                      Total Tour Package Amount
                    </span>
                    <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A484] block">
                      Advance Token (30%)
                    </span>
                    <span className="text-lg font-serif font-bold text-[#1A1A1A]">
                      ₹{advanceAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit to Step 2 */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-[#1A1A1A]/30 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-6 py-3 border border-[#1A1A1A] shadow-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT GATEWAY */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Payment Summary Header */}
              <div className="bg-white p-4 border border-[#1A1A1A]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 font-bold block">
                    Paying For: {currentPackage.title}
                  </span>
                  <span className="text-xs text-[#1A1A1A]/80">
                    {passengers.length} Passenger(s) • Departure {travelDate}
                  </span>
                </div>

                {/* Choice of Advance Token vs Full Amount */}
                <div className="flex items-center gap-2 bg-[#FAF9F6] p-1 border border-[#1A1A1A]/20">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('advance')}
                    className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      paymentOption === 'advance'
                        ? 'bg-[#1A1A1A] text-[#FAF9F6]'
                        : 'text-[#1A1A1A] hover:bg-white'
                    }`}
                  >
                    Pay 30% Token (₹{advanceAmount.toLocaleString('en-IN')})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      paymentOption === 'full'
                        ? 'bg-[#1A1A1A] text-[#FAF9F6]'
                        : 'text-[#1A1A1A] hover:bg-white'
                    }`}
                  >
                    Pay Full (₹{grandTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </div>

              {/* Amount to pay */}
              <div className="bg-[#FAF9F6] p-4 border border-[#1A1A1A] flex items-center justify-between">
                <span className="text-xs font-serif font-bold uppercase tracking-wide">
                  Amount Due for Immediate Clearance:
                </span>
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  ₹{payableAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Payment Channels */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70">
                  Select Secure Payment Method
                </label>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-[#1A1A1A] bg-white shadow-xs'
                        : 'border-[#1A1A1A]/20 bg-[#FAF9F6] hover:bg-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#C4A484]" />
                    <span className="text-xs font-serif font-bold text-[#1A1A1A]">UPI / QR</span>
                    <span className="text-[9px] text-[#1A1A1A]/50">GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#1A1A1A] bg-white shadow-xs'
                        : 'border-[#1A1A1A]/20 bg-[#FAF9F6] hover:bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#C4A484]" />
                    <span className="text-xs font-serif font-bold text-[#1A1A1A]">Credit / Debit</span>
                    <span className="text-[9px] text-[#1A1A1A]/50">Visa, MC, RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#1A1A1A] bg-white shadow-xs'
                        : 'border-[#1A1A1A]/20 bg-[#FAF9F6] hover:bg-white'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#C4A484]" />
                    <span className="text-xs font-serif font-bold text-[#1A1A1A]">Net Banking</span>
                    <span className="text-[9px] text-[#1A1A1A]/50">All Major Banks</span>
                  </button>
                </div>

                {/* Subform based on paymentMethod */}
                <div className="bg-white p-5 border border-[#1A1A1A]/20 space-y-4">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif font-bold text-[#1A1A1A]">
                          Instant UPI Transfer (Zero Surcharge)
                        </span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          Recommended
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div className="border border-[#1A1A1A]/15 p-3 flex flex-col items-center text-center bg-[#FAF9F6]">
                          {/* Simulated Dynamic QR Code */}
                          <div className="w-32 h-32 border-2 border-[#1A1A1A] p-2 bg-white flex flex-col items-center justify-center">
                            <QrCode className="w-24 h-24 text-[#1A1A1A]" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] mt-2">
                            Scan to Pay ₹{payableAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[9px] text-[#1A1A1A]/60 font-mono">
                            VPA: indoworld@okhdfcbank
                          </span>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70">
                            Or Enter Virtual Payment Address (UPI ID)
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@oksbi / @paytm"
                            className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                          />
                          <p className="text-[11px] text-[#1A1A1A]/60">
                            A collect request for ₹{payableAmount.toLocaleString('en-IN')} will be pushed to your UPI app.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Name as printed on card"
                          className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 font-mono focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 font-mono focus:outline-none focus:border-[#1A1A1A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 font-mono focus:outline-none focus:border-[#1A1A1A]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70">
                        Choose Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/25 text-[#1A1A1A] focus:outline-none"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                      <p className="text-[11px] text-[#1A1A1A]/60">
                        You will be redirected to the secure bank login portal to authorize this payment.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Trust Footnote */}
              <div className="bg-[#F2EFE9] p-3.5 border border-[#1A1A1A]/20 flex items-center gap-2.5 text-xs text-[#1A1A1A]/80 font-sans">
                <Lock className="w-4 h-4 text-[#C4A484] shrink-0" />
                <span>
                  All payments are encrypted via PCI-DSS compliant standards and backed by official GST invoices from Indoworld Tourism Services (Sector 1, Vaishali).
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 border border-[#1A1A1A]/30 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-white cursor-pointer"
                >
                  ← Edit Details
                </button>

                <button
                  type="button"
                  disabled={processing}
                  onClick={handleProcessPayment}
                  className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-8 py-3.5 border border-[#1A1A1A] shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Verifying & Securing Booking...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#C4A484]" />
                      <span>Pay ₹{payableAmount.toLocaleString('en-IN')} & Confirm</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMED */}
          {step === 'confirmed' && confirmedBooking && (
            <div className="space-y-6 text-center">
              {/* Success Badge */}
              <div className="w-16 h-16 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 text-[#C4A484]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4A484] block">
                  Payment Verified • Booking ID: {confirmedBooking.id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mt-1">
                  Your Journey is Officially Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-sans mt-1 max-w-lg mx-auto">
                  A stamped booking voucher and tax invoice have been dispatched to <strong>{confirmedBooking.emailSentTo}</strong> and registered at our Vaishali office desk.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-white p-5 border border-[#1A1A1A]/30 text-left space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1A1A1A]/15 gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 block font-bold">
                      Tour Package
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                      {confirmedBooking.packageTitle}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 block font-bold">
                      Transaction Ref
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                      {confirmedBooking.transactionRef}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 block">
                      Departure Date
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedBooking.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 block">
                      Lead Guest
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedBooking.contactName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 block">
                      Total Travelers
                    </span>
                    <span className="font-medium text-[#1A1A1A]">{confirmedBooking.passengers.length} Person(s)</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 block">
                      Paid Amount
                    </span>
                    <span className="font-bold text-emerald-800">
                      ₹{confirmedBooking.advancePaid.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {confirmedBooking.totalAmount > confirmedBooking.advancePaid && (
                  <div className="p-3 bg-[#FAF9F6] border border-[#1A1A1A]/15 text-xs text-[#1A1A1A]/80 flex items-center justify-between">
                    <span>
                      Balance Due (₹{(confirmedBooking.totalAmount - confirmedBooking.advancePaid).toLocaleString('en-IN')})
                    </span>
                    <span className="text-[11px] text-[#1A1A1A]/60">
                      Payable 3 days prior to departure or at Vaishali office
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="w-full sm:w-auto bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-widest px-5 py-3 border border-[#1A1A1A] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
                >
                  <Download className="w-4 h-4 text-[#C4A484]" />
                  <span>Download Voucher (.txt / receipt)</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareToWhatsApp}
                  className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-3 border border-[#1A1A1A] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#C4A484]" />
                  <span>Forward Voucher to WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 border border-[#1A1A1A]/30 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
