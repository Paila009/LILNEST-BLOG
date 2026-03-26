'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { medicalAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function MedicalPage() {
  const [vitals, setVitals] = useState([]);
  const [medications, setMedications] = useState([]);
  const [tab, setTab] = useState('vitals');
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [v, m] = await Promise.all([medicalAPI.getVitals(), medicalAPI.getMedications()]);
      setVitals(v.data);
      setMedications(m.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const [vitalForm, setVitalForm] = useState({
    date: new Date().toISOString().split('T')[0],
    systolic_bp: '', diastolic_bp: '', heart_rate: '', temperature: '', weight_kg: '', blood_sugar: '',
  });

  const submitVitals = async (e) => {
    e.preventDefault();
    try {
      const { data } = await medicalAPI.addVitals({
        ...vitalForm,
        systolic_bp: parseInt(vitalForm.systolic_bp) || undefined,
        diastolic_bp: parseInt(vitalForm.diastolic_bp) || undefined,
        heart_rate: parseInt(vitalForm.heart_rate) || undefined,
        temperature: parseFloat(vitalForm.temperature) || undefined,
        weight_kg: parseFloat(vitalForm.weight_kg) || undefined,
        blood_sugar: parseFloat(vitalForm.blood_sugar) || undefined,
      });
      if (data.alerts) setAlerts(data.alerts);
      loadData();
    } catch (err) { console.error(err); }
  };

  const tabs = [
    { id: 'vitals', icon: '❤️', label: 'Vitals' },
    { id: 'medications', icon: '💊', label: 'Medications' },
    { id: 'scans', icon: '📄', label: 'Scans' },
  ];

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role={user.role || 'mother'} />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 24 }}>
          💊 Medical Records
        </motion.h1>

        {/* Alerts */}
        {alerts.length > 0 && alerts.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 14, marginBottom: 12, color: '#dc2626', fontWeight: 600, fontSize: '0.9rem' }}>
            {a}
          </motion.div>
        ))}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: '10px 20px', borderRadius: 12, border: '2px solid',
                borderColor: tab === t.id ? '#ec6d98' : 'transparent',
                background: tab === t.id ? '#fef1f5' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                color: tab === t.id ? '#ec6d98' : '#6b7280',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Vitals Tab */}
        {tab === 'vitals' && (
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Log Vitals</h2>
              <form onSubmit={submitVitals}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
                  {[
                    { key: 'systolic_bp', label: 'Systolic BP', icon: '🫀', ph: '120' },
                    { key: 'diastolic_bp', label: 'Diastolic BP', icon: '🫀', ph: '80' },
                    { key: 'heart_rate', label: 'Heart Rate', icon: '💓', ph: '72' },
                    { key: 'temperature', label: 'Temp (°C)', icon: '🌡️', ph: '36.6' },
                    { key: 'weight_kg', label: 'Weight (kg)', icon: '⚖️', ph: '65' },
                    { key: 'blood_sugar', label: 'Sugar (mg/dL)', icon: '🩸', ph: '100' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 4 }}>
                        {f.icon} {f.label}
                      </label>
                      <input type="number" step="0.1" className="input-field" placeholder={f.ph}
                        value={vitalForm[f.key]} onChange={(e) => setVitalForm({ ...vitalForm, [f.key]: e.target.value })} />
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Save Vitals</button>
              </form>
            </motion.div>

            {/* History */}
            <h3 style={{ fontWeight: 700, marginBottom: 12, color: '#374151' }}>Recent Vitals</h3>
            {vitals.slice(0, 5).map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }} className="glass-card" style={{ padding: 16, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <span className="badge badge-info">{v.date}</span>
                  {v.systolic_bp && <span className="badge badge-pink">BP: {v.systolic_bp}/{v.diastolic_bp}</span>}
                  {v.heart_rate && <span className="badge badge-warning">HR: {v.heart_rate}</span>}
                  {v.weight_kg && <span className="badge badge-success">Wt: {v.weight_kg}kg</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Meds Tab */}
        {tab === 'medications' && (
          <div>
            {medications.length === 0 ? (
              <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                <p style={{ fontSize: '2rem' }}>💊</p>
                <p style={{ color: '#6b7280' }}>No medications tracked yet.</p>
              </div>
            ) : medications.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card" style={{ padding: 20, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{m.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{m.dosage} · {m.frequency}</p>
                  </div>
                  <span className={`badge ${m.is_active ? 'badge-success' : 'badge-warning'}`}>
                    {m.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Scans Tab */}
        {tab === 'scans' && (
          <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem' }}>📄</p>
            <p style={{ color: '#6b7280' }}>Upload and manage your medical scans here.</p>
            <button className="btn-primary" style={{ marginTop: 16 }}>Upload Scan</button>
          </div>
        )}
      </main>
    </div>
  );
}
