import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { db, storage } from '../../firebase/config';
import { doc, getDoc, updateDoc, collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Row = ({ left, right }) => (
  <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
    <div className="text-sm text-muted-foreground">{left}</div>
    <div className="font-medium">{right}</div>
  </div>
);

const PatientDetail = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [risk, setRisk] = useState('Low');
  const [rx, setRx] = useState({ drug: '', dose: '', note: '' });
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const pRef = doc(db, 'patients', patientId);
      const snap = await getDoc(pRef);
      if (snap.exists()) {
        const data = snap.data();
        setPatient({ id: patientId, ...data });
        setRisk(data.risk || 'Low');
      }
    })();
    const rxQ = query(collection(db, 'patients', patientId, 'prescriptions'), orderBy('createdAt', 'desc'));
    const unsubRx = onSnapshot(rxQ, (snap) => {
      const arr = []; snap.forEach((d) => arr.push({ id: d.id, ...d.data() })); setPrescriptions(arr);
    });
    const repQ = query(collection(db, 'patients', patientId, 'reports'), orderBy('createdAt', 'desc'));
    const unsubRep = onSnapshot(repQ, (snap) => {
      const arr = []; snap.forEach((d) => arr.push({ id: d.id, ...d.data() })); setReports(arr);
    });
    return () => { unsubRx(); unsubRep(); };
  }, [patientId]);

  const saveRisk = async () => {
    await updateDoc(doc(db, 'patients', patientId), { risk });
  };

  const addPrescription = async () => {
    if (!rx.drug || !rx.dose) return;
    await addDoc(collection(db, 'patients', patientId, 'prescriptions'), {
      ...rx,
      createdAt: serverTimestamp(),
    });
    setRx({ drug: '', dose: '', note: '' });
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `patients/${patientId}/reports/${Date.now()}_${file.name}`);
    const task = uploadBytesResumable(storageRef, file);
    setUploading(true);
    task.on('state_changed', (s) => {
      const pct = Math.round((s.bytesTransferred / s.totalBytes) * 100);
      setProgress(pct);
    }, () => setUploading(false), async () => {
      const url = await getDownloadURL(task.snapshot.ref);
      await addDoc(collection(db, 'patients', patientId, 'reports'), {
        name: file.name,
        type: file.type,
        size: file.size,
        url,
        createdAt: serverTimestamp(),
      });
      setUploading(false);
      setProgress(0);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Patient Details</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {/* Summary */}
            <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
              <div className="text-lg font-semibold mb-2">{patient?.name || '—'}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Row left="Risk" right={patient?.risk || '—'} />
              </div>
            </div>

            {/* Prescriptions */}
            <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
              <div className="text-lg font-semibold mb-2">Prescriptions</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input label="Medicine" value={rx.drug} onChange={(e)=>setRx((x)=>({ ...x, drug: e.target.value }))} />
                <Input label="Dose" value={rx.dose} onChange={(e)=>setRx((x)=>({ ...x, dose: e.target.value }))} />
                <Input label="Notes" value={rx.note} onChange={(e)=>setRx((x)=>({ ...x, note: e.target.value }))} />
              </div>
              <div className="mt-3 text-right"><Button size="sm" onClick={addPrescription}>Add Prescription</Button></div>
              <div className="mt-4 space-y-2">
                {prescriptions.map((p)=>(
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <div className="font-medium">{p.drug} — {p.dose}</div>
                      {p.note && <div className="text-xs text-muted-foreground">{p.note}</div>}
                    </div>
                    <div className="text-xs text-muted-foreground">{p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : ''}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reports */}
            <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
              <div className="text-lg font-semibold mb-2">Reports</div>
              <div className="flex items-center gap-2">
                <input type="file" onChange={onUpload} />
                {uploading && <div className="text-sm text-muted-foreground">Uploading… {progress}%</div>}
              </div>
              <div className="mt-3 space-y-2">
                {reports.map((r)=>(
                  <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="block p-3 rounded-lg bg-muted">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.type || 'file'} • {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString() : ''}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <aside className="space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
              <div className="text-lg font-semibold mb-2">Risk Profile</div>
              <select value={risk} onChange={(e)=>setRisk(e.target.value)} className="w-full bg-input px-3 py-2 rounded-lg outline-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <div className="mt-3 text-right"><Button size="sm" onClick={saveRisk}>Save</Button></div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border shadow-soft text-sm text-muted-foreground">
              Upload ultrasound, scan reports, and lab tests. Add safe prescriptions with doses.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PatientDetail;
