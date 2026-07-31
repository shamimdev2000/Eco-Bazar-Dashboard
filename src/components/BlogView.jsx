import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Folder, 
  MessageSquare, 
  Globe, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  X, 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  BarChart2, 
  Tag, 
  HelpCircle
} from 'lucide-react';

export const BlogView = ({
  articles,
  categories,
  comments,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  onAddCategory,
  onApproveComment,
  onDeleteComment
}) => {
  const [activeTab, setActiveTab] = useState('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Article Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);

  // Form State for Article Creation/Editing
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.name || 'Tech & Electronics');
  const [formAuthor, setFormAuthor] = useState('Apex Editorial');
  const [formStatus, setFormStatus] = useState('Published');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDescription, setFormSeoDescription] = useState('');
  const [formSeoKeywords, setFormSeoKeywords] = useState('');

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openNewArticleModal = () => {
    setEditingArticle(null);
    setFormTitle('');
    setFormCategory(categories[0]?.name || 'Tech & Electronics');
    setFormAuthor('Apex Editorial Team');
    setFormStatus('Published');
    setFormImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80');
    setFormExcerpt('');
    setFormContent('');
    setFormSeoTitle('');
    setFormSeoDescription('');
    setFormSeoKeywords('');
    setIsArticleModalOpen(true);
  };

  const openEditArticleModal = (art) => {
    setEditingArticle(art);
    setFormTitle(art.title);
    setFormCategory(art.category);
    setFormAuthor(art.author);
    setFormStatus(art.status);
    setFormImageUrl(art.imageUrl || '');
    setFormExcerpt(art.excerpt || '');
    setFormContent(art.content || '');
    setFormSeoTitle(art.seoTitle || '');
    setFormSeoDescription(art.seoDescription || '');
    setFormSeoKeywords(art.seoKeywords || '');
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const slug = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const today = new Date().toISOString().split('T')[0];

    if (editingArticle) {
      const updated = {
        ...editingArticle,
        title: formTitle,
        slug,
        category: formCategory,
        author: formAuthor,
        status: formStatus,
        imageUrl: formImageUrl,
        excerpt: formExcerpt,
        content: formContent,
        seoTitle: formSeoTitle || formTitle,
        seoDescription: formSeoDescription || formExcerpt,
        seoKeywords: formSeoKeywords
      };
      onUpdateArticle(updated);
      triggerToast(`Updated blog article "${formTitle}"`);
    } else {
      const newArticle = {
        id: `BLOG-${Date.now()}`,
        title: formTitle,
        slug,
        category: formCategory,
        author: formAuthor,
        publishedDate: today,
        views: 0,
        status: formStatus,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        excerpt: formExcerpt,
        content: formContent,
        readTime: `${Math.max(3, Math.ceil((formContent.length || 300) / 400))} min read`,
        seoTitle: formSeoTitle || `${formTitle} | Apex Blog`,
        seoDescription: formSeoDescription || formExcerpt,
        seoKeywords: formSeoKeywords
      };
      onAddArticle(newArticle);
      triggerToast(`Published new blog article "${formTitle}"!`);
    }

    setIsArticleModalOpen(false);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const newCat = {
      id: `CAT-B${Date.now()}`,
      name: catName,
      slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      articleCount: 0,
      description: catDesc || 'Articles and insights'
    };
    onAddCategory(newCat);
    triggerToast(`Created new category "${catName}"`);
    setCatName('');
    setCatDesc('');
    setIsCategoryModalOpen(false);
  };

  const handleDelete = (art) => {
    if (confirm(`Delete blog post "${art.title}" permanently?`)) {
      onDeleteArticle(art.id);
      triggerToast(`Deleted blog article`);
    }
  };

  // Filtered Articles
  const filteredArticles = articles.filter(a => {
    const matchesCat = selectedCategoryFilter === 'All' || a.category === selectedCategoryFilter;
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Bar Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Blog & Content Management</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Publish articles, organize blog categories, moderate reader comments, and optimize search engine SEO metadata.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openNewArticleModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </button>
      </div>

      {/* TABS NAVIGATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'articles', label: 'Blog Posts', icon: <FileText className="w-4 h-4" />, count: articles.length },
            { id: 'categories', label: 'Categories', icon: <Folder className="w-4 h-4" />, count: categories.length },
            { id: 'comments', label: 'Reader Comments', icon: <MessageSquare className="w-4 h-4" />, count: comments.length },
            { id: 'seo', label: 'SEO & SERP Preview', icon: <Globe className="w-4 h-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ARTICLES LIST */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search articles by title, author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-semibold">Category:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((art) => (
              <div key={art.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all flex flex-col justify-between group shadow-sm">
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={art.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                      {art.category}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        art.status === 'Published'
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-amber-500/90 text-slate-950'
                      }`}>
                        {art.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span>{art.publishedDate}</span>
                      <span>•</span>
                      <span>{art.readTime || '5 min read'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Eye className="w-3 h-3 text-indigo-400" /> {art.views.toLocaleString()} views
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {art.title}
                    </h3>

                    {art.excerpt && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">By {art.author}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditArticleModal(art)}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
                      title="Edit Article & SEO"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(art)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BLOG CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div>
              <h2 className="text-base font-bold text-white">Blog Categories</h2>
              <p className="text-xs text-slate-400 mt-0.5">Organize articles under distinct content hubs.</p>
            </div>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Folder className="w-4 h-4 text-indigo-400" />
                    {cat.name}
                  </h3>
                  <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold font-mono">
                    {articles.filter(a => a.category === cat.name).length} articles
                  </span>
                </div>
                <p className="text-xs text-slate-400">{cat.description}</p>
                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  URL Slug: /blog/category/{cat.slug}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: READER COMMENTS */}
      {activeTab === 'comments' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-base font-bold text-white">Reader Comments & Discussion</h2>
            <p className="text-xs text-slate-400 mt-0.5">Approve constructive reader feedback or remove spam entries.</p>
          </div>

          <div className="space-y-3">
            {comments.map((cmt) => (
              <div key={cmt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-bold text-white text-xs">{cmt.authorName}</span>
                    <span className="text-[10px] text-slate-500 font-mono ml-2">({cmt.authorEmail})</span>
                    <div className="text-[11px] text-indigo-400 font-semibold mt-0.5">
                      On article: "{cmt.articleTitle}"
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      cmt.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {cmt.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{cmt.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {cmt.content}
                </p>

                <div className="flex items-center justify-end gap-2 pt-1">
                  {cmt.status !== 'Approved' && (
                    <button
                      onClick={() => {
                        onApproveComment(cmt.id);
                        triggerToast(`Approved comment by ${cmt.authorName}`);
                      }}
                      className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-600/30 transition-all flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDeleteComment(cmt.id);
                      triggerToast(`Deleted comment`);
                    }}
                    className="px-3 py-1.5 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold hover:bg-rose-600/30 transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEO & SERP PREVIEW */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Globe className="w-5 h-5" />
              <h2 className="text-base font-bold text-white">Google Search SERP Snippet Live Preview</h2>
            </div>
            <p className="text-xs text-slate-400">
              How your articles appear on Google Search results pages. Ensure your SEO Title is under 60 characters and Meta Description is under 160 characters.
            </p>

            {/* Google Result Card Mockup */}
            <div className="bg-white p-5 rounded-2xl space-y-1 font-sans text-slate-900 shadow-xl max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-bold text-slate-800">Apex Store Blog</span>
                <span>›</span>
                <span className="text-slate-500 font-mono">https://apexstore.io/blog/{articles[0]?.slug || 'sample-post'}</span>
              </div>
              <h3 className="text-lg font-medium text-blue-700 hover:underline cursor-pointer leading-snug">
                {articles[0]?.seoTitle || articles[0]?.title || 'Apex Store Blog - High Performance Articles'}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {articles[0]?.seoDescription || articles[0]?.excerpt || 'Read expert reviews, buying guides, and technical breakdowns on noise cancellation, ergonomics, and smart home appliances.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> XML Sitemap Status
              </div>
              <div className="text-xs text-white font-mono">/sitemap-blog.xml</div>
              <p className="text-[11px] text-slate-400">Auto-generated and pinged to Googlebot daily.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" /> Canonical URLs
              </div>
              <div className="text-xs text-white font-mono">Self-referencing &lt;link rel="canonical"&gt;</div>
              <p className="text-[11px] text-slate-400">Prevents duplicate content issues on search engines.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" /> OpenGraph Social Cards
              </div>
              <div className="text-xs text-white font-mono">og:image & og:title tags ready</div>
              <p className="text-[11px] text-slate-400">Rich previews when shared on X, LinkedIn, or Facebook.</p>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                {editingArticle ? 'Edit Blog Article' : 'Create New Blog Post'}
              </h3>
              <button onClick={() => setIsArticleModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., The Ultimate Guide to Active Noise Cancellation in 2026"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Author</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none font-bold"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Featured Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary appearing on blog listing cards..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Article Content (Markdown/HTML)</label>
                <textarea
                  rows={6}
                  placeholder="Write post content here..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none leading-relaxed font-sans"
                />
              </div>

              {/* SEO SETTINGS SECTION */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> SEO Search Engine Meta
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1 font-mono">SEO Title Tag</label>
                    <input
                      type="text"
                      placeholder="Custom title tag for Google search"
                      value={formSeoTitle}
                      onChange={(e) => setFormSeoTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1 font-mono">Focus Keywords</label>
                    <input
                      type="text"
                      placeholder="e.g., ANC headphones, noise cancellation"
                      value={formSeoKeywords}
                      onChange={(e) => setFormSeoKeywords(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1 font-mono">Meta Description</label>
                  <input
                    type="text"
                    placeholder="Short meta description for search snippets"
                    value={formSeoDescription}
                    onChange={(e) => setFormSeoDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  {editingArticle ? 'Save Changes' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Folder className="w-4 h-4 text-indigo-400" /> Create Blog Category
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Audio & Studio Gear"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of articles in this hub..."
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
