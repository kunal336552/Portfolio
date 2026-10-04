import React from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { Layers, Server, Layout, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { portfolio } = usePortfolio();

  if (portfolio?.theme?.sectionVisibility?.services === false) return null;

  const services = portfolio?.services || [];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-emerald-400" />;
      default: return <Layers className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-10 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Full-Stack Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-2">
            What I Build &amp; Deliver
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            End-to-end full-stack web applications, secure REST APIs, and responsive React user interfaces.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-2xl border border-emerald-500/20 bg-[#08170F]/70 backdrop-blur-xl hover:border-emerald-400/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.18)] transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/25 group-hover:scale-110 group-hover:border-emerald-400/40 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                    0{index + 1}.
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Deliverables List */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-3 border-t border-emerald-500/15 space-y-2">
                    <div className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-wider font-semibold">
                      Key Deliverables:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-emerald-500/15">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group-hover:underline underline-offset-4"
                >
                  <span>Inquire for Project or Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
