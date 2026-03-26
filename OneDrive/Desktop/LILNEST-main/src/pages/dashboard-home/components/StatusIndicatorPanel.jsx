import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusIndicatorPanel = () => {
  const navigate = useNavigate();
  const [reminderSettings, setReminderSettings] = useState({
    breakReminders: true,
    interval: 25,
    notificationType: 'gentle',
    soundEnabled: true,
    strictMode: false
  });

  const [systemStatus, setSystemStatus] = useState({
    isOnline: true,
    lastSync: new Date(),
    dataStorage: 'local',
    privacyMode: true
  });

  const notificationTypes = [
    { value: 'gentle', label: 'Gentle', icon: 'Bell', description: 'Soft notifications' },
    { value: 'standard', label: 'Standard', icon: 'AlertCircle', description: 'Regular alerts' },
    { value: 'strict', label: 'Strict', icon: 'AlertTriangle', description: 'Full-screen breaks' }
  ];

  const intervalOptions = [15, 20, 25, 30, 45, 60];

  const handleIntervalChange = (newInterval) => {
    setReminderSettings(prev => ({ ...prev, interval: newInterval }));
  };

  const handleNotificationTypeChange = (type) => {
    setReminderSettings(prev => ({ ...prev, notificationType: type }));
  };

  const toggleReminders = () => {
    setReminderSettings(prev => ({ ...prev, breakReminders: !prev?.breakReminders }));
  };

  const toggleSound = () => {
    setReminderSettings(prev => ({ ...prev, soundEnabled: !prev?.soundEnabled }));
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'text-success' : 'text-muted-foreground';
  };

  const getStatusBg = (isActive) => {
    return isActive ? 'bg-success/10' : 'bg-muted/20';
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Status & Settings
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${systemStatus?.isOnline ? 'bg-success animate-gentle-pulse' : 'bg-error'}`}></div>
          <span className="text-sm font-caption text-muted-foreground">
            {systemStatus?.isOnline ? 'Active' : 'Offline'}
          </span>
        </div>
      </div>
      {/* Break Reminder Status */}
      <div className={`p-4 rounded-xl border border-border/50 ${getStatusBg(reminderSettings?.breakReminders)}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon 
              name="Bell" 
              size={20} 
              className={getStatusColor(reminderSettings?.breakReminders)}
            />
            <div>
              <h3 className="font-heading font-medium text-foreground">Break Reminders</h3>
              <p className="text-sm text-muted-foreground">
                {reminderSettings?.breakReminders 
                  ? `Every ${reminderSettings?.interval} minutes • ${reminderSettings?.notificationType} mode`
                  : 'Currently disabled'
                }
              </p>
            </div>
          </div>
          <button
            onClick={toggleReminders}
            className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
              reminderSettings?.breakReminders ? 'bg-success' : 'bg-muted'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 absolute top-0.5 ${
              reminderSettings?.breakReminders ? 'translate-x-6' : 'translate-x-0.5'
            }`}></div>
          </button>
        </div>

        {reminderSettings?.breakReminders && (
          <div className="space-y-4">
            {/* Interval Selection */}
            <div>
              <label className="text-sm font-caption text-muted-foreground mb-2 block">
                Reminder Interval
              </label>
              <div className="flex flex-wrap gap-2">
                {intervalOptions?.map((interval) => (
                  <button
                    key={interval}
                    onClick={() => handleIntervalChange(interval)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors duration-200 ${
                      reminderSettings?.interval === interval
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {interval}m
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Type */}
            <div>
              <label className="text-sm font-caption text-muted-foreground mb-2 block">
                Notification Style
              </label>
              <div className="space-y-2">
                {notificationTypes?.map((type) => (
                  <button
                    key={type?.value}
                    onClick={() => handleNotificationTypeChange(type?.value)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                      reminderSettings?.notificationType === type?.value
                        ? 'bg-primary/10 border border-primary/20' :'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <Icon 
                      name={type?.icon} 
                      size={16} 
                      className={reminderSettings?.notificationType === type?.value ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <div>
                      <div className="text-sm font-body text-foreground">{type?.label}</div>
                      <div className="text-xs text-muted-foreground">{type?.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Volume2" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-body text-foreground">Sound Notifications</div>
                  <div className="text-xs text-muted-foreground">Play gentle chimes</div>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                  reminderSettings?.soundEnabled ? 'bg-success' : 'bg-muted'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 absolute top-0.5 ${
                  reminderSettings?.soundEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* System Status */}
      <div className="space-y-3">
        <h3 className="font-heading font-medium text-foreground flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-muted-foreground" />
          <span>Privacy & System</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="Database" size={16} className="text-success" />
            <div>
              <div className="text-sm font-body text-foreground">Local Storage</div>
              <div className="text-xs text-muted-foreground">Data stays on device</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="Lock" size={16} className="text-success" />
            <div>
              <div className="text-sm font-body text-foreground">Privacy Mode</div>
              <div className="text-xs text-muted-foreground">No tracking enabled</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          onClick={() => navigate('/settings-hub')}
        >
          All Settings
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default StatusIndicatorPanel;