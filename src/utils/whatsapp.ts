/**
 * Format Indonesian telephone number to international format (628...)
 */
export function formatToWhatsAppNumber(rawNumber: string): string {
  if (!rawNumber) return '';
  let cleaned = rawNumber.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

export function generateWhatsAppLink(phone: string, text: string): string {
  const formattedPhone = formatToWhatsAppNumber(phone);
  if (!formattedPhone) return '#';
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
}

export function buildOfficialResponseWhatsAppMessage(
  namaPelapor: string,
  idPengaduan: string,
  judul: string,
  status: string,
  tindakLanjut: string,
  pic: string
): string {
  return `*PEMBERITAHUAN PENANGANAN PENGADUAN ACARA PMI*
--------------------------------------------------
Yth. Rekan *${namaPelapor}*,

Terima kasih atas laporan Anda pada posko pengaduan acara kepalangmerahan.
Berikut rincian status pengaduan Anda:

• *ID Pengaduan*: ${idPengaduan}
• *Perihal*: ${judul}
• *Status*: ${status.toUpperCase()}
• *Petugas (PIC)*: ${pic || 'Tim Posko Lapangan'}
• *Tindak Lanjut*:
${tindakLanjut || 'Sedang dalam koordinasi tim terkait.'}

Mohon dapat dicek di lokasi. Jika ada kendala lebih lanjut, silakan balas pesan ini.

_Salam Kemanusiaan,_
*Posko Layanan Pengaduan & Informasi PMI*`;
}
