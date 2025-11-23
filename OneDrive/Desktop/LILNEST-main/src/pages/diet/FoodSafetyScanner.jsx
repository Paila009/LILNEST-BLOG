import React, { useState } from 'react';

const RISK_RULES = [
  { key: 'papaya', level: 'avoid', note: 'Avoid raw papaya in pregnancy.' },
  { key: 'caffeine', level: 'caution', note: 'Limit caffeine (<200 mg/day).' },
  { key: 'fish', level: 'caution', note: 'Avoid high‑mercury fish (shark, swordfish).' },
  { key: 'alcohol', level: 'avoid', note: 'No safe amount in pregnancy.' },
  { key: 'nuts', level: 'caution', note: 'Choking risk in toddlers; introduce safely.' },
  { key: 'grapes', level: 'caution', note: 'Whole grapes are choking risk for toddlers.' },
];

const Tag = ({ type, children }) => {
  const map = { safe: 'bg-green-100 text-green-700', caution: 'bg-amber-100 text-amber-700', avoid: 'bg-red-100 text-red-700' };
  return <span className={`px-2 py-1 rounded-md text-xs ${map[type]}`}>{children}</span>;
};

const FoodSafetyScanner = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const analyze = () => {
    const list = text.split(',').map((x) => x.trim().toLowerCase()).filter(Boolean);
    const scored = list.map((i) => {
      const rule = RISK_RULES.find((r) => i.includes(r.key));
      if (!rule) return { name: i, level: 'safe', note: 'No common risks detected.' };
      return { name: i, level: rule.level, note: rule.note };
    });
    setItems(scored);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
      <div className="text-lg font-semibold mb-2">Mother Food Safety & Nutrition Scanner</div>
      <div className="text-sm text-muted-foreground">Enter ingredients separated by commas. Example: papaya, coffee, tuna</div>
      <div className="mt-3 flex gap-2">
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="papaya, coffee, grapes" className="flex-1 bg-input px-3 py-2 rounded-lg outline-none" />
        <button onClick={analyze} className="bg-primary text-primary-foreground px-3 rounded-lg">Scan</button>
      </div>
      {!!items.length && (
        <div className="mt-4 space-y-2">
          {items.map((it) => (
            <div key={it.name} className="flex items-start justify-between p-2 rounded-lg bg-muted">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-muted-foreground">{it.note}</div>
              </div>
              <Tag type={it.level}>{it.level === 'avoid' ? '❌ Avoid' : it.level === 'caution' ? '⚠️ Caution' : '✅ Safe'}</Tag>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodSafetyScanner;
