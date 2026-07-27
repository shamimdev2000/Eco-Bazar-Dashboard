import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw, 
  Plus, 
  Minus, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Layers,
  ArrowUpDown,
  BellRing,
  History,
  Edit3,
  Check,
  RotateCcw,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onUpdateStock: (id: string, newStock: number) => void;
  viewId?: string;
}

export interface StockHistoryRecord {
  id: string;
  timestamp: string;
  productName: string;
  sku: string;
  previousStock: number;
  newStock: number;
  changeDelta: number;
  reason: string;
  performedBy: string;
  notes?: string;
}

const INITIAL_STOCK_HISTORY: StockHistoryRecord[] = [
  {
    id: 'sh-101',
    timestamp: '2026-07-27 11:30 AM',
    productName: 'Wireless ANC Headphones Pro',
    sku: 'PRD-HEAD-001',
    previousStock: 20,
    newStock: 45,
    changeDelta: 25,
    reason: 'Supplier Restock',
    performedBy: 'Admin Operations',
    notes: 'Inbound PO Shipment #SHP-9921 received and verified'
  },
  {
    id: 'sh-102',
    timestamp: '2026-07-27 10:15 AM',
    productName: 'Smart Fitness Watch Series 5',
    sku: 'PRD-WAT-002',
    previousStock: 9,
    newStock: 8,
    changeDelta: -1,
    reason: 'Customer Order #ORD-8821',
    performedBy: 'System Auto-Sync',
    notes: 'Automatic stock decrement on order placement'
  },
  {
    id: 'sh-103',
    timestamp: '2026-07-26 04:45 PM',
    productName: 'Minimalist Mechanical Keyboard',
    sku: 'PRD-KEY-003',
    previousStock: 15,
    newStock: 12,
    changeDelta: -3,
    reason: 'Damaged / Written Off',
    performedBy: 'Warehouse Manager',
    notes: 'Packaging damaged during warehouse transport'
  },
  {
    id: 'sh-104',
    timestamp: '2026-07-26 02:10 PM',
    productName: 'Ultra-Slim Power Bank 20000mAh',
    sku: 'PRD-PWR-004',
    previousStock: 0,
    newStock: 100,
    changeDelta: 100,
    reason: 'Bulk Restock',
    performedBy: 'Admin Operations',
    notes: 'Emergency restock for Flash Sale campaign'
  },
  {
    id: 'sh-105',
    timestamp: '2026-07-25 09:20 AM',
    productName: 'Ergonomic Office Chair',
    sku: 'PRD-CHR-005',
    previousStock: 4,
    newStock: 5,
    changeDelta: 1,
    reason: 'Customer Return',
    performedBy: 'Quality Audit Team',
    notes: 'Item inspected, like new, re-added to sellable stock'
  }
];

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  onUpdateStock,
  viewId
}) => {
  const [activeTab, setActiveTab] = useState<'stock' | 'low-stock' | 'out-of-stock' | 'history' | 'adjustment'>('stock');

  React.useEffect(() => {
    if (viewId === 'inventory-low') setActiveTab('low-stock');
    else if (viewId === 'inventory-out') setActiveTab('out-of-stock');
    else if (viewId === 'inventory-history') setActiveTab('history');
    else if (viewId === 'inventory-adjustment') setActiveTab('adjustment');
    else if (viewId === 'inventory-stock' || viewId === 'inventory') setActiveTab('stock');
  }, [viewId]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Quick inline edit state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  // Stock History log
  const [historyLog, setHistoryLog] = useState<StockHistoryRecord[]>(INITIAL_STOCK_HISTORY);

  // Stock Adjustment Form State
  const [adjProductId, setAdjProductId] = useState<string>(inventory[0]?.id || '');
  const [adjType, setAdjType] = useState<'add' | 'subtract' | 'set'>('add');
  const [adjAmount, setAdjAmount] = useState<number>(10);
  const [adjReason, setAdjReason] = useState<string>('Supplier Restock');
  const [adjNotes, setAdjNotes] = useState<string>('');
  const [adjSuccessMsg, setAdjSuccessMsg] = useState<string | null>(null);

  // High level inventory calculations
  const lowStockThreshold = 10;
  const lowStockItems = inventory.filter(item => item.stock > 0 && item.stock < lowStockThreshold);
  const outOfStockItems = inventory.filter(item => item.stock === 0);
  const totalInStockUnits = inventory.reduce((acc, curr) => acc + curr.stock, 0);
  const totalValuation = inventory.reduce((acc, curr) => acc + (curr.stock * curr.price), 0);
  
  // Average Inventory Turnover Rate
  const avgTurnoverRate = (
    inventory.reduce((acc, curr) => acc + curr.turnoverRate, 0) / (inventory.length || 1)
  ).toFixed(1);

  // Categories list
  const categories = ['All', ...Array.from(new Set(inventory.map(i => i.category)))];

  // Helper to log a stock change
  const logStockChange = (
    product: InventoryItem, 
    prevStock: number, 
    newStock: number, 
    reason: string, 
    notes?: string
  ) => {
    const delta = newStock - prevStock;
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    const newRecord: StockHistoryRecord = {
      id: `sh-${Date.now()}`,
      timestamp: timeStr,
      productName: product.name,
      sku: product.sku,
      previousStock: prevStock,
      newStock: newStock,
      changeDelta: delta,
      reason: reason,
      performedBy: 'Admin Operations',
      notes: notes || `Stock updated from ${prevStock} to ${newStock}`
    };

    setHistoryLog(prev => [newRecord, ...prev]);
  };

  // Quick adjustment handlers (+1 / -1 / batch reorder)
  const handleStockAdjustment = (id: string, delta: number, reason: string = 'Manual Adjustment') => {
    const target = inventory.find(i => i.id === id);
    if (!target) return;
    const prevStock = target.stock;
    const updated = Math.max(0, target.stock + delta);
    onUpdateStock(id, updated);
    logStockChange(target, prevStock, updated, reason);
  };

  const handleQuickReorder = (item: InventoryItem, reorderQty: number) => {
    const prevStock = item.stock;
    const newStock = prevStock + reorderQty;
    onUpdateStock(item.id, newStock);
    logStockChange(item, prevStock, newStock, 'Emergency Reorder', `Quick reorder of +${reorderQty} units placed`);
    alert(`Successfully reordered +${reorderQty} units for "${item.name}". New Stock: ${newStock}`);
  };

  const saveManualStockEdit = (id: string) => {
    const target = inventory.find(i => i.id === id);
    if (!target) return;
    const prevStock = target.stock;
    const newStock = Math.max(0, tempStockValue);
    onUpdateStock(id, newStock);
    logStockChange(target, prevStock, newStock, 'Manual Audit Edit');
    setEditingItemId(null);
  };

  // Dedicated Stock Adjustment Form Submit
  const handlePerformAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const target = inventory.find(i => i.id === adjProductId);
    if (!target) {
      alert('Please select a valid product.');
      return;
    }

    const prevStock = target.stock;
    let newStock = prevStock;

    if (adjType === 'add') {
      newStock = prevStock + Math.abs(adjAmount);
    } else if (adjType === 'subtract') {
      newStock = Math.max(0, prevStock - Math.abs(adjAmount));
    } else if (adjType === 'set') {
      newStock = Math.max(0, adjAmount);
    }

    onUpdateStock(target.id, newStock);
    logStockChange(target, prevStock, newStock, adjReason, adjNotes || `Adjusted stock (${adjType.toUpperCase()})`);

    setAdjSuccessMsg(`Successfully updated "${target.name}". Stock changed from ${prevStock} to ${newStock}.`);
    setTimeout(() => setAdjSuccessMsg(null), 5000);
  };

  // Filtered inventory list depending on tab or filter
  const getDisplayInventory = () => {
    return inventory.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesTab = true;
      if (activeTab === 'low-stock') matchesTab = item.stock > 0 && item.stock < lowStockThreshold;
      if (activeTab === 'out-of-stock') matchesTab = item.stock === 0;

      return matchesCategory && matchesSearch && matchesTab;
    });
  };

  const filteredInventory = getDisplayInventory();

  const categoryTurnoverData = categories.filter(c => c !== 'All').map(cat => {
    const catItems = inventory.filter(i => i.category === cat);
    const avgTurn = catItems.reduce((acc, curr) => acc + curr.turnoverRate, 0) / (catItems.length || 1);
    return {
      category: cat,
      turnoverRate: Number(avgTurn.toFixed(1)),
      itemCount: catItems.length
    };
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Package className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Real-Time Inventory Tracking</h1>
          </div>
          <p className="text-sm text-slate-400">
            Monitor stock levels, manage low/out-of-stock alerts, track audit history, and perform stock adjustments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('adjustment')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Stock Adjustment Tool
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('stock')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'stock'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Stock Overview</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-950/60 font-mono">
            {inventory.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('low-stock')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'low-stock'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Low Stock</span>
          {lowStockItems.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {lowStockItems.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('out-of-stock')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'out-of-stock'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Out of Stock</span>
          {outOfStockItems.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              {outOfStockItems.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Stock History Log</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-950/60 font-mono">
            {historyLog.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('adjustment')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'adjustment'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Stock Adjustment</span>
        </button>
      </div>

      {/* KPI Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Units Stocked */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Stock Units</span>
            <Package className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1 font-mono">
            {totalInStockUnits.toLocaleString()} <span className="text-xs text-slate-400 font-normal font-sans">units</span>
          </div>
          <div className="text-xs text-slate-400">
            Across {inventory.length} active catalog products
          </div>
        </div>

        {/* Low Stock Flagged Items */}
        <div 
          onClick={() => setActiveTab('low-stock')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all rounded-2xl p-5 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock (&lt;10 Units)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 mb-1 font-mono">
            {lowStockItems.length} <span className="text-xs text-slate-400 font-normal font-sans">items</span>
          </div>
          <div className="text-xs text-amber-400/80">
            {outOfStockItems.length} items out of stock
          </div>
        </div>

        {/* Inventory Turnover Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Turnover Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1 font-mono">
            {avgTurnoverRate}x <span className="text-xs text-slate-400 font-normal font-sans">/ year</span>
          </div>
          <div className="text-xs text-emerald-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Optimal velocity benchmark
          </div>
        </div>

        {/* Total Inventory Valuation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inventory Value</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1 font-mono">
            ${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-400">
            Total retail value in warehouse
          </div>
        </div>
      </div>

      {/* TAB CONTENT 1: STOCK ADJUSTMENT WORKBENCH */}
      {activeTab === 'adjustment' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-4xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Stock Adjustment Workbench</h2>
              <p className="text-xs text-slate-400">
                Perform manual inventory corrections, record supplier restocks, log damaged inventory, or update stock counts.
              </p>
            </div>
          </div>

          {adjSuccessMsg && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{adjSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handlePerformAdjustment} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Target Product <span className="text-rose-400">*</span>
                </label>
                <select
                  value={adjProductId}
                  onChange={(e) => setAdjProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                >
                  {inventory.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (SKU: {p.sku}) — Current Stock: {p.stock} units
                    </option>
                  ))}
                </select>
              </div>

              {/* Adjustment Mode */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Adjustment Type <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjType('add')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      adjType === 'add'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    + Add Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjType('subtract')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      adjType === 'subtract'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    - Reduce Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjType('set')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      adjType === 'set'
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    = Set Quantity
                  </button>
                </div>
              </div>

              {/* Adjustment Quantity */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Quantity ({adjType === 'add' ? 'Units to Add' : adjType === 'subtract' ? 'Units to Deduct' : 'Target Stock Level'}) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={adjAmount}
                  onChange={(e) => setAdjAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Adjustment Reason */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Reason Code <span className="text-rose-400">*</span>
                </label>
                <select
                  value={adjReason}
                  onChange={(e) => setAdjReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Supplier Restock">Supplier Restock / PO Inbound</option>
                  <option value="Inventory Audit">Routine Physical Inventory Audit</option>
                  <option value="Damaged / Written Off">Damaged / Expired / Written Off</option>
                  <option value="Customer Return">Customer Return Restocked</option>
                  <option value="Promotional Sample">Promotional Sample / Giveaway</option>
                  <option value="Correction">Data Entry Correction</option>
                </select>
              </div>
            </div>

            {/* Notes / Reference */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Audit Notes / Reference Number (PO, Tracking, Order #)
              </label>
              <textarea
                rows={2}
                value={adjNotes}
                onChange={(e) => setAdjNotes(e.target.value)}
                placeholder="e.g. Inbound PO-8839 verified by warehouse team..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setAdjAmount(10);
                  setAdjNotes('');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Commit Stock Adjustment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT 2: STOCK HISTORY LOG */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                Stock Adjustment & Movement Audit Trail
              </h2>
              <p className="text-xs text-slate-400">
                Full chronological history of stock level modifications, sales decrements, supplier restocks, and manual adjustments.
              </p>
            </div>

            <button
              onClick={() => {
                alert('Exporting full stock history audit log as CSV...');
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              Export Audit CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Product Name & SKU</th>
                  <th className="py-3 px-3 text-center">Previous</th>
                  <th className="py-3 px-3 text-center">Change</th>
                  <th className="py-3 px-3 text-center">New Stock</th>
                  <th className="py-3 px-3">Reason Code</th>
                  <th className="py-3 px-3">Adjusted By</th>
                  <th className="py-3 px-3">Audit Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-sans">
                {historyLog.map((rec) => {
                  const isPositive = rec.changeDelta > 0;
                  const isNegative = rec.changeDelta < 0;

                  return (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {rec.timestamp}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{rec.productName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">SKU: {rec.sku}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-400">
                        {rec.previousStock}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold">
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] ${
                          isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          isNegative ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {isPositive && <ArrowUpRight className="w-3 h-3" />}
                          {isNegative && <ArrowDownRight className="w-3 h-3" />}
                          {isPositive ? `+${rec.changeDelta}` : rec.changeDelta}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-white">
                        {rec.newStock}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-300">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px]">
                          {rec.reason}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] flex items-center gap-1.5">
                        <UserCheck className="w-3 h-3 text-indigo-400 shrink-0" />
                        {rec.performedBy}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs truncate">
                        {rec.notes || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MAIN STOCK LIST, LOW STOCK, OR OUT OF STOCK */}
      {(activeTab === 'stock' || activeTab === 'low-stock' || activeTab === 'out-of-stock') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Turnover Rate Chart by Category (Only visible in Stock Overview) */}
          {activeTab === 'stock' && (
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Turnover Rate by Category
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Annual ratio measuring how quickly stock sells and turns over per category.
                </p>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryTurnoverData} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                      <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}x`} />
                      <YAxis type="category" dataKey="category" stroke="#94a3b8" fontSize={11} width={80} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
                        formatter={(val: any) => [`${val}x per year`, 'Turnover Rate']}
                      />
                      <Bar dataKey="turnoverRate" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="font-semibold text-slate-300">Turnover Metric Benchmark:</div>
                <p className="text-[11px] leading-relaxed">
                  Higher rates (&gt;8x) indicate high liquidity and strong market demand. Rates &lt;4x suggest overstocking or slowing momentum.
                </p>
              </div>
            </div>
          )}

          {/* Real-time Inventory Table */}
          <div className={`${activeTab === 'stock' ? 'lg:col-span-2' : 'lg:col-span-3'} bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {activeTab === 'low-stock' ? (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      Low Stock Directory (&lt;10 Units)
                    </>
                  ) : activeTab === 'out-of-stock' ? (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      Out of Stock Directory (0 Units)
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5 text-indigo-400" />
                      Complete Stock Inventory Directory
                    </>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Showing {filteredInventory.length} matching products
                </p>
              </div>

              {/* Controls & Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-[180px]">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Filter product/SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-3">Product & SKU</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Price</th>
                    <th className="py-3 px-3 text-center">Stock Level</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Turnover</th>
                    <th className="py-3 px-3 text-center">Stock Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        No inventory products match the active criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item) => {
                      const isLow = item.stock > 0 && item.stock < lowStockThreshold;
                      const isOut = item.stock === 0;

                      return (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-9 h-9 rounded-lg object-cover border border-slate-800" 
                              />
                              <div>
                                <div className="font-semibold text-white">{item.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono">SKU: {item.sku}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 text-slate-400">{item.category}</td>

                          <td className="py-3 px-3 text-right font-medium text-slate-200">
                            ${item.price.toFixed(2)}
                          </td>

                          <td className="py-3 px-3">
                            <div className="flex flex-col items-center">
                              <span className={`font-bold ${isOut ? 'text-rose-400' : isLow ? 'text-amber-400' : 'text-slate-100'}`}>
                                {item.stock} units
                              </span>
                              {/* Mini Progress Bar */}
                              <div className="w-20 bg-slate-950 h-1.5 rounded-full overflow-hidden mt-1">
                                <div 
                                  className={`h-1.5 rounded-full ${isOut ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${Math.min(100, (item.stock / 100) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 text-center">
                            {isOut ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                <XCircle className="w-3 h-3" />
                                Out of Stock
                              </span>
                            ) : isLow ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                                <AlertTriangle className="w-3 h-3" />
                                Low Stock (&lt;10)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" />
                                In Stock
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-3 text-right font-semibold text-slate-200">
                            {item.turnoverRate}x <span className="text-[10px] text-slate-500 font-normal">/yr</span>
                          </td>

                          <td className="py-3 px-3 text-center">
                            {editingItemId === item.id ? (
                              <div className="flex items-center justify-center gap-1">
                                <input
                                  type="number"
                                  value={tempStockValue}
                                  onChange={(e) => setTempStockValue(parseInt(e.target.value) || 0)}
                                  className="w-14 bg-slate-950 border border-indigo-500 rounded px-1 py-0.5 text-center text-xs text-white"
                                />
                                <button
                                  onClick={() => saveManualStockEdit(item.id)}
                                  className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => handleStockAdjustment(item.id, -1, 'Quick Stock Decrement')}
                                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                                  title="Decrease Stock (-1)"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    setEditingItemId(item.id);
                                    setTempStockValue(item.stock);
                                  }}
                                  className="px-2 py-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 rounded"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => handleStockAdjustment(item.id, 1, 'Quick Stock Increment')}
                                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                                  title="Increase Stock (+1)"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>

                                {/* Quick Restock Button if Low or Out of Stock */}
                                {(isLow || isOut) && (
                                  <button
                                    onClick={() => handleQuickReorder(item, 50)}
                                    className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-[10px] rounded border border-amber-500/30 flex items-center gap-1"
                                    title="Quick Restock +50 Units"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    +50 PO
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
