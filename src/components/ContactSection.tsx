import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext.js';
import { api } from '../services/api.js';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { portfolio } = usePortfolio();
  const profile = portfolio?.profile;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (portfolio?.theme?.sectionVisibility?.contact === false) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setStatus('submitting');
      setErrorMessage('');
      await api.sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage((err as Error).message || 'Failed to submit message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-12 md:py-14 border-b border-emerald-500/15 bg-[#040806] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Connect &amp; Recruit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display mt-2">
            Let's Discuss Full-Stack Opportunities
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Actively seeking Full-Stack MERN opportunities. Feel free to send a direct message, email, or schedule a technical chat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Contact Details & Proof Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl border border-emerald-500/20 bg-[#08170F]/75 backdrop-blur-xl space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">Direct Channels</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Based in New Delhi (IST). Available for in-office or remote engineering roles.
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <a
                  href={`mailto:${profile?.email || 'kunal336552@gmail.com'}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#040906]/70 border border-emerald-500/20 text-slate-200 hover:text-emerald-300 hover:border-emerald-400/40 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{profile?.email || 'kunal336552@gmail.com'}</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#040906]/70 border border-emerald-500/20 text-slate-300 shadow-sm">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{profile?.location || 'New Delhi, India'}</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#040906]/70 border border-emerald-500/20 text-slate-300 shadow-sm">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prompt Response Within 24 Hours</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-3 border-t border-emerald-500/15 space-y-2.5">
                <div className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider font-semibold">
                  Professional Repositories:
                </div>
                <div className="flex items-center gap-2.5">
                  {profile?.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/25 hover:text-emerald-300 hover:border-emerald-400/50 text-xs text-slate-300 transition-colors"
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
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/25 hover:text-emerald-300 hover:border-emerald-400/50 text-xs text-slate-300 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-2xl border border-emerald-500/20 bg-[#08170F]/75 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot field (hidden from genuine users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 font-mono">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#040906] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 font-mono">
                      Your Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@techstudio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#040906] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 font-mono">
                    Subject / Role Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack Developer Opening"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#040906] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 font-mono">
                    Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about the role, project, or schedule a technical discussion..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#040906] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none shadow-inner"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Your message has been sent successfully. Kunal will get back to you shortly!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'submitting' ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
