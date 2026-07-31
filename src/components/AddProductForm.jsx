import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Film, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Globe, 
  DollarSign, 
  Package, 
  Box, 
  Layers, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Code, 
  Eye, 
  HelpCircle,
  RefreshCw,
  TrendingUp,
  Star,
  Zap,
  Flame,
  FileText
} from 'lucide-react';

export const AddProductForm = ({ onNavigate, onSuccess }) => {
  // 1. Basic Product Info
  const [productName, setProductName] = useState('');
  const [slug, setSlug] = useState('');
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [category, setCategory] = useState('Electronics');
  const [subCategory, setSubCategory] = useState('Audio & Headphones');
  const [brand, setBrand] = useState('ApexTech');
  const [shortDescription, setShortDescription] = useState('');
  
  // Rich Text Editor State
  const [fullDescription, setFullDescription] = useState('<h1>Product Overview</h1><p>Experience unmatched sound quality with active noise cancellation and premium battery life.</p>');
  const [editorTab, setEditorTab] = useState('write');

  // 2. Pricing & Financials
  const [price, setPrice] = useState('299.99');
  const [discountPrice, setDiscountPrice] = useState('249.99');
  const [costPrice, setCostPrice] = useState('120.00');

  // 3. Inventory & Logistics
  const [sku, setSku] = useState('APX-HEAD-009');
  const [barcode, setBarcode] = useState('8901234567890');
  const [stock, setStock] = useState('45');
  const [weight, setWeight] = useState('0.45');
  const [dimLength, setDimLength] = useState('20');
  const [dimWidth, setDimWidth] = useState('18');
  const [dimHeight, setDimHeight] = useState('8');

  // 4. Tags
  const [tags, setTags] = useState(['Headphones', 'Wireless', 'ANC', 'Bluetooth 5.3']);
  const [tagInput, setTagInput] = useState('');

  // 5. Media & Uploads
  const [thumbnail, setThumbnail] = useState(
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  );
  const [gallery, setGallery] = useState([
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
  ]);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  // 6. Marketing Badges & Status
  const [status, setStatus] = useState('Published');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isTrending, setIsTrending] = useState(true);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isBestSelling, setIsBestSelling] = useState(true);

  // 7. SEO & Meta
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState(['Noise Cancelling', 'ApexTech Headphones', 'Wireless Audio']);
  const [keywordInput, setKeywordInput] = useState('');

  // Auto Generate Slug
  useEffect(() => {
    if (!isCustomSlug && productName) {
      const generated = productName
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generated);
    }
  }, [productName, isCustomSlug]);

  // Auto Generate Meta Title if empty
  useEffect(() => {
    if (!metaTitle && productName) {
      setMetaTitle(`${productName} - Buy Online at ApexStore`);
    }
  }, [productName]);

  // Subcategories mapping
  const subCategoriesMap = {
    Electronics: ['Audio & Headphones', 'Smartphones & Accessories', 'Wearables & Smartwatches', 'Laptops & Computers', 'Cameras & Video'],
    Fashion: ['Men\'s Apparel', 'Women\'s Apparel', 'Footwear', 'Watches & Jewelry', 'Bags & Accessories'],
    'Home & Living': ['Kitchen Appliances', 'Smart Home Security', 'Furniture', 'Lighting', 'Decor'],
    'Fitness & Sports': ['Gym Equipment', 'Yoga & Wellness', 'Outdoor Gear', 'Sports Wear']
  };

  // Helper calculations
  const numericPrice = parseFloat(price) || 0;
  const numericDiscount = parseFloat(discountPrice) || 0;
  const numericCost = parseFloat(costPrice) || 0;
  const effectivePrice = numericDiscount > 0 ? numericDiscount : numericPrice;
  const profit = effectivePrice - numericCost;
  const margin = effectivePrice > 0 ? ((profit / effectivePrice) * 100).toFixed(1) : '0';

  // Handler: Add Tag
  const handleAddTag = (e) => {
    if (e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Handler: Add SEO Keyword
  const handleAddKeyword = (e) => {
    if (e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    if (keywordInput.trim() && !seoKeywords.includes(keywordInput.trim())) {
      setSeoKeywords([...seoKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kwToRemove) => {
    setSeoKeywords(seoKeywords.filter(k => k !== kwToRemove));
  };

  // Handler: SKU Auto Generation
  const handleGenerateSKU = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const prefix = brand ? brand.substring(0, 3).toUpperCase() : 'PRD';
    setSku(`${prefix}-${category.substring(0, 3).toUpperCase()}-${random}`);
  };

  // Handler: Barcode Generation
  const handleGenerateBarcode = () => {
    let code = '89';
    for (let i = 0; i < 11; i++) {
      code += Math.floor(Math.random() * 10);
    }
    setBarcode(code);
  };

  // Handler: Mock Image Upload
  const handleMockThumbnailUpload = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
    ];
    const picked = mockImages[Math.floor(Math.random() * mockImages.length)];
    setThumbnail(picked);
  };

  const handleMockGalleryUpload = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80'
    ];
    const picked = mockImages[Math.floor(Math.random() * mockImages.length)];
    if (!gallery.includes(picked)) {
      setGallery([...gallery, picked]);
    }
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Product "${productName || 'New Product'}" published successfully with SKU ${sku}!`);
    if (onSuccess) onSuccess();
    onNavigate('products-all');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 shadow-xl backdrop-blur-md bg-slate-900/90">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Catalog Manager
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs text-slate-400 font-mono">Create New Product</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Add New Product</h1>
          <p className="text-xs text-slate-400">Fill in comprehensive catalog information, pricing, stock, media, and SEO attributes.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('products-all')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" /> Save & Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT & CENTER COLUMNS (2 cols) - Basic Info, Description, Pricing, Logistics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: GENERAL INFORMATION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <ShoppingBag className="w-4 h-4 text-indigo-400" /> General Information
            </h2>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Product Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Acoustic Pro Wireless Headphones"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Slug */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    URL Slug <span className="text-slate-500 text-[10px]">(Auto-generated)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomSlug(!isCustomSlug)}
                    className="text-[10px] text-indigo-400 hover:underline"
                  >
                    {isCustomSlug ? 'Auto-Generate' : 'Custom Edit'}
                  </button>
                </div>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden px-3 py-2 text-xs text-slate-400 font-mono">
                  <span className="text-slate-600 select-none">https://apexstore.io/products/</span>
                  <input
                    type="text"
                    readOnly={!isCustomSlug}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="bg-transparent text-white focus:outline-none w-full ml-1 font-mono"
                  />
                </div>
              </div>

              {/* Category, Sub Category, Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      const subs = subCategoriesMap[e.target.value] || [];
                      if (subs.length > 0) setSubCategory(subs[0]);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Fitness & Sports">Fitness & Sports</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Sub Category</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    {(subCategoriesMap[category] || ['General']).map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. ApexTech, Sony"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Short Description <span className="text-slate-500 text-[10px]">(Key bullet points shown in search & previews)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. High-fidelity wireless audio with active noise cancellation, 40hr battery, and ultra-plush memory foam earcups."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Full Description (Rich Text Editor Mockup) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Full Description (Rich Text)</label>
                  <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-2.5 py-1 text-[10px] font-semibold rounded-md ${
                        editorTab === 'write' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-2.5 py-1 text-[10px] font-semibold rounded-md ${
                        editorTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {editorTab === 'write' ? (
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                    {/* Rich Formatting Toolbar */}
                    <div className="bg-slate-900 border-b border-slate-800 p-2 flex flex-wrap items-center gap-1.5 text-slate-400">
                      <button type="button" className="p-1 hover:bg-slate-800 rounded hover:text-white" title="Bold">
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-800 rounded hover:text-white" title="Italic">
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-800 rounded hover:text-white" title="Underline">
                        <Underline className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-4 bg-slate-800 my-auto mx-1" />
                      <button type="button" className="p-1 hover:bg-slate-800 rounded hover:text-white" title="Bullet List">
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-800 rounded hover:text-white" title="Numbered List">
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-4 bg-slate-800 my-auto mx-1" />
                      <button type="button" className="p-1 hover:bg-slate-800 rounded hover:text-white" title="Code snippet">
                        <Code className="w-3.5 h-3.5" />
                      </button>
                      <span className="ml-auto text-[10px] text-slate-500 pr-1">HTML Enabled</span>
                    </div>
                    <textarea
                      rows={5}
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      className="w-full bg-slate-950 p-3 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="border border-slate-800 rounded-xl p-4 bg-slate-950 min-h-[140px] text-xs text-slate-300 prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: fullDescription }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: PRICING & PROFIT MARGINS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Pricing & Financials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Regular Price */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Regular Price ($) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="299.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              {/* Discount Price */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Discount / Sale Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="249.99"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              {/* Cost Price */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Cost per Item ($) <span className="text-slate-500 text-[10px]">(COGS)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="120.00"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Calculated Margin Widget */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-bold">
                  %{margin}
                </div>
                <div>
                  <span className="font-semibold text-white block">Estimated Profit Margin</span>
                  <span className="text-[11px] text-slate-400">
                    Profit: <span className="font-bold text-emerald-400">${profit.toFixed(2)}</span> per sale
                  </span>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                Effective Price: <span className="font-bold text-white">${effectivePrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: INVENTORY & LOGISTICS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Package className="w-4 h-4 text-amber-400" /> Inventory & Physical Dimensions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SKU */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">SKU Code</label>
                  <button
                    type="button"
                    onClick={handleGenerateSKU}
                    className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. APX-HEAD-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Barcode */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Barcode / EAN / UPC</label>
                  <button
                    type="button"
                    onClick={handleGenerateBarcode}
                    className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Generate
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 8901234567890"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="45"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.45"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Dimensions L x W x H */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Dimensions (L × W × H) in cm</label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Length"
                  value={dimLength}
                  onChange={(e) => setDimLength(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Width"
                  value={dimWidth}
                  onChange={(e) => setDimWidth(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={dimHeight}
                  onChange={(e) => setDimHeight(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: TAGS & VIDEO URL */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Tag className="w-4 h-4 text-cyan-400" /> Tags & Media Links
            </h2>

            {/* Product Tags */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Product Tags</label>
              <div className="flex flex-wrap gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl mb-2 min-h-[42px]">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
                >
                  Add Tag
                </button>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Video Demo URL (YouTube / Vimeo)</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                <Film className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-transparent text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: SEO METADATA & GOOGLE SERP PREVIEW */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Globe className="w-4 h-4 text-blue-400" /> Search Engine Optimization (SEO)
            </h2>

            {/* Meta Title */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <label className="font-semibold text-slate-300">Meta Title</label>
                <span className={`text-[10px] ${metaTitle.length > 60 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {metaTitle.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. Apex Acoustic Pro Headphones - Premium Wireless Audio"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <label className="font-semibold text-slate-300">Meta Description</label>
                <span className={`text-[10px] ${metaDescription.length > 160 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={2}
                placeholder="Buy Apex Acoustic Pro Wireless Headphones with active noise cancellation, high-res audio, and 40-hour battery life. Free shipping & 2-year warranty."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* SEO Keywords */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">SEO Keywords</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-950 border border-slate-800 rounded-xl mb-2">
                {seoKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300"
                  >
                    {kw}
                    <button type="button" onClick={() => handleRemoveKeyword(kw)} className="hover:text-rose-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add target keyword..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleAddKeyword}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => handleAddKeyword()}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl"
                >
                  Add Keyword
                </button>
              </div>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Google SERP Snippet Preview</span>
              <div className="text-[11px] text-blue-400 hover:underline font-medium truncate">
                {metaTitle || 'Product Title Placeholder'}
              </div>
              <div className="text-[10px] text-emerald-500 font-mono truncate">
                https://apexstore.io/products/{slug || 'product-slug'}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2">
                {metaDescription || shortDescription || 'No description provided. Add a compelling meta description to boost click-through rates on search engines.'}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1 col) - Media Uploads & Visibility Controls */}
        <div className="space-y-6">

          {/* PUBLISH STATUS & PROMOTIONAL BADGES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Visibility & Status
            </h2>

            {/* Publishing Status */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Product Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Published">Published (Active on Store)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Scheduled">Scheduled Launch</option>
              </select>
            </div>

            {/* Promotional Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Product Badges</span>
              
              {/* Featured Product */}
              <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">Featured Product</span>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
              </label>

              {/* Trending Product */}
              <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-semibold text-slate-200">Trending Product</span>
                </div>
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
              </label>

              {/* New Arrival */}
              <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200">New Arrival</span>
                </div>
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
              </label>

              {/* Best Selling */}
              <label className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">Best Selling</span>
                </div>
                <input
                  type="checkbox"
                  checked={isBestSelling}
                  onChange={(e) => setIsBestSelling(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
              </label>
            </div>
          </div>

          {/* THUMBNAIL UPLOAD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-400" /> Primary Thumbnail
              </span>
            </h2>

            {thumbnail ? (
              <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={thumbnail} alt="Thumbnail preview" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleMockThumbnailUpload}
                    className="p-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setThumbnail(null)}
                    className="p-2 bg-rose-600 text-white rounded-lg text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleMockThumbnailUpload}
                className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/50 rounded-xl p-6 text-center cursor-pointer transition-all space-y-2"
              >
                <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                <div className="text-xs font-semibold text-slate-300">Click or Drag Image to Upload</div>
                <p className="text-[10px] text-slate-500">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
          </div>

          {/* GALLERY UPLOAD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" /> Gallery Images
              </h2>
              <button
                type="button"
                onClick={handleMockGalleryUpload}
                className="text-[10px] text-indigo-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Image
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {gallery.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 aspect-square bg-slate-950">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-slate-900/80 hover:bg-rose-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div
                onClick={handleMockGalleryUpload}
                className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/30 rounded-xl flex flex-col items-center justify-center cursor-pointer p-3 text-slate-500 hover:text-indigo-400 transition-all aspect-square"
              >
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-semibold">Upload</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
};
