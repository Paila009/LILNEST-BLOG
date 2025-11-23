import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeCategory, onCategoryChange }) => {
  const settingsCategories = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Break reminders & alerts'
    },
    {
      id: 'breaks',
      label: 'Break Preferences',
      icon: 'Coffee',
      description: 'Timing & break types'
    },
    {
      id: 'focus',
      label: 'Focus Sessions',
      icon: 'Timer',
      description: 'Pomodoro & productivity'
    },
    {
      id: 'themes',
      label: 'Themes & Display',
      icon: 'Palette',
      description: 'Visual customization'
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: 'Accessibility',
      description: 'Voice & contrast options'
    },
    {
      id: 'privacy',
      label: 'Privacy & Data',
      icon: 'Shield',
      description: 'Local data management'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: 'Settings2',
      description: 'ML & integrations'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block w-72 bg-card border-r border-border h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-semibold text-foreground">Settings Hub</h1>
              <p className="text-sm font-caption text-muted-foreground">Customize your experience</p>
            </div>
          </div>

          <nav className="space-y-2">
            {settingsCategories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => onCategoryChange(category?.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 organic-hover ${
                  activeCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-organic'
                    : 'text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon 
                  name={category?.icon} 
                  size={20} 
                  className={activeCategory === category?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
                <div className="flex-1 min-w-0">
                  <div className={`font-body font-medium ${
                    activeCategory === category?.id ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {category?.label}
                  </div>
                  <div className={`text-xs font-caption ${
                    activeCategory === category?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {category?.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Mobile Category Selector */}
      <div className="lg:hidden bg-card border-b border-border">
        <div className="p-4">
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e?.target?.value)}
            className="w-full px-4 py-3 bg-input border border-border rounded-xl font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {settingsCategories?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.label} - {category?.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SettingsNavigation;