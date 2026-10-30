import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_INFO } from '@/data/siteData';
import {
  Heart,
  Calendar,
  User,
  Menu,
  X,
  Phone,
  Scale,
  ChevronDown,
  Languages,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const {
    shortlist,
    compareList,
    currentUser,
    setSiteVisitModalOpen,
    setShortlistDrawerOpen,
    setCompareModalOpen,
    setAuthModalOpen,
  } = useStore();
  const { language, toggleLanguage, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProjectsDropdownOpen(false);
  }, [currentPath]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E5E7EB]'
            : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#E5E7EB]/80'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
            
            {/* 1. LEFT: Real Kedia Navy Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="group flex items-center space-x-2.5">
                <img
                  src="/assets/logo-navy.png"
                  alt="Kedia Builders & Colonizers"
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* 2. CENTER: Clean Single-Line Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
              
              {/* Projects Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProjectsDropdownOpen(true)}
                onMouseLeave={() => setProjectsDropdownOpen(false)}
              >
                <Link
                  to="/projects"
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide flex items-center space-x-1 rounded-full transition-colors whitespace-nowrap ${
                    currentPath.startsWith('/projects')
                      ? 'text-[#0B1F3A] bg-black/5 font-bold'
                      : 'text-[#4B5563] hover:text-[#0B1F3A] hover:bg-black/5'
                  }`}
                >
                  <span>{t('nav_projects')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </Link>

                {projectsDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 animate-fadeIn z-50">
                    <Link
                      to="/projects?type=Villas"
                      className="block px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-[#0B1F3A] hover:bg-[#FAF8F5] transition-colors whitespace-nowrap"
                    >
                      Boutique Luxury Villas
                    </Link>
                    <Link
                      to="/projects?type=Residential Plots"
                      className="block px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-[#0B1F3A] hover:bg-[#FAF8F5] transition-colors whitespace-nowrap"
                    >
                      Master-Planned Plots
                    </Link>
                    <Link
                      to="/projects?type=Apartments"
                      className="block px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-[#0B1F3A] hover:bg-[#FAF8F5] transition-colors whitespace-nowrap"
                    >
                      Modern Apartments (Bani Park)
                    </Link>
                    <div className="border-t border-[#E5E7EB] my-1" />
                    <Link
                      to="/projects"
                      className="block px-4 py-2 text-[11px] font-mono tracking-widest text-[#0B1F3A] hover:text-[#123D70] font-bold whitespace-nowrap"
                    >
                      View All 16 Developments &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                  currentPath === '/about'
                    ? 'text-[#0B1F3A] bg-black/5 font-bold'
                    : 'text-[#4B5563] hover:text-[#0B1F3A] hover:bg-black/5'
                }`}
              >
                {t('nav_about')}
              </Link>

              <Link
                to="/gallery"
                className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                  currentPath === '/gallery'
                    ? 'text-[#0B1F3A] bg-black/5 font-bold'
                    : 'text-[#4B5563] hover:text-[#0B1F3A] hover:bg-black/5'
                }`}
              >
                {t('nav_gallery')}
              </Link>

              <Link
                to="/tools"
                className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                  currentPath === '/tools'
                    ? 'text-[#0B1F3A] bg-black/5 font-bold'
                    : 'text-[#4B5563] hover:text-[#0B1F3A] hover:bg-black/5'
                }`}
              >
                {t('nav_calculator')}
              </Link>

              <Link
                to="/nri"
                className={`hidden xl:inline-block px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                  currentPath === '/nri'
                    ? 'text-[#0B1F3A] bg-black/5 font-bold'
                    : 'text-[#4B5563] hover:text-[#0B1F3A] hover:bg-black/5'
                }`}
              >
                {t('nav_nri')}
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap ${
                  currentPath === '/contact'
                    ? 'text-[#0B1F3A] bg-black/5 font-bold'
                    : 'text-[#4B5563] hover:text-[#0B1F3A] hover:bg-black/5'
                }`}
              >
                {t('nav_contact')}
              </Link>

            </nav>

            {/* 3. RIGHT: Properly Staged, Never-Clipping Action Cluster */}
            <div className="flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0">
              
              {/* Phone text only on ultra-wide 2xl screens */}
              <div className="hidden 2xl:flex items-center space-x-1.5 text-xs font-semibold text-[#0B1F3A] pr-1 whitespace-nowrap">
                <span className="text-[#6B7280] font-normal">{t('nav_call_us')}:</span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-[#123D70] font-mono font-bold tracking-tight text-[#0B1F3A]"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              {/* Phone icon button on standard desktop / laptop */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="hidden md:flex 2xl:hidden p-2 rounded-full border border-[#D1D5DB] text-[#0B1F3A] hover:bg-black/5 transition-colors"
                title={`Call: ${COMPANY_INFO.phone}`}
              >
                <Phone className="w-4 h-4 text-[#0B1F3A]" />
              </a>

              {/* E-Commerce Admin Direct Access */}
              <Link
                to="/admin"
                className="hidden lg:inline-flex items-center px-2.5 py-1 rounded-full border border-black/15 bg-black/5 hover:bg-black/10 text-[10px] font-mono font-bold tracking-wider text-[#0B1F3A] uppercase transition-colors"
                title="E-Commerce Store & Inventory Admin"
              >
                {t('nav_admin')}
              </Link>

              {/* Language Switcher Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-full border border-[#0B1F3A]/20 bg-white hover:bg-black/5 text-xs font-mono font-bold uppercase text-[#0B1F3A] flex items-center space-x-1.5 transition-all shadow-2xs whitespace-nowrap active:scale-95"
                title="Switch Language (English / हिन्दी)"
              >
                <Languages className="w-3.5 h-3.5 text-[#0B1F3A]" />
                <span className="font-semibold">{language === 'en' ? 'हिन्दी' : 'EN'}</span>
              </button>

              {/* AI Concierge Trigger (Pill on 2xl, Icon button on xl) */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('kedia:open-ai-chat'))}
                className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D1D5DB] bg-white text-xs font-semibold text-[#0B1F3A] hover:bg-black/5 transition-all shadow-2xs whitespace-nowrap"
                title="Open Architectural AI Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#846624]" />
                <span className="hidden 2xl:inline">{t('nav_ai_concierge')}</span>
              </button>

              {/* Property Compare Button */}
              {compareList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCompareModalOpen(true)}
                  className="relative p-2 text-[#0B1F3A] hover:text-[#123D70] transition-colors"
                  title="Compare Selected Properties"
                >
                  <Scale className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-[#D4E845] text-[#0B1F3A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {compareList.length}
                  </span>
                </button>
              )}

              {/* Shortlist Heart Button */}
              <button
                type="button"
                onClick={() => setShortlistDrawerOpen(true)}
                className="relative p-2 text-[#0B1F3A] hover:text-[#123D70] transition-colors"
                title="View Shortlisted Units"
              >
                <Heart className={`w-4 h-4 ${shortlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {shortlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4E845] text-[#0B1F3A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {shortlist.length}
                  </span>
                )}
              </button>

              {/* Patron Profile Button */}
              <button
                type="button"
                onClick={() => currentUser?.isLoggedIn ? navigate('/dashboard') : setAuthModalOpen(true)}
                className="p-2 text-[#0B1F3A] hover:text-[#123D70] transition-colors"
                title={currentUser?.isLoggedIn ? "Patron Dashboard" : "Sign In to Patron Portal"}
              >
                <User className="w-4 h-4" />
              </button>

              {/* Spaciaz Signature Primary Button: "Schedule Visit" */}
              <button
                type="button"
                onClick={() => setSiteVisitModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-200 shadow-xs hover:shadow active:scale-95 flex-shrink-0 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('nav_schedule_visit')}</span>
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#0B1F3A] hover:text-[#123D70] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-5/6 max-w-sm bg-white text-[#0B1F3A] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
                <img src="/assets/logo-navy.png" alt="Kedia Logo" className="h-8 w-auto" />
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="px-2.5 py-1 border border-[#D1D5DB] text-[10px] font-mono text-[#0B1F3A] uppercase rounded-full font-bold"
                  >
                    {language === 'en' ? 'हिन्दी' : 'EN'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#6B7280] hover:text-[#0B1F3A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <nav className="mt-6 space-y-1">
                <Link
                  to="/projects"
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0B1F3A] hover:bg-black/5"
                >
                  {t('nav_projects')}
                </Link>
                <Link
                  to="/projects?type=Villas"
                  className="block px-6 py-1.5 text-xs font-medium text-[#4B5563] hover:text-[#0B1F3A]"
                >
                  ↳ {t('nav_villas')}
                </Link>
                <Link
                  to="/projects?type=Residential Plots"
                  className="block px-6 py-1.5 text-xs font-medium text-[#4B5563] hover:text-[#0B1F3A]"
                >
                  ↳ {t('nav_residential')}
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0B1F3A] hover:bg-black/5 mt-2"
                >
                  {t('nav_about')}
                </Link>
                <Link
                  to="/gallery"
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0B1F3A] hover:bg-black/5"
                >
                  {t('nav_gallery')}
                </Link>
                <Link
                  to="/tools"
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0B1F3A] hover:bg-black/5"
                >
                  {t('nav_calculator')}
                </Link>
                <Link
                  to="/nri"
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0B1F3A] hover:bg-black/5"
                >
                  {t('nav_nri')}
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0B1F3A] hover:bg-black/5"
                >
                  {t('nav_contact')}
                </Link>
                <Link
                  to="/admin"
                  className="block px-3 py-2.5 rounded-xl text-xs font-mono uppercase text-[#0B1F3A] bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 font-bold"
                >
                  {t('nav_admin')} Portal
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSiteVisitModalOpen(true);
                }}
                className="w-full py-3.5 bg-[#D4E845] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-full shadow-sm text-center"
              >
                Schedule A Site Visit
              </button>

              <div className="text-center text-xs text-[#6B7280]">
                <p>Call Jaipur Headquarters:</p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-[#0B1F3A] font-mono text-sm">
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
