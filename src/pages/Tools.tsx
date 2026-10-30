import React, { useState } from 'react';
import { formatINR, formatExactINR } from '@/utils/media';
import { Calculator, DollarSign, Percent, Calendar, PieChart, ShieldCheck, Building, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PROJECTS } from '@/data/projectsData';

export const Tools: React.FC = () => {
  const { addLead, showToast } = useStore();

  const [propertyCost, setPropertyCost] = useState(6500000); // 65 Lakhs
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Home Loan Enquiry Form state
  const [loanName, setLoanName] = useState('');
  const [loanPhone, setLoanPhone] = useState('');
  const [loanEmail, setLoanEmail] = useState('');
  const [loanProject, setLoanProject] = useState(PROJECTS[0]?.name || "Kedia's Landmark");
  const [preferredBank, setPreferredBank] = useState('State Bank of India (SBI)');
  const [employmentType, setEmploymentType] = useState('Salaried Corporate / MNC');
  const [loanSubmitted, setLoanSubmitted] = useState(false);

  // Calculations
  const downPayment = Math.round((propertyCost * downPaymentPercent) / 100);
  const loanAmount = propertyCost - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Statutory charges
  const stampDuty = Math.round(propertyCost * 0.06); // 6%
  const registryFee = Math.round(propertyCost * 0.01); // 1%
  const gst = Math.round(propertyCost * 0.05); // 5%

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanName || !loanPhone) return;

    addLead({
      name: loanName,
      phone: loanPhone,
      email: loanEmail || 'loan.enquiry@kedia.in',
      project: loanProject,
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: 'Morning (Bank Desk Consultation)',
      message: `Home Loan Pre-approval Enquiry for ${formatINR(loanAmount)}. Preferred Bank: ${preferredBank}. Employment: ${employmentType}.`,
      source: 'loan_calculator'
    });

    setLoanSubmitted(true);
    showToast('Home loan enquiry received. Senior banking desk will contact you within 2 business hours.', 'brass');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Banner */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-12 mb-10 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15 mb-3">
            Financial Planning Suite &middot; Jaipur Real Estate
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
            Mortgage &amp; Property Cost Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto mt-3">
            Estimate monthly EMIs, down payments, interest obligations, and statutory registry fees with absolute transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0E1520] border-b border-[#E5E7EB] pb-4">
              Loan &amp; Property Parameters
            </h2>

            {/* Property Cost Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-slate-600 uppercase font-semibold">Property Consideration</span>
                <span className="text-lg font-bold text-[#0E1520] font-display">{formatINR(propertyCost)}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={25000000}
                step={250000}
                value={propertyCost}
                onChange={(e) => setPropertyCost(Number(e.target.value))}
                className="w-full accent-[#0E1520] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1.5">
                <span>₹20 Lakhs</span>
                <span>₹2.50 Crores</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-slate-600 uppercase font-semibold">Down Payment ({downPaymentPercent}%)</span>
                <span className="font-bold text-[#0E1520] font-mono text-sm">{formatExactINR(downPayment)}</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#0E1520] cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1.5">
                <span>10% (Min)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="6"
                  max="15"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2.5 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                  Loan Tenure (Years)
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2.5 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                >
                  <option value={5}>5 Years (60 Months)</option>
                  <option value={10}>10 Years (120 Months)</option>
                  <option value={15}>15 Years (180 Months)</option>
                  <option value={20}>20 Years (240 Months)</option>
                  <option value={25}>25 Years (300 Months)</option>
                  <option value={30}>30 Years (360 Months)</option>
                </select>
              </div>
            </div>

            {/* Statutory Charges Box */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E5E7EB] text-xs font-mono space-y-2">
              <span className="font-bold uppercase text-[#0E1520] block text-[11px]">
                Estimated Statutory Duties (Rajasthan)
              </span>
              <div className="flex justify-between text-slate-600">
                <span>Stamp Duty (6%):</span>
                <span>{formatExactINR(stampDuty)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Registration Charge (1%):</span>
                <span>{formatExactINR(registryFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5% on construction):</span>
                <span>{formatExactINR(gst)}</span>
              </div>
            </div>
          </div>

          {/* Results Summary Right (5 cols) */}
          <div className="lg:col-span-5 bg-[#0E1520] text-white p-6 sm:p-10 rounded-[32px] shadow-xl border border-white/10 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              Estimated Monthly Outflow
            </span>
            <div>
              <span className="text-4xl sm:text-5xl font-display text-white font-bold block">
                {formatExactINR(emi)}
              </span>
              <span className="text-xs font-mono text-slate-300 mt-1 block">
                Per Month for {tenureYears} Years ({interestRate}%)
              </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-300">Principal Loan Amount:</span>
                <span className="font-bold text-white">{formatExactINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Down Payment Payable:</span>
                <span className="font-bold text-[#D4E845]">{formatExactINR(downPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Interest Payable:</span>
                <span className="font-bold text-white">{formatExactINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-white font-bold uppercase">Total Loan Outflow:</span>
                <span className="font-bold text-[#D4E845] text-base">{formatExactINR(totalPayment)}</span>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs font-mono text-slate-300 space-y-1.5">
              <div className="flex items-center space-x-2 text-[#D4E845] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Pre-Approved Bank Partnerships</span>
              </div>
              <p className="text-[11px] text-slate-400">
                SBI, HDFC Bank, ICICI Bank, and Axis Bank pre-approved sanction processing available on all Kedia projects.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            HOME LOAN ENQUIRY FORM & BANKING DESK
        ======================================================== */}
        <div className="mt-12 bg-white rounded-[32px] border border-[#E5E7EB] shadow-lg overflow-hidden">
          <div className="bg-[#0E1520] text-white p-6 sm:p-10 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D4E845] uppercase mb-2 bg-white/10 border border-white/15">
                Institutional Financial Tie-Ups
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Instant Home Loan Pre-Approval Desk
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-1">
                Direct doorstep processing with lowest ROI benefits from SBI, HDFC Bank, ICICI &amp; Axis Bank.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono text-slate-300">
              <div className="px-3 py-1.5 bg-white/10 border border-white/15 rounded-full">
                Zero Hidden Charges
              </div>
              <div className="px-3 py-1.5 bg-white/10 border border-white/15 rounded-full">
                Doorstep Document Pickup
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {loanSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-display text-emerald-900 font-bold">
                  Home Loan Application Initiated!
                </h4>
                <p className="text-xs text-emerald-700 max-w-lg mx-auto font-mono">
                  Thank you, <span className="font-bold">{loanName}</span>. Your loan query for <span className="font-bold">{formatINR(loanAmount)}</span> with <span className="font-bold">{preferredBank}</span> has been forwarded to our dedicated Kedia Banking Liaison Officer.
                </p>
                <button
                  type="button"
                  onClick={() => setLoanSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0E1520] text-white text-xs font-mono uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                >
                  Submit Another Loan Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoanSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Vikramaditya Rathore"
                      value={loanName}
                      onChange={(e) => setLoanName(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                      Mobile Number (For OTP / WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98290 XXXXX"
                      value={loanPhone}
                      onChange={(e) => setLoanPhone(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={loanEmail}
                      onChange={(e) => setLoanEmail(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                      Target Project Address
                    </label>
                    <select
                      value={loanProject}
                      onChange={(e) => setLoanProject(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    >
                      {PROJECTS.map(p => (
                        <option key={p.slug} value={p.name}>{p.name} ({p.location})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                      Preferred Lending Partner
                    </label>
                    <select
                      value={preferredBank}
                      onChange={(e) => setPreferredBank(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    >
                      <option value="State Bank of India (SBI)">State Bank of India (SBI Home Loans)</option>
                      <option value="HDFC Bank">HDFC Bank Limited</option>
                      <option value="ICICI Bank">ICICI Bank Home Finance</option>
                      <option value="Axis Bank">Axis Bank Pre-Approved</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="Any Competitive Partner">Any Partner (Lowest ROI Comparison)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">
                      Employment / Income Profile
                    </label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl font-mono text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    >
                      <option value="Salaried Corporate / MNC">Salaried Corporate / MNC</option>
                      <option value="Government / PSU Employee">Government / PSU Employee</option>
                      <option value="Self Employed Business Owner">Self Employed Business Owner</option>
                      <option value="Practicing Professional (Doctor/CA/Lawyer)">Practicing Professional (Doctor/CA/Lawyer)</option>
                      <option value="Non-Resident Indian (NRI)">Non-Resident Indian (NRI Desk)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-slate-500">
                    * Estimated loan requirement calculated above: <span className="font-bold text-[#0E1520]">{formatExactINR(loanAmount)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold text-xs font-mono uppercase tracking-widest rounded-full shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Bank Pre-Approval Sanction ↗</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
