'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationBell({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/notifications/`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) { /* silent fail */ }
  };

  const markRead = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/notifications/${id}/read/`,
        { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } },
      );
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) { /* silent fail */ }
  };

  const markAllRead = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/notifications/mark-all-read/`,
        { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } },
      );
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) { /* silent fail */ }
  };

  const typeIcons = {
    capsule_unlocked: '🔓', medication_reminder: '💊', risk_alert: '⚠️',
    booking_confirmed: '✅', sos_triggered: '🚨', milestone_reached: '🎉',
    general: '🔔', review_received: '⭐', appointment_reminder: '📅',
  };

  const priorityColors = { urgent: '#ef4444', high: '#f59e0b', normal: '#3b82f6', low: '#6b7280' };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 40, height: 40, borderRadius: 12, border: 'none',
          background: open ? '#fef1f5' : 'transparent',
          cursor: 'pointer', position: 'relative', fontSize: '1.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            width: 18, height: 18, borderRadius: '50%',
            background: '#ef4444', color: 'white',
            fontSize: '0.65rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute', top: 50, right: 0, width: 360,
              background: 'white', borderRadius: 18, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
              border: '1px solid #f3f4f6', zIndex: 100, overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', borderBottom: '1px solid #f3f4f6',
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#374151' }}>Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead}
                  style={{ border: 'none', background: 'none', color: '#ec6d98', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: 4 }}>🔔</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No notifications yet</p>
                </div>
              ) : notifications.slice(0, 20).map((n) => (
                <div key={n.id}
                  onClick={() => !n.is_read && markRead(n.id)}
                  style={{
                    padding: '12px 20px', borderBottom: '1px solid #f9fafb',
                    background: n.is_read ? 'white' : '#fef1f5',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.1rem', marginTop: 2 }}>
                      {typeIcons[n.type] || '🔔'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{n.title}</p>
                        {!n.is_read && (
                          <span style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: priorityColors[n.priority] || '#3b82f6',
                            flexShrink: 0, marginTop: 4,
                          }} />
                        )}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 2, lineHeight: 1.4 }}>{n.message}</p>
                      <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: 4 }}>
                        {new Date(n.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
