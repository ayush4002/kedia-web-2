import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { getProjectBySlug, PROJECTS } from '@/data/projectsData';
import { formatINR, getMediaUrl } from '@/utils/media';
import { COMPANY_INFO } from '@/data/siteData';
import { LivingBlueprintMap } from '@/components/common/LivingBlueprintMap';
import {
  MapPin,
  Calendar,
  Download,
  Share2,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  Maximize2,
  X,
  Compass,
  Play,
  Grid,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { InventoryUnit } from '@/types';

export const ProjectDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const {
    units,
    setSiteVisitModalOpen,
    addLead,
    showToast,
    addRecentlyViewed,
  } = useStore();

  const project = getProjectBySlug(slug) || PROJECTS[0];
  const projectUnits = units.filter(u => u.projectSlug === project.slug);

  // Track recently viewed
  useEffect(() => {
    if (project?.slug) {
      addRecentlyViewed(project.slug);
    }
  }, [project?.slug]);

  // Inventory View Mode: 'blueprint' (living SVG layout) vs 'matrix' (grid)
  const [inventoryView, setInventoryView] = useState<'blueprint' | 'matrix'>('blueprint');

  // Gallery state
  const allImages = [...(project.images || []), ...(project.plans || [])];
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Interactive Plot / Floor Plan unit preview modal
  const [selectedUnit, setSelectedUnit] = useState<InventoryUnit | null>(null);

  // Quick enquiry form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryNotes, setEnquiryNotes] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Virtual tour modal state
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;

    addLead({
      name: enquiryName,
      phone: enquiryPhone,
      project: project.name,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Afternoon (2:00 PM – 5:00 PM)',
      message: enquiryNotes || `Enquiry for ${project.name}`,
      source: 'project_sticky'
    });

    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquirySubmitted(false);
      setEnquiryName('');
      setEnquiryPhone('');
      setEnquiryNotes('');
    }, 3000);
  };

  const handleBrochureDownload = () => {
    showToast(`Downloading official brochure for ${project.name}`, 'brass');
  };

  const similarProjects = PROJECTS.filter(p => p.slug !== project.slug && (p.type === project.type || p.location === project.location)).slice(0, 3);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20 text-[#111827]">
      
      {/* ========================================================
          1. EDITORIAL HERO & IMAGE GALLERY CONTAINER
      ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-[36px] bg-[#0E1520] text-white p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 bg-navy-blueprint opacity-20 pointer-events-none" />

          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#D4E845] mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-white font-bold">{project.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase ${
                    project.status === 'ongoing' ? 'bg-[#D4E845] text-[#0B1F3A]' : 'bg-white/10 text-white'
                  }`}>
                    {project.status === 'ongoing' ? 'Ongoing Development' : 'Completed Project'}
                  </span>
                  <span className="text-xs font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {project.type} · {project.location}, Jaipur
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
                  {project.name}
                </h1>
                
                <p className="text-xs sm:text-sm text-white/70 mt-2 font-normal flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#D4E845]" />
                  <span>{project.address}</span>
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSiteVisitModalOpen(true, project.name)}
                  className="px-6 py-3 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95 flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Site Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-full border border-white/20 transition-all flex items-center space-x-2"
                >
                  <Play className="w-3.5 h-3.5 text-[#D4E845] fill-[#D4E845]" />
                  <span>3D Drone View</span>
                </button>

                <a
                  href={getMediaUrl(project.brochurePath)}
                  download
                  onClick={handleBrochureDownload}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider rounded-full border border-white/10 transition-all flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Brochure</span>
                </a>
              </div>
            </div>

            {/* Large Architectural Gallery Visual with Thumbnail Strip */}
            <div className="space-y-4">
              <div className="relative h-[320px] sm:h-[480px] lg:h-[560px] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img
                  src={getMediaUrl(allImages[activeImageIdx]?.path || project.cover, 1920)}
                  alt={allImages[activeImageIdx]?.caption || project.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/15 text-xs font-mono text-white rounded-full">
                  {allImages[activeImageIdx]?.caption || `${project.name} Architectural Elevation`}
                </div>

                {/* RERA Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-[11px] font-mono text-[#D4E845] rounded-full flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4E845]" />
                  <span>RERA: {project.reraNumber || 'Rajasthan RERA Verified'}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin">
                {allImages.slice(0, 10).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 sm:w-24 h-16 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#D4E845] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getMediaUrl(img.path, 600)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. MAIN BODY GRID: OVERVIEW, CONFIGS, AMENITIES & STICKY FORM
      ======================================================== */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Project Overview */}
            <div className="bg-white p-6 sm:p-10 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] block font-semibold">
                ARCHITECTURAL OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B1F3A] tracking-tight">
                Crafted for Enduring Excellence
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
                {project.description}
              </p>

              <div className="pt-6 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#4B5563]">
                <div>
                  <span className="text-[10px] text-[#9CA3AF] uppercase block font-semibold">Guideline Price</span>
                  <span className="font-bold text-[#0B1F3A] text-sm">{project.priceLabel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] uppercase block font-semibold">Active Inventory</span>
                  <span className="font-bold text-emerald-800 text-sm">{project.unitsCount.available} Available</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] uppercase block font-semibold">Possession</span>
                  <span className="font-bold text-[#0B1F3A] text-sm">{project.possessionLabel || 'On Schedule'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9CA3AF] uppercase block font-semibold">Authority Status</span>
                  <span className="font-bold text-[#0B1F3A] text-sm">100% JDA Approved</span>
                </div>
              </div>
            </div>

            {/* ========================================================
                3. INTERACTIVE INVENTORY (LIVING BLUEPRINT & MATRIX)
            ======================================================== */}
            <div className="bg-white p-6 sm:p-10 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] block font-semibold">
                    CADASTRAL SITE LAYOUT
                  </span>
                  <h3 className="text-2xl font-display font-bold text-[#0B1F3A] tracking-tight">
                    Real-Time Unit Availability
                  </h3>
                </div>

                {/* Mode Selector Toggle */}
                <div className="flex border border-[#E5E7EB] rounded-full p-1 bg-[#F9FAFB] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setInventoryView('blueprint')}
                    className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-1.5 ${
                      inventoryView === 'blueprint'
                        ? 'bg-[#0B1F3A] text-white font-bold shadow-xs'
                        : 'text-[#6B7280] hover:text-[#0B1F3A]'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-[#D4E845]" />
                    <span>Living Blueprint</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInventoryView('matrix')}
                    className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-1.5 ${
                      inventoryView === 'matrix'
                        ? 'bg-[#0B1F3A] text-white font-bold shadow-xs'
                        : 'text-[#6B7280] hover:text-[#0B1F3A]'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Matrix Grid ({projectUnits.length})</span>
                  </button>
                </div>
              </div>

              {inventoryView === 'blueprint' ? (
                <div className="space-y-4">
                  <LivingBlueprintMap
                    units={projectUnits}
                    onSelectUnit={(u) => setSelectedUnit(u)}
                    projectName={project.name}
                    projectSlug={project.slug}
                    enableProjectSwitcher={false}
                  />
                </div>
              ) : (
                <>
                  <p className="text-xs text-[#6B7280] font-mono">
                    * Click on any unit or plot below to inspect its itemized cost sheet, layout specifications, and simulated booking flow.
                  </p>

                  {/* Interactive Floor/Plot Grid Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {projectUnits.map((u) => {
                      let statusBg = 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100';
                      let badgeBg = 'bg-emerald-600 text-white';

                      if (u.status === 'on_hold') {
                        statusBg = 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100';
                        badgeBg = 'bg-amber-500 text-white';
                      } else if (u.status === 'sold') {
                        statusBg = 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75';
                        badgeBg = 'bg-slate-400 text-white';
                      }

                      return (
                        <div
                          key={u.id}
                          onClick={() => setSelectedUnit(u)}
                          className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 group relative ${statusBg}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-bold">
                              {u.unitNumber}
                            </span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${badgeBg}`}>
                              {u.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono text-[#6B7280]">
                            {u.areaSqYd} sq yd ({u.areaSqFt} sq ft)
                          </div>

                          <div className="text-xs font-display font-bold text-[#0B1F3A] mt-1">
                            {formatINR(u.totalPrice)}
                          </div>

                          <span className="text-[10px] font-mono text-[#9CA3AF] block mt-0.5">
                            {u.facing}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Configurations Table */}
            {project.configs && project.configs.length > 0 && (
              <div className="bg-white p-6 sm:p-10 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] block font-semibold">
                  CONFIGURATION SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0B1F3A] tracking-tight">
                  Sizes, Layouts &amp; Dimensions
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-[#4B5563]">
                    <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-3 px-3 text-left">Unit Specification</th>
                        <th className="py-3 px-3 text-left">Typology</th>
                        <th className="py-3 px-3 text-right">Plot (Sq Yd)</th>
                        <th className="py-3 px-3 text-right">Built-Up (Sq Ft)</th>
                        <th className="py-3 px-3 text-right">Price Guideline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {project.configs.map((c, idx) => (
                        <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3.5 px-3 font-semibold text-[#0B1F3A]">{c.label}</td>
                          <td className="py-3.5 px-3">{c.unit_type}</td>
                          <td className="py-3.5 px-3 text-right">{c.plot_sqyd || '—'}</td>
                          <td className="py-3.5 px-3 text-right">{c.builtup_sqft || c.carpet_sqft || '—'}</td>
                          <td className="py-3.5 px-3 text-right font-bold text-[#0B1F3A]">{c.price_label || 'On Request'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Amenities & Nearby Landmarks */}
            <div className="bg-white p-6 sm:p-10 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] block mb-1 font-semibold">
                  LIFESTYLE INFRASTRUCTURE
                </span>
                <h3 className="text-2xl font-display font-bold text-[#0B1F3A] tracking-tight mb-4">
                  Curated Amenities &amp; Services
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.amenities.map((am, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-[#374151] bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB]">
                      <CheckCircle2 className="w-4 h-4 text-[#0B1F3A] flex-shrink-0" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5E7EB]">
                <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] block mb-1 font-semibold">
                  CONNECTIVITY &amp; ACCESSIBILITY
                </span>
                <h3 className="text-xl font-display font-bold text-[#0B1F3A] tracking-tight mb-4">
                  Nearby Landmarks &amp; Corridors
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {project.nearby.map((nb, idx) => (
                    <div key={idx} className="bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-[#111827] font-medium">{nb.place}</span>
                      <span className="text-[#0B1F3A] font-bold bg-white px-2.5 py-1 rounded-full border border-[#E5E7EB]">
                        {nb.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Quick Enquiry & Site Visit Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E7EB] shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#6B7280] uppercase block font-semibold">
                  DIRECT BUILDER DESK
                </span>
                <h4 className="font-display font-bold text-xl text-[#0B1F3A] mt-1">
                  Schedule Guided Visit
                </h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  Tour {project.name} accompanied by senior architectural advisors.
                </p>
              </div>

              {enquirySubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-emerald-900 text-sm">Site Visit Requested!</h5>
                  <p className="text-xs text-emerald-700">Our advisor will contact you within 2 hours with slot confirmation.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#4B5563] mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rathore"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2.5 text-xs rounded-xl text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#4B5563] mb-1 font-semibold">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98290 XXXXX"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2.5 text-xs rounded-xl text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#4B5563] mb-1 font-semibold">Requirements or Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Preferred timing, BHK requirement, or budget..."
                      value={enquiryNotes}
                      onChange={(e) => setEnquiryNotes(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2 text-xs rounded-xl text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-full shadow-xs transition-all active:scale-95"
                  >
                    Request Exclusive Slot
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-[#E5E7EB] text-center">
                <span className="text-[11px] font-mono text-[#6B7280] block">Prefer direct telephonic enquiry?</span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center space-x-1.5 font-mono font-bold text-xs text-[#0B1F3A] hover:text-[#123D70] mt-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0B1F3A]" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Statutory Clearances Card */}
            <div className="bg-white p-6 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#6B7280] uppercase block font-semibold">
                LEGAL COMPLIANCE
              </span>
              <h5 className="font-display font-bold text-sm text-[#0B1F3A]">100% Clear JDA Sanctions</h5>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Freehold titles, sanctioned cadastral layout plans, and escrow compliance under RERA Rajasthan.
              </p>
              <div className="pt-2 text-xs font-mono text-[#0B1F3A] font-bold">
                RERA: {project.reraNumber || 'Verified Registration'}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          SIMILAR DEVELOPMENTS CORRIDOR
      ======================================================== */}
      {similarProjects.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] font-semibold block">
                EXPLORE ALTERNATIVES
              </span>
              <h3 className="font-display font-bold text-2xl text-[#0B1F3A]">
                Similar Developments in Jaipur
              </h3>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-widest text-[#0B1F3A] hover:text-[#123D70] font-bold"
            >
              <span>View All 16 Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group bg-white rounded-[28px] border border-[#E5E7EB] overflow-hidden shadow-2xs hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black relative">
                  <img
                    src={getMediaUrl(p.cover, 900)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-white">
                    {p.location}
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0B1F3A] group-hover:text-[#123D70] transition-colors">{p.name}</h4>
                    <span className="text-xs font-mono text-[#6B7280]">{p.priceLabel}</span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#D4E845] text-[#0B1F3A] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Virtual Tour Modal */}
      {isVirtualTourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black rounded-[28px] overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-[#0B1F3A] text-white">
              <span className="text-xs font-mono uppercase tracking-wider">{project.name} · 3D Drone Perspective</span>
              <button onClick={() => setIsVirtualTourOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video src="/assets/3d/media/montage/jaipur.mp4" controls autoPlay className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* Selected Unit Quick Preview Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-start justify-between border-b border-[#E5E7EB] pb-4 mb-4">
              <div>
                <span className="text-xs font-mono text-[#D4E845] bg-[#0B1F3A] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  {selectedUnit.status.replace('_', ' ')}
                </span>
                <h4 className="font-display font-bold text-2xl text-[#0B1F3A] mt-2">
                  {selectedUnit.unitNumber} · {selectedUnit.configuration}
                </h4>
                <p className="text-xs text-[#6B7280] font-mono">{selectedUnit.facing} Orientation</p>
              </div>
              <button onClick={() => setSelectedUnit(null)} className="p-1 text-[#6B7280] hover:text-[#0B1F3A]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block uppercase text-[10px]">Area in Sq Yd</span>
                  <span className="font-bold text-[#0B1F3A] text-sm">{selectedUnit.areaSqYd} sq yd</span>
                </div>
                <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block uppercase text-[10px]">Area in Sq Ft</span>
                  <span className="font-bold text-[#0B1F3A] text-sm">{selectedUnit.areaSqFt} sq ft</span>
                </div>
                <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block uppercase text-[10px]">Total Price</span>
                  <span className="font-bold text-[#0B1F3A] text-sm">{formatINR(selectedUnit.totalPrice)}</span>
                </div>
                <div className="bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#9CA3AF] block uppercase text-[10px]">Token Amount</span>
                  <span className="font-bold text-emerald-800 text-sm">₹51,000 (Refundable)</span>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <Link
                  to={`/units/${selectedUnit.id}`}
                  className="flex-1 py-3 bg-[#0B1F3A] hover:bg-[#123D70] text-white font-semibold text-xs uppercase tracking-wider rounded-full text-center transition-colors"
                >
                  View Unit Product Page
                </Link>

                <Link
                  to={`/booking/${selectedUnit.id}`}
                  className="flex-1 py-3 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold text-xs uppercase tracking-wider rounded-full text-center transition-all shadow-xs"
                >
                  Book Token Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
