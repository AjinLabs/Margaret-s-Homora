'use client';

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import {
  CheckCircle2,
  Printer,
  MessageCircle,
  Truck,
  ArrowRight,
  Package,
  Clock,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getOrderById, settings } = useStore();

  const order = getOrderById(id);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C2A06E', '#5F6B4F', '#C0745A', '#FAF7F2'],
      });
    } catch (e) {}
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="font-serif text-2xl text-[#2C221E]">Order Record Loading or Not Found</h2>
          <p className="text-xs text-stone-500 mt-2">
            Please verify the order reference or check with our atelier team.
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-2.5 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Return to Atelier Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppReceiptLink = () => {
    const text = `Hello Margaret's Homora! 🌸%0AI have placed Order *${order.orderNumber}* for ₹${order.total.toLocaleString('en-IN')}.%0ACustomer: ${order.customer.fullName}%0APlease share tracking updates to this WhatsApp number.`;
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <div className="no-print">
        <Header />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Success Card Header */}
        <div className="bg-white rounded-2xl border border-[#EAE2D7] shadow-sm p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#5F6B4F] flex items-center justify-center mx-auto border border-[#D6C0A6]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
              Order Confirmed & Received
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal">
              Thank You, {order.customer.fullName}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              Your order has been recorded in our kiln schedule. A confirmation email has been dispatched, and our artisans are preparing your handcrafted ceramics for protective transit.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EAE2D7] text-xs font-mono font-bold text-[#2C221E] mt-2">
              <span>Order Reference: {order.orderNumber}</span>
            </div>
          </div>

          {/* Action Row for Customer */}
          <div className="no-print flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#2C221E] text-xs font-semibold rounded-lg border border-[#EAE2D7] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print Tax Invoice Slip</span>
            </button>

            <a
              href={getWhatsAppReceiptLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-semibold rounded-lg border border-[#25D366]/30 flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Send Receipt to WhatsApp</span>
            </a>

            <Link
              href="/track"
              className="px-4 py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery</span>
            </Link>
          </div>

          {/* Shipment & Customer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#EAE2D7] text-xs">
            {/* Delivery Destination */}
            <div className="space-y-2">
              <strong className="block text-stone-400 uppercase tracking-wider text-[11px]">
                Shipping Destination
              </strong>
              <div className="text-stone-700 space-y-0.5">
                <p className="font-semibold text-[#2C221E]">{order.customer.fullName}</p>
                <p>{order.customer.address}</p>
                {order.customer.apartment && <p>{order.customer.apartment}</p>}
                <p>
                  {order.customer.city}, {order.customer.state} – {order.customer.pinCode}
                </p>
                <p>Contact: +91 {order.customer.phone}</p>
              </div>
            </div>

            {/* Payment & Status */}
            <div className="space-y-2">
              <strong className="block text-stone-400 uppercase tracking-wider text-[11px]">
                Payment & Kiln Status
              </strong>
              <div className="space-y-1 text-stone-700">
                <p>
                  <strong>Payment Method:</strong>{' '}
                  {order.paymentMethod === 'razorpay'
                    ? 'Online Payment (Razorpay Verified)'
                    : 'Cash on Delivery'}
                </p>
                <p>
                  <strong>Payment Status:</strong>{' '}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {order.paymentStatus === 'paid' ? 'Paid & Verified' : 'Pending Payment on Courier Arrival'}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Ceramics Items */}
          <div className="pt-6 border-t border-[#EAE2D7] space-y-3">
            <strong className="block text-stone-400 uppercase tracking-wider text-[11px]">
              Purchased Ceramics ({order.items.length})
            </strong>

            <div className="divide-y divide-[#EAE2D7]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-[#F4EFEA] border border-[#EAE2D7]">
                      <Image
                        src={item.productImage || '/images/hero_banner.jpg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs sm:text-sm font-medium text-[#2C221E]">
                        {item.productName}
                      </h4>
                      <span className="text-[11px] text-stone-500">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#2C221E]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#EAE2D7] space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#C0745A]">
                  <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Fragile Padded Courier</span>
                <span>
                  {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2C221E] pt-2 border-t border-[#EAE2D7]">
                <span>Total Amount</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline Preview */}
          <div className="pt-6 border-t border-[#EAE2D7] space-y-3">
            <strong className="block text-stone-400 uppercase tracking-wider text-[11px]">
              Studio Progress Timeline
            </strong>

            <div className="space-y-3">
              {order.timeline.map((entry, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#5F6B4F] text-[#5F6B4F] flex items-center justify-center flex-shrink-0 font-bold text-[10px]">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#2C221E] capitalize">
                      {entry.status}
                    </p>
                    <p className="text-stone-500 text-[11px]">{entry.note}</p>
                    <span className="text-[10px] text-stone-400">
                      {new Date(entry.timestamp).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="no-print mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5F6B4F] hover:text-[#2C221E] transition-colors"
          >
            <span>Continue Browsing Atelier Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
