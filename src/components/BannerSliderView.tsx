import React, { useState, useEffect } from 'react';
import { Banner, BannerType } from '../types';
import { 
  Sliders, 
  Plus, 
  Search, 
  ArrowUp, 
  ArrowDown, 
  GripVertical, 
  Eye, 
  Edit2, 
  Trash2, 
  Copy, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Tag, 
  Calendar, 
  MousePointer, 
  TrendingUp, 
  Layers, 
  Layout, 
  Image as ImageIcon, 
  Zap, 
  Folder, 
  MessageSquare, 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface BannerSliderViewProps {
  banners: Banner[];
  onAddBanner: (newBanner: Banner) => void;
  onUpdateBanner: (banner: Banner) => void;
  onDeleteBanner: (bannerId: string) => void;
  onReorderBanners: (reordered: Banner[]) => void;
}

export const BannerSliderView: React.FC<BannerSliderViewProps> = ({
  banners,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onReorderBanners
}) => {
  const [selectedType, setSelectedType] = useState<BannerType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Slider State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideInterval, setSlideInterval] = useState(4000); // ms

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showPopupPreview, setShowPopupPreview] = useState(false);

  // Toast State
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    type: BannerType;
    category: string;
    imageUrl: string;
    badgeText: string;
    ctaText: string;
    ctaLink: string;
    status: 'Active' | 'Inactive' | 'Scheduled';
    discountTag: string;
    startDate: string;
    endDate: string;
    backgroundColor: string;
  }>({
    title: '',
    subtitle: '',
    type: 'Homepage Banner',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    badgeText: 'HOT DEAL',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    status: 'Active',
    discountTag: '30% OFF',
    startDate: '2026-07-01',
    endDate: '2026-08-31',
    backgroundColor: 'from-slate-950 via-indigo-950 to-slate-900'
  });

  const triggerToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  // Filtered & Sorted Banners
  const filteredBanners = banners
    .filter(b => {
      const matchesType = selectedType === 'All' || b.type === selectedType;
      const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (b.category && b.category.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    })
    .sort((a, b) => a.order - b.order);

  // Auto Slider Loop
  const activeSliderBanners = filteredBanners.filter(b => b.status === 'Active');

  useEffect(() => {
    if (!isPlaying || activeSliderBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSliderBanners.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, [isPlaying, activeSliderBanners.length, slideInterval]);

  const handleNextSlide = () => {
    if (activeSliderBanners.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % activeSliderBanners.length);
  };

  const handlePrevSlide = () => {
    if (activeSliderBanners.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + activeSliderBanners.length) % activeSliderBanners.length);
  };

  // Reordering Handler (Move up / Move down / Drag-Sort simulation)
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const list = [...filteredBanners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    // Swap order property
    const tempOrder = list[index].order;
    list[index].order = list[targetIndex].order;
    list[targetIndex].order = tempOrder;

    // Swap positions
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Update global list
    const updatedGlobal = banners.map(b => {
      const match = list.find(item => item.id === b.id);
      return match ? match : b;
    });

    onReorderBanners(updatedGlobal);
    triggerToast(`Banner order updated! "${list[direction === 'up' ? index : targetIndex].title}" moved ${direction}.`);
  };

  const openCreateModal = (type: BannerType = 'Homepage Banner') => {
    setEditingBanner(null);
    setFormData({
      title: 'Exclusive Summer Promo',
      subtitle: 'Unlock maximum savings across premium store catalog items.',
      type,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&auto=format&fit=crop&q=80',
      badgeText: 'LIMITED EDITION',
      ctaText: 'Claim Deals Now',
      ctaLink: '/products',
      status: 'Active',
      discountTag: '20% OFF',
      startDate: '2026-07-01',
      endDate: '2026-09-30',
      backgroundColor: 'from-slate-950 via-indigo-950 to-slate-900'
    });
    setShowModal(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      type: banner.type,
      category: banner.category || 'All',
      imageUrl: banner.imageUrl,
      badgeText: banner.badgeText || '',
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      status: banner.status,
      discountTag: banner.discountTag || '',
      startDate: banner.startDate || '2026-07-01',
      endDate: banner.endDate || '2026-12-31',
      backgroundColor: banner.backgroundColor || 'from-slate-950 via-indigo-950 to-slate-900'
    });
    setShowModal(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingBanner) {
      const updated: Banner = {
        ...editingBanner,
        title: formData.title,
        subtitle: formData.subtitle,
        type: formData.type,
        category: formData.category,
        imageUrl: formData.imageUrl,
        badgeText: formData.badgeText,
        ctaText: formData.ctaText,
        ctaLink: formData.ctaLink,
        status: formData.status,
        discountTag: formData.discountTag,
        startDate: formData.startDate,
        endDate: formData.endDate,
        backgroundColor: formData.backgroundColor
      };
      onUpdateBanner(updated);
      triggerToast(`Banner "${formData.title}" updated successfully!`);
    } else {
      const created: Banner = {
        id: `BAN-${Date.now().toString().slice(-4)}`,
        title: formData.title,
        subtitle: formData.subtitle,
        type: formData.type,
        category: formData.category,
        imageUrl: formData.imageUrl,
        badgeText: formData.badgeText,
        ctaText: formData.ctaText,
        ctaLink: formData.ctaLink,
        order: banners.length + 1,
        status: formData.status,
        discountTag: formData.discountTag,
        startDate: formData.startDate,
        endDate: formData.endDate,
        clicksCount: 0,
        impressionsCount: 0,
        backgroundColor: formData.backgroundColor
      };
      onAddBanner(created);
      triggerToast(`New banner created: "${formData.title}"!`);
    }

    setShowModal(false);
  };

  const handleDuplicate = (banner: Banner) => {
    const dup: Banner = {
      ...banner,
      id: `BAN-${Date.now().toString().slice(-4)}`,
      title: `${banner.title} (Copy)`,
      order: banners.length + 1,
      clicksCount: 0,
      impressionsCount: 0
    };
    onAddBanner(dup);
    triggerToast(`Duplicated banner "${banner.title}"`);
  };

  const handleToggleStatus = (banner: Banner) => {
    const nextStatus = banner.status === 'Active' ? 'Inactive' : 'Active';
    onUpdateBanner({ ...banner, status: nextStatus });
    triggerToast(`Banner "${banner.title}" status changed to ${nextStatus}.`);
  };

  // Preset Image Picker
  const sampleImages = [
    { name: 'Tech Audio Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80' },
    { name: 'UltraWide Monitor Display', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&auto=format&fit=crop&q=80' },
    { name: 'Fashion Apparel Storefront', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80' },
    { name: 'Shopping Promo Sale', url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80' },
    { name: 'Espresso Barista Machine', url: 'https://images.unsplash.com/photo-1517668808822-9ed02810a083?w=1200&auto=format&fit=crop&q=80' },
    { name: 'Botanical Skincare Cosmetics', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80' }
  ];

  const currentActiveSlide = activeSliderBanners[currentSlideIndex] || banners[0];

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastNotice && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Banner & Slider Management</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure Homepage Hero Sliders, Offer Banners, Category Spotlights, and Popup Overlays with drag-and-drop order control.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPopupPreview(true)}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-cyan-400" /> Preview Popup Banner
          </button>
          <button
            onClick={() => openCreateModal('Homepage Banner')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Banner
          </button>
        </div>
      </div>

      {/* TYPE FILTER TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 'All', label: 'All Banners', icon: <Layers className="w-4 h-4" />, count: banners.length },
          { id: 'Homepage Banner', label: 'Homepage Banners', icon: <Layout className="w-4 h-4" />, count: banners.filter(b => b.type === 'Homepage Banner').length },
          { id: 'Offer Banner', label: 'Offer Banners', icon: <Zap className="w-4 h-4" />, count: banners.filter(b => b.type === 'Offer Banner').length },
          { id: 'Category Banner', label: 'Category Banners', icon: <Folder className="w-4 h-4" />, count: banners.filter(b => b.type === 'Category Banner').length },
          { id: 'Popup Banner', label: 'Popup Banners', icon: <MessageSquare className="w-4 h-4" />, count: banners.filter(b => b.type === 'Popup Banner').length },
        ].map((tab) => {
          const isSelected = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedType(tab.id as any);
                setCurrentSlideIndex(0);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={isSelected ? 'text-indigo-400' : 'text-slate-500'}>{tab.icon}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </div>
              <div className="text-xs font-bold truncate">{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* LIVE STOREFRONT CAROUSEL SLIDER PREVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Live Storefront Carousel Slider ({selectedType})
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Interval:</span>
              <select
                value={slideInterval}
                onChange={(e) => setSlideInterval(Number(e.target.value))}
                className="bg-transparent text-indigo-400 font-bold focus:outline-none"
              >
                <option value={2000}>2s</option>
                <option value={4000}>4s</option>
                <option value={6000}>6s</option>
                <option value={10000}>10s</option>
              </select>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
                isPlaying
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Autoplay ON' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Banner Display Stage */}
        {activeSliderBanners.length === 0 ? (
          <div className="py-12 bg-slate-950 border border-slate-800/80 rounded-2xl text-center space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-700" />
            <p className="text-xs font-bold text-slate-400">No active banners available for live slider preview.</p>
            <p className="text-[11px] text-slate-600">Activate existing banners or create a new banner above.</p>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[320px] flex items-center group">
            {/* Background Image & Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentActiveSlide.imageUrl}
                alt={currentActiveSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${currentActiveSlide.backgroundColor || 'from-slate-950 via-slate-950/80 to-transparent'}`} />
            </div>

            {/* Banner Content Layer */}
            <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {currentActiveSlide.badgeText && (
                  <span className="px-3 py-1 bg-indigo-600 text-white font-black text-[10px] rounded-full uppercase tracking-wider shadow-md">
                    {currentActiveSlide.badgeText}
                  </span>
                )}
                {currentActiveSlide.discountTag && (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[10px] rounded-full uppercase">
                    {currentActiveSlide.discountTag}
                  </span>
                )}
                <span className="px-2.5 py-0.5 bg-slate-900/80 text-slate-400 font-mono text-[10px] rounded-full border border-slate-800">
                  {currentActiveSlide.type}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {currentActiveSlide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {currentActiveSlide.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast(`Storefront link clicked: ${currentActiveSlide.ctaLink}`);
                  }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 group/btn"
                >
                  <span>{currentActiveSlide.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-3">
                  <span className="flex items-center gap-1"><MousePointer className="w-3 h-3 text-indigo-400" /> {currentActiveSlide.clicksCount.toLocaleString()} clicks</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-cyan-400" /> {currentActiveSlide.impressionsCount.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 z-20 p-3 rounded-full bg-slate-950/70 border border-slate-800 text-white hover:bg-indigo-600 transition-all backdrop-blur-md opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 z-20 p-3 rounded-full bg-slate-950/70 border border-slate-800 text-white hover:bg-indigo-600 transition-all backdrop-blur-md opacity-80 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-800 backdrop-blur-md">
              {activeSliderBanners.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlideIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={b.title}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BANNER DIRECTORY & DRAG-AND-DROP SORT LIST */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-slate-500" />
              <span>Drag & Drop Banner Order List</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Reorder banners using move controls to change display precedence on storefront sliders and category headers.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search banners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Banners List */}
        <div className="space-y-3">
          {filteredBanners.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Sliders className="w-10 h-10 mx-auto text-slate-700 mb-2" />
              <p className="font-bold text-slate-400">No banners found matching search filters.</p>
            </div>
          ) : (
            filteredBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${
                  banner.status === 'Active'
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/30 border-slate-900 opacity-60'
                }`}
              >
                {/* Drag Handle & Order Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 text-slate-600 group-hover:text-slate-400">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:text-indigo-400 disabled:opacity-20 transition-colors"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === filteredBanners.length - 1}
                      className="p-1 hover:text-indigo-400 disabled:opacity-20 transition-colors"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 font-mono font-bold text-xs text-indigo-400 flex items-center justify-center shrink-0">
                    #{banner.order}
                  </span>

                  {/* Image Thumbnail */}
                  <div className="relative w-20 h-12 rounded-lg overflow-hidden border border-slate-800 shrink-0">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {banner.discountTag && (
                      <span className="absolute bottom-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] px-1 rounded-tl">
                        {banner.discountTag}
                      </span>
                    )}
                  </div>

                  {/* Banner Title & Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white truncate max-w-sm">{banner.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-400 border border-slate-800">
                        {banner.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-md mt-0.5">{banner.subtitle}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-mono">
                      <span>Category: <strong className="text-slate-300">{banner.category || 'All'}</strong></span>
                      <span>Link: <strong className="text-indigo-400">{banner.ctaLink}</strong></span>
                      <span>Dates: {banner.startDate} to {banner.endDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Actions & Status Switch */}
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  {/* Status Toggle */}
                  <button
                    onClick={() => handleToggleStatus(banner)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1.5 ${
                      banner.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {banner.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{banner.status}</span>
                  </button>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(banner)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Duplicate Banner"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(banner)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit Banner"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete banner "${banner.title}"?`)) {
                          onDeleteBanner(banner.id);
                          triggerToast(`Deleted banner "${banner.title}"`);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Delete Banner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* POPUP BANNER MODAL PREVIEW OVERLAY */}
      {showPopupPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setShowPopupPreview(false)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/80 rounded-full border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 text-center space-y-4">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold text-[10px] rounded-full uppercase border border-amber-500/30 inline-block">
                POPUP PROMOTION OVERLAY
              </span>
              <h3 className="text-2xl font-black text-white">Unlock 10% OFF Your First Purchase</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Join 50,000+ members receiving weekly VIP discounts, early product drops, and exclusive tech guides.
              </p>

              <div className="space-y-2 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => {
                    triggerToast('Subscriber newsletter offer code WELCOME10 claimed!');
                    setShowPopupPreview(false);
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  Claim 10% Discount Code
                </button>
              </div>

              <p className="text-[10px] text-slate-500">Unsubscribe anytime with one click. No spam guaranteed.</p>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT BANNER MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                {editingBanner ? `Edit Banner: ${editingBanner.title}` : 'Create New Banner'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 overflow-y-auto text-xs">
              {/* Type Selection */}
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Banner Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as BannerType })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-indigo-500"
                >
                  <option value="Homepage Banner">Homepage Banner (Hero Slider)</option>
                  <option value="Offer Banner">Offer Banner (Promotions & Flash Deals)</option>
                  <option value="Category Banner">Category Banner (Category Spotlights)</option>
                  <option value="Popup Banner">Popup Banner (Modal Overlay)</option>
                </select>
              </div>

              {/* Title & Subtitle */}
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Banner Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Gen Productivity Tech Sale"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Subtitle / Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description line..."
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Badges & Discount Tag */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Badge Text (e.g. HOT DEAL)</label>
                  <input
                    type="text"
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Discount Tag (e.g. 30% OFF)</label>
                  <input
                    type="text"
                    value={formData.discountTag}
                    onChange={(e) => setFormData({ ...formData, discountTag: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Image URL & Sample Picker */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-bold uppercase text-[10px]">Background Image URL</label>
                  <span className="text-[10px] text-slate-500">Pick sample below or paste link</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
                
                <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1 custom-scrollbar">
                  {sampleImages.map((s, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormData({ ...formData, imageUrl: s.url })}
                      className="w-12 h-12 rounded-lg border border-slate-700 overflow-hidden shrink-0 hover:border-indigo-500 transition-all"
                      title={s.name}
                    >
                      <img src={s.url} alt={s.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Text & Link */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    required
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">CTA Link Route</label>
                  <input
                    type="text"
                    required
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Schedule Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Publish Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Active">Active (Live in slider)</option>
                  <option value="Inactive">Inactive (Disabled)</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  {editingBanner ? 'Save Changes' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
