import React from 'react';
import { Award, TrendingUp, Package, Star } from 'lucide-react';

export const TopProductsChart = ({ products }) => {
  // Sort products by revenue descending
  const sorted = [...products].sort((a, b) => b.revenue - a.revenue);
  const maxRevenue = sorted[0]?.revenue || 1;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="chart-top-selling-products" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Top Selling Products
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Revenue Leaderboard
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Top performing SKUs by units sold, total revenue, and remaining stock
          </p>
        </div>

        <span className="text-xs text-slate-400 self-start sm:self-auto">
          Showing Top {sorted.length} Products
        </span>
      </div>

      {/* Product Ranking List */}
      <div className="space-y-4">
        {sorted.map((item, index) => {
          const revenuePercent = (item.revenue / maxRevenue) * 100;

          return (
            <div 
              key={item.id}
              className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-slate-800/80 transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  index === 0 
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm shadow-amber-500/20' 
                    : index === 1 
                    ? 'bg-slate-300 text-slate-950 font-bold' 
                    : index === 2 
                    ? 'bg-amber-700/80 text-amber-100' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  #{index + 1}
                </div>

                {/* Product Thumbnail */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700/60"
                  referrerPolicy="no-referrer"
                />

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate hover:text-indigo-300 cursor-pointer">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-indigo-400 shrink-0">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                      {item.category}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                    <span className="font-semibold text-slate-300">{item.salesCount.toLocaleString()} units sold</span>
                    <span className="hidden sm:inline-flex items-center gap-0.5 text-amber-400 text-[11px]">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
                    </span>
                  </div>

                  {/* Progress bar visual */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500" 
                        style={{ width: `${revenuePercent}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      Stock: <span className={item.stock < 20 ? 'text-amber-400 font-bold' : 'text-slate-300'}>{item.stock} left</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
