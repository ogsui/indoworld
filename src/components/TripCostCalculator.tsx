import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, ArrowRight, ShieldCheck, Sparkles, Check, Info, Building2, Compass, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/businessData';

interface TripCostCalculatorProps {
  onOpenInquiry: (initialService?: string, initialDestination?: string, customNote?: string) => void;
}

interface DestinationRate {
  name: string;
  category: 'domestic' | 'international' | 'spiritual';
  baseNightRateComfort: number; // per person per night
  baseNightRateDeluxe: number;
  baseNightRateLuxury: number;
  sightseeingDailyCost: number; // guided excursions & entry passes per person
}

const DESTINATIONS: DestinationRate[] = [
  { name: 'Kashmir (Srinagar & Gulmarg)', category: 'domestic', baseNightRateComfort: 2800, baseNightRateDeluxe: 3800, baseNightRateLuxury: 6500, sightseeingDailyCost: 1200 },
  { name: 'Himachal (Manali & Shimla)', category: 'domestic', baseNightRateComfort: 2200, baseNightRateDeluxe: 3200, baseNightRateLuxury: 5500, sightseeingDailyCost: 900 },
  { name: 'Uttarakhand (Kedarnath & Badrinath)', category: 'spiritual', baseNightRateComfort: 2900, baseNightRateDeluxe: 4100, baseNightRateLuxury: 7000, sightseeingDailyCost: 1100 },
  { name: 'Kerala (Munnar & Houseboat)', category: 'domestic', baseNightRateComfort: 2900, baseNightRateDeluxe: 3900, baseNightRateLuxury: 6800, sightseeingDailyCost: 1300 },
  { name: 'Rajasthan (Jaipur & Udaipur)', category: 'domestic', baseNightRateComfort: 2600, baseNightRateDeluxe: 3600, baseNightRateLuxury: 6200, sightseeingDailyCost: 1000 },
  { name: 'Goa (Beach Resorts)', category: 'domestic', baseNightRateComfort: 2400, baseNightRateDeluxe: 3500, baseNightRateLuxury: 6800, sightseeingDailyCost: 950 },
  { name: 'Dubai & Abu Dhabi', category: 'international', baseNightRateComfort: 7500, baseNightRateDeluxe: 9800, baseNightRateLuxury: 16000, sightseeingDailyCost: 2800 },
  { name: 'Thailand (Bangkok & Phuket)', category: 'international', baseNightRateComfort: 5200, baseNightRateDeluxe: 7200, baseNightRateLuxury: 12500, sightseeingDailyCost: 2200 },
  { name: 'Bali (Ubud & Kuta)', category: 'international', baseNightRateComfort: 5800, baseNightRateDeluxe: 8000, baseNightRateLuxury: 13500, sightseeingDailyCost: 2400 },
];

