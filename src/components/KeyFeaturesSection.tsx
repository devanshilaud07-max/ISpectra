import React, { useState } from 'react';
import {
  FileSearch,
  Scale,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Search,
  Database,
  Cpu
} from 'lucide-react';

interface FeatureTab {
  id: string;
  number: string;
  name: string;
  shortTag: string;
  headline: string;
  description: string;
  technicalMechanism: string;
  liveDemoTitle: string;
}

const FEATURE_TABS: FeatureTab[] = [
  {
    id: 'extractor',
    number: '01',
    name: 'Spec Analyzer',
    shortTag: 'ENTITY EXTRACTION',
    headline: 'Deconstructs unformatted tender specs into structured parameters',
    description: 'Parses raw tender schedules, PDF specifications, and unformatted clauses. Identifies product categories, electrical ratings, ingress protection (IP), environmental parameters, and statutory testing expectations.',
    technicalMechanism: 'Deterministic Regex & Token Parser + Schema Normalizer',
    liveDemoTitle: 'Extracted Technical Entities (Live Schema)'
  },
  {
    id: 'recommender',
    number: '02',
    name: 'Standards Recommender',
    shortTag: 'HYBRID RETRIEVAL',
    headline: 'Matches requirements with official Bureau of Indian Standards codes',
    description: 'Combines BM25 Okapi lexical search with dense semantic vector embeddings. Re-ranks candidates using cross-attention transformers to eliminate false positives and vocabulary mismatch.',
    technicalMechanism: 'Reciprocal Rank Fusion (RRF) + Cross-Encoder Ranking',
    liveDemoTitle: 'Candidate Scoring & Rank Distribution'
  },
  {
    id: 'guard',
    number: '03',
    name: 'Version Guard',
    shortTag: 'STATUTORY AUDIT',
    headline: 'Prevents legal liability from citing withdrawn or superseded codes',
    description: 'Cross-references active standards against the latest Bureau of Indian Standards gazette notifications and ministry Quality Control Orders (QCOs) to ensure only valid standards are cited.',
    technicalMechanism: 'Live BIS Gazette & Amendment Registry Verification',
    liveDemoTitle: 'Statutory Status & Supersession Tracker'
  },
  {
    id: 'evidence',
    number: '04',
    name: 'Explainable Evidence',
    shortTag: 'GROUNDED RAG',
    headline: 'Grounded clause citations quoting official BIS regulatory text',
    description: 'Provides exact clause citations, official Clause 1 scope evidence, and numerical confidence scores for every recommendation—enabling auditors to verify tenders with complete transparency.',
    technicalMechanism: 'Verbatim Scope Attribution + Zero-Hallucination Audit Trail',
    liveDemoTitle: 'Attributed Scope & Clause Citations'
  }
];

