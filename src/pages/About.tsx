import React from 'react';
import { Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import {
  COMPANY_INFO,
  TEAM_MEMBERS,
  TIMELINE_MILESTONES,
  WHY_INVEST_POINTS,
  CHAIRMAN_MESSAGE,
} from '@/data/siteData';
import { getMediaUrl } from '@/utils/media';
import {
  ShieldCheck,
  Award,
  Trees,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
  Compass,
  FileCheck2,
  Home as HomeIcon,
  Sparkles
} from 'lucide-react';

export const About: React.FC = () => {
  const { setSiteVisitModalOpen } = useStore();

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Banner */}
        <section className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-16 mb-12 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              Since 1980 &middot; Jaipur Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Four Decades of Trust, <br />
              <span className="text-[#D4E845]">Turning Vision into Reality.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              A pioneering name in Jaipur's real estate — creating notable footprints in master-planned plotted developments and boutique luxury residences.
            </p>
          </div>
        </section>

        {/* Story & Metrics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white border border-[#E5E7EB] text-[#0E1520] font-semibold">
                The Genesis
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0E1520] tracking-tight">
                Shaping Jaipur's Horizon Since 1980
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                <p>
                  Founder &amp; Chairman Mr. Rajendra Kedia laid the keystone of Kedia Builders &amp; Colonizers in 1980, creating notable footprints in construction for over four decades. Today the succeeding generation — Director Mr. Saurabh Kedia and CEO Mr. Gaurav Kedia — aspire to spread their wings wider and help you accomplish your idea of a dream home.
                </p>
                <p>
                  Headquartered in Jaipur, our portfolio covers property development and property management services, with 200+ land development projects completed. Our projects are designed for every segment, and we keep pace with a fast-changing world by building with modern equipment and sustainable methods.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E5E7EB]">
                <div>
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#0E1520] block">1980</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">Established</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#0E1520] block">44+</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">Years Building</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#0E1520] block">200+</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">Developments</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#0E1520] block">15,000+</span>
                  <span className="text-xs font-mono text-slate-500 uppercase">Patrons</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-[32px] overflow-hidden shadow-xl border border-[#E5E7EB] group">
                <img
                  src="/media/img/2021/04/Kedia-Amara-4-900.webp"
                  alt="Kedia Community"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1520]/80 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-5 left-5 right-5 bg-[#0E1520]/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-xs font-mono text-white">
                  "Real estate is the sacred canvas where generations build their cherished memories."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 bg-white rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold">
                Guiding North Star
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520]">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Kedia Builders &amp; Colonizers strives to live up to traditional wisdom infused with modern concepts. Change is constant, and the quality of our projects reflects our upgraded technologies. We aspire to play an imperative role in building a new India and to be the first name in trusted real estate.
              </p>
            </div>

            <div className="p-8 sm:p-10 bg-white rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold">
                Enduring Promise
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520]">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                World-class construction, integrity of commitment, prompt delivery and security of investment are the guiding principles of this trusted company. Qualified professionals maintain the standard in designing and constructing the dreams of our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Founder & Chairman Message */}
        <section className="mb-16 rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-5 text-center">
              <div className="relative mx-auto max-w-xs overflow-hidden rounded-[24px] border border-white/20 shadow-2xl bg-[#0E1520] aspect-[4/5]">
                <img
                  src="/media/img/2021/04/Mr-Rajendra-Kedia-Chairman.webp"
                  alt="Mr. Rajendra Kedia - Founder & Chairman"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1520]/90 via-transparent to-transparent opacity-60" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-[#D4E845] bg-[#0E1520] flex items-center justify-center text-[#D4E845] font-display text-3xl mb-3 shadow-lg">
                    RK
                  </div>
                  <span className="font-display text-lg text-white font-bold block">
                    Mr. Rajendra Kedia
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4E845] mt-1">
                    Founder &amp; Chairman
                  </span>
                  <span className="text-[9px] font-mono text-slate-300 mt-0.5">
                    Guiding Light Since 1980
                  </span>
                </div>
              </div>
              <div className="mt-4 font-mono text-xs text-[#D4E845]">
                Founding Chairman &middot; 44+ Years Building Jaipur
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15 mb-2">
                  Chairman's Monograph
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                  A Message from the Founder
                </h2>
              </div>

              <div className="relative pl-6 border-l-2 border-[#D4E845] space-y-4">
                <p className="text-base sm:text-lg font-serif italic text-slate-200 leading-relaxed">
                  "{CHAIRMAN_MESSAGE.quote}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  When I laid the foundation of Kedia Builders &amp; Colonizers over four decades ago, Jaipur was beginning a transformative era of planned urban expansion. We resolved that every single plot sanctioned under our banner must provide unassailable legal certainty, Vastu harmony, and enduring capital appreciation for the families trusting us with their life savings.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Today, seeing the next generation — Director Mr. Saurabh Kedia and CEO Mr. Gaurav Kedia — infuse modern construction engineering while honoring these foundational tenets fills me with immense pride.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-base text-white font-bold">Mr. Rajendra Kedia</h4>
                  <span className="text-[11px] font-mono text-[#D4E845] block">Founder &amp; Chairman, Kedia Builders &amp; Colonizers</span>
                </div>
                <div className="font-mono text-slate-400 text-xs">
                  Est. 1980 &middot; Jaipur
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
              Principals &amp; Custodians
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0E1520] tracking-tight">
              Executive Leadership
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-light">
              Guiding Kedia Builders &amp; Colonizers with integrity, innovation, and architectural stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="bg-white p-6 rounded-[32px] border border-[#E5E7EB] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="relative mb-5 rounded-2xl overflow-hidden border border-[#E5E7EB] aspect-square">
                    <img
                      src={getMediaUrl(member.photo, 600)}
                      alt={member.name}
                      className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#D4E845]/20 text-[#0E1520] font-bold mb-2">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#0E1520] mb-2">{member.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Invest in Kedia */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
              Why Choose Kedia
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0E1520] tracking-tight">
              Invest Today for a Better Tomorrow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_INVEST_POINTS.map(item => (
              <div key={item.id} className="bg-white p-8 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-3">
                <span className="text-xs font-mono text-[#0E1520] font-bold block uppercase tracking-wider">{item.subtitle}</span>
                <h3 className="text-lg font-display font-bold text-[#0E1520]">{item.title}</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Historical Milestones */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
              Chronology of Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0E1520] tracking-tight">Milestones Since 1980</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIMELINE_MILESTONES.map(m => (
              <div key={m.year} className="bg-white p-8 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-2">
                <span className="text-3xl font-display font-bold text-[#0E1520] block">{m.year}</span>
                <h4 className="text-base font-display font-bold text-[#0E1520]">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{m.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
