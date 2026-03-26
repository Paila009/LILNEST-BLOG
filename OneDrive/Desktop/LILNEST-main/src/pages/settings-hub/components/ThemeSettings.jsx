import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useTheme } from '../../../contexts/ThemeContext';

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  const [themeSettings, setThemeSettings] = useState({
    currentTheme: 'light',
    autoThemeSwitch: false,
    darkModeStart: '20:00',
    darkModeEnd: '07:00',
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
    compactMode: false
  });

  // Simplified themes list
  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: 'Sun',
      preview: {
        bg: '#FAFBFA',
        card: '#F5F7F5',
        text: '#1A2E1A',
        accent: '#2D5A3D'
      }
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes for low light',
      icon: 'Moon',
      preview: {
        bg: '#0F1B0F',
        card: '#1A2E1A',
        text: '#E8F5E8',
        accent: '#7BA05B'
      }
    }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', description: 'Compact text size' },
    { value: 'medium', label: 'Medium', description: 'Standard text size' },
    { value: 'large', label: 'Large', description: 'Larger text for better readability' },
    { value: 'extra-large', label: 'Extra Large', description: 'Maximum text size' }
  ];

  const colorBlindTypes = [
    { value: 'none', label: 'None', description: 'No color blind support' },
    { value: 'protanopia', label: 'Protanopia', description: 'Red-green color blindness' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green color blindness' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-yellow color blindness' }
  ];

  const backgroundPatterns = [
    { value: 'none', label: 'None', description: 'Solid background' },
    { value: 'subtle-dots', label: 'Subtle Dots', description: 'Light dotted pattern' },
    { value: 'organic-shapes', label: 'Organic Shapes', description: 'Natural flowing patterns' },
    { value: 'grid', label: 'Grid', description: 'Minimal grid overlay' }
  ];

  const cardStyles = [
    { value: 'flat', label: 'Flat', description: 'No shadows or elevation' },
    { value: 'elevated', label: 'Elevated', description: 'Subtle shadows and depth' },
    { value: 'outlined', label: 'Outlined', description: 'Border-focused design' }
  ];

  const borderRadiusOptions = [
    { value: 'none', label: 'None', description: 'Sharp corners' },
    { value: 'small', label: 'Small', description: 'Slightly rounded' },
    { value: 'medium', label: 'Medium', description: 'Moderately rounded' },
    { value: 'large', label: 'Large', description: 'Very rounded' }
  ];

  useEffect(() => {
    // Load saved theme settings
    const savedSettings = localStorage.getItem('neurosync-theme-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setThemeSettings(settings);
    }
    setThemeSettings(prev => ({ ...prev, currentTheme: theme }));
  }, [theme]);

  const handleSettingChange = (key, value) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    setThemeSettings(prev => ({ ...prev, currentTheme: themeId }));
  };

  const applyTheme = (themeId) => {
    // Theme application logic would go here
    document.documentElement?.setAttribute('data-theme', themeId);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('neurosync-theme-settings', JSON.stringify(themeSettings));
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      currentTheme: 'light',
      autoThemeSwitch: false,
      darkModeStart: '20:00',
      darkModeEnd: '07:00',
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
      colorBlindSupport: false,
      colorBlindType: 'none',
      customAccentColor: '#2D5A3D',
      backgroundPattern: 'none',
      cardStyle: 'elevated',
      borderRadius: 'medium',
      compactMode: false
    };
    setThemeSettings(defaultSettings);
    applyTheme('light');
  };

  return (
    <div className="space-y-6">
      {/* Header - Simplified */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Themes & Display</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your visual experience
        </p>
      </div>

      {/* Theme Selection - Simplified */}
      <div className="bg-card rounded-lg border border-border p-6 theme-transition">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Choose Theme
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes?.map((theme) => (
            <div
              key={theme?.id}
              onClick={() => handleThemeChange(theme?.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover-lift ${
                themeSettings?.currentTheme === theme?.id
                  ? 'border-primary shadow-soft'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Theme Preview */}
              <div className="mb-3 h-12 rounded-lg overflow-hidden border border-border/50">
                <div 
                  className="h-full flex"
                  style={{ backgroundColor: theme?.preview?.bg }}
                >
                  <div 
                    className="w-1/3 h-full"
                    style={{ backgroundColor: theme?.preview?.card }}
                  ></div>
                  <div className="flex-1 p-2 flex flex-col justify-center space-y-1">
                    <div 
                      className="w-full h-1 rounded"
                      style={{ backgroundColor: theme?.preview?.text, opacity: 0.8 }}
                    ></div>
                    <div 
                      className="w-2/3 h-1 rounded"
                      style={{ backgroundColor: theme?.preview?.accent }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Theme Info */}
              <div className="flex items-center space-x-3">
                <Icon name={theme?.icon} size={18} className="text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">{theme?.name}</h4>
                  <p className="text-sm text-muted-foreground">{theme?.description}</p>
                </div>
              </div>
              
              {/* Selected Indicator */}
              {themeSettings?.currentTheme === theme?.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Display Options - Simplified */}
      <div className="bg-card rounded-lg border border-border p-6 theme-transition">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Display Options
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Compact Mode"
            description="Reduce spacing for more content"
            checked={themeSettings?.compactMode}
            onChange={(e) => setThemeSettings(prev => ({ ...prev, compactMode: e?.target?.checked }))}
          />
          
          <Checkbox
            label="Reduced Motion"
            description="Minimize animations"
            checked={themeSettings?.reducedMotion}
            onChange={(e) => setThemeSettings(prev => ({ ...prev, reducedMotion: e?.target?.checked }))}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="hover-lift">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default ThemeSettings;