export type TingkatPMR = 'Mula (SD)' | 'Madya (SMP)' | 'Wira (SMA/SMK)';

export type TujuanPengaduan = string;

export type PrioritasPengaduan = 'Rendah' | 'Sedang' | 'Tinggi' | 'Darurat';

export type StatusPengaduan = 
  | 'BARU'
  | 'DIVERIFIKASI'
  | 'DIPROSES'
  | 'MENUNGGU'
  | 'SELESAI'
  | 'DITUTUP';

export interface Pengaduan {
  id_pengaduan: string;        // e.g. JBR26-0001
  tanggal: string;             // YYYY-MM-DD
  jam: string;                 // HH:mm
  nama_kontingen: string;
  tingkat_pmr: TingkatPMR;
  nama_pelapor: string;
  no_whatsapp: string;
  tujuan_pengaduan: string;    // Diisi sendiri oleh peserta
  kategori: string;
  lokasi: string;
  judul_pengaduan: string;
  detail_pengaduan: string;
  bukti: string;               // URL or base64 image
  prioritas: PrioritasPengaduan;
  status: StatusPengaduan;
  pic: string;
  tindak_lanjut: string;
  catatan_internal: string;
  waktu_respon: string;
  waktu_selesai: string;
  rating: number | null;
  waktu_update?: string;       // Timestamp of latest status change
}

export interface PengaduanFilter {
  search: string;
  tingkat_pmr: string;
  tujuan_pengaduan: string;
  kategori: string;
  prioritas: string;
  status: string;
  tanggal: string;
}
