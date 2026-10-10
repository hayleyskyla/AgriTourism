import React, { useState } from 'react';
import { TopHeader } from '../common/TopHeader';
import { Booking } from '../../types';
import { QrCode, Calendar, Users, MapPin, X, CheckCircle2 } from 'lucide-react';

interface MyBookingsPageProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  bookings,
  onCancelBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Pending';
    if (activeTab === 'Completed') return b.status === 'Confirmed';
    if (activeTab === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  const getFarmBg = (farmId: string) => {
    if (farmId.includes('sunflower')) return 'bg-amber-400';
    if (farmId.includes('green-valley')) return 'bg-emerald-500';
    if (farmId.includes('mountain')) return 'bg-amber-500';
    return 'bg-teal-500';
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <TopHeader title="My bookings" role="tourist" />

      {/* Tabs matching Page 11 */}
      <div className="flex items-center gap-2">
        {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#154e2d] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Bookings List matching Page 11 */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
            No bookings found in {activeTab.toLowerCase()}.
          </div>
        ) : (
          filteredBookings.map((b) => {
            const bgClass = getFarmBg(b.farmId);

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Visual Box matching Page 11 */}
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${bgClass} flex items-center justify-center shrink-0 shadow-2xs text-3xl sm:text-4xl`}
                  >
                    {b.imageEmoji || '🌻'}
                  </div>

                  {/* Booking details */}
                  <div className="space-y-1">
                    <h4 className="font-serif-title font-bold text-base sm:text-lg text-slate-900">
                      {b.farmName}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      {b.date} • {b.guests} {b.guests === 1 ? 'guest' : 'guests'}
                    </p>
                    <div>
                      <button
                        onClick={() => setSelectedBookingForDetails(b)}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Badge matching Page 11 */}
                <div className="shrink-0">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${
                      b.status === 'Confirmed'
                        ? 'bg-[#d8eedd] text-[#14532d]'
                        : b.status === 'Pending'
                        ? 'bg-[#fef3c7] text-[#92400e]'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Ticket QR Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedBookingForDetails(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h3 className="font-serif-title font-bold text-xl text-[#143d26]">
              AgriTourism E-Pass
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Show this pass upon arrival at the farm gate
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 my-4 space-y-2 text-left text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Farm:</span>
                <span>{selectedBookingForDetails.farmName}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Activity:</span>
                <span>{selectedBookingForDetails.activity}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Date:</span>
                <span>{selectedBookingForDetails.date}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Guests:</span>
                <span>{selectedBookingForDetails.guests} Person(s)</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-800 pt-2 border-t border-slate-200">
                <span>Booking ID:</span>
                <span className="font-mono">{selectedBookingForDetails.id}</span>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl inline-block shadow-2xs">
              <QrCode className="w-28 h-28 text-slate-900 mx-auto" />
            </div>

            <div className="mt-4 pt-2">
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="w-full bg-[#154e2d] text-white py-2.5 rounded-xl font-semibold text-xs hover:bg-[#0c381c]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
