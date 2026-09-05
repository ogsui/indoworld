import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Plane,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle2,
  Share2,
  Download,
  MessageCircle,
  Phone,
  RotateCcw,
  Sun,
  Sunset,
  Moon,
  Info,
  ChevronRight,
  ShieldCheck,
  Flame,
  Globe2
} from 'lucide-react';
import { CustomItinerary } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

interface CustomItineraryGeneratorProps {
  onOpenInquiry: (initialService?: string, initialDestination?: string, initialNote?: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
}

const POPULAR_DESTINATIONS = [
  { name: 'Spiti Valley', tag: 'High-Altitude Roadtrip', duration: 8, vibe: 'Roadtrip & Adventure' },
  { name: 'Vietnam (Hanoi to Da Nang)', tag: 'Trending Southeast Asia', duration: 7, vibe: 'Family Leisure' },
  { name: 'Iceland Ring Road', tag: 'Northern Lights & Glaciers', duration: 7, vibe: 'Scenic & Luxury' },
  { name: 'Kyoto & Tokyo, Japan', tag: 'Heritage & Modernity', duration: 9, vibe: 'Cultural & Heritage' },
  { name: 'Tbilisi & Kazbegi, Georgia', tag: 'Caucasus Mountain Wine', duration: 6, vibe: 'Romantic & Scenic' },
  { name: 'Andaman & Havelock', tag: 'Island Beaches & Scuba', duration: 6, vibe: 'Honeymoon & Romantic' },
  { name: 'Meghalaya Living Bridges', tag: 'Northeast Waterfalls', duration: 6, vibe: 'Offbeat Nature' },
  { name: 'Baku, Azerbaijan', tag: 'Fire City & Caspian Coast', duration: 5, vibe: 'City Break & Culture' },
  { name: 'Switzerland Grand Alps', tag: 'Scenic Trains & Peaks', duration: 8, vibe: 'Luxury Retreat' },
  { name: 'Ranthambore & Jaipur', tag: 'Royal Forts & Tiger Safari', duration: 5, vibe: 'Family & Wildlife' },
];

export const CustomItineraryGenerator: React.FC<CustomItineraryGeneratorProps> = ({
  onOpenInquiry,
  onOpenChatWithPrompt,
}) => {
  const [destinationInput, setDestinationInput] = useState('');
  const [days, setDays] = useState(6);
  const [travelers, setTravelers] = useState(2);
  const [vibe, setVibe] = useState('Family Leisure');
  const [departureCity, setDepartureCity] = useState('Delhi NCR');
  const [budgetTier, setBudgetTier] = useState('Comfort / 4-Star');
  const [specialNote, setSpecialNote] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedItinerary, setGeneratedItinerary] = useState<CustomItinerary | null>(null);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadingStages = [
    'Mapping geographic routes & transit connections...',
    'Scouting verified 3/4/5-star accommodation options...',
    'Curating optimal sightseeing routes and landmark timings...',
    'Synthesizing authentic local food & cultural secrets...',
  ];

