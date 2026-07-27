import React, { useState } from 'react';
import { OrderItem } from '../types';
import { 
  X, 
  User, 
  MapPin, 
  CreditCard, 
  Calendar, 
  PackageCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCw,
  Mail,
  Phone,
  Truck,
  Printer,
  Download,
  FileText,
  Activity,
  Check,
  Building2,
  ExternalLink
} from 'lucide-react';

interface OrderDetailModalProps {
  order: OrderItem | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderItem['status']) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'invoice'>('details');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!order) return null;

  const phone = order.customerPhone || '+1 (555) 019-2831';
  const carrier = order.shippingCarrier || 'FedEx Priority Air';
  const tracking = order.trackingNumber || `TRK-${order.id.replace('ORD-', '')}-99`;
  const lineItems = order.lineItems && order.lineItems.length > 0 ? order.lineItems : [
    { id: 'li-default-1', name: order.productsSummary, sku: 'SKU-ITEM-001', quantity: order.itemsCount || 1, unitPrice: order.amount, totalPrice: order.amount }
  ];

  const defaultTimeline = [
    { status: 'Order Placed', date: order.date, description: 'Order created & verified in system', completed: true },
    { status: 'Payment Confirmed', date: order.date, description: `Payment processed via ${order.paymentMethod}`, completed: true },
    { status: 'Processing & Picked', date: 'Jul 27, 2026', description: 'Packed at distribution hub', completed: order.status !== 'Pending' },
    { status: 'Shipped', date: order.status === 'Delivered' || order.status === 'Shipped' ? 'Jul 27, 2026' : 'Pending', description: `In transit via ${carrier} (#${tracking})`, completed: order.status === 'Delivered' || order.status === 'Shipped' },
    { status: 'Delivered', date: order.status === 'Delivered' ? 'Jul 27, 2026' : 'Pending', description: 'Package handed over to recipient', completed: order.status === 'Delivered' }
  ];

  const timelineSteps = order.timeline && order.timeline.length > 0 ? order.timeline : defaultTimeline;

  const getStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} /> Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Truck className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Generate text/HTML blob or trigger formatted print window for instant PDF download
    const invoiceContent = `
INVOICE #${order.id}
=======================================
Date: ${order.date}
Customer: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${phone}
Shipping Address: ${order.shippingAddress}
Carrier: ${carrier} (Tracking: ${tracking})
Payment Method: ${order.paymentMethod}
Status: ${order.status}

LINE ITEMS:
---------------------------------------
${lineItems.map(item => `${item.name} (${item.sku}) - Qty: ${item.quantity} x $${item.unitPrice.toFixed(2)} = $${item.totalPrice.toFixed(2)}`).join('\n')}

TOTAL CHARGED: $${order.amount.toFixed(2)}
=======================================
Thank you for your business!
    `.trim();

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${order.id}_${order.customerName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Invoice document for ${order.id} downloaded successfully!`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-extrabold text-white font-mono">{order.id}</h3>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Placed on {order.date}
            </p>
          </div>

          {/* Action Tabs Header */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'details' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Summary
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Timeline
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'invoice' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Printer className="w-3.5 h-3.5" /> Invoice
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-5 py-2 text-xs font-bold text-emerald-400 flex items-center justify-between">
            <span>{downloadNotice}</span>
            <button onClick={() => setDownloadNotice(null)} className="hover:underline">Dismiss</button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* TAB 1: ORDER DETAILS & SUMMARY */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Customer & Phone Card */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-400" /> Customer Contact Information
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold overflow-hidden border border-slate-600 shrink-0">
                      {order.customerAvatar ? (
                        <img src={order.customerAvatar} alt={order.customerName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        order.customerName.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">{order.customerName}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" /> {order.customerEmail}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2 flex items-center gap-2 self-start sm:self-auto">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Phone Contact</div>
                      <div className="text-xs font-mono font-bold text-white">{phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shipping Card */}
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-cyan-400" /> Shipping & Delivery
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {order.shippingAddress}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs flex items-center justify-between text-slate-400">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>{carrier}</span>
                    </div>
                    <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      #{tracking}
                    </span>
                  </div>
                </div>

                {/* Payment Card */}
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-400" /> Payment Details
                    </h4>
                    <p className="text-xs text-slate-200 font-semibold">
                      {order.paymentMethod}
                    </p>
                    <p className="text-[11px] text-emerald-400 font-medium mt-1">
                      Status: Paid & Verified
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs flex items-center justify-between text-slate-300">
                    <span>Total Paid:</span>
                    <span className="font-extrabold text-white text-base">${order.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Itemized Line Items Table */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-purple-400" /> Purchased Items Breakdown ({order.itemsCount} items)
                </h4>

                <div className="overflow-x-auto rounded-lg border border-slate-700/80">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Item</th>
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                      {lineItems.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2.5 px-3 font-semibold text-white">{item.name}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{item.sku}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-200">{item.quantity}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-300">${item.unitPrice.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-400">${item.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex flex-col items-end text-xs space-y-1 text-slate-400">
                  <div className="flex justify-between w-48">
                    <span>Subtotal:</span>
                    <span className="font-mono text-slate-200">${(order.amount * 0.92).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-48">
                    <span>Tax (8%):</span>
                    <span className="font-mono text-slate-200">${(order.amount * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-48 pt-2 border-t border-slate-700 font-bold text-sm text-white">
                    <span>Total Amount:</span>
                    <span className="font-mono text-indigo-400">${order.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Quick Bar */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Update Fulfillment Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderItem['status'][]).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(order.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        order.status === st
                          ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      Mark {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-400" /> Fulfillment Timeline & Logs
                    </h4>
                    <p className="text-xs text-slate-400">Sequential milestone tracking for order {order.id}</p>
                  </div>
                  <div className="text-xs font-mono bg-slate-800 px-3 py-1 rounded border border-slate-700 text-slate-300">
                    Carrier: <span className="text-indigo-400 font-bold">{carrier}</span>
                  </div>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                  {timelineSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 group">
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                        step.completed
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm shadow-emerald-500/20'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}>
                        {step.completed ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                      </div>

                      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 w-full">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-bold text-xs ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                            {step.status}
                          </h5>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                            {step.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVOICE & PRINT PDF */}
          {activeTab === 'invoice' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Printer className="w-4 h-4 text-indigo-400" /> Printable Store Invoice
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintInvoice}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Invoice
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-all border border-slate-600"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              </div>

              {/* Invoice Printable View Container */}
              <div className="bg-white text-slate-900 rounded-xl p-6 shadow-xl border border-slate-200 font-sans text-xs">
                {/* Store Header */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-indigo-600" />
                      <span className="text-xl font-black tracking-tight text-slate-900">NEXUS E-COMMERCE</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-1">100 Innovation Boulevard, Tech Plaza #400</p>
                    <p className="text-slate-500 text-[11px]">San Francisco, CA 94107 • support@nexustech.io</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-black text-indigo-600">INVOICE</h2>
                    <p className="font-mono font-bold text-slate-800 text-sm mt-1">#{order.id}</p>
                    <p className="text-slate-500 text-[11px]">Date: {order.date}</p>
                    <p className="text-slate-500 text-[11px]">Payment: <span className="font-bold text-slate-700">{order.paymentMethod}</span></p>
                  </div>
                </div>

                {/* Billed To / Shipped To Grid */}
                <div className="grid grid-cols-2 gap-6 my-5 py-3 border-b border-slate-200">
                  <div>
                    <h5 className="font-bold uppercase text-[10px] tracking-wider text-slate-400 mb-1">Billed To</h5>
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-slate-600">{order.customerEmail}</p>
                    <p className="text-slate-600 font-mono">{phone}</p>
                  </div>
                  <div>
                    <h5 className="font-bold uppercase text-[10px] tracking-wider text-slate-400 mb-1">Shipped To</h5>
                    <p className="font-medium text-slate-800 leading-relaxed">{order.shippingAddress}</p>
                    <p className="text-slate-500 text-[11px] mt-1 font-semibold">
                      Carrier: {carrier} | Tracking: {tracking}
                    </p>
                  </div>
                </div>

                {/* Invoice Table */}
                <table className="w-full text-left my-4">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-500 uppercase text-[10px] font-bold">
                      <th className="py-2">Item Description</th>
                      <th className="py-2">SKU</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Unit Price</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {lineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 font-bold text-slate-900">{item.name}</td>
                        <td className="py-2.5 font-mono text-slate-500 text-[11px]">{item.sku}</td>
                        <td className="py-2.5 text-center font-semibold">{item.quantity}</td>
                        <td className="py-2.5 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-2.5 text-right font-mono font-bold">${item.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals Section */}
                <div className="flex justify-end pt-3 border-t border-slate-300">
                  <div className="w-56 space-y-1.5 text-right">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-mono">${(order.amount * 0.92).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Sales Tax (8%):</span>
                      <span className="font-mono">${(order.amount * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping:</span>
                      <span className="font-mono text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-300">
                      <span>Total Paid:</span>
                      <span className="font-mono text-indigo-600">${order.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Invoice Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200 text-center text-slate-400 text-[10px]">
                  <p>Thank you for shopping with Nexus E-Commerce. For inquiries, contact billing@nexustech.io</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintInvoice}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" /> Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> PDF
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

