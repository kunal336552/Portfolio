import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext.js';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { ProjectsSection } from './components/ProjectsSection.js';
import { SkillsSection } from './components/SkillsSection.js';
import { ExperienceSection } from './components/ExperienceSection.js';
import { ResumeSection } from './components/ResumeSection.js';
import { About } from './components/About.js';
import { ProcessSection } from './components/ProcessSection.js';
import { ServicesSection } from './components/ServicesSection.js';
import { ContactSection } from './components/ContactSection.js';
import { Footer } from './components/Footer.js';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal.js';
import { AdminLoginModal } from './components/admin/AdminLoginModal.js';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal.js';
import { Loader2, RefreshCw } from 'lucide-react';

const PortfolioContent: React.FC = () => {
  const { loading, error, refreshPortfolio } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040806] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <div className="space-y-1">
          <div className="text-base font-bold text-white font-display">Kunal Shrivastav · Portfolio</div>
          <div className="text-xs font-mono text-emerald-400/70">Loading portfolio experience...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#040806] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm max-w-md">
          {error}
        </div>
        <button
          onClick={refreshPortfolio}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040806] text-slate-200 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Navigation Top Bar Contract */}
      <Navbar />

      {/* Main Page Flow - Projects right after Hero, plus standout Resume section */}
      <main className="flex-1">
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ResumeSection />
        <About />
        <ProcessSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectCaseStudyModal />
      <AdminLoginModal />
      <AdminDashboardModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
