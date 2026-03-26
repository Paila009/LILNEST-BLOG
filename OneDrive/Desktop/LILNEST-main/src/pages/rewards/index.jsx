import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ensureSummary, getSummary, addPoints, getChallenges, addChallenge, grantBadge } from '../../utils/rewardsStore';

const StatCard = ({ title, value, note }) => (
  <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-2xl font-semibold">{value}</div>
    {note && <div className="text-xs text-muted-foreground mt-1">{note}</div>}
  </div>
);

const ProgressBar = ({ value = 0, max = 1000 }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-3 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary" style={{ width: pct + '%' }} />
    </div>
  );
};

const Rewards = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ level: 1, points: 0, streak: 0, badges: [] });
  const [challenges, setChallenges] = useState([]);
  const nextLevelAt = useMemo(() => summary.level * 1000, [summary.level]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      await ensureSummary(user.uid);
      const s = await getSummary(user.uid);
      setSummary(s);
      const list = await getChallenges(user.uid);
      if (!list.length) {
        await addChallenge(user.uid, { name: '7-Day Wellness', goal: 7, progress: 0, xp: 500 });
        await addChallenge(user.uid, { name: 'Hydration Month', goal: 30, progress: 0, xp: 1000 });
      }
      const fresh = await getChallenges(user.uid);
      setChallenges(fresh);
    })();
  }, [user]);

  const checkIn = async () => {
    if (!user) return;
    const res = await addPoints(user.uid, 50);
    setSummary((s) => ({ ...s, points: res.points, level: res.level }));
    if (res.points >= 500 && !(summary.badges || []).includes('Getting Started')) {
      const badges = await grantBadge(user.uid, 'Getting Started');
      setSummary((s) => ({ ...s, badges }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Rewards & Achievements</h1>
          <Button size="sm" onClick={checkIn}>Daily Check‑in +50</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Level" value={summary.level} note={`${summary.points % 1000}/1000 to next`} />
          <StatCard title="Streak" value={summary.streak} note="days in a row" />
          <StatCard title="Badges" value={(summary.badges || []).length} />
          <StatCard title="Points" value={summary.points} />
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
          <div className="text-sm text-muted-foreground mb-1">Progress to Level {summary.level + 1}</div>
          <ProgressBar value={summary.points - (summary.level - 1) * 1000} max={1000} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
            <div className="text-lg font-semibold mb-2">Active Challenges</div>
            <div className="space-y-3">
              {challenges.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">+{c.xp} XP</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{c.progress || 0}/{c.goal}</div>
                  <ProgressBar value={c.progress || 0} max={c.goal || 1} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
            <div className="text-lg font-semibold mb-2">Your Badges</div>
            <div className="flex flex-wrap gap-2">
              {(summary.badges || []).length === 0 && (
                <div className="text-sm text-muted-foreground">Earn badges by completing challenges and daily check‑ins.</div>
              )}
              {(summary.badges || []).map((b) => (
                <span key={b} className="px-3 py-1 rounded-full bg-secondary text-foreground text-sm">🏅 {b}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rewards;
