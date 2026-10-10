import React from 'react';

interface AgriLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const AgriLogo: React.FC<AgriLogoProps> = ({
  className = '',
  variant = 'dark',
  compact = false,
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Globe & Leaf Custom Illustrated Icon */}
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 via-emerald-400 to-green-500 p-0.5 shadow-sm shrink-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white drop-shadow-xs"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
            <path d="M3.6 9h16.8" />
            <path d="M3.6 15h16.8" />
          </svg>
          {/* Sprout accent */}
          <span className="absolute -top-1 -right-0.5 text-xs">🌱</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif-title font-bold tracking-tight text-lg leading-tight ${
            isLight ? 'text-white' : 'text-[#124126]'
          }`}
        >
          AgriTourism
        </span>
        {!compact && (
          <span
            className={`text-[10px] tracking-wide font-medium ${
              isLight ? 'text-emerald-200/80' : 'text-slate-500'
            }`}
          >
            Farm. Connect. Experience.
          </span>
        )}
      </div>
    </div>
  );
};
