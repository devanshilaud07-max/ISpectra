import React from 'react';
import { ShieldCheck, Award, FileCode2 } from 'lucide-react';

export const AboutTrustSection: React.FC = () => {
  return (
    <section id="about" className="relative bg-[#FFFFFF] py-20 lg:py-24 border-b border-[#D8D4CD]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        <div className="border border-[#D8D4CD] bg-[#F4F1EB] p-8 sm:p-12 rounded-3xl shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-6">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7F171D]">
                <span className="h-2 w-2 bg-[#7F171D]" />
                <span>ABOUT ISPECTRA</span>
              </div>
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                National Standards Intelligence Engine
              </h3>
              <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                ISpectra bridges the structural gap between free-form government tender specifications and the formal Bureau of Indian Standards (BIS) regulatory framework, protecting procurement integrity and advancing quality infrastructure across India.
              </p>
            </div>

            <div className="md:col-span-6 grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-[#D8D4CD] pt-6 md:pt-0 md:pl-8">
              
              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-4 rounded-xl text-center shadow-2xs">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-bold">PROBLEM ID</div>
                <div className="mt-2 font-mono text-base font-extrabold text-[#171717]">
                  SIH26108
                </div>
              </div>

              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-4 rounded-xl text-center shadow-2xs">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-bold">THEME</div>
                <div className="mt-2 font-mono text-xs sm:text-sm font-extrabold text-[#7F171D]">
                  Smart Automation
                </div>
              </div>

              <div className="border border-[#D8D4CD] bg-[#FFFFFF] p-4 rounded-xl text-center shadow-2xs">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-bold">TEAM</div>
                <div className="mt-2 font-mono text-base font-extrabold text-[#142A35]">
                  ISpectra
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
