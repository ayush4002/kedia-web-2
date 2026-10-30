import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { COMPANY_INFO, FAQ_ITEMS } from '@/data/siteData';
import { PROJECTS } from '@/data/projectsData';
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { addLead } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(PROJECTS[0]?.name || '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM – 1:00 PM)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email,
      project,
      preferredDate,
      preferredTime,
      message,
      source: 'contact_page'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Banner */}
        <section className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-14 mb-10 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              Direct Concierge &middot; Corporate Headquarters
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              Let's Talk About Your Next Address
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto">
              Connect directly with our senior property advisors or visit our corporate office at Shyam Nagar, Jaipur.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
                Inquiry &amp; Site Tour Form
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520]">
                Schedule a Visit or Send an Inquiry
              </h2>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-display font-bold text-xl text-emerald-950">Inquiry Received</h3>
                <p className="text-xs text-slate-600 font-mono">
                  Thank you, {name}. Our project advisor will contact you at {phone} within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rathore"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98290 xxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] font-mono focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Interested Project</label>
                    <select
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    >
                      {PROJECTS.map(p => (
                        <option key={p.slug} value={p.name}>{p.name} ({p.location})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Preferred Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Preferred Time</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:00 PM – 6:30 PM)">Evening (5:00 PM – 6:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 mb-1.5 font-semibold">Specific Queries</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you are looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-3 text-xs rounded-2xl text-[#0E1520] focus:outline-none focus:border-[#0E1520]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold font-display text-sm tracking-wide rounded-full transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group"
                >
                  <span>Submit Inquiry</span>
                  <span className="w-6 h-6 rounded-full bg-[#0E1520] text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Address, Direct Channels & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E1520] text-white p-6 sm:p-8 rounded-[32px] shadow-xl border border-white/10 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/10 text-[#D4E845] border border-white/15">
                Office Information
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                Visit Corporate HQ
              </h3>

              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#D4E845] flex-shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.officeAddress}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#D4E845] flex-shrink-0" />
                  <a href={`tel:${COMPANY_INFO.rawPhone}`} className="hover:text-[#D4E845]">{COMPANY_INFO.phone}</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#D4E845] flex-shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#D4E845] break-all">{COMPANY_INFO.email}</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#D4E845] flex-shrink-0" />
                  <span>Monday &ndash; Saturday: 9:30 AM &ndash; 6:30 PM</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-[32px] overflow-hidden border border-[#E5E7EB] shadow-2xs">
              <iframe
                title="Kedia Builders Corporate Office Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Shyam%20Nagar%20Benar%20Road%20Jhotwara%20Jaipur&output=embed"
                className="w-full h-64 border-0"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white p-6 sm:p-10 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#E5E7EB] text-[#0E1520] font-semibold mb-2">
              Common Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0E1520]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="divide-y divide-[#E5E7EB] max-w-3xl mx-auto">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-1.5">
                <h4 className="text-sm font-display font-bold text-[#0E1520] flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#0E1520] flex-shrink-0" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
