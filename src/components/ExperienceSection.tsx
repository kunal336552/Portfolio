import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { Briefcase, Calendar, MapPin, GraduationCap, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { portfolio } = usePortfolio();

  if (portfolio?.theme?.sectionVisibility?.experience === false) return null;

  const experiences = portfolio?.experience || [];
  const educations = portfolio?.education || [];

  return (
    <section id="experience" className="py-10 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Track Record &amp; Education</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-2">
            Professional Experience &amp; Background
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Verified production engineering contributions on high-concurrency streaming web applications alongside formal academic computer science education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Work Experience Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-500/15">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-display">Production Industry Experience</h3>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-emerald-500/20">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-9 group">
                  {/* Glowing Emerald Timeline dot */}
                  <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-4 border-[#040806] shadow-[0_0_12px_rgba(52,211,153,0.9)] group-hover:scale-125 transition-transform" />

                  <div className="p-5 sm:p-6 rounded-2xl border border-emerald-500/20 bg-[#08170F]/75 backdrop-blur-xl group-hover:border-emerald-400/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.18)] transition-all space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold mb-1 backdrop-blur-md">
                          <Building2 className="w-3 h-3" />
                          <span>OTT Media Industry</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                          {exp.role}
                        </h4>
                        <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                          {exp.company}
                        </div>
                      </div>

                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{exp.startDate} — {exp.endDate}</span>
                        </span>
                        <span aria-hidden="true" className="text-emerald-900">/</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {exp.description}
                    </p>

                    {/* Key contributions */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-emerald-500/15">
                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                          Engineering Achievements &amp; Responsibilities:
                        </div>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Tagged */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="pt-2.5 border-t border-emerald-500/15 flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
                        <span className="text-emerald-400/80 font-semibold">Stack:</span>
                        {exp.technologies.map((tech, idx) => (
                          <React.Fragment key={tech}>
                            <span className="text-slate-200">{tech}</span>
                            {idx < exp.technologies.length - 1 && <span className="text-emerald-900">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Rigor Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-500/15">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-display">Academic Education</h3>
            </div>

            <div className="space-y-5">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 sm:p-6 rounded-2xl border border-emerald-500/20 bg-[#08170F]/70 backdrop-blur-xl hover:border-emerald-400/40 transition-all space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white font-display">{edu.degree}</h4>
                      <div className="text-xs sm:text-sm text-emerald-300 font-mono mt-0.5">{edu.institution}</div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {edu.description}
                  </p>

                  <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Field: {edu.field}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-medium">Status: {edu.grade}</span>
                  </div>
                </div>
              ))}

              {/* Recruiter Evaluation Summary Box with Glassmorphism */}
              <div className="p-5 rounded-2xl border border-emerald-500/25 bg-[#08170F]/80 backdrop-blur-xl space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className="text-xs font-mono text-emerald-400 uppercase font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why Recruiters Choose Kunal</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-world production video catalog experience, not just tutorial apps</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Deep grasp of client performance, debouncing, and DOM virtualization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Full-stack fluency across REST APIs, MongoDB indexing, and JWT auth</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
