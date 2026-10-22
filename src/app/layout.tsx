import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://margarets-homora.vercel.app"),
  title: "Margaret's HOMORA | Ceramic Home & Living",
  description:
    "Margaret's HOMORA — Handcrafted ceramics, artisanal tableware, sculpted vases, and luxury home living. Beautiful spaces. Thoughtful living.",
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
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Margaret's HOMORA | Ceramic Home & Living",
    description: "Handcrafted ceramics, tableware and lifestyle decor. Beautiful Spaces. Thoughtful Living.",
    url: "https://margarets-homora.vercel.app",
    siteName: "Margaret's HOMORA",
    images: [
      {
        url: "/images/logo.png",
        width: 424,
        height: 424,
        alt: "Margaret's HOMORA Ceramic Home & Living",
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
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#2C221E] antialiased selection:bg-[#DEC9B2] selection:text-[#2C221E]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
