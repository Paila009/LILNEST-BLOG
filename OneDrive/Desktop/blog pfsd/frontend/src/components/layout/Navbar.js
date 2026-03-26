'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NotificationBell from '@/components/ui/NotificationBell';

export default function Navbar({ user, onLogout }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('lilnest_token') : null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(252,228,237,0.5)',
      }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 no-underline">
        <span className="text-2xl">🌸</span>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: '1.4rem',
          background: 'linear-gradient(135deg, #f4a0bf, #c4b5fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          LILNEST
        </span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {user && (
          <>
            {/* Notification Bell */}
            {token && <NotificationBell token={token} />}

            <span className="badge badge-pink">{user.role}</span>
            <div className="flex items-center gap-2">
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: 'linear-gradient(135deg, #fce4ed, #ede9fe)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 600, color: '#ec6d98',
              }}>
                {user.full_name?.charAt(0) || '?'}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#374151' }}>
                {user.full_name}
              </span>
            </div>
            <button onClick={onLogout} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
