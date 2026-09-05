import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/businessData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 mb-3 bg-white">
            <HelpCircle className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1A1A1A]">
            Frequently Asked <span className="text-[#C4A484] italic">Questions</span>
          </h2>
          <p className="mt-3 text-sm text-[#1A1A1A]/80 max-w-xl mx-auto">
            Clear, transparent answers about our travel services, Vaishali office visits, payments, and custom bookings.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#1A1A1A]/30 transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-base sm:text-lg font-serif text-[#1A1A1A] hover:text-[#C4A484] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="shrink-0 text-[#1A1A1A]">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#C4A484]" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed border-t border-[#1A1A1A]/10 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
