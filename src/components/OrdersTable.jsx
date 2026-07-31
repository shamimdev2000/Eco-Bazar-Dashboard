import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  RotateCw, 
  CheckCircle2, 
  XCircle,
  ArrowUpDown,
  ShoppingBag,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  FileText
} from 'lucide-react';

export const OrdersTable = ({
  orders,
  selectedStatus,
  setSelectedStatus,
  onSelectOrder,
  onUpdateStatus
}) => {
  const [tableSearch, setTableSearch] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter orders
  const filtered = orders.filter((order) => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const searchLower = tableSearch.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower) ||
      order.productsSummary.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  // Sort orders
  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return sortOrder === 'asc' 
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} /> Processing
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div id="section-orders-management" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Table Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            Recent Orders & Tracking
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage customer orders, track fulfillment stages, and update order statuses
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 text-xs">
          {['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Sub-row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by customer, ID, or item..."
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800/90 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-slate-400">
          <span>Sort:</span>
          <button
            onClick={() => toggleSort('date')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              sortField === 'date' ? 'bg-slate-800 text-white border-slate-700' : 'border-transparent hover:text-white'
            }`}
          >
            Date <ArrowUpDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => toggleSort('amount')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              sortField === 'amount' ? 'bg-slate-800 text-white border-slate-700' : 'border-transparent hover:text-white'
            }`}
          >
            Amount <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800 text-[11px]">
            <tr>
              <th className="py-3 px-3">Order ID</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Address</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Shipping</th>
              <th className="py-3 px-3 text-right">Total</th>
              <th className="py-3 px-3 text-center">Order Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="w-8 h-8 text-slate-600" />
                    <p className="font-semibold text-slate-300">No orders found matching your filter</p>
                    <button
                      onClick={() => { setSelectedStatus('All'); setTableSearch(''); }}
                      className="text-indigo-400 hover:underline mt-1"
                    >
                      Reset active filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              sorted.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectOrder(order)}
                >
                  {/* Order ID */}
                  <td className="py-3 px-3 font-mono font-bold text-indigo-400 whitespace-nowrap">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{order.customerName}</div>
                    <div className="text-[11px] text-slate-400">{order.customerEmail}</div>
                  </td>

                  {/* Phone */}
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap font-mono text-[11px]">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{order.customerPhone || '+1 (555) 019-2831'}</span>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="py-3 px-3 text-slate-300 max-w-[160px] truncate" title={order.shippingAddress}>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-500 shrink-0" />
                      <span className="truncate">{order.shippingAddress}</span>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-[11px]">
                      <CreditCard className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </td>

                  {/* Shipping */}
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    <div className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-amber-400 shrink-0" />
                      {order.shippingCarrier || 'Standard Delivery'}
                    </div>
                    {order.trackingNumber && (
                      <div className="text-[10px] text-slate-500 font-mono">
                        #{order.trackingNumber}
                      </div>
                    )}
                  </td>

                  {/* Total Amount */}
                  <td className="py-3 px-3 font-bold text-white text-right font-mono">
                    ${order.amount.toFixed(2)}
                  </td>

                  {/* Order Status */}
                  <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    {getStatusBadge(order.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="p-1.5 text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 rounded-lg transition-all border border-indigo-500/20"
                        title="View Full Order Details, Timeline & Printable Invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>

                      {/* Quick Status Advance */}
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-[11px] text-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
