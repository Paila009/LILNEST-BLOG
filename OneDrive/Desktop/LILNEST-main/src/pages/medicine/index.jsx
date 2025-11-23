import React, { useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';

const pediatricAddons = [
  { name: 'Montelukast', dose: '4 mg chew tab', freq: 'HS', notes: 'Only if allergy doctor prescribes' },
  { name: 'Domperidone', dose: '0.25–0.5 mg/kg', freq: 'TID', notes: 'Avoid unnecessary use' },
  { name: 'Zinc Syrup', dose: '10 mg/day', freq: 'Daily', notes: 'For diarrhea with ORS' },
  { name: 'Vitamin D drops', dose: '400 IU/day', freq: 'Daily', notes: 'For infants' },
  { name: 'Saline Nasal Drops', dose: '1–2 drops/nostril', freq: '4–6×', notes: 'Cold relief' },
];

const pregnancyAddons = [
  { name: 'Metformin', dose: '500–1500 mg', freq: 'Daily', notes: 'For GDM under doctor' },
  { name: 'Labetalol', dose: '100–200 mg', freq: 'BID', notes: 'BP control' },
  { name: 'Levothyroxine', dose: 'weight-based', freq: 'Morning', notes: 'Thyroid management' },
  { name: 'Progesterone', dose: 'doctor guided', freq: '—', notes: 'High-risk pregnancy' },
  { name: 'ORS + Electrolytes', dose: '200–250 mL', freq: 'Per dehydration', notes: 'For vomiting weeks' },
];

const Table = ({ title, data, q }) => {
  const filtered = useMemo(
    () => data.filter((x) => x.name.toLowerCase().includes(q.toLowerCase())),
    [data, q]
  );
  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 pr-2">Medicine</th>
              <th className="py-2 pr-2">Dose</th>
              <th className="py-2 pr-2">Frequency</th>
              <th className="py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.name} className="border-t border-border">
                <td className="py-2 pr-2 font-medium">{m.name}</td>
                <td className="py-2 pr-2">{m.dose}</td>
                <td className="py-2 pr-2">{m.freq}</td>
                <td className="py-2 text-muted-foreground">{m.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Medicine = () => {
  const [q, setQ] = useState('');
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Medicine Safety & Dosage</h1>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="text-sm text-muted-foreground">Search by medicine name</div>
          <div className="mt-2">
            <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="e.g., Labetalol" />
          </div>
        </div>
        <Table title="Pediatric" data={pediatricAddons} q={q} />
        <Table title="Pregnancy" data={pregnancyAddons} q={q} />
      </main>
    </div>
  );
};

export default Medicine;
