import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import SessionConfiguration from './components/SessionConfiguration';
import ProductivityInsights from './components/ProductivityInsights';
import WebsiteBlocker from './components/WebsiteBlocker';

const PomodoroTimer = () => {
  const navigate = useNavigate();
  // Timer State
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [sessionCount, setSessionCount] = useState(1);
  const [completedSessions, setCompletedSessions] = useState(0);

  // Settings State
  const [settings, setSettings] = useState({
    focusDuration: 25, // minutes
    shortBreakDuration: 5,
    longBreakDuration: 30,
    sessionsUntilLongBreak: 4
  });

  // UI State
  const [activeTab, setActiveTab] = useState('timer');
  const [isWebsiteBlockerEnabled, setIsWebsiteBlockerEnabled] = useState(false);
  const [blockedSites, setBlockedSites] = useState([
    { url: 'facebook.com', category: 'Social Media', isActive: true },
    { url: 'twitter.com', category: 'Social Media', isActive: true },
    { url: 'youtube.com', category: 'Entertainment', isActive: true }
  ]);

  // Mock Data
  const todayStats = {
    completedSessions: 6,
    totalFocusTime: 125, // minutes
    breaksCompleted: 5,
    currentStreak: 7
  };

  const weeklyData = [
    { day: 'Mon', focusMinutes: 180 },
    { day: 'Tue', focusMinutes: 240 },
    { day: 'Wed', focusMinutes: 160 },
    { day: 'Thu', focusMinutes: 200 },
    { day: 'Fri', focusMinutes: 220 },
    { day: 'Sat', focusMinutes: 120 },
    { day: 'Sun', focusMinutes: 90 }
  ];

  // Timer Logic
  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining]);

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    
    if (currentPhase === 'focus') {
      setCompletedSessions(prev => prev + 1);
      
      // Determine next phase
      if (sessionCount % settings?.sessionsUntilLongBreak === 0) {
        setCurrentPhase('longBreak');
        setTotalTime(settings?.longBreakDuration * 60);
        setTimeRemaining(settings?.longBreakDuration * 60);
      } else {
        setCurrentPhase('shortBreak');
        setTotalTime(settings?.shortBreakDuration * 60);
        setTimeRemaining(settings?.shortBreakDuration * 60);
      }
    } else {
      // Break completed, start next focus session
      setCurrentPhase('focus');
      setSessionCount(prev => prev + 1);
      setTotalTime(settings?.focusDuration * 60);
      setTimeRemaining(settings?.focusDuration * 60);
    }

    // Play notification sound (in real app)
    // showNotification();
  }, [currentPhase, sessionCount, settings]);

  const handleStart = (customDuration = null) => {
    if (customDuration) {
      setTimeRemaining(customDuration);
      setTotalTime(customDuration);
      setCurrentPhase(customDuration <= 15 * 60 ? 'shortBreak' : 'focus');
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    
    const duration = currentPhase === 'focus' 
      ? settings?.focusDuration * 60
      : currentPhase === 'shortBreak'
        ? settings?.shortBreakDuration * 60
        : settings?.longBreakDuration * 60;
    
    setTimeRemaining(duration);
    setTotalTime(duration);
  };

  const handleSkip = () => {
    setTimeRemaining(0);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    
    // Update current timer if not active
    if (!isActive) {
      const duration = currentPhase === 'focus' 
        ? newSettings?.focusDuration * 60
        : currentPhase === 'shortBreak'
          ? newSettings?.shortBreakDuration * 60
          : newSettings?.longBreakDuration * 60;
      
      setTimeRemaining(duration);
      setTotalTime(duration);
    }
  };

  const tabs = [
    { id: 'timer', label: 'Timer', icon: 'Timer' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'insights', label: 'Insights', icon: 'TrendingUp' },
    { id: 'blocker', label: 'Website Blocker', icon: 'Shield' }
  ];

  // Check for quick start parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams?.get('quick') === 'true') {
      handleStart();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="Timer" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  Pomodoro Timer
                </h1>
                <p className="text-sm font-caption text-muted-foreground">
                  Focus sessions with smart break management
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-sm font-mono text-foreground">
                  {completedSessions} sessions today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-secondary" />
                <span className="text-sm font-mono text-foreground">
                  {Math.round(completedSessions * settings?.focusDuration)}m focused
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-card/30 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-4">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-organic'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'timer' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timer Section */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-organic">
                <TimerDisplay
                  timeRemaining={timeRemaining}
                  totalTime={totalTime}
                  currentPhase={currentPhase}
                  sessionCount={sessionCount}
                  isActive={isActive}
                  isPaused={isPaused}
                />
                
                <div className="mt-8">
                  <TimerControls
                    isActive={isActive}
                    isPaused={isPaused}
                    onStart={handleStart}
                    onPause={handlePause}
                    onReset={handleReset}
                    onSkip={handleSkip}
                    currentPhase={currentPhase}
                  />
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Session Progress */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-organic">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Session Progress
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-muted-foreground">
                      Completed Today
                    </span>
                    <span className="text-lg font-mono font-bold text-primary">
                      {completedSessions}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-muted-foreground">
                      Current Session
                    </span>
                    <span className="text-lg font-mono font-bold text-foreground">
                      {sessionCount}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-muted-foreground">
                      Next Long Break
                    </span>
                    <span className="text-lg font-mono font-bold text-accent">
                      {settings?.sessionsUntilLongBreak - (sessionCount % settings?.sessionsUntilLongBreak)} sessions
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-organic">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Coffee"
                    iconPosition="left"
                    onClick={() => navigate('/break-session')}
                    className="justify-start"
                  >
                    Take a Break
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Flower2"
                    iconPosition="left"
                    onClick={() => navigate('/virtual-garden')}
                    className="justify-start"
                  >
                    View Garden
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    iconPosition="left"
                    onClick={() => setActiveTab('insights')}
                    className="justify-start"
                  >
                    View Insights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-organic">
              <SessionConfiguration
                settings={settings}
                onSettingsChange={handleSettingsChange}
                isActive={isActive}
              />
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-organic">
              <ProductivityInsights
                todayStats={todayStats}
                weeklyData={weeklyData}
              />
            </div>
          </div>
        )}

        {activeTab === 'blocker' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-organic">
              <WebsiteBlocker
                isEnabled={isWebsiteBlockerEnabled}
                onToggle={() => setIsWebsiteBlockerEnabled(!isWebsiteBlockerEnabled)}
                blockedSites={blockedSites}
                onSitesChange={setBlockedSites}
              />
            </div>
          </div>
        )}
      </div>
      {/* Floating Status */}
      {isActive && (
        <div className="fixed bottom-6 left-6 z-40 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-organic-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full animate-gentle-pulse ${
              currentPhase === 'focus' ? 'bg-primary' : 'bg-secondary'
            }`}></div>
            <span className="text-sm font-body text-foreground">
              {currentPhase === 'focus' ? 'Focus Session' : 'Break Time'} Active
            </span>
            <span className="text-sm font-mono text-muted-foreground">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60)?.toString()?.padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;