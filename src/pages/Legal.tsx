import React from 'react';
import { COMPANY_INFO } from '@/data/siteData';

export const Legal: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-12 mb-10 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10 max-w-4xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              Legal &amp; Regulatory Compliance
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Use & Statutory Disclaimers'}
            </h1>
            <p className="text-xs font-mono text-slate-300">
              Effective Date: November 2026 &middot; Rajasthan Jurisdiction
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 sm:p-12 rounded-[32px] border border-[#E5E7EB] shadow-2xs space-y-6 text-sm text-slate-600 leading-relaxed font-light">
            {isPrivacy ? (
              <>
                <h2 className="text-xl font-display font-bold text-[#0E1520]">1. Information We Collect</h2>
                <p>
                  Kedia Builders &amp; Colonizers collects personal details (Name, Contact Number, Email Address, PAN/KYC identifiers) strictly provided through inquiries, site tour reservations, and demo token booking requests.
                </p>

                <h2 className="text-xl font-display font-bold text-[#0E1520]">2. Use of Collected Data</h2>
                <p>
                  Information is utilized solely for coordinating physical or virtual property inspections, sending sanctioned layout documentation, preparing itemized cost estimates, and complying with statutory RERA audit guidelines. We do not sell or lease consumer data to third-party telemarketers.
                </p>

                <h2 className="text-xl font-display font-bold text-[#0E1520]">3. Digital Security &amp; Encryption</h2>
                <p>
                  Our platforms enforce modern transport layer security (TLS 1.3), Content Security Policies, and restricted database access. No real financial credentials or credit card CVV numbers are stored on our servers.
                </p>

                <h2 className="text-xl font-display font-bold text-[#0E1520]">4. Contact Grievance Officer</h2>
                <p>
                  For privacy compliance inquiries, contact our Legal Cell at <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0E1520] font-semibold underline">{COMPANY_INFO.email}</a> or visit our corporate office at {COMPANY_INFO.officeAddress}.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-display font-bold text-[#0E1520]">1. Artistic Renders &amp; Representations</h2>
                <p>
                  All 3D elevations, spatial animations, walkthroughs, and photographic angles published on this portal are impressionistic conceptual renders intended to illustrate design intent. Actual finished developments are subject to final municipal permissions and site engineering adjustments.
                </p>

                <h2 className="text-xl font-display font-bold text-[#0E1520]">2. RERA Compliance &amp; Verification</h2>
                <p>
                  Each project displayed is governed under the Real Estate (Regulation and Development) Act (RERA). Registered numbers are published on individual property pages and are publicly auditable at the Rajasthan RERA official portal (<a href={COMPANY_INFO.reraAuthorityUrl} target="_blank" rel="noopener noreferrer" className="text-[#0E1520] font-semibold underline">rera.rajasthan.gov.in</a>).
                </p>

                <h2 className="text-xl font-display font-bold text-[#0E1520]">3. Agreement for Sale Paramountcy</h2>
                <p>
                  In the event of any inadvertent discrepancy between web marketing materials and the executed registered Agreement for Sale, the clauses and sanctioned layouts stipulated in the registered legal contract shall prevail unequivocally.
                </p>

                <h2 className="text-xl font-display font-bold text-[#0E1520]">4. Jurisdiction</h2>
                <p>
                  All interactions and disputes are subject exclusively to the competent courts and real estate regulatory benches located in Jaipur, Rajasthan.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
