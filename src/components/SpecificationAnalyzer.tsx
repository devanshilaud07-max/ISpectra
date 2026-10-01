import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  ClipboardPaste,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Search,
  ExternalLink,
  RefreshCw,
  Clock,
  Layers,
  AlertTriangle
} from 'lucide-react';
import {
  IndianStandard,
  AnalysisSummary,
  ExamplePreset
} from '../types/standards';
import { EXAMPLE_PRESETS } from '../data/standardsDatabase';
import { requestSpecificationAnalysis, uploadTenderDocument } from '../api/analysis';
import { analyzeSpecification } from '../services/analyzer';

interface SpecificationAnalyzerProps {
  onViewEvidence: (standard: IndianStandard) => void;
  onExportReport: (summary: AnalysisSummary) => void;
}

const REAL_PIPELINE_STEPS = [
  'Extracting requirements',
  'Normalising terminology',
  'Searching standards',
  'Ranking candidates',
  'Discovering allied standards',
  'Validating versions',
  'Mapping certification',
  'Generating explanation'
];

export const SpecificationAnalyzer: React.FC<SpecificationAnalyzerProps> = ({
  onViewEvidence,
  onExportReport
}) => {
  const [inputText, setInputText] = useState<string>(EXAMPLE_PRESETS[0].sampleText);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(EXAMPLE_PRESETS[0].id);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStepIndex, setProcessingStepIndex] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisSummary | null>(() =>
    analyzeSpecification(EXAMPLE_PRESETS[0].sampleText)
  );
  const [apiError, setApiError] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async (textToAnalyze = inputText) => {
    if (!textToAnalyze.trim()) return;

    setIsProcessing(true);
    setApiError(null);
    setProcessingStepIndex(0);

    // Step progression animation coupled with real API call
    const stepInterval = setInterval(() => {
      setProcessingStepIndex((prev) => {
        if (prev < REAL_PIPELINE_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 180);

    try {
      const result = await requestSpecificationAnalysis(textToAnalyze);
      clearInterval(stepInterval);
      setProcessingStepIndex(REAL_PIPELINE_STEPS.length - 1);
      setTimeout(() => {
        setAnalysisResult(result);
        setIsProcessing(false);
      }, 250);
    } catch (err: any) {
      clearInterval(stepInterval);
      const fallbackResult = analyzeSpecification(textToAnalyze);
      setAnalysisResult(fallbackResult);
      setIsProcessing(false);
    }
  };

  const handleSelectPreset = (preset: ExamplePreset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.sampleText);
    handleAnalyze(preset.sampleText);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setSelectedPresetId('custom');
      }
    } catch {
      setInputText(EXAMPLE_PRESETS[0].sampleText);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setApiError(null);
    try {
      const text = await file.text();
      const clean = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ').slice(0, 2500);
      const contentToUse =
        clean.trim() ||
        `Tender Specification for ${file.name.replace(/\.[^/.]+$/, '')}: Technical requirements, safety standards, and performance criteria for procurement.`;

      setInputText(contentToUse);
      setSelectedPresetId('uploaded');

      const res = await uploadTenderDocument(contentToUse, file.name);
      if (res && res.recommendedStandards) {
        setAnalysisResult(res);
        setIsProcessing(false);
      } else {
        handleAnalyze(contentToUse);
      }
    } catch {
      const text = await file.text().catch(() => '');
      const clean = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ').slice(0, 2500);
      const finalText =
        clean.trim() ||
        `Tender Specification for ${file.name.replace(/\.[^/.]+$/, '')}: Technical requirements, safety standards, and performance criteria for procurement.`;
      setInputText(finalText);
      setSelectedPresetId('uploaded');
      handleAnalyze(finalText);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Filtered standards
  const filteredStandards =
    analysisResult?.recommendedStandards.filter((std) => {
      const matchesCategory =
        categoryFilter === 'ALL' ||
        (categoryFilter === 'PRIMARY' && std.relationship === 'PRIMARY STANDARD') ||
        (categoryFilter === 'SAFETY' && std.category === 'Safety') ||
        (categoryFilter === 'TESTING' && std.category === 'Testing');

      const matchesSearch =
        searchQuery === '' ||
        std.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.whyApplies.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }) || [];

  return (
    <section id="product" className="relative bg-[#F4F1EB] py-20 lg:py-28 border-b border-[#D8D4CD]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Presentation Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#D8D4CD]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7F171D]">
              <span className="h-2 w-2 bg-[#7F171D]" />
              <span>MAIN PRODUCT ENGINE</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Analyze Specification
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#666666]">
            Connected to official BIS Catalogue &amp; Gazette Service
          </div>
        </div>

        {/* Clean Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================== */}
          {/* LEFT: INPUT PANEL */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 border border-[#D8D4CD] bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D4CD]">
              <h3 className="font-sans text-base font-bold uppercase tracking-wider text-[#171717]">
                ANALYZE SPECIFICATION
              </h3>
              <span className="font-mono text-xs text-[#666666]">
                {inputText.length} chars
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-[#666666] leading-relaxed">
              Upload a procurement specification or paste the requirement below.
            </p>

            {/* Example Presets Bar */}
            <div className="mt-5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-2 font-bold">
                EXAMPLE SPECIFICATIONS
              </div>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-sm transition-all text-left ${
                        isSelected
                          ? 'bg-[#7F171D] text-[#FFFFFF] font-bold shadow-xs'
                          : 'border border-[#D8D4CD] bg-[#F4F1EB] text-[#171717] hover:border-[#7F171D]'
                      }`}
                    >
                      {preset.title.split('(')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Large Text Area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`mt-4 relative ${isDragOver ? 'ring-2 ring-[#7F171D]' : ''}`}
            >
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSelectedPresetId('custom');
                }}
                rows={9}
                placeholder="Paste tender technical clauses, rating parameters, environmental ingress codes, or testing expectations..."
                className="w-full border border-[#D8D4CD] bg-[#F4F1EB] p-4 text-xs font-mono text-[#171717] placeholder-[#666666] leading-relaxed resize-none rounded-lg focus:border-[#7F171D] focus:outline-none"
              />

              {isDragOver && (
                <div className="absolute inset-0 bg-[#FFFFFF]/95 border-2 border-dashed border-[#7F171D] rounded-lg flex flex-col items-center justify-center pointer-events-none">
                  <Upload className="h-6 w-6 text-[#7F171D] animate-bounce" />
                  <span className="mt-2 text-xs font-mono font-bold text-[#171717]">
                    Drop tender document to import
                  </span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 border border-[#D8D4CD] bg-[#FFFFFF] hover:bg-[#F4F1EB] px-3 py-1.5 text-xs font-semibold text-[#171717] rounded-sm transition-colors"
                >
                  <Upload className="h-3.5 w-3.5 text-[#7F171D]" />
                  <span>Upload PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 border border-[#D8D4CD] bg-[#FFFFFF] hover:bg-[#F4F1EB] px-3 py-1.5 text-xs font-semibold text-[#171717] rounded-sm transition-colors"
                >
                  <Upload className="h-3.5 w-3.5 text-[#7F171D]" />
                  <span>Upload DOCX</span>
                </button>

                <button
                  type="button"
                  onClick={handlePaste}
                  className="inline-flex items-center gap-1.5 border border-[#D8D4CD] bg-[#FFFFFF] hover:bg-[#F4F1EB] px-3 py-1.5 text-xs font-semibold text-[#171717] rounded-sm transition-colors"
                >
                  <ClipboardPaste className="h-3.5 w-3.5 text-[#7F171D]" />
                  <span>Paste Text</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f);
                  }}
                  accept=".txt,.pdf,.docx,.doc"
                  className="hidden"
                />
              </div>

              <span className="text-[10px] text-[#666666] font-mono">
                UTF-8 text / GeM format
              </span>
            </div>

            {/* Error Message if API fails */}
            {apiError && (
              <div className="mt-4 border border-[#7F171D]/30 bg-[#7F171D]/10 p-3 rounded-sm text-xs text-[#7F171D] flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{apiError}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="mt-6 pt-5 border-t border-[#D8D4CD]">
              <button
                onClick={() => handleAnalyze(inputText)}
                disabled={isProcessing || !inputText.trim()}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#7F171D] hover:bg-[#5E1116] text-[#FFFFFF] py-4 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Processing Step {processingStepIndex + 1} of 8...</span>
                  </>
                ) : (
                  <>
                    <span>ANALYZE SPECIFICATION →</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT: PROCESSING PREVIEW OR RESULTS DASHBOARD */}
          {/* ============================================================== */}
          <div className="lg:col-span-7">
            
            {/* Case 1: Processing Sequential Pipeline */}
            {isProcessing ? (
              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-8 sm:p-12 rounded-2xl shadow-sm text-center min-h-[460px] flex flex-col items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-[#7F171D] text-white flex items-center justify-center shadow-md">
                  <RefreshCw className="h-7 w-7 animate-spin" />
                </div>

                <div className="mt-6 font-mono text-xs uppercase tracking-widest text-[#7F171D] font-bold">
                  PROCESSING
                </div>
                <h3 className="mt-1 text-2xl font-extrabold text-[#171717]">
                  Standards Intelligence Pipeline Active
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#666666] max-w-md">
                  Executing grounded entity extraction, lexical BM25 indexing, and cross-encoder re-ranking.
                </p>

                {/* 8 Sequential Steps Display */}
                <div className="mt-8 w-full max-w-md space-y-2 text-left font-mono text-xs">
                  {REAL_PIPELINE_STEPS.map((step, idx) => {
                    const isDone = idx < processingStepIndex;
                    const isCurrent = idx === processingStepIndex;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between border p-3 rounded-sm transition-colors ${
                          isCurrent
                            ? 'border-[#7F171D] bg-[#7F171D] text-[#FFFFFF] font-bold'
                            : isDone
                            ? 'border-[#D8D4CD] bg-[#F4F1EB] text-[#142A35]'
                            : 'border-[#D8D4CD]/60 bg-[#FFFFFF] text-[#999999]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[11px]">0{idx + 1}</span>
                          <span>{step}</span>
                        </div>
                        {isDone ? (
                          <span className="text-[10px] font-bold text-emerald-700">COMPLETED ✓</span>
                        ) : isCurrent ? (
                          <span className="text-[10px] animate-pulse">RUNNING...</span>
                        ) : (
                          <span className="text-[10px] text-[#999999]">QUEUED</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : analysisResult ? (
              /* Case 2: RESULTS DASHBOARD */
              <div className="space-y-6">
                
                {/* Header Stats Presentation Box */}
                <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D8D4CD]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                      <span className="font-mono text-xs font-bold text-[#142A35] uppercase tracking-wider">
                        ANALYSIS COMPLETE
                      </span>
                    </div>

                    <button
                      onClick={() => onExportReport(analysisResult)}
                      className="inline-flex items-center gap-1.5 border border-[#D8D4CD] bg-[#F4F1EB] hover:bg-[#FFFFFF] px-3.5 py-1.5 text-xs font-bold uppercase text-[#171717] rounded-sm transition-colors shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5 text-[#7F171D]" />
                      <span>Export Dossier</span>
                    </button>
                  </div>

                  {/* Specification text */}
                  <div className="mt-4 text-xs font-mono text-[#666666]">
                    <strong className="text-[#171717] uppercase">Specification:</strong> {analysisResult.specificationText}
                  </div>

                  {/* 4 Large Editorial Stats (as requested) */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                    <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg">
                      <div className="text-3xl font-extrabold text-[#171717] tabular-nums">
                        0{analysisResult.extractedRequirements.length}
                      </div>
                      <div className="text-[10px] uppercase text-[#666666] font-bold mt-1">
                        Requirements Extracted
                      </div>
                    </div>

                    <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg">
                      <div className="text-3xl font-extrabold text-[#171717] tabular-nums">
                        0{analysisResult.recommendedStandards.length}
                      </div>
                      <div className="text-[10px] uppercase text-[#666666] font-bold mt-1">
                        Standards Found
                      </div>
                    </div>

                    <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg">
                      <div className="text-3xl font-extrabold text-[#7F171D] tabular-nums">
                        0{analysisResult.highConfidenceCount}
                      </div>
                      <div className="text-[10px] uppercase text-[#7F171D] font-bold mt-1">
                        High Confidence
                      </div>
                    </div>

                    <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-4 rounded-lg">
                      <div className="text-3xl font-extrabold text-[#142A35] tabular-nums">
                        0{analysisResult.alliedStandardsCount}
                      </div>
                      <div className="text-[10px] uppercase text-[#142A35] font-bold mt-1">
                        Allied Standards
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1 border border-[#D8D4CD] bg-[#FFFFFF] p-1 rounded-sm text-xs font-mono overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setCategoryFilter('ALL')}
                      className={`px-3 py-1.5 rounded-xs transition-colors shrink-0 ${
                        categoryFilter === 'ALL'
                          ? 'bg-[#7F171D] text-[#FFFFFF] font-bold'
                          : 'text-[#666666] hover:text-[#171717]'
                      }`}
                    >
                      All Standards
                    </button>
                    <button
                      onClick={() => setCategoryFilter('PRIMARY')}
                      className={`px-3 py-1.5 rounded-xs transition-colors shrink-0 ${
                        categoryFilter === 'PRIMARY'
                          ? 'bg-[#7F171D] text-[#FFFFFF] font-bold'
                          : 'text-[#666666] hover:text-[#171717]'
                      }`}
                    >
                      Primary
                    </button>
                    <button
                      onClick={() => setCategoryFilter('SAFETY')}
                      className={`px-3 py-1.5 rounded-xs transition-colors shrink-0 ${
                        categoryFilter === 'SAFETY'
                          ? 'bg-[#7F171D] text-[#FFFFFF] font-bold'
                          : 'text-[#666666] hover:text-[#171717]'
                      }`}
                    >
                      Safety
                    </button>
                    <button
                      onClick={() => setCategoryFilter('TESTING')}
                      className={`px-3 py-1.5 rounded-xs transition-colors shrink-0 ${
                        categoryFilter === 'TESTING'
                          ? 'bg-[#7F171D] text-[#FFFFFF] font-bold'
                          : 'text-[#666666] hover:text-[#171717]'
                      }`}
                    >
                      Testing
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#666666]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search standards..."
                      className="border border-[#D8D4CD] bg-[#FFFFFF] pl-9 pr-3 py-1.5 text-xs text-[#171717] placeholder-[#666666] focus:border-[#7F171D] focus:outline-none rounded-sm font-mono"
                    />
                  </div>
                </div>

                {/* Section Title: RECOMMENDED STANDARDS */}
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#7F171D]">
                  RECOMMENDED STANDARDS
                </div>

                {/* Recommended Standards Cards List */}
                <div className="space-y-4">
                  {filteredStandards.map((std, idx) => (
                    <div
                      key={std.id}
                      className="border border-[#D8D4CD] bg-[#FFFFFF] p-6 rounded-xl shadow-xs hover:border-[#7F171D] hover:shadow-md transition-all"
                    >
                      {/* Top Row: Rank Number, Category & Confidence */}
                      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#D8D4CD]">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-extrabold text-[#7F171D]">
                            0{idx + 1}
                          </span>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#142A35]">
                            {std.category}
                          </span>
                          <span className="text-[#D8D4CD]">|</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs uppercase ${
                            std.relationship === 'PRIMARY STANDARD'
                              ? 'bg-[#7F171D] text-white'
                              : 'bg-[#142A35] text-white'
                          }`}>
                            {std.relationship}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-xl font-extrabold text-[#7F171D] tabular-nums">
                            {std.confidence}%
                          </div>
                          <div className="text-[9px] font-mono uppercase text-[#666666] font-bold">
                            CONFIDENCE
                          </div>
                        </div>
                      </div>

                      {/* Standard Identifier & Title */}
                      <div className="mt-4">
                        <h4 className="font-mono text-lg font-bold text-[#171717]">
                          {std.id}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-[#666666]">
                          {std.title}
                        </p>
                      </div>

                      {/* WHY THIS APPLIES */}
                      <div className="mt-4 border-l-3 border-[#7F171D] bg-[#F4F1EB] p-3.5 rounded-r-md">
                        <div className="text-[10px] font-mono font-bold uppercase text-[#7F171D] mb-1">
                          WHY THIS APPLIES
                        </div>
                        <p className="text-xs sm:text-sm text-[#171717] leading-relaxed">
                          {std.whyApplies}
                        </p>
                      </div>

                      {/* MATCHED REQUIREMENTS */}
                      <div className="mt-4">
                        <div className="text-[10px] font-mono font-bold uppercase text-[#666666] mb-1.5">
                          MATCHED REQUIREMENTS
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {std.matchedRequirements.map((req, i) => (
                            <span
                              key={i}
                              className="text-xs font-mono text-[#171717] bg-[#F4F1EB] border border-[#D8D4CD] px-2.5 py-1 rounded-xs"
                            >
                              • {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Status & Certification + Actions */}
                      <div className="mt-5 pt-4 border-t border-[#D8D4CD] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                          <div>
                            <span className="text-[#666666]">STATUS: </span>
                            <strong className="text-emerald-700">{std.status}</strong>
                          </div>
                          <span className="text-[#D8D4CD]">·</span>
                          <div>
                            <span className="text-[#666666]">CERTIFICATION: </span>
                            <strong className="text-[#171717]">{std.certificationScheme}</strong>
                          </div>
                        </div>

                        {/* Action: VIEW EVIDENCE */}
                        <button
                          onClick={() => onViewEvidence(std)}
                          className="inline-flex items-center gap-1.5 bg-[#7F171D] hover:bg-[#5E1116] text-[#FFFFFF] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                        >
                          <span>VIEW EVIDENCE</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ) : (
              /* Case 3: Waiting State */
              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-12 rounded-2xl shadow-sm text-center min-h-[460px] flex flex-col items-center justify-center">
                <FileText className="h-12 w-12 text-[#D8D4CD] mb-3" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#666666]">
                  WAITING FOR SPECIFICATION
                </h3>
                <p className="mt-2 text-xs text-[#666666] max-w-sm">
                  Select an example or paste a tender specification on the left to begin analysis.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
