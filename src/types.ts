export type TimeRange = '7d' | '30d' | '90d' | '12m' | 'ytd';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returns';

export type CustomerSegmentType = 'High-Value Customers' | 'New Customers' | 'Lapsed Customers' | 'Frequent Buyers';

export interface CustomerAddress {
  id: string;
  label: 'Home' | 'Work' | 'Billing' | 'Other';
  isDefault: boolean;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface CustomerWishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  inStock: boolean;
  addedDate: string;
  image?: string;
  category?: string;
}

export interface CustomerReviewItem {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpfulVotes?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  location: string;
  segment: CustomerSegmentType;
  totalSpent: number;
  ordersCount: number;
  avgOrderValue: number;
  firstOrderDate: string;
  lastOrderDate: string;
  wishlistCount: number;
  status: 'Active' | 'Inactive';
  addresses?: CustomerAddress[];
  wishlist?: CustomerWishlistItem[];
  reviews?: CustomerReviewItem[];
}

export interface CustomerSegmentSummary {
  segment: CustomerSegmentType;
  customerCount: number;
  totalRevenue: number;
  revenuePercent: number;
  totalOrders: number;
  orderVolumePercent: number;
  avgOrderValue: number;
  growthRate: number;
  description: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  reorderPoint: number; // e.g., 10 units
  turnoverRate: number; // Annual turnover rate (e.g. 8.4x)
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastRestocked: string;
  monthlySalesVelocity: number; // units per month
  image: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: 'Percentage' | 'Fixed Amount' | 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  usageCount: number;
  usageLimit: number | null;
  expiryDate: string;
  status: 'Active' | 'Inactive' | 'Expired' | 'Scheduled';
  createdAt?: string;
}

export type BannerType = 'Homepage Banner' | 'Offer Banner' | 'Category Banner' | 'Popup Banner';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  type: BannerType;
  category?: string;
  imageUrl: string;
  badgeText?: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  status: 'Active' | 'Inactive' | 'Scheduled';
  discountTag?: string;
  startDate?: string;
  endDate?: string;
  clicksCount: number;
  impressionsCount: number;
  backgroundColor?: string;
}

export interface FlashSaleItem {
  id: string;
  productName: string;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  soldUnits: number;
  totalUnits: number;
  endsIn: string;
  status: 'Active' | 'Ended' | 'Upcoming';
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'document' | 'video';
  url: string;
  size: string;
  dimensions?: string;
  uploadedDate: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  channel: 'Email' | 'SMS' | 'Push Notification' | 'Social';
  subscribersCount: number;
  openRate: number;
  clickRate: number;
  status: 'Active' | 'Draft' | 'Completed';
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedDate: string;
  views: number;
  status: 'Published' | 'Draft';
  imageUrl?: string;
  excerpt?: string;
  content?: string;
  readTime?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  description: string;
}

export interface BlogComment {
  id: string;
  articleId: string;
  articleTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Spam';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
}

export interface AdminReviewReply {
  text: string;
  repliedAt: string;
  repliedBy: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  verifiedPurchase: boolean;
  adminReply?: AdminReviewReply;
  helpfulCount: number;
}

export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  changePercent: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  timeframe: string;
  iconName: string;
  category: 'primary' | 'status';
  statusType?: OrderStatus;
  count?: number;
}

export interface SalesAnalyticsPoint {
  date: string;
  sales: number;
  orders: number;
  conversionRate: number;
}

export interface RevenueAnalyticsPoint {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  target: number;
}

export interface MonthlyOrderPoint {
  month: string;
  delivered: number;
  processing: number;
  pending: number;
  cancelled: number;
  total: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  salesCount: number;
  revenue: number;
  stock: number;
  rating: number;
  image: string;
  growth: number;
}

export interface CategorySale {
  name: string;
  sales: number;
  revenue: number;
  color: string;
  percentage: number;
}

export interface OrderTimelineStep {
  status: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderLineItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderItem {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAvatar?: string;
  date: string;
  amount: number;
  itemsCount: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  shippingCarrier?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  productsSummary: string;
  lineItems?: OrderLineItem[];
  timeline?: OrderTimelineStep[];
}

export interface StoreSettings {
  storeName: string;
  storeLogo: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  taxType: 'Inclusive' | 'Exclusive';
  shippingCharge: number;
  freeShippingThreshold: number;
  deliveryAreas: string[];
  supportedCountries: string[];
  paymentGateways: {
    stripeEnabled: boolean;
    stripePublicKey: string;
    stripeSecretKey: string;
    paypalEnabled: boolean;
    paypalClientId: string;
    codEnabled: boolean;
    applePayEnabled: boolean;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  smtp: {
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'TLS' | 'SSL' | 'None';
    fromEmail: string;
    fromName: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    canonicalUrl: string;
    ogImage: string;
  };
  googleAnalyticsId: string;
  facebookPixelId: string;
}

export interface SystemNotificationItem {
  id: string;
  type: 'low_stock' | 'new_order' | 'payment_success' | 'cancelled_order' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'High' | 'Medium' | 'Low';
  actionUrl?: string;
  relatedId?: string;
}

export type AdminViewId = 
  | 'dashboard'
  | 'products-all'
  | 'products-add'
  | 'products-categories'
  | 'products-brands'
  | 'products-tags'
  | 'products-reviews'
  | 'orders-all'
  | 'orders-pending'
  | 'orders-processing'
  | 'orders-shipped'
  | 'orders-delivered'
  | 'orders-cancelled'
  | 'orders-returns'
  | 'customers-all'
  | 'customers-segments'
  | 'customers-details'
  | 'customers-wishlist'
  | 'coupons'
  | 'flash-sale'
  | 'inventory'
  | 'inventory-stock'
  | 'inventory-low'
  | 'inventory-out'
  | 'inventory-history'
  | 'inventory-adjustment'
  | 'media-library'
  | 'analytics'
  | 'marketing'
  | 'banner-slider'
  | 'testimonials'
  | 'blog'
  | 'faq'
  | 'newsletter'
  | 'notifications'
  | 'messages'
  | 'reports'
  | 'settings'
  | 'admin-profile'
  | 'design-system';

