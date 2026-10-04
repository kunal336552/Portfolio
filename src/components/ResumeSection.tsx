import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { FileText, Download, Printer, ExternalLink, Briefcase, GraduationCap, Code2, CheckCircle2, MapPin, Mail, Award, Sparkles, Building2 } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const profile = portfolio?.profile;
  const experience = portfolio?.experience || [];
  const education = portfolio?.education || [];
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education'>('experience');

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-10 sm:py-14 md:py-16 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-1.5">
              Professional Resume &amp; CV
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              Complete career track record, production media experience, and verified technical competencies.
            </p>
          </div>

          {/* Quick Print / Download Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 hover:text-white transition-colors cursor-pointer shadow-sm"
              title="Print / Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request Full PDF</span>
            </a>
          </div>
        </div>

        {/* Attractive Glass Resume Document Container */}
        <div className="rounded-2xl border border-emerald-500/25 bg-[#08170F]/80 backdrop-blur-2xl p-5 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* Resume Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/20">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {profile?.name || 'Kunal Shrivastav'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  Full-Stack MERN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                Full-Stack Developer · New Delhi, India
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200">{profile?.email || 'kunal336552@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile?.location || 'New Delhi, India'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Resume Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-emerald-500/15 pb-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'experience'
                  ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'skills'
                  ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'education'
                  ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </button>
          </div>

          {/* Tab 1: Work Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fade-in">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 sm:p-5 rounded-xl bg-[#040906]/80 border border-emerald-500/20 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-medium mb-1">
                        <Building2 className="w-3 h-3" />
                        <span>Production Media Company</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-display">
                        {exp.role} · <span className="text-emerald-400">{exp.company}</span>
                      </h4>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.startDate} — {exp.endDate} · {exp.location}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bulleted Achievements */}
                  {exp.responsibilities && (
                    <div className="space-y-1.5 pt-2 border-t border-emerald-500/15">
                      <div className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">Key Achievements:</div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {exp.responsibilities.map((r, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
                    <span className="text-emerald-400/80 font-medium">Stack:</span>
                    {exp.technologies.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span className="text-slate-200">{t}</span>
                        {idx < exp.technologies.length - 1 && <span className="text-emerald-900">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Technical Skills Matrix */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in text-xs">
              <div className="p-4 rounded-xl bg-[#040906]/80 border border-emerald-500/20 space-y-2">
                <div className="font-semibold text-emerald-400 font-mono uppercase text-[11px]">
                  Frontend Architecture
                </div>
                <div className="text-slate-200 leading-relaxed">
                  React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design, State Management (Context &amp; Redux), Component Virtualization.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040906]/80 border border-emerald-500/20 space-y-2">
                <div className="font-semibold text-emerald-400 font-mono uppercase text-[11px]">
                  Backend &amp; API Development
                </div>
                <div className="text-slate-200 leading-relaxed">
                  Node.js, Express.js, RESTful API Design, JWT Authentication, Cookies &amp; Sessions, Bcrypt Hashing, Error Handling Middlewares, CORS.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040906]/80 border border-emerald-500/20 space-y-2">
                <div className="font-semibold text-emerald-300 font-mono uppercase text-[11px]">
                  Database &amp; Storage
                </div>
                <div className="text-slate-200 leading-relaxed">
                  MongoDB, Mongoose ODM, Document Schemas, Aggregation Pipelines, Query Optimization, Compound Indexing, Cloudinary Media Storage.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040906]/80 border border-emerald-500/20 space-y-2">
                <div className="font-semibold text-emerald-400 font-mono uppercase text-[11px]">
                  Dev Tools &amp; Methodologies
                </div>
                <div className="text-slate-200 leading-relaxed">
                  Git, GitHub Version Control, Postman API Testing, Vite Build Tool, NPM, Agile/Scrum Workflow, Zero-CLS Performance Optimization.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4 animate-fade-in">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 sm:p-5 rounded-xl bg-[#040906]/80 border border-emerald-500/20 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-white font-display">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono text-slate-400">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400">{edu.institution}</div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {edu.description}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    Focus: Data Structures, Algorithms, Web Technologies, Database Systems.
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Direct CTA */}
          <div className="pt-4 border-t border-emerald-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Ready to discuss an engineering role? Contact Kunal directly.
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 cursor-pointer"
            >
              <span>Send Interview Invitation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
