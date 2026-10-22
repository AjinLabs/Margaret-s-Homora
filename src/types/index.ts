export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // Current selling price in INR
  originalPrice?: number; // MRP/Original price
  category: string;
  subCategory?: string;
  images: string[];
  description: string;
  materials: string;
  dimensions: string;
  capacity?: string;
  glazeTone?: string;
  careInstructions: string;
  stock: number;
  lowStockThreshold: number;
  sku: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFestiveSpecial?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  threeDType?: 'vase' | 'cup' | 'bowl' | 'pitcher'; // For 3D canvas interaction
  videoUrl?: string; // Product showcase video (mp4, webm, or embed)
  videos?: string[]; // Product video gallery
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit?: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentId?: string;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  adminNotes?: string;
  createdAt: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  announcementBarText: string;
  isAnnouncementBarActive: boolean;
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  heroHeadline: string;
  heroSubheadline: string;
}
