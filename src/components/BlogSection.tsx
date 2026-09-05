import React, { useState } from 'react';
import { INITIAL_BLOG_POSTS } from '../data/travelFeaturesData';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface BlogSectionProps {
  onOpenInquiry?: (service: string, topic: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Travel Tips', 'Local Attractions', 'Cultural Events'];

  const filteredPosts = INITIAL_BLOG_POSTS.filter((post) => {
    if (activeCategory === 'All') return true;
    return post.category === activeCategory;
  });

  return (
    <section id="blog-section" className="py-20 bg-[#FAF9F6] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 mb-3 bg-white">
              <BookOpen className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>Indoworld Editorial & Travel Journal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-[#1A1A1A]">
              Travel Guides & <span className="text-[#C4A484] italic">Local Intel</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#1A1A1A]/80 font-sans max-w-2xl">
              Practical mountain guidelines, Ghaziabad weekend getaways, and spiritual festival opening calendars written by our Vaishali tour experts.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-[#1A1A1A]/25 hover:border-[#1A1A1A] flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-2.5 py-1 bg-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A]">
                      {post.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#FAF9F6]/90 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C4A484]" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C4A484]" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#C4A484] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#1A1A1A]/75 font-sans mt-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] uppercase font-bold tracking-wider bg-[#FAF9F6] border border-[#1A1A1A]/15 px-2 py-0.5 text-[#1A1A1A]/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60">
                    By {post.author.split('(')[0]}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] group-hover:text-[#C4A484] flex items-center gap-1 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Post Reader Modal */}
      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onOpenInquiry={onOpenInquiry}
      />
    </section>
  );
};
