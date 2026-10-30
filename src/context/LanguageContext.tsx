import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation
  nav_projects: { en: "Projects", hi: "परियोजनाएं" },
  nav_residential: { en: "Residential Plots", hi: "आवासीय भूखंड" },
  nav_villas: { en: "Luxury Villas", hi: "लक्जरी विला" },
  nav_apartments: { en: "Modern Apartments", hi: "आधुनिक अपार्टमेंट" },
  nav_all_projects: { en: "View All 16 Developments", hi: "सभी 16 परियोजनाएं देखें" },
  nav_about: { en: "About Us", hi: "हमारे बारे में" },
  nav_gallery: { en: "Gallery", hi: "गैलरी" },
  nav_calculator: { en: "Calculator", hi: "कैलकुलेटर" },
  nav_nri: { en: "NRI Desk", hi: "एनआरआई डेस्क" },
  nav_contact: { en: "Contact", hi: "संपर्क" },
  nav_admin: { en: "Admin", hi: "व्यवस्थापक" },
  nav_schedule_visit: { en: "Schedule Visit", hi: "विजिट बुक करें" },
  nav_patron: { en: "Patron Portal", hi: "ग्राहक पोर्टल" },
  nav_call_us: { en: "Call Us", hi: "कॉल करें" },
  nav_ai_concierge: { en: "AI Concierge", hi: "एआई सलाहकार" },

  // Hero Section
  hero_eyebrow: { en: "Since 1980 · Jaipur Heritage", hi: "1980 से · जयपुर की प्रतिष्ठित विरासत" },
  hero_title_line1: { en: "A new standard of", hi: "उत्कृष्टता एवं विश्वास का" },
  hero_title_line2: { en: "excellence", hi: "नया मानक" },
  hero_subtitle: {
    en: "The largest privately held real estate investors and managers in Jaipur, Rajasthan.",
    hi: "जयपुर, राजस्थान में निजी स्तर पर अग्रणी रियल एस्टेट विकास एवं प्रबंधन संस्थान।"
  },
  hero_cta_projects: { en: "View All Projects", hi: "सभी परियोजनाएं देखें" },
  hero_years_badge: { en: "years of experiences", hi: "वर्षों का गौरवशाली अनुभव" },
  hero_drone_tour: { en: "Watch Drone Tour", hi: "ड्रोन टूर देखें" },
  hero_2min: { en: "2 min preview", hi: "2 मिनट का दृश्य" },

  // Hero Search Filter Bar
  search_placeholder: { en: "Search by project, location, or unit...", hi: "प्रोजेक्ट, स्थान या यूनिट खोजें..." },
  search_any_location: { en: "Any Location / Corridor", hi: "सभी स्थान / कॉरिडोर" },
  search_any_type: { en: "Any Property Type", hi: "सभी संपत्ति प्रकार" },
  search_any_status: { en: "Any Status", hi: "सभी स्थिति" },
  search_any_bhk: { en: "Any BHK / Plot", hi: "सभी कमरे / भूखंड" },
  search_plots: { en: "Residential Plots", hi: "आवासीय भूखंड" },
  search_villas: { en: "Boutique Villas", hi: "लक्जरी विला" },
  search_apartments: { en: "Flats & Apartments", hi: "फ्लैट्स एवं अपार्टमेंट" },
  search_cta: { en: "Search Catalog", hi: "संपत्तियां खोजें" },

  // 3 Signature Cards
  card1_num: { en: "01.", hi: "०१." },
  card1_title: { en: "What we do", hi: "हमारा कार्य" },
  card1_desc: {
    en: "We develop landmark master-planned townships, modern residential plots, and royal boutique villas across Jaipur's fastest growing growth corridors.",
    hi: "हम जयपुर के सबसे तेजी से विकसित होते क्षेत्रों में ऐतिहासिक टाउनशिप, आधुनिक भूखंड और भव्य विला का निर्माण करते हैं।"
  },
  card1_link: { en: "Our Solutions", hi: "हमारी सेवाएं" },

  card2_num: { en: "02.", hi: "०२." },
  card2_title: { en: "Our impact", hi: "हमारा प्रभाव" },
  card2_desc: {
    en: "Over 44 years we have delivered 200+ land development projects, enriching 15,000+ families with transparent JDA & RERA titles.",
    hi: "44 से अधिक वर्षों में हमने 200+ परियोजनाएं पूर्ण की हैं और 15,000+ परिवारों को 100% जेडीए व रेरा स्वीकृत घर दिए हैं।"
  },
  card2_link: { en: "See Projects", hi: "प्रोजेक्ट्स देखें" },

  card3_num: { en: "03.", hi: "०३." },
  card3_title: { en: "Core values", hi: "मूल सिद्धांत" },
  card3_desc: {
    en: "To empower homebuyers with cutting-edge engineering, Vastu alignment, prompt possession, and total investment peace of mind.",
    hi: "विश्वसनीय निर्माण, वास्तु अनुकूलता, समय पर कब्जा और सुरक्षित निवेश प्रदान करना हमारा परम संकल्प है।"
  },
  card3_link: { en: "Discover More", hi: "और जानें" },

  // Ticker Ribbon
  ticker_1: { en: "Master Planned Townships", hi: "मास्टर प्लान्ड टाउनशिप्स" },
  ticker_2: { en: "Comprehensive Amenities", hi: "सर्वसुविधायुक्त क्लब व पार्क" },
  ticker_3: { en: "100% JDA Approved", hi: "100% जेडीए स्वीकृत" },
  ticker_4: { en: "Vastu & Eco Harmony", hi: "वास्तु एवं पर्यावरण अनुकूल" },
  ticker_5: { en: "4+ Decades of Trust", hi: "4+ दशकों का अटूट विश्वास" },
  ticker_6: { en: "Prompt RERA Handover", hi: "समय पर रेरा हैंडओवर" },

  // Stats Banner
  stat_projects_label: { en: "completed land projects", hi: "पूर्ण भूखंड परियोजनाएं" },
  stat_since_1980: { en: "Since 1980", hi: "स्थापना 1980" },
  stat_ongoing_label: { en: "projects in development", hi: "निर्माणाधीन परियोजनाएं" },
  stat_growth: { en: "Prime Jaipur Corridors", hi: "जयपुर के प्रमुख क्षेत्र" },
  stat_cost_label: { en: "total projects delivered", hi: "वितरित परियोजनाएं" },
  stat_patrons: { en: "15,000+ Happy Families", hi: "15,000+ संतुष्ट परिवार" },
  stat_area_label: { en: "square feet developed", hi: "वर्ग फीट विकसित क्षेत्रफल" },
  stat_jda: { en: "100% JDA Approved", hi: "100% जेडीए स्वीकृत" },

  // What Makes Us Different
  diff_eyebrow: { en: "Why Invest with Kedia", hi: "केडिया ही क्यों चुनें" },
  diff_title: { en: "What makes us different", hi: "केडिया बिल्डर्स की विशिष्टताएं" },
  diff_desc: {
    en: "Kedia Builders & Colonizers has shaped the architectural landscape of Jaipur since 1980 under Founder & Chairman Mr. Rajendra Kedia.",
    hi: "संस्थापक एवं चेयरमैन श्री राजेंद्र केडिया के नेतृत्व में केडिया बिल्डर्स 1980 से जयपुर के स्थापत्य को नया आयाम दे रहा है।"
  },

  // E-commerce & Living Blueprint
  dossiers_title: { en: "Discover luxury living at an affordable price", hi: "सुलभ दरों पर लक्जरी आवासीय जीवन खोजें" },
  dossiers_subtitle: {
    en: "Browse live property inventory like a boutique catalog. Check real-time availability, floor plans, and book online with test token.",
    hi: "ई-कॉमर्स कैटलॉग की तरह संपत्तियां देखें। वास्तविक समय में उपलब्धता जांचें और ऑनलाइन टोकन बुक करें।"
  },
  tab_project_dossiers: { en: "Project Dossiers", hi: "परियोजना सूची" },
  tab_living_blueprint: { en: "Living Blueprint Map", hi: "इंटरैक्टिव नक्शा (मैप)" },

  // Common CTAs & Labels
  cta_book_online: { en: "Book Unit Online (Token ₹1 Lakh)", hi: "ऑनलाइन बुक करें (टोकन ₹1 लाख)" },
  cta_schedule_inspection: { en: "Schedule Site Inspection", hi: "साइट विजिट बुक करें" },
  cta_download_cost_sheet: { en: "Download Official Cost Sheet (PDF)", hi: "लागत पत्रक डाउनलोड करें (PDF)" },
  cta_explore: { en: "Explore", hi: "विस्तार से देखें" },
  status_available: { en: "Available", hi: "उपलब्ध" },
  status_on_hold: { en: "On Hold", hi: "आरक्षित" },
  status_sold: { en: "Sold", hi: "बिका हुआ" },
  starting_from: { en: "Starting from", hi: "प्रारंभिक मूल्य" },
  all_inclusive_est: { en: "All-Inclusive Estimate", hi: "कुल अनुमानित मूल्य" },

  // Leadership
  leadership_eyebrow: { en: "Custodians of Trust", hi: "विश्वास के संरक्षक" },
  leadership_title: { en: "Executive Leadership", hi: "कार्यकारी नेतृत्व" },
  leadership_desc: {
    en: "Guiding Kedia Builders & Colonizers with visionary governance, hands-on construction rigor, and transparent customer relationships.",
    hi: "दूरदर्शी सोच, गुणवत्तापूर्ण निर्माण और पूर्ण पारदर्शिता के साथ केडिया बिल्डर्स का मार्गदर्शन।"
  },

  // Testimonials
  testimonials_title: { en: "Happy users feedback", hi: "संतुष्ट परिवारों के अनुभव" },

  // Pre-footer CTA
  prefooter_title: { en: "Your dream home awaits in Jaipur", hi: "जयपुर में आपका सपनों का घर आपकी प्रतीक्षा कर रहा है" },
  prefooter_subtitle: {
    en: "Schedule an on-ground chauffeured site tour, or reserve your desired plot or luxury villa with our online token booking engine.",
    hi: "नि:शुल्क वाहन द्वारा साइट विजिट बुक करें, या ऑनलाइन टोकन बुकिंग द्वारा अपना पसंदीदा प्लॉट या विला तुरंत सुरक्षित करें।"
  },
  prefooter_cta_visit: { en: "Book a Site Tour", hi: "साइट टूर बुक करें" },
  prefooter_cta_inventory: { en: "Explore Live Inventory", hi: "उपलब्ध संपत्तियां देखें" },

  // Footer
  footer_about_text: {
    en: "Pioneering the Jaipur real estate horizon since 1980. 200+ completed developments covering residential plotting, turnkey luxury villas, and boutique apartments.",
    hi: "1980 से जयपुर रियल एस्टेट में अग्रणी। 200+ पूर्ण परियोजनाएं जिनमें आवासीय भूखंड, लक्जरी विला और आधुनिक अपार्टमेंट शामिल हैं।"
  },
  footer_quick_links: { en: "Quick Portals", hi: "त्वरित लिंक्स" },
  footer_projects: { en: "Featured Developments", hi: "प्रमुख परियोजनाएं" },
  footer_headquarters: { en: "Jaipur Headquarters", hi: "जयपुर मुख्यालय" },
  footer_disclaimer: {
    en: "RERA Rajasthan Sanctioned Schemes. All project titles and sanctioned layouts are approved by the Jaipur Development Authority (JDA).",
    hi: "रेरा राजस्थान स्वीकृत योजनाएं। सभी परियोजनाएं जयपुर विकास प्राधिकरण (JDA) द्वारा विधिवत अनुमोदित हैं।"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kedia_lang_v2');
      return (saved === 'hi' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kedia_lang_v2', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string, fallback?: string): string => {
    if (DICTIONARY[key]) {
      return DICTIONARY[key][language] || DICTIONARY[key]['en'] || fallback || key;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
