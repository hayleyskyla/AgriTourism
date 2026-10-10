import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Role } from '../../types';

interface TopHeaderProps {
  title?: string;
  subtitle?: string;
  role: Role;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onAvatarClick?: () => void;
  onNotificationClick?: () => void;
  hasUnreadNotifications?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  role,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onAvatarClick,
  onNotificationClick,
  hasUnreadNotifications = true,
}) => {
  const getAvatarInfo = () => {
    if (role === 'farmer') {
      return { letter: 'J', name: 'Juan Dela Cruz', bg: 'bg-[#b8623b]' };
    }
    if (role === 'admin') {
      return { letter: 'A', name: 'Admin Officer', bg: 'bg-[#c54b38]' };
    }
    return { letter: 'M', name: 'Maria Santos', bg: 'bg-[#de8256]' };
  };

  const avatar = getAvatarInfo();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
      <div className="flex-1">
        {title && (
          <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#143d25] tracking-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {searchPlaceholder && onSearchChange && (
          <div className="relative w-64 sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-[#ecf2ed] hover:bg-[#e4ece5] focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-lg border border-transparent focus:border-emerald-600 focus:outline-hidden transition-all"
            />
          </div>
        )}

        {/* Notifications Icon with amber indicator as in design */}
        <button
          onClick={onNotificationClick}
          className="relative p-2 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-full transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          {hasUnreadNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* User avatar badge with role indicator */}
        <button
          onClick={onAvatarClick}
          className={`w-9 h-9 rounded-full ${avatar.bg} text-white font-semibold text-sm flex items-center justify-center shadow-xs hover:ring-2 hover:ring-emerald-700/40 transition-all`}
          title={`${avatar.name} (${role})`}
        >
          {avatar.letter}
        </button>
      </div>
    </header>
  );
};
