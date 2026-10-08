export const KATEGORI_BY_TUJUAN: Record<string, string[]> = {
  'SEKRETARIAT': [
    'Registrasi Kontingen',
    'Data Peserta',
    'ID Card',
    'Surat/Dokumen',
    'Informasi Umum',
    'Perubahan Data',
    'Pendataan',
    'Lainnya'
  ],
  'BIDANG 1': [
    'Jadwal Kegiatan',
    'Teknis Kegiatan',
    'Materi Kegiatan',
    'Perubahan Kegiatan',
    'Informasi Kegiatan',
    'Kendala Kegiatan',
    'Lainnya'
  ],
  'BIDANG 2': [
    'Konsumsi',
    'Kesehatan',
    'Akomodasi',
    'Fasilitas Peserta',
    'Kebersihan',
    'Keamanan',
    'Kebutuhan Kontingen',
    'Lainnya'
  ],
  'BIDANG 3 - PERLOMBAAN': [
    'Jadwal Perlombaan',
    'Lokasi Perlombaan',
    'Ketentuan Perlombaan',
    'Teknis Perlombaan',
    'Peserta Perlombaan',
    'Juri/Penilaian',
    'Hasil Perlombaan',
    'Protes/Keberatan',
    'Peralatan Lomba',
    'Lainnya'
  ]
};

export const KATEGORI_SUGGESTIONS = [
  'Registrasi & Berkas Kontingen',
  'Data Peserta & ID Card',
  'Surat & Administrasi',
  'Konsumsi & Dapur Umum',
  'Kesehatan & Posko Medis',
  'Akomodasi & Tenda Kavling',
  'Perlengkapan & Sarana Prasarana',
  'Kebersihan Lingkungan',
  'Keamanan & Ketertiban (Pamdal)',
  'Kelistrikan & Penerangan',
  'Jadwal & Teknis Kegiatan',
  'Materi Kegiatan / Jumpa Bakti',
  'Temu Karya & Forum Forpis',
  'Jadwal Perlombaan',
  'Lokasi / Venue Lomba',
  'Ketentuan & Teknis Lomba',
  'Peralatan Lomba',
  'Dewan Juri & Penilaian',
  'Hasil Lomba & Rekap Nilai',
  'Protes & Keberatan Lomba',
  'Transportasi & Mobilitas',
  'Informasi Umum',
  'Lain-lain'
];

export const TUJUAN_SUGGESTIONS = [
  'SEKRETARIAT',
  'BIDANG 1 - KEGIATAN',
  'BIDANG 2 - SARPRAS, KESEHATAN & DAPUR UMUM',
  'BIDANG 3 - PERLOMBAAN',
  'Sub Bidang Dapur Umum / Konsumsi',
  'Sub Bidang Kesehatan / Pos Medis',
  'Sub Bidang Tempat & Kavling',
  'Sub Bidang Perlengkapan',
  'Sub Bidang Ketertiban & Keamanan',
  'Sub Bidang Pertolongan Pertama (PP)',
  'Sub Bidang Perawatan Keluarga (PK)',
  'Sub Bidang Donor Darah (DDS)',
  'Sub Bidang Ayo Siaga Bencana (ASB)',
  'Sub Bidang LCC',
  'Sub Bidang Jumpa / Bakti / Gembira',
  'Koordinator Posko Lapangan'
];

export const PIC_BY_BIDANG: Record<string, string[]> = {
  'SEKRETARIAT': [
    'Shinta Oktifianingrum, S.Pd. (Sekretaris)',
    'Eka Noviyanti, S.Pd. (Ketua Umum OC)',
    'Jimpit Supangati, S.Si (Pendamping Sekretaris)',
    'Neva Fitria Ramadani (Bendahara Sekretaris)',
    'Febi Rahma Auliya (Sie Sekretariat)',
    'Triana Nurhidayah (Sie Sekretariat)',
    'Inesagil Septiyani (Sie Sekretariat)',
    'Dianita Pratiwi (Sie Sekretariat)'
  ],
  'BIDANG 1': [
    'Dimas Saputra (Ketua Bidang I)',
    'Aulia Hanif Muhammad Adli (Koordinator Sub Bidang Jumpa)',
    'Basthomy Robby Abuyazid (Koordinator Sub Bidang Bakti)',
    'Adam Gunawan (Koordinator Sub Bidang Gembira)',
    'Anisa Tri Maulidha (Koordinator Sub Bidang Temu Karya)',
    'Marcelnino Aditya Shalih (Koordinator Forpis)',
    'Sentot Sugiarto, A.MK. (Pendamping Bidang I)',
    'Tri Eko Santoso (Pendamping Bidang I)'
  ],
  'BIDANG 2': [
    'Nur ‘Afiifah (Ketua Bidang II)',
    'Apt. Istianingrum, S. Farm (Koordinator Sub Bidang Dapur Umum)',
    'Geby Sukma Agnesya (Koordinator Sub Bidang Kesehatan)',
    'Devan Wahyudianto (Koordinator Sub Bidang Tempat/Kavling)',
    'Rizkya Januar (Koordinator Sub Bidang Perlengkapan)',
    'Nesa Santika Putri (Koordinator Sub Bidang Ketertiban & Pamdal)',
    'Saeful Haq Faruqi (Koordinator Sub Bidang Transportasi)',
    'Priyono (Pendamping Bidang II)',
    'Kusyaidin Budi Santoso (Pendamping Bidang II)'
  ],
  'BIDANG 3 - PERLOMBAAN': [
    'Nida Lutfiyah (Ketua Bidang III)',
    'Nevi Astika Ramadani (Koordinator Lomba Umum)',
    'Mutmainah Fahmi Karimatunisa, S.Pd. (Sie Soal & Rekap Nilai)',
    'Lutfiah Afidati (Koordinator Sub Bidang Pertolongan Pertama)',
    'Dwi Saskia (Koordinator Sub Bidang Perawatan Keluarga)',
    'Cantika Sondra Rizkiana (Koordinator Sub Bidang PRS)',
    'Lintang Azfa (Koordinator Sub Bidang Donor Darah)',
    'Zaky Faza Afrizal (Koordinator Sub Bidang ASB)',
    'Luthi Khoeriyah (Koordinator Sub Bidang Kepemimpinan)',
    'Dzaki Gentur Syahputra (Koordinator Sub Bidang Kepalangmerahan)',
    'Nanda Solihah (Koordinator Sub Bidang Game Kepalangmerahan)',
    'Frengki Saputra (Koordinator Sirkulator Arena)',
    'Irsyad Prio Ambodo, S. Kom (Pendamping Bidang III)'
  ],
  'SEMUA BIDANG': [
    'Eka Noviyanti, S.Pd. (Ketua Umum OC)',
    'Shinta Oktifianingrum, S.Pd. (Sekretaris OC)',
    'Dimas Saputra (Ketua Bidang I)',
    'Nur ‘Afiifah (Ketua Bidang II)',
    'Nida Lutfiyah (Ketua Bidang III)',
    'Apt. Istianingrum, S. Farm (Koordinator Dapur Umum)',
    'Geby Sukma Agnesya (Koordinator Posko Kesehatan)',
    'Nesa Santika Putri (Koordinator Ketertiban)',
    'Posko Terpadu Lapangan PMI'
  ]
};
