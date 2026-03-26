'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const motherLinks = [
  { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { href: '/ai/diet', icon: '🥗', label: 'AI Diet' },
  { href: '/ai/fitness', icon: '🏋️', label: 'AI Fitness' },
  { href: '/ai/symptoms', icon: '🩺', label: 'Symptoms' },
  { href: '/medical', icon: '💊', label: 'Medical' },
  { href: '/fetal-viewer', icon: '🧬', label: '3D Baby' },
  { href: '/marketplace', icon: '🛒', label: 'Marketplace' },
  { href: '/timecapsule', icon: '📦', label: 'Time Capsule' },
  { href: '/emergency', icon: '🆘', label: 'Emergency' },
];

const childLinks = [
  { href: '/dashboard/child', icon: '🧸', label: 'Dashboard' },
  { href: '/ai/diet', icon: '🍼', label: 'Nutrition' },
  { href: '/medical', icon: '💊', label: 'Medical' },
  { href: '/marketplace', icon: '🛒', label: 'Services' },
];

const doctorLinks = [
  { href: '/dashboard/doctor', icon: '🏥', label: 'Dashboard' },
  { href: '/medical', icon: '📋', label: 'Records' },
  { href: '/marketplace', icon: '👥', label: 'Patients' },
];

export default function Sidebar({ role = 'mother' }) {
  const pathname = usePathname();
  const links = role === 'doctor' ? doctorLinks : role === 'child' ? childLinks : motherLinks;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="sidebar fixed left-0 top-[60px] bottom-0 w-[220px] p-4 flex flex-col gap-1 overflow-y-auto"
    >
      <div style={{ marginBottom: 8, padding: '0 12px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af' }}>
          Menu
        </p>
      </div>

      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
        >
          <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
          <span style={{ fontSize: '0.9rem' }}>{link.label}</span>
        </Link>
      ))}

      {/* Bottom accent */}
      <div style={{
        marginTop: 'auto',
        padding: 16,
        background: 'linear-gradient(135deg, #fce4ed, #ede9fe)',
        borderRadius: 16,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '1.5rem', marginBottom: 4 }}>🌸</p>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ec6d98' }}>LILNEST</p>
        <p style={{ fontSize: '0.65rem', color: '#9ca3af' }}>v1.0.0</p>
      </div>
    </motion.aside>
  );
}
