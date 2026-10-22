'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import QuickViewModal from '@/components/QuickViewModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import Ceramic3DViewer from '@/components/Ceramic3DViewer';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCw,
  Star,
  Tag,
  Check,
  Feather,
} from 'lucide-react';

export default function HomePage() {
  const { products, categories, settings } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'mugs' | 'sets' | 'hampers'>('all');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Filter products for the showcase tab
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mugs') return p.subCategory?.includes('Mugs') || p.name.toLowerCase().includes('cup') || p.name.toLowerCase().includes('mug');
    if (activeTab === 'sets') return p.subCategory?.includes('Set') || p.name.toLowerCase().includes('set');
    if (activeTab === 'hampers') return p.category === 'gifts-hampers';
    return true;
  });

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* 1. HERO SECTION: Editorial & 3D Interactive Studio */}
        <section className="relative w-full border-b border-[#EAE2D7] overflow-hidden bg-gradient-to-b from-[#F4EFEA] to-[#FAF7F2] py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE2D7] text-xs font-medium text-[#5F6B4F]">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A06E]" />
                <span className="uppercase tracking-widest text-[10px]">
                  Series 04 • Autumn Hearth Collection
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2C221E] leading-[1.12]">
                Artisanal Tableware & Ceramic Poetry
              </h1>

              <p className="text-sm sm:text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                Handcrafted stoneware, organic textured glazes, and heirloom tableware shaped by Kerala kiln traditions. Designed for shared feasts and quiet morning rituals.
              </p>

              {/* Tagline Badge */}
              <div className="pt-1">
                <span className="font-serif italic text-base sm:text-lg text-[#5F6B4F] block">
                  &ldquo;Beautiful Spaces. Thoughtful Living.&rdquo;
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="px-6 py-3.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs uppercase tracking-widest font-semibold rounded shadow-sm transition-all flex items-center gap-2 group"
                >
                  <span>Explore All Ceramics</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/shop?category=ceramics-tableware"
                  className="px-6 py-3.5 bg-white hover:bg-[#F4EFEA] text-[#2C221E] text-xs uppercase tracking-widest font-semibold rounded border border-[#EAE2D7] shadow-sm transition-colors"
                >
                  Morning Chai & Cups
                </Link>
              </div>

              {/* Assurance Badges */}
              <div className="pt-6 border-t border-[#EAE2D7]/80 grid grid-cols-3 gap-4 text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#EAE2D7] flex items-center justify-center text-[#5F6B4F]">
                    <Feather className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <strong className="block text-[#2C221E]">Kiln-Fired 1,280°C</strong>
                    Lead-free food safe
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#EAE2D7] flex items-center justify-center text-[#5F6B4F]">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <strong className="block text-[#2C221E]">Pan-India Delivery</strong>
                    Padded fragile packing
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-[#EAE2D7] flex items-center justify-center text-[#5F6B4F]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <strong className="block text-[#2C221E]">Direct Studio</strong>
                    Kerala ceramic heritage
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Ceramic Turntable Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-white/70 backdrop-blur-md border border-[#EAE2D7] p-2 shadow-xl overflow-hidden">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-[#EFE4D6]">
                  {/* Three.js 3D Viewer */}
                  <Ceramic3DViewer modelType="vase" initialGlaze="terracotta" interactive={true} />
                </div>
                {/* Caption */}
                <div className="p-3 text-center">
                  <span className="font-serif text-sm font-medium text-[#2C221E]">
                    Interactive Studio Showcase
                  </span>
                  <p className="text-[11px] text-[#82926E] mt-0.5">
                    Rotate 360° to inspect our terracotta, mineral sage, and cobalt glazes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CURATED CATEGORIES ROW */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-8 border-b border-[#EAE2D7]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#5F6B4F] font-semibold">
                Departments
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal mt-1">
                Curated by Ritual & Space
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-wider font-semibold text-[#5F6B4F] hover:text-[#2C221E] transition-colors mt-2 sm:mt-0 flex items-center gap-1"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-[#EAE2D7] hover:border-[#2C221E] transition-all hover:shadow-md"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4EFEA]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-sm sm:text-base font-normal leading-snug">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-[#EFE4D6] tracking-wider uppercase">
                      {cat.itemCount} Designs
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. WHATSAPP PROFILE EXACT PRODUCTS SHOWCASE */}
        <section className="py-14 bg-white border-b border-[#EAE2D7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-[#EAE2D7] text-[11px] font-medium text-[#5F6B4F] mb-1">
                  <Sparkles className="w-3 h-3 text-[#C2A06E]" />
                  <span>From Our WhatsApp Studio Catalog</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal">
                  Everyday Ceramic & Tea Rituals
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Hand-painted mugs, stackable kettle sets, cutting chai glasses, and ceramic travel tumblers.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'mugs', label: 'Cups & Mugs' },
                  { id: 'sets', label: 'Tea & Coffee Sets' },
                  { id: 'hampers', label: 'Gift Hampers' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#2C221E] text-white shadow-sm'
                        : 'bg-[#FAF7F2] text-stone-600 hover:bg-[#EFE4D6]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 12).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAF7F2] hover:bg-[#F4EFEA] text-[#2C221E] text-xs uppercase tracking-widest font-semibold rounded border border-[#EAE2D7] transition-colors"
              >
                <span>View All 27 Handcrafted Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. SLOW CRAFT EDITORIAL STORY (Image 4 reference) */}
        <section className="py-16 bg-[#FAF7F2] border-b border-[#EAE2D7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-white rounded-2xl border border-[#EAE2D7] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Image: Potter's touch */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-[420px] w-full bg-[#F4EFEA]">
                <Image
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80"
                  alt="Potter throwing clay in Kerala atelier"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] uppercase tracking-widest font-semibold text-[#5F6B4F]">
                  The Potter&apos;s Touch
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
                  Heirloom Craftsmanship
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#2C221E] font-normal leading-tight">
                  Slow Craft for Modern Tables
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Every curve of our crockery is calibrated to balance perfectly in the palm. We use indigenous clay formulations from the clay belts of Kerala, naturally sealed with food-grade wood-ash and feldspar glazes.
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Fired above 1,280°C in reduction kilns along the Malabar coast, ensuring extreme thermal durability and microwave safety.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C0745A] hover:bg-[#a9634b] text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow-sm"
                  >
                    <span>Explore Studio Philosophy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SEASONAL CAMPAIGN & COUPON PROMOTIONS */}
        <section className="py-14 bg-[#F4EFEA] border-b border-[#EAE2D7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
                Festive Campaigns & Seasonal Codes
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal mt-1">
                Thoughtfully Gifted. Deliberately Lived.
              </h2>
              <p className="text-xs text-stone-600 mt-2">
                Apply these curated coupon codes directly during cart review or checkout for instant savings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Coupon 1 */}
              <div className="bg-white rounded-xl p-6 border border-[#EAE2D7] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5F6B4F] mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Sitewide Welcome</span>
                    <Tag className="w-4 h-4 text-[#C0745A]" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">10% Off Orders Above ₹500</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Valid across all handcrafted cups, teapots, and ceramic dinner sets.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <code className="text-xs font-mono font-bold text-[#2C221E] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#EAE2D7]">
                    HOMORA10
                  </code>
                  <button
                    onClick={() => handleCopyCoupon('HOMORA10')}
                    className="text-xs font-semibold text-[#5F6B4F] hover:text-[#2C221E] flex items-center gap-1"
                  >
                    {copiedCoupon === 'HOMORA10' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      'Copy Code'
                    )}
                  </button>
                </div>
              </div>

              {/* Coupon 2 */}
              <div className="bg-white rounded-xl p-6 border-2 border-[#D6C0A6] shadow-md flex flex-col justify-between relative">
                <span className="absolute -top-3 left-6 bg-[#C0745A] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Festive Special
                </span>
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5F6B4F] mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Celebration Edit</span>
                    <Sparkles className="w-4 h-4 text-[#C2A06E]" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">15% Off Orders Above ₹1,200</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Ideal for hosting coffee sets, chai caddies, and bespoke dinner services.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <code className="text-xs font-mono font-bold text-[#2C221E] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#EAE2D7]">
                    FESTIVE15
                  </code>
                  <button
                    onClick={() => handleCopyCoupon('FESTIVE15')}
                    className="text-xs font-semibold text-[#5F6B4F] hover:text-[#2C221E] flex items-center gap-1"
                  >
                    {copiedCoupon === 'FESTIVE15' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      'Copy Code'
                    )}
                  </button>
                </div>
              </div>

              {/* Coupon 3 */}
              <div className="bg-white rounded-xl p-6 border border-[#EAE2D7] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5F6B4F] mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">First Purchase</span>
                    <Tag className="w-4 h-4 text-[#82926E]" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#2C221E]">Flat ₹50 Off Any Order</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Try any mini espresso cup or handcrafted mug with zero minimum worry.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <code className="text-xs font-mono font-bold text-[#2C221E] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#EAE2D7]">
                    WELCOME50
                  </code>
                  <button
                    onClick={() => handleCopyCoupon('WELCOME50')}
                    className="text-xs font-semibold text-[#5F6B4F] hover:text-[#2C221E] flex items-center gap-1"
                  >
                    {copiedCoupon === 'WELCOME50' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      'Copy Code'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. VERIFIED PATRON TESTIMONIALS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8 border-b border-[#EAE2D7]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
              Client Notes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal mt-1">
              Cherished in Living Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The Rose Quartz tea set is simply breathless. The gold rim lustre and subtle rose glaze make our Sunday morning filter coffee feel like an exquisite royal ritual.",
                author: "Devika Chandran",
                city: "Kochi, Kerala",
                item: "Rose Quartz Afternoon Tea Service",
                rating: 5,
              },
              {
                quote: "Received the cutting chai glasses and metal rack in immaculate condition. The packaging had triple-layer protection, not a single chip. True Kerala craftsmanship.",
                author: "Aditi Sharma",
                city: "Bengaluru, Karnataka",
                item: "Artisanal Ceramic Chai Set",
                rating: 5,
              },
              {
                quote: "The Mughal print mugs have become my daily essentials. The weight in the palm is substantial and the handle curve is so comfortable. Highly recommend Margaret's Homora.",
                author: "Meera Varma",
                city: "Kozhikode, Kerala",
                item: "Mughal Print Cup",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#EAE2D7] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C2A06E] mb-3">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#C2A06E]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#F0EAE1]">
                  <strong className="block text-xs font-semibold text-[#2C221E]">
                    {review.author}
                  </strong>
                  <span className="text-[11px] text-stone-500">{review.city}</span>
                  <span className="block text-[10px] text-[#5F6B4F] mt-0.5">
                    Verified Buyer • {review.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. INSTAGRAM & STUDIO GALLERY */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
              @MargaretsHomora
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal mt-1">
              Visual Moments from the Atelier
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Follow our daily kiln firings, glaze recipes, and table styling journal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2 sm:px-4">
            {[
              "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=600&q=80",
            ].map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-lg overflow-hidden group bg-[#F4EFEA]"
              >
                <Image
                  src={imgUrl}
                  alt={`Studio Moment ${idx}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                  <span>View Story</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <WhatsAppButton />
    </div>
  );
}
