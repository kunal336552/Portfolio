import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { Project } from '../types/portfolio.js';
import { Github, ExternalLink, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { portfolio, openCaseStudy } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  if (portfolio?.theme?.sectionVisibility?.projects === false) return null;

  const rawProjects = portfolio?.projects || [];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ott', label: 'OTT & Streaming' },
    { id: 'fullstack', label: 'Full-Stack MERN' },
  ];

  // Easy names map
  const getEasyTitle = (title: string, category: string) => {
    if (title.toLowerCase().includes('streampulse') || category === 'ott') return 'StreamPulse (OTT Streaming)';
    if (title.toLowerCase().includes('inkflow')) return 'InkFlow (Blog & CMS)';
    if (title.toLowerCase().includes('devsphere')) return 'DevSphere (Developer Community)';
    return title.split('|')[0].trim();
  };

  const filteredProjects = useMemo(() => {
    return rawProjects.filter((proj) => {
      if (!proj.published) return false;
      if (activeFilter === 'all') return true;
      return proj.category === activeFilter;
    });
  }, [rawProjects, activeFilter]);

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Easy Name */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-xl">
            <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Full-Stack Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-1.5">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              Curated full-stack applications and streaming media platforms built with React, Node.js, Express, and MongoDB.
            </p>
          </div>

          {/* Interactive Glass Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#08170F]/70 backdrop-blur-xl rounded-xl border border-emerald-500/20 w-fit shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Small, Compact, Sleek Projects Grid (No oversized bulky cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {filteredProjects.map((project) => {
            const easyTitle = getEasyTitle(project.title, project.category);
            const isOtt = project.category === 'ott';

            return (
              <div
                key={project.id}
                className="flex flex-col rounded-xl border border-emerald-500/20 bg-[#08170F]/75 backdrop-blur-xl hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.18)] transition-all duration-300 overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                {/* Media Container - Compact Aspect Ratio */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={easyTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08170F] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-[#040A07]/85 backdrop-blur-md rounded text-[11px] font-mono text-emerald-300 border border-emerald-500/25 flex items-center gap-1">
                      {isOtt && <Sparkles className="w-3 h-3 text-emerald-400 fill-current" />}
                      <span>{isOtt ? 'OTT Streaming' : 'Full-Stack MERN'}</span>
                    </span>
                  </div>

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-[#040A07]/80 backdrop-blur-md border border-emerald-500/25 text-slate-300 hover:text-white transition-colors"
                      title="Open Live App"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Content Box - Clean, Compact & Sleek */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3.5">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                      {easyTitle}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Key Engineering Win */}
                    {project.features && project.features.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 pt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{project.features[0]}</span>
                      </div>
                    )}

                    {/* Compact Tech Stack */}
                    <div className="pt-2 border-t border-emerald-500/15 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="text-emerald-300/90 font-medium">{tech}</span>
                          {idx < Math.min(project.technologies.length, 4) - 1 && (
                            <span aria-hidden="true" className="text-emerald-800">·</span>
                          )}
                        </React.Fragment>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-emerald-400">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="pt-2.5 border-t border-emerald-500/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openCaseStudy(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group-hover:underline underline-offset-4"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/70 text-slate-300 hover:text-white transition-colors cursor-pointer border border-emerald-500/20"
                          title="View GitHub Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/70 text-slate-300 hover:text-white transition-colors cursor-pointer border border-emerald-500/20"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
