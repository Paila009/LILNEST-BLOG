import React from 'react';
import Icon from '../../../components/AppIcon';

const TimerDisplay = ({ 
  timeRemaining, 
  totalTime, 
  currentPhase, 
  sessionCount, 
  isActive, 
  isPaused 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'focus':
        return 'text-primary';
      case 'shortBreak':
        return 'text-secondary';
      case 'longBreak':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPhaseLabel = () => {
    switch (currentPhase) {
      case 'focus':
        return 'Focus Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Ready to Start';
    }
  };

  const getPhaseIcon = () => {
    switch (currentPhase) {
      case 'focus':
        return 'Timer';
      case 'shortBreak':
        return 'Coffee';
      case 'longBreak':
        return 'Flower2';
      default:
        return 'Play';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Phase Indicator */}
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-muted/20 ${getPhaseColor()}`}>
          <Icon name={getPhaseIcon()} size={24} />
        </div>
        <div className="text-center">
          <h2 className={`text-xl font-heading font-semibold ${getPhaseColor()}`}>
            {getPhaseLabel()}
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            Session {sessionCount} of 4
          </p>
        </div>
      </div>

      {/* Circular Timer */}
      <div className="relative">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          className="transform -rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted/20"
          />
          
          {/* Progress Circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - getProgress() / 100)}`}
            className={`transition-all duration-1000 ease-linear ${getPhaseColor()}`}
            strokeLinecap="round"
          />
        </svg>

        {/* Timer Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-mono font-bold text-foreground mb-2">
              {formatTime(timeRemaining)}
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center justify-center space-x-2">
              {isActive && !isPaused && (
                <div className="w-2 h-2 bg-success rounded-full animate-gentle-pulse"></div>
              )}
              {isPaused && (
                <div className="w-2 h-2 bg-warning rounded-full"></div>
              )}
              <span className="text-sm font-caption text-muted-foreground">
                {isActive && !isPaused ? 'Running' : isPaused ? 'Paused' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Session Progress */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption text-muted-foreground">
            Progress
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            {Math.round(getProgress())}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              currentPhase === 'focus' ? 'bg-primary' :
              currentPhase === 'shortBreak' ? 'bg-secondary' :
              currentPhase === 'longBreak' ? 'bg-accent' : 'bg-muted-foreground'
            }`}
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;