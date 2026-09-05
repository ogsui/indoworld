import React from 'react';
import { ShieldCheck, MapPin, Award, CheckCircle2, Clock, Users, Building, HeartHandshake } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface AboutAndVerificationSectionProps {
  onOpenInquiry: (initialService?: string) => void;
}

export const AboutAndVerificationSection: React.FC<AboutAndVerificationSectionProps> = ({ onOpenInquiry }) => {
  const trustPoints = [
    {
      icon: Building,
      title: 'Physical Office in Sector 1, Vaishali',
      desc: 'No automated bots or unreachable call centers. Visit our office in Sector 1, Vaishali (5 minutes from Vaishali Metro Station) to discuss plans in person with our senior travel planners.',
    },
    {
      icon: ShieldCheck,
      title: 'Govt. GST Registered Enterprise',
      desc: `Registered under GSTIN: ${BUSINESS_INFO.gstin}. Every rupee you spend is safeguarded with legitimate tax invoices, verified vouchers, and guaranteed supplier commitments.`,
    },
    {
      icon: Clock,
      title: '15+ Years Continuous Heritage (Est. 2010)',
      desc: 'Founded in 2010 in Ghaziabad, we have successfully organized over 14,000+ holidays, family trips, corporate retreats, and pilgrimages with consistent excellence.',
    },
    {
      icon: HeartHandshake,
      title: 'Personal Tour Coordinator',
      desc: 'A dedicated travel manager remains on call throughout your journey—ensuring seamless hotel check-ins, timely driver pickups, and zero friction from start to finish.',
    },
  ];

  return (
    <section id="about-section" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Vision */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 bg-white">
              <Award className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>Vaishali’s Trusted Travel Partner</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1A1A1A] leading-tight">
              Rooted in Ghaziabad, <span className="text-[#C4A484] italic">Connecting You to the World</span>
            </h2>

            <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed">
              Established in 2010 in <strong className="text-[#1A1A1A] font-bold">Sector 1, Vaishali, Ghaziabad</strong>, 
              Indoworld Tourism Services was founded with a single mission: to provide personalized, trustworthy, and stress-free travel curation for residents of Vaishali, Indirapuram, Vasundhara, Kaushambi, and Delhi NCR.
            </p>

            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed">
              Unlike generic online portals where travelers are left stranded during unexpected flight delays or hotel issues, our local team takes personal ownership of your itinerary. From arranging safe mountain drivers for Himachal and Kashmir to securing luxury desert safaris in Dubai and verified Char Dham yatras, we treat every customer like family.
            </p>

            {/* Official Credentials Box */}
            <div className="bg-white p-6 border border-[#1A1A1A]/30 shadow-xs space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60">
                Official Business Credentials
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#1A1A1A]/60 block text-[11px] font-medium">Legal Registered Name:</span>
                  <strong className="text-[#1A1A1A] font-serif font-bold text-sm">{BUSINESS_INFO.name}</strong>
                </div>
                <div>
                  <span className="text-[#1A1A1A]/60 block text-[11px] font-medium">Goods & Services Tax (GSTIN):</span>
                  <strong className="text-[#1A1A1A] font-mono font-bold">{BUSINESS_INFO.gstin}</strong>
                </div>
                <div>
                  <span className="text-[#1A1A1A]/60 block text-[11px] font-medium">Year of Establishment:</span>
                  <strong className="text-[#1A1A1A] font-bold">{BUSINESS_INFO.established} (Active for 15+ Years)</strong>
                </div>
                <div>
                  <span className="text-[#1A1A1A]/60 block text-[11px] font-medium">Principal Place of Business:</span>
                  <strong className="text-[#1A1A1A] font-bold">{BUSINESS_INFO.address.locality}, Ghaziabad, UP</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenInquiry('Tour Package')}
                className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-6 py-3.5 transition-all cursor-pointer border border-[#1A1A1A] shadow-xs"
              >
                Plan Your Vacation with Indoworld
              </button>
            </div>
          </div>

          {/* Right Column: 4 Trust Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 border border-[#1A1A1A]/30 hover:border-[#1A1A1A] shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 border border-[#1A1A1A] bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#C4A484]" />
                    </div>
                    <h3 className="text-base font-serif text-[#1A1A1A]">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#1A1A1A]/70 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
