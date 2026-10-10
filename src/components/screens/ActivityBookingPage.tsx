import React, { useState } from 'react';
import { TopHeader } from '../common/TopHeader';
import { Check, Clock, Calendar, Users } from 'lucide-react';
import { Booking } from '../../types';

interface ActivityBookingPageProps {
  onProceedToCheckout: (newBooking: Partial<Booking>) => void;
  onBack: () => void;
}

export const ActivityBookingPage: React.FC<ActivityBookingPageProps> = ({
  onProceedToCheckout,
  onBack,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-20');
  const [participants, setParticipants] = useState(2);
  const pricePerPerson = 200;
  const total = participants * pricePerPerson;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    onProceedToCheckout({
      farmId: 'sunnyvale-farm',
      farmName: 'Sunnyvale Farm',
      activity: 'Fruit picking experience',
      date: formattedDate || 'Oct 20, 2026',
      guests: participants,
      priceTotal: total,
      status: 'Confirmed',
      customerName: 'Maria Santos',
      customerEmail: 'maria.santos@example.com',
      imageEmoji: '🍊',
    });
  };

  return (
    <div className="space-y-6">
      <TopHeader title="Fruit picking experience" role="tourist" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Visual Illustration matching Page 7 */}
        <div className="lg:col-span-6">
          <div className="w-full h-72 sm:h-80 md:h-96 rounded-2xl bg-[#ea7542] flex items-center justify-center shadow-xs">
            <div className="relative group">
              <span className="text-8xl sm:text-9xl filter drop-shadow-lg transition-transform group-hover:scale-105 duration-200">
                🍊
              </span>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/20 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-xs whitespace-nowrap">
                Sunnyvale Farm Orchards
              </div>
            </div>
          </div>
        </div>

        {/* Right Form & Experience Inclusions matching Page 7 */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
          {/* Key Checklist Features */}
          <div className="space-y-3.5 pb-6 border-b border-slate-100 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="font-medium">Includes farm guide</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">1 hour 30 minutes</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <span className="text-xs">🍊</span>
              </div>
              <span className="font-medium">Seasonal fruits</span>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="pt-6 space-y-5 text-xs sm:text-sm">
            {/* Select Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Select date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#f1f5f2] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Number of participants */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Number of participants
              </label>
              <select
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                className="w-full bg-[#f1f5f2] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-colors cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'participant' : 'participants'}
                  </option>
                ))}
              </select>
            </div>

            {/* Total matching Page 7 */}
            <div className="pt-2 flex items-baseline justify-between">
              <div className="text-xs sm:text-sm text-slate-700 font-medium">
                Total <span className="text-slate-400 text-xs font-normal">(₱200 /person)</span>
              </div>
              <div className="text-2xl font-serif-title font-bold text-slate-900">
                ₱{total}
              </div>
            </div>

            {/* Proceed to checkout button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#124d29] hover:bg-[#0c381d] text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all shadow-sm cursor-pointer"
              >
                Proceed to checkout
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full mt-3 text-xs text-slate-500 hover:text-slate-800 text-center font-medium"
              >
                ← Back to Farm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
