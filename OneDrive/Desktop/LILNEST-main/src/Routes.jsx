import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VirtualGarden from './pages/virtual-garden';
import PomodoroTimer from './pages/pomodoro-timer';
import SettingsHub from './pages/settings-hub';
import BreakSession from './pages/break-session';
import DashboardHome from './pages/dashboard-home';
import WellnessActions from './pages/wellness-actions';
// LILNEST sections
import Fitness from './pages/fitness';
import Diet from './pages/diet';
import Growth from './pages/growth';
import Medicine from './pages/medicine';
import Rewards from './pages/rewards';
import Community from './pages/community';
import KickCounter from './pages/kick-counter';
import Emergency from './pages/emergency';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/profile';
import DoctorDashboard from './pages/doctor';
import ResetPassword from './pages/reset-password';
import PatientDetail from './pages/doctor/patient';
import Marketplace from './pages/marketplace';
import ServiceProviderProfile from './pages/marketplace/ServiceProviderProfile';
import TimeCapsule from './pages/time-capsule';
import Visualizer from './pages/visualizer';
import AIAssistant from './components/ui/AIAssistant';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/virtual-garden" element={<VirtualGarden />} />
        <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="/settings-hub" element={<SettingsHub />} />
        <Route path="/break-session" element={<BreakSession />} />
        <Route path="/wellness-actions/:actionType" element={<WellnessActions />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/fitness" element={<ProtectedRoute><Fitness /></ProtectedRoute>} />
        <Route path="/diet" element={<ProtectedRoute><Diet /></ProtectedRoute>} />
        <Route path="/growth" element={<ProtectedRoute><Growth /></ProtectedRoute>} />
        <Route path="/medicine" element={<ProtectedRoute><Medicine /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/kick-counter" element={<ProtectedRoute><KickCounter /></ProtectedRoute>} />
        <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
        <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/doctor/:patientId" element={<ProtectedRoute><PatientDetail /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
        <Route path="/marketplace/provider/:id" element={<ProtectedRoute><ServiceProviderProfile /></ProtectedRoute>} />
        <Route path="/time-capsule" element={<ProtectedRoute><TimeCapsule /></ProtectedRoute>} />
        <Route path="/visualizer" element={<ProtectedRoute><Visualizer /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      <AIAssistant />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
