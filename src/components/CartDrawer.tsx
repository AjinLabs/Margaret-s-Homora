'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  Truck,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    finalTotal,
    settings,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const result = applyCoupon(code);
    setCouponMsg({ text: result.message, isError: !result.success });
    if (result.success) setCouponInput('');
  };

  // WhatsApp Checkout pre-fill message
  const generateWhatsAppCartLink = () => {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.product.name} (Qty: ${item.quantity}) - ₹${(
            item.product.price * item.quantity
          ).toLocaleString('en-IN')}`
      )
      .join('%0A');

    const message = `Hello Margaret's Homora! 🌸%0AI would like to place an order for the following items:%0A%0A${itemsText}%0A%0A*Subtotal:* ₹${cartSubtotal.toLocaleString(
      'en-IN'
    )}${
      appliedCoupon
        ? `%0A*Coupon (${appliedCoupon.code}):* -₹${discountAmount.toLocaleString('en-IN')}`
        : ''
    }%0A*Total Amount:* ₹${finalTotal.toLocaleString(
      'en-IN'
    )}%0A%0APlease let me know the availability and delivery details. Thank you!`;

    const phone = (settings.whatsappNumber || '').replace(/[^0-9]/g, '') || '917012543613';
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE2D7] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2C221E]" />
            <h2 className="font-serif text-lg font-medium text-[#2C221E]">
              Your Atelier Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full text-stone-500 hover:text-[#2C221E] hover:bg-[#FAF7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone */}
        <div className="px-5 py-3 bg-[#F4EFEA] border-b border-[#EAE2D7] text-xs">
          <div className="flex items-center justify-between font-medium text-[#2C221E] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#5F6B4F]" />
              {amountToFreeShipping > 0 ? (
                <>Add <strong className="text-[#C0745A]">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for Free Pan-India Delivery</>
              ) : (
                <span className="text-[#5F6B4F] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2A06E]" /> Congratulations! You unlocked Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-stone-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#EAE2D7] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#5F6B4F] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#EAE2D7]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-[#F4EFEA] flex items-center justify-center mb-4 text-[#82926E]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif text-lg text-[#2C221E] font-medium">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mt-1 leading-relaxed">
                Explore our handcrafted cups, teapots, vases and dinnerware to begin curating your space.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 bg-[#2C221E] text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-[#3E3029] transition-colors"
              >
                Browse Ceramics
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-4 items-start">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#F4EFEA] flex-shrink-0 border border-[#EAE2D7]">
                  <Image
                    src={item.product.images[0] || '/images/hero_banner.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between h-20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#2C221E] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#5F6B4F]">
                        {item.product.glazeTone || item.product.subCategory || 'Ceramic'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-400 hover:text-[#C0745A] transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#EAE2D7] rounded bg-white">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2 py-1 text-stone-600 hover:bg-[#FAF7F2] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-[#2C221E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-stone-600 hover:bg-[#FAF7F2] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#2C221E]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#EAE2D7] shadow-lg flex flex-col gap-3">
            {/* Coupon Application */}
            <div className="flex flex-col gap-1.5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#F4EFEA] border border-[#D6C0A6] px-3 py-1.5 rounded text-xs">
                  <div className="flex items-center gap-1.5 text-[#5F6B4F] font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#C0745A]" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-[#C0745A] text-[11px] font-semibold uppercase"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. HOMORA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-1.5 text-xs uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyCoupon()}
                    className="px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#EFE4D6] text-[#2C221E] text-xs font-semibold rounded border border-[#EAE2D7] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Quick Coupon suggestions */}
              {!appliedCoupon && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => handleApplyCoupon('HOMORA10')}
                    className="text-[10px] bg-[#FAF7F2] hover:bg-[#F4EFEA] text-[#5F6B4F] border border-dashed border-[#D6C0A6] px-2 py-0.5 rounded transition-colors"
                  >
                    HOMORA10 (10% off)
                  </button>
                  <button
                    onClick={() => handleApplyCoupon('WELCOME50')}
                    className="text-[10px] bg-[#FAF7F2] hover:bg-[#F4EFEA] text-[#5F6B4F] border border-dashed border-[#D6C0A6] px-2 py-0.5 rounded transition-colors"
                  >
                    WELCOME50 (₹50 off)
                  </button>
                </div>
              )}

              {couponMsg && (
                <span
                  className={`text-[11px] ${
                    couponMsg.isError ? 'text-rose-600' : 'text-[#5F6B4F]'
                  }`}
                >
                  {couponMsg.text}
                </span>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-stone-600 pt-2 border-t border-[#F4EFEA]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#2C221E]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[#C0745A]">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#2C221E]">
                  {shippingFee === 0 ? (
                    <span className="text-[#5F6B4F] font-semibold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#2C221E] pt-2 border-t border-[#EAE2D7]">
                <span>Total Payable</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout & WhatsApp Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded text-center transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={generateWhatsAppCartLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2 border border-[#25D366]/30"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp Direct</span>
              </a>
            </div>

            <p className="text-[10px] text-center text-stone-400">
              Safe & Fragile Padded Delivery Across All Indian States • Instant UPI & COD
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
