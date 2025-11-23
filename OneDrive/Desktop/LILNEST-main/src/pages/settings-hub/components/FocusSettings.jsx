import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FocusSettings = () => {
  const [settings, setSettings] = useState({
    pomodoroLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
    sessionsBeforeLongBreak: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    enableWebsiteBlocking: false,
    blockedWebsites: [
      'facebook.com',
      'twitter.com',
      'youtube.com',
      'instagram.com'
    ],
    strictMode: false,
    screenDimming: false,
    dimmingLevel: 50,
    focusMusic: false,
    selectedFocusSound: 'white-noise',
    tickingSound: false,
    endSessionSound: true,
    dailyFocusGoal: 120,
    weeklyFocusGoal: 600,
    adaptiveSessions: false,
    smartBreakSuggestions: true,
    productivityTracking: true,
    focusSessionAnalytics: true
  });

  const focusSounds = [
    { value: 'white-noise', label: 'White Noise', description: 'Consistent background sound' },
    { value: 'brown-noise', label: 'Brown Noise', description: 'Deeper, warmer noise' },
    { value: 'nature', label: 'Nature Sounds', description: 'Rain, forest, ocean' },
    { value: 'instrumental', label: 'Instrumental Music', description: 'Focus-enhancing melodies' },
    { value: 'binaural', label: 'Binaural Beats', description: 'Concentration frequencies' },
    { value: 'silence', label: 'Silence', description: 'No background audio' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleWebsiteAdd = (website) => {
    if (website && !settings?.blockedWebsites?.includes(website)) {
      setSettings(prev => ({
        ...prev,
        blockedWebsites: [...prev?.blockedWebsites, website]
      }));
    }
  };

  const handleWebsiteRemove = (website) => {
    setSettings(prev => ({
      ...prev,
      blockedWebsites: prev?.blockedWebsites?.filter(site => site !== website)
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('neurosync-focus-settings', JSON.stringify(settings));
    // Show success feedback
  };

  const handleResetSettings = () => {
    setSettings({
      pomodoroLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,
      sessionsBeforeLongBreak: 4,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      enableWebsiteBlocking: false,
      blockedWebsites: [
        'facebook.com',
        'twitter.com',
        'youtube.com',
        'instagram.com'
      ],
      strictMode: false,
      screenDimming: false,
      dimmingLevel: 50,
      focusMusic: false,
      selectedFocusSound: 'white-noise',
      tickingSound: false,
      endSessionSound: true,
      dailyFocusGoal: 120,
      weeklyFocusGoal: 600,
      adaptiveSessions: false,
      smartBreakSuggestions: true,
      productivityTracking: true,
      focusSessionAnalytics: true
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Focus Session Settings</h2>
          <p className="text-sm font-caption text-muted-foreground mt-1">
            Configure Pomodoro timers, productivity tools, and focus enhancement features
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleResetSettings} iconName="RotateCcw" iconPosition="left">
            Reset
          </Button>
          <Button variant="default" onClick={handleSaveSettings} iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
      {/* Pomodoro Timer Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Timer" size={20} className="text-primary" />
          <span>Pomodoro Timer Configuration</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Input
            label="Focus Session Length"
            type="number"
            description="Minutes per Pomodoro session"
            value={settings?.pomodoroLength}
            onChange={(e) => handleSettingChange('pomodoroLength', parseInt(e?.target?.value))}
            min="15"
            max="60"
          />
          
          <Input
            label="Short Break Length"
            type="number"
            description="Minutes for short breaks"
            value={settings?.shortBreakLength}
            onChange={(e) => handleSettingChange('shortBreakLength', parseInt(e?.target?.value))}
            min="3"
            max="15"
          />
          
          <Input
            label="Long Break Length"
            type="number"
            description="Minutes for long breaks"
            value={settings?.longBreakLength}
            onChange={(e) => handleSettingChange('longBreakLength', parseInt(e?.target?.value))}
            min="10"
            max="30"
          />
          
          <Input
            label="Sessions Before Long Break"
            type="number"
            description="Pomodoros before long break"
            value={settings?.sessionsBeforeLongBreak}
            onChange={(e) => handleSettingChange('sessionsBeforeLongBreak', parseInt(e?.target?.value))}
            min="2"
            max="8"
          />
        </div>
      </div>
      {/* Session Behavior */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Play" size={20} className="text-primary" />
          <span>Session Behavior</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Auto-Start Breaks"
              description="Automatically begin break sessions"
              checked={settings?.autoStartBreaks}
              onChange={(e) => handleSettingChange('autoStartBreaks', e?.target?.checked)}
            />
            
            <Checkbox
              label="Auto-Start Pomodoros"
              description="Automatically start next focus session"
              checked={settings?.autoStartPomodoros}
              onChange={(e) => handleSettingChange('autoStartPomodoros', e?.target?.checked)}
            />
            
            <Checkbox
              label="Adaptive Sessions"
              description="ML-based session length optimization"
              checked={settings?.adaptiveSessions}
              onChange={(e) => handleSettingChange('adaptiveSessions', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Smart Break Suggestions"
              description="AI-powered break activity recommendations"
              checked={settings?.smartBreakSuggestions}
              onChange={(e) => handleSettingChange('smartBreakSuggestions', e?.target?.checked)}
            />
            
            <Checkbox
              label="Productivity Tracking"
              description="Track focus session effectiveness"
              checked={settings?.productivityTracking}
              onChange={(e) => handleSettingChange('productivityTracking', e?.target?.checked)}
            />
            
            <Checkbox
              label="Focus Session Analytics"
              description="Detailed productivity insights"
              checked={settings?.focusSessionAnalytics}
              onChange={(e) => handleSettingChange('focusSessionAnalytics', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Website Blocking */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span>Website Blocking</span>
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Website Blocking"
            description="Block distracting websites during focus sessions"
            checked={settings?.enableWebsiteBlocking}
            onChange={(e) => handleSettingChange('enableWebsiteBlocking', e?.target?.checked)}
          />
          
          {settings?.enableWebsiteBlocking && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Blocked Websites
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {settings?.blockedWebsites?.map((website, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-lg"
                    >
                      <span className="text-sm font-caption text-foreground">{website}</span>
                      <button
                        onClick={() => handleWebsiteRemove(website)}
                        className="text-muted-foreground hover:text-destructive transition-colors duration-200"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter website URL (e.g., example.com)"
                    onKeyPress={(e) => {
                      if (e?.key === 'Enter') {
                        handleWebsiteAdd(e?.target?.value);
                        e.target.value = '';
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder*="website URL"]');
                      handleWebsiteAdd(input?.value);
                      input.value = '';
                    }}
                    iconName="Plus"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Strict Mode & Screen Effects */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Lock" size={20} className="text-primary" />
          <span>Strict Mode & Screen Effects</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Strict Mode"
              description="Prevent session interruption and app switching"
              checked={settings?.strictMode}
              onChange={(e) => handleSettingChange('strictMode', e?.target?.checked)}
            />
            
            <Checkbox
              label="Screen Dimming"
              description="Dim screen during focus sessions"
              checked={settings?.screenDimming}
              onChange={(e) => handleSettingChange('screenDimming', e?.target?.checked)}
            />
          </div>
          
          {settings?.screenDimming && (
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Dimming Level: {settings?.dimmingLevel}%
              </label>
              <input
                type="range"
                min="10"
                max="80"
                value={settings?.dimmingLevel}
                onChange={(e) => handleSettingChange('dimmingLevel', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      {/* Focus Audio */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Headphones" size={20} className="text-primary" />
          <span>Focus Audio Settings</span>
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              label="Focus Music"
              description="Play background audio during sessions"
              checked={settings?.focusMusic}
              onChange={(e) => handleSettingChange('focusMusic', e?.target?.checked)}
            />
            
            <Checkbox
              label="Ticking Sound"
              description="Audible timer ticking"
              checked={settings?.tickingSound}
              onChange={(e) => handleSettingChange('tickingSound', e?.target?.checked)}
            />
            
            <Checkbox
              label="End Session Sound"
              description="Audio notification when session ends"
              checked={settings?.endSessionSound}
              onChange={(e) => handleSettingChange('endSessionSound', e?.target?.checked)}
            />
          </div>
          
          {settings?.focusMusic && (
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-3">
                Focus Sound Selection
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {focusSounds?.map((sound) => (
                  <label
                    key={sound?.value}
                    className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      settings?.selectedFocusSound === sound?.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="focusSound"
                      value={sound?.value}
                      checked={settings?.selectedFocusSound === sound?.value}
                      onChange={(e) => handleSettingChange('selectedFocusSound', e?.target?.value)}
                      className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div>
                      <div className="font-body font-medium text-foreground text-sm">{sound?.label}</div>
                      <div className="text-xs font-caption text-muted-foreground">{sound?.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Focus Goals */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Target" size={20} className="text-primary" />
          <span>Focus Goals</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Daily Focus Goal"
            type="number"
            description="Minutes of focused work per day"
            value={settings?.dailyFocusGoal}
            onChange={(e) => handleSettingChange('dailyFocusGoal', parseInt(e?.target?.value))}
            min="30"
            max="480"
          />
          
          <Input
            label="Weekly Focus Goal"
            type="number"
            description="Minutes of focused work per week"
            value={settings?.weeklyFocusGoal}
            onChange={(e) => handleSettingChange('weeklyFocusGoal', parseInt(e?.target?.value))}
            min="210"
            max="2400"
          />
        </div>
      </div>
    </div>
  );
};

export default FocusSettings;