import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

export async function loadHydration(uid, dateKey) {
  try {
    const ref = doc(db, 'users', uid, 'hydration', dateKey);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return data?.total || 0;
    }
    return 0;
  } catch {
    return 0;
  }
}

export async function addHydration(uid, dateKey, amount) {
  try {
    const ref = doc(db, 'users', uid, 'hydration', dateKey);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { total: amount, updatedAt: serverTimestamp() });
    } else {
      await updateDoc(ref, { total: increment(amount), updatedAt: serverTimestamp() });
    }
    return true;
  } catch {
    return false;
  }
}
