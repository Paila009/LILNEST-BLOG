'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { aiAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSymptoms = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const symptomList = symptoms.split(',').map(s => s.trim()).filter(Boolean);
      const { data } = await aiAPI.checkSymptoms({ symptoms: symptomList });
      setResults(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const severityColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444', unknown: '#6b7280' };
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  const commonSymptoms = ['Headache', 'Nausea', 'Back Pain', 'Fatigue', 'Heartburn', 'Swelling', 'Constipation'];

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🩺 Symptom Checker
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 32 }}>Describe your symptoms for AI-powered triage</p>

        {/* Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
              Enter symptoms (comma separated)
            </label>
            <input className="input-field" placeholder="e.g. headache, nausea, back pain"
              value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkSymptoms()} />
          </div>

          {/* Quick Symptom Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {commonSymptoms.map((s) => (
              <button key={s} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => setSymptoms(prev => prev ? `${prev}, ${s}` : s)}>
                + {s}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={checkSymptoms} disabled={loading} style={{ width: '100%' }}>
            {loading ? '⏳ Analyzing...' : '🔍 Check Symptoms'}
          </button>
        </motion.div>

        {/* Results */}
        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Emergency Banner */}
            {results.is_emergency && (
              <div style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white',
                borderRadius: 16, padding: 20, marginBottom: 20, textAlign: 'center',
              }}>
                <p style={{ fontSize: '1.5rem', marginBottom: 4 }}>🚨</p>
                <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>EMERGENCY DETECTED</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{results.overall_advice}</p>
              </div>
            )}

            {/* Overall */}
            <div style={{
              padding: '12px 20px', borderRadius: 12, marginBottom: 20,
              background: results.is_emergency ? '#fef2f2' : '#f0fdf4',
            }}>
              <p style={{ fontWeight: 600, color: results.is_emergency ? '#dc2626' : '#059669', fontSize: '0.9rem' }}>
                {results.overall_advice}
              </p>
            </div>

            {results.results?.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }} className="glass-card" style={{ padding: 24, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#374151' }}>{r.symptom}</h3>
                  <span className="badge" style={{
                    background: `${severityColors[r.severity]}20`,
                    color: severityColors[r.severity],
                  }}>
                    {r.severity} {r.emergency ? '🚨' : ''}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>{r.advice}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
