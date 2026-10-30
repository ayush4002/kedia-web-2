import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Briefcase, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const Careers: React.FC = () => {
  const { showToast } = useStore();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openings = [
    {
      id: 'arch-1',
      title: 'Senior Project Architect (Residential)',
      department: 'Design & Planning',
      location: 'Jaipur Corporate HQ',
      experience: '5-8 Years',
      type: 'Full-time',
      description: 'Lead master layout conceptualization, Vastu-integrated villa elevations, and municipal JDA sanction drawing coordination.'
    },
    {
      id: 'civil-1',
      title: 'Site Quality & Civil Engineer',
      department: 'Project Execution',
      location: 'Ajmer Road / Sikar Road Sites',
      experience: '3-6 Years',
      type: 'Full-time',
      description: 'Supervise on-ground RCC casting, underground cabling conduits, bitumen roadway grading, and quality compliance audits.'
    },
    {
      id: 'sales-1',
      title: 'Luxury Property Sales Advisor',
      department: 'Sales & Concierge',
      location: 'Vaishali Nagar Experience Centre',
      experience: '2-5 Years',
      type: 'Full-time',
      description: 'Manage high-net-worth customer walkthroughs, transparent cost sheet consultations, and client lifecycle relationships.'
    }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidatePhone) return;

    setSubmitted(true);
    showToast(`Application submitted for ${selectedRole}`, 'brass');
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole(null);
      setCandidateName('');
      setCandidateEmail('');
      setCandidatePhone('');
    }, 2500);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-14 mb-12 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              Careers at Kedia Builders &middot; Jaipur
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              Build the Future of Rajasthan
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto">
              Join a legacy of four decades. Collaborate with forward-thinking architects, engineers, and real estate professionals.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520] mb-6">Current Openings</h2>

            {openings.map(op => (
              <div key={op.id} className="bg-white p-6 sm:p-8 rounded-[32px] border border-[#E5E7EB] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold px-3 py-1 rounded-full uppercase text-[10px]">{op.department}</span>
                    <span>&bull;</span>
                    <span>{op.experience}</span>
                    <span>&bull;</span>
                    <span>{op.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0E1520]">{op.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl leading-relaxed">{op.description}</p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedRole(op.title)}
                    className="px-6 py-3 rounded-full bg-[#0E1520] hover:bg-black text-white font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 shadow-sm"
                  >
                    <span>Apply Now</span>
                    <span className="w-5 h-5 rounded-full bg-[#D4E845] text-[#0E1520] flex items-center justify-center font-bold text-xs">
                      ↗
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1520]/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#0E1520] border border-white/15 text-white w-full max-w-md p-6 sm:p-8 rounded-[32px] shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-1">Apply for Position</h3>
              <p className="text-xs font-mono text-[#D4E845] mb-6">{selectedRole}</p>

              {submitted ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-white">Application Received</h4>
                  <p className="text-xs text-slate-300">Our HR desk will review your credentials and contact you.</p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 px-4 py-2.5 text-xs rounded-2xl text-white focus:outline-none focus:border-[#D4E845]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 px-4 py-2.5 text-xs rounded-2xl text-white focus:outline-none focus:border-[#D4E845]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 px-4 py-2.5 text-xs rounded-2xl text-white font-mono focus:outline-none focus:border-[#D4E845]"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedRole(null)}
                      className="text-xs font-mono text-slate-400 hover:text-white uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-mono text-xs uppercase tracking-wider rounded-full transition-all shadow-md"
                    >
                      Submit Application ↗
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
