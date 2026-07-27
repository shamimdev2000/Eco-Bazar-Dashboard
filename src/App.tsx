import React, { useState, useMemo } from 'react';
import { TimeRange, OrderStatus, OrderItem, AdminViewId, Customer, InventoryItem, Coupon, Banner, ProductReview, BlogArticle, BlogCategory, BlogComment, StoreSettings, SystemNotificationItem } from './types';
import { 
  INITIAL_ORDERS, 
  TOP_PRODUCTS, 
  CATEGORY_SALES, 
  REVENUE_ANALYTICS, 
  MONTHLY_ORDERS, 
  DAILY_SALES_30D,
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY,
  INITIAL_COUPONS,
  INITIAL_BANNERS,
  INITIAL_REVIEWS,
  INITIAL_BLOGS,
  INITIAL_BLOG_CATEGORIES,
  INITIAL_BLOG_COMMENTS,
  INITIAL_STORE_SETTINGS,
  INITIAL_NOTIFICATIONS,
  MOCK_COUPONS,
  MOCK_FLASH_SALE,
  MOCK_REVIEWS,
  MOCK_MEDIA,
  MOCK_BLOG,
  MOCK_FAQS
} from './data/mockData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AIInsightsBanner } from './components/AIInsightsBanner';
import { KPIGrid } from './components/KPIGrid';
import { SalesAnalyticsChart } from './components/SalesAnalyticsChart';
import { RevenueAnalyticsChart } from './components/RevenueAnalyticsChart';
import { MonthlyOrdersChart } from './components/MonthlyOrdersChart';
import { TopProductsChart } from './components/TopProductsChart';
import { CategorySalesChart } from './components/CategorySalesChart';
import { OrdersTable } from './components/OrdersTable';
import { OrderDetailModal } from './components/OrderDetailModal';
import { CustomerDetailModal } from './components/CustomerDetailModal';
import { CustomerSegmentationView } from './components/CustomerSegmentationView';
import { InventoryView } from './components/InventoryView';
import { CouponsView } from './components/CouponsView';
import { BannerSliderView } from './components/BannerSliderView';
import { ProductReviewsView } from './components/ProductReviewsView';
import { BlogView } from './components/BlogView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { NotificationsView } from './components/NotificationsView';
import { AdminProfileView } from './components/AdminProfileView';
import { UIComponentsShowroomView } from './components/UIComponentsShowroomView';
import { GenericSectionView } from './components/GenericSectionView';