export const TripCostCalculator: React.FC<TripCostCalculatorProps> = ({ onOpenInquiry }) => {
  const [selectedDestName, setSelectedDestName] = useState(DESTINATIONS[0].name);
  const [nights, setNights] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [tier, setTier] = useState<'comfort' | 'deluxe' | 'luxury'>('deluxe');
  const [includeFlights, setIncludeFlights] = useState<boolean>(true);

  const currentDest = useMemo(() => {
    return DESTINATIONS.find((d) => d.name === selectedDestName) || DESTINATIONS[0];
  }, [selectedDestName]);

  const calculation = useMemo(() => {
    let ratePerPersonPerNight = currentDest.baseNightRateDeluxe;
    if (tier === 'comfort') ratePerPersonPerNight = currentDest.baseNightRateComfort;
    if (tier === 'luxury') ratePerPersonPerNight = currentDest.baseNightRateLuxury;

    const stayAndMealsCost = ratePerPersonPerNight * nights * travelers;
    const sightseeingTotal = currentDest.sightseeingDailyCost * nights * travelers;

    // Flight estimation if opted
    const flightEstPerPerson = currentDest.category === 'international' ? 18000 : 7500;
    const flightTotal = includeFlights ? flightEstPerPerson * travelers : 0;

    const totalEstimate = stayAndMealsCost + sightseeingTotal + flightTotal;
    const perPerson = Math.round(totalEstimate / travelers);

    return {
      stayAndMealsCost,
      sightseeingTotal,
      flightTotal,
      totalEstimate,
      perPerson,
    };
  }, [currentDest, nights, travelers, tier, includeFlights]);

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Indoworld Tourism Services (Vaishali)! I calculated an estimate on your website for:\n` +
      `• Destination: ${selectedDestName}\n` +
      `• Duration: ${nights} Nights / ${nights + 1} Days\n` +
      `• Group: ${travelers} Traveler(s)\n` +
      `• Package Tier: ${tier.toUpperCase()}\n` +
      `• Flight Ticketing: ${includeFlights ? 'Include Flight Estimate' : 'Land Only'}\n` +
      `• Estimated Budget: ~₹${calculation.totalEstimate.toLocaleString('en-IN')} (approx ₹${calculation.perPerson.toLocaleString('en-IN')}/person)\n` +
      `Please provide the final customized quote and hotel options.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleFormQuote = () => {
    const note = `Estimated budget for ${nights} Nights, ${travelers} pax in ${tier.toUpperCase()} tier: ~₹${calculation.totalEstimate.toLocaleString('en-IN')}. Flights: ${includeFlights ? 'Yes' : 'No'}.`;
    onOpenInquiry('Custom Itinerary', selectedDestName, note);
  };

  return (
    <section id="calculator-section" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#0B2545]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545] border border-[#0B2545] px-3 py-1 mb-3 bg-white">
            <Calculator className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Interactive Cost Forecaster</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0B2545] tracking-tight">
            Transparent Budget Estimator
          </h2>
          <p className="mt-3 text-sm text-[#0B2545]/80 leading-relaxed font-sans">
            Calculate realistic costs for verified star accommodation, meal arrangements, guided sightseeing passes, and flight logistics curated by our Vaishali headquarters. Zero hidden surprises.
          </p>
        </div>

        {/* Two-Column Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white border-2 border-[#0B2545] p-6 sm:p-8 shadow-md space-y-6">
            {/* Destination Selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545]/70 mb-2">
                1. Select Target Destination
              </label>
              <select
                value={selectedDestName}
                onChange={(e) => setSelectedDestName(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#0B2545]/30 focus:border-[#002FA7] px-3.5 py-3 text-sm font-semibold text-[#0B2545] focus:outline-hidden"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest.name} value={dest.name}>
                    {dest.name} ({dest.category.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Nights & Travelers Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545]/70">
                    2. Duration (Nights)
                  </label>
                  <span className="text-xs font-bold text-[#002FA7] font-mono">{nights} Nights ({nights + 1} Days)</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={14}
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full accent-[#002FA7] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                  <span>Weekend (2N)</span>
                  <span>Standard (5N)</span>
                  <span>Grand (14N)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545]/70">
                    3. Number of Travelers
                  </label>
                  <span className="text-xs font-bold text-[#002FA7] font-mono">{travelers} Person(s)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-[#002FA7] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                  <span>Solo / Couple (1-2)</span>
                  <span>Family (4-6)</span>
                  <span>Group (12)</span>
                </div>
              </div>
            </div>

            {/* Hotel Tier Selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B2545]/70 mb-2">
                4. Select Hotel & Comfort Standard
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'comfort', label: 'Comfort', star: '3-Star Verified', desc: 'Clean, central, buffet breakfast' },
                  { id: 'deluxe', label: 'Deluxe', star: '4-Star Premium', desc: 'Spacious rooms, MAP plan, valley/city view' },
                  { id: 'luxury', label: 'Luxury', star: '5-Star / Heritage', desc: 'Resort amenities, gourmet dining, spa' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTier(item.id as any)}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      tier === item.id
                        ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#0B2545] border-[#0B2545]/20 hover:border-[#0B2545]'
                    }`}
                  >
                    <div className="text-xs font-bold font-serif">{item.label}</div>
                    <div className="text-[10px] text-[#DC2626] font-semibold">{item.star}</div>
                    <div className={`text-[9px] mt-1 line-clamp-2 leading-tight ${tier === item.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Ticket Inclusion Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3.5 bg-[#FAF9F6] border border-[#0B2545]/20 cursor-pointer hover:border-[#002FA7] transition-colors">
                <input
                  type="checkbox"
                  checked={includeFlights}
                  onChange={(e) => setIncludeFlights(e.target.checked)}
                  className="w-4 h-4 text-[#002FA7] accent-[#002FA7]"
                />
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0B2545] block">
                    Include Airline Flight Ticket Estimate from Delhi NCR (IGI Airport)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Calculates average round-trip airfares with live seat inventory booking support
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Real-time Calculation Result Card */}
          <motion.div
            key={`${selectedDestName}-${nights}-${travelers}-${tier}-${includeFlights}`}
            initial={{ opacity: 0.8, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-5 bg-[#0B2545] text-white border-2 border-[#002FA7] p-6 sm:p-8 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DC2626] font-bold">
                  Estimated Trip Cost
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 border border-white/30 px-2 py-0.5">
                  {tier.toUpperCase()} TIER
                </span>
              </div>

              {/* Total & Per Person */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest text-white/60 block mb-1.5 font-semibold">
                  Estimated Total Package (Taxes Included)
                </span>
                <div className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                  ₹{calculation.totalEstimate.toLocaleString('en-IN')}
                </div>
                <div className="text-sm font-serif italic text-amber-300 mt-1.5">
                  ~ ₹{calculation.perPerson.toLocaleString('en-IN')} per person ({travelers} traveler{travelers > 1 ? 's' : ''})
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs border-t border-white/15 pt-4 mb-6">
                <div className="flex justify-between text-white/85">
                  <span>Hotel Stays ({nights} Nights) & Meals:</span>
                  <span className="font-bold text-white">₹{calculation.stayAndMealsCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white/85">
                  <span>Sightseeing Passes & Activities:</span>
                  <span className="font-bold text-white">₹{calculation.sightseeingTotal.toLocaleString('en-IN')}</span>
                </div>
                {includeFlights && (
                  <div className="flex justify-between text-white/85">
                    <span>Estimated Flight Airfares (Delhi NCR):</span>
                    <span className="font-bold text-white">₹{calculation.flightTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/85">
                  <span>GST Invoice & Local Permitting:</span>
                  <span className="font-bold text-[#22C55E]">Included</span>
                </div>
              </div>

              {/* Value guarantees */}
              <div className="bg-white/5 border border-white/10 p-3.5 text-xs text-white/80 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>GST Registered Invoice with verified vouchers</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vaishali office dedicated tour coordinator</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Tailored to dates and personal budget</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-white/20">
              <button
                onClick={handleFormQuote}
                className="w-full bg-[#002FA7] hover:bg-[#DC2626] text-white py-3.5 px-4 text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request Formal Quotation Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppQuote}
                className="w-full bg-white/10 hover:bg-[#22C55E] hover:text-white text-white border border-white/30 py-2.5 px-4 text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#22C55E]" />
                <span>Discuss this Budget on WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
