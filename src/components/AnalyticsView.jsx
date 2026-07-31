import React, { useState } from 'react';
import { SalesAnalyticsChart } from './SalesAnalyticsChart';
import { RevenueAnalyticsChart } from './RevenueAnalyticsChart';
import { CategorySalesChart } from './CategorySalesChart';
import { TopProductsChart } from './TopProductsChart';
import { OrdersTable } from './OrdersTable';
import { 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Percent, 
  Eye, 
  Clock, 
  PieChart, 
  Layers, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Globe, 
  MousePointerClick,
  Download,
  Calendar,
  FileSpreadsheet,
  Package,
  UserCheck,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const AnalyticsView = ({
  salesData,
  revenueData,
  topProducts,
  categorySales,
  orders,
  onUpdateOrderStatus
}) => {
  const [timeframe, setTimeframe] = useState('Monthly');
  const [activeTab, setActiveTab] = useState('sales-report');

  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Timeframe Multiplier for Dynamic Stats Adjustment
  const timeframeMultiplier = timeframe === 'Daily' ? 0.033 : timeframe === 'Weekly' ? 0.23 : timeframe === 'Yearly' ? 12 : 1;

  // Computed High-Level Metrics
  const baseGrossRevenue = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalGrossRevenue = Math.round(baseGrossRevenue * timeframeMultiplier);
  const baseOrdersCount = salesData.reduce((acc, curr) => acc + curr.orders, 0);
  const totalOrdersCount = Math.round(baseOrdersCount * timeframeMultiplier);
  const avgOrderValue = totalOrdersCount > 0 ? totalGrossRevenue / totalOrdersCount : 0;
  const avgConversionRate = (salesData.reduce((acc, curr) => acc + curr.conversionRate, 0) / salesData.length).toFixed(2);
  const totalCostOfGoods = Math.round(totalGrossRevenue * 0.58);
  const totalNetProfit = totalGrossRevenue - totalCostOfGoods;

  // CSV Export Helper
  const exportToCSV = (filename, headers, rows) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${timeframe.toLowerCase()}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Exported ${filename} CSV Report!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner & Timeframe Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Analytics, Reports & Store Intelligence</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Comprehensive store performance metrics, profitability reports, customer demographics, and exportable financial audits.
              </p>
            </div>
          </div>
        </div>

        {/* TIMEFRAME FILTER BUTTONS */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <Calendar className="w-4 h-4 text-slate-400 ml-2 mr-1" />
          {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tf) => {
            const active = timeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  active 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUICK KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Gross Revenue ({timeframe})</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">${totalGrossRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs prev {timeframe.toLowerCase()}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Net Profit</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">${totalNetProfit.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" /> 42% Net Margin
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">{totalOrdersCount.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" /> AOV ${avgOrderValue.toFixed(2)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Conversion Rate</span>
            <Percent className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">{avgConversionRate}%</div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> High Purchasing Intent
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'sales-report', label: 'Sales Report', icon: <FileSpreadsheet className="w-4 h-4" /> },
            { id: 'product-report', label: 'Product Report', icon: <Package className="w-4 h-4" /> },
            { id: 'customer-report', label: 'Customer Report', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'profit-report', label: 'Profit Report', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'sales-analysis', label: 'Sales Trends', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'revenue-profit', label: 'Margin Analytics', icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'visitors', label: 'Visitors & Traffic', icon: <Users className="w-4 h-4" /> },
            { id: 'conversion', label: 'Conversion Funnel', icon: <Percent className="w-4 h-4" /> },
            { id: 'best-selling', label: 'Best Selling SKUs', icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'recent-orders', label: 'Recent Orders', icon: <Clock className="w-4 h-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* REPORT TAB 1: SALES REPORT */}
      {activeTab === 'sales-report' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                Sales Report Breakdown ({timeframe})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Detailed transaction sales breakdown, order counts, gross revenue, shipping fees, tax collected, and net sales totals.
              </p>
            </div>
            <button
              onClick={() => {
                const headers = ["Date/Period", "Gross Sales ($)", "Total Orders", "AOV ($)", "Tax ($)", "Shipping ($)", "Net Revenue ($)"];
                const rows = salesData.map(s => [
                  s.date,
                  Math.round(s.sales * timeframeMultiplier),
                  Math.round(s.orders * timeframeMultiplier),
                  ((s.sales / (s.orders || 1))).toFixed(2),
                  Math.round(s.sales * 0.08 * timeframeMultiplier),
                  Math.round(s.orders * 12 * timeframeMultiplier),
                  Math.round(s.sales * 0.92 * timeframeMultiplier)
                ]);
                exportToCSV("Sales_Report", headers, rows);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Sales CSV
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Period / Date</th>
                    <th className="p-4">Gross Sales</th>
                    <th className="p-4">Orders</th>
                    <th className="p-4">Avg Order Value</th>
                    <th className="p-4">Estimated Tax (8%)</th>
                    <th className="p-4">Shipping Collected</th>
                    <th className="p-4 text-right">Net Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {salesData.map((s, idx) => {
                    const gross = Math.round(s.sales * timeframeMultiplier);
                    const orderCount = Math.round(s.orders * timeframeMultiplier);
                    const aov = orderCount > 0 ? (gross / orderCount).toFixed(2) : '0.00';
                    const tax = Math.round(gross * 0.08);
                    const shipping = Math.round(orderCount * 12);
                    const net = gross - tax;
                    return (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white font-mono">{s.date}</td>
                        <td className="p-4 font-bold text-emerald-400 font-mono">${gross.toLocaleString()}</td>
                        <td className="p-4 font-mono">{orderCount}</td>
                        <td className="p-4 font-mono">${aov}</td>
                        <td className="p-4 font-mono text-slate-400">${tax.toLocaleString()}</td>
                        <td className="p-4 font-mono text-slate-400">${shipping.toLocaleString()}</td>
                        <td className="p-4 font-bold text-white font-mono text-right">${net.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT TAB 2: PRODUCT REPORT */}
      {activeTab === 'product-report' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-400" />
                Product Sales & Velocity Report ({timeframe})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Individual product sales volume, stock turnover, unit revenues, and profit margin ratios per item.
              </p>
            </div>
            <button
              onClick={() => {
                const headers = ["Product Name", "Units Sold", "Total Revenue ($)", "Average Price ($)", "Stock Left", "Return Rate (%)"];
                const rows = topProducts.map(p => [
                  `"${p.name}"`,
                  Math.round(p.sales * timeframeMultiplier),
                  Math.round(p.revenue * timeframeMultiplier),
                  (p.revenue / (p.sales || 1)).toFixed(2),
                  p.stock,
                  '1.2%'
                ]);
                exportToCSV("Product_Report", headers, rows);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Product CSV
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Units Sold</th>
                    <th className="p-4">Gross Revenue</th>
                    <th className="p-4">Unit Price</th>
                    <th className="p-4">Stock Remaining</th>
                    <th className="p-4 text-right">Profit Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {topProducts.map((p) => {
                    const units = Math.round(p.sales * timeframeMultiplier);
                    const rev = Math.round(p.revenue * timeframeMultiplier);
                    const price = (p.revenue / (p.sales || 1)).toFixed(2);
                    return (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          <Package className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>{p.name}</span>
                        </td>
                        <td className="p-4 font-bold text-amber-400 font-mono">{units.toLocaleString()} units</td>
                        <td className="p-4 font-bold text-emerald-400 font-mono">${rev.toLocaleString()}</td>
                        <td className="p-4 font-mono">${price}</td>
                        <td className="p-4 font-mono">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock < 10 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {p.stock} in stock
                          </span>
                        </td>
                        <td className="p-4 font-bold text-indigo-400 font-mono text-right">46.5%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT TAB 3: CUSTOMER REPORT */}
      {activeTab === 'customer-report' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                Customer Cohort & Loyalty Report ({timeframe})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                New vs returning customer ratios, customer lifetime value (LTV), repeat order frequency, and top VIP buyers.
              </p>
            </div>
            <button
              onClick={() => {
                const headers = ["Customer Name", "Email", "Total Spent ($)", "Orders Placed", "Status"];
                const rows = orders.map(o => [
                  `"${o.customerName}"`,
                  o.customerEmail,
                  o.totalAmount,
                  1,
                  o.status
                ]);
                exportToCSV("Customer_Report", headers, rows);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Customer CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="text-xs font-semibold text-slate-400">New vs Returning Ratio</div>
              <div className="text-lg font-bold text-white font-mono">68% New / 32% Returning</div>
              <p className="text-[11px] text-emerald-400">+5.4% returning customer rate increase</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="text-xs font-semibold text-slate-400">Average Customer Lifetime Value</div>
              <div className="text-lg font-bold text-indigo-400 font-mono">$482.50 / customer</div>
              <p className="text-[11px] text-slate-400">Based on 12-month trailing cohort</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="text-xs font-semibold text-slate-400">Repeat Purchase Rate</div>
              <div className="text-lg font-bold text-amber-400 font-mono">28.4%</div>
              <p className="text-[11px] text-slate-400">Customers placing &gt;1 order per year</p>
            </div>
          </div>

          {/* Top Buyers Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 font-bold text-white text-xs">
              Top Customer Accounts & Recent Orders
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4 text-right">Order Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-[10px]">
                          {o.customerName.charAt(0)}
                        </div>
                        <span>{o.customerName}</span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono">{o.customerEmail}</td>
                      <td className="p-4 font-mono text-indigo-400">{o.id}</td>
                      <td className="p-4 font-bold text-emerald-400 font-mono">${o.totalAmount.toLocaleString()}</td>
                      <td className="p-4 text-right font-mono">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT TAB 4: PROFIT REPORT */}
      {activeTab === 'profit-report' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Profitability & COGS Audit Report ({timeframe})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Net profit margin calculations, Cost of Goods Sold (COGS), operating expenses, and tax deductions.
              </p>
            </div>
            <button
              onClick={() => {
                const headers = ["Month/Period", "Gross Revenue ($)", "COGS ($)", "Operating Expenses ($)", "Net Profit ($)", "Net Margin (%)"];
                const rows = revenueData.map(r => [
                  r.month,
                  Math.round(r.revenue * timeframeMultiplier),
                  Math.round(r.cogs * timeframeMultiplier),
                  Math.round(r.expenses * timeframeMultiplier),
                  Math.round(r.profit * timeframeMultiplier),
                  `${((r.profit / (r.revenue || 1)) * 100).toFixed(1)}%`
                ]);
                exportToCSV("Profitability_Report", headers, rows);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Profit CSV
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Period</th>
                    <th className="p-4">Gross Revenue</th>
                    <th className="p-4">Cost of Goods (COGS)</th>
                    <th className="p-4">Operating Expenses</th>
                    <th className="p-4">Net Profit</th>
                    <th className="p-4 text-right">Profit Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {revenueData.map((r, idx) => {
                    const rev = Math.round(r.revenue * timeframeMultiplier);
                    const cogs = Math.round(r.cogs * timeframeMultiplier);
                    const exp = Math.round(r.expenses * timeframeMultiplier);
                    const profit = Math.round(r.profit * timeframeMultiplier);
                    const margin = rev > 0 ? ((profit / rev) * 100).toFixed(1) : '0.0';
                    return (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white font-mono">{r.month}</td>
                        <td className="p-4 font-bold text-emerald-400 font-mono">${rev.toLocaleString()}</td>
                        <td className="p-4 font-mono text-rose-400">-${cogs.toLocaleString()}</td>
                        <td className="p-4 font-mono text-amber-400">-${exp.toLocaleString()}</td>
                        <td className="p-4 font-bold text-indigo-400 font-mono">${profit.toLocaleString()}</td>
                        <td className="p-4 font-bold text-emerald-400 font-mono text-right">{margin}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SALES TRENDS */}
      {activeTab === 'sales-analysis' && (
        <div className="space-y-6">
          <SalesAnalyticsChart data={salesData} />
        </div>
      )}

      {/* TAB CONTENT: MARGIN ANALYTICS */}
      {activeTab === 'revenue-profit' && (
        <div className="space-y-6">
          <RevenueAnalyticsChart data={revenueData} />
        </div>
      )}

      {/* TAB CONTENT: VISITORS & TRAFFIC */}
      {activeTab === 'visitors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                Traffic Acquisition Channels
              </h3>
              <p className="text-xs text-slate-400">Visitor session origins over selected timeframe.</p>

              <div className="space-y-3 pt-2">
                {[
                  { channel: 'Organic Google Search', percentage: 44, visits: '62,850', color: 'bg-indigo-500' },
                  { channel: 'Direct / Bookmarks', percentage: 26, visits: '37,140', color: 'bg-emerald-500' },
                  { channel: 'Social Media (Instagram/X)', percentage: 18, visits: '25,710', color: 'bg-amber-500' },
                  { channel: 'Paid Ads (Google / Meta)', percentage: 8, visits: '11,420', color: 'bg-rose-500' },
                  { channel: 'Referrals & Affiliates', percentage: 4, visits: '5,730', color: 'bg-cyan-500' },
                ].map((item) => (
                  <div key={item.channel} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold">{item.channel}</span>
                      <span className="font-mono font-bold text-white">{item.visits} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Monitor className="w-5 h-5 text-emerald-400" />
                Visitor Device Types
              </h3>
              <p className="text-xs text-slate-400">Viewport breakdown across customer devices.</p>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                  <Monitor className="w-6 h-6 text-indigo-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Desktop</div>
                  <div className="text-lg font-bold text-indigo-400 font-mono">62%</div>
                  <div className="text-[10px] text-slate-500">High AOV $184</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                  <Smartphone className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Mobile Phone</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">34%</div>
                  <div className="text-[10px] text-slate-500">Fast checkout</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                  <Tablet className="w-6 h-6 text-amber-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Tablet</div>
                  <div className="text-lg font-bold text-amber-400 font-mono">4%</div>
                  <div className="text-[10px] text-slate-500">Browsing intent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CONVERSION FUNNEL */}
      {activeTab === 'conversion' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-indigo-400" />
                E-Commerce Purchase Funnel & Abandonment Analysis
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Conversion steps from product page view to successful payment settlement.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                { step: '1. Product Page Views', count: '142,850 visitors', rate: '100%', color: 'bg-indigo-600' },
                { step: '2. Added Items to Cart', count: '18,570 users', rate: '13.0%', color: 'bg-indigo-500' },
                { step: '3. Initiated Checkout', count: '8,420 users', rate: '5.89%', color: 'bg-amber-500' },
                { step: '4. Completed Purchase', count: '4,885 orders', rate: '3.42%', color: 'bg-emerald-500' },
              ].map((item, idx) => (
                <div key={item.step} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{item.step}</span>
                    <span className="font-mono text-indigo-400">{item.count} ({item.rate})</span>
                  </div>
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full ${item.color}`} style={{ width: `${100 - (idx * 22)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BEST SELLING SKUS */}
      {activeTab === 'best-selling' && (
        <div className="space-y-6">
          <TopProductsChart products={topProducts} />
        </div>
      )}

      {/* TAB CONTENT: RECENT ORDERS */}
      {activeTab === 'recent-orders' && (
        <div className="space-y-6">
          <OrdersTable
            orders={orders}
            selectedStatus={selectedStatusFilter}
            setSelectedStatus={setSelectedStatusFilter}
            onSelectOrder={(order) => setSelectedOrderModal(order)}
            onUpdateStatus={onUpdateOrderStatus}
          />
        </div>
      )}
    </div>
  );
};
