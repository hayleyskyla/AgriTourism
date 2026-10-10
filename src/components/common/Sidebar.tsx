import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Calendar,
  ShoppingBag,
  Heart,
  Star,
  Bell,
  User,
  LogOut,
  Package,
  CalendarDays,
  HelpCircle,
  Coins,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Tractor,
} from 'lucide-react';
import { AgriLogo } from './AgriLogo';
import { Role } from '../../types';

interface SidebarProps {
  role: Role;
  activeItem: string;
  onNavigate: (item: string) => void;
  onLogout: () => void;
  cartCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeItem,
  onNavigate,
  onLogout,
  cartCount = 0,
}) => {
  const getNavItems = () => {
    if (role === 'farmer') {
      return [
        { id: 'farmer_dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'farmer_profile', label: 'My Profile', icon: User },
        { id: 'farmer_products', label: 'Products', icon: Package },
        { id: 'farmer_bookings', label: 'Bookings', icon: Calendar },
        { id: 'farmer_schedule', label: 'Schedule', icon: CalendarDays },
        { id: 'farmer_inquiries', label: 'Inquiries', icon: HelpCircle },
        { id: 'farmer_earnings', label: 'Earnings', icon: Coins },
        { id: 'farmer_reports', label: 'Reports', icon: BarChart3 },
        { id: 'farmer_messages', label: 'Messages', icon: MessageSquare },
        { id: 'farmer_settings', label: 'Settings', icon: Settings },
      ];
    }

    if (role === 'admin') {
      return [
        { id: 'admin_dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'admin_users', label: 'Users', icon: Users },
        { id: 'admin_farms', label: 'Farms', icon: Tractor },
        { id: 'admin_products', label: 'Products', icon: Package },
        { id: 'admin_bookings', label: 'Bookings', icon: Calendar },
        { id: 'admin_reports', label: 'Reports', icon: BarChart3 },
        { id: 'admin_reviews', label: 'Reviews', icon: Star },
        { id: 'admin_settings', label: 'Settings', icon: Settings },
      ];
    }

    // Default: Tourist
    return [
      { id: 'tourist_dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'explore_farms', label: 'Explore Farms', icon: Compass },
      { id: 'my_bookings', label: 'My Bookings', icon: Calendar },
      { id: 'my_orders', label: 'My Orders', icon: ShoppingBag, badge: cartCount },
      { id: 'saved_farms', label: 'Saved Farms', icon: Heart },
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'profile', label: 'Profile', icon: User },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-56 shrink-0 bg-[#0f3d23] text-emerald-100/90 flex flex-col justify-between py-5 px-3 min-h-screen select-none border-r border-[#0c311c]">
      <div>
        {/* Brand Header */}
        <div className="px-3 pb-6 border-b border-[#185331]/40 mb-4 cursor-pointer" onClick={() => onNavigate('landing')}>
          <AgriLogo variant="light" />
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1b5834] text-white shadow-xs font-semibold'
                    : 'text-emerald-100/75 hover:bg-[#154a2b] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-300/70'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {'badge' in item && typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="text-[11px] font-bold bg-amber-400 text-stone-900 rounded-full px-1.5 py-0.2 leading-tight">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-[#185331]/40 px-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-emerald-200/70 hover:text-white hover:bg-[#154a2b] rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 rotate-180" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
