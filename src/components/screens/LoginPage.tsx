import React, { useState } from 'react';
import { HERO_IMAGE } from '../../data/mockData';
import { AgriLogo } from '../common/AgriLogo';
import { Role } from '../../types';

interface LoginPageProps {
  onLoginSuccess: (role: Role, email: string) => void;
  onNavigateToSignUp: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignUp,
  onBackToHome,
}) => {
  const [identifier, setIdentifier] = useState('maria.santos@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.toLowerCase().includes('farmer') || identifier.toLowerCase().includes('juan')) {
      onLoginSuccess('farmer', identifier);
    } else if (identifier.toLowerCase().includes('admin')) {
      onLoginSuccess('admin', identifier);
    } else {
      onLoginSuccess('tourist', identifier);
    }
  };

  const handleQuickLogin = (role: Role) => {
    if (role === 'farmer') {
      onLoginSuccess('farmer', 'juan.delacruz@farmer.ph');
    } else if (role === 'admin') {
      onLoginSuccess('admin', 'admin@agritourism.gov.ph');
    } else {
      onLoginSuccess('tourist', 'maria.santos@example.com');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Farm Background Image with blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Philippine farm scenery"
          className="w-full h-full object-cover filter blur-xs brightness-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-emerald-950/40" />
      </div>

      {/* Login Card matching Page 3 */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <AgriLogo variant="dark" />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif-title font-bold text-[#143d24]">
            Welcome back!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Log in to continue your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or username"
              className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-all"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-sm border-slate-300 text-emerald-700 focus:ring-emerald-500 cursor-pointer accent-[#154e2d]"
              />
              <span className="font-medium">Remember me</span>
            </label>

            <button
              type="button"
              className="text-slate-500 hover:text-emerald-800 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#154e2d] hover:bg-[#0d341e] text-white py-3 rounded-lg font-semibold tracking-wide transition-all shadow-xs cursor-pointer mt-2"
          >
            Login
          </button>

          {/* Social Logins matching Page 3 */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('tourist')}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-xs font-medium text-slate-700 flex items-center justify-center gap-3 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('tourist')}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-xs font-medium text-slate-700 flex items-center justify-center gap-3 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="text-[#144d28] font-bold hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Demo Fast Account Selectors */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
            Demo Quick Sign In
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('tourist')}
              className="px-2 py-1.5 bg-[#eaf2ec] hover:bg-[#d8e6db] text-[#124225] rounded-md text-[11px] font-semibold transition-colors"
            >
              Tourist (Maria)
            </button>
            <button
              onClick={() => handleQuickLogin('farmer')}
              className="px-2 py-1.5 bg-[#fbf0e8] hover:bg-[#f6dfd0] text-[#8e451b] rounded-md text-[11px] font-semibold transition-colors"
            >
              Farmer (Juan)
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="px-2 py-1.5 bg-[#feecec] hover:bg-[#fbd3d3] text-[#9a2a2a] rounded-md text-[11px] font-semibold transition-colors"
            >
              Admin View
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onBackToHome}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Return to public home
          </button>
        </div>
      </div>
    </div>
  );
};
