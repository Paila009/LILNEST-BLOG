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
