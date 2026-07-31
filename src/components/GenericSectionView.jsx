import React, { useState } from 'react';
import { AddProductForm } from './AddProductForm';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Ticket, 
  Zap, 
  Image as FolderImage, 
  BarChart2, 
  Megaphone, 
  Sliders, 
  MessageSquareQuote, 
  FileText, 
  HelpCircle, 
  Mail, 
  Bell, 
  MessageSquare, 
  FileSpreadsheet, 
  Settings, 
  UserCheck,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit,
  Eye,
  Copy,
  Send,
  Star,
  Download,
  Upload,
  Sparkles,
  TrendingUp,
  Shield,
  CreditCard
} from 'lucide-react';

export const GenericSectionView = ({
  viewId,
  orders,
  products,
  coupons,
  flashSale,
  reviews,
  media,
  blogs,
  faqs,
  onNavigate,
  onUpdateOrderStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [productList, setProductList] = useState(products);

  // Sync if products prop updates
  React.useEffect(() => {
    setProductList(products);
  }, [products]);

  // Handlers for product actions
  const handleDeleteProduct = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setProductList(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleDuplicateProduct = (p) => {
    const duplicated = {
      ...p,
      id: `p-${Date.now()}`,
      name: `${p.name} (Copy)`,
      salesCount: 0
    };
    setProductList(prev => [duplicated, ...prev]);
    alert(`Duplicated "${p.name}" successfully as "${duplicated.name}".`);
  };

  // RENDER BASED ON VIEW ID
  if (viewId === 'products-add') {
    return <AddProductForm onNavigate={onNavigate} />;
  }

  if (viewId.startsWith('products-')) {
    const sub = viewId.replace('products-', '');
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white capitalize">Products Manager - {sub.replace('-', ' ')}</h1>
            <p className="text-xs text-slate-400 mt-1">Manage catalog listings, categories, product tags, brands, and customer reviews.</p>
          </div>
          <button 
            onClick={() => onNavigate('products-add')} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

        {sub === 'reviews' ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Customer Product Reviews</h2>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white text-xs">{rev.customerName}</span>
                      <span className="text-[10px] text-slate-500">on {rev.productName}</span>
                      <div className="flex items-center text-amber-400 text-xs">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        {rev.rating}.0
                      </div>
                    </div>
                    <div className="font-bold text-xs text-slate-200">{rev.title}</div>
                    <p className="text-xs text-slate-400 mt-1">{rev.comment}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {rev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="text-xs text-slate-400">
                Total Products: <span className="font-bold text-white">{productList.length}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3 px-3">Image</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-center">Stock</th>
                    <th className="py-3 px-3 text-right">Price</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-center">Created Date</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {productList
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((p, idx) => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors group">
                        {/* Image */}
                        <td className="py-3 px-3">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-800 group-hover:border-indigo-500/40 transition-all" 
                          />
                        </td>
                        {/* Name */}
                        <td className="py-3 px-3 font-semibold text-white">
                          <div className="font-bold text-xs hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => alert(`Product Specs:\nName: ${p.name}\nCategory: ${p.category}\nPrice: $${p.price}\nSales: ${p.salesCount}`)}>
                            {p.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            SKU: APX-PRD-00{idx + 1}
                          </div>
                        </td>
                        {/* Category */}
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                            {p.category}
                          </span>
                        </td>
                        {/* Stock */}
                        <td className="py-3 px-3 text-center font-bold">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock === 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            p.stock < 10 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {p.stock === 0 ? 'Out of Stock' : `${p.stock} units`}
                          </span>
                        </td>
                        {/* Price */}
                        <td className="py-3 px-3 text-right font-bold text-white font-mono">
                          ${p.price.toFixed(2)}
                        </td>
                        {/* Status */}
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            Published
                          </span>
                        </td>
                        {/* Created Date */}
                        <td className="py-3 px-3 text-center text-slate-400 font-mono text-[11px]">
                          2026-05-{(idx * 3 % 28) + 1}
                        </td>
                        {/* Actions */}
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {/* View */}
                            <button
                              onClick={() => alert(`Viewing Product details:\nName: ${p.name}\nPrice: $${p.price}\nStock: ${p.stock}`)}
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                              title="View Product"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => onNavigate('products-add')}
                              className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
                              title="Edit Product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {/* Duplicate */}
                            <button
                              onClick={() => handleDuplicateProduct(p)}
                              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all"
                              title="Duplicate Product"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (viewId.startsWith('orders-')) {
    const statusFilter = viewId.replace('orders-', '');
    const filteredOrders = orders.filter(o => {
      if (statusFilter === 'all') return true;
      return o.status.toLowerCase() === statusFilter.toLowerCase();
    });

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white capitalize">Orders Directory - {statusFilter}</h1>
            <p className="text-xs text-slate-400 mt-0.5">Showing {filteredOrders.length} fulfillment orders</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-400">{o.id}</td>
                    <td className="py-3 px-3 font-semibold text-white">{o.customerName}</td>
                    <td className="py-3 px-3 text-slate-400">{o.date}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400">${o.amount.toFixed(2)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        o.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        o.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus?.(o.id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (viewId === 'coupons') {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Coupons & Promotional Codes</h1>
            <p className="text-xs text-slate-400 mt-1">Configure promotional discount codes and track redemptions.</p>
          </div>
          <button onClick={() => alert('New coupon created!')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Discount Code
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-lg text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20">{c.code}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>{c.status}</span>
              </div>
              <div className="text-xs text-slate-300">
                Discount: <span className="font-bold text-white">{c.discountType === 'Percentage' ? `${c.discountValue}% OFF` : `$${c.discountValue} OFF`}</span>
              </div>
              <div className="text-xs text-slate-400">
                Usage: {c.usageCount} / {c.usageLimit} redeemed
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (viewId === 'flash-sale') {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Flash Sale Campaigns
            </h1>
            <p className="text-xs text-slate-400 mt-1">Timed lightning discounts with live countdown timers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flashSale.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{item.productName}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Ends in {item.endsIn}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-emerald-400">${item.salePrice.toFixed(2)}</span>
                <span className="text-xs text-slate-500 line-through">${item.originalPrice.toFixed(2)}</span>
                <span className="text-xs font-bold text-rose-400">({item.discountPercent}% OFF)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT / OTHER NAV MODULES (Analytics, Media Library, Blog, FAQ, Settings, Profile)
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h1 className="text-xl font-bold text-white capitalize">{viewId.replace('-', ' ')} Module</h1>
        <p className="text-xs text-slate-400 mt-1">Comprehensive back-office operational controls for {viewId}.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-white capitalize">{viewId.replace('-', ' ')} Admin Console</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          All configuration triggers, automated workflow syncs, and database updates for {viewId} are active and live.
        </p>
        <button 
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-sm"
        >
          Return to Primary Dashboard
        </button>
      </div>
    </div>
  );
};
