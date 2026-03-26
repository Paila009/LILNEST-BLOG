import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { buildFitnessPlan } from '../../utils/fitnessRules';

const WorkoutCard = ({ title, duration, intensity, icon, color, description, onStart }) => (
  <div className="group bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
    <div className={`inline-flex p-3 rounded-xl ${color} mb-4 group-hover:scale-110 transition-transform`}>
      <Icon name={icon} className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Icon name="Clock" className="w-3 h-3" />
          {duration}
        </span>
        <span className={`px-2 py-1 rounded-full font-medium ${
          intensity === 'Low' ? 'bg-green-500/10 text-green-500' :
          intensity === 'Moderate' ? 'bg-yellow-500/10 text-yellow-500' :
          'bg-orange-500/10 text-orange-500'
        }`}>
          {intensity}
        </span>
      </div>
    </div>
    <Button variant="secondary" size="sm" className="w-full" onClick={onStart}>
      Start Workout
    </Button>
  </div>
);

const MetricCard = ({ icon, label, value, color, trend }) => (
  <div className="bg-card rounded-xl p-4 border border-border">
    <div className="flex items-center justify-between mb-2">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon name={icon} className="w-4 h-4 text-white" />
      </div>
      {trend && (
        <span className={`text-xs font-medium ${trend > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>
          {trend > 0 ? '↑' : '→'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const SafetyIndicator = ({ level }) => {
  const colors = {
    safe: 'bg-green-500',
    moderate: 'bg-yellow-500',
    caution: 'bg-red-500'
  };
  
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-3 h-3 rounded-full ${colors[level]} animate-pulse`}></div>
        <span className="font-medium text-foreground">
          {level === 'safe' ? 'Safe Zone' : level === 'moderate' ? 'Moderate Effort' : 'Take it Easy'}
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors[level]} transition-all duration-500`}
          style={{ width: level === 'safe' ? '40%' : level === 'moderate' ? '70%' : '95%' }}
        ></div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {level === 'safe' ? 'Your heart rate is in a safe range' : 
         level === 'moderate' ? 'Moderate intensity - stay hydrated' : 
         'Consider slowing down and taking breaks'}
      </p>
    </div>
  );
};

const Fitness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = React.useState(null);
  const [activeWorkout, setActiveWorkout] = React.useState(null);
  const [workoutTime, setWorkoutTime] = React.useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'profiles', 'mother');
      const snap = await getDoc(ref);
      if (mounted) setProfile(snap.exists() ? snap.data() : {});
    })();
    return () => { mounted = false; };
  }, [user]);

  React.useEffect(() => {
    let interval;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const plan = React.useMemo(() => buildFitnessPlan(profile || {}), [profile]);

  const workoutCategories = [
    {
      id: 'prenatal-yoga',
      title: 'Prenatal Yoga',
      duration: '15-30 min',
      intensity: 'Low',
      icon: 'Heart',
      color: 'bg-pink-500',
      description: 'Gentle flows adapted for each trimester with breathing techniques'
    },
    {
      id: 'strength',
      title: 'Low-Impact Strength',
      duration: '20 min',
      intensity: 'Moderate',
      icon: 'Dumbbell',
      color: 'bg-green-500',
      description: 'Safe core & pelvic floor exercises for pregnancy'
    },
    {
      id: 'pilates',
      title: 'Prenatal Pilates',
      duration: '25 min',
      intensity: 'Low',
      icon: 'Activity',
      color: 'bg-purple-500',
      description: 'Core stability and flexibility with pregnancy modifications'
    },
    {
      id: 'breathing',
      title: 'Breathing & Relaxation',
      duration: '10 min',
      intensity: 'Low',
      icon: 'Wind',
      color: 'bg-blue-500',
      description: 'Guided breathing exercises for labor preparation'
    },
    {
      id: 'walking',
      title: 'Walking Workouts',
      duration: '30 min',
      intensity: 'Low',
      icon: 'Footprints',
      color: 'bg-teal-500',
      description: 'Indoor/outdoor walking routines with pace guidance'
    },
    {
      id: 'stretching',
      title: 'Stretching for Back & Hips',
      duration: '15 min',
      intensity: 'Low',
      icon: 'Move',
      color: 'bg-orange-500',
      description: 'Targeted stretches for pregnancy discomfort relief'
    },
    {
      id: 'labor-prep',
      title: 'Labor Preparation',
      duration: '20 min',
      intensity: 'Moderate',
      icon: 'Sparkles',
      color: 'bg-rose-500',
      description: 'Week 37+ exercises to prepare body for childbirth'
    },
    {
      id: 'postpartum',
      title: 'Postpartum Core Healing',
      duration: '15 min',
      intensity: 'Low',
      icon: 'Shield',
      color: 'bg-indigo-500',
      description: 'Gentle recovery exercises for after delivery'
    },
    {
      id: 'mother-baby',
      title: 'Mother & Baby Mobility',
      duration: '20 min',
      intensity: 'Low',
      icon: 'Baby',
      color: 'bg-cyan-500',
      description: 'Fun movement sessions with your little one'
    }
  ];

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
    setIsWorkoutActive(true);
    setWorkoutTime(0);
  };

  const handleStopWorkout = () => {
    setIsWorkoutActive(false);
    setActiveWorkout(null);
    setWorkoutTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (activeWorkout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
          {/* Active Workout View */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{activeWorkout.title}</h1>
                <p className="text-muted-foreground">{activeWorkout.description}</p>
              </div>
              <Button variant="destructive" onClick={handleStopWorkout}>
                End Workout
              </Button>
            </div>

            {/* Timer & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard icon="Clock" label="Duration" value={formatTime(workoutTime)} color="bg-blue-500" />
              <MetricCard icon="Heart" label="Heart Rate" value="112 bpm" color="bg-pink-500" trend={5} />
              <MetricCard icon="Zap" label="Calories" value="48 kcal" color="bg-orange-500" trend={12} />
              <MetricCard icon="Droplet" label="Hydration" value="2 of 8" color="bg-cyan-500" />
            </div>

            {/* Safety Indicator */}
            <SafetyIndicator level="safe" />

            {/* Workout Visual */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-6">
                  <div className={`inline-flex p-8 rounded-full ${activeWorkout.color} animate-pulse`}>
                    <Icon name={activeWorkout.icon} className="w-24 h-24 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {isWorkoutActive ? 'Keep Going!' : 'Paused'}
                    </h3>
                    <p className="text-muted-foreground">
                      Listen to your body and take breaks as needed
                    </p>
                  </div>
                  {/* Breathing Animation */}
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full animate-ping"></div>
                      <div className="absolute inset-4 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-full animate-pulse"></div>
                      <div className="absolute inset-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">Breathe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full" onClick={() => alert('Hydration reminder set!')}>
                <Icon name="Droplet" className="w-4 h-4 mr-2" />
                Log Water Intake
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/kick-counter')}>
                <Icon name="Activity" className="w-4 h-4 mr-2" />
                Baby Kick Counter
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsWorkoutActive(!isWorkoutActive)}>
                <Icon name={isWorkoutActive ? "Pause" : "Play"} className="w-4 h-4 mr-2" />
                {isWorkoutActive ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 text-sm font-medium mb-2">
            <Icon name="Heart" className="w-4 h-4" />
            Maternal Wellness & Fitness
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Pregnancy-Safe Workouts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apple Fitness+ inspired maternal care workouts. Safe, effective, and personalized for every trimester.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon="Activity" label="Weekly Streak" value="5 days" color="bg-green-500" trend={20} />
          <MetricCard icon="Target" label="Goals Met" value="12/15" color="bg-blue-500" trend={8} />
          <MetricCard icon="Zap" label="Total Calories" value="1,245" color="bg-orange-500" trend={15} />
          <MetricCard icon="Trophy" label="Points Earned" value="340" color="bg-yellow-500" trend={25} />
        </div>

        {/* Personalized Plan */}
        {profile && (
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="Sparkles" className="w-5 h-5 text-primary" />
              Your Personalized Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">✓ Recommendations</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {plan.recommendations.slice(0, 4).map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">⚠️ Safety Notes</h3>
                {plan.warnings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">You're all clear!</p>
                ) : (
                  <ul className="space-y-1 text-sm text-warning">
                    {plan.warnings.slice(0, 4).map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">🚫 Avoid</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {plan.contraindications.slice(0, 4).map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Workout Categories */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">All Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutCategories.map((workout) => (
              <WorkoutCard
                key={workout.id}
                {...workout}
                onStart={() => handleStartWorkout(workout)}
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Maternal Health Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/kick-counter')}>
              <Icon name="Activity" className="w-5 h-5 mr-3 text-pink-500" />
              <div className="text-left">
                <div className="font-medium">Kick Counter</div>
                <div className="text-xs text-muted-foreground">Track fetal movements</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/growth')}>
              <Icon name="TrendingUp" className="w-5 h-5 mr-3 text-blue-500" />
              <div className="text-left">
                <div className="font-medium">Growth Tracker</div>
                <div className="text-xs text-muted-foreground">Monitor development</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/emergency')}>
              <Icon name="PhoneCall" className="w-5 h-5 mr-3 text-red-500" />
              <div className="text-left">
                <div className="font-medium">Emergency</div>
                <div className="text-xs text-muted-foreground">Quick access to help</div>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Fitness;
