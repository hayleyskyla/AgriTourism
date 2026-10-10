import React, { useState } from 'react';
import { TopHeader } from '../common/TopHeader';
import { INITIAL_ADMIN_ACTIVITIES } from '../../data/mockData';
import { User, Package, Check, BarChart2, Download, ShieldCheck, TrendingUp } from 'lucide-react';

interface AdminDashboardProps {
  onExportReport?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [activities] = useState(INITIAL_ADMIN_ACTIVITIES);
  const [selectedMonthHover, setSelectedMonthHover] = useState<string | null>(null);

  // SVG Chart points for Jan to Sep
  // 0, 50, 100, 150, 200
  // Values: Jan: 45, Feb: 90, Mar: 75, Apr: 80, May: 140, Jun: 95, Jul: 140, Aug: 185, Sep: 160
  const chartData = [
    { month: 'Jan', value: 45, x: 20, y: 155 },
    { month: 'Feb', value: 90, x: 75, y: 110 },
    { month: 'Mar', value: 75, x: 130, y: 125 },
    { month: 'Apr', value: 80, x: 185, y: 120 },
    { month: 'May', value: 140, x: 240, y: 60 },
    { month: 'Jun', value: 95, x: 295, y: 105 },
    { month: 'Jul', value: 140, x: 350, y: 60 },
    { month: 'Aug', value: 185, x: 405, y: 15 },
    { month: 'Sep', value: 160, x: 460, y: 40 },
  ];

  const pathD = `M 20 155 L 75 110 L 130 125 L 185 120 L 240 60 L 295 105 L 350 60 L 405 15 L 460 40`;
  const areaD = `${pathD} L 460 190 L 20 190 Z`;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-4 h-4 text-sky-600" />;
      case 'product':
        return <Package className="w-4 h-4 text-amber-600" />;
      case 'check':
        return <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />;
      case 'report':
      default:
        return <BarChart2 className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header matching Page 12 */}
      <TopHeader
        title="Platform overview"
        role="admin"
      />

      {/* 4 Metric Cards matching Page 12 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total users */}
        <div className="bg-[#e4eff6] p-5 rounded-2xl border border-sky-100 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Total users</div>
          <div className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900 mt-1">
            1,248
          </div>
        </div>

        {/* Total farms */}
        <div className="bg-[#e7f5f0] p-5 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Total farms</div>
          <div className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900 mt-1">
            86
          </div>
        </div>

        {/* Total bookings */}
        <div className="bg-[#fcf3e6] p-5 rounded-2xl border border-amber-100 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Total bookings</div>
          <div className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900 mt-1">
            342
          </div>
        </div>

        {/* Total products */}
        <div className="bg-[#edeaf8] p-5 rounded-2xl border border-purple-100 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Total products</div>
          <div className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900 mt-1">
            1,560
          </div>
        </div>
      </div>

      {/* Middle Grid: Bookings Chart + Recent Activities matching Page 12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Bookings Overview Chart (Page 12) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif-title font-bold text-base sm:text-lg text-slate-900">
              Bookings overview
            </h3>
            <button className="text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors">
              View reports
            </button>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full overflow-x-auto py-2">
            <div className="min-w-[480px]">
              <svg viewBox="0 0 490 220" className="w-full h-56 select-none overflow-visible">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e6b47" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1e6b47" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                <line x1="20" y1="15" x2="470" y2="15" stroke="#edf2ee" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fill="#94a3b8" textAnchor="end">200</text>

                <line x1="20" y1="65" x2="470" y2="65" stroke="#edf2ee" strokeWidth="1" />
                <text x="10" y="68" fontSize="10" fill="#94a3b8" textAnchor="end">150</text>

                <line x1="20" y1="115" x2="470" y2="115" stroke="#edf2ee" strokeWidth="1" />
                <text x="10" y="118" fontSize="10" fill="#94a3b8" textAnchor="end">100</text>

                <line x1="20" y1="160" x2="470" y2="160" stroke="#edf2ee" strokeWidth="1" />
                <text x="10" y="163" fontSize="10" fill="#94a3b8" textAnchor="end">50</text>

                <line x1="20" y1="190" x2="470" y2="190" stroke="#e2e8f0" strokeWidth="1" />
                <text x="10" y="193" fontSize="10" fill="#94a3b8" textAnchor="end">0</text>

                {/* Area under curve */}
                <path d={areaD} fill="url(#chartFill)" />

                {/* Main Stroke */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#1b603f"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive points & month labels */}
                {chartData.map((pt) => {
                  const isHovered = selectedMonthHover === pt.month;
                  return (
                    <g key={pt.month} onMouseEnter={() => setSelectedMonthHover(pt.month)} onMouseLeave={() => setSelectedMonthHover(null)}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? "5" : "3.5"}
                        fill="#1b603f"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                      />
                      {isHovered && (
                        <g>
                          <rect
                            x={pt.x - 22}
                            y={pt.y - 28}
                            width="44"
                            height="20"
                            rx="4"
                            fill="#0e3a22"
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 15}
                            fontSize="10"
                            fontWeight="bold"
                            fill="#ffffff"
                            textAnchor="middle"
                          >
                            {pt.value}
                          </text>
                        </g>
                      )}
                      <text
                        x={pt.x}
                        y="210"
                        fontSize="11"
                        fill="#64748b"
                        textAnchor="middle"
                        className="cursor-pointer font-medium"
                      >
                        {pt.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Recent activities matching Page 12 */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col">
          <h3 className="font-serif-title font-bold text-base sm:text-lg text-slate-900 mb-4">
            Recent activities
          </h3>

          <div className="space-y-4 divide-y divide-slate-100">
            {activities.map((act) => (
              <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getActivityIcon(act.iconType)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{act.subtitle}</p>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
              Download Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
