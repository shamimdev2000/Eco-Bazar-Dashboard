import React, { useState } from 'react';
import { 
  UserCheck, 
  KeyRound, 
  ShieldCheck, 
  History, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Clock, 
  MapPin, 
  Camera, 
  Save, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Download, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff, 
  Search, 
  FileSpreadsheet, 
  QrCode,
  Shield,
  Laptop,
  Check,
  LogOut
} from 'lucide-react';

interface ActivityLogItem {
  id: string;
  action: string;
  category: 'Security' | 'Orders' | 'Products' | 'Settings';
  timestamp: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Warning' | 'Failed';
  details: string;
}

const MOCK_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'ACT-901',
    action: '2FA Verification Code Generated',
    category: 'Security',
    timestamp: '2026-07-27 13:20:15',
    ipAddress: '192.168.1.104 (San Francisco, CA)',
    device: 'Chrome / macOS Sonoma',
    status: 'Success',
    details: 'Verified TOTP authentication token for admin session'
  },
  {
    id: 'ACT-902',
    action: 'Store Tax Rate Updated',
    category: 'Settings',
    timestamp: '2026-07-27 11:45:00',
    ipAddress: '192.168.1.104 (San Francisco, CA)',
    device: 'Chrome / macOS Sonoma',
    status: 'Success',
    details: 'Updated store sales tax rate from 8.0% to 8.5%'
  },
  {
    id: 'ACT-903',
    action: 'Failed Login Attempt',
    category: 'Security',
    timestamp: '2026-07-26 22:10:42',
    ipAddress: '45.142.120.12 (Unknown Proxy)',
    device: 'Firefox / Linux x86_64',
    status: 'Failed',
    details: 'Incorrect password supplied for user admin@apexstore.io'
  },
  {
    id: 'ACT-904',
    action: 'Bulk Product Price Adjustment',
    category: 'Products',
    timestamp: '2026-07-26 15:30:10',
    ipAddress: '192.168.1.104 (San Francisco, CA)',
    device: 'Chrome / macOS Sonoma',
    status: 'Success',
    details: 'Updated prices for 12 items in Audio category'
  },
  {
    id: 'ACT-905',
    action: 'Order Refund Issued (#ORD-8822)',
    category: 'Orders',
    timestamp: '2026-07-25 09:12:33',
    ipAddress: '192.168.1.104 (San Francisco, CA)',
    device: 'Safari / iPadOS 17',
    status: 'Success',
    details: 'Issued full refund of $189.00 to customer Sarah Jenkins'
  }
];

interface AdminProfileViewProps {
  onLogout?: () => void;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | '2fa' | 'activity-log'>('profile');

  // Profile Form State
  const [fullName, setFullName] = useState('Alexander Wright');
  const [jobTitle, setJobTitle] = useState('Head of Operations & Ecommerce');
  const [email, setEmail] = useState('admin@ecobazar.io');
  const [phone, setPhone] = useState('+1 (555) 382-9910');
  const [department, setDepartment] = useState('Executive Store Operations');
  const [timezone, setTimezone] = useState('Pacific Time (US & Canada) - UTC-07:00');
  const [bio, setBio] = useState('Senior Administrator overseeing product catalog management, payment gateway compliance, order logistics, and customer analytics.');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [secretKey] = useState('JBSWY3DPEHPK3PXP');
  const [verificationCode, setVerificationCode] = useState('');
  const [smsPhone, setSmsPhone] = useState('+1 (555) 382-9910');
  const [backupCodes] = useState([
    '9A82-410F', '2B91-8842', '7C19-3011', '5F42-9921',
    '3D10-4820', '8E77-1102', '1A55-6209', '4C33-7718'
  ]);

