import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    breakReminders: true,
    postureChecks: true,
    eyeStrainAlerts: true,
    bedtimeWarnings: true,
    focusSessionAlerts: true,
    achievementNotifications: true,
    reminderInterval: 25,
    notificationStyle: 'toast',
    soundEnabled: true,
    vibrationEnabled: false,
    strictMode: false,
    bedtimeStart: '22:00',
    bedtimeEnd: '06:00',
    weekendMode: false
  });

  const notificationStyles = [
    { value: 'toast', label: 'Toast Notification', description: 'Small popup in corner' },
    { value: 'overlay', label: 'Full Screen Overlay', description: 'Covers entire screen' },
    { value: 'gentle', label: 'Gentle Alert', description: 'Subtle visual cue' },
    { value: 'banner', label: 'Banner Alert', description: 'Top of screen banner' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('neurosync-notification-settings', JSON.stringify(settings));
    // Show success feedback
  };

  const handleResetSettings = () => {
    setSettings({
      breakReminders: true,
      postureChecks: true,
      eyeStrainAlerts: true,
      bedtimeWarnings: true,
      focusSessionAlerts: true,
      achievementNotifications: true,
      reminderInterval: 25,
      notificationStyle: 'toast',
      soundEnabled: true,
      vibrationEnabled: false,
      strictMode: false,
      bedtimeStart: '22:00',
      bedtimeEnd: '06:00',
      weekendMode: false
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Notification Settings</h2>
          <p className="text-sm font-caption text-muted-foreground mt-1">
            Configure how and when you receive wellness reminders
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
      {/* Notification Types */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <span>Notification Types</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Break Reminders"
            description="Regular break interval notifications"
            checked={settings?.breakReminders}
            onChange={(e) => handleSettingChange('breakReminders', e?.target?.checked)}
          />
          
          <Checkbox
            label="Posture Checks"
            description="Reminders to check and adjust posture"
            checked={settings?.postureChecks}
            onChange={(e) => handleSettingChange('postureChecks', e?.target?.checked)}
          />
          
          <Checkbox
            label="Eye Strain Alerts"
            description="Notifications for eye rest exercises"
            checked={settings?.eyeStrainAlerts}
            onChange={(e) => handleSettingChange('eyeStrainAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Bedtime Warnings"
            description="Late-night usage alerts"
            checked={settings?.bedtimeWarnings}
            onChange={(e) => handleSettingChange('bedtimeWarnings', e?.target?.checked)}
          />
          
          <Checkbox
            label="Focus Session Alerts"
            description="Pomodoro session start/end notifications"
            checked={settings?.focusSessionAlerts}
            onChange={(e) => handleSettingChange('focusSessionAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Achievement Notifications"
            description="Streak milestones and garden growth"
            checked={settings?.achievementNotifications}
            onChange={(e) => handleSettingChange('achievementNotifications', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Style */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Monitor" size={20} className="text-primary" />
          <span>Notification Style</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notificationStyles?.map((style) => (
            <label
              key={style?.value}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                settings?.notificationStyle === style?.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="notificationStyle"
                value={style?.value}
                checked={settings?.notificationStyle === style?.value}
                onChange={(e) => handleSettingChange('notificationStyle', e?.target?.value)}
                className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <div>
                <div className="font-body font-medium text-foreground">{style?.label}</div>
                <div className="text-sm font-caption text-muted-foreground">{style?.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Timing & Behavior */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <span>Timing & Behavior</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Break Reminder Interval"
            type="number"
            description="Minutes between break reminders"
            value={settings?.reminderInterval}
            onChange={(e) => handleSettingChange('reminderInterval', parseInt(e?.target?.value))}
            min="5"
            max="120"
            className="mb-4"
          />
          
          <div className="space-y-4">
            <Checkbox
              label="Strict Mode"
              description="Force full-screen breaks with screen dimming"
              checked={settings?.strictMode}
              onChange={(e) => handleSettingChange('strictMode', e?.target?.checked)}
            />
            
            <Checkbox
              label="Weekend Mode"
              description="Reduced notifications on weekends"
              checked={settings?.weekendMode}
              onChange={(e) => handleSettingChange('weekendMode', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Bedtime Schedule */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Moon" size={20} className="text-primary" />
          <span>Bedtime Schedule</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Bedtime Start"
            type="time"
            description="When bedtime warnings begin"
            value={settings?.bedtimeStart}
            onChange={(e) => handleSettingChange('bedtimeStart', e?.target?.value)}
          />
          
          <Input
            label="Bedtime End"
            type="time"
            description="When bedtime warnings end"
            value={settings?.bedtimeEnd}
            onChange={(e) => handleSettingChange('bedtimeEnd', e?.target?.value)}
          />
        </div>
      </div>
      {/* Sound & Vibration */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Volume2" size={20} className="text-primary" />
          <span>Sound & Vibration</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Sound Notifications"
            description="Play notification sounds"
            checked={settings?.soundEnabled}
            onChange={(e) => handleSettingChange('soundEnabled', e?.target?.checked)}
          />
          
          <Checkbox
            label="Vibration (Mobile)"
            description="Vibrate on mobile devices"
            checked={settings?.vibrationEnabled}
            onChange={(e) => handleSettingChange('vibrationEnabled', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;