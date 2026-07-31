import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Search, 
  Percent, 
  DollarSign, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Copy, 
  Check, 
  Edit2, 
  Trash2, 
  Sparkles, 
  Tag, 
  AlertCircle,
  TrendingUp,
  Filter,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';

export const CouponsView = ({
  coupons,
  onAddCoupon,
  onUpdateCoupon,
  onDeleteCoupon
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  
  const [copiedCode, setCopiedCode] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 50,
    isUnlimited: false,
    usageLimit: 500,
    expiryDate: '2026-08-31',
    status: 'Active'
  });

  const triggerToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    triggerToast(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: `PROMO${Math.floor(10 + Math.random() * 90)}`,
      description: '',
      discountType: 'percentage',
      discountValue: 15,
      minSpend: 40,
      isUnlimited: false,
      usageLimit: 250,
      expiryDate: '2026-09-30',
      status: 'Active'
    });
    setShowModal(true);
  };

  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minSpend: coupon.minSpend || 0,
      isUnlimited: coupon.usageLimit === null,
      usageLimit: coupon.usageLimit || 100,
      expiryDate: coupon.expiryDate,
      status: coupon.status
    });
    setShowModal(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    const formattedCode = formData.code.trim().toUpperCase();

    if (editingCoupon) {
      const updated = {
        ...editingCoupon,
        code: formattedCode,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minSpend: formData.minSpend ? Number(formData.minSpend) : 0,
        usageLimit: formData.isUnlimited ? null : Number(formData.usageLimit),
        expiryDate: formData.expiryDate,
        status: formData.status
      };
      onUpdateCoupon(updated);
      triggerToast(`Coupon "${formattedCode}" updated successfully!`);
    } else {
      const created = {
        id: `CPN-${Date.now().toString().slice(-4)}`,
        code: formattedCode,
        description: formData.description || `${formattedCode} promotional discount code`,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minSpend: formData.minSpend ? Number(formData.minSpend) : 0,
        usageCount: 0,
        usageLimit: formData.isUnlimited ? null : Number(formData.usageLimit),
        expiryDate: formData.expiryDate,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      onAddCoupon(created);
      triggerToast(`New Coupon "${formattedCode}" created!`);
    }

    setShowModal(false);
  };

  const handleToggleStatus = (coupon) => {
    const nextStatus = coupon.status === 'Active' ? 'Inactive' : 'Active';
    const updated = { ...coupon, status: nextStatus };
    onUpdateCoupon(updated);
    triggerToast(`Coupon "${coupon.code}" status changed to ${nextStatus}.`);
  };

  // Filtered Coupons
  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const isPerc = c.discountType === 'percentage' || c.discountType === 'Percentage';
    const isFix = c.discountType === 'fixed' || c.discountType === 'Fixed Amount';
    const matchesType = typeFilter === 'All' || 
      (typeFilter === 'percentage' && isPerc) || 
      (typeFilter === 'fixed' && isFix);
    return matchesSearch && matchesStatus && matchesType;
  });

  // KPI Calculations
  const activeCount = coupons.filter(c => c.status === 'Active').length;
  const totalUsages = coupons.reduce((sum, c) => sum + c.usageCount, 0);
  const totalDiscountSavings = coupons.reduce((sum, c) => {
    const avgOrder = 120;
    const isPerc = c.discountType === 'percentage' || c.discountType === 'Percentage';
    const approxSave = isPerc 
      ? (avgOrder * (c.discountValue / 100)) * c.usageCount 
      : c.discountValue * c.usageCount;
    return sum + approxSave;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastNotice && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Coupons & Promotional Discounts</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure promotional codes, percentage discounts, fixed order credits, usage limits, and expiration windows.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Coupons</div>
            <div className="text-2xl font-black text-white font-mono mt-1">{coupons.length}</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">{activeCount} Currently Active</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Tag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Coupon Uses</div>
            <div className="text-2xl font-black text-white font-mono mt-1">{totalUsages.toLocaleString()}</div>
            <div className="text-[11px] text-indigo-400 font-semibold mt-1">Redeemed across checkouts</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Discount Value</div>
            <div className="text-2xl font-black text-white font-mono mt-1">${Math.round(totalDiscountSavings).toLocaleString()}</div>
            <div className="text-[11px] text-amber-400 font-semibold mt-1">Total promo savings</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Promo Rate</div>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {coupons.length > 0 ? `${Math.round((activeCount / coupons.length) * 100)}%` : '0%'}
            </div>
            <div className="text-[11px] text-cyan-400 font-semibold mt-1">Active campaign readiness</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search coupon code or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700/80 text-xs">
            {['All', 'Active', 'Inactive', 'Expired'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700/80 text-xs">
            <button
              onClick={() => setTypeFilter('All')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                typeFilter === 'All' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('percentage')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                typeFilter === 'percentage' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              <Percent className="w-3 h-3 text-indigo-400" /> Percentage
            </button>
            <button
              onClick={() => setTypeFilter('fixed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                typeFilter === 'fixed' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              <DollarSign className="w-3 h-3 text-emerald-400" /> Fixed Amount
            </button>
          </div>
        </div>
      </div>

      {/* Coupons Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Type & Value</th>
                <th className="py-3.5 px-4">Min Purchase</th>
                <th className="py-3.5 px-4">Usage Limit & Redemption</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Ticket className="w-10 h-10 mx-auto text-slate-700 mb-2" />
                    <p className="font-bold text-slate-400">No coupons match your filter criteria.</p>
                    <p className="text-[11px] text-slate-600 mt-1">Try resetting search parameters or create a new coupon.</p>
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => {
                  const isExpired = new Date(coupon.expiryDate) < new Date('2026-07-27');
                  const usagePercent = coupon.usageLimit 
                    ? Math.min(100, Math.round((coupon.usageCount / coupon.usageLimit) * 100))
                    : 0;

                  return (
                    <tr key={coupon.id} className="hover:bg-slate-800/40 transition-colors group">
                      {/* Code */}
                      <td className="py-4 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg font-bold text-sm bg-slate-800 border border-slate-700 text-indigo-300 flex items-center gap-1.5 shadow-sm">
                            <Tag className="w-3.5 h-3.5 text-indigo-400" />
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(coupon.code)}
                            className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                            title="Copy code"
                          >
                            {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-xs truncate" title={coupon.description}>
                          {coupon.description}
                        </p>
                      </td>

                      {/* Discount Type & Value */}
                      <td className="py-4 px-4">
                        {(coupon.discountType === 'percentage' || coupon.discountType === 'Percentage') ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                            <Percent className="w-3.5 h-3.5" /> {coupon.discountValue}% OFF
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <DollarSign className="w-3.5 h-3.5" /> ${coupon.discountValue.toFixed(2)} FIXED OFF
                          </span>
                        )}
                      </td>

                      {/* Min Purchase */}
                      <td className="py-4 px-4 font-mono">
                        {coupon.minSpend && coupon.minSpend > 0 ? (
                          <span className="text-slate-200 font-semibold">${coupon.minSpend.toFixed(2)} min</span>
                        ) : (
                          <span className="text-slate-500 italic">No minimum</span>
                        )}
                      </td>

                      {/* Usage Limit */}
                      <td className="py-4 px-4">
                        <div className="space-y-1 max-w-xs">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-300 font-bold">{coupon.usageCount.toLocaleString()} uses</span>
                            <span className="text-slate-500">
                              {coupon.usageLimit ? `/ ${coupon.usageLimit.toLocaleString()} limit` : 'Unlimited'}
                            </span>
                          </div>
                          {coupon.usageLimit && (
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  usagePercent >= 100 ? 'bg-rose-500' : usagePercent >= 80 ? 'bg-amber-500' : 'bg-indigo-500'
                                }`} 
                                style={{ width: `${usagePercent}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Expiry Date */}
                      <td className="py-4 px-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span className={isExpired ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                            {coupon.expiryDate}
                          </span>
                        </div>
                      </td>

                      {/* Status Switch Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(coupon)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                            coupon.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : coupon.status === 'Expired'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {coupon.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                          {coupon.status === 'Expired' && <XCircle className="w-3 h-3" />}
                          {coupon.status === 'Inactive' && <Clock className="w-3 h-3" />}
                          {coupon.status}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(coupon)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit coupon configuration"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete coupon code "${coupon.code}"?`)) {
                                onDeleteCoupon(coupon.id);
                                triggerToast(`Coupon "${coupon.code}" deleted.`);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete coupon"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT COUPON MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create New Promotional Coupon'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 text-xs">
              {/* Code & Auto Generator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-bold uppercase text-[10px]">Coupon Code</label>
                  <button
                    type="button"
                    onClick={() => {
                      const prefixes = ['SUMMER', 'SAVE', 'VIP', 'FLASH', 'MEGA', 'WINTER'];
                      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
                      const num = Math.floor(10 + Math.random() * 89);
                      setFormData(prev => ({ ...prev, code: `${p}${num}` }));
                    }}
                    className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto-generate Code
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER2026"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-mono font-bold text-sm tracking-wider uppercase focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Promo Description</label>
                <input
                  type="text"
                  placeholder="e.g. Summer sale 20% discount on all orders above $50"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Discount Type Selector: Percentage vs Fixed Discount */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, discountType: 'percentage' })}
                  className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.discountType === 'percentage'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Percent className="w-4 h-4" /> Discount % (Percentage)
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, discountType: 'fixed' })}
                  className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.discountType === 'fixed'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4" /> Fixed Discount ($)
                </button>
              </div>

              {/* Discount Value & Min Spend */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">
                    {formData.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Fixed Discount ($)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={formData.discountType === 'percentage' ? 100 : 10000}
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Min Spend Requirement ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.minSpend}
                    onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Usage Limit */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-bold uppercase text-[10px]">Usage Limit</label>
                  <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isUnlimited}
                      onChange={(e) => setFormData({ ...formData, isUnlimited: e.target.checked })}
                      className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                    />
                    <span>Unlimited Usage</span>
                  </label>
                </div>
                {!formData.isUnlimited && (
                  <input
                    type="number"
                    min={1}
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Expiry Date</label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Active / Inactive Status */}
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Initial Coupon Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Active">Active (Live in checkout)</option>
                  <option value="Inactive">Inactive (Disabled)</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  {editingCoupon ? 'Save Changes' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
