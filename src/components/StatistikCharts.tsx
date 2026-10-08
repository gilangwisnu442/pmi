import React from 'react';
import { Pengaduan } from '../types/pengaduan';
import { User } from '../types/auth';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  Building, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft,
  Flame,
  Activity,
  Award,
  Clock
} from 'lucide-react';
import { getStatusBadgeStyle, getPrioritasBadgeStyle } from '../utils/formatters';

interface StatistikChartsProps {
  data: Pengaduan[];
  currentUser: User;
  onBackToDashboard: () => void;
}

export const StatistikCharts: React.FC<StatistikChartsProps> = ({
  data,
  currentUser,
  onBackToDashboard
}) => {
  // Scoped data based on role
  const roleData = React.useMemo(() => {
    if (currentUser.role === 'SUPER ADMIN') {
      return data;
    }
    return data.filter(d => d.tujuan_pengaduan === currentUser.bidang);
  }, [data, currentUser]);

  const total = roleData.length;

  // 1. Berdasarkan Tingkat PMR
  const pmrData = [
    { label: 'Mula (SD)', count: roleData.filter(d => d.tingkat_pmr === 'Mula (SD)').length, color: 'bg-emerald-500', barBg: 'bg-emerald-100' },
    { label: 'Madya (SMP)', count: roleData.filter(d => d.tingkat_pmr === 'Madya (SMP)').length, color: 'bg-sky-500', barBg: 'bg-sky-100' },
    { label: 'Wira (SMA/SMK)', count: roleData.filter(d => d.tingkat_pmr === 'Wira (SMA/SMK)').length, color: 'bg-amber-500', barBg: 'bg-amber-100' },
  ];

  // 2. Berdasarkan Tujuan
  const tujuanData = [
    { label: 'SEKRETARIAT', count: roleData.filter(d => d.tujuan_pengaduan === 'SEKRETARIAT').length, color: 'bg-blue-600', barBg: 'bg-blue-100' },
    { label: 'BIDANG 1 - KEGIATAN', count: roleData.filter(d => d.tujuan_pengaduan === 'BIDANG 1').length, color: 'bg-amber-600', barBg: 'bg-amber-100' },
    { label: 'BIDANG 2 - SARPRAS & MEDIS', count: roleData.filter(d => d.tujuan_pengaduan === 'BIDANG 2').length, color: 'bg-emerald-600', barBg: 'bg-emerald-100' },
    { label: 'BIDANG 3 - PERLOMBAAN', count: roleData.filter(d => d.tujuan_pengaduan === 'BIDANG 3 - PERLOMBAAN').length, color: 'bg-rose-600', barBg: 'bg-rose-100' },
  ];

  // 3. Berdasarkan Kategori (Top 6)
  const kategoriMap: Record<string, number> = {};
  roleData.forEach(d => {
    kategoriMap[d.kategori] = (kategoriMap[d.kategori] || 0) + 1;
  });
  const topKategoriList = Object.entries(kategoriMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // 4. Berdasarkan Status
  const statusData = [
    { label: 'BARU', count: roleData.filter(d => d.status === 'BARU').length, color: 'bg-blue-500' },
    { label: 'DIVERIFIKASI', count: roleData.filter(d => d.status === 'DIVERIFIKASI').length, color: 'bg-indigo-500' },
    { label: 'DIPROSES', count: roleData.filter(d => d.status === 'DIPROSES').length, color: 'bg-amber-500' },
    { label: 'MENUNGGU', count: roleData.filter(d => d.status === 'MENUNGGU').length, color: 'bg-yellow-500' },
    { label: 'SELESAI', count: roleData.filter(d => d.status === 'SELESAI').length, color: 'bg-emerald-500' },
    { label: 'DITUTUP', count: roleData.filter(d => d.status === 'DITUTUP').length, color: 'bg-slate-500' },
  ];

  // 5. Berdasarkan Prioritas
  const prioritasData = [
    { label: 'Darurat', count: roleData.filter(d => d.prioritas === 'Darurat').length, color: 'bg-red-600', barBg: 'bg-red-100' },
    { label: 'Tinggi', count: roleData.filter(d => d.prioritas === 'Tinggi').length, color: 'bg-rose-500', barBg: 'bg-rose-100' },
    { label: 'Sedang', count: roleData.filter(d => d.prioritas === 'Sedang').length, color: 'bg-amber-500', barBg: 'bg-amber-100' },
    { label: 'Rendah', count: roleData.filter(d => d.prioritas === 'Rendah').length, color: 'bg-slate-400', barBg: 'bg-slate-100' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-700 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dasbor</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Grafik Statistik & Analisis Pengaduan
          </h2>
          <p className="text-xs text-slate-500">
            Analisis 5 dimensi data pengaduan Jumbara PMR PMI Kab. Banyumas 2026.
          </p>
        </div>

        <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-2xs text-right">
          <span className="text-2xs font-bold uppercase text-slate-400 block">Total Data Teranalisis</span>
          <span className="font-mono text-lg font-black text-red-600">{total} Tiket</span>
        </div>
      </div>

      {/* Grid of 5 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Pengaduan berdasarkan Tingkat PMR */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Users className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              1. Pengaduan Berdasarkan Tingkat PMR
            </h3>
          </div>

          <div className="space-y-3.5">
            {pmrData.map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="font-bold text-slate-800">{item.label}</span>
                    <span className="font-mono text-slate-600 font-bold">{item.count} tiket ({pct}%)</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${item.barBg} overflow-hidden`}>
                    <div 
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Pengaduan berdasarkan Tujuan */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              2. Pengaduan Berdasarkan Bidang Tujuan
            </h3>
          </div>

          <div className="space-y-3.5">
            {tujuanData.map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="font-bold text-slate-800">{item.label}</span>
                    <span className="font-mono text-slate-600 font-bold">{item.count} tiket ({pct}%)</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${item.barBg} overflow-hidden`}>
                    <div 
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Pengaduan berdasarkan Kategori */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              3. Pengaduan Berdasarkan Kategori (Top 6 Terbanyak)
            </h3>
          </div>

          <div className="space-y-2.5">
            {topKategoriList.map(([kat, count], idx) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={kat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 truncate max-w-[240px]">{idx + 1}. {kat}</span>
                    <span className="font-mono text-slate-600 font-bold">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-red-600 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Pengaduan berdasarkan Status */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              4. Pengaduan Berdasarkan Status Penanganan
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {statusData.map((item) => {
              const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
              return (
                <div key={item.label} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                  <span className="text-2xs font-bold uppercase text-slate-400 block">
                    {item.label}
                  </span>
                  <div className="text-xl font-black font-mono text-slate-800 my-0.5">
                    {item.count}
                  </div>
                  <span className="text-2xs text-slate-500 font-medium">
                    {pct}% dari total
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Pengaduan berdasarkan Prioritas (Full-width card) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              5. Pengaduan Berdasarkan Tingkat Prioritas
            </h3>
          </div>
          <span className="text-2xs text-slate-400">Parameter Urgensi Lapangan</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {prioritasData.map((item) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={item.label} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{item.label}</span>
                  <span className="text-2xs font-mono font-bold text-slate-500">{pct}%</span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900">
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
  );
};
