import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { PROJECTS } from '@/data/projectsData';
import { PropertyType, ProjectStatus } from '@/types';
import { formatINR, getMediaUrl } from '@/utils/media';
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Scale,
  MapPin,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  X,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const {
    units,
    shortlist,
    toggleShortlist,
    isShortlisted,
    compareList,
    toggleCompare,
    isCompared,
    setSiteVisitModalOpen,
    recentlyViewed,
  } = useStore();

  // Read URL query parameters if present
  const queryParams = useMemo(() => {
    const searchPart = currentPath.split('?')[1] || window.location.search.replace(/^\?/, '');
    const params = new URLSearchParams(searchPart);
    return {
      type: params.get('type') || 'all',
      location: params.get('location') || 'all',
      status: params.get('status') || 'all',
    };
  }, [currentPath]);

  // Filter States
  const [selectedLocation, setSelectedLocation] = useState(queryParams.location);
  const [selectedType, setSelectedType] = useState(queryParams.type);
  const [selectedStatus, setSelectedStatus] = useState(queryParams.status);
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [maxPrice, setMaxPrice] = useState(12000000); // 1.2 Cr
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'newest' | 'oldest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if query parameters change
  useEffect(() => {
    if (queryParams.type !== 'all') setSelectedType(queryParams.type);
    if (queryParams.location !== 'all') setSelectedLocation(queryParams.location);
    if (queryParams.status !== 'all') setSelectedStatus(queryParams.status);
  }, [queryParams]);

  // Reset filters
  const resetFilters = () => {
    setSelectedLocation('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedBedrooms('all');
    setMaxPrice(12000000);
    setSearchKeyword('');
    setSortBy('newest');
  };

  // Filter and Sort Logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      // Search Keyword
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        const matchesType = p.type.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc && !matchesType) return false;
      }

      // Location
      if (selectedLocation !== 'all' && p.location !== selectedLocation) {
        return false;
      }

      // Property Type
      if (selectedType !== 'all' && p.type !== selectedType) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Max Price
      if (p.startingPrice > maxPrice) {
        return false;
      }

      // Bedrooms
      if (selectedBedrooms !== 'all') {
        const targetBhk = parseInt(selectedBedrooms, 10);
        const hasMatchingBhk = p.configs.some(c => c.bedrooms === targetBhk);
        if (!hasMatchingBhk) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        return a.startingPrice - b.startingPrice;
      } else if (sortBy === 'price_desc') {
        return b.startingPrice - a.startingPrice;
      } else if (sortBy === 'oldest') {
        return a.sortOrder - b.sortOrder;
      }
      // default: newest first (ongoing first)
      if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
      if (a.status !== 'ongoing' && b.status === 'ongoing') return 1;
      return a.sortOrder - b.sortOrder;
    });
  }, [searchKeyword, selectedLocation, selectedType, selectedStatus, maxPrice, selectedBedrooms, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20 text-[#111827]">
      
      {/* Page Header Introduction */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-white border border-[#E5E7EB] text-[#0B1F3A] mb-3 shadow-2xs font-semibold">
              SIGNATURE DEVELOPMENTS · JAIPUR
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#0B1F3A] tracking-tight">
              Landmark Developments
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2 max-w-2xl font-normal leading-relaxed">
              Explore 16 master-planned residential plots, bespoke luxury villas, and contemporary apartments. Filter by location corridor, configuration, and budget.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <span className="text-xs font-mono font-bold text-[#0B1F3A] bg-white border border-[#E5E7EB] px-4 py-2 rounded-full shadow-2xs">
              {filteredProjects.length} Developments Found
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#D4E845] text-[#0B1F3A] text-xs font-bold uppercase rounded-full flex items-center space-x-1.5 shadow-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ========================================================
              LEFT COLUMN: STICKY FILTERS (DESKTOP)
          ======================================================== */}
          <aside className="hidden lg:block lg:col-span-1 bg-white border border-[#E5E7EB] p-6 rounded-[28px] shadow-sm sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#0B1F3A] font-bold flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0B1F3A]" />
                <span>Refine Search</span>
              </h3>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-mono text-[#6B7280] hover:text-[#0B1F3A] flex items-center space-x-1 uppercase font-semibold"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-1.5 font-semibold">
                Project Name or Keyword
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Landmark, Tulsi, Villa..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] pl-9 pr-3 py-2 text-xs rounded-xl text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-1.5 font-semibold">
                Location Corridor
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2 text-xs rounded-xl text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
              >
                <option value="all">All Prime Corridors</option>
                <option value="Ajmer Road">Ajmer Road SEZ Corridor</option>
                <option value="Sikar Road">Sikar Road Expressway</option>
                <option value="Sirsi Road">Sirsi Road / Vaishali</option>
                <option value="Bani Park">Bani Park Central</option>
                <option value="Kalwar Road">Kalwar Road</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-1.5 font-semibold">
                Property Typology
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2 text-xs rounded-xl text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
              >
                <option value="all">All Typologies</option>
                <option value="Villas">Luxury Villas & Enclaves</option>
                <option value="Residential Plots">Planned Residential Plots</option>
                <option value="Apartments">Luxury Apartments</option>
                <option value="Township">Integrated Townships</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-1.5 font-semibold">
                Construction Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStatus(selectedStatus === 'ongoing' ? 'all' : 'ongoing')}
                  className={`py-2 text-xs font-mono uppercase rounded-xl border transition-all ${
                    selectedStatus === 'ongoing'
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-bold shadow-xs'
                      : 'bg-[#F9FAFB] text-[#4B5563] border-[#E5E7EB] hover:bg-[#F3F4F6]'
                  }`}
                >
                  Ongoing
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatus(selectedStatus === 'completed' ? 'all' : 'completed')}
                  className={`py-2 text-xs font-mono uppercase rounded-xl border transition-all ${
                    selectedStatus === 'completed'
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-bold shadow-xs'
                      : 'bg-[#F9FAFB] text-[#4B5563] border-[#E5E7EB] hover:bg-[#F3F4F6]'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#4B5563] font-semibold">
                  Max Budget
                </label>
                <span className="text-xs font-mono font-bold text-[#0B1F3A]">
                  {formatINR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={2000000}
                max={12000000}
                step={200000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0B1F3A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9CA3AF] font-mono mt-1">
                <span>₹20 L</span>
                <span>₹1.2 Cr</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-1.5 font-semibold">
                Bedrooms / Configuration
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['all', '2', '3', '4'].map((bhk) => (
                  <button
                    key={bhk}
                    type="button"
                    onClick={() => setSelectedBedrooms(bhk)}
                    className={`py-1.5 text-xs font-mono uppercase rounded-xl border text-center transition-all ${
                      selectedBedrooms === bhk
                        ? 'bg-[#D4E845] text-[#0B1F3A] border-[#D4E845] font-bold shadow-xs'
                        : 'bg-[#F9FAFB] text-[#4B5563] border-[#E5E7EB] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {bhk === 'all' ? 'Any' : `${bhk} BHK`}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ========================================================
              RIGHT COLUMN: PROPERTY GRID & TOOLBAR
          ======================================================== */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white border border-[#E5E7EB] p-4 rounded-[24px] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-mono text-[#6B7280]">
                Showing <span className="font-bold text-[#0B1F3A]">{filteredProjects.length}</span> developments matching criteria
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort dropdown */}
                <div className="flex items-center space-x-1.5 text-xs font-mono">
                  <span className="text-[#6B7280] uppercase">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 text-xs rounded-lg text-[#111827] focus:outline-none focus:border-[#0B1F3A]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="oldest">Historical Order</option>
                  </select>
                </div>

                {/* Grid / List toggle */}
                <div className="hidden sm:flex border border-[#E5E7EB] rounded-xl p-0.5 bg-[#F9FAFB]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-2xs text-[#0B1F3A]' : 'text-[#9CA3AF]'}`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-2xs text-[#0B1F3A]' : 'text-[#9CA3AF]'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] p-12 text-center rounded-[28px] space-y-4">
                <Search className="w-12 h-12 text-[#9CA3AF] mx-auto" />
                <h3 className="font-display font-bold text-xl text-[#0B1F3A]">No developments matched your criteria</h3>
                <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                  Try broadening your location selection, adjusting budget limits, or clearing filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-mono uppercase tracking-wider rounded-full font-bold hover:bg-[#123D70] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Projects Results Grid / List */
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'space-y-6'
              }>
                {filteredProjects.map((project) => {
                  const representativeUnit = units.find(u => u.projectSlug === project.slug);
                  const isShort = representativeUnit ? isShortlisted(representativeUnit.id) : false;
                  const isComp = representativeUnit ? isCompared(representativeUnit.id) : false;

                  return (
                    <div
                      key={project.slug}
                      className={`bg-white border border-[#E5E7EB] rounded-[28px] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0B1F3A]/40 transition-all duration-300 group flex ${
                        viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col justify-between'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className={`relative bg-[#0B1F3A] overflow-hidden ${
                        viewMode === 'list' ? 'sm:w-72 h-56 sm:h-auto flex-shrink-0' : 'h-56'
                      }`}>
                        <img
                          src={getMediaUrl(project.cover, 900)}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                            project.status === 'ongoing' ? 'bg-[#D4E845] text-[#0B1F3A]' : 'bg-[#0B1F3A] text-white'
                          }`}>
                            {project.status === 'ongoing' ? 'Ongoing' : 'Delivered'}
                          </span>
                          <span className="bg-white/90 text-[#0B1F3A] text-[10px] font-mono px-2.5 py-1 rounded-full font-bold backdrop-blur-sm">
                            {project.type}
                          </span>
                        </div>

                        {/* Shortlist & Compare Actions */}
                        {representativeUnit && (
                          <div className="absolute top-3 right-3 flex space-x-1.5">
                            <button
                              type="button"
                              onClick={() => toggleShortlist(representativeUnit.id)}
                              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                                isShort
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-black/40 text-white hover:text-[#D4E845]'
                              }`}
                              title="Shortlist Unit"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isShort ? 'fill-white' : ''}`} />
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleCompare(representativeUnit.id)}
                              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                                isComp
                                  ? 'bg-[#D4E845] text-[#0B1F3A]'
                                  : 'bg-black/40 text-white hover:text-[#D4E845]'
                              }`}
                              title="Compare Property"
                            >
                              <Scale className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 text-white flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4E845]" />
                          <span className="text-[11px] font-mono text-white/90 uppercase font-semibold">
                            {project.location}, Jaipur
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B7280] block mb-1">
                                {project.classification}
                              </span>
                              <h3 className="text-xl font-display font-bold text-[#0B1F3A] group-hover:text-[#123D70] transition-colors">
                                <Link to={`/projects/${project.slug}`}>
                                  {project.name}
                                </Link>
                              </h3>
                            </div>

                            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 whitespace-nowrap">
                              {project.unitsCount.available} Available
                            </span>
                          </div>

                          <p className="text-xs text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Quick specs pill row */}
                          <div className="mt-3.5 pt-3 border-t border-[#E5E7EB] flex flex-wrap gap-2 text-[10px] font-mono text-[#6B7280]">
                            <span className="bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-full">
                              RERA: {project.reraNumber || 'Verified'}
                            </span>
                            <span className="bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-full">
                              {project.possessionLabel || 'Possession on Schedule'}
                            </span>
                          </div>
                        </div>

                        {/* Price & Primary Link */}
                        <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#6B7280] uppercase block">
                              Starting From
                            </span>
                            <span className="text-lg font-display font-extrabold text-[#0B1F3A]">
                              {formatINR(project.startingPrice)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/projects/${project.slug}`}
                              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0B1F3A] hover:bg-[#123D70] text-white text-xs font-semibold rounded-full transition-colors group/btn"
                            >
                              <span>Explore</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setSiteVisitModalOpen(true, project.name)}
                              className="hidden sm:inline-flex px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#E5E7EB] text-[#0B1F3A] text-xs font-semibold rounded-full transition-colors"
                            >
                              Visit
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ========================================================
                RECENTLY VIEWED DEVELOPMENTS & BROWSING LOG
            ======================================================== */}
            {recentlyViewed && recentlyViewed.length > 0 && (
              <div className="mt-10 bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E7EB] shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#6B7280] uppercase block font-semibold">
                      Browsing Continuity
                    </span>
                    <h4 className="text-lg font-display text-[#0B1F3A] font-bold">
                      Recently Viewed Portfolios
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#6B7280]">
                    {recentlyViewed.length} items logged
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {recentlyViewed.map(slug => {
                    const p = PROJECTS.find(proj => proj.slug === slug);
                    if (!p) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/projects/${p.slug}`}
                        className="flex items-center space-x-3 p-3 rounded-2xl border border-[#E5E7EB] hover:border-[#0B1F3A] hover:bg-[#FAF8F5] transition-all group"
                      >
                        <img
                          src={getMediaUrl(p.cover, 300)}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="block text-xs font-display font-bold text-[#0B1F3A] truncate group-hover:text-[#123D70]">
                            {p.name}
                          </span>
                          <span className="text-[11px] font-mono text-[#6B7280] block">
                            {formatINR(p.startingPrice)}
                          </span>
                          <span className="text-[10px] text-[#9CA3AF] font-mono truncate block">
                            {p.location}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-5/6 max-w-sm bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <h3 className="font-display font-bold text-lg text-[#0B1F3A]">Filter Developments</h3>
                <button type="button" onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#6B7280]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#4B5563] mb-1 font-semibold">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2 text-xs rounded-xl text-[#111827]"
                >
                  <option value="all">All Corridors</option>
                  <option value="Ajmer Road">Ajmer Road</option>
                  <option value="Sikar Road">Sikar Road</option>
                  <option value="Sirsi Road">Sirsi Road</option>
                  <option value="Bani Park">Bani Park</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#4B5563] mb-1 font-semibold">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-2 text-xs rounded-xl text-[#111827]"
                >
                  <option value="all">All Typologies</option>
                  <option value="Villas">Villas</option>
                  <option value="Residential Plots">Plots</option>
                  <option value="Apartments">Apartments</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#4B5563] font-semibold uppercase">Max Budget</span>
                  <span className="font-bold text-[#0B1F3A]">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={2000000}
                  max={12000000}
                  step={200000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0B1F3A]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#0B1F3A] text-white font-bold text-xs uppercase tracking-wider rounded-full text-center"
              >
                Apply Filters ({filteredProjects.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-transparent text-[#6B7280] text-xs font-mono uppercase text-center"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
