import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { portfolio, openAdminLogin, openAdminDashboard, adminToken } = usePortfolio();
  const profile = portfolio?.profile;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 sm:py-10 bg-[#030705] border-t border-emerald-500/15 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold text-white font-display flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>{profile?.name || 'Kunal Shrivastav'}</span>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Full-Stack MERN Developer · New Delhi, India
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-400">
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {profile?.name || 'Kunal Shrivastav'}. Full-Stack MERN Portfolio.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">React · Node · Express · MongoDB</span>
            <span aria-hidden="true" className="text-emerald-900">·</span>
            <button
              onClick={adminToken ? openAdminDashboard : openAdminLogin}
              className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Admin CMS Management"
            >
              <Lock className="w-3 h-3" />
              <span>CMS Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
