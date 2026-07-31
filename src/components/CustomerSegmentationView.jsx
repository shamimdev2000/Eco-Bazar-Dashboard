import React, { useState } from 'react';
import { CUSTOMER_SEGMENT_SUMMARIES } from '../data/mockData';
import { 
  Users, 
  Crown, 
  UserPlus, 
  UserX, 
  Repeat, 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Mail,
  MoreVertical,
  SlidersHorizontal,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend, PieChart, Pie } from 'recharts';

export const CustomerSegmentationView = ({
  customers,
  onSelectCustomer
}) => {
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const getSegmentIcon = (segment) => {
    switch (segment) {
      case 'High-Value Customers':
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 'New Customers':
        return <UserPlus className="w-5 h-5 text-emerald-400" />;
      case 'Lapsed Customers':
        return <UserX className="w-5 h-5 text-rose-400" />;
      case 'Frequent Buyers':
        return <Repeat className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getSegmentBadgeColor = (segment) => {
    switch (segment) {
      case 'High-Value Customers':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'New Customers':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Lapsed Customers':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Frequent Buyers':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  // Filter customers by segment & search
  const filteredCustomers = customers.filter(cust => {
    const matchesSegment = selectedSegment === 'All' || cust.segment === selectedSegment;
    const matchesSearch = cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cust.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  const totalRevenue = CUSTOMER_SEGMENT_SUMMARIES.reduce((acc, curr) => acc + curr.totalRevenue, 0);
  const totalOrders = CUSTOMER_SEGMENT_SUMMARIES.reduce((acc, curr) => acc + curr.totalOrders, 0);

  const chartData = CUSTOMER_SEGMENT_SUMMARIES.map(s => ({
    name: s.segment.replace(' Customers', ''),
    revenue: s.totalRevenue,
    orders: s.totalOrders,
    revenuePercent: s.revenuePercent,
    orderPercent: s.orderVolumePercent,
    avgOrderValue: s.avgOrderValue
  }));

  const pieColors = ['#f59e0b', '#6366f1', '#10b981', '#f43f5e'];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Customer Segmentation</h1>
          </div>
          <p className="text-sm text-slate-400">
            Categorize customer profiles by behavioral metrics, analyze revenue contribution, and track order volume by segment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-1 border border-slate-800 rounded-xl flex items-center">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Segment Summaries
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'customers'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Customer Directory ({filteredCustomers.length})
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'comparison'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Revenue Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Segment Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CUSTOMER_SEGMENT_SUMMARIES.map((summary) => {
          const isSelected = selectedSegment === summary.segment;
          return (
            <div
              key={summary.segment}
              onClick={() => {
                setSelectedSegment(isSelected ? 'All' : summary.segment);
                setActiveTab('customers');
              }}
              className={`bg-slate-900 border rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01] shadow-sm relative overflow-hidden group ${
                isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-800 rounded-xl">
                    {getSegmentIcon(summary.segment)}
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{summary.segment}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSegmentBadgeColor(summary.segment)}`}>
                  {summary.customerCount.toLocaleString()} users
                </span>
              </div>

              {/* Revenue & Contribution */}
              <div className="space-y-2 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    ${summary.totalRevenue.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    +{summary.growthRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Revenue Share:</span>
                  <span className="font-semibold text-indigo-300">{summary.revenuePercent}%</span>
                </div>

                {/* Progress Bar for Revenue Share */}
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-1.5 rounded-full" 
                    style={{ width: `${summary.revenuePercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Order Volume Breakdown */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Order Volume</span>
                  <span className="font-semibold text-slate-200">{summary.totalOrders.toLocaleString()} ({summary.orderVolumePercent}%)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Avg Order Value</span>
                  <span className="font-semibold text-slate-200">${summary.avgOrderValue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue & Volume Contribution Charts */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  Segment Revenue vs. Order Volume Contribution
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Comparing financial output against purchase frequency per behavioral category.
                </p>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${Number(value).toLocaleString()}` : `${value} orders`,
                      name === 'revenue' ? 'Revenue Contribution' : 'Order Volume'
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="orders" name="Order Volume" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Share Pie Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                <PieIcon className="w-4 h-4 text-amber-400" />
                Revenue Share Split
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Total Revenue generated: <span className="text-indigo-400 font-semibold">${totalRevenue.toLocaleString()}</span>
              </p>

              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                      formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Revenue']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 mt-2 pt-4 border-t border-slate-800">
              {chartData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }}></div>
                    <span className="text-slate-300">{d.name}</span>
                  </div>
                  <span className="font-semibold text-slate-200">{d.revenuePercent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Customer List & Filter Table */}
      {(activeTab === 'customers' || activeTab === 'overview') && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Categorized Customers List</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedSegment === 'All' ? 'Showing all segmented profiles' : `Filtered by: ${selectedSegment}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search customer name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Segment Filter Dropdown / Pills */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
                <button
                  onClick={() => setSelectedSegment('All')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    selectedSegment === 'All'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All ({customers.length})
                </button>
                {CUSTOMER_SEGMENT_SUMMARIES.map((s) => (
                  <button
                    key={s.segment}
                    onClick={() => setSelectedSegment(s.segment)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedSegment === s.segment
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {getSegmentIcon(s.segment)}
                    <span>{s.segment.replace(' Customers', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customers Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Segment Tag</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-right">Orders</th>
                  <th className="py-3 px-4 text-right">Total Spent</th>
                  <th className="py-3 px-4 text-right">Avg Order</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500">
                      No customer profiles found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr 
                      key={cust.id} 
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                      onClick={() => onSelectCustomer?.(cust)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {cust.avatar ? (
                            <img 
                              src={cust.avatar} 
                              alt={cust.name} 
                              className="w-9 h-9 rounded-full object-cover border border-slate-700" 
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">
                              {cust.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                              {cust.name}
                            </div>
                            <div className="text-[11px] text-slate-400">{cust.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getSegmentBadgeColor(cust.segment)}`}>
                          {getSegmentIcon(cust.segment)}
                          {cust.segment}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">{cust.location}</td>

                      <td className="py-3.5 px-4 text-right font-medium text-slate-200">
                        {cust.ordersCount}
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                        ${cust.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-3.5 px-4 text-right text-slate-300">
                        ${cust.avgOrderValue.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">{cust.lastOrderDate}</td>

                      <td className="py-3.5 px-4 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Campaign email sent to ${cust.email}`);
                          }}
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                          title="Contact Customer"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
