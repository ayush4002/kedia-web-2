export interface GalleryItem {
  category: "project" | "event" | "press" | "csr";
  title: string;
  path: string;
  date?: string;
  description?: string;
  sort_order: number;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Project Gallery (Architectural Finished Developments & Elevations)
  {
    category: "project",
    title: "Kedia's Landmark — Grand Entrance Arch & Boulevard",
    path: "img/2025/04/DSC07902",
    date: "2025",
    description: "40-ft paved grand avenue with heritage terracotta gatehouse",
    sort_order: 1
  },
  {
    category: "project",
    title: "Nikunj Villas — Turnkey Royal Elevation",
    path: "img/2021/04/Kedia-Amara-4",
    date: "2024",
    description: "Duplex luxury villa with sandstone cornices and landscaped forecourt",
    sort_order: 2
  },
  {
    category: "project",
    title: "Kedia's Atulyam — Master Layout Aerial Vista",
    path: "img/2025/04/DJI_0788-3-scaled",
    date: "2025",
    description: "Plotted residential layout along Sikar Road expressway",
    sort_order: 3
  },
  {
    category: "project",
    title: "Kedia's Umang — Architectural Perspective",
    path: "img/2025/04/IMG_7780-2-scaled",
    date: "2025",
    description: "Multi-tier modern residential enclave with Vastu-compliant layout",
    sort_order: 4
  },
  {
    category: "project",
    title: "Ganpati Greens — Landscaped Central Park",
    path: "img/2025/04/DJI_0791",
    date: "2024",
    description: "Lush native flora and stone pathways connecting villa clusters",
    sort_order: 5
  },
  {
    category: "project",
    title: "Kedia's Tulsi — Bani Park Elevation Detail",
    path: "img/2025/04/DJI_0778-3-scaled",
    date: "2025",
    description: "Modern apartments featuring double-height entrance lobby",
    sort_order: 6
  },

  // 2. Event Gallery (Bhoomi Pujan, Customer Handover, Milestone Celebrations)
  {
    category: "event",
    title: "Amara Enclave · Auspicious Bhoomi Pujan Ceremony",
    path: "img/2021/04/Amara-Bhoomi-Pujan-1",
    date: "April 2021",
    description: "Vedic ground-breaking rituals conducted with founding patrons",
    sort_order: 7
  },
  {
    category: "event",
    title: "Foundation Stone Laying with Directors",
    path: "img/2021/04/Amara-Bhoomi-Pujan-10",
    date: "April 2021",
    description: "Mr. Saurabh Kedia and executive engineering team presiding",
    sort_order: 8
  },
  {
    category: "event",
    title: "Community Sacred Havan Gathering",
    path: "img/2021/04/Amara-Bhoomi-Pujan-11",
    date: "April 2021",
    description: "Welcoming patron families to the residential sanctuary",
    sort_order: 9
  },
  {
    category: "event",
    title: "Festive Customer Key Handover Celebration",
    path: "img/2021/04/Amara-Bhoomi-Pujan-14",
    date: "October 2022",
    description: "Celebrating milestone handovers with resident homeowners",
    sort_order: 10
  },
  {
    category: "event",
    title: "Kedia Annual Leadership Address",
    path: "img/2021/04/Amara-Bhoomi-Pujan-16",
    date: "2023",
    description: "Reviewing 4 decades of building excellence and next-generation vision",
    sort_order: 11
  },

  // 3. Press Releases & Awards
  {
    category: "press",
    title: "Excellence in Plotted Development Award 2024",
    path: "img/2021/04/Kedia-Awards-1",
    date: "Rajasthan Real Estate Summit",
    description: "Honoured for exemplary urban planning and transparent documentation",
    sort_order: 12
  },
  {
    category: "press",
    title: "Most Trusted Developer of Jaipur Award",
    path: "img/2021/04/Kedia-Awards-2",
    date: "State Builders Conclave",
    description: "Recognised for 41+ years of delivery integrity and customer trust",
    sort_order: 13
  },
  {
    category: "press",
    title: "Best Luxury Villa Architecture Distinction",
    path: "img/2021/04/Kedia-Awards-3",
    date: "Jaipur Design Council",
    description: "Conferred for craft excellence in Ganpati Greens and Nikunj Villas",
    sort_order: 14
  },
  {
    category: "press",
    title: "Sustainable Residential Community Trophy",
    path: "img/2021/04/Kedia-Awards-4",
    date: "Green Building Awards",
    description: "Recognising 100% rainwater recharge and native greening",
    sort_order: 15
  },
  {
    category: "press",
    title: "Pioneer in Real Estate Lifetime Citation",
    path: "img/2021/04/Kedia-Awards-5",
    date: "Rajasthan Industry Forum",
    description: "Tribute to Founder & Chairman Mr. Rajendra Kedia",
    sort_order: 16
  },

  // 4. CSR Initiatives (Corporate Social Responsibility)
  {
    category: "csr",
    title: "Green Jaipur Plantation Mission (10,000+ Saplings)",
    path: "img/2025/04/DJI_0783-3-scaled",
    date: "Annual Environmental Initiative",
    description: "Mass native tree plantation along Ajmer Road and Sikar Road green belts",
    sort_order: 17
  },
  {
    category: "csr",
    title: "Community Rainwater Harvesting Recharge Pits",
    path: "img/2025/04/DJI_0748-scaled",
    date: "Water Security Mission",
    description: "Groundwater replenishment wells installed across all 16 project master layouts",
    sort_order: 18
  },
  {
    category: "csr",
    title: "Free Health & Eye Checkup Camp for Construction Artisans",
    path: "img/2021/04/Amara-Bhoomi-Pujan-17",
    date: "Artisan Welfare Program",
    description: "Dedicated medical camps for on-site craftsmen, masons and their families",
    sort_order: 19
  },
  {
    category: "csr",
    title: "Jaipur Heritage Architecture Awareness Fellowship",
    path: "img/2021/04/Kedia-Awards-6",
    date: "Cultural Heritage Stewardship",
    description: "Sponsoring student architectural research on traditional Rajasthani haveli ventilation",
    sort_order: 20
  }
];
