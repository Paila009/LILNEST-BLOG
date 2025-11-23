import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc, increment, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const SUMMARY_ID = 'summary';

const defaultSummary = {
  level: 1,
  points: 0,
  streak: 0,
  badges: [],
  updatedAt: null,
};

export async function ensureSummary(uid) {
  const ref = doc(db, 'users', uid, 'rewards', SUMMARY_ID);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { ...defaultSummary, updatedAt: serverTimestamp() });
  }
}

export async function getSummary(uid) {
  const ref = doc(db, 'users', uid, 'rewards', SUMMARY_ID);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : { ...defaultSummary };
}

export async function addPoints(uid, amount = 100) {
  const ref = doc(db, 'users', uid, 'rewards', SUMMARY_ID);
  const snap = await getDoc(ref);
  let data = defaultSummary;
  if (snap.exists()) data = snap.data();
  const newPoints = (data.points || 0) + amount;
  const newLevel = Math.max(1, Math.floor(newPoints / 1000) + 1);
  await setDoc(ref, { ...data, points: newPoints, level: newLevel, updatedAt: serverTimestamp() });
  return { points: newPoints, level: newLevel };
}

export async function getChallenges(uid) {
  const col = collection(db, 'users', uid, 'rewards', 'challenges', 'active');
  const snap = await getDocs(col);
  const out = [];
  snap.forEach((d) => out.push({ id: d.id, ...d.data() }));
  return out;
}

export async function addChallenge(uid, data) {
  const col = collection(db, 'users', uid, 'rewards', 'challenges', 'active');
  await addDoc(col, { ...data, createdAt: serverTimestamp() });
}

export async function grantBadge(uid, label) {
  const ref = doc(db, 'users', uid, 'rewards', SUMMARY_ID);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : defaultSummary;
  const badges = Array.from(new Set([...(data.badges || []), label]));
  await updateDoc(ref, { badges, updatedAt: serverTimestamp() });
  return badges;
}
