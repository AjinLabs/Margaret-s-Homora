'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export default function Header() {
  const {
    settings,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    categories,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col bg-[#FAF7F2] transition-all">
      {/* 1. Announcement Bar */}
      {settings.isAnnouncementBarActive && (
        <div className="bg-[#2C221E] text-[#EFE4D6] text-[11px] sm:text-xs tracking-wider py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#3E3029]">
          <Sparkles className="w-3 h-3 text-[#C2A06E] animate-pulse" />
          <span>{settings.announcementBarText}</span>
        </div>
      )}

      {/* 2. Bespoke Header Sub-bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[11px] text-[#5F6B4F] border-b border-[#EAE2D7]/70 bg-[#FAF7F2]">
        <div className="flex items-center gap-4">
          <span>BESPOKE RETAIL & WHOLESALE INQUIRIES ACROSS INDIA</span>
          <span className="text-[#D6C0A6]">•</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5F6B4F]" />
            ARTISANAL CERAMICS • KERALA KILNS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/track"
            className="hover:text-[#2C221E] transition-colors flex items-center gap-1"
          >
            Track Order
          </Link>
          <span className="text-[#D6C0A6]">•</span>
          <Link
            href="/admin"
            className="text-[#82926E] hover:text-[#2C221E] font-medium flex items-center gap-1 transition-colors"
          >
            <ShieldCheck className="w-3 h-3" /> Admin Portal
          </Link>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="glass-header border-b border-[#EAE2D7] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 text-[#2C221E] hover:text-[#5F6B4F] focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-[#2C221E] hover:text-[#5F6B4F]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-[#D6C0A6] shadow-sm flex-shrink-0 bg-white">
            <Image
              src="/images/logo.png"
              alt="Margaret's HOMORA Ceramic Home & Living"
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-serif italic text-sm sm:text-base text-[#5F6B4F]">
                Margaret&apos;s
              </span>
              <span className="font-serif font-bold text-lg sm:text-2xl tracking-[0.14em] uppercase text-[#2C221E]">
                HOMORA
              </span>
            </div>
            <span className="text-[8px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#82926E] font-semibold mt-1">
              Ceramic Home &amp; Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-wider text-[#2C221E] font-medium">
          <Link href="/shop" className="hover:text-[#5F6B4F] transition-colors py-1">
            Shop All
          </Link>
          <Link
            href="/shop?category=ceramics-tableware"
            className="hover:text-[#5F6B4F] transition-colors py-1"
          >
            Crockery & Tableware
          </Link>
          <Link
            href="/shop?category=vases-planters"
            className="hover:text-[#5F6B4F] transition-colors py-1"
          >
            Vases & Planters
          </Link>
          <Link
            href="/shop?category=gifts-hampers"
            className="hover:text-[#5F6B4F] transition-colors py-1"
          >
            Festive Gifting
          </Link>
          <Link href="/about" className="hover:text-[#5F6B4F] transition-colors py-1">
            Our Story
          </Link>
          <Link href="/contact" className="hover:text-[#5F6B4F] transition-colors py-1">
            Contact
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-2 bg-[#F4EFEA] hover:bg-[#EFE4D6] text-[#5F6B4F] text-xs px-3.5 py-2 rounded-full border border-[#EAE2D7] transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-[#2C221E]" />
            <span className="text-[11px] text-[#2C221E]">Search tableware, mugs, vases...</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-[#2C221E] hover:text-[#5F6B4F] transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C0745A] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#2C221E] text-white hover:bg-[#3E3029] px-3.5 py-2 rounded-full transition-all shadow-sm"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#EFE4D6]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C2A06E] text-[#2C221E] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium hidden sm:inline text-[#EFE4D6]">
              ₹{cartSubtotal.toLocaleString('en-IN')}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D7]">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D6C0A6] bg-white">
                  <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xs tracking-wider uppercase text-[#2C221E]">
                    Margaret&apos;s HOMORA
                  </span>
                  <span className="text-[8px] tracking-wider uppercase text-[#82926E] font-medium">
                    Ceramic Home &amp; Living
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#2C221E] hover:text-[#5F6B4F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-3 py-6 text-sm uppercase tracking-wider text-[#2C221E] font-medium border-b border-[#EAE2D7]">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Shop All Pieces</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
              <Link
                href="/shop?category=ceramics-tableware"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Ceramics & Tableware</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
              <Link
                href="/shop?category=vases-planters"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Vases & Planters</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
              <Link
                href="/shop?category=gifts-hampers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Festive Gifting</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Our Story</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Contact Atelier</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1.5 hover:text-[#5F6B4F]"
              >
                <span>Track Order</span>
                <ChevronRight className="w-4 h-4 text-[#82926E]" />
              </Link>
            </div>

            {/* Admin Portal Quick Access */}
            <div className="pt-6 mt-auto">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#F4EFEA] hover:bg-[#EFE4D6] text-[#2C221E] py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#EAE2D7] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#5F6B4F]" />
                Owner Admin Dashboard
              </Link>
              <p className="text-[10px] text-center text-[#82926E] mt-3">
                Handcrafted with care in Kerala • Pudukad Kilns
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
