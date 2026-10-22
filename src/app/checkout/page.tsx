'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  Check,
  Sparkles,
  ChevronRight,
  Tag,
  AlertCircle,
  QrCode,
} from 'lucide-react';

const INDIAN_STATES = [
  'Kerala',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Delhi',
  'Telangana',
  'Andhra Pradesh',
  'Goa',
  'Gujarat',
  'West Bengal',
  'Rajasthan',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Punjab',
  'Haryana',
  'Other',
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    finalTotal,
    createOrder,
    settings,
  } = useStore();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Kochi',
    state: 'Kerala',
    pinCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ msg: string; isError: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [razorpayStep, setRazorpayStep] = useState<'select' | 'upi' | 'card' | 'verifying'>('select');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="font-serif text-2xl text-[#2C221E]">Your Atelier Bag is Empty</h2>
          <p className="text-xs text-stone-500 mt-2">
            Please add handcrafted ceramics before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 px-6 py-2.5 bg-[#2C221E] text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Browse Collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback({ msg: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Indian PIN code basic validation (6 digits)
    if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      alert('Please enter a valid 6-digit Indian Postal PIN Code.');
      return;
    }

    // Indian Phone validation (at least 10 digits)
    if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, '').slice(-10))) {
      alert('Please enter a valid 10-digit Indian Mobile Number.');
      return;
    }

    if (paymentMethod === 'razorpay') {
      setShowRazorpayModal(true);
    } else {
      // COD Order direct placement
      finalizeOrder('cod', 'pending');
    }
  };

  const finalizeOrder = (
    method: 'razorpay' | 'cod',
    paymentStatus: 'paid' | 'pending',
    paymentId?: string
  ) => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0] || '/images/hero_banner.jpg',
        price: item.product.price,
        quantity: item.quantity,
      }));

      const newOrder = createOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        },
        items: orderItems,
        subtotal: cartSubtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        total: finalTotal,
        paymentMethod: method,
        paymentStatus,
        paymentId: paymentId || `pay_rzp_${Date.now()}`,
        orderStatus: 'confirmed',
      });

      router.push(`/order-success/${newOrder.id}`);
    }, 1200);
  };

  const simulateSuccessfulOnlinePayment = (subMethod: string) => {
    setRazorpayStep('verifying');
    setTimeout(() => {
      setShowRazorpayModal(false);
      finalizeOrder('razorpay', 'paid', `pay_rzp_${Date.now()}_${subMethod}`);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Minimal Luxury Checkout Header */}
      <header className="border-b border-[#EAE2D7] bg-white py-4 px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D6C0A6] bg-white">
            <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-wider uppercase text-[#2C221E]">
              Margaret&apos;s HOMORA
            </span>
            <span className="text-[8px] tracking-wider uppercase text-[#82926E] font-medium">
              Ceramic Home &amp; Living
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#5F6B4F]">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">
            256-Bit SSL Encrypted Checkout
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Step 1: Contact Details */}
              <div className="bg-white p-6 rounded-xl border border-[#EAE2D7] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D7]">
                  <h2 className="font-serif text-lg font-medium text-[#2C221E] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2C221E] text-white text-xs flex items-center justify-center font-sans">
                      1
                    </span>
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Margaret Thomas"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      Email Address * (For Receipt)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. margaret@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      Mobile Number * (For Delivery WhatsApp/SMS)
                    </label>
                    <div className="flex">
                      <span className="bg-[#EFE4D6] border border-r-0 border-[#EAE2D7] rounded-l-lg px-3 py-2.5 text-xs text-stone-600 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="flex-1 bg-[#FAF7F2] border border-[#EAE2D7] rounded-r-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white p-6 rounded-xl border border-[#EAE2D7] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D7]">
                  <h2 className="font-serif text-lg font-medium text-[#2C221E] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2C221E] text-white text-xs flex items-center justify-center font-sans">
                      2
                    </span>
                    Pan-India Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      Street Address & House No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 3A, Heritage Residency, MG Road"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      Apartment, Floor, Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Near St. Francis Church"
                      value={formData.apartment}
                      onChange={(e) =>
                        setFormData({ ...formData, apartment: e.target.value })
                      }
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Kochi"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        Postal PIN Code * (6 digits)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="682001"
                        value={formData.pinCode}
                        onChange={(e) =>
                          setFormData({ ...formData, pinCode: e.target.value })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white p-6 rounded-xl border border-[#EAE2D7] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D7]">
                  <h2 className="font-serif text-lg font-medium text-[#2C221E] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2C221E] text-white text-xs flex items-center justify-center font-sans">
                      3
                    </span>
                    Payment Selection
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Razorpay Option */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#2C221E] bg-[#FAF7F2] shadow-sm ring-1 ring-[#2C221E]'
                        : 'border-[#EAE2D7] bg-white hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-[#2C221E] mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm text-[#2C221E] font-medium flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#5F6B4F]" />
                          Online Payment via Razorpay
                        </strong>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Instant checkout via UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, NetBanking, Cred & EMI.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {['UPI QR', 'Google Pay', 'PhonePe', 'Paytm', 'Visa', 'Mastercard', 'RuPay'].map(
                          (m) => (
                            <span
                              key={m}
                              className="text-[10px] bg-white border border-[#EAE2D7] px-2 py-0.5 rounded text-stone-600 font-medium"
                            >
                              {m}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#2C221E] bg-[#FAF7F2] shadow-sm ring-1 ring-[#2C221E]'
                        : 'border-[#EAE2D7] bg-white hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#2C221E] mt-1"
                    />
                    <div className="flex-1">
                      <strong className="text-sm text-[#2C221E] font-medium flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#5F6B4F]" />
                        Cash on Delivery (COD)
                      </strong>
                      <p className="text-xs text-stone-500 mt-1">
                        Pay cash or UPI upon courier arrival at your doorstep. Verified delivery OTP required.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Order with Atelier...</span>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'razorpay'
                        ? `Proceed to Razorpay Payment • ₹${finalTotal.toLocaleString('en-IN')}`
                        : `Confirm Cash on Delivery Order • ₹${finalTotal.toLocaleString('en-IN')}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-stone-400">
                By placing this order you accept Margaret&apos;s Homora Studio Terms & Fragile Shipping Guarantee.
              </p>
            </form>
          </div>

          {/* Right Column: Order Review & Pricing Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-[#EAE2D7] shadow-sm space-y-5 sticky top-24">
              <h3 className="font-serif text-lg font-medium text-[#2C221E] pb-3 border-b border-[#EAE2D7]">
                Atelier Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#EAE2D7] pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-[#F4EFEA] flex-shrink-0 border border-[#EAE2D7]">
                      <Image
                        src={item.product.images[0] || '/images/hero_banner.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-medium text-[#2C221E] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#2C221E]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="pt-4 border-t border-[#EAE2D7] space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#FAF7F2] border border-[#D6C0A6] rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-[#5F6B4F]">
                      <Tag className="w-4 h-4 text-[#C0745A]" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> Applied
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[11px] text-stone-400 hover:text-[#C0745A] font-semibold uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#FAF7F2] border border-[#EAE2D7] rounded px-3 py-2 text-xs uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EFE4D6] text-[#2C221E] text-xs font-semibold rounded border border-[#EAE2D7]"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] ${
                      couponFeedback.isError ? 'text-rose-600' : 'text-[#5F6B4F]'
                    }`}
                  >
                    {couponFeedback.msg}
                  </p>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="pt-4 border-t border-[#EAE2D7] space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#2C221E]">
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
                  <span>Fragile Padded Courier</span>
                  <span className="font-semibold text-[#2C221E]">
                    {shippingFee === 0 ? (
                      <span className="text-[#5F6B4F]">FREE (Unlocked)</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2C221E] pt-3 border-t border-[#EAE2D7]">
                  <span>Total Payable</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Kiln Transit Assurance */}
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EAE2D7] flex items-center gap-3 text-xs text-stone-600">
                <ShieldCheck className="w-5 h-5 text-[#5F6B4F] flex-shrink-0" />
                <span>
                  <strong>100% Breakage-Free Guarantee:</strong> Handcrafted ceramics transit in reinforced shock-absorbent honeycomb packaging.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* RAZORPAY AUTHENTIC PAYMENT GATEWAY SIMULATOR MODAL */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRazorpayModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-[#EAE2D7]">
            {/* Razorpay Brand Top Bar */}
            <div className="bg-[#0C2340] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center font-bold text-sm text-[#00BAF2]">
                  ₹
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-blue-200">
                    Razorpay Secure Checkout
                  </h4>
                  <p className="text-xs text-white font-medium">Margaret&apos;s Homora Atelier</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-blue-200 block">Amount</span>
                <span className="text-base font-bold text-white">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {razorpayStep === 'verifying' ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 border-4 border-[#0C2340] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-serif text-lg text-[#2C221E]">
                    Verifying Payment Signature with Bank...
                  </p>
                  <p className="text-xs text-stone-500">
                    Please do not refresh or close this window.
                  </p>
                </div>
              ) : razorpayStep === 'upi' ? (
                <div className="space-y-4 text-center">
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#5F6B4F]">
                    Scan UPI QR with Any App
                  </span>
                  <div className="w-44 h-44 mx-auto bg-stone-100 rounded-xl border border-stone-300 p-2 flex flex-col items-center justify-center shadow-inner">
                    <QrCode className="w-32 h-32 text-[#2C221E]" />
                    <span className="text-[10px] text-stone-500 mt-1">UPI ID: margarets@icici</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Google Pay • PhonePe • Paytm • BHIM
                  </p>
                  <button
                    onClick={() => simulateSuccessfulOnlinePayment('upi_qr')}
                    className="w-full py-3 bg-[#0C2340] hover:bg-[#1a385f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm"
                  >
                    Simulate Successful UPI Approval
                  </button>
                  <button
                    onClick={() => setRazorpayStep('select')}
                    className="text-xs text-stone-500 hover:underline"
                  >
                    &larr; Choose another payment mode
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block">
                    Select Payment Mode:
                  </span>

                  {/* UPI Button */}
                  <button
                    onClick={() => setRazorpayStep('upi')}
                    className="w-full p-3.5 rounded-xl border border-[#EAE2D7] hover:border-[#0C2340] hover:bg-[#FAF7F2] transition-colors flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        UPI
                      </div>
                      <div>
                        <strong className="block text-xs text-[#2C221E]">
                          UPI (Google Pay, PhonePe, Paytm)
                        </strong>
                        <span className="text-[10px] text-stone-500">
                          Instant zero-fee QR payment
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#2C221E]" />
                  </button>

                  {/* Cards Button */}
                  <button
                    onClick={() => simulateSuccessfulOnlinePayment('card_gateway')}
                    className="w-full p-3.5 rounded-xl border border-[#EAE2D7] hover:border-[#0C2340] hover:bg-[#FAF7F2] transition-colors flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-xs text-[#2C221E]">
                          Cards (Credit / Debit)
                        </strong>
                        <span className="text-[10px] text-stone-500">
                          Visa, Mastercard, RuPay, Amex
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#2C221E]" />
                  </button>

                  {/* NetBanking Button */}
                  <button
                    onClick={() => simulateSuccessfulOnlinePayment('netbanking')}
                    className="w-full p-3.5 rounded-xl border border-[#EAE2D7] hover:border-[#0C2340] hover:bg-[#FAF7F2] transition-colors flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                        NB
                      </div>
                      <div>
                        <strong className="block text-xs text-[#2C221E]">
                          NetBanking & Cred
                        </strong>
                        <span className="text-[10px] text-stone-500">
                          SBI, HDFC, ICICI, Axis, Federal Bank
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#2C221E]" />
                  </button>
                </div>
              )}

              <div className="pt-2 text-center">
                <button
                  onClick={() => setShowRazorpayModal(false)}
                  className="text-xs text-stone-400 hover:text-stone-700"
                >
                  Cancel & Return to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
