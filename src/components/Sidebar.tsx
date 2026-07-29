import React, { useState } from 'react';
import { AdminViewId } from '../types';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Ticket,
  Zap,
  Package,
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
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Layers,
  Leaf,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentView: AdminViewId;
  onNavigate: (viewId: AdminViewId) => void;
  isOpen?: boolean;
  onCloseMobile?: () => void;
  lowStockCount?: number;
  pendingOrdersCount?: number;
  currentUser?: { name: string; email: string; role: string };
  onLogout?: () => void;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
  defaultView?: AdminViewId;
  children?: {
    id: AdminViewId;
    label: string;
    badge?: string | number;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen = true,
  onCloseMobile,
  lowStockCount = 0,
  pendingOrdersCount = 0,
  currentUser = { name: 'Alexander Wright', email: 'admin@ecobazar.io', role: 'Super Admin' },
  onLogout
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AD';
  };
  // Track expanded parent accordions
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    products: currentView.startsWith('products-'),
    orders: currentView.startsWith('orders-'),
    customers: currentView.startsWith('customers-'),
    inventory: currentView.startsWith('inventory'),
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      defaultView: 'dashboard'
    },
    {
      id: 'products',
      label: 'Products',
      icon: <ShoppingBag className="w-4 h-4" />,
      children: [
        { id: 'products-all', label: 'All Products' },
        { id: 'products-add', label: 'Add Product' },
        { id: 'products-categories', label: 'Categories' },
        { id: 'products-brands', label: 'Brands' },
        { id: 'products-tags', label: 'Tags' },
        { id: 'products-reviews', label: 'Product Reviews' },
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
      children: [
        { id: 'orders-all', label: 'All Orders' },
        { id: 'orders-pending', label: 'Pending', badge: pendingOrdersCount || undefined },
        { id: 'orders-processing', label: 'Processing' },
        { id: 'orders-shipped', label: 'Shipped' },
        { id: 'orders-delivered', label: 'Delivered' },
        { id: 'orders-cancelled', label: 'Cancelled' },
        { id: 'orders-returns', label: 'Returns' },
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users className="w-4 h-4" />,
      children: [
        { id: 'customers-all', label: 'All Customers' },
        { id: 'customers-segments', label: 'Segmentation & Cohorts' },
        { id: 'customers-details', label: 'Customer Details' },
        { id: 'customers-wishlist', label: 'Wishlist' },
      ]
    },
    {
      id: 'coupons',
      label: 'Coupons',
      icon: <Ticket className="w-4 h-4" />,
      defaultView: 'coupons'
    },
    {
      id: 'flash-sale',
      label: 'Flash Sale',
      icon: <Zap className="w-4 h-4" />,
      defaultView: 'flash-sale'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <Package className="w-4 h-4" />,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
      children: [
        { id: 'inventory-stock', label: 'Stock Overview' },
        { id: 'inventory-low', label: 'Low Stock', badge: lowStockCount || undefined },
        { id: 'inventory-out', label: 'Out of Stock' },
        { id: 'inventory-history', label: 'Stock History' },
        { id: 'inventory-adjustment', label: 'Stock Adjustment' },
      ]
    },
    {
      id: 'media-library',
      label: 'Media Library',
      icon: <FolderImage className="w-4 h-4" />,
      defaultView: 'media-library'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart2 className="w-4 h-4" />,
      defaultView: 'analytics'
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: <Megaphone className="w-4 h-4" />,
      defaultView: 'marketing'
    },
    {
      id: 'banner-slider',
      label: 'Banner Slider',
      icon: <Sliders className="w-4 h-4" />,
      defaultView: 'banner-slider'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: <MessageSquareQuote className="w-4 h-4" />,
      defaultView: 'testimonials'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: <FileText className="w-4 h-4" />,
      defaultView: 'blog'
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: <HelpCircle className="w-4 h-4" />,
      defaultView: 'faq'
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      icon: <Mail className="w-4 h-4" />,
      defaultView: 'newsletter'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      defaultView: 'notifications'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-4 h-4" />,
      defaultView: 'messages'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      defaultView: 'reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      defaultView: 'settings'
    },
    {
      id: 'admin-profile',
      label: 'Admin Profile',
      icon: <UserCheck className="w-4 h-4" />,
      defaultView: 'admin-profile'
    },
    {
      id: 'design-system',
      label: 'UI Components',
      icon: <Layers className="w-4 h-4" />,
      badge: '27',
      badgeColor: 'bg-indigo-600 text-white font-bold',
      defaultView: 'design-system'
    }
  ];

  return (
    <aside className="w-64 bg-[#0d0d0d] border-r border-slate-800 flex flex-col shrink-0 text-slate-300 min-h-screen transition-all duration-200">
      {/* Brand Logo Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white tracking-tight flex items-center gap-1.5">
              Eco-Bazar <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-semibold border border-emerald-500/30">ECO</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Eco-Bazar Dashboard</div>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar text-xs">
        {navGroups.map((group) => {
          const hasChildren = group.children && group.children.length > 0;
          const isExpanded = !!expandedGroups[group.id];
          const isGroupActive = group.defaultView
            ? currentView === group.defaultView
            : group.children?.some(c => c.id === currentView);

          if (!hasChildren) {
            return (
              <button
                key={group.id}
                onClick={() => {
                  if (group.defaultView) onNavigate(group.defaultView);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  isGroupActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isGroupActive ? 'text-white' : 'text-slate-400'}>{group.icon}</span>
                  <span>{group.label}</span>
                </div>
                {group.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${group.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {group.badge}
                  </span>
                )}
              </button>
            );
          }

          return (
            <div key={group.id} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  isGroupActive
                    ? 'bg-slate-900 text-white font-semibold border border-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isGroupActive ? 'text-indigo-400' : 'text-slate-400'}>{group.icon}</span>
                  <span>{group.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {group.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${group.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {group.badge}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Sub-menu Items */}
              {isExpanded && (
                <div className="pl-8 pr-1 space-y-1 py-0.5 border-l border-slate-800/80 ml-4">
                  {group.children?.map((child) => {
                    const isChildActive = currentView === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => {
                          onNavigate(child.id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          isChildActive
                            ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                        }`}
                      >
                        <span>{child.label}</span>
                        {child.badge && (
                          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-bold">
                            {child.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile Status & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
          <div 
            onClick={() => onNavigate('admin-profile')}
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer hover:opacity-80 transition-all"
            title="View Admin Profile"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0">
              {getInitials(currentUser.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 active:scale-95"
              title="Log Out Admin Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
