import React, { createContext, useContext, useState, useEffect } from 'react';
import { InventoryUnit, Booking, SiteVisitLead, CustomerUser, UnitStatus } from '@/types';
import { INITIAL_UNITS } from '@/data/unitsData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'brass';
  message: string;
}

interface StoreContextType {
  // Units state
  units: InventoryUnit[];
  updateUnitStatus: (unitId: string, newStatus: UnitStatus) => void;
  updateUnitPrice: (unitId: string, newBasePrice: number) => void;
  addUnit: (newUnit: InventoryUnit) => void;
  deleteUnit: (unitId: string) => void;

  // Shortlist state
  shortlist: string[]; // unit IDs
  toggleShortlist: (unitId: string) => void;
  isShortlisted: (unitId: string) => boolean;
  clearShortlist: () => void;

  // Compare state (up to 3 units)
  compareList: string[]; // unit IDs
  toggleCompare: (unitId: string) => void;
  removeFromCompare: (unitId: string) => void;
  isCompared: (unitId: string) => boolean;
  clearCompare: () => void;

  // Recently Viewed state
  recentlyViewed: string[]; // project slugs or unit IDs
  addRecentlyViewed: (idOrSlug: string) => void;

  // Bookings state
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: any) => void;

  // Leads / Enquiries state
  leads: SiteVisitLead[];
  addLead: (lead: Omit<SiteVisitLead, 'id' | 'createdAt' | 'status' | 'assignedAdvisor'>) => void;
  updateLeadStatus: (leadId: string, status: SiteVisitLead['status']) => void;

  // User Auth State
  currentUser: CustomerUser | null;
  loginWithOTP: (phone: string, name?: string) => Promise<boolean>;
  logout: () => void;

  // Modal / UI states
  isSiteVisitModalOpen: boolean;
  setSiteVisitModalOpen: (open: boolean, preselectedProject?: string) => void;
  selectedProjectForVisit: string;

  isShortlistDrawerOpen: boolean;
  setShortlistDrawerOpen: (open: boolean) => void;

  isCompareModalOpen: boolean;
  setCompareModalOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'brass') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_BOOKINGS: Booking[] = [
  {
    bookingId: "KED-2026-7821",
    unitId: "KED-Villa102",
    unitNumber: "Villa 102",
    projectSlug: "nikunj-villas",
    projectName: "Nikunj Villas",
    customerName: "Dr. Vikramaditya Rathore",
    customerEmail: "vikram.rathore@example.com",
    customerPhone: "+91 98290 44123",
    customerPan: "ABCDE1234F",
    customerAadhar: "XXXX-XXXX-8912",
    address: "C-42, Tilak Nagar, Jaipur",
    bookingDate: "2026-09-15T10:30:00Z",
    tokenAmountPaid: 100000,
    totalUnitAmount: 8850000,
    paymentMethod: "UPI",
    paymentReference: "UPI/20260915/789123891",
    status: "confirmed",
    paymentSchedule: [
      { milestone: "Booking Token (Paid)", percentage: 10, amount: 885000, dueDate: "15 Sep 2026", status: "paid" },
      { milestone: "Execution of Agreement for Sale", percentage: 15, amount: 1327500, dueDate: "15 Nov 2026", status: "upcoming" },
      { milestone: "Completion of Plinth Beam", percentage: 20, amount: 1770000, dueDate: "15 Jan 2027", status: "pending" },
      { milestone: "Completion of Ground Floor Slab", percentage: 25, amount: 2212500, dueDate: "15 Mar 2027", status: "pending" },
      { milestone: "Handover & Notice of Possession", percentage: 30, amount: 2655000, dueDate: "30 Jun 2027", status: "pending" }
    ],
    costBreakdown: {
      basePrice: 8500000,
      idcEdc: 340000,
      clubMembership: 75000,
      parking: 150000,
      gst: 442000,
      registration: 510000,
      total: 10017000
    }
  },
  {
    bookingId: "KED-2026-5541",
    unitId: "KLA-Plot12",
    unitNumber: "Plot 12",
    projectSlug: "kedias-landmark",
    projectName: "Kedia's Landmark",
    customerName: "Mrs. Meenakshi Agarwal",
    customerEmail: "meenakshi.agarwal@example.com",
    customerPhone: "+91 94140 88231",
    customerPan: "FGHIJ5678K",
    customerAadhar: "XXXX-XXXX-4521",
    address: "B-18, Tonk Road, Jaipur",
    bookingDate: "2026-10-02T14:15:00Z",
    tokenAmountPaid: 50000,
    totalUnitAmount: 3105000,
    paymentMethod: "NetBanking",
    paymentReference: "NET/HDFC/20261002/99120",
    status: "allotted",
    paymentSchedule: [
      { milestone: "Booking Token (Paid)", percentage: 15, amount: 465750, dueDate: "02 Oct 2026", status: "paid" },
      { milestone: "Agreement Signing (30 Days)", percentage: 35, amount: 1086750, dueDate: "02 Nov 2026", status: "upcoming" },
      { milestone: "Registry & Plot Handover", percentage: 50, amount: 1552500, dueDate: "15 Dec 2026", status: "pending" }
    ],
    costBreakdown: {
      basePrice: 2850000,
      idcEdc: 114000,
      clubMembership: 35000,
      parking: 0,
      gst: 0,
      registration: 171000,
      total: 3170000
    }
  }
];

