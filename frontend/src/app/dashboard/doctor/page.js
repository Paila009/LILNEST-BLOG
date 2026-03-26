'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('lilnest_user');
    if (!stored) { router.push('/login'); return; }
    setUser(JSON.parse(stored));
  }, [router]);

  return (
    <div className="theme-doctor" style={{ '--accent': '#3b82f6', '--accent-light': '#eff6ff' }}>
      <Navbar user={user} onLogout={() => { localStorage.clear(); router.push('/login'); }} />
      <Sidebar role="doctor" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🩺 Doctor Dashboard
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 32 }}>Manage your patients and view medical records</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '👥', label: 'Patients', value: '—', bg: '#eff6ff', color: '#3b82f6' },
            { icon: '📅', label: 'Appointments', value: '—', bg: '#f0fdf4', color: '#10b981' },
            { icon: '⚠️', label: 'High Risk', value: '—', bg: '#fef2f2', color: '#ef4444' },
            { icon: '📊', label: 'Reports', value: '—', bg: '#f5f3ff', color: '#8b5cf6' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="icon-circle" style={{ background: s.bg, color: s.color, fontSize: '1.3rem' }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{s.label}</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#374151' }}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Patient List Placeholder */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, color: '#374151' }}>Recent Patients</h2>
        <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', marginBottom: 8 }}>👥</p>
          <p style={{ color: '#6b7280' }}>Patient data will appear here when connected to the backend.</p>
        </div>
      </main>
    </div>
  );
}
