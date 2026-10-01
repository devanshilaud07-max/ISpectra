import React from 'react';
import { Briefcase, Building2, Award, Globe2 } from 'lucide-react';

interface ImpactCard {
  number: string;
  role: string;
  title: string;
  description: string;
  metric: string;
}

const IMPACT_CARDS: ImpactCard[] = [
  {
    number: '01',
    role: 'GOVERNMENT BUYERS',
    title: 'Procurement Officers',
    description: 'Drastically faster standards identification, zero citation errors, and eliminated risks of tender cancellations due to outdated references.',
    metric: '92% reduction in specification drafting time'
  },
  {
    number: '02',
    role: 'VENDORS & BIDDERS',
    title: 'MSMEs & Suppliers',
    description: 'Clearer comprehension of mandatory testing protocols, required BIS licenses, and barrier-free tender participation across GeM and state portals.',
    metric: '100% clarity on required test certifications'
  },
  {
    number: '03',
    role: 'STANDARDS AUTHORITY',
    title: 'BIS / Quality Ecosystem',
    description: 'Consistent, rigorous adoption of updated Indian Standards, driving national harmonization and alignment with ISO/IEC best practices.',
    metric: '14,000+ active Gazette updates monitored'
  },
  {
    number: '04',
    role: 'NATIONAL ECONOMY',
    title: 'Broader Impact',
    description: 'Cleaner public spending, elevated infrastructure durability, barrier elimination for domestic manufacturing, and stronger quality culture.',
    metric: 'Zero sub-standard equipment leakage'
  }
];

export const ImpactSection: React.FC = () => {
  return (
    <section className="relative border-b border-[#292929] bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 bg-[#FF4D2E]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#969696]">
              Ecosystem Impact
            </span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F2] leading-tight text-balance">
            Built for the standards ecosystem.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#969696]">
            Accelerating India's transition to quality-conscious public procurement and harmonized industrial manufacturing.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACT_CARDS.map((card) => (
            <div
              key={card.number}
              className="border border-[#292929] bg-[#111111] p-6 hover:border-[#FF4D2E]/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#292929]">
                  <span className="font-mono text-xs font-bold text-[#FF4D2E]">
                    {card.number}
                  </span>
                  <span className="font-mono text-[10px] text-[#666666] tracking-wider uppercase">
                    {card.role}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#F5F5F2]">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#969696] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#292929]/50">
                <div className="text-[10px] font-mono uppercase text-[#666666]">TARGET OUTCOME</div>
                <div className="mt-1 font-mono text-xs font-semibold text-[#F5F5F2]">
                  {card.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
