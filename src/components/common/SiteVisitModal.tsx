import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { PROJECTS } from '@/data/projectsData';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const SiteVisitModal: React.FC = () => {
  const { isSiteVisitModalOpen, setSiteVisitModalOpen, selectedProjectForVisit, addLead } = useStore();

  const [project, setProject] = useState(selectedProjectForVisit || PROJECTS[0]?.name || '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM – 1:00 PM)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isSiteVisitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email,
      project: project || selectedProjectForVisit || 'Kedia Development',
      preferredDate,
      preferredTime,
      message: notes,
      source: 'website_modal'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSiteVisitModalOpen(false);
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E1520]/85 backdrop-blur-md transition-opacity"
        onClick={() => setSiteVisitModalOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative bg-[#0E1520] border border-white/15 text-white w-full max-w-lg p-6 sm:p-10 rounded-[32px] shadow-2xl z-10">
        <button
          type="button"
          onClick={() => setSiteVisitModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#D4E845]/20 text-[#D4E845] rounded-full flex items-center justify-center mx-auto border border-[#D4E845]/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">Site Visit Reserved</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, {name}. Our senior project advisor will contact you to confirm the chauffeured visit for <span className="text-[#D4E845] font-semibold">{project}</span> on {preferredDate}.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 border-b border-white/10 pb-5">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/10 text-[#D4E845] border border-white/15 mb-2">
                Personalized On-Ground Tour
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Schedule a Guided Site Visit</h2>
              <p className="text-xs text-slate-300 mt-1">
                Experience architectural finishes, infrastructure scale, and prime Jaipur locations in person.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Select */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                  Select Development
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4E845]"
                  required
                >
                  {PROJECTS.map((p) => (
                    <option key={p.slug} value={p.name} className="bg-[#0E1520] text-white">
                      {p.name} ({p.type} &middot; {p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#D4E845]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4E845]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#D4E845]" />
                    <span>Time Window</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4E845]"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)" className="bg-[#0E1520] text-white">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)" className="bg-[#0E1520] text-white">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 6:30 PM)" className="bg-[#0E1520] text-white">Evening (5:00 PM – 6:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1 font-medium">
                    <User className="w-3.5 h-3.5 text-[#D4E845]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4E845]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1 font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#D4E845]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 xxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4E845] font-mono"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1 font-medium">
                  <Mail className="w-3.5 h-3.5 text-[#D4E845]" />
                  <span>Email Address (Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4E845]"
                />
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                  Specific Requirements or Unit Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Interested in 150 sq yd plot or 4 BHK villa with park facing elevation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4E845]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide rounded-full transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group mt-4"
              >
                <span>Confirm Site Visit Booking</span>
                <span className="w-6 h-6 rounded-full bg-[#0E1520] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
