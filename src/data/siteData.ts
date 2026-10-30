export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  experienceYears: number;
  education?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  project: string;
  rating: number;
  quote: string;
  avatar?: string;
  verifiedResident: boolean;
  isDemo: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  validUntil: string;
  code: string;
  description: string;
  applicableProjects: string[];
  isDemo: boolean;
}

export const COMPANY_INFO = {
  name: "Kedia Builders & Colonizers",
  shortName: "Kedia",
  tagline: "The premium lifestyle statements offer all the luxury you dream of, under one roof!",
  secondaryTagline: "Turning vision into reality since 1980.",
  establishedYear: 1980,
  yearsOfExcellence: 41,
  completedProjects: 200,
  headquarters: "Jaipur, Rajasthan, India",
  officeAddress: "A-6, Shyam Nagar, Benar Road, Jhotwara, Jaipur, Rajasthan 302012",
  phone: "+91 8302 500 500",
  rawPhone: "+918302500500",
  email: "kediabuildersandcolonizers@gmail.com",
  whatsapp: "+919829184872",
  whatsappFormatted: "+91 98291 84872",
  whatsappDefaultMsg: "Hi Kedia Builders, I would like to enquire about your landmark luxury properties in Jaipur.",
  reraAuthorityUrl: "https://rera.rajasthan.gov.in",
  socials: {
    instagram: "https://instagram.com/kediabuilders",
    facebook: "https://facebook.com/Kediabuildandcolonizers",
    youtube: "https://youtube.com/@kediabuilders",
    linkedin: "https://linkedin.com/company/kedia-builders",
  }
};

export const ABOUT_TEXT = {
  summary: "Kedia Builders and Colonizers has been a pioneering name in the real estate market of Jaipur. Founder & Chairman Mr Rajendra Kedia laid the foundation in 1980 and has created notable footprints in construction for over 4 decades. The next generation, Director Mr Saurabh Kedia and CEO Mr Gaurav Kedia, aspire to spread their wings wider and help clients achieve their dream house. Headquartered in Jaipur, the company has a diverse portfolio covering Property Development and Property Management Services. Over 41 years it has completed 200+ land development projects. Projects are designed to cater to all segments, and the company keeps pace with the changing world using modern construction equipment.",
  vision: "Kedia Builders and Colonizers strive to live up to traditional wisdom infused with modern concepts. Change is constant, and the quality of our projects reflects our upgraded technologies. We aspire to play an important role in building a new India and to be number one in real estate.",
  mission: "To deliver world-class construction, integrity of commitment, prompt delivery and security of investment. Qualified professionals maintain the standard in designing and constructing the dreams of our customers."
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mr. Rajendra Kedia",
    role: "Founder & Chairman (since 1980)",
    photo: "img/2021/04/Mr-Rajendra-kedia",
    education: "Pioneer in Rajasthan Land Development",
    bio: "Founder & Chairman Mr. Rajendra Kedia laid the foundation of Kedia Builders & Colonizers in 1980 and has created notable footprints in construction for over 4 decades. A respected pioneer in Jaipur's plotted development landscape, his enduring principles of uncompromised integrity, transparent documentation, and community welfare remain the keystone of the company.",
    experienceYears: 41,
  },
  {
    name: "Mr. Saurabh Kedia",
    role: "Director",
    photo: "img/2021/04/Mr-Saurabh-Kedia",
    education: "Master's from Bhawani Niketan",
    bio: "Master's from Bhawani Niketan; about 10 years in the business; hands-on, works from the inside out and sets a high bar for quality, commitment and dedication. Directs the architectural evolution and master planning of the group's signature residential townships.",
    experienceYears: 10,
  },
  {
    name: "Mr. Gaurav Kedia",
    role: "Chief Executive Officer",
    photo: "img/2021/04/Mr-Gaurav-Kedia",
    education: "B.Com from Commerce College",
    bio: "B.Com from Commerce College; about 8 years in the business; believes the tiniest things make the biggest difference; the 'behind the scenes man' who studies the market and client needs to build desirable residences. Spearheads customer journeys, operations, and technical innovations.",
    experienceYears: 8,
  }
];

export const CHAIRMAN_MESSAGE = {
  quote: "Real estate is not just about brick, mortar, or boundary stones; it is the sacred canvas where generations live, grow, and build their cherished memories. Since 1980, every address bearing the Kedia name carries our sacred pledge of safety, clear title, and enduring beauty.",
  author: "Mr. Rajendra Kedia",
  title: "Founder & Chairman (since 1980)",
  note: "Founder message — 41 years of trust."
};

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    year: "1980",
    title: "Foundation of Trust",
    description: "Founder & Chairman Mr. Rajendra Kedia lays the foundation of Kedia Builders & Colonizers in Jaipur, pioneering transparent land plotting."
  },
  {
    year: "1995",
    title: "Township Expansion",
    description: "Expansion into large-format integrated townships including Awadhpuri and Alkapuri, introducing planned community living to the Pink City."
  },
  {
    year: "2012",
    title: "Next Generation Leadership",
    description: "Director Mr. Saurabh Kedia and CEO Mr. Gaurav Kedia join the helm, infusing modern engineering, JDA compliance systems, and architectural rigor."
  },
  {
    year: "2018",
    title: "Luxury Villa Residences",
    description: "Launch of celebrated luxury villa enclaves Ganpati Greens, Nikunj Villas, and Virasat, setting a benchmark for turnkey craftsmanship."
  },
  {
    year: "2022",
    title: "Smart Enclaves & High-Rise",
    description: "Introduction of Kedia's Tulsi in Bani Park, Kedia's Landmark on Ajmer Road, and Kedia's Atulyam with underground cabling and smart security."
  },
  {
    year: "Today",
    title: "The Jaipur Blueprint Era",
    description: "Surpassing 200+ land development milestones with over 15,000 satisfied families, continuing our journey of sustainable, design-forward communities."
  }
];

