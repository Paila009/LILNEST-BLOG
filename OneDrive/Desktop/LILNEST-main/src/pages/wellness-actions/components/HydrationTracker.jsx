import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HydrationTracker = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(8); // Default 8 glasses
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [lastReminder, setLastReminder] = useState(null);

  useEffect(() => {
    if (reminderEnabled && (!lastReminder || Date.now() - lastReminder > 3600000)) {
      // Check if an hour has passed since last reminder
      const notification = new Notification('Hydration Reminder', {
        body: 'Time to drink some water! 💧',
        icon: '/icons/water.png'
      });
      setLastReminder(Date.now());
    }
  }, [reminderEnabled, lastReminder]);

  const handleAddWater = (amount) => {
    setWaterIntake(Math.min(waterIntake + amount, goal));
  };

  const handleRemoveWater = (amount) => {
    setWaterIntake(Math.max(waterIntake - amount, 0));
  };

  const calculateProgress = () => {
    return (waterIntake / goal) * 100;
  };

  const getHydrationTip = () => {
    const tips = [
      "Start your day with a glass of water",
      "Keep a reusable water bottle nearby",
      "Set regular water break reminders",
      "Drink water before, during, and after exercise",
      "Add natural flavors like lemon or cucumber"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Hydration Tracker</h2>
        <p className="text-muted-foreground">Track your daily water intake</p>
      </div>

      {/* Progress Circle */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-border"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="8"
            strokeDasharray={`${calculateProgress()}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{waterIntake}</div>
          <div className="text-sm text-muted-foreground">of {goal} glasses</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleRemoveWater(1)}
            variant="outline"
            disabled={waterIntake === 0}
          >
            <Icon name="Minus" className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => handleAddWater(1)}
            disabled={waterIntake === goal}
          >
            <Icon name="Plus" className="w-4 h-4" />
            Add Glass
          </Button>
        </div>

        {/* Reminder Toggle */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Hourly Reminder</p>
              <p className="text-sm text-muted-foreground">Get notifications to stay hydrated</p>
            </div>
          </div>
          <button
            onClick={() => setReminderEnabled(!reminderEnabled)}
            className={`w-11 h-6 rounded-full transition-colors ${
              reminderEnabled ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                reminderEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Hydration Tip */}
        <div className="p-4 bg-primary/10 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium mb-1">Hydration Tip</p>
              <p className="text-sm text-muted-foreground">{getHydrationTip()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HydrationTracker;