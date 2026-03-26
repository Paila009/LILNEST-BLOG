/**
 * LILNEST API Service — Full Axios client for Django backend.
 */
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Token Interceptor ────────────────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('lilnest_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('lilnest_token');
      localStorage.removeItem('lilnest_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── DEMO MOCK ADAPTER ──────────────────────────────────────────
// Bypass backend entirely to allow the GitHub Pages site to function!
api.interceptors.request.use((config) => {
  // We mock everything so it works without MongoDB/Backend
  config.adapter = async () => {
    await new Promise(r => setTimeout(r, 400)); // fake network delay
    const url = config.url;
    let data = {};
    if (config.data) {
      try { data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data; } catch(e){}
    }

    const ok = (body) => ({ data: body, status: 200, statusText: 'OK', headers: {}, config, request: {} });

    // Auth Mocks
    if (url.includes('/auth/login/')) {
      // Accept any password
      const role = data.email?.includes('doctor') ? 'doctor' : (data.email?.includes('child') ? 'child' : 'mother');
      const user = { id: 'user1', email: data.email || 'demo@example.com', full_name: 'Demo User', role };
      if (typeof window !== 'undefined') localStorage.setItem('lilnest_user', JSON.stringify(user));
      return ok({ user, tokens: { access: 'mock_token' } });
    }
    if (url.includes('/auth/register/')) {
      const user = { id: 'user2', email: data.email, full_name: data.full_name, role: data.role };
      if (typeof window !== 'undefined') localStorage.setItem('lilnest_user', JSON.stringify(user));
      return ok({ user, tokens: { access: 'mock_token' } });
    }
    if (url.includes('/auth/me/')) {
      let role = 'mother';
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('lilnest_user') || '{}');
        role = stored.role || 'mother';
      }
      return ok({ 
        id: 'user1', email: 'demo@example.com', full_name: 'Demo User', role,
        mother_profile: { current_weight: 65, due_date: '2026-10-10' }
      });
    }
    if (url.includes('/auth/notifications/')) return ok({ notifications: [], unread_count: 0 });

    // Dashboard Mocks
    if (url.includes('/dashboard/summary/')) return ok({ bp: '120/80', weight: 65, fetal_weight: 300, fetal_length: 16 });
    if (url.includes('/dashboard/fetal-updates/')) return ok([{ week: 20, size_comparison: 'Banana', weight_grams: 300, length_cm: 16.4, developments: [], tips: ['Stay hydrated'] }]);
    if (url.includes('/dashboard/health-logs/')) return ok([]);

    // Marketplace Mocks
    if (url.includes('/marketplace/providers/')) return ok([{ id: '1', name: 'Dr. Priya Sharma', category: 'Doctor', city: 'Mumbai', price_per_session: 1500, rating: 4.8, total_reviews: 156, available_slots: [] }]);
    if (url.includes('/marketplace/bookings/')) return ok([]);
    if (url.includes('/marketplace/payments/create-order/')) return ok({ order_id: 'mock_order_123', amount: 1500, currency: 'INR' });

    // Medical Mocks
    if (url.includes('/medical/vitals/')) return ok([]);
    if (url.includes('/medical/medications/')) return ok([]);
    if (url.includes('/medical/scans/')) return ok([]);
    if (url.includes('/medical/sos/')) return ok({ status: 'SOS Triggered' });

    // AI Engine Mocks
    if (url.includes('/ai/diet-plan/')) return ok({ plan_details: 'Mocked Indian Diet Plan: Breakfast: Poha, Lunch: Dal Rice, Dinner: Roti Sabzi' });
    if (url.includes('/ai/fitness-plan/')) return ok({ plan_details: 'Mocked Fitness Plan: 15 min Prenatal Yoga, 10 min Walking.' });
    if (url.includes('/ai/symptom-check/')) return ok({ triage_level: 'low', recommendation: 'Rest and hydrate. Consult doctor if it persists.' });

    // Default Fallback
    return ok([]);
  };
  return config;
});

// ─── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  getMe: () => api.get('/auth/me/'),
  updateMe: (data) => api.patch('/auth/me/', data),
  getMotherProfile: () => api.get('/auth/mother-profile/'),
  updateMotherProfile: (data) => api.put('/auth/mother-profile/', data),
  getChildren: () => api.get('/auth/children/'),
  addChild: (data) => api.post('/auth/children/', data),
  // Notifications
  getNotifications: (unread) => api.get(`/auth/notifications/${unread ? '?unread=true' : ''}`),
  markNotifRead: (id) => api.patch(`/auth/notifications/${id}/read/`),
  markAllNotifsRead: () => api.patch('/auth/notifications/mark-all-read/'),
};

// ─── Dashboard ─────────────────────────────────────────────────
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/summary/'),
  getHealthLogs: () => api.get('/dashboard/health-logs/'),
  addHealthLog: (data) => api.post('/dashboard/health-logs/', data),
  getFetalUpdates: (week) => api.get(`/dashboard/fetal-updates/${week ? `?week=${week}` : ''}`),
};

// ─── AI Engine ─────────────────────────────────────────────────
export const aiAPI = {
  getDietPlan: () => api.get('/ai/diet-plan/'),
  generateDietPlan: (data) => api.post('/ai/diet-plan/', data),
  getWorkoutPlan: () => api.get('/ai/fitness-plan/'),
  generateWorkoutPlan: (data) => api.post('/ai/fitness-plan/', data),
  checkSymptoms: (data) => api.post('/ai/symptom-check/', data),
  checkFoodSafety: (data) => api.post('/ai/food-safety/', data),
  predictGrowth: (data) => api.post('/ai/growth-predict/', data),
};

// ─── Marketplace ───────────────────────────────────────────────
export const marketplaceAPI = {
  getProviders: (params) => api.get('/marketplace/providers/', { params }),
  getProvider: (id) => api.get(`/marketplace/providers/${id}/`),
  getBookings: () => api.get('/marketplace/bookings/'),
  createBooking: (data) => api.post('/marketplace/bookings/', data),
  bookingAction: (id, action) => api.patch(`/marketplace/bookings/${id}/action/`, { action }),
  getReviews: (params) => api.get('/marketplace/reviews/', { params }),
  addReview: (data) => api.post('/marketplace/reviews/', data),
  // Payments
  createPaymentOrder: (data) => api.post('/marketplace/payments/create-order/', data),
  verifyPayment: (data) => api.post('/marketplace/payments/verify/', data),
  requestRefund: (data) => api.post('/marketplace/payments/refund/', data),
};

// ─── Medical ───────────────────────────────────────────────────
export const medicalAPI = {
  getVitals: () => api.get('/medical/vitals/'),
  addVitals: (data) => api.post('/medical/vitals/', data),
  getMedications: () => api.get('/medical/medications/'),
  addMedication: (data) => api.post('/medical/medications/', data),
  toggleMedication: (id) => api.patch(`/medical/medications/${id}/toggle/`),
  getScans: () => api.get('/medical/scans/'),
  addScan: (data) => api.post('/medical/scans/', data),
  triggerSOS: (data) => api.post('/medical/sos/', data),
};

// ─── Time Capsule ──────────────────────────────────────────────
export const timecapsuleAPI = {
  getCapsules: () => api.get('/timecapsule/'),
  createCapsule: (data) => api.post('/timecapsule/', data),
  getCapsule: (id) => api.get(`/timecapsule/${id}/`),
  deleteCapsule: (id) => api.delete(`/timecapsule/${id}/`),
};

export default api;
