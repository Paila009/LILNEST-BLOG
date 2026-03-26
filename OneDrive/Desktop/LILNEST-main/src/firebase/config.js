import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD19VFRdMpUY9n5XYsXn0lfHLcF4c9iB3w",
  authDomain: "fedf-e.firebaseapp.com",
  projectId: "fedf-e",
  storageBucket: "fedf-e.firebasestorage.app",
  messagingSenderId: "924439453544",
  appId: "1:924439453544:web:ee8118e49e40e1546700dd",
  measurementId: "G-XDW8SXGMZL"
};

// Initialize Firebase
let app;
let auth;
let db;
let googleProvider;
let storage;
let analytics;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  storage = getStorage(app);
  
  // Initialize Analytics only in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

export { auth, db, googleProvider, storage, analytics };
export default app;
