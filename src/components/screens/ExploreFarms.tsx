import React, { useState } from 'react';
import { Farm } from '../../types';
import { Star, Heart, Search, ChevronDown, Check } from 'lucide-react';
import { TopHeader } from '../common/TopHeader';

interface ExploreFarmsProps {
  farms: Farm[];
  onSelectFarm: (farm: Farm) => void;
  onToggleWishlist: (farmId: string) => void;
  initialSearch?: string;
}

export const ExploreFarms: React.FC<ExploreFarmsProps> = ({
  farms,
  onSelectFarm,
  onToggleWishlist,
  initialSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedActivity, setSelectedActivity] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');

  // Filter logic
  const filteredFarms = farms.filter((farm) => {
    const matchesSearch =
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.activityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      selectedLocation === 'All' || farm.province.toLowerCase() === selectedLocation.toLowerCase();

    const matchesActivity =
      selectedActivity === 'All' ||
      farm.activityType.toLowerCase().includes(selectedActivity.toLowerCase()) ||
      farm.activities.some((a) => a.toLowerCase().includes(selectedActivity.toLowerCase()));

    const matchesPrice =
      selectedPrice === 'All' ||
      (selectedPrice === 'under250' && farm.pricePerPerson <= 250) ||
      (selectedPrice === '250to300' && farm.pricePerPerson >= 250 && farm.pricePerPerson <= 300) ||
      (selectedPrice === 'above300' && farm.pricePerPerson > 300);

    return matchesSearch && matchesLocation && matchesActivity && matchesPrice;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <TopHeader title="Explore farms" role="tourist" />

      {/* Search Input bar matching Page 5 */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search farms, destinations, or activities..."
          className="w-full bg-[#ecf2ee] hover:bg-[#e4ece6] focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-11 pr-4 py-3 rounded-xl border border-transparent focus:border-emerald-600 focus:outline-hidden transition-all shadow-2xs"
        />
      </div>

      {/* Filter Dropdowns matching Page 5 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Location Dropdown */}
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 py-2 pl-4 pr-9 rounded-xl hover:border-emerald-500 focus:outline-hidden focus:border-emerald-600 transition-colors cursor-pointer shadow-2xs"
          >
            <option value="All">Location: All</option>
            <option value="Batangas">Batangas</option>
            <option value="Pampanga">Pampanga</option>
            <option value="Laguna">Laguna</option>
            <option value="Tarlac">Tarlac</option>
            <option value="Benguet">Benguet</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Activity Dropdown */}
        <div className="relative">
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 py-2 pl-4 pr-9 rounded-xl hover:border-emerald-500 focus:outline-hidden focus:border-emerald-600 transition-colors cursor-pointer shadow-2xs"
          >
            <option value="All">Activity: All</option>
            <option value="Farm tour">Farm tour</option>
            <option value="Fruit picking">Fruit picking</option>
            <option value="Animal feeding">Animal feeding</option>
            <option value="Cooking class">Cooking class</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Price Range Dropdown */}
        <div className="relative">
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="appearance-none bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 py-2 pl-4 pr-9 rounded-xl hover:border-emerald-500 focus:outline-hidden focus:border-emerald-600 transition-colors cursor-pointer shadow-2xs"
          >
            <option value="All">Price range: All</option>
            <option value="under250">Under ₱250 /person</option>
            <option value="250to300">₱250 – ₱300 /person</option>
            <option value="above300">₱300+ /person</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {(selectedLocation !== 'All' || selectedActivity !== 'All' || selectedPrice !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedLocation('All');
              setSelectedActivity('All');
              setSelectedPrice('All');
              setSearchQuery('');
            }}
            className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline px-2 py-1"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Farms Grid matching Page 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredFarms.map((farm) => {
          const isWishlisted = farm.isWishlisted ?? false;

          return (
            <div
              key={farm.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col group cursor-pointer"
              onClick={() => onSelectFarm(farm)}
            >
              {/* Card Thumbnail Box with Heart Button */}
              <div className="h-36 w-full relative overflow-hidden bg-slate-100">
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

                {/* Heart wishlist toggle matching Page 5 */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(farm.id);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-xs text-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Farm Card Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-title font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                    {farm.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {farm.locationText || farm.province} - {farm.activityType}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 flex items-center justify-between text-xs border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-slate-800">{farm.rating}</span>
                    <span className="text-slate-400 text-[11px]">({farm.reviewCount})</span>
                  </div>

                  <div className="font-bold text-emerald-800 text-xs">
                    ₱{farm.pricePerPerson} <span className="text-[10px] text-slate-500 font-normal">/person</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFarms.length === 0 && (
        <div className="bg-white rounded-xl p-10 text-center border border-slate-200">
          <p className="text-slate-600 font-medium text-sm">No farms found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedLocation('All');
              setSelectedActivity('All');
              setSelectedPrice('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs bg-emerald-800 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
