import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PowerNap = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showTips, setShowTips] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play gentle wake up sound
      const audio = new Audio('/assets/sounds/gentle-wake.mp3');
      audio.play();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!hasStarted) {
      setHasStarted(true);
      setShowTips(false);
    }
  };

  const resetTimer = () => {
    setTimeLeft(10 * 60);
    setIsActive(false);
    setHasStarted(false);
    setShowTips(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const wellnessReminderTips = [
    "Find a quiet, dimly lit space",
    "Set an alarm to avoid oversleeping",
    "Use a light blanket if available",
    "Practice deep breathing to relax",
    "Ideal nap duration: 10-20 minutes"
  ];

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
          <div className="absolute -right-2 -top-2">
            <Icon 
              name="Moon" 
              className="w-6 h-6 text-indigo-500" 
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Power Nap Timer</h2>
        <p className="text-muted-foreground">
          A quick nap to restore energy and focus
        </p>
      </div>

      {showTips && (
        <div className="mb-8 bg-foreground/5 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Wellness Tips</h3>
          <ul className="space-y-2">
            {wellnessReminderTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <Button 
          onClick={toggleTimer}
          className={isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'}
        >
          <Icon name={isActive ? "Pause" : "Play"} className="w-4 h-4 mr-2" />
          {isActive ? 'Pause' : hasStarted ? 'Resume' : 'Start Nap'}
        </Button>
        {hasStarted && (
          <Button 
            onClick={resetTimer} 
            variant="outline"
          >
            <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default PowerNap;