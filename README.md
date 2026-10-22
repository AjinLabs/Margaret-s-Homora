# Margaret’s Homora — Handcrafted Ceramics & Luxury Home Living

> **"Beautiful Spaces. Thoughtful Living."**  
> *Alternative Campaign Tagline: "Little Details. Beautiful Living."*

A luxury boutique e-commerce web platform and private backoffice management system designed for **Margaret’s Homora**, an artisanal home decor, ceramic tableware, sculptural vase, and gifting brand rooted in Kerala kiln heritage and European boutique elegance.

---

## 🌟 Key Highlights & Features

### 🛍️ 1. Customer Storefront
- **Refined Color Palette**: Warm ivory (`#FBF8F2`), champagne beige (`#E8D8C3`), warm sand (`#D6C0A6`), deep espresso (`#2C221E`), olive green (`#5F6B4F`), and dusty terracotta (`#C0745A`).
- **Editorial Typography**: Pairing serif elegance (`Playfair Display`, `Cormorant Garamond`) with modern interface sans-serif (`Plus Jakarta Sans`).
- **Interactive 3D Studio Showcase**: Real-time WebGL/Three.js interactive pottery turntable allowing visitors to rotate 360°, inspect glazes (Raw Terracotta, Periyar Sage, Matte Sand Ivory, Cobalt Mughal), and toggle models (Vases, Belly Cups, Pasta Bowls).
- **Exact WhatsApp Business Profile Products**:
  - Mughal Print Cup (₹210)
  - Red Floral Folk Mug (₹235)
  - Honey Bee Textured Mug (₹230)
  - Kettle Mug Mini Duo (₹320)
  - Botanical Forest Kettle Mug (₹360)
  - Royal Moroccan Coffee Set with Acacia Tray (₹790)
  - Rose Quartz Luxury 6-Piece Afternoon Tea Service (₹1,200)
  - Stoneware 4-Cup Host Set with Platter (₹1,250)
  - Artisanal Ceramic Chai Set with Vintage Wire Rack (₹750)
  - Embossed Blossom Flower Cup (₹325)
  - Woodland Deer Cups (₹150)
  - Traditional Belly Ceramic Cups (₹105)
  - Fluted Chai Cups (₹85), Ditsy Floral (₹75), Mini Espresso (₹40), Slanted & Straight Mugs (₹50)
  - Ceramic Travel Tumbler with Closable Silicone Lid (₹320)
  - 16-Piece Wayanad Clay Dinner Service (₹8,400)
  - Alleppey Matte Sand Pasta Bowls (₹2,200)
  - Calicut Speckled Centerpiece Platter (₹1,850)
  - Kovalam Terracotta Breakfast Set (₹3,100)
  - Periyar Sage Shallow Salad Bowl (₹1,650)
  - Fluted Sculptural Ceramic Urn (₹1,450)
  - Festive Heritage Gifting Hamper in Keepsake Pine Box (₹2,400)

### 🏺 2. Catalog & "The Atelier" Filter Experience
- Inspired by premier artisanal ceramic studios.
- Interactive **Refine Studio** filter bar:
  - Department filtering (Tableware, Vases & Planters, Home Accents, Garden Decor, Gift Hampers)
  - Price Range Slider (₹50 to ₹9,000)
  - Artisanal Glaze Tone palette filters (Terracotta, Cobalt, Sage, Sand, Midnight Blue)
  - Availability toggle ("Ready to Dispatch / In-Stock Only")
  - Sorting: Featured, Price Low-to-High, Price High-to-Low, Highest Rated

### 🛒 3. Cart & Milestone Delivery Tracking
- Slide-over Cart Drawer with glassmorphism backdrop.
- Animated **Free Shipping Milestone Progress Bar** (Unlocks free pan-India shipping above ₹999).
- Instant coupon code verification (`HOMORA10` for 10% off, `FESTIVE15` for 15% off, `WELCOME50` for flat ₹50 off).
- **Order via WhatsApp Direct**: Pre-fills the entire cart list, quantities, and totals into a polite WhatsApp message.

### 💳 4. India-Ready Checkout & Razorpay Integration
- Full contact & delivery address form tailored for India (Indian 6-digit PIN code and 10-digit mobile number validation, Indian States selector).
- **Authentic Razorpay Gateway Simulator**: Interactive modal supporting UPI (QR code, Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), and NetBanking.
- **Cash on Delivery (COD)** option with verified delivery OTP.
- Zero-cost external database setup: works seamlessly out of the box when deployed to Vercel!

### 📦 5. Order Confirmation & Live Tracking
- Celebratory confetti on order placement.
- Printable, clean **Tax Invoice Slip** (`window.print()`).
- One-click "Send Receipt to WhatsApp".
- Dedicated order tracking page (`/track`) with live courier partner references (DTDC Express, Blue Dart) and progress timeline.

### 🛡️ 6. Private Admin Management Portal (`/admin`)
- Secure authentication barrier (Preset passkey: `homora2026`).
- **Dashboard Overview**: Total gross revenue, verified orders, average order value, low-stock alerts, and recent patron orders.
- **Product Management (CRUD)**: Create new ceramic pieces, edit title, price, original MRP, stock quantity, SKU, glaze tone, and delete products.
- **Order & Shipping Control**: Update order fulfillment statuses (Confirmed → Packed → Shipped → Delivered → Cancelled) and input courier tracking AWB numbers.
- **Seasonal Coupons Manager**: Create new promotional codes, toggle active/inactive status, and configure discount limits.
- **Store CMS & Settings**: Change announcement bar text, toggle visibility, update studio WhatsApp number, and configure free shipping thresholds.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router) + React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 + Vanilla CSS Design Tokens |
| **3D Graphics** | Three.js (Interactive WebGL Ceramic Turntable) |
| **Icons** | Lucide React |
| **Animation & Effects** | CSS Micro-animations + Canvas Confetti |
| **State Persistence** | React Context + LocalStorage with zero-friction Vercel hosting |
| **Payment Gateway** | Razorpay Checkout Integration & Modal Simulator |
| **Target Deployment** | Vercel |

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AjinLabs/Margaret-s-Homora.git
   cd Margaret-s-Homora
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production build verification:**
   ```bash
   npm run build
   ```

---

## 🔐 Admin Dashboard Access

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin` on your Vercel deployment)
- **Master Passkey**: `homora2026`
- *Tip: The admin login card also includes an "Auto Fill & Enter" button for rapid review on mobile devices.*

---

## 🌐 Deploying to Vercel

1. Push your code to the GitHub repository: `https://github.com/AjinLabs/Margaret-s-Homora`
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `Margaret-s-Homora` repository.
4. Framework preset will automatically be detected as **Next.js**.
5. Click **Deploy**. In under 60 seconds, your luxury store will be live with a shareable URL to present to the client!

---

*Handcrafted for deliberate living • Margaret’s Homora Atelier, Fort Kochi, Kerala, India.*
