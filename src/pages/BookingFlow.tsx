import React, { useState } from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { formatINR, formatExactINR, generateBookingReceiptPDF, generateCostSheetPDF } from '@/utils/media';
import { Booking, InventoryUnit } from '@/types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Download,
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Lock,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';

export const BookingFlow: React.FC<{ unitId: string }> = ({ unitId }) => {
  const { navigate } = useRouter();
  const { units, addBooking, currentUser } = useStore();

  const unit = units.find(u => u.id === unitId) || units[0];

  // Steps: 1: Cost Sheet Review, 2: Customer KYC, 3: Test Payment, 4: Confirmed
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Dr. Vikramaditya Rathore');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'vikram.rathore@example.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+91 98290 44123');
  const [customerPan, setCustomerPan] = useState('ABCDE1234F');
  const [customerAadhar, setCustomerAadhar] = useState('XXXX-XXXX-8912');
  const [address, setAddress] = useState('C-42, Tilak Nagar, Jaipur, Rajasthan');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'NEFT'>('UPI');
  const [tokenAmount] = useState(100000); // 1 Lakh Token
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleStep1Next = () => setStep(2);

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) return;
    setStep(3);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const bookingId = `KED-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const txRef = `TXN/${paymentMethod}/${Date.now().toString().slice(-8)}`;

      // Milestone schedule
      const milestones = [
        { milestone: "Booking Token (Paid Today)", percentage: 10, amount: Math.round(unit.totalPrice * 0.10), dueDate: new Date().toLocaleDateString('en-IN'), status: "paid" as const },
        { milestone: "Agreement for Sale (Within 30 Days)", percentage: 15, amount: Math.round(unit.totalPrice * 0.15), dueDate: "30 Days from Booking", status: "upcoming" as const },
        { milestone: "Completion of Foundation & Plinth", percentage: 25, amount: Math.round(unit.totalPrice * 0.25), dueDate: "90 Days from Booking", status: "pending" as const },
        { milestone: "Completion of Superstructure Slab", percentage: 25, amount: Math.round(unit.totalPrice * 0.25), dueDate: "180 Days from Booking", status: "pending" as const },
        { milestone: "Notice of Possession & Registry", percentage: 25, amount: Math.round(unit.totalPrice * 0.25), dueDate: unit.possession, status: "pending" as const }
      ];

      const newBooking: Booking = {
        bookingId,
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        projectSlug: unit.projectSlug,
        projectName: unit.projectName,
        customerName,
        customerEmail,
        customerPhone,
        customerPan,
        customerAadhar,
        address,
        bookingDate: new Date().toISOString(),
        tokenAmountPaid: tokenAmount,
        totalUnitAmount: unit.totalPrice,
        paymentMethod,
        paymentReference: txRef,
        status: 'confirmed',
        paymentSchedule: milestones,
        costBreakdown: {
          basePrice: unit.basePrice,
          idcEdc: unit.developmentCharges,
          clubMembership: unit.clubMembership,
          parking: unit.parkingCharges,
          gst: unit.gst,
          registration: unit.stampDutyRegistration,
          total: unit.totalPrice
        }
      };

      addBooking(newBooking);
      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      setStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 1400);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Pill Badges */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              step === 1 ? 'bg-[#0E1520] text-white font-bold' : step > 1 ? 'bg-white border border-[#E5E7EB] text-[#0E1520] font-medium' : 'bg-slate-100 text-slate-400'
            }`}>
              1. Cost Estimate
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              step === 2 ? 'bg-[#0E1520] text-white font-bold' : step > 2 ? 'bg-white border border-[#E5E7EB] text-[#0E1520] font-medium' : 'bg-slate-100 text-slate-400'
            }`}>
              2. Patron KYC
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              step === 3 ? 'bg-[#0E1520] text-white font-bold' : step > 3 ? 'bg-white border border-[#E5E7EB] text-[#0E1520] font-medium' : 'bg-slate-100 text-slate-400'
            }`}>
              3. Test Payment
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
              step === 4 ? 'bg-[#D4E845] text-[#0E1520] font-bold' : 'bg-slate-100 text-slate-400'
            }`}>
              4. Allotment
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0E1520] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* ========================================================
            STEP 1: ITEMIZED COST SHEET & CONFIRMATION
        ======================================================== */}
        {step === 1 && (
          <div className="bg-white p-6 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-lg space-y-6">
            <div className="border-b border-[#E5E7EB] pb-5">
              <img
                src="/assets/logo-navy.png"
                alt="Kedia Builders & Colonizers"
                className="h-9 w-auto mb-4"
              />
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
                Step 1 of 3 &middot; Transparent Financial Breakup
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#0E1520] tracking-tight">
                Review Cost Sheet for {unit.unitNumber}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">
                {unit.projectName} ({unit.towerOrBlock}) &middot; {unit.configuration} &middot; {unit.areaSqYd} sq. yd.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                <span className="text-slate-600">1. Base Consideration Price</span>
                <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.basePrice)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                <span className="text-slate-600">2. External &amp; Internal Infrastructure (IDC/EDC)</span>
                <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.developmentCharges)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                <span className="text-slate-600">3. Lifestyle Amenities &amp; Club Membership</span>
                <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.clubMembership)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                <span className="text-slate-600">4. Dedicated Covered Parking Slot</span>
                <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.parkingCharges)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                <span className="text-slate-600">5. GST (5% Statutory Construction Rate)</span>
                <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.gst)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F3F4F6]">
                <span className="text-slate-600">6. Estimated Stamp Duty &amp; Registration Fee (6%)</span>
                <span className="font-semibold text-[#0E1520]">{formatExactINR(unit.stampDutyRegistration)}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-[#0E1520] text-[#0E1520] font-bold text-base sm:text-lg">
                <span>Total All-Inclusive Estimated Amount:</span>
                <span className="text-[#0E1520] font-display font-bold">{formatExactINR(unit.totalPrice)}</span>
              </div>
            </div>

            {/* Token Amount Notice */}
            <div className="bg-[#FAF8F5] border border-[#E5E7EB] p-5 rounded-2xl text-xs font-mono space-y-1.5">
              <div className="flex items-center space-x-2 text-[#0E1520] font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Simulated Online Token Reservation: ₹1,00,000</span>
              </div>
              <p className="text-slate-600">
                Paying this demo token holds {unit.unitNumber} exclusively in your name for 48 hours without any payment obligation.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => generateCostSheetPDF(unit)}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E5E7EB] text-[#0E1520] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <Download className="w-4 h-4 text-[#0E1520]" />
                <span>Download PDF Cost Sheet</span>
              </button>

              <button
                type="button"
                onClick={handleStep1Next}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Proceed to Patron KYC</span>
                <span className="w-6 h-6 rounded-full bg-[#0E1520] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: PATRON INFORMATION (KYC)
        ======================================================== */}
        {step === 2 && (
          <form onSubmit={handleStep2Next} className="bg-white p-6 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-lg space-y-6">
            <div className="border-b border-[#E5E7EB] pb-5">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
                Step 2 of 3 &middot; Patron Identity &amp; Legal Details
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#0E1520] tracking-tight">
                Allotment Dossier Registration
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-medium">Full Legal Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-medium">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#0E1520] font-mono focus:outline-none focus:border-[#0E1520]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-medium">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-medium">PAN Card Number (Demo)</label>
                <input
                  type="text"
                  required
                  value={customerPan}
                  onChange={(e) => setCustomerPan(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl px-4 py-3 text-sm text-[#0E1520] font-mono uppercase focus:outline-none focus:border-[#0E1520]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-medium">Residential Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl px-4 py-3 text-sm text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E5E7EB] text-slate-600 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-[#0E1520]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Cost Sheet</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Proceed to Simulated Payment</span>
                <span className="w-6 h-6 rounded-full bg-[#0E1520] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            STEP 3: TEST PAYMENT METHOD SELECTION
        ======================================================== */}
        {step === 3 && (
          <form onSubmit={handleSimulatePayment} className="bg-white p-6 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-lg space-y-6">
            <div className="border-b border-[#E5E7EB] pb-5">
              <div className="inline-flex items-center gap-2 text-[#0E1520] bg-[#D4E845]/20 border border-[#D4E845]/40 px-3 py-1 rounded-full w-fit mb-3">
                <AlertCircle className="w-4 h-4 text-[#0E1520]" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  SIMULATION ENVIRONMENT &middot; TEST MODE ONLY
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#0E1520] tracking-tight">
                Select Test Payment Gateway
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Token Deposit Amount: <span className="font-bold text-[#0E1520]">₹1,00,000</span> (Simulated)
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-[#0E1520] bg-[#FAF8F5] shadow-md'
                    : 'border-[#E5E7EB] bg-white hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-6 h-6 text-[#0E1520] mb-3" />
                <span className="font-display font-bold text-sm text-[#0E1520]">UPI / QR Simulation</span>
                <span className="text-[11px] text-slate-500 font-mono mt-1">GPay, PhonePe, Paytm Test</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-[#0E1520] bg-[#FAF8F5] shadow-md'
                    : 'border-[#E5E7EB] bg-white hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-6 h-6 text-[#0E1520] mb-3" />
                <span className="font-display font-bold text-sm text-[#0E1520]">Credit / Debit Card</span>
                <span className="text-[11px] text-slate-500 font-mono mt-1">Visa, Mastercard Test Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NetBanking')}
                className={`p-5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'NetBanking'
                    ? 'border-[#0E1520] bg-[#FAF8F5] shadow-md'
                    : 'border-[#E5E7EB] bg-white hover:bg-slate-50'
                }`}
              >
                <Building className="w-6 h-6 text-[#0E1520] mb-3" />
                <span className="font-display font-bold text-sm text-[#0E1520]">Corporate NetBanking</span>
                <span className="text-[11px] text-slate-500 font-mono mt-1">HDFC, ICICI, SBI Simulation</span>
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E5E7EB] text-xs font-mono space-y-2.5">
              <div className="flex justify-between text-slate-600">
                <span>Unit Reserved:</span>
                <span className="font-bold text-[#0E1520]">{unit.unitNumber} ({unit.projectName})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Patron:</span>
                <span className="font-bold text-[#0E1520]">{customerName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Test Token Amount:</span>
                <span className="font-bold text-[#0E1520] text-sm">₹1,00,000</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-[#E5E7EB]">
                * Note: No real card or bank details are requested. Clicking below will instantly confirm the transaction in test mode and issue an allotment receipt.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E5E7EB] text-slate-600 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-[#0E1520]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to KYC</span>
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'Simulating Bank Transfer...' : 'Confirm Demo Payment (₹1 Lakh) ↗'}</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================
            STEP 4: ALLOTMENT CONFIRMED & OFFICIAL RECEIPT
        ======================================================== */}
        {step === 4 && confirmedBooking && (
          <div className="bg-white p-6 sm:p-12 rounded-[32px] border border-[#E5E7EB] shadow-xl space-y-6 text-center">
            <img
              src="/assets/logo-navy.png"
              alt="Kedia Builders & Colonizers"
              className="h-9 w-auto mx-auto mb-2"
            />
            <div className="w-20 h-20 bg-[#D4E845]/30 text-[#0E1520] border border-[#D4E845] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#0E1520]" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
                Official Allotment Confirmation
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0E1520] tracking-tight">
                Congratulations, {confirmedBooking.customerName}!
              </h2>
              <p className="text-xs font-mono text-slate-500">
                Booking Reference No: <span className="font-bold text-[#0E1520]">{confirmedBooking.bookingId}</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-light leading-relaxed">
              Unit <span className="font-bold text-[#0E1520]">{confirmedBooking.unitNumber}</span> in <span className="font-bold text-[#0E1520]">{confirmedBooking.projectName}</span> is successfully reserved under your profile. An official allotment confirmation docket has been registered.
            </p>

            <div className="max-w-md mx-auto bg-[#FAF8F5] p-5 rounded-2xl border border-[#E5E7EB] text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Ref:</span>
                <span className="font-bold text-[#0E1520]">{confirmedBooking.paymentReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Token Paid:</span>
                <span className="font-bold text-emerald-700">₹1,00,000 (Test Deposit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Unit Consideration:</span>
                <span className="font-bold text-[#0E1520]">{formatINR(confirmedBooking.totalUnitAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700 uppercase">Confirmed &amp; Allotted</span>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => generateBookingReceiptPDF(confirmedBooking)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Receipt (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0E1520] hover:bg-[#1A2332] text-white font-medium font-display text-sm tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Patron Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
