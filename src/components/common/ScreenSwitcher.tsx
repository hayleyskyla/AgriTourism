import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

const SCREENS: { id: ScreenId; pageNum: number; label: string; roleTag: string }[] = [
  { id: 'page_1_landing', pageNum: 1, label: 'Hero Landing Page', roleTag: 'Public' },
  { id: 'page_2_signup', pageNum: 2, label: 'Create Account (Mang Rigor)', roleTag: 'Auth' },
  { id: 'page_3_login', pageNum: 3, label: 'Welcome Back Login', roleTag: 'Auth' },
  { id: 'page_4_tourist_dashboard', pageNum: 4, label: 'Tourist Dashboard (Hello Maria)', roleTag: 'Tourist' },
  { id: 'page_5_explore_farms', pageNum: 5, label: 'Explore Farms & Filters', roleTag: 'Tourist' },
  { id: 'page_6_farm_detail', pageNum: 6, label: 'Farm Detail (Sunnyvale Farm)', roleTag: 'Tourist' },
  { id: 'page_7_booking', pageNum: 7, label: 'Fruit Picking Booking', roleTag: 'Tourist' },
  { id: 'page_8_marketplace', pageNum: 8, label: 'Fresh Local Products', roleTag: 'Market' },
  { id: 'page_9_cart', pageNum: 9, label: 'Your Cart & 4-Step Checkout', roleTag: 'Checkout' },
  { id: 'page_10_farmer_dashboard', pageNum: 10, label: 'Farmer Portal (Juan Dela Cruz)', roleTag: 'Farmer' },
  { id: 'page_11_my_bookings', pageNum: 11, label: 'My Bookings (Upcoming/Past)', roleTag: 'Tourist' },
  { id: 'page_12_admin_dashboard', pageNum: 12, label: 'Platform Overview & Analytics', roleTag: 'Admin' },
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeScreenObj = SCREENS.find((s) => s.id === currentScreen) || SCREENS[0];

  return (
    <div className="fixed bottom-3 right-4 z-50 select-none">
      <div className="relative">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#0d341e] text-white px-3.5 py-2 rounded-full shadow-lg hover:bg-[#154e2d] border border-emerald-600/40 text-xs font-semibold tracking-wide transition-all"
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Page {activeScreenObj.pageNum}: {activeScreenObj.label.split('(')[0].trim()}</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 text-slate-800 max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                12 Prototype Screens
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                Direct Jump
              </span>
            </div>

            <div className="py-1 space-y-0.5">
              {SCREENS.map((screen) => {
                const isActive = screen.id === currentScreen;
                return (
                  <button
                    key={screen.id}
                    onClick={() => {
                      onSelectScreen(screen.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-emerald-700 text-white font-semibold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                          isActive ? 'bg-white text-emerald-800' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {screen.pageNum}
                      </span>
                      <span className="truncate">{screen.label}</span>
                    </div>

                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${
                        isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {screen.roleTag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
