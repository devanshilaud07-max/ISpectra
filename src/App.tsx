import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecificationAnalyzer } from './components/SpecificationAnalyzer';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { AlliedGraphSection } from './components/AlliedGraphSection';
import { VersionGuardSection } from './components/VersionGuardSection';
import { AiCopilotSection } from './components/AiCopilotSection';
import { AboutTrustSection } from './components/AboutTrustSection';
import { Footer } from './components/Footer';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { ExportReportModal } from './components/ExportReportModal';
import { SignInModal } from './components/SignInModal';
import { CopilotChatbot } from './components/CopilotChatbot';
import { IndianStandard, AnalysisSummary } from './types/standards';
import { Check } from 'lucide-react';

export default function App() {
  const [selectedStandardForEvidence, setSelectedStandardForEvidence] = useState<IndianStandard | null>(null);
  const [summaryForExport, setSummaryForExport] = useState<AnalysisSummary | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [activeUserRole, setActiveUserRole] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollToAnalyzer = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRoleSuccess = (role: string) => {
    setActiveUserRole(role);
    setToastMessage(`Signed in as ${role}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignOut = () => {
    setActiveUserRole(null);
    setToastMessage('Signed out of workspace.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleInsertToAnalyzer = (text: string) => {
    scrollToAnalyzer();
    setToastMessage('Query copied. You can paste and analyze it in the studio.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#171717] selection:bg-[#7F171D]/15 selection:text-[#7F171D] bg-warm-pattern">
      
      {/* Navigation */}
      <Navbar
        onOpenAnalyzer={scrollToAnalyzer}
        onOpenSignIn={() => setSignInOpen(true)}
        userRole={activeUserRole}
        onSignOut={handleSignOut}
      />

      <main>
        {/* Product Hero */}
        <Hero
          onAnalyzeClick={scrollToAnalyzer}
          onExploreClick={scrollToFeatures}
        />

        {/* Core Working Feature: Specification Analyzer & Live Dashboard */}
        <SpecificationAnalyzer
          onViewEvidence={(std) => setSelectedStandardForEvidence(std)}
          onExportReport={(summary) => setSummaryForExport(summary)}
        />

        {/* Major Highlighted AI Feature: Conversational Standards Intelligence Copilot */}
        <AiCopilotSection onInsertToAnalyzer={handleInsertToAnalyzer} />

        {/* Feature: 4 Core Platform Pillars */}
        <KeyFeaturesSection />

        {/* Feature: Interactive Related Standards Graph */}
        <AlliedGraphSection />

        {/* Feature: Version & Certification Guard */}
        <VersionGuardSection />

        {/* About & Trust Section (SIH26108, Smart Automation) */}
        <AboutTrustSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Working AI Copilot Chatbot */}
      <CopilotChatbot onInsertToAnalyzer={handleInsertToAnalyzer} />

      {/* Explainable Evidence Drawer */}
      <EvidenceDrawer
        standard={selectedStandardForEvidence}
        onClose={() => setSelectedStandardForEvidence(null)}
      />

      {/* Export Report / Compliance Dossier Modal */}
      {summaryForExport && (
        <ExportReportModal
          summary={summaryForExport}
          onClose={() => setSummaryForExport(null)}
        />
      )}

      {/* Sign In / Role Switcher Modal */}
      {signInOpen && (
        <SignInModal
          onClose={() => setSignInOpen(false)}
          onSuccess={handleRoleSuccess}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 border border-[#D8D4CD] bg-[#FFFFFF] px-5 py-3.5 shadow-xl rounded-sm text-xs font-mono text-[#171717] flex items-center gap-2.5">
          <Check className="h-4 w-4 text-[#7F171D]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
