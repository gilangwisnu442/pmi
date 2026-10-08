import React, { useState } from 'react';
import { User, UserRole } from '../types/auth';
import { DUMMY_USERS, findUserByCredentials } from '../data/users';
import { INFO_KONTAK_PANITIA } from '../data/panitia';
import { PmiLogo } from './PmiLogo';
import { 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  ArrowLeft, 
  KeyRound, 
  CheckCircle2, 
  Sparkles,
  Building,
  Activity,
  Trophy,
  FileSpreadsheet,
  Phone,
  Mail
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: User) => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToHome
}) => {
  const [username, setUsername] = useState('sekre');
  const [password, setPassword] = useState('sekre123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const found = findUserByCredentials(username, password);

    if (found) {
      onLoginSuccess(found);
    } else {
      setErrorMsg('Username atau password tidak cocok. Silakan periksa kembali atau klik salah satu akun pada pilihan cepat di bawah.');
    }
  };

  const handleQuickLogin = (uname: string, pass: string) => {
    setUsername(uname);
    setPassword(pass);
    const found = findUserByCredentials(uname, pass);
    if (found) {
      onLoginSuccess(found);
    }
  };

  const officialAccounts = [
    { username: 'sekre', pass: 'sekre123', label: 'Sekretariat', role: 'SEKRETARIAT', badge: 'Bidang Kesekretariatan' },
    { username: 'bidang 1', pass: 'bidang 1 123', label: 'Bidang 1', role: 'BIDANG 1', badge: 'Kegiatan & Jumpa Bakti' },
    { username: 'bidang 2', pass: 'bidang 2 123', label: 'Bidang 2', role: 'BIDANG 2', badge: 'Sarpras, Medis & Konsumsi' },
    { username: 'bidang 3', pass: 'bidang 3 123', label: 'Bidang 3', role: 'BIDANG 3', badge: 'Perlombaan & Juri' },
    { username: 'superadmin', pass: 'admin123', label: 'Super Admin', role: 'SUPER ADMIN', badge: 'Semua Bidang' },
  ];

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Publik</span>
        </button>

        <span className="text-2xs text-slate-400 font-mono">
          PANITIA JUMBARA XXXII
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block mx-auto mb-2">
            <PmiLogo size="md" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Portal Masuk Panitia Posko Jumbara
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Silakan masuk dengan akun resmi bidang Anda untuk mengelola dan menindaklanjuti pengaduan kontingen.
          </p>
        </div>

        {/* Quick Demo Login Pill Bar with exact user requested passwords */}
        <div className="p-4 bg-red-50/70 border border-red-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Daftar Akun Resmi & Password (Klik untuk Masuk):</span>
            </div>
            <span className="text-3xs bg-red-200 text-red-900 px-2 py-0.5 rounded font-bold">1-KLIK</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {officialAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickLogin(acc.username, acc.pass)}
                className="p-3 bg-white hover:bg-red-600 hover:text-white rounded-xl border border-red-200 text-left transition-all group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-extrabold text-slate-900 group-hover:text-white">
                    {acc.label}
                  </span>
                  <span className="font-mono text-3xs text-red-700 bg-red-50 group-hover:bg-red-700 group-hover:text-white px-1.5 py-0.2 rounded font-bold">
                    {acc.role}
                  </span>
                </div>
                <div className="text-2xs text-slate-500 group-hover:text-red-100 font-mono">
                  User: <span className="font-bold">{acc.username}</span> | Pass: <span className="font-bold">{acc.pass}</span>
                </div>
                <div className="text-3xs text-slate-400 group-hover:text-red-200 mt-1">
                  {acc.badge}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Username Panitia
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sekre / bidang 1 / bidang 2 / bidang 3"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="sekre123 / bidang 1 123 / bidang 2 123 / bidang 3 123"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Masuk ke Dasbor Bidang
          </button>
        </form>

        {/* Contact help info */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-2xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Mail className="w-3.5 h-3.5 text-red-600" />
            <span>{INFO_KONTAK_PANITIA.email}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>{INFO_KONTAK_PANITIA.nomerWa}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
