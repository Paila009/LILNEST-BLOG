'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authAPI } from '@/services/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: '', email: '', password: '', role: 'mother', phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authAPI.register(form);
      localStorage.setItem('lilnest_token', data.tokens.access);
      localStorage.setItem('lilnest_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'mother', icon: '👩', label: 'Mother' },
    { value: 'doctor', icon: '🩺', label: 'Doctor' },
    { value: 'caregiver', icon: '🤝', label: 'Caregiver' },
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: 480, padding: 40 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: '2.5rem' }}>🌸</span>
          <h1 style={{
            fontSize: '1.8rem', fontWeight: 800, marginTop: 8,
            background: 'linear-gradient(135deg, #ec6d98, #c4b5fd)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Join LILNEST
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: 4 }}>
            Create your wellness account
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 12, padding: '10px 16px', marginBottom: 20,
              color: '#dc2626', fontSize: '0.85rem',
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Role Selector */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>
              I am a...
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.value })}
                  style={{
                    flex: 1, padding: '12px 8px', borderRadius: 14, border: '2px solid',
                    borderColor: form.role === r.value ? '#ec6d98' : '#e5e7eb',
                    background: form.role === r.value ? '#fef1f5' : 'white',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{r.icon}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: form.role === r.value ? '#ec6d98' : '#6b7280' }}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Full Name</label>
            <input
              type="text" className="input-field" placeholder="Your full name"
              value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Email</label>
            <input
              type="email" className="input-field" placeholder="you@example.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Phone</label>
            <input
              type="tel" className="input-field" placeholder="+91 XXXXX XXXXX"
              value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>Password</label>
            <input
              type="password" className="input-field" placeholder="Min 8 characters"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8, width: '100%' }}>
            {loading ? '⏳ Creating Account...' : 'Create Account ✨'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: '#6b7280' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#ec6d98', fontWeight: 600, textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
