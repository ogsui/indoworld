import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle, MapPin, Plus, ThumbsUp, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { UserReview } from '../types';

interface ReviewsSectionProps {
  reviews: UserReview[];
  onOpenWriteReview: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5star' | 'recent'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === '5star') return r.rating === 5;
    return true;
  });

  const totalReviews = reviews.length;
  const fiveStars = reviews.filter((r) => r.rating === 5).length;
  const fourStars = reviews.filter((r) => r.rating === 4).length;
  const avgScore = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (totalReviews || 1)
  ).toFixed(1);

  return (
    <section id="reviews-section" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 mb-3 bg-white">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>Verified Customer Ratings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1A1A1A]">
              Traveler Ratings & <span className="text-[#C4A484] italic">Honest Reviews</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#1A1A1A]/80 font-sans max-w-2xl">
              Authentic feedback from families, spiritual pilgrims, and corporate groups in Vaishali, Indirapuram, Vasundhara, and Delhi NCR.
            </p>
          </div>

          {/* Stats & Action Box */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-white border border-[#1A1A1A] px-5 py-3 flex items-center gap-3.5 shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#1A1A1A]">
                {avgScore}
              </div>
              <div>
                <div className="flex text-[#C4A484]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#C4A484]" />
                  ))}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#1A1A1A]/60 mt-0.5">
                  Google 5.0 & Likeme Verified
                </div>
              </div>
            </div>

            <button
              onClick={onOpenWriteReview}
              className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-3.5 border border-[#1A1A1A] shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Breakdown & Filter Bar */}
        <div className="bg-white border border-[#1A1A1A]/20 p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-sans text-[#1A1A1A]/70 w-full md:w-auto">
            <div className="flex items-center gap-1.5 font-serif font-bold text-[#1A1A1A]">
              <Sparkles className="w-4 h-4 text-[#C4A484]" />
              <span>Satisfaction Index:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#1A1A1A]">5 Stars: {fiveStars}</span>
              <span className="text-[#1A1A1A]/30">•</span>
              <span className="text-[11px] text-[#1A1A1A]/70">4 Stars: {fourStars}</span>
              <span className="text-[#1A1A1A]/30">•</span>
              <span className="text-[11px] text-emerald-800 font-bold">100% Recommendation Rate</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50">
              Filter:
            </span>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider border cursor-pointer transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-white'
              }`}
            >
              All Reviews ({totalReviews})
            </button>
            <button
              onClick={() => setSelectedFilter('5star')}
              className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider border cursor-pointer transition-colors ${
                selectedFilter === '5star'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-white'
              }`}
            >
              5-Star Only ({fiveStars})
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-[#1A1A1A]/25 hover:border-[#1A1A1A] p-6 shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#C4A484]">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C4A484]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/40 font-semibold font-sans">
                    {r.travelMonth}
                  </span>
                </div>

                <h4 className="text-xs font-serif font-bold text-[#C4A484] mb-2 uppercase tracking-wide">
                  {r.tripName}
                </h4>

                <p className="text-xs sm:text-sm text-[#1A1A1A]/85 leading-relaxed font-serif italic">
                  &ldquo;{r.reviewText}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1A1A1A]/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
                    <span>{r.authorName}</span>
                    {r.verifiedTraveler && (
                      <span title="Verified Customer">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C4A484]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Verified Guest
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#1A1A1A]/60 mt-1 font-sans">
                  <MapPin className="w-3 h-3 text-[#C4A484] shrink-0" />
                  <span>{r.locality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
