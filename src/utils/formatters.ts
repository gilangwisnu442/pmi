import { PrioritasPengaduan, StatusPengaduan, TingkatPMR } from '../types/pengaduan';

export function getStatusBadgeStyle(status: StatusPengaduan): string {
  switch (status) {
    case 'BARU':
      return 'bg-blue-50 text-blue-700 border-blue-200 font-semibold';
    case 'DIVERIFIKASI':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold';
    case 'DIPROSES':
      return 'bg-amber-50 text-amber-800 border-amber-200 font-semibold';
    case 'MENUNGGU':
      return 'bg-yellow-50 text-yellow-800 border-yellow-200 font-semibold';
    case 'SELESAI':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
    case 'DITUTUP':
      return 'bg-slate-100 text-slate-700 border-slate-300 font-semibold';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function getPrioritasBadgeStyle(prioritas: PrioritasPengaduan): string {
  switch (prioritas) {
    case 'Darurat':
      return 'bg-red-100 text-red-900 border-red-300 font-bold animate-pulse';
    case 'Tinggi':
      return 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
    case 'Sedang':
      return 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
    case 'Rendah':
      return 'bg-slate-100 text-slate-700 border-slate-200 font-medium';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function getTingkatPmrBadgeStyle(tingkat: TingkatPMR): string {
  switch (tingkat) {
    case 'Mula (SD)':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Madya (SMP)':
      return 'bg-sky-50 text-sky-800 border-sky-200';
    case 'Wira (SMA/SMK)':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parts[2];
      const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const year = parts[0];
      return `${day} ${monthNames[monthIndex] || parts[1]} ${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}
