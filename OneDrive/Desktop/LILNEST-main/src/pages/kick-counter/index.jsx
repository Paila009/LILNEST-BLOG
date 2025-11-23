import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

const format = (ms) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
};

const KickCounter = () => {
  const [startAt, setStartAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [kicks, setKicks] = useState([]);
  const [contractions, setContractions] = useState([]);
  const tick = useRef();

  useEffect(() => {
    if (!startAt) return;
    tick.current = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick.current);
  }, [startAt]);

  const elapsed = startAt ? now - startAt : 0;
  const kickCount = kicks.length;

  const alertMsg = useMemo(() => {
    if (!startAt) return '';
    const hours = elapsed / (1000 * 60 * 60);
    if (hours >= 2 && kickCount < 10) return 'Less than 10 kicks in 2 hours — Call your doctor.';
    return '';
  }, [elapsed, kickCount, startAt]);

  const startSession = () => { setStartAt(Date.now()); setKicks([]); };
  const addKick = () => setKicks((k) => [...k, Date.now()]);
  const reset = () => { setStartAt(null); setKicks([]); };

  // Contractions
  const startContraction = () => setContractions((arr) => [...arr, { start: Date.now(), end: null }]);
  const stopContraction = () => setContractions((arr) => arr.map((c, i) => i === arr.length - 1 && !c.end ? { ...c, end: Date.now() } : c));

  const intervals = contractions.filter(c => c.start && c.end).map(c => Math.round((c.end - c.start) / 1000));
  const avg = intervals.length ? Math.round(intervals.reduce((a,b)=>a+b,0)/intervals.length) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Baby Kick Counter & Contraction Tracker</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kick Counter */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-soft flex flex-col items-center">
            <div className="text-sm text-muted-foreground mb-2">Elapsed</div>
            <div className="text-3xl font-semibold mb-4">{format(elapsed)}</div>
            <div className="text-sm text-muted-foreground mb-2">Kicks</div>
            <div className="text-4xl font-bold mb-6">{kickCount}</div>
            {!startAt ? (
              <Button size="lg" onClick={startSession}>Start 2‑hour session</Button>
            ) : (
              <>
                <button onClick={addKick} className="mt-2 mb-4 w-48 h-48 rounded-full bg-primary text-primary-foreground text-2xl shadow-soft hover-lift">💗 Tap for Kick</button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={reset}>Reset</Button>
                </div>
              </>
            )}
            {alertMsg && <div className="mt-4 text-sm text-error">{alertMsg}</div>}
          </div>

          {/* Contraction Timer */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
            <div className="text-lg font-semibold mb-2">Contraction Timer</div>
            <div className="flex gap-2 mb-3">
              <Button onClick={startContraction}>Start</Button>
              <Button variant="secondary" onClick={stopContraction}>Stop</Button>
            </div>
            <div className="text-sm text-muted-foreground mb-2">Recorded intervals (sec)</div>
            <div className="flex flex-wrap gap-2">{intervals.map((v,i)=>(<span key={i} className="bg-muted px-2 py-1 rounded-md text-xs">{v}</span>))}</div>
            <div className="mt-3 text-sm">Average: <span className="font-semibold">{avg || '—'}</span>s</div>
            <div className="mt-2 text-sm text-warning">Rule of thumb: If contractions are <b>under 5 min apart for 1 hour</b>, contact your hospital.</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KickCounter;
