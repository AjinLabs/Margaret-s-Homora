'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE2D7] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#C0745A] text-[#C0745A]" />
            <h2 className="font-serif text-lg font-medium text-[#2C221E]">
              Curated Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-full text-stone-500 hover:text-[#2C221E] hover:bg-[#FAF7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#EAE2D7]">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-[#F4EFEA] flex items-center justify-center mb-4 text-[#C0745A]">
                <Heart className="w-8 h-8" />
              </div>
              <p className="font-serif text-lg text-[#2C221E] font-medium">
                No saved treasures yet
              </p>
              <p className="text-xs text-stone-500 max-w-xs mt-1 leading-relaxed">
                Click the heart on any ceramic, teapot, or decorative bowl to save it here for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-6 px-6 py-2.5 bg-[#2C221E] text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-[#3E3029] transition-colors"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center justify-between">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setIsWishlistOpen(false)}
                  className="flex gap-3 items-center flex-1"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[#F4EFEA] flex-shrink-0 border border-[#EAE2D7]">
                    <Image
                      src={product.images[0] || '/images/hero_banner.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#2C221E] line-clamp-1 hover:text-[#5F6B4F]">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#2C221E] mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-[#5F6B4F]">
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={product.stock === 0}
                    className="p-2 bg-[#2C221E] hover:bg-[#3E3029] text-white rounded text-xs transition-colors shadow-sm disabled:opacity-50"
                    title="Move to bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-stone-400 hover:text-[#C0745A] transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
