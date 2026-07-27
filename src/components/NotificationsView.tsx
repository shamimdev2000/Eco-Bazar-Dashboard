import React, { useState } from 'react';
import { SystemNotificationItem, AdminViewId } from '../types';
import { 
  Bell, 
  AlertTriangle, 
  ShoppingBag, 
  CheckCircle2, 
  XCircle, 
  Server, 
  Filter, 
  Check, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  Clock, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: SystemNotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onAddNotification: (notification: SystemNotificationItem) => void;
  onNavigateView: (view: AdminViewId) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onAddNotification,
  onNavigateView
}) => {
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'low_stock' | 'new_order' | 'payment_success' | 'cancelled_order' | 'system'
  >('all');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredNotifications = notifications.filter(n => {
    if (selectedFilter === 'all') return true;
    return n.type === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // SIMULATE EVENTS
  const simulateEvent = (type: 'low_stock' | 'new_order' | 'payment_success' | 'cancelled_order' | 'system') => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newId = `NOTIF-${Date.now().toString().slice(-4)}`;

    let newNotif: SystemNotificationItem;

    switch (type) {
      case 'low_stock':
        newNotif = {
          id: newId,
          type: 'low_stock',
          title: 'Low Stock Alert Triggered',
          message: 'Ergonomic Mesh Chair inventory has dropped to 3 units (Threshold: 10 units). Auto-restock order drafted.',
          timestamp,
          read: false,
          priority: 'High',
          actionUrl: 'inventory-low',
          relatedId: 'PROD-102'
        };
        break;
      case 'new_order':
        newNotif = {
          id: newId,
          type: 'new_order',
          title: 'New Instant Order Placed (#ORD-8843)',
          message: 'Customer Elena Rostova placed a $499.00 order via Apple Pay.',
          timestamp,
          read: false,
          priority: 'High',
          actionUrl: 'orders-all',
          relatedId: 'ORD-8843'
        };
        break;
      case 'payment_success':
        newNotif = {
          id: newId,
          type: 'payment_success',
          title: 'Payment Settlement Received',
          message: 'PayPal payment tx_99210488 confirmed settlement of $320.00.',
          timestamp,
          read: false,
          priority: 'Medium',
          actionUrl: 'orders-all'
        };
        break;
      case 'cancelled_order':
        newNotif = {
          id: newId,
          type: 'cancelled_order',
          title: 'Customer Order Cancelled (#ORD-8829)',
          message: 'Order #ORD-8829 was cancelled. Refund processed & stock restored.',
          timestamp,
          read: false,
          priority: 'High',
          actionUrl: 'orders-cancelled'
        };
        break;
      case 'system':
      default:
        newNotif = {
          id: newId,
          type: 'system',
          title: 'System Security & Webhook Audit',
          message: 'Stripe webhook signature verified successfully. API keys up to date.',
          timestamp,
          read: false,
          priority: 'Low',
          actionUrl: 'settings'
        };
        break;
    }

    onAddNotification(newNotif);
    triggerToast(`Simulated Event: ${newNotif.title}`);
  };

  const getTypeBadge = (type: SystemNotificationItem['type']) => {
    switch (type) {
      case 'low_stock':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Low Stock
          </span>
        );
      case 'new_order':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
            <ShoppingBag className="w-3 h-3" /> New Order
          </span>
        );
      case 'payment_success':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Payment Success
          </span>
        );
      case 'cancelled_order':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Cancelled Order
          </span>
        );
      case 'system':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
            <Server className="w-3 h-3" /> System Event
          </span>
        );
    }
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

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">System Notifications & Event Alerts</h1>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 font-bold text-[10px] rounded-full border border-rose-500/30">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live automated system event triggers for low inventory stock, new incoming orders, payment settlements, order cancellations, and server audits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllAsRead}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4 text-emerald-400" /> Mark All as Read
          </button>
        </div>
      </div>

      {/* QUICK EVENT SIMULATOR BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive Event Simulation Triggers:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => simulateEvent('low_stock')}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> + Trigger Low Stock
          </button>
          <button
            onClick={() => simulateEvent('new_order')}
            className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> + Trigger New Order
          </button>
          <button
            onClick={() => simulateEvent('payment_success')}
            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> + Trigger Payment Success
          </button>
          <button
            onClick={() => simulateEvent('cancelled_order')}
            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" /> + Trigger Order Cancelled
          </button>
          <button
            onClick={() => simulateEvent('system')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <Server className="w-3.5 h-3.5" /> + Trigger System Log
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Notifications', count: notifications.length },
          { id: 'low_stock', label: 'Low Stock', count: notifications.filter(n => n.type === 'low_stock').length },
          { id: 'new_order', label: 'New Orders', count: notifications.filter(n => n.type === 'new_order').length },
          { id: 'payment_success', label: 'Payment Success', count: notifications.filter(n => n.type === 'payment_success').length },
          { id: 'cancelled_order', label: 'Cancelled Orders', count: notifications.filter(n => n.type === 'cancelled_order').length },
          { id: 'system', label: 'System Logs', count: notifications.filter(n => n.type === 'system').length },
        ].map((tab) => {
          const active = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                active 
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                active ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* NOTIFICATION FEED LIST */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Bell className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-slate-400">No notifications found in this category</div>
            <p className="text-xs text-slate-500">Click any simulation button above to generate a new event.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                notif.read 
                  ? 'bg-slate-900/60 border-slate-800/80 opacity-80' 
                  : 'bg-slate-900 border-indigo-500/40 shadow-lg shadow-indigo-950/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-1">{getTypeBadge(notif.type)}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {notif.timestamp}
                    </span>
                    <span>• Priority: <strong className={notif.priority === 'High' ? 'text-rose-400' : 'text-slate-400'}>{notif.priority}</strong></span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {notif.actionUrl && (
                  <button
                    onClick={() => {
                      onMarkAsRead(notif.id);
                      onNavigateView(notif.actionUrl as AdminViewId);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <span>View Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {!notif.read && (
                  <button
                    onClick={() => onMarkAsRead(notif.id)}
                    title="Mark as read"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                  </button>
                )}

                <button
                  onClick={() => onDeleteNotification(notif.id)}
                  title="Delete notification"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-500 hover:text-rose-400 rounded-xl border border-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
