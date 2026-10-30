import React, { useState } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { formatINR, formatExactINR, generateBookingReceiptPDF, getMediaUrl } from '@/utils/media';
import {
  User,
  Phone,
  Mail,
  ShieldCheck,
  Download,
  Calendar,
  Heart,
  CheckCircle2,
  Clock,
  Layers,
  LogOut,
  Building,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const {
    currentUser,
    logout,
    bookings,
    shortlist,
    units,
    leads,
    setAuthModalOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'bookings' | 'shortlist' | 'visits' | 'construction'>('bookings');

  // If user is not logged in, prompt to log in or show guest view
  if (!currentUser?.isLoggedIn) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-24 text-[#0E1520]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6 bg-white p-8 sm:p-12 rounded-[32px] border border-[#E5E7EB] shadow-lg">
          <div className="w-16 h-16 bg-[#0E1520] text-[#D4E845] rounded-full flex items-center justify-center mx-auto shadow-md">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#0E1520] tracking-tight">Kedia Patron Sanctuary</h1>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Please sign in with your registered mobile number using simulated OTP authentication to view your active property bookings, milestone schedules, and downloadable receipts.
          </p>
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="px-8 py-3.5 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold text-sm rounded-full transition-all shadow-md active:scale-98"
          >
            Sign In with Demo OTP &rarr;
          </button>
        </div>
      </div>
    );
  }

  const shortlistedUnits = units.filter(u => shortlist.includes(u.id));

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Patron Header Banner */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-6 sm:p-10 mb-8 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-full bg-[#D4E845] text-[#0E1520] flex items-center justify-center font-display font-bold text-2xl shadow-md">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#D4E845] font-semibold">
                    Verified Patron Portal
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                  {currentUser.name}
                </h1>
                <p className="text-xs font-mono text-slate-300 mt-1 flex items-center space-x-3">
                  <span>{currentUser.phone}</span>
                  <span>&bull;</span>
                  <span>{currentUser.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/projects"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-full border border-white/20 transition-colors"
              >
                Explore Portfolio
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/15 text-slate-300 font-mono text-xs uppercase tracking-wider rounded-full border border-white/15 flex items-center space-x-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Tabs Navigation Pills */}
        <div className="flex items-center space-x-2 pb-6 overflow-x-auto mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            My Bookings ({bookings.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shortlist')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'shortlist'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Shortlisted Properties ({shortlistedUnits.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visits')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'visits'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Scheduled Site Visits ({leads.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('construction')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              activeTab === 'construction'
                ? 'bg-[#0E1520] text-white font-bold shadow-sm'
                : 'bg-white border border-[#E5E7EB] text-slate-600 hover:text-[#0E1520]'
            }`}
          >
            Construction Milestones
          </button>
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-4">
                <Building className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-xl text-[#0E1520]">No Active Property Bookings</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Reserve a plot or villa online with a simulated ₹1 Lakh token to view agreement documents and receipts here.
                </p>
                <Link
                  to="/projects"
                  className="inline-block px-6 py-3 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold text-xs uppercase tracking-wider rounded-full shadow-sm transition-colors"
                >
                  Browse Developments
                </Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-2xs p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5E7EB] gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src="/assets/logo-navy.png"
                          alt="Kedia Builders & Colonizers"
                          className="h-7 w-auto object-contain"
                        />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 border-l border-slate-200 pl-2">
                          Allotment Docket &middot; Est. 1980
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                          Booking ID: {booking.bookingId}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase">
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display text-[#0E1520] font-bold mt-1">
                        {booking.unitNumber} &middot; {booking.projectName}
                      </h3>
                      <p className="text-xs font-mono text-slate-500">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN')} &middot; Tx Ref: {booking.paymentReference}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => generateBookingReceiptPDF(booking)}
                        className="px-5 py-2.5 bg-[#0E1520] hover:bg-[#1A2332] text-white font-mono text-xs uppercase tracking-wider rounded-full flex items-center space-x-2 transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4E845]" />
                        <span>Download Official Receipt (PDF)</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Milestone Schedule */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                      Milestone Schedule &amp; Demands
                    </h4>

                    <div className="space-y-2.5">
                      {booking.paymentSchedule.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] text-xs font-mono"
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`w-3 h-3 rounded-full ${
                              m.status === 'paid' ? 'bg-emerald-500' : m.status === 'upcoming' ? 'bg-[#D4E845]' : 'bg-slate-300'
                            }`} />
                            <div>
                              <span className="font-semibold text-[#0E1520] block">{m.milestone}</span>
                              <span className="text-[11px] text-slate-400">Due: {m.dueDate}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-[#0E1520]">{formatExactINR(m.amount)}</span>
                            <span className={`block text-[10px] uppercase font-bold ${
                              m.status === 'paid' ? 'text-emerald-700' : m.status === 'upcoming' ? 'text-[#0E1520]' : 'text-slate-400'
                            }`}>
                              {m.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legal Summary */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-600 gap-2">
                    <div>
                      <span>Allotted Consideration: </span>
                      <span className="font-bold text-[#0E1520]">{formatINR(booking.totalUnitAmount)}</span>
                      <span className="text-slate-400"> (Token Paid: {formatINR(booking.tokenAmountPaid)})</span>
                    </div>
                    <span className="text-[11px] text-[#0E1520] font-semibold">
                      Rajasthan RERA Sanctioned Scheme
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SHORTLIST */}
        {activeTab === 'shortlist' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shortlistedUnits.length === 0 ? (
              <div className="col-span-3 bg-white p-12 text-center rounded-[32px] border border-[#E5E7EB] space-y-3">
                <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-xl text-[#0E1520]">No shortlisted units</h3>
                <p className="text-xs text-slate-500">Tap the heart icon on any villa or plot to bookmark it here.</p>
              </div>
            ) : (
              shortlistedUnits.map(unit => (
                <div key={unit.id} className="bg-white p-5 rounded-[28px] border border-[#E5E7EB] shadow-2xs flex flex-col justify-between">
                  <div>
                    <img
                      src={getMediaUrl(unit.floorPlanImage, 600)}
                      alt={unit.unitNumber}
                      className="w-full h-44 object-cover rounded-2xl mb-4 border border-[#E5E7EB]"
                    />
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">{unit.projectName}</span>
                    <h4 className="text-lg font-display font-bold text-[#0E1520] mt-0.5">{unit.unitNumber} &middot; {unit.configuration}</h4>
                    <p className="text-xs font-mono text-slate-500 mt-1">{unit.areaSqYd} sq. yd. &middot; {unit.facing}</p>
                    <span className="text-lg font-display font-bold text-[#0E1520] block mt-2">{formatINR(unit.totalPrice)}</span>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E5E7EB] flex gap-2">
                    <Link
                      to={`/units/${unit.id}`}
                      className="flex-1 py-2.5 text-center text-xs font-mono uppercase bg-[#F3F4F6] hover:bg-slate-200 text-[#0E1520] font-semibold rounded-full transition-colors"
                    >
                      View Specs
                    </Link>
                    <Link
                      to={`/booking/${unit.id}`}
                      className="flex-1 py-2.5 text-center text-xs font-mono uppercase bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold rounded-full transition-colors"
                    >
                      Book Unit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-[32px] border border-[#E5E7EB]">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-mono text-slate-500">No scheduled site tours yet.</p>
              </div>
            ) : (
              leads.map((l) => (
                <div key={l.id} className="bg-white p-6 rounded-[24px] border border-[#E5E7EB] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                  <div>
                    <span className="text-xs font-bold text-[#0E1520] block uppercase tracking-wider">{l.project}</span>
                    <span className="text-base font-display font-bold text-[#0E1520] block mt-0.5">{l.name}</span>
                    <span className="text-slate-500 block mt-1">{l.preferredDate} &middot; {l.preferredTime}</span>
                  </div>

                  <div className="text-right">
                    <span className="bg-[#FAF8F5] text-[#0E1520] border border-[#E5E7EB] px-3 py-1 rounded-full font-bold uppercase text-[10px] inline-block mb-1">
                      {l.status.replace('_', ' ')}
                    </span>
                    <span className="block text-slate-400 text-[10px]">Assigned to: {l.assignedAdvisor}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: CONSTRUCTION UPDATES */}
        {activeTab === 'construction' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">October 2026 Milestone</span>
              <h3 className="text-xl font-display font-bold text-[#0E1520]">Kedia's Atulyam &middot; Underground Cabling &amp; Paved Boulevard Complete</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Bitumen sub-grade testing completed across Phase 1 avenues. Stormwater RCC culverts connected to municipal runoff discharge.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  On Schedule &middot; Quality Audit Passed
                </span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">September 2026 Milestone</span>
              <h3 className="text-xl font-display font-bold text-[#0E1520]">Kedia's Landmark &middot; Demarcation Boundary Pillars &amp; Gateway Arch</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Main architectural archway masonry completed. Rainwater recharge pits dug and tested for 100% capacity soakage.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  On Schedule &middot; JDA Inspected
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
