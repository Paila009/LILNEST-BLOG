import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SessionControls = ({ 
  isActive, 
  isPaused, 
  timeRemaining, 
  sessionDuration,
  onPlay, 
  onPause, 
  onSkip, 
  onExtend, 
  onEnd,
  canSkip = true,
  canExtend = true 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const progress = ((sessionDuration - timeRemaining) / sessionDuration) * 100;

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
      {/* Timer Display */}
      <div className="text-center space-y-4">
        <div className="text-4xl md:text-6xl font-mono font-bold text-foreground">
          {formatTime(timeRemaining)}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-organic"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          {Math.round(progress)}% complete
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4">
        {!isActive || isPaused ? (
          <Button
            variant="default"
            size="lg"
            onClick={onPlay}
            iconName="Play"
            iconPosition="left"
            className="floating-action min-w-[120px]"
          >
            {isPaused ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="lg"
            onClick={onPause}
            iconName="Pause"
            iconPosition="left"
            className="floating-action min-w-[120px]"
          >
            Pause
          </Button>
        )}

        <Button
          variant="destructive"
          size="lg"
          onClick={onEnd}
          iconName="Square"
          iconPosition="left"
          className="floating-action"
        >
          End
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-center space-x-3">
        {canSkip && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            iconName="SkipForward"
            iconPosition="left"
            className="organic-hover"
          >
            Skip Step
          </Button>
        )}

        {canExtend && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExtend}
            iconName="Plus"
            iconPosition="left"
            className="organic-hover"
          >
            +2 min
          </Button>
        )}
      </div>

      {/* Session Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} />
          <span>Session: {Math.floor(sessionDuration / 60)}m</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} />
          <span>Break Goal</span>
        </div>
      </div>
    </div>
  );
};

export default SessionControls;