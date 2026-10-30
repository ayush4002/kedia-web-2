import React, { useState } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { PROJECTS } from '@/data/projectsData';
import { COMPANY_INFO } from '@/data/siteData';
import { formatINR, formatExactINR } from '@/utils/media';
import { UnitStatus, InventoryUnit, Booking, SiteVisitLead } from '@/types';
import {
  ShieldAlert,
  BarChart3,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  Edit,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Save,
  RefreshCw,
  ArrowUpRight,
  Plus,
  Trash2,
  Download,
  ShoppingBag,
  PackageCheck,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const {
    units,
    updateUnitStatus,
    updateUnitPrice,
    addUnit,
    deleteUnit,
    bookings,
    updateBookingStatus,
    leads,
    updateLeadStatus,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'units' | 'orders' | 'leads'>('overview');
  const [unitSearch, setUnitSearch] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Inline Unit Price Edit
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<number>(0);

  // Add New Unit Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProjectSlug, setNewProjectSlug] = useState('kedias-landmark');
  const [newUnitNumber, setNewUnitNumber] = useState('');
  const [newTypology, setNewTypology] = useState<'Villa' | 'Plot' | 'Apartment'>('Villa');
  const [newConfig, setNewConfig] = useState('3 BHK Luxury Villa');
  const [newAreaSqYd, setNewAreaSqYd] = useState(120);
  const [newBuiltUpSqFt, setNewBuiltUpSqFt] = useState(2100);
  const [newFacing, setNewFacing] = useState<'East' | 'North' | 'North-East' | 'Park-Facing' | 'Corner Plot'>('East');
  const [newBasePrice, setNewBasePrice] = useState(6500000);
  const [newFloor, setNewFloor] = useState('Ground + 1');

  // Selected Order for Details View
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);

  // Financial & Store Analytics
  const totalUnits = units.length;
  const availableCount = units.filter(u => u.status === 'available').length;
  const onHoldCount = units.filter(u => u.status === 'on_hold').length;
  const soldCount = units.filter(u => u.status === 'sold').length;

  const grossMerchandiseValue = units.reduce((acc, u) => acc + u.totalPrice, 0);
  const realizedTokenRevenue = bookings.reduce((acc, b) => acc + b.tokenAmountPaid, 0);
  const totalContractValueBooked = bookings.reduce((acc, b) => acc + b.totalUnitAmount, 0);
  const avgOrderValue = bookings.length > 0 ? Math.round(totalContractValueBooked / bookings.length) : 0;
  const leadConversionRate = leads.length > 0 ? ((bookings.length / (leads.length + bookings.length)) * 100).toFixed(1) : '0';

  // Unit Filtering
  const filteredUnits = units.filter(u => {
    if (selectedProjectFilter !== 'all' && u.projectSlug !== selectedProjectFilter) {
      return false;
    }
    if (selectedStatusFilter !== 'all' && u.status !== selectedStatusFilter) {
      return false;
    }
    if (unitSearch.trim()) {
      const q = unitSearch.toLowerCase();
      return (
        u.unitNumber.toLowerCase().includes(q) ||
        u.projectName.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.facing.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStartEditPrice = (u: InventoryUnit) => {
    setEditingUnitId(u.id);
    setEditPriceInput(u.basePrice);
  };

  const handleSavePrice = (uId: string) => {
    if (editPriceInput > 0) {
      updateUnitPrice(uId, editPriceInput);
      setEditingUnitId(null);
    }
  };

  const handleCreateUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitNumber.trim()) {
      showToast('Please enter a valid unit number (e.g. Villa 105)', 'info');
      return;
    }

    const matchedProject = PROJECTS.find(p => p.slug === newProjectSlug) || PROJECTS[0];
    const idc = Math.round(newBasePrice * 0.04);
    const club = newTypology === 'Villa' ? 75000 : 35000;
    const parking = newTypology === 'Villa' ? 150000 : 0;
    const gst = Math.round((newBasePrice + idc) * 0.05);
    const reg = Math.round(newBasePrice * 0.06);
    const total = newBasePrice + idc + club + parking + gst + reg;

    const unitId = `KED-${newProjectSlug.split('-')[0].toUpperCase()}-${newUnitNumber.replace(/\s+/g, '')}`;

    const newUnit: InventoryUnit = {
      id: unitId,
      unitNumber: newUnitNumber,
      projectSlug: matchedProject.slug,
      projectName: matchedProject.name,
      towerOrBlock: "Phase 1",
      unitType: newTypology,
      configuration: newConfig,
      bedrooms: newTypology === 'Villa' ? 3 : newTypology === 'Apartment' ? 3 : 0,
      bathrooms: newTypology === 'Villa' ? 3 : newTypology === 'Apartment' ? 3 : 0,
      areaSqFt: Number(newBuiltUpSqFt) || Number(newAreaSqYd) * 9,
      areaSqYd: Number(newAreaSqYd),
      facing: newFacing,
      floorLevel: newFloor,
      status: 'available',
      basePrice: Number(newBasePrice),
      developmentCharges: idc,
      clubMembership: club,
      parkingCharges: parking,
      gst,
      stampDutyRegistration: reg,
      totalPrice: total,
      isFeatured: true,
      specifications: {
        structure: "Reinforced Concrete Core & Brickwork",
        flooring: "Italian Glazed Vitrified Tiles",
        sanitary: "Kohler / Jaquar Concealed Brass Fittings",
        electrical: "Schneider Modular Switches & Fire-retardant Wiring",
        waterSupply: "Underground Storage & Rainwater Recharge"
      },
      possession: "Immediate / Ready for Possession"
    };

    addUnit(newUnit);
    setIsAddModalOpen(false);
    setNewUnitNumber('');
  };

  // CSV Export for Orders
  const handleExportOrdersCSV = () => {
    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Email", "Project", "Unit", "Token Paid (INR)", "Total Value (INR)", "Payment Mode", "Gateway Ref", "Status"];
    const rows = bookings.map(b => [
      b.bookingId,
      new Date(b.bookingDate).toLocaleDateString('en-IN'),
      `"${b.customerName}"`,
      `"${b.customerPhone}"`,
      b.customerEmail,
      `"${b.projectName}"`,
      b.unitNumber,
      b.tokenAmountPaid,
      b.totalUnitAmount,
      b.paymentMethod,
      b.paymentReference,
      b.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Kedia_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders report downloaded as CSV', 'success');
  };

  // CSV Export for Units
  const handleExportUnitsCSV = () => {
    const headers = ["Unit Code", "Project", "Typology", "Config", "Area (Sq. Yd.)", "Facing", "Base Price", "Total Price", "Status"];
    const rows = units.map(u => [
      u.unitNumber,
      `"${u.projectName}"`,
      u.unitType,
      `"${u.configuration}"`,
      u.areaSqYd,
      u.facing,
      u.basePrice,
      u.totalPrice,
      u.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Kedia_Catalog_Inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Catalog inventory downloaded as CSV', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            TOP ADMIN COMMAND HEADER (Spaciaz Luxury Style)
            ======================================================== */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-6 sm:p-10 mb-8 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-navy-blueprint opacity-20 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[#D4E845] bg-[#D4E845]/15 border border-[#D4E845]/30 px-3.5 py-1 rounded-full text-xs font-mono mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>KEDIA BUILDERS &middot; E-COMMERCE STORE ADMIN</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Store Operations &amp; Inventory Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1 max-w-2xl">
                Real-time two-way synchronization: any status change, price revision, or new product unit created here immediately updates the public website and client living blueprint.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold font-mono text-xs uppercase tracking-wider rounded-full flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Unit</span>
              </button>

              <Link
                to="/"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-full border border-white/20 flex items-center space-x-1.5 transition-colors"
              >
                <span>Live Public Store</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4E845]" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            EXECUTIVE E-COMMERCE KPI METRICS ROW
            ======================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Gross Merchandise Value */}
          <div className="bg-white p-6 rounded-[28px] border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Catalog GMV</span>
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#0E1520]">
                <TrendingUp className="w-4 h-4 text-[#846624]" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520] mt-2">
              {formatINR(grossMerchandiseValue)}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1 flex items-center justify-between">
              <span>{totalUnits} Units in Catalog</span>
              <span className="text-emerald-600 font-semibold">{availableCount} in stock</span>
            </div>
          </div>

          {/* Card 2: Realized Token Inflow */}
          <div className="bg-white p-6 rounded-[28px] border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Token Revenue</span>
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700 mt-2">
              {formatExactINR(realizedTokenRevenue)}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              From {bookings.length} Confirmed Token Orders
            </div>
          </div>

          {/* Card 3: Contract Value Under Booking */}
          <div className="bg-white p-6 rounded-[28px] border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Booked Contracts</span>
              <div className="w-9 h-9 rounded-full bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center">
                <PackageCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520] mt-2">
              {formatINR(totalContractValueBooked)}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              Avg Order: {formatINR(avgOrderValue)}
            </div>
          </div>

          {/* Card 4: Leads & Conversion */}
          <div className="bg-white p-6 rounded-[28px] border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
              <span>Lead Pipeline</span>
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520] mt-2">
              {leads.length} Leads
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1 flex items-center justify-between">
              <span>{leads.filter(l => l.status === 'new').length} Pending</span>
              <span className="text-emerald-600 font-semibold">{leadConversionRate}% Win Rate</span>
            </div>
          </div>

        </div>

        {/* ========================================================
            NAVIGATION TABS (Spaciaz Pill Switchers)
            ======================================================== */}
        <div className="flex items-center space-x-2 pb-6 overflow-x-auto mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Overview &amp; Revenue Analytics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('units')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'units'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Product Catalog ({units.length} Units)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Orders &amp; Allotments ({bookings.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Inbound Leads CRM ({leads.length})
          </button>
        </div>

        {/* ========================================================
            TAB 1: OVERVIEW & REVENUE ANALYTICS
            ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Project Inventory & Capacity Distribution */}
              <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-[#0E1520]">
                    Catalog Stock Distribution
                  </h3>
                  <span className="text-xs font-mono text-slate-500 uppercase">Live Stock Status</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {PROJECTS.map(p => {
                    const pUnits = units.filter(u => u.projectSlug === p.slug);
                    if (pUnits.length === 0) return null;
                    const avail = pUnits.filter(u => u.status === 'available').length;
                    const percent = Math.round((avail / pUnits.length) * 100);

                    return (
                      <div key={p.slug} className="space-y-1.5 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB]">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#0E1520]">{p.name}</span>
                          <span className="text-slate-500">
                            {avail} of {pUnits.length} Available ({percent}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              percent > 50 ? 'bg-emerald-500' : percent > 20 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Stream & Customer Activity */}
              <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-[#0E1520]">
                    Recent Order Allotments
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-mono text-[#0B1F3A] hover:underline uppercase font-bold"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {bookings.slice(0, 4).map(b => (
                    <div key={b.bookingId} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E5E7EB] flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-[#0E1520] text-sm font-sans">{b.customerName}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase">
                            {b.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-1">
                          Unit {b.unitNumber} &middot; {b.projectName} &middot; Token: {formatExactINR(b.tokenAmountPaid)}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(b.bookingDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Store Control Card */}
                <div className="mt-4 p-5 rounded-2xl bg-[#0E1520] text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#D4E845] uppercase">Order Reconciliation</span>
                    <p className="text-xs text-slate-300 mt-0.5">Export live transaction logs to accounting CSV</p>
                  </div>
                  <button
                    onClick={handleExportOrdersCSV}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-xs font-mono uppercase text-white flex items-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4E845]" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PRODUCT CATALOG & INVENTORY MANAGEMENT
            ======================================================== */}
        {activeTab === 'units' && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
            
            {/* Top Toolbar: Search, Filters, Add Button, Export */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
              
              {/* Search Bar */}
              <div className="flex items-center space-x-3 flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by unit code (Villa 102, Plot 14), project, or facing..."
                  value={unitSearch}
                  onChange={(e) => setUnitSearch(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-full px-4 py-2 text-xs font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                />
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                
                {/* Project Filter */}
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-full px-4 py-2 text-xs text-[#0E1520] focus:outline-none"
                >
                  <option value="all">All 16 Developments</option>
                  {PROJECTS.map(p => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-full px-4 py-2 text-xs text-[#0E1520] focus:outline-none"
                >
                  <option value="all">All Inventory Statuses</option>
                  <option value="available">Available (In Stock)</option>
                  <option value="on_hold">On Hold</option>
                  <option value="sold">Sold</option>
                </select>

                {/* Export Inventory CSV */}
                <button
                  type="button"
                  onClick={handleExportUnitsCSV}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0E1520] rounded-full font-bold uppercase text-[11px] flex items-center space-x-1 transition-colors"
                  title="Download Catalog CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>

                {/* Add Unit Button */}
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] rounded-full font-bold uppercase text-[11px] flex items-center space-x-1 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>

              </div>
            </div>

            {/* Units Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-slate-700">
                <thead className="bg-[#FAF8F5] text-slate-500 uppercase border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-3 px-4 text-left">Unit Code</th>
                    <th className="py-3 px-4 text-left">Project</th>
                    <th className="py-3 px-4 text-left">Typology &amp; Config</th>
                    <th className="py-3 px-4 text-left">Plot / Built Area</th>
                    <th className="py-3 px-4 text-left">Base Price</th>
                    <th className="py-3 px-4 text-left">Total All-In</th>
                    <th className="py-3 px-4 text-left">Stock Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUnits.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 font-mono">
                        No inventory units match your search filters.
                      </td>
                    </tr>
                  ) : (
                    filteredUnits.map(u => (
                      <tr key={u.id} className="hover:bg-[#F9FAFB] transition-colors">
                        
                        {/* Unit Number */}
                        <td className="py-3.5 px-4 font-bold text-[#0E1520] whitespace-nowrap">
                          {u.unitNumber}
                        </td>

                        {/* Project */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-semibold text-slate-800">{u.projectName}</span>
                        </td>

                        {/* Typology */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-slate-600">{u.configuration}</span>
                          <span className="text-[10px] text-slate-400 block">{u.facing} Facing</span>
                        </td>

                        {/* Area */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span>{u.areaSqYd} sq. yd.</span>
                          {u.areaSqFt > 0 && (
                            <span className="text-[10px] text-slate-400 block">{u.areaSqFt} sq. ft.</span>
                          )}
                        </td>

                        {/* Base Price (Inline Editable) */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {editingUnitId === u.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                value={editPriceInput}
                                onChange={(e) => setEditPriceInput(Number(e.target.value))}
                                className="w-28 px-3 py-1 border border-[#0E1520] rounded-full text-[#0E1520] font-mono bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => handleSavePrice(u.id)}
                                className="p-1.5 bg-[#0E1520] text-white rounded-full hover:bg-black"
                                title="Save Base Price"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1.5">
                              <span className="font-semibold">{formatINR(u.basePrice)}</span>
                              <button
                                type="button"
                                onClick={() => handleStartEditPrice(u)}
                                className="text-slate-400 hover:text-[#0E1520]"
                                title="Edit Base Price"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Total Price */}
                        <td className="py-3.5 px-4 font-bold text-[#0E1520] whitespace-nowrap">
                          {formatINR(u.totalPrice)}
                        </td>

                        {/* Status Toggle Dropdown */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={u.status}
                            onChange={(e) => updateUnitStatus(u.id, e.target.value as UnitStatus)}
                            className={`px-3 py-1 rounded-full border font-mono font-bold uppercase text-[10px] cursor-pointer transition-colors ${
                              u.status === 'available'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : u.status === 'on_hold'
                                ? 'bg-[#D4E845]/20 text-[#0E1520] border-[#D4E845]/40'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="available">Available</option>
                            <option value="on_hold">On Hold</option>
                            <option value="sold">Sold</option>
                          </select>
                        </td>

                        {/* Actions: View Product & Delete */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to={`/units/${u.id}`}
                              className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E7EB] hover:bg-slate-100 text-[#0E1520] uppercase text-[10px] font-bold"
                              title="Inspect Product Page"
                            >
                              View ↗
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove unit ${u.unitNumber} from inventory?`)) {
                                  deleteUnit(u.id);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete from Catalog"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Showing {filteredUnits.length} of {units.length} total units</span>
              <span>All changes automatically synchronized to customer portal</span>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: ORDERS & BOOKINGS LEDGER
            ======================================================== */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-xl font-display font-bold text-[#0E1520]">
                  E-Commerce Allotments &amp; Orders Ledger
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Verified token reservations, payment gateway references, and customer KYC records.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportOrdersCSV}
                className="px-4 py-2 bg-[#0E1520] hover:bg-black text-white text-xs font-mono uppercase tracking-wider rounded-full flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#D4E845]" />
                <span>Export Orders CSV</span>
              </button>
            </div>

            <div className="space-y-4">
              {bookings.map(b => (
                <div
                  key={b.bookingId}
                  className="p-5 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E7EB] hover:border-[#0E1520]/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-bold text-[#0E1520] text-base font-sans">{b.customerName}</span>
                      <span className="font-mono text-xs font-bold text-slate-500 bg-white border border-[#E5E7EB] px-2.5 py-0.5 rounded-full">
                        {b.bookingId}
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                        {b.paymentMethod}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Allotted Property</span>
                        <span className="font-semibold text-[#0E1520]">{b.unitNumber} ({b.projectName})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Contact &amp; KYC</span>
                        <span>{b.customerPhone} &middot; PAN: {b.customerPan}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Transaction Ref</span>
                        <span className="truncate block font-mono text-[11px]">{b.paymentReference}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-mono pt-1">
                      <span>Token Paid: <strong className="text-emerald-700">{formatExactINR(b.tokenAmountPaid)}</strong></span>
                      <span className="text-slate-400">&bull;</span>
                      <span>Total Value: <strong>{formatINR(b.totalUnitAmount)}</strong></span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500">Date: {new Date(b.bookingDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Order Status Workflow Dropdown & Details Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Fulfillment:</span>
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.bookingId, e.target.value)}
                        className="bg-white border border-[#E5E7EB] px-3 py-1.5 text-xs rounded-full font-mono font-bold uppercase text-[#0E1520] focus:outline-none"
                      >
                        <option value="confirmed">Confirmed (Token Paid)</option>
                        <option value="pending_verification">Pending KYC Verification</option>
                        <option value="agreement_pending">Agreement Drafting</option>
                        <option value="allotted">Allotted (Allotment Issued)</option>
                        <option value="registry_complete">Registry &amp; Handover Complete</option>
                        <option value="cancelled">Cancelled &amp; Refunded</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedOrder(b)}
                      className="px-4 py-1.5 bg-[#0E1520] text-white text-xs font-mono uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                    >
                      Cost Sheet &amp; Receipt ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 4: INBOUND LEADS CRM
            ======================================================== */}
        {activeTab === 'leads' && (
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-xl font-display font-bold text-[#0E1520]">
                  Inbound Site Tour &amp; Relationship CRM
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Prospective buyers who booked visits or inquired via the live web portal.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-500">
                Total Leads: <strong>{leads.length}</strong>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {leads.map(l => (
                <div
                  key={l.id}
                  className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#0E1520] text-sm font-sans">{l.name}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-700">{l.phone}</span>
                      {l.email && <span className="text-slate-500">({l.email})</span>}
                    </div>

                    <p className="text-slate-700">
                      Development Interest: <span className="font-semibold text-[#0E1520]">{l.project}</span>
                    </p>

                    {l.message && (
                      <p className="text-slate-500 italic bg-white p-2 rounded-lg border border-[#E5E7EB]">
                        "{l.message}"
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Visit Preferred: <strong>{l.preferredDate} ({l.preferredTime})</strong></span>
                      <span>&bull;</span>
                      <span>Assigned: {l.assignedAdvisor}</span>
                      <span>&bull;</span>
                      <span>Lead ID: {l.id}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    {/* Direct Contact Buttons */}
                    <a
                      href={`tel:${l.phone}`}
                      className="p-2 rounded-full bg-white border border-[#E5E7EB] text-[#0E1520] hover:bg-slate-100 transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`https://wa.me/${l.phone.replace(/\D/g, '')}?text=Namaste%20${encodeURIComponent(l.name)},%20this%20is%20Kedia%20Builders%20&%20Colonizers%20Jaipur%20regarding%20your%20site%20visit%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      title="WhatsApp Followup"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>

                    {/* Status Dropdown */}
                    <select
                      value={l.status}
                      onChange={(e) => updateLeadStatus(l.id, e.target.value as any)}
                      className="bg-white border border-[#E5E7EB] px-3 py-1.5 text-xs rounded-full uppercase font-bold text-[#0E1520] focus:outline-none"
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="site_visit_scheduled">Visit Scheduled</option>
                      <option value="closed">Deal Closed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          MODAL: ADD NEW UNIT / PRODUCT TO CATALOG
          ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-[#E5E7EB]">
            
            {/* Modal Header */}
            <div className="bg-[#0E1520] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4E845]">E-Commerce Inventory</span>
                <h2 className="text-xl font-display font-bold text-white mt-1">Add New Unit / Product</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateUnit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Development Project *
                  </label>
                  <select
                    value={newProjectSlug}
                    onChange={(e) => setNewProjectSlug(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  >
                    {PROJECTS.map(p => (
                      <option key={p.slug} value={p.slug}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Unit Identifier / Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Villa 108 or Plot 35"
                    value={newUnitNumber}
                    onChange={(e) => setNewUnitNumber(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Typology
                  </label>
                  <select
                    value={newTypology}
                    onChange={(e) => setNewTypology(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  >
                    <option value="Villa">Boutique Luxury Villa</option>
                    <option value="Plot">Master-Planned Plot</option>
                    <option value="Apartment">Modern Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Configuration
                  </label>
                  <input
                    type="text"
                    value={newConfig}
                    onChange={(e) => setNewConfig(e.target.value)}
                    placeholder="e.g. 3 BHK Luxury Villa"
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Plot Area (Sq. Yd.)
                  </label>
                  <input
                    type="number"
                    min={40}
                    value={newAreaSqYd}
                    onChange={(e) => setNewAreaSqYd(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Built-up Area (Sq. Ft.)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newBuiltUpSqFt}
                    onChange={(e) => setNewBuiltUpSqFt(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Vastu Facing
                  </label>
                  <select
                    value={newFacing}
                    onChange={(e) => setNewFacing(e.target.value as any)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  >
                    <option value="East">East Facing (Auspicious)</option>
                    <option value="North">North Facing</option>
                    <option value="North-East">North-East (Ishan)</option>
                    <option value="Park-Facing">Park-Facing Front</option>
                    <option value="Corner Plot">Corner Plot Dual-Road</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Base Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    step={50000}
                    min={500000}
                    required
                    value={newBasePrice}
                    onChange={(e) => setNewBasePrice(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#0E1520] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    Calculated All-In: ~{formatINR(newBasePrice * 1.15)} (incl. 4% IDC, 5% GST, 6% Reg)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">
                    Floor Level
                  </label>
                  <input
                    type="text"
                    value={newFloor}
                    onChange={(e) => setNewFloor(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#0E1520] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-mono uppercase text-slate-500 hover:text-[#0E1520]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4E845] hover:bg-[#c6db34] text-[#0B1F3A] font-bold font-mono text-xs uppercase tracking-wider rounded-full shadow-md"
                >
                  Publish Unit to Catalog &rarr;
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ORDER DETAILS & COST SHEET RECEIPT
          ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-[#E5E7EB]">
            
            <div className="bg-[#0E1520] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#D4E845] uppercase tracking-wider">Allotment Dossier</span>
                <h3 className="text-xl font-display font-bold text-white mt-0.5">Order #{selectedOrder.bookingId}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto font-mono text-xs">
              
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E5E7EB] space-y-1">
                <span className="font-bold text-sm text-[#0E1520] font-sans block">{selectedOrder.customerName}</span>
                <p className="text-slate-600">{selectedOrder.customerPhone} &middot; {selectedOrder.customerEmail}</p>
                <p className="text-slate-500">{selectedOrder.address}</p>
                <div className="pt-2 flex items-center space-x-4 text-[11px] text-slate-400">
                  <span>PAN: {selectedOrder.customerPan}</span>
                  <span>&bull;</span>
                  <span>Aadhar: {selectedOrder.customerAadhar}</span>
                </div>
              </div>

              {/* Itemized Cost Sheet */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#0E1520] uppercase text-[11px]">Itemized Cost Sheet</h4>
                <div className="border border-[#E5E7EB] rounded-2xl p-4 divide-y divide-slate-100">
                  <div className="py-2 flex justify-between">
                    <span>Base Price ({selectedOrder.unitNumber})</span>
                    <span className="font-semibold">{formatExactINR(selectedOrder.costBreakdown.basePrice)}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>IDC / EDC Development Charges (4%)</span>
                    <span>{formatExactINR(selectedOrder.costBreakdown.idcEdc)}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Clubhouse Life Membership</span>
                    <span>{formatExactINR(selectedOrder.costBreakdown.clubMembership)}</span>
                  </div>
                  {selectedOrder.costBreakdown.parking > 0 && (
                    <div className="py-2 flex justify-between">
                      <span>Covered Parking Bay</span>
                      <span>{formatExactINR(selectedOrder.costBreakdown.parking)}</span>
                    </div>
                  )}
                  <div className="py-2 flex justify-between">
                    <span>GST (Statutory 5%)</span>
                    <span>{formatExactINR(selectedOrder.costBreakdown.gst)}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Stamp Duty &amp; Registration (6%)</span>
                    <span>{formatExactINR(selectedOrder.costBreakdown.registration)}</span>
                  </div>
                  <div className="py-3 flex justify-between text-sm font-bold text-[#0E1520] border-t-2 border-[#0E1520]">
                    <span>Total All-Inclusive Unit Cost</span>
                    <span>{formatExactINR(selectedOrder.costBreakdown.total)}</span>
                  </div>
                  <div className="py-2 flex justify-between text-emerald-700 font-bold">
                    <span>Holding Token Received ({selectedOrder.paymentMethod})</span>
                    <span>- {formatExactINR(selectedOrder.tokenAmountPaid)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E5E7EB]">
                <span className="text-[11px] text-slate-400">
                  Transaction: {selectedOrder.paymentReference}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 bg-[#0E1520] text-white rounded-full text-xs font-mono uppercase"
                >
                  Close Dossier
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
