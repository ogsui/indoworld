import React from 'react';
import { Calendar, Users, Hotel, Star, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const QuickTrustStats: React.FC = () => {
  const stats = [
    {
      icon: Calendar,
      value: `${BUSINESS_INFO.experienceYears}+ Years`,
      label: 'Travel Excellence',
      detail: `Serving since ${BUSINESS_INFO.established}`,
    },
    {
      icon: Users,
      value: BUSINESS_INFO.stats.happyTravelers,
      label: 'Delighted Guests',
      detail: 'Families, Honeymoons & Groups',
    },
    {
      icon: Hotel,
      value: BUSINESS_INFO.stats.hotelPartners,
      label: 'Curated Hotel Stays',
      detail: 'Verified 3, 4 & 5-Star Properties',
    },
    {
      icon: Star,
      value: `${BUSINESS_INFO.stats.averageRating} / 5.0`,
      label: 'Customer Rating',
      detail: 'Local Ghaziabad & NCR Feedback',
    },
    {
      icon: ShieldCheck,
      value: 'Govt. Verified',
      label: 'GST Registered',
      detail: BUSINESS_INFO.gstin,
    },
  ];

  return (
    <section className="bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            const isDark = index === 1 || index === 4;
            const isBeige = index === 2;

            return (
              <div
                key={index}
                className={`p-5 flex flex-col justify-between min-h-[140px] transition-transform duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-[#1A1A1A] text-[#FAF9F6] border border-[#1A1A1A]'
                    : isBeige
                    ? 'bg-[#F2EFE9] text-[#1A1A1A] border border-[#1A1A1A]/40'
                    : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-[0.2em] ${
                      isDark ? 'text-[#FAF9F6]/70' : 'text-[#1A1A1A]/70'
                    }`}
                  >
                    {item.label}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isDark ? 'text-[#C4A484]' : 'text-[#C4A484]'
                    }`}
                  />
                </div>

                <div className="my-2">
                  <div className="text-3xl font-serif italic tracking-tight">
                    {item.value}
                  </div>
                </div>

                <div
                  className={`text-[11px] font-medium truncate ${
                    isDark ? 'text-[#FAF9F6]/60' : 'text-[#1A1A1A]/60'
                  }`}
                >
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
