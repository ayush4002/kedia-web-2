<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Kedia Builders & Colonizers | The Jaipur Blueprint')</title>
    <meta name="description" content="@yield('meta_description', 'Pioneering luxury real estate in Jaipur, Rajasthan since 1980. 200+ land development projects, JDA approved luxury villas, plots, and apartments.')">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/favicon.png">

    <!-- Google Fonts: Cormorant Garamond / Playfair Display, Inter, JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <!-- Tailwind CSS CDN with Spaciaz Architectural Config -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        kedia: {
                            navy: '#0E1520',
                            navyLight: '#162132',
                            paper: '#FAF8F5',
                            lime: '#D4E845',
                            gold: '#C8A24B',
                            stone: '#E8E3D8'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #FAF8F5;
            color: #0E1520;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }

        /* Blueprint grid pattern utility */
        .bg-blueprint-dark {
            background-color: #0E1520;
            background-image: radial-gradient(rgba(212, 232, 69, 0.08) 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .bg-blueprint-light {
            background-color: #FAF8F5;
            background-image: radial-gradient(rgba(14, 21, 32, 0.05) 1px, transparent 1px);
            background-size: 24px 24px;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #FAF8F5;
        }
        ::-webkit-scrollbar-thumb {
            background: #0E1520;
            border-radius: 4px;
        }

        /* Marquee ticker animation */
        @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: 200%;
            animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
    </style>

    @stack('styles')
</head>
<body class="min-h-screen flex flex-col antialiased">
    
    <!-- Top Navigation -->
    @include('components.navbar')

    <!-- Flash Alert Toasts -->
    @if(session('success'))
        <div id="flashToast" class="fixed bottom-6 right-6 z-50 bg-[#0E1520] text-white border border-[#D4E845] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
            <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            <div class="text-xs font-medium">{{ session('success') }}</div>
            <button onclick="this.parentElement.remove()" class="text-white/50 hover:text-white">&times;</button>
        </div>
    @endif

    @if(session('error'))
        <div id="flashToast" class="fixed bottom-6 right-6 z-50 bg-red-950 text-white border border-red-500 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <div class="text-xs font-medium">{{ session('error') }}</div>
            <button onclick="this.parentElement.remove()" class="text-white/50 hover:text-white">&times;</button>
        </div>
    @endif

    <!-- Main Content Yield -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Global Footer -->
    @include('components.footer')

    <!-- Global Schedule Site Visit Modal -->
    <div id="siteVisitModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-[#0E1520] border border-[#D4E845]/30 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl relative" id="siteVisitCard">
            <button type="button" onclick="closeSiteVisitModal()" class="absolute top-5 right-5 text-white/50 hover:text-white p-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div class="text-xs font-mono uppercase tracking-widest text-[#D4E845] mb-1">VIP Site Experience</div>
            <h3 class="font-serif text-2xl font-bold text-white mb-2">{{ __('messages.schedule_title') }}</h3>
            <p class="text-xs text-white/60 mb-6">{{ __('messages.schedule_desc') }}</p>

            <form action="{{ route('leads.store') }}" method="POST" class="space-y-4">
                @csrf
                <div>
                    <label class="block text-[11px] font-mono text-white/70 uppercase mb-1">Full Name *</label>
                    <input type="text" name="name" required placeholder="e.g. Rahul Sharma" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#D4E845] focus:outline-none">
                </div>
                <div>
                    <label class="block text-[11px] font-mono text-white/70 uppercase mb-1">Phone Number (WhatsApp) *</label>
                    <input type="tel" name="phone" required placeholder="+91 98290 00000" class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#D4E845] focus:outline-none">
                </div>
                <div>
                    <label class="block text-[11px] font-mono text-white/70 uppercase mb-1">Select Project</label>
                    <select name="project_name" class="w-full px-4 py-2.5 rounded-xl bg-[#162132] border border-white/10 text-white text-sm focus:border-[#D4E845] focus:outline-none">
                        <option value="Kedia's Landmark">Kedia's Landmark (Ajmer Road)</option>
                        <option value="Kedia's Atulyam">Kedia's Atulyam (Sirsi Road)</option>
                        <option value="Kedia's Tulsi">Kedia's Tulsi (Bani Park)</option>
                        <option value="Ganpati Greens">Ganpati Greens (Sikar Road)</option>
                        <option value="Nikunj Villas">Nikunj Villas (Sirsi Road)</option>
                        <option value="Kedia Aravali">Kedia Aravali Plots</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-[11px] font-mono text-white/70 uppercase mb-1">Date</label>
                        <input type="date" name="preferred_date" value="{{ date('Y-m-d', strtotime('+1 day')) }}" class="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#D4E845] focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-[11px] font-mono text-white/70 uppercase mb-1">Slot</label>
                        <select name="time_slot" class="w-full px-3 py-2.5 rounded-xl bg-[#162132] border border-white/10 text-white text-xs focus:border-[#D4E845] focus:outline-none">
                            <option>10:00 AM - 12:00 PM</option>
                            <option>12:00 PM - 02:00 PM</option>
                            <option>03:00 PM - 05:00 PM</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="pickup_requested" name="pickup_requested" value="1" class="rounded border-white/20 text-[#D4E845]">
                    <label for="pickup_requested" class="text-xs text-white/80">Request Chauffeur Pickup (Jaipur City)</label>
                </div>

                <button type="submit" class="w-full py-3 rounded-full bg-[#D4E845] hover:bg-[#c2d733] text-[#0E1520] font-bold text-xs uppercase tracking-wider transition-all shadow-lg mt-2">
                    Confirm Private Site Tour &rarr;
                </button>
            </form>
        </div>
    </div>

    <!-- Global AI Concierge Modal -->
    <div id="aiConciergeModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-[#0E1520] border border-[#D4E845]/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative">
            <button type="button" onclick="closeAiConciergeModal()" class="absolute top-5 right-5 text-white/50 hover:text-white p-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4E845] mb-1">
                <span>&#10024; Kedia AI Concierge</span>
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span class="text-white/60">Live Assistant</span>
            </div>
            <h3 class="font-serif text-2xl font-bold text-white mb-2">Find Your Ideal Residence</h3>
            <p class="text-xs text-white/60 mb-6">Select your criteria to get instant project and inventory recommendations based on 4+ decades of Jaipur real estate data.</p>

            <div class="space-y-4 text-xs font-mono">
                <div>
                    <label class="block text-white/70 uppercase mb-1">Target Budget Range</label>
                    <div class="grid grid-cols-3 gap-2">
                        <button type="button" onclick="filterByBudget('30-50')" class="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#D4E845] hover:text-[#D4E845] text-center">₹ 30 - 50 L</button>
                        <button type="button" onclick="filterByBudget('50-80')" class="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#D4E845] hover:text-[#D4E845] text-center">₹ 50 - 80 L</button>
                        <button type="button" onclick="filterByBudget('80+')" class="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#D4E845] hover:text-[#D4E845] text-center">₹ 80 L & Above</button>
                    </div>
                </div>

                <div>
                    <label class="block text-white/70 uppercase mb-1">Preferred Configuration</label>
                    <div class="grid grid-cols-3 gap-2">
                        <button type="button" onclick="filterByType('villa')" class="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#D4E845] hover:text-[#D4E845] text-center">Luxury Villa</button>
                        <button type="button" onclick="filterByType('plot')" class="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#D4E845] hover:text-[#D4E845] text-center">JDA Plot</button>
                        <button type="button" onclick="filterByType('apartment')" class="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#D4E845] hover:text-[#D4E845] text-center">3/4 BHK Flat</button>
                    </div>
                </div>

                <div id="aiRecommendationBox" class="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs hidden">
                    <div class="text-[#D4E845] font-bold mb-1" id="aiRecTitle">Recommended: Kedia's Landmark</div>
                    <div class="text-white/70 leading-relaxed" id="aiRecDesc">Located on Ajmer Road with JDA approved plots from ₹ 32.83 Lakh and turnkey villas.</div>
                    <a id="aiRecLink" href="{{ route('projects.show', 'kedias-landmark') }}" class="inline-block mt-3 px-4 py-2 rounded-full bg-[#D4E845] text-[#0E1520] font-bold text-[11px] uppercase tracking-wider">
                        Explore Township &rarr;
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        function openSiteVisitModal() {
            const modal = document.getElementById('siteVisitModal');
            modal.classList.remove('opacity-0', 'pointer-events-none');
        }
        function closeSiteVisitModal() {
            const modal = document.getElementById('siteVisitModal');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }

        function openAiConciergeModal() {
            const modal = document.getElementById('aiConciergeModal');
            modal.classList.remove('opacity-0', 'pointer-events-none');
        }
        function closeAiConciergeModal() {
            const modal = document.getElementById('aiConciergeModal');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }

        function filterByBudget(range) {
            const box = document.getElementById('aiRecommendationBox');
            const title = document.getElementById('aiRecTitle');
            const desc = document.getElementById('aiRecDesc');
            const link = document.getElementById('aiRecLink');
            box.classList.remove('hidden');

            if (range === '30-50') {
                title.innerText = "Recommended: Kedia's Landmark & Ganpati Greens";
                desc.innerText = "Features 111-150 sq.yd JDA approved plots and compact luxury villas starting from ₹ 32.83 Lakh.";
                link.href = "/projects/kedias-landmark";
            } else if (range === '50-80') {
                title.innerText = "Recommended: Kedia's Atulyam (Sirsi Road)";
                desc.innerText = "Smart living community with 3 BHK duplex villas and underground amenities starting from ₹ 58.00 Lakh.";
                link.href = "/projects/kedias-atulyam";
            } else {
                title.innerText = "Recommended: Kedia's Tulsi (Bani Park)";
                desc.innerText = "Ultra-luxury 3 & 4 BHK residences in prime central Jaipur with rooftop infinity lounge, starting ₹ 1.25 Cr.";
                link.href = "/projects/kedias-tulsi";
            }
        }

        function filterByType(type) {
            const box = document.getElementById('aiRecommendationBox');
            const title = document.getElementById('aiRecTitle');
            const desc = document.getElementById('aiRecDesc');
            const link = document.getElementById('aiRecLink');
            box.classList.remove('hidden');

            if (type === 'villa') {
                title.innerText = "Signature Villas: Nikunj Villas & Atulyam";
                desc.innerText = "Architect-crafted 3 & 4 BHK duplex villas with private terrace, personal lawn, and Vastu compliance.";
                link.href = "/projects/nikunj-villas";
            } else if (type === 'plot') {
                title.innerText = "Clear Title Plots: Kedia Aravali & Landmark";
                desc.innerText = "100% JDA Patta sanctioned residential plots with wide sector asphalt roads and water-harvesting.";
                link.href = "/projects/kedia-aravali";
            } else {
                title.innerText = "Prime Apartments: Kedia's Tulsi (Bani Park)";
                desc.innerText = "Exclusive high-rise luxury apartments with private elevator access and serene Bani Park address.";
                link.href = "/projects/kedias-tulsi";
            }
        }
    </script>

    @stack('scripts')
</body>
</html>
