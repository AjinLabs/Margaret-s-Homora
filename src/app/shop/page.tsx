'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import QuickViewModal from '@/components/QuickViewModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
} from 'lucide-react';

function ShopContent() {
  const { products, categories } = useStore();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || 'all'
  );
  const [selectedGlaze, setSelectedGlaze] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(9000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Glaze filter
        if (selectedGlaze !== 'all') {
          if (!p.glazeTone?.toLowerCase().includes(selectedGlaze.toLowerCase())) {
            return false;
          }
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // In-stock filter
        if (onlyInStock && p.stock <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, selectedCategory, selectedGlaze, maxPrice, sortBy, onlyInStock]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGlaze('all');
    setMaxPrice(9000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Breadcrumb & Kiln Assurance Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 pb-4 border-b border-[#EAE2D7] gap-2">
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span>Collections</span>
            <span>/</span>
            <span className="text-[#2C221E] font-medium">
              {currentCategoryObj ? currentCategoryObj.name : 'All Ceramics & Tableware'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#5F6B4F] text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#5F6B4F]" />
            <span>ARTISANAL CERAMICS • KERALA KILNS (1,280°C)</span>
          </div>
        </div>

        {/* Collection Editorial Headline */}
        <div className="py-6 sm:py-8 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#5F6B4F] font-semibold">
            Series 04 / Autumn Hearth
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2C221E]">
            {currentCategoryObj ? currentCategoryObj.name : 'Crockery & Tableware'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-normal leading-relaxed">
            {currentCategoryObj
              ? currentCategoryObj.description
              : 'High-fire stoneware, organic textured glazes, and heirloom tableware designed for shared feasts and quiet morning rituals.'}
          </p>

          <div className="flex flex-wrap gap-4 text-[11px] text-[#5F6B4F] pt-2">
            <span>Kiln Fired: 1,280°C</span>
            <span>•</span>
            <span>Lead-Free Glaze</span>
            <span>•</span>
            <span>Microwave & Dishwasher Safe</span>
          </div>
        </div>

        {/* Quick Filter Pills & Sorting Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 border-y border-[#EAE2D7]">
          {/* Quick pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#2C221E] uppercase tracking-wider mr-1">
              Filter By:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#2C221E] text-white font-medium'
                  : 'bg-white text-stone-600 border border-[#EAE2D7] hover:bg-[#F4EFEA]'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => setSelectedCategory('ceramics-tableware')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                selectedCategory === 'ceramics-tableware'
                  ? 'bg-[#2C221E] text-white font-medium'
                  : 'bg-white text-stone-600 border border-[#EAE2D7] hover:bg-[#F4EFEA]'
              }`}
            >
              Tableware & Cups
            </button>
            <button
              onClick={() => setSelectedCategory('vases-planters')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                selectedCategory === 'vases-planters'
                  ? 'bg-[#2C221E] text-white font-medium'
                  : 'bg-white text-stone-600 border border-[#EAE2D7] hover:bg-[#F4EFEA]'
              }`}
            >
              Vases & Planters
            </button>
            <button
              onClick={() => setSelectedCategory('gifts-hampers')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                selectedCategory === 'gifts-hampers'
                  ? 'bg-[#2C221E] text-white font-medium'
                  : 'bg-white text-stone-600 border border-[#EAE2D7] hover:bg-[#F4EFEA]'
              }`}
            >
              Festive Gifting
            </button>
            <button
              onClick={resetFilters}
              className="text-xs text-[#C0745A] hover:underline px-2 py-1 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Counts & Sort Selector */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs text-stone-500 font-medium">
              {filteredProducts.length} Handcrafted Pieces
            </span>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE2D7] rounded text-xs font-medium text-[#2C221E]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-stone-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#EAE2D7] rounded px-2.5 py-1.5 text-xs text-[#2C221E] focus:outline-none"
              >
                <option value="featured">Featured Items</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Left Sidebar: Refine Studio (Image 4 reference) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl p-5 border border-[#EAE2D7] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D7]">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#2C221E] flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#5F6B4F]" /> Refine Studio
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#C0745A] hover:underline uppercase tracking-wider font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* Department Checkboxes */}
              <div>
                <h4 className="text-xs font-semibold text-[#2C221E] uppercase tracking-wider mb-3">
                  Department
                </h4>
                <div className="space-y-2 text-xs text-stone-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dept"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="accent-[#2C221E]"
                    />
                    <span>All Collections ({products.length})</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dept"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="accent-[#2C221E]"
                      />
                      <span>
                        {cat.name} ({products.filter((p) => p.category === cat.slug).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#EAE2D7]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#2C221E] uppercase tracking-wider mb-2">
                  <span>Price Range (INR)</span>
                  <span>Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="9000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2C221E]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>₹50</span>
                  <span>₹9,000</span>
                </div>
              </div>

              {/* Artisanal Glaze Tone Palette */}
              <div className="pt-4 border-t border-[#EAE2D7]">
                <h4 className="text-xs font-semibold text-[#2C221E] uppercase tracking-wider mb-3">
                  Artisanal Glaze Tone
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'All Glazes', value: 'all', color: '#D6C0A6' },
                    { label: 'Raw Terracotta', value: 'terracotta', color: '#C0745A' },
                    { label: 'Cobalt Mughal', value: 'cobalt', color: '#1E3A8A' },
                    { label: 'Periyar Sage', value: 'sage', color: '#6E7E60' },
                    { label: 'Matte Sand Ivory', value: 'sand', color: '#DEC9B2' },
                    { label: 'Midnight Blue', value: 'blue', color: '#172554' },
                  ].map((glaze) => (
                    <button
                      key={glaze.value}
                      onClick={() => setSelectedGlaze(glaze.value)}
                      className={`w-full flex items-center justify-between p-1.5 rounded transition-colors ${
                        selectedGlaze === glaze.value
                          ? 'bg-[#FAF7F2] font-semibold text-[#2C221E]'
                          : 'text-stone-600 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: glaze.color }}
                        />
                        <span>{glaze.label}</span>
                      </div>
                      {selectedGlaze === glaze.value && (
                        <Check className="w-3.5 h-3.5 text-[#5F6B4F]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-4 border-t border-[#EAE2D7]">
                <label className="flex items-center gap-2 text-xs text-[#2C221E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-[#2C221E] rounded"
                  />
                  <span className="font-medium">Ready to Dispatch (In-Stock Only)</span>
                </label>
              </div>

              {/* Direct Kiln Heritage Box */}
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE2D7] text-[11px] text-stone-600">
                <span className="font-semibold text-[#5F6B4F] block mb-1">
                  • Direct Kiln Heritage
                </span>
                Each stoneware piece is fired in reduction kilns along the Malabar coast, ensuring thermal durability and unique organic character.
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-[#EAE2D7]">
                <p className="font-serif text-lg text-[#2C221E]">
                  No handcrafted ceramics match these filters
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Try adjusting the glaze tone or price range to explore our collections.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2 bg-[#2C221E] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#3E3029]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D7]">
              <h3 className="font-serif text-base font-medium text-[#2C221E]">
                Refine Studio Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-[#2C221E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="py-4 space-y-6 text-xs">
              <div>
                <h4 className="font-semibold text-[#2C221E] uppercase mb-2">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mdept"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="accent-[#2C221E]"
                    />
                    <span>All Collections</span>
                  </label>
                  {categories.map((c) => (
                    <label key={c.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mdept"
                        checked={selectedCategory === c.slug}
                        onChange={() => setSelectedCategory(c.slug)}
                        className="accent-[#2C221E]"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#2C221E] uppercase mb-2">
                  Price Up To ₹{maxPrice}
                </h4>
                <input
                  type="range"
                  min="50"
                  max="9000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2C221E]"
                />
              </div>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Atelier Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
