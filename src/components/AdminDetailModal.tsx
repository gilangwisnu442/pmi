import React, { useState, useEffect } from 'react';
import { Pengaduan, StatusPengaduan, PrioritasPengaduan } from '../types/pengaduan';
import { User } from '../types/auth';
import { PIC_BY_BIDANG } from '../data/categories';
import { 
  X, 
  Save, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  MapPin, 
  User as UserIcon, 
  Phone, 
  Building, 
  FileText, 
  ShieldAlert, 
  ExternalLink 
} from 'lucide-react';
import { 
  getStatusBadgeStyle, 
  getPrioritasBadgeStyle, 
  getTingkatPmrBadgeStyle, 
  formatDateIndo 
} from '../utils/formatters';
import { generateWhatsAppLink, buildOfficialResponseWhatsAppMessage } from '../utils/whatsapp';

interface AdminDetailModalProps {
  pengaduan: Pengaduan | null;
  currentUser: User;
  onClose: () => void;
  onSave: (updated: Pengaduan) => void;
}

export const AdminDetailModal: React.FC<AdminDetailModalProps> = ({
  pengaduan,
  currentUser,
  onClose,
  onSave
}) => {
  if (!pengaduan) return null;

  const [formData, setFormData] = useState<Pengaduan>({ ...pengaduan });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData({ ...pengaduan });
    setIsSaved(false);
  }, [pengaduan]);

  const handleChange = (field: keyof Pengaduan, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const updateTime = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const updatedData: Pengaduan = {
      ...formData,
      waktu_update: updateTime
    };

    onSave(updatedData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  // PIC options for this bidang
  const availablePicOptions = PIC_BY_BIDANG[formData.tujuan_pengaduan] || PIC_BY_BIDANG['SEMUA BIDANG'];

  const waMessage = buildOfficialResponseWhatsAppMessage(
    formData.nama_pelapor,
    formData.id_pengaduan,
    formData.judul_pengaduan,
    formData.status,
    formData.tindak_lanjut,
    formData.pic
  );
  const waLink = generateWhatsAppLink(formData.no_whatsapp, waMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="font-mono font-black text-xs sm:text-sm bg-red-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shrink-0">
              {formData.id_pengaduan}
            </span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold leading-tight truncate">
                {formData.judul_pengaduan}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-3xs sm:text-2xs text-slate-300 mt-0.5">
                <span className="truncate">{formData.nama_kontingen}</span>
                <span>·</span>
                <span className="shrink-0">{formData.tingkat_pmr}</span>
                <span>·</span>
                <span className="shrink-0">{formatDateIndo(formData.tanggal)} ({formData.jam} WIB)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast */}
        {isSaved && (
          <div className="bg-emerald-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 text-xs font-bold flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Perubahan data dan tindak lanjut berhasil disimpan!</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 text-xs sm:text-sm flex-1">
          
          {/* Section 1: Informasi Pelapor & Kontingen */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs flex items-center gap-1.5">
              <UserIcon className="w-4 h-4 text-red-600" />
              <span>Informasi Pelapor & Kontingen</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">Kontingen</span>
                <span className="font-bold text-slate-800">{formData.nama_kontingen}</span>
              </div>

              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">Tingkat PMR</span>
                <span className={`inline-block px-2 py-0.5 rounded text-2xs font-bold border mt-0.5 ${getTingkatPmrBadgeStyle(formData.tingkat_pmr)}`}>
                  {formData.tingkat_pmr}
                </span>
              </div>

              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">Nama Pelapor</span>
                <span className="font-semibold text-slate-800">{formData.nama_pelapor}</span>
              </div>

              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">WhatsApp</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-slate-800">{formData.no_whatsapp}</span>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                    title="Kirim pesan langsung via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Masalah, Lokasi & Bukti */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">Tujuan Pengaduan</span>
                <span className="font-bold text-red-700">{formData.tujuan_pengaduan}</span>
              </div>

              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">Kategori</span>
                <span className="font-semibold text-slate-800">{formData.kategori}</span>
              </div>

              <div>
                <span className="text-2xs text-slate-400 font-bold uppercase block">Lokasi Kejadian</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  {formData.lokasi}
                </span>
              </div>
            </div>

            {/* Detail Narasi */}
            <div className="space-y-1">
              <span className="text-2xs text-slate-400 font-bold uppercase block">
                Detail Pengaduan:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {formData.detail_pengaduan}
              </p>
            </div>

            {/* Bukti Foto if any */}
            {formData.bukti && (
              <div className="pt-2">
                <span className="text-2xs text-slate-400 font-bold uppercase block mb-1">
                  Lampiran Bukti Foto
                </span>
                <a href={formData.bukti} target="_blank" rel="noreferrer" className="inline-block">
                  <img
                    src={formData.bukti}
                    alt="Lampiran Bukti"
                    className="h-28 w-auto rounded-xl border border-slate-200 object-cover shadow-2xs hover:opacity-90"
                  />
                </a>
              </div>
            )}
          </div>

          {/* Section 3: Status Pengaduan, PIC, Tindak Lanjut & Catatan Internal */}
          <div className="bg-red-50/40 border border-red-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="font-bold text-red-900 uppercase tracking-wide text-xs flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Pengelolaan & Tindak Lanjut Panitia Posko</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* STATUS PENGADUAN */}
              <div>
                <label className="text-2xs font-bold text-slate-700 uppercase block mb-1">
                  Status Pengaduan *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as StatusPengaduan)}
                  className={`w-full px-3 py-2 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-red-500 cursor-pointer ${getStatusBadgeStyle(formData.status)}`}
                  required
                >
                  <option value="BARU">BARU</option>
                  <option value="DIVERIFIKASI">DIVERIFIKASI</option>
                  <option value="DIPROSES">DIPROSES</option>
                  <option value="MENUNGGU">MENUNGGU</option>
                  <option value="SELESAI">SELESAI</option>
                  <option value="DITUTUP">DITUTUP</option>
                </select>
              </div>

              {/* TINGKAT PRIORITAS */}
              <div>
                <label className="text-2xs font-bold text-slate-700 uppercase block mb-1">
                  Tingkat Prioritas *
                </label>
                <select
                  value={formData.prioritas}
                  onChange={(e) => handleChange('prioritas', e.target.value as PrioritasPengaduan)}
                  className={`w-full px-3 py-2 rounded-xl border font-bold text-xs focus:ring-2 focus:ring-red-500 cursor-pointer ${getPrioritasBadgeStyle(formData.prioritas)}`}
                  required
                >
                  <option value="Rendah">Rendah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Tinggi">Tinggi</option>
                  <option value="Darurat">Darurat</option>
                </select>
              </div>

              {/* PIC (Dropdown sesuai bidang) */}
              <div>
                <label className="text-2xs font-bold text-slate-700 uppercase block mb-1">
                  PIC Petugas Lapangan *
                </label>
                <select
                  value={formData.pic}
                  onChange={(e) => handleChange('pic', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-800 focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="">-- Pilih PIC Petugas --</option>
                  {availablePicOptions.map((pic) => (
                    <option key={pic} value={pic}>
                      {pic}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Tindak Lanjut: Textarea */}
            <div>
              <label className="text-2xs font-bold text-slate-700 uppercase block mb-1">
                Tindak Lanjut Penanganan:
              </label>
              <textarea
                rows={3}
                placeholder="Catat langkah nyata yang telah dilakukan petugas lapangan untuk menyelesaikan keluhan..."
                value={formData.tindak_lanjut}
                onChange={(e) => handleChange('tindak_lanjut', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Catatan Internal: Textarea */}
            <div>
              <label className="text-2xs font-bold text-slate-700 uppercase block mb-1">
                Catatan Internal Panitia (Tidak Tampil ke Publik):
              </label>
              <textarea
                rows={2}
                placeholder="Catatan koordinasi internal posko atau evaluasi panitia..."
                value={formData.catatan_internal}
                onChange={(e) => handleChange('catatan_internal', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

          {/* Modal Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            {/* Send WhatsApp notification to pelapor */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Kirim Status ke WhatsApp Pelapor</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Tutup
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>[SIMPAN PERUBAHAN]</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
