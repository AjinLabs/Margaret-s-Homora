'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Check, Heart, ShieldCheck, Camera } from 'lucide-react';

export default function Footer() {
  const { settings } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#FAF7F2] border-t border-[#EAE2D7] text-[#2C221E] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#EAE2D7]">
          {/* Col 1: Brand Atelier */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D6C0A6]">
                <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="font-serif text-lg tracking-wide uppercase text-[#2C221E]">
                The Atelier
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Rooted in coastal heritage and ceramic sanctuaries of Kerala, India. We engineer quiet luxury for dining rooms and curated living spaces with organic clays, terracotta, and wood-ash mineral glazes.
            </p>
            <p className="font-serif italic text-sm text-[#5F6B4F]">
              &ldquo;Handcrafted for deliberate living.&rdquo;
            </p>
            <div className="pt-2 text-[11px] text-stone-500">
              <p>{settings.address}</p>
              <p className="mt-0.5">Atelier Studio Hours: Mon – Sat, 10am – 7pm</p>
            </div>
          </div>

          {/* Col 2: Curated Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link href="/shop?category=ceramics-tableware" className="hover:text-[#2C221E] transition-colors">
                  Artisanal Crockery & Cups
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ceramics-tableware" className="hover:text-[#2C221E] transition-colors">
                  Traditional Cutting Chai Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=vases-planters" className="hover:text-[#2C221E] transition-colors">
                  Sculptural Vases & Vessels
                </Link>
              </li>
              <li>
                <Link href="/shop?category=garden-decor" className="hover:text-[#2C221E] transition-colors">
                  Porous Terracotta Planters
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifts-hampers" className="hover:text-[#2C221E] transition-colors">
                  Festive Heritage Hampers
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#2C221E] transition-colors">
                  New Kiln Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care & Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F] mb-4">
              Client Care & Bespoke
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <Link href="/track" className="hover:text-[#2C221E] transition-colors">
                  Track Delivery Shipment
                </Link>
              </li>
              <li>
                <Link href="/about#craft" className="hover:text-[#2C221E] transition-colors">
                  Ceramic & Glaze Care Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2C221E] transition-colors">
                  Bespoke Hospitality & Wedding Orders
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[#2C221E] transition-colors">
                  Fragile Shipping & Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/policies#privacy" className="hover:text-[#2C221E] transition-colors">
                  Privacy & Purchase Terms
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#82926E] hover:text-[#2C221E] flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Atelier Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: The Private Release / Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F] mb-4">
              The Private Release
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Receive seasonal monographs, limited studio glaze launches, and private culinary invitations.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#EFE4D6] rounded border border-[#D6C0A6] text-xs text-[#5F6B4F] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#5F6B4F]" />
                <span>You are subscribed to the private release.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white border border-[#EAE2D7] rounded-l px-3 py-2 text-xs text-[#2C221E] placeholder:text-stone-400 focus:outline-none focus:border-[#2C221E]"
                  />
                  <button
                    type="submit"
                    className="bg-[#2C221E] hover:bg-[#3E3029] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-r transition-colors"
                  >
                    Join
                  </button>
                </div>
                <p className="text-[10px] text-stone-400">
                  Discretion assured. Unsubscribe at will.
                </p>
              </form>
            )}

            <div className="pt-5 flex items-center gap-3">
              <span className="text-xs text-stone-500">Connect:</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-stone-600 hover:text-[#2C221E] text-xs transition-colors flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" /> Instagram
              </a>
              <span className="text-stone-300">•</span>
              <Link href="/about" className="text-stone-600 hover:text-[#2C221E] text-xs transition-colors">
                Studio Journal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Margaret&apos;s Homora Atelier Kerala. Handcrafted for deliberate living.</p>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider mr-1">
              Verified Gateway:
            </span>
            {['UPI', 'RuPay', 'Visa', 'Mastercard', 'NetBanking', 'Razorpay'].map((badge) => (
              <span
                key={badge}
                className="px-2 py-0.5 bg-white border border-[#EAE2D7] rounded text-[10px] font-medium text-stone-600"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
