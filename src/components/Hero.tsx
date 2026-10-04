import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { ArrowUpRight, Github, Linkedin, Mail, FileText, CheckCircle2, Layers, Database, Server, Sparkles, Building2, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  const { portfolio } = usePortfolio();
  const profile = portfolio?.profile;

  const headline = profile?.headline || 'Building scalable full-stack applications with React, Node.js, Express, and MongoDB.';
  const subheadline = profile?.subheadline || 'Specialized in full-stack architecture, high-performance REST APIs, and responsive frontends. Experienced in delivering production streaming and MERN platforms at Humanoid Maker in New Delhi, India.';

  return (
    <section id="top" className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 overflow-hidden border-b border-emerald-500/15 bg-[#040806]">
      {/* Background ambient glassy green aura & grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[350px] bg-emerald-500/[0.08] blur-[100px] sm:blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Focused Full-Stack Editorial */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Status kicker: Clean unboxed metadata with glowing emerald dot */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] animate-pulse shrink-0" />
              <span className="text-emerald-400 font-medium">{profile?.availabilityStatus || 'Available for Full-Stack Roles'}</span>
              <span aria-hidden="true" className="text-emerald-900 hidden sm:inline">/</span>
              <span className="hidden sm:inline">New Delhi, India</span>
              <span aria-hidden="true" className="text-emerald-900 hidden sm:inline">/</span>
              <span className="hidden sm:inline">BCA · IGNOU</span>
            </div>

            {/* Author Title & Headline */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-400 uppercase font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{profile?.title || 'Full-Stack MERN Developer'}</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold tracking-tight text-white font-display text-balance leading-[1.2]">
                {headline}
              </h1>
            </div>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {subheadline}
            </p>

            {/* Clean, Attractive Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#resume"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.3)] w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>View Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl backdrop-blur-md transition-all cursor-pointer w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Simple Full-Stack Highlights Grid */}
            <div className="pt-4 sm:pt-6 border-t border-emerald-500/15 grid grid-cols-3 gap-3 sm:gap-6 text-left">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-white font-display tabular-nums flex items-baseline gap-1">
                  <span>MERN</span>
                  <span className="text-[10px] sm:text-xs font-normal text-emerald-400 font-mono">Stack</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">React · Node · Mongo</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-white font-display tabular-nums flex items-baseline gap-1">
                  <span>3 Mos</span>
                  <span className="text-[10px] sm:text-xs font-normal text-emerald-400 font-mono">Industry</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">Humanoid Maker OTT</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-white font-display tabular-nums flex items-baseline gap-1">
                  <span>REST</span>
                  <span className="text-[10px] sm:text-xs font-normal text-emerald-400 font-mono">APIs</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">JWT &amp; Secure Auth</div>
              </div>
            </div>

            {/* Simple Direct Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-slate-400 text-xs font-mono">
              <span className="uppercase text-emerald-400/70 font-semibold">Connect:</span>
              {profile?.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              <a
                href={`mailto:${profile?.email || 'kunal336552@gmail.com'}`}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 truncate"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{profile?.email || 'kunal336552@gmail.com'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Sleek Showcase Card (NO RAW CODE SNIPPET) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-emerald-500/25 bg-[#08150E]/80 backdrop-blur-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-emerald-400/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.2)] transition-all group">
              
              {/* Workspace Visual Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src="/src/assets/images/hero_developer_workspace_1790581907335.jpg"
                  alt="Kunal Shrivastav Full-Stack Developer Workspace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08150E] via-transparent to-black/40" />
                
                {/* Floating identity badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono px-3 py-1.5 bg-[#040A07]/85 backdrop-blur-md rounded-lg border border-emerald-500/20 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-white font-medium">Ex-Humanoid Maker</span>
                  </div>
                  <span className="text-emerald-400/90 font-semibold">Full-Stack MERN</span>
                </div>
              </div>

              {/* Attractive Highlights (Replaced the code snippet) */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-500/15 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Full-Stack Core Strengths</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Production Ready</span>
                </div>

                {/* 3 Clean Competency Cards */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#040906]/80 border border-emerald-500/20 flex items-start gap-3 hover:border-emerald-400/40 transition-colors">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Modern Frontend &amp; UI Architecture</div>
                      <div className="text-slate-300 mt-0.5 leading-relaxed">
                        React 19, Tailwind CSS, debounced catalog search, responsive mobile-first layouts with zero layout shifts.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#040906]/80 border border-emerald-500/20 flex items-start gap-3 hover:border-emerald-400/40 transition-colors">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Node.js &amp; Express REST APIs</div>
                      <div className="text-slate-300 mt-0.5 leading-relaxed">
                        Secure JWT token authentication, HTTP-only cookie management, and structured middleware routing.
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#040906]/80 border border-emerald-500/20 flex items-start gap-3 hover:border-emerald-400/40 transition-colors">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-300 shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">MongoDB &amp; Document Schemas</div>
                      <div className="text-slate-300 mt-0.5 leading-relaxed">
                        Indexed collections, Mongoose ODM schemas, and fast aggregation pipelines for media platforms.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer link to jump to resume */}
                <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>New Delhi, India</span>
                  </span>
                  <a
                    href="#resume"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 flex items-center gap-1"
                  >
                    <span>View Resume</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
