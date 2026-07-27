import {
  SalesAnalyticsPoint,
  RevenueAnalyticsPoint,
  MonthlyOrderPoint,
  TopProduct,
  CategorySale,
  OrderItem,
  Customer,
  CustomerSegmentSummary,
  InventoryItem,
  Coupon,
  FlashSaleItem,
  ProductReview,
  MediaItem,
  MarketingCampaign,
  BlogArticle,
  BlogCategory,
  BlogComment,
  FAQItem,
  Banner,
  StoreSettings,
  SystemNotificationItem
} from '../types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-1001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-5678',
    location: 'Springfield, IL',
    segment: 'High-Value Customers',
    totalSpent: 4890.50,
    ordersCount: 18,
    avgOrderValue: 271.69,
    firstOrderDate: '2024-02-14',
    lastOrderDate: '2026-07-27',
    wishlistCount: 5,
    status: 'Active',
    addresses: [
      {
        id: 'addr-101',
        label: 'Home',
        isDefault: true,
        recipientName: 'Sarah Jenkins',
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62704',
        country: 'United States',
        phone: '+1 (555) 234-5678'
      },
      {
        id: 'addr-102',
        label: 'Work',
        isDefault: false,
        recipientName: 'Sarah Jenkins (Office)',
        street: '100 Commercial Blvd, Suite 400',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        country: 'United States',
        phone: '+1 (555) 234-9988'
      }
    ],
    wishlist: [
      { id: 'wl-1', productId: 'PRD-KEY-003', name: 'Custom Mechanical Keyboard 75%', price: 280.00, inStock: true, addedDate: '2026-07-20', category: 'Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=80' },
      { id: 'wl-2', productId: 'PRD-MON-001', name: 'UltraWide Curved Monitor 34"', price: 1249.50, inStock: true, addedDate: '2026-07-15', category: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&auto=format&fit=crop&q=80' },
      { id: 'wl-3', productId: 'PRD-DESK-010', name: 'Walnut Wood Monitor Stand Riser', price: 120.00, inStock: true, addedDate: '2026-07-02', category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'rev-1', productId: 'PRD-HEAD-001', productName: 'Pro Wireless ANC Headphones', rating: 5, title: 'Absolute sound quality masterpiece!', comment: 'The noise cancellation is astonishingly good during long flights. Battery easily lasts 30+ hours.', date: '2026-07-22', verified: true, helpfulVotes: 24 },
      { id: 'rev-2', productId: 'PRD-MAT-005', productName: 'Executive Vegan Leather Desk Mat', rating: 5, title: 'Smooth texture & durable stitching', comment: 'Lays completely flat right out of the box. Protects my desk surface beautifully.', date: '2026-06-14', verified: true, helpfulVotes: 12 }
    ]
  },
  {
    id: 'CUST-1002',
    name: 'Marcus Vance',
    email: 'm.vance@techcorp.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 876-5432',
    location: 'Austin, TX',
    segment: 'High-Value Customers',
    totalSpent: 8940.00,
    ordersCount: 14,
    avgOrderValue: 638.57,
    firstOrderDate: '2023-11-10',
    lastOrderDate: '2026-07-27',
    wishlistCount: 12,
    status: 'Active',
    addresses: [
      {
        id: 'addr-201',
        label: 'Work',
        isDefault: true,
        recipientName: 'Marcus Vance (TechCorp HQ)',
        street: '100 Cyber Way, Floor 12',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'United States',
        phone: '+1 (555) 876-5432'
      }
    ],
    wishlist: [
      { id: 'wl-4', productId: 'PRD-MON-001', name: 'UltraWide Curved Monitor 34"', price: 1249.50, inStock: true, addedDate: '2026-07-25', category: 'Monitors' },
      { id: 'wl-5', productId: 'PRD-CHAIR-001', name: 'Ergonomic Mesh Task Chair', price: 890.00, inStock: false, addedDate: '2026-07-10', category: 'Furniture' }
    ],
    reviews: [
      { id: 'rev-3', productId: 'PRD-MON-001', productName: 'UltraWide Curved Monitor 34"', rating: 5, title: 'Game-changer for developer multi-tasking', comment: 'Replacing two 27-inch screens with this single 34-inch curved display was the best upgrade ever.', date: '2026-07-27', verified: true, helpfulVotes: 38 }
    ]
  },
  {
    id: 'CUST-1003',
    name: 'Elena Rostova',
    email: 'elena.rostova@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    phone: '+61 412 345 678',
    location: 'Sydney, Australia',
    segment: 'Frequent Buyers',
    totalSpent: 2850.20,
    ordersCount: 22,
    avgOrderValue: 129.55,
    firstOrderDate: '2024-08-01',
    lastOrderDate: '2026-07-26',
    wishlistCount: 3,
    status: 'Active'
  },
  {
    id: 'CUST-1004',
    name: 'David Chen',
    email: 'david.chen@designhub.net',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 345-6789',
    location: 'San Francisco, CA',
    segment: 'Frequent Buyers',
    totalSpent: 3420.00,
    ordersCount: 19,
    avgOrderValue: 180.00,
    firstOrderDate: '2024-05-18',
    lastOrderDate: '2026-07-26',
    wishlistCount: 8,
    status: 'Active'
  },
  {
    id: 'CUST-1005',
    name: 'Jessica Taylor',
    email: 'jtaylor89@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    segment: 'Lapsed Customers',
    totalSpent: 640.00,
    ordersCount: 3,
    avgOrderValue: 213.33,
    firstOrderDate: '2024-01-15',
    lastOrderDate: '2025-08-10',
    wishlistCount: 1,
    status: 'Inactive'
  },
  {
    id: 'CUST-1006',
    name: 'Liam O\'Connor',
    email: 'loconnor@dublin.ie',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    phone: '+353 87 123 4567',
    location: 'Dublin, Ireland',
    segment: 'New Customers',
    totalSpent: 680.20,
    ordersCount: 1,
    avgOrderValue: 680.20,
    firstOrderDate: '2026-07-25',
    lastOrderDate: '2026-07-25',
    wishlistCount: 4,
    status: 'Active'
  },
  {
    id: 'CUST-1007',
    name: 'Amara Patel',
    email: 'amara.p@techsolutions.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 432-1098',
    location: 'New York, NY',
    segment: 'New Customers',
    totalSpent: 210.00,
    ordersCount: 1,
    avgOrderValue: 210.00,
    firstOrderDate: '2026-07-24',
    lastOrderDate: '2026-07-24',
    wishlistCount: 2,
    status: 'Active'
  },
  {
    id: 'CUST-1008',
    name: 'Robert Martinez',
    email: 'robert.m@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 654-3210',
    location: 'Los Angeles, CA',
    segment: 'Lapsed Customers',
    totalSpent: 410.00,
    ordersCount: 4,
    avgOrderValue: 102.50,
    firstOrderDate: '2023-09-04',
    lastOrderDate: '2025-06-18',
    wishlistCount: 0,
    status: 'Inactive'
  },
  {
    id: 'CUST-1009',
    name: 'Chloe Bennett',
    email: 'chloe.b@stylehub.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    phone: '+1 (555) 789-0123',
    location: 'Chicago, IL',
    segment: 'High-Value Customers',
    totalSpent: 6120.80,
    ordersCount: 12,
    avgOrderValue: 510.06,
    firstOrderDate: '2024-03-22',
    lastOrderDate: '2026-07-23',
    wishlistCount: 9,
    status: 'Active'
  },
  {
    id: 'CUST-1010',
    name: 'Alex Mercer',
    email: 'amercer@gaming.com',
    location: 'San Jose, CA',
    segment: 'High-Value Customers',
    totalSpent: 7450.00,
    ordersCount: 8,
    avgOrderValue: 931.25,
    firstOrderDate: '2024-10-05',
    lastOrderDate: '2026-07-21',
    wishlistCount: 6,
    status: 'Active'
  }
];

