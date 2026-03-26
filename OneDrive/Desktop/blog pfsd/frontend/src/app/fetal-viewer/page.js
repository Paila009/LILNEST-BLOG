'use client';
import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

// Dynamic import Three.js viewer (no SSR)
const FetalViewer3D = dynamic(() => import('@/components/three/FetalViewer'), { ssr: false });

const weeklyData = [
  { week: 8, size: 'Raspberry', weight: '1g', length: '1.6cm', dev: 'Heart begins beating. Fingers forming.' },
  { week: 12, size: 'Lime', weight: '14g', length: '5.4cm', dev: 'Reflexes developing. Kidneys producing urine.' },
  { week: 16, size: 'Avocado', weight: '100g', length: '11.6cm', dev: 'Facial muscles active. Can make expressions.' },
  { week: 20, size: 'Banana', weight: '300g', length: '16.4cm', dev: 'Can hear sounds. Hair growing. Halfway point!' },
  { week: 24, size: 'Corn', weight: '600g', length: '21cm', dev: 'Lungs developing branches. Taste buds forming.' },
  { week: 28, size: 'Eggplant', weight: '1kg', length: '25cm', dev: 'Eyes can open. Brain growing rapidly.' },
  { week: 32, size: 'Jicama', weight: '1.7kg', length: '28cm', dev: 'Bones hardening. Practicing breathing.' },
  { week: 36, size: 'Papaya', weight: '2.6kg', length: '32cm', dev: 'Lungs nearly mature. Gaining fat layer.' },
  { week: 40, size: 'Watermelon', weight: '3.4kg', length: '36cm', dev: 'Fully developed! Ready to meet you. 🎉' },
];

export default function FetalViewerPage() {
  const [selectedWeek, setSelectedWeek] = useState(20);
  const currentData = weeklyData.find(w => w.week <= selectedWeek) || weeklyData[0];
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lilnest_user') || '{}') : {};

  return (
    <div className="theme-mother">
      <Navbar user={user} />
      <Sidebar role="mother" />
      <main style={{ marginLeft: 220, paddingTop: 80, padding: '80px 32px 32px 252px', minHeight: '100vh' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: '#374151', marginBottom: 8 }}>
          🧬 3D Baby Viewer
        </motion.h1>
        <p style={{ color: '#9ca3af', marginBottom: 24 }}>Interactive visualization of your baby&apos;s growth</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, minHeight: 500 }}>
          {/* 3D Viewer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card" style={{ padding: 0, overflow: 'hidden', minHeight: 500, position: 'relative' }}>
            <Suspense fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 500 }}>
                <div className="animate-pulse-soft" style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '3rem' }}>🧬</p>
                  <p style={{ color: '#9ca3af', marginTop: 8 }}>Loading 3D viewer...</p>
                </div>
              </div>
            }>
              <FetalViewer3D week={selectedWeek} />
            </Suspense>
          </motion.div>

          {/* Info Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Week Selector */}
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#374151', marginBottom: 12 }}>Gestational Week</h3>
              <input type="range" min={4} max={42} value={selectedWeek}
                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#ec6d98' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Week 4</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ec6d98' }}>Week {selectedWeek}</span>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Week 42</span>
              </div>
            </div>

            {/* Size Comparison */}
            <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
              <p style={{ fontSize: '3rem', marginBottom: 4 }}>
                {selectedWeek <= 10 ? '🫐' : selectedWeek <= 16 ? '🥑' : selectedWeek <= 24 ? '🌽' : selectedWeek <= 32 ? '🍆' : '🍉'}
              </p>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#374151' }}>
                Size of a {currentData.size}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
                <div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ec6d98' }}>{currentData.weight}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Weight</p>
                </div>
                <div style={{ width: 1, background: '#e5e7eb' }} />
                <div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c4b5fd' }}>{currentData.length}</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Length</p>
                </div>
              </div>
            </div>

            {/* Development */}
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                This Week 🌟
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>
                {currentData.dev}
              </p>
            </div>

            {/* Hotspot Info */}
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#374151', marginBottom: 12 }}>Hotspots 🎯</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: '❤️', label: 'Heart', desc: selectedWeek >= 8 ? 'Beating!' : 'Forming...' },
                  { icon: '🧠', label: 'Brain', desc: selectedWeek >= 20 ? 'Rapidly growing' : 'Developing...' },
                  { icon: '🦵', label: 'Limbs', desc: selectedWeek >= 16 ? 'Moving actively' : 'Forming...' },
                ].map(h => (
                  <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: 10  }}>
                    <span style={{ fontSize: '1.2rem' }}>{h.icon}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#374151' }}>{h.label}</p>
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
