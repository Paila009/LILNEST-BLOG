'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { dashboardAPI } from '@/services/api';

const statCards = [
  { icon: '💧', label: 'Water', key: 'water_intake_ml', unit: 'ml', color: '#3b82f6', bg: '#eff6ff' },
  { icon: '😴', label: 'Sleep', key: 'sleep_hours', unit: 'hrs', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: '👣', label: 'Steps', key: 'steps', unit: '', color: '#10b981', bg: '#f0fdf4' },
  { icon: '😊', label: 'Mood', key: 'mood', unit: '', color: '#f59e0b', bg: '#fef9c3' },
];

const quickActions = [
  { icon: '🩺', label: 'Log Symptoms', href: '/ai/symptoms' },
  { icon: '🥗', label: 'Get Diet Plan', href: '/ai/diet' },
  { icon: '🏋️', label: 'Workout', href: '/ai/fitness' },
  { icon: '💊', label: 'Medications', href: '/medical' },
  { icon: '🧬', label: '3D Baby', href: '/fetal-viewer' },
  { icon: '🆘', label: 'Emergency', href: '/emergency' },
];

export default function MotherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('lilnest_user');
    if (!stored) { router.push('/login'); return; }
    setUser(JSON.parse(stored));

    dashboardAPI.getSummary()
      .then(res => setSummary(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('lilnest_token');
    localStorage.removeItem('lilnest_user');
    router.push('/login');
  };

  return (
    <div className="theme-mother">
      <Navbar user={user} onLogout={handleLogout} />
      <Sidebar role={user?.role || 'mother'} />

      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151' }}>
            Hello, {user?.full_name?.split(' ')[0] || 'Mama'} 💝
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginTop: 4 }}>
            {summary?.trimester ? `Trimester ${summary.trimester}` : 'How are you feeling today?'}
            {summary?.due_date ? ` · Due: ${summary.due_date}` : ''}
          </p>
        </motion.div>

        {/* Health Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {statCards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
              style={{ display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div className="icon-circle" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{card.label}</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#374151' }}>
                  {loading ? '...' : (summary?.latest_health?.[card.key] || '—')}{card.unit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: 32 }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, color: '#374151' }}>
            Quick Actions ⚡
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {quickActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(action.href)}
                className="glass-card"
                style={{
                  padding: 20, border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4b5563' }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Health Log Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card"
          style={{ padding: 28 }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, color: '#374151' }}>
            Log Today&apos;s Health 📝
          </h2>
          <HealthLogForm />
        </motion.div>
      </main>
    </div>
  );
}

function HealthLogForm() {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    water_intake_ml: '', sleep_hours: '', steps: '', mood: 'okay',
  });
  const [submitted, setSubmitted] = useState(false);

  const moods = ['great', 'good', 'okay', 'low', 'bad'];
  const moodIcons = { great: '🤩', good: '😊', okay: '😐', low: '😟', bad: '😢' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dashboardAPI.addHealthLog({
        ...form,
        water_intake_ml: parseInt(form.water_intake_ml) || 0,
        sleep_hours: parseFloat(form.sleep_hours) || 0,
        steps: parseInt(form.steps) || 0,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Failed to log health:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: 6, display: 'block' }}>💧 Water (ml)</label>
          <input type="number" className="input-field" placeholder="2000" value={form.water_intake_ml}
            onChange={(e) => setForm({ ...form, water_intake_ml: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: 6, display: 'block' }}>😴 Sleep (hrs)</label>
          <input type="number" step="0.5" className="input-field" placeholder="8" value={form.sleep_hours}
            onChange={(e) => setForm({ ...form, sleep_hours: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: 6, display: 'block' }}>👣 Steps</label>
          <input type="number" className="input-field" placeholder="5000" value={form.steps}
            onChange={(e) => setForm({ ...form, steps: e.target.value })} />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: 8, display: 'block' }}>😊 Mood</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {moods.map((m) => (
            <button key={m} type="button" onClick={() => setForm({ ...form, mood: m })}
              style={{
                padding: '8px 14px', borderRadius: 12, border: '2px solid',
                borderColor: form.mood === m ? '#ec6d98' : '#e5e7eb',
                background: form.mood === m ? '#fef1f5' : 'white',
                cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
              }}>
              {moodIcons[m]}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary" style={{ width: '100%' }}>
        {submitted ? '✅ Saved!' : 'Log Health Data'}
      </button>
    </form>
  );
}
