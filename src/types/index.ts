export type ProjectStatus = 'ongoing' | 'completed';

export type PropertyType = 'Residential Plots' | 'Villas' | 'Apartments' | 'Township';

export type UnitStatus = 'available' | 'on_hold' | 'sold';

export interface ProjectConfig {
  label: string;
  unit_type: string;
  carpet_sqft?: number | null;
  builtup_sqft?: number | null;
  saleable_sqft?: number | null;
  plot_sqyd?: number | null;
  price_label?: string | null;
  bedrooms?: number;
  bathrooms?: number;
}

export interface ProjectImage {
  path: string;
  kind: 'gallery' | 'floor_plan' | 'site_plan' | 'cover' | 'logo' | 'location_map' | string;
  caption?: string;
}

export interface ProjectNearby {
  place: string;
  distance: string;
  category: 'transit' | 'education' | 'healthcare' | 'commercial';
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  type: PropertyType;
  classification: 'Residential' | 'Commercial' | 'Single-Family' | 'Township';
  status: ProjectStatus;
  location: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  reraNumber: string | null;
  reraVerified: boolean;
  priceLabel: string;
  startingPrice: number; // in INR
  possessionLabel: string | null;
  cover: string;
  logo: string | null;
  brochurePath: string | null;
  brochureSize: number | null;
  salesPhone: string | null;
  sortOrder: number;
  amenities: string[];
  configs: ProjectConfig[];
  images: ProjectImage[];
  plans: ProjectImage[];
  specs: { group: string; items: string[] }[];
  nearby: ProjectNearby[];
  virtualTourUrl?: string;
  videoUrl?: string;
  unitsCount: {
    total: number;
    available: number;
    onHold: number;
    sold: number;
  };
}

export interface InventoryUnit {
  id: string;
  unitNumber: string;
  projectSlug: string;
  projectName: string;
  towerOrBlock: string;
  unitType: 'Plot' | 'Villa' | 'Apartment' | 'Duplex' | 'Penthouse';
  configuration: string; // e.g. "3 BHK Luxury Villa" or "108.6 Sq Yd Plot"
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  areaSqYd: number;
  facing: 'East' | 'North' | 'North-East' | 'Park-Facing' | 'Corner Plot';
  floorLevel: string;
  status: UnitStatus;
  basePrice: number;
  developmentCharges: number;
  clubMembership: number;
  parkingCharges: number;
  gst: number;
  stampDutyRegistration: number;
  totalPrice: number;
  isFeatured: boolean;
  floorPlanImage?: string;
  specifications: Record<string, string>;
  possession: string;
}

export interface PaymentMilestone {
  milestone: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'upcoming' | 'pending';
}

export interface Booking {
  bookingId: string;
  unitId: string;
  unitNumber: string;
  projectSlug: string;
  projectName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPan: string;
  customerAadhar: string;
  address: string;
  bookingDate: string;
  tokenAmountPaid: number;
  totalUnitAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'NEFT';
  paymentReference: string;
  status: 'confirmed' | 'pending_verification' | 'allotted' | 'agreement_pending' | 'registry_complete' | 'cancelled';
  paymentSchedule: PaymentMilestone[];
  costBreakdown: {
    basePrice: number;
    idcEdc: number;
    clubMembership: number;
    parking: number;
    gst: number;
    registration: number;
    total: number;
  };
}

export interface SiteVisitLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  project: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  source: 'website_modal' | 'contact_page' | 'project_sticky' | 'cost_sheet' | 'loan_calculator';
  createdAt: string;
  status: 'new' | 'contacted' | 'site_visit_scheduled' | 'closed';
  assignedAdvisor: string;
}

export interface CustomerUser {
  phone: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  token?: string;
}
