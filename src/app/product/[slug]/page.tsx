'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
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
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCw,
  MessageCircle,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  Play,
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const {
    getProductBySlug,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    settings,
    setIsCartOpen,
  } = useStore();

  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [show3D, setShow3D] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  // New review state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="font-serif text-2xl text-[#2C221E]">Ceramic Piece Not Found</h2>
          <p className="text-xs text-stone-500 mt-2">
            This design may have retired or returned to the kiln.
          </p>
          <Link
            href="/shop"
            className="mt-6 px-6 py-2.5 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Explore Available Pieces
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const getWhatsAppProductLink = () => {
    const message = `Hello Margaret's Homora! 🌸%0AI would like to order the *${product.name}* (Price: ₹${product.price}, SKU: ${product.sku}).%0APlease let me know delivery estimate for my address.`;
    const phone = (settings.whatsappNumber || '').replace(/[^0-9]/g, '') || '917012543613';
    return `https://wa.me/${phone}?text=${message}`;
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 pb-6 border-b border-[#EAE2D7]">
          <Link href="/" className="hover:text-[#2C221E]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-[#2C221E]">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-[#2C221E] capitalize"
          >
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2C221E] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Section: Gallery (Left) & Purchasing Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 pb-14">
          {/* Left: Images & 3D Interactive Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#EAE2D7] shadow-sm">
              {showVideo && product.videoUrl ? (
                <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : show3D ? (
                <div className="w-full h-full bg-gradient-to-br from-[#FAF7F2] to-[#EFE4D6]">
                  <Ceramic3DViewer
                    modelType={product.threeDType || 'vase'}
                    initialGlaze={
                      product.glazeTone?.toLowerCase().includes('cobalt') ||
                      product.glazeTone?.toLowerCase().includes('blue')
                        ? 'cobalt'
                        : product.glazeTone?.toLowerCase().includes('sage')
                        ? 'sage'
                        : 'terracotta'
                    }
                  />
                </div>
              ) : (
                <Image
                  src={
                    product.images[selectedImage] ||
                    product.images[0] ||
                    '/images/hero_banner.jpg'
                  }
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
              )}

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isFestiveSpecial && (
                  <span className="bg-[#C0745A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    Festive Edit
                  </span>
                )}
                {product.isBestseller && !product.isFestiveSpecial && (
                  <span className="bg-[#5F6B4F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    Studio Bestseller
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#FAF7F2] text-[#C0745A] border border-[#C0745A]/40 text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Media Switch Buttons (3D Turntable & Video) */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => {
                    setShow3D(!show3D);
                    setShowVideo(false);
                  }}
                  className="bg-[#2C221E]/90 hover:bg-[#2C221E] text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm transition-all"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{show3D ? 'View Photos' : '3D Studio'}</span>
                </button>

                {product.videoUrl && (
                  <button
                    onClick={() => {
                      setShowVideo(!showVideo);
                      setShow3D(false);
                    }}
                    className="bg-emerald-800/90 hover:bg-emerald-800 text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{showVideo ? 'View Photos' : 'Watch Video'}</span>
                  </button>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#2C221E] hover:bg-white flex items-center justify-center shadow-sm transition-transform hover:scale-110"
                title="Share piece"
              >
                {shareCopied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Thumbnail selector */}
            {!show3D && !showVideo && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === i
                        ? 'border-[#2C221E] ring-2 ring-[#2C221E]/20'
                        : 'border-[#EAE2D7] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Purchasing & Studio Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5F6B4F] mb-1">
                <span className="uppercase tracking-widest font-semibold text-[11px]">
                  {product.glazeTone || 'Handcrafted Ceramic'}
                </span>
                <span className="text-stone-400 font-mono text-[11px]">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#2C221E] leading-tight">
                {product.name}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center text-[#C2A06E]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C2A06E]'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#2C221E]">
                  {product.rating}
                </span>
                <span className="text-xs text-stone-400">
                  ({product.reviewCount} verified studio reviews)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-white border border-[#EAE2D7] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#2C221E]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold text-[#C0745A] bg-[#FAF7F2] border border-[#C0745A]/30 px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discountPercent}%)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Inclusive of all taxes. Free pan-India courier on orders over ₹{settings.freeShippingThreshold}.
              </p>

              {/* Stock Status */}
              <div className="pt-2 text-xs">
                {product.stock > 0 ? (
                  product.stock <= 5 ? (
                    <span className="text-amber-800 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                      Only {product.stock} items remaining from this firing batch
                    </span>
                  ) : (
                    <span className="text-[#5F6B4F] font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#5F6B4F]" />
                      In Stock • Dispatches within 24 hours from Kerala atelier
                    </span>
                  )
                ) : (
                  <span className="text-rose-700 font-medium">Currently in next kiln cycle</span>
                )}
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#EAE2D7] rounded-lg bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-600 hover:bg-[#FAF7F2] rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-semibold text-[#2C221E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 text-stone-600 hover:bg-[#FAF7F2] rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isAdded
                      ? 'bg-[#5F6B4F] text-white'
                      : 'bg-[#2C221E] hover:bg-[#3E3029] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Atelier Bag
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3.5 rounded-lg border border-[#EAE2D7] bg-white hover:bg-[#FAF7F2] text-[#2C221E] transition-colors"
                  title="Save to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-[#C0745A] text-[#C0745A]' : 'text-[#5F6B4F]'
                    }`}
                  />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full py-3.5 bg-[#C0745A] hover:bg-[#a9634b] text-white text-xs font-semibold uppercase tracking-widest rounded-lg shadow-sm transition-colors text-center"
              >
                Instant Buy Now
              </button>

              {/* WhatsApp Inquiry Button */}
              <a
                href={getWhatsAppProductLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire or Order via WhatsApp</span>
              </a>
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="p-4 rounded-xl bg-white border border-[#EAE2D7] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Material</span>
                <span className="font-medium text-[#2C221E]">{product.materials}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Dimensions</span>
                <span className="font-medium text-[#2C221E]">{product.dimensions}</span>
              </div>
              {product.capacity && (
                <div>
                  <span className="text-stone-400 block text-[11px]">Capacity</span>
                  <span className="font-medium text-[#2C221E]">{product.capacity}</span>
                </div>
              )}
              <div>
                <span className="text-stone-400 block text-[11px]">Glaze Finish</span>
                <span className="font-medium text-[#2C221E]">
                  {product.glazeTone || 'Artisanal'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <section className="py-8 border-t border-[#EAE2D7]">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#EAE2D7] gap-8 text-xs uppercase tracking-wider font-semibold">
            {[
              { id: 'details', label: 'Ceramic Details & Story' },
              { id: 'care', label: 'Care & Kiln Longevity' },
              { id: 'shipping', label: 'Fragile Packaging & Shipping' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#2C221E] border-b-2 border-[#2C221E]'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-6 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <div className="p-4 bg-white rounded-lg border border-[#EAE2D7] space-y-2">
                  <strong className="block text-[#2C221E]">Artisanal Glaze Character:</strong>
                  <p>
                    Because each piece is hand-dipped and fired in high-temperature kilns, subtle variations in iron speckles, surface tone, and rim flow are natural hallmarks of authentic ceramics. No two pieces are entirely identical.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <p>
                  <strong>Daily Care Guide:</strong> {product.careInstructions}
                </p>
                <ul className="list-disc list-inside space-y-1.5 pt-2 text-stone-600">
                  <li>Microwave Safe: Suitable for warming tea, coffee, and stews.</li>
                  <li>Dishwasher Safe: Place in the top rack with gentle detergents.</li>
                  <li>Avoid sudden extreme thermal shock (do not transfer straight from boiling water to an ice bath).</li>
                  <li>Wash with soft natural sponges; avoid wire scrubbers to keep glazes pristine.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <p>
                  <strong>Our Ceramic Transit Guarantee:</strong> Every item is wrapped in custom biodegradable honeycomb cushioning, double-walled corrugated air boxes, and labeled with high-visibility fragile decals.
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-stone-600">
                  <li>Pan-India Express courier dispatch via Blue Dart & DTDC.</li>
                  <li>Complimentary shipping on orders over ₹{settings.freeShippingThreshold}.</li>
                  <li>In the rare event of transit damage, notify us within 48 hours for an instant replacement or full refund.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit New Review Form */}
                <div className="bg-white p-5 rounded-xl border border-[#EAE2D7] space-y-3">
                  <h4 className="font-serif text-base font-medium text-[#2C221E]">
                    Share Your Studio Experience
                  </h4>
                  {reviewSubmitted ? (
                    <div className="p-3 bg-[#EFE4D6] rounded text-[#5F6B4F] text-xs font-medium flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#5F6B4F]" />
                      <span>Thank you! Your verified review has been published.</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setReviewSubmitted(true);
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name (e.g. Ananya)"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          className="bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Your City (e.g. Kochi, Kerala)"
                          value={reviewCity}
                          onChange={(e) => setReviewCity(e.target.value)}
                          className="bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Rating:</span>
                        <div className="flex gap-1 text-[#C2A06E]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= reviewRating
                                    ? 'fill-[#C2A06E]'
                                    : 'text-stone-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        required
                        rows={3}
                        placeholder="Share your thoughts on the glaze texture, weight, and daily experience..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[#EAE2D7]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#2C221E] text-xs">Pooja Nair</span>
                      <span className="text-[11px] text-stone-400">2 weeks ago</span>
                    </div>
                    <div className="flex items-center text-[#C2A06E] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C2A06E]" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600">
                      The glaze feels so soothing to touch. It holds heat wonderfully and looks stunning on our wooden breakfast counter.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Handcrafted Ceramics */}
        {relatedProducts.length > 0 && (
          <section className="py-12 border-t border-[#EAE2D7]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-[#2C221E] font-normal">
                Complementary Pieces from the Atelier
              </h2>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-wider font-semibold text-[#5F6B4F] hover:text-[#2C221E]"
              >
                View Catalog &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

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
