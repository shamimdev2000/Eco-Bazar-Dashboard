import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, ShoppingBag, Percent, DollarSign } from 'lucide-react';

export const SalesAnalyticsChart = ({ data }) => {
  const [metric, setMetric] = useState('sales');

  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const totalOrders = data.reduce((acc, curr) => acc + curr.orders, 0);
  const avgConversion = (data.reduce((acc, curr) => acc + curr.conversionRate, 0) / data.length).toFixed(2);
  
  // Find peak day
  const peakPoint = [...data].sort((a, b) => b.sales - a.sales)[0];

  const formatYAxis = (value) => {
    if (metric === 'sales') {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    if (metric === 'conversionRate') {
      return `${value}%`;
    }
    return `${value}`;
  };

  const getMetricColor = () => {
    if (metric === 'sales') return '#6366f1'; // indigo
    if (metric === 'orders') return '#3b82f6'; // blue
    return '#10b981'; // emerald
  };

  return (
    <div id="chart-sales-analytics" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      {/* Header & Metric Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Sales Analytics
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Daily Trend
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Realtime track of revenue, order volume, and store conversion efficiency
          </p>
        </div>

        {/* Toggles */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 self-start sm:self-auto text-xs">
          <button
            onClick={() => setMetric('sales')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-all ${
              metric === 'sales'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Sales Revenue</span>
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-all ${
              metric === 'orders'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setMetric('conversionRate')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-all ${
              metric === 'conversionRate'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>Conv. Rate</span>
          </button>
        </div>
      </div>

      {/* Mini Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6 bg-slate-800/40 border border-slate-800 rounded-lg p-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">30-Day Total Sales</span>
          <span className="font-bold text-white text-sm">${totalSales.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Peak Sales Day</span>
          <span className="font-bold text-emerald-400 text-sm">
            {peakPoint ? `${peakPoint.date} ($${peakPoint.sales.toLocaleString()})` : 'N/A'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Avg Conversion</span>
          <span className="font-bold text-indigo-400 text-sm">{avgConversion}%</span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.4} />
                <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={{ stroke: '#334155' }}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              formatter={(val) => {
                if (metric === 'sales') return [`$${val.toLocaleString()}`, 'Daily Revenue'];
                if (metric === 'conversionRate') return [`${val}%`, 'Conversion Rate'];
                return [`${val} orders`, 'Orders'];
              }}
              labelStyle={{ color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={getMetricColor()}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#salesGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
