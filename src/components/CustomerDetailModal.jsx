import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  ShoppingBag, 
  Heart, 
  Star, 
  Calendar, 
  Crown, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  CreditCard,
  Building2,
  Trash2,
  Edit2,
  Send,
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const CustomerDetailModal = ({
  customer,
  orders,
  onClose,
  onSelectOrder
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    isDefault: false,
    recipientName: customer?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: customer?.phone || ''
  });

  const [addressesState, setAddressesState] = useState(() => {
    if (!customer) return [];
    if (customer.addresses && customer.addresses.length > 0) return customer.addresses;
    return [
      {
        id: `addr-default-${customer.id}`,
        label: 'Home',
        isDefault: true,
        recipientName: customer.name,
        street: customer.location.includes(',') ? '123 Main St' : customer.location,
        city: customer.location.split(',')[0] || 'Springfield',
        state: customer.location.split(',')[1]?.trim() || 'IL',
        zipCode: '90210',
        country: 'United States',
        phone: customer.phone || '+1 (555) 019-2831'
      }
    ];
  });

  const [wishlistState, setWishlistState] = useState(() => {
    if (!customer) return [];
    if (customer.wishlist && customer.wishlist.length > 0) return customer.wishlist;
    return [
      { id: 'wl-def-1', productId: 'PRD-KEY-003', name: 'Custom Mechanical Keyboard 75%', price: 280.00, inStock: true, addedDate: '2026-07-20', category: 'Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=80' },
      { id: 'wl-def-2', productId: 'PRD-MON-001', name: 'UltraWide Curved Monitor 34"', price: 1249.50, inStock: true, addedDate: '2026-07-15', category: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&auto=format&fit=crop&q=80' }
    ];
  });

  const [reviewsState, setReviewsState] = useState(() => {
    if (!customer) return [];
    if (customer.reviews && customer.reviews.length > 0) return customer.reviews;
    return [
      { id: 'rev-def-1', productId: 'PRD-HEAD-001', productName: 'Pro Wireless ANC Headphones', rating: 5, title: 'Absolute sound quality masterpiece!', comment: 'The noise cancellation is astonishingly good during long travel. Battery lasts forever.', date: customer.lastOrderDate, verified: true, helpfulVotes: 18 }
    ];
  });

  const [actionNotice, setActionNotice] = useState(null);

  if (!customer) return null;

  // Filter orders related to this customer
  const customerOrders = orders.filter(
    o => o.customerEmail.toLowerCase() === customer.email.toLowerCase() ||
         o.customerName.toLowerCase() === customer.name.toLowerCase()
  );

  const phone = customer.phone || '+1 (555) 019-2831';

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city) return;

    const created = {
      id: `addr-${Date.now()}`,
      label: newAddr.label || 'Home',
      isDefault: addressesState.length === 0 || !!newAddr.isDefault,
      recipientName: newAddr.recipientName || customer.name,
      street: newAddr.street || '',
      city: newAddr.city || '',
      state: newAddr.state || '',
      zipCode: newAddr.zipCode || '',
      country: newAddr.country || 'United States',
      phone: newAddr.phone || phone
    };

    if (created.isDefault) {
      setAddressesState(prev => prev.map(a => ({ ...a, isDefault: false })).concat(created));
    } else {
      setAddressesState(prev => [...prev, created]);
    }

    setShowAddAddress(false);
    setActionNotice('New address saved to customer profile!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleRemoveAddress = (id) => {
    setAddressesState(prev => prev.filter(a => a.id !== id));
    setActionNotice('Address removed from profile.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleRemoveWishlist = (id) => {
    setWishlistState(prev => prev.filter(w => w.id !== id));
    setActionNotice('Item removed from customer wishlist.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {customer.avatar ? (
                <img 
                  src={customer.avatar} 
                  alt={customer.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-xl text-white border-2 border-indigo-400">
                  {customer.name.charAt(0)}
                </div>
              )}
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                customer.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{customer.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <Crown className="w-3 h-3" /> {customer.segment}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-indigo-400" /> {customer.email}</span>
                <span className="flex items-center gap-1 font-mono"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {customer.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                alert(`Direct campaign email drafted for ${customer.email}`);
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Email Customer
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Total Spending & Financial Overview Banner */}
        <div className="bg-slate-950/60 px-6 py-4 border-b border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Total Spending
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5 font-mono">
              ${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Top Tier LTV
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" /> Lifetime Orders
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5 font-mono">
              {customer.ordersCount} orders
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              First order: {customer.firstOrderDate}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> Avg Order Value
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5 font-mono">
              ${customer.avgOrderValue.toFixed(2)}
            </div>
            <div className="text-[10px] text-cyan-400 font-semibold mt-0.5">
              High Basket Size
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Saved Wishlist
            </div>
            <div className="text-xl font-extrabold text-white mt-0.5 font-mono">
              {wishlistState.length} saved
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Active interest items
            </div>
          </div>
        </div>

        {actionNotice && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-6 py-2 text-xs font-bold text-emerald-400 flex items-center justify-between">
            <span>{actionNotice}</span>
            <button onClick={() => setActionNotice(null)} className="hover:underline">Dismiss</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-800 bg-slate-900/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" /> Profile Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders ({customerOrders.length || customer.ordersCount})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({wishlistState.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-4 h-4" /> Reviews ({reviewsState.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses ({addressesState.length})
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Account Identity & Status
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Customer ID:</span>
                      <span className="font-mono font-bold text-white">{customer.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Account Status:</span>
                      <span className="font-bold text-emerald-400">{customer.status}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Behavioral Segment:</span>
                      <span className="font-semibold text-amber-400">{customer.segment}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Primary Language:</span>
                      <span className="text-slate-200">English (US)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-400" /> Engagement Timestamps
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">First Purchase:</span>
                      <span className="font-mono text-slate-200">{customer.firstOrderDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Latest Purchase:</span>
                      <span className="font-mono text-indigo-400 font-bold">{customer.lastOrderDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Order Frequency:</span>
                      <span className="text-slate-200">~1.5 orders / month</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Marketing Opt-in:</span>
                      <span className="text-emerald-400 font-bold">Subscribed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Addresses Snapshot */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Default Shipping Address
                  </h4>
                  <button onClick={() => setActiveTab('addresses')} className="text-xs text-indigo-400 hover:underline">
                    Manage Addresses ({addressesState.length})
                  </button>
                </div>
                {addressesState.find(a => a.isDefault) ? (
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <p className="font-bold text-white">{addressesState.find(a => a.isDefault)?.recipientName}</p>
                    <p>{addressesState.find(a => a.isDefault)?.street}</p>
                    <p>{addressesState.find(a => a.isDefault)?.city}, {addressesState.find(a => a.isDefault)?.state} {addressesState.find(a => a.isDefault)?.zipCode}</p>
                    <p className="text-slate-400 font-mono mt-1">{addressesState.find(a => a.isDefault)?.phone}</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No default address configured.</p>
                )}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer Order History ({customerOrders.length || customer.ordersCount} Total)
                </h4>
              </div>

              {customerOrders.length === 0 ? (
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8 text-center space-y-2">
                  <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="font-bold text-slate-300">Registered Lifetime Orders: {customer.ordersCount}</p>
                  <p className="text-xs text-slate-500">Total Spent: ${customer.totalSpent.toFixed(2)} across {customer.ordersCount} historical checkout sessions.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Summary</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {customerOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-indigo-400">{ord.id}</td>
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{ord.date}</td>
                          <td className="py-3 px-4 max-w-xs truncate text-slate-200" title={ord.productsSummary}>{ord.productsSummary}</td>
                          <td className="py-3 px-4 text-slate-300">{ord.paymentMethod}</td>
                          <td className="py-3 px-4 text-right font-bold text-white font-mono">${ord.amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {onSelectOrder && (
                              <button
                                onClick={() => {
                                  onClose();
                                  onSelectOrder(ord);
                                }}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-bold transition-all flex items-center gap-1 ml-auto"
                              >
                                View <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer Wishlist Items ({wishlistState.length})
                </h4>
                <button
                  onClick={() => {
                    setActionNotice(`15% discount coupon code generated & sent to ${customer.email} for wishlist items!`);
                    setTimeout(() => setActionNotice(null), 4000);
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Send Wishlist Discount
                </button>
              </div>

              {wishlistState.length === 0 ? (
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8 text-center space-y-2">
                  <Heart className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="font-bold text-slate-300">No wishlist items</p>
                  <p className="text-xs text-slate-500">Customer has not added any products to their wishlist.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistState.map((item) => (
                    <div key={item.id} className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-rose-400" />
                          </div>
                        )}
                        <div>
                          <h5 className="font-bold text-xs text-white">{item.name}</h5>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="font-mono font-bold text-emerald-400">${item.price.toFixed(2)}</span>
                            <span>•</span>
                            <span className={item.inStock ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                              {item.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">Added: {item.addedDate}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveWishlist(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Product Reviews Written by {customer.name} ({reviewsState.length})
              </h4>

              {reviewsState.length === 0 ? (
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8 text-center space-y-2">
                  <Star className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="font-bold text-slate-300">No reviews submitted</p>
                  <p className="text-xs text-slate-500">Customer has not published product feedback yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviewsState.map((rev) => (
                    <div key={rev.id} className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{rev.productName}</span>
                          {rev.verified && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{rev.date}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-white ml-2">{rev.title}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Customer Shipping & Billing Addresses ({addressesState.length})
                </h4>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Address
                </button>
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <form onSubmit={handleAddAddressSubmit} className="bg-slate-800/80 border border-indigo-500/40 rounded-xl p-4 space-y-3">
                  <h5 className="font-bold text-xs text-white">Add New Address to Profile</h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Address Label</label>
                      <select
                        value={newAddr.label}
                        onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Billing">Billing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={newAddr.recipientName}
                        onChange={(e) => setNewAddr({ ...newAddr, recipientName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-slate-400 block mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        placeholder="742 Evergreen Terrace"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        placeholder="Springfield"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">State / Region</label>
                      <input
                        type="text"
                        required
                        placeholder="IL"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Zip / Postal Code</label>
                      <input
                        type="text"
                        required
                        placeholder="62704"
                        value={newAddr.zipCode}
                        onChange={(e) => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addressesState.map((addr) => (
                  <div key={addr.id} className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-white flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {addr.label} Address
                        </span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Primary Default
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed space-y-0.5">
                        <p className="font-bold text-white">{addr.recipientName}</p>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p className="text-slate-400">{addr.country}</p>
                        <p className="text-slate-400 font-mono text-[11px] pt-1">Phone: {addr.phone}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      {!addr.isDefault && (
                        <button
                          onClick={() => {
                            setAddressesState(prev => prev.map(a => ({ ...a, isDefault: a.id === addr.id })));
                            setActionNotice(`Default address updated to ${addr.label}!`);
                            setTimeout(() => setActionNotice(null), 3000);
                          }}
                          className="text-[11px] text-indigo-400 hover:underline"
                        >
                          Make Default
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveAddress(addr.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors ml-auto"
                        title="Delete Address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors border border-slate-700"
          >
            Close Customer Profile
          </button>
        </div>
      </div>
    </div>
  );
};