import { 
  Users, 
  Package, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  Crown, 
  UserPlus, 
  Repeat, 
  UserX,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AdminViewId>('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);
  const [blogs, setBlogs] = useState<BlogArticle[]>(INITIAL_BLOGS);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>(INITIAL_BLOG_CATEGORIES);
  const [blogComments, setBlogComments] = useState<BlogComment[]>(INITIAL_BLOG_COMMENTS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);
  const [notifications, setNotifications] = useState<SystemNotificationItem[]>(INITIAL_NOTIFICATIONS);

  const handleSaveStoreSettings = (updated: StoreSettings) => {
    setStoreSettings(updated);
  };

  const handleMarkNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotifRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddNotif = (newNotif: SystemNotificationItem) => {
    setNotifications(prev => [newNotif, ...prev]);
  };

  const [selectedOrderModal, setSelectedOrderModal] = useState<OrderItem | null>(null);
  const [selectedCustomerModal, setSelectedCustomerModal] = useState<Customer | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const handleUpdateCoupon = (updatedCoupon: Coupon) => {
    setCoupons(prev => prev.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
  };

  const handleAddBanner = (newBanner: Banner) => {
    setBanners(prev => [newBanner, ...prev]);
  };

  const handleUpdateBanner = (updatedBanner: Banner) => {
    setBanners(prev => prev.map(b => b.id === updatedBanner.id ? updatedBanner : b));
  };

  const handleDeleteBanner = (bannerId: string) => {
    setBanners(prev => prev.filter(b => b.id !== bannerId));
  };

  const handleReorderBanners = (reordered: Banner[]) => {
    setBanners(reordered);
  };

  const handleApproveReview = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'Approved' } : r));
  };

  const handleRejectReview = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'Rejected' } : r));
  };

  const handleReplyReview = (reviewId: string, replyText: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setReviews(prev => prev.map(r => r.id === reviewId ? {
      ...r,
      adminReply: {
        text: replyText,
        repliedAt: nowStr,
        repliedBy: 'Apex Support Team'
      }
    } : r));
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const handleAddBlogArticle = (article: BlogArticle) => {
    setBlogs(prev => [article, ...prev]);
  };

  const handleUpdateBlogArticle = (article: BlogArticle) => {
    setBlogs(prev => prev.map(a => a.id === article.id ? article : a));
  };

  const handleDeleteBlogArticle = (articleId: string) => {
    setBlogs(prev => prev.filter(a => a.id !== articleId));
  };

  const handleAddBlogCategory = (category: BlogCategory) => {
    setBlogCategories(prev => [...prev, category]);
  };

  const handleApproveBlogComment = (commentId: string) => {
    setBlogComments(prev => prev.map(c => c.id === commentId ? { ...c, status: 'Approved' } : c));
  };

  const handleDeleteBlogComment = (commentId: string) => {
    setBlogComments(prev => prev.filter(c => c.id !== commentId));
  };

  // Low stock count (<10 units)
  const lowStockCount = useMemo(() => {
    return inventory.filter(item => item.stock > 0 && item.stock < 10).length;
  }, [inventory]);

  // Pending orders count
  const pendingCount = useMemo(() => orders.filter(o => o.status === 'Pending').length, [orders]);
  const processingCount = useMemo(() => orders.filter(o => o.status === 'Processing').length, [orders]);
  const deliveredCount = useMemo(() => orders.filter(o => o.status === 'Delivered').length, [orders]);
  const cancelledCount = useMemo(() => orders.filter(o => o.status === 'Cancelled').length, [orders]);

  // Timeframe scalers
  const timeMultipliers: Record<TimeRange, number> = {
    '7d': 0.25,
    '30d': 1.0,
    '90d': 2.8,
    '12m': 11.5,
    'ytd': 6.8
  };

  const currentMultiplier = timeMultipliers[timeRange];
  const totalOrdersCount = Math.round(1613 * currentMultiplier);
  const totalRevenueAmount = Math.round(194000 * currentMultiplier);
  const totalProductsCount = inventory.length;
  const totalCustomersCount = customers.length;

  // Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrderModal && selectedOrderModal.id === orderId) {
      setSelectedOrderModal(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const updatedStatus = newStock === 0 ? 'Out of Stock' : newStock < 10 ? 'Low Stock' : 'In Stock';
        return { ...item, stock: newStock, status: updatedStatus };
      }
      return item;
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['Order ID', 'Customer Name', 'Email', 'Date', 'Amount', 'Status', 'Payment Method', 'Products'],
      ...orders.map(o => [
        o.id,
        `"${o.customerName}"`,
        o.customerEmail,
        o.date,
        o.amount.toFixed(2),
        o.status,
        `"${o.paymentMethod}"`,
        `"${o.productsSummary.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apexstore_report_${currentView}_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans antialiased flex flex-row overflow-x-hidden">
      {/* Sidebar Navigation */}
      {isSidebarOpen && (
        <Sidebar
          currentView={currentView}
          onNavigate={(viewId) => setCurrentView(viewId)}
          lowStockCount={lowStockCount}
          pendingOrdersCount={pendingCount}
        />
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {/* Top Sticky Header */}
        <Header
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExport={handleExportCSV}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* PRIMARY DASHBOARD VIEW */}
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Executive AI Insights */}
              <AIInsightsBanner />

              {/* KPI Metrics Grid */}
              <KPIGrid
                timeRange={timeRange}
                selectedStatus={selectedStatusFilter}
                onSelectStatusFilter={(status) => {
                  setSelectedStatusFilter(status);
                  setCurrentView('orders-all');
                }}
                pendingCount={pendingCount}
                processingCount={processingCount}
                deliveredCount={deliveredCount}
                cancelledCount={cancelledCount}
                totalOrdersCount={totalOrdersCount}
                totalRevenueAmount={totalRevenueAmount}
                totalProductsCount={totalProductsCount}
                totalCustomersCount={totalCustomersCount}
              />

              {/* QUICK FEATURE TEASERS: Customer Segmentation & Real-Time Inventory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Segmentation Shortcut Widget */}
                <div 
                  onClick={() => setCurrentView('customers-segments')}
                  className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 cursor-pointer transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">
                          Customer Segmentation
                        </h3>
                        <p className="text-xs text-slate-400">High-Value, New, Lapsed & Frequent Cohorts</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                        <Crown className="w-3 h-3" /> High-Value
                      </span>
                      <span className="font-bold text-slate-200 block mt-0.5">$842.5k (52%)</span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-semibold">
                        <Repeat className="w-3 h-3" /> Frequent
                      </span>
                      <span className="font-bold text-slate-200 block mt-0.5">$489.2k (30%)</span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                        <UserPlus className="w-3 h-3" /> New Users
                      </span>
                      <span className="font-bold text-slate-200 block mt-0.5">$184.5k (12%)</span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-rose-400 flex items-center gap-1 font-semibold">
                        <UserX className="w-3 h-3" /> Lapsed
                      </span>
                      <span className="font-bold text-slate-200 block mt-0.5">$91.8k (6%)</span>
                    </div>
                  </div>
                </div>

                {/* Real-Time Inventory Tracking Shortcut Widget */}
                <div 
                  onClick={() => setCurrentView('inventory')}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                          Real-Time Inventory Tracking
                        </h3>
                        <p className="text-xs text-slate-400">Low Stock Flags (&lt;10 Units) & Turnover Velocity</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-semibold">Avg Turnover</span>
                      <span className="font-bold text-emerald-400 block mt-0.5">10.4x / year</span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </span>
                      <span className="font-bold text-amber-400 block mt-0.5">{lowStockCount} products</span>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-semibold">In Stock Units</span>
                      <span className="font-bold text-slate-200 block mt-0.5">
                        {inventory.reduce((a, b) => a + b.stock, 0)} units
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row 1: Sales Analytics & Revenue Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesAnalyticsChart data={DAILY_SALES_30D} />
                <RevenueAnalyticsChart data={REVENUE_ANALYTICS} />
              </div>

              {/* Charts Row 2: Monthly Orders & Category Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MonthlyOrdersChart data={MONTHLY_ORDERS} />
                <CategorySalesChart categories={CATEGORY_SALES} />
              </div>

              {/* Top Selling Products */}
              <TopProductsChart products={TOP_PRODUCTS} />

              {/* Recent Orders Table */}
              <OrdersTable
                orders={orders}
                selectedStatus={selectedStatusFilter}
                setSelectedStatus={setSelectedStatusFilter}
                onSelectOrder={(order) => setSelectedOrderModal(order)}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            </div>
          )}

          {/* CUSTOMER SEGMENTATION VIEW */}
          {currentView.startsWith('customers-') && (
            <CustomerSegmentationView
              customers={customers}
              onSelectCustomer={(cust) => setSelectedCustomerModal(cust)}
            />
          )}

          {/* REAL-TIME INVENTORY TRACKING VIEW */}
          {currentView.startsWith('inventory') && (
            <InventoryView
              inventory={inventory}
              onUpdateStock={handleUpdateStock}
              viewId={currentView}
            />
          )}

          {/* ORDERS MANAGEMENT VIEW */}
          {currentView.startsWith('orders-') && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-white capitalize">Orders & Fulfillment Directory</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage orders, customer phone contacts, shipping addresses, payment details, live tracking timelines, and printable invoices.
                  </p>
                </div>
              </div>
              <OrdersTable
                orders={orders}
                selectedStatus={
                  currentView === 'orders-pending' ? 'Pending' :
                  currentView === 'orders-processing' ? 'Processing' :
                  currentView === 'orders-shipped' ? 'Shipped' :
                  currentView === 'orders-delivered' ? 'Delivered' :
                  currentView === 'orders-cancelled' ? 'Cancelled' :
                  selectedStatusFilter
                }
                setSelectedStatus={setSelectedStatusFilter}
                onSelectOrder={(order) => setSelectedOrderModal(order)}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            </div>
          )}

          {/* COUPONS & PROMOTIONS VIEW */}
          {currentView === 'coupons' && (
            <CouponsView
              coupons={coupons}
              onAddCoupon={handleAddCoupon}
              onUpdateCoupon={handleUpdateCoupon}
              onDeleteCoupon={handleDeleteCoupon}
            />
          )}

          {/* BANNER & MARKETING SLIDER VIEW */}
          {(currentView === 'banner-slider' || currentView === 'marketing') && (
            <BannerSliderView
              banners={banners}
              onAddBanner={handleAddBanner}
              onUpdateBanner={handleUpdateBanner}
              onDeleteBanner={handleDeleteBanner}
              onReorderBanners={handleReorderBanners}
            />
          )}

          {/* PRODUCT REVIEWS VIEW */}
          {(currentView === 'products-reviews' || currentView === 'reviews') && (
            <ProductReviewsView
              reviews={reviews}
              onApproveReview={handleApproveReview}
              onRejectReview={handleRejectReview}
              onReplyReview={handleReplyReview}
              onDeleteReview={handleDeleteReview}
            />
          )}

          {/* BLOG & CONTENT MANAGEMENT VIEW */}
          {(currentView === 'blog' || currentView.startsWith('blog')) && (
            <BlogView
              articles={blogs}
              categories={blogCategories}
              comments={blogComments}
              onAddArticle={handleAddBlogArticle}
              onUpdateArticle={handleUpdateBlogArticle}
              onDeleteArticle={handleDeleteBlogArticle}
              onAddCategory={handleAddBlogCategory}
              onApproveComment={handleApproveBlogComment}
              onDeleteComment={handleDeleteBlogComment}
            />
          )}

          {/* ANALYTICS & REPORTS VIEW */}
          {(currentView === 'analytics' || currentView === 'reports' || currentView.startsWith('analytics')) && (
            <AnalyticsView
              salesData={DAILY_SALES_30D}
              revenueData={REVENUE_ANALYTICS}
              topProducts={TOP_PRODUCTS}
              categorySales={CATEGORY_SALES}
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {/* STORE SETTINGS VIEW */}
          {currentView === 'settings' && (
            <SettingsView
              settings={storeSettings}
              onSaveSettings={handleSaveStoreSettings}
            />
          )}

          {/* SYSTEM NOTIFICATIONS VIEW */}
          {currentView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAsRead={handleMarkNotifRead}
              onMarkAllAsRead={handleMarkAllNotifRead}
              onDeleteNotification={handleDeleteNotif}
              onAddNotification={handleAddNotif}
              onNavigateView={(v) => setCurrentView(v)}
            />
          )}

          {/* ADMIN PROFILE VIEW */}
          {currentView === 'admin-profile' && (
            <AdminProfileView />
          )}

          {/* UI COMPONENTS & DESIGN SYSTEM SHOWROOM */}
          {currentView === 'design-system' && (
            <UIComponentsShowroomView />
          )}

          {/* OTHER ADMIN SECTIONS */}
          {!currentView.startsWith('customers-') && 
           !currentView.startsWith('inventory') && 
           !currentView.startsWith('orders-') && 
           !currentView.startsWith('blog') && 
           !currentView.startsWith('analytics') && 
           currentView !== 'dashboard' && 
           currentView !== 'coupons' && 
           currentView !== 'banner-slider' && 
           currentView !== 'marketing' && 
           currentView !== 'products-reviews' && 
           currentView !== 'reviews' && 
           currentView !== 'reports' && 
           currentView !== 'settings' && 
           currentView !== 'notifications' && 
           currentView !== 'admin-profile' && 
           currentView !== 'design-system' && (
            <GenericSectionView
              viewId={currentView}
              orders={orders}
              products={TOP_PRODUCTS}
              coupons={coupons}
              flashSale={MOCK_FLASH_SALE}
              reviews={MOCK_REVIEWS}
              media={MOCK_MEDIA}
              blogs={MOCK_BLOG}
              faqs={MOCK_FAQS}
              onNavigate={(viewId) => setCurrentView(viewId)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}
        </main>

        {/* Order Detail Modal */}
        <OrderDetailModal
          order={selectedOrderModal}
          onClose={() => setSelectedOrderModal(null)}
          onUpdateStatus={handleUpdateOrderStatus}
        />

        {/* Customer Profile Detail Modal */}
        <CustomerDetailModal
          customer={selectedCustomerModal}
          orders={orders}
          onClose={() => setSelectedCustomerModal(null)}
          onSelectOrder={(order) => setSelectedOrderModal(order)}
        />

        {/* Global Footer */}
        <footer className="bg-slate-950 border-t border-slate-800/80 py-4 mt-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>ApexStore Back-Office Suite • Executive Customer & Real-Time Inventory Control</span>
            <span className="text-slate-600">Sync: Live • 2026-07-27</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

