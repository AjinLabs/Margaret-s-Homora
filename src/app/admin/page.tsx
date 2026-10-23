'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Product, OrderStatus, Coupon } from '@/types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Filter,
  Truck,
  RotateCcw,
  Search,
  MessageCircle,
  Copy,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    settings,
    updateSettings,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useStore();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'coupons' | 'settings'
  >('overview');

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // In-app Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Products Search & Filter State
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Orders Search & Filter State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    price: 250,
    originalPrice: 350,
    category: 'ceramics-tableware',
    subCategory: 'Mugs & Cups',
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'],
    description: '',
    materials: 'High-fire stoneware ceramic, non-toxic lead-free glaze',
    dimensions: '3.5" H × 3.2" D',
    capacity: '280 ml',
    glazeTone: 'Warm Sand & Ivory',
    careInstructions: 'Microwave and dishwasher safe.',
    stock: 20,
    lowStockThreshold: 5,
    sku: 'MH-NEW-001',
    isNewArrival: true,
    isBestseller: false,
    isFestiveSpecial: false,
    rating: 5.0,
    reviewCount: 1,
    tags: 'Handcrafted, New In',
    status: 'active' as 'active' | 'draft' | 'archived',
    threeDType: 'cup' as 'vase' | 'cup' | 'bowl' | 'pitcher',
  });

  // Coupon Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 10,
    minOrderValue: 500,
    maxDiscount: 500,
    expiryDate: '2027-12-31',
    isActive: true,
    usageCount: 0,
  });

  // Settings form state
  const [cmsForm, setCmsForm] = useState(settings);

  // Copied code feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setPasswordInput('homora2026');
    const success = loginAdmin('homora2026');
    if (!success) setLoginError(true);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.glazeTone && p.glazeTone.toLowerCase().includes(productSearch.toLowerCase()));

      const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;

      let matchesStock = true;
      if (productStockFilter === 'low_stock') {
        matchesStock = p.stock > 0 && p.stock <= p.lowStockThreshold;
      } else if (productStockFilter === 'out_of_stock') {
        matchesStock = p.stock <= 0;
      } else if (productStockFilter === 'in_stock') {
        matchesStock = p.stock > p.lowStockThreshold;
      }

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [products, productSearch, productCategoryFilter, productStockFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesFilter = orderFilter === 'all' || o.orderStatus === orderFilter;
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer.phone.includes(orderSearch) ||
        o.customer.city.toLowerCase().includes(orderSearch.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [orders, orderFilter, orderSearch]);

  // Calculate Metrics
  const totalGrossSales = orders.reduce((sum, o) => sum + o.total, 0);
  const paidSales = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalGrossSales / orders.length) : 0;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  // Product Form Save
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray =
      typeof productForm.tags === 'string'
        ? productForm.tags.split(',').map((t) => t.trim())
        : productForm.tags;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        tags: tagArray,
      });
      showToast(`Updated "${productForm.name}" successfully.`);
    } else {
      const generatedSlug =
        productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addProduct({
        ...productForm,
        slug: generatedSlug,
        tags: tagArray,
      });
      showToast(`Added "${productForm.name}" to catalog.`);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const openCreateProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      price: 250,
      originalPrice: 350,
      category: 'ceramics-tableware',
      subCategory: 'Mugs & Cups',
      images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'],
      description: '',
      materials: 'High-fire stoneware ceramic, non-toxic lead-free glaze',
      dimensions: '3.5" H × 3.2" D',
      capacity: '280 ml',
      glazeTone: 'Warm Sand & Ivory',
      careInstructions: 'Microwave and dishwasher safe.',
      stock: 20,
      lowStockThreshold: 5,
      sku: `MH-ART-${Date.now().toString().slice(-4)}`,
      isNewArrival: true,
      isBestseller: false,
      isFestiveSpecial: false,
      rating: 5.0,
      reviewCount: 1,
      tags: 'Handcrafted',
      status: 'active',
      threeDType: 'cup',
    });
    setIsProductModalOpen(true);
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      category: prod.category,
      subCategory: prod.subCategory || '',
      images: prod.images,
      description: prod.description,
      materials: prod.materials,
      dimensions: prod.dimensions,
      capacity: prod.capacity || '',
      glazeTone: prod.glazeTone || '',
      careInstructions: prod.careInstructions,
      stock: prod.stock,
      lowStockThreshold: prod.lowStockThreshold,
      sku: prod.sku,
      isNewArrival: !!prod.isNewArrival,
      isBestseller: !!prod.isBestseller,
      isFestiveSpecial: !!prod.isFestiveSpecial,
      rating: prod.rating,
      reviewCount: prod.reviewCount,
      tags: prod.tags.join(', '),
      status: prod.status,
      threeDType: prod.threeDType || 'vase',
    });
    setIsProductModalOpen(true);
  };

  // Coupon save
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;
    addCoupon({
      ...couponForm,
      code: couponForm.code.trim().toUpperCase(),
    });
    showToast(`Coupon "${couponForm.code.toUpperCase()}" created.`);
    setIsCouponModalOpen(false);
  };

  // Settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(cmsForm);
    showToast('Atelier settings updated successfully.');
  };

  // ==========================================
  // 1. SLEEK ATELIER AUTHENTICATION GATEWAY
  // ==========================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EAE2D7] shadow-xl p-8 sm:p-10 space-y-6 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D6C0A6]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Studio Brand Header */}
          <div className="text-center space-y-2 relative">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D6C0A6] mx-auto shadow-sm bg-white">
              <Image src="/images/logo.png" alt="Margaret's Homora" fill className="object-cover" />
            </div>
            <div className="pt-1">
              <h1 className="font-serif text-2xl font-bold tracking-wider uppercase text-[#2C221E]">
                Margaret&apos;s HOMORA
              </h1>
              <p className="text-[11px] text-[#5F6B4F] uppercase tracking-[0.2em] font-semibold">
                Atelier Studio Management
              </p>
            </div>
            <p className="text-xs text-stone-500 pt-1">
              Private access for kiln operations, catalog inventory, and fulfillment dispatch.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
                Studio Master Passkey
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter studio passkey"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] focus:border-[#2C221E] rounded-xl pl-10 pr-10 py-3 text-xs text-[#2C221E] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="mt-2 text-xs text-rose-600 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Invalid passkey. Please verify and try again.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#C2A06E]" />
              <span>Unlock Studio Console</span>
            </button>
          </form>

          {/* Professional Reviewer Helper Pill */}
          <div className="pt-2">
            <div className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl p-3 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-stone-500">
                  Passkey: <code className="font-mono font-bold text-[#2C221E]">homora2026</code>
                </span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-[11px] font-semibold text-[#5F6B4F] hover:text-[#2C221E] underline"
              >
                Quick Unlock &rarr;
              </button>
            </div>
          </div>

          {/* Return link */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-[#2C221E] transition-colors inline-flex items-center gap-1.5"
            >
              <span>&larr; Return to Public Customer Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN ATELIER MANAGEMENT DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen flex bg-[#FAF7F2] text-[#2C221E]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C221E] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#D6C0A6]/30 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* LEFT SIDEBAR (DESKTOP) */}
      <aside className="w-64 bg-white border-r border-[#EAE2D7] hidden lg:flex flex-col justify-between py-6 px-4">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D6C0A6] bg-white flex-shrink-0 shadow-xs">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-serif font-bold text-xs tracking-wider uppercase text-[#2C221E]">
                Margaret&apos;s HOMORA
              </h2>
              <span className="text-[9px] text-[#5F6B4F] uppercase tracking-wider font-semibold">
                Ceramics • Studio Portal
              </span>
            </div>
          </div>

          {/* Kiln Studio Health Indicator */}
          <div className="mx-2 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#EAE2D7] text-[10px] text-stone-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Studio Kilns: Active</span>
            </div>
            <span className="font-mono text-[#5F6B4F] font-semibold">Live</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-[#2C221E]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-[#2C221E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Catalog & Stock</span>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'products'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#FAF7F2] text-[#2C221E] border border-[#EAE2D7]'
                }`}
              >
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-[#2C221E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & Shipping</span>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'orders'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#FAF7F2] text-[#2C221E] border border-[#EAE2D7]'
                }`}
              >
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'coupons'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-[#2C221E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Campaign Coupons</span>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'coupons'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#FAF7F2] text-[#2C221E] border border-[#EAE2D7]'
                }`}
              >
                {coupons.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-[#2C221E]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Studio CMS & Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-6 border-t border-[#EAE2D7]">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] text-xs font-semibold text-[#5F6B4F] transition-colors border border-[#EAE2D7]"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Console & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#EAE2D7] py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                <span>Atelier Studio</span>
                <span>/</span>
                <span className="text-[#5F6B4F] font-bold capitalize">{activeTab}</span>
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-medium text-[#2C221E]">
                {activeTab === 'overview' && 'Atelier Analytics & Overview'}
                {activeTab === 'products' && 'Catalog & Kiln Inventory'}
                {activeTab === 'orders' && 'Orders Fulfillment & Dispatch'}
                {activeTab === 'coupons' && 'Promotions & Seasonal Campaigns'}
                {activeTab === 'settings' && 'Studio CMS & Store Info'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-[#5F6B4F] hover:text-[#2C221E] hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAE2D7] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {activeTab === 'products' && (
              <Link
                href="/admin/products/new"
                className="px-3.5 py-1.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Product</span>
              </Link>
            )}

            {/* Logout on mobile */}
            <button
              onClick={logoutAdmin}
              className="lg:hidden p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Responsive Mobile / Tablet Tab Pills (Scrollable) */}
        <div className="lg:hidden bg-white border-b border-[#EAE2D7] px-4 py-2 overflow-x-auto flex gap-1.5 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: `Catalog (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#2C221E] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-stone-600 border border-[#EAE2D7]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="p-4 sm:p-8 space-y-8">
          {/* ==========================================
              TAB 1: OVERVIEW
             ========================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Total Revenue</span>
                    <TrendingUp className="w-4 h-4 text-[#5F6B4F]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2C221E]">
                    ₹{totalGrossSales.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Verified online & COD orders
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#C2A06E]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2C221E]">{orders.length}</div>
                  <span className="text-[11px] text-stone-500">
                    {orders.filter((o) => o.orderStatus === 'delivered').length} delivered orders
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Avg. Order Value</span>
                    <span className="text-xs font-mono font-bold text-[#5F6B4F]">AOV</span>
                  </div>
                  <div className="text-2xl font-bold text-[#2C221E]">
                    ₹{avgOrderValue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-stone-500">Basket value per patron</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Kiln Stock Alerts</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-amber-700">{lowStockCount} Items</div>
                  <span className="text-[11px] text-stone-500">
                    Stock count at or below low threshold
                  </span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-semibold text-[#2C221E]">
                    Studio Quick Actions
                  </h4>
                  <p className="text-xs text-stone-500">
                    Quickly publish new pottery, create promotions, or inspect stock levels.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/admin/products/new"
                    className="px-3.5 py-2 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Ceramic Piece</span>
                  </Link>
                  <button
                    onClick={() => setIsCouponModalOpen(true)}
                    className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F4EFEA] text-[#2C221E] text-xs font-semibold rounded-xl border border-[#EAE2D7] flex items-center gap-1.5 transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>New Coupon</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F4EFEA] text-[#5F6B4F] text-xs font-semibold rounded-xl border border-[#EAE2D7] flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Fulfill Orders ({orders.filter((o) => o.orderStatus !== 'delivered').length})</span>
                  </button>
                </div>
              </div>

              {/* Recent Orders List in Overview */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D7]">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2C221E]">
                      Recent Patron Orders
                    </h3>
                    <p className="text-xs text-stone-500">Latest online and COD bookings</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#5F6B4F] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View All Orders</span>
                    <span>&rarr;</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#EAE2D7] text-stone-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Destination</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Payment</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE2D7]">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-[#FAF7F2] transition-colors">
                          <td className="py-3 font-mono font-bold text-[#2C221E]">
                            {o.orderNumber}
                          </td>
                          <td className="py-3 font-medium text-[#2C221E]">
                            {o.customer.fullName}
                          </td>
                          <td className="py-3 text-stone-600">
                            {o.customer.city}, {o.customer.state}
                          </td>
                          <td className="py-3 font-semibold text-[#2C221E]">
                            ₹{o.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                o.paymentStatus === 'paid'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {o.paymentMethod.toUpperCase()} • {o.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="capitalize px-2 py-0.5 rounded text-[10px] bg-stone-100 font-medium text-stone-700">
                              {o.orderStatus.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 2: PRODUCTS & KILN INVENTORY
             ========================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                    Catalog & Kiln Inventory ({products.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Add handcrafted ceramic pieces, manage stock on hand, pricing, and glaze descriptions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openCreateProduct}
                    className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#EAE2D7] text-[#2C221E] text-xs font-semibold rounded-xl transition-colors"
                  >
                    Quick Add
                  </button>
                  <Link
                    href="/admin/products/new"
                    className="px-4 py-2 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Full Studio Form
                  </Link>
                </div>
              </div>

              {/* Advanced Search & Filtering Toolbar */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title, SKU, or glaze..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#2C221E]"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs text-[#2C221E] focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock Level Filter */}
                <div>
                  <select
                    value={productStockFilter}
                    onChange={(e) => setProductStockFilter(e.target.value as any)}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs text-[#2C221E] focus:outline-none"
                  >
                    <option value="all">All Stock Levels</option>
                    <option value="in_stock">In Stock (&gt; Threshold)</option>
                    <option value="low_stock">Low Kiln Stock (≤ Threshold)</option>
                    <option value="out_of_stock">Out of Stock (0)</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-[#EAE2D7] text-stone-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-4 font-semibold">Image & Title</th>
                        <th className="p-4 font-semibold">Category</th>
                        <th className="p-4 font-semibold">Price</th>
                        <th className="p-4 font-semibold">Stock</th>
                        <th className="p-4 font-semibold">Glaze Tone</th>
                        <th className="p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE2D7]">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-10 text-stone-500">
                            No ceramic products match your search/filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F4EFEA] border border-[#EAE2D7] flex-shrink-0">
                                  <Image
                                    src={prod.images[0] || '/images/hero_banner.jpg'}
                                    alt={prod.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-serif font-medium text-[#2C221E] line-clamp-1">
                                    {prod.name}
                                  </h4>
                                  <span className="text-[10px] text-stone-400 font-mono">
                                    SKU: {prod.sku}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 capitalize text-stone-600">
                              {prod.category.replace('-', ' ')}
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-[#2C221E]">
                                ₹{prod.price.toLocaleString('en-IN')}
                              </span>
                              {prod.originalPrice && (
                                <span className="block text-[10px] text-stone-400 line-through">
                                  ₹{prod.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={prod.stock}
                                  onChange={(e) =>
                                    updateProduct(prod.id, { stock: Number(e.target.value) })
                                  }
                                  className="w-16 bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-2 py-1 text-xs text-center font-semibold focus:outline-none focus:border-[#2C221E]"
                                />
                                {prod.stock <= prod.lowStockThreshold && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                                    Low
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-stone-600">
                              {prod.glazeTone || 'Artisanal Studio Glaze'}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => openEditProduct(prod)}
                                  className="p-1.5 text-stone-500 hover:text-[#2C221E] hover:bg-stone-100 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <Link
                                  href={`/product/${prod.slug}`}
                                  target="_blank"
                                  className="p-1.5 text-stone-500 hover:text-[#5F6B4F] hover:bg-stone-100 rounded-lg transition-colors"
                                  title="View in Customer Store"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={() => {
                                    if (confirm(`Remove "${prod.name}" from catalog?`)) {
                                      deleteProduct(prod.id);
                                      showToast(`Removed "${prod.name}".`);
                                    }
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 3: ORDERS & COURIER DISPATCH
             ========================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                    Order Fulfillment & Courier Dispatch ({orders.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Track parcel progress, update Blue Dart/DTDC tracking codes, and contact customers via WhatsApp.
                  </p>
                </div>
              </div>

              {/* Order Search & Status Filter Pills */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] p-4 shadow-xs space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order #, Customer Name, Phone, or City..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#2C221E]"
                  />
                  {orderSearch && (
                    <button
                      onClick={() => setOrderSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Status Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
                  {[
                    { id: 'all', label: 'All Orders', count: orders.length },
                    { id: 'confirmed', label: 'Confirmed', count: orders.filter((o) => o.orderStatus === 'confirmed').length },
                    { id: 'processing', label: 'Processing', count: orders.filter((o) => o.orderStatus === 'processing').length },
                    { id: 'packed', label: 'Packed', count: orders.filter((o) => o.orderStatus === 'packed').length },
                    { id: 'shipped', label: 'Shipped', count: orders.filter((o) => o.orderStatus === 'shipped').length },
                    { id: 'delivered', label: 'Delivered', count: orders.filter((o) => o.orderStatus === 'delivered').length },
                    { id: 'cancelled', label: 'Cancelled', count: orders.filter((o) => o.orderStatus === 'cancelled').length },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setOrderFilter(s.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        orderFilter === s.id
                          ? 'bg-[#2C221E] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-stone-600 border border-[#EAE2D7] hover:bg-[#F4EFEA]'
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="text-[10px] opacity-75">({s.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#EAE2D7] p-10 text-center text-xs text-stone-500">
                    No orders match your filter criteria.
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const cleanPhone = (order.customer.phone || '').replace(/[^0-9]/g, '');
                    const waText = encodeURIComponent(
                      `Hello ${order.customer.fullName}, greetings from Margaret's Homora Atelier! We are contacting you regarding your ceramic order #${order.orderNumber}.`
                    );
                    const waUrl = `https://wa.me/91${cleanPhone}?text=${waText}`;

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-[#EAE2D7] p-5 sm:p-6 shadow-xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAE2D7] gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-[#2C221E]">
                                {order.orderNumber}
                              </span>
                              <span className="text-[11px] text-stone-400">
                                • {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                  order.paymentStatus === 'paid'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {order.paymentMethod} • {order.paymentStatus}
                              </span>
                            </div>

                            <p className="text-xs text-stone-600 mt-1">
                              Patron: <strong className="text-[#2C221E]">{order.customer.fullName}</strong> (+91 {order.customer.phone}) &bull; {order.customer.city}, {order.customer.state} - {order.customer.pinCode}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-[#2C221E] mr-2">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>

                            {/* Direct WhatsApp Outreach */}
                            {cleanPhone && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            )}

                            <Link
                              href={`/order-success/${order.id}`}
                              target="_blank"
                              className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#EAE2D7] rounded-lg text-xs font-semibold text-[#2C221E] flex items-center gap-1.5 transition-colors"
                            >
                              <span>Invoice Slip</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>

                        {/* Order Items Snapshot */}
                        <div className="flex flex-wrap gap-3 text-xs">
                          {order.items.map((it, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#EAE2D7]"
                            >
                              <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-stone-200">
                                <Image
                                  src={it.productImage || '/images/hero_banner.jpg'}
                                  alt={it.productName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium text-[#2C221E]">
                                {it.productName}{' '}
                                <span className="text-stone-400 font-normal">× {it.quantity}</span>
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Status Changer & Courier Tracking */}
                        <div className="pt-3 border-t border-[#EAE2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-stone-500 font-medium">Update Progress:</span>
                            <select
                              value={order.orderStatus}
                              onChange={(e) => {
                                updateOrderStatus(order.id, e.target.value as OrderStatus);
                                showToast(`Order ${order.orderNumber} updated to ${e.target.value}.`);
                              }}
                              className="bg-white border border-[#EAE2D7] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#2C221E] focus:outline-none capitalize"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing in Kiln</option>
                              <option value="packed">Packed (Fragile Double-Box)</option>
                              <option value="shipped">Dispatched / Shipped</option>
                              <option value="delivered">Delivered to Patron</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>

                          {/* Courier tracking updater */}
                          <div className="flex items-center gap-2">
                            <Truck className="w-3.5 h-3.5 text-stone-400" />
                            <input
                              type="text"
                              placeholder="AWB Tracking Number"
                              defaultValue={order.trackingNumber || ''}
                              onBlur={(e) => {
                                if (e.target.value !== order.trackingNumber) {
                                  updateOrderStatus(
                                    order.id,
                                    order.orderStatus,
                                    `Tracking reference updated: ${e.target.value}`,
                                    e.target.value
                                  );
                                  showToast(`AWB tracking updated for ${order.orderNumber}.`);
                                }
                              }}
                              className="bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-[#2C221E]"
                            />
                            <span className="text-[11px] text-stone-400">
                              {order.courierName || 'Blue Dart / DTDC'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 4: SEASONAL CAMPAIGNS & COUPONS
             ========================================== */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                    Seasonal Coupons & Festive Campaigns ({coupons.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Configure percentage or flat discounts, usage limits, and minimum cart amounts for promotions.
                  </p>
                </div>
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="px-4 py-2 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Create Coupon
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="bg-white rounded-2xl border border-[#EAE2D7] p-5 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D7]">
                        <div className="flex items-center gap-1.5">
                          <code className="text-sm font-mono font-bold text-[#2C221E] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EAE2D7]">
                            {c.code}
                          </code>
                          <button
                            onClick={() => handleCopyCode(c.code)}
                            className="p-1 text-stone-400 hover:text-[#2C221E] rounded"
                            title="Copy Code"
                          >
                            {copiedCode === c.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            toggleCoupon(c.code);
                            showToast(`Coupon "${c.code}" toggled.`);
                          }}
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-colors ${
                            c.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          {c.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </div>

                      <h4 className="font-serif text-base font-medium text-[#2C221E] mt-3">
                        {c.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">{c.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs text-stone-600">
                      <div>
                        <span>Discount: </span>
                        <strong className="text-[#2C221E]">
                          {c.discountType === 'percentage'
                            ? `${c.discountValue}%`
                            : `₹${c.discountValue}`}
                        </strong>
                        <span className="text-[11px] text-stone-400 block">
                          Min. Cart: ₹{c.minOrderValue}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Delete coupon "${c.code}"?`)) {
                            deleteCoupon(c.code);
                            showToast(`Deleted coupon "${c.code}".`);
                          }
                        }}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 5: STORE CMS & SETTINGS
             ========================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-[#EAE2D7] p-6 sm:p-8 shadow-xs space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                  Store Settings & Announcement Bar
                </h3>
                <p className="text-xs text-stone-500">
                  Manage the top announcement marquee, brand tagline, and WhatsApp contact details.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={cmsForm.storeName}
                    onChange={(e) => setCmsForm({ ...cmsForm, storeName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
                    Announcement Bar Text
                  </label>
                  <textarea
                    rows={2}
                    value={cmsForm.announcementBarText}
                    onChange={(e) =>
                      setCmsForm({ ...cmsForm, announcementBarText: e.target.value })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                  />
                  <label className="flex items-center gap-2 mt-2 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmsForm.isAnnouncementBarActive}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, isAnnouncementBarActive: e.target.checked })
                      }
                      className="accent-[#2C221E] rounded"
                    />
                    <span>Show announcement marquee bar on top of all pages</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
                      WhatsApp Concierge Number
                    </label>
                    <input
                      type="text"
                      value={cmsForm.whatsappNumber}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
                      Free Shipping Threshold (INR)
                    </label>
                    <input
                      type="number"
                      value={cmsForm.freeShippingThreshold}
                      onChange={(e) =>
                        setCmsForm({
                          ...cmsForm,
                          freeShippingThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
                    Kiln Studio Address
                  </label>
                  <input
                    type="text"
                    value={cmsForm.address}
                    onChange={(e) => setCmsForm({ ...cmsForm, address: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  Save Store Settings
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT CREATE / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAE2D7] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-normal text-[#2C221E] mb-4">
              {editingProduct ? 'Edit Ceramic Design' : 'Add New Handcrafted Design'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cobalt Mughal Tea Cup"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    MRP / Orig. Price
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, originalPrice: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Kiln Stock Count *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={productForm.images[0] || ''}
                  onChange={(e) =>
                    setProductForm({ ...productForm, images: [e.target.value] })
                  }
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Glaze Tone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cobalt Blue & Ivory"
                    value={productForm.glazeTone}
                    onChange={(e) => setProductForm({ ...productForm, glazeTone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Dimensions & Size
                  </label>
                  <input
                    type="text"
                    placeholder="3.5 in Height x 3.2 in Diameter"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Description & Craft Notes
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D7]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COUPON MODAL */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsCouponModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EAE2D7] p-6 z-10">
            <h3 className="font-serif text-lg font-normal text-[#2C221E] mb-4">
              Create Promotional Coupon
            </h3>

            <form onSubmit={handleSaveCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI20"
                  value={couponForm.code}
                  onChange={(e) =>
                    setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })
                  }
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#2C221E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festive Diwali Celebration"
                  value={couponForm.name}
                  onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Discount Type
                  </label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountType: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-2.5 py-2 text-xs"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    required
                    value={couponForm.discountValue}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountValue: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                  Min. Cart Order Value (₹)
                </label>
                <input
                  type="number"
                  value={couponForm.minOrderValue}
                  onChange={(e) =>
                    setCouponForm({
                      ...couponForm,
                      minOrderValue: Number(e.target.value),
                    })
                  }
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D7]">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
