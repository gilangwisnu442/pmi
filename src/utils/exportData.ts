import { Pengaduan } from '../types/pengaduan';

export function exportToCSV(data: Pengaduan[], filename = 'pengaduan_jumbara_pmr_banyumas_2026.csv') {
  const headers = [
    'Nomor Tiket',
    'Tanggal',
    'Jam',
    'Nama Kontingen',
    'Tingkat PMR',
    'Nama Pelapor',
    'No WhatsApp',
    'Tujuan Pengaduan',
    'Kategori',
    'Lokasi Kejadian',
    'Judul Pengaduan',
    'Detail Pengaduan',
    'Bukti Lampiran',
    'Tingkat Prioritas',
    'Status Pengaduan',
    'PIC Petugas',
    'Tindak Lanjut',
    'Catatan Internal',
    'Waktu Respon',
    'Waktu Selesai',
    'Rating',
    'Waktu Update'
  ];

  const escapeCell = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = data.map(item => [
    item.id_pengaduan,
    item.tanggal,
    item.jam,
    item.nama_kontingen,
    item.tingkat_pmr,
    item.nama_pelapor,
    item.no_whatsapp,
    item.tujuan_pengaduan,
    item.kategori,
    item.lokasi,
    item.judul_pengaduan,
    item.detail_pengaduan,
    item.bukti,
    item.prioritas,
    item.status,
    item.pic,
    item.tindak_lanjut,
    item.catatan_internal,
    item.waktu_respon,
    item.waktu_selesai,
    item.rating !== null ? item.rating : '',
    item.waktu_update || ''
  ]);

  const csvContent = '\uFEFF' + [
    headers.map(escapeCell).join(','),
    ...rows.map(row => row.map(escapeCell).join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, filename);
}

export function exportToExcel(data: Pengaduan[], filename = 'rekap_pengaduan_jumbara_banyumas_2026.xls') {
  // Generate HTML spreadsheet format natively recognized by MS Excel
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Pengaduan Jumbara 2026</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        th { background-color: #DC2626; color: #FFFFFF; font-weight: bold; border: 1px solid #999; }
        td { border: 1px solid #ccc; font-family: sans-serif; font-size: 11px; }
      </style>
    </head>
    <body>
      <h2>REKAPITULASI PENGADUAN KONTINGEN JUMBARA PMR PMI KABUPATEN BANYUMAS 2026</h2>
      <table border="1">
        <thead>
          <tr>
            <th>No Tiket</th>
            <th>Tanggal</th>
            <th>Jam</th>
            <th>Kontingen</th>
            <th>Tingkat PMR</th>
            <th>Nama Pelapor</th>
            <th>No WhatsApp</th>
            <th>Tujuan Pengaduan</th>
            <th>Kategori</th>
            <th>Lokasi Kejadian</th>
            <th>Judul Pengaduan</th>
            <th>Detail Pengaduan</th>
            <th>Prioritas</th>
            <th>Status</th>
            <th>PIC Petugas</th>
            <th>Tindak Lanjut</th>
            <th>Catatan Internal</th>
            <th>Waktu Update</th>
          </tr>
        </thead>
        <tbody>
  `;

  data.forEach(item => {
    html += `
      <tr>
        <td>${escapeHtml(item.id_pengaduan)}</td>
        <td>${escapeHtml(item.tanggal)}</td>
        <td>${escapeHtml(item.jam)}</td>
        <td>${escapeHtml(item.nama_kontingen)}</td>
        <td>${escapeHtml(item.tingkat_pmr)}</td>
        <td>${escapeHtml(item.nama_pelapor)}</td>
        <td>${escapeHtml(item.no_whatsapp)}</td>
        <td>${escapeHtml(item.tujuan_pengaduan)}</td>
        <td>${escapeHtml(item.kategori)}</td>
        <td>${escapeHtml(item.lokasi)}</td>
        <td>${escapeHtml(item.judul_pengaduan)}</td>
        <td>${escapeHtml(item.detail_pengaduan)}</td>
        <td>${escapeHtml(item.prioritas)}</td>
        <td>${escapeHtml(item.status)}</td>
        <td>${escapeHtml(item.pic)}</td>
        <td>${escapeHtml(item.tindak_lanjut)}</td>
        <td>${escapeHtml(item.catatan_internal)}</td>
        <td>${escapeHtml(item.waktu_update || '')}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
  triggerDownload(blob, filename);
}

function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function triggerDownload(blob: Blob, filename: string) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
