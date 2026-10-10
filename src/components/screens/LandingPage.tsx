import React, { useState } from 'react';
import { AgriLogo } from '../common/AgriLogo';
import { HERO_IMAGE } from '../../data/mockData';
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Trees } from 'lucide-react';

interface LandingPageProps {
  onNavigateToFarms: (searchQuery?: string) => void;
  onNavigateToMarketplace: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignUp: () => void;
  onNavigateToAbout: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToFarms,
  onNavigateToMarketplace,
  onNavigateToLogin,
  onNavigateToSignUp,
  onNavigateToAbout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToFarms(searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] flex flex-col">
      {/* Top Navigation Bar matching Page 1 */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-20">
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <AgriLogo variant="dark" />
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-emerald-800 font-semibold hover:text-emerald-900 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => onNavigateToFarms()}
            className="hover:text-emerald-800 transition-colors"
          >
            Farms
          </button>
          <button
            onClick={onNavigateToMarketplace}
            className="hover:text-emerald-800 transition-colors"
          >
            Marketplace
          </button>
          <button
            onClick={onNavigateToAbout}
            className="hover:text-emerald-800 transition-colors"
          >
            About
          </button>
          <button
            onClick={onNavigateToLogin}
            className="hover:text-emerald-800 font-medium transition-colors ml-2"
          >
            Login
          </button>
          <button
            onClick={onNavigateToSignUp}
            className="bg-[#124d29] hover:bg-[#0c381d] text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-xs"
          >
            Sign up
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onNavigateToLogin}
            className="text-xs font-semibold px-3 py-1.5 text-slate-700"
          >
            Login
          </button>
          <button
            onClick={onNavigateToSignUp}
            className="bg-[#124d29] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Hero Section matching Page 1 */}
      <div className="relative w-full overflow-hidden flex-1 min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background Image with realistic soft agricultural backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Scenic Philippine tea plantation and terraces"
            className="w-full h-full object-cover filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle natural scrim gradient for crisp legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-emerald-950/15 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif-title font-extrabold text-[#113a21] leading-[1.15] tracking-tight drop-shadow-2xs">
              Explore local farms, <br />
              support local farmers, <br />
              <span className="text-[#195630]">experience true nature.</span>
            </h1>

            <p className="mt-6 text-sm sm:text-base text-slate-700 font-medium max-w-xl leading-relaxed drop-shadow-2xs">
              Book farm tours, discover agricultural destinations, shop fresh local products, and be part of a sustainable future.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-lg">
              <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-slate-200/80 flex items-center gap-2">
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search farms, destinations, products..."
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-2.5 bg-transparent border-none focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-[#124d29] hover:bg-[#0c381d] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Suggestions */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-700 font-medium">
              <span className="text-slate-500">Popular:</span>
              <button
                type="button"
                onClick={() => onNavigateToFarms('Batangas')}
                className="bg-white/80 hover:bg-white text-emerald-900 px-2.5 py-1 rounded-md shadow-2xs transition-colors"
              >
                Batangas Sunflowers
              </button>
              <button
                type="button"
                onClick={() => onNavigateToFarms('Benguet')}
                className="bg-white/80 hover:bg-white text-emerald-900 px-2.5 py-1 rounded-md shadow-2xs transition-colors"
              >
                Banaue Rice Terraces
              </button>
              <button
                type="button"
                onClick={() => onNavigateToFarms('Fruit picking')}
                className="bg-white/80 hover:bg-white text-emerald-900 px-2.5 py-1 rounded-md shadow-2xs transition-colors"
              >
                Fruit picking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Value Pillars */}
      <section className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#f5f8f5] border border-emerald-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Trees className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-lg text-[#124126]">
                  Ecological Farm Visits
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Immerse yourself in authentic farm living, fruit picking, flower fields, and organic farming workshops.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#f5f8f5] border border-emerald-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-lg text-[#124126]">
                  Support Local Farmers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  100% direct community empowerment. Every booking and market purchase supports Filipino agricultural families.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#f5f8f5] border border-emerald-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-lg text-[#124126]">
                  Farm-to-Door Freshness
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Order raw honey, heritage mangoes, fresh eggs, and artisanal delicacies harvested straight from local producers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
