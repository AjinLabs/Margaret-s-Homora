'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const { settings } = useStore();
  const phone = (settings.whatsappNumber || '').replace(/[^0-9]/g, '') || '917012543613';
  const message = encodeURIComponent(
    "Hello Margaret's Homora! 🌸 I am browsing your online atelier and would love assistance with product details and bespoke gifting."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group border-2 border-white/60"
    >
      <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
      <span className="text-xs font-semibold tracking-wide hidden sm:inline">
        Atelier Concierge
      </span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full" />
    </a>
  );
}
