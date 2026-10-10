import React, { useState } from 'react';
import { Farm } from '../../types';
import { TopHeader } from '../common/TopHeader';
import { Star, Heart, Clock, Building2, Sparkles, MapPin } from 'lucide-react';

interface FarmDetailPageProps {
  farm: Farm;
  onBookNow: () => void;
  onToggleWishlist: (farmId: string) => void;
  onBack: () => void;
}

export const FarmDetailPage: React.FC<FarmDetailPageProps> = ({
  farm,
  onBookNow,
  onToggleWishlist,
  onBack,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const galleryItems = [
    { type: 'cherries', label: 'Fruit Orchard', icon: '🍒', bg: 'bg-[#ee7547]' },
    { type: 'strawberries', label: 'Berry Garden', icon: '🍓', bg: 'bg-[#e24e4e]' },
    { type: 'cabbage', label: 'Hydroponics', icon: '🥬', bg: 'bg-[#56ab63]' },
    { type: 'lettuce', label: 'Herb Farm', icon: '🌱', bg: 'bg-[#629784]' },
    { type: 'barn', label: 'Farmstay & Barn', icon: '🏡', bg: 'bg-[#d6a54c]' },
  ];

  const currentGalleryItem = galleryItems[selectedPhotoIndex] || galleryItems[0];
  const isWishlisted = farm.isWishlisted ?? false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <TopHeader
        title={farm.name}
        role="tourist"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Gallery matching Page 6 */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Photo / Feature Viewport matching Page 6 */}
          <div className="relative w-full h-72 sm:h-84 md:h-96 rounded-2xl overflow-hidden shadow-xs flex items-center justify-center transition-all duration-300">
            {farm.image && selectedPhotoIndex === 0 ? (
              <img
                src={farm.image}
                alt={farm.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`w-full h-full ${currentGalleryItem.bg} flex items-center justify-center`}>
                <span className="text-8xl sm:text-9xl filter drop-shadow-md transition-transform hover:scale-105 duration-200">
                  {currentGalleryItem.icon}
                </span>
              </div>
            )}

            {/* Floating Heart Button */}
            <button
              onClick={() => onToggleWishlist(farm.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-red-500 shadow-md transition-all cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-400'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip matching Page 6 */}
          <div className="grid grid-cols-5 gap-2.5">
            {galleryItems.map((item, idx) => (
              <button
                key={item.type}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`h-16 sm:h-20 rounded-xl ${item.bg} flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                  selectedPhotoIndex === idx
                    ? 'ring-3 ring-emerald-700 ring-offset-2 scale-98'
                    : 'opacity-85 hover:opacity-100 hover:scale-102'
                }`}
              >
                <span className="text-2xl sm:text-3xl drop-shadow-xs">{item.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Farm Details and Booking Action matching Page 6 */}
        <div className="lg:col-span-5 space-y-6">
          {/* Farm Location, Reviews & Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
            <span className="text-slate-500 font-medium">
              📍 {farm.locationText || `${farm.municipality}, ${farm.province}`}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {farm.rating} ({farm.reviewCount} reviews)
            </span>
            <span>•</span>
            <span className="bg-[#e4f3ea] text-[#13502b] px-2.5 py-0.5 rounded-md text-xs font-semibold">
              {farm.activityType || 'Farm tour'}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            {farm.description}
          </p>

          {/* Operating hours */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800">Operating hours</h5>
              <p className="text-xs text-slate-500 mt-0.5">{farm.operatingHours}</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800">Amenities</h5>
              <p className="text-xs text-slate-500 mt-0.5">
                {farm.amenities.join(', ')}
              </p>
            </div>
          </div>

          {/* Activities */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800">Activities</h5>
              <p className="text-xs text-slate-500 mt-0.5">
                {farm.activities.join(', ')}
              </p>
            </div>
          </div>

          {/* Book Now Button matching Page 6 */}
          <div className="pt-2">
            <button
              onClick={onBookNow}
              className="w-full bg-[#114227] hover:bg-[#0c331e] text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all shadow-sm cursor-pointer text-center block"
            >
              Book now
            </button>

            <button
              onClick={onBack}
              className="w-full mt-3 text-xs text-slate-500 hover:text-slate-800 text-center font-medium"
            >
              ← Back to Explore farms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
