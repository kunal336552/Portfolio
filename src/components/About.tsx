import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { GraduationCap, MapPin, Briefcase, Award, CheckCircle, Zap, Shield, Sparkles, Layers, Database } from 'lucide-react';

export const About: React.FC = () => {
  const { portfolio } = usePortfolio();
  const profile = portfolio?.profile;

  if (portfolio?.theme?.sectionVisibility?.about === false) return null;

  return (
    <section id="about" className="py-10 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Full-Stack Development &amp; Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-2">
            Architecting robust full-stack systems from database schemas to responsive interfaces.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Avatar and Quick Facts */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/25 bg-[#08170F]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] group hover:border-emerald-400/50 transition-colors">
              <div className="aspect-square w-full relative overflow-hidden bg-slate-900">
                <img
                  src={profile?.avatarUrl || '/src/assets/images/avatar_kunal_editorial_1790581967170.jpg'}
                  alt="Kunal Shrivastav"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08170F] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">{profile?.name || 'Kunal Shrivastav'}</h3>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5">{profile?.title || 'Full-Stack MERN Developer'}</div>
                </div>

                <div className="pt-3 border-t border-emerald-500/15 space-y-2 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{profile?.location || 'New Delhi, India'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>BCA · IGNOU (In Progress)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ex-MERN Dev · Humanoid Maker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Stack Quality Checklist */}
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-[#08170F]/70 backdrop-blur-xl space-y-3 text-xs text-slate-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="font-semibold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Full-Stack Engineering Standards</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>End-to-end architecture: from normalized schemas to reactive UI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Secure JWT token auth with HTTP-only cookies and sanitization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Optimized RESTful APIs with pagination and sub-50ms query times</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
              <p>
                {profile?.bio || `I am a Full-Stack MERN Developer based in New Delhi with a strong focus on building scalable web applications from database architecture to responsive user interfaces. With hands-on industry experience at Humanoid Maker engineering video streaming and full-stack platforms, I specialize in combining robust Node.js/Express backends and MongoDB databases with modern, reactive React frontends.`}
              </p>
              
              <p>
                During my tenure at <span className="text-white font-semibold">Humanoid Maker</span>, I contributed to a high-concurrency OTT video streaming web platform. I engineered responsive frontend interfaces in React, consumed backend REST APIs for live catalog search and dynamic shelves, and implemented secure user authentication flows.
              </p>

              <p>
                I approach software development as a unified full-stack discipline: drafting scalable MongoDB schemas with Mongoose ODM, constructing structured Express routing with JWT authentication, and crafting fast, accessible frontends styled with Tailwind CSS and powered by modern React state patterns.
              </p>
            </div>

            {/* Full-Stack Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-[#08170F]/60 backdrop-blur-xl space-y-2">
                <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white font-display">MERN Architecture</div>
                <p className="text-xs text-slate-400 leading-normal">
                  Unified full-stack flow with React 19, Redux Toolkit, Node.js, and MongoDB.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/20 bg-[#08170F]/60 backdrop-blur-xl space-y-2">
                <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white font-display">Secure REST APIs</div>
                <p className="text-xs text-slate-400 leading-normal">
                  Stateless JWT authorization, HTTP-only cookie sessions, and input sanitization.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/20 bg-[#08170F]/60 backdrop-blur-xl space-y-2">
                <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white font-display">Database &amp; CDN</div>
                <p className="text-xs text-slate-400 leading-normal">
                  Indexed MongoDB document stores, aggregation pipelines, and Cloudinary media.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
