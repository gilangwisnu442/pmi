import React, { useState, useMemo } from 'react';
import { Pengaduan, StatusPengaduan, PrioritasPengaduan, TingkatPMR, TujuanPengaduan } from '../types/pengaduan';
import { User } from '../types/auth';
import { 
  Search, 
  Filter, 
  FileSpreadsheet, 
  Download, 
  Eye, 
  Play, 
  CheckCircle2, 
  Edit3, 
  RotateCcw,
  SlidersHorizontal,
  Calendar,
  MessageCircle,
  Clock,
  LayoutGrid,
  List,
  MapPin,
  User as UserIcon,
  Phone
} from 'lucide-react';
import { 
  getStatusBadgeStyle, 
  getPrioritasBadgeStyle, 
  getTingkatPmrBadgeStyle, 
  formatDateIndo 
} from '../utils/formatters';
import { exportToCSV, exportToExcel } from '../utils/exportData';
import { KATEGORI_BY_TUJUAN } from '../data/categories';
import { generateWhatsAppLink, buildOfficialResponseWhatsAppMessage } from '../utils/whatsapp';

interface AdminTableProps {
  data: Pengaduan[];
  currentUser: User;
  onOpenDetailModal: (item: Pengaduan) => void;
  onQuickUpdateStatus: (ticketId: string, status: StatusPengaduan) => void;
  initialStatusFilter?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  data,
  currentUser,
  onOpenDetailModal,
  onQuickUpdateStatus,
  initialStatusFilter = 'ALL'
}) => {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [filterTingkat, setFilterTingkat] = useState<string>('ALL');
  const [filterTujuan, setFilterTujuan] = useState<string>('ALL');
  const [filterKategori, setFilterKategori] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>(initialStatusFilter);
  const [filterPrioritas, setFilterPrioritas] = useState<string>('ALL');
  const [filterTanggal, setFilterTanggal] = useState<string>('');

  // Role Scoped Base Data
  const baseData = useMemo(() => {
    if (currentUser.role === 'SUPER ADMIN') {
      return data;
    }
    return data.filter(d => d.tujuan_pengaduan === currentUser.bidang);
  }, [data, currentUser]);

  // Categories list based on selected tujuan or all
  const availableCategories = useMemo(() => {
    if (filterTujuan !== 'ALL' && filterTujuan in KATEGORI_BY_TUJUAN) {
      return KATEGORI_BY_TUJUAN[filterTujuan as TujuanPengaduan];
    }
    if (currentUser.role !== 'SUPER ADMIN' && currentUser.bidang in KATEGORI_BY_TUJUAN) {
      return KATEGORI_BY_TUJUAN[currentUser.bidang as TujuanPengaduan];
    }
    // Return all combined unique categories
    return Array.from(new Set(Object.values(KATEGORI_BY_TUJUAN).flat()));
  }, [filterTujuan, currentUser]);

  // Filter application
  const filteredData = useMemo(() => {
    return baseData.filter((item) => {
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchId = item.id_pengaduan.toLowerCase().includes(q);
        const matchKontingen = item.nama_kontingen.toLowerCase().includes(q);
        const matchPelapor = item.nama_pelapor.toLowerCase().includes(q);
        const matchJudul = item.judul_pengaduan.toLowerCase().includes(q);
        const matchDetail = item.detail_pengaduan.toLowerCase().includes(q);
        const matchLokasi = item.lokasi.toLowerCase().includes(q);
        const matchPic = item.pic.toLowerCase().includes(q);
        if (!matchId && !matchKontingen && !matchPelapor && !matchJudul && !matchDetail && !matchLokasi && !matchPic) {
          return false;
        }
      }

      // Filter Tingkat
      if (filterTingkat !== 'ALL' && item.tingkat_pmr !== filterTingkat) return false;

      // Filter Tujuan (only if super admin)
      if (currentUser.role === 'SUPER ADMIN' && filterTujuan !== 'ALL' && item.tujuan_pengaduan !== filterTujuan) {
        return false;
      }

      // Filter Kategori
      if (filterKategori !== 'ALL' && item.kategori !== filterKategori) return false;

      // Filter Status
      if (filterStatus === 'DARURAT') {
        if (item.prioritas !== 'Darurat') return false;
      } else if (filterStatus !== 'ALL' && item.status !== filterStatus) {
        return false;
      }

      // Filter Prioritas
      if (filterPrioritas !== 'ALL' && item.prioritas !== filterPrioritas) return false;

      // Filter Tanggal
      if (filterTanggal && item.tanggal !== filterTanggal) return false;

      return true;
    });
  }, [baseData, searchTerm, filterTingkat, filterTujuan, filterKategori, filterStatus, filterPrioritas, filterTanggal, currentUser]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterTingkat('ALL');
    setFilterTujuan('ALL');
    setFilterKategori('ALL');
    setFilterStatus('ALL');
    setFilterPrioritas('ALL');
    setFilterTanggal('');
  };

  const activeFiltersCount = [
    searchTerm.trim().length > 0,
    filterTingkat !== 'ALL',
    filterTujuan !== 'ALL',
    filterKategori !== 'ALL',
    filterStatus !== 'ALL',
    filterPrioritas !== 'ALL',
    Boolean(filterTanggal)
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      
      {/* Search & Actions Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID tiket, kontingen, pelapor, lokasi, PIC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-red-500 text-slate-900 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportToExcel(filteredData)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Export data sesuai filter ke format Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>[ EXPORT EXCEL ]</span>
            </button>

            <button
              onClick={() => exportToCSV(filteredData)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Export data sesuai filter ke format CSV"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>[ EXPORT CSV ]</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-bold shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Data:</span>
          </div>

          {/* Filter Tingkat */}
          <select
            value={filterTingkat}
            onChange={(e) => setFilterTingkat(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-1 focus:ring-red-500"
          >
            <option value="ALL">Semua Tingkat</option>
            <option value="Mula (SD)">Mula (SD)</option>
            <option value="Madya (SMP)">Madya (SMP)</option>
            <option value="Wira (SMA/SMK)">Wira (SMA/SMK)</option>
          </select>

          {/* Filter Tujuan (Visible for Super Admin) */}
          {currentUser.role === 'SUPER ADMIN' && (
            <select
              value={filterTujuan}
              onChange={(e) => {
                setFilterTujuan(e.target.value);
                setFilterKategori('ALL');
              }}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-1 focus:ring-red-500"
            >
              <option value="ALL">Semua Bidang</option>
              <option value="SEKRETARIAT">Sekretariat</option>
              <option value="BIDANG 1">Bidang 1 (Kegiatan)</option>
              <option value="BIDANG 2">Bidang 2 (Sarpras & Medis)</option>
              <option value="BIDANG 3 - PERLOMBAAN">Bidang 3 (Lomba)</option>
            </select>
          )}

          {/* Filter Kategori */}
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-1 focus:ring-red-500 max-w-[180px] truncate"
          >
            <option value="ALL">Semua Kategori</option>
            {availableCategories.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>

          {/* Filter Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-1 focus:ring-red-500"
          >
            <option value="ALL">Semua Status</option>
            <option value="BARU">BARU</option>
            <option value="DIVERIFIKASI">DIVERIFIKASI</option>
            <option value="DIPROSES">DIPROSES</option>
            <option value="MENUNGGU">MENUNGGU</option>
            <option value="SELESAI">SELESAI</option>
            <option value="DITUTUP">DITUTUP</option>
          </select>

          {/* Filter Prioritas */}
          <select
            value={filterPrioritas}
            onChange={(e) => setFilterPrioritas(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-1 focus:ring-red-500"
          >
            <option value="ALL">Semua Prioritas</option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
            <option value="Darurat">Darurat</option>
          </select>

          {/* Filter Tanggal */}
          <input
            type="date"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-xs"
          />

          {/* Reset Filters Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border border-red-200 transition-colors ml-auto font-bold text-2xs cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filter ({activeFiltersCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Table & Cards Container */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xs overflow-hidden">
        
        {/* Table Summary Header with Mobile/Desktop View Switcher */}
        <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Rekapitulasi Pengaduan Jumbara 2026
            </span>
            <span className="font-mono text-2xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {filteredData.length} Tiket
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Cards vs Table */}
            <div className="inline-flex items-center bg-slate-200/80 p-0.5 rounded-xl text-2xs font-bold">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-red-700 shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilan Kartu Cepat Smartphone"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Mode Kartu</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-red-700 shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilan Tabel Meja Komprehensif"
              >
                <List className="w-3.5 h-3.5" />
                <span>Tabel Meja</span>
              </button>
            </div>

            <div className="text-2xs text-slate-400 hidden sm:block">
              Akses: <span className="font-semibold text-slate-600">{currentUser.role}</span>
            </div>
          </div>
        </div>

        {/* VIEW A: MODE KARTU CEPAT (Sangat Optimal di Layar Smartphone) */}
        {viewMode === 'cards' ? (
          <div className="p-3 sm:p-5 bg-slate-50/60">
            {filteredData.length === 0 ? (
              <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-semibold text-slate-600">Tidak ada pengaduan yang sesuai filter.</p>
                <button
                  onClick={resetFilters}
                  className="text-xs text-red-600 underline font-medium hover:text-red-700 mt-1 cursor-pointer"
                >
                  Reset filter pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredData.map((item) => (
                  <div
                    key={item.id_pengaduan}
                    className="bg-white border border-slate-200 hover:border-red-300 rounded-2xl p-4 shadow-2xs transition-all space-y-3 cursor-pointer group active:scale-[0.99]"
                    onClick={() => onOpenDetailModal(item)}
                  >
                    {/* Card Top: ID Tiket, Jam & Badges */}
                    <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <span className="font-mono font-black text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md inline-block">
                          {item.id_pengaduan}
                        </span>
                        <div className="text-3xs text-slate-400 font-mono mt-0.5">
                          {item.tanggal} · {item.jam} WIB
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-3xs font-bold border ${getPrioritasBadgeStyle(item.prioritas)}`}>
                          {item.prioritas}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-3xs font-bold border ${getStatusBadgeStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Card Body: Judul & Kontingen */}
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
                        {item.judul_pengaduan}
                      </h4>
                      <p className="text-2xs text-slate-500 line-clamp-2">
                        {item.detail_pengaduan}
                      </p>
                    </div>

                    {/* Kontingen, Pelapor & Lokasi */}
                    <div className="bg-slate-50 rounded-xl p-2.5 text-2xs space-y-1.5 border border-slate-100">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-800 truncate" title={item.nama_kontingen}>
                          {item.nama_kontingen}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-3xs font-bold border shrink-0 ${getTingkatPmrBadgeStyle(item.tingkat_pmr)}`}>
                          {item.tingkat_pmr}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-500 text-3xs">
                        <span className="truncate">Pelapor: <b className="text-slate-700">{item.nama_pelapor}</b></span>
                        <span className="text-red-700 font-bold shrink-0">{item.tujuan_pengaduan}</span>
                      </div>

                      {item.lokasi && (
                        <div className="flex items-center gap-1 text-3xs text-slate-500 truncate pt-1 border-t border-slate-200/60">
                          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                          <span className="truncate">{item.lokasi}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-3xs text-slate-500 pt-0.5">
                        <span className="truncate text-slate-400">Kategori: <b className="text-slate-700">{item.kategori}</b></span>
                        {item.pic ? (
                          <span className="text-slate-700 font-semibold truncate max-w-[130px]">PIC: {item.pic}</span>
                        ) : (
                          <span className="text-slate-400 italic">Belum ada PIC</span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Quick Action Buttons (1-tap touch friendly) */}
                    <div 
                      className="pt-1 flex items-center justify-between gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* WhatsApp Button */}
                      {item.no_whatsapp && (
                        <a
                          href={generateWhatsAppLink(
                            item.no_whatsapp,
                            `Halo Kak *${item.nama_pelapor}* (${item.nama_kontingen}), kami dari Posko Jumbara Banyumas 2026 menindaklanjuti tiket aduan *${item.id_pengaduan}* terkait *${item.judul_pengaduan}*.`
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-3xs font-bold transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Chat WA</span>
                        </a>
                      )}

                      {/* Quick Status Button */}
                      {(item.status === 'BARU' || item.status === 'DIVERIFIKASI') && (
                        <button
                          onClick={() => onQuickUpdateStatus(item.id_pengaduan, 'DIPROSES')}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-3xs font-bold transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3 text-amber-600" />
                          <span>Proses</span>
                        </button>
                      )}

                      {(item.status === 'DIPROSES' || item.status === 'MENUNGGU') && (
                        <button
                          onClick={() => onQuickUpdateStatus(item.id_pengaduan, 'SELESAI')}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-3xs font-bold transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Selesai</span>
                        </button>
                      )}

                      {/* Detail Edit Button */}
                      <button
                        onClick={() => onOpenDetailModal(item)}
                        className="inline-flex items-center justify-center gap-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-3xs font-bold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Detail</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* VIEW B: SCROLLABLE MASTER TABLE */
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold select-none">
                  <th className="px-3.5 py-3 whitespace-nowrap">ID TIKET</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">TANGGAL</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">KONTINGEN</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">TINGKAT</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">TUJUAN</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">KATEGORI</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">PRIORITAS</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">STATUS</th>
                  <th className="px-3.5 py-3 whitespace-nowrap">PIC</th>
                  <th className="px-3.5 py-3 whitespace-nowrap text-right sticky right-0 bg-slate-100 shadow-xs">
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400">
                      <p className="text-sm font-semibold text-slate-600">Tidak ada pengaduan yang sesuai filter.</p>
                      <button
                        onClick={resetFilters}
                        className="text-xs text-red-600 underline font-medium hover:text-red-700 mt-1 cursor-pointer"
                      >
                        Reset filter pencarian
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id_pengaduan}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => onOpenDetailModal(item)}
                    >
                      {/* ID Tiket */}
                      <td className="px-3.5 py-3 font-mono font-black text-red-600 whitespace-nowrap">
                        {item.id_pengaduan}
                      </td>

                      {/* Tanggal */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-600">
                        <div className="font-semibold text-slate-800">{item.tanggal}</div>
                        <div className="text-2xs text-slate-400 font-mono">{item.jam} WIB</div>
                      </td>

                      {/* Kontingen */}
                      <td className="px-3.5 py-3 font-bold text-slate-900 max-w-[200px] truncate" title={item.nama_kontingen}>
                        {item.nama_kontingen}
                      </td>

                      {/* Tingkat */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-2xs font-bold border ${getTingkatPmrBadgeStyle(item.tingkat_pmr)}`}>
                          {item.tingkat_pmr}
                        </span>
                      </td>

                      {/* Tujuan */}
                      <td className="px-3.5 py-3 whitespace-nowrap font-bold text-red-700">
                        {item.tujuan_pengaduan}
                      </td>

                      {/* Kategori */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-700 font-medium">
                        {item.kategori}
                      </td>

                      {/* Prioritas */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-2xs border ${getPrioritasBadgeStyle(item.prioritas)}`}>
                          {item.prioritas}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-2xs border ${getStatusBadgeStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>

                      {/* PIC */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-800 font-medium max-w-[160px] truncate" title={item.pic}>
                        {item.pic ? item.pic : <span className="text-slate-400 italic">Belum ada</span>}
                      </td>

                      {/* Aksi (Lihat, Proses, Selesaikan) */}
                      <td 
                        className="px-3.5 py-3 text-right whitespace-nowrap sticky right-0 bg-white/95 group-hover:bg-slate-50/95 shadow-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          
                          {/* Tombol Lihat */}
                          <button
                            onClick={() => onOpenDetailModal(item)}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-2xs font-bold transition-colors cursor-pointer"
                            title="Lihat rincian lengkap & update data"
                          >
                            Lihat
                          </button>

                          {/* Tombol Proses (if BARU or DIVERIFIKASI) */}
                          {(item.status === 'BARU' || item.status === 'DIVERIFIKASI') && (
                            <button
                              onClick={() => onQuickUpdateStatus(item.id_pengaduan, 'DIPROSES')}
                              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-2xs font-bold transition-colors cursor-pointer"
                              title="Tandai sedang diproses PIC"
                            >
                              Proses
                            </button>
                          )}

                          {/* Tombol Selesaikan (if DIPROSES or MENUNGGU) */}
                          {(item.status === 'DIPROSES' || item.status === 'MENUNGGU') && (
                            <button
                              onClick={() => onQuickUpdateStatus(item.id_pengaduan, 'SELESAI')}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-2xs font-bold transition-colors cursor-pointer"
                              title="Tandai pengaduan telah selesai ditangani"
                            >
                              Selesaikan
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-2xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>Menampilkan {filteredData.length} dari total {baseData.length} pengaduan</span>
          <span>Sistem Informasi Jumbara PMR PMI Kab. Banyumas 2026</span>
        </div>

      </div>

    </div>
  );
};
