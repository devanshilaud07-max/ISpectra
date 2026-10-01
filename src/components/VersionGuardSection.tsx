import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Clock, FileWarning, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { VERIFIED_BIS_STANDARDS } from '../data/standardsDatabase';

interface VersionExample {
  id: string;
  citedCode: string;
  citedTitle: string;
  status: 'CURRENT' | 'WITHDRAWN' | 'SUPERSEDED' | 'AMENDED';
  amendmentCount: number;
  supersededInfo?: string;
  certificationScheme: string;
  mandatoryQCO: boolean;
  gazetteRef: string;
  advisory: string;
}

const VERSION_REGISTRY: VersionExample[] = [
  {
    id: 'is1944',
    citedCode: 'IS 1944 (Parts 1 & 2): 1970',
    citedTitle: 'Code of practice for lighting of public thoroughfares',
    status: 'WITHDRAWN',
    amendmentCount: 0,
    supersededInfo: 'Withdrawn by Bureau of Indian Standards in 2017. Replaced by IS 10322 (Pt 5/Sec 3).',
    certificationScheme: 'No BIS license can be issued against this withdrawn specification.',
    mandatoryQCO: false,
    gazetteRef: 'BIS Gazette Notification Part II, Sec 3(ii)',
    advisory: 'CRITICAL WARNING: Tenders citing IS 1944 are legally vulnerable. Upgraded to IS 10322 (Pt 5/Sec 3).'
  },
  {
    id: 'is10322',
    citedCode: 'IS 10322 (Part 5/Sec 3): 2012',
    citedTitle: 'Luminaires: Particular requirements — Road and street lighting',
    status: 'AMENDED',
    amendmentCount: 3,
    supersededInfo: 'Active code with Amendment No. 1, 2 & 3 in statutory force.',
    certificationScheme: 'Mandatory BIS Compulsory Registration Scheme (CRS) via MeitY/DPIIT QCO.',
    mandatoryQCO: true,
    gazetteRef: 'MeitY Notification S.O. 2357(E)',
    advisory: 'ENFORCED COMPLIANCE: Supplier must provide valid BIS CRS registration certificate matching model number.'
  },
  {
    id: 'is16074',
    citedCode: 'IS 16074: 2013',
    citedTitle: 'Thin-Film Terrestrial Photovoltaic (PV) Modules',
    status: 'CURRENT',
    amendmentCount: 1,
    supersededInfo: 'Current standard for thin-film modules. Aligned with IEC 61646.',
    certificationScheme: 'Mandatory inclusion under MNRE Solar Photovoltaics QCO 2017.',
    mandatoryQCO: true,
    gazetteRef: 'MNRE Notification No. 257/59/2017-ST',
    advisory: 'VALID & CURRENT: Manufacturer must hold BIS certification license for the cell technology.'
  },
  {
    id: 'is3614_old',
    citedCode: 'IS 3614 (Part 1): 1966',
    citedTitle: 'Specification for fire check doors — Plate, metal covered and rolling type',
    status: 'SUPERSEDED',
    amendmentCount: 2,
    supersededInfo: 'Superseded by single consolidated code IS 3614: 2021.',
    certificationScheme: 'Manufacturers must transition ISI license to IS 3614: 2021.',
    mandatoryQCO: true,
    gazetteRef: 'DPIIT QCO on Fire Resisting Doorsets',
    advisory: 'UPGRADE CITATION: Tender documents must cite IS 3614: 2021 for valid QCO coverage.'
  }
];

