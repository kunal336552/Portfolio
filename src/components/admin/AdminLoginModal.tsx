import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext.js';
import { api } from '../../services/api.js';
import { Lock, X, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginOpen, closeAdminLogin, loginAdmin } = usePortfolio();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Clear all credentials every time the modal opens or upon logout
  useEffect(() => {
    if (isAdminLoginOpen) {
      setEmail('');
      setPassword('');
      setError('');
      setShowPassword(false);
    }
  }, [isAdminLoginOpen]);

  if (!isAdminLoginOpen) return null;

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    closeAdminLogin();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await api.login(email, password);
      if (res.token && res.user) {
        setEmail('');
        setPassword('');
        loginAdmin(res.token, res.user);
      }
    } catch (err) {
      setError((err as Error).message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-[#08170F]/95 border border-emerald-500/25 rounded-2xl shadow-2xl p-6 sm:p-7 z-10 space-y-5 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">Portfolio CMS Portal</h3>
              <p className="text-xs text-slate-400">Secure administrator authentication</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login Form with anti-autofill provisions */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Hidden inputs to prevent aggressive browser auto-fill */}
          <input type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" readOnly />
          <input type="password" style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" readOnly />

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
              Admin Email
            </label>
            <input
              type="email"
              required
              autoComplete="new-password"
              name="kunal_admin_id_input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#040906] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                name="kunal_admin_secret_key"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 bg-[#040906] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to CMS Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
