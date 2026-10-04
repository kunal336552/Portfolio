import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { Lock, Menu, X, ArrowUpRight, Sparkles, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { portfolio, adminToken, openAdminDashboard, openAdminLogin } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profile = portfolio?.profile;
  const brandName = profile?.name || 'Kunal Shrivastav';

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: '#resume' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#040806]/85 backdrop-blur-xl border-b border-emerald-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
        
        {/* Brand Zone - Clean & Non-wrapping */}
        <a 
          href="#top" 
          className="text-base sm:text-lg font-bold font-display tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2.5 shrink-0 whitespace-nowrap group"
        >
          <img
            src={profile?.avatarUrl || '/src/assets/images/avatar_kunal_editorial_1790581967170.jpg'}
            alt={brandName}
            className="w-7 h-7 rounded-full object-cover border border-emerald-500/40 shadow-sm shrink-0"
          />
          <span>{brandName}</span>
          <span className="hidden xl:inline-block text-[11px] font-mono font-normal text-emerald-400/90 border border-emerald-500/25 px-2.5 py-0.5 rounded-full bg-emerald-950/40 backdrop-blur-md">
            Full-Stack MERN
          </span>
        </a>

        {/* Clean, Simple Navigation Links - Only on Large Desktops (lg: 1024px+) to prevent any tablet/mobile crushing */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-emerald-400 transition-colors relative py-1 hover:underline underline-offset-8 decoration-emerald-500 decoration-2 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {adminToken ? (
            <button
              onClick={openAdminDashboard}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 hover:bg-emerald-500/30 transition-colors cursor-pointer backdrop-blur-md"
              title="Open CMS Dashboard"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>CMS</span>
            </button>
          ) : (
            <button
              onClick={openAdminLogin}
              className="text-slate-400 hover:text-emerald-300 p-1.5 sm:p-2 rounded-lg hover:bg-emerald-950/30 transition-colors cursor-pointer"
              title="Admin CMS Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile & Tablet Hamburger Toggle - Visible below lg (1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-500/20 bg-[#040806]/98 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-emerald-950/50 hover:text-emerald-400 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-emerald-500/50 text-xs font-mono">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-500/15 flex flex-col gap-2">
            <a
              href="#resume"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-950/60 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View Full-Stack Resume</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-lg transition-colors shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            >
              <span>Get in Touch with Kunal</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {adminToken && (
              <button
                onClick={() => { setMobileMenuOpen(false); openAdminDashboard(); }}
                className="w-full py-2 text-xs text-emerald-400/80 hover:text-emerald-300 font-mono text-center"
              >
                Open CMS Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
