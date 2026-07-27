import React from 'react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CategorySale } from '../types';
import { PieChart, Layers } from 'lucide-react';

interface CategorySalesChartProps {
  categories: CategorySale[];
}

export const CategorySalesChart: React.FC<CategorySalesChartProps> = ({ categories }) => {
  const totalRevenue = categories.reduce((acc, curr) => acc + curr.revenue, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="chart-category-sales" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Category Sales Share
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Product Mix
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Revenue distribution across key store departments
          </p>
        </div>

        <span className="text-xs text-slate-400 font-semibold bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60 self-start sm:self-auto">
          Total Revenue: {formatCurrency(totalRevenue)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart */}
        <div className="md:col-span-6 h-60 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="revenue"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}
                formatter={(val: number) => [`$${val.toLocaleString()}`, 'Revenue']}
              />
            </RechartsPieChart>
          </ResponsiveContainer>

          {/* Center text in Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-white">5</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Categories</span>
          </div>
        </div>

        {/* Legend & Breakdown */}
        <div className="md:col-span-6 space-y-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                <span className="font-semibold text-white">{cat.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-200">{formatCurrency(cat.revenue)}</div>
                <div className="text-[10px] text-slate-400">{cat.percentage}% of total</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
