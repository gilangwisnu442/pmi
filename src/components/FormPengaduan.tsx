import React, { useState } from 'react';
import { 
  Pengaduan, 
  TingkatPMR, 
  PrioritasPengaduan 
} from '../types/pengaduan';
import { KATEGORI_SUGGESTIONS, TUJUAN_SUGGESTIONS } from '../data/categories';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Upload, 
  AlertCircle, 
  ArrowLeft, 
  Send, 
  FileText, 
  Clock, 
  ShieldCheck,
  Building,
  Activity,
  Trophy,
  FileSpreadsheet,
  X,
  Sparkles
} from 'lucide-react';
import { getPrioritasBadgeStyle, getStatusBadgeStyle } from '../utils/formatters';

interface FormPengaduanProps {
  nextTicketId: string;
  onSubmit: (newPengaduan: Pengaduan) => void;
  onCheckStatus: (ticketId: string) => void;
  onBackToHome: () => void;
}

export const FormPengaduan: React.FC<FormPengaduanProps> = ({
  nextTicketId,
  onSubmit,
  onCheckStatus,
  onBackToHome
}) => {
  // Form State - Peserta mengisi sendiri semua data termasuk tujuan pengaduan
  const [namaKontingen, setNamaKontingen] = useState('');
  const [tingkatPmr, setTingkatPmr] = useState<TingkatPMR>('Madya (SMP)');
  const [namaPelapor, setNamaPelapor] = useState('');
  const [noWhatsapp, setNoWhatsapp] = useState('');
  const [tujuanPengaduan, setTujuanPengaduan] = useState('');
  const [kategori, setKategori] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [judulPengaduan, setJudulPengaduan] = useState('');
  const [detailPengaduan, setDetailPengaduan] = useState('');
  const [bukti, setBukti] = useState('');
  const [prioritas, setPrioritas] = useState<PrioritasPengaduan>('Sedang');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Success ticket receipt
  const [submittedTicket, setSubmittedTicket] = useState<Pengaduan | null>(null);
  const [copied, setCopied] = useState(false);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBukti(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tujuanPengaduan.trim()) {
      alert('Mohon isi tujuan pengaduan Anda.');
      return;
    }
    if (!kategori.trim()) {
      alert('Mohon isi kategori pengaduan.');
      return;
    }
    if (!isConfirmed) {
      alert('Mohon centang kotak konfirmasi bahwa informasi yang Anda berikan adalah benar.');
      return;
    }

    const now = new Date();
    const tanggal = now.toISOString().split('T')[0];
    const jam = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newPengaduan: Pengaduan = {
      id_pengaduan: nextTicketId,
      tanggal,
      jam,
      nama_kontingen: namaKontingen.trim(),
      tingkat_pmr: tingkatPmr,
      nama_pelapor: namaPelapor.trim(),
      no_whatsapp: noWhatsapp.trim(),
      tujuan_pengaduan: tujuanPengaduan.trim(),
      kategori: kategori.trim(),
      lokasi: lokasi.trim(),
      judul_pengaduan: judulPengaduan.trim(),
      detail_pengaduan: detailPengaduan.trim(),
      bukti,
      prioritas,
      status: 'BARU',
      pic: '',
      tindak_lanjut: '',
      catatan_internal: '',
      waktu_respon: '',
      waktu_selesai: '',
      rating: null,
      waktu_update: `${tanggal} ${jam} WIB`
    };

    onSubmit(newPengaduan);
    setSubmittedTicket(newPengaduan);
  };

  const handleCopyTicket = () => {
    if (submittedTicket) {
      navigator.clipboard.writeText(submittedTicket.id_pengaduan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If submitted successfully: Show Ticket Receipt
  if (submittedTicket) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-2xs font-bold font-mono tracking-widest uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              SISTEM RESMI JUMBARA 2026
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Pengaduan berhasil dikirim.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Laporan kontingen Anda telah diterima oleh Posko Terpadu Jumbara PMR Banyumas dan segera diteruskan ke bidang terkait.
            </p>
          </div>

          {/* Ticket Card Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-2xs uppercase font-bold text-slate-500">Nomor Tiket</span>
                <div className="text-2xl font-black font-mono text-red-600 tracking-wider">
                  {submittedTicket.id_pengaduan}
                </div>
              </div>

              <button
                onClick={handleCopyTicket}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Tersalin!' : 'SALIN NOMOR TIKET'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-2xs uppercase text-slate-400 font-semibold block">Kontingen</span>
                <span className="font-bold text-slate-800">{submittedTicket.nama_kontingen}</span>
              </div>
              <div>
                <span className="text-2xs uppercase text-slate-400 font-semibold block">Tingkat PMR</span>
                <span className="font-semibold text-slate-700">{submittedTicket.tingkat_pmr}</span>
              </div>
              <div>
                <span className="text-2xs uppercase text-slate-400 font-semibold block">Tujuan Pengaduan</span>
                <span className="font-bold text-red-700">{submittedTicket.tujuan_pengaduan}</span>
              </div>
              <div>
                <span className="text-2xs uppercase text-slate-400 font-semibold block">Kategori</span>
                <span className="font-medium text-slate-800">{submittedTicket.kategori}</span>
              </div>
              <div>
                <span className="text-2xs uppercase text-slate-400 font-semibold block">Prioritas</span>
                <span className={`inline-block px-2 py-0.5 rounded text-2xs border ${getPrioritasBadgeStyle(submittedTicket.prioritas)}`}>
                  {submittedTicket.prioritas}
                </span>
              </div>
              <div>
                <span className="text-2xs uppercase text-slate-400 font-semibold block">Status Awal</span>
                <span className={`inline-block px-2 py-0.5 rounded text-2xs border ${getStatusBadgeStyle(submittedTicket.status)}`}>
                  {submittedTicket.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onCheckStatus(submittedTicket.id_pengaduan)}
              className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer"
            >
              Cek Status Tiket Ini Sekarang
            </button>
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Complaint Form
  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      
      {/* Back button & Page Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="text-right">
          <span className="text-2xs font-semibold text-slate-400 uppercase">Nomor Tiket Otomatis:</span>
          <span className="font-mono font-black text-red-600 ml-1.5 text-xs bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            {nextTicketId}
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        
        {/* Form Header */}
        <div className="border-b border-slate-100 pb-5 space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Formulir Pengaduan Kontingen Jumbara
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Isi formulir secara lengkap. Anda dapat menentukan sendiri tujuan bidang dan keluhan yang ingin disampaikan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Kontingen & Pelapor */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-700">
              1. Identitas Kontingen & Pelapor
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Nama Kontingen */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Nama Kontingen <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PMR Madya SMP N 1 Purwokerto"
                  value={namaKontingen}
                  onChange={(e) => setNamaKontingen(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                  required
                />
              </div>

              {/* Tingkat PMR */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Tingkat PMR <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mula (SD)', 'Madya (SMP)', 'Wira (SMA/SMK)'] as TingkatPMR[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTingkatPmr(t)}
                      className={`px-2 py-2 rounded-xl text-2xs font-bold border transition-all text-center cursor-pointer ${
                        tingkatPmr === t
                          ? t === 'Mula (SD)'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : t === 'Madya (SMP)'
                            ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                            : 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nama Pelapor */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Nama Pelapor <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nama pembina / pendamping / ketua regu"
                  value={namaPelapor}
                  onChange={(e) => setNamaPelapor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                  required
                />
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Nomor WhatsApp <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 085724869383"
                  value={noWhatsapp}
                  onChange={(e) => setNoWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                  required
                />
                <span className="text-2xs text-slate-400 mt-1 block">
                  Pastikan nomor aktif agar menerima notifikasi tindak lanjut petugas.
                </span>
              </div>

            </div>
          </div>

          {/* Section 2: Tujuan Pengaduan (Diisi Sendiri oleh Peserta) & Kategori */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-700">
              2. Tujuan Pengaduan & Kategori
            </h3>

            {/* Tujuan Pengaduan Diisi Bebas oleh Peserta */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Tujuan Pengaduan / Ditujukan Kepada <span className="text-red-600">*</span>
                </label>
                <span className="text-2xs text-slate-500 italic">
                  (Peserta mengisi sendiri tujuan/bidang)
                </span>
              </div>
              
              <input
                type="text"
                list="daftar-tujuan"
                placeholder="Tuliskan tujuan / bidang yang Anda tuju (misal: Dapur Umum, Pos Kesehatan, Sekretariat, Lomba PP, dll)..."
                value={tujuanPengaduan}
                onChange={(e) => setTujuanPengaduan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                required
              />

              <datalist id="daftar-tujuan">
                {TUJUAN_SUGGESTIONS.map((t, idx) => (
                  <option key={idx} value={t} />
                ))}
              </datalist>

              {/* Quick suggestion pills */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-2xs text-slate-600">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-600" />
                  Pilihan cepat:
                </span>
                {[
                  'SEKRETARIAT',
                  'BIDANG 1 - KEGIATAN',
                  'BIDANG 2 - SARPRAS & MEDIS',
                  'BIDANG 3 - PERLOMBAAN',
                  'Dapur Umum / Konsumsi',
                  'Posko Medis / Kesehatan',
                  'Tempat & Kavling',
                  'Perlengkapan',
                  'Ketertiban & Pamdal'
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTujuanPengaduan(sug)}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-slate-200 rounded-lg text-2xs font-medium transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategori Pengaduan */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Kategori Pengaduan <span className="text-red-600">*</span>
              </label>
              
              <input
                type="text"
                list="daftar-kategori"
                placeholder="Ketik atau pilih kategori (misal: Konsumsi, Air Bersih, Tenda, ID Card, Jadwal, dll)..."
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
                required
              />

              <datalist id="daftar-kategori">
                {KATEGORI_SUGGESTIONS.map((k, idx) => (
                  <option key={idx} value={k} />
                ))}
              </datalist>

              {/* Quick suggestion pills for category */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-2xs text-slate-600">
                <span className="text-slate-400 font-medium">Contoh:</span>
                {[
                  'Konsumsi & Makanan',
                  'Kesehatan & Medis',
                  'Akomodasi & Tenda',
                  'Air Bersih & MCK',
                  'ID Card & Registrasi',
                  'Jadwal Kegiatan',
                  'Peralatan Lomba',
                  'Keamanan'
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setKategori(sug)}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-2xs font-medium transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Detail Pengaduan */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-700">
              3. Rincian Masalah & Lokasi
            </h3>

            {/* Lokasi Kejadian */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Lokasi Kejadian <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Kavling Madya Blok B-04 / Pos Uji PP Aula Timur / MCK Blok C"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                required
              />
            </div>

            {/* Judul Pengaduan */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Judul Pengaduan <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Ringkasan singkat kendala yang dihadapi"
                value={judulPengaduan}
                onChange={(e) => setJudulPengaduan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-bold"
                required
              />
            </div>

            {/* Detail Pengaduan */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Detail Pengaduan <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Jelaskan secara terperinci apa yang terjadi, kendala, kebutuhan, jumlah peserta yang terdampak..."
                value={detailPengaduan}
                onChange={(e) => setDetailPengaduan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-normal leading-relaxed"
                required
              />
            </div>

            {/* Upload Bukti Foto / Dokumen & Prioritas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Upload Bukti */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Upload Bukti Foto/Dokumen (Opsional)
                </label>
                <div className="space-y-2">
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors text-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">Pilih file foto atau dokumen</span>
                    <span className="text-2xs text-slate-400 mt-0.5">JPG, PNG, PDF maks. 5MB</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {bukti && (
                    <div className="relative inline-block mt-1">
                      <img
                        src={bukti}
                        alt="Bukti Pengaduan"
                        className="h-20 w-auto rounded-lg border border-slate-300 object-cover shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => setBukti('')}
                        className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tingkat Prioritas */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Tingkat Prioritas <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Rendah', desc: 'Informasi umum / administrasi' },
                    { id: 'Sedang', desc: 'Kebutuhan teknis operasional' },
                    { id: 'Tinggi', desc: 'Mendesak / menghambat kegiatan' },
                    { id: 'Darurat', desc: 'Medis / keselamatan / korsleting' },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPrioritas(p.id as PrioritasPengaduan)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all text-center ${
                        prioritas === p.id
                          ? p.id === 'Darurat'
                            ? 'bg-red-100 border-red-600 text-red-900 font-bold ring-2 ring-red-500/20'
                            : p.id === 'Tinggi'
                            ? 'bg-rose-50 border-rose-500 text-rose-800 font-bold ring-2 ring-rose-500/20'
                            : p.id === 'Sedang'
                            ? 'bg-amber-50 border-amber-500 text-amber-800 font-bold'
                            : 'bg-slate-100 border-slate-400 text-slate-800 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold block">{p.id}</span>
                      <span className="text-2xs opacity-80 block truncate mt-0.5">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Checkbox Konfirmasi */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                required
              />
              <span className="text-xs text-slate-700 leading-relaxed font-medium">
                Saya memastikan informasi yang saya berikan benar.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer transform active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>[KIRIM PENGADUAN]</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
