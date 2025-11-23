import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedSettings = () => {
  const [settings, setSettings] = useState({
    mlAdaptiveSuggestions: false,
    learningMode: 'balanced',
    dataCollectionLevel: 'minimal',
    wearableIntegration: false,
    connectedDevices: [],
    pluginSystem: true,
    enabledPlugins: ['breathing-exercises', 'nature-sounds'],
    developerMode: false,
    debugLogging: false,
    experimentalFeatures: false,
    betaUpdates: false,
    performanceMode: 'balanced',
    memoryOptimization: true,
    backgroundProcessing: true,
    systemIntegration: false,
    notificationPriority: 'normal',
    resourceUsage: 'moderate',
    cacheSize: 50,
    preloadContent: true,
    offlineMode: true,
    syncSettings: false,
    cloudBackup: false,
    multiDeviceSync: false,
    crossPlatformData: false,
    apiIntegrations: false,
    webhookSupport: false,
    customScripts: false,
    automationRules: false
  });

  const [systemInfo, setSystemInfo] = useState({
    version: '1.0.0',
    buildDate: '2025-01-13',
    platform: 'Web',
    browser: 'Chrome 120.0',
    storage: '2.4 MB / 10 MB',
    performance: 'Good',
    lastUpdate: '2025-01-10'
  });

  const learningModes = [
    { value: 'minimal', label: 'Minimal Learning', description: 'Basic pattern recognition' },
    { value: 'balanced', label: 'Balanced Learning', description: 'Moderate adaptation to your habits' },
    { value: 'aggressive', label: 'Aggressive Learning', description: 'Maximum personalization' }
  ];

  const dataCollectionLevels = [
    { value: 'none', label: 'None', description: 'No data collection for ML' },
    { value: 'minimal', label: 'Minimal', description: 'Basic usage patterns only' },
    { value: 'standard', label: 'Standard', description: 'Detailed behavior analysis' },
    { value: 'comprehensive', label: 'Comprehensive', description: 'Full feature optimization' }
  ];

  const performanceModes = [
    { value: 'eco', label: 'Eco Mode', description: 'Minimal resource usage' },
    { value: 'balanced', label: 'Balanced', description: 'Optimal performance/efficiency' },
    { value: 'performance', label: 'Performance', description: 'Maximum responsiveness' }
  ];

  const availablePlugins = [
    { id: 'breathing-exercises', name: 'Advanced Breathing Exercises', description: 'Extended breathing patterns and techniques', enabled: true },
    { id: 'nature-sounds', name: 'Nature Sound Library', description: 'Expanded ambient sound collection', enabled: true },
    { id: 'meditation-guides', name: 'Guided Meditations', description: 'Voice-guided meditation sessions', enabled: false },
    { id: 'posture-tracker', name: 'Posture Tracking', description: 'AI-powered posture monitoring', enabled: false },
    { id: 'eye-exercises', name: 'Eye Exercise Library', description: 'Comprehensive eye strain relief', enabled: false },
    { id: 'productivity-metrics', name: 'Advanced Analytics', description: 'Detailed productivity insights', enabled: false },
    { id: 'habit-tracker', name: 'Habit Tracking', description: 'Wellness habit formation tools', enabled: false },
    { id: 'mood-journal', name: 'Mood Journaling', description: 'Emotional wellness tracking', enabled: false }
  ];

  const connectedDevices = [
    { id: 'fitbit-sense', name: 'Fitbit Sense', type: 'Fitness Tracker', status: 'Connected', lastSync: '2 hours ago' },
    { id: 'apple-watch', name: 'Apple Watch Series 9', type: 'Smartwatch', status: 'Disconnected', lastSync: 'Never' },
    { id: 'garmin-vivosmart', name: 'Garmin Vivosmart 5', type: 'Activity Tracker', status: 'Pairing', lastSync: 'Syncing...' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePluginToggle = (pluginId) => {
    setSettings(prev => ({
      ...prev,
      enabledPlugins: prev?.enabledPlugins?.includes(pluginId)
        ? prev?.enabledPlugins?.filter(id => id !== pluginId)
        : [...prev?.enabledPlugins, pluginId]
    }));
  };

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear the application cache? This may slow down the next app load.')) {
      // Clear cache logic
      if ('caches' in window) {
        caches.keys()?.then(names => {
          names?.forEach(name => {
            caches.delete(name);
          });
        });
      }
      alert('Cache cleared successfully!');
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all advanced settings to default values?')) {
      setSettings({
        mlAdaptiveSuggestions: false,
        learningMode: 'balanced',
        dataCollectionLevel: 'minimal',
        wearableIntegration: false,
        connectedDevices: [],
        pluginSystem: true,
        enabledPlugins: ['breathing-exercises', 'nature-sounds'],
        developerMode: false,
        debugLogging: false,
        experimentalFeatures: false,
        betaUpdates: false,
        performanceMode: 'balanced',
        memoryOptimization: true,
        backgroundProcessing: true,
        systemIntegration: false,
        notificationPriority: 'normal',
        resourceUsage: 'moderate',
        cacheSize: 50,
        preloadContent: true,
        offlineMode: true,
        syncSettings: false,
        cloudBackup: false,
        multiDeviceSync: false,
        crossPlatformData: false,
        apiIntegrations: false,
        webhookSupport: false,
        customScripts: false,
        automationRules: false
      });
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('neurosync-advanced-settings', JSON.stringify(settings));
    // Apply advanced settings
    applyAdvancedSettings();
  };

  const applyAdvancedSettings = () => {
    // Apply performance optimizations
    if (settings?.performanceMode === 'eco') {
      // Reduce animations, limit background processes
    } else if (settings?.performanceMode === 'performance') {
      // Enable all optimizations, preload content
    }
    
    // Apply memory optimization
    if (settings?.memoryOptimization) {
      // Implement memory cleanup routines
    }
  };

  const handleExportSettings = () => {
    const allSettings = {
      advanced: settings,
      notifications: JSON.parse(localStorage.getItem('neurosync-notification-settings') || '{}'),
      breaks: JSON.parse(localStorage.getItem('neurosync-break-preferences') || '{}'),
      focus: JSON.parse(localStorage.getItem('neurosync-focus-settings') || '{}'),
      theme: JSON.parse(localStorage.getItem('neurosync-theme-settings') || '{}'),
      accessibility: JSON.parse(localStorage.getItem('neurosync-accessibility-settings') || '{}'),
      privacy: JSON.parse(localStorage.getItem('neurosync-privacy-settings') || '{}'),
      exportDate: new Date()?.toISOString()
    };

    const blob = new Blob([JSON.stringify(allSettings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurosync-settings-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Advanced Settings</h2>
          <p className="text-sm font-caption text-muted-foreground mt-1">
            Configure ML features, integrations, performance, and developer options
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleResetToDefaults} iconName="RotateCcw" iconPosition="left">
            Reset
          </Button>
          <Button variant="default" onClick={handleSaveSettings} iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
      {/* System Information */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Info" size={20} className="text-primary" />
          <span>System Information</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-foreground">{systemInfo?.version}</div>
            <div className="text-xs font-caption text-muted-foreground">Version</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-foreground">{systemInfo?.platform}</div>
            <div className="text-xs font-caption text-muted-foreground">Platform</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-foreground">{systemInfo?.storage}</div>
            <div className="text-xs font-caption text-muted-foreground">Storage</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-heading font-semibold text-success">{systemInfo?.performance}</div>
            <div className="text-xs font-caption text-muted-foreground">Performance</div>
          </div>
        </div>
      </div>
      {/* Machine Learning Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <span>Machine Learning & Adaptive Features</span>
        </h3>
        
        <div className="space-y-6">
          <Checkbox
            label="ML-Based Adaptive Suggestions"
            description="Enable machine learning for personalized break and focus recommendations"
            checked={settings?.mlAdaptiveSuggestions}
            onChange={(e) => handleSettingChange('mlAdaptiveSuggestions', e?.target?.checked)}
          />
          
          {settings?.mlAdaptiveSuggestions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Learning Mode
                </label>
                <select
                  value={settings?.learningMode}
                  onChange={(e) => handleSettingChange('learningMode', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {learningModes?.map((mode) => (
                    <option key={mode?.value} value={mode?.value}>
                      {mode?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Data Collection Level
                </label>
                <select
                  value={settings?.dataCollectionLevel}
                  onChange={(e) => handleSettingChange('dataCollectionLevel', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {dataCollectionLevels?.map((level) => (
                    <option key={level?.value} value={level?.value}>
                      {level?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Wearable Integration */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Watch" size={20} className="text-primary" />
          <span>Wearable Device Integration</span>
        </h3>
        
        <div className="space-y-6">
          <Checkbox
            label="Enable Wearable Integration"
            description="Connect with fitness trackers and smartwatches for health data"
            checked={settings?.wearableIntegration}
            onChange={(e) => handleSettingChange('wearableIntegration', e?.target?.checked)}
          />
          
          {settings?.wearableIntegration && (
            <div className="space-y-4">
              <h4 className="font-body font-medium text-foreground">Connected Devices</h4>
              <div className="space-y-3">
                {connectedDevices?.map((device) => (
                  <div
                    key={device?.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Watch" size={20} className="text-primary" />
                      <div>
                        <div className="font-body font-medium text-foreground">{device?.name}</div>
                        <div className="text-sm font-caption text-muted-foreground">{device?.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className={`text-sm font-caption ${
                          device?.status === 'Connected' ? 'text-success' : 
                          device?.status === 'Pairing' ? 'text-warning' : 'text-muted-foreground'
                        }`}>
                          {device?.status}
                        </div>
                        <div className="text-xs font-caption text-muted-foreground">{device?.lastSync}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName={device?.status === 'Connected' ? 'Unlink' : 'Link'}
                      >
                        {device?.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                iconName="Plus"
                iconPosition="left"
                className="w-full"
              >
                Add New Device
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Plugin System */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Puzzle" size={20} className="text-primary" />
          <span>Plugin System</span>
        </h3>
        
        <div className="space-y-6">
          <Checkbox
            label="Enable Plugin System"
            description="Allow community-contributed content and extensions"
            checked={settings?.pluginSystem}
            onChange={(e) => handleSettingChange('pluginSystem', e?.target?.checked)}
          />
          
          {settings?.pluginSystem && (
            <div className="space-y-4">
              <h4 className="font-body font-medium text-foreground">Available Plugins</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePlugins?.map((plugin) => (
                  <div
                    key={plugin?.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      settings?.enabledPlugins?.includes(plugin?.id)
                        ? 'border-primary bg-primary/5' :'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-body font-medium text-foreground">{plugin?.name}</h5>
                        <p className="text-sm font-caption text-muted-foreground">{plugin?.description}</p>
                      </div>
                      <Checkbox
                        checked={settings?.enabledPlugins?.includes(plugin?.id)}
                        onChange={() => handlePluginToggle(plugin?.id)}
                        className="ml-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Performance Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <span>Performance & Optimization</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Performance Mode
              </label>
              <select
                value={settings?.performanceMode}
                onChange={(e) => handleSettingChange('performanceMode', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {performanceModes?.map((mode) => (
                  <option key={mode?.value} value={mode?.value}>
                    {mode?.label} - {mode?.description}
                  </option>
                ))}
              </select>
            </div>
            
            <Checkbox
              label="Memory Optimization"
              description="Optimize memory usage for better performance"
              checked={settings?.memoryOptimization}
              onChange={(e) => handleSettingChange('memoryOptimization', e?.target?.checked)}
            />
            
            <Checkbox
              label="Background Processing"
              description="Allow background tasks for better responsiveness"
              checked={settings?.backgroundProcessing}
              onChange={(e) => handleSettingChange('backgroundProcessing', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Cache Size: {settings?.cacheSize} MB
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={settings?.cacheSize}
                onChange={(e) => handleSettingChange('cacheSize', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <Checkbox
              label="Preload Content"
              description="Load content in advance for faster access"
              checked={settings?.preloadContent}
              onChange={(e) => handleSettingChange('preloadContent', e?.target?.checked)}
            />
            
            <Button
              variant="outline"
              onClick={handleClearCache}
              iconName="Trash2"
              iconPosition="left"
              className="w-full"
            >
              Clear Cache
            </Button>
          </div>
        </div>
      </div>
      {/* Developer Options */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Code" size={20} className="text-primary" />
          <span>Developer Options</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Developer Mode"
              description="Enable advanced debugging and development features"
              checked={settings?.developerMode}
              onChange={(e) => handleSettingChange('developerMode', e?.target?.checked)}
            />
            
            <Checkbox
              label="Debug Logging"
              description="Enable detailed console logging for troubleshooting"
              checked={settings?.debugLogging}
              onChange={(e) => handleSettingChange('debugLogging', e?.target?.checked)}
            />
            
            <Checkbox
              label="Experimental Features"
              description="Access to beta features and experimental functionality"
              checked={settings?.experimentalFeatures}
              onChange={(e) => handleSettingChange('experimentalFeatures', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Beta Updates"
              description="Receive beta versions and early access updates"
              checked={settings?.betaUpdates}
              onChange={(e) => handleSettingChange('betaUpdates', e?.target?.checked)}
            />
            
            <Checkbox
              label="Custom Scripts"
              description="Allow custom JavaScript for advanced automation"
              checked={settings?.customScripts}
              onChange={(e) => handleSettingChange('customScripts', e?.target?.checked)}
            />
            
            <Button
              variant="outline"
              onClick={handleExportSettings}
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              Export All Settings
            </Button>
          </div>
        </div>
      </div>
      {/* Integration & Automation */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Link" size={20} className="text-primary" />
          <span>Integration & Automation</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="API Integrations"
              description="Enable third-party API connections"
              checked={settings?.apiIntegrations}
              onChange={(e) => handleSettingChange('apiIntegrations', e?.target?.checked)}
            />
            
            <Checkbox
              label="Webhook Support"
              description="Send data to external services via webhooks"
              checked={settings?.webhookSupport}
              onChange={(e) => handleSettingChange('webhookSupport', e?.target?.checked)}
            />
            
            <Checkbox
              label="Automation Rules"
              description="Create custom automation workflows"
              checked={settings?.automationRules}
              onChange={(e) => handleSettingChange('automationRules', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="System Integration"
              description="Integrate with operating system features"
              checked={settings?.systemIntegration}
              onChange={(e) => handleSettingChange('systemIntegration', e?.target?.checked)}
            />
            
            <Checkbox
              label="Cross-Platform Data"
              description="Share data across different platforms"
              checked={settings?.crossPlatformData}
              onChange={(e) => handleSettingChange('crossPlatformData', e?.target?.checked)}
            />
            
            <Checkbox
              label="Multi-Device Sync"
              description="Synchronize settings across multiple devices"
              checked={settings?.multiDeviceSync}
              onChange={(e) => handleSettingChange('multiDeviceSync', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;