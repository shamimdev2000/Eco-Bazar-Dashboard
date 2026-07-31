import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users, 
  Clock, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  ArrowRight
} from 'lucide-react';

export const KPIGrid = ({
  timeRange,
  selectedStatus,
  onSelectStatusFilter,
  pendingCount,
  processingCount,
  deliveredCount,
  cancelledCount,
  totalOrdersCount,
  totalRevenueAmount,
  totalProductsCount,
  totalCustomersCount
}) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatNumber = (val) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  // Timeframe descriptor text
  const timeLabel = timeRange === '7d' ? 'vs last 7 days' : timeRange === '30d' ? 'vs last month' : 'vs prev period';

  return (
    <div className="space-y-6">
      {/* SECTION 1: Core Financial & Business Overview Metrics (Top 4) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Core Business Metrics
          </h2>
          <span className="text-xs text-slate-400">Updated Realtime</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Total Revenue */}
          <div id="kpi-total-revenue" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formatCurrency(totalRevenueAmount)}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> +14.2%
              </span>
              <span className="text-slate-400">{timeLabel}</span>
            </div>
          </div>

          {/* 2. Total Orders */}
          <div id="kpi-total-orders" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Orders</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formatNumber(totalOrdersCount)}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> +8.5%
              </span>
              <span className="text-slate-400">{timeLabel}</span>
            </div>
          </div>

          {/* 3. Total Products */}
          <div id="kpi-total-products" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Products</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formatNumber(totalProductsCount)}
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                In Stock
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                5 Active Categories
              </span>
              <span className="text-slate-400">Catalog size</span>
            </div>
          </div>

          {/* 4. Total Customers */}
          <div id="kpi-total-customers" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Customers</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formatNumber(totalCustomersCount)}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> +12.1%
              </span>
              <span className="text-slate-400">Repeat rate 34%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Order Fulfillment Pipeline Status Metrics (Next 4) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fulfillment Pipeline Status
            </h2>
            <span className="text-xs text-slate-500">(Click card to filter orders below)</span>
          </div>

          {selectedStatus !== 'All' && (
            <button
              onClick={() => onSelectStatusFilter('All')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline flex items-center gap-1"
            >
              Reset Filter (Showing: {selectedStatus})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 5. Pending Orders */}
          <button
            id="kpi-pending-orders"
            onClick={() => onSelectStatusFilter(selectedStatus === 'Pending' ? 'All' : 'Pending')}
            className={`text-left rounded-xl p-4 transition-all border cursor-pointer relative ${
              selectedStatus === 'Pending'
                ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Pending Orders
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Action Req.
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold text-white">
                {formatNumber(pendingCount)}
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Awaiting payment verification or pick-up</p>
          </button>

          {/* 6. Processing Orders */}
          <button
            id="kpi-processing-orders"
            onClick={() => onSelectStatusFilter(selectedStatus === 'Processing' ? 'All' : 'Processing')}
            className={`text-left rounded-xl p-4 transition-all border cursor-pointer relative ${
              selectedStatus === 'Processing'
                ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                : 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-400 flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                Processing Orders
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                In Transit
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold text-white">
                {formatNumber(processingCount)}
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Packaging or currently in shipping transit</p>
          </button>

          {/* 7. Delivered Orders */}
          <button
            id="kpi-delivered-orders"
            onClick={() => onSelectStatusFilter(selectedStatus === 'Delivered' ? 'All' : 'Delivered')}
            className={`text-left rounded-xl p-4 transition-all border cursor-pointer relative ${
              selectedStatus === 'Delivered'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Delivered Orders
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Completed
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold text-white">
                {formatNumber(deliveredCount)}
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Successfully delivered to end customers</p>
          </button>

          {/* 8. Cancelled Orders */}
          <button
            id="kpi-cancelled-orders"
            onClick={() => onSelectStatusFilter(selectedStatus === 'Cancelled' ? 'All' : 'Cancelled')}
            className={`text-left rounded-xl p-4 transition-all border cursor-pointer relative ${
              selectedStatus === 'Cancelled'
                ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500'
                : 'bg-slate-900/90 border-slate-800 hover:border-rose-500/50 hover:bg-slate-850'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                Cancelled Orders
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Refunded
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold text-white">
                {formatNumber(cancelledCount)}
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Customer cancelled or system returned</p>
          </button>
        </div>
      </div>
    </div>
  );
};
