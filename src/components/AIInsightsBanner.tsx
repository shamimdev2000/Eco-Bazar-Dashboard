import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AIInsightsBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-800/50 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Executive AI Digest & Operations Health</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Automated Insights
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Overall store performance is <span className="text-emerald-400 font-semibold">14.2% above last month’s baseline</span>. 
              The <span className="text-indigo-300 font-semibold">Electronics department</span> generated 42.5% of total revenue. 
              Fulfillment velocity is optimal with <span className="text-blue-300 font-semibold">94.8% on-time delivery</span>.
            </p>
          </div>
        </div>

        {/* Quick Badges */}
        <div className="flex flex-wrap md:flex-col gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Revenue Target: Exceeded</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Low Stock: 2 Top Products</span>
          </div>
        </div>
      </div>
    </div>
  );
};
