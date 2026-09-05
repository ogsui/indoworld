import React, { useState } from 'react';
import { UserReview, TourPackage } from '../types';
import { X, Star, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  availablePackages: TourPackage[];
  onReviewSubmitted: (review: UserReview) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  availablePackages,
  onReviewSubmitted,
}) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState(availablePackages[0]?.id || '');
  const [customTripName, setCustomTripName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [locality, setLocality] = useState('');
  const [travelMonth, setTravelMonth] = useState('February 2025');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const starLabels: Record<number, string> = {
    1: 'Disappointing',
    2: 'Needs Improvement',
    3: 'Average / Good',
    4: 'Great Journey',
    5: 'Exceptional 5-Star Experience',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) {
      alert('Please provide your name and review details.');
      return;
    }

    setIsSubmitting(true);

    const chosenPackage = availablePackages.find((p) => p.id === selectedPackageId);
    const tripTitle = chosenPackage ? chosenPackage.title : customTripName || 'Custom Holiday Journey';

    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      packageId: chosenPackage?.id,
      tripName: tripTitle,
      authorName: authorName.trim(),
      locality: locality.trim() || 'Vaishali, Ghaziabad',
      rating,
      reviewText: reviewText.trim(),
      travelMonth: travelMonth.trim(),
      verifiedTraveler: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      // Save to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('indoworld_user_reviews') || '[]');
        localStorage.setItem('indoworld_user_reviews', JSON.stringify([newReview, ...stored]));
      } catch (err) {
        console.error('Failed to store review in localStorage', err);
      }

      onReviewSubmitted(newReview);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1A1A1A]/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-lg border border-[#1A1A1A] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1A1A1A] text-[#FAF9F6] p-5 sm:p-6 flex items-center justify-between border-b border-[#1A1A1A]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4A484]">
              Verified Traveler Ratings
            </div>
            <h3 className="text-xl font-serif mt-0.5">
              Submit Your Tour Review
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 border border-[#1A1A1A] bg-white text-[#1A1A1A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#C4A484]" />
              </div>
              <h4 className="text-xl font-serif text-[#1A1A1A]">
                Review Successfully Posted!
              </h4>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/80 font-sans max-w-sm mx-auto">
                Thank you for reviewing Indoworld Tourism Services. Your rating has been published and added to our average tour score.
              </p>
              <button
                onClick={onClose}
                className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 border border-[#1A1A1A] cursor-pointer mt-2"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="bg-white p-4 border border-[#1A1A1A]/20 text-center space-y-2">
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70">
                  Rate Your Experience
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            active
                              ? 'text-[#C4A484] fill-[#C4A484]'
                              : 'text-[#1A1A1A]/25'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs font-serif font-bold text-[#1A1A1A]">
                  {starLabels[hoverRating || rating]}
                </div>
              </div>

              {/* Package or Tour selection */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                  Tour or Service Completed *
                </label>
                <select
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/30 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                >
                  {availablePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} ({pkg.destination})
                    </option>
                  ))}
                  <option value="custom">Other Custom Itinerary / Tour Package</option>
                </select>
              </div>

              {selectedPackageId === 'custom' && (
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Custom Trip Title / Destination
                  </label>
                  <input
                    type="text"
                    value={customTripName}
                    onChange={(e) => setCustomTripName(e.target.value)}
                    placeholder="e.g. Agra Day Tour / Goa Family Vacation"
                    className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/30 focus:outline-none"
                  />
                </div>
              )}

              {/* Author & Locality */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Rajesh Khurana"
                    className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                    Locality / City *
                  </label>
                  <input
                    required
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder="e.g. Sector 1, Vaishali"
                    className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Travel Month */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                  Month & Year of Travel
                </label>
                <input
                  type="text"
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  placeholder="e.g. January 2025"
                  className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              {/* Written Review */}
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/70 mb-1">
                  Your Written Review & Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How was the hotel, vehicle cleanliness, driver behavior, and tour coordination?"
                  className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#1A1A1A]/70 font-sans">
                <ShieldCheck className="w-4 h-4 text-[#C4A484] shrink-0" />
                <span>Marked as a Verified Neighborhood Traveler Review</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#1A1A1A]/30 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 border border-[#1A1A1A] shadow-xs cursor-pointer transition-all"
                >
                  {isSubmitting ? 'Posting Review...' : 'Post Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
