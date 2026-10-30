import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { PROJECTS, getFeaturedProjects } from '@/data/projectsData';
import {
  COMPANY_INFO,
  TEAM_MEMBERS,
  WHY_INVEST_POINTS,
  TESTIMONIALS,
} from '@/data/siteData';
import { formatINR, getMediaUrl } from '@/utils/media';
import { LivingBlueprintMap } from '@/components/common/LivingBlueprintMap';
import { ArchitecturalBlueprintDrawings } from '@/components/common/ArchitecturalBlueprintDrawings';
import {
  Search,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
  Trees,
  Home as HomeIcon,
  Sparkles,
  Heart,
  Scale,
  Award,
  Check,
  MapPin,
  Clock,
  PhoneCall,
  SlidersHorizontal,
  Play,
  X,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Building2,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

// Animated Counter for Heritage Stats
const CountingNumeral: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = '', duration = 1600 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 40;
    const increment = target / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const {
    units,
    toggleShortlist,
    isShortlisted,
    toggleCompare,
    isCompared,
    setSiteVisitModalOpen,
  } = useStore();
  const { t } = useLanguage();

  // Video Tour Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Search Bar Filter States
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('all');
  const [searchType, setSearchType] = useState('all');
  const [searchStatus, setSearchStatus] = useState('all');
  const [searchBhk, setSearchBhk] = useState('all');

  // Home Inventory View Mode: 'cards' or 'blueprint'
  const [inventoryMode, setInventoryMode] = useState<'cards' | 'blueprint'>('cards');
  const [selectedProjectType, setSelectedProjectType] = useState<'all' | 'Villas' | 'Residential Plots' | 'Apartments'>('all');

  const featuredProjects = getFeaturedProjects();

  const filteredProjects = selectedProjectType === 'all'
    ? featuredProjects
    : featuredProjects.filter(p => p.type === selectedProjectType);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: string[] = [];
    if (searchLocation !== 'all') params.push(`location=${encodeURIComponent(searchLocation)}`);
    if (searchType !== 'all') params.push(`type=${encodeURIComponent(searchType)}`);
    if (searchStatus !== 'all') params.push(`status=${encodeURIComponent(searchStatus)}`);
    if (searchBhk !== 'all') params.push(`bedrooms=${encodeURIComponent(searchBhk)}`);
    navigate(`/projects?${params.join('&')}`);
  };

  const tickerItems = [
    { label: t('ticker_1'), img: "/media/img/2025/04/DJI_0788-3-scaled-900.webp" },
    { label: t('ticker_2'), img: "/media/img/2025/04/DSC07902-900.webp" },
    { label: t('ticker_3'), img: "/media/img/2025/04/DJI_0744-scaled-900.webp" },
    { label: t('ticker_4'), img: "/media/img/2025/04/LANDMARK-001-900.webp" },
    { label: t('ticker_5'), img: "/media/img/2025/04/DSC07808-900.webp" },
    { label: t('ticker_6'), img: "/media/img/2025/04/DJI_0791-900.webp" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111827] font-sans selection:bg-[#D4E845] selection:text-[#0B1F3A]">

      {/* ========================================================
          1. HERO SECTION (SPACIAZ ASYMMETRIC HERO)
          ======================================================== */}
      <section className="pt-24 sm:pt-28 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Tall vertical architectural card (Spaciaz Hero Image) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-[#0B1F3A] aspect-[4/5] sm:aspect-[3/4] lg:h-[620px] w-full border border-black/5 group">
              {/* Drone / Villa Footage or High-Res Architectural Visual */}
              <img
                src="/media/img/2025/04/LANDMARK-001-1920.webp"
                alt="Kedia Architectural Masterpiece"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle Blueprint Grid Lines in Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Chip Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                <div className="bg-[#0B1F3A]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4E845] animate-ping" />
                  <span>JAIPUR · RAJASTHAN</span>
                </div>
                <div className="bg-[#D4E845] text-[#0B1F3A] px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-tight shadow-md">
                  JDA APPROVED
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Typography, Pill CTA, 44+ Years Badge & Video Pill */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center lg:pl-4">
            
            {/* Superhead Tag */}
            <div className="inline-flex items-center space-x-2 w-fit mb-5">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-white border border-[#E5E7EB] text-[#0B1F3A] shadow-xs">
                {t('hero_eyebrow')}
              </span>
              <span className="text-xs font-medium text-[#6B7280]">Pioneering Rajasthan Real Estate</span>
            </div>

            {/* Bold Spaciaz Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0B1F3A] tracking-tight leading-[1.08]">
              {t('hero_title_line1')} <br className="hidden sm:inline" />{t('hero_title_line2')}
            </h1>

            {/* Editorial Subhead */}
            <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl font-normal">
              {t('hero_subtitle')}
            </p>

            {/* Pill CTA Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-3 bg-white border border-[#E5E7EB] hover:border-[#0B1F3A] text-[#0B1F3A] pl-6 pr-2.5 py-2.5 rounded-full font-semibold shadow-sm hover:shadow-md transition-all group"
              >
                <span className="text-sm tracking-wide">{t('hero_cta_projects')}</span>
                <span className="w-8 h-8 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold text-sm group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="inline-flex items-center space-x-2 bg-transparent hover:bg-white text-[#4B5563] hover:text-[#0B1F3A] px-5 py-3 rounded-full text-sm font-medium border border-transparent hover:border-[#E5E7EB] transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{searchOpen ? 'Close Search' : t('search_cta')}</span>
              </button>
            </div>

            {/* Collapsible Quick Search Bar */}
            {searchOpen && (
              <form onSubmit={handleSearchSubmit} className="mt-6 p-5 bg-white rounded-[24px] border border-[#E5E7EB] shadow-md animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6B7280] mb-1">Corridor</label>
                    <select
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-2 text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                    >
                      <option value="all">All Corridors</option>
                      <option value="Ajmer Road">Ajmer Road</option>
                      <option value="Sikar Road">Sikar Road</option>
                      <option value="Sirsi Road">Sirsi Road</option>
                      <option value="Bani Park">Bani Park</option>
                      <option value="Kalwar Road">Kalwar Road</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6B7280] mb-1">Typology</label>
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-full text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-2 text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                    >
                      <option value="all">All Typologies</option>
                      <option value="Villas">Villas</option>
                      <option value="Residential Plots">Plots</option>
                      <option value="Apartments">Apartments</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#6B7280] mb-1">Configuration</label>
                    <select
                      value={searchBhk}
                      onChange={(e) => setSearchBhk(e.target.value)}
                      className="w-full text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-2 text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                    >
                      <option value="all">Any BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="Plots">Residential Plots</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-[#0B1F3A] hover:bg-[#123D70] text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Bottom Row in Hero: Spaciaz "44 years of experiences" + Pill Video Preview */}
            <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-6">
              
              {/* Spaciaz Signature Badge: "44 years of experiences" */}
              <div className="flex items-center space-x-3.5">
                <div className="w-16 h-16 rounded-full bg-[#D4E845] flex items-center justify-center font-display font-extrabold text-2xl text-[#0B1F3A] shadow-sm flex-shrink-0">
                  <CountingNumeral target={44} suffix="+" />
                </div>
                <div className="leading-tight">
                  <span className="block font-display font-bold text-sm sm:text-base text-[#0B1F3A]">{t('hero_years_badge')}</span>
                  <span className="text-[11px] text-[#6B7280] font-mono uppercase tracking-wider">{t('diff_eyebrow')}</span>
                </div>
              </div>

              {/* Spaciaz Video Tour Pill with "Watch ▶" */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center space-x-3 bg-white/90 hover:bg-white border border-[#E5E7EB] hover:border-[#0B1F3A] pl-2 pr-5 py-2 rounded-full shadow-sm hover:shadow transition-all group"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0">
                  <img
                    src="/media/img/2025/04/DJI_0788-3-scaled-900.webp"
                    alt="Aerial Video Preview"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/40 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-[#0B1F3A] tracking-wide">{t('hero_drone_tour')}</span>
                  <span className="text-[11px] text-[#6B7280]">{t('hero_2min')}</span>
                </div>
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. SECTION 2: "WE DEVELOPED LANDMARK REAL ESTATE PROJECTS"
             (Spaciaz 3-Card Signature Layout with Corner Cutout Arrow)
          ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white border border-[#E5E7EB] text-[#0B1F3A] mb-3 shadow-xs">
            WHO WE ARE
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight">
            We developed landmark real estate projects
          </h2>
        </div>

        {/* 3 Distinct Signature Spaciaz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* CARD 01: "What we do" (Dark Navy Card #0F1722) */}
          <div className="rounded-[32px] p-8 sm:p-10 bg-[#0F1724] text-white flex flex-col justify-between relative shadow-xl hover:-translate-y-1.5 transition-transform duration-300 overflow-hidden min-h-[460px]">
            <div>
              <span className="font-mono text-sm text-white/50 tracking-wider">{t('card1_num')}</span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mt-10 mb-4 tracking-tight">
                {t('card1_title')}
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {t('card1_desc')}
              </p>
            </div>

            <div className="pt-10 flex items-center justify-between">
              <Link
                to="/projects"
                className="text-xs font-mono uppercase tracking-widest text-[#D4E845] hover:text-white transition-colors underline underline-offset-4"
              >
                {t('card1_link')}
              </Link>

              {/* Bottom Right Signature Notch Arrow */}
              <Link
                to="/projects"
                className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform"
                title="Explore Solutions"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* CARD 02: "Our impact" (Lime-Yellow Accent Card #D4E845) */}
          <div className="rounded-[32px] p-8 sm:p-10 bg-[#D4E845] text-[#0B1F3A] flex flex-col justify-between relative shadow-xl hover:-translate-y-1.5 transition-transform duration-300 overflow-hidden min-h-[460px]">
            <div>
              <span className="font-mono text-sm text-[#0B1F3A]/60 tracking-wider">{t('card2_num')}</span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1F3A] mt-10 mb-4 tracking-tight">
                {t('card2_title')}
              </h3>
              <p className="text-[#0B1F3A]/85 text-sm sm:text-base leading-relaxed">
                {t('card2_desc')}
              </p>
            </div>

            {/* Architectural Building Facade Cutout Graphic */}
            <div className="my-4 overflow-hidden rounded-xl opacity-90">
              <img
                src="/media/img/2025/04/DJI_0744-scaled-900.webp"
                alt="Architectural Impact"
                className="w-full h-24 object-cover object-center rounded-xl filter contrast-125"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/projects"
                className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] hover:opacity-75 transition-opacity underline underline-offset-4 font-semibold"
              >
                {t('card2_link')}
              </Link>

              {/* Bottom Right Signature Notch Arrow */}
              <Link
                to="/projects"
                className="w-12 h-12 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform"
                title="View All Projects"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* CARD 03: "Core values" (Dark Image Backdrop Card #182230) */}
          <div className="rounded-[32px] p-8 sm:p-10 bg-[#16202E] text-white flex flex-col justify-between relative shadow-xl hover:-translate-y-1.5 transition-transform duration-300 overflow-hidden min-h-[460px]">
            {/* Photographic Background Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
              style={{ backgroundImage: `url('/media/img/2025/04/IMG_4413-900.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16202E] via-[#16202E]/80 to-[#16202E]/60 pointer-events-none" />

            <div className="relative z-10">
              <span className="font-mono text-sm text-white/50 tracking-wider">{t('card3_num')}</span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mt-10 mb-4 tracking-tight">
                {t('card3_title')}
              </h3>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                {t('card3_desc')}
              </p>
            </div>

            <div className="pt-10 flex items-center justify-between relative z-10">
              <Link
                to="/about"
                className="text-xs font-mono uppercase tracking-widest text-[#D4E845] hover:text-white transition-colors underline underline-offset-4"
              >
                {t('card3_link')}
              </Link>

              {/* Bottom Right Signature Notch Arrow */}
              <Link
                to="/about"
                className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform"
                title="Learn About Kedia"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          3. SECTION 3: CAPSULE / PILL TICKER STRIP (SPACIAZ TICKER)
          ======================================================== */}
      <section className="py-6 border-y border-[#E5E7EB] bg-white overflow-hidden relative select-none">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-10 text-sm font-medium text-[#0E1520]">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-10 flex-shrink-0">
                <span className="whitespace-nowrap font-display text-sm sm:text-base font-semibold text-[#0E1520] tracking-wide">
                  {item.label}
                </span>
                <div className="w-16 sm:w-20 h-8 sm:h-9 rounded-full overflow-hidden shadow-xs border border-[#E5E7EB] flex-shrink-0 bg-slate-100">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION 4: ARCHITECTURAL SKYLINE STATS BANNER
             (Full-Width Dark Banner with Vertical Hairline Dimension Pins)
          ======================================================== */}
      <section className="bg-[#0B1320] text-white relative py-20 sm:py-28 overflow-hidden">
        
        {/* Twilight Skyline Background with Blueprint Grid & Mist */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter contrast-125 pointer-events-none"
          style={{ backgroundImage: `url('/media/img/2025/04/DJI_0788-3-scaled-900.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1320] via-transparent to-[#0B1320] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center sm:text-left">
            
            {/* STAT 1: 44+ / 200+ */}
            <div className="relative pl-0 sm:pl-6">
              {/* Vertical Dimension Hairline */}
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4E845]/60 to-transparent">
                <span className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#D4E845]" />
              </div>

              <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                <CountingNumeral target={200} suffix="+" />
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-white/70">
                completed land projects
              </p>
              <span className="text-[11px] text-[#D4E845] font-mono">Since 1980</span>
            </div>

            {/* STAT 2: 16+ */}
            <div className="relative pl-0 sm:pl-6">
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4E845]/60 to-transparent">
                <span className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#D4E845]" />
              </div>

              <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                <CountingNumeral target={16} suffix="+" />
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-white/70">
                projects in development
              </p>
              <span className="text-[11px] text-[#D4E845] font-mono">Active Corridors</span>
            </div>

            {/* STAT 3: 2.3b+ */}
            <div className="relative pl-0 sm:pl-6">
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4E845]/60 to-transparent">
                <span className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#D4E845]" />
              </div>

              <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                ₹2.5B+
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-white/70">
                portfolio valuation
              </p>
              <span className="text-[11px] text-[#D4E845] font-mono">Secured & Escrowed</span>
            </div>

            {/* STAT 4: 18m+ */}
            <div className="relative pl-0 sm:pl-6">
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4E845]/60 to-transparent">
                <span className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#D4E845]" />
              </div>

              <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                18M+
              </div>
              <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-white/70">
                square feet developed
              </p>
              <span className="text-[11px] text-[#D4E845] font-mono">15,000+ Happy Families</span>
            </div>

          </div>

          {/* Floating bottom right scroll/action button */}
          <div className="mt-12 flex justify-end">
            <button
              onClick={() => {
                const el = document.getElementById('featured-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold shadow-lg hover:scale-110 transition-transform"
              title="View Projects"
            >
              <ArrowRight className="w-5 h-5 rotate-90" />
            </button>
          </div>

        </div>

      </section>

      {/* ========================================================
          5. SECTION 5: "WHAT MAKES US DIFFERENT" (SPACIAZ 2-COL GRID)
          ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Tall vertical portrait card with headline */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] overflow-hidden shadow-xl min-h-[500px] lg:h-[580px] bg-[#0B1F3A] flex flex-col justify-end p-8 sm:p-10 text-white">
              <img
                src="/media/img/2025/04/DSC07902-1920.webp"
                alt="Construction Excellence"
                className="absolute inset-0 w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent" />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#D4E845] text-[#0B1F3A] font-bold mb-4">
                  THE KEDIA PROMISE
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-snug">
                  What makes us different
                </h2>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Founded in 1980 by Mr. Rajendra Kedia, our legacy is built on unshakeable integrity, JDA approvals, and engineering precision that withstands generations.
                </p>

                <div className="mt-6 pt-6 border-t border-white/20 flex items-center space-x-4">
                  <div className="text-2xl font-display font-extrabold text-[#D4E845]">41+</div>
                  <div className="text-xs text-white/70 leading-tight">Years of continuous land development excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 2x3 Grid of Feature Cards with Circular Lime Badges */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Feature 1: Exclusive Record */}
              <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold mb-4 shadow-xs">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">Exclusive Record</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  An impeccable, untarnished track record in the Jaipur real estate market across 41+ uninterrupted years.
                </p>
              </div>

              {/* Feature 2: Connectivity */}
              <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold mb-4 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">Prime Connectivity</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  Well-connected, thriving locations spanning Ajmer Road, Sirsi Road, Bani Park, and Sikar Road.
                </p>
              </div>

              {/* Feature 3: World-Class Comfort */}
              <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold mb-4 shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">Comprehensive Comfort</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  Clubhouses, landscaped gardens, 24/7 security surveillance, and premium lifestyle amenities for the entire family.
                </p>
              </div>

              {/* Feature 4: Peaceful Environment */}
              <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold mb-4 shadow-xs">
                  <Trees className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">Peaceful Environment</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  Thoughtfully situated away from urban noise and pollution, surrounded by fresh air and serene landscapes.
                </p>
              </div>

              {/* Feature 5: JDA Approvals */}
              <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold mb-4 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">100% JDA Approvals</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  Every township holds JDA sanctions, verified clear titles, and statutory RERA escrow protection.
                </p>
              </div>

              {/* Feature 6: Harmony with Nature */}
              <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center font-bold mb-4 shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">Harmony with Nature</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  100% Vastu-compliant architecture, rainwater harvesting shafts, and eco-friendly villa designs.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. SECTION 6: "DISCOVER LUXURY LIVING AT AN AFFORDABLE PRICE"
             (Dark Rounded Showcase Container with Blueprint Toggle)
          ======================================================== */}
      <section id="featured-collection" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Blueprint Grid Background */}
          <div className="absolute inset-0 bg-navy-blueprint opacity-30 pointer-events-none" />

          {/* Container Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4E845]">
                SIGNATURE DEVELOPMENTS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-2">
                {t('dossiers_title')}
              </h2>
              <p className="mt-2 text-white/70 text-sm sm:text-base max-w-2xl">
                {t('dossiers_subtitle')}
              </p>
            </div>

            {/* Mode & Category Filter Switches */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Card View vs Blueprint Map View */}
              <div className="bg-[#182230] p-1 rounded-full border border-white/10 flex items-center space-x-1">
                <button
                  onClick={() => setInventoryMode('cards')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    inventoryMode === 'cards'
                      ? 'bg-[#D4E845] text-[#0B1F3A] font-bold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t('tab_project_dossiers')}
                </button>
                <button
                  onClick={() => setInventoryMode('blueprint')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-1 ${
                    inventoryMode === 'blueprint'
                      ? 'bg-[#D4E845] text-[#0B1F3A] font-bold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>{t('tab_living_blueprint')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              </div>
            </div>
          </div>

          {/* VIEW 1: Project Dossier Cards */}
          {inventoryMode === 'cards' && (
            <div className="relative z-10 mt-10">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {(['all', 'Villas', 'Residential Plots', 'Apartments'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedProjectType(type)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                      selectedProjectType === type
                        ? 'bg-white text-[#0B1F3A] font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>

              {/* Grid of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-[#16202E] border border-white/10 rounded-[28px] overflow-hidden flex flex-col justify-between hover:border-[#D4E845]/50 transition-all duration-300"
                  >
                    {/* Project Hero Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={getMediaUrl(project.cover, 900)}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16202E] via-transparent to-black/20" />

                      {/* Location Badge */}
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-white flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#D4E845]" />
                        <span>{project.location}</span>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4 bg-[#D4E845] text-[#0B1F3A] px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase">
                        {project.status}
                      </div>

                      {/* Price Tag */}
                      <div className="absolute bottom-3 left-4">
                        <span className="text-[11px] font-mono text-white/70 block uppercase tracking-wider">Starting From</span>
                        <span className="font-display font-extrabold text-xl text-white">
                          {formatINR(project.startingPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#D4E845] transition-colors">
                          {project.name}
                        </h3>
                        <p className="mt-2 text-xs text-white/70 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
                          <span>{project.configs[0]?.label || project.type}</span>
                          <span>{project.unitsCount.available} Units Left</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#D4E845] hover:text-white transition-colors"
                        >
                          <span>Explore Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => setSiteVisitModalOpen(true, project.name)}
                          className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white text-white hover:text-[#0B1F3A] transition-all"
                        >
                          Book Visit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center space-x-3 bg-[#D4E845] text-[#0B1F3A] hover:bg-[#c6db34] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all"
                >
                  <span>Browse All 16 Kedia Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          )}

          {/* VIEW 2: Interactive Living Blueprint Map View */}
          {inventoryMode === 'blueprint' && (
            <div className="relative z-10 mt-8">
              <LivingBlueprintMap
                units={units}
                enableProjectSwitcher={true}
              />
            </div>
          )}

        </div>
      </section>

      {/* ========================================================
          7. SECTION 7: "EXECUTIVE LEADERSHIP" (SPACIAZ 3-CARD LEADERSHIP)
          ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white border border-[#E5E7EB] text-[#0B1F3A] mb-3 shadow-xs">
            FOUR DECADES OF INTEGRITY
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight">
            Executive leadership
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
            The pioneering minds guiding Rajasthan's real estate evolution with traditional wisdom and modern construction technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEADER 1: Mr. Rajendra Kedia */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1F3A]">
              <img
                src={getMediaUrl(TEAM_MEMBERS[0].photo, 900)}
                alt={TEAM_MEMBERS[0].name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono tracking-widest bg-[#D4E845] text-[#0B1F3A] px-2.5 py-1 rounded-full font-bold uppercase">
                  FOUNDER & CHAIRMAN
                </span>
                <h3 className="font-display font-bold text-2xl mt-2">{TEAM_MEMBERS[0].name}</h3>
                <p className="text-xs text-white/80 font-mono">Since 1980 · 4+ Decades of Footprints</p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Laid the foundation in 1980 and pioneered master land development in Jaipur, delivering over 200+ residential and commercial landmarks.
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <Link to="/about" className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] hover:text-[#C8A24B] font-semibold flex items-center space-x-1">
                  <span>Chairman's Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-[#6B7280]">200+ Projects</span>
              </div>
            </div>
          </div>

          {/* LEADER 2: Mr. Saurabh Kedia */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1F3A]">
              <img
                src={getMediaUrl(TEAM_MEMBERS[1].photo, 900)}
                alt={TEAM_MEMBERS[1].name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono tracking-widest bg-white text-[#0B1F3A] px-2.5 py-1 rounded-full font-bold uppercase">
                  DIRECTOR
                </span>
                <h3 className="font-display font-bold text-2xl mt-2">{TEAM_MEMBERS[1].name}</h3>
                <p className="text-xs text-white/80 font-mono">{TEAM_MEMBERS[1].education}</p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Master's from Bhawani Niketan; about 10 years in the business. Hands-on leader setting the highest standards for construction quality, engineering rigor, and prompt handovers.
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <Link to="/about" className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] hover:text-[#C8A24B] font-semibold flex items-center space-x-1">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-[#6B7280]">10+ Yrs Exp</span>
              </div>
            </div>
          </div>

          {/* LEADER 3: Mr. Gaurav Kedia */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1F3A]">
              <img
                src={getMediaUrl(TEAM_MEMBERS[2].photo, 900)}
                alt={TEAM_MEMBERS[2].name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono tracking-widest bg-white text-[#0B1F3A] px-2.5 py-1 rounded-full font-bold uppercase">
                  CHIEF EXECUTIVE OFFICER
                </span>
                <h3 className="font-display font-bold text-2xl mt-2">{TEAM_MEMBERS[2].name}</h3>
                <p className="text-xs text-white/80 font-mono">{TEAM_MEMBERS[2].education}</p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                B.Com from Commerce College; about 8 years in the business. The behind-the-scenes strategist studying buyer demographics to create highly desirable and functional modern residences.
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <Link to="/about" className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] hover:text-[#C8A24B] font-semibold flex items-center space-x-1">
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-[#6B7280]">8+ Yrs Exp</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          8. SECTION 8: "RECOGNITIONS WE GOT" (AWARDS & TRUST SEALS)
          ======================================================== */}
      <section className="py-12 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">ACCREDITATIONS</span>
              <h3 className="font-display font-bold text-2xl text-[#0B1F3A]">Recognitions we got</h3>
            </div>
            <p className="text-xs text-[#6B7280] max-w-md">
              Honoring four decades of ethical real estate development, JDA compliance, and consumer trust across Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB] text-center">
              <span className="font-mono text-[11px] text-[#6B7280] uppercase">2024 ICON</span>
              <h4 className="font-display font-bold text-base text-[#0B1F3A] mt-1">Rajasthan Realty Icon</h4>
              <p className="text-[11px] text-[#6B7280] mt-1">Credai Rajasthan</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB] text-center">
              <span className="font-mono text-[11px] text-[#6B7280] uppercase">JDA SANCTIONED</span>
              <h4 className="font-display font-bold text-base text-[#0B1F3A] mt-1">Best Master Township</h4>
              <p className="text-[11px] text-[#6B7280] mt-1">Urban Development Council</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB] text-center">
              <span className="font-mono text-[11px] text-[#6B7280] uppercase">RERA REGISTERED</span>
              <h4 className="font-display font-bold text-base text-[#0B1F3A] mt-1">100% Escrow Compliance</h4>
              <p className="text-[11px] text-[#6B7280] mt-1">Govt. of Rajasthan</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB] text-center">
              <span className="font-mono text-[11px] text-[#6B7280] uppercase">TIMES EXCELLENCE</span>
              <h4 className="font-display font-bold text-base text-[#0B1F3A] mt-1">Pioneer Developer 40Y</h4>
              <p className="text-[11px] text-[#6B7280] mt-1">Times Real Estate Awards</p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          9. SECTION 9: "HAPPY USERS FEEDBACK" (TESTIMONIALS)
          ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Testimonial Quotes Stack */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              VERIFIED HOMEOWNERS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1F3A] tracking-tight mt-2 mb-8">
              Happy users feedback
            </h2>

            <div className="space-y-6">
              {TESTIMONIALS.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E7EB] shadow-xs"
                >
                  <div className="flex items-center space-x-1 text-[#D4E845] mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#111827] italic leading-relaxed">
                    "{review.quote}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-sm text-[#0B1F3A]">{review.name}</span>
                      <span className="text-xs text-[#6B7280]">{review.verifiedResident ? 'Verified Resident' : 'Homeowner'}</span>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 bg-[#FAF8F5] rounded-full border border-[#E5E7EB] text-[#0B1F3A]">
                      {review.project}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait of Happy Homeowners */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] overflow-hidden shadow-xl aspect-square sm:aspect-[4/5] bg-[#0B1F3A]">
              <img
                src="/media/img/2021/04/Prana-Pratishtha-ceremony-1-900.webp"
                alt="Happy Kedia Homeowner Family"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-[11px] font-mono text-[#D4E845] uppercase tracking-wider block">
                  15,000+ FAMILIES
                </span>
                <h4 className="font-display font-bold text-lg mt-0.5">Generations of Trust</h4>
                <p className="text-xs text-white/80 mt-1">
                  "Our children grew up in a safe, gated Kedia community with lush parks and genuine neighbors."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          10. SECTION 10: "DISCOVER INSPIRATION AND TRENDS" (BLOG/GUIDES)
          ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E7EB]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              ARCHITECTURAL INSIGHTS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1F3A] tracking-tight mt-1">
              Discover inspiration and trends
            </h2>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#0B1F3A] hover:text-[#C8A24B] font-semibold"
          >
            <span>View Knowledge Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Article 1: Living Blueprint Cadastral Guide */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="aspect-[16/10] overflow-hidden bg-[#0B1F3A] relative">
              <img
                src="/media/img/2025/04/DJI_0788-3-scaled-900.webp"
                alt="Cadastral Surveys"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#0B1F3A]">
                LEGAL CLARITY
              </div>
            </div>
            <div className="p-6">
              <span className="text-[11px] font-mono text-[#6B7280]">Oct 2026 · 6 min read</span>
              <h3 className="font-display font-bold text-xl text-[#0B1F3A] mt-2 group-hover:text-[#123D70] transition-colors">
                Understanding JDA Cadastral Surveys & Freehold Titles
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Why cadastral road setbacks, rainwater recharge networks, and sanctioned site plans are non-negotiable when buying in Jaipur.
              </p>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                <Link to="/about" className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] font-semibold flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Article 2: Vastu Architecture in Jaipur */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="aspect-[16/10] overflow-hidden bg-[#0B1F3A] relative">
              <img
                src="/media/img/2025/04/LANDMARK-001-900.webp"
                alt="Vastu Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#0B1F3A]">
                VASTU HARMONY
              </div>
            </div>
            <div className="p-6">
              <span className="text-[11px] font-mono text-[#6B7280]">Sep 2026 · 4 min read</span>
              <h3 className="font-display font-bold text-xl text-[#0B1F3A] mt-2 group-hover:text-[#123D70] transition-colors">
                Blending Traditional Vastu with Contemporary Architecture
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                How Kedia's architects balance natural solar pathways, wind drafts, and sacred directional geometry with modern minimalist aesthetics.
              </p>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                <Link to="/about" className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] font-semibold flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Article 3: RERA Escrow Security Guide */}
          <div className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div className="aspect-[16/10] overflow-hidden bg-[#0B1F3A] relative">
              <img
                src="/media/img/2025/04/DJI_0744-scaled-900.webp"
                alt="Cost Sheet & RERA"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#0B1F3A]">
                HOMEBUYER GUIDE
              </div>
            </div>
            <div className="p-6">
              <span className="text-[11px] font-mono text-[#6B7280]">Aug 2026 · 5 min read</span>
              <h3 className="font-display font-bold text-xl text-[#0B1F3A] mt-2 group-hover:text-[#123D70] transition-colors">
                The Rajasthan Homebuyer's Cost Sheet & Token Booking Process
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                A transparent breakdown of GST, stamp duty, registration charges, and holding unit tokens under the RERA framework.
              </p>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                <Link to="/tools" className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] font-semibold flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          11. SECTION 11: CURVED PRE-FOOTER CTA BANNER
              (Spaciaz "Your dream home awaits" Curved Card)
          ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-[36px] bg-[#0E1520] text-white p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle architectural background texture */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/media/img/2025/04/LANDMARK-001-1920.webp')` }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/10 text-[#D4E845] border border-white/10 mb-4">
              TAKE THE NEXT STEP
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              {t('prefooter_title')}
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
              {t('prefooter_subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setSiteVisitModalOpen(true)}
                className="inline-flex items-center space-x-3 bg-[#D4E845] text-[#0B1F3A] hover:bg-[#c6db34] px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all"
              >
                <span>{t('prefooter_cta_visit')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center space-x-2 bg-transparent hover:bg-white/10 text-white px-7 py-4 rounded-full text-sm font-semibold border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#D4E845]" />
                <span>{t('nav_call_us')}: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center space-x-6 text-xs text-white/60 font-mono">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4E845]" />
                <span>Zero Brokerage</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4E845]" />
                <span>100% JDA Approved</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4E845]" />
                <span>Direct Builder Pricing</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          12. VIDEO MODAL (AERIAL DRONE MONTAGE TOUR)
          ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black rounded-[28px] overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-[#0B1F3A] text-white">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4E845]" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Kedia Builders · Jaipur Aerial Drone Tour
                </span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center relative">
              <video
                src="/assets/3d/media/montage/jaipur.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
