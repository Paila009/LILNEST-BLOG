import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { db } from '../../firebase/config';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';

const PatientCard = ({ p, onOpen }) => (
  <div className="bg-card border border-border rounded-xl p-4 shadow-soft cursor-pointer" onClick={onOpen}>
    <div className="font-semibold">{p.name}</div>
    <div className="text-sm text-muted-foreground">Risk: {p.risk || '—'}</div>
  </div>
);

const PrescriptionForm = ({ patientId }) => {
  const [drug, setDrug] = useState('');
  const [dose, setDose] = useState('');
  const [note, setNote] = useState('');

  const save = async () => {
    if (!drug || !dose) return;
    await addDoc(collection(db, 'patients', patientId, 'prescriptions'), {
      drug, dose, note, createdAt: serverTimestamp()
    });
    setDrug(''); setDose(''); setNote('');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
      <div className="text-lg font-semibold mb-2">New Prescription</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input label="Medicine" value={drug} onChange={(e)=>setDrug(e.target.value)} />
        <Input label="Dose" value={dose} onChange={(e)=>setDose(e.target.value)} />
        <Input label="Notes" value={note} onChange={(e)=>setNote(e.target.value)} />
      </div>
      <div className="mt-3 text-right"><Button size="sm" onClick={save}>Save</Button></div>
    </div>
  );
};

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = []; snap.forEach((d)=>arr.push({ id: d.id, ...d.data() })); setPatients(arr);
    });
    return () => unsub();
  }, []);

  const addPatient = async () => {
    if (!name.trim()) return;
    const ref = doc(collection(db, 'patients'));
    await setDoc(ref, { name: name.trim(), risk: 'Low', createdAt: serverTimestamp() });
    setName('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
          <div className="text-lg font-semibold mb-2">Add Patient</div>
          <div className="flex gap-2">
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Patient name" className="flex-1 bg-input px-3 py-2 rounded-lg outline-none" />
            <Button onClick={addPatient}>Add</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.map((p) => (
            <div key={p.id}>
              <PatientCard p={p} onOpen={() => navigate(`/doctor/${p.id}`)} />
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">Tip: You can extend this to show vitals, uploaded reports, and alerts.</div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
