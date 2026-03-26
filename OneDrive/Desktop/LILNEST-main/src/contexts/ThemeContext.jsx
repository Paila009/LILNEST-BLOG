import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme from localStorage or detect system preference
    const loadTheme = () => {
      const savedSettings = localStorage.getItem('lilnest-theme-settings') || localStorage.getItem('neurosync-theme-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setTheme(settings?.currentTheme || 'light');
      } else {
        // Detect system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
      }
      setIsLoading(false);
    };

    loadTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedSettings = localStorage.getItem('lilnest-theme-settings') || localStorage.getItem('neurosync-theme-settings');
      if (!savedSettings) {
        setTheme(e?.matches ? 'dark' : 'light');
      }
    };

    mediaQuery?.addEventListener('change', handleChange);
    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (!isLoading) {
      document.documentElement?.setAttribute('data-theme', theme);
      document.documentElement.className = theme;
    }
  }, [theme, isLoading]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Save to localStorage
    const savedSettings = localStorage.getItem('lilnest-theme-settings') || localStorage.getItem('neurosync-theme-settings');
    const settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.currentTheme = newTheme;
    localStorage.setItem('lilnest-theme-settings', JSON.stringify(settings));
  };

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
    
    // Save to localStorage
    const savedSettings = localStorage.getItem('lilnest-theme-settings') || localStorage.getItem('neurosync-theme-settings');
    const settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.currentTheme = newTheme;
    localStorage.setItem('lilnest-theme-settings', JSON.stringify(settings));
  };

  const value = {
    theme,
    setTheme: setThemeMode,
    toggleTheme,
    isLoading
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};