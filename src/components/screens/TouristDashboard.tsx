import React from 'react';
import { TopHeader } from '../common/TopHeader';
import { Farm } from '../../types';
import { Star, ArrowRight } from 'lucide-react';

interface TouristDashboardProps {
  farms: Farm[];
  onExploreFarms: () => void;
  onSelectFarm: (farm: Farm) => void;
  onNavigateToBookings: () => void;
  onNavigateToReviews: () => void;
  onNavigateToSavedFarms: () => void;
}

export const TouristDashboard: React.FC<TouristDashboardProps> = ({
  farms,
  onExploreFarms,
  onSelectFarm,
  onNavigateToBookings,
  onNavigateToReviews,
  onNavigateToSavedFarms,
}) => {
  const popularFarms = farms.filter((f) =>
    ['sunflower-farm', 'laurel-view-farm', 'banaue-rice-terraces'].includes(f.id)
  );

  return (
    <div className="space-y-6">
      {/* Top Header matching Page 4 */}
      <TopHeader
        title="Hello, Maria!"
        subtitle="Where do you want to go today?"
        role="tourist"
        searchPlaceholder="Search farms, destinations, products..."
        searchValue=""
        onSearchChange={() => {}}
      />

      {/* 3 Metric Cards matching Page 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Bookings Card */}
        <div
          onClick={onNavigateToBookings}
          className="bg-[#dbeeef] hover:bg-[#d0e9eb] p-5 rounded-2xl cursor-pointer transition-all border border-sky-100/50 shadow-2xs group"
        >
          <div className="text-3xl font-bold font-serif-title text-[#143d26]">2</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Bookings</span>
            <span className="text-[11px] text-emerald-800 font-semibold group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </div>
        </div>

        {/* Reviews Card */}
        <div
          onClick={onNavigateToReviews}
          className="bg-[#f0f4f1] hover:bg-[#e4ece6] p-5 rounded-2xl cursor-pointer transition-all border border-slate-200/50 shadow-2xs group"
        >
          <div className="text-3xl font-bold font-serif-title text-[#143d26]">1</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Reviews</span>
            <span className="text-[11px] text-emerald-800 font-semibold group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </div>
        </div>

        {/* Wishlisted Farms Card */}
        <div
          onClick={onNavigateToSavedFarms}
          className="bg-[#fdf2df] hover:bg-[#faeacf] p-5 rounded-2xl cursor-pointer transition-all border border-amber-100/50 shadow-2xs group"
        >
          <div className="text-3xl font-bold font-serif-title text-[#143d26]">5</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1 flex items-center justify-between">
            <span>Wishlisted farms</span>
            <span className="text-[11px] text-amber-900 font-semibold group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </div>
        </div>
      </div>

      {/* Big Feature Banner: Experience farm life matching Page 4 */}
      <div className="bg-[#114227] text-white rounded-2xl p-7 sm:p-9 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-white tracking-tight">
            Experience farm life
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
            Join farm tours, try fresh produce, meet local farmers, and create unforgettable memories.
          </p>
          <div className="mt-6">
            <button
              onClick={onExploreFarms}
              className="bg-white hover:bg-slate-100 text-[#114227] px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative subtle pattern */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none text-9xl -mb-4 -mr-4 select-none font-serif">
          🌿
        </div>
      </div>

      {/* Popular destinations Section matching Page 4 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-serif-title font-bold text-[#143d26]">
            Popular destinations
          </h3>
          <button
            onClick={onExploreFarms}
            className="text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularFarms.map((farm) => (
            <div
              key={farm.id}
              onClick={() => onSelectFarm(farm)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col"
            >
              {/* Image box */}
              <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
                {farm.image ? (
                  <img
                    src={farm.image}
                    alt={farm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-full h-full ${farm.accentBg} flex items-center justify-center`}>
                    <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                      {farm.iconEmoji}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-title font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {farm.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{farm.province}</p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-xs text-slate-600 border-t border-slate-100">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-800">{farm.rating}</span>
                  <span className="text-slate-400">({farm.reviewCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