const SEED_LEADS: SiteVisitLead[] = [
  {
    id: "LEAD-101",
    name: "Rajesh Singhania",
    phone: "+91 98291 00219",
    email: "rajesh.singhania@example.com",
    project: "Kedia's Landmark",
    preferredDate: "2026-11-04",
    preferredTime: "Morning (10:00 AM – 1:00 PM)",
    message: "Looking for corner plot options 150+ sq yd near the main boulevard.",
    source: "website_modal",
    createdAt: "2026-10-27T09:12:00Z",
    status: "site_visit_scheduled",
    assignedAdvisor: "Amit Sharma"
  },
  {
    id: "LEAD-102",
    name: "Dr. Ananya Mathur",
    phone: "+91 98290 77142",
    email: "ananya.mathur@hospital.org",
    project: "Kedia's Umang",
    preferredDate: "2026-11-05",
    preferredTime: "Afternoon (2:00 PM – 5:00 PM)",
    message: "Interested in 4 BHK East facing villa configuration. Please confirm possession timeline.",
    source: "project_sticky",
    createdAt: "2026-10-28T16:45:00Z",
    status: "new",
    assignedAdvisor: "Priya Rathore"
  },
  {
    id: "LEAD-103",
    name: "Col. Pradeep Shekhawat (Retd.)",
    phone: "+91 97840 22310",
    email: "col.shekhawat@retd.in",
    project: "Kedia's Tulsi",
    preferredDate: "2026-11-08",
    preferredTime: "Morning (10:00 AM – 1:00 PM)",
    message: "Looking for a 3 BHK unit on the 3rd or 4th floor with park view.",
    source: "contact_page",
    createdAt: "2026-10-29T11:20:00Z",
    status: "contacted",
    assignedAdvisor: "Rohit Jain"
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Units state
  const [units, setUnits] = useState<InventoryUnit[]>(() => {
    try {
      const saved = localStorage.getItem('kedia_units_v1');
      return saved ? JSON.parse(saved) : INITIAL_UNITS;
    } catch {
      return INITIAL_UNITS;
    }
  });

  // Shortlist state
  const [shortlist, setShortlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kedia_shortlist_v1');
      return saved ? JSON.parse(saved) : ['KLA-Plot14', 'KED-Villa103'];
    } catch {
      return ['KLA-Plot14', 'KED-Villa103'];
    }
  });

  // Compare state
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kedia_compare_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kedia_recent_v1');
      return saved ? JSON.parse(saved) : ['kedias-landmark', 'kedias-atulyam', 'nikunj-villas'];
    } catch {
      return ['kedias-landmark', 'kedias-atulyam', 'nikunj-villas'];
    }
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('kedia_bookings_v1');
      return saved ? JSON.parse(saved) : SEED_BOOKINGS;
    } catch {
      return SEED_BOOKINGS;
    }
  });

  // Leads state
  const [leads, setLeads] = useState<SiteVisitLead[]>(() => {
    try {
      const saved = localStorage.getItem('kedia_leads_v1');
      return saved ? JSON.parse(saved) : SEED_LEADS;
    } catch {
      return SEED_LEADS;
    }
  });

  // User auth state
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('kedia_user_v1');
      return saved ? JSON.parse(saved) : {
        phone: "+91 98290 44123",
        name: "Dr. Vikramaditya Rathore",
        email: "vikram.rathore@example.com",
        isLoggedIn: true
      };
    } catch {
      return null;
    }
  });

  // Modals state
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [selectedProjectForVisit, setSelectedProjectForVisit] = useState('');
  const [isShortlistDrawerOpen, setShortlistDrawerOpen] = useState(false);
  const [isCompareModalOpen, setCompareModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kedia_units_v1', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('kedia_shortlist_v1', JSON.stringify(shortlist));
  }, [shortlist]);

  useEffect(() => {
    localStorage.setItem('kedia_compare_v1', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('kedia_recent_v1', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('kedia_bookings_v1', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('kedia_leads_v1', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kedia_user_v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kedia_user_v1');
    }
  }, [currentUser]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'brass' = 'brass') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Unit actions
  const updateUnitStatus = (unitId: string, newStatus: UnitStatus) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: newStatus } : u));
    showToast(`Unit ${unitId} updated to '${newStatus}'`, 'info');
  };

  const updateUnitPrice = (unitId: string, newBasePrice: number) => {
    setUnits(prev => prev.map(u => {
      if (u.id === unitId) {
        const idc = round(newBasePrice * 0.04);
        const gst = round((newBasePrice + idc) * 0.05);
        const reg = round(newBasePrice * 0.06);
        const total = newBasePrice + idc + u.clubMembership + u.parkingCharges + gst + reg;
        return {
          ...u,
          basePrice: newBasePrice,
          developmentCharges: idc,
          gst,
          stampDutyRegistration: reg,
          totalPrice: total
        };
      }
      return u;
    }));
    showToast(`Base price for ${unitId} updated`, 'info');
  };

  const addUnit = (newUnit: InventoryUnit) => {
    setUnits(prev => [newUnit, ...prev]);
    showToast(`New unit ${newUnit.unitNumber} added to live catalog!`, 'success');
  };

  const deleteUnit = (unitId: string) => {
    setUnits(prev => prev.filter(u => u.id !== unitId));
    showToast(`Unit ${unitId} removed from inventory`, 'info');
  };

  function round(num: number) {
    return Math.round(num);
  }

  // Shortlist actions
  const toggleShortlist = (unitId: string) => {
    setShortlist(prev => {
      const exists = prev.includes(unitId);
      if (exists) {
        showToast('Removed unit from shortlist', 'info');
        return prev.filter(id => id !== unitId);
      } else {
        showToast('Added unit to your shortlist', 'brass');
        return [...prev, unitId];
      }
    });
  };

  const isShortlisted = (unitId: string) => shortlist.includes(unitId);
  const clearShortlist = () => setShortlist([]);

  // Compare actions
  const toggleCompare = (unitId: string) => {
    setCompareList(prev => {
      if (prev.includes(unitId)) {
        return prev.filter(id => id !== unitId);
      }
      if (prev.length >= 3) {
        showToast('You can compare a maximum of 3 properties simultaneously', 'info');
        return prev;
      }
      showToast('Unit added to comparison panel', 'brass');
      return [...prev, unitId];
    });
  };

  const removeFromCompare = (unitId: string) => {
    setCompareList(prev => prev.filter(id => id !== unitId));
  };

  const isCompared = (unitId: string) => compareList.includes(unitId);
  const clearCompare = () => setCompareList([]);

  // Recently viewed action
  const addRecentlyViewed = (idOrSlug: string) => {
    if (!idOrSlug) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(x => x !== idOrSlug);
      return [idOrSlug, ...filtered].slice(0, 8);
    });
  };

  // Booking actions
  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    // Also update unit status in state to 'sold' or 'on_hold'
    updateUnitStatus(booking.unitId, 'on_hold');
    showToast(`Booking ${booking.bookingId} confirmed! Check your dashboard`, 'success');
  };

  const updateBookingStatus = (bookingId: string, status: any) => {
    setBookings(prev => prev.map(b => b.bookingId === bookingId ? { ...b, status } : b));
    showToast(`Booking ${bookingId} marked as '${status}'`, 'info');
  };

  // Lead actions
  const addLead = (leadData: Omit<SiteVisitLead, 'id' | 'createdAt' | 'status' | 'assignedAdvisor'>) => {
    const newLead: SiteVisitLead = {
      ...leadData,
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      assignedAdvisor: 'Kedia Relationship Desk'
    };
    setLeads(prev => [newLead, ...prev]);
    showToast('Your request has been received. Our advisor will connect shortly.', 'success');
  };

  const updateLeadStatus = (leadId: string, status: SiteVisitLead['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
    showToast(`Lead status marked as ${status}`, 'info');
  };

  // Auth actions
  const loginWithOTP = async (phone: string, name: string = 'Kedia Patron'): Promise<boolean> => {
    const userObj: CustomerUser = {
      phone,
      name,
      email: `${phone.replace(/\D/g, '')}@kediapatron.in`,
      isLoggedIn: true,
      token: `demo-token-${Date.now()}`
    };
    setCurrentUser(userObj);
    showToast(`Welcome back, ${name}! Signed in successfully`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of customer portal', 'info');
  };

  const setSiteVisitModalOpen = (open: boolean, preselectedProject?: string) => {
    setIsSiteVisitModalOpen(open);
    if (preselectedProject) {
      setSelectedProjectForVisit(preselectedProject);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        units,
        updateUnitStatus,
        updateUnitPrice,
        addUnit,
        deleteUnit,
        shortlist,
        toggleShortlist,
        isShortlisted,
        clearShortlist,
        compareList,
        toggleCompare,
        removeFromCompare,
        isCompared,
        clearCompare,
        recentlyViewed,
        addRecentlyViewed,
        bookings,
        addBooking,
        updateBookingStatus,
        leads,
        addLead,
        updateLeadStatus,
        currentUser,
        loginWithOTP,
        logout,
        isSiteVisitModalOpen,
        setSiteVisitModalOpen,
        selectedProjectForVisit,
        isShortlistDrawerOpen,
        setShortlistDrawerOpen,
        isCompareModalOpen,
        setCompareModalOpen,
        isAuthModalOpen,
        setAuthModalOpen,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