export const CUSTOMER_SEGMENT_SUMMARIES: CustomerSegmentSummary[] = [
  {
    segment: 'High-Value Customers',
    customerCount: 1420,
    totalRevenue: 842500,
    revenuePercent: 52.4,
    totalOrders: 3120,
    orderVolumePercent: 32.8,
    avgOrderValue: 270.03,
    growthRate: 16.4,
    description: 'VIP clients with lifetime spend > $2,000 or high average order value.'
  },
  {
    segment: 'Frequent Buyers',
    customerCount: 2840,
    totalRevenue: 489200,
    revenuePercent: 30.4,
    totalOrders: 4210,
    orderVolumePercent: 44.3,
    avgOrderValue: 116.20,
    growthRate: 22.1,
    description: 'Repeat shoppers making 5+ orders per year with steady order velocity.'
  },
  {
    segment: 'New Customers',
    customerCount: 1890,
    totalRevenue: 184500,
    revenuePercent: 11.5,
    totalOrders: 1890,
    orderVolumePercent: 19.9,
    avgOrderValue: 97.62,
    growthRate: 34.8,
    description: 'First-time purchasers acquired within the last 30 days.'
  },
  {
    segment: 'Lapsed Customers',
    customerCount: 950,
    totalRevenue: 91800,
    revenuePercent: 5.7,
    totalOrders: 280,
    orderVolumePercent: 3.0,
    avgOrderValue: 327.85,
    growthRate: -8.2,
    description: 'Previously active customers without an order in the last 180 days.'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-101',
    sku: 'ANC-HEAD-01',
    name: 'Pro Wireless ANC Headphones',
    category: 'Electronics',
    price: 299.99,
    costPrice: 140.00,
    stock: 84,
    reorderPoint: 15,
    turnoverRate: 9.2,
    status: 'In Stock',
    lastRestocked: '2026-07-20',
    monthlySalesVelocity: 120,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-102',
    sku: 'MON-34-UW',
    name: 'UltraWide Curved Monitor 34"',
    category: 'Electronics',
    price: 849.50,
    costPrice: 480.00,
    stock: 8, // FLAG LOW STOCK (< 10)
    reorderPoint: 10,
    turnoverRate: 11.4,
    status: 'Low Stock',
    lastRestocked: '2026-07-10',
    monthlySalesVelocity: 45,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-103',
    sku: 'MECH-KB-RGB',
    name: 'Custom Mechanical RGB Keyboard',
    category: 'Electronics',
    price: 189.00,
    costPrice: 85.00,
    stock: 120,
    reorderPoint: 20,
    turnoverRate: 8.6,
    status: 'In Stock',
    lastRestocked: '2026-07-22',
    monthlySalesVelocity: 95,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-104',
    sku: 'ESP-MACH-PRO',
    name: 'Smart Espresso Barista Machine',
    category: 'Home & Living',
    price: 599.00,
    costPrice: 320.00,
    stock: 5, // FLAG LOW STOCK (< 10)
    reorderPoint: 10,
    turnoverRate: 12.8,
    status: 'Low Stock',
    lastRestocked: '2026-07-05',
    monthlySalesVelocity: 38,
    image: 'https://images.unsplash.com/photo-1517668808822-9ed02810a083?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-105',
    sku: 'WOOL-SWTR-01',
    name: 'Organic Merino Wool Knit Sweater',
    category: 'Apparel',
    price: 129.00,
    costPrice: 48.00,
    stock: 65,
    reorderPoint: 15,
    turnoverRate: 6.4,
    status: 'In Stock',
    lastRestocked: '2026-07-18',
    monthlySalesVelocity: 80,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-106',
    sku: 'SKIN-KIT-BOT',
    name: 'Botanical Hydrating Skincare Kit',
    category: 'Beauty & Care',
    price: 85.00,
    costPrice: 28.00,
    stock: 210,
    reorderPoint: 25,
    turnoverRate: 14.1,
    status: 'In Stock',
    lastRestocked: '2026-07-25',
    monthlySalesVelocity: 160,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-107',
    sku: 'CHAIR-ERG-09',
    name: 'Ergonomic Executive Desk Chair',
    category: 'Home & Living',
    price: 349.00,
    costPrice: 190.00,
    stock: 3, // FLAG LOW STOCK (< 10)
    reorderPoint: 10,
    turnoverRate: 7.2,
    status: 'Low Stock',
    lastRestocked: '2026-06-30',
    monthlySalesVelocity: 22,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-108',
    sku: 'STAND-ALUM-PH',
    name: 'Minimalist Aluminum Phone Stand',
    category: 'Electronics',
    price: 39.99,
    costPrice: 12.00,
    stock: 0, // OUT OF STOCK
    reorderPoint: 20,
    turnoverRate: 15.6,
    status: 'Out of Stock',
    lastRestocked: '2026-06-15',
    monthlySalesVelocity: 140,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-109',
    sku: 'DESK-MAT-LTHR',
    name: 'Vegan Leather Executive Desk Pad',
    category: 'Home & Living',
    price: 49.99,
    costPrice: 18.00,
    stock: 6, // FLAG LOW STOCK (< 10)
    reorderPoint: 12,
    turnoverRate: 9.8,
    status: 'Low Stock',
    lastRestocked: '2026-07-02',
    monthlySalesVelocity: 55,
    image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'INV-110',
    sku: 'CAM-4K-WEBCAM',
    name: 'Ultra HD 4K Streaming Webcam',
    category: 'Electronics',
    price: 159.00,
    costPrice: 70.00,
    stock: 42,
    reorderPoint: 10,
    turnoverRate: 8.9,
    status: 'In Stock',
    lastRestocked: '2026-07-15',
    monthlySalesVelocity: 48,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=100&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'CPN-101',
    code: 'SUMMER20',
    description: 'Summer season storewide discount for all registered shoppers',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 50,
    usageCount: 342,
    usageLimit: 500,
    expiryDate: '2026-08-31',
    status: 'Active',
    createdAt: '2026-06-01'
  },
  {
    id: 'CPN-102',
    code: 'WELCOME10',
    description: 'First order 10% welcome bonus code for new customer signups',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 25,
    usageCount: 1280,
    usageLimit: null,
    expiryDate: '2026-12-31',
    status: 'Active',
    createdAt: '2026-01-01'
  },
  {
    id: 'CPN-103',
    code: 'VIPFIXED50',
    description: 'Flat $50 off premium orders above $250 for VIP tier members',
    discountType: 'fixed',
    discountValue: 50,
    minSpend: 250,
    usageCount: 89,
    usageLimit: 100,
    expiryDate: '2026-09-15',
    status: 'Active',
    createdAt: '2026-07-01'
  },
  {
    id: 'CPN-104',
    code: 'TECHFEST15',
    description: 'Mid-year electronics tech fest promo coupon',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 100,
    usageCount: 200,
    usageLimit: 200,
    expiryDate: '2026-07-01',
    status: 'Expired',
    createdAt: '2026-05-15'
  },
  {
    id: 'CPN-105',
    code: 'FLASHSALE30',
    description: 'Limited 30% discount flash promotion',
    discountType: 'percentage',
    discountValue: 30,
    minSpend: 150,
    usageCount: 45,
    usageLimit: 50,
    expiryDate: '2026-08-10',
    status: 'Inactive',
    createdAt: '2026-07-15'
  },
  {
    id: 'CPN-106',
    code: 'FREESHIP10',
    description: 'Flat $10 credit to cover expedited air shipping fees',
    discountType: 'fixed',
    discountValue: 10,
    minSpend: 40,
    usageCount: 520,
    usageLimit: 1000,
    expiryDate: '2026-10-31',
    status: 'Active',
    createdAt: '2026-06-15'
  }
];

