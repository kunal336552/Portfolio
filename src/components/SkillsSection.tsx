import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { Search, Layers, Server, Database, Wrench, Sparkles, Code2, CheckCircle2, Shield, Zap } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (portfolio?.theme?.sectionVisibility?.skills === false) return null;

  const allSkills = portfolio?.skills || [];

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'frontend', label: 'Frontend Architecture' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Databases & Storage' },
    { id: 'tools', label: 'Engineering Tools & QA' },
  ];

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      if (skill.category === 'learning') return false;
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, selectedCategory, searchQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'backend': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'tools': return <Wrench className="w-4 h-4 text-emerald-400" />;
      default: return <Code2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend / API';
      case 'database': return 'Database';
      case 'tools': return 'Dev Tool & QA';
      default: return 'Core';
    }
  };

  return (
    <section id="skills" className="py-10 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-2">
              Core Engineering Stack &amp; Tools
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Proven, industry-standard technologies utilized across production OTT video platforms, full-stack MERN systems, and modern responsive frontends.
            </p>
          </div>

          {/* Quick Glass Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-emerald-400/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack (e.g. React, JWT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#08170F]/70 backdrop-blur-xl border border-emerald-500/20 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Interactive Glass Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#08170F]/70 backdrop-blur-xl rounded-xl border border-emerald-500/20 mb-8 w-fit shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Bento Grid with Frosted Glass Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-3.5 rounded-xl border border-emerald-500/20 bg-[#08170F]/60 backdrop-blur-xl hover:border-emerald-400/50 hover:bg-[#0C2216]/70 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/25 group-hover:scale-105 group-hover:border-emerald-400/50 transition-transform shadow-sm">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                      <span className="text-emerald-400/70">{getCategoryLabel(skill.category)}</span>
                      {skill.level && (
                        <>
                          <span aria-hidden="true" className="text-emerald-900">·</span>
                          <span className="text-slate-300 font-medium">{skill.level}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 border border-dashed border-emerald-500/25 rounded-2xl p-8 text-slate-400 text-xs bg-[#08170F]/40 backdrop-blur-md">
            No technologies found matching "{searchQuery}". Try selecting another category or clearing your search.
          </div>
        )}

      </div>
    </section>
  );
};
