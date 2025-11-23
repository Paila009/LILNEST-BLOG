import React, { useEffect, useState } from 'react';
import Button from './Button';

const todayKey = () => new Date().toISOString().slice(0,10);

const HydrationWidget = ({ goalMl = 2000 }) => {
  const [date, setDate] = useState(todayKey());
  const [ml, setMl] = useState(0);
  const [remind, setRemind] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const key = `lilnest-hydration-${todayKey()}`;
    const saved = localStorage.getItem(key);
    if (saved) setMl(parseInt(saved, 10) || 0);
    setDate(todayKey());
  }, []);

  useEffect(() => {
    const key = `lilnest-hydration-${date}`;
    localStorage.setItem(key, String(ml));
  }, [ml, date]);

  useEffect(() => {
    if (remind) {
      const id = setInterval(() => {
        // gentle visual nudge; browsers often block audio/notifications without user gesture
        // so we just highlight the tab by toggling title briefly
        const original = document.title;
        document.title = '💧 Time to drink water — LILNEST';
        setTimeout(() => (document.title = original), 2000);
      }, 45 * 60 * 1000); // every 45 minutes
      setIntervalId(id);
      return () => clearInterval(id);
    }
    if (intervalId) clearInterval(intervalId);
  }, [remind]);

  const pct = Math.min(100, Math.round((ml / goalMl) * 100));

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Hydration</div>
        <label className="text-sm flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={remind} onChange={(e)=>setRemind(e.target.checked)} />
          <span className="text-muted-foreground">Remind me</span>
        </label>
      </div>
      <div className="text-sm text-muted-foreground">Goal {goalMl} ml</div>
      <div className="mt-2 h-3 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: pct + '%' }} />
      </div>
      <div className="mt-2 text-sm">
        <span className="font-semibold">{ml} ml</span>
        <span className="text-muted-foreground"> • {pct}%</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[150, 200, 250, 300].map((v) => (
          <Button key={v} size="xs" variant="secondary" onClick={() => setMl((x) => x + v)}>
            +{v} ml
          </Button>
        ))}
        <Button size="xs" variant="ghost" onClick={() => setMl(0)}>Reset</Button>
      </div>
    </div>
  );
};

export default HydrationWidget;
