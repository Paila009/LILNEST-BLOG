import React from 'react';
import Button from '../../../components/ui/Button';

const TimerControls = ({ 
  isActive, 
  isPaused, 
  onStart, 
  onPause, 
  onReset, 
  onSkip,
  currentPhase 
}) => {
  const getMainButtonProps = () => {
    if (!isActive) {
      return {
        variant: 'default',
        iconName: 'Play',
        children: 'Start Session',
        onClick: onStart
      };
    } else if (isPaused) {
      return {
        variant: 'default',
        iconName: 'Play',
        children: 'Resume',
        onClick: onStart
      };
    } else {
      return {
        variant: 'secondary',
        iconName: 'Pause',
        children: 'Pause',
        onClick: onPause
      };
    }
  };

  const mainButton = getMainButtonProps();

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Primary Control */}
      <Button
        variant={mainButton?.variant}
        size="lg"
        iconName={mainButton?.iconName}
        iconPosition="left"
        onClick={mainButton?.onClick}
        className="min-w-[160px] floating-action shadow-organic-lg"
      >
        {mainButton?.children}
      </Button>
      {/* Secondary Controls */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="default"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onReset}
          disabled={!isActive && !isPaused}
          className="organic-hover"
        >
          Reset
        </Button>

        <Button
          variant="ghost"
          size="default"
          iconName="SkipForward"
          iconPosition="left"
          onClick={onSkip}
          disabled={!isActive}
          className="organic-hover"
        >
          Skip {currentPhase === 'focus' ? 'to Break' : 'to Focus'}
        </Button>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
        <span>Quick:</span>
        <button
          onClick={() => onStart(15 * 60)} // 15 min focus
          className="px-2 py-1 bg-muted/50 rounded hover:bg-muted transition-colors duration-200"
        >
          15m Focus
        </button>
        <button
          onClick={() => onStart(5 * 60)} // 5 min break
          className="px-2 py-1 bg-muted/50 rounded hover:bg-muted transition-colors duration-200"
        >
          5m Break
        </button>
      </div>
    </div>
  );
};

export default TimerControls;