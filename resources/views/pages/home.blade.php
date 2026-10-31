@extends('layouts.app')

@section('title', 'Kedia Builders & Colonizers | The Jaipur Blueprint')

@section('content')

<!-- 1. HERO SECTION (Spaciaz Split Architectural Arch Layout) -->
<section class="relative min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] flex items-center py-6 lg:py-0 overflow-hidden bg-[#FAF8F5]">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
            
            <!-- Left Hero Arch Frame with Drone / Render Image -->
            <div class="lg:col-span-5 order-2 lg:order-1 flex justify-center">
                <div class="relative w-full max-w-sm sm:max-w-md lg:max-w-none group flex justify-center">
                    <!-- Architectural Arch Shape -->
                    <div class="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border-4 border-white aspect-[4/5] max-h-[min(500px,calc(100vh-10rem))] w-auto bg-[#0E1520]">
                        <img src="/media/img/2021/04/Kedia-Nikunj-1-1920.webp" 
                             alt="Kedia Luxury Architecture Jaipur" 
                             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             onerror="this.src='/assets/og-default.jpg';">
                        
                        <!-- Floating Glass Badge -->
                        <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0E1520]/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                            <div>
                                <div class="text-[10px] font-mono text-[#D4E845] uppercase tracking-wider">Live Development</div>
                                <div class="text-sm font-bold">Nikunj Villas · Sirsi Road</div>
                            </div>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                94% Handed Over
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Hero Typography & Headline -->
            <div class="lg:col-span-7 order-1 lg:order-2 space-y-4 lg:space-y-4 xl:space-y-6">
                
                <div class="space-y-4">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1520]/5 border border-[#0E1520]/10 text-xs font-mono uppercase tracking-wider text-[#0E1520]">
                        <span class="w-2 h-2 rounded-full bg-[#D4E845]"></span>
                        <span>{{ __('messages.hero_tag') }}</span>
                    </div>

                    <h1 class="font-serif text-3xl sm:text-5xl lg:text-[2.65rem] xl:text-[3.4rem] 2xl:text-[4rem] font-bold tracking-tight text-[#0E1520] leading-[1.08]">
                        {{ __('messages.hero_headline') }}
                    </h1>

                    <p class="text-xs sm:text-sm lg:text-base text-[#0E1520]/75 max-w-xl font-normal leading-relaxed">
                        {{ __('messages.hero_sub') }}
                    </p>
                </div>

                <!-- Action Button & Experience Pill -->
                <div class="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5 pt-1">
                    <a href="{{ route('projects.index') }}" class="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0E1520] hover:bg-[#162132] text-white font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-xl group">
                        <span>{{ __('messages.btn_explore_projects') }}</span>
                        <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4E845] text-[#0E1520] flex items-center justify-center font-bold text-xs group-hover:translate-x-1 transition-transform">
                            &rarr;
                        </span>
                    </a>

                    <!-- Experience Pill (40+ Years of experiences) -->
                    <div class="flex items-center gap-3 sm:gap-4 bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#0E1520]/10 shadow-sm">
                        <div class="flex items-center gap-2">
                            <span class="font-serif text-2xl sm:text-3xl font-bold text-[#0E1520]">44+</span>
                            <span class="text-[10px] sm:text-[11px] font-semibold text-[#0E1520]/70 leading-tight uppercase tracking-wider">Years of<br>Excellence</span>
                        </div>
                        <div class="w-px h-7 bg-[#0E1520]/10"></div>
                        <button type="button" onclick="openSiteVisitModal()" class="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#0E1520] hover:text-[#C8A24B] transition-colors">
                            <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF8F5] border border-[#0E1520]/15 flex items-center justify-center text-[9px] sm:text-[10px]">▶</span>
                            <span>Tour Video</span>
                        </button>
                    </div>
                </div>

                <!-- Instant Search / Filter Bar -->
                <form action="{{ route('projects.index') }}" method="GET" class="p-2 sm:p-2.5 bg-white rounded-2xl sm:rounded-3xl border border-[#0E1520]/10 shadow-lg grid grid-cols-1 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    <div class="px-3 py-1.5 sm:py-2">
                        <label class="block text-[10px] font-mono text-[#0E1520]/50 uppercase tracking-wider">{{ __('messages.search_status') }}</label>
                        <select name="status" class="w-full text-xs font-bold text-[#0E1520] bg-transparent focus:outline-none cursor-pointer">
                            <option value="all">{{ __('messages.filter_all') }}</option>
                            <option value="ongoing">{{ __('messages.status_ongoing') }}</option>
                            <option value="completed">{{ __('messages.status_completed') }}</option>
                        </select>
                    </div>
                    <div class="px-3 py-1.5 sm:py-2 sm:border-l border-[#0E1520]/10">
                        <label class="block text-[10px] font-mono text-[#0E1520]/50 uppercase tracking-wider">{{ __('messages.search_location') }}</label>
                        <select name="location" class="w-full text-xs font-bold text-[#0E1520] bg-transparent focus:outline-none cursor-pointer">
                            <option value="">All Jaipur Sectors</option>
                            <option value="Ajmer Road">Ajmer Road</option>
                            <option value="Sirsi Road">Sirsi Road</option>
                            <option value="Bani Park">Bani Park</option>
                            <option value="Sikar Road">Sikar Road</option>
                        </select>
                    </div>
                    <div class="px-3 py-1.5 sm:py-2 sm:border-l border-[#0E1520]/10">
                        <label class="block text-[10px] font-mono text-[#0E1520]/50 uppercase tracking-wider">{{ __('messages.search_type') }}</label>
                        <select name="type" class="w-full text-xs font-bold text-[#0E1520] bg-transparent focus:outline-none cursor-pointer">
                            <option value="all">All Properties</option>
                            <option value="villa">Luxury Villas</option>
                            <option value="plot">JDA Plots</option>
                            <option value="apartment">Apartments</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#D4E845] hover:bg-[#c2d733] text-[#0E1520] font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <span>Search</span>
                    </button>
                </form>

            </div>

        </div>
    </div>
</section>

<!-- 2. SIGNATURE 3-CARD ARCHITECTURAL GRID ("We developed landmark real estate projects") -->
<section class="py-20 bg-[#FAF8F5] border-t border-[#0E1520]/10">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-mono uppercase tracking-widest text-[#0E1520]/60">{{ __('messages.sec_who_we_are') }}</span>
            <h2 class="font-serif text-3xl sm:text-5xl font-bold text-[#0E1520] tracking-tight">
                {{ __('messages.sec_landmark_title') }}
            </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            <!-- Card 1: Obsidian Black (What We Do) -->
            <div class="rounded-3xl bg-[#0E1520] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[420px] shadow-xl relative overflow-hidden group">
                <div>
                    <span class="text-xs font-mono text-white/40 block mb-6">01.</span>
                    <h3 class="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">What we do</h3>
                    <p class="text-sm text-white/70 leading-relaxed">
                        We maintain this by ensuring absolute transparency, rigorous JDA title diligence, and professional conduct across every master-planned township in Jaipur.
                    </p>
                </div>
                <div class="pt-8">
                    <a href="{{ route('about') }}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors">
                        <span>Our Solutions</span>
                        <span class="text-[#D4E845]">&rarr;</span>
                    </a>
                </div>
            </div>

            <!-- Card 2: Lime Yellow (Our Impact) -->
            <div class="rounded-3xl bg-[#D4E845] text-[#0E1520] p-8 sm:p-10 flex flex-col justify-between min-h-[420px] shadow-xl relative overflow-hidden group">
                <div>
                    <span class="text-xs font-mono text-[#0E1520]/60 block mb-6">02.</span>
                    <h3 class="font-serif text-2xl sm:text-3xl font-bold mb-4 text-[#0E1520]">Our impact</h3>
                    <p class="text-sm text-[#0E1520]/80 leading-relaxed mb-6">
                        We work with both investors and aspiring families to build enduring residential landmarks that appreciate with unmatched capital returns.
                    </p>
                    <a href="{{ route('projects.index') }}" class="text-xs font-bold uppercase tracking-wider text-[#0E1520] underline hover:no-underline">
                        See Projects &rarr;
                    </a>
                </div>
                <div class="pt-6">
                    <div class="rounded-2xl overflow-hidden aspect-[16/9] shadow-inner bg-white/40">
                        <img src="/media/img/2021/04/Kedia-Nikunj-4-900.webp" alt="Kedia Impact" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>

            <!-- Card 3: Deep Slate / Walnut (Core Values) -->
            <div class="rounded-3xl bg-[#162132] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[420px] shadow-xl relative overflow-hidden group">
                <div>
                    <span class="text-xs font-mono text-white/40 block mb-6">03.</span>
                    <h3 class="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">Core values</h3>
                    <p class="text-sm text-white/70 leading-relaxed mb-6">
                        To empower homeowners with cutting-edge construction technologies, eco-friendly rainwater harvesting, and Vastu-compliant architectural layouts.
                    </p>
                    <a href="{{ route('about') }}" class="text-xs font-bold uppercase tracking-wider text-[#D4E845] underline hover:no-underline">
                        Discover More &rarr;
                    </a>
                </div>
                <div class="pt-6">
                    <div class="rounded-2xl overflow-hidden aspect-[16/9] shadow-inner bg-black/40">
                        <img src="/media/img/2021/04/Kedia-Nikunj-5-900.webp" alt="Kedia Core Values" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>

        </div>

    </div>
</section>

<!-- 3. INFINITE MARQUEE TICKER (Clean Horizontal Layout, No Vertical Drift) -->
<section class="py-6 bg-white border-y border-[#0E1520]/10 overflow-hidden">
    <div class="relative w-full overflow-hidden flex flex-nowrap">
        <div class="animate-marquee flex flex-nowrap items-center gap-12 whitespace-nowrap text-sm font-medium text-[#0E1520]">
            
            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">Master Planned Townships</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-6-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">Comprehensive Amenities</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-7-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">100% JDA Approved</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-8-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">Vastu &amp; Eco Harmony</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-9-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">4+ Decades of Trust (Est. 1980)</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-2-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">Prompt RERA Handover</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-3-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <!-- Repeated set for seamless loop -->
            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">Master Planned Townships</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-6-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">Comprehensive Amenities</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-7-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

            <div class="flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
                <span class="font-bold tracking-tight">100% JDA Approved</span>
                <span class="w-10 h-6 rounded-full overflow-hidden inline-block border border-[#0E1520]/20 flex-shrink-0">
                    <img src="/media/img/2021/04/Kedia-Nikunj-8-600.webp" class="w-full h-full object-cover">
                </span>
            </div>

        </div>
    </div>
</section>

<!-- 4. JAIPUR SKYLINE DARK STATS BANNER -->
<section class="py-24 bg-[#0B1522] text-white relative overflow-hidden">
    <!-- Skyline silhouette overlay -->
    <div class="absolute inset-0 bg-cover bg-bottom opacity-15" style="background-image: url('/media/img/2021/04/Kedia-Nikunj-thumbnail-1920.webp');"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-transparent to-[#0B1522]"></div>

    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center lg:text-left">
            
            <div class="space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <div class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">48<span class="text-[#D4E845]">+</span></div>
                <div class="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/60">Completed Projects</div>
                <div class="text-xs text-white/40">Successfully delivered across Jaipur</div>
            </div>

            <div class="space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <div class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">52<span class="text-[#D4E845]">+</span></div>
                <div class="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/60">Projects in Development</div>
                <div class="text-xs text-white/40">Ongoing infrastructure &amp; enclaves</div>
            </div>

            <div class="space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <div class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">2.3<span class="text-[#D4E845]">b+</span></div>
                <div class="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/60">Total Projects Cost</div>
                <div class="text-xs text-white/40">In capital asset valuation</div>
            </div>

            <div class="space-y-2">
                <div class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">18<span class="text-[#D4E845]">m+</span></div>
                <div class="text-xs sm:text-sm font-mono uppercase tracking-wider text-white/60">Square Feet of Property</div>
                <div class="text-xs text-white/40">Transforming the Pink City landscape</div>
            </div>

        </div>
    </div>
</section>

<!-- 5. "WHAT MAKES US DIFFERENT" 6-CARD GRID -->
<section class="py-24 bg-[#FAF8F5]">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div class="space-y-3">
                <span class="text-xs font-mono uppercase tracking-widest text-[#0E1520]/60">Why Invest in Kedia</span>
                <h2 class="font-serif text-3xl sm:text-5xl font-bold text-[#0E1520] tracking-tight">
                    What makes us different
                </h2>
            </div>
            <a href="{{ route('about') }}" class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0E1520] font-bold hover:text-[#C8A24B]">
                <span>Read Full Corporate History</span>
                <span>&rarr;</span>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Feature 1 -->
            <div class="p-8 rounded-3xl bg-white border border-[#0E1520]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="w-12 h-12 rounded-2xl bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center font-bold text-lg mb-6">
                    01
                </div>
                <h3 class="font-serif text-xl font-bold text-[#0E1520] mb-2">Exclusive Market Record</h3>
                <p class="text-sm text-[#0E1520]/70 leading-relaxed">
                    An impeccable legacy in Jaipur's real estate market developed over 4+ decades of transparent land tenure and zero litigation.
                </p>
            </div>

            <!-- Feature 2 -->
            <div class="p-8 rounded-3xl bg-white border border-[#0E1520]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="w-12 h-12 rounded-2xl bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center font-bold text-lg mb-6">
                    02
                </div>
                <h3 class="font-serif text-xl font-bold text-[#0E1520] mb-2">100% JDA Approved &amp; Sanctioned</h3>
                <p class="text-sm text-[#0E1520]/70 leading-relaxed">
                    Every township possesses individual JDA Pattas, 90A conversions, and RAJ-RERA clearances ready for immediate bank financing.
                </p>
            </div>

            <!-- Feature 3 -->
            <div class="p-8 rounded-3xl bg-white border border-[#0E1520]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="w-12 h-12 rounded-2xl bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center font-bold text-lg mb-6">
                    03
                </div>
                <h3 class="font-serif text-xl font-bold text-[#0E1520] mb-2">Connected &amp; Thriving Locations</h3>
                <p class="text-sm text-[#0E1520]/70 leading-relaxed">
                    Strategically located along Jaipur's highest growth corridors: Ajmer Road expressway, Sirsi Road, Bani Park, and Sikar Road.
                </p>
            </div>

            <!-- Feature 4 -->
            <div class="p-8 rounded-3xl bg-white border border-[#0E1520]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="w-12 h-12 rounded-2xl bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center font-bold text-lg mb-6">
                    04
                </div>
                <h3 class="font-serif text-xl font-bold text-[#0E1520] mb-2">Comprehensive Club Amenities</h3>
                <p class="text-sm text-[#0E1520]/70 leading-relaxed">
                    Clubhouses, infinity swimming pools, AC gymnasiums, banquet lawns, sports arenas, and senior citizen pavilions within the gated campus.
                </p>
            </div>

            <!-- Feature 5 -->
            <div class="p-8 rounded-3xl bg-white border border-[#0E1520]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="w-12 h-12 rounded-2xl bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center font-bold text-lg mb-6">
                    05
                </div>
                <h3 class="font-serif text-xl font-bold text-[#0E1520] mb-2">Vastu &amp; Eco Harmony</h3>
                <p class="text-sm text-[#0E1520]/70 leading-relaxed">
                    All layouts strictly follow Vedic Vastu guidelines, complemented by underground rainwater recharge shafts and solar street lights.
                </p>
            </div>

            <!-- Feature 6 -->
            <div class="p-8 rounded-3xl bg-white border border-[#0E1520]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="w-12 h-12 rounded-2xl bg-[#D4E845]/20 text-[#0E1520] flex items-center justify-center font-bold text-lg mb-6">
                    06
                </div>
                <h3 class="font-serif text-xl font-bold text-[#0E1520] mb-2">Prompt Delivery &amp; Security</h3>
                <p class="text-sm text-[#0E1520]/70 leading-relaxed">
                    Over 200 completed land development projects with timely handovers, boundary walls, 24/7 CCTV, and guarded security check-posts.
                </p>
            </div>

        </div>

    </div>
</section>

<!-- 6. "DISCOVER LUXURY LIVING AT AN AFFORDABLE PRICE" (Living Blueprint CAD & Drone Aerial Section) -->
<section class="py-24 bg-[#080E17] text-white relative">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Signature Developments Section Header with View Switcher (Matches CAD Blueprint & Dossiers) -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div class="space-y-3 max-w-2xl">
                <span class="text-xs font-mono uppercase tracking-widest text-[#D4E845]">Signature Developments</span>
                <h2 class="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                    Discover luxury living at an affordable price
                </h2>
                <p class="text-sm text-white/60">
                    Browse live property inventory like a boutique catalog. Check real-time availability, floor plans, and book online with test token.
                </p>
            </div>

            <!-- View Switcher Pills: Project Dossiers vs Living Blueprint Map -->
            <div class="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono flex-shrink-0">
                <button type="button" id="btnTabDossiers" onclick="toggleCatalogView('dossiers')" class="px-5 py-2.5 rounded-full text-white/70 hover:text-white transition-all font-semibold">
                    Project Dossiers
                </button>
                <button type="button" id="btnTabBlueprint" onclick="toggleCatalogView('blueprint')" class="px-5 py-2.5 rounded-full bg-[#D4E845] text-[#0E1520] font-bold shadow transition-all flex items-center gap-2">
                    <span>Living Blueprint Map</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>
            </div>
        </div>

        <!-- View 1: The Living Blueprint Interactive Cadastral Layout -->
        <div id="catalogBlueprintView" class="transition-all duration-300">
            @include('components.living-blueprint')
        </div>

        <!-- View 2: Project Dossiers Live Unit Boutique Catalog -->
        <div id="catalogDossiersView" class="hidden transition-all duration-300">
            <div class="rounded-3xl bg-[#09111C] border border-[#D4E845]/20 p-6 sm:p-10 shadow-2xl">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
                    <div>
                        <div class="text-xs font-mono tracking-widest uppercase text-[#D4E845] mb-1">
                            Live Master Inventory · Verified JDA Titles
                        </div>
                        <h3 class="font-serif text-2xl font-bold text-white">Curated Residence Dossiers</h3>
                    </div>
                    <div class="flex items-center gap-2 font-mono text-xs">
                        <span class="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">120 Total Units</span>
                        <span class="px-3 py-1.5 rounded-full bg-[#D4E845]/20 text-[#D4E845] border border-[#D4E845]/30">Instant Booking ₹1L</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                    @foreach($units->take(6) as $u)
                        <div class="p-6 rounded-2xl bg-[#0E1724] border border-white/10 hover:border-[#D4E845]/50 transition-all flex flex-col justify-between group">
                            <div>
                                <div class="flex items-center justify-between mb-4">
                                    <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">{{ $u->unit_code }}</span>
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase {{ $u->status === 'available' ? 'bg-emerald-500/20 text-emerald-400' : ($u->status === 'on_hold' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300') }}">
                                        {{ ucfirst(str_replace('_', ' ', $u->status)) }}
                                    </span>
                                </div>
                                <h4 class="font-serif text-lg font-bold text-white mb-1">{{ $u->title }}</h4>
                                <div class="text-xs text-white/50 mb-4">{{ $u->project_name }} · {{ $u->facing }} Facing</div>

                                <div class="grid grid-cols-2 gap-2 text-[11px] font-mono text-white/70 py-3 border-y border-white/5 mb-4">
                                    <div>Area: <span class="text-white font-bold">{{ $u->area_sqft }} sq.ft</span></div>
                                    <div>Plot: <span class="text-white font-bold">{{ $u->area_sqyd }} sq.yd</span></div>
                                    <div>Bedrooms: <span class="text-white font-bold">{{ $u->bedrooms }} BHK</span></div>
                                    <div>Floor: <span class="text-white font-bold">{{ $u->floor_level }}</span></div>
                                </div>
                            </div>

                            <div class="pt-2 flex items-center justify-between">
                                <div>
                                    <div class="text-[10px] font-mono text-white/50 uppercase">All-Inclusive</div>
                                    <div class="font-serif text-lg font-bold text-[#D4E845]">{{ $u->price_formatted }}</div>
                                </div>
                                <a href="{{ route('units.show', $u->unit_code) }}" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#D4E845] hover:text-[#0E1520] text-xs font-bold font-mono transition-colors">
                                    View Dossier &rarr;
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="pt-8 text-center border-t border-white/10 mt-8">
                    <a href="{{ route('projects.index') }}" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4E845] text-[#0E1520] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#c2d733] transition-all">
                        <span>Explore All 120 Units in Live Inventory Catalog</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            </div>
        </div>

        <script>
            function toggleCatalogView(view) {
                const blueprintView = document.getElementById('catalogBlueprintView');
                const dossiersView = document.getElementById('catalogDossiersView');
                const btnBlueprint = document.getElementById('btnTabBlueprint');
                const btnDossiers = document.getElementById('btnTabDossiers');

                if (view === 'blueprint') {
                    blueprintView.classList.remove('hidden');
                    dossiersView.classList.add('hidden');
                    btnBlueprint.className = 'px-5 py-2.5 rounded-full bg-[#D4E845] text-[#0E1520] font-bold shadow transition-all flex items-center gap-2';
                    btnDossiers.className = 'px-5 py-2.5 rounded-full text-white/70 hover:text-white transition-all font-semibold';
                } else {
                    blueprintView.classList.add('hidden');
                    dossiersView.classList.remove('hidden');
                    btnDossiers.className = 'px-5 py-2.5 rounded-full bg-[#D4E845] text-[#0E1520] font-bold shadow transition-all font-semibold';
                    btnBlueprint.className = 'px-5 py-2.5 rounded-full text-white/70 hover:text-white transition-all flex items-center gap-2';
                }
            }
        </script>

    </div>
</section>

<!-- 7. FEATURED PROJECTS CAROUSEL / GRID -->
<section class="py-24 bg-[#FAF8F5]">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div class="space-y-3">
                <span class="text-xs font-mono uppercase tracking-widest text-[#0E1520]/60">Architectural Plates</span>
                <h2 class="font-serif text-3xl sm:text-5xl font-bold text-[#0E1520] tracking-tight">
                    Featured Kedia Townships
                </h2>
            </div>
            <a href="{{ route('projects.index') }}" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E1520] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#162132]">
                <span>Browse All 16 Projects</span>
                <span class="text-[#D4E845]">&rarr;</span>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($featuredProjects as $project)
                <div class="group rounded-3xl bg-white border border-[#0E1520]/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <!-- Project Image with Arch Framing -->
                        <div class="relative aspect-[16/10] overflow-hidden bg-[#0E1520]">
                            <img src="{{ $project->hero_image }}" alt="{{ $project->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='/media/img/2021/04/Kedia-Nikunj-1-1920.webp'">
                            
                            <!-- Status Pill -->
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold {{ $project->status === 'ongoing' ? 'bg-[#D4E845] text-[#0E1520]' : 'bg-emerald-500 text-white' }}">
                                    {{ $project->status === 'ongoing' ? 'Under Construction' : 'Ready to Move' }}
                                </span>
                            </div>

                            <!-- RERA Badge -->
                            <div class="absolute bottom-3 right-4 font-mono text-[9px] text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                                {{ $project->rera_number }}
                            </div>
                        </div>

                        <!-- Card Content -->
                        <div class="p-6 space-y-3">
                            <div class="text-[11px] font-mono text-[#0E1520]/50 uppercase tracking-wider">
                                {{ $project->location }}
                            </div>
                            <h3 class="font-serif text-2xl font-bold text-[#0E1520] group-hover:text-[#C8A24B] transition-colors">
                                <a href="{{ route('projects.show', $project->slug) }}">{{ $project->title }}</a>
                            </h3>
                            <p class="text-xs text-[#0E1520]/70 line-clamp-2 leading-relaxed">
                                {{ $project->description }}
                            </p>
                        </div>
                    </div>

                    <!-- Footer Details -->
                    <div class="p-6 pt-0 border-t border-[#0E1520]/5 flex items-center justify-between mt-4">
                        <div>
                            <div class="text-[10px] font-mono text-[#0E1520]/50 uppercase">Starting From</div>
                            <div class="font-bold text-sm text-[#0E1520]">{{ $project->price_range }}</div>
                        </div>
                        <a href="{{ route('projects.show', $project->slug) }}" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#0E1520]/15 text-xs font-bold text-[#0E1520] group-hover:bg-[#D4E845] group-hover:border-[#D4E845] transition-colors">
                            <span>Explore Units</span>
                            <span>&rarr;</span>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>

    </div>
</section>

<!-- 8. LEADERSHIP SECTION ("Global executive leadership") -->
<section class="py-24 bg-[#0E1520] text-white border-t border-white/10">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-mono uppercase tracking-widest text-[#D4E845]">Visionary Custodians</span>
            <h2 class="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Global executive leadership
            </h2>
            <p class="text-xs sm:text-sm text-white/60">
                Combining 4+ decades of Jaipur real estate wisdom with state-of-the-art engineering and institutional governance.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Chairman Mr. Rajendra Kedia -->
            <div class="rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center space-y-4 hover:border-[#D4E845]/50 transition-all">
                <div class="w-36 h-36 rounded-full overflow-hidden border-2 border-[#D4E845] shadow-xl">
                    <img src="/media/img/2021/04/Mr-Rajendra-kedia-600.webp" alt="Mr Rajendra Kedia" class="w-full h-full object-cover">
                </div>
                <div>
                    <h3 class="font-serif text-xl font-bold text-white">Mr Rajendra Kedia</h3>
                    <div class="text-xs font-mono text-[#D4E845] uppercase tracking-wider mt-0.5">Founder &amp; Chairman</div>
                    <div class="text-[11px] font-mono text-white/40 mt-1">Pioneering Since 1980 (44+ Years)</div>
                </div>
                <p class="text-xs text-white/70 leading-relaxed">
                    Laid the foundation of Kedia Builders in 1980. Has guided the completion of over 200+ land development milestones with steadfast devotion to clear titles.
                </p>
            </div>

            <!-- Director Mr. Saurabh Kedia -->
            <div class="rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center space-y-4 hover:border-[#D4E845]/50 transition-all">
                <div class="w-36 h-36 rounded-full overflow-hidden border-2 border-[#D4E845] shadow-xl">
                    <img src="/media/img/2021/04/Mr-Saurabh-Kedia-600.webp" alt="Mr Saurabh Kedia" class="w-full h-full object-cover">
                </div>
                <div>
                    <h3 class="font-serif text-xl font-bold text-white">Mr Saurabh Kedia</h3>
                    <div class="text-xs font-mono text-[#D4E845] uppercase tracking-wider mt-0.5">Director</div>
                    <div class="text-[11px] font-mono text-white/40 mt-1">Master's · Bhawani Niketan (10+ Yrs)</div>
                </div>
                <p class="text-xs text-white/70 leading-relaxed">
                    Directs engineering from the inside out. Enforces top-tier construction benchmarks, earthquake-resistant design, and turnkey villa execution.
                </p>
            </div>

            <!-- CEO Mr. Gaurav Kedia -->
            <div class="rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col items-center text-center space-y-4 hover:border-[#D4E845]/50 transition-all">
                <div class="w-36 h-36 rounded-full overflow-hidden border-2 border-[#D4E845] shadow-xl">
                    <img src="/media/img/2021/04/Mr-Gaurav-Kedia-600.webp" alt="Mr Gaurav Kedia" class="w-full h-full object-cover">
                </div>
                <div>
                    <h3 class="font-serif text-xl font-bold text-white">Mr Gaurav Kedia</h3>
                    <div class="text-xs font-mono text-[#D4E845] uppercase tracking-wider mt-0.5">Chief Executive Officer</div>
                    <div class="text-[11px] font-mono text-white/40 mt-1">B.Com · Commerce College (8+ Yrs)</div>
                </div>
                <p class="text-xs text-white/70 leading-relaxed">
                    Believes the tiniest things make the biggest difference. The strategist studying buyer needs, digital booking workflows, and modern living ergonomics.
                </p>
            </div>

        </div>

    </div>
</section>

<!-- 9. PREFOOTER CTA BANNER ("Your dream home awaits") -->
<section class="py-20 bg-[#FAF8F5] relative overflow-hidden">
    <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[#0E1520] p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <!-- Decorative Accent Circle -->
            <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#D4E845]/10 pointer-events-none blur-3xl"></div>

            <div class="max-w-2xl mx-auto space-y-6 relative z-10">
                <span class="text-xs font-mono uppercase tracking-widest text-[#D4E845]">Reserve Your Slice of Jaipur</span>
                <h2 class="font-serif text-3xl sm:text-5xl font-bold text-white">
                    Your dream home awaits
                </h2>
                <p class="text-sm text-white/70 leading-relaxed">
                    Experience luxury architectural living with 100% JDA Patta sanctions. Schedule your private chauffeured site tour or book your unit online today.
                </p>
                <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <button type="button" onclick="openSiteVisitModal()" class="px-8 py-4 rounded-full bg-[#D4E845] hover:bg-[#c2d733] text-[#0E1520] font-bold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5">
                        Schedule Chauffeured Tour &rarr;
                    </button>
                    <a href="{{ route('projects.index') }}" class="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20">
                        Browse Unit Inventory
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
