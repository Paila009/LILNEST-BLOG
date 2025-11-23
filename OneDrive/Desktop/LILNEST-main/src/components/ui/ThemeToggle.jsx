import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`theme-transition ${className}`}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="m12 2 0 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m12 20 0 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m4.93 4.93 1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m17.66 17.66 1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m2 12 2 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m20 12 2 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m6.34 17.66-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="m19.07 4.93-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
        </svg>
      )}
    </Button>
  );
};

export default ThemeToggle;