export const MOCK_COUPONS = INITIAL_COUPONS;

export const MOCK_FLASH_SALE: FlashSaleItem[] = [
  { id: 'FS-1', productName: 'Pro Wireless ANC Headphones', originalPrice: 299.99, salePrice: 199.99, discountPercent: 33, soldUnits: 142, totalUnits: 200, endsIn: '06h 42m 15s', status: 'Active' },
  { id: 'FS-2', productName: 'UltraWide Curved Monitor 34"', originalPrice: 849.50, salePrice: 649.00, discountPercent: 24, soldUnits: 48, totalUnits: 50, endsIn: '02h 10m 00s', status: 'Active' }
];

export const MOCK_MEDIA: MediaItem[] = [
  { id: 'MED-1', title: 'hero_banner_summer.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80', size: '2.4 MB', dimensions: '1920x1080', uploadedDate: '2026-07-15' },
  { id: 'MED-2', title: 'product_catalog_2026.pdf', type: 'document', url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&auto=format&fit=crop&q=80', size: '14.8 MB', uploadedDate: '2026-07-10' }
];

export const MOCK_BLOG: BlogArticle[] = [
  { id: 'BLOG-1', title: '10 Workspace Upgrades to Boost Productivity in 2026', slug: '10-workspace-upgrades-to-boost-productivity-2026', category: 'Tech & Workspace', author: 'Alex Rivera', publishedDate: '2026-07-20', views: 4210, status: 'Published' },
  { id: 'BLOG-2', title: 'How to Choose the Perfect Ergonomic Desk Chair', slug: 'how-to-choose-the-perfect-ergonomic-desk-chair', category: 'Home Office', author: 'Sarah Jenkins', publishedDate: '2026-07-12', views: 2890, status: 'Published' }
];

export const MOCK_FAQS: FAQItem[] = [
  { id: 'FAQ-1', question: 'What is your standard shipping timeline?', answer: 'Orders ship within 1-2 business days with standard delivery taking 3-5 days.', category: 'Shipping', helpfulCount: 142 },
  { id: 'FAQ-2', question: 'How do returns and refunds work?', answer: 'We offer a 30-day hassle-free return window for un-damaged items in original packaging.', category: 'Returns', helpfulCount: 98 }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ORD-9824',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 234-5678',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-27 10:42 AM',
    amount: 329.99,
    itemsCount: 3,
    status: 'Pending',
    paymentMethod: 'Credit Card (Visa)',
    shippingAddress: '742 Evergreen Terrace, Springfield, IL',
    shippingCarrier: 'FedEx Express',
    shippingMethod: '2-Day Priority Air',
    trackingNumber: 'FDX-8849-2026-X1',
    productsSummary: 'Wireless Noise-Canceling Headphones, Desk Pad, Cable Organizer',
    lineItems: [
      { id: 'li-1', name: 'Pro Wireless ANC Headphones', sku: 'ANC-HEAD-01', quantity: 1, unitPrice: 249.99, totalPrice: 249.99 },
      { id: 'li-2', name: 'Vegan Leather Executive Desk Pad', sku: 'DESK-MAT-LTHR', quantity: 1, unitPrice: 49.99, totalPrice: 49.99 },
      { id: 'li-3', name: 'Silicone Cable Organizer Clamp', sku: 'CBL-ORG-03', quantity: 1, unitPrice: 30.00, totalPrice: 30.00 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2026-07-27 10:42 AM', description: 'Order created and received by system', completed: true },
      { status: 'Payment Authorization', date: '2026-07-27 10:43 AM', description: 'Credit Card charge authorized', completed: true, current: true },
      { status: 'Warehouse Fulfillment', date: 'Pending', description: 'Packing and preparing for shipping', completed: false },
      { status: 'Out for Delivery', date: 'Pending', description: 'Handed to FedEx Express driver', completed: false },
      { status: 'Delivered', date: 'Pending', description: 'Package handed to recipient', completed: false }
    ]
  },
  {
    id: 'ORD-9823',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@techcorp.io',
    customerPhone: '+1 (555) 876-5432',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-27 09:15 AM',
    amount: 1249.50,
    itemsCount: 1,
    status: 'Processing',
    paymentMethod: 'PayPal',
    shippingAddress: '100 Cyber Way, Austin, TX',
    shippingCarrier: 'UPS Worldwide',
    shippingMethod: 'Next Day Air Guaranteed',
    trackingNumber: '1Z9999999999999999',
    productsSummary: 'UltraWide Curved Monitor 34"',
    lineItems: [
      { id: 'li-4', name: 'UltraWide Curved Monitor 34"', sku: 'MON-34-UW', quantity: 1, unitPrice: 1249.50, totalPrice: 1249.50 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2026-07-27 09:15 AM', description: 'Order verified', completed: true },
      { status: 'Payment Confirmed', date: '2026-07-27 09:16 AM', description: 'PayPal transaction settled', completed: true },
      { status: 'Processing at Hub', date: '2026-07-27 09:40 AM', description: 'Item picked and packed in Austin Logistics Center', completed: true, current: true },
      { status: 'Shipped', date: 'Scheduled 02:00 PM', description: 'In transit with UPS', completed: false },
      { status: 'Delivered', date: 'Estimated Tomorrow', description: 'Final delivery', completed: false }
    ]
  },
  {
    id: 'ORD-9822',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@gmail.com',
    customerPhone: '+61 412 345 678',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-26 04:30 PM',
    amount: 89.00,
    itemsCount: 2,
    status: 'Processing',
    paymentMethod: 'Apple Pay',
    shippingAddress: '42 Wallaby Way, Sydney, AU',
    shippingCarrier: 'DHL Express',
    shippingMethod: 'Global Priority Express',
    trackingNumber: 'DHL-AU-99201-X',
    productsSummary: 'Ergonomic Vertical Mouse, Wrist Rest',
    lineItems: [
      { id: 'li-5', name: 'Ergonomic Vertical Wireless Mouse', sku: 'MS-VERT-02', quantity: 1, unitPrice: 65.00, totalPrice: 65.00 },
      { id: 'li-6', name: 'Memory Foam Keyboard Wrist Rest', sku: 'RST-MEM-01', quantity: 1, unitPrice: 24.00, totalPrice: 24.00 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2026-07-26 04:30 PM', description: 'Customer checkout completed', completed: true },
      { status: 'Payment Settled', date: '2026-07-26 04:31 PM', description: 'Apple Pay processed', completed: true },
      { status: 'Export Documentation', date: '2026-07-27 08:00 AM', description: 'Customs manifest generated', completed: true, current: true },
      { status: 'Handover to DHL', date: 'Pending', description: 'Awaiting DHL international courier dispatch', completed: false }
    ]
  },
  {
    id: 'ORD-9821',
    customerName: 'David Chen',
    customerEmail: 'david.chen@designhub.net',
    customerPhone: '+1 (555) 345-6789',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-26 01:12 PM',
    amount: 450.00,
    itemsCount: 4,
    status: 'Delivered',
    paymentMethod: 'Credit Card (MasterCard)',
    shippingAddress: '1280 Market St, San Francisco, CA',
    shippingCarrier: 'USPS Priority Mail',
    shippingMethod: 'Standard Priority Ground',
    trackingNumber: 'USPS-9400100000000000000',
    productsSummary: 'Mechanical Keyboard, Custom Keycap Set, Coiled Cable',
    lineItems: [
      { id: 'li-7', name: 'Custom Mechanical Keyboard 75%', sku: 'PRD-KEY-003', quantity: 1, unitPrice: 280.00, totalPrice: 280.00 },
      { id: 'li-8', name: 'Double-shot PBT Keycap Set', sku: 'KCP-PBT-09', quantity: 1, unitPrice: 110.00, totalPrice: 110.00 },
      { id: 'li-9', name: 'Custom Coiled Aviator Cable', sku: 'CBL-COIL-01', quantity: 2, unitPrice: 30.00, totalPrice: 60.00 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2026-07-26 01:12 PM', description: 'Order confirmed', completed: true },
      { status: 'Payment Processed', date: '2026-07-26 01:13 PM', description: 'MasterCard charged', completed: true },
      { status: 'Shipped via USPS', date: '2026-07-26 05:00 PM', description: 'Departed San Francisco Sort Facility', completed: true },
      { status: 'Out for Delivery', date: '2026-07-27 08:30 AM', description: 'On mail carrier vehicle', completed: true },
      { status: 'Delivered', date: '2026-07-27 12:15 PM', description: 'Left at front door / reception', completed: true, current: true }
    ]
  },
  {
    id: 'ORD-9820',
    customerName: 'Jessica Taylor',
    customerEmail: 'jtaylor89@yahoo.com',
    customerPhone: '+1 (555) 987-6543',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-25 08:20 PM',
    amount: 129.95,
    itemsCount: 1,
    status: 'Cancelled',
    paymentMethod: 'Credit Card (Amex)',
    shippingAddress: '55 Pine Street, Seattle, WA',
    shippingCarrier: 'FedEx Ground',
    shippingMethod: 'Standard Ground',
    trackingNumber: 'N/A (Cancelled)',
    productsSummary: 'Smart Fitness Tracker Watch',
    lineItems: [
      { id: 'li-10', name: 'Smart Fitness Tracker Watch Series 5', sku: 'PRD-WAT-002', quantity: 1, unitPrice: 129.95, totalPrice: 129.95 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2026-07-25 08:20 PM', description: 'Order submitted', completed: true },
      { status: 'Cancellation Requested', date: '2026-07-25 08:35 PM', description: 'Buyer requested immediate order cancellation', completed: true },
      { status: 'Refund Issued', date: '2026-07-25 08:40 PM', description: '$129.95 refunded to Amex', completed: true, current: true }
    ]
  },
  {
    id: 'ORD-9819',
    customerName: 'Liam O\'Connor',
    customerEmail: 'loconnor@dublin.ie',
    customerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-25 11:05 AM',
    amount: 680.20,
    itemsCount: 2,
    status: 'Delivered',
    paymentMethod: 'Google Pay',
    shippingAddress: '88 O\'Connell Street, Dublin',
    productsSummary: 'Smart Espresso Machine, Organic Coffee Beans 1kg'
  },
  {
    id: 'ORD-9818',
    customerName: 'Amara Patel',
    customerEmail: 'amara.p@techsolutions.com',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-24 03:50 PM',
    amount: 210.00,
    itemsCount: 3,
    status: 'Shipped',
    paymentMethod: 'Credit Card (Visa)',
    shippingAddress: '14 Park Avenue, New York, NY',
    productsSummary: 'Aroma Diffuser, Essential Oils Trio, Silk Eye Mask'
  },
  {
    id: 'ORD-9817',
    customerName: 'Robert Martinez',
    customerEmail: 'robert.m@gmail.com',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-24 09:18 AM',
    amount: 54.99,
    itemsCount: 1,
    status: 'Delivered',
    paymentMethod: 'PayPal',
    shippingAddress: '302 Sunset Blvd, Los Angeles, CA',
    productsSummary: 'Minimalist Aluminum Phone Stand'
  },
  {
    id: 'ORD-9816',
    customerName: 'Chloe Bennett',
    customerEmail: 'chloe.b@stylehub.com',
    customerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
    date: '2026-07-23 06:40 PM',
    amount: 340.00,
    itemsCount: 2,
    status: 'Returns',
    paymentMethod: 'Credit Card (Visa)',
    shippingAddress: '880 Fifth Ave, Chicago, IL',
    productsSummary: 'Merino Wool Sweater, Leather Tote Bag'
  }
];

export const TOP_PRODUCTS: TopProduct[] = [
  {
    id: 'PROD-01',
    name: 'Pro Wireless ANC Headphones',
    category: 'Electronics',
    price: 299.99,
    salesCount: 1420,
    revenue: 425985.80,
    stock: 84,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    growth: 18.5
  },
  {
    id: 'PROD-02',
    name: 'UltraWide Curved Monitor 34"',
    category: 'Electronics',
    price: 849.50,
    salesCount: 890,
    revenue: 756055.00,
    stock: 8,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=80',
    growth: 14.2
  },
  {
    id: 'PROD-03',
    name: 'Custom Mechanical RGB Keyboard',
    category: 'Electronics',
    price: 189.00,
    salesCount: 1250,
    revenue: 236250.00,
    stock: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80',
    growth: 22.1
  },
  {
    id: 'PROD-04',
    name: 'Smart Espresso Barista Machine',
    category: 'Home & Living',
    price: 599.00,
    salesCount: 640,
    revenue: 383360.00,
    stock: 5,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517668808822-9ed02810a083?w=300&auto=format&fit=crop&q=80',
    growth: 9.8
  },
  {
    id: 'PROD-05',
    name: 'Organic Merino Wool Knit Sweater',
    category: 'Apparel',
    price: 129.00,
    salesCount: 1100,
    revenue: 141900.00,
    stock: 65,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80',
    growth: 11.4
  },
  {
    id: 'PROD-06',
    name: 'Botanical Hydrating Skincare Kit',
    category: 'Beauty & Care',
    price: 85.00,
    salesCount: 1840,
    revenue: 156400.00,
    stock: 210,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80',
    growth: 28.3
  }
];

export const CATEGORY_SALES: CategorySale[] = [
  { name: 'Electronics', sales: 4820, revenue: 1418290, color: '#6366f1', percentage: 42.5 },
  { name: 'Home & Living', sales: 2410, revenue: 842100, color: '#10b981', percentage: 25.2 },
  { name: 'Apparel', sales: 3100, revenue: 520400, color: '#f59e0b', percentage: 15.6 },
  { name: 'Beauty & Care', sales: 2890, revenue: 382900, color: '#ec4899', percentage: 11.5 },
  { name: 'Sports & Fitness', sales: 1250, revenue: 173800, color: '#8b5cf6', percentage: 5.2 }
];

export const REVENUE_ANALYTICS: RevenueAnalyticsPoint[] = [
  { month: 'Jan', revenue: 112000, cost: 68000, profit: 44000, target: 100000 },
  { month: 'Feb', revenue: 128000, cost: 72000, profit: 56000, target: 110000 },
  { month: 'Mar', revenue: 145000, cost: 81000, profit: 64000, target: 120000 },
  { month: 'Apr', revenue: 139000, cost: 79000, profit: 60000, target: 130000 },
  { month: 'May', revenue: 162000, cost: 91000, profit: 71000, target: 140000 },
  { month: 'Jun', revenue: 178000, cost: 98000, profit: 80000, target: 150000 },
  { month: 'Jul', revenue: 194000, cost: 106000, profit: 88000, target: 160000 },
  { month: 'Aug', revenue: 185000, cost: 102000, profit: 83000, target: 165000 },
  { month: 'Sep', revenue: 201000, cost: 110000, profit: 91000, target: 175000 },
  { month: 'Oct', revenue: 218000, cost: 118000, profit: 100000, target: 185000 },
  { month: 'Nov', revenue: 254000, cost: 135000, profit: 119000, target: 210000 },
  { month: 'Dec', revenue: 298000, cost: 158000, profit: 140000, target: 250000 }
];

export const MONTHLY_ORDERS: MonthlyOrderPoint[] = [
  { month: 'Jan', delivered: 820, processing: 45, pending: 22, cancelled: 30, total: 917 },
  { month: 'Feb', delivered: 910, processing: 50, pending: 31, cancelled: 28, total: 1019 },
  { month: 'Mar', delivered: 1050, processing: 62, pending: 40, cancelled: 35, total: 1187 },
  { month: 'Apr', delivered: 990, processing: 58, pending: 38, cancelled: 32, total: 1118 },
  { month: 'May', delivered: 1180, processing: 71, pending: 45, cancelled: 39, total: 1335 },
  { month: 'Jun', delivered: 1290, processing: 80, pending: 52, cancelled: 41, total: 1463 },
  { month: 'Jul', delivered: 1420, processing: 88, pending: 59, cancelled: 46, total: 1613 },
  { month: 'Aug', delivered: 1350, processing: 82, pending: 54, cancelled: 42, total: 1528 },
  { month: 'Sep', delivered: 1490, processing: 91, pending: 61, cancelled: 48, total: 1690 },
  { month: 'Oct', delivered: 1610, processing: 98, pending: 68, cancelled: 52, total: 1828 },
  { month: 'Nov', delivered: 1920, processing: 120, pending: 85, cancelled: 65, total: 2190 },
  { month: 'Dec', delivered: 2280, processing: 145, pending: 102, cancelled: 78, total: 2605 }
];

export const DAILY_SALES_30D: SalesAnalyticsPoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const dateStr = `Jul ${day < 10 ? '0' + day : day}`;
  const baseSales = 5200 + Math.sin(i / 2) * 1800 + (i % 7 === 5 || i % 7 === 6 ? 2500 : 0);
  const orders = Math.floor(baseSales / 140) + Math.floor(Math.random() * 8);
  const conversionRate = Number((2.8 + Math.sin(i) * 0.9 + Math.random() * 0.4).toFixed(2));
  return {
    date: dateStr,
    sales: Math.round(baseSales),
    orders,
    conversionRate
  };
});

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'BAN-101',
    title: 'Next-Gen Workspace Tech Sale',
    subtitle: 'Upgrade your productivity setup with up to 40% OFF top audio, displays, and keyboards.',
    type: 'Homepage Banner',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    badgeText: 'FEATURED HERO',
    ctaText: 'Explore Tech Deals',
    ctaLink: '/category/electronics',
    order: 1,
    status: 'Active',
    discountTag: '40% OFF',
    startDate: '2026-07-01',
    endDate: '2026-08-31',
    clicksCount: 3840,
    impressionsCount: 42100,
    backgroundColor: 'from-slate-950 via-indigo-950 to-slate-900'
  },
  {
    id: 'BAN-102',
    title: 'Mid-Summer Fashion Drop',
    subtitle: 'Premium breathable merino wools, linen essentials, and handcrafted executive leather gear.',
    type: 'Homepage Banner',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    badgeText: 'NEW COLLECTION',
    ctaText: 'Shop Summer Styles',
    ctaLink: '/category/apparel',
    order: 2,
    status: 'Active',
    discountTag: '25% OFF',
    startDate: '2026-07-10',
    endDate: '2026-09-15',
    clicksCount: 2190,
    impressionsCount: 28400,
    backgroundColor: 'from-slate-950 via-amber-950 to-slate-900'
  },
  {
    id: 'BAN-103',
    title: 'Flash Sale: $50 Off Orders Above $250',
    subtitle: 'Use coupon VIPFIXED50 at checkout. Limited redemption slots remaining for VIP members.',
    type: 'Offer Banner',
    category: 'All',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    badgeText: 'LIMITED PROMO',
    ctaText: 'Claim Offer',
    ctaLink: '/coupons',
    order: 3,
    status: 'Active',
    discountTag: '$50 SAVINGS',
    startDate: '2026-07-20',
    endDate: '2026-08-10',
    clicksCount: 1850,
    impressionsCount: 19800,
    backgroundColor: 'from-slate-950 via-rose-950 to-slate-900'
  },
  {
    id: 'BAN-104',
    title: 'Premium Home & Living Category Spotlight',
    subtitle: 'Barista espresso machines, botanical diffusers, and luxury home workspace accessories.',
    type: 'Category Banner',
    category: 'Home & Living',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ed02810a083?w=1200&auto=format&fit=crop&q=80',
    badgeText: 'CATEGORY HERO',
    ctaText: 'Browse Home & Living',
    ctaLink: '/category/home-living',
    order: 4,
    status: 'Active',
    discountTag: 'UP TO 30% OFF',
    startDate: '2026-06-15',
    endDate: '2026-10-01',
    clicksCount: 1420,
    impressionsCount: 16500,
    backgroundColor: 'from-slate-950 via-emerald-950 to-slate-900'
  },
  {
    id: 'BAN-105',
    title: 'Get 10% Off Your First Order!',
    subtitle: 'Subscribe to our newsletter and unlock instant savings code WELCOME10 plus VIP perks.',
    type: 'Popup Banner',
    category: 'All',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
    badgeText: 'POPUP OVERLAY',
    ctaText: 'Join & Save 10%',
    ctaLink: '/newsletter',
    order: 5,
    status: 'Active',
    discountTag: 'INSTANT 10%',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    clicksCount: 5210,
    impressionsCount: 64200,
    backgroundColor: 'from-slate-950 via-cyan-950 to-slate-900'
  }
];

export const MOCK_BANNERS = INITIAL_BANNERS;

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'REV-901',
    productId: 'PROD-01',
    productName: 'Apex Pro Noise-Canceling Wireless Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@example.com',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Outstanding sound quality and deep active noise cancellation!',
    comment: 'The soundstage on these headphones is unbelievable for acoustic and electronic tracks. Noise isolation in open-plan offices works seamlessly. Battery life comfortably lasts over 32 hours.',
    date: '2026-07-25',
    status: 'Pending',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'REV-902',
    productId: 'PROD-02',
    productName: 'Ergonomic Mesh Executive Chair',
    productImage: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?w=300&auto=format&fit=crop&q=80',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@techcorp.io',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Transformed my remote work ergonomics completely.',
    comment: 'Adjustable lumbar support and breathable mesh material kept me back-pain free during 10-hour coding sessions. Assembly took less than 15 minutes.',
    date: '2026-07-24',
    status: 'Approved',
    verifiedPurchase: true,
    adminReply: {
      text: 'Hi Elena! We are thrilled to hear that the chair is supporting your daily workflow so well. Thank you for choosing Apex Store!',
      repliedAt: '2026-07-24 14:30',
      repliedBy: 'Apex Support Team'
    },
    helpfulCount: 18
  },
  {
    id: 'REV-903',
    productId: 'PROD-03',
    productName: 'UltraSlim Curved Gaming Monitor 34"',
    productImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=80',
    customerName: 'David K.',
    customerEmail: 'david.k@gamers.net',
    rating: 2,
    title: 'Incompatible packaging caused minor bezel scuffing',
    comment: 'Screen contrast and 165Hz refresh rates are great, but the box arrived with damaged side foam tape resulting in a small scratch along the lower plastic bezel border.',
    date: '2026-07-22',
    status: 'Pending',
    verifiedPurchase: true,
    helpfulCount: 6
  },
  {
    id: 'REV-904',
    productId: 'PROD-04',
    productName: 'Barista Touch Automatic Espresso Machine',
    productImage: 'https://images.unsplash.com/photo-1517668808822-9ed02810a083?w=300&auto=format&fit=crop&q=80',
    customerName: 'Chloe Bennet',
    customerEmail: 'chloe.b@lifestyle.com',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Cafe-grade milk microfoam at home!',
    comment: 'Consistent extraction temperature, intuitive touchscreen interface, and super quick thermojet heat up in 3 seconds. Worth every dollar.',
    date: '2026-07-20',
    status: 'Approved',
    verifiedPurchase: true,
    helpfulCount: 31
  },
  {
    id: 'REV-905',
    productId: 'PROD-05',
    productName: 'Organic Merino Wool Knit Sweater',
    productImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80',
    customerName: 'Spam Bot 404',
    customerEmail: 'promo-deals-bot@unknown-domain.xyz',
    rating: 1,
    title: 'Unrelated promotional website link advertisement',
    comment: 'Check out cheap loans and casino bonuses at http://fake-website-promo.link right now!',
    date: '2026-07-19',
    status: 'Rejected',
    verifiedPurchase: false,
    helpfulCount: 0
  }
];

