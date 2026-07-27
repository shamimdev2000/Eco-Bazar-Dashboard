import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Check, 
  Copy, 
  Search, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  ChevronLeft, 
  Bell, 
  User, 
  MoreHorizontal, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  HelpCircle, 
  Sliders, 
  Filter, 
  Download, 
  Grid, 
  Terminal, 
  Code, 
  Maximize2, 
  Minimize2, 
  ChevronDown, 
  Play, 
  Star, 
  Trash2, 
  Edit,
  ArrowRight,
  Shield,
  Clock,
  Heart
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

export const UIComponentsShowroomView: React.FC = () => {
  const [copiedComponent, setCopiedComponent] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // INTERACTIVE STATES FOR COMPONENTS DEMO
  // 1. Button
  const [btnLoading, setBtnLoading] = useState(false);

  // 3. Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 4. Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 5. Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 6. Popover
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // 7. Command Palette
  const [commandSearch, setCommandSearch] = useState('');

  // 8. Data Table
  const [tableSearch, setTableSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>(['1', '3']);

  // 9. Calendar
  const [selectedDate, setSelectedDate] = useState<number>(27);

  // 11. Tabs
  const [demoTab, setDemoTab] = useState<'overview' | 'analytics' | 'activity'>('overview');

  // 12. Accordion
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // 13. Toast
  const [activeToast, setActiveToast] = useState<{ type: 'success' | 'error' | 'info'; title: string; desc: string } | null>(null);

  // 14. Progress
  const [progressVal, setProgressVal] = useState(68);

  // 17. Tooltip
  const [tooltipActive, setTooltipActive] = useState<string | null>(null);

  // 19. Pagination
  const [currentPage, setCurrentPage] = useState(2);

  // 21. Sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 22. Carousel
  const [carouselIndex, setCarouselIndex] = useState(0);

  // 24. Hover Card
  const [isHoverCardActive, setIsHoverCardActive] = useState(false);

  // 25. Input OTP
  const [otpValues, setOtpValues] = useState(['5', '8', '2', '9', '0', '1']);

  // 26. Resizable Panels
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage

  const triggerToastAlert = (type: 'success' | 'error' | 'info', title: string, desc: string) => {
    setActiveToast({ type, title, desc });
    setTimeout(() => setActiveToast(null), 3500);
  };

  const carouselSlides = [
    { title: 'ApexStore Pro Design System', desc: 'Enterprise Tailwind CSS component library with full dark mode accessibility.', color: 'from-indigo-600 to-indigo-900' },
    { title: 'Real-Time Data Visualizations', desc: 'High performance charts with smooth animations and multi-dimensional analytics.', color: 'from-blue-600 to-cyan-800' },
    { title: 'Seamless User Experience', desc: 'Built for high reliability and instantaneous state synchronization.', color: 'from-purple-600 to-pink-900' },
  ];

  const chartData = [
    { day: 'Mon', revenue: 4200, users: 240 },
    { day: 'Tue', revenue: 5800, users: 320 },
    { day: 'Wed', revenue: 7100, users: 450 },
    { day: 'Thu', revenue: 6400, users: 390 },
    { day: 'Fri', revenue: 8900, users: 580 },
    { day: 'Sat', revenue: 9500, users: 620 },
    { day: 'Sun', revenue: 11200, users: 740 },
  ];

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpValues];
    updated[index] = val;
    setOtpValues(updated);
  };

  const categories = ['All', 'Inputs & Buttons', 'Overlays & Panels', 'Data Display', 'Navigation', 'Feedback & Status'];

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Render */}
      {activeToast && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          activeToast.type === 'success' ? 'bg-emerald-950 border-emerald-500/50 text-emerald-200' :
          activeToast.type === 'error' ? 'bg-rose-950 border-rose-500/50 text-rose-200' :
          'bg-indigo-950 border-indigo-500/50 text-indigo-200'
        }`}>
          {activeToast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {activeToast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {activeToast.type === 'info' && <Info className="w-5 h-5 text-indigo-400" />}
          <div>
            <div className="font-bold text-xs">{activeToast.title}</div>
            <div className="text-[11px] opacity-80">{activeToast.desc}</div>
          </div>
          <button onClick={() => setActiveToast(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-400" /> UI Component Showroom & Design System
            </h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded-full border border-indigo-500/30">
              27 Components
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Interactive playground and live demos for all core UI elements, overlays, navigation, inputs, and charts.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID OF 27 COMPONENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. BUTTON */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">1. Button</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Inputs & Buttons</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all">
              Primary
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all">
              Secondary
            </button>
            <button className="px-4 py-2 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 font-bold text-xs rounded-xl transition-all">
              Outline
            </button>
            <button className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-bold text-xs rounded-xl border border-rose-500/30 transition-all">
              Destructive
            </button>
            <button 
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 2000);
              }}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md"
            >
              {btnLoading ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{btnLoading ? 'Processing...' : 'Interactive Click'}</span>
            </button>
          </div>
        </div>

        {/* 2. CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">2. Card</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-indigo-500/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Card Header Title</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-md">Card Badge</span>
            </div>
            <p className="text-xs text-slate-400">Standard card container with border styling, padding rules, and elevation shadows.</p>
            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button className="text-xs text-indigo-400 hover:underline font-bold">Action Link &rarr;</button>
            </div>
          </div>
        </div>

        {/* 3. DIALOG / MODAL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">3. Dialog (Modal)</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Overlays & Panels</span>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
          >
            Open Interactive Dialog Modal
          </button>

          {isDialogOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white">System Confirmation Dialog</h3>
                  <button onClick={() => setIsDialogOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300">Are you sure you want to perform this system action? This overlay uses focus lock and background backdrop blur.</p>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsDialogOpen(false);
                      triggerToastAlert('success', 'Dialog Action Confirmed', 'The modal action was executed successfully.');
                    }} 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Confirm Action
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. DRAWER */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">4. Drawer</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Overlays & Panels</span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl"
          >
            Open Bottom Drawer Panel
          </button>

          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end justify-center">
              <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 max-w-lg w-full space-y-4 animate-in slide-in-from-bottom-full">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-2"></div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white">Bottom Drawer Overlay</h3>
                  <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300">Bottom drawer panel designed for mobile touch interfaces and quick option selections.</p>
                <button onClick={() => setIsDrawerOpen(false)} className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                  Close Drawer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5. DROPDOWN */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">5. Dropdown Menu</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Overlays & Panels</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <span>Options Menu</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-slate-950 border border-slate-800 rounded-xl p-1.5 shadow-2xl z-30 space-y-1">
                <button onClick={() => { setIsDropdownOpen(false); triggerToastAlert('info', 'Edit Clicked', 'Editing item...'); }} className="w-full px-3 py-1.5 text-left text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2">
                  <Edit className="w-3.5 h-3.5" /> Edit Record
                </button>
                <button onClick={() => { setIsDropdownOpen(false); triggerToastAlert('info', 'Star Clicked', 'Item starred'); }} className="w-full px-3 py-1.5 text-left text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" /> Add to Favorites
                </button>
                <div className="border-t border-slate-800 my-1"></div>
                <button onClick={() => { setIsDropdownOpen(false); triggerToastAlert('error', 'Deleted', 'Item removed'); }} className="w-full px-3 py-1.5 text-left text-xs text-rose-400 hover:bg-rose-950/50 rounded-lg flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" /> Delete Permanently
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 6. POPOVER */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">6. Popover</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Overlays & Panels</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <Info className="w-4 h-4" /> Toggle Popover Details
            </button>

            {isPopoverOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl z-30 space-y-2">
                <div className="text-xs font-bold text-white">Popover Insight</div>
                <p className="text-[11px] text-slate-400">Contextual popover overlay card used for rich inline help, quick tips, or form controls.</p>
                <button onClick={() => setIsPopoverOpen(false)} className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg">
                  Got It
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 7. COMMAND PALETTE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">7. Command Palette (Cmd+K)</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Navigation</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Type a command or search (e.g. orders, users, settings)..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <kbd className="px-1.5 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-400 rounded border border-slate-800">⌘K</kbd>
            </div>
            <div className="space-y-1">
              {[
                { name: 'Navigate to Orders Manager', cat: 'Page Navigation', key: 'G O' },
                { name: 'Create New Discount Coupon', cat: 'Quick Action', key: 'C N' },
                { name: 'Export Monthly Analytics CSV', cat: 'Reports', key: 'E R' }
              ].filter(i => i.name.toLowerCase().includes(commandSearch.toLowerCase())).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-900 rounded-lg text-xs text-slate-200 cursor-pointer">
                  <span>{item.name}</span>
                  <span className="text-[10px] font-mono text-slate-500">{item.cat} ({item.key})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. DATA TABLE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">8. Data Table</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Select</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { id: '1', name: 'Sophia Chen', role: 'Enterprise VIP', status: 'Active', spent: '$12,450.00' },
                  { id: '2', name: 'Marcus Vance', role: 'Pro Tier', status: 'Active', spent: '$3,890.00' },
                  { id: '3', name: 'Elena Rostova', role: 'Wholesale Partner', status: 'Pending', spent: '$24,100.00' }
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-900/50">
                    <td className="p-3">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedRows([...selectedRows, row.id]);
                          else setSelectedRows(selectedRows.filter(id => id !== row.id));
                        }}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0" 
                      />
                    </td>
                    <td className="p-3 font-bold text-white">{row.name}</td>
                    <td className="p-3 text-slate-400">{row.role}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-indigo-400">{row.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. CALENDAR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">9. Calendar</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>July 2026</span>
              <div className="flex gap-1">
                <button className="p-1 bg-slate-900 rounded"><ChevronLeft className="w-3.5 h-3.5" /></button>
                <button className="p-1 bg-slate-900 rounded"><ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-bold">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    selectedDate === d
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 10. BADGE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">10. Badge</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Feedback & Status</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/30">
              Primary Badge
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
              Success
            </span>
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
              Warning
            </span>
            <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 text-xs font-bold rounded-full border border-rose-500/30">
              Destructive
            </span>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full border border-slate-700">
              Neutral Outline
            </span>
          </div>
        </div>

        {/* 11. TABS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">11. Tabs</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Navigation</span>
          </div>
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1">
            {(['overview', 'analytics', 'activity'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setDemoTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  demoTab === t ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
            Active tab view content: <strong className="text-indigo-400">{demoTab.toUpperCase()}</strong>
          </div>
        </div>

        {/* 12. ACCORDION */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">12. Accordion</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="space-y-2">
            {[
              { title: 'What is the refund policy?', body: 'All order returns and refund claims are processed within 3 business days.' },
              { title: 'How does API rate limiting work?', body: 'API requests are throttled at 1,000 requests per minute per authenticated client token.' }
            ].map((acc, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  className="w-full p-3 text-left text-xs font-bold text-white flex justify-between items-center"
                >
                  <span>{acc.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === idx ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`} />
                </button>
                {openAccordion === idx && (
                  <div className="px-3 pb-3 text-xs text-slate-400 border-t border-slate-800/60 pt-2 animate-in fade-in">
                    {acc.body}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 13. TOAST */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">13. Toast</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Feedback & Status</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => triggerToastAlert('success', 'Success Toast Triggered', 'Operation completed without errors.')}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Trigger Success Toast
            </button>
            <button
              onClick={() => triggerToastAlert('error', 'Error Alert Toast', 'Validation failed during payload sync.')}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              Trigger Error Toast
            </button>
          </div>
        </div>

        {/* 14. PROGRESS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">14. Progress Bar</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Feedback & Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-bold">
              <span>Database Sync Completion</span>
              <span className="font-mono text-indigo-400">{progressVal}%</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progressVal}%` }}></div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => setProgressVal(Math.max(0, progressVal - 15))} className="px-2 py-1 bg-slate-800 text-[10px] text-white rounded font-bold">- 15%</button>
              <button onClick={() => setProgressVal(Math.min(100, progressVal + 15))} className="px-2 py-1 bg-slate-800 text-[10px] text-white rounded font-bold">+ 15%</button>
            </div>
          </div>
        </div>

        {/* 15. SKELETON */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">15. Skeleton Placeholder</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Feedback & Status</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-2 bg-slate-800/60 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 16. ALERT */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">16. Alert Callout</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Feedback & Status</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Low Disk Storage Warning</strong>
              <span className="text-[11px] opacity-80">Server disk partition /dev/sda1 reached 88% capacity. Consider archiving log files.</span>
            </div>
          </div>
        </div>

        {/* 17. TOOLTIP */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">17. Tooltip</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Feedback & Status</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onMouseEnter={() => setTooltipActive('top')}
                onMouseLeave={() => setTooltipActive(null)}
                className="px-3 py-1.5 bg-slate-800 text-xs text-white rounded-xl font-bold"
              >
                Hover Top Tooltip
              </button>
              {tooltipActive === 'top' && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-700 text-white text-[10px] px-2.5 py-1 rounded-lg font-bold shadow-xl whitespace-nowrap z-30">
                  Top Tooltip Info
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 18. BREADCRUMB */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">18. Breadcrumb</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Navigation</span>
          </div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="hover:text-white cursor-pointer">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="hover:text-white cursor-pointer">Catalog</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-indigo-400 font-bold">Audio Products</span>
          </nav>
        </div>

        {/* 19. PAGINATION */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">19. Pagination</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Navigation</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 bg-slate-950 text-slate-300 rounded-lg border border-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-bold ${
                  currentPage === p ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 bg-slate-950 text-slate-300 rounded-lg border border-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 20. AVATAR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">20. Avatar & Avatar Stack</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-10 h-10 rounded-xl object-cover border border-slate-700" alt="Avatar" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
            </div>
            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="User 1" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="User 2" />
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-[10px] font-bold border-2 border-slate-900 flex items-center justify-center">
                +4
              </div>
            </div>
          </div>
        </div>

        {/* 21. SHEET */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">21. Sheet (Side Panel)</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Overlays & Panels</span>
          </div>
          <button onClick={() => setIsSheetOpen(true)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
            Open Right Side Sheet
          </button>

          {isSheetOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
              <div className="bg-slate-900 border-l border-slate-800 w-80 h-full p-6 space-y-4 animate-in slide-in-from-right-full">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white">Slide-Over Sheet</h3>
                  <button onClick={() => setIsSheetOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300">Sheet side drawers are ideal for detail inspections, metadata configuration, or filters.</p>
                <button onClick={() => setIsSheetOpen(false)} className="w-full py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl">
                  Close Sheet
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 22. CAROUSEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">22. Carousel Slider</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r text-white space-y-2 border border-slate-800 min-h-[140px] flex flex-col justify-between" style={{ backgroundImage: `linear-gradient(to right, #312e81, #1e1b4b)` }}>
            <div>
              <div className="text-base font-bold">{carouselSlides[carouselIndex].title}</div>
              <p className="text-xs opacity-80 mt-1">{carouselSlides[carouselIndex].desc}</p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-1">
                {carouselSlides.map((_, i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${carouselIndex === i ? 'bg-white' : 'bg-white/30'}`}></span>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCarouselIndex((carouselIndex - 1 + carouselSlides.length) % carouselSlides.length)} className="p-1 bg-black/40 rounded-lg hover:bg-black/70"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setCarouselIndex((carouselIndex + 1) % carouselSlides.length)} className="p-1 bg-black/40 rounded-lg hover:bg-black/70"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* 23. CHART */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">23. Interactive Area Chart</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Data Display</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 24. HOVER CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">24. Hover Card</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Overlays & Panels</span>
          </div>
          <div className="relative inline-block">
            <span
              onMouseEnter={() => setIsHoverCardActive(true)}
              onMouseLeave={() => setIsHoverCardActive(false)}
              className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
            >
              @alexander_wright (Hover Me)
            </span>

            {isHoverCardActive && (
              <div className="absolute left-0 top-full mt-2 w-60 bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl z-30 space-y-2">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-10 h-10 rounded-xl object-cover" alt="User" />
                  <div>
                    <div className="text-xs font-bold text-white">Alexander Wright</div>
                    <div className="text-[10px] text-slate-400">Head of Operations</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Managing global store catalog, order fulfillments, and executive analytics.</p>
              </div>
            )}
          </div>
        </div>

        {/* 25. INPUT OTP */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">25. Input OTP Code</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Inputs & Buttons</span>
          </div>
          <div className="flex justify-center gap-2">
            {otpValues.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-9 h-11 bg-slate-950 border border-slate-800 rounded-xl text-center text-sm font-mono font-bold text-indigo-400 focus:outline-none focus:border-indigo-500"
              />
            ))}
          </div>
        </div>

        {/* 26. RESIZABLE PANELS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <h2 className="text-sm font-bold text-white">26. Resizable Split Panels</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Layout & Struct</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl h-28 flex overflow-hidden text-xs">
            <div className="bg-indigo-950/40 p-4 font-mono text-indigo-200 border-r border-slate-800 flex items-center justify-center" style={{ width: `${leftPanelWidth}%` }}>
              Left Panel ({leftPanelWidth}%)
            </div>
            <div className="bg-slate-900/60 p-4 font-mono text-slate-300 flex items-center justify-center flex-1">
              Right Panel ({100 - leftPanelWidth}%)
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-bold">Resize Handle:</span>
            <input
              type="range"
              min={20}
              max={80}
              value={leftPanelWidth}
              onChange={(e) => setLeftPanelWidth(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
