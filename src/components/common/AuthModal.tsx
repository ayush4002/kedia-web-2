import React, { useState } from 'react';
import { useRouter } from '@/router';
import { useStore } from '@/context/StoreContext';
import { X, Lock, Phone, KeyRound, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { navigate } = useRouter();
  const { isAuthModalOpen, setAuthModalOpen, loginWithOTP } = useStore();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('+91 98290 44123');
  const [name, setName] = useState('Dr. Vikramaditya Rathore');
  const [otp, setOtp] = useState('4892');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 700);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      await loginWithOTP(phone, name);
      setIsLoading(false);
      setAuthModalOpen(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div
        className="fixed inset-0 bg-[#0E1520]/85 backdrop-blur-md"
        onClick={() => setAuthModalOpen(false)}
      />

      <div className="relative bg-[#0E1520] border border-white/15 text-white w-full max-w-md p-6 sm:p-10 rounded-[32px] shadow-2xl z-10">
        <button
          type="button"
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#D4E845]/20 text-[#D4E845] rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/10 text-[#D4E845] border border-white/15 mb-2">
            Kedia Patron Sanctuary
          </span>
          <h3 className="text-2xl font-display font-bold text-white tracking-tight">Customer Account Sign In</h3>
          <p className="text-xs text-slate-300 mt-1">
            Access your active bookings, milestone schedules, and downloadable official receipts.
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4E845]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#D4E845] absolute left-4 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#D4E845]"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 font-mono">
                * Simulated Demo Mode: You can enter any 10-digit number.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide rounded-full transition-all shadow-md active:scale-98 mt-2"
            >
              {isLoading ? 'Generating OTP...' : 'Get Demo Access OTP ↗'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-center font-mono text-slate-300">
              Demo OTP sent to <span className="text-[#D4E845] font-bold">{phone}</span>
              <br />
              <span className="text-emerald-400 font-bold mt-1 inline-block">Use Demo Code: 4892</span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Enter 4-Digit OTP Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#D4E845] absolute left-4 top-3.5" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-lg text-white font-mono tracking-widest focus:outline-none focus:border-[#D4E845]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide rounded-full transition-all shadow-md active:scale-98 mt-2"
            >
              {isLoading ? 'Authenticating...' : 'Confirm & Enter Dashboard ↗'}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-slate-400 hover:text-white uppercase font-mono mt-2"
            >
              &larr; Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
