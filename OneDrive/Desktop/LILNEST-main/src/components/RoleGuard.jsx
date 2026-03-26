import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleGuard = ({ allowed = [], children }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowed.length && !allowed.includes(role)) return <Navigate to="/dashboard-home" replace />;
  return children;
};

export default RoleGuard;
