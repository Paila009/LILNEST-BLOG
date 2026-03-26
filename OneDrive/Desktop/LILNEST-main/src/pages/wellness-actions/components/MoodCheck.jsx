import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodCheck = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [moodData, setMoodData] = useState({
    mood: '',
    energyLevel: '',
  });

  const moods = [
    { value: 'happy', label: 'Happy', icon: 'Smile', color: 'text-yellow-500' },
    { value: 'calm', label: 'Calm', icon: 'Cloud', color: 'text-blue-500' },
    { value: 'stressed', label: 'Stressed', icon: 'ZapOff', color: 'text-red-500' },
    { value: 'tired', label: 'Tired', icon: 'Moon', color: 'text-purple-500' },
    { value: 'anxious', label: 'Anxious', icon: 'AlertCircle', color: 'text-orange-500' }
  ];

  const energyLevels = [
    { value: 'low', label: 'Low', icon: 'Battery', color: 'text-red-500' },
    { value: 'moderate', label: 'Moderate', icon: 'BatteryMedium', color: 'text-yellow-500' },
    { value: 'high', label: 'High', icon: 'BatteryFull', color: 'text-green-500' }
  ];

  const copingStrategies = {
    stressed: ['Deep breathing exercises', 'Progressive muscle relaxation', '5-minute meditation'],
    tired: ['Power nap', 'Light stretching', 'Hydration break'],
    anxious: ['Grounding exercises', 'Mindful walking', 'Journaling'],
    happy: ['Gratitude practice', 'Share positivity', 'Creative activity'],
    calm: ['Meditation', 'Gentle yoga', 'Mindful observation']
  };

  const handleMoodSelect = (mood) => {
    setMoodData(prev => ({ ...prev, mood }));
    setCurrentStep(2);
  };

  const handleEnergySelect = (energy) => {
    setMoodData(prev => ({ ...prev, energyLevel: energy }));
    setCurrentStep(3);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Mood Check-in</h2>
        <p className="text-muted-foreground">Track and reflect on your emotional wellbeing</p>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">How are you feeling right now?</h3>
          <div className="grid grid-cols-2 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all text-center space-y-2"
              >
                <Icon name={mood.icon} className={`w-8 h-8 mx-auto ${mood.color}`} />
                <span className="block font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">Rate your energy level</h3>
          <div className="grid grid-cols-3 gap-4">
            {energyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleEnergySelect(level.value)}
                className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all text-center space-y-2"
              >
                <Icon name={level.icon} className={`w-8 h-8 mx-auto ${level.color}`} />
                <span className="block font-medium">{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">Suggested Coping Strategies</h3>
          <div className="space-y-3">
            {copingStrategies[moodData.mood].map((strategy, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-card border border-border flex items-center space-x-3"
              >
                <Icon name="CheckCircle" className="w-5 h-5 text-primary" />
                <span>{strategy}</span>
              </div>
            ))}
          </div>
          <Button onClick={() => setCurrentStep(1)} className="w-full mt-6">
            New Check-in
          </Button>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${
                currentStep === step ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodCheck;