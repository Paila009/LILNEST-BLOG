import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    dataRetentionPeriod: 90,
    autoDeleteEnabled: true,
    exportDataFormat: 'json',
    anonymizeData: true,
    shareUsageStats: false,
    crashReporting: false,
    localStorageOnly: true,
    encryptLocalData: true,
    sessionTracking: true,
    activityLogging: true,
    performanceMetrics: false,
    errorReporting: false,
    backupFrequency: 'weekly',
    maxBackupFiles: 5,
    deleteOnUninstall: true,
    clearCacheOnExit: false,
    incognitoMode: false,
    dataMinimization: true,
    consentManagement: true,
    thirdPartyIntegrations: false
  });

  const [dataStats, setDataStats] = useState({
    totalSessions: 247,
    totalBreaks: 1834,
    focusMinutes: 8420,
    gardenProgress: 67,
    storageUsed: '2.4 MB',
    lastBackup: '2025-01-10',
    dataAge: 45
  });

  const retentionPeriods = [
    { value: 30, label: '30 Days', description: 'Keep data for one month' },
    { value: 90, label: '90 Days', description: 'Keep data for three months' },
    { value: 180, label: '180 Days', description: 'Keep data for six months' },
    { value: 365, label: '1 Year', description: 'Keep data for one year' },
    { value: -1, label: 'Never Delete', description: 'Keep data indefinitely' }
  ];

  const exportFormats = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
    { value: 'pdf', label: 'PDF', description: 'Human-readable report' },
    { value: 'xml', label: 'XML', description: 'Structured data format' }
  ];

  const backupFrequencies = [
    { value: 'daily', label: 'Daily', description: 'Backup every day' },
    { value: 'weekly', label: 'Weekly', description: 'Backup every week' },
    { value: 'monthly', label: 'Monthly', description: 'Backup every month' },
    { value: 'manual', label: 'Manual Only', description: 'Only when requested' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = async () => {
    try {
      const userData = {
        sessions: JSON.parse(localStorage.getItem('neurosync-sessions') || '[]'),
        breaks: JSON.parse(localStorage.getItem('neurosync-breaks') || '[]'),
        garden: JSON.parse(localStorage.getItem('neurosync-garden') || '{}'),
        settings: JSON.parse(localStorage.getItem('neurosync-settings') || '{}'),
        exportDate: new Date()?.toISOString(),
        version: '1.0.0'
      };

      let exportData;
      let filename;
      let mimeType;

      switch (settings?.exportDataFormat) {
        case 'json':
          exportData = JSON.stringify(userData, null, 2);
          filename = `neurosync-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
          mimeType = 'application/json';
          break;
        case 'csv':
          exportData = convertToCSV(userData);
          filename = `neurosync-data-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
          mimeType = 'text/csv';
          break;
        case 'pdf':
          // PDF generation would require a library like jsPDF
          exportData = generatePDFReport(userData);
          filename = `neurosync-report-${new Date()?.toISOString()?.split('T')?.[0]}.pdf`;
          mimeType = 'application/pdf';
          break;
        default:
          exportData = JSON.stringify(userData, null, 2);
          filename = `neurosync-data-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
          mimeType = 'application/json';
      }

      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const convertToCSV = (data) => {
    // Simple CSV conversion for sessions data
    const sessions = data?.sessions || [];
    const headers = ['Date', 'Type', 'Duration', 'Completed'];
    const rows = sessions?.map(session => [
      session?.date,
      session?.type,
      session?.duration,
      session?.completed
    ]);
    
    return [headers, ...rows]?.map(row => row?.join(','))?.join('\n');
  };

  const generatePDFReport = (data) => {
    // Simplified PDF report generation
    return `NeuroSync Data Report\nGenerated: ${new Date()?.toLocaleDateString()}\n\nTotal Sessions: ${data?.sessions?.length || 0}\nTotal Breaks: ${data?.breaks?.length || 0}`;
  };

  const handleImportData = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e?.target?.result);
        
        // Validate and merge imported data
        if (importedData?.sessions) {
          localStorage.setItem('neurosync-sessions', JSON.stringify(importedData?.sessions));
        }
        if (importedData?.breaks) {
          localStorage.setItem('neurosync-breaks', JSON.stringify(importedData?.breaks));
        }
        if (importedData?.garden) {
          localStorage.setItem('neurosync-garden', JSON.stringify(importedData?.garden));
        }
        
        // Show success message
        alert('Data imported successfully!');
      } catch (error) {
        alert('Import failed: Invalid file format');
      }
    };
    reader?.readAsText(file);
  };

  const handleDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      // Clear all NeuroSync data from localStorage
      Object.keys(localStorage)?.forEach(key => {
        if (key?.startsWith('neurosync-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear IndexedDB if used
      if ('indexedDB' in window) {
        indexedDB.deleteDatabase('neurosync-db');
      }
      
      alert('All data has been deleted.');
      window.location?.reload();
    }
  };

  const handleCreateBackup = () => {
    const backupData = {
      timestamp: new Date()?.toISOString(),
      version: '1.0.0',
      data: {}
    };

    // Collect all NeuroSync data
    Object.keys(localStorage)?.forEach(key => {
      if (key?.startsWith('neurosync-')) {
        backupData.data[key] = localStorage.getItem(key);
      }
    });

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurosync-backup-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('neurosync-privacy-settings', JSON.stringify(settings));
    // Apply privacy settings
    applyPrivacySettings();
  };

  const applyPrivacySettings = () => {
    // Set up auto-delete if enabled
    if (settings?.autoDeleteEnabled && settings?.dataRetentionPeriod > 0) {
      const cutoffDate = new Date();
      cutoffDate?.setDate(cutoffDate?.getDate() - settings?.dataRetentionPeriod);
      
      // Clean up old data
      cleanupOldData(cutoffDate);
    }
  };

  const cleanupOldData = (cutoffDate) => {
    // Implementation would clean up data older than cutoffDate
    console.log('Cleaning up data older than:', cutoffDate);
  };

  const handleResetSettings = () => {
    setSettings({
      dataRetentionPeriod: 90,
      autoDeleteEnabled: true,
      exportDataFormat: 'json',
      anonymizeData: true,
      shareUsageStats: false,
      crashReporting: false,
      localStorageOnly: true,
      encryptLocalData: true,
      sessionTracking: true,
      activityLogging: true,
      performanceMetrics: false,
      errorReporting: false,
      backupFrequency: 'weekly',
      maxBackupFiles: 5,
      deleteOnUninstall: true,
      clearCacheOnExit: false,
      incognitoMode: false,
      dataMinimization: true,
      consentManagement: true,
      thirdPartyIntegrations: false
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Privacy & Data Management</h2>
          <p className="text-sm font-caption text-muted-foreground mt-1">
            Control your data privacy, retention, and export options
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
      {/* Data Overview */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Database" size={20} className="text-primary" />
          <span>Your Data Overview</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-heading font-semibold text-primary">{dataStats?.totalSessions}</div>
            <div className="text-sm font-caption text-muted-foreground">Focus Sessions</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-heading font-semibold text-secondary">{dataStats?.totalBreaks}</div>
            <div className="text-sm font-caption text-muted-foreground">Breaks Taken</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-heading font-semibold text-accent">{dataStats?.focusMinutes}</div>
            <div className="text-sm font-caption text-muted-foreground">Focus Minutes</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-heading font-semibold text-success">{dataStats?.storageUsed}</div>
            <div className="text-sm font-caption text-muted-foreground">Storage Used</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-caption text-muted-foreground">Data Age: {dataStats?.dataAge} days</span>
            <span className="font-caption text-muted-foreground">Last Backup: {dataStats?.lastBackup}</span>
          </div>
        </div>
      </div>
      {/* Data Retention */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <span>Data Retention Policy</span>
        </h3>
        
        <div className="space-y-6">
          <Checkbox
            label="Auto-Delete Old Data"
            description="Automatically remove data older than the specified period"
            checked={settings?.autoDeleteEnabled}
            onChange={(e) => handleSettingChange('autoDeleteEnabled', e?.target?.checked)}
          />
          
          {settings?.autoDeleteEnabled && (
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-3">
                Data Retention Period
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {retentionPeriods?.map((period) => (
                  <label
                    key={period?.value}
                    className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      settings?.dataRetentionPeriod === period?.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="retentionPeriod"
                      value={period?.value}
                      checked={settings?.dataRetentionPeriod === period?.value}
                      onChange={(e) => handleSettingChange('dataRetentionPeriod', parseInt(e?.target?.value))}
                      className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div>
                      <div className="font-body font-medium text-foreground">{period?.label}</div>
                      <div className="text-sm font-caption text-muted-foreground">{period?.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Privacy Controls */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span>Privacy Controls</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Local Storage Only"
              description="Keep all data on your device, never send to servers"
              checked={settings?.localStorageOnly}
              onChange={(e) => handleSettingChange('localStorageOnly', e?.target?.checked)}
            />
            
            <Checkbox
              label="Encrypt Local Data"
              description="Encrypt stored data for additional security"
              checked={settings?.encryptLocalData}
              onChange={(e) => handleSettingChange('encryptLocalData', e?.target?.checked)}
            />
            
            <Checkbox
              label="Anonymize Data"
              description="Remove personally identifiable information"
              checked={settings?.anonymizeData}
              onChange={(e) => handleSettingChange('anonymizeData', e?.target?.checked)}
            />
            
            <Checkbox
              label="Data Minimization"
              description="Collect only essential data for functionality"
              checked={settings?.dataMinimization}
              onChange={(e) => handleSettingChange('dataMinimization', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Session Tracking"
              description="Track focus sessions for progress analytics"
              checked={settings?.sessionTracking}
              onChange={(e) => handleSettingChange('sessionTracking', e?.target?.checked)}
            />
            
            <Checkbox
              label="Activity Logging"
              description="Log break activities and wellness metrics"
              checked={settings?.activityLogging}
              onChange={(e) => handleSettingChange('activityLogging', e?.target?.checked)}
            />
            
            <Checkbox
              label="Incognito Mode"
              description="Don't save any session or activity data"
              checked={settings?.incognitoMode}
              onChange={(e) => handleSettingChange('incognitoMode', e?.target?.checked)}
            />
            
            <Checkbox
              label="Clear Cache on Exit"
              description="Remove temporary data when closing the app"
              checked={settings?.clearCacheOnExit}
              onChange={(e) => handleSettingChange('clearCacheOnExit', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Data Export & Import */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-primary" />
          <span>Data Export & Import</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Export Format
              </label>
              <select
                value={settings?.exportDataFormat}
                onChange={(e) => handleSettingChange('exportDataFormat', e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {exportFormats?.map((format) => (
                  <option key={format?.value} value={format?.value}>
                    {format?.label} - {format?.description}
                  </option>
                ))}
              </select>
            </div>
            
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              Export My Data
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Import Data
              </label>
              <input
                type="file"
                accept=".json,.csv"
                onChange={handleImportData}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={handleCreateBackup}
              iconName="Archive"
              iconPosition="left"
              className="w-full"
            >
              Create Backup
            </Button>
          </div>
        </div>
      </div>
      {/* Backup Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Archive" size={20} className="text-primary" />
          <span>Backup Settings</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Backup Frequency
            </label>
            <select
              value={settings?.backupFrequency}
              onChange={(e) => handleSettingChange('backupFrequency', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {backupFrequencies?.map((freq) => (
                <option key={freq?.value} value={freq?.value}>
                  {freq?.label} - {freq?.description}
                </option>
              ))}
            </select>
          </div>
          
          <Input
            label="Maximum Backup Files"
            type="number"
            description="Number of backup files to keep"
            value={settings?.maxBackupFiles}
            onChange={(e) => handleSettingChange('maxBackupFiles', parseInt(e?.target?.value))}
            min="1"
            max="20"
          />
        </div>
      </div>
      {/* Analytics & Reporting */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <span>Analytics & Reporting</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Share Anonymous Usage Statistics"
              description="Help improve the app with anonymous usage data"
              checked={settings?.shareUsageStats}
              onChange={(e) => handleSettingChange('shareUsageStats', e?.target?.checked)}
            />
            
            <Checkbox
              label="Performance Metrics"
              description="Collect app performance data for optimization"
              checked={settings?.performanceMetrics}
              onChange={(e) => handleSettingChange('performanceMetrics', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Crash Reporting"
              description="Send crash reports to help fix bugs"
              checked={settings?.crashReporting}
              onChange={(e) => handleSettingChange('crashReporting', e?.target?.checked)}
            />
            
            <Checkbox
              label="Error Reporting"
              description="Report errors for app improvement"
              checked={settings?.errorReporting}
              onChange={(e) => handleSettingChange('errorReporting', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Data Deletion */}
      <div className="bg-card rounded-xl border border-destructive p-6">
        <h3 className="text-lg font-heading font-medium text-destructive mb-4 flex items-center space-x-2">
          <Icon name="Trash2" size={20} className="text-destructive" />
          <span>Data Deletion</span>
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Delete Data on Uninstall"
            description="Remove all data when the app is uninstalled"
            checked={settings?.deleteOnUninstall}
            onChange={(e) => handleSettingChange('deleteOnUninstall', e?.target?.checked)}
          />
          
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <h4 className="font-body font-medium text-destructive mb-2">Danger Zone</h4>
            <p className="text-sm font-caption text-muted-foreground mb-4">
              This action will permanently delete all your NeuroSync data including sessions, breaks, garden progress, and settings. This cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAllData}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete All Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;