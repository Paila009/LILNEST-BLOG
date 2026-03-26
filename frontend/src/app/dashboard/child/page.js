'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';

export default function ChildDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('lilnest_user');
    if (!stored) { router.push('/login'); return; }
    setUser(JSON.parse(stored));
  }, [router]);

  const milestones = [
    { age: '0-3 mo', items: ['Lifts head', 'Smiles', 'Follows objects', 'Coos/babbles'] },
    { age: '3-6 mo', items: ['Rolls over', 'Reaches for toys', 'Laughs', 'Sits with support'] },
    { age: '6-9 mo', items: ['Sits alone', 'Crawls', 'Babbles "mama/dada"', 'Transfers objects'] },
    { age: '9-12 mo', items: ['Pulls to stand', 'First words', 'Pincer grasp', 'Waves bye'] },
  ];

  return (
    <div className="theme-child" style={{ '--accent': '#fbbf24', '--accent-light': '#fef9c3' }}>
      <Navbar user={user} onLogout={() => { localStorage.clear(); router.push('/login'); }} />
      <Sidebar role="child" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🧸 Child Dashboard
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 32 }}>Track your little one&apos;s growth and milestones</p>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📏', label: 'Height', value: '—', bg: '#fef9c3' },
            { icon: '⚖️', label: 'Weight', value: '—', bg: '#f0fdf4' },
            { icon: '🍼', label: 'Feeding', value: '—', bg: '#eff6ff' },
            { icon: '😴', label: 'Sleep', value: '—', bg: '#f5f3ff' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="icon-circle" style={{ background: s.bg, fontSize: '1.3rem' }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{s.label}</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#374151' }}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestones */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, color: '#374151' }}>🎯 Development Milestones</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {milestones.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{m.age}</h3>
              {m.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <input type="checkbox" style={{ accentColor: '#f59e0b', width: 16, height: 16 }} />
                  <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>{item}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
