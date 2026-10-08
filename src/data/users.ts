import { User } from '../types/auth';

export const DUMMY_USERS: User[] = [
  {
    id: 'USR-01',
    nama: 'Administrator Posko Jumbara',
    username: 'superadmin',
    password: 'admin123',
    role: 'SUPER ADMIN',
    bidang: 'SEMUA BIDANG',
    status: 'Aktif'
  },
  {
    id: 'USR-02',
    nama: 'Shinta Oktifianingrum, S.Pd (Sekretaris)',
    username: 'sekre',
    password: 'sekre123',
    role: 'SEKRETARIAT',
    bidang: 'SEKRETARIAT',
    status: 'Aktif'
  },
  {
    id: 'USR-03',
    nama: 'Dimas Saputra (Ketua Bidang I)',
    username: 'bidang 1',
    password: 'bidang 1 123',
    role: 'BIDANG 1',
    bidang: 'BIDANG 1',
    status: 'Aktif'
  },
  {
    id: 'USR-04',
    nama: 'Nur ‘Afiifah (Ketua Bidang II)',
    username: 'bidang 2',
    password: 'bidang 2 123',
    role: 'BIDANG 2',
    bidang: 'BIDANG 2',
    status: 'Aktif'
  },
  {
    id: 'USR-05',
    nama: 'Nida Lutfiyah (Ketua Bidang III)',
    username: 'bidang 3',
    password: 'bidang 3 123',
    role: 'BIDANG 3',
    bidang: 'BIDANG 3 - PERLOMBAAN',
    status: 'Aktif'
  }
];

export function findUserByCredentials(usernameInput: string, passwordInput: string): User | undefined {
  const cleanUser = usernameInput.trim().toLowerCase().replace(/\s+/g, ' ');
  const cleanPass = passwordInput.trim();

  return DUMMY_USERS.find(user => {
    const uName = user.username.toLowerCase();
    const uNameNoSpace = uName.replace(/\s+/g, '');
    const inputNoSpace = cleanUser.replace(/\s+/g, '');

    const matchUser = (uName === cleanUser) || (uNameNoSpace === inputNoSpace);
    const matchPass = (user.password === cleanPass) || (user.password?.replace(/\s+/g, '') === cleanPass.replace(/\s+/g, ''));

    return matchUser && matchPass;
  });
}
