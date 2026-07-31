import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ShoppingCart, CheckCircle, Clock, XCircle } from 'lucide-react';

export const MonthlyOrdersChart = ({ data }) => {
  const totalOrdersYear = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalDeliveredYear = data.reduce((acc, curr) => acc + curr.delivered, 0);
  const totalCancelledYear = data.reduce((acc, curr) => acc + curr.cancelled, 0);
  
  const fulfillmentRate = ((totalDeliveredYear / totalOrdersYear) * 100).toFixed(1);

  return (
    <div id="chart-monthly-orders" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              Monthly Orders Volume
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              Fulfillment Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Historical order volume broken down by delivery completion state
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 self-start sm:self-auto">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">Fulfillment Success Rate:</span>
          <span className="font-bold text-emerald-400">{fulfillmentRate}%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              formatter={(value, name) => [`${value} orders`, name]}
              labelStyle={{ color: '#94a3b8', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="delivered" name="Delivered" stackId="a" fill="#10b981" />
            <Bar dataKey="processing" name="Processing" stackId="a" fill="#3b82f6" />
            <Bar dataKey="pending" name="Pending" stackId="a" fill="#f59e0b" />
            <Bar dataKey="cancelled" name="Cancelled" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
