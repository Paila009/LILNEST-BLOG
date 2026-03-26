'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { aiAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function FitnessPage() {
  const [plan, setPlan] = useState(null);
  const [trimester, setTrimester] = useState(1);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const { data } = await aiAPI.generateWorkoutPlan({ trimester });
      setPlan(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const intensityColors = { low: '#10b981', moderate: '#f59e0b', high: '#ef4444' };
  const categoryIcons = { yoga: '🧘', cardio: '🚶', strength: '💪', pelvic: '🏋️', flexibility: '🤸', breathing: '🌬️' };
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🏋️ AI Fitness Coach
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 32 }}>Safe, trimester-adapted workouts for your pregnancy journey</p>

        {/* Generator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 6 }}>Trimester</label>
              <select className="input-field" style={{ width: 160 }}
                value={trimester} onChange={(e) => setTrimester(parseInt(e.target.value))}>
                <option value={1}>1st Trimester</option>
                <option value={2}>2nd Trimester</option>
                <option value={3}>3rd Trimester</option>
              </select>
            </div>
            <button className="btn-primary" onClick={generatePlan} disabled={loading}>
              {loading ? '⏳...' : '🏋️ Generate Workout'}
            </button>
          </div>
        </motion.div>

        {/* Workout Plan */}
        {plan && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Emergency Note */}
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14,
              padding: 16, marginBottom: 20,
            }}>
              <p style={{ fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>
                {plan.emergency_stop_note}
              </p>
            </div>

            <div style={{
              display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20,
              padding: '10px 16px', background: '#f0fdf4', borderRadius: 12,
            }}>
              <span style={{ fontWeight: 600, color: '#059669' }}>⏱️ Total: {plan.total_duration_min} min</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {plan.exercises?.map((ex, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }} className="glass-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontSize: '2rem' }}>{categoryIcons[ex.category] || '🏋️'}</span>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#374151' }}>{ex.name}</h3>
                        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                          <span className="badge badge-info">⏱️ {ex.duration_min} min</span>
                          <span className="badge" style={{
                            background: `${intensityColors[ex.intensity]}20`,
                            color: intensityColors[ex.intensity],
                          }}>
                            {ex.intensity}
                          </span>
                          {ex.is_safe && <span className="badge badge-success">✅ Safe</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 12, lineHeight: 1.6 }}>
                    {ex.instructions}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
