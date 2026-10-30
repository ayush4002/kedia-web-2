import React, { useState, useMemo } from 'react';
import { InventoryUnit, Project } from '@/types';
import { PROJECTS } from '@/data/projectsData';
import { formatINR, formatExactINR, getMediaUrl } from '@/utils/media';
import { useStore } from '@/context/StoreContext';
import { useRouter } from '@/router';
import {
  Compass,
  Check,
  AlertCircle,
  Eye,
  ShoppingCart,
  Calendar,
  Download,
  CheckCircle2,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
  ArrowUpRight,
  Camera,
  Maximize2,
  FileText,
  SlidersHorizontal
} from 'lucide-react';

interface LivingBlueprintMapProps {
  units: InventoryUnit[];
  onSelectUnit?: (unit: InventoryUnit) => void;
  projectName?: string;
  projectSlug?: string;
  enableProjectSwitcher?: boolean;
}

// Curated Signature Projects for the Blueprint Navigator
const BLUEPRINT_PROJECTS = [
  {
    slug: 'kedias-landmark',
    name: "Kedia's Landmark",
    typology: "Township & Plots",
    corridor: "Sirsi Road Corridor",
    rera: "RAJ/P/2021/1544",
    aerialBackdrop: "/media/img/2025/04/DJI_0788-3-scaled-1920.webp",
    layoutType: 'township'
  },
  {
    slug: 'nikunj-villas',
    name: "Nikunj Villas",
    typology: "Boutique Luxury Villas",
    corridor: "Sirsi Road Corridor",
    rera: "RAJ/P/2021/1628",
    aerialBackdrop: "/media/img/2025/04/DJI_0778-3-scaled-1920.webp",
    layoutType: 'villas'
  },
  {
    slug: 'kedias-atulyam',
    name: "Kedia's Atulyam",
    typology: "Plots & Residences",
    corridor: "Sikar Road Corridor",
    rera: "RAJ/P/2021/1542",
    aerialBackdrop: "/media/img/2025/04/DSC07902-1920.webp",
    layoutType: 'township'
  },
  {
    slug: 'kedias-tulsi',
    name: "Kedia's Tulsi",
    typology: "Luxury Apartments",
    corridor: "Bani Park Prime",
    rera: "RAJ/P/2022/1911",
    aerialBackdrop: "/media/img/2025/04/LANDMARK-001-1920.webp",
    layoutType: 'apartments'
  },
  {
    slug: 'jagannathpuri',
    name: "Jagannathpuri",
    typology: "Sanctioned Plots",
    corridor: "Ajmer Road Corridor",
    rera: "RAJ/P/2021/1489",
    aerialBackdrop: "/media/img/2025/04/DJI_0744-scaled-1920.webp",
    layoutType: 'township'
  },
  {
    slug: 'kedia-aravali',
    name: "Kedia Aravali",
    typology: "Hillside Plots",
    corridor: "Aravalli Foothills",
    rera: "RAJ/P/2022/2014",
    aerialBackdrop: "/media/img/2025/04/DJI_0770-3-scaled-1920.webp",
    layoutType: 'township'
  },
  {
    slug: 'ganpati-greens',
    name: "Ganpati Greens",
    typology: "Eco Township & Villas",
    corridor: "Niwaru Link Road",
    rera: "RAJ/P/2020/1321",
    aerialBackdrop: "/media/img/2025/04/DJI_0747-scaled-1920.webp",
    layoutType: 'township'
  },
  {
    slug: 'kedia-shri-vatsal',
    name: "Kedia Shri Vatsal",
    typology: "Elite Villas",
    corridor: "Sikar Road Highway",
    rera: "RAJ/P/2021/1598",
    aerialBackdrop: "/media/img/2025/04/DSC07916-1920.webp",
    layoutType: 'villas'
  }
];

