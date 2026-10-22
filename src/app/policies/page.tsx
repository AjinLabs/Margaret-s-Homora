'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
            Client Assurances
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal">
            Atelier Policies & Care Commitments
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Clear, transparent policies for pan-India transit, ceramic guarantees, and returns.
          </p>
        </div>

        {/* 1. Fragile Transit Guarantee */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#EAE2D7]">
            <Truck className="w-5 h-5 text-[#5F6B4F]" />
            <h2 className="font-serif text-xl font-medium text-[#2C221E]">
              1. Pan-India Shipping & Fragile Transit
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-stone-600 space-y-2.5 leading-relaxed">
            <p>
              • <strong>Courier Dispatch:</strong> Orders are hand-inspected and dispatched within 24 to 48 business hours from our Fort Kochi kiln studio via reputable couriers (Blue Dart Express, DTDC, Delhivery).
            </p>
            <p>
              • <strong>Transit Timeline:</strong> South India deliveries typically arrive in 2–4 business days. Other metro cities (Mumbai, Delhi, Kolkata, Bengaluru, Pune) take 3–5 business days. Remote locations may take up to 6–7 days.
            </p>
            <p>
              • <strong>Complimentary Shipping:</strong> All orders above ₹999 receive complimentary delivery across India. Standard orders below ₹999 are charged a nominal ₹99 fragile handling fee.
            </p>
          </div>
        </section>

        {/* 2. Breakage-Free Guarantee & Returns */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#EAE2D7]">
            <ShieldCheck className="w-5 h-5 text-[#C0745A]" />
            <h2 className="font-serif text-xl font-medium text-[#2C221E]">
              2. 100% Zero-Risk Transit Guarantee & Returns
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-stone-600 space-y-2.5 leading-relaxed">
            <p>
              We take extreme pride in our packaging standards. However, because ceramics are artisanal, in the rare event that an item arrives chipped or fractured in transit:
            </p>
            <p>
              • Simply photograph the damaged item within 48 hours of delivery and message our WhatsApp helpline or email <code>hello@margaretshomora.com</code>.
            </p>
            <p>
              • We will immediately dispatch a fresh replacement from the kiln or process a 100% refund without requiring you to ship the broken ceramic back.
            </p>
          </div>
        </section>

        {/* 3. Privacy & Data Discretion */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-4" id="privacy">
          <div className="flex items-center gap-3 pb-3 border-b border-[#EAE2D7]">
            <Lock className="w-5 h-5 text-[#82926E]" />
            <h2 className="font-serif text-xl font-medium text-[#2C221E]">
              3. Privacy & Discretion
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-stone-600 space-y-2.5 leading-relaxed">
            <p>
              We never sell, rent, or lease customer data. Your contact telephone number and delivery address are strictly utilized for delivery courier coordination and tax invoice generation.
            </p>
            <p>
              All online transactions are processed through RBI-compliant, PCI-DSS Level 1 certified gateways (Razorpay). We never capture or store raw credit/debit card numbers or CVVs on our servers.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
