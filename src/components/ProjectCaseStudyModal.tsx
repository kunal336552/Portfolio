import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { X, Github, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb, UserCheck, Layers, Sparkles } from 'lucide-react';

export const ProjectCaseStudyModal: React.FC = () => {
  const { selectedProject, closeCaseStudy } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCaseStudy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeCaseStudy]);

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={closeCaseStudy} aria-hidden="true" />

      {/* Modal Dialog Container with Glassmorphism */}
      <div className="relative w-full max-w-4xl bg-[#08170F]/95 backdrop-blur-2xl border border-emerald-500/25 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#08170F]/95 backdrop-blur-xl border-b border-emerald-500/15">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            <span className="text-xs font-mono tracking-wider text-emerald-200/90 uppercase">
              Project Architecture &amp; Case Study
            </span>
          </div>

          <button
            onClick={closeCaseStudy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/40 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
          
          {/* Hero Banner with Project Title */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedProject.category.toUpperCase()} PLATFORM</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display">
              {selectedProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {selectedProject.fullDescription || selectedProject.shortDescription}
            </p>

            {/* Quick action links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-lg transition-colors cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Code Repository</span>
                </a>
              )}
              {selectedProject.liveDemoUrl && (
                <a
                  href={selectedProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-emerald-200 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/25 rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </a>
              )}
            </div>
          </div>

          {/* High-Resolution Visual Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 bg-slate-950 aspect-[16/9] shadow-lg">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Metadata Grid (Role, Timeline, Architecture) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4 sm:p-5 rounded-xl border border-emerald-500/20 bg-[#040906]/80 text-xs font-mono backdrop-blur-md">
            <div>
              <div className="text-slate-500 uppercase">My Engineering Role</div>
              <div className="text-white font-medium mt-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedProject.role || 'Full-Stack Developer'}</span>
              </div>
            </div>

            <div>
              <div className="text-slate-500 uppercase">Core Stack</div>
              <div className="text-emerald-200 font-medium mt-1 flex items-center gap-1.5 truncate">
                <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{selectedProject.technologies.slice(0, 4).join(' · ')}</span>
              </div>
            </div>

            <div>
              <div className="text-slate-500 uppercase">Production Status</div>
              <div className="text-emerald-400 font-medium mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified &amp; Operational</span>
              </div>
            </div>
          </div>

          {/* Problem & Solution (Editorial Sections) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-[#040906]/80 space-y-2.5 backdrop-blur-md">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {selectedProject.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-emerald-500/20 bg-[#040906]/80 space-y-2.5 backdrop-blur-md">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Architectural Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {selectedProject.solution}
              </p>
            </div>
          </div>

          {/* Key Technical Features */}
          {selectedProject.features && selectedProject.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-white font-display">Key System Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.features.map((feature, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-emerald-500/15 bg-[#040906]/70 flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white font-display">Technologies &amp; Libraries</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300 p-3.5 rounded-xl border border-emerald-500/20 bg-[#040906]/80">
              {selectedProject.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="text-emerald-200 font-medium">{tech}</span>
                  {idx < selectedProject.technologies.length - 1 && (
                    <span aria-hidden="true" className="text-emerald-900">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Challenges & Learnings */}
          {(selectedProject.challenges || selectedProject.learnings) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-emerald-500/15">
              {selectedProject.challenges && (
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Technical Hurdle Overcome
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {selectedProject.challenges}
                  </p>
                </div>
              )}

              {selectedProject.learnings && (
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Engineering Takeaway</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {selectedProject.learnings}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#06100A] border-t border-emerald-500/15 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Kunal Shrivastav · Full-Stack Showcase</span>
          <button
            onClick={closeCaseStudy}
            className="px-4 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/20 text-white transition-colors cursor-pointer"
          >
            Close Viewer (ESC)
          </button>
        </div>

      </div>
    </div>
  );
};
