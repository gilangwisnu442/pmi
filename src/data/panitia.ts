export interface PanitiaJabatan {
  jabatan: string;
  nama: string | string[];
  keterangan?: string;
}

export interface PanitiaSeksi {
  namaSeksi: string;
  koordinator?: string;
  anggota?: string[];
  deskripsi?: string;
}

export interface PanitiaKelompok {
  judul: string;
  subJudul?: string;
  daftarJabatan?: PanitiaJabatan[];
  subBidang?: PanitiaSeksi[];
}

export const DATA_SUSUNAN_PANITIA: PanitiaKelompok[] = [
  {
    judul: 'PELINDUNG & PENASEHAT',
    subJudul: 'PMI Kabupaten Banyumas',
    daftarJabatan: [
      {
        jabatan: 'Pelindung',
        nama: 'Drs. Nungky Hary Rachmat, M.Si'
      },
      {
        jabatan: 'Penasehat',
        nama: 'Dr. Tangguh Budi Prasetyo, SH., M.H., CPM'
      }
    ]
  },
  {
    judul: 'PANITIA PENGARAH / STEERING COMMITTEE (SC)',
    subJudul: 'Arahan & Kebijakan Strategis Jumbara XXXII',
    daftarJabatan: [
      {
        jabatan: 'Ketua SC',
        nama: 'Ir’syam Prihadi, S.Sos., M.Si.'
      },
      {
        jabatan: 'Sekretaris SC',
        nama: [
          'Dibyo Yuwono, S.Pd',
          'Kusworo, S.ST., CH'
        ]
      },
      {
        jabatan: 'Anggota SC',
        nama: [
          'Ir. Cipto Waluyo',
          'Kusworo, S.ST., CH',
          'Fatah Mokhamad Sutopo',
          'dr. Gondo Wulandari',
          'Muslikhin, S.K.M',
          'dr. Rendi Retissu',
          'Bambang Margono, S.K.M',
          'Lilik Darmawan, S.H., M.H.',
          'Drs. Khoerudin, S.H., M.H.',
          'Mukti Fidianto, S.E.'
        ]
      }
    ]
  },
  {
    judul: 'PANITIA PELAKSANA / ORGANIZING COMMITTEE (OC) - PIMPINAN & SEKRETARIAT',
    subJudul: 'Manajemen Operasional & Kesekretariatan',
    daftarJabatan: [
      {
        jabatan: 'Pendamping Ketua',
        nama: 'Ir. Ariono Poerwanto BP., M.T.'
      },
      {
        jabatan: 'Ketua Umum OC',
        nama: 'Eka Noviyanti, S.Pd.'
      },
      {
        jabatan: 'Pendamping Sekretaris',
        nama: [
          'Jimpit Supangati, S.Si',
          'Fauzaan Alpriyoga R., A.Md., Ak.'
        ]
      },
      {
        jabatan: 'Sekretaris',
        nama: 'Shinta Oktifianingrum, S.Pd.'
      },
      {
        jabatan: 'Bendahara Sekretaris',
        nama: 'Neva Fitria Ramadani'
      },
      {
        jabatan: 'Pendamping Bendahara',
        nama: 'Nensi Febriani, S.E.'
      },
      {
        jabatan: 'Bendahara',
        nama: [
          'Uswah Nur Zakiyah',
          'Aninda Maitsatunnuha'
        ]
      },
      {
        jabatan: 'Tim Kurasi',
        nama: [
          'Sumiyati, S.Pd.',
          'Ginanjar Arif Widodo, S.E.',
          'Naniek Elistiana Nugrahaeny, S.Kom., M.Pd.',
          'Nuke Andriani, S.Si.'
        ]
      },
      {
        jabatan: 'Anggota Sekretariat',
        nama: [
          'Febi Rahma Auliya',
          'Triana Nurhidayah',
          'Inesagil Septiyani',
          'Dianita Pratiwi',
          'Aulia Khoerunnisa',
          'Sulia Fitri Hasanah',
          'Risky Dwi Wulandari',
          'A. Triani',
          'Laila Putri Salsabila',
          'Raihanatul Faidah',
          'Vellisa Indah Salsabilla',
          'Dimas Irgi Prasetyo',
          'Galih',
          'Arya Drajat',
          'Talitha Ayu Wardani'
        ]
      }
    ]
  },
  {
    judul: 'BIDANG I - KEGIATAN & JUMPA BAKTI GEMBIRA',
    subJudul: 'Pengelolaan Teknis Kegiatan, Bakti Lingkungan, & Forum Remaja',
    daftarJabatan: [
      {
        jabatan: 'Pendamping Bidang I',
        nama: [
          'Sentot Sugiarto, A.MK.',
          'Tri Eko Santoso'
        ]
      },
      {
        jabatan: 'Ketua Bidang I',
        nama: 'Dimas Saputra'
      },
      {
        jabatan: 'Bendahara Bidang I',
        nama: 'Dill Thafa Jausha'
      }
    ],
    subBidang: [
      {
        namaSeksi: 'Sub Bidang Jumpa',
        koordinator: 'Aulia Hanif Muhammad Adli',
        anggota: [
          'Bihas Bilham Syah Nu’man',
          'Maulidia Oktaviana',
          'Rahayu Anggun Vibrina',
          'Uli Asri Fadilah',
          'Charisa Febryana Putri',
          'Rivellia Yulianti Tajudin',
          'Devani Siti Warohmah',
          'Torif',
          'Ines Faradina'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Bakti',
        koordinator: 'Basthomy Robby Abuyazid',
        anggota: [
          'Hendra Romadon',
          'Eka Firmani',
          'Nur Alfia Ramadani',
          'Elsa Dwi Rizqiyanti',
          'Ibrahim Kholil Ahmad',
          'Berliana Aulia',
          'Nila Ika Nur Alia',
          'Munafatin Nabilah',
          'Aprilia Dwi Azzahra',
          'Harits Affandy Nugroho'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Gembira',
        koordinator: 'Adam Gunawan',
        anggota: [
          'Amelia Wiharja',
          'Baha Udin Jazuli',
          'Maura Novita Zachra',
          'Fadellin Rivi Aurel Azaria',
          'Dian Munfiatul Anisa',
          'Tika Santri Mapitri',
          'Khaeroon Nizi',
          'Maryam Salma Bani Ashilah',
          'Hanindita Azalia Zahra',
          'Andrianto'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Temu Karya',
        koordinator: 'Anisa Tri Maulidha',
        anggota: [
          'Dimas Syahrul Ramadhan',
          'Dimas Ginanjar',
          'Tiara Alvina Fitrianto',
          'Salsabilla Vici Islaminajwa',
          'Nur Saili Rohmah',
          'Fitri Nur Kholifah',
          'Nathania Amelia Putri',
          'Faridah Rahmatul Hasna',
          'Fatika Nur Hanifah'
        ]
      },
      {
        namaSeksi: 'Forum Palang Merah Remaja Indonesia (Forpis)',
        koordinator: 'Marcelnino Aditya Shalih',
        anggota: [
          'Raffika Ramadhani Saputra',
          'Lingga Efan Setiawan',
          'Ziya Tasfiyaa Pangaribowo',
          'Ariinii Rifaa’ah',
          'Aska Naufal Elfrian',
          'Azkiya Salsabila',
          'Keyla Asmira Rahmatika',
          'Chayyira Najla Mutia',
          'Keysha Abella Meira Sarjito'
        ]
      }
    ]
  },
  {
    judul: 'BIDANG II - SARANA PRASARANA, LOGISTIK, KESEHATAN & KEAMANAN',
    subJudul: 'Akomodasi, Dapur Umum, Pos Medis, & Pamdal',
    daftarJabatan: [
      {
        jabatan: 'Pendamping Bidang II',
        nama: [
          'Priyono',
          'Kusyaidin Budi Santoso'
        ]
      },
      {
        jabatan: 'Ketua Bidang II',
        nama: 'Nur ‘Afiifah'
      },
      {
        jabatan: 'Bendahara Bidang II',
        nama: 'Devan Wahyudianto'
      }
    ],
    subBidang: [
      {
        namaSeksi: 'Sub Bidang Tempat / Kavling',
        koordinator: 'Devan Wahyudianto',
        anggota: [
          'Kuswanto, S.Kom',
          'Yatino',
          'Budi',
          'Tohir',
          'Martin Fajar T.A',
          'Ahmad, S.Kom',
          'Rausyan Fikri Rabbani',
          'Singgih Akbar P',
          'Cindy Febriani'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Perlengkapan',
        koordinator: 'Rizkya Januar',
        anggota: [
          'Difa Ibnu Sabil',
          'Zen Handung Galih',
          'Muhammad Fajri Fushtho',
          'Mohammad Reyhan Aretha Fatin',
          'Aflakhah Budiarti',
          'Suci Rahmadani',
          'Fiah Maimunah',
          'Qouwiyatun Nurul Hikmah',
          'Fahmi Tri Wasyhadi'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Dapur Umum / Konsumsi',
        koordinator: 'Apt. Istianingrum, S. Farm',
        anggota: [
          'Agus',
          'Riana Damayanti, A.Md. Ak',
          'Fatikhatu Ufriza',
          'Amaria Nur Zamthu',
          'Jhazkia Putri Rizan',
          'Salistiani',
          'Verina Wafiani',
          'Nita Novian Nur Rahmawati',
          'Dewi Fatika',
          'Ergiea A'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Kesehatan / Posko Medis',
        koordinator: 'Geby Sukma Agnesya',
        anggota: [
          'Adina Dwi Saputri',
          'Brilliant Mutia Sari',
          'Rahma Mutia Sari',
          'Zulfa Khumairoh',
          'Dewi Aulia Nur Aini',
          'Devi Arisanti Setiawan',
          'Lusiana Herawati',
          'Melda Amalia Wafiq N.A',
          'Khalifah Lilis Safitri',
          'Choirunnajwaa AS'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Ketertiban & Keamanan (Pamdal)',
        koordinator: 'Nesa Santika Putri',
        anggota: [
          'Muhammad Rifqi',
          'Andre Avril Saputra',
          'Nafachatur Robbaniyyah',
          'Gilang Wisnu Syabani',
          'Singgih Akbar P.'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Transportasi',
        koordinator: 'Saeful Haq Faruqi',
        anggota: [
          'Cheky Indra Pratama',
          'Alif Nuraziz, S. Kom'
        ]
      }
    ]
  },
  {
    judul: 'BIDANG III - PERLOMBAAN KEPALANGMERAHAN',
    subJudul: 'Dewan Juri, Soal, Rekapitulasi, & Cabang Uji Lomba',
    daftarJabatan: [
      {
        jabatan: 'Pendamping Bidang III',
        nama: [
          'Irsyad Prio Ambodo, S. Kom',
          'Mifthakhurrohman'
        ]
      },
      {
        jabatan: 'Ketua Bidang III',
        nama: 'Nida Lutfiyah'
      },
      {
        jabatan: 'Bendahara Bidang III',
        nama: 'Asha Adiawantri, S.Pd.'
      },
      {
        jabatan: 'Bidang Soal dan Rekap Nilai',
        nama: [
          'Mutmainah Fahmi Karimatunisa, S.Pd.',
          'Sheva Aditya Ramadhan',
          'Zumrotul Khasanah',
          'Adelya Rahma Ramadhani',
          'Alifa Riswianni',
          'Laila Syafangatun Marhumah'
        ]
      },
      {
        jabatan: 'Koordinator Lomba Umum',
        nama: [
          'Nevi Astika Ramadani (Koordinator)',
          'Fabian Adi Prabhawa Putra',
          'Zena Kirana Madhuswara',
          'Ollif Nurjannah'
        ]
      }
    ],
    subBidang: [
      {
        namaSeksi: 'Sub Bidang Pertolongan Pertama (PP)',
        koordinator: 'Lutfiah Afidati',
        anggota: [
          'Tessa Adelia Nova',
          'Aisyah Dwi Wulandari',
          'Zen Asyafa Rohmah'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Perawatan Keluarga (PK)',
        koordinator: 'Dwi Saskia',
        anggota: [
          'Meila Avdaera Vega',
          'Riris Kencana Widi',
          'Jesika Dita Anggraeni'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Pendidikan Remaja Sebaya (PRS)',
        koordinator: 'Cantika Sondra Rizkiana',
        anggota: [
          'Puni Rahmadani',
          'Fifi Farihatun',
          'Fina Risti Fatonah'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Donor Darah Sukarela (DDS)',
        koordinator: 'Lintang Azfa',
        anggota: [
          'Mukti Kancana Nugraha',
          'Tegar Ramadhan Saputra',
          'Sofi Rahmania Azzahri'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Ayo Siaga Bencana (ASB)',
        koordinator: 'Zaky Faza Afrizal',
        anggota: [
          'Dita Puput Setiyaningsih',
          'Ita Nur Izzah'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Kepemimpinan',
        koordinator: 'Luthi Khoeriyah',
        anggota: [
          'Yuni Fatikhah'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Kepalangmerahan',
        koordinator: 'Dzaki Gentur Syahputra',
        anggota: [
          'Arinda Ramadani',
          'Sifa Salsa Nabila',
          'Salsa Fadhilah'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Game Kepalangmerahan',
        koordinator: 'Nanda Solihah',
        anggota: [
          'Lenita Dewi Selviana',
          'Calista Laila Putri'
        ]
      },
      {
        namaSeksi: 'Sub Bidang Lomba Cerdas Cermat (LCC)',
        koordinator: 'Nida Luftiyah',
        anggota: [
          'Vika Julian Firnadriani',
          'Eka Laras Safitri',
          'Rahma Dwi Putri',
          'Qanita Salma',
          'Tsaqif Taqiyulloh Jabar Ro’uf'
        ]
      },
      {
        namaSeksi: 'Koordinator Sirkulator / Teknis Arena',
        koordinator: 'Frengki Saputra',
        anggota: [
          'Tri Ibnu Abdul Yusuf'
        ]
      }
    ]
  }
];

export const INFO_KONTAK_PANITIA = {
  namaKegiatan: 'JUMBARA PMR MULA, MADYA DAN WIRA XXXII PMI KABUPATEN BANYUMAS TAHUN 2026',
  email: 'panitianlapangan01@gmail.com',
  nomerWa: '+62 857-2486-9383',
  nomerWaRaw: '085724869383',
  alamat: 'Bumi Perkemahan PMI Kabupaten Banyumas'
};
