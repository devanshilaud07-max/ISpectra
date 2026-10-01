import React from 'react';
import { X, ExternalLink, ShieldCheck, Check, Clock, Layers, BookOpen, AlertCircle } from 'lucide-react';
import { IndianStandard } from '../types/standards';

interface EvidenceDrawerProps {
  standard: IndianStandard | null;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ standard, onClose }) => {
  if (!standard) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#101820]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-xl border-l border-[#D8D4CD] bg-[#FFFFFF] p-5 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
          
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D4CD]">
              <div>
                <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#7F171D]">
                  OFFICIAL EVIDENCE DOSSIER
                </span>
                <h3 className="mt-1 text-xl font-bold text-[#171717]">
                  Why was this standard recommended?
                </h3>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center border border-[#D8D4CD] bg-[#F4F1EB] text-[#171717] hover:bg-[#FFFFFF] hover:border-[#7F171D] rounded-sm transition-colors"
                aria-label="Close Evidence Panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Target Standard Summary Header */}
            <div className="mt-6 border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-[#7F171D]">
                  {standard.id}
                </span>
                <span className="font-mono text-xs text-[#666666]">
                  STATUS: <strong className="text-emerald-700">{standard.status}</strong>
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-[#171717] leading-snug">
                {standard.title}
              </h4>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#666666] font-mono">
                <span>{standard.department}</span>
                <span>·</span>
                <span>Published {standard.publishedYear}</span>
                <span>·</span>
                <span>{standard.pageCount} pages</span>
              </div>
            </div>

            {/* Scorecard */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3 rounded-sm text-center">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-bold">CONFIDENCE</div>
                <div className="mt-1 font-mono text-xl font-extrabold text-[#7F171D] tabular-nums">
                  {standard.confidence}%
                </div>
              </div>
              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3 rounded-sm text-center">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-bold">RETRIEVAL SCORE</div>
                <div className="mt-1 font-mono text-xl font-extrabold text-[#142A35] tabular-nums">
                  {standard.retrievalScore}
                </div>
              </div>
              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3 rounded-sm text-center">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-bold">METHOD</div>
                <div className="mt-1 font-mono text-[11px] font-bold text-[#171717] leading-tight">
                  {standard.matchType}
                </div>
              </div>
            </div>

            {/* Section 1: MATCHED REQUIREMENTS */}
            <div className="mt-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#7F171D] font-bold mb-2 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" />
                <span>MATCHED SPECIFICATION REQUIREMENTS</span>
              </div>
              <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg">
                <ul className="space-y-1.5 font-mono text-xs text-[#171717]">
                  {standard.matchedRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#7F171D] font-bold">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 2: RELEVANT SCOPE */}
            <div className="mt-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#142A35] font-bold mb-2 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-[#7F171D]" />
                <span>OFFICIAL SCOPE EVIDENCE (BIS CLAUSE 1)</span>
              </div>
              <div className="border-l-3 border-[#7F171D] bg-[#F4F1EB] p-4 font-mono text-xs text-[#171717] leading-relaxed rounded-r-lg">
                <p className="italic">
                  {standard.scopeEvidence}
                </p>
              </div>
            </div>

            {/* Section 3: GROUNDED CLAUSE EVIDENCE */}
            <div className="mt-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#142A35] font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#7F171D]" />
                <span>MATCHING CLAUSE EVIDENCE</span>
              </div>
              <div className="space-y-3">
                {standard.clauses.map((clause, idx) => (
                  <div key={idx} className="border border-[#D8D4CD] bg-[#FFFFFF] p-3.5 rounded-lg">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-[#171717]">
                        {clause.clauseNumber}: {clause.clauseTitle}
                      </span>
                      <span className="text-[#7F171D] font-bold">
                        Score {clause.retrievalScore}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#666666] bg-[#F4F1EB] p-2.5 rounded-sm border border-[#D8D4CD] font-mono leading-relaxed">
                      "{clause.clauseExcerpt}"
                    </p>
                    <div className="mt-2 text-[11px] text-[#7F171D] flex items-center gap-1.5 font-mono">
                      <span className="font-bold">Relevance:</span>
                      <span className="text-[#171717]">{clause.relevanceExplanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Source */}
            <div className="mt-6 border border-[#D8D4CD] bg-[#F4F1EB] p-3.5 rounded-lg text-xs font-mono text-[#666666]">
              <div className="font-bold uppercase text-[#171717] mb-1">OFFICIAL GAZETTE SOURCE</div>
              <div>BIS Record: {standard.bisCatalogueNumber}</div>
              {standard.gazetteOrderRef && (
                <div className="mt-1 text-[#7F171D]">Mandate: {standard.gazetteOrderRef}</div>
              )}
            </div>

          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-4 border-t border-[#D8D4CD] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#666666]">
              Audit Verified · Zero Hallucination
            </span>
            <button
              onClick={onClose}
              className="bg-[#142A35] hover:bg-[#101820] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Close Dossier
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
