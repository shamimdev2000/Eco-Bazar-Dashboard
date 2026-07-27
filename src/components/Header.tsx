import React from 'react';
import { TimeRange } from '../types';
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  Search, 
  PanelLeft,
  Store,
  Leaf
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
}

export const Header: React.FC<HeaderProps> = ({
  timeRange,
  setTimeRange,
  searchQuery,
  setSearchQuery,
  onExport,
  isRefreshing,
  onRefresh,
  onToggleSidebar
}) => {
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

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

