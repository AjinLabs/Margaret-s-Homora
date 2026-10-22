'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  Star,
  CheckCircle2,
  Sparkles,
  Layers,
  Tag,
  DollarSign,
  Package,
  Eye,
  Plus,
  Play,
  Trash2,
  RefreshCw,
  Info,
  ShieldCheck,
  Heart
} from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const { categories, addProduct, isAdminAuthenticated, loginAdmin } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('ceramics-tableware');
  const [subCategory, setSubCategory] = useState('Mugs & Cups');
  const [price, setPrice] = useState<number>(350);
  const [originalPrice, setOriginalPrice] = useState<number>(420);
  const [stock, setStock] = useState<number>(20);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(5);
  const [sku, setSku] = useState(`MH-${Math.floor(100 + Math.random() * 900)}`);
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('Handcrafted stoneware clay, non-toxic food-safe glaze');
  const [dimensions, setDimensions] = useState('3.5" Height × 3.2" Diameter');
  const [capacity, setCapacity] = useState('250 ml');
  const [glazeTone, setGlazeTone] = useState('Warm Sand & Ivory');
  const [careInstructions, setCareInstructions] = useState('Microwave and dishwasher safe. Hand wash recommended for gold lustres.');
  const [tagsInput, setTagsInput] = useState('Handcrafted, Studio Ceramic, Pudukad');
  const [threeDType, setThreeDType] = useState<'cup' | 'bowl' | 'vase' | 'pitcher'>('cup');
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  // Badges
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isFestiveSpecial, setIsFestiveSpecial] = useState(false);

  // Media Gallery (Photos + Videos)
  const [images, setImages] = useState<string[]>([
    '/images/products/sunflower-cup-saucer.jpg'
  ]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoInput, setVideoInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    );
  };

  // Generate random SKU
  const handleRegenerateSku = () => {
    const prefix = category === 'vases-planters' ? 'PLT' : category === 'garden-decor' ? 'GDN' : 'CUP';
    setSku(`MH-${prefix}-${Math.floor(100 + Math.random() * 900)}`);
  };

  // Handle Photo File Upload (supports multiple files converted to DataURL)
  const handlePhotoFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    const fileArray = Array.from(files);
    let loadedCount = 0;
    const newImages: string[] = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
        }
        loadedCount++;
        if (loadedCount === fileArray.length) {
          setImages((prev) => [...prev, ...newImages]);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Image via Direct URL
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  // Set image as primary cover
  const handleSetPrimary = (index: number) => {
    setImages((prev) => {
      const selected = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [selected, ...rest];
    });
  };

  // Remove Image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Video File Upload
  const handleVideoFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    setVideoUrl(objectUrl);
  };

  // Handle Video URL
  const handleAddVideoUrl = () => {
    if (!videoInput.trim()) return;
    setVideoUrl(videoInput.trim());
    setVideoInput('');
  };

  // Admin Auth Gate
  if (!isAdminAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const ok = loginAdmin(passwordInput);
      if (!ok) setLoginError(true);
    };

    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#EAE2D7] shadow-xl p-8 space-y-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#D6C0A6] mx-auto shadow-sm bg-white">
            <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="font-serif text-xl font-bold text-[#2C221E]">Atelier Management Portal</h1>
            <p className="text-xs text-stone-500">Enter master studio passphrase to add new ceramic creations</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter master passkey (homora2026)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-[#FAF7F2] border border-[#D6C0A6] rounded-lg focus:outline-none focus:border-[#2C221E]"
            />
            {loginError && <p className="text-xs text-rose-600 font-medium text-center">Invalid passkey. Try: homora2026</p>}
            <button type="submit" className="w-full py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
              Unlock Portal
            </button>
          </form>
          <div className="text-center">
            <Link href="/" className="text-xs text-stone-500 hover:text-[#2C221E]">← Return to Storefront</Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a product title');
      return;
    }

    const finalImages = images.length > 0 ? images : ['/images/products/green-chinese-bowl.jpg'];
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newPiece: Omit<Product, 'id'> = {
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      subCategory,
      images: finalImages,
      videoUrl: videoUrl || undefined,
      description: description.trim() || `${name} is an artisanal handcrafted ceramic creation from Margaret's HOMORA atelier in Pudukad, Kerala.`,
      materials,
      dimensions,
      capacity,
      glazeTone,
      careInstructions,
      stock: Number(stock),
      lowStockThreshold: Number(lowStockThreshold),
      sku: sku.trim() || `MH-${Date.now()}`,
      isNewArrival,
      isBestseller,
      isFestiveSpecial,
      rating: 5.0,
      reviewCount: 1,
      tags: parsedTags,
      status,
      threeDType,
    };

    addProduct(newPiece);
    setSaveSuccess(true);

    setTimeout(() => {
      router.push('/admin');
    }, 1500);
  };

  const discountCalc = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C221E] pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAE2D7] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#2C221E] px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Inventory</span>
            </Link>
            <div className="h-4 w-px bg-stone-300 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D6C0A6] bg-white">
                <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
              </div>
              <span className="font-serif text-sm font-bold tracking-wider text-[#2C221E]">
                Add New Ceramic Design
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin"
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all hover:scale-[1.02] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EFE4D6]" />
              <span>Publish Piece</span>
            </button>
          </div>
        </div>
      </header>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-medium animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Ceramic piece &quot;{name}&quot; published successfully! Redirecting to Atelier Inventory...</span>
          </div>
        </div>
      )}

      {/* Main Form & Preview Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Sections (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Card 1: Visual Media (Photos & Video Upload) */}
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 sm:p-7 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D7]">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#5F6B4F]" />
                    <span>Product Photography &amp; Video</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Upload authentic high-resolution studio photos and demonstration videos of the piece.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#5F6B4F] bg-[#EFE4D6] px-2.5 py-1 rounded-full">
                  {images.length} Photos {videoUrl ? '+ 1 Video' : ''}
                </span>
              </div>

              {/* Photo Upload Zone */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Photos &amp; Angles (Drag &amp; drop or browse files)
                </label>
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D6C0A6] hover:border-[#2C221E] rounded-xl p-6 text-center cursor-pointer bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handlePhotoFiles(e.target.files)}
                  />
                  <Upload className="w-8 h-8 text-[#5F6B4F] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#2C221E]">
                    Click to select product photos or drag and drop
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Supports JPG, PNG, WEBP from your phone or camera
                  </p>
                </div>

                {/* Add Photo by URL */}
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Or enter direct image URL (e.g. /images/products/green-chinese-bowl.jpg)"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add URL
                  </button>
                </div>

                {/* Thumbnail Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-4">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-stone-50 group shadow-sm ${
                          idx === 0 ? 'border-[#5F6B4F] ring-2 ring-[#5F6B4F]/20' : 'border-[#EAE2D7]'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-[#5F6B4F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                            Cover
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimary(idx)}
                              title="Set as Cover Image"
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-stone-800 hover:bg-amber-100 hover:text-amber-700 transition-colors shadow"
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Remove Photo"
                            className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors shadow"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Showcase Video Section */}
              <div className="pt-4 border-t border-[#EAE2D7]">
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-[#5F6B4F]" />
                  <span>Product Demonstration Video (Optional)</span>
                </label>
                <p className="text-[11px] text-stone-500 mb-3">
                  Upload a kiln unboxing clip, 360° spin video, or paste an Instagram / MP4 video link.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Video Upload Button */}
                  <div
                    onClick={() => videoFileInputRef.current?.click()}
                    className="border border-dashed border-[#D6C0A6] hover:border-[#2C221E] rounded-xl p-4 text-center cursor-pointer bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors flex flex-col items-center justify-center min-h-[100px]"
                  >
                    <input
                      ref={videoFileInputRef}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleVideoFile(e.target.files)}
                    />
                    <Video className="w-6 h-6 text-[#5F6B4F] mb-1" />
                    <span className="text-xs font-medium text-[#2C221E]">Upload MP4 / WebM Video File</span>
                    <span className="text-[10px] text-stone-400">Directly from phone or studio library</span>
                  </div>

                  {/* Video URL Input */}
                  <div className="flex flex-col justify-between p-3.5 bg-stone-50 rounded-xl border border-[#EAE2D7]">
                    <span className="text-xs font-medium text-stone-700 mb-1">Paste Direct Video Link</span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://... (MP4 or video link)"
                        value={videoInput}
                        onChange={(e) => setVideoInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                      />
                      <button
                        type="button"
                        onClick={handleAddVideoUrl}
                        className="px-3 py-1.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Set
                      </button>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1">Useful for hosted videos &amp; reels</span>
                  </div>
                </div>

                {/* Video Preview Player */}
                {videoUrl && (
                  <div className="mt-4 p-3 bg-stone-900 rounded-xl text-white space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                        Live Showcase Video Preview
                      </span>
                      <button
                        type="button"
                        onClick={() => setVideoUrl('')}
                        className="text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Video
                      </button>
                    </div>
                    <video
                      src={videoUrl}
                      controls
                      className="w-full max-h-64 rounded-lg bg-black object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Essential Piece Details */}
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 sm:p-7 shadow-sm space-y-5">
              <h2 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2 pb-3 border-b border-[#EAE2D7]">
                <Layers className="w-5 h-5 text-[#5F6B4F]" />
                <span>Piece Classification &amp; Identity</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cobalt Floral Mughal Tea Cup or Hand Shaped Planters"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="cobalt-floral-mughal-tea-cup"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E] text-stone-600 font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-stone-700">SKU Code</label>
                    <button
                      type="button"
                      onClick={handleRegenerateSku}
                      className="text-[10px] text-[#5F6B4F] hover:underline flex items-center gap-0.5"
                    >
                      <RefreshCw className="w-3 h-3" /> Auto
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Studio Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Sub-Category / Collection
                  </label>
                  <input
                    type="text"
                    placeholder="Mugs &amp; Cups / Planters &amp; Sculptures / Tea Sets"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Editorial Craft Description &amp; Storytelling *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the silhouette, the glaze story, kiln nuances, and emotional aura of this ceramic piece..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E] leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Pricing & Kiln Stock */}
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2 pb-3 border-b border-[#EAE2D7]">
                <DollarSign className="w-5 h-5 text-[#5F6B4F]" />
                <span>Pricing &amp; Kiln Inventory</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Selling Price (₹ INR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-stone-500 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    MRP / Original Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-bold">₹</span>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                    />
                  </div>
                  {discountCalc > 0 && (
                    <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                      {discountCalc}% Collector Discount
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Kiln Stock Count *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Craft Specifications */}
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2 pb-3 border-b border-[#EAE2D7]">
                <Package className="w-5 h-5 text-[#5F6B4F]" />
                <span>Craft Specifications &amp; 3D Turntable</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Glaze Tone &amp; Palette
                  </label>
                  <input
                    type="text"
                    placeholder="Matte Porcelain White, Cobalt &amp; Ivory"
                    value={glazeTone}
                    onChange={(e) => setGlazeTone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Dimensions (H × W)
                  </label>
                  <input
                    type="text"
                    placeholder="3.5 in Height x 3.2 in Diameter"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Capacity (ml)
                  </label>
                  <input
                    type="text"
                    placeholder="250 ml / Pair Planters"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Materials &amp; Kiln Clay
                  </label>
                  <input
                    type="text"
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    3D Studio Model Type
                  </label>
                  <select
                    value={threeDType}
                    onChange={(e) => setThreeDType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  >
                    <option value="cup">Mug / Cup Turntable</option>
                    <option value="bowl">Bowl / Plate Turntable</option>
                    <option value="vase">Vase / Urn Turntable</option>
                    <option value="pitcher">Pitcher / Kettle Turntable</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Care &amp; Cleaning Instructions
                  </label>
                  <input
                    type="text"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                  />
                </div>
              </div>
            </div>

            {/* Card 5: Placement & Badges */}
            <div className="bg-white rounded-2xl border border-[#EAE2D7] p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-semibold text-[#2C221E] flex items-center gap-2 pb-3 border-b border-[#EAE2D7]">
                <Tag className="w-5 h-5 text-[#5F6B4F]" />
                <span>Placement, Tags &amp; Badges</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Product Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Planters, Handcrafted, Gifting, Valentine, Pudukad"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D7] rounded-lg focus:outline-none focus:border-[#2C221E]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 p-2.5 rounded-lg border border-[#EAE2D7] hover:bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="rounded text-[#2C221E] focus:ring-[#2C221E]"
                  />
                  <span>New In</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 p-2.5 rounded-lg border border-[#EAE2D7] hover:bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="rounded text-[#2C221E] focus:ring-[#2C221E]"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 p-2.5 rounded-lg border border-[#EAE2D7] hover:bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFestiveSpecial}
                    onChange={(e) => setIsFestiveSpecial(e.target.checked)}
                    className="rounded text-[#2C221E] focus:ring-[#2C221E]"
                  />
                  <span>Festive Edit</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 p-2.5 rounded-lg border border-[#EAE2D7] hover:bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={status === 'active'}
                    onChange={(e) => setStatus(e.target.checked ? 'active' : 'draft')}
                    className="rounded text-[#2C221E] focus:ring-[#2C221E]"
                  />
                  <span>Active Live</span>
                </label>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Link
                href="/admin"
                className="px-5 py-2.5 border border-stone-300 hover:bg-stone-100 rounded-lg text-xs font-semibold text-stone-700 transition-colors"
              >
                Discard &amp; Back
              </Link>
              <button
                type="submit"
                className="px-7 py-2.5 bg-[#2C221E] hover:bg-[#3E3029] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow transition-all hover:scale-[1.02]"
              >
                Publish Ceramic Piece
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Live Storefront Preview (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#5F6B4F] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Customer Storefront Preview
                </span>
                <span className="text-[10px] text-stone-400">Live preview card</span>
              </div>

              {/* Product Card Preview */}
              <div className="bg-white rounded-2xl border border-[#EAE2D7] overflow-hidden shadow-md group">
                <div className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={images[0] || '/images/products/green-chinese-bowl.jpg'}
                    alt={name || 'Preview Piece'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {isNewArrival && (
                      <span className="bg-[#2C221E] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        New In
                      </span>
                    )}
                    {discountCalc > 0 && (
                      <span className="bg-[#C0745A] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        {discountCalc}% Off
                      </span>
                    )}
                  </div>

                  {videoUrl && (
                    <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur text-white text-[9px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow">
                      <Play className="w-3 h-3 fill-white text-white" /> Video Included
                    </span>
                  )}

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-stone-700">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                    {glazeTone || 'Handcrafted Ceramic'}
                  </p>
                  <h3 className="font-serif text-sm font-semibold text-[#2C221E] truncate">
                    {name || 'Untiled Handcrafted Piece'}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {description || 'Artisanal ceramic tableware shaped and kiln-fired in Pudukad, Kerala.'}
                  </p>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-serif text-base font-bold text-[#2C221E]">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    {originalPrice && originalPrice > price && (
                      <span className="text-xs text-stone-400 line-through">
                        ₹{originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 text-[10px] text-stone-500 flex items-center justify-between border-t border-stone-100">
                    <span>Stock: {stock} units</span>
                    <span className="text-emerald-700 font-medium">Ready to dispatch</span>
                  </div>
                </div>
              </div>

              {/* Helpful Tips Card */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE2D7] text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-[#2C221E]">
                  <Info className="w-4 h-4 text-[#5F6B4F]" />
                  <span>Media Upload Tips</span>
                </div>
                <ul className="text-[11px] text-stone-500 space-y-1 list-disc pl-4 leading-relaxed">
                  <li>Upload at least 2 photos (main profile angle + overhead/interior glaze shot).</li>
                  <li>Videos can be short 5-15 second kiln unboxing or spin reels.</li>
                  <li>Click the Star icon on any photo to set it as the cover image.</li>
                </ul>
              </div>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
