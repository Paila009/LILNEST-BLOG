import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MoodLogger = ({ 
  type = 'pre', // 'pre' or 'post'
  onMoodSubmit,
  onSkip,
  className = "" 
}) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [selectedStress, setSelectedStress] = useState(null);
  const [note, setNote] = useState('');

  const moods = [
    { id: 'great', label: 'Great', icon: 'Smile', color: 'text-green-500', bgColor: 'bg-green-50' },
    { id: 'good', label: 'Good', icon: 'ThumbsUp', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 'okay', label: 'Okay', icon: 'Meh', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { id: 'tired', label: 'Tired', icon: 'Coffee', color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { id: 'stressed', label: 'Stressed', icon: 'Frown', color: 'text-red-500', bgColor: 'bg-red-50' }
  ];

  const energyLevels = [
    { id: 'high', label: 'High', icon: 'Zap' },
    { id: 'medium', label: 'Medium', icon: 'Battery' },
    { id: 'low', label: 'Low', icon: 'BatteryLow' }
  ];

  const stressLevels = [
    { id: 'low', label: 'Low', icon: 'Smile' },
    { id: 'medium', label: 'Medium', icon: 'Meh' },
    { id: 'high', label: 'High', icon: 'AlertTriangle' }
  ];

  const handleSubmit = () => {
    const moodData = {
      type,
      mood: selectedMood,
      energy: selectedEnergy,
      stress: selectedStress,
      note: note?.trim(),
      timestamp: new Date()?.toISOString()
    };
    
    onMoodSubmit(moodData);
  };

  const isComplete = selectedMood && selectedEnergy && selectedStress;

  return (
    <div className={`bg-card border border-border rounded-2xl p-6 space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-heading font-semibold text-foreground">
          {type === 'pre' ? 'How are you feeling?' : 'How do you feel now?'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {type === 'pre' ?'Let us know your current state before the break' :'Share how the break session helped you'
          }
        </p>
      </div>
      {/* Mood Selection */}
      <div className="space-y-3">
        <h4 className="font-body font-medium text-foreground">Overall Mood</h4>
        <div className="grid grid-cols-5 gap-2">
          {moods?.map((mood) => (
            <button
              key={mood?.id}
              onClick={() => setSelectedMood(mood?.id)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-center space-y-2 ${
                selectedMood === mood?.id
                  ? `${mood?.bgColor} border-current shadow-organic`
                  : 'bg-muted/20 border-border hover:border-muted-foreground/30'
              }`}
            >
              <Icon 
                name={mood?.icon} 
                size={24} 
                className={selectedMood === mood?.id ? mood?.color : 'text-muted-foreground'}
              />
              <div className={`text-xs font-caption ${
                selectedMood === mood?.id ? mood?.color : 'text-muted-foreground'
              }`}>
                {mood?.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Energy Level */}
      <div className="space-y-3">
        <h4 className="font-body font-medium text-foreground">Energy Level</h4>
        <div className="grid grid-cols-3 gap-3">
          {energyLevels?.map((energy) => (
            <button
              key={energy?.id}
              onClick={() => setSelectedEnergy(energy?.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                selectedEnergy === energy?.id
                  ? 'bg-primary/10 border-primary/30 shadow-organic'
                  : 'bg-muted/20 border-border hover:border-muted-foreground/30'
              }`}
            >
              <Icon 
                name={energy?.icon} 
                size={18} 
                className={selectedEnergy === energy?.id ? 'text-primary' : 'text-muted-foreground'}
              />
              <span className={`text-sm font-body ${
                selectedEnergy === energy?.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {energy?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Stress Level */}
      <div className="space-y-3">
        <h4 className="font-body font-medium text-foreground">Stress Level</h4>
        <div className="grid grid-cols-3 gap-3">
          {stressLevels?.map((stress) => (
            <button
              key={stress?.id}
              onClick={() => setSelectedStress(stress?.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                selectedStress === stress?.id
                  ? 'bg-secondary/10 border-secondary/30 shadow-organic'
                  : 'bg-muted/20 border-border hover:border-muted-foreground/30'
              }`}
            >
              <Icon 
                name={stress?.icon} 
                size={18} 
                className={selectedStress === stress?.id ? 'text-secondary' : 'text-muted-foreground'}
              />
              <span className={`text-sm font-body ${
                selectedStress === stress?.id ? 'text-secondary' : 'text-muted-foreground'
              }`}>
                {stress?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Optional Note */}
      <div className="space-y-3">
        <h4 className="font-body font-medium text-foreground">
          Quick Note <span className="text-muted-foreground font-normal">(optional)</span>
        </h4>
        <textarea
          value={note}
          onChange={(e) => setNote(e?.target?.value)}
          placeholder={type === 'pre' ? "What's on your mind right now?" :"How did this break help you?"
          }
          className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          rows={3}
          maxLength={200}
        />
        <div className="text-xs text-muted-foreground text-right">
          {note?.length}/200 characters
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="text-muted-foreground"
        >
          Skip for now
        </Button>
        
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={!isComplete}
          iconName="Check"
          iconPosition="left"
          className="floating-action"
        >
          {type === 'pre' ? 'Start Break' : 'Complete'}
        </Button>
      </div>
    </div>
  );
};

export default MoodLogger;