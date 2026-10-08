import React from 'react';
import { Pengaduan } from '../types/pengaduan';
import { User } from '../types/auth';
import { 
  Inbox, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Users, 
  Flame, 
  ArrowRight, 
  TrendingUp, 
  Building, 
  Activity, 
  Trophy, 
  FileSpreadsheet, 
  PieChart as PieChartIcon,
  Printer,
  Layers
} from 'lucide-react';
import { getStatusBadgeStyle, getPrioritasBadgeStyle, getTingkatPmrBadgeStyle, formatDateIndo } from '../utils/formatters';
import { PmiLogo } from './PmiLogo';

interface AdminDashboardProps {
  data: Pengaduan[];
  currentUser: User;
  onNavigateToTable: (statusFilter?: string) => void;
  onNavigateToCharts: () => void;
  onOpenDetailModal: (item: Pengaduan) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  currentUser,
  onNavigateToTable,
  onNavigateToCharts,
  onOpenDetailModal
}) => {
  // Helper for official time-aware & role-tailored greetings
  const getRoleGreeting = (user: User) => {
    const hour = new Date().getHours();
    let salamWaktu = 'Selamat pagi';
    if (hour >= 11 && hour < 15) salamWaktu = 'Selamat siang';
    else if (hour >= 15 && hour < 18) salamWaktu = 'Selamat sore';
    else if (hour >= 18 || hour < 4) salamWaktu = 'Selamat malam';

    switch (user.role) {
      case 'SEKRETARIAT':
        return {
          salamWaktu: `${salamWaktu}, selamat bertugas`,
          namaPetugas: 'Kak Shinta Oktifianingrum, S.Pd',
          jabatanResmi: 'Sekretaris Panitia Pelaksana (OC)',
          tugasFokus: 'Fokus koordinasi: Registrasi kontingen, validasi data peserta & pembina, pencetakan ID card, surat mandat, administrasi posko, dan rekap pendataan Jumbara 2026.',
          badge: 'SEKRETARIAT POSKO'
        };
      case 'BIDANG 1':
        return {
          salamWaktu: `${salamWaktu}, selamat bertugas`,
          namaPetugas: 'Kak Dimas Saputra',
          jabatanResmi: 'Ketua Bidang I (Kegiatan)',
          tugasFokus: 'Fokus koordinasi: Kelancaran teknis dan jadwal kegiatan, Sub Bidang Jumpa, Bakti, Gembira, Temu Karya, serta komunikasi Forum Palang Merah Remaja Indonesia (Forpis).',
          badge: 'BIDANG I - KEGIATAN'
        };
      case 'BIDANG 2':
        return {
          salamWaktu: `${salamWaktu}, selamat bertugas`,
          namaPetugas: 'Kak Nur ‘Afiifah',
          jabatanResmi: 'Ketua Bidang II (Sarpras & Medis)',
          tugasFokus: 'Fokus koordinasi: Pasokan konsumsi dapur umum, kesiapsiagaan posko kesehatan/medis, fasilitas tenda kavling, MCK & air bersih, perlengkapan, serta ketertiban pamdal.',
          badge: 'BIDANG II - SARPRAS & MEDIS'
        };
      case 'BIDANG 3':
        return {
          salamWaktu: `${salamWaktu}, selamat bertugas`,
          namaPetugas: 'Kak Nida Lutfiyah',
          jabatanResmi: 'Ketua Bidang III (Perlombaan)',
          tugasFokus: 'Fokus koordinasi: Kelancaran cabang uji lomba (PP, PK, PRS, DDS, ASB, Kepemimpinan, Game, LCC), dewan juri, teknis arena, rekap nilai, serta penanganan nota protes.',
          badge: 'BIDANG III - PERLOMBAAN'
        };
      case 'SUPER ADMIN':
      default:
        return {
          salamWaktu: `${salamWaktu}, selamat bertugas`,
          namaPetugas: user.nama || 'Administrator Posko Terpadu',
          jabatanResmi: 'Koordinator Posko Layanan Terpadu Jumbara 2026',
          tugasFokus: 'Fokus koordinasi: Pengawasan komprehensif seluruh tiket masuk, koordinasi lintas bidang, respons pengaduan darurat, dan jaminan mutu pelayanan kontingen Mula, Madya, dan Wira.',
          badge: 'POSKO TERPADU KABUPATEN'
        };
    }
  };

  const roleGreeting = getRoleGreeting(currentUser);

  // Filter data according to user's role
  const roleData = React.useMemo(() => {
    if (currentUser.role === 'SUPER ADMIN') {
      return data;
    }
    return data.filter(d => d.tujuan_pengaduan === currentUser.bidang);
  }, [data, currentUser]);

  // Statistical calculations
  const total = roleData.length;
  const baru = roleData.filter(d => d.status === 'BARU').length;
  const diproses = roleData.filter(d => d.status === 'DIPROSES' || d.status === 'DIVERIFIKASI' || d.status === 'MENUNGGU').length;
  const selesai = roleData.filter(d => d.status === 'SELESAI' || d.status === 'DITUTUP').length;
  const darurat = roleData.filter(d => d.prioritas === 'Darurat' && d.status !== 'SELESAI' && d.status !== 'DITUTUP').length;

  const pctSelesai = total > 0 ? Math.round((selesai / total) * 100) : 0;
  const pctDiproses = total > 0 ? Math.round((diproses / total) * 100) : 0;

  // 1. Breakdown by Tingkat PMR
  const countMula = roleData.filter(d => d.tingkat_pmr === 'Mula (SD)').length;
  const countMadya = roleData.filter(d => d.tingkat_pmr === 'Madya (SMP)').length;
  const countWira = roleData.filter(d => d.tingkat_pmr === 'Wira (SMA/SMK)').length;

  // 2. Breakdown by Tujuan
  const countSekretariat = roleData.filter(d => d.tujuan_pengaduan === 'SEKRETARIAT').length;
  const countBidang1 = roleData.filter(d => d.tujuan_pengaduan === 'BIDANG 1').length;
  const countBidang2 = roleData.filter(d => d.tujuan_pengaduan === 'BIDANG 2').length;
  const countBidang3 = roleData.filter(d => d.tujuan_pengaduan === 'BIDANG 3 - PERLOMBAAN').length;

  // 3. Breakdown by Kategori (Top 6)
  const kategoriMap: Record<string, number> = {};
  roleData.forEach(d => {
    kategoriMap[d.kategori] = (kategoriMap[d.kategori] || 0) + 1;
  });
  const sortedKategori = Object.entries(kategoriMap).sort((a, b) => b[1] - a[1]);
  const topKategori = sortedKategori[0] || ['-', 0];
  const top6Kategori = sortedKategori.slice(0, 6);

  // 4. Breakdown by Status
  const statusCounts = [
    { label: 'BARU', count: baru, color: 'bg-blue-500' },
    { label: 'DIVERIFIKASI', count: roleData.filter(d => d.status === 'DIVERIFIKASI').length, color: 'bg-indigo-500' },
    { label: 'DIPROSES', count: roleData.filter(d => d.status === 'DIPROSES').length, color: 'bg-amber-500' },
    { label: 'MENUNGGU', count: roleData.filter(d => d.status === 'MENUNGGU').length, color: 'bg-yellow-500' },
    { label: 'SELESAI', count: roleData.filter(d => d.status === 'SELESAI').length, color: 'bg-emerald-500' },
    { label: 'DITUTUP', count: roleData.filter(d => d.status === 'DITUTUP').length, color: 'bg-slate-500' },
  ];

  // 5. Breakdown by Prioritas
  const prioritasMap: Record<string, number> = {};
  roleData.forEach(d => {
    prioritasMap[d.prioritas] = (prioritasMap[d.prioritas] || 0) + 1;
  });
  const topPrioritas = Object.entries(prioritasMap).sort((a, b) => b[1] - a[1])[0] || ['-', 0];

  const prioritasCounts = [
    { label: 'Darurat', count: roleData.filter(d => d.prioritas === 'Darurat').length, color: 'bg-red-600', barBg: 'bg-red-100' },
    { label: 'Tinggi', count: roleData.filter(d => d.prioritas === 'Tinggi').length, color: 'bg-rose-500', barBg: 'bg-rose-100' },
    { label: 'Sedang', count: roleData.filter(d => d.prioritas === 'Sedang').length, color: 'bg-amber-500', barBg: 'bg-amber-100' },
    { label: 'Rendah', count: roleData.filter(d => d.prioritas === 'Rendah').length, color: 'bg-slate-400', barBg: 'bg-slate-100' },
  ];

  // Latest 5 complaints (for on-screen preview, hidden on print)
  const latestFive = [...roleData].slice(0, 5);

  const handlePrint = () => {
    window.print();
  };

  const currentDateIndo = formatDateIndo(new Date().toISOString().split('T')[0]);
  const currentTime = `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')} WIB`;

  return (
    <div className="space-y-6">
      
      {/* Official Print Letterhead for physical record keeping (Visible only in print) */}
      <div className="print-only hidden pb-4 mb-4 border-b-2 border-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PmiLogo size="md" />
            <div>
              <h1 className="text-sm font-black uppercase tracking-tight text-slate-900 leading-tight">
                PALANG MERAH INDONESIA KABUPATEN BANYUMAS
              </h1>
              <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800 leading-tight mt-0.5">
                PANITIA PELAKSANA JUMBARA PMR 2026 · POSKO LAYANAN PENGADUAN KONTINGEN
              </h2>
              <p className="text-2xs text-slate-600 font-medium mt-0.5">
                Laporan Statistik, Analisis & Rekapitulasi Fisik (Tingkat Mula • Madya • Wira)
              </p>
            </div>
          </div>
          <div className="text-right text-2xs text-slate-600 font-mono">
            <div className="font-bold text-slate-900">ARSIP FISIK POSKO</div>
            <div>Cetak: {currentDateIndo} {currentTime}</div>
            <div>Petugas: {currentUser.nama}</div>
            <div>Hak Akses: {currentUser.role} ({currentUser.bidang})</div>
          </div>
        </div>
      </div>

      {/* Top Welcome Card (On screen) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xs font-extrabold font-mono px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
              {roleGreeting.badge}
            </span>
            <span className="text-2xs text-slate-300">·</span>
            <span className="text-2xs text-slate-500 font-semibold">
              Cakupan: {currentUser.bidang}
            </span>
            <span className="text-2xs text-slate-300">·</span>
            <span className="text-2xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
              Status Posko: Aktif
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {roleGreeting.salamWaktu},{' '}
            <span className="text-red-700 underline decoration-red-200 decoration-wavy decoration-2">
              {roleGreeting.namaPetugas}
            </span>
          </h2>

          <div className="text-2xs sm:text-xs text-slate-500 font-semibold">
            {roleGreeting.jabatanResmi} · Jumbara PMR XXXII PMI Kab. Banyumas 2026
          </div>

          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed pt-0.5">
            {roleGreeting.tugasFokus}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title="Cetak Dasbor Statistik & Grafik untuk Arsip Fisik"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Cetak Dasbor (Print)</span>
          </button>

          <button
            onClick={() => onNavigateToTable()}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            Buka Tabel Lengkap
          </button>
          
          <button
            onClick={onNavigateToCharts}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all border border-slate-200 cursor-pointer"
            title="Lihat Grafik Analisis Lengkap"
          >
            <PieChartIcon className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* 5 Primary Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 stat-card break-inside-avoid">
        
        {/* TOTAL PENGADUAN */}
        <div 
          onClick={() => onNavigateToTable('ALL')}
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-2xs font-bold uppercase tracking-wider">Total Pengaduan</span>
            <Inbox className="w-4 h-4 text-slate-400 no-print" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900 tabular-nums">{total}</div>
          <div className="text-2xs text-slate-400 mt-1">Seluruh tiket masuk</div>
        </div>

        {/* PENGADUAN BARU */}
        <div 
          onClick={() => onNavigateToTable('BARU')}
          className="bg-white border border-blue-200 rounded-2xl p-4 shadow-2xs cursor-pointer hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-2xs font-bold uppercase tracking-wider">Pengaduan Baru</span>
            <Clock className="w-4 h-4 text-blue-500 no-print" />
          </div>
          <div className="text-3xl font-black font-mono text-blue-700 tabular-nums">{baru}</div>
          <div className="text-2xs text-blue-600 font-medium mt-1">Perlu diverifikasi</div>
        </div>

        {/* SEDANG DIPROSES */}
        <div 
          onClick={() => onNavigateToTable('DIPROSES')}
          className="bg-white border border-amber-200 rounded-2xl p-4 shadow-2xs cursor-pointer hover:border-amber-300 transition-colors"
        >
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-2xs font-bold uppercase tracking-wider">Sedang Diproses</span>
            <Users className="w-4 h-4 text-amber-500 no-print" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-700 tabular-nums">{diproses}</div>
          <div className="text-2xs text-amber-600 font-medium mt-1">{pctDiproses}% dalam penanganan</div>
        </div>

        {/* SELESAI */}
        <div 
          onClick={() => onNavigateToTable('SELESAI')}
          className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-2xs font-bold uppercase tracking-wider">Selesai</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 no-print" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-700 tabular-nums">{selesai}</div>
          <div className="text-2xs text-emerald-600 font-medium mt-1">{pctSelesai}% tuntas terselesaikan</div>
        </div>

        {/* PENGADUAN DARURAT */}
        <div 
          onClick={() => onNavigateToTable('DARURAT')}
          className="bg-white border border-red-300 rounded-2xl p-4 shadow-2xs cursor-pointer hover:border-red-400 transition-colors col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-red-700 mb-2">
            <span className="text-2xs font-bold uppercase tracking-wider">Pengaduan Darurat</span>
            <Flame className="w-4 h-4 text-red-600 no-print" />
          </div>
          <div className="text-3xl font-black font-mono text-red-700 tabular-nums">{darurat}</div>
          <div className="text-2xs text-red-600 font-bold mt-1">Urgensi kritis lapangan</div>
        </div>

      </div>

      {/* SLA & Analytical Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 stat-card break-inside-avoid">
        
        {/* Rata-rata Waktu Respons */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Rata-rata Waktu Respons
          </span>
          <div className="text-xl font-bold font-mono text-slate-800">
            ~12 Menit
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">Dari submit hingga disposisi PIC</p>
        </div>

        {/* Rata-rata Waktu Penyelesaian */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Rata-rata Waktu Penyelesaian
          </span>
          <div className="text-xl font-bold font-mono text-slate-800">
            ~34 Menit
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">Penanganan fisik tuntas di lokasi</p>
        </div>

        {/* Kategori Terbanyak */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Kategori Terbanyak
          </span>
          <div className="text-sm font-bold text-slate-800 truncate" title={topKategori[0]}>
            {topKategori[0]}
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">{topKategori[1]} laporan tercatat</p>
        </div>

        {/* Prioritas Terbanyak */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Prioritas Terbanyak
          </span>
          <div className="text-sm font-bold text-slate-800">
            Prioritas {topPrioritas[0]}
          </div>
          <p className="text-2xs text-slate-500 mt-0.5">{topPrioritas[1]} laporan kontingen</p>
        </div>

      </div>

      {/* CHARTS SECTION: Both on screen and in print */}
      <div className="space-y-6">
        
        {/* Chart Row 1: Tingkat PMR & Bidang Tujuan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 chart-block break-inside-avoid">
          
          {/* Chart 1: Tingkat PMR */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600 no-print" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Distribusi Pengaduan Berdasarkan Tingkat PMR
                </h3>
              </div>
              <span className="text-2xs text-slate-400 font-mono">Total {total}</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Mula (SD)', count: countMula, color: 'bg-emerald-500', barBg: 'bg-emerald-100' },
                { label: 'Madya (SMP)', count: countMadya, color: 'bg-sky-500', barBg: 'bg-sky-100' },
                { label: 'Wira (SMA/SMK)', count: countWira, color: 'bg-amber-500', barBg: 'bg-amber-100' },
              ].map((item, idx) => {
                const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="font-mono text-slate-600 font-bold">
                        {item.count} tiket ({pct}%)
                      </span>
                    </div>
                    <div className={`w-full h-2.5 rounded-full ${item.barBg} overflow-hidden`}>
                      <div 
                        className={`h-full rounded-full ${item.color} transition-all`} 
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Tujuan Pengaduan */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-red-600 no-print" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Distribusi Pengaduan Berdasarkan Bidang Tujuan
                </h3>
              </div>
              <span className="text-2xs text-slate-400 font-mono">4 Bidang Posko</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'SEKRETARIAT', count: countSekretariat, color: 'bg-blue-500', barBg: 'bg-blue-100' },
                { label: 'BIDANG 1 - KEGIATAN', count: countBidang1, color: 'bg-amber-500', barBg: 'bg-amber-100' },
                { label: 'BIDANG 2 - SARPRAS & MEDIS', count: countBidang2, color: 'bg-emerald-500', barBg: 'bg-emerald-100' },
                { label: 'BIDANG 3 - PERLOMBAAN', count: countBidang3, color: 'bg-rose-500', barBg: 'bg-rose-100' },
              ].map((item, idx) => {
                const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="font-mono text-slate-600 font-bold">
                        {item.count} tiket ({pct}%)
                      </span>
                    </div>
                    <div className={`w-full h-2.5 rounded-full ${item.barBg} overflow-hidden`}>
                      <div 
                        className={`h-full rounded-full ${item.color} transition-all`} 
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Chart Row 2: Kategori & Status (included in dashboard & printout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 chart-block break-inside-avoid">
          
          {/* Chart 3: Kategori Terbanyak */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-600 no-print" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Distribusi Kategori Pengaduan Terbanyak
                </h3>
              </div>
              <span className="text-2xs text-slate-400 font-mono">Top 6 Kategori</span>
            </div>

            <div className="space-y-2.5">
              {top6Kategori.map(([kat, count], idx) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={kat} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700 truncate max-w-[220px]">{idx + 1}. {kat}</span>
                      <span className="font-mono text-slate-600 font-bold">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-red-600" 
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 4: Status Penanganan */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 no-print" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Distribusi Status Penanganan Pengaduan
                </h3>
              </div>
              <span className="text-2xs text-slate-400 font-mono">6 Tahapan Status</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {statusCounts.map((item) => {
                const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                return (
                  <div key={item.label} className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="text-2xs font-bold uppercase text-slate-400 block">{item.label}</span>
                    <div className="text-lg font-black font-mono text-slate-800 my-0.5">{item.count}</div>
                    <span className="text-2xs text-slate-500 font-semibold">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Chart Row 3: Prioritas (Full-width card, included in dashboard & printout) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4 chart-block break-inside-avoid">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-600 no-print" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Distribusi Tingkat Prioritas Pengaduan
              </h3>
            </div>
            <span className="text-2xs text-slate-400">Parameter Urgensi Lapangan</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {prioritasCounts.map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.label} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    <span className="text-2xs font-mono font-bold text-slate-500">{pct}%</span>
                  </div>
                  <div className="text-xl font-black font-mono text-slate-900">
                    {item.count} <span className="text-xs font-normal text-slate-400">tiket</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${item.barBg} overflow-hidden`}>
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Official Signatures for Physical Record Keeping (Print Only) */}
      <div className="print-only hidden pt-8 mt-6 border-t border-slate-300 break-inside-avoid">
        <div className="grid grid-cols-2 gap-8 text-center text-xs">
          <div>
            <p className="text-slate-600">Mengetahui,</p>
            <p className="font-bold text-slate-900 mt-0.5">Ketua Umum Panitia Pelaksana (OC)</p>
            <div className="h-16"></div>
            <p className="font-bold text-slate-900 underline">Eka Noviyanti, S.Pd.</p>
            <p className="text-2xs text-slate-500">Jumbara PMR XXXII PMI Kab. Banyumas 2026</p>
          </div>

          <div>
            <p className="text-slate-600">Bumi Perkemahan, {currentDateIndo}</p>
            <p className="font-bold text-slate-900 mt-0.5">{roleGreeting.jabatanResmi}</p>
            <div className="h-16"></div>
            <p className="font-bold text-slate-900 underline">{roleGreeting.namaPetugas}</p>
            <p className="text-2xs text-slate-500">{currentUser.role} · Posko Pengaduan</p>
          </div>
        </div>
      </div>

      {/* Latest Complaints Quick Preview (Screen Only, Hidden in Print) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4 no-print">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Pengaduan Terkini ({currentUser.role === 'SUPER ADMIN' ? 'Semua Bidang' : currentUser.bidang})
            </h3>
            <p className="text-2xs text-slate-400">5 data terbaru yang masuk</p>
          </div>
          <button
            onClick={() => onNavigateToTable()}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {latestFive.map((item) => (
            <div 
              key={item.id_pengaduan}
              onClick={() => onOpenDetailModal(item)}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded shrink-0">
                  {item.id_pengaduan}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.judul_pengaduan}
                  </h4>
                  <div className="flex items-center gap-2 text-2xs text-slate-500 mt-0.5">
                    <span>{item.nama_kontingen}</span>
                    <span>·</span>
                    <span className="text-red-700 font-semibold">{item.tujuan_pengaduan}</span>
                    <span>·</span>
                    <span>{item.kategori}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className={`px-2 py-0.5 rounded text-2xs border ${getPrioritasBadgeStyle(item.prioritas)}`}>
                  {item.prioritas}
                </span>
                <span className={`px-2 py-0.5 rounded text-2xs border ${getStatusBadgeStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
