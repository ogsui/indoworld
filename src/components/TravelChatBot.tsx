import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Phone,
  MessageCircle,
  Minimize2,
  Maximize2,
  ShieldCheck,
  Plane,
  Building2,
  Compass,
  MapPin
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

interface TravelChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (initialService?: string, initialDestination?: string, initialNote?: string) => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

const STARTER_SUGGESTIONS = [
  'Plan a 7-day scenic road trip to Spiti Valley',
  'Recommend the best 5-day honeymoon in Kashmir with houseboat',
  'Family vacation to Vietnam (Hanoi + Da Nang) 6 nights',
  'What are the visa rules and costs for Dubai from Delhi?',
  'Flight + 4-Star Hotel packages for Bali for 2 adults',
  'Weekend mountain getaway from Vaishali/Noida',
];

export const TravelChatBot: React.FC<TravelChatBotProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: `Hello! I am your **Indoworld AI Travel Concierge**, based at our headquarters in **Suite UG SR-5B, Ansal Plaza, Sector 1, Vaishali (Ghaziabad)**.\n\nSince 2008, we have specialized in:\n* ✈️ **Domestic & International Flight Bookings**\n* 🏨 **Verified Star Hotels & Heritage Resorts**\n* 🗺️ **Customized Holiday Itineraries for ANY Destination**\n* 🛂 **Visa Assistance & Travel Insurance**\n\nWhere would you like to travel, or which itinerary can I plan for you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle incoming initial prompt from other sections
  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputText).trim();
    if (!prompt || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setLoading(true);

    try {
      // Prepare history for Gemini: array of { role: 'user' | 'model', text: string }
      const historyPayload = updatedMessages.slice(0, -1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Chat API returned an error');
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Thank you for your inquiry. How else may I assist your journey?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('Chat error fallback:', err);
      const fallbackBotMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: `I understand you want to plan your trip regarding **"${prompt}"**.\n\nOur Senior Holiday Consultants at **Ansal Plaza, Vaishali** can immediately curate a comprehensive proposal with:\n1. Direct airline quotes\n2. Verified 3/4/5-star accommodation vouchers\n3. Curated local sightseeing & tour experiences\n\nPlease feel free to contact our office directly at **${BUSINESS_INFO.displayPhone}** or click below to connect with our live WhatsApp desk!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackBotMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        role: 'model',
        text: `Conversation refreshed! How can our Vaishali travel specialist team help plan your next dream getaway? Type any destination or question below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Indoworld Tourism Services (Sector 1, Vaishali)! I was using your AI Travel Concierge and would like to speak to a consultant about planning our trip.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-white border-2 border-[#0B2545] ${
        isExpanded
          ? 'inset-4 sm:inset-10 md:inset-16 rounded-none'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[460px] h-[600px] max-h-[85vh] rounded-none'
      }`}
    >
      {/* Chat Window Header */}
      <div className="bg-[#0B2545] text-white px-4 py-3.5 flex items-center justify-between border-b-2 border-[#002FA7] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#002FA7] flex items-center justify-center text-white border border-white/20">
              <Compass className="w-4 h-4 text-[#DC2626]" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B2545]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
                Indoworld AI Travel Concierge
              </h3>
              <span className="bg-[#DC2626] text-white text-[8px] font-extrabold uppercase px-1.5 py-0.2 tracking-wider">
                Live
              </span>
            </div>
            <p className="text-[10px] text-[#FAF9F6]/75">
              Powered by Gemini 3.8 • Ansal Plaza, Vaishali Office Desk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-white/80">
          <button
            onClick={handleResetChat}
            className="p-1.5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:block"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trust Pill Header */}
      <div className="bg-[#FAF9F6] border-b border-gray-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-gray-600 shrink-0">
        <span className="flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          GST Verified Holiday Architect (Sector 1, Vaishali)
        </span>
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="text-[#002FA7] font-bold hover:underline flex items-center gap-1"
        >
          <Phone className="w-3 h-3" />
          {BUSINESS_INFO.displayPhone}
        </a>
      </div>

      {/* Messages Scrollable Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FA]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[#DC2626]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] p-3.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#002FA7] text-white shadow-xs'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-xs'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap font-sans">{msg.text}</p>
                ) : (
                  <div className="prose prose-xs max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#0B2545] prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-strong:text-[#0B2545]">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[9px] ${
                    isUser ? 'text-white/70 text-right' : 'text-gray-400 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-[#002FA7] text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-full bg-[#0B2545] text-white flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-[#DC2626]" />
            </div>
            <div className="bg-white text-gray-700 border border-gray-200 p-3.5 text-xs flex items-center gap-2 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#002FA7] animate-spin" />
              <span className="font-semibold text-[#0B2545]">
                Consulting flight routes, hotels & curated itineraries...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Chips */}
      {messages.length <= 3 && !loading && (
        <div className="p-2.5 bg-white border-t border-gray-200 shrink-0">
          <div className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#002FA7]" />
            <span>Suggested Inquiries:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {STARTER_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(sug)}
                className="bg-[#FAF9F6] hover:bg-[#002FA7] hover:text-white border border-gray-200 text-gray-700 text-[11px] px-2.5 py-1 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 bg-white border-t-2 border-[#0B2545] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about any destination, custom itinerary, hotels, or flights..."
            className="flex-1 text-xs sm:text-sm border border-gray-300 px-3.5 py-2.5 focus:border-[#002FA7] focus:outline-hidden text-[#0B2545] placeholder:text-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="bg-[#002FA7] hover:bg-[#0B2545] disabled:bg-gray-300 text-white p-2.5 sm:px-4 sm:py-2.5 transition-colors cursor-pointer flex items-center justify-center shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Desk Quick Connect Links */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
          <button
            onClick={() => onOpenInquiry('Custom Itinerary')}
            className="text-[#002FA7] font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Formal Quotation Form</span>
          </button>

          <button
            onClick={openWhatsApp}
            className="text-[#22C55E] font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Connect on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
