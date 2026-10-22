import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://margarets-homora.vercel.app"),
  title: "Margaret's Homora | Handcrafted Ceramics & Luxury Home Living",
  description:
    "Discover handcrafted ceramics, artisanal tableware, sculpted vases, and bespoke home decor inspired by European boutique elegance and Kerala kilns. Beautiful spaces. Thoughtful living.",
  keywords: [
    "ceramics",
    "tableware",
    "home decor",
    "handcrafted pottery",
    "Margaret's Homora",
    "ceramic cups",
    "tea sets",
    "vases",
    "planters",
    "luxury living",
  ],
  openGraph: {
    title: "Margaret's Homora | Handcrafted Ceramics & Luxury Home Living",
    description: "Curated ceramic collections, artisanal tableware, and thoughtful home accents.",
    url: "https://margarets-homora.vercel.app",
    siteName: "Margaret's Homora",
    images: [
      {
        url: "/images/hero_banner.jpg",
        width: 1200,
        height: 675,
        alt: "Margaret's Homora Artisanal Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#2C221E] antialiased selection:bg-[#DEC9B2] selection:text-[#2C221E]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
