'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.glazeTone && p.glazeTone.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSelect = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-xl shadow-2xl border border-[#EAE2D7] overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#EAE2D7] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#82926E]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cups, teapots, vases, hampers, glaze tones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-[#2C221E] text-sm sm:text-base placeholder:text-stone-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider font-semibold text-[#82926E] hover:text-[#2C221E] ml-2"
          >
            Esc
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="overflow-y-auto p-4 sm:p-5 divide-y divide-[#EAE2D7]">
          {searchTerm.trim() ? (
            filtered.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs uppercase font-medium tracking-wider text-[#82926E]">
                  Found {filtered.length} Ceramic Pieces
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {filtered.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={handleSelect}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white hover:bg-[#F4EFEA] border border-[#EAE2D7] transition-colors group"
                    >
                      <div className="relative w-14 h-14 rounded overflow-hidden bg-[#F4EFEA] flex-shrink-0">
                        <Image
                          src={item.images[0] || '/images/hero_banner.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs sm:text-sm font-medium text-[#2C221E] truncate group-hover:text-[#5F6B4F]">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#82926E] truncate">
                          {item.glazeTone || item.subCategory}
                        </p>
                        <span className="text-xs font-semibold text-[#2C221E]">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-stone-500">
                <p className="font-serif text-base text-[#2C221E]">
                  No ceramics matching &ldquo;{searchTerm}&rdquo;
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Try searching for &apos;mug&apos;, &apos;kettle&apos;, &apos;terracotta&apos;, or &apos;blue&apos;
                </p>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#82926E] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2A06E]" /> Popular Collections
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    'Mughal print cup',
                    'Coffee set',
                    'Ceramic chai set',
                    'Honey bee mug',
                    'Kettle mug',
                    'Terracotta planter',
                    'Wayanad clay dinner set',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1.5 rounded-full text-xs bg-white hover:bg-[#EFE4D6] text-[#2C221E] border border-[#EAE2D7] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[11px] uppercase tracking-wider text-[#82926E] font-medium">
                  Curated Glaze Tones
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {[
                    { label: 'Cobalt Mughal', color: '#1E3A8A' },
                    { label: 'Periyar Sage', color: '#6E7E60' },
                    { label: 'Raw Terracotta', color: '#C0745A' },
                    { label: 'Matte Sand Ivory', color: '#DEC9B2' },
                  ].map((glaze) => (
                    <button
                      key={glaze.label}
                      onClick={() => setSearchTerm(glaze.label)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#EAE2D7] hover:border-[#2C221E] transition-colors text-left"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: glaze.color }}
                      />
                      <span className="text-xs font-medium text-[#2C221E] truncate">
                        {glaze.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
