import React from 'react';
import { PmiLogo } from './PmiLogo';
import { 
  Table, 
  BarChart3, 
  Search, 
  MapPin, 
  Printer, 
  PlusCircle, 
  RotateCcw
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'tabel' | 'statistik' | 'lacak' | 'denah' | 'cetak';
  setActiveTab: (tab: 'tabel' | 'statistik' | 'lacak' | 'denah' | 'cetak') => void;
  onOpenNewModal: () => void;
  totalPengaduan: number;
  pendingCount: number;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewModal,
  totalPengaduan,
  pendingCount,
  onResetData
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner / Event Identification */}
      <div className="bg-red-700 text-white text-xs px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider uppercase">JUMBARA & TEMU KARYA RELAWAN PMI</span>
          <span className="text-red-200 hidden sm:inline">|</span>
          <span className="text-red-100 hidden sm:inline">Posko Layanan Terpadu & Manajemen Pengaduan Kontingen</span>
        </div>
        <div className="flex items-center gap-3 text-red-100 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistem Aktif 24 Jam
          </span>
          <span className="text-red-300">·</span>
          <span>Hotline Posko: 0811-234-5678</span>
        </div>
      </div>

      {/* Main Navigation Bar (Clean 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Zone 1: Brand title with official PMI logo */}
          <div className="flex items-center gap-3 shrink-0">
            <PmiLogo size="md" />
            <div className="hidden lg:block pl-3 border-l border-slate-200">
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                SIM PENGADUAN
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Kegiatan Kepalangmerahan
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links / Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('tabel')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'tabel'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Table className="w-4 h-4 text-red-600" />
              <span>Tabel Pengaduan</span>
              <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                {totalPengaduan}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('statistik')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'statistik'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-red-600" />
              <span>Dashboard & Analisis</span>
            </button>

            <button
              onClick={() => setActiveTab('lacak')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'lacak'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-red-600" />
              <span>Lacak Tiket</span>
              {pendingCount > 0 && (
                <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('denah')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'denah'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Denah Posko</span>
            </button>

            <button
              onClick={() => setActiveTab('cetak')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'cetak'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Printer className="w-4 h-4 text-red-600" />
              <span>Cetak Laporan</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Reset */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onResetData}
              title="Reset ke Contoh Data Awal"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Buat Pengaduan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
