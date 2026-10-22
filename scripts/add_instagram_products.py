import re

data_path = r'c:\Margaret’s Homora\src\lib\data.ts'

with open(data_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update INITIAL_SETTINGS
settings_old = '''export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "Margaret's Homora",
  tagline: "Beautiful Spaces. Thoughtful Living.",
  announcementBarText: "Festive Season Edit: Enjoy 10% off with code HOMORA10 • Complimentary shipping above ₹999",
  isAnnouncementBarActive: true,
  whatsappNumber: "+919876543210",
  supportPhone: "+91 98765 43210",
  supportEmail: "hello@margaretshomora.com",
  address: "Heritage Potter's Atelier, Fort Kochi, Kerala 682001, India",
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  heroHeadline: "Artisanal Tableware & Ceramic Poetry",
  heroSubheadline: "Handcrafted stoneware, organic textured glazes, and heirloom tableware shaped by Kerala kiln traditions for mindful, beautiful living.",
};'''

settings_new = '''export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "Margaret's Homora",
  tagline: "Quality ceramic & homeware products for your everyday needs.",
  announcementBarText: "Festive Season Edit: Enjoy 10% off with code HOMORA10 • Complimentary shipping above ₹999",
  isAnnouncementBarActive: true,
  whatsappNumber: "+91 70125 43613",
  supportPhone: "+91 70125 43613",
  supportEmail: "margaretshomora@gmail.com",
  address: "Room 4, Lona complex, Bazar Road, Pudukad, Thrissur, Kerala - 680301",
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  heroHeadline: "Artisanal Tableware & Ceramic Poetry",
  heroSubheadline: "Quality ceramic and homeware products for your everyday needs. Handcrafted stoneware, organic textured glazes, and heirloom tableware shaped in Pudukad, Thrissur, Kerala.",
};'''

if settings_old in content:
    content = content.replace(settings_old, settings_new)
    print("Replaced INITIAL_SETTINGS successfully!")
else:
    print("Could not find exact INITIAL_SETTINGS snippet, updating via regex")
    content = re.sub(r'whatsappNumber:\s*"[^"]*"', 'whatsappNumber: "+91 70125 43613"', content)
    content = re.sub(r'supportPhone:\s*"[^"]*"', 'supportPhone: "+91 70125 43613"', content)
    content = re.sub(r'supportEmail:\s*"[^"]*"', 'supportEmail: "margaretshomora@gmail.com"', content)
    content = re.sub(r'address:\s*"[^"]*"', 'address: "Room 4, Lona complex, Bazar Road, Pudukad, Thrissur, Kerala - 680301"', content)

# 2. Add the 5 Instagram items at the beginning of INITIAL_PRODUCTS
new_products_block = '''  // New Authentic Instagram & Studio Additions
  {
    id: "prod-hand-planters",
    name: "Ceramic Hand Shaped Planters (Pair)",
    slug: "ceramic-hand-shaped-planters-pair",
    price: 490,
    originalPrice: 650,
    category: "vases-planters",
    subCategory: "Planters & Sculptures",
    images: [
      "/images/products/hand-shaped-planters.jpg",
    ],
    description: "Little pieces that make a big statement. Unique ceramic hand shaped planters designed to bring charm and character to your space. Perfect for your favourite little plants or simply as a beautiful décor piece.",
    materials: "Matte white glazed porcelain stoneware",
    dimensions: "4.5\" Width × 3.2\" Height",
    capacity: "Mini planter / succulent holder",
    glazeTone: "Matte Porcelain White",
    careInstructions: "Wipe with soft damp cloth. Suitable for indoor succulents, cacti, or desk styling.",
    stock: 15,
    lowStockThreshold: 4,
    sku: "MH-PLT-034",
    isBestseller: true,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 32,
    tags: ["Planters", "Hand Shaped", "Sculptural", "Pudukad Studio", "Instagram Featured"],
    status: "active",
    threeDType: "vase",
  },
  {
    id: "prod-sunflower-cup",
    name: "Sunflower Marigold Cup and Saucer",
    slug: "sunflower-marigold-cup-and-saucer",
    price: 340,
    originalPrice: 420,
    category: "ceramics-tableware",
    subCategory: "Mugs & Cups",
    images: [
      "/images/products/sunflower-cup-saucer.jpg",
    ],
    description: "Vibrant hand-painted marigold and sunflower blossoms over warm ivory ribbed ceramic with matching scalloped floral saucer. Radiates warmth and cottagecore joy with every sip.",
    materials: "Hand-glazed artisanal earthenware stoneware",
    dimensions: "3.2\" Height × 3.5\" Diameter",
    capacity: "240 ml",
    glazeTone: "Ivory & Saffron Sunflower",
    careInstructions: "Microwave and dishwasher safe.",
    stock: 20,
    lowStockThreshold: 5,
    sku: "MH-MUG-035",
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 26,
    tags: ["Sunflower", "Marigold", "Floral Cup", "Cottagecore", "Saucer Set"],
    status: "active",
    threeDType: "cup",
  },
  {
    id: "prod-white-hearts-cup",
    name: "Ivory Cascading Red Hearts Cup and Saucer",
    slug: "ivory-cascading-red-hearts-cup-and-saucer",
    price: 350,
    originalPrice: 410,
    category: "ceramics-tableware",
    subCategory: "Mugs & Cups",
    images: [
      "/images/products/white-red-hearts-cup-saucer.jpg",
    ],
    description: "Scattered ruby-red love hearts floating over pure milky white ceramic with scalloped square saucer. An exquisite romantic companion piece to the Red Heart Cup.",
    materials: "High-fired white ceramic stoneware",
    dimensions: "3.2\" Height × 3.5\" Diameter",
    capacity: "220 ml",
    glazeTone: "Milk White & Crimson Hearts",
    careInstructions: "Microwave and dishwasher safe.",
    stock: 18,
    lowStockThreshold: 4,
    sku: "MH-MUG-036",
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 21,
    tags: ["Heart Cup", "Romantic", "Valentine", "Saucer Set", "Handcrafted"],
    status: "active",
    threeDType: "cup",
  },
  {
    id: "prod-blue-kettle-set",
    name: "Royal Blue Mughal Teapot Kettle & 6 Cups Set",
    slug: "royal-blue-mughal-teapot-kettle-6-cups-set",
    price: 1450,
    originalPrice: 1800,
    category: "ceramics-tableware",
    subCategory: "Tea & Coffee Sets",
    images: [
      "/images/products/blue-white-kettle-cup-set.jpg",
    ],
    description: "Magnificent 7-piece tea service featuring an authentic blue and white floral Mughal teapot kettle with six matching teacups. Traditional royal Indian pottery craft designed for hospitable afternoon gatherings.",
    materials: "Vitrified glazed stoneware ceramic",
    dimensions: "Kettle: 7.2\" Height × 6.0\" Width | Cups: 3.0\" Height",
    capacity: "Kettle: 850 ml | Cups: 180 ml each",
    glazeTone: "Royal Cobalt Blue & Ivory Bone",
    careInstructions: "Microwave safe, gentle wash recommended.",
    stock: 8,
    lowStockThreshold: 2,
    sku: "MH-SET-037",
    isBestseller: true,
    isFestiveSpecial: true,
    rating: 5.0,
    reviewCount: 39,
    tags: ["Kettle Set", "7-Piece Set", "Mughal Ceramic", "Royal Blue", "Gifting"],
    status: "active",
    threeDType: "pitcher",
  },
  {
    id: "prod-heart-canister",
    name: "Sweetheart Ceramic Storage Canister with Lid",
    slug: "sweetheart-ceramic-storage-canister-jar",
    price: 380,
    originalPrice: 450,
    category: "ceramics-tableware",
    subCategory: "Kitchen & Storage",
    images: [
      "/images/products/red-heart-ceramic-canister-jar.jpg",
    ],
    description: "Square ceramic storage jar adorned with hand-painted crimson hearts and fitted with an airtight ceramic lid. Ideal for cookies, sugar cubes, artisanal teas, or vanity keepsakes.",
    materials: "High-grade ceramic with food-safe silicone airtight gasket",
    dimensions: "4.0\" Width × 4.0\" Depth × 5.2\" Height",
    capacity: "500 ml",
    glazeTone: "Glossy Ivory & Crimson Heart Pattern",
    careInstructions: "Hand wash lid; jar is dishwasher safe.",
    stock: 14,
    lowStockThreshold: 3,
    sku: "MH-CAN-038",
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 18,
    tags: ["Canister", "Cookie Jar", "Heart Pattern", "Kitchen Storage", "Decor"],
    status: "active",
    threeDType: "pitcher",
  },
'''

# Insert after `export const INITIAL_PRODUCTS: Product[] = [\n`
prod_init_match = re.search(r'export const INITIAL_PRODUCTS:\s*Product\[\]\s*=\s*\[\n', content)
if prod_init_match:
    idx = prod_init_match.end()
    content = content[:idx] + new_products_block + content[idx:]
    print("Added new Instagram products to INITIAL_PRODUCTS!")

with open(data_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("data.ts updated successfully!")
