import React, { useState } from 'react';
import { PmiLogo } from './PmiLogo';
import { User } from '../types/auth';
import { INFO_KONTAK_PANITIA } from '../data/panitia';
import { 
  FileText, 
  Search, 
  LayoutDashboard, 
  Table, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  Shield, 
  PieChart,
  Home,
  Users
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'buat' | 'cek' | 'panitia' | 'admin-dashboard' | 'admin-tabel' | 'admin-charts' | 'login';
  onNavigate: (view: 'home' | 'buat' | 'cek' | 'panitia' | 'admin-dashboard' | 'admin-tabel' | 'admin-charts' | 'login') => void;
  currentUser: User | null;
  onLogout: () => void;
  totalPendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onLogout,
  totalPendingCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: any) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs no-print">
      {/* Official PMI Top Header Strip with User's Contact Info */}
      <div className="bg-red-700 text-white text-xs px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase tracking-wider">PALANG MERAH INDONESIA KABUPATEN BANYUMAS</span>
          <span className="text-red-200 hidden md:inline">|</span>
          <span className="text-red-100 hidden md:inline">JUMBARA PMR XXXII TAHUN 2026</span>
        </div>
        <div className="flex items-center gap-3 text-red-100 text-2xs sm:text-xs">
          <span className="font-semibold text-white hidden sm:inline">MULA • MADYA • WIRA</span>
          <span className="text-red-300 hidden sm:inline">·</span>
          <span className="font-mono text-white font-bold">WA: {INFO_KONTAK_PANITIA.nomerWa}</span>
          <span className="text-red-300">·</span>
          <span className="text-red-100 hidden lg:inline">{INFO_KONTAK_PANITIA.email}</span>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Logo & Official Title */}
          <div 
            onClick={() => handleNavClick(currentUser ? 'admin-dashboard' : 'home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <PmiLogo size="md" />
            <div className="pl-3 border-l border-slate-200">
              <div className="text-xs sm:text-sm font-extrabold text-red-700 tracking-tight leading-none uppercase">
                Layanan Pengaduan Kontingen
              </div>
              <div className="text-xs font-bold text-slate-800 leading-tight mt-0.5">
                JUMBARA PMR PMI KABUPATEN BANYUMAS 2026
              </div>
              <div className="text-2xs text-slate-500 font-medium">
                Tingkat Mula (SD) • Madya (SMP) • Wira (SMA/SMK)
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {!currentUser ? (
              // Public Navigation
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'home'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </button>

                <button
                  onClick={() => handleNavClick('buat')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                    currentView === 'buat'
                      ? 'bg-red-700 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buat Pengaduan</span>
                </button>

                <button
                  onClick={() => handleNavClick('cek')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'cek'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Cek Status</span>
                </button>

                <button
                  onClick={() => handleNavClick('panitia')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'panitia'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-red-600" />
                  <span>Susunan Panitia</span>
                </button>

                <div className="h-6 w-px bg-slate-200 mx-2" />

                <button
                  onClick={() => handleNavClick('login')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Login Admin</span>
                </button>
              </>
            ) : (
              // Admin Logged-In Navigation
              <>
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'admin-dashboard'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin-tabel')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'admin-tabel'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Tabel Pengaduan</span>
                  {totalPendingCount > 0 && (
                    <span className="font-mono text-2xs px-1.5 py-0.2 rounded-full bg-red-600 text-white font-bold">
                      {totalPendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('admin-charts')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'admin-charts'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <PieChart className="w-3.5 h-3.5" />
                  <span>Statistik & Analisis</span>
                </button>

                <button
                  onClick={() => handleNavClick('panitia')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'panitia'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-red-600" />
                  <span>Susunan Panitia</span>
                </button>

                {/* Switch to Public Form Shortcut */}
                <button
                  onClick={() => handleNavClick('buat')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-dashed border-slate-300 ml-1"
                  title="Buka form pengaduan kontingen"
                >
                  <span>+ Form Publik</span>
                </button>

                <div className="h-6 w-px bg-slate-200 mx-2" />

                {/* Current Admin Badge & Logout */}
                <div className="flex items-center gap-2 pl-1">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.nama}
                    </div>
                    <div className="text-2xs font-semibold text-red-700">
                      {currentUser.role}
                    </div>
                  </div>

                  <button
                    onClick={onLogout}
                    className="p-2 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer"
                    title="Keluar / Logout Admin"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {currentUser && (
              <span className="text-2xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded">
                {currentUser.role}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {!currentUser ? (
            <>
              <button
                onClick={() => handleNavClick('home')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <Home className="w-4 h-4 text-slate-500" />
                <span>Beranda Utama</span>
              </button>

              <button
                onClick={() => handleNavClick('buat')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 text-left"
              >
                <FileText className="w-4 h-4" />
                <span>[ BUAT PENGADUAN ]</span>
              </button>

              <button
                onClick={() => handleNavClick('cek')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>[ CEK STATUS PENGADUAN ]</span>
              </button>

              <button
                onClick={() => handleNavClick('panitia')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <Users className="w-4 h-4 text-red-600" />
                <span>Susunan Panitia Jumbara 2026</span>
              </button>

              <button
                onClick={() => handleNavClick('login')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200 text-left"
              >
                <Shield className="w-4 h-4 text-red-600" />
                <span>Login Admin Posko</span>
              </button>
            </>
          ) : (
            <>
              <div className="px-3 py-2 bg-slate-50 rounded-lg mb-2 text-xs">
                <span className="text-slate-500 block text-2xs">Masuk sebagai:</span>
                <span className="font-bold text-slate-900">{currentUser.nama}</span>
                <span className="block text-red-700 font-semibold text-2xs">{currentUser.role}</span>
              </div>

              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <LayoutDashboard className="w-4 h-4 text-red-600" />
                <span>Dashboard Admin</span>
              </button>

              <button
                onClick={() => handleNavClick('admin-tabel')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <Table className="w-4 h-4 text-red-600" />
                <span>Tabel Pengaduan</span>
              </button>

              <button
                onClick={() => handleNavClick('admin-charts')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <PieChart className="w-4 h-4 text-red-600" />
                <span>Statistik & Analisis</span>
              </button>

              <button
                onClick={() => handleNavClick('panitia')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left"
              >
                <Users className="w-4 h-4 text-red-600" />
                <span>Susunan Panitia Jumbara 2026</span>
              </button>

              <button
                onClick={() => handleNavClick('buat')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-dashed border-slate-300 text-left"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Buka Form Pengaduan Publik</span>
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 text-left mt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar (Logout)</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Modern Mobile Bottom Navigation Dock (Visible only on smartphone screens < md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-center justify-around">
          {!currentUser ? (
            <>
              {/* Public: Beranda */}
              <button
                onClick={() => handleNavClick('home')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'home' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Home className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Beranda</span>
              </button>

              {/* Public: Cek Status */}
              <button
                onClick={() => handleNavClick('cek')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'cek' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Search className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Cek Tiket</span>
              </button>

              {/* Public: Buat Aduan Center Highlight */}
              <button
                onClick={() => handleNavClick('buat')}
                className="flex flex-col items-center justify-center -mt-4 bg-red-600 text-white rounded-full w-12 h-12 shadow-md hover:bg-red-700 active:scale-95 transition-all"
                title="Buat Pengaduan Baru"
              >
                <FileText className="w-6 h-6" />
                <span className="sr-only">Buat Pengaduan</span>
              </button>

              {/* Public: Susunan Panitia */}
              <button
                onClick={() => handleNavClick('panitia')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'panitia' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Panitia</span>
              </button>

              {/* Public: Login Admin */}
              <button
                onClick={() => handleNavClick('login')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'login' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Shield className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Admin</span>
              </button>
            </>
          ) : (
            <>
              {/* Admin: Dashboard */}
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'admin-dashboard' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Dasbor</span>
              </button>

              {/* Admin: Tabel Pengaduan */}
              <button
                onClick={() => handleNavClick('admin-tabel')}
                className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'admin-tabel' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Table className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Tabel</span>
                {totalPendingCount > 0 && (
                  <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
                )}
              </button>

              {/* Admin: Quick Create Button */}
              <button
                onClick={() => handleNavClick('buat')}
                className="flex flex-col items-center justify-center -mt-4 bg-slate-900 text-white rounded-full w-12 h-12 shadow-md hover:bg-slate-800 active:scale-95 transition-all"
                title="Buka Form Pengaduan"
              >
                <FileText className="w-5 h-5" />
                <span className="sr-only">Form</span>
              </button>

              {/* Admin: Statistik */}
              <button
                onClick={() => handleNavClick('admin-charts')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'admin-charts' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <PieChart className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Grafik</span>
              </button>

              {/* Admin: Panitia */}
              <button
                onClick={() => handleNavClick('panitia')}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[54px] ${
                  currentView === 'panitia' ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-5 h-5 mb-0.5" />
                <span className="text-3xs">Panitia</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
