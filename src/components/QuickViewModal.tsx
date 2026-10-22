'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Check,
  MessageCircle,
  Truck,
  RotateCw,
} from 'lucide-react';
import Ceramic3DViewer from './Ceramic3DViewer';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist, settings } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [show3D, setShow3D] = useState(false);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const getWhatsAppProductLink = () => {
    const text = `Hello Margaret's Homora! 🌸%0AI am interested in purchasing the *${product.name}* (SKU: ${product.sku}, Price: ₹${product.price}).%0APlease let me know delivery timelines.`;
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-xl shadow-2xl border border-[#EAE2D7] overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 text-[#2C221E] hover:bg-white flex items-center justify-center shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Media Gallery / 3D Canvas */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#F4EFEA] flex flex-col justify-between">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white border border-[#EAE2D7]">
            {show3D ? (
              <Ceramic3DViewer
                modelType={product.threeDType || 'vase'}
                initialGlaze={
                  product.glazeTone?.toLowerCase().includes('blue') ||
                  product.glazeTone?.toLowerCase().includes('cobalt')
                    ? 'cobalt'
                    : product.glazeTone?.toLowerCase().includes('sage')
                    ? 'sage'
                    : 'terracotta'
                }
              />
            ) : (
              <Image
                src={product.images[selectedImage] || product.images[0] || '/images/hero_banner.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}

            {/* 3D toggle badge */}
            <button
              onClick={() => setShow3D(!show3D)}
              className="absolute bottom-3 left-3 bg-[#2C221E]/90 hover:bg-[#2C221E] text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-all backdrop-blur-sm"
            >
              <RotateCw className="w-3.5 h-3.5" />
              {show3D ? 'View Photos' : '3D Interactive Studio'}
            </button>
          </div>

          {/* Thumbnail strip */}
          {!show3D && product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-14 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-[#2C221E]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#FAF7F2]">
          <div>
            {/* Category / Glaze */}
            <div className="flex items-center justify-between text-xs text-[#5F6B4F] mb-1">
              <span className="uppercase tracking-wider font-medium text-[10px]">
                {product.glazeTone || product.category}
              </span>
              <span className="text-stone-400 text-[11px]">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2C221E]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-[#C2A06E]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#C2A06E]'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#2C221E]">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-bold text-[#2C221E]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-[#C0745A] bg-[#FAF7F2] border border-[#C0745A]/40 px-2 py-0.5 rounded">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="mt-4 pt-4 border-t border-[#EAE2D7] grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-stone-400 block">Dimensions</span>
                <span className="font-medium text-[#2C221E]">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Materials</span>
                <span className="font-medium text-[#2C221E]">{product.materials}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#EAE2D7] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#EAE2D7] rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-[#FAF7F2]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold text-[#2C221E]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-[#FAF7F2]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
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

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2.5 border border-[#EAE2D7] rounded bg-white hover:bg-[#FAF7F2] text-[#2C221E] transition-colors"
                title="Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? 'fill-[#C0745A] text-[#C0745A]' : 'text-[#5F6B4F]'
                  }`}
                />
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-between pt-1">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="text-xs font-medium text-[#5F6B4F] hover:underline"
              >
                View full specifications & care &rarr;
              </Link>
              <a
                href={getWhatsAppProductLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#128C7E] flex items-center gap-1 hover:underline font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
