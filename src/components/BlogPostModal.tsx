import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, User, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenInquiry?: (service: string, topic: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onOpenInquiry,
}) => {
  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Post link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1A1A1A]/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-3xl border border-[#1A1A1A] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-white p-4 border-b border-[#1A1A1A]/20 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:text-[#C4A484] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 border border-[#1A1A1A]/20 hover:bg-[#FAF9F6] text-[#1A1A1A] cursor-pointer"
              title="Share Article"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C4A484]" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#1A1A1A]/20 hover:bg-[#FAF9F6] text-[#1A1A1A] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-[#1A1A1A]">
          {/* Category & Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 bg-[#1A1A1A] text-white">
                {post.category}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C4A484]">
                Indoworld Vaishali Editorial
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1A1A] leading-tight">
              {post.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#1A1A1A]/60 font-sans pb-4 border-b border-[#1A1A1A]/15">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#C4A484]" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C4A484]" />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C4A484]" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Hero Cover */}
          <div className="h-64 sm:h-80 w-full overflow-hidden border border-[#1A1A1A]/20 relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways Callout */}
          <div className="bg-[#F2EFE9] border-l-4 border-[#C4A484] p-4 sm:p-5">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A] block mb-2">
              Key Highlights at a Glance
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#1A1A1A]/85 font-sans">
              {post.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C4A484] font-bold">✓</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#1A1A1A]/85 font-sans">
            {post.content.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A]">
                  {sec.heading}
                </h2>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed font-sans">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-[#1A1A1A]/15 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 mr-2">
              Tags:
            </span>
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] uppercase tracking-wider bg-white border border-[#1A1A1A]/20 px-2.5 py-1 text-[#1A1A1A]/70"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Consultation CTA Banner */}
          <div className="bg-white border border-[#1A1A1A]/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A]">
                Planning this journey from Vaishali or Delhi NCR?
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-sans mt-0.5">
                Visit our Ansal Plaza office (UG SR-5B) or speak directly with our tour coordinators.
              </p>
            </div>

            {onOpenInquiry && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry('Tour Planning', post.title);
                }}
                className="bg-[#1A1A1A] hover:bg-[#C4A484] hover:text-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase font-bold tracking-widest px-5 py-3 border border-[#1A1A1A] shrink-0 cursor-pointer transition-all"
              >
                Inquire With Desk
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