  const handleGenerate = async (overrideDest?: string) => {
    const targetDest = overrideDest || destinationInput.trim();
    if (!targetDest) {
      setErrorMsg('Please enter a destination name (e.g., Iceland, Spiti Valley, Vietnam).');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingStages.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/gemini/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: targetDest,
          days,
          travelers,
          style: vibe,
          departureCity,
          budgetTier,
          additionalNotes: specialNote,
        }),
      });

      if (!response.ok) {
        throw new Error('Could not fetch custom itinerary');
      }

      const data = await response.json();
      setGeneratedItinerary(data);
      setActiveDayTab(1);
    } catch (err: any) {
      console.warn('Itinerary API fallback engaged:', err);
      // Construct rich structured fallback
      const fallbackDays = [];
      for (let i = 1; i <= days; i++) {
        fallbackDays.push({
          day: i,
          title:
            i === 1
              ? `Arrival in ${targetDest} & Initial Orientation`
              : i === days
              ? `Farewell & Return Journey to ${departureCity}`
              : `Deep Exploration of ${targetDest} Signature Landscapes (Day ${i})`,
          morning:
            i === 1
              ? `Arrival at airport/station, meet-and-greet by Indoworld dedicated driver, private transfer to hotel for check-in.`
              : `Early morning excursion to major scenic viewpoints before peak tourist crowds. Photography & cultural stop.`,
          afternoon:
            `Curated visit to regional cultural landmarks and scenic heritage quarters followed by regional culinary tasting.`,
          evening:
            `Leisure walk through local artisan craft bazaars and relaxing dinner featuring regional specialties.`,
          stay: `${budgetTier} Verified Handpicked Hotel in central ${targetDest}`,
          transportTip: `Dedicated local sightseeing coordination, walking routes, and guided monument access.`,
        });
      }

      setGeneratedItinerary({
        title: `${days}-Day Bespoke ${targetDest} Expedition`,
        destination: targetDest,
        duration: `${days} Days / ${days - 1} Nights`,
        vibe,
        departureCity,
        overview: `A tailor-crafted itinerary designed by Indoworld Tourism Services (Sector 1, Vaishali) providing seamless flights, vetted accommodation, and curated sightseeing experiences.`,
        bestTimeToVisit: 'October to April (or destination peak seasonal window)',
        visaNotes: 'Indoworld assists with comprehensive visa documentation, flight reservations, and travel insurance.',
        estimatedBudget: {
          economy: `₹${(days * 3800 * travelers).toLocaleString('en-IN')} onwards`,
          standard: `₹${(days * 6500 * travelers).toLocaleString('en-IN')} onwards`,
          luxury: `₹${(days * 12000 * travelers).toLocaleString('en-IN')} onwards`,
        },
        days: fallbackDays,
        insiderTips: [
          `Reserve flights 45-60 days in advance to unlock optimal group/family fare buckets.`,
          `Keep copy of government IDs and international permits if traveling to border/restricted zones.`,
          `Indoworld provides 24/7 on-tour emergency WhatsApp concierge assistance.`,
        ],
      });
      setActiveDayTab(1);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleSelectQuickDest = (item: typeof POPULAR_DESTINATIONS[0]) => {
    setDestinationInput(item.name);
    setDays(item.duration);
    setVibe(item.vibe);
    handleGenerate(item.name);
  };

  const shareViaWhatsApp = () => {
    if (!generatedItinerary) return;
    const text = encodeURIComponent(
      `Hello Indoworld Tourism Services (Vaishali)! I designed a custom itinerary for *${generatedItinerary.destination}* (${generatedItinerary.duration}, ${travelers} travelers). Could you please provide your best package price with Flights, Hotels, and Curated Sightseeing?`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const printItinerary = () => {
    window.print();
  };

  return (
    <section id="custom-itinerary-section" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#0B2545]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#002FA7]/10 border border-[#002FA7]/30 px-3.5 py-1 text-[#002FA7] text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] mb-3">
            <Globe2 className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>We Cover Every Corner of India & The Globe</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2545] tracking-tight mb-3">
            Type Any Destination & Get a Custom Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
            Don't see your dream destination listed below? Our 17+ years of ground alliances mean we curate bespoke travel to <strong>any place on earth</strong> — with transparent pricing, verified star stays, flight ticketing, and tailored holiday coordination.
          </p>
        </div>

        {/* Interactive Custom Planner Box */}
        <div className="bg-white border-2 border-[#0B2545] shadow-xl p-5 sm:p-8 mb-10">
          {/* Main Search Input */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 mb-5">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-[#DC2626]" />
              </div>
              <input
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate();
                }}
                placeholder="Where do you want to travel? (e.g. Spiti Valley, Vietnam, Iceland, Japan, Georgia, Andaman...)"
                className="w-full pl-11 pr-4 py-3.5 border-2 border-[#0B2545]/30 focus:border-[#002FA7] focus:outline-hidden text-sm sm:text-base font-semibold text-[#0B2545] placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="bg-[#002FA7] hover:bg-[#0B2545] disabled:bg-gray-400 text-white text-xs sm:text-sm uppercase font-bold tracking-widest px-7 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
            >
              {loading ? (
                <>
                  <Compass className="w-4 h-4 animate-spin text-[#FAF9F6]" />
                  <span>Designing Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FAF9F6]" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Trending Destination Badges */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B2545] uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Trending Worldwide Destinations (Click to auto-generate):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_DESTINATIONS.map((dest, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectQuickDest(dest)}
                  className="bg-[#FAF9F6] hover:bg-[#002FA7] hover:text-white border border-[#0B2545]/20 text-[#0B2545] text-xs font-semibold px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{dest.name}</span>
                  <span className="text-[10px] opacity-70 font-normal">({dest.duration}D)</span>
                </button>
              ))}
            </div>
          </div>

          {/* Config Controls Bar */}
          <div className="border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#002FA7]" />
                Trip Customization Preferences
              </span>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-[#002FA7] hover:underline cursor-pointer"
              >
                {showAdvanced ? 'Hide Details ▲' : 'Customize Duration, Stays & Budget ▼'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                  Trip Duration
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full border border-[#0B2545]/30 p-2 text-xs font-semibold text-[#0B2545] bg-white focus:outline-hidden"
                >
                  <option value={3}>3 Days (Weekend Break)</option>
                  <option value={4}>4 Days (Short Escape)</option>
                  <option value={5}>5 Days (Popular Standard)</option>
                  <option value={6}>6 Days (Classic Tour)</option>
                  <option value={7}>7 Days (Full Week)</option>
                  <option value={8}>8 Days (Roadtrip Pace)</option>
                  <option value={10}>10 Days (In-Depth Tour)</option>
                  <option value={12}>12 Days (Grand Expedition)</option>
                  <option value={14}>14 Days (Two Weeks)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full border border-[#0B2545]/30 p-2 text-xs font-semibold text-[#0B2545] bg-white focus:outline-hidden"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Couple / Duo</option>
                  <option value={3}>3 Small Family</option>
                  <option value={4}>4 Family of 4</option>
                  <option value={6}>6 Friends / Family Group</option>
                  <option value={10}>10+ Large Tour Group</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                  Holiday Style / Vibe
                </label>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full border border-[#0B2545]/30 p-2 text-xs font-semibold text-[#0B2545] bg-white focus:outline-hidden"
                >
                  <option value="Family Leisure">Family Leisure & Comfort</option>
                  <option value="Honeymoon & Romantic">Honeymoon & Romantic</option>
                  <option value="Roadtrip & Adventure">Roadtrip & Adventure</option>
                  <option value="Cultural & Heritage">Cultural & Heritage</option>
                  <option value="Luxury Retreat">Luxury Stays & Scenic</option>
                  <option value="Budget Explorer">Budget Explorer</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                  Departing City
                </label>
                <select
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full border border-[#0B2545]/30 p-2 text-xs font-semibold text-[#0B2545] bg-white focus:outline-hidden"
                >
                  <option value="Delhi NCR">Delhi NCR / Vaishali</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Direct On-Site Arrival">Direct On-Site Arrival</option>
                </select>
              </div>
            </div>

            {showAdvanced && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                    Accommodation Tier Preference
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full border border-[#0B2545]/30 p-2 text-xs font-semibold text-[#0B2545] bg-white focus:outline-hidden"
                  >
                    <option value="Standard / 3-Star">Standard / 3-Star Clean Verified Stays</option>
                    <option value="Comfort / 4-Star">Comfort / 4-Star Premium Properties (Recommended)</option>
                    <option value="Luxury / 5-Star">Luxury / 5-Star Resorts & Heritage Havens</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                    Special Inclusions / Specific Requests
                  </label>
                  <input
                    type="text"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="e.g., Pure Veg food, Infant cot, Lakeview room, Senior-friendly pacing..."
                    className="w-full border border-[#0B2545]/30 p-2 text-xs text-[#0B2545] bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading Animation Stage */}
        {loading && (
          <div className="bg-white border-2 border-[#002FA7] p-8 sm:p-12 text-center shadow-xl mb-10 max-w-2xl mx-auto">
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-4 border-[#002FA7]/20 border-t-[#002FA7] animate-spin" />
              <Compass className="w-8 h-8 text-[#DC2626] absolute inset-0 m-auto animate-pulse" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0B2545] mb-2">
              Indoworld Travel Specialist AI is Crafting Your Route
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 font-medium">
              {loadingStages[loadingStep]}
            </p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className="bg-[#002FA7] h-full transition-all duration-700"
                style={{ width: `${((loadingStep + 1) / loadingStages.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Generated Itinerary Display */}
        {generatedItinerary && !loading && (
          <div className="bg-white border-2 border-[#0B2545] shadow-2xl overflow-hidden mb-12">
            {/* Header Ribbon */}
            <div className="bg-[#0B2545] text-white p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0B2545]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#DC2626] text-white text-[9px] uppercase font-extrabold px-2 py-0.5 tracking-widest">
                    Custom Route Architecture
                  </span>
                  <span className="text-xs text-[#FAF9F6]/80 font-medium">
                    {generatedItinerary.duration} • {travelers} Guests
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {generatedItinerary.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={shareViaWhatsApp}
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs uppercase font-bold tracking-wider px-3.5 py-2 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Book on WhatsApp</span>
                </button>
                <button
                  onClick={() =>
                    onOpenInquiry(
                      'Custom Itinerary',
                      generatedItinerary.destination,
                      `Plan: ${generatedItinerary.title} (${generatedItinerary.duration}). Requesting flights, verified hotels, and curated tour package quotation.`
                    )
                  }
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs uppercase font-bold tracking-wider px-3.5 py-2 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Request Official Quote</span>
                </button>
                <button
                  onClick={printItinerary}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-2 transition-colors cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Overview & Key Highlights Strip */}
            <div className="bg-[#FAF9F6] p-5 sm:p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#DC2626] block mb-1">
                    Route Overview & Pace
                  </span>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans mb-3">
                    {generatedItinerary.overview}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#002FA7]" />
                      <strong>Best Season:</strong> {generatedItinerary.bestTimeToVisit || 'October - May'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-[#002FA7]" />
                      <strong>Departing:</strong> {departureCity}
                    </span>
                  </div>
                </div>

                {/* Estimated Budget Matrix */}
                <div className="bg-white border border-[#0B2545]/20 p-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0B2545] block mb-2">
                    Estimated Budget Tiers (Per Person)
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Economy (3-Star):</span>
                      <strong className="text-[#0B2545]">{generatedItinerary.estimatedBudget.economy}</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 bg-[#002FA7]/5 px-1.5">
                      <span className="font-semibold text-[#002FA7]">Comfort (4-Star):</span>
                      <strong className="text-[#002FA7]">{generatedItinerary.estimatedBudget.standard}</strong>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600">Luxury (5-Star):</span>
                      <strong className="text-[#DC2626]">{generatedItinerary.estimatedBudget.luxury}</strong>
                    </div>
                  </div>
                  <span className="block text-[9px] text-gray-500 mt-2">
                    *Includes Verified Hotels, Daily Breakfast, and Curated Sightseeing. Flights booked on request.
                  </span>
                </div>
              </div>
            </div>

            {/* Day Selector Navigation Pills */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-[#0B2545] uppercase tracking-wider shrink-0 mr-2">
                Timeline:
              </span>
              {generatedItinerary.days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDayTab(d.day)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    activeDayTab === d.day
                      ? 'bg-[#002FA7] text-white shadow-sm'
                      : 'bg-white text-[#0B2545] hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  Day {d.day}
                </button>
              ))}
            </div>

            {/* Day Breakdown Content Card */}
            <div className="p-5 sm:p-8">
              {generatedItinerary.days
                .filter((d) => d.day === activeDayTab)
                .map((dayPlan) => (
                  <div key={dayPlan.day} className="space-y-6">
                    <div className="border-b border-gray-200 pb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DC2626]">
                        Day {dayPlan.day} of {generatedItinerary.days.length}
                      </span>
                      <h4 className="text-lg sm:text-2xl font-serif font-bold text-[#0B2545]">
                        {dayPlan.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Morning */}
                      <div className="bg-[#FAF9F6] border border-gray-200 p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2">
                          <Sun className="w-4 h-4 text-amber-500" />
                          <span>Morning</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {dayPlan.morning}
                        </p>
                      </div>

                      {/* Afternoon */}
                      <div className="bg-[#FAF9F6] border border-gray-200 p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2">
                          <Compass className="w-4 h-4 text-[#002FA7]" />
                          <span>Afternoon</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {dayPlan.afternoon}
                        </p>
                      </div>

                      {/* Evening */}
                      <div className="bg-[#FAF9F6] border border-gray-200 p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2">
                          <Sunset className="w-4 h-4 text-[#DC2626]" />
                          <span>Evening</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {dayPlan.evening}
                        </p>
                      </div>
                    </div>

                    {/* Stay & Sightseeing Footnote */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B2545]/5 border border-[#0B2545]/15 p-4 text-xs">
                      <div className="flex items-start gap-2.5">
                        <Building2 className="w-4 h-4 text-[#002FA7] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#0B2545]">Stay Recommendation:</strong>
                          <span className="text-gray-700">{dayPlan.stay}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Compass className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#0B2545]">Sightseeing & Local Access:</strong>
                          <span className="text-gray-700">{dayPlan.transportTip}</span>
                        </div>
                      </div>
                    </div>

                    {/* Day Navigation Footer */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setActiveDayTab((prev) => Math.max(prev - 1, 1))}
                        disabled={activeDayTab === 1}
                        className="text-xs font-bold text-[#0B2545] disabled:text-gray-300 hover:underline cursor-pointer"
                      >
                        ← Previous Day
                      </button>

                      {onOpenChatWithPrompt && (
                        <button
                          onClick={() =>
                            onOpenChatWithPrompt(
                              `Could you refine Day ${dayPlan.day} of our ${generatedItinerary.destination} itinerary (${dayPlan.title})? I want to adjust activities or request offbeat recommendations.`
                            )
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002FA7] hover:underline cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                          <span>Tweak Day {dayPlan.day} with AI Concierge</span>
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setActiveDayTab((prev) => Math.min(prev + 1, generatedItinerary.days.length))
                        }
                        disabled={activeDayTab === generatedItinerary.days.length}
                        className="text-xs font-bold text-[#0B2545] disabled:text-gray-300 hover:underline cursor-pointer"
                      >
                        Next Day →
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Insider Tips & Booking Callout Banner */}
            <div className="bg-[#FAF9F6] border-t border-gray-200 p-5 sm:p-6">
              <div className="mb-4">
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider block mb-2">
                  Indoworld Local Insider Secrets:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-700">
                  {generatedItinerary.insiderTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-3 border border-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Banner */}
              <div className="bg-[#0B2545] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      Want Guaranteed Best Rates for {generatedItinerary.destination}?
                    </h5>
                    <p className="text-xs text-[#FAF9F6]/80">
                      Our Vaishali headquarters bundles direct airfares, verified hotel vouchers, and curated sightseeing packages with no hidden fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="bg-white hover:bg-gray-100 text-[#0B2545] text-xs uppercase font-bold tracking-wider px-4 py-2.5 transition-colors"
                  >
                    Call: {BUSINESS_INFO.displayPhone}
                  </a>
                  <button
                    onClick={shareViaWhatsApp}
                    className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs uppercase font-bold tracking-wider px-4 py-2.5 transition-colors cursor-pointer"
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
