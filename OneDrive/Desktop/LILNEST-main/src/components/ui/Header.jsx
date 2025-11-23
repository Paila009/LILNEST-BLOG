import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/dashboard-home', icon: 'Home' },
    { label: 'Community', path: '/community', icon: 'Users' },
    { label: 'Marketplace', path: '/marketplace', icon: 'Store' },
    { label: 'Time Capsule', path: '/time-capsule', icon: 'Gift' },
    { label: 'Visualizer', path: '/visualizer', icon: 'Cube' },
    { label: 'Settings', path: '/settings-hub', icon: 'Settings' }
  ];
  if (role === 'doctor' || role === 'admin') {
    navItems.splice(6, 0, { label: 'Doctor', path: '/doctor', icon: 'Stethoscope' });
  }

  const currentPath = location.pathname;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border theme-transition">
      <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
        {/* Logo Section - Simplified */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shadow-soft">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path d="m12 1 1.5 4L18 6.5 13.5 8 12 12l-1.5-4L6 6.5 10.5 8 12 1Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            LILNEST
          </h1>
        </div>

        {/* Desktop Navigation - Simplified */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems?.map((item) => (
            <Button
              key={item?.path}
              variant={currentPath === item?.path ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="hover-lift"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section - Simplified */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {/* Auth */}
          {!user ? (
            <Button variant={currentPath === '/login' ? 'default' : 'ghost'} size="sm" onClick={() => handleNavigation('/login')} className="hidden md:inline-flex">Login</Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={async () => { try { await logout(); navigate('/login'); } catch {} }}>Logout</Button>
          )}
          
          {/* Settings for desktop */}
          <div className="hidden md:block">
            <Button
              variant={currentPath === '/settings-hub' ? "default" : "ghost"}
              size="icon"
              onClick={() => handleNavigation('/settings-hub')}
              className="hover-lift"
              title="Settings"
            >
              <Icon name="Settings" size={18} />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover-lift"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-soft theme-transition">
          <div className="py-4 px-4 space-y-2 max-w-7xl mx-auto">
            {navItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  currentPath === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;