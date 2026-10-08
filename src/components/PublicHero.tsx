import React from 'react';
import { PmiLogo } from './PmiLogo';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  Clock, 
  Users, 
  Award, 
  HelpCircle, 
  Building, 
  Activity, 
  Trophy, 
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';

interface PublicHeroProps {
  onOpenForm: () => void;
  onOpenCheckStatus: () => void;
  onOpenPanitia?: () => void;
  totalPengaduan: number;
  selesaiCount: number;
}

export const PublicHero: React.FC<PublicHeroProps> = ({
  onOpenForm,
  onOpenCheckStatus,
  onOpenPanitia,
  totalPengaduan,
  selesaiCount
}) => {
  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
        {/* Subtle decorative Red Cross accent background pattern */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute right-8 bottom-8 text-red-50 pointer-events-none hidden lg:block opacity-40">
          <PmiLogo size="xl" showText={false} />
        </div>

        <div className="relative max-w-3xl space-y-6">
          
          {/* Tingkat PMR Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>MULA (SD) • MADYA (SMP) • WIRA (SMA/SMK)</span>
          </div>

          {/* Hero Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Laporkan Kendala Kontingen dengan <span className="text-red-600 underline decoration-red-200 decoration-wavy decoration-2">Cepat dan Terarah</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Sampaikan pengaduan, kendala, atau kebutuhan informasi selama pelaksanaan Jumbara. Pengaduan akan diteruskan kepada bidang yang sesuai untuk ditindaklanjuti.
            </p>
          </div>

          {/* 2 Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={onOpenForm}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-98"
            >
              <FileText className="w-4 h-4" />
              <span>BUAT PENGADUAN</span>
            </button>

            <button
              onClick={onOpenCheckStatus}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span>CEK STATUS PENGADUAN</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600 shrink-0" />
              <span>Respon Cepat 24 Jam</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
              <span>Pelacakan Tiket JBR26</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-red-600 shrink-0" />
              <span>Koordinasi Lintas Bidang</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-red-600 shrink-0" />
              <span>Akuntabel & Transparan</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pilar Bidang Penanganan JUMBARA */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl font-bold text-slate-900">
            4 Bidang Penanganan Pengaduan Posko
          </h2>
          <p className="text-xs text-slate-500">
            Laporan Anda langsung didisposisikan ke PIC petugas bidang terkait secara terarah
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* SEKRETARIAT */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-red-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
                Bidang A
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                SEKRETARIAT
              </h3>
            </div>
            <p className="text-2xs text-slate-500 leading-relaxed">
              Registrasi Kontingen, Data Peserta, ID Card, Surat/Dokumen, Informasi Umum, Perubahan Data, dan Pendataan.
            </p>
          </div>

          {/* BIDANG 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-red-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
                Bidang B
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                BIDANG 1 - KEGIATAN
              </h3>
            </div>
            <p className="text-2xs text-slate-500 leading-relaxed">
              Jadwal Kegiatan, Teknis Kegiatan, Materi Kegiatan, Perubahan Jadwal, dan Kendala Operasional Lapangan.
            </p>
          </div>

          {/* BIDANG 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-red-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                Bidang C
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                BIDANG 2 - SARPRAS & MEDIS
              </h3>
            </div>
            <p className="text-2xs text-slate-500 leading-relaxed">
              Konsumsi Dapur Umum, Pos Kesehatan Medis, Tenda Akomodasi, Fasilitas MCK, Kebersihan, dan Keamanan.
            </p>
          </div>

          {/* BIDANG 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-red-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xs font-mono font-bold text-rose-700 uppercase tracking-wider block">
                Bidang D
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                BIDANG 3 - PERLOMBAAN
              </h3>
            </div>
            <p className="text-2xs text-slate-500 leading-relaxed">
              Jadwal Lomba, Lokasi Venue, Ketentuan & Teknis Lomba, Juri/Penilaian, Rekap Hasil, Protes/Keberatan, dan Alat.
            </p>
          </div>

        </div>
      </section>

      {/* Alur 4 Langkah Pengaduan */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-2xs font-bold uppercase tracking-wider text-red-600">
            Panduan Kontingen
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Alur Layanan Pengaduan Jumbara PMR Banyumas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Isi Formulir', desc: 'Pilih bidang tujuan, kategori dinamis, dan sertakan rincian kendala beserta lokasi.' },
            { step: '02', title: 'Dapat Tiket JBR26', desc: 'Sistem menerbitkan nomor tiket unik otomatis (contoh: JBR26-0001) untuk pelacakan.' },
            { step: '03', title: 'Verifikasi & Disposisi', desc: 'Posko memverifikasi dan menugaskan Petugas PIC bidang terkait ke lokasi.' },
            { step: '04', title: 'Tuntas & Evaluasi', desc: 'Masalah diselesaikan di lapangan dan pelapor menerima update status transparan.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative space-y-2">
              <span className="text-2xl font-black font-mono text-red-600/30 block">
                {item.step}
              </span>
              <h4 className="text-xs font-bold text-slate-900">
                {item.title}
              </h4>
              <p className="text-2xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="text-slate-700">
              <span className="font-bold text-red-900">Kendala Darurat Medis / Keamanan?</span> Segera datangi Posko Terpadu atau hubungi tim reaksi cepat PMI Banyumas melalui hotline posko.
            </div>
          </div>
          <button
            onClick={onOpenForm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Lapor Sekarang
          </button>
        </div>
      </section>

      {/* Susunan Panitia Section Banner */}
      {onOpenPanitia && (
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                SK RESMI PMI BANYUMAS
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                Susunan Panitia Jumbara PMR XXXII Tahun 2026
              </h3>
              <p className="text-xs text-slate-500 max-w-xl">
                Ketahui struktur Steering Committee (SC), Organizing Committee (OC), Tim Kesekretariatan, Koordinator Bidang, serta narahubung resmi kegiatan.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPanitia}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer self-start sm:self-center"
          >
            <span>Lihat Susunan Panitia</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      )}

    </div>
  );
};
