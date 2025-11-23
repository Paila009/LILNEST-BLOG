import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    voiceReminders: false,
    voiceGender: 'female',
    voiceSpeed: 1.0,
    voiceVolume: 0.8,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    skipLinks: true,
    altTextDescriptions: true,
    highContrastMode: false,
    largeText: false,
    textScaling: 100,
    colorBlindSupport: false,
    colorBlindType: 'none',
    reducedMotion: false,
    autoplayMedia: false,
    flashingContent: false,
    language: 'en',
    rtlSupport: false,
    customKeyboardShortcuts: true,
    mouseAlternatives: false,
    stickyKeys: false,
    slowKeys: false,
    bounceKeys: false,
    clickAssistance: false,
    dragAssistance: false,
    hoverAssistance: false
  });

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ];

  const voiceOptions = [
    { value: 'female', label: 'Female Voice', description: 'Standard female voice' },
    { value: 'male', label: 'Male Voice', description: 'Standard male voice' },
    { value: 'neutral', label: 'Neutral Voice', description: 'Gender-neutral voice' }
  ];

  const colorBlindTypes = [
    { value: 'none', label: 'None', description: 'No color blind support' },
    { value: 'protanopia', label: 'Protanopia', description: 'Red-green color blindness (missing L-cones)' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green color blindness (missing M-cones)' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-yellow color blindness (missing S-cones)' },
    { value: 'protanomaly', label: 'Protanomaly', description: 'Reduced sensitivity to red light' },
    { value: 'deuteranomaly', label: 'Deuteranomaly', description: 'Reduced sensitivity to green light' },
    { value: 'tritanomaly', label: 'Tritanomaly', description: 'Reduced sensitivity to blue light' }
  ];

  const keyboardShortcuts = [
    { key: 'Space', action: 'Start/Pause Timer', customizable: true },
    { key: 'Escape', action: 'Stop Current Session', customizable: true },
    { key: 'B', action: 'Take Break', customizable: true },
    { key: 'F', action: 'Start Focus Session', customizable: true },
    { key: 'S', action: 'Open Settings', customizable: true },
    { key: 'H', action: 'Go to Dashboard', customizable: true },
    { key: 'G', action: 'Open Garden', customizable: true },
    { key: '?', action: 'Show Help', customizable: false }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('neurosync-accessibility-settings', JSON.stringify(settings));
    // Apply accessibility settings immediately
    applyAccessibilitySettings();
  };

  const applyAccessibilitySettings = () => {
    // Apply text scaling
    document.documentElement.style.fontSize = `${settings?.textScaling}%`;
    
    // Apply reduced motion
    if (settings?.reducedMotion) {
      document.documentElement?.style?.setProperty('--animation-duration', '0s');
    } else {
      document.documentElement?.style?.removeProperty('--animation-duration');
    }
    
    // Apply high contrast
    document.documentElement?.setAttribute('data-high-contrast', settings?.highContrastMode);
    
    // Apply RTL support
    document.documentElement?.setAttribute('dir', settings?.rtlSupport ? 'rtl' : 'ltr');
  };

  const handleResetSettings = () => {
    setSettings({
      voiceReminders: false,
      voiceGender: 'female',
      voiceSpeed: 1.0,
      voiceVolume: 0.8,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      skipLinks: true,
      altTextDescriptions: true,
      highContrastMode: false,
      largeText: false,
      textScaling: 100,
      colorBlindSupport: false,
      colorBlindType: 'none',
      reducedMotion: false,
      autoplayMedia: false,
      flashingContent: false,
      language: 'en',
      rtlSupport: false,
      customKeyboardShortcuts: true,
      mouseAlternatives: false,
      stickyKeys: false,
      slowKeys: false,
      bounceKeys: false,
      clickAssistance: false,
      dragAssistance: false,
      hoverAssistance: false
    });
  };

  const testVoiceSettings = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('This is a test of your voice reminder settings.');
      utterance.rate = settings?.voiceSpeed;
      utterance.volume = settings?.voiceVolume;
      
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices?.find(voice => 
        voice?.name?.toLowerCase()?.includes(settings?.voiceGender)
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Accessibility Settings</h2>
          <p className="text-sm font-caption text-muted-foreground mt-1">
            Configure accessibility features for better usability and inclusion
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
      {/* Voice & Audio Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Volume2" size={20} className="text-primary" />
          <span>Voice & Audio Accessibility</span>
        </h3>
        
        <div className="space-y-6">
          <Checkbox
            label="Voice Reminders"
            description="Enable spoken notifications and break reminders"
            checked={settings?.voiceReminders}
            onChange={(e) => handleSettingChange('voiceReminders', e?.target?.checked)}
          />
          
          {settings?.voiceReminders && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Voice Gender
                </label>
                <select
                  value={settings?.voiceGender}
                  onChange={(e) => handleSettingChange('voiceGender', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {voiceOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Voice Speed: {settings?.voiceSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings?.voiceSpeed}
                  onChange={(e) => handleSettingChange('voiceSpeed', parseFloat(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Voice Volume: {Math.round(settings?.voiceVolume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings?.voiceVolume}
                  onChange={(e) => handleSettingChange('voiceVolume', parseFloat(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={testVoiceSettings}
                  iconName="Play"
                  iconPosition="left"
                  className="w-full"
                >
                  Test Voice Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Visual Accessibility */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-primary" />
          <span>Visual Accessibility</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="High Contrast Mode"
              description="Increase contrast for better visibility"
              checked={settings?.highContrastMode}
              onChange={(e) => handleSettingChange('highContrastMode', e?.target?.checked)}
            />
            
            <Checkbox
              label="Large Text"
              description="Use larger font sizes throughout the app"
              checked={settings?.largeText}
              onChange={(e) => handleSettingChange('largeText', e?.target?.checked)}
            />
            
            <Checkbox
              label="Color Blind Support"
              description="Enable color blind friendly adjustments"
              checked={settings?.colorBlindSupport}
              onChange={(e) => handleSettingChange('colorBlindSupport', e?.target?.checked)}
            />
            
            <Checkbox
              label="Reduced Motion"
              description="Minimize animations and transitions"
              checked={settings?.reducedMotion}
              onChange={(e) => handleSettingChange('reducedMotion', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Text Scaling: {settings?.textScaling}%
              </label>
              <input
                type="range"
                min="75"
                max="150"
                step="5"
                value={settings?.textScaling}
                onChange={(e) => handleSettingChange('textScaling', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            {settings?.colorBlindSupport && (
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Color Blind Type
                </label>
                <select
                  value={settings?.colorBlindType}
                  onChange={(e) => handleSettingChange('colorBlindType', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {colorBlindTypes?.map((type) => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <Checkbox
              label="Disable Autoplay Media"
              description="Prevent videos and audio from playing automatically"
              checked={!settings?.autoplayMedia}
              onChange={(e) => handleSettingChange('autoplayMedia', !e?.target?.checked)}
            />
            
            <Checkbox
              label="Reduce Flashing Content"
              description="Minimize flashing animations and effects"
              checked={!settings?.flashingContent}
              onChange={(e) => handleSettingChange('flashingContent', !e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Navigation & Interaction */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Navigation" size={20} className="text-primary" />
          <span>Navigation & Interaction</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Enhanced Keyboard Navigation"
              description="Improved keyboard-only navigation support"
              checked={settings?.keyboardNavigation}
              onChange={(e) => handleSettingChange('keyboardNavigation', e?.target?.checked)}
            />
            
            <Checkbox
              label="Focus Indicators"
              description="Clear visual indicators for focused elements"
              checked={settings?.focusIndicators}
              onChange={(e) => handleSettingChange('focusIndicators', e?.target?.checked)}
            />
            
            <Checkbox
              label="Skip Links"
              description="Quick navigation links to main content"
              checked={settings?.skipLinks}
              onChange={(e) => handleSettingChange('skipLinks', e?.target?.checked)}
            />
            
            <Checkbox
              label="Screen Reader Support"
              description="Enhanced compatibility with screen readers"
              checked={settings?.screenReader}
              onChange={(e) => handleSettingChange('screenReader', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Alternative Text Descriptions"
              description="Detailed descriptions for images and icons"
              checked={settings?.altTextDescriptions}
              onChange={(e) => handleSettingChange('altTextDescriptions', e?.target?.checked)}
            />
            
            <Checkbox
              label="Custom Keyboard Shortcuts"
              description="Enable customizable keyboard shortcuts"
              checked={settings?.customKeyboardShortcuts}
              onChange={(e) => handleSettingChange('customKeyboardShortcuts', e?.target?.checked)}
            />
            
            <Checkbox
              label="Mouse Alternatives"
              description="Alternative input methods for mouse actions"
              checked={settings?.mouseAlternatives}
              onChange={(e) => handleSettingChange('mouseAlternatives', e?.target?.checked)}
            />
            
            <Checkbox
              label="Click Assistance"
              description="Larger click targets and hover assistance"
              checked={settings?.clickAssistance}
              onChange={(e) => handleSettingChange('clickAssistance', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Language & Localization */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Globe" size={20} className="text-primary" />
          <span>Language & Localization</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Interface Language
            </label>
            <select
              value={settings?.language}
              onChange={(e) => handleSettingChange('language', e?.target?.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {languages?.map((lang) => (
                <option key={lang?.code} value={lang?.code}>
                  {lang?.name} ({lang?.nativeName})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <Checkbox
              label="Right-to-Left (RTL) Support"
              description="Enable RTL layout for Arabic, Hebrew, etc."
              checked={settings?.rtlSupport}
              onChange={(e) => handleSettingChange('rtlSupport', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Keyboard Shortcuts */}
      {settings?.customKeyboardShortcuts && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Keyboard" size={20} className="text-primary" />
            <span>Keyboard Shortcuts</span>
          </h3>
          
          <div className="space-y-3">
            {keyboardShortcuts?.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <kbd className="px-2 py-1 bg-background border border-border rounded text-sm font-mono">
                    {shortcut?.key}
                  </kbd>
                  <span className="font-body text-foreground">{shortcut?.action}</span>
                </div>
                {shortcut?.customizable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customize
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Motor Accessibility */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Hand" size={20} className="text-primary" />
          <span>Motor Accessibility</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Sticky Keys"
              description="Press modifier keys one at a time"
              checked={settings?.stickyKeys}
              onChange={(e) => handleSettingChange('stickyKeys', e?.target?.checked)}
            />
            
            <Checkbox
              label="Slow Keys"
              description="Require longer key presses to register"
              checked={settings?.slowKeys}
              onChange={(e) => handleSettingChange('slowKeys', e?.target?.checked)}
            />
            
            <Checkbox
              label="Bounce Keys"
              description="Ignore rapid repeated key presses"
              checked={settings?.bounceKeys}
              onChange={(e) => handleSettingChange('bounceKeys', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Drag Assistance"
              description="Easier drag and drop operations"
              checked={settings?.dragAssistance}
              onChange={(e) => handleSettingChange('dragAssistance', e?.target?.checked)}
            />
            
            <Checkbox
              label="Hover Assistance"
              description="Extended hover time for tooltips"
              checked={settings?.hoverAssistance}
              onChange={(e) => handleSettingChange('hoverAssistance', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;