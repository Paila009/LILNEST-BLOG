import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SnackBreak = () => {
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [selectedType, setSelectedType] = useState('snack');

  const breakTypes = [
    { id: 'snack', icon: 'Apple', label: 'Quick Snack', duration: 5 },
    { id: 'meal', icon: 'Utensils', label: 'Meal Break', duration: 15 },
    { id: 'hydrate', icon: 'Coffee', label: 'Hydration', duration: 3 }
  ];

  const wellnessReminders = {
    snack: [
      "Choose nutritious options",
      "Practice mindful eating",
      "Stay hydrated",
      "Take small bites",
      "Avoid working while eating"
    ],
    meal: [
      "Find a proper eating space",
      "Take time to enjoy your meal",
      "Practice good posture",
      "Chew thoroughly",
      "Stay away from screens"
    ],
    hydrate: [
      "Drink water regularly",
      "Consider herbal tea",
      "Avoid excessive caffeine",
      "Listen to your body",
      "Track your intake"
    ]
  };

  const startBreak = () => {
    setIsBreakStarted(true);
    setTimeLeft(selectedDuration * 60);
    // Start timer logic here
  };

  const resetBreak = () => {
    setIsBreakStarted(false);
    setTimeLeft(selectedDuration * 60);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Nourishment Break</h2>
        <p className="text-muted-foreground">
          Take time to nourish your body and mind
        </p>
      </div>

      {!isBreakStarted && (
        <div className="space-y-4 mb-8">
          {breakTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setSelectedDuration(type.duration);
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedType === type.id
                  ? 'bg-foreground/10 ring-2 ring-primary'
                  : 'bg-foreground/5 hover:bg-foreground/7'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-foreground/10 rounded-lg">
                  <Icon name={type.icon} className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.duration} minutes
                  </p>
                </div>
                <Icon
                  name={selectedType === type.id ? 'CheckCircle' : 'Circle'}
                  className={`w-5 h-5 ${
                    selectedType === type.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isBreakStarted && (
        <div className="bg-foreground/5 rounded-lg p-4 mb-8">
          <h3 className="font-semibold mb-3">Wellness Reminders</h3>
          <ul className="space-y-2">
            {wellnessReminders[selectedType].map((reminder, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" className="w-4 h-4 mt-1 text-green-500" />
                <span className="text-sm">{reminder}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        {!isBreakStarted ? (
          <Button onClick={startBreak} className="bg-green-500 hover:bg-green-600">
            <Icon name="Play" className="w-4 h-4 mr-2" />
            Start {breakTypes.find(t => t.id === selectedType).label}
          </Button>
        ) : (
          <>
            <Button onClick={resetBreak} variant="outline">
              <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">
              <Icon name="Pause" className="w-4 h-4 mr-2" />
              Pause Break
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SnackBreak;