import React, { useState } from 'react';

const SYSTEM_PROMPT = `You are a maternal & child nutrition assistant for LILNEST.
Generate a one-day Indian diet plan tailored to:
- Pregnancy trimester and conditions (GDM, anemia, thyroid)
- Food preference (veg/non-veg/eggs) and region
- Calories ~1800–2200 in pregnancy unless specified; include proteins, iron, calcium, DHA sources.
- Output structured sections: Breakfast, Mid‑morning, Lunch, Evening Snack, Dinner, Bedtime.
- Add short safety notes and substitutions.
Keep it concise and easy to follow.`;

const AIDietPlanner = () => {
  const [trimester, setTrimester] = useState('2');
  const [pref, setPref] = useState('veg');
  const [region, setRegion] = useState('South Indian');
  const [conditions, setConditions] = useState({ gdm:false, anemia:false, thyroid:false });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState('');

  const run = async () => {
    setLoading(true);
    setPlan('');
    try {
      const prompt = `Make a one-day ${region} ${pref} diet plan for a ${trimester}nd trimester pregnancy.\n`+
        `Conditions: ${Object.entries(conditions).filter(([,v])=>v).map(([k])=>k.toUpperCase()).join(', ') || 'none'}.`;
      const apiUrl = import.meta.env.VITE_API_BASE_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/chat` : '/api/chat';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
        })
      });
      const data = await res.json();
      setPlan(data.reply || 'No plan generated.');
    } catch (e) {
      setPlan('There was an error generating the plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
      <div className="text-lg font-semibold mb-2">AI Diet Planner</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <select value={trimester} onChange={(e)=>setTrimester(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none">
          <option value="1">1st Trimester</option>
          <option value="2">2nd Trimester</option>
          <option value="3">3rd Trimester</option>
          <option value="postpartum">Postpartum</option>
        </select>
        <select value={pref} onChange={(e)=>setPref(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none">
          <option value="veg">Vegetarian</option>
          <option value="eggs">Vegetarian + Eggs</option>
          <option value="non-veg">Non‑veg</option>
        </select>
        <select value={region} onChange={(e)=>setRegion(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none">
          <option>South Indian</option>
          <option>North Indian</option>
          <option>Bengali</option>
          <option>Gujarati</option>
          <option>Punjabi</option>
          <option>Maharashtrian</option>
        </select>
      </div>
      <div className="mt-2 text-sm flex flex-wrap gap-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={conditions.gdm} onChange={(e)=>setConditions(c=>({ ...c, gdm: e.target.checked }))}/> GDM</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={conditions.anemia} onChange={(e)=>setConditions(c=>({ ...c, anemia: e.target.checked }))}/> Anemia</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={conditions.thyroid} onChange={(e)=>setConditions(c=>({ ...c, thyroid: e.target.checked }))}/> Thyroid</label>
      </div>
      <div className="mt-3">
        <button onClick={run} className="bg-primary text-primary-foreground px-3 py-2 rounded-lg" disabled={loading}>{loading ? 'Generating…' : 'Generate Plan'}</button>
      </div>
      {!!plan && (
        <div className="mt-3 whitespace-pre-wrap text-sm">{plan}</div>
      )}
    </div>
  );
};

export default AIDietPlanner;
