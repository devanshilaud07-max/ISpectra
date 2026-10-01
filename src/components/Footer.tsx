import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#D8D4CD] bg-[#F4F1EB] py-14 text-xs text-[#666666]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-[#D8D4CD]">
          
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 bg-[#7F171D] text-white flex items-center justify-center rounded-xs shadow-xs">
                <div className="h-2 w-2 bg-[#F4F1EB]" />
              </div>
              <span className="font-sans text-lg font-extrabold tracking-tight text-[#171717] uppercase">
                ISpectra
              </span>
            </div>
            <p className="mt-2 text-xs text-[#666666]">
              AI-powered recommendation engine for applicable Indian Standards.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-semibold uppercase tracking-wider text-xs">
            <a href="#product" className="hover:text-[#7F171D] transition-colors">Product</a>
            <a href="#how-it-works" className="hover:text-[#7F171D] transition-colors">How It Works</a>
            <a href="#technology" className="hover:text-[#7F171D] transition-colors">Technology</a>
            <a href="#standards" className="hover:text-[#7F171D] transition-colors">Standards</a>
            <a href="#about" className="hover:text-[#7F171D] transition-colors">About</a>
          </nav>

        </div>

        {/* Bottom Credits & Problem Statement SIH26108 */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-[#666666]">
          <p>
            Designed for standards-aware procurement. Aligned with Bureau of Indian Standards (BIS) gazette records.
          </p>
          <div className="flex items-center gap-4 font-mono font-medium">
            <span>Problem Statement: <strong className="text-[#171717]">SIH26108</strong></span>
            <span>·</span>
            <span>Theme: <strong className="text-[#7F171D]">Smart Automation</strong></span>
            <span>·</span>
            <span>© 2026 ISpectra</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
