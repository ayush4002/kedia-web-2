import React from 'react';
import { Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_INFO } from '@/data/siteData';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Facebook,
  Instagram,
  Youtube,
  ArrowUpRight,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSiteVisitModalOpen } = useStore();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1520] text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Blueprint Grid Atmosphere */}
      <div className="absolute inset-0 bg-navy-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Col 1 & 2: Brand & Legacy Monograph */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <img
                src="/assets/logo-white.png"
                alt="Kedia Builders & Colonizers"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              "{COMPANY_INFO.tagline}"
            </p>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              Founded in 1980 by Founder &amp; Chairman Mr. Rajendra Kedia. Over four decades delivering 200+ land developments and boutique residences in Jaipur, Rajasthan.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4E845]" />
                <span>100% JDA Approved</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4E845]" />
                <span>RERA Escrow Sanctioned</span>
              </span>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#D4E845] hover:text-[#0B1F3A] border border-white/10 flex items-center justify-center text-white/80 transition-all shadow-xs"
                title="Facebook: Kediabuildandcolonizers"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#D4E845] hover:text-[#0B1F3A] border border-white/10 flex items-center justify-center text-white/80 transition-all shadow-xs"
                title="Instagram: @kediabuilders"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#D4E845] hover:text-[#0B1F3A] border border-white/10 flex items-center justify-center text-white/80 transition-all shadow-xs"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Key Developments */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4E845] mb-5 font-bold">
              Developments
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li><Link to="/projects/kedias-landmark" className="hover:text-white transition-colors">Kedia's Landmark</Link></li>
              <li><Link to="/projects/kedias-atulyam" className="hover:text-white transition-colors">Kedia's Atulyam</Link></li>
              <li><Link to="/projects/kedias-tulsi" className="hover:text-white transition-colors">Kedia's Tulsi (Bani Park)</Link></li>
              <li><Link to="/projects/jagannathpuri" className="hover:text-white transition-colors">Jagannathpuri</Link></li>
              <li><Link to="/projects/kedia-shri-vatsal" className="hover:text-white transition-colors">Kedia Shri Vatsal</Link></li>
              <li><Link to="/projects/kedias-umang" className="hover:text-white transition-colors">Kedia's Umang</Link></li>
              <li><Link to="/projects/kedia-aravali" className="hover:text-white transition-colors">Kedia Aravali</Link></li>
              <li><Link to="/projects/ganpati-greens" className="hover:text-white transition-colors">Ganpati Greens</Link></li>
              <li><Link to="/projects/nikunj-villas" className="hover:text-white transition-colors">Nikunj Villas</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform & Intelligence */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4E845] mb-5 font-bold">
              Company &amp; Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about#leadership" className="hover:text-white transition-colors">Executive Leadership</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery &amp; Awards</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">EMI &amp; Cost Sheet Tools</Link></li>
              <li><Link to="/nri" className="hover:text-white transition-colors">NRI Priority Desk</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/admin" className="text-[#D4E845] hover:text-white transition-colors font-mono font-bold">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* Col 5: Jaipur Headquarters */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4E845] mb-5 font-bold">
              Jaipur Headquarters
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/70">
              <p className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4E845] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.officeAddress}</span>
              </p>
              <p className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#D4E845] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-mono hover:text-white">
                  {COMPANY_INFO.phone}
                </a>
              </p>
              <p className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4E845] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white truncate">
                  {COMPANY_INFO.email}
                </a>
              </p>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setSiteVisitModalOpen(true)}
                  className="w-full py-3 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs text-center flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>Book Guided Site Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            © {new Date().getFullYear()} Kedia Builders &amp; Colonizers. All rights reserved. JDA &amp; RERA Sanctioned.
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4E845] hover:text-[#0B1F3A] border border-white/10 flex items-center justify-center text-white transition-all shadow-xs"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
