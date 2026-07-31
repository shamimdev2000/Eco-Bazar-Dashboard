import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  DollarSign, 
  Truck, 
  CreditCard, 
  Share2, 
  Mail, 
  Globe, 
  Sparkles, 
  Save, 
  Send, 
  CheckCircle2, 
  Image as ImageIcon, 
  Lock, 
  Key, 
  MapPin, 
  Percent, 
  ShieldCheck, 
  Sliders,
  Plus,
  X,
  Code
} from 'lucide-react';

export const SettingsView = ({
  settings,
  onSaveSettings
}) => {
  const [activeTab, setActiveTab] = useState('general');

  const [formData, setFormData] = useState({ ...settings });
  const [newDeliveryArea, setNewDeliveryArea] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    triggerToast('Store settings saved & synced successfully!');
  };

  const handleAddDeliveryArea = () => {
    if (!newDeliveryArea.trim()) return;
    setFormData(prev => ({
      ...prev,
      deliveryAreas: [...prev.deliveryAreas, newDeliveryArea.trim()]
    }));
    setNewDeliveryArea('');
    triggerToast('Added delivery zone');
  };

  const handleRemoveDeliveryArea = (index) => {
    setFormData(prev => ({
      ...prev,
      deliveryAreas: prev.deliveryAreas.filter((_, i) => i !== index)
    }));
  };

  const handleAddCountry = () => {
    if (!newCountry.trim()) return;
    setFormData(prev => ({
      ...prev,
      supportedCountries: [...prev.supportedCountries, newCountry.trim()]
    }));
    setNewCountry('');
    triggerToast('Added supported country');
  };

  const handleRemoveCountry = (index) => {
    setFormData(prev => ({
      ...prev,
      supportedCountries: prev.supportedCountries.filter((_, i) => i !== index)
    }));
  };

  const handleSendTestEmail = () => {
    triggerToast(`Sent SMTP test email to ${formData.smtp.fromEmail}`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">System & Store Settings</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure store identity, regional currencies, tax rates, shipping zones, payment gateways, SMTP mailer, SEO tags, and tracking pixels.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all shrink-0"
        >
          <Save className="w-4 h-4" /> Save All Settings
        </button>
      </div>

      {/* TABS NAVIGATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'general', label: 'Store Profile & Currency', icon: <Store className="w-4 h-4" /> },
            { id: 'tax-shipping', label: 'Tax, Shipping & Areas', icon: <Truck className="w-4 h-4" /> },
            { id: 'payments', label: 'Payment Gateways', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'smtp-social', label: 'SMTP & Social Links', icon: <Mail className="w-4 h-4" /> },
            { id: 'seo-tracking', label: 'SEO, GA4 & Pixel', icon: <Globe className="w-4 h-4" /> },
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
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: GENERAL STORE & CURRENCY */}
        {activeTab === 'general' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-indigo-400" /> Store Identity & Regional Currency
              </h2>
              <p className="text-xs text-slate-400 mt-1">Basic public information and currency symbol configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Store Name *</label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Store Logo URL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Store Logo URL</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-950 rounded-xl border border-slate-800 p-1 flex items-center justify-center shrink-0">
                    <img src={formData.storeLogo} alt="Logo Preview" className="max-h-full max-w-full object-contain rounded" />
                  </div>
                  <input
                    type="url"
                    value={formData.storeLogo}
                    onChange={(e) => setFormData({ ...formData, storeLogo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Currency Code */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Primary Store Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => {
                    const curr = e.target.value;
                    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'CA$', AUD: 'A$' };
                    setFormData({
                      ...formData,
                      currency: curr,
                      currencySymbol: symbols[curr] || '$'
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-indigo-500"
                >
                  <option value="USD">USD ($) - United States Dollar</option>
                  <option value="EUR">EUR (€) - Eurozone Euro</option>
                  <option value="GBP">GBP (£) - British Pound Sterling</option>
                  <option value="JPY">JPY (¥) - Japanese Yen</option>
                  <option value="CAD">CAD (CA$) - Canadian Dollar</option>
                  <option value="AUD">AUD (A$) - Australian Dollar</option>
                </select>
              </div>

              {/* Currency Symbol */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Currency Symbol</label>
                <input
                  type="text"
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAX, SHIPPING & DELIVERY AREAS */}
        {activeTab === 'tax-shipping' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Percent className="w-5 h-5 text-indigo-400" /> Sales Tax & Shipping Rate Config
                </h2>
                <p className="text-xs text-slate-400 mt-1">Default percentage sales tax, flat shipping charge, and free shipping tier.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Sales Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Tax Display Type</label>
                  <select
                    value={formData.taxType}
                    onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Exclusive">Exclusive (Calculated at checkout)</option>
                    <option value="Inclusive">Inclusive (Included in product price)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Flat Shipping Charge ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.shippingCharge}
                    onChange={(e) => setFormData({ ...formData, shippingCharge: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Free Shipping Threshold ($)</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.freeShippingThreshold}
                    onChange={(e) => setFormData({ ...formData, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* DELIVERY AREAS & COUNTRIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Zones */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" /> Supported Delivery Regions
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. South America & Caribbean"
                    value={newDeliveryArea}
                    onChange={(e) => setNewDeliveryArea(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliveryArea}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.deliveryAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-200">
                      <span>{area}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliveryArea(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Countries */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-400" /> Country Whitelist
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Singapore"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCountry}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.supportedCountries.map((country, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-200">
                      <span>{country}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCountry(idx)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PAYMENT GATEWAYS */}
        {activeTab === 'payments' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" /> Payment Gateway Integration Credentials
              </h2>
              <p className="text-xs text-slate-400 mt-1">Configure Stripe, PayPal, Apple Pay, and Cash on Delivery payment methods.</p>
            </div>

            <div className="space-y-6">
              {/* Stripe */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl font-bold text-xs">Stripe</div>
                    <span className="font-bold text-white text-xs">Stripe Credit & Debit Cards</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.paymentGateways.stripeEnabled}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentGateways: { ...formData.paymentGateways, stripeEnabled: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                {formData.paymentGateways.stripeEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Publishable Key</label>
                      <input
                        type="text"
                        value={formData.paymentGateways.stripePublicKey}
                        onChange={(e) => setFormData({
                          ...formData,
                          paymentGateways: { ...formData.paymentGateways, stripePublicKey: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Secret Key</label>
                      <input
                        type="password"
                        value={formData.paymentGateways.stripeSecretKey}
                        onChange={(e) => setFormData({
                          ...formData,
                          paymentGateways: { ...formData.paymentGateways, stripeSecretKey: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PayPal */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl font-bold text-xs">PayPal</div>
                    <span className="font-bold text-white text-xs">PayPal Express Checkout</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.paymentGateways.paypalEnabled}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentGateways: { ...formData.paymentGateways, paypalEnabled: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {formData.paymentGateways.paypalEnabled && (
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Client ID</label>
                    <input
                      type="text"
                      value={formData.paymentGateways.paypalClientId}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentGateways: { ...formData.paymentGateways, paypalClientId: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Toggles for COD & Apple Pay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Cash on Delivery (COD)</span>
                  <input
                    type="checkbox"
                    checked={formData.paymentGateways.codEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      paymentGateways: { ...formData.paymentGateways, codEnabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 rounded"
                  />
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Apple Pay & Google Pay</span>
                  <input
                    type="checkbox"
                    checked={formData.paymentGateways.applePayEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      paymentGateways: { ...formData.paymentGateways, applePayEnabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SMTP & SOCIAL LINKS */}
        {activeTab === 'smtp-social' && (
          <div className="space-y-6">
            {/* SMTP Mailer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-400" /> Transactional SMTP Email Mailer
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Outgoing mail server setup for order receipts & shipping alerts.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
                >
                  <Send className="w-3.5 h-3.5" /> Send Test Email
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">SMTP Host</label>
                  <input
                    type="text"
                    value={formData.smtp.host}
                    onChange={(e) => setFormData({ ...formData, smtp: { ...formData.smtp, host: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">SMTP Port</label>
                  <input
                    type="number"
                    value={formData.smtp.port}
                    onChange={(e) => setFormData({ ...formData, smtp: { ...formData.smtp, port: parseInt(e.target.value) || 587 } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Encryption</label>
                  <select
                    value={formData.smtp.encryption}
                    onChange={(e) => setFormData({ ...formData, smtp: { ...formData.smtp, encryption: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none"
                  >
                    <option value="TLS">TLS (Port 587)</option>
                    <option value="SSL">SSL (Port 465)</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Sender Email</label>
                  <input
                    type="email"
                    value={formData.smtp.fromEmail}
                    onChange={(e) => setFormData({ ...formData, smtp: { ...formData.smtp, fromEmail: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Sender Name</label>
                  <input
                    type="text"
                    value={formData.smtp.fromName}
                    onChange={(e) => setFormData({ ...formData, smtp: { ...formData.smtp, fromName: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">SMTP Password</label>
                  <input
                    type="password"
                    value={formData.smtp.password}
                    onChange={(e) => setFormData({ ...formData, smtp: { ...formData.smtp, password: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-400" /> Social Media Profiles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData.socialLinks).map((key) => (
                  <div key={key}>
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">{key}</label>
                    <input
                      type="url"
                      value={formData.socialLinks[key]}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, [key]: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SEO, GOOGLE ANALYTICS & PIXEL */}
        {activeTab === 'seo-tracking' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" /> Global Store SEO & Analytics Tracking Pixels
              </h2>
              <p className="text-xs text-slate-400 mt-1">Site-wide search meta tags, Google Analytics 4, and Facebook Meta Pixel IDs.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Global Meta Title</label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Global Meta Description</label>
                <textarea
                  rows={2}
                  value={formData.seo.metaDescription}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Google Analytics GA4 Measurement ID</label>
                  <input
                    type="text"
                    placeholder="G-XXXXXXXXXX"
                    value={formData.googleAnalyticsId}
                    onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Facebook Meta Pixel ID</label>
                  <input
                    type="text"
                    placeholder="1234567890"
                    value={formData.facebookPixelId}
                    onChange={(e) => setFormData({ ...formData, facebookPixelId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
};
