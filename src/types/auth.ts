export type UserRole = 
  | 'SUPER ADMIN'
  | 'SEKRETARIAT'
  | 'BIDANG 1'
  | 'BIDANG 2'
  | 'BIDANG 3';

export interface User {
  id: string;
  nama: string;
  username: string;
  password?: string;
  role: UserRole;
  bidang: string;
  status: 'Aktif' | 'Nonaktif';
}
