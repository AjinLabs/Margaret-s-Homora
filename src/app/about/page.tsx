'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 sm:py-24 border-b border-[#EAE2D7] bg-[#F4EFEA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
              The Atelier Story
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2C221E] font-normal leading-tight">
              Shaped by Coastal Soil, Fired by Deliberate Passion
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Margaret&apos;s Homora was founded on a simple belief: our daily spaces become sanctuaries when graced by objects crafted with human patience and natural clays.
            </p>
          </div>
        </section>

        {/* Brand Mission & Image Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#EAE2D7]">
              <Image
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"
                alt="Clay turning on potter's wheel"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
                Our Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2C221E] font-normal leading-snug">
                Quiet Luxury for Modern Tables
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Operating between the historic kiln communities of Kerala and modern design studios, Margaret&apos;s Homora merges centuries of South Indian terracotta and stoneware traditions with Scandinavian minimalism.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We believe in conscious slow production. Every mug handle is pulled by hand, every salad bowl is trimmed on the kickwheel, and our glazes are blended using natural mineral oxides and wood ash rather than synthetic toxins.
              </p>

              <div className="pt-2">
                <blockquote className="border-l-2 border-[#5F6B4F] pl-4 italic font-serif text-base sm:text-lg text-[#2C221E]">
                  &ldquo;A coffee cup should fit your fingers like an old familiar song. When you hold our ceramics, you feel the gentle fingerprint of the maker.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Margaret's Homora */}
        <section className="py-16 bg-white border-y border-[#EAE2D7]" id="craft">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
                Our Commitments
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal mt-1">
                The Standards We Uphold
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#EFE4D6] text-[#5F6B4F] flex items-center justify-center font-serif text-lg font-bold">
                  I
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2C221E]">
                  High-Fire Durability (1,280°C)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our stoneware is fired to vitreous maturity in reduction kilns. It will never absorb moisture, craze prematurely, or crack under daily microwave and dishwasher use.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#EFE4D6] text-[#5F6B4F] flex items-center justify-center font-serif text-lg font-bold">
                  II
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2C221E]">
                  100% Non-Toxic & Lead Free
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Food safety is absolute. Our mineral glaze compositions are certified free of lead, cadmium, and hazardous heavy metals, certified safe for hot beverages and acidic citrus.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#EAE2D7] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#EFE4D6] text-[#5F6B4F] flex items-center justify-center font-serif text-lg font-bold">
                  III
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2C221E]">
                  Biodegradable Transit
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We refuse single-use plastic peanuts. Your order arrives nestled in recycled honeycomb kraft paper, biodegradable paper tape, and reinforced unbleached cartons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center max-w-xl mx-auto px-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2C221E] font-normal">
            Bring Quiet Beauty to Your Table
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Explore our curated catalog of everyday cups, afternoon tea services, and sculptural planters.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-[#3E3029] transition-colors"
            >
              Shop All Pieces
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white border border-[#EAE2D7] text-[#2C221E] text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-[#FAF7F2] transition-colors"
            >
              Contact Studio
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
