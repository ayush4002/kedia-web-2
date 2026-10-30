import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '@/router';
import { useStore } from '@/context/StoreContext';
import { PROJECTS } from '@/data/projectsData';
import { COMPANY_INFO } from '@/data/siteData';
import { formatINR } from '@/utils/media';
import {
  MessageSquare,
  Bot,
  X,
  Send,
  Calendar,
  Sparkles,
  MapPin,
  Home,
  CheckCircle2,
  Phone,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  projectSlugs?: string[];
  action?: 'schedule_visit' | 'explore_projects';
  timestamp: string;
}

export const AIChatbot: React.FC = () => {
  const { navigate } = useRouter();
  const { setSiteVisitModalOpen, addLead, showToast } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Namaste! I am the Kedia AI Architectural Concierge. Tell me your preferred location, budget, or configuration (plots, villas, or apartments), and I will curate Jaipur's finest addresses for you.",
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('kedia:open-ai-chat', handleOpen);
    return () => window.removeEventListener('kedia:open-ai-chat', handleOpen);
  }, []);

  const quickPrompts = [
    "Luxury Villas in Vaishali Nagar",
    "Residential Plots under ₹35 Lakhs",
    "Kedia's Tulsi in Bani Park",
    "Schedule a guided site visit"
  ];

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = messageText.toLowerCase();
      let replyText = "";
      let matchedSlugs: string[] = [];
      let replyAction: 'schedule_visit' | 'explore_projects' | undefined = undefined;

      if (lower.includes('visit') || lower.includes('tour') || lower.includes('appointment')) {
        replyText = "I would be delighted to arrange a chauffeured site visit with our senior architectural advisor. You can pick your preferred date and time slot right now.";
        replyAction = 'schedule_visit';
      } else if (lower.includes('vaishali') || lower.includes('nikunj') || lower.includes('ganpati') || lower.includes('amara')) {
        replyText = "In prime Vaishali Nagar, we feature premier boutique villa enclaves including Nikunj Villas and Ganpati Greens, designed with cusped arches and turnkey luxury specifications.";
        matchedSlugs = ['nikunj-villas', 'ganpati-greens', 'kedias-amara'];
      } else if (lower.includes('plot') || lower.includes('under') || lower.includes('35') || lower.includes('atulyam') || lower.includes('landmark')) {
        replyText = "For master-planned residential plotting, Kedia's Landmark on Ajmer Road SEZ corridor and Kedia's Atulyam on Sikar Road offer JDA-approved layouts starting from ₹24.8 Lakhs with full underground infrastructure.";
        matchedSlugs = ['kedias-landmark', 'kedias-atulyam', 'kedia-shri-vatsal'];
      } else if (lower.includes('tulsi') || lower.includes('apartment') || lower.includes('bani park') || lower.includes('flat')) {
        replyText = "Kedia's Tulsi is located in prestigious Bani Park, Jaipur, presenting elite 3 & 4 BHK apartments with double-height salons, terrace greens, and seamless metro connectivity.";
        matchedSlugs = ['kedias-tulsi'];
      } else if (lower.includes('umang') || lower.includes('aravali') || lower.includes('jagannathpuri')) {
        replyText = "Here are our signature family townships featuring Vastu-compliant layouts, paved wide boulevards, and dedicated clubhouse facilities.";
        matchedSlugs = ['kedias-umang', 'kedia-aravali', 'jagannathpuri'];
      } else {
        replyText = "Across our 16 JDA-approved developments in Jaipur, we offer plotted enclaves from ₹24.8 Lakhs and turnkey luxury villas up to ₹98 Lakhs. Here are our top featured ongoing projects:";
        matchedSlugs = ['kedias-landmark', 'kedias-atulyam', 'nikunj-villas', 'kedias-tulsi'];
      }

      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        text: replyText,
        projectSlugs: matchedSlugs.length > 0 ? matchedSlugs : undefined,
        action: replyAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Kedia AI Concierge"
        className="fixed bottom-20 right-5 z-40 bg-[#0E1520] text-[#D4E845] border border-white/15 hover:bg-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group"
      >
        <Bot className="w-6 h-6 text-[#D4E845] group-hover:rotate-12 transition-transform" />
        <span className="sr-only">Kedia AI Concierge</span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4E845] rounded-full animate-ping" />
      </button>

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] max-h-[600px] bg-[#0E1520] border border-white/15 rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-white animate-slideIn">
          {/* Header */}
          <div className="p-5 bg-[#0E1520] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#D4E845]/20 border border-[#D4E845]/30 flex items-center justify-center text-[#D4E845]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono tracking-wider uppercase font-bold text-white">
                  Kedia AI Concierge
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Online &middot; Jaipur Real Estate Expert</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0E1520]/95 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#D4E845] text-[#0E1520] font-semibold rounded-tr-none'
                      : 'bg-white/10 border border-white/10 text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Curated Project Cards */}
                  {msg.projectSlugs && msg.projectSlugs.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/15 space-y-2">
                      {msg.projectSlugs.map(slug => {
                        const pr = PROJECTS.find(p => p.slug === slug);
                        if (!pr) return null;
                        return (
                          <div
                            key={pr.slug}
                            onClick={() => {
                              setIsOpen(false);
                              navigate(`/projects/${pr.slug}`);
                            }}
                            className="bg-white/5 hover:bg-white/15 p-2.5 rounded-xl border border-white/10 cursor-pointer transition-colors flex items-center justify-between"
                          >
                            <div>
                              <span className="font-display font-bold text-white text-xs block">{pr.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{pr.type} &middot; {pr.location}</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#D4E845] font-bold">
                              {pr.priceLabel} ↗
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Site Visit Trigger Action */}
                  {msg.action === 'schedule_visit' && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          setSiteVisitModalOpen(true);
                        }}
                        className="w-full py-2.5 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold text-xs font-mono uppercase tracking-wider rounded-full transition-colors flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Open Site Visit Scheduler</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 text-[#D4E845] bg-white/10 p-2.5 rounded-2xl w-fit">
                <span className="w-2 h-2 bg-[#D4E845] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#D4E845] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-[#D4E845] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-3 bg-white/5 border-t border-white/10 overflow-x-auto flex space-x-2 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-mono text-slate-200 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-[#0E1520] border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about budget, villas, plots, or visits..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4E845] font-sans"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] flex items-center justify-center font-bold transition-colors"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