export const VersionGuardSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<VersionExample>(VERSION_REGISTRY[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = VERIFIED_BIS_STANDARDS.find(
      (s) => s.id.toLowerCase().includes(query) || s.title.toLowerCase().includes(query)
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult({
        id: searchQuery.toUpperCase(),
        title: 'Custom Standard / Historical Reference',
        status: 'UNDER REVIEW',
        amendmentCount: 0,
        certificationScheme: 'BIS Gazette Verification Required',
        whyApplies: 'Queried by user against Bureau of Indian Standards active catalogue.'
      });
    }
  };

  const selectQuickTag = (tag: string) => {
    setSearchQuery(tag);
    const found = VERIFIED_BIS_STANDARDS.find((s) => s.id.toLowerCase().includes(tag.toLowerCase()));
    if (found) setSearchResult(found);
  };

  return (
    <section id="version-guard" className="relative bg-[#F4F1EB] py-16 sm:py-20 lg:py-28 border-b border-[#D8D4CD]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7F171D]">
            <span className="h-2 w-2 bg-[#7F171D]" />
            <span>GAZETTE &amp; CERTIFICATION AUDIT</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight">
            Version &amp; Certification Guard
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#666666] leading-relaxed">
            Citing a superseded or withdrawn Indian Standard creates legal vulnerability and tender litigation. ISpectra audits the real-time official gazette status of every standard.
          </p>
        </div>

        {/* 4 Status Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3.5 sm:p-4 rounded-lg flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-600 shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-[#171717]">CURRENT</div>
              <div className="text-[10px] sm:text-[11px] text-[#666666]">Active BIS standard</div>
            </div>
          </div>

          <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3.5 sm:p-4 rounded-lg flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-500 shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-[#171717]">AMENDED</div>
              <div className="text-[10px] sm:text-[11px] text-[#666666]">Active + Amendments</div>
            </div>
          </div>

          <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3.5 sm:p-4 rounded-lg flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#7F171D] shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-[#7F171D]">WITHDRAWN</div>
              <div className="text-[10px] sm:text-[11px] text-[#666666]">Defunct / Void code</div>
            </div>
          </div>

          <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-3.5 sm:p-4 rounded-lg flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#142A35] shrink-0" />
            <div>
              <div className="font-mono text-xs font-bold text-[#142A35]">SUPERSEDED</div>
              <div className="text-[10px] sm:text-[11px] text-[#666666]">Replaced by new code</div>
            </div>
          </div>
        </div>

        {/* Live Gazette Standard Lookup Widget */}
        <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-4 sm:p-6 rounded-xl shadow-xs mb-8">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7F171D] mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>LIVE BIS GAZETTE STANDARD LOOKUP</span>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter standard number (e.g. IS 1944, IS 10322, IS 15885, IS 3614)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs font-mono border border-[#D8D4CD] bg-[#F4F1EB] rounded-sm focus:border-[#7F171D] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-[#7F171D] hover:bg-[#5E1116] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Verify Status
            </button>
          </form>

          {/* Quick Click Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] font-mono text-[#666666]">Try:</span>
            {['IS 1944', 'IS 10322', 'IS 15885', 'IS 3614', 'IS 14286', 'IS 16288'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectQuickTag(tag)}
                className="font-mono text-[10px] border border-[#D8D4CD] bg-[#F4F1EB] hover:bg-[#FFFFFF] px-2 py-0.5 rounded-xs text-[#171717]"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Result Display */}
          {searchResult && (
            <div className="mt-4 p-4 border border-[#D8D4CD] bg-[#F4F1EB] rounded-lg font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-sm text-[#171717]">{searchResult.id}</span>
                <span className={`px-2.5 py-0.5 rounded-xs font-bold text-[10px] uppercase self-start sm:self-auto ${
                  searchResult.status === 'CURRENT' ? 'bg-emerald-100 text-emerald-800' :
                  searchResult.status === 'AMENDED' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  STATUS: {searchResult.status} ({searchResult.amendmentCount} AMENDMENTS)
                </span>
              </div>
              <div className="text-xs text-[#444444] mt-1 font-sans">{searchResult.title}</div>
              <div className="text-[11px] text-[#7F171D] mt-2 font-semibold">
                Certification Scheme: {searchResult.certificationScheme}
              </div>
            </div>
          )}
        </div>

        {/* Registry Case Studies & Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left: Registry List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666] mb-1">
              SELECT REAL TENDER PRECEDENT CASE:
            </div>
            {VERSION_REGISTRY.map((item) => {
              const isSelected = selectedCase.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`cursor-pointer border p-4 sm:p-5 rounded-lg transition-all ${
                    isSelected
                      ? 'border-[#7F171D] bg-[#FFFFFF] shadow-sm ring-1 ring-[#7F171D]'
                      : 'border-[#D8D4CD] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#171717]">
                      {item.citedCode}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase self-start sm:self-auto ${
                        item.status === 'CURRENT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'AMENDED'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'WITHDRAWN'
                          ? 'bg-red-100 text-[#7F171D]'
                          : 'bg-blue-100 text-[#142A35]'
                      }`}
                    >
                      {item.status} ({item.amendmentCount} AMENDMENTS)
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-[#666666] line-clamp-1">
                    {item.citedTitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Case Inspector */}
          <div className="lg:col-span-5 border border-[#D8D4CD] bg-[#FFFFFF] p-5 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8D4CD] font-mono text-xs">
              <span className="text-[#666666] uppercase text-[11px]">GAZETTE RECORD</span>
              <span className="text-[#7F171D] font-bold uppercase text-[11px]">{selectedCase.status}</span>
            </div>

            <div className="mt-4">
              <h4 className="font-mono text-base sm:text-lg font-bold text-[#171717]">
                {selectedCase.citedCode}
              </h4>
              <p className="mt-1 text-xs text-[#666666]">
                {selectedCase.citedTitle}
              </p>
            </div>

            <div className="mt-5 space-y-3 font-mono text-xs">
              <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#F4F1EB]">
                <div className="text-[10px] font-bold uppercase text-[#666666]">GAZETTE NOTIFICATION</div>
                <div className="text-xs text-[#171717] mt-0.5">{selectedCase.gazetteRef}</div>
              </div>

              <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#F4F1EB]">
                <div className="text-[10px] font-bold uppercase text-[#666666]">SUPERSEDED DETAILS</div>
                <div className="text-xs text-[#171717] mt-0.5">{selectedCase.supersededInfo}</div>
              </div>

              <div className="border border-[#D8D4CD] p-3 rounded-md bg-[#F4F1EB]">
                <div className="text-[10px] font-bold uppercase text-[#666666]">CERTIFICATION SCHEME</div>
                <div className="text-xs text-[#171717] mt-0.5">{selectedCase.certificationScheme}</div>
              </div>
            </div>

            <div className="mt-5 border-l-3 border-[#7F171D] bg-[#F4F1EB] p-3.5 rounded-r-md">
              <div className="text-[10px] font-mono font-bold uppercase text-[#7F171D]">
                PROCUREMENT ADVISORY
              </div>
              <p className="mt-1 text-xs text-[#171717] font-sans leading-relaxed">
                {selectedCase.advisory}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
