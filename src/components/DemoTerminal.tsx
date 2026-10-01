import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, RefreshCw, Check } from 'lucide-react';

interface DemoTerminalProps {
  onAnalyzeClick: () => void;
}

const TERMINAL_LOGS = [
  'specification received',
  'extracting requirements...',
  'normalising terminology (ETD 24)...',
  'searching standards (BM25 + Dense HNSW)...',
  'ranking candidates (Cross-Encoder)...',
  'validating gazette status & amendments...',
  'generating grounded clause evidence...'
];

export const DemoTerminal: React.FC<DemoTerminalProps> = ({ onAnalyzeClick }) => {
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (currentLine < TERMINAL_LOGS.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 650);
      return () => clearTimeout(timeout);
    } else {
      setIsFinished(true);
    }
  }, [currentLine]);

  const handleRestart = () => {
    setCurrentLine(0);
    setIsFinished(false);
  };

  return (
    <section className="relative border-b border-[#292929] bg-[#0D0D0D] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 bg-[#FF4D2E]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#969696]">
                Interactive Verification
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5F5F2] leading-tight text-balance">
              Give ISpectra a specification.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#969696] leading-relaxed">
              Upload a procurement document or paste your requirement and discover the standards that matter.
            </p>

            <div className="mt-8">
              <button
                onClick={onAnalyzeClick}
                className="group inline-flex items-center gap-3 border border-[#FF4D2E] bg-[#FF4D2E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#080808] transition-all hover:bg-[#D9361E] hover:border-[#D9361E]"
              >
                <span>Analyze a Specification</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Mini Interactive Terminal */}
          <div className="lg:col-span-6">
            <div className="border border-[#292929] bg-[#080808] shadow-2xl overflow-hidden font-mono text-xs">
              
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between border-b border-[#292929] bg-[#111111] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#292929]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#292929]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#292929]" />
                  <span className="text-[11px] text-[#666666] ml-2">ispectra-cli — daemon</span>
                </div>
                
                <button
                  onClick={handleRestart}
                  className="text-[11px] text-[#969696] hover:text-[#F5F5F2] flex items-center gap-1 transition-colors"
                  title="Re-run terminal sequence"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Rerun</span>
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-5 space-y-2 min-h-[260px] flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[#666666] text-[11px]">
                    # Connecting to BIS gazette intelligence socket...
                  </div>

                  {TERMINAL_LOGS.slice(0, currentLine).map((log, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#969696]">
                      <span className="text-[#FF4D2E] font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}

                  {!isFinished && currentLine < TERMINAL_LOGS.length && (
                    <div className="flex items-center gap-2 text-[#F5F5F2]">
                      <span className="text-[#FF4D2E] font-bold">&gt;</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  )}
                </div>

                {isFinished && (
                  <div className="mt-4 pt-4 border-t border-[#292929] flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-bold tracking-wider">
                      <Check className="h-4 w-4" />
                      <span>ANALYSIS READY ✓</span>
                    </div>
                    <span className="text-[10px] text-[#666666]">
                      Latency: 382ms · 7 standards mapped
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
