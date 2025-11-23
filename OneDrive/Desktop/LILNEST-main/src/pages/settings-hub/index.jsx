import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WellnessTabNavigation from '../../components/ui/WellnessTabNavigation';
import WellnessStatusIndicator from '../../components/ui/WellnessStatusIndicator';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import SettingsNavigation from './components/SettingsNavigation';
import NotificationSettings from './components/NotificationSettings';
import BreakPreferences from './components/BreakPreferences';
import FocusSettings from './components/FocusSettings';
import ThemeSettings from './components/ThemeSettings';
import AccessibilitySettings from './components/AccessibilitySettings';
import PrivacySettings from './components/PrivacySettings';
import AdvancedSettings from './components/AdvancedSettings';

const SettingsHub = () => {
  const [activeCategory, setActiveCategory] = useState('notifications');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved category preference
    const savedCategory = localStorage.getItem('neurosync-settings-category');
    if (savedCategory) {
      setActiveCategory(savedCategory);
    }
    
    // Simulate loading time for settings initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    localStorage.setItem('neurosync-settings-category', category);
  };

  const renderSettingsContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-caption text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      );
    }

    switch (activeCategory) {
      case 'notifications':
        return <NotificationSettings />;
      case 'breaks':
        return <BreakPreferences />;
      case 'focus':
        return <FocusSettings />;
      case 'themes':
        return <ThemeSettings />;
      case 'accessibility':
        return <AccessibilitySettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'advanced':
        return <AdvancedSettings />;
      default:
        return <NotificationSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Tab Navigation */}
      <WellnessTabNavigation />
      
      {/* Main Content */}
      <main className="pt-32 pb-24 lg:pb-8">
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Settings Navigation */}
          <SettingsNavigation 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6 lg:p-8">
              {renderSettingsContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Quick Action Panel */}
      <QuickActionPanel />
      
      {/* Wellness Status Indicator - Fixed Position */}
      <div className="hidden xl:block fixed top-4 right-6 z-30">
        <WellnessStatusIndicator />
      </div>
    </div>
  );
};

export default SettingsHub;