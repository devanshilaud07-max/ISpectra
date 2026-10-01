import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, Layers, Sparkles } from 'lucide-react';

interface HeroProps {
  onAnalyzeClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#F4F1EB] pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-[#D8D4CD]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Main Product Hero Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Product Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Product Eyebrow Label */}
              <div className="inline-flex items-center gap-2 border-b-2 border-[#7F171D] pb-1 mb-6">
                <span className="h-2 w-2 bg-[#7F171D]" />
                <span className="font-mono text-xs font-bold tracking-widest text-[#7F171D] uppercase">
                  AI-POWERED STANDARDS INTELLIGENCE
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.08] text-balance">
                From procurement
                <br />
                specifications to
                <br />
                <span className="text-[#7F171D]">the right Indian Standards.</span>
              </h1>

              {/* Supporting Description */}
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#666666]">
                ISpectra analyzes procurement specifications, identifies applicable Indian Standards,
                discovers interdependent safety and testing codes, and provides explainable evidence for public tenders.
              </p>

              {/* Call to Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onAnalyzeClick}
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#7F171D] hover:bg-[#5E1116] text-[#FFFFFF] px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
                >
                  <span>Analyze Specification</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#ai-copilot"
                  className="inline-flex items-center justify-center gap-2 bg-[#142A35] hover:bg-[#0e1d25] text-[#FFFFFF] px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Ask AI Copilot</span>
                </a>

                <button
                  onClick={onExploreClick}
                  className="inline-flex items-center justify-center border border-[#D8D4CD] bg-[#FFFFFF] hover:bg-[#F4F1EB] text-[#171717] px-5 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  Features
                </button>
              </div>
            </div>

            {/* Bottom Regulatory Verification Footnote */}
            <div className="mt-12 pt-6 border-t border-[#D8D4CD] flex items-center justify-between text-xs text-[#666666]">
              <div>
                <span className="block font-bold text-[#171717] uppercase tracking-wider">
                  NATIONAL STANDARDS REASONING ENGINE
                </span>
                <span className="text-[11px] font-mono">
                  Smart Automation · Problem Statement SIH26108
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#142A35] bg-[#FFFFFF] border border-[#D8D4CD] px-3 py-1.5 rounded-sm">
                <ShieldCheck className="h-4 w-4 text-[#7F171D]" />
                <span>BIS GAZZETTE VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bureau of Indian Standards Official Building */}
          <div className="lg:col-span-6">
            <div className="relative border border-[#D8D4CD] bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl shadow-lg overflow-hidden">
              
              {/* Bureau of Indian Standards Building Container */}
              <div className="relative h-72 sm:h-84 w-full overflow-hidden rounded-xl bg-[#142A35]">
                <img
                  src="/src/assets/images/bureau_of_indian_standards_building_1790835632256.jpg"
                  alt="Bureau of Indian Standards Official Building"
                  className="h-full w-full object-cover object-center filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/80 via-transparent to-black/20" />
                
                {/* Floating Architectural Badge */}
                <div className="absolute top-4 left-4 bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#D8D4CD] px-3.5 py-1.5 rounded-sm shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-[#7F171D]" />
                    <span>BUREAU OF INDIAN STANDARDS (BIS)</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#7F171D] text-white font-mono text-[10px] font-bold px-3 py-1 rounded-sm tracking-widest uppercase shadow-xs">
                  OFFICIAL REGULATORY AUTHORITY
                </div>
              </div>

              {/* Verified Standards Overview Box */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                
                {/* Card 1 */}
                <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-3.5 rounded-sm">
                  <div className="text-[10px] font-bold uppercase text-[#7F171D]">PRIMARY PRODUCT</div>
                  <div className="font-bold text-[#171717] mt-1 text-sm">IS 10322 (Pt 5/3)</div>
                  <div className="text-[11px] text-[#666666] mt-0.5">Roadway LED Luminaires</div>
                </div>

                {/* Card 2 */}
                <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-3.5 rounded-sm">
                  <div className="text-[10px] font-bold uppercase text-[#142A35]">SAFETY MANDATE</div>
                  <div className="font-bold text-[#171717] mt-1 text-sm">IS 15885 (Pt 2/13)</div>
                  <div className="text-[11px] text-[#666666] mt-0.5">Electronic LED Driver</div>
                </div>

                {/* Card 3 */}
                <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-3.5 rounded-sm">
                  <div className="text-[10px] font-bold uppercase text-[#7F171D]">TESTING PROTOCOL</div>
                  <div className="font-bold text-[#171717] mt-1 text-sm">IS/IEC 60529</div>
                  <div className="text-[11px] text-[#666666] mt-0.5">IP66 Spray Chamber</div>
                </div>

              </div>

              {/* Bottom Quote Banner */}
              <div className="mt-4 bg-[#142A35] text-[#FFFFFF] p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#A52A30] shrink-0" />
                  <p className="text-xs font-medium text-[#F4F1EB]">
                    100% clause traceability to official Bureau of Indian Standards catalogues.
                  </p>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] text-[#A52A30] uppercase font-bold tracking-wider">
                  ZERO HALLUCINATION
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
