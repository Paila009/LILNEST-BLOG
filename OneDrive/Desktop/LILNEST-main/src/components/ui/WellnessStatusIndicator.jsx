import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const WellnessStatusIndicator = () => {
  const [wellnessState, setWellnessState] = useState({
    currentSession: null,
    streakDays: 7,
    todayBreaks: 3,
    focusMinutes: 125,
    nextBreakIn: 15,
    isBreakTime: false,
    sessionProgress: 0.65
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSessionStatusIcon = () => {
    if (wellnessState?.isBreakTime) {
      return { icon: 'Coffee', color: 'text-accent', bgColor: 'bg-accent/10' };
    } else if (wellnessState?.currentSession) {
      return { icon: 'Timer', color: 'text-primary', bgColor: 'bg-primary/10' };
    } else {
      return { icon: 'Pause', color: 'text-muted-foreground', bgColor: 'bg-muted/20' };
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const statusIcon = getSessionStatusIcon();

  return (
    <div className="flex items-center space-x-4">
      {/* Current Session Status */}
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${statusIcon?.bgColor} transition-all duration-300`}>
        <div className="relative">
          <Icon 
            name={statusIcon?.icon} 
            size={16} 
            className={`${statusIcon?.color} ${wellnessState?.currentSession ? 'animate-gentle-pulse' : ''}`}
          />
          {wellnessState?.currentSession && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-gentle-pulse"></div>
          )}
        </div>
        <span className={`text-sm font-caption ${statusIcon?.color}`}>
          {wellnessState?.isBreakTime 
            ? 'Break Time' 
            : wellnessState?.currentSession 
              ? 'Focusing' :'Ready'
          }
        </span>
      </div>
      {/* Progress Indicator */}
      {wellnessState?.currentSession && (
        <div className="hidden lg:flex items-center space-x-2">
          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-organic"
              style={{ width: `${wellnessState?.sessionProgress * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {Math.round(wellnessState?.sessionProgress * 100)}%
          </span>
        </div>
      )}
      {/* Wellness Stats */}
      <div className="hidden xl:flex items-center space-x-4 text-muted-foreground">
        {/* Streak Counter */}
        <div className="flex items-center space-x-1.5">
          <Icon name="Flame" size={14} className="text-accent" />
          <span className="text-sm font-mono">{wellnessState?.streakDays} days</span>
        </div>

        {/* Today's Focus Time */}
        <div className="flex items-center space-x-1.5">
          <Icon name="Clock" size={14} className="text-primary" />
          <span className="text-sm font-mono">{formatTime(wellnessState?.focusMinutes)}</span>
        </div>

        {/* Break Counter */}
        <div className="flex items-center space-x-1.5">
          <Icon name="Coffee" size={14} className="text-secondary" />
          <span className="text-sm font-mono">{wellnessState?.todayBreaks} breaks</span>
        </div>
      </div>
      {/* Next Break Reminder */}
      {!wellnessState?.isBreakTime && wellnessState?.nextBreakIn && (
        <div className="hidden lg:flex items-center space-x-2 px-2 py-1 bg-warning/10 rounded-lg">
          <Icon name="Bell" size={14} className="text-warning" />
          <span className="text-xs font-caption text-warning-foreground">
            Break in {wellnessState?.nextBreakIn}m
          </span>
        </div>
      )}
      {/* Time Display */}
      <div className="hidden md:flex items-center space-x-1.5 text-muted-foreground">
        <Icon name="Clock" size={14} />
        <span className="text-sm font-mono">
          {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default WellnessStatusIndicator;