  // Activity Log State
  const [activitySearch, setActivitySearch] = useState('');
  const [activityCategoryFilter, setActivityCategoryFilter] = useState('All');
  const [logs, setLogs] = useState<ActivityLogItem[]>(MOCK_ACTIVITY_LOGS);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Password Strength Calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'Empty', color: 'bg-slate-800' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-amber-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(newPassword);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Profile details updated successfully!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    triggerToast('Account password updated securely!');
  };

  const handleVerify2FA = () => {
    if (verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit TOTP code.');
      return;
    }
    triggerToast('2FA Verification Code Validated Successfully!');
    setVerificationCode('');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    triggerToast(`Copied ${label} to clipboard!`);
  };

  const exportActivityCSV = () => {
    const headers = ["Log ID", "Action", "Category", "Timestamp", "IP Address", "Device", "Status", "Details"];
    const rows = logs.map(l => [
      l.id,
      `"${l.action}"`,
      l.category,
      l.timestamp,
      `"${l.ipAddress}"`,
      `"${l.device}"`,
      l.status,
      `"${l.details}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "admin_activity_log_audit.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Exported Activity Audit Log CSV!');
  };

  const filteredLogs = logs.filter(l => {
    const matchesSearch = l.action.toLowerCase().includes(activitySearch.toLowerCase()) ||
                          l.ipAddress.toLowerCase().includes(activitySearch.toLowerCase()) ||
                          l.details.toLowerCase().includes(activitySearch.toLowerCase());
    const matchesCategory = activityCategoryFilter === 'All' || l.category === activityCategoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={avatarUrl} 
              alt={fullName} 
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{fullName}</h1>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 font-bold text-[10px] rounded-full border border-indigo-500/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{jobTitle} • {email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>2FA Status: <strong className={twoFactorEnabled ? 'text-emerald-400' : 'text-rose-400'}>{twoFactorEnabled ? 'Active & Protected' : 'Disabled'}</strong></span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs border border-red-500/30 rounded-xl transition-all active:scale-95"
              title="Log Out Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'profile', label: 'Admin Profile', icon: <User className="w-4 h-4" /> },
            { id: 'password', label: 'Password Security', icon: <KeyRound className="w-4 h-4" /> },
            { id: '2fa', label: 'Two-Factor Auth (2FA)', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'activity-log', label: 'Audit & Activity Log', icon: <History className="w-4 h-4" /> },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  active 
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

      {/* TAB 1: PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" /> Personal & Account Identity
              </h2>
              <p className="text-xs text-slate-400 mt-1">Update administrator display name, contact phone, role bio, and profile image.</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Column */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl text-center space-y-4">
              <div className="relative w-28 h-28 mx-auto">
                <img 
                  src={avatarUrl} 
                  alt="Avatar Preview" 
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-slate-800 shadow-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter new avatar image URL:', avatarUrl);
                    if (url) setAvatarUrl(url);
                  }}
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-500"
                  title="Change Avatar Image"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <div className="text-xs font-bold text-white">{fullName}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{jobTitle}</div>
              </div>
              <div className="text-[10px] text-slate-500">
                JPG, PNG or WEBP format. Recommended size 300x300.
              </div>
            </div>

            {/* Fields Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Job Title / Designation</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Pacific Time (US & Canada) - UTC-07:00">Pacific Time (US & Canada) - UTC-07:00</option>
                    <option value="Eastern Time (US & Canada) - UTC-04:00">Eastern Time (US & Canada) - UTC-04:00</option>
                    <option value="Central European Time - UTC+01:00">Central European Time - UTC+01:00</option>
                    <option value="Japan Standard Time - UTC+09:00">Japan Standard Time - UTC+09:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Administrator Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: PASSWORD SECURITY */}
      {activeTab === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" /> Account Password & Authentication Policy
            </h2>
            <p className="text-xs text-slate-400 mt-1">Ensure your admin account uses a strong, complex password.</p>
          </div>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Current Password *</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">New Password *</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter complex password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className="font-bold text-white font-mono">{pwdStrength.label}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full ${pwdStrength.color} transition-all`} style={{ width: `${(pwdStrength.score / 5) * 100}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Confirm New Password *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Password Policy Checklist */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-300">Security Requirements Checklist:</div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li className={`flex items-center gap-1.5 ${newPassword.length >= 8 ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Minimum 8 characters in length
                </li>
                <li className={`flex items-center gap-1.5 ${/[A-Z]/.test(newPassword) ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> At least one uppercase letter (A-Z)
                </li>
                <li className={`flex items-center gap-1.5 ${/[0-9]/.test(newPassword) ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> At least one numeric digit (0-9)
                </li>
                <li className={`flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-emerald-400' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> At least one special symbol (!@#$%^&*)
                </li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4" /> Update Password
          </button>
        </form>
      )}

      {/* TAB 3: TWO FACTOR AUTHENTICATION (2FA) */}
      {activeTab === '2fa' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Two-Factor Multi-Factor Authentication
                </h2>
                <p className="text-xs text-slate-400 mt-1">Protect your administrative privileges with TOTP Google Authenticator / Authy app verification.</p>
              </div>

              {/* TOGGLE 2FA STATUS */}
              <button
                type="button"
                onClick={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  triggerToast(`2FA status changed to: ${!twoFactorEnabled ? 'Enabled' : 'Disabled'}`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  twoFactorEnabled
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* QR Code & Manual Secret Key */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-center">
                <div className="text-xs font-bold text-white">1. Scan QR Code with Authenticator App</div>
                
                {/* Visual Simulated QR Code Box */}
                <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex flex-col items-center justify-center border-4 border-indigo-500/30 shadow-xl">
                  <QrCode className="w-36 h-36 text-slate-950" />
                </div>

                <div className="text-[11px] text-slate-400">
                  Or enter secret code manually into Google Authenticator or 1Password:
                </div>

                <div className="flex items-center justify-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <code className="text-xs font-mono font-bold text-indigo-400 tracking-wider">{secretKey}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(secretKey, 'TOTP Secret Key')}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                    title="Copy secret key"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Verify Code Test Box */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-white">2. Test 6-Digit Verification Code</div>
                  <p className="text-xs text-slate-400">Enter the 6-digit passcode generated by your authenticator app to test synchronization:</p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 849201"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-center text-lg font-mono font-bold text-indigo-400 tracking-widest focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerify2FA}
                      className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shrink-0"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {/* SMS Backup Section */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span>SMS Backup Phone Recovery</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={smsPhone}
                      onChange={(e) => setSmsPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => triggerToast('SMS backup phone number saved!')}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl shrink-0"
                    >
                      Save SMS
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BACKUP RECOVERY CODES */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" /> Emergency Recovery Backup Codes
                  </h3>
                  <p className="text-[11px] text-slate-400">Save these single-use codes in a secure password manager. Each code can be used once to bypass 2FA if you lose your device.</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(backupCodes.join('\n'), 'Emergency Backup Codes')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy All Codes
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {backupCodes.map((code, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center font-mono text-xs font-bold text-slate-200 tracking-wider">
                    {code}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVITY & AUDIT LOG */}
      {activeTab === 'activity-log' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" /> Admin Audit Trail & Session History
              </h2>
              <p className="text-xs text-slate-400 mt-1">Real-time security log of administrator actions, password updates, settings modifications, and IP addresses.</p>
            </div>
            <button
              type="button"
              onClick={exportActivityCSV}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export CSV Audit Log
            </button>
          </div>

          {/* SEARCH & CATEGORY FILTERS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search action, IP, or details..."
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Category:</span>
              {['All', 'Security', 'Settings', 'Products', 'Orders'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActivityCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    activityCategoryFilter === cat
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE OF LOGS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Log ID</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">IP Address & Device</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-indigo-400">{log.id}</td>
                      <td className="p-4 font-mono text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-4 font-bold text-white">{log.action}</td>
                      <td className="p-4 space-y-0.5 font-mono text-[11px]">
                        <div className="text-slate-200">{log.ipAddress}</div>
                        <div className="text-slate-500">{log.device}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          log.status === 'Success'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : log.status === 'Warning'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 max-w-xs">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
