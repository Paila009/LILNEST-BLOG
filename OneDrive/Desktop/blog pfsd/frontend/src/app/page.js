'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  { icon: '🤰', title: 'Maternal Health', desc: 'AI-powered pregnancy tracking, symptoms monitoring & personalized care plans' },
  { icon: '👶', title: 'Child Growth', desc: 'WHO-standard growth tracking, milestone monitoring & feeding schedules' },
  { icon: '🧬', title: '3D Baby Viewer', desc: 'Interactive 3D fetal visualization with weekly developmental updates' },
  { icon: '🥗', title: 'Smart Diet Plans', desc: 'Indian meal plans tailored to your trimester with allergy detection' },
  { icon: '🏋️', title: 'Safe Fitness', desc: 'Trimester-specific exercises with emergency stop protocols' },
  { icon: '📦', title: 'Time Capsule', desc: 'Store emotional memories for your child to unlock in the future' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ─── Hero Section ────────────────────────────────────── */}
      <header style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Blobs */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(252,228,237,0.6), transparent)',
          top: -100, right: -100, filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(221,214,254,0.5), transparent)',
          bottom: -50, left: -50, filter: 'blur(50px)',
        }} />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          style={{ fontSize: '4rem', marginBottom: 16 }}
        >
          🌸
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ec6d98, #c4b5fd, #f4a0bf)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 16,
          }}
        >
          Welcome to LILNEST
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: 600,
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Your complete maternal & child wellness ecosystem — AI-powered health insights,
          growth tracking, and emotional memories, all in one beautiful place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: 16 }}
        >
          <Link href="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get Started ✨
          </Link>
          <Link href="/login" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Sign In
          </Link>
        </motion.div>
      </header>

      {/* ─── Features Grid ───────────────────────────────────── */}
      <section style={{ padding: '80px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: 48,
            color: '#374151',
          }}
        >
          Everything You Need 💝
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: 28 }}
            >
              <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: 12 }}>{f.icon}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8, color: '#374151' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section style={{
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fce4ed, #ede9fe)',
        borderRadius: '40px 40px 0 0',
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 16, color: '#374151' }}>
          Begin Your Journey 🌈
        </h2>
        <p style={{ color: '#6b7280', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
          Join thousands of mothers who trust LILNEST for their maternal and child wellness journey.
        </p>
        <Link href="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
