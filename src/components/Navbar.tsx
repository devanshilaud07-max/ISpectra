import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sparkles, Bot } from 'lucide-react';

interface NavbarProps {
  onOpenAnalyzer: () => void;
  onOpenSignIn: () => void;
  userRole?: string | null;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAnalyzer,
  onOpenSignIn,
  userRole,
  onSignOut
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-xs border-b border-[#D8D4CD]'
          : 'bg-[#F4F1EB] border-b border-[#D8D4CD]'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        
        {/* Brand */}
        <div className="flex items-center gap-4">
          <a href="#" className="group flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center bg-[#7F171D] text-white rounded-sm shadow-xs transition-transform group-hover:scale-105">
              <div className="h-3 w-3 bg-[#F4F1EB] rounded-xs" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xl font-extrabold tracking-tight text-[#171717] uppercase">
                ISpectra
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#7F171D] uppercase font-bold -mt-1">
                SIH26108 · Standards Engine
              </span>
            </div>
          </a>
        </div>

        {/* Feature Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#666666]">
          <a href="#product" className="transition-colors hover:text-[#7F171D]">
            Analyzer
          </a>
          <a
            href="#ai-copilot"
            className="inline-flex items-center gap-1.5 text-[#7F171D] bg-[#7F171D]/10 hover:bg-[#7F171D]/20 px-3 py-1.5 rounded-full transition-colors border border-[#7F171D]/20"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#7F171D] animate-pulse" />
            <span>AI Copilot</span>
          </a>
          <a href="#features" className="transition-colors hover:text-[#7F171D]">
            Features
          </a>
          <a href="#standards" className="transition-colors hover:text-[#7F171D]">
            Related Standards
          </a>
          <a href="#version-guard" className="transition-colors hover:text-[#7F171D]">
            Version Guard
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {userRole ? (
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <span className="font-mono text-[#171717] font-medium bg-[#FFFFFF] border border-[#D8D4CD] px-3 py-1.5 rounded-sm">
                {userRole}
              </span>
              <button
                onClick={onSignOut}
                className="text-[#7F171D] hover:underline font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#7F171D] transition-colors px-3 py-2"
            >
              Workspace Access
            </button>
          )}

          <button
            onClick={onOpenAnalyzer}
            className="group inline-flex items-center gap-2 bg-[#7F171D] hover:bg-[#5E1116] text-[#FFFFFF] px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs"
          >
            <span>Analyze Specification</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center border border-[#D8D4CD] bg-[#FFFFFF] text-[#171717] rounded-sm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8D4CD] bg-[#FFFFFF] px-6 py-6 space-y-4 text-xs font-bold uppercase tracking-wider">
          <a
            href="#product"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#171717] hover:text-[#7F171D]"
          >
            Analyzer
          </a>
          <a
            href="#ai-copilot"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5 text-[#7F171D] font-bold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Copilot (Free)</span>
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#171717] hover:text-[#7F171D]"
          >
            Features
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#171717] hover:text-[#7F171D]"
          >
            Related Standards
          </a>
          <a
            href="#version-guard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#171717] hover:text-[#7F171D]"
          >
            Version Guard
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#171717] hover:text-[#7F171D]"
          >
            About
          </a>
          <div className="pt-3 border-t border-[#D8D4CD] flex justify-between items-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignIn();
              }}
              className="text-[#7F171D]"
            >
              Sign In
            </button>
            <span className="text-[#666666] font-mono text-[10px]">SIH26108</span>
          </div>
        </div>
      )}
    </header>
  );
};