export const MOCK_REVIEWS = INITIAL_REVIEWS;

export const INITIAL_BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'CAT-B1', name: 'Tech & Electronics', slug: 'tech-electronics', articleCount: 12, description: 'Deep dives into noise cancellation, mechanical switches, and high-refresh displays.' },
  { id: 'CAT-B2', name: 'Workspace Ergonomics', slug: 'workspace-ergonomics', articleCount: 8, description: 'Guides on lumbar support, desk pads, and posture optimizations for remote work.' },
  { id: 'CAT-B3', name: 'Coffee & Living', slug: 'coffee-living', articleCount: 6, description: 'Barista guides, espresso extraction tips, and luxury home aesthetic curation.' },
  { id: 'CAT-B4', name: 'E-Commerce & Buying Guides', slug: 'buying-guides', articleCount: 15, description: 'Comprehensive comparative reviews and seasonal shopping advice.' }
];

export const INITIAL_BLOGS: BlogArticle[] = [
  {
    id: 'BLOG-101',
    title: 'The Ultimate Guide to Active Noise Cancellation in 2026',
    slug: 'ultimate-guide-active-noise-cancellation-2026',
    category: 'Tech & Electronics',
    author: 'Elena Vance',
    publishedDate: '2026-07-22',
    views: 14820,
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    excerpt: 'Explore how modern spatial audio and multi-microphone beamforming ANC algorithms isolate ambient noise in bustling office spaces.',
    content: `Active Noise Cancellation (ANC) has transformed from a luxury travel feature into an indispensable daily productivity tool for remote workers, commuters, and audiophiles alike.

### Understanding Phase Inversion Technology
At the core of modern active noise cancellation lies high-frequency acoustic sampling. Microphones placed inside and outside the earcups sample ambient sound pressure waves thousands of times per second. Inverse sound waves (anti-noise) are generated in real-time, effectively canceling unwanted frequencies before reaching your eardrum.

### Key Factors When Selecting Premium ANC Headphones
1. **Adaptive Environmental Awareness**: Seamlessly switching between transparent listening and deep noise isolation based on location.
2. **Frequency Curve Customization**: Equalizing acoustic drivers for rich bass response without muddying dialogue or vocals.
3. **Battery Longevity**: High-density lithium batteries offering over 30 hours of continuous wireless playback.`,
    seoTitle: 'Best Active Noise Cancellation Headphones Guide 2026 | Apex Tech',
    seoDescription: 'Discover how active noise cancellation works, key acoustic specs, and how to choose the right wireless ANC headphones for work and travel.',
    seoKeywords: 'ANC headphones, noise cancellation guide, wireless audio, active noise isolation, apex headphones'
  },
  {
    id: 'BLOG-102',
    title: 'How Ergonomic Mesh Chairs Prevent Remote Work Back Fatigue',
    slug: 'ergonomic-mesh-chairs-remote-work-back-fatigue',
    category: 'Workspace Ergonomics',
    author: 'Marcus Vance',
    publishedDate: '2026-07-18',
    views: 9430,
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?w=800&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    excerpt: 'Key physiological insights on dynamic lumbar support, breathable polymer mesh, and posture adjustment for long coding sessions.',
    content: `Sitting for extended hours without proper spinal support can cause chronic lumbar strain and shoulder tightness.

### Why Mesh Trumps Synthetic Leather for Long Hours
High-tension elastomeric mesh distributes upper body weight evenly across the seat base and backrest, preventing pressure hot spots while allowing continuous airflow during warm summer afternoons.`,
    seoTitle: 'Ergonomic Mesh Chair Guide for Remote Workers | Apex Ergonomics',
    seoDescription: 'Learn why breathable mesh executive chairs reduce posture strain during 8+ hour desk work sessions.',
    seoKeywords: 'ergonomic chair, mesh executive chair, remote work posture, lumbar support'
  },
  {
    id: 'BLOG-103',
    title: 'Mastering Barista Espresso Extraction at Home',
    slug: 'mastering-barista-espresso-extraction-at-home',
    category: 'Coffee & Living',
    author: 'Sophia Chen',
    publishedDate: '2026-07-12',
    views: 6180,
    status: 'Published',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ed02810a083?w=800&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    excerpt: 'Step-by-step ratio calculations, grind size calibration, and milk texturing techniques for cafe-quality lattes.',
    content: `Dialing in the perfect espresso shot requires balancing water temperature, grind particle uniformity, and tamping pressure.`,
    seoTitle: 'Barista Espresso Extraction Tips at Home | Apex Living',
    seoDescription: 'Master espresso grind sizes, extraction timing, and microfoam texturing with our espresso guide.',
    seoKeywords: 'barista espresso, home coffee machine, milk microfoam, espresso extraction'
  }
];

