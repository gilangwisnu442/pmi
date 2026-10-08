import React, { useState } from 'react';
import { Pengaduan, StatusPengaduan } from '../types/pengaduan';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  MapPin, 
  MessageCircle, 
  Star, 
  ArrowLeft,
  ShieldAlert,
  Building,
  Check,
  Calendar,
  XCircle
} from 'lucide-react';
import { 
  getStatusBadgeStyle, 
  getPrioritasBadgeStyle, 
  getTingkatPmrBadgeStyle, 
  formatDateIndo 
} from '../utils/formatters';
import { generateWhatsAppLink, buildOfficialResponseWhatsAppMessage } from '../utils/whatsapp';
import { INFO_KONTAK_PANITIA } from '../data/panitia';

interface CekStatusPengaduanProps {
  data: Pengaduan[];
  initialTicketId?: string;
  onBackToHome: () => void;
  onUpdateRating: (ticketId: string, rating: number) => void;
}

export const CekStatusPengaduan: React.FC<CekStatusPengaduanProps> = ({
  data,
  initialTicketId = '',
  onBackToHome,
  onUpdateRating
}) => {
  const [ticketInput, setTicketInput] = useState(initialTicketId);
  const [searchedTicket, setSearchedTicket] = useState<Pengaduan | null>(() => {
    if (initialTicketId) {
      return data.find(d => d.id_pengaduan.toUpperCase() === initialTicketId.toUpperCase()) || null;
    }
    return null;
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialTicketId));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = ticketInput.trim().toUpperCase();
    if (!clean) return;

    const found = data.find(d => d.id_pengaduan.toUpperCase() === clean);
    setSearchedTicket(found || null);
    setHasSearched(true);
  };

  // Progression Stepper logic
  // Order: BARU -> DIVERIFIKASI -> DIPROSES -> MENUNGGU / SELESAI -> DITUTUP
  const statusSteps: StatusPengaduan[] = [
    'BARU',
    'DIVERIFIKASI',
    'DIPROSES',
    'SELESAI',
    'DITUTUP'
  ];

  const getStepProgress = (currentStatus: StatusPengaduan) => {
    if (currentStatus === 'BARU') return 1;
    if (currentStatus === 'DIVERIFIKASI') return 2;
    if (currentStatus === 'DIPROSES' || currentStatus === 'MENUNGGU') return 3;
    if (currentStatus === 'SELESAI') return 4;
    if (currentStatus === 'DITUTUP') return 5;
    return 1;
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <span className="text-2xs text-slate-400 font-mono">
          JUMBARA PMR KAB. BANYUMAS 2026
        </span>
      </div>

      {/* Search Input Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Cek Status Pengaduan Kontingen
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Masukkan Nomor Tiket Pengaduan Anda (Format: <code className="font-mono text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">JBR26-XXXX</code>) untuk melihat riwayat dan tindak lanjut penanganan posko.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Contoh: JBR26-0001"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 uppercase placeholder:normal-case placeholder:font-sans placeholder:font-normal"
              required
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
          >
            [ CEK STATUS ]
          </button>
        </form>

        {/* Quick sample ticket buttons for convenience */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-2xs text-slate-500">
          <span>Contoh tiket cepat:</span>
          {['JBR26-0001', 'JBR26-0002', 'JBR26-0004', 'JBR26-0008', 'JBR26-0012'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTicketInput(id);
                const found = data.find(d => d.id_pengaduan === id);
                setSearchedTicket(found || null);
                setHasSearched(true);
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-mono font-semibold transition-colors cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Search Result Display */}
      {hasSearched && (
        <>
          {searchedTicket ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Ticket Top Heading */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-mono font-black text-red-600 bg-red-50 px-3 py-1 rounded-xl border border-red-200">
                      {searchedTicket.id_pengaduan}
                    </span>
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${getStatusBadgeStyle(searchedTicket.status)}`}>
                      {searchedTicket.status}
                    </span>
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${getPrioritasBadgeStyle(searchedTicket.prioritas)}`}>
                      Prioritas {searchedTicket.prioritas}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                    {searchedTicket.judul_pengaduan}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="font-bold text-slate-800">{searchedTicket.nama_kontingen}</span>
                    <span>·</span>
                    <span className={`px-2 py-0.5 rounded text-2xs font-bold border ${getTingkatPmrBadgeStyle(searchedTicket.tingkat_pmr)}`}>
                      {searchedTicket.tingkat_pmr}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateIndo(searchedTicket.tanggal)} ({searchedTicket.jam} WIB)
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Action to Posko */}
                <a
                  href={generateWhatsAppLink(
                    INFO_KONTAK_PANITIA.nomerWaRaw, 
                    `Halo Posko Jumbara Banyumas 2026, saya dari kontingen *${searchedTicket.nama_kontingen}* ingin menanyakan update pengaduan dengan nomor tiket *${searchedTicket.id_pengaduan}* terkait *${searchedTicket.judul_pengaduan}*. Terima kasih.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-2xs cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Hubungi Posko via WA ({INFO_KONTAK_PANITIA.nomerWa})</span>
                </a>
              </div>

              {/* Progress Timeline Stepper */}
              <div className="py-2 space-y-3">
                <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">
                  Progres Penanganan Tiket:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  {[
                    { label: 'BARU', desc: 'Diterima sistem', idx: 1 },
                    { label: 'DIVERIFIKASI', desc: 'Dicek posko', idx: 2 },
                    { label: 'DIPROSES', desc: 'PIC menuju lokasi', idx: 3 },
                    { label: 'SELESAI', desc: 'Tuntas ditangani', idx: 4 },
                    { label: 'DITUTUP', desc: 'Arsip resmi', idx: 5 },
                  ].map((step) => {
                    const currentProgress = getStepProgress(searchedTicket.status);
                    const isCompleted = currentProgress > step.idx;
                    const isCurrent = currentProgress === step.idx;

                    return (
                      <div
                        key={step.label}
                        className={`p-3 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-red-50 border-red-500 ring-2 ring-red-500/20'
                            : isCompleted
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {isCompleted ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : isCurrent ? (
                            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                          ) : (
                            <span className="w-3 h-3 rounded-full bg-slate-300" />
                          )}
                        </div>
                        <span className={`font-bold block ${isCurrent ? 'text-red-700' : isCompleted ? 'text-emerald-800' : 'text-slate-500'}`}>
                          {step.label}
                        </span>
                        <span className="text-2xs text-slate-400 block truncate mt-0.5">
                          {step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rincian Bidang, PIC & Tindak Lanjut */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-2xs uppercase font-bold text-slate-400 block mb-0.5">Tujuan Pengaduan</span>
                    <span className="font-bold text-red-700 text-sm">{searchedTicket.tujuan_pengaduan}</span>
                  </div>
                  <div>
                    <span className="text-2xs uppercase font-bold text-slate-400 block mb-0.5">Kategori</span>
                    <span className="font-semibold text-slate-800">{searchedTicket.kategori}</span>
                  </div>
                  <div>
                    <span className="text-2xs uppercase font-bold text-slate-400 block mb-0.5">Lokasi Kejadian</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      {searchedTicket.lokasi}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 text-xs">
                  <div>
                    <span className="text-2xs uppercase font-bold text-slate-400 block mb-0.5">PIC Petugas Lapangan</span>
                    <span className="font-bold text-slate-900">
                      {searchedTicket.pic || <span className="text-slate-400 font-normal italic">Belum ditunjuk / dalam koordinasi</span>}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xs uppercase font-bold text-slate-400 block mb-0.5">Waktu Update Terakhir</span>
                    <span className="font-mono text-slate-700 font-semibold">
                      {searchedTicket.waktu_update || '-'}
                    </span>
                  </div>
                </div>

                {/* Tindak Lanjut Box */}
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-2xs uppercase font-bold text-slate-500 block mb-1">
                    Tindak Lanjut & Penanganan Petugas:
                  </span>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {searchedTicket.tindak_lanjut ? (
                      searchedTicket.tindak_lanjut
                    ) : (
                      <span className="text-slate-400 italic">
                        Pengaduan sedang ditinjau oleh tim posko dan segera ditindaklanjuti ke lokasi Anda.
                      </span>
                    )}
                  </div>
                </div>

                {/* Bukti Lampiran if any */}
                {searchedTicket.bukti && (
                  <div className="pt-2">
                    <span className="text-2xs uppercase font-bold text-slate-400 block mb-1">Lampiran Foto Bukti</span>
                    <img
                      src={searchedTicket.bukti}
                      alt="Lampiran Bukti"
                      className="h-28 w-auto rounded-xl border border-slate-200 object-cover shadow-2xs"
                    />
                  </div>
                )}
              </div>

              {/* Rating Kepuasan Pelapor (if Selesai) */}
              {searchedTicket.status === 'SELESAI' && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase">
                      Penilaian Kepuasan Pelayanan
                    </h4>
                    <p className="text-2xs text-amber-700">
                      Beri nilai respon dan keramahan relawan posko PMI Banyumas atas penanganan aduan ini.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => onUpdateRating(searchedTicket.id_pengaduan, star)}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                        title={`Beri ${star} Bintang`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (searchedTicket.rating || 0) >= star
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs font-bold text-amber-900 ml-2">
                      {searchedTicket.rating ? `${searchedTicket.rating} / 5` : 'Beri Nilai'}
                    </span>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Nomor Tiket Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Nomor tiket <span className="font-mono font-bold text-slate-700">"{ticketInput}"</span> belum terdaftar. Pastikan tidak ada salah ketik atau hubungi posko untuk pengecekan data.
              </p>
            </div>
          )}
        </>
      )}

    </div>
  );
};