export const WHY_INVEST_POINTS = [
  {
    id: "exclusive",
    title: "Exclusive",
    subtitle: "Impeccable market record",
    description: "An impeccable record in the real estate market of Jaipur built over 41+ years of honest delivery.",
    icon: "ShieldCheck"
  },
  {
    id: "connectivity",
    title: "Connectivity",
    subtitle: "Thriving strategic hubs",
    description: "Well-connected and thriving locations across Ajmer Road SEZ, Sikar Road, Bani Park, and Vaishali Nagar.",
    icon: "Compass"
  },
  {
    id: "comfort",
    title: "Comfort",
    subtitle: "Holistic amenities",
    description: "A comprehensive range of amenities in every community designed around modern family living.",
    icon: "Home"
  },
  {
    id: "peace",
    title: "Peaceful Environment",
    subtitle: "Clean green enclaves",
    description: "Projects situated away from pollution and the bustle of the city, offering tranquil open vistas.",
    icon: "Trees"
  },
  {
    id: "approvals",
    title: "Approvals",
    subtitle: "100% legal clarity",
    description: "JDA approved projects with verified freehold land titles and sanctioned master layouts.",
    icon: "FileCheck2"
  },
  {
    id: "nature",
    title: "Harmony with Nature",
    subtitle: "Vastu & eco-friendly",
    description: "Vastu and eco-friendly villas designed with native flora, solar illumination, and rainwater harvesting.",
    icon: "Sparkles"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Vikramaditya Rathore",
    project: "Nikunj Villas, Vaishali Nagar",
    rating: 5,
    quote: "Purchasing our villa with Kedia was the smoothest experience of our lives. From clear documentation to on-time handover, their transparency is truly exceptional.",
    verifiedResident: true,
    isDemo: true
  },
  {
    id: "test-2",
    name: "Mrs. Sunita & Rajesh Meena",
    project: "Kedia's Landmark, Ajmer Road",
    rating: 5,
    quote: "The development standards at Kedia's Landmark are top-notch — wide roads, demarcated boundary pillars, and green landscaping. The property value has already grown remarkably.",
    verifiedResident: true,
    isDemo: true
  },
  {
    id: "test-3",
    name: "Ar. Harshvardhan Shekhawat",
    project: "Kedia's Atulyam, Sikar Road",
    rating: 5,
    quote: "As an architect, I scrutinize layout planning and soil elevations closely. Kedia's attention to street setbacks, drainage gradients, and open green spaces is exemplary.",
    verifiedResident: true,
    isDemo: true
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "festive-2026",
    title: "Festive Jaipur Blueprint Privilege",
    subtitle: "Exclusive Registry Benefit on Select Plots & Villas",
    badge: "Limited Period Offer",
    validUntil: "November 30, 2026",
    code: "JAIPUR-FESTIVE",
    description: "Book any residential unit or plot this month and receive simulated waiver on initial club membership fees + customized architectural floor plan consultation.",
    applicableProjects: ["Kedia's Landmark", "Kedia's Atulyam", "Kedia's Umang", "Nikunj Villas"],
    isDemo: true
  },
  {
    id: "nri-advantage",
    title: "NRI Investor Priority Gateway",
    subtitle: "Dedicated Relationship Manager & Flexible Milestone Schedule",
    badge: "NRI Advantage",
    validUntil: "December 31, 2026",
    code: "NRI-KEDIA-VIP",
    description: "Special assisted virtual walk-throughs, digital power of attorney legal coordination, and end-to-end leasing management consultation for overseas patrons.",
    applicableProjects: ["All 16 Developments"],
    isDemo: true
  }
];

export const FAQ_ITEMS = [
  {
    question: "Are all Kedia projects approved by the Jaipur Development Authority (JDA)?",
    answer: "Yes, our projects are JDA approved with clear freehold titles, adhering to all statutory master plan norms, setback regulations, and layout sanctions."
  },
  {
    question: "How do I verify the RERA registration number of a project?",
    answer: "Each project page displays its official Rajasthan RERA registration number and scannable QR code. You can verify all sanctioned layout plans directly on the Rajasthan RERA portal at rera.rajasthan.gov.in."
  },
  {
    question: "Can I avail bank home loans on Kedia properties?",
    answer: "Yes, our projects are pre-approved by leading financial institutions including SBI, HDFC, ICICI, Axis Bank, and Bank of Baroda for instant processing and attractive interest rates."
  },
  {
    question: "How does the online unit reservation simulation work?",
    answer: "Our website offers an interactive e-commerce booking experience where you can browse real-time inventory, inspect transparent itemized cost sheets, and simulate test token reservations in demo mode without any financial liability."
  },
  {
    question: "Can I schedule a guided physical site visit?",
    answer: "Certainly. You can use our 'Schedule a Visit' feature to pick your preferred date and time slot. Our project advisors will coordinate a chauffeured site tour and provide on-ground orientation."
  }
];
