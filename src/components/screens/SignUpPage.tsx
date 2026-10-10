import React, { useState } from 'react';
import { FARMER_MANG_RIGOR_IMAGE } from '../../data/mockData';
import { AgriLogo } from '../common/AgriLogo';
import { Role } from '../../types';

interface SignUpPageProps {
  onSignUpSuccess: (role: Role, name: string, email: string) => void;
  onNavigateToLogin: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onNavigateToLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'Farmer' | 'Tourist' | 'Admin'>('Farmer');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setError('Please provide your name and email');
      return;
    }

    const mappedRole: Role =
      role === 'Farmer' ? 'farmer' : role === 'Admin' ? 'admin' : 'tourist';
    onSignUpSuccess(mappedRole, fullName, email);
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-200">
        {/* Left Side: Mang Rigor Rodriguez Photo & Quote */}
        <div className="relative min-h-[380px] md:min-h-[620px] flex flex-col justify-end p-8 text-white">
          <img
            src={FARMER_MANG_RIGOR_IMAGE}
            alt="Mang Rigor Rodriguez smiling in farm"
            className="absolute inset-0 w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          {/* Gradient scrim for quote readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-md">
            <h4 className="font-serif-title text-lg font-bold text-emerald-200 tracking-wide">
              Mang Rigor Rodriguez
            </h4>
            <p className="mt-2 text-sm text-slate-100 italic leading-relaxed font-light">
              “Sa bawat binhing aking itinatanim, kasama ang pagod, tiyaga, at pag-asang aanihin ko rin ang bunga ng aking pagsisikap.”
            </p>
          </div>
        </div>

        {/* Right Side: Account Registration Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <AgriLogo variant="dark" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#113d22]">
            Create your account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Join our community and support local farmers!
          </p>

          {error && (
            <div className="mt-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs sm:text-sm">
            <div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Farmer' | 'Tourist' | 'Admin')}
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors cursor-pointer"
              >
                <option value="Farmer">Farmer (Sell produce & host tours)</option>
                <option value="Tourist">Tourist / Visitor (Explore & buy)</option>
                <option value="Admin">Platform Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#144d28] hover:bg-[#0c381c] text-white py-3 rounded-lg font-semibold tracking-wide transition-all shadow-xs"
            >
              Sign up
            </button>

            <div className="pt-2 text-center text-xs text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-[#144d28] font-bold hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
