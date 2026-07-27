import React, { useState } from 'react';
import { ProductReview } from '../types';
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  CornerUpLeft, 
  Trash2, 
  Star, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  X, 
  Clock, 
  ThumbsUp, 
  UserCheck, 
  AlertCircle
} from 'lucide-react';

interface ProductReviewsViewProps {
  reviews: ProductReview[];
  onApproveReview: (reviewId: string) => void;
  onRejectReview: (reviewId: string) => void;
  onReplyReview: (reviewId: string, replyText: string) => void;
  onDeleteReview: (reviewId: string) => void;
}

export const ProductReviewsView: React.FC<ProductReviewsViewProps> = ({
  reviews,
  onApproveReview,
  onRejectReview,
  onReplyReview,
  onDeleteReview
}) => {
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [ratingFilter, setRatingFilter] = useState<number | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Reply Modal State
  const [replyModalReview, setReplyModalReview] = useState<ProductReview | null>(null);
  const [replyText, setReplyText] = useState('');

  // Toast Notice State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Reviews
  const filteredReviews = reviews.filter(r => {
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
    const matchesRating = ratingFilter === 'All' || r.rating === ratingFilter;
    const matchesSearch = r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesRating && matchesSearch;
  });

  const pendingCount = reviews.filter(r => r.status === 'Pending').length;
  const approvedCount = reviews.filter(r => r.status === 'Approved').length;
  const rejectedCount = reviews.filter(r => r.status === 'Rejected').length;

  const handleApprove = (review: ProductReview) => {
    onApproveReview(review.id);
    triggerToast(`Approved review by ${review.customerName} for ${review.productName}`);
  };

  const handleReject = (review: ProductReview) => {
    onRejectReview(review.id);
    triggerToast(`Rejected review by ${review.customerName}`);
  };

  const handleDelete = (review: ProductReview) => {
    if (confirm(`Are you sure you want to delete this review by ${review.customerName}?`)) {
      onDeleteReview(review.id);
      triggerToast(`Deleted review #${review.id}`);
    }
  };

  const openReplyModal = (review: ProductReview) => {
    setReplyModalReview(review);
    setReplyText(review.adminReply?.text || '');
  };

  const submitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModalReview || !replyText.trim()) return;

    onReplyReview(replyModalReview.id, replyText.trim());
    triggerToast(`Sent official reply to ${replyModalReview.customerName}'s review!`);
    setReplyModalReview(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Product Reviews & Customer Feedback</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Moderate customer ratings, approve legitimate reviews, reject spam, and post official merchant replies.
          </p>
        </div>

        {/* Quick Stat Pill Badges */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{pendingCount} Pending</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{approvedCount} Approved</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS & TABS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'All', label: 'All Reviews', count: reviews.length },
              { id: 'Pending', label: 'Pending Moderation', count: pendingCount, color: 'text-amber-400' },
              { id: 'Approved', label: 'Approved', count: approvedCount, color: 'text-emerald-400' },
              { id: 'Rejected', label: 'Rejected', count: rejectedCount, color: 'text-rose-400' },
            ].map((tab) => {
              const isSelected = selectedStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Rating Selector */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Rating Filter */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
              >
                <option value="All">All Ratings</option>
                <option value={5}>5 Stars Only</option>
                <option value={4}>4 Stars Only</option>
                <option value={3}>3 Stars & Below</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search reviews by product, customer, text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS CARD LIST */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <MessageSquare className="w-12 h-12 mx-auto text-slate-700" />
            <p className="text-sm font-bold text-slate-400">No product reviews match the selected filters.</p>
            <p className="text-xs text-slate-600">Try adjusting your search keywords or status tab selection.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`bg-slate-900 border rounded-2xl p-6 transition-all space-y-4 ${
                review.status === 'Pending'
                  ? 'border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : review.status === 'Approved'
                  ? 'border-slate-800 hover:border-slate-700'
                  : 'border-rose-900/50 opacity-60'
              }`}
            >
              {/* Top Row: Product Info & Review Status Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white hover:text-indigo-400 transition-colors">
                      {review.productName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-mono">
                      <span>ID: {review.id}</span>
                      <span>•</span>
                      <span>Product SKU: {review.productId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    review.status === 'Approved'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : review.status === 'Pending'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {review.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {review.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                    {review.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                    <span>{review.status}</span>
                  </span>
                </div>
              </div>

              {/* Review Body */}
              <div className="space-y-3">
                {/* Author Info & Rating */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-indigo-400 overflow-hidden">
                      {review.customerAvatar ? (
                        <img src={review.customerAvatar} alt={review.customerName} className="w-full h-full object-cover" />
                      ) : (
                        review.customerName.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{review.customerName}</span>
                        {review.verifiedPurchase && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            <UserCheck className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{review.customerEmail}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400 font-mono">{review.date}</span>
                  </div>
                </div>

                {/* Review Title & Comment */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200">{review.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{review.comment}</p>
                </div>

                {/* Official Merchant Reply Block */}
                {review.adminReply && (
                  <div className="ml-4 pl-4 border-l-2 border-indigo-500 bg-indigo-950/20 p-3.5 rounded-r-xl border-y border-r border-indigo-500/20 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        Official Store Response ({review.adminReply.repliedBy})
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">{review.adminReply.repliedAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">{review.adminReply.text}</p>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS BAR: APPROVE, REJECT, REPLY, DELETE */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  {/* Approve Button */}
                  <button
                    onClick={() => handleApprove(review)}
                    disabled={review.status === 'Approved'}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Approve and publish review to storefront"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => handleReject(review)}
                    disabled={review.status === 'Rejected'}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600/15 hover:bg-rose-600/25 text-rose-400 border border-rose-500/30 transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Reject review"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>

                  {/* Reply Button */}
                  <button
                    onClick={() => openReplyModal(review)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 border border-indigo-500/30 transition-all flex items-center gap-1.5"
                    title="Write official store reply"
                  >
                    <CornerUpLeft className="w-3.5 h-3.5" /> Reply
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(review)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1 text-xs font-bold"
                  title="Delete Review permanently"
                >
                  <Trash2 className="w-4 h-4 text-rose-500" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* OFFICIAL REPLY MODAL */}
      {replyModalReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CornerUpLeft className="w-5 h-5 text-indigo-400" />
                Reply to {replyModalReview.customerName}
              </h3>
              <button
                onClick={() => setReplyModalReview(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitReply} className="p-6 space-y-4 text-xs">
              {/* Original Review Snippet */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-400 space-y-1">
                <div className="font-bold text-slate-300">{replyModalReview.title}</div>
                <p className="line-clamp-2 italic text-[11px]">{replyModalReview.comment}</p>
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase text-[10px] block mb-1">
                  Official Merchant Reply Text
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Thank the customer or address their issue professionally..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReplyModalReview(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Post Official Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
