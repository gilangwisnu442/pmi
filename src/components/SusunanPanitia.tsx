import React, { useState, useMemo } from 'react';
import { DATA_SUSUNAN_PANITIA, INFO_KONTAK_PANITIA } from '../data/panitia';
import { PmiLogo } from './PmiLogo';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  UserCheck,
  Building,
  Award,
  Layers
} from 'lucide-react';

interface SusunanPanitiaProps {
  onBackToHome: () => void;
}

export const SusunanPanitia: React.FC<SusunanPanitiaProps> = ({ onBackToHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'Semua Struktur' },
    { id: 'SC', label: 'Pelindung & SC' },
    { id: 'OC', label: 'Pimpinan & Sekretariat' },
    { id: 'BIDANG 1', label: 'Bidang I (Kegiatan)' },
    { id: 'BIDANG 2', label: 'Bidang II (Sarpras & Medis)' },
    { id: 'BIDANG 3', label: 'Bidang III (Perlombaan)' },
  ];

  const filteredGroups = useMemo(() => {
    return DATA_SUSUNAN_PANITIA.filter(group => {
      // Tab filter
      if (selectedFilter === 'SC') {
        if (!group.judul.includes('PELINDUNG') && !group.judul.includes('STEERING COMMITTEE')) return false;
      } else if (selectedFilter === 'OC') {
        if (!group.judul.includes('PIMPINAN & SEKRETARIAT')) return false;
      } else if (selectedFilter === 'BIDANG 1') {
        if (!group.judul.includes('BIDANG I')) return false;
      } else if (selectedFilter === 'BIDANG 2') {
        if (!group.judul.includes('BIDANG II')) return false;
      } else if (selectedFilter === 'BIDANG 3') {
        if (!group.judul.includes('BIDANG III')) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inJudul = group.judul.toLowerCase().includes(query);
        const inSubJudul = group.subJudul?.toLowerCase().includes(query) || false;
        
        const inJabatan = group.daftarJabatan?.some(j => {
          const matchJab = j.jabatan.toLowerCase().includes(query);
          const matchNama = Array.isArray(j.nama)
            ? j.nama.some(n => n.toLowerCase().includes(query))
            : j.nama.toLowerCase().includes(query);
          return matchJab || matchNama;
        }) || false;

        const inSubBidang = group.subBidang?.some(sb => {
          const matchSeksi = sb.namaSeksi.toLowerCase().includes(query);
          const matchKoord = sb.koordinator?.toLowerCase().includes(query) || false;
          const matchAnggota = sb.anggota?.some(a => a.toLowerCase().includes(query)) || false;
          return matchSeksi || matchKoord || matchAnggota;
        }) || false;

        return inJudul || inSubJudul || inJabatan || inSubBidang;
      }

      return true;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Susunan Panitia</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-2xs font-bold text-red-700">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>SURAT KEPUTUSAN RESMI PMI KABUPATEN BANYUMAS</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              SUSUNAN PANITIA JUMBARA PMR MULA, MADYA DAN WIRA XXXII
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              PALANG MERAH INDONESIA KABUPATEN BANYUMAS TAHUN 2026
            </p>
          </div>

          <div className="shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>{INFO_KONTAK_PANITIA.email}</span>
            </div>
            <div className="flex items-center gap-2 font-mono font-semibold text-slate-800">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{INFO_KONTAK_PANITIA.nomerWa}</span>
            </div>
          </div>
        </div>

        {/* Live Search & Filter Bar (No print) */}
        <div className="pt-6 space-y-4 no-print">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama panitia, koordinator, atau seksi bidang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-red-500 text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="text-2xs text-slate-500 font-mono self-center">
              Menampilkan {filteredGroups.length} Kelompok Kepanitiaan
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Committee Cards List */}
      <div className="space-y-6">
        {filteredGroups.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-800">Nama atau seksi tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          filteredGroups.map((kelompok, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5 break-inside-avoid"
            >
              {/* Header Kelompok */}
              <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    {kelompok.judul}
                  </h2>
                  {kelompok.subJudul && (
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {kelompok.subJudul}
                    </p>
                  )}
                </div>
                <span className="text-2xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                  STRUKTUR RESMI
                </span>
              </div>

              {/* Daftar Jabatan Utama (Jika ada) */}
              {kelompok.daftarJabatan && kelompok.daftarJabatan.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {kelompok.daftarJabatan.map((j, jIdx) => (
                    <div 
                      key={jIdx} 
                      className={`p-4 rounded-2xl border transition-all ${
                        j.jabatan.toLowerCase().includes('ketua') || j.jabatan.toLowerCase().includes('pelindung')
                          ? 'bg-red-50/50 border-red-200'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <span className="text-2xs uppercase font-extrabold tracking-wider text-red-700 block mb-1">
                        {j.jabatan}
                      </span>
                      
                      {Array.isArray(j.nama) ? (
                        <ol className="list-decimal list-inside space-y-1 text-xs text-slate-800 font-semibold">
                          {j.nama.map((n, nIdx) => (
                            <li key={nIdx} className="leading-snug">
                              {n}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          {j.nama}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Daftar Sub Bidang / Seksi Teknis (Jika ada) */}
              {kelompok.subBidang && kelompok.subBidang.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-red-600" />
                    <span>Seksi & Sub Bidang Pelaksana Teknis:</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {kelompok.subBidang.map((seksi, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-red-300 transition-all space-y-2.5 shadow-2xs"
                      >
                        <div className="border-b border-slate-100 pb-2">
                          <h4 className="text-xs font-black text-slate-900 leading-tight">
                            {seksi.namaSeksi}
                          </h4>
                          {seksi.koordinator && (
                            <div className="mt-1 flex items-center gap-1 text-2xs text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-md inline-flex">
                              <UserCheck className="w-3 h-3 text-red-600 shrink-0" />
                              <span className="truncate">Koord: {seksi.koordinator}</span>
                            </div>
                          )}
                        </div>

                        {seksi.anggota && seksi.anggota.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-3xs uppercase font-bold text-slate-400 block tracking-wider">
                              Anggota ({seksi.anggota.length} orang):
                            </span>
                            <div className="text-2xs text-slate-700 space-y-0.5 max-h-36 overflow-y-auto pr-1">
                              {seksi.anggota.map((ang, aIdx) => (
                                <div key={aIdx} className="flex items-start gap-1 leading-snug">
                                  <span className="text-slate-400 font-mono text-3xs">{aIdx + 1}.</span>
                                  <span className="font-medium text-slate-800">{ang}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* Official Footer Note */}
      <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 text-xs text-slate-600 text-center space-y-1">
        <p className="font-bold text-slate-800">
          Palang Merah Indonesia Kabupaten Banyumas — Siaga, Tanggap, dan Melayani
        </p>
        <p className="text-2xs text-slate-500">
          Sekretariat Panitia Jumbara XXXII: Bumi Perkemahan PMI Kab. Banyumas · Email: {INFO_KONTAK_PANITIA.email} · Hotline: {INFO_KONTAK_PANITIA.nomerWa}
        </p>
      </div>

    </div>
  );
};
