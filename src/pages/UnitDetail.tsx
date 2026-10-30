import React, { useState } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { getUnitById } from '@/data/unitsData';
import { getProjectBySlug } from '@/data/projectsData';
import { formatINR, formatExactINR, getMediaUrl, generateCostSheetPDF } from '@/utils/media';
import {
  Heart,
  Scale,
  Calendar,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Home,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const UnitDetail: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useRouter();
  const {
    units,
    toggleShortlist,
    isShortlisted,
    toggleCompare,
    isCompared,
    setSiteVisitModalOpen,
    showToast,
  } = useStore();

  const unit = units.find(u => u.id === id) || units[0];
  const project = getProjectBySlug(unit.projectSlug);

  const shortlisted = isShortlisted(unit.id);
  const compared = isCompared(unit.id);

  // Similar units from same project
  const similarUnits = units
    .filter(u => u.projectSlug === unit.projectSlug && u.id !== unit.id)
    .slice(0, 3);

  const handleDownloadCostSheet = () => {
    generateCostSheetPDF(unit);
    showToast('Downloaded official PDF estimate and cost sheet', 'brass');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Hero Banner */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-6 sm:p-10 mb-10 border border-white/10 relative overflow-hidden shadow-2xl">
          {/* Subtle architectural grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

          {/* Breadcrumb pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-6 relative z-10">
            <Link to="/" className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors">
              Home
            </Link>
            <span className="text-slate-500">/</span>
            <Link to="/projects" className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors">
              Projects
            </Link>
            <span className="text-slate-500">/</span>
            <Link to={`/projects/${unit.projectSlug}`} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors">
              {unit.projectName}
            </Link>
            <span className="text-slate-500">/</span>
            <span className="px-3 py-1 rounded-full bg-[#D4E845] text-[#0E1520] font-bold">
              {unit.unitNumber}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  unit.status === 'available'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : unit.status === 'on_hold'
                    ? 'bg-[#D4E845]/20 text-[#D4E845] border border-[#D4E845]/30'
                    : 'bg-slate-700/40 text-slate-300 border border-slate-600'
                }`}>
                  {unit.status.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-slate-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {unit.towerOrBlock} &middot; {unit.projectName}
                </span>
                <span className="text-xs font-mono text-[#D4E845] px-3 py-1 rounded-full bg-[#D4E845]/10 border border-[#D4E845]/20">
                  {unit.facing} Facing
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
                {unit.unitNumber} &middot; {unit.configuration}
              </h1>
              <p className="text-sm font-mono text-slate-300 mt-2">
                Plot/Built Area: <span className="text-white font-bold">{unit.areaSqYd} sq. yd.</span> ({Math.round(unit.areaSqYd * 9)} sq. ft.) &middot; Floor: {unit.floorLevel}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleShortlist(unit.id)}
                className={`px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-medium tracking-wide active:scale-95 ${
                  shortlisted
                    ? 'bg-[#D4E845] border-[#D4E845] text-[#0E1520] font-bold shadow-md'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${shortlisted ? 'fill-[#0E1520]' : ''}`} />
                <span>{shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(unit.id)}
                className={`px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 text-xs font-medium tracking-wide active:scale-95 ${
                  compared
                    ? 'bg-[#D4E845] border-[#D4E845] text-[#0E1520] font-bold shadow-md'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{compared ? 'Compared' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Floor Plan & Specs (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Visual Floor Plan & Rendering Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Architectural Plate
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0E1520] tracking-tight">
                    Sanctioned Layout Drawing
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadCostSheet}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-slate-50 text-xs font-mono font-medium text-[#0E1520] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#0E1520]" />
                  <span>Download PDF Sheet</span>
                </button>
              </div>

              <div className="relative h-80 sm:h-[440px] rounded-[24px] overflow-hidden bg-[#0E1520] border border-slate-200 group">
                <img
                  src={getMediaUrl(unit.floorPlanImage, 1920)}
                  alt={unit.unitNumber}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1520]/80 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
                  <div className="bg-[#0E1520]/90 backdrop-blur-md px-4 py-2 border border-white/20 text-xs font-mono text-white rounded-full">
                    Sanctioned Layout &middot; {unit.unitNumber} ({unit.facing} Orientation)
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                    Vastu Compliant Blueprint
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 pt-2">
                <span>* High-resolution architectural layout drawing as approved by competent authorities.</span>
                <button
                  type="button"
                  onClick={handleDownloadCostSheet}
                  className="sm:hidden text-[#0E1520] font-bold flex items-center gap-1.5 underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Itemized Cost Sheet (PDF)</span>
                </button>
              </div>
            </div>

            {/* Architectural & Spatial Specifications */}
            <div className="bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  Technical Parameters
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0E1520] tracking-tight">
                  Spatial &amp; Construction Blueprint
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(unit.specifications).map(([key, value]) => (
                  <div key={key} className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{key}</span>
                    <span className="text-sm font-display font-bold text-[#0E1520] mt-1">{value}</span>
                  </div>
                ))}
                <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Bedrooms &amp; Baths</span>
                  <span className="text-sm font-display font-bold text-[#0E1520] mt-1">
                    {unit.bedrooms > 0 ? `${unit.bedrooms} BHK / ${unit.bathrooms} Baths` : 'Plotted Residential'}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Floor Level</span>
                  <span className="text-sm font-display font-bold text-[#0E1520] mt-1">{unit.floorLevel}</span>
                </div>
              </div>
            </div>

            {/* Similar Available Units */}
            {similarUnits.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Alternative Units
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0E1520] tracking-tight">
                    More Available in {unit.projectName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarUnits.map(su => (
                    <Link
                      key={su.id}
                      to={`/units/${su.id}`}
                      className="p-4 bg-[#F9FAFB] hover:bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#0E1520] transition-all block group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-display font-bold text-[#0E1520]">{su.unitNumber}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold uppercase">
                          {su.status}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 block">{su.areaSqYd} sq. yd. &middot; {su.configuration}</span>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E5E7EB]">
                        <span className="text-sm font-display font-bold text-[#0E1520]">{formatINR(su.totalPrice)}</span>
                        <div className="w-7 h-7 rounded-full bg-[#D4E845] group-hover:bg-[#c2d735] text-[#0E1520] flex items-center justify-center font-bold text-xs transition-colors">
                          ↗
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Premium Purchase Summary Card (4 cols) */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white border-2 border-[#0E1520] p-6 sm:p-8 rounded-[32px] shadow-xl space-y-6">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
                  All-Inclusive Commercial Estimate
                </span>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0E1520] tracking-tight">
                    {formatINR(unit.totalPrice)}
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    Demo Mode
                  </span>
                </div>
              </div>

              {/* Itemized Cost Breakdown Table */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-slate-600 py-1 border-b border-[#F3F4F6]">
                  <span>1. Base Consideration Price</span>
                  <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.basePrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600 py-1 border-b border-[#F3F4F6]">
                  <span>2. IDC / EDC Development Charges</span>
                  <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.developmentCharges)}</span>
                </div>
                <div className="flex justify-between text-slate-600 py-1 border-b border-[#F3F4F6]">
                  <span>3. Club &amp; Lifestyle Membership</span>
                  <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.clubMembership)}</span>
                </div>
                <div className="flex justify-between text-slate-600 py-1 border-b border-[#F3F4F6]">
                  <span>4. Covered Parking Space</span>
                  <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.parkingCharges)}</span>
                </div>
                <div className="flex justify-between text-slate-600 py-1 border-b border-[#F3F4F6]">
                  <span>5. GST (5% Construction)</span>
                  <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.gst)}</span>
                </div>
                <div className="flex justify-between text-slate-600 py-1 border-b border-[#F3F4F6]">
                  <span>6. Estimated Stamp Duty &amp; Registry (6%)</span>
                  <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.stampDutyRegistration)}</span>
                </div>
                <div className="flex justify-between text-[#0E1520] font-bold text-sm pt-3 border-t-2 border-[#0E1520]">
                  <span>Total All-Inclusive Cost:</span>
                  <span className="text-[#0E1520] font-display text-base font-bold">{formatExactINR(unit.totalPrice)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  to={`/booking/${unit.id}`}
                  className="w-full py-4 rounded-full bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group"
                >
                  <span>Book Unit Online (Token ₹1 Lakh)</span>
                  <span className="w-6 h-6 rounded-full bg-[#0E1520] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSiteVisitModalOpen(true, unit.projectName)}
                  className="w-full py-3.5 rounded-full bg-[#0E1520] hover:bg-[#1A2332] text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Site Inspection</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCostSheet}
                  className="w-full py-3 rounded-full border border-[#E5E7EB] hover:bg-slate-50 text-[#0E1520] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#0E1520]" />
                  <span>Download Official Cost Sheet (PDF)</span>
                </button>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5E7EB] text-[11px] font-mono text-slate-500 leading-relaxed">
                * Simulated Booking Guarantee: Online reservations place the unit on immediate 'On Hold' status for 48 hours while our relationship desk confirms verification.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
