'use client';

import React, { useState } from 'react';
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
  const [passwordInput, setPasswordInput] = useState('homora2026');
  const [loginError, setLoginError] = useState(false);

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

  // Orders filter
  const [orderFilter, setOrderFilter] = useState<string>('all');

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

  // If not logged in, show luxury login gateway
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#EAE2D7] shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#D6C0A6] mx-auto shadow-sm">
              <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <h1 className="font-serif text-2xl text-[#2C221E] font-normal">
              Margaret&apos;s Homora
            </h1>
            <p className="text-xs text-[#5F6B4F] uppercase tracking-widest font-semibold">
              Private Atelier Admin Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                Atelier Master Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter admin password (e.g. homora2026)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                />
              </div>
              {loginError && (
                <span className="text-xs text-rose-600 mt-1 block">
                  Invalid password. Try typing <strong>homora2026</strong>.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE2D7] text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#2C221E]">Demo Access:</span>
              <button
                type="button"
                onClick={() => {
                  setPasswordInput('homora2026');
                  loginAdmin('homora2026');
                }}
                className="text-[11px] text-[#5F6B4F] hover:underline font-bold"
              >
                Auto Fill & Enter &rarr;
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              Passkey: <code className="font-mono font-bold text-[#2C221E]">homora2026</code>
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-[#2C221E] flex items-center justify-center gap-1"
            >
              &larr; Return to Public Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalGrossSales = orders.reduce((sum, o) => sum + o.total, 0);
  const paidSales = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalGrossSales / orders.length) : 0;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.orderStatus === orderFilter;
  });

  // Product Form Save
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = typeof productForm.tags === 'string'
      ? productForm.tags.split(',').map((t) => t.trim())
      : productForm.tags;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        tags: tagArray,
      });
    } else {
      const generatedSlug = productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addProduct({
        ...productForm,
        slug: generatedSlug,
        tags: tagArray,
      });
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
    setIsCouponModalOpen(false);
  };

  // Settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(cmsForm);
    alert('Atelier Store settings updated successfully.');
  };

  return (
    <div className="min-h-screen flex bg-[#FAF7F2] text-[#2C221E]">
      {/* 1. Left Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-[#EAE2D7] hidden md:flex flex-col justify-between py-6 px-4">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D6C0A6]">
              <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-serif font-medium text-sm text-[#2C221E]">
                Margaret&apos;s Homora
              </h2>
              <span className="text-[10px] text-[#5F6B4F] uppercase tracking-wider font-semibold block">
                Atelier Backoffice
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products & Stock</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#2C221E] border border-[#EAE2D7]">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & Shipping</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#2C221E] border border-[#EAE2D7]">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'coupons'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Seasonal Coupons</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#2C221E] border border-[#EAE2D7]">
                {coupons.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-[#FAF7F2]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store CMS & Info</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-6 border-t border-[#EAE2D7]">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F4EFEA] text-xs font-semibold text-[#5F6B4F] transition-colors border border-[#EAE2D7]"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Admin Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar for Mobile & Quick Actions */}
        <header className="bg-white border-b border-[#EAE2D7] py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-lg sm:text-xl font-medium text-[#2C221E] capitalize">
              {activeTab === 'overview'
                ? 'Atelier Analytics & Performance'
                : activeTab === 'products'
                ? 'Ceramic Inventory & Catalog'
                : activeTab === 'orders'
                ? 'Orders & Dispatch Management'
                : activeTab === 'coupons'
                ? 'Promotions & Seasonal Campaigns'
                : 'Store CMS & Brand Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-[#5F6B4F] hover:text-[#2C221E] hidden sm:flex items-center gap-1"
            >
              <span>View Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Tab Pills */}
            <div className="flex md:hidden gap-1 text-[11px]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`p-1.5 rounded ${activeTab === 'overview' ? 'bg-[#2C221E] text-white' : ''}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`p-1.5 rounded ${activeTab === 'products' ? 'bg-[#2C221E] text-white' : ''}`}
              >
                Stock
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`p-1.5 rounded ${activeTab === 'orders' ? 'bg-[#2C221E] text-white' : ''}`}
              >
                Orders
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content Panes */}
        <div className="p-4 sm:p-8 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Total Revenue</span>
                    <TrendingUp className="w-4 h-4 text-[#5F6B4F]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2C221E]">
                    ₹{totalGrossSales.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Verified online & COD bookings
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#C2A06E]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2C221E]">
                    {orders.length}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {orders.filter((o) => o.orderStatus === 'delivered').length} delivered
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Avg. Order Value</span>
                    <span className="text-xs font-mono font-bold">₹</span>
                  </div>
                  <div className="text-2xl font-bold text-[#2C221E]">
                    ₹{avgOrderValue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-stone-500">Basket value per patron</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-stone-500 text-xs">
                    <span className="uppercase tracking-wider font-semibold">Low Kiln Stock</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-amber-700">
                    {lowStockCount} Items
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Requires pottery wheel re-throw
                  </span>
                </div>
              </div>

              {/* Recent Orders List in Overview */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D7]">
                  <h3 className="font-serif text-lg font-medium text-[#2C221E]">
                    Recent Patron Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#5F6B4F] font-semibold hover:underline"
                  >
                    View All Orders &rarr;
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
                        <tr key={o.id} className="hover:bg-[#FAF7F2]">
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

          {/* TAB 2: PRODUCTS & INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                    Catalog & Kiln Inventory ({products.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Add handcrafted designs, adjust stock numbers, manage sale prices and glaze tones.
                  </p>
                </div>
                <button
                  onClick={openCreateProduct}
                  className="px-4 py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add New Ceramic Piece
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] shadow-sm overflow-hidden">
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
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#FAF7F2]">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded overflow-hidden bg-[#F4EFEA] border border-[#EAE2D7] flex-shrink-0">
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
                                className="w-16 bg-[#FAF7F2] border border-[#EAE2D7] rounded px-2 py-1 text-xs text-center font-semibold"
                              />
                              {prod.stock <= prod.lowStockThreshold && (
                                <span className="text-[10px] text-amber-700 font-medium">
                                  Low
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-stone-600">
                            {prod.glazeTone || 'Artisanal'}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditProduct(prod)}
                                className="p-1.5 text-stone-500 hover:text-[#2C221E] hover:bg-stone-100 rounded"
                                title="Edit"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/product/${prod.slug}`}
                                target="_blank"
                                className="p-1.5 text-stone-500 hover:text-[#5F6B4F] hover:bg-stone-100 rounded"
                                title="View on storefront"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete ${prod.name}?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                title="Delete"
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
            </div>
          )}

          {/* TAB 3: ORDERS & SHIPPING */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                    Order Fulfillment & Courier Dispatch
                  </h3>
                  <p className="text-xs text-stone-500">
                    Update order progress, enter tracking references, and view customer invoices.
                  </p>
                </div>

                {/* Filter Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-400">Filter:</span>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="bg-white border border-[#EAE2D7] rounded-lg px-3 py-1.5 text-xs text-[#2C221E] focus:outline-none"
                  >
                    <option value="all">All Statuses ({orders.length})</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-[#EAE2D7] p-5 sm:p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAE2D7] gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#2C221E]">
                            {order.orderNumber}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            • {new Date(order.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">
                          Patron: <strong>{order.customer.fullName}</strong> (+91 {order.customer.phone})
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-[#2C221E]">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                        <Link
                          href={`/order-success/${order.id}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#EAE2D7] rounded text-xs font-semibold text-[#2C221E] flex items-center gap-1.5"
                        >
                          <span>Invoice Slip</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Order Items Snapshot */}
                    <div className="flex flex-wrap gap-4 text-xs">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#FAF7F2] px-2.5 py-1.5 rounded-lg border border-[#EAE2D7]">
                          <div className="relative w-7 h-7 rounded overflow-hidden">
                            <Image src={it.productImage} alt={it.productName} fill className="object-cover" />
                          </div>
                          <span>
                            {it.productName} × {it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Status Changer & Courier Tracking */}
                    <div className="pt-3 border-t border-[#EAE2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 font-medium">Update Status:</span>
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="bg-white border border-[#EAE2D7] rounded px-3 py-1 text-xs font-semibold text-[#2C221E] focus:outline-none capitalize"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Courier tracking updater */}
                      <div className="flex items-center gap-2">
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
                            }
                          }}
                          className="bg-[#FAF7F2] border border-[#EAE2D7] rounded px-2.5 py-1 text-xs font-mono"
                        />
                        <span className="text-[11px] text-stone-400">
                          {order.courierName || 'Blue Dart / DTDC'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SEASONAL COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">
                    Seasonal Coupons & Festive Campaigns
                  </h3>
                  <p className="text-xs text-stone-500">
                    Configure percentage or flat discounts, usage limits, and minimum cart amounts.
                  </p>
                </div>
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="px-4 py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Create Coupon
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="bg-white rounded-2xl border border-[#EAE2D7] p-5 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D7]">
                        <code className="text-sm font-mono font-bold text-[#2C221E] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#EAE2D7]">
                          {c.code}
                        </code>
                        <button
                          onClick={() => toggleCoupon(c.code)}
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            c.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          {c.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </div>

                      <h4 className="font-serif text-base font-medium text-[#2C221E] mt-3">
                        {c.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">{c.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE2D7] flex items-center justify-between text-xs text-stone-600">
                      <div>
                        <span>Discount: </span>
                        <strong>
                          {c.discountType === 'percentage'
                            ? `${c.discountValue}%`
                            : `₹${c.discountValue}`}
                        </strong>
                        <span className="text-[11px] text-stone-400 block">
                          Min. Cart: ₹{c.minOrderValue}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteCoupon(c.code)}
                        className="text-stone-400 hover:text-rose-600 p-1"
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

          {/* TAB 5: STORE CMS & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl">
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
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={cmsForm.storeName}
                    onChange={(e) => setCmsForm({ ...cmsForm, storeName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Announcement Bar Text
                  </label>
                  <textarea
                    rows={2}
                    value={cmsForm.announcementBarText}
                    onChange={(e) =>
                      setCmsForm({ ...cmsForm, announcementBarText: e.target.value })
                    }
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:outline-none"
                  />
                  <label className="flex items-center gap-2 mt-2 text-xs text-stone-600">
                    <input
                      type="checkbox"
                      checked={cmsForm.isAnnouncementBarActive}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, isAnnouncementBarActive: e.target.checked })
                      }
                      className="accent-[#2C221E]"
                    />
                    <span>Show announcement bar on top of all pages</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      WhatsApp Concierge Number
                    </label>
                    <input
                      type="text"
                      value={cmsForm.whatsappNumber}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
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
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Kiln Studio Address
                  </label>
                  <input
                    type="text"
                    value={cmsForm.address}
                    onChange={(e) => setCmsForm({ ...cmsForm, address: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2 text-xs text-[#2C221E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAE2D7] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                  className="px-6 py-2 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCouponModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#EAE2D7] p-6 z-10">
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
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs uppercase focus:outline-none"
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
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-2.5 py-2 text-xs"
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
                    className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs"
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
                  className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs"
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
                  className="px-5 py-2 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
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
