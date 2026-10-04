import React from 'react';
import { Database, ShieldCheck, Laptop, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Full-Stack Architecture & Schemas',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      desc: 'Designing normalized MongoDB schemas with Mongoose validation, index optimization, and strict REST API contracts before building client interfaces.',
    },
    {
      num: '02',
      title: 'REST API & Security Pipeline',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      desc: 'Developing modular Express server routes, bcrypt password hashing, stateless JWT generation with secure HTTP cookies, and structured error middlewares.',
    },
    {
      num: '03',
      title: 'Reactive Frontend & State',
      icon: <Laptop className="w-4 h-4 text-emerald-400" />,
      desc: 'Building atomic React components with predictable state (Redux Toolkit or Context), debounced search queries, and 60fps responsive scrolling.',
    },
    {
      num: '04',
      title: 'Verification & Deployment',
      icon: <Rocket className="w-4 h-4 text-emerald-400" />,
      desc: 'Postman endpoint verification, optimistic client state updates, asset lazy loading, and deployment configuration for scalable production.',
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Development Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-2">
            How I Build Full-Stack Web Applications
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            A simple, disciplined development process from database modeling to verified deployment.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-5 sm:p-6 rounded-2xl border border-emerald-500/20 bg-[#08170F]/70 backdrop-blur-xl space-y-3.5 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.18)] transition-all relative group shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/25 group-hover:scale-105 group-hover:border-emerald-400/40 transition-transform">
                  {step.icon}
                </div>
                <span className="font-mono text-base sm:text-lg font-bold text-slate-500 font-display group-hover:text-emerald-400 transition-colors">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
