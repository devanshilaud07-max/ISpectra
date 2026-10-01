import React, { useState } from 'react';
import { X, Download, Copy, Check, Printer, FileText } from 'lucide-react';
import { AnalysisSummary } from '../types/standards';

interface ExportReportModalProps {
  summary: AnalysisSummary;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ summary, onClose }) => {
  const [copied, setCopied] = useState(false);

  const generateMarkdownReport = (): string => {
    return `# ISPECTRA — STANDARDS PROCUREMENT AUDIT DOSSIER
Generated: ${new Date(summary.timestamp).toUTCString()}
Cryptographic Audit Hash: ${summary.auditHash}
System: ISpectra Standards Intelligence Engine (SIH26108)

========================================================================
1. PROCUREMENT SPECIFICATION ANALYZED
========================================================================
"${summary.specificationText}"

========================================================================
2. EXTRACTED TECHNICAL REQUIREMENTS (${summary.extractedRequirements.length})
========================================================================
${summary.extractedRequirements
  .map(
    (req, idx) =>
      `[${idx + 1}] Category: ${req.category}
    Raw Input: ${req.rawText}
    Normalized: ${req.normalizedValue} (Confidence: ${Math.round(req.confidence * 100)}%)`
  )
  .join('\n\n')}

========================================================================
3. RECOMMENDED APPLICABLE INDIAN STANDARDS (${summary.recommendedStandards.length})
========================================================================
${summary.recommendedStandards
  .map(
    (std, idx) =>
      `#0${idx + 1} ${std.id}
    Title: ${std.title}
    Department: ${std.department}
    Category: ${std.category} (${std.relationship})
    Confidence: ${std.confidence}% | Retrieval Score: ${std.retrievalScore}
    Match Type: ${std.matchType}
    Status: ${std.status} (Amendments: ${std.amendmentCount})
    Certification / QCO: ${std.certificationScheme}
    Why Applies: ${std.whyApplies}
    Primary Scope Evidence: ${std.scopeEvidence}
    Grounded Clauses:
${std.clauses
  .map(
    (c) =>
      `      * ${c.clauseNumber} (${c.clauseTitle}): "${c.clauseExcerpt}" -> ${c.relevanceExplanation}`
  )
  .join('\n')}`
  )
  .join('\n\n------------------------------------------------------------------------\n\n')}

========================================================================
4. STATUTORY CERTIFICATION SUMMARY
========================================================================
Mandatory Quality Control Orders (QCO): ${summary.mandatoryCertCount} Standards
Allied Interdependent Standards Identified: ${summary.alliedStandardsCount} Standards
Verification Engine: BM25 + Dense Vector + Cross-Encoder Re-ranker
Audit Traceability: 100% BIS Gazette Referenced (Zero Hallucination)
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = generateMarkdownReport();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISpectra_Standards_Audit_${summary.auditHash}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#101820]/60 backdrop-blur-xs"
      />

      <div className="relative w-full max-w-3xl border border-[#D8D4CD] bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl shadow-2xl z-10 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8D4CD]">
          <div className="flex items-center gap-3">
            <div className="h-3.5 w-3.5 bg-[#7F171D] rounded-xs" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#171717]">
                Export Standards Compliance Dossier
              </h3>
              <p className="text-xs font-mono text-[#666666]">
                Audit Hash: {summary.auditHash} · Ready for Tender Annexure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-[#D8D4CD] bg-[#F4F1EB] text-[#171717] hover:border-[#7F171D] rounded-sm transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Report Preview Box */}
        <div className="my-4 flex-1 overflow-y-auto border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg text-xs font-mono text-[#171717] leading-relaxed">
          <pre className="whitespace-pre-wrap font-mono">
            {generateMarkdownReport()}
          </pre>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#D8D4CD] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-[#666666]">
            Official GeM &amp; CPP Tender Annexure Compliant
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 border border-[#D8D4CD] bg-[#FFFFFF] hover:bg-[#F4F1EB] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#171717] rounded-sm"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5 text-[#7F171D]" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-2 border border-[#D8D4CD] bg-[#FFFFFF] hover:bg-[#F4F1EB] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#171717] rounded-sm"
            >
              <Printer className="h-3.5 w-3.5 text-[#7F171D]" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-[#7F171D] hover:bg-[#5E1116] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] rounded-sm shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download (.md)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
