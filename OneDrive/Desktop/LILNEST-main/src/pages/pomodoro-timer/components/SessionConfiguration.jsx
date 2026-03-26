import React from 'react';
import Icon from '../../../components/AppIcon';

const SessionConfiguration = ({ 
  settings, 
  onSettingsChange, 
  isActive 
}) => {
  const configOptions = [
    {
      key: 'focusDuration',
      label: 'Focus Duration',
      icon: 'Timer',
      min: 15,
      max: 60,
      step: 5,
      unit: 'min',
      color: 'text-primary'
    },
    {
      key: 'shortBreakDuration',
      label: 'Short Break',
      icon: 'Coffee',
      min: 3,
      max: 15,
      step: 1,
      unit: 'min',
      color: 'text-secondary'
    },
    {
      key: 'longBreakDuration',
      label: 'Long Break',
      icon: 'Flower2',
      min: 15,
      max: 45,
      step: 5,
      unit: 'min',
      color: 'text-accent'
    },
    {
      key: 'sessionsUntilLongBreak',
      label: 'Sessions Until Long Break',
      icon: 'Target',
      min: 2,
      max: 8,
      step: 1,
      unit: 'sessions',
      color: 'text-foreground'
    }
  ];

  const handleSliderChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Session Settings
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {configOptions?.map((option) => (
          <div key={option?.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={option?.icon} 
                  size={16} 
                  className={option?.color}
                />
                <label className="text-sm font-body font-medium text-foreground">
                  {option?.label}
                </label>
              </div>
              <span className="text-sm font-mono text-muted-foreground">
                {settings?.[option?.key]} {option?.unit}
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min={option?.min}
                max={option?.max}
                step={option?.step}
                value={settings?.[option?.key]}
                onChange={(e) => handleSliderChange(option?.key, parseInt(e?.target?.value))}
                disabled={isActive}
                className={`w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider ${
                  isActive ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{
                  background: `linear-gradient(to right, 
                    var(--color-primary) 0%, 
                    var(--color-primary) ${((settings?.[option?.key] - option?.min) / (option?.max - option?.min)) * 100}%, 
                    var(--color-muted) ${((settings?.[option?.key] - option?.min) / (option?.max - option?.min)) * 100}%, 
                    var(--color-muted) 100%)`
                }}
              />
              
              {/* Range Labels */}
              <div className="flex justify-between text-xs font-caption text-muted-foreground mt-1">
                <span>{option?.min}{option?.unit}</span>
                <span>{option?.max}{option?.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Preset Configurations */}
      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-caption text-muted-foreground mb-3">
          Quick Presets
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'Classic', focus: 25, shortBreak: 5, longBreak: 30, sessions: 4 },
            { name: 'Extended', focus: 45, shortBreak: 10, longBreak: 30, sessions: 3 },
            { name: 'Sprint', focus: 15, shortBreak: 3, longBreak: 15, sessions: 6 }
          ]?.map((preset) => (
            <button
              key={preset?.name}
              onClick={() => onSettingsChange({
                focusDuration: preset?.focus,
                shortBreakDuration: preset?.shortBreak,
                longBreakDuration: preset?.longBreak,
                sessionsUntilLongBreak: preset?.sessions
              })}
              disabled={isActive}
              className={`p-3 bg-muted/20 rounded-lg text-left hover:bg-muted/40 transition-colors duration-200 ${
                isActive ? 'opacity-50 cursor-not-allowed' : 'organic-hover'
              }`}
            >
              <div className="font-body font-medium text-foreground text-sm">
                {preset?.name}
              </div>
              <div className="text-xs font-caption text-muted-foreground mt-1">
                {preset?.focus}m focus • {preset?.shortBreak}m break
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionConfiguration;