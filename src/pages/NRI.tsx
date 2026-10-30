import React from 'react';
import { useStore } from '@/context/StoreContext';
import { COMPANY_INFO } from '@/data/siteData';
import { Globe, ShieldCheck, Video, FileText, Phone, MessageCircle, ArrowRight } from 'lucide-react';

export const NRI: React.FC = () => {
  const { setSiteVisitModalOpen } = useStore();

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Banner */}
        <section className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-14 mb-12 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              International Patrons Desk &middot; Global Gateway
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              NRI Real Estate Investment Gateway
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
              Seamless cross-border property acquisition in Jaipur. Dedicated relationship managers, virtual walk-throughs, Power of Attorney compliance, and end-to-end leasing management.
            </p>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E5E7EB] flex items-center justify-center text-[#0E1520] mb-2">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#0E1520]">Virtual Site Inspection</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Live scheduled video walk-throughs with project architects. Detailed drone fly-throughs, progress milestones, and spatial orientation via WhatsApp video or Zoom.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E5E7EB] flex items-center justify-center text-[#0E1520] mb-2">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#0E1520]">FEMA &amp; Legal Compliance</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Complete guidance on NRE / NRO banking transactions, repatriable funds, Power of Attorney (PoA) stamping, and digital Agreement for Sale documentation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E5E7EB] flex items-center justify-center text-[#0E1520] mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#0E1520]">Asset &amp; Tenancy Management</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Turnkey post-possession assistance including property tax compliance, society maintenance handling, and tenant screening for rental returns in high-demand Jaipur zones.
            </p>
          </div>
        </div>

        {/* NRI Consultation CTA Box */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-14 border border-white/10 relative overflow-hidden shadow-2xl text-center max-w-4xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#D4E845]/20 text-[#D4E845] flex items-center justify-center mx-auto">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Schedule an NRI Virtual Consultation
          </h2>
          <p className="text-sm text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
            Our international relationship managers are available across North America (EST/PST), UK (GMT), and Middle East (GST) time zones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setSiteVisitModalOpen(true, "NRI Priority Consultation")}
              className="px-8 py-4 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide rounded-full transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group"
            >
              <span>Request Video Appointment</span>
              <span className="w-6 h-6 rounded-full bg-[#0E1520] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi Kedia Builders, I am an NRI interested in property investment in Jaipur.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 border border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 font-mono text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp NRI Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
