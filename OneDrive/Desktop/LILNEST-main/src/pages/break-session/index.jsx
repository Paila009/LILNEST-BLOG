import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WellnessTabNavigation from '../../components/ui/WellnessTabNavigation';
import WellnessStatusIndicator from '../../components/ui/WellnessStatusIndicator';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import BreakActivityDisplay from './components/BreakActivityDisplay';
import SessionControls from './components/SessionControls';
import ActivitySelector from './components/ActivitySelector';
import AmbientSoundControls from './components/AmbientSoundControls';
import MoodLogger from './components/MoodLogger';
import ProgressIndicator from './components/ProgressIndicator';
import PowerNap from './components/PowerNap';
import SnackBreak from './components/SnackBreak';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const BreakSession = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionState, setSessionState] = useState({
    isActive: false,
    isPaused: false,
    activityType: searchParams?.get('type') || 'breathing',
    sessionDuration: parseInt(searchParams?.get('duration')) * 60 || 300, // 5 minutes default
    timeRemaining: parseInt(searchParams?.get('duration')) * 60 || 300,
    isStrictMode: false,
    showMoodLogger: false,
    moodLoggerType: 'pre',
    sessionCount: 0
  });

  const [userStats, setUserStats] = useState({
    currentStreak: 12,
    todayBreaks: 4,
    weeklyGoal: 21,
    totalSessions: 87
  });

  const [currentView, setCurrentView] = useState('setup'); // 'setup', 'session', 'mood', 'complete'

  // Auto-start if quick parameter is present
  useEffect(() => {
    if (searchParams?.get('quick') === 'true') {
      handleStartSession();
    }
  }, []);

  // Session timer
  useEffect(() => {
    let timer;
    if (sessionState?.isActive && !sessionState?.isPaused && sessionState?.timeRemaining > 0) {
      timer = setInterval(() => {
        setSessionState(prev => ({
          ...prev,
          timeRemaining: prev?.timeRemaining - 1
        }));
      }, 1000);
    } else if (sessionState?.timeRemaining === 0 && sessionState?.isActive) {
      handleSessionComplete();
    }

    return () => clearInterval(timer);
  }, [sessionState?.isActive, sessionState?.isPaused, sessionState?.timeRemaining]);

  const handleStartSession = () => {
    if (sessionState.activityType === 'power-nap' || sessionState.activityType === 'snack') {
      setCurrentView('session');
      setSessionState(prev => ({
        ...prev,
        isActive: true,
        sessionCount: prev.sessionCount + 1
      }));
    } else {
      setCurrentView('mood');
      setSessionState(prev => ({
        ...prev,
        showMoodLogger: true,
        moodLoggerType: 'pre'
      }));
    }
  };

  const handleMoodSubmit = (moodData) => {
    console.log('Mood data:', moodData);
    
    if (moodData?.type === 'pre') {
      setCurrentView('session');
      setSessionState(prev => ({
        ...prev,
        isActive: true,
        showMoodLogger: false,
        sessionCount: prev?.sessionCount + 1
      }));
    } else {
      setCurrentView('complete');
      setUserStats(prev => ({
        ...prev,
        todayBreaks: prev?.todayBreaks + 1,
        totalSessions: prev?.totalSessions + 1
      }));
    }
  };

  const handleMoodSkip = () => {
    if (sessionState?.moodLoggerType === 'pre') {
      setCurrentView('session');
      setSessionState(prev => ({
        ...prev,
        isActive: true,
        showMoodLogger: false,
        sessionCount: prev?.sessionCount + 1
      }));
    } else {
      setCurrentView('complete');
    }
  };

  const handleSessionComplete = () => {
    setCurrentView('mood');
    setSessionState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      showMoodLogger: true,
      moodLoggerType: 'post'
    }));
  };

  const handlePlayPause = () => {
    if (!sessionState?.isActive) {
      handleStartSession();
    } else {
      setSessionState(prev => ({
        ...prev,
        isPaused: !prev?.isPaused
      }));
    }
  };

  const handleEndSession = () => {
    setSessionState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      timeRemaining: prev?.sessionDuration
    }));
    setCurrentView('setup');
  };

  const handleSkipStep = () => {
    // Skip current activity step
    console.log('Skipping current step');
  };

  const handleExtendSession = () => {
    setSessionState(prev => ({
      ...prev,
      timeRemaining: prev?.timeRemaining + 120, // Add 2 minutes
      sessionDuration: prev?.sessionDuration + 120
    }));
  };

  const handleActivityChange = (activityType) => {
    if (!sessionState?.isActive) {
      const durations = {
        breathing: 300, // 5 minutes
        posture: 180,   // 3 minutes
        eyes: 120,      // 2 minutes
        stretching: 300, // 5 minutes
        meditation: 600  // 10 minutes
      };

      setSessionState(prev => ({
        ...prev,
        activityType,
        sessionDuration: durations?.[activityType],
        timeRemaining: durations?.[activityType]
      }));
    }
  };

  const handleSoundChange = (soundId) => {
    console.log('Sound changed to:', soundId);
  };

  const toggleStrictMode = () => {
    setSessionState(prev => ({
      ...prev,
      isStrictMode: !prev?.isStrictMode
    }));
  };

  const handleNewSession = () => {
    setCurrentView('setup');
    setSessionState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      timeRemaining: prev?.sessionDuration,
      showMoodLogger: false
    }));
  };

  // Strict mode overlay
  if (sessionState?.isStrictMode && sessionState?.isActive && currentView === 'session') {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col">
        {/* Minimal header for strict mode */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={24} className="text-primary" />
            <span className="font-heading font-semibold text-foreground">Strict Mode</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleStrictMode}
            iconName="X"
            className="text-muted-foreground"
          />
        </div>
        {/* Full screen activity */}
        <div className="flex-1 flex flex-col">
          <BreakActivityDisplay
            activityType={sessionState?.activityType}
            isActive={sessionState?.isActive}
            sessionDuration={sessionState?.sessionDuration}
            timeRemaining={sessionState?.timeRemaining}
            onComplete={handleSessionComplete}
          />
          
          <div className="p-6">
            <SessionControls
              isActive={sessionState?.isActive}
              isPaused={sessionState?.isPaused}
              timeRemaining={sessionState?.timeRemaining}
              sessionDuration={sessionState?.sessionDuration}
              onPlay={handlePlayPause}
              onPause={handlePlayPause}
              onSkip={handleSkipStep}
              onExtend={handleExtendSession}
              onEnd={handleEndSession}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WellnessTabNavigation />
      <main className="pt-32 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Wellness Break Session
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a mindful break to refresh your mind and body. Choose your preferred activity and let us guide you through a restorative experience.
            </p>
            
            <WellnessStatusIndicator />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Activity & Controls */}
            <div className="lg:col-span-2 space-y-6">
              {currentView === 'setup' && (
                <>
                  <ActivitySelector
                    selectedActivity={sessionState?.activityType}
                    onActivityChange={handleActivityChange}
                    isSessionActive={sessionState?.isActive}
                  />
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={handleStartSession}
                      iconName="Play"
                      iconPosition="left"
                      className="floating-action min-w-[160px]"
                    >
                      Start Break
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={toggleStrictMode}
                      iconName={sessionState?.isStrictMode ? "ShieldCheck" : "Shield"}
                      iconPosition="left"
                      className="organic-hover"
                    >
                      {sessionState?.isStrictMode ? 'Strict Mode On' : 'Enable Strict Mode'}
                    </Button>
                  </div>
                </>
              )}

              {currentView === 'session' && (
                <div className="space-y-6">
                  <BreakActivityDisplay
                    activityType={sessionState?.activityType}
                    isActive={sessionState?.isActive}
                    sessionDuration={sessionState?.sessionDuration}
                    timeRemaining={sessionState?.timeRemaining}
                    onComplete={handleSessionComplete}
                  />
                  
                  <SessionControls
                    isActive={sessionState?.isActive}
                    isPaused={sessionState?.isPaused}
                    timeRemaining={sessionState?.timeRemaining}
                    sessionDuration={sessionState?.sessionDuration}
                    onPlay={handlePlayPause}
                    onPause={handlePlayPause}
                    onSkip={handleSkipStep}
                    onExtend={handleExtendSession}
                    onEnd={handleEndSession}
                  />
                </div>
              )}

              {currentView === 'mood' && (
                <MoodLogger
                  type={sessionState?.moodLoggerType}
                  onMoodSubmit={handleMoodSubmit}
                  onSkip={handleMoodSkip}
                />
              )}

              {currentView === 'complete' && (
                <div className="text-center space-y-6 py-12">
                  <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto animate-organic-grow">
                    <Icon name="CheckCircle" size={48} className="text-success" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-heading font-semibold text-foreground">
                      Break Complete! 🎉
                    </h2>
                    <p className="text-muted-foreground">
                      Great job taking care of your wellness. You're building healthy habits!
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="default"
                      onClick={handleNewSession}
                      iconName="RotateCcw"
                      iconPosition="left"
                      className="floating-action"
                    >
                      New Session
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => navigate('/dashboard-home')}
                      iconName="Home"
                      iconPosition="left"
                      className="organic-hover"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Controls & Progress */}
            <div className="space-y-6">
              <AmbientSoundControls
                isSessionActive={sessionState?.isActive}
                onSoundChange={handleSoundChange}
              />
              
              <ProgressIndicator
                currentStreak={userStats?.currentStreak}
                todayBreaks={userStats?.todayBreaks}
                weeklyGoal={userStats?.weeklyGoal}
                sessionCount={userStats?.totalSessions}
              />
            </div>
          </div>
        </div>
      </main>
      <QuickActionPanel />
    </div>
  );
};

export default BreakSession;