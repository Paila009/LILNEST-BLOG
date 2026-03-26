'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { aiAPI } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function DietPage() {
  const [plan, setPlan] = useState(null);
  const [trimester, setTrimester] = useState(1);
  const [allergies, setAllergies] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodCheck, setFoodCheck] = useState(null);
  const [foodInput, setFoodInput] = useState('');

  const generatePlan = async () => {
    setLoading(true);
    try {
      const { data } = await aiAPI.generateDietPlan({
        trimester,
        allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
      });
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkFood = async () => {
    if (!foodInput.trim()) return;
    try {
      const { data } = await aiAPI.checkFoodSafety({ food: foodInput });
      setFoodCheck(data);
    } catch (err) {
      console.error(err);
    }
  };

  const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🥗 AI Diet Planner
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 32 }}>
          Personalized Indian meal plans for your pregnancy
        </p>

        {/* Generator */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Generate Your Plan</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 6 }}>Trimester</label>
              <select className="input-field" style={{ width: 140 }}
                value={trimester} onChange={(e) => setTrimester(parseInt(e.target.value))}>
                <option value={1}>1st Trimester</option>
                <option value={2}>2nd Trimester</option>
                <option value={3}>3rd Trimester</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 6 }}>Allergies (comma separated)</label>
              <input className="input-field" placeholder="e.g. peanut, fish"
                value={allergies} onChange={(e) => setAllergies(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={generatePlan} disabled={loading}>
              {loading ? '⏳ Generating...' : '✨ Generate Plan'}
            </button>
          </div>
        </motion.div>

        {/* Plan Output */}
        {plan && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 16, padding: '12px 20px', background: '#fef1f5', borderRadius: 14,
            }}>
              <span style={{ fontWeight: 600, color: '#ec6d98' }}>
                📊 Total: {plan.total_daily_calories} cal/day
              </span>
              <span className="badge badge-pink">{plan.notes}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {plan.meals?.map((meal, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }} className="glass-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: '1.5rem' }}>{mealIcons[meal.meal_type] || '🍽️'}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'capitalize' }}>{meal.meal_type}</h3>
                    <span className="badge badge-info" style={{ marginLeft: 'auto' }}>{meal.total_calories} cal</span>
                  </div>
                  {meal.items?.map((item, j) => (
                    <div key={j} style={{ padding: '8px 0', borderTop: j > 0 ? '1px solid #f3f4f6' : 'none' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>{item.name}</p>
                      <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                        <span className="badge badge-success">{item.protein_g}g protein</span>
                        {item.tags?.map(t => <span key={t} className="badge badge-pink">{t}</span>)}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Food Safety Scanner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card" style={{ padding: 28, marginTop: 32 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>🔍 Food Safety Scanner</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <input className="input-field" style={{ flex: 1 }} placeholder="Enter food name (e.g. raw fish, papaya)"
              value={foodInput} onChange={(e) => setFoodInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkFood()} />
            <button className="btn-secondary" onClick={checkFood}>Check</button>
          </div>
          {foodCheck && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 16, padding: 16, borderRadius: 14,
                background: foodCheck.is_safe ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${foodCheck.is_safe ? '#bbf7d0' : '#fecaca'}`,
              }}>
              <p style={{ fontWeight: 700, color: foodCheck.is_safe ? '#059669' : '#dc2626' }}>
                {foodCheck.is_safe ? '✅ Safe to eat' : '⚠️ Avoid during pregnancy'}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 4 }}>{foodCheck.recommendation}</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
