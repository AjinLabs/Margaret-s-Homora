'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { Order } from '@/types';
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export default function TrackOrderPage() {
  const { orders, getOrderByNumber, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    const found = getOrderByNumber(searchQuery.trim());
    setSearchedOrder(found || null);
  };

  const handleSelectSample = (num: string) => {
    setSearchQuery(num);
    const found = getOrderByNumber(num);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  // Status step progression
  const STEPS = [
    { key: 'confirmed', label: 'Order Confirmed' },
    { key: 'packed', label: 'Kiln Inspected & Packed' },
    { key: 'shipped', label: 'In Transit' },
    { key: 'delivered', label: 'Delivered' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderRank = ['confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIdx = orderRank.indexOf(currentStatus);
    const targetIdx = orderRank.indexOf(stepKey);

    if (currentIdx >= targetIdx) return 'completed';
    if (currentIdx === targetIdx - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-14">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
            Pan-India Delivery Tracking
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal">
            Track Your Ceramic Shipment
          </h1>
          <p className="text-xs text-stone-500">
            Enter your Margaret&apos;s Homora order number to view real-time courier and packing progress.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAE2D7] shadow-sm mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Enter Order Number (e.g. MH-2026-8941)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#2C221E] uppercase placeholder:normal-case focus:outline-none focus:border-[#2C221E]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
            >
              Track
            </button>
          </form>

          {/* Quick Clickable Samples */}
          <div className="flex flex-wrap items-center gap-2 pt-4 text-xs text-stone-500">
            <span className="text-[11px] font-medium text-stone-400">Quick Test Samples:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => handleSelectSample(o.orderNumber)}
                className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-[#EFE4D6] text-[11px] font-mono text-[#2C221E] border border-[#EAE2D7] transition-colors"
              >
                {o.orderNumber} ({o.orderStatus})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Results Card */}
        {hasSearched && (
          searchedOrder ? (
            <div className="bg-white rounded-2xl border border-[#EAE2D7] shadow-sm p-6 sm:p-8 space-y-6">
              {/* Order Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE2D7] gap-2">
                <div>
                  <span className="text-xs text-[#5F6B4F] font-semibold uppercase tracking-wider block">
                    Order Reference
                  </span>
                  <h3 className="font-mono text-lg font-bold text-[#2C221E]">
                    {searchedOrder.orderNumber}
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-stone-400 block">Current Status</span>
                  <span className="inline-block px-3 py-1 bg-[#FAF7F2] border border-[#D6C0A6] text-xs font-semibold uppercase tracking-wider text-[#5F6B4F] rounded-full">
                    {searchedOrder.orderStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {STEPS.map((st, i) => {
                    const status = getStepStatus(st.key, searchedOrder.orderStatus);
                    return (
                      <div key={st.key} className="flex flex-col items-center text-center space-y-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                            status === 'completed'
                              ? 'bg-[#5F6B4F] text-white'
                              : status === 'current'
                              ? 'bg-[#C2A06E] text-white ring-4 ring-[#C2A06E]/20'
                              : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          {status === 'completed' ? '✓' : i + 1}
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            status === 'completed'
                              ? 'text-[#2C221E]'
                              : status === 'current'
                              ? 'text-[#C2A06E] font-bold'
                              : 'text-stone-400'
                          }`}
                        >
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier Tracking Info */}
              {searchedOrder.trackingNumber && (
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#5F6B4F]" />
                    <div>
                      <strong className="block text-[#2C221E]">
                        Courier Partner: {searchedOrder.courierName || 'Blue Dart Express'}
                      </strong>
                      <span className="font-mono text-stone-500">
                        AWB / Tracking Number: {searchedOrder.trackingNumber}
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://www.dtdc.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE2D7] rounded text-[11px] font-semibold text-[#2C221E] hover:bg-[#F4EFEA]"
                  >
                    <span>Courier Tracking Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Destination & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EAE2D7] text-xs">
                <div>
                  <h4 className="font-semibold text-stone-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5F6B4F]" /> Delivery Address
                  </h4>
                  <div className="text-stone-700 space-y-0.5">
                    <p className="font-medium text-[#2C221E]">{searchedOrder.customer.fullName}</p>
                    <p>{searchedOrder.customer.address}</p>
                    <p>
                      {searchedOrder.customer.city}, {searchedOrder.customer.state} – {searchedOrder.customer.pinCode}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-stone-400 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#5F6B4F]" /> Activity Timeline
                  </h4>
                  <div className="space-y-2">
                    {searchedOrder.timeline.map((item, idx) => (
                      <div key={idx} className="border-l-2 border-[#5F6B4F] pl-3 py-0.5">
                        <strong className="block text-[#2C221E] capitalize">
                          {item.status.replace('_', ' ')}
                        </strong>
                        <p className="text-stone-500 text-[11px]">{item.note}</p>
                        <span className="text-[10px] text-stone-400">
                          {new Date(item.timestamp).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items in shipment */}
              <div className="pt-4 border-t border-[#EAE2D7]">
                <h4 className="font-semibold text-stone-400 uppercase tracking-wider text-[11px] mb-3">
                  Articles in Consignment ({searchedOrder.items.length})
                </h4>
                <div className="divide-y divide-[#EAE2D7]">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-[#F4EFEA] border border-[#EAE2D7]">
                          <Image
                            src={item.productImage || '/images/hero_banner.jpg'}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-medium text-[#2C221E]">
                            {item.productName}
                          </p>
                          <span className="text-[11px] text-stone-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-[#2C221E]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-10 text-center space-y-3">
              <p className="font-serif text-lg text-[#2C221E]">
                No order found matching &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Please double-check your order number from your confirmation email or contact our studio on WhatsApp for immediate help.
              </p>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 rounded-lg text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Contact Atelier Concierge</span>
              </a>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