export const KeyFeaturesSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('extractor');
  const activeTab = FEATURE_TABS.find((t) => t.id === activeTabId) || FEATURE_TABS[0];

  const scrollToAnalyzer = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="relative bg-[#FFFFFF] py-16 sm:py-20 lg:py-28 border-b border-[#D8D4CD]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7F171D]">
            <span className="h-2 w-2 bg-[#7F171D]" />
            <span>INTERACTIVE PLATFORM FEATURES</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight">
            Four Pillars of Standards Intelligence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#666666] leading-relaxed">
            Every module is built specifically for public procurement specifications, technical schedules, and Indian Standards compliance. Select a module below to test its live mechanism.
          </p>
        </div>

        {/* Feature Navigation Tabs (Responsive Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-8">
          {FEATURE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-[#7F171D] bg-[#F4F1EB] shadow-sm ring-1 ring-[#7F171D]'
                    : 'border-[#D8D4CD] bg-[#FFFFFF] hover:border-[#7F171D]/50 hover:bg-[#F4F1EB]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#7F171D]' : 'text-[#666666]'}`}>
                    {tab.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666] hidden sm:inline">
                    {tab.shortTag}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className={`font-sans text-sm sm:text-base font-bold ${isActive ? 'text-[#171717]' : 'text-[#444444]'}`}>
                    {tab.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Working Feature Panel */}
        <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-5 sm:p-8 lg:p-10 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Feature Details & Action */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#D8D4CD] bg-[#FFFFFF] px-3 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider text-[#7F171D] mb-3">
                  <span>MODULE {activeTab.number}</span>
                  <span>·</span>
                  <span>{activeTab.shortTag}</span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#171717] leading-snug">
                  {activeTab.headline}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {activeTab.description}
                </p>

                <div className="mt-6 border border-[#D8D4CD] bg-[#FFFFFF] p-4 rounded-lg">
                  <div className="text-[10px] font-mono font-bold uppercase text-[#666666]">
                    UNDERLYING ARCHITECTURE
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-[#142A35]">
                    {activeTab.technicalMechanism}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D8D4CD]">
                <button
                  onClick={scrollToAnalyzer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7F171D] hover:bg-[#5E1116] text-[#FFFFFF] px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs"
                >
                  <span>Test in Live Analyzer</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Live Interactive Demo Widget */}
            <div className="lg:col-span-7 border border-[#D8D4CD] bg-[#FFFFFF] p-5 sm:p-6 rounded-xl shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D4CD] text-xs font-mono">
                <span className="font-bold text-[#171717] uppercase flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeTab.liveDemoTitle}</span>
                </span>
                <span className="text-[#7F171D] font-bold text-[10px] bg-[#F4F1EB] px-2 py-0.5 rounded-xs">
                  INTERACTIVE PREVIEW
                </span>
              </div>

              {/* DEMO 1: SPEC ANALYZER */}
              {activeTab.id === 'extractor' && (
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#F4F1EB] rounded-md text-[11px] text-[#666666]">
                    <span className="font-bold text-[#171717]">Input Specification Snippet:</span>
                    <p className="mt-1 italic font-sans text-xs text-[#171717]">
                      "Outdoor LED luminaire, 90W rating, IP66 ingress protection, 10kV surge protection, CCT 5700K."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#FFFFFF]">
                      <div className="text-[10px] text-[#7F171D] font-bold uppercase">PRODUCT CATEGORY</div>
                      <div className="text-xs font-bold text-[#171717] mt-0.5">LED Street Luminaire</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-1">Confidence: 98%</div>
                    </div>
                    <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#FFFFFF]">
                      <div className="text-[10px] text-[#7F171D] font-bold uppercase">ELECTRICAL POWER</div>
                      <div className="text-xs font-bold text-[#171717] mt-0.5">90 Watts (Continuous)</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-1">Confidence: 99%</div>
                    </div>
                    <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#FFFFFF]">
                      <div className="text-[10px] text-[#7F171D] font-bold uppercase">ENVIRONMENTAL INGRESS</div>
                      <div className="text-xs font-bold text-[#171717] mt-0.5">IP66 (Dust-tight, Jet-proof)</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-1">Confidence: 96%</div>
                    </div>
                    <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#FFFFFF]">
                      <div className="text-[10px] text-[#7F171D] font-bold uppercase">SURGE IMMUNITY</div>
                      <div className="text-xs font-bold text-[#171717] mt-0.5">10 kV Transient Surge</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-1">Confidence: 94%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEMO 2: STANDARDS RECOMMENDER */}
              {activeTab.id === 'recommender' && (
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#F4F1EB] rounded-md text-[11px] text-[#666666]">
                    <span className="font-bold text-[#171717]">Dual-Path Retrieval Breakdown:</span>
                    <p className="mt-1 text-[11px] text-[#171717]">
                      Fuses exact keywords with dense contextual embeddings across 22,000+ Indian Standards.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#FFFFFF]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#171717]">IS 10322 (Part 5/Sec 3): 2012</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-xs text-[10px]">98% MATCH</span>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-[#666666] pt-2 border-t border-[#D8D4CD]/60">
                        <div>BM25 Score: <strong className="text-[#171717]">0.94</strong></div>
                        <div>Dense Vector: <strong className="text-[#171717]">0.96</strong></div>
                        <div>Cross-Rank: <strong className="text-[#7F171D]">#1 Rank</strong></div>
                      </div>
                    </div>

                    <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#FFFFFF]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#171717]">IS 15885 (Part 2/Sec 13): 2012</span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-xs text-[10px]">95% MATCH</span>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-[#666666] pt-2 border-t border-[#D8D4CD]/60">
                        <div>BM25 Score: <strong className="text-[#171717]">0.89</strong></div>
                        <div>Dense Vector: <strong className="text-[#171717]">0.93</strong></div>
                        <div>Cross-Rank: <strong className="text-[#7F171D]">#2 Rank</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEMO 3: VERSION GUARD */}
              {activeTab.id === 'guard' && (
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#F4F1EB] rounded-md text-[11px] text-[#666666]">
                    <span className="font-bold text-[#171717]">Real-time Statutory Status Comparison:</span>
                    <p className="mt-1 text-[11px] text-[#171717]">
                      Instantly alerts procurement officers if a tender cites outdated or withdrawn standards.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="border border-red-200 bg-red-50/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#7F171D] text-xs">IS 1944 (Parts 1 &amp; 2): 1970</div>
                        <div className="text-[10px] text-[#666666]">Old Code of practice for lighting public thoroughfares</div>
                      </div>
                      <span className="bg-[#7F171D] text-white text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase">
                        WITHDRAWN
                      </span>
                    </div>

                    <div className="border border-emerald-200 bg-emerald-50/50 p-3 rounded-md flex items-center justify-between">
                      <div>
                        <div className="font-bold text-emerald-900 text-xs">IS 10322 (Pt 5/Sec 3): 2012</div>
                        <div className="text-[10px] text-[#666666]">Current Enforced Standard · 3 Active Amendments</div>
                      </div>
                      <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase">
                        CURRENT &amp; VALID
                      </span>
                    </div>

                    <div className="text-[11px] text-[#7F171D] font-bold bg-[#FFFFFF] p-2.5 rounded-sm border border-[#D8D4CD]">
                      ⚠ Recommendation: Automatically upgrades tender citation to prevent contractor disqualification.
                    </div>
                  </div>
                </div>
              )}

              {/* DEMO 4: EXPLAINABLE EVIDENCE */}
              {activeTab.id === 'evidence' && (
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#F4F1EB] rounded-md text-[11px] text-[#666666]">
                    <span className="font-bold text-[#171717]">Official Grounded BIS Scope Citation:</span>
                    <p className="mt-1 text-[11px] text-[#171717]">
                      Eliminates generative hallucination by quoting exact BIS gazetted text.
                    </p>
                  </div>

                  <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3.5 rounded-md space-y-2">
                    <div className="text-[10px] font-bold text-[#7F171D] uppercase">
                      VERBATIM CLAUSE 1 SCOPE EXCERPT:
                    </div>
                    <blockquote className="border-l-2 border-[#7F171D] pl-3 py-1 text-[11px] text-[#171717] italic font-sans">
                      "This standard specifies requirements for luminaires for road and street lighting, on supply voltages not exceeding 1 000 V for use with tungsten filament, tubular fluorescent and other discharge lamps and LED light sources."
                    </blockquote>
                    <div className="pt-2 border-t border-[#D8D4CD]/60 flex items-center justify-between text-[10px] text-[#666666]">
                      <span>Source: Bureau of Indian Standards (Manak Bhavan)</span>
                      <span className="text-emerald-700 font-bold">100% Attributed ✓</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
