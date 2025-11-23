import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WellnessTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/dashboard-home');
  const [sessionStatus, setSessionStatus] = useState({
    isActive: false,
    type: null,
    timeRemaining: null
  });

  const tabItems = [
    { label: 'Home', path: '/dashboard-home', icon: 'Home', description: 'Dashboard & Overview' },
    { label: 'Focus', path: '/pomodoro-timer', icon: 'Timer', description: 'Pomodoro Sessions' },
    { label: 'Break', path: '/break-session', icon: 'Coffee', description: 'Mindful Breaks' },
    { label: 'Garden', path: '/virtual-garden', icon: 'Flower2', description: 'Progress & Growth' },
    { label: 'Settings', path: '/settings-hub', icon: 'Settings', description: 'Preferences' }
  ];

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const getTabIndicator = (path) => {
    if (sessionStatus?.isActive && (path === '/pomodoro-timer' || path === '/break-session')) {
      return (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-gentle-pulse border-2 border-background"></div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Navigation removed */}
    </>
  );
};

export default WellnessTabNavigation;
