'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { medicalAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function EmergencyPage() {
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  const triggerSOS = async () => {
    setLoading(true);
    try {
      // Get location if available
      let location = {};
      if (navigator.geolocation) {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        }).catch(() => null);
        if (pos) {
          location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        }
      }

      const { data } = await medicalAPI.triggerSOS(location);
      setResult(data);
      setTriggered(true);
    } catch (err) {
      console.error(err);
      setTriggered(true);
      setResult({
        status: 'SOS Triggered (Offline)',
        instructions: ['Call 108 (ambulance)', 'Call 112 (emergency)', 'Contact your emergency contacts'],
      });
    } finally { setLoading(false); }
  };

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{
        marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {!triggered ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', maxWidth: 500 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerSOS}
              disabled={loading}
              style={{
                width: 200, height: 200, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 0 60px -10px rgba(239,68,68,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', color: 'white', margin: '0 auto 24px',
              }}>
              <span style={{ fontSize: '3rem' }}>🆘</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: 4 }}>
                {loading ? 'SENDING...' : 'SOS'}
              </span>
            </motion.button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginBottom: 8 }}>
              Emergency SOS
            </h2>
            <p style={{ color: '#6b7280', marginBottom: 24 }}>
              Press the SOS button to alert your emergency contacts with your live location.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <a href="tel:108" className="btn-danger" style={{ textDecoration: 'none' }}>📞 Call 108</a>
              <a href="tel:112" className="btn-secondary" style={{ textDecoration: 'none' }}>📞 Call 112</a>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', maxWidth: 500 }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%', margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '3rem', color: 'white' }}>✓</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669', marginBottom: 8 }}>
              {result?.status || 'SOS Triggered'}
            </h2>
            <p style={{ color: '#6b7280', marginBottom: 16 }}>{result?.message}</p>

            {result?.instructions?.map((inst, i) => (
              <div key={i} style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 12, padding: 12, marginBottom: 8, textAlign: 'left',
              }}>
                <p style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 500 }}>{inst}</p>
              </div>
            ))}

            <button className="btn-secondary" style={{ marginTop: 16 }} onClick={() => setTriggered(false)}>
              Reset
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
