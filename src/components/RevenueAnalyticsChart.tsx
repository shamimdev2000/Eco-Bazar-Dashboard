import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { RevenueAnalyticsPoint } from '../types';
import { DollarSign, PieChart, Target } from 'lucide-react';

interface RevenueAnalyticsChartProps {
  data: RevenueAnalyticsPoint[];
}

export const RevenueAnalyticsChart: React.FC<RevenueAnalyticsChartProps> = ({ data }) => {
  const [showTarget, setShowTarget] = useState<boolean>(true);

  const totalRev = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalCost = data.reduce((acc, curr) => acc + curr.cost, 0);
  const totalProfit = totalRev - totalCost;
  const profitMargin = ((totalProfit / totalRev) * 100).toFixed(1);

  const formatK = (val: number) => `$${(val / 1000).toFixed(0)}k`;

  return (
    <div id="chart-revenue-analytics" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Revenue Analytics & Margins
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Financial Performance
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monthly breakdown comparing Gross Revenue vs Operating Costs and Net Profit vs Targets
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <label className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 cursor-pointer text-slate-300 hover:text-white">
            <input 
              type="checkbox" 
              checked={showTarget} 
              onChange={(e) => setShowTarget(e.target.checked)}
              className="rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-500"
            />
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Show Target Line</span>
          </label>
        </div>
      </div>

      {/* Financial Health Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-slate-800/40 border border-slate-800 rounded-lg p-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Gross Revenue</span>
            <span className="font-bold text-white text-sm">${totalRev.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Net Profit Margin</span>
            <span className="font-bold text-emerald-400 text-sm">{profitMargin}% (${totalProfit.toLocaleString()})</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Avg Target Attainment</span>
            <span className="font-bold text-amber-300 text-sm">114.2% Exceeded</span>
          </div>
        </div>
      </div>

      {/* Composed Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} tickFormatter={formatK} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
              labelStyle={{ color: '#94a3b8', fontWeight: 600 }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Bar dataKey="revenue" name="Gross Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
            {showTarget && (
              <Line 
                type="monotone" 
                dataKey="target" 
                name="Sales Target" 
                stroke="#f59e0b" 
                strokeWidth={2.5} 
                dot={{ fill: '#f59e0b', r: 3 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
