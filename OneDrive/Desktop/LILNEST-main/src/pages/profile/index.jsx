import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} /> <span>{label}</span></label>
);

const Section = ({ title, children }) => (
  <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
    <div className="text-lg font-semibold mb-2">{title}</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
);

const MotherTab = ({ uid }) => {
  const [form, setForm] = useState({
    trimester: '', edd: '', history: '',
    medical: { anemia:false, thyroid:false, diabetes:false, bp:false, epilepsy:false, asthma:false },
    symptoms: '', lifestyle: '', movementHours: '', allergies: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const ref = doc(db, 'users', uid, 'profiles', 'mother');
      const snap = await getDoc(ref);
      if (snap.exists()) setForm({ ...form, ...snap.data() });
    })();
    // eslint-disable-next-line
  }, [uid]);

  const save = async () => {
    setSaving(true);
    const ref = doc(db, 'users', uid, 'profiles', 'mother');
    await setDoc(ref, { ...form, updatedAt: serverTimestamp() });
    setSaving(false);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setMed = (k, v) => setForm((f) => ({ ...f, medical: { ...f.medical, [k]: v } }));

  return (
    <div className="space-y-4">
      <Section title="Pregnancy Profile">
        <Input label="Trimester" value={form.trimester} onChange={(e)=>set('trimester', e.target.value)} />
        <Input label="EDD (YYYY-MM-DD)" value={form.edd} onChange={(e)=>set('edd', e.target.value)} />
        <Input label="Past Pregnancy History" value={form.history} onChange={(e)=>set('history', e.target.value)} />
      </Section>
      <Section title="Medical History">
        {['anemia','thyroid','diabetes','bp','epilepsy','asthma'].map((m)=>(
          <Checkbox key={m} label={m.charAt(0).toUpperCase()+m.slice(1)} checked={form.medical[m]} onChange={(v)=>setMed(m,v)} />
        ))}
      </Section>
      <Section title="Daily Inputs">
        <Input label="Current Symptoms" value={form.symptoms} onChange={(e)=>set('symptoms', e.target.value)} />
        <Input label="Lifestyle / Work Type" value={form.lifestyle} onChange={(e)=>set('lifestyle', e.target.value)} />
        <Input label="Movement Hours" value={form.movementHours} onChange={(e)=>set('movementHours', e.target.value)} />
        <Input label="Allergies" value={form.allergies} onChange={(e)=>set('allergies', e.target.value)} />
      </Section>
      <div className="flex justify-end">
        <Button onClick={save} loading={saving}>Save Mother Profile</Button>
      </div>
    </div>
  );
};

const ChildTab = ({ uid }) => {
  const [form, setForm] = useState({
    age: '', weight:'', height:'', head:'', feeding:'', allergies:'', vaccinations:''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const ref = doc(db, 'users', uid, 'profiles', 'child');
      const snap = await getDoc(ref);
      if (snap.exists()) setForm({ ...form, ...snap.data() });
    })();
    // eslint-disable-next-line
  }, [uid]);

  const save = async () => {
    setSaving(true);
    const ref = doc(db, 'users', uid, 'profiles', 'child');
    await setDoc(ref, { ...form, updatedAt: serverTimestamp() });
    setSaving(false);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-4">
      <Section title="Child Profile">
        <Input label="Age (days/months/years)" value={form.age} onChange={(e)=>set('age', e.target.value)} />
        <Input label="Weight (kg)" value={form.weight} onChange={(e)=>set('weight', e.target.value)} />
        <Input label="Length/Height (cm)" value={form.height} onChange={(e)=>set('height', e.target.value)} />
        <Input label="Head Circumference (cm)" value={form.head} onChange={(e)=>set('head', e.target.value)} />
        <Input label="Feeding (breast/formula/solids)" value={form.feeding} onChange={(e)=>set('feeding', e.target.value)} />
        <Input label="Allergy Record" value={form.allergies} onChange={(e)=>set('allergies', e.target.value)} />
        <Input label="Vaccination History" value={form.vaccinations} onChange={(e)=>set('vaccinations', e.target.value)} />
      </Section>
      <div className="flex justify-end">
        <Button onClick={save} loading={saving}>Save Child Profile</Button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('mother');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="bg-card border border-border rounded-lg p-1 flex">
            <button className={`px-3 py-1 rounded-md ${tab==='mother'?'bg-primary text-primary-foreground':''}`} onClick={()=>setTab('mother')}>Mother</button>
            <button className={`px-3 py-1 rounded-md ${tab==='child'?'bg-primary text-primary-foreground':''}`} onClick={()=>setTab('child')}>Child</button>
          </div>
        </div>
        {tab==='mother' ? <MotherTab uid={user?.uid} /> : <ChildTab uid={user?.uid} />}
      </main>
    </div>
  );
};

export default Profile;