export const INITIAL_BLOG_COMMENTS: BlogComment[] = [
  {
    id: 'CMT-1',
    articleId: 'BLOG-101',
    articleTitle: 'The Ultimate Guide to Active Noise Cancellation in 2026',
    authorName: 'Julian Thorne',
    authorEmail: 'julian.t@techmail.com',
    content: 'This guide helped me understand the difference between feed-forward and feedback ANC microphones! Apex headphones sound incredible.',
    date: '2026-07-24 11:20',
    status: 'Approved'
  },
  {
    id: 'CMT-2',
    articleId: 'BLOG-102',
    articleTitle: 'How Ergonomic Mesh Chairs Prevent Remote Work Back Fatigue',
    authorName: 'Samantha Ray',
    authorEmail: 'sammy.ray@designstudio.co',
    content: 'Is the lumbar depth adjustable on the executive chair model? Great article on breathable mesh.',
    date: '2026-07-23 16:45',
    status: 'Pending'
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'Eco-Bazar Dashboard',
  storeLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
  currency: 'USD',
  currencySymbol: '$',
  taxRate: 8.5,
  taxType: 'Exclusive',
  shippingCharge: 15.00,
  freeShippingThreshold: 150.00,
  deliveryAreas: ['North America (US & Canada)', 'European Union', 'United Kingdom', 'Australia & NZ', 'East Asia (Japan, S. Korea, SG)'],
  supportedCountries: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'Singapore'],
  paymentGateways: {
    stripeEnabled: true,
    stripePublicKey: 'pk_live_51NxECOBAZAR_SAMPLE_KEY_2026',
    stripeSecretKey: 'sk_live_51NxECOBAZAR_SECRET_PROTECTED',
    paypalEnabled: true,
    paypalClientId: 'PAYPAL_CLIENT_ECOBAZAR_2026_PROD',
    codEnabled: true,
    applePayEnabled: true
  },
  socialLinks: {
    facebook: 'https://facebook.com/ecobazardashboard',
    instagram: 'https://instagram.com/ecobazar.official',
    twitter: 'https://x.com/ecobazar_tech',
    linkedin: 'https://linkedin.com/company/ecobazar',
    youtube: 'https://youtube.com/@ecobazar',
    tiktok: 'https://tiktok.com/@ecobazar.official'
  },
  smtp: {
    host: 'smtp.sendgrid.net',
    port: 587,
    username: 'apikey',
    password: 'SG.EcoBazarSecretEmailKey2026',
    encryption: 'TLS',
    fromEmail: 'orders@ecobazar.io',
    fromName: 'Eco-Bazar Customer Care'
  },
  seo: {
    metaTitle: 'Eco-Bazar Dashboard | Premium E-Commerce & Organic Lifestyle Analytics',
    metaDescription: 'Shop high-performance eco-friendly products, organic goods, ergonomic lifestyle gear, and smart living appliances with fast global shipping.',
    metaKeywords: 'ecobazar, eco-bazar dashboard, organic products, eco-friendly, premium tech, sustainable lifestyle',
    canonicalUrl: 'https://ecobazar.io',
    ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80'
  },
  googleAnalyticsId: 'G-ECO2026LIVE',
  facebookPixelId: 'FB-PIXEL-9876543210'
};

