'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { marketplaceAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

const categories = [
  { value: '', label: 'All', icon: '🏪' },
  { value: 'lactation_consultant', label: 'Lactation', icon: '🤱' },
  { value: 'doula', label: 'Doulas', icon: '🤰' },
  { value: 'babysitter', label: 'Babysitters', icon: '👶' },
  { value: 'nutritionist', label: 'Nutritionists', icon: '🥗' },
  { value: 'pediatrician', label: 'Pediatricians', icon: '👨‍⚕️' },
  { value: 'yoga_instructor', label: 'Yoga', icon: '🧘' },
];

export default function MarketplacePage() {
  const [providers, setProviders] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [loading, setLoading] = useState(true);
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  useEffect(() => {
    loadProviders();
  }, [selectedCat]);

  const loadProviders = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCat) params.category = selectedCat;
      const { data } = await marketplaceAPI.getProviders(params);
      setProviders(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🛒 Marketplace
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 24 }}>Find verified wellness professionals</p>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button key={c.value} onClick={() => setSelectedCat(c.value)}
              style={{
                padding: '8px 16px', borderRadius: 12, border: '2px solid',
                borderColor: selectedCat === c.value ? '#ec6d98' : '#e5e7eb',
                background: selectedCat === c.value ? '#fef1f5' : 'white',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                color: selectedCat === c.value ? '#ec6d98' : '#6b7280',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
              }}>
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Provider Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 200, borderRadius: 20 }} />)}
          </div>
        ) : providers.length === 0 ? (
          <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', marginBottom: 8 }}>🔍</p>
            <p style={{ color: '#6b7280' }}>No providers found. Try a different category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {providers.map((p, i) => (
              <motion.div key={p.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 16,
                    background: 'linear-gradient(135deg, #fce4ed, #ede9fe)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
                  }}>
                    {categories.find(c => c.value === p.category)?.icon || '👤'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{p.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'capitalize' }}>
                      {p.category?.replace('_', ' ')}
                    </p>
                  </div>
                  {p.is_verified && <span className="badge badge-success" style={{ marginLeft: 'auto' }}>✅ Verified</span>}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, marginBottom: 12 }}>
                  {p.bio?.substring(0, 100) || 'Professional wellness provider'}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#f59e0b' }}>⭐</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.rating || '—'}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>({p.total_reviews || 0})</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#ec6d98', fontSize: '0.95rem' }}>
                    ₹{p.price_per_session || '—'}/session
                  </span>
                </div>
                <button className="btn-primary" style={{ width: '100%', marginTop: 14, fontSize: '0.85rem' }}>
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
