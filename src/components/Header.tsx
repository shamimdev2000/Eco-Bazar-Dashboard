import React, { useState, useRef, useEffect } from 'react';
import { TimeRange } from '../types';
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  Search, 
  PanelLeft,
  Leaf,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Settings
} from 'lucide-react';

interface HeaderProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExport: () => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  onToggleSidebar?: () => void;
  currentUser?: { name: string; email: string; role: string };
  onLogout?: () => void;
  onNavigateProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  timeRange,
  setTimeRange,
  searchQuery,
  setSearchQuery,
  onExport,
  isRefreshing,
  onRefresh,
  onToggleSidebar,
  currentUser = { name: 'Alexander Wright', email: 'admin@ecobazar.io', role: 'Super Admin' },
  onLogout,
  onNavigateProfile
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AD';
  };

  return (
    <header className="bg-[#0d0d0d] border-b border-slate-800 text-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Navbar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3 md:gap-4">
          {/* Sidebar Toggle & Brand Identity */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Sidebar toggle button */}
              <button
                onClick={onToggleSidebar}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all shrink-0 active:scale-95"
                title="Toggle Sidebar Navigation"
              >
                <PanelLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-base sm:text-lg font-bold tracking-tight text-white truncate">Eco-Bazar Dashboard</h1>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Real-Time Sync
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 hidden sm:block truncate">Sustainable E-Commerce & Customer Analytics</p>
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              <button
                onClick={onRefresh}
                className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800 active:scale-95"
                title="Refresh Analytics"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
              <button
                onClick={onExport}
                className="p-2 text-white bg-emerald-600 rounded-lg border border-emerald-500/30 active:scale-95"
                title="Export Report"
              >
                <Download className="w-4 h-4" />
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg active:scale-95"
                  title="Logout Admin Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            {/* Global Search Input */}
            <div className="relative flex-1 md:w-60 min-w-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, stock, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center justify-between sm:justify-start bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs overflow-x-auto custom-scrollbar">
              <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 hidden sm:block shrink-0" />
              <div className="flex items-center gap-1 w-full sm:w-auto">
                {(['7d', '30d', '90d', '12m'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium text-xs transition-all whitespace-nowrap ${
                      timeRange === range
                        ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Actions & Admin User Profile */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
              </button>

              <button
                onClick={onExport}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all border border-emerald-500/30 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              {/* Admin User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all active:scale-95"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {getInitials(currentUser.name)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold text-white leading-tight truncate max-w-[110px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium leading-none">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 py-1 divide-y divide-slate-800/80 animate-fadeIn">
                    <div className="px-3.5 py-2.5">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {onNavigateProfile && (
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            onNavigateProfile();
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>Admin Profile & 2FA</span>
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      {onLogout && (
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out Admin Session</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

