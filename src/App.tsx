import React, { useState, useEffect } from 'react';
import { Pengaduan, StatusPengaduan } from './types/pengaduan';
import { User } from './types/auth';
import { INITIAL_DUMMY_PENGADUAN } from './data/dummyData';
import { Navbar } from './components/Navbar';
import { PublicHero } from './components/PublicHero';
import { FormPengaduan } from './components/FormPengaduan';
import { CekStatusPengaduan } from './components/CekStatusPengaduan';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminTable } from './components/AdminTable';
import { AdminDetailModal } from './components/AdminDetailModal';
import { StatistikCharts } from './components/StatistikCharts';
import { SusunanPanitia } from './components/SusunanPanitia';
import { PmiLogo } from './components/PmiLogo';
import { RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'jumbara_banyumas_pengaduan_2026_v2';
const AUTH_STORAGE_KEY = 'jumbara_banyumas_auth_user_v2';

export default function App() {
  // Load data from localStorage or dummyData
  const [data, setData] = useState<Pengaduan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return INITIAL_DUMMY_PENGADUAN;
  });

  // Current authenticated user (admin)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Error reading auth storage', e);
    }
    return null;
  });

  // Navigation View: 'home' | 'buat' | 'cek' | 'panitia' | 'admin-dashboard' | 'admin-tabel' | 'admin-charts' | 'login'
  const [currentView, setCurrentView] = useState<'home' | 'buat' | 'cek' | 'panitia' | 'admin-dashboard' | 'admin-tabel' | 'admin-charts' | 'login'>(() => {
    return currentUser ? 'admin-dashboard' : 'home';
  });

  // State for pre-filling "Cek Status"
  const [selectedTicketForCheck, setSelectedTicketForCheck] = useState<string>('');

  // Table filter state when navigating from dashboard
  const [tableStatusFilter, setTableStatusFilter] = useState<string>('ALL');

  // Modal detail for Admin
  const [activeAdminDetailItem, setActiveAdminDetailItem] = useState<Pengaduan | null>(null);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }, [data]);

  // Sync auth to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving auth to localStorage', e);
    }
  }, [currentUser]);

  // Auto-generate next ticket number in format: JBR26-0001
  const getNextTicketId = () => {
    const existingNumbers = data
      .map(item => {
        const match = item.id_pengaduan.match(/JBR26-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(n => !isNaN(n));

    const maxNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
    const nextNum = maxNum + 1;
    return `JBR26-${String(nextNum).padStart(4, '0')}`;
  };

  // Handle add new complaint from form
  const handleAddNewPengaduan = (newTicket: Pengaduan) => {
    setData(prev => [newTicket, ...prev]);
  };

  // Handle rating update by complainant
  const handleUpdateRating = (ticketId: string, rating: number) => {
    setData(prev => prev.map(item => {
      if (item.id_pengaduan === ticketId) {
        return { ...item, rating };
      }
      return item;
    }));
  };

  // Quick status update from admin table row
  const handleQuickUpdateStatus = (ticketId: string, newStatus: StatusPengaduan) => {
    const now = new Date();
    const updateTime = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setData(prev => prev.map(item => {
      if (item.id_pengaduan === ticketId) {
        let waktuRespon = item.waktu_respon;
        let waktuSelesai = item.waktu_selesai;

        if (newStatus === 'DIPROSES' && !waktuRespon) {
          waktuRespon = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        }
        if (newStatus === 'SELESAI' && !waktuSelesai) {
          waktuSelesai = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          if (!waktuRespon) waktuRespon = waktuSelesai;
        }

        return {
          ...item,
          status: newStatus,
          waktu_respon: waktuRespon,
          waktu_selesai: waktuSelesai,
          waktu_update: updateTime
        };
      }
      return item;
    }));
  };

  // Save updated complaint from Admin Detail Modal
  const handleSaveAdminDetail = (updated: Pengaduan) => {
    setData(prev => prev.map(item => item.id_pengaduan === updated.id_pengaduan ? updated : item));
    setActiveAdminDetailItem(null);
  };

  // Admin login success
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentView('admin-dashboard');
  };

  // Admin logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Reset to initial dummy data
  const handleResetData = () => {
    if (window.confirm('Reset seluruh data pengaduan ke 22 data dummy simulasi Jumbara 2026?')) {
      setData(INITIAL_DUMMY_PENGADUAN);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DUMMY_PENGADUAN));
    }
  };

  const pendingCount = data.filter(d => d.status === 'BARU').length;
  const selesaiCount = data.filter(d => d.status === 'SELESAI' || d.status === 'DITUTUP').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      
      {/* Navbar with official branding and role-aware navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'admin-tabel') {
            setTableStatusFilter('ALL');
          }
          setCurrentView(view);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        totalPendingCount={pendingCount}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-24 md:py-6">
        
        {/* VIEW 1: HOME (Public Landing Page) */}
        {currentView === 'home' && (
          <PublicHero
            onOpenForm={() => setCurrentView('buat')}
            onOpenCheckStatus={() => {
              setSelectedTicketForCheck('');
              setCurrentView('cek');
            }}
            onOpenPanitia={() => setCurrentView('panitia')}
            totalPengaduan={data.length}
            selesaiCount={selesaiCount}
          />
        )}

        {/* VIEW 2: BUAT PENGADUAN (Public Form) */}
        {currentView === 'buat' && (
          <FormPengaduan
            nextTicketId={getNextTicketId()}
            onSubmit={handleAddNewPengaduan}
            onCheckStatus={(ticketId) => {
              setSelectedTicketForCheck(ticketId);
              setCurrentView('cek');
            }}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 3: CEK STATUS PENGADUAN (Public Status Tracking) */}
        {currentView === 'cek' && (
          <CekStatusPengaduan
            data={data}
            initialTicketId={selectedTicketForCheck}
            onBackToHome={() => setCurrentView('home')}
            onUpdateRating={handleUpdateRating}
          />
        )}

        {/* VIEW 4: SUSUNAN PANITIA JUMBARA 2026 */}
        {currentView === 'panitia' && (
          <SusunanPanitia
            onBackToHome={() => setCurrentView(currentUser ? 'admin-dashboard' : 'home')}
          />
        )}

        {/* VIEW 5: LOGIN ADMIN */}
        {currentView === 'login' && (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {currentView === 'admin-dashboard' && currentUser && (
          <AdminDashboard
            data={data}
            currentUser={currentUser}
            onNavigateToTable={(statusFilter = 'ALL') => {
              setTableStatusFilter(statusFilter);
              setCurrentView('admin-tabel');
            }}
            onNavigateToCharts={() => setCurrentView('admin-charts')}
            onOpenDetailModal={(item) => setActiveAdminDetailItem(item)}
          />
        )}

        {/* VIEW 6: ADMIN TABEL PENGADUAN */}
        {currentView === 'admin-tabel' && currentUser && (
          <AdminTable
            data={data}
            currentUser={currentUser}
            onOpenDetailModal={(item) => setActiveAdminDetailItem(item)}
            onQuickUpdateStatus={handleQuickUpdateStatus}
            initialStatusFilter={tableStatusFilter}
          />
        )}

        {/* VIEW 7: ADMIN STATISTIK & CHARTS */}
        {currentView === 'admin-charts' && currentUser && (
          <StatistikCharts
            data={data}
            currentUser={currentUser}
            onBackToDashboard={() => setCurrentView('admin-dashboard')}
          />
        )}

      </main>

      {/* Official PMI Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 mb-16 md:mb-0 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <PmiLogo size="sm" showText={false} />
            <div>
              <p className="font-extrabold text-slate-800 uppercase tracking-tight">
                LAYANAN PENGADUAN KONTINGEN — JUMBARA PMR PMI KABUPATEN BANYUMAS 2026
              </p>
              <p className="text-2xs text-slate-400 font-medium">
                Tingkat Mula (SD) • Madya (SMP) • Wira (SMA/SMK) · Palang Merah Indonesia Kabupaten Banyumas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-2xs">
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-red-700 transition-colors cursor-pointer"
              title="Reset ke 22 data dummy simulasi"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data Simulasi</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-600 font-semibold">{data.length} Tiket Terdata</span>
          </div>
        </div>
      </footer>

      {/* Admin Detail & Edit Modal */}
      {currentUser && activeAdminDetailItem && (
        <AdminDetailModal
          pengaduan={activeAdminDetailItem}
          currentUser={currentUser}
          onClose={() => setActiveAdminDetailItem(null)}
          onSave={handleSaveAdminDetail}
        />
      )}

    </div>
  );
}
