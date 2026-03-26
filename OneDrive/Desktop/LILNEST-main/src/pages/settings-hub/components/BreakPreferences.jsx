import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BreakPreferences = () => {
  const [preferences, setPreferences] = useState({
    shortBreakDuration: 5,
    longBreakDuration: 15,
    microBreakDuration: 30,
    enabledBreakTypes: {
      stretching: true,
      breathing: true,
      eyeRest: true,
      walking: true,
      meditation: true,
      hydration: false
    },
    autoStartBreaks: false,
    skipBreakOption: true,
    breakReminders: {
      fiveMinuteBefore: true,
      oneMinuteBefore: false,
      atBreakTime: true
    },
    customBreakMessages: true,
    gratitudePrompts: true,
    affirmations: true,
    ambientSounds: false,
    selectedAmbientSound: 'nature',
    breakIntensity: 'moderate'
  });

  const breakTypes = [
    { key: 'stretching', label: 'Stretching Exercises', icon: 'Move', description: 'Guided body stretches' },
    { key: 'breathing', label: 'Breathing Exercises', icon: 'Wind', description: 'Mindful breathing patterns' },
    { key: 'eyeRest', label: 'Eye Rest', icon: 'Eye', description: 'Eye strain relief exercises' },
    { key: 'walking', label: 'Walking Breaks', icon: 'Footprints', description: 'Short walking reminders' },
    { key: 'meditation', label: 'Micro-Meditation', icon: 'Brain', description: '30s to 3min sessions' },
    { key: 'hydration', label: 'Hydration Reminders', icon: 'Droplets', description: 'Water intake prompts' }
  ];

  const ambientSounds = [
    { value: 'nature', label: 'Nature Sounds', description: 'Forest, rain, ocean' },
    { value: 'white-noise', label: 'White Noise', description: 'Consistent background sound' },
    { value: 'bells', label: 'Meditation Bells', description: 'Gentle chimes and bells' },
    { value: 'silence', label: 'Silence', description: 'No background sounds' }
  ];

  const intensityLevels = [
    { value: 'gentle', label: 'Gentle', description: 'Minimal interruption' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced approach' },
    { value: 'intensive', label: 'Intensive', description: 'Strong wellness focus' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleBreakTypeToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      enabledBreakTypes: {
        ...prev?.enabledBreakTypes,
        [type]: !prev?.enabledBreakTypes?.[type]
      }
    }));
  };

  const handleReminderToggle = (reminder) => {
    setPreferences(prev => ({
      ...prev,
      breakReminders: {
        ...prev?.breakReminders,
        [reminder]: !prev?.breakReminders?.[reminder]
      }
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('neurosync-break-preferences', JSON.stringify(preferences));
    // Show success feedback
  };

  const handleResetPreferences = () => {
    setPreferences({
      shortBreakDuration: 5,
      longBreakDuration: 15,
      microBreakDuration: 30,
      enabledBreakTypes: {
        stretching: true,
        breathing: true,
        eyeRest: true,
        walking: true,
        meditation: true,
        hydration: false
      },
      autoStartBreaks: false,
      skipBreakOption: true,
      breakReminders: {
        fiveMinuteBefore: true,
        oneMinuteBefore: false,
        atBreakTime: true
      },
      customBreakMessages: true,
      gratitudePrompts: true,
      affirmations: true,
      ambientSounds: false,
      selectedAmbientSound: 'nature',
      breakIntensity: 'moderate'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Break Preferences</h2>
          <p className="text-sm font-caption text-muted-foreground mt-1">
            Customize your break types, timing, and wellness activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleResetPreferences} iconName="RotateCcw" iconPosition="left">
            Reset
          </Button>
          <Button variant="default" onClick={handleSavePreferences} iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
      {/* Break Duration Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <span>Break Duration</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Micro-Break"
            type="number"
            description="Quick wellness checks (seconds)"
            value={preferences?.microBreakDuration}
            onChange={(e) => handlePreferenceChange('microBreakDuration', parseInt(e?.target?.value))}
            min="15"
            max="120"
          />
          
          <Input
            label="Short Break"
            type="number"
            description="Regular break sessions (minutes)"
            value={preferences?.shortBreakDuration}
            onChange={(e) => handlePreferenceChange('shortBreakDuration', parseInt(e?.target?.value))}
            min="3"
            max="15"
          />
          
          <Input
            label="Long Break"
            type="number"
            description="Extended wellness breaks (minutes)"
            value={preferences?.longBreakDuration}
            onChange={(e) => handlePreferenceChange('longBreakDuration', parseInt(e?.target?.value))}
            min="10"
            max="30"
          />
        </div>
      </div>
      {/* Break Types */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <span>Enabled Break Types</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakTypes?.map((type) => (
            <div
              key={type?.key}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                preferences?.enabledBreakTypes?.[type?.key]
                  ? 'border-primary bg-primary/5' :'border-border'
              }`}
            >
              <Checkbox
                checked={preferences?.enabledBreakTypes?.[type?.key]}
                onChange={() => handleBreakTypeToggle(type?.key)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={type?.icon} size={16} className="text-primary" />
                  <span className="font-body font-medium text-foreground">{type?.label}</span>
                </div>
                <p className="text-sm font-caption text-muted-foreground">{type?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Break Behavior */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Settings2" size={20} className="text-primary" />
          <span>Break Behavior</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Auto-Start Breaks"
              description="Automatically begin break activities"
              checked={preferences?.autoStartBreaks}
              onChange={(e) => handlePreferenceChange('autoStartBreaks', e?.target?.checked)}
            />
            
            <Checkbox
              label="Skip Break Option"
              description="Allow users to skip breaks when needed"
              checked={preferences?.skipBreakOption}
              onChange={(e) => handlePreferenceChange('skipBreakOption', e?.target?.checked)}
            />
            
            <Checkbox
              label="Custom Break Messages"
              description="Personalized break activity suggestions"
              checked={preferences?.customBreakMessages}
              onChange={(e) => handlePreferenceChange('customBreakMessages', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Gratitude Prompts"
              description="Include gratitude exercises in breaks"
              checked={preferences?.gratitudePrompts}
              onChange={(e) => handlePreferenceChange('gratitudePrompts', e?.target?.checked)}
            />
            
            <Checkbox
              label="Affirmations"
              description="Show positive affirmations during breaks"
              checked={preferences?.affirmations}
              onChange={(e) => handlePreferenceChange('affirmations', e?.target?.checked)}
            />
            
            <Checkbox
              label="Ambient Sounds"
              description="Play background sounds during breaks"
              checked={preferences?.ambientSounds}
              onChange={(e) => handlePreferenceChange('ambientSounds', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Break Reminders */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <span>Break Reminders</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Checkbox
            label="5 Minutes Before"
            description="Prepare for upcoming break"
            checked={preferences?.breakReminders?.fiveMinuteBefore}
            onChange={() => handleReminderToggle('fiveMinuteBefore')}
          />
          
          <Checkbox
            label="1 Minute Before"
            description="Final break preparation"
            checked={preferences?.breakReminders?.oneMinuteBefore}
            onChange={() => handleReminderToggle('oneMinuteBefore')}
          />
          
          <Checkbox
            label="At Break Time"
            description="Break time notification"
            checked={preferences?.breakReminders?.atBreakTime}
            onChange={() => handleReminderToggle('atBreakTime')}
          />
        </div>
      </div>
      {/* Ambient Sounds */}
      {preferences?.ambientSounds && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Volume2" size={20} className="text-primary" />
            <span>Ambient Sound Selection</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ambientSounds?.map((sound) => (
              <label
                key={sound?.value}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  preferences?.selectedAmbientSound === sound?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="ambientSound"
                  value={sound?.value}
                  checked={preferences?.selectedAmbientSound === sound?.value}
                  onChange={(e) => handlePreferenceChange('selectedAmbientSound', e?.target?.value)}
                  className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div>
                  <div className="font-body font-medium text-foreground">{sound?.label}</div>
                  <div className="text-sm font-caption text-muted-foreground">{sound?.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
      {/* Break Intensity */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <span>Break Intensity Level</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {intensityLevels?.map((level) => (
            <label
              key={level?.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                preferences?.breakIntensity === level?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="breakIntensity"
                value={level?.value}
                checked={preferences?.breakIntensity === level?.value}
                onChange={(e) => handlePreferenceChange('breakIntensity', e?.target?.value)}
                className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <div>
                <div className="font-body font-medium text-foreground">{level?.label}</div>
                <div className="text-sm font-caption text-muted-foreground">{level?.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakPreferences;