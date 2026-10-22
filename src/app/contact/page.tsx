'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useStore } from '@/context/StoreContext';
import { Mail, Phone, MapPin, MessageCircle, Check, Send } from 'lucide-react';

export default function ContactPage() {
  const { settings } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Order / Wholesale Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F]">
            Direct Atelier Inquiry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2C221E] font-normal">
            Connect with Margaret&apos;s Homora
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Whether for bespoke wedding favors, café crockery orders, or product inquiries, we welcome your dialogue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EAE2D7] shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#2C221E] pb-3 border-b border-[#EAE2D7]">
                Atelier Sanctuary
              </h3>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5F6B4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2C221E]">Kiln Studio & Store</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#5F6B4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2C221E]">Direct Concierge Phone</strong>
                    <span>{settings.supportPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#5F6B4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2C221E]">Email Correspondence</strong>
                    <span>{settings.supportEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#128C7E]">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <h4 className="font-serif text-base font-semibold">Instant WhatsApp Chat</h4>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Need immediate photographs of available glaze batches or custom colorways? Message our Pudukad, Thrissur atelier team directly at +91 70125 43613.
              </p>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '').replace(/[^0-9]/g, '') || '917012543613'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <span>Chat on WhatsApp (+91 70125 43613)</span>
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE2D7] shadow-sm">
              <h3 className="font-serif text-xl font-normal text-[#2C221E] mb-2">
                Send an Atelier Inquiry
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Our ceramics coordinator typically responds within 4 business hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-[#EFE4D6] rounded-xl text-center space-y-2 border border-[#D6C0A6]">
                  <div className="w-10 h-10 rounded-full bg-[#5F6B4F] text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#2C221E]">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-[#5F6B4F]">
                    Thank you, {form.name}. We will review your message and reply via email or phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Nair"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#2C221E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maya@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#2C221E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#2C221E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                        Inquiry Nature
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs text-[#2C221E] focus:outline-none focus:border-[#2C221E]"
                      >
                        <option>Bespoke Order / Wholesale Inquiry</option>
                        <option>Café / Restaurant Tableware Project</option>
                        <option>Wedding Favors & Festive Hampers</option>
                        <option>Shipping / Order Assistance</option>
                        <option>Custom Glaze Formulation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] mb-1">
                      Message & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please mention quantities, required delivery dates, or specific pieces from our catalog..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Atelier</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