export const LivingBlueprintMap: React.FC<LivingBlueprintMapProps> = ({
  units,
  onSelectUnit,
  projectName,
  projectSlug,
  enableProjectSwitcher = true
}) => {
  const { navigate } = useRouter();
  const { setSiteVisitModalOpen, showToast } = useStore();

  // Active Project Selection (defaults to provided projectSlug, or Landmark)
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    if (projectSlug) return projectSlug;
    return 'kedias-landmark';
  });

  // Visual Mode: 'cad' (vector CAD blueprint) or 'aerial' (real drone site photo overlay)
  const [visualMode, setVisualMode] = useState<'cad' | 'aerial'>('cad');

  // Sub-Filter within the project
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'on_hold' | 'sold'>('all');

  // Hovered Unit for Live Tooltip
  const [hoveredUnit, setHoveredUnit] = useState<InventoryUnit | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Selected Unit for Instant Inspection Dossier Modal
  const [inspectedUnit, setInspectedUnit] = useState<InventoryUnit | null>(null);

  // Active Project Object
  const currentProjectMeta = useMemo(() => {
    const meta = BLUEPRINT_PROJECTS.find(p => p.slug === activeSlug);
    if (meta) return meta;
    const fromProjects = PROJECTS.find(p => p.slug === activeSlug);
    return {
      slug: activeSlug,
      name: fromProjects?.name || projectName || "Kedia Development",
      typology: fromProjects?.type || "Master Township",
      corridor: fromProjects?.location || "Jaipur Corridor",
      rera: fromProjects?.reraNumber || "RAJ/P/2021/1544",
      aerialBackdrop: "/media/img/2025/04/DJI_0788-3-scaled-1920.webp",
      layoutType: 'township' as const
    };
  }, [activeSlug, projectName]);

  // Project's Real Units from Store
  const projectUnits = useMemo(() => {
    let list = units.filter(u => u.projectSlug === activeSlug);
    if (list.length === 0) {
      // Fallback: show first units if this slug had no units yet
      list = units.slice(0, 20);
    }
    if (statusFilter !== 'all') {
      return list.filter(u => u.status === statusFilter);
    }
    return list;
  }, [units, activeSlug, statusFilter]);

  // Project Unit Statistics
  const allProjectUnits = useMemo(() => {
    const list = units.filter(u => u.projectSlug === activeSlug);
    return list.length > 0 ? list : units.slice(0, 20);
  }, [units, activeSlug]);

  const stats = useMemo(() => {
    const total = allProjectUnits.length;
    const available = allProjectUnits.filter(u => u.status === 'available').length;
    const onHold = allProjectUnits.filter(u => u.status === 'on_hold').length;
    const sold = allProjectUnits.filter(u => u.status === 'sold').length;
    const lowestPrice = allProjectUnits.reduce((min, u) => u.basePrice < min ? u.basePrice : min, Infinity);
    return { total, available, onHold, sold, lowestPrice: lowestPrice === Infinity ? 0 : lowestPrice };
  }, [allProjectUnits]);

  // Color & Stroke Styling based on Unit Status
  const getUnitStyle = (status: InventoryUnit['status'], isHovered: boolean) => {
    if (isHovered) {
      return {
        fill: 'rgba(212, 232, 69, 0.45)', // Spaciaz lime accent
        stroke: '#D4E845',
        strokeWidth: '2.5',
        filter: 'drop-shadow(0 0 12px rgba(212, 232, 69, 0.9))'
      };
    }
    if (status === 'available') {
      return {
        fill: visualMode === 'aerial' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.22)',
        stroke: '#10B981',
        strokeWidth: '1.4',
        filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))'
      };
    }
    if (status === 'on_hold') {
      return {
        fill: visualMode === 'aerial' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.22)',
        stroke: '#F59E0B',
        strokeWidth: '1.4',
        filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.4))'
      };
    }
    // sold
    return {
      fill: visualMode === 'aerial' ? 'rgba(71, 85, 105, 0.4)' : 'rgba(51, 65, 85, 0.3)',
      stroke: '#64748B',
      strokeWidth: '1'
    };
  };

  const handleMouseMove = (e: React.MouseEvent, unit: InventoryUnit) => {
    setTooltipPos({
      x: e.clientX,
      y: e.clientY
    });
    setHoveredUnit(unit);
  };

  const handlePlotClick = (unit: InventoryUnit) => {
    if (onSelectUnit) {
      onSelectUnit(unit);
    } else {
      setInspectedUnit(unit);
    }
  };

  // 20 Sector Coordinates mapped across the 800x640 Cadastral Canvas
  const layoutCoordinates = [
    // Top Row (Sector A - North Boulevard Promenade)
    { x: 50, y: 70, width: 85, height: 110, sector: 'Sector A' },
    { x: 145, y: 70, width: 85, height: 110, sector: 'Sector A' },
    { x: 240, y: 70, width: 85, height: 110, sector: 'Sector A' },
    { x: 475, y: 70, width: 85, height: 110, sector: 'Sector A' },
    { x: 570, y: 70, width: 85, height: 110, sector: 'Sector A' },
    { x: 665, y: 70, width: 85, height: 110, sector: 'Sector A' },

    // Middle Row Left (Sector B - West Courtyard)
    { x: 50, y: 220, width: 115, height: 80, sector: 'Sector B' },
    { x: 50, y: 310, width: 115, height: 80, sector: 'Sector B' },
    { x: 50, y: 400, width: 115, height: 80, sector: 'Sector B' },

    // Middle Row Right (Sector C - East Park View)
    { x: 635, y: 220, width: 115, height: 80, sector: 'Sector C' },
    { x: 635, y: 310, width: 115, height: 80, sector: 'Sector C' },
    { x: 635, y: 400, width: 115, height: 80, sector: 'Sector C' },

    // Bottom Row (Sector D - South Boulevard Facing)
    { x: 50, y: 520, width: 85, height: 105, sector: 'Sector D' },
    { x: 145, y: 520, width: 85, height: 105, sector: 'Sector D' },
    { x: 240, y: 520, width: 85, height: 105, sector: 'Sector D' },
    { x: 335, y: 520, width: 85, height: 105, sector: 'Sector D' },
    { x: 475, y: 520, width: 85, height: 105, sector: 'Sector D' },
    { x: 570, y: 520, width: 85, height: 105, sector: 'Sector D' },
    { x: 665, y: 520, width: 85, height: 105, sector: 'Sector D' },
  ];

  return (
    <div className="bg-[#0A1320] border border-[#D4E845]/30 rounded-[32px] p-5 sm:p-8 text-white shadow-2xl relative select-none">
      
      {/* ========================================================
          1. PROJECT SELECTOR NAVIGATION PILLS (When enabled)
          ======================================================== */}
      {enableProjectSwitcher && (
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4E845] font-semibold flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Select Project Cadastral Blueprint</span>
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Showing live inventory for each development
            </span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {BLUEPRINT_PROJECTS.map((p) => {
              const isActive = p.slug === activeSlug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setActiveSlug(p.slug);
                    setHoveredUnit(null);
                    setInspectedUnit(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide uppercase transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#D4E845] text-[#0B1F3A] font-bold shadow-md scale-102'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                  }`}
                >
                  <span>{p.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#0B1F3A]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          2. PROJECT META HEADER & CONTROLS TOOLBAR
          ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        
        {/* Project Info & RERA Verification */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4E845] bg-[#D4E845]/15 border border-[#D4E845]/30 px-2.5 py-0.5 rounded-full font-bold">
              {currentProjectMeta.typology}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-[#D4E845]" />
              <span>{currentProjectMeta.corridor}</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>{currentProjectMeta.rera}</span>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {currentProjectMeta.name} Master Plan
          </h3>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Units glow brass/lime on hover. Click any plot to open itemized cost sheet and simulated booking checkout.
          </p>
        </div>

        {/* Visualization Mode Toggle & Inventory Status Filter */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Dual Mode Switcher: CAD Blueprint vs Drone Aerial Photo */}
          <div className="bg-[#142132] p-1 rounded-full border border-white/15 flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setVisualMode('cad')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                visualMode === 'cad'
                  ? 'bg-[#D4E845] text-[#0B1F3A] font-bold shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>CAD Blueprint</span>
            </button>

            <button
              type="button"
              onClick={() => setVisualMode('aerial')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                visualMode === 'aerial'
                  ? 'bg-[#D4E845] text-[#0B1F3A] font-bold shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Aerial Drone View</span>
            </button>
          </div>

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#142132] border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-mono text-white focus:outline-none"
          >
            <option value="all">All Units ({stats.total})</option>
            <option value="available">Available Only ({stats.available})</option>
            <option value="on_hold">On Hold ({stats.onHold})</option>
            <option value="sold">Sold Units ({stats.sold})</option>
          </select>

        </div>

      </div>

      {/* ========================================================
          3. REAL-TIME STATS & STATUS LEGEND STRIP
          ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 px-4 my-4 rounded-2xl bg-[#121E2D] border border-white/10 text-xs font-mono">
        
        {/* Availability Counters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-slate-300">
              Available: <strong className="text-emerald-400 font-bold">{stats.available} Units</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
            <span className="text-slate-300">
              On Hold: <strong className="text-amber-400 font-bold">{stats.onHold} Units</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-slate-500 shadow-sm" />
            <span className="text-slate-300">
              Sold: <strong className="text-slate-400 font-bold">{stats.sold} Units</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 border-l border-white/10 pl-4">
            <span className="w-3 h-3 rounded-full bg-[#D4E845] animate-pulse" />
            <span className="text-[#D4E845]">Hover Glow</span>
          </div>
        </div>

        {/* Pricing & Inspection CTA */}
        <div className="text-right flex items-center space-x-3">
          {stats.lowestPrice > 0 && (
            <span className="text-slate-400">
              Starting from <strong className="text-white text-sm font-sans">{formatINR(stats.lowestPrice)}</strong>
            </span>
          )}
          <span className="text-[11px] text-[#D4E845] font-bold">100% JDA Patta</span>
        </div>

      </div>

      {/* ========================================================
          4. INTERACTIVE BLUEPRINT SVG / AERIAL CANVAS
          ======================================================== */}
      <div className="relative mt-2 bg-[#060F1A] rounded-[24px] border border-white/15 overflow-hidden flex items-center justify-center p-2 sm:p-4 min-h-[580px]">
        
        {/* Layer 1: Blueprint Drafting Grid Background */}
        <div className="absolute inset-0 bg-navy-blueprint opacity-60 pointer-events-none" />

        {/* Layer 2: Real High-Res Aerial Drone Photograph Background (when in Aerial Mode) */}
        {visualMode === 'aerial' && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 filter contrast-125 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundImage: `url('${currentProjectMeta.aerialBackdrop}')` }}
          />
        )}

        {/* Layer 3: Interactive Vector Cadastral SVG Map */}
        <svg
          viewBox="0 0 800 660"
          className="w-full h-auto max-w-4xl relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212, 232, 69, 0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect width="800" height="660" fill="url(#cadGrid)" />

          {/* ====================================================
              A. ARCHITECTURAL ROADS & MASTER INFRASTRUCTURE
              ==================================================== */}
          
          {/* Main Avenue Boulevard (North) - 60 FT Wide */}
          <rect x="40" y="190" width="720" height="25" fill="#0C1B2E" stroke="#D4E845" strokeWidth="0.8" strokeDasharray="6 3" />
          <line x1="40" y1="202.5" x2="760" y2="202.5" stroke="#D4E845" strokeWidth="0.6" strokeDasharray="8 6" opacity="0.6" />
          <text x="400" y="206" fill="#D4E845" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.85" letterSpacing="2">
            MAIN 60 FT GRAND ENTRANCE BOULEVARD &middot; JDA SANCTIONED
          </text>

          {/* Central Cross Avenue (South) - 40 FT Wide */}
          <rect x="40" y="490" width="720" height="24" fill="#0C1B2E" stroke="#D4E845" strokeWidth="0.8" strokeDasharray="6 3" />
          <line x1="40" y1="502" x2="760" y2="502" stroke="#D4E845" strokeWidth="0.6" strokeDasharray="8 6" opacity="0.6" />
          <text x="400" y="505" fill="#D4E845" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.85" letterSpacing="2">
            CENTRAL 40 FT SECTOR ACCESS AVENUE
          </text>

          {/* Vertical Sector Lanes (West & East) */}
          <rect x="175" y="70" width="20" height="555" fill="#0C1B2E" stroke="#D4E845" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.6" />
          <rect x="605" y="70" width="20" height="555" fill="#0C1B2E" stroke="#D4E845" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.6" />

          {/* Entrance Security Gatehouse Arch */}
          <g transform="translate(340, 15)">
            <rect x="0" y="0" width="120" height="35" rx="6" fill="#132338" stroke="#D4E845" strokeWidth="1.2" />
            <text x="60" y="16" fill="#D4E845" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              SECURITY ARCHWAY
            </text>
            <text x="60" y="28" fill="#FFFFFF" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.7">
              24/7 GATED SURVEILLANCE
            </text>
          </g>

          {/* ====================================================
              B. CENTRAL HAVELI CLUBHOUSE & LANDSCAPED GREENS
              ==================================================== */}
          <g transform="translate(205, 230)">
            {/* Outer Green Park Boundary */}
            <rect
              x="0"
              y="0"
              width="390"
              height="240"
              rx="16"
              fill={visualMode === 'aerial' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.10)'}
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="6 3"
            />

            {/* Inner Walking Track */}
            <rect x="15" y="15" width="360" height="210" rx="12" fill="none" stroke="rgba(212, 232, 69, 0.4)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Central Haveli Clubhouse Core */}
            <circle cx="195" cy="120" r="65" fill="#102033" stroke="#D4E845" strokeWidth="1.5" />
            <circle cx="195" cy="120" r="42" fill="none" stroke="#D4E845" strokeWidth="0.8" strokeDasharray="4 2" />
            
            {/* Swimming Pool (for Villas) or Reflection Fountain */}
            {currentProjectMeta.layoutType === 'villas' ? (
              <rect x="160" y="95" width="70" height="40" rx="6" fill="#06B6D4" opacity="0.8" stroke="#22D3EE" strokeWidth="1" />
            ) : (
              <circle cx="195" cy="120" r="22" fill="#0284C7" opacity="0.7" stroke="#38BDF8" strokeWidth="0.8" />
            )}

            <text x="195" y="115" fill="#FFFFFF" fontSize="10" fontFamily="serif" textAnchor="middle" fontWeight="bold">
              {currentProjectMeta.layoutType === 'villas' ? 'ROYAL CLUBHOUSE' : 'HAVELI CLUB'}
            </text>
            <text x="195" y="130" fill="#D4E845" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              &amp; CENTRAL GARDENS
            </text>

            {/* Landscaped Decorative Trees */}
            <circle cx="45" cy="45" r="10" fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="0.8" />
            <circle cx="345" cy="45" r="10" fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="0.8" />
            <circle cx="45" cy="195" r="10" fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="0.8" />
            <circle cx="345" cy="195" r="10" fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="0.8" />
          </g>

          {/* North Direction Compass Rose */}
          <g transform="translate(740, 40)">
            <circle cx="0" cy="0" r="20" fill="#0C1B2E" stroke="#D4E845" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points="0,-18 5,0 0,-4 -5,0" fill="#D4E845" />
            <polygon points="0,18 5,0 0,4 -5,0" stroke="#D4E845" strokeWidth="0.8" fill="none" />
            <text x="-4" y="-22" fill="#D4E845" fontSize="9" fontFamily="monospace" fontWeight="bold">N</text>
            <text x="6" y="3" fill="#D4E845" fontSize="6" fontFamily="monospace">E</text>
          </g>

          {/* ====================================================
              C. PLOTTED INVENTORY UNITS
              ==================================================== */}
          {projectUnits.slice(0, 19).map((unit, index) => {
            const coord = layoutCoordinates[index % layoutCoordinates.length];
            const isHovered = hoveredUnit?.id === unit.id;
            const style = getUnitStyle(unit.status, isHovered);

            // Clean Plot Display Code (e.g. Villa 102 -> V-102, Plot 14 -> P-14)
            const cleanCode = unit.unitNumber.replace(/^(Plot|Villa|Flat)\s*/i, (match) => {
              const ch = match.trim()[0].toUpperCase();
              return `${ch}-`;
            });

            return (
              <g
                key={unit.id}
                onClick={() => handlePlotClick(unit)}
                onMouseEnter={(e) => handleMouseMove(e, unit)}
                onMouseMove={(e) => handleMouseMove(e, unit)}
                onMouseLeave={() => setHoveredUnit(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Main Unit Plate */}
                <rect
                  x={coord.x}
                  y={coord.y}
                  width={coord.width}
                  height={coord.height}
                  rx="6"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  style={{ filter: style.filter }}
                  className="transition-all duration-300"
                />

                {/* Inner Cadastral Dimension Hatching */}
                <rect
                  x={coord.x + 3.5}
                  y={coord.y + 3.5}
                  width={coord.width - 7}
                  height={coord.height - 7}
                  rx="3"
                  fill="none"
                  stroke={style.stroke}
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />

                {/* Villa Portico / Car Porch Silhouette for Villa Projects */}
                {currentProjectMeta.layoutType === 'villas' && (
                  <rect
                    x={coord.x + 8}
                    y={coord.y + coord.height - 22}
                    width={coord.width - 16}
                    height="16"
                    rx="2"
                    fill="rgba(255,255,255,0.08)"
                    stroke={style.stroke}
                    strokeWidth="0.5"
                  />
                )}

                {/* Unit Identifier Code */}
                <text
                  x={coord.x + coord.width / 2}
                  y={coord.y + coord.height / 2 - 8}
                  fill="#FFFFFF"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {cleanCode}
                </text>

                {/* Area in Sq Yd */}
                <text
                  x={coord.x + coord.width / 2}
                  y={coord.y + coord.height / 2 + 7}
                  fill="#D4E845"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {unit.areaSqYd} SQ.YD
                </text>

                {/* Price Label */}
                <text
                  x={coord.x + coord.width / 2}
                  y={coord.y + coord.height / 2 + 20}
                  fill="#FFFFFF"
                  fontSize="8.5"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  opacity="0.9"
                  textAnchor="middle"
                >
                  {formatINR(unit.totalPrice).replace('₹', '₹ ')}
                </text>

                {/* Vastu Auspicious Facing Indicator */}
                <circle
                  cx={coord.x + coord.width - 8}
                  cy={coord.y + 8}
                  r="3.5"
                  fill={unit.facing.includes('East') || unit.facing.includes('North') ? '#10B981' : '#D4E845'}
                />

                {/* Sector Chip */}
                <text
                  x={coord.x + 8}
                  y={coord.y + 11}
                  fill="rgba(255,255,255,0.4)"
                  fontSize="7"
                  fontFamily="monospace"
                >
                  {coord.sector.split(' ')[1]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ====================================================
            D. LIVE FLOATING TOOLTIP (HUD ON HOVER)
            ==================================================== */}
        {hoveredUnit && (
          <div
            className="fixed pointer-events-none z-50 bg-[#0A1320]/95 border border-[#D4E845] p-4 rounded-2xl shadow-2xl backdrop-blur-md text-left w-72 animate-fadeIn text-white"
            style={{
              left: `${Math.min(window.innerWidth - 310, tooltipPos.x + 18)}px`,
              top: `${Math.max(15, tooltipPos.y - 160)}px`
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase block">
                  {hoveredUnit.unitNumber}
                </span>
                <span className="text-[10px] text-[#D4E845] font-mono">
                  {hoveredUnit.projectName}
                </span>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                hoveredUnit.status === 'available'
                  ? 'bg-emerald-500 text-white'
                  : hoveredUnit.status === 'on_hold'
                  ? 'bg-amber-500 text-black'
                  : 'bg-slate-600 text-white'
              }`}>
                {hoveredUnit.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Plot Dimension:</span>
                <span className="text-white font-bold">{hoveredUnit.areaSqYd} sq yd ({hoveredUnit.areaSqFt} sq ft)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vastu Facing:</span>
                <span className="text-[#D4E845] font-bold">{hoveredUnit.facing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Configuration:</span>
                <span className="text-white truncate max-w-[130px]">{hoveredUnit.configuration}</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-white/10 text-sm font-display font-bold text-white">
                <span>All-Inclusive:</span>
                <span className="text-[#D4E845]">{formatINR(hoveredUnit.totalPrice)}</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-[#D4E845] flex items-center justify-between font-bold">
              <span>* Click to inspect &amp; book online</span>
              <span>&rarr;</span>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          5. BLUEPRINT FOOTER CERTIFICATION STRIP
          ======================================================== */}
      <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-300 gap-3">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[#D4E845]" />
          <span>Cadastral Coordinate System &middot; Jaipur Development Authority Approved Master Scheme</span>
        </div>
        <div className="text-[11px] text-[#D4E845] font-semibold">
          * 100% Clear Titles &middot; RERA Escrow Account Sanctioned &middot; Immediate Registration
        </div>
      </div>

      {/* ========================================================
          6. PLOT INSPECTION DOSSIER MODAL (On Click of Any Plot)
          ======================================================== */}
      {inspectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0E1520] text-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl border border-[#D4E845]/40 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#131F2E]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-[#D4E845] uppercase tracking-wider font-bold">
                    {inspectedUnit.projectName}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase font-bold ${
                    inspectedUnit.status === 'available'
                      ? 'bg-emerald-500 text-white'
                      : inspectedUnit.status === 'on_hold'
                      ? 'bg-amber-500 text-black'
                      : 'bg-slate-600 text-white'
                  }`}>
                    {inspectedUnit.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  Unit {inspectedUnit.unitNumber} Dossier
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setInspectedUnit(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Specifications & Itemized Cost Breakdown */}
            <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs">
              
              {/* Specs Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase">Plot Area</span>
                  <span className="text-sm font-bold text-white">{inspectedUnit.areaSqYd} sq. yd.</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase">Built-up Area</span>
                  <span className="text-sm font-bold text-white">{inspectedUnit.areaSqFt} sq. ft.</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase">Vastu Facing</span>
                  <span className="text-sm font-bold text-[#D4E845]">{inspectedUnit.facing}</span>
                </div>
              </div>

              {/* Itemized Cost Sheet Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-[#D4E845] tracking-wider">
                  Itemized Cost Sheet (Official JDA &amp; RERA Sanctioned)
                </h4>
                
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 divide-y divide-white/10">
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-300">Base Property Consideration</span>
                    <span className="font-bold text-white">{formatExactINR(inspectedUnit.basePrice)}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-300">Internal Development Charges (IDC 4%)</span>
                    <span>{formatExactINR(inspectedUnit.developmentCharges)}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-300">Clubhouse Life Membership</span>
                    <span>{formatExactINR(inspectedUnit.clubMembership)}</span>
                  </div>
                  {inspectedUnit.parkingCharges > 0 && (
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-300">Covered Parking Bay</span>
                      <span>{formatExactINR(inspectedUnit.parkingCharges)}</span>
                    </div>
                  )}
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-300">Statutory GST (5%)</span>
                    <span>{formatExactINR(inspectedUnit.gst)}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-300">Rajasthan Stamp Duty &amp; Registration (6%)</span>
                    <span>{formatExactINR(inspectedUnit.stampDutyRegistration)}</span>
                  </div>
                  <div className="py-3 flex justify-between text-sm font-bold text-[#D4E845] border-t-2 border-[#D4E845]/40 font-display">
                    <span>Total All-Inclusive Estimate</span>
                    <span>{formatExactINR(inspectedUnit.totalPrice)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Action Footer */}
            <div className="p-6 border-t border-white/10 bg-[#131F2E] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setInspectedUnit(null);
                  navigate(`/units/${inspectedUnit.id}`);
                }}
                className="px-4 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase text-white hover:bg-white/10 transition-colors"
              >
                Full Product Page ↗
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setInspectedUnit(null);
                    setSiteVisitModalOpen(true, inspectedUnit.projectName);
                  }}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white transition-colors"
                >
                  Schedule Site Tour
                </button>

                {inspectedUnit.status === 'available' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setInspectedUnit(null);
                      navigate(`/book/${inspectedUnit.id}`);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold text-xs font-mono uppercase tracking-wider shadow-lg transition-transform active:scale-95"
                  >
                    Book Now (Token ₹1 Lakh) &rarr;
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="px-6 py-2.5 rounded-full bg-slate-700 text-slate-400 font-bold text-xs font-mono uppercase tracking-wider cursor-not-allowed"
                  >
                    Unit {inspectedUnit.status.replace('_', ' ')}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
