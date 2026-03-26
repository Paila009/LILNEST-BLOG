'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { timecapsuleAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function TimeCapsulePage() {
  const [capsules, setCapsules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ recipient_name: '', title: '', message: '', unlock_date: '', capsule_type: 'letter' });
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  useEffect(() => { loadCapsules(); }, []);
  const loadCapsules = async () => {
    try { const { data } = await timecapsuleAPI.getCapsules(); setCapsules(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const createCapsule = async (e) => {
    e.preventDefault();
    try {
      await timecapsuleAPI.createCapsule(form);
      setShowForm(false);
      setForm({ recipient_name: '', title: '', message: '', unlock_date: '', capsule_type: 'letter' });
      loadCapsules();
    } catch (err) { console.error(err); }
  };

  const typeIcons = { letter: '✉️', photo: '📸', video: '🎥', mixed: '📦' };

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151' }}>
              📦 Time Capsule
            </motion.h1>
            <p style={{ color: '#9ca3af' }}>Store memories for your loved ones to unlock in the future</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Close' : '+ New Capsule'}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Create Time Capsule ✨</h2>
            <form onSubmit={createCapsule} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>To (Recipient)</label>
                  <input className="input-field" placeholder="Baby's name" required
                    value={form.recipient_name} onChange={(e) => setForm({ ...form, recipient_name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Unlock Date</label>
                  <input type="date" className="input-field" required
                    value={form.unlock_date} onChange={(e) => setForm({ ...form, unlock_date: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Title</label>
                <input className="input-field" placeholder="A message for your 18th birthday..." required
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>
                  Type
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {Object.entries(typeIcons).map(([type, icon]) => (
                    <button key={type} type="button" onClick={() => setForm({ ...form, capsule_type: type })}
                      style={{
                        flex: 1, padding: '10px 8px', borderRadius: 12, border: '2px solid',
                        borderColor: form.capsule_type === type ? '#ec6d98' : '#e5e7eb',
                        background: form.capsule_type === type ? '#fef1f5' : 'white',
                        cursor: 'pointer', textAlign: 'center',
                      }}>
                      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                      <p style={{ fontSize: '0.7rem', marginTop: 2, textTransform: 'capitalize', fontWeight: 600, color: form.capsule_type === type ? '#ec6d98' : '#6b7280' }}>{type}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>Your Message</label>
                <textarea className="input-field" rows={5} placeholder="Dear little one, I want you to know..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                🔒 Seal & Lock Capsule
              </button>
            </form>
          </motion.div>
        )}

        {/* Capsule List */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 160, borderRadius: 20 }} />)}
          </div>
        ) : capsules.length === 0 ? (
          <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
            <p style={{ fontSize: '3rem', marginBottom: 12 }}>📦</p>
            <h3 style={{ color: '#374151', marginBottom: 8 }}>No Time Capsules Yet</h3>
            <p style={{ color: '#9ca3af' }}>Create your first memory capsule for a special moment</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {capsules.map((c, i) => (
              <motion.div key={c.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} className="glass-card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
                {/* Lock Overlay */}
                {!c.is_unlocked && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    width: 36, height: 36, borderRadius: 10,
                    background: 'linear-gradient(135deg, #fce4ed, #ede9fe)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    🔒
                  </div>
                )}
                <span style={{ fontSize: '1.8rem' }}>{typeIcons[c.capsule_type] || '📦'}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 8, color: '#374151' }}>{c.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: 4 }}>To: {c.recipient_name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                  <span className={`badge ${c.is_unlocked ? 'badge-success' : 'badge-warning'}`}>
                    {c.is_unlocked ? '🔓 Unlocked' : `🔒 ${c.unlock_date}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