export const INITIAL_NOTIFICATIONS: SystemNotificationItem[] = [
  {
    id: 'NOTIF-101',
    type: 'low_stock',
    title: 'Low Stock Threshold Warning',
    message: 'Apex Wireless ANC Headphones inventory has dropped to 8 units (Threshold: 10 units). Supplier reorder recommended.',
    timestamp: '2026-07-27 12:45',
    read: false,
    priority: 'High',
    actionUrl: 'inventory-low',
    relatedId: 'PROD-101'
  },
  {
    id: 'NOTIF-102',
    type: 'new_order',
    title: 'New High-Value Order Received (#ORD-8842)',
    message: 'Customer Marcus Vance placed a new order for $1,249.50 containing 3 items via Credit Card (Stripe).',
    timestamp: '2026-07-27 11:30',
    read: false,
    priority: 'High',
    actionUrl: 'orders-all',
    relatedId: 'ORD-8842'
  },
  {
    id: 'NOTIF-103',
    type: 'payment_success',
    title: 'Payment Settlement Complete (#ORD-8841)',
    message: 'Stripe transaction tx_3M92837482 confirmed $89.00 payment settlement successfully.',
    timestamp: '2026-07-27 10:15',
    read: true,
    priority: 'Medium',
    actionUrl: 'orders-all',
    relatedId: 'ORD-8841'
  },
  {
    id: 'NOTIF-104',
    type: 'cancelled_order',
    title: 'Order Cancellation Request (#ORD-8835)',
    message: 'Order #ORD-8835 cancelled by customer due to delivery address change. Stock automatically returned to inventory.',
    timestamp: '2026-07-26 16:20',
    read: true,
    priority: 'High',
    actionUrl: 'orders-cancelled',
    relatedId: 'ORD-8835'
  },
  {
    id: 'NOTIF-105',
    type: 'system',
    title: 'System Backup & Security Patch Complete',
    message: 'Database automated daily snapshot completed successfully. Zero vulnerabilities detected during automated audit.',
    timestamp: '2026-07-26 03:00',
    read: true,
    priority: 'Low',
    actionUrl: 'settings'
  }
];


