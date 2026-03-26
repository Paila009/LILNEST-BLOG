import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState({
    hours: '',
    quality: '',
    bedtime: '',
    wakeTime: ''
  });

  const qualityOptions = [
    { value: 'poor', label: 'Poor', icon: 'CloudRain', color: 'text-red-500' },
    { value: 'okay', label: 'Okay', icon: 'Cloud', color: 'text-yellow-500' },
    { value: 'good', label: 'Good', icon: 'Sun', color: 'text-green-500' },
    { value: 'excellent', label: 'Excellent', icon: 'Star', color: 'text-blue-500' }
  ];

  const sleepTips = [
    {
      title: "Consistent Schedule",
      tip: "Go to bed and wake up at the same time every day",
      icon: "Clock"
    },
    {
      title: "Optimal Environment",
      tip: "Keep your bedroom dark, quiet, and cool",
      icon: "Moon"
    },
    {
      title: "Digital Wind-Down",
      tip: "Avoid screens 1 hour before bedtime",
      icon: "Smartphone"
    },
    {
      title: "Relaxation Routine",
      tip: "Practice calming activities before bed",
      icon: "Heart"
    }
  ];

  const [showTips, setShowTips] = useState(true);

  const handleSubmit = () => {
    // Save sleep data
    console.log('Sleep data:', sleepData);
    setShowTips(true);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Sleep Tracker</h2>
        <p className="text-muted-foreground">Monitor and improve your sleep quality</p>
      </div>

      {!showTips ? (
        <div className="space-y-6">
          {/* Sleep Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Hours of Sleep</label>
            <input
              type="number"
              min="0"
              max="24"
              value={sleepData.hours}
              onChange={(e) => setSleepData({ ...sleepData, hours: e.target.value })}
              className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter hours of sleep"
            />
          </div>

          {/* Sleep Quality */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sleep Quality</label>
            <div className="grid grid-cols-2 gap-3">
              {qualityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSleepData({ ...sleepData, quality: option.value })}
                  className={`p-3 rounded-lg border-2 flex items-center space-x-2 ${
                    sleepData.quality === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                >
                  <Icon name={option.icon} className={`w-5 h-5 ${option.color}`} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sleep Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bedtime</label>
              <input
                type="time"
                value={sleepData.bedtime}
                onChange={(e) => setSleepData({ ...sleepData, bedtime: e.target.value })}
                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wake Time</label>
              <input
                type="time"
                value={sleepData.wakeTime}
                onChange={(e) => setSleepData({ ...sleepData, wakeTime: e.target.value })}
                className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save Sleep Data
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {sleepTips.map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-card"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={tip.icon} className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setShowTips(false)}
            className="w-full"
          >
            Track New Sleep
          </Button>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;