'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-lg border border-[#EAE2D7] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#D6C0A6]">
      {/* Image Container with Badges */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#F4EFEA]">
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isFestiveSpecial && (
            <span className="bg-[#C0745A] text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded tracking-wider shadow-sm">
              Festive Edit
            </span>
          )}
          {product.isBestseller && !product.isFestiveSpecial && (
            <span className="bg-[#5F6B4F] text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && !product.isFestiveSpecial && (
            <span className="bg-[#2C221E] text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded tracking-wider shadow-sm">
              New In
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#FAF7F2] text-[#C0745A] border border-[#C0745A]/30 text-[10px] font-semibold px-1.5 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#2C221E] transition-all hover:bg-white hover:scale-110 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#C0745A] text-[#C0745A]' : 'text-[#5F6B4F]'
            }`}
          />
        </button>

        {/* Quick View overlay trigger on hover */}
        {onQuickView && (
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <button
              onClick={handleQuickViewClick}
              className="pointer-events-auto bg-white/95 hover:bg-white text-[#2C221E] text-xs font-medium px-3.5 py-2 rounded-full shadow-md transition-transform transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#5F6B4F]" /> Quick View
            </button>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-col p-4 flex-1 justify-between">
        <div>
          {/* Metadata & Rating */}
          <div className="flex items-center justify-between text-xs text-[#5F6B4F] mb-1">
            <span className="uppercase tracking-wider text-[10px] font-medium truncate max-w-[65%]">
              {product.glazeTone || product.subCategory || 'Handcrafted Ceramic'}
            </span>
            <div className="flex items-center gap-1 text-[#2C221E]">
              <Star className="w-3 h-3 fill-[#C2A06E] text-[#C2A06E]" />
              <span className="font-medium text-[11px]">{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-[15px] sm:text-base font-medium text-[#2C221E] line-clamp-1 group-hover:text-[#5F6B4F] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-semibold text-[#2C221E]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#5F6B4F] font-medium">
              {product.stock > 0 ? (
                product.stock <= 5 ? (
                  <span className="text-amber-700">Only {product.stock} left in kiln</span>
                ) : (
                  'In Stock • Ready to dispatch'
                )
              ) : (
                <span className="text-stone-400">Backorder available</span>
              )}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-3.5 py-2 rounded text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm ${
              isAdded
                ? 'bg-[#5F6B4F] text-white'
                : 'bg-[#2C221E] hover:bg-[#3E3029] text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
