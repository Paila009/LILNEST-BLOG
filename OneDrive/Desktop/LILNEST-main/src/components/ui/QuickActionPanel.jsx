import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBreakMenuOpen, setIsBreakMenuOpen] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'focus',
      label: 'Quick Focus',
      icon: 'Timer',
      description: 'Start 25min session',
      action: () => handleQuickFocus(),
      variant: 'default',
      shortcut: 'F'
    },
    {
      id: 'break',
      label: 'Take Break',
      icon: 'Coffee',
      description: 'Mindful pause',
      action: () => toggleBreakMenu(),
      variant: 'secondary',
      shortcut: 'B'
    },
    {
      id: 'breathe',
      label: 'Breathe',
      icon: 'Wind',
      description: '2min breathing',
      action: () => handleQuickBreathe(),
      variant: 'outline',
      shortcut: 'R'
    }
  ];

  const breakOptions = [
    { label: '5min Stretch', icon: 'Move', duration: 5 },
    { label: '10min Walk', icon: 'Footprints', duration: 10 },
    { label: '15min Meditation', icon: 'Brain', duration: 15 },
    { label: 'Eye Rest', icon: 'Eye', duration: 3 }
  ];

  const handleQuickFocus = () => {
    // Navigate to pomodoro timer with quick start
    navigate('/pomodoro-timer?quick=true');
  };

  const handleQuickBreathe = () => {
    // Start breathing exercise
    navigate('/break-session?type=breathing');
  };

  const toggleBreakMenu = () => {
    setIsBreakMenuOpen(!isBreakMenuOpen);
  };

  const handleBreakOption = (option) => {
    navigate(`/break-session?type=${option?.label?.toLowerCase()?.replace(' ', '-')}&duration=${option?.duration}`);
    setIsBreakMenuOpen(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Desktop Floating Action Panel */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <div className={`transition-all duration-300 ease-organic ${isExpanded ? 'space-y-3' : 'space-y-0'}`}>
          {/* Quick Actions */}
          <div className={`flex flex-col space-y-2 transition-all duration-300 ${
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            {quickActions?.map((action, index) => (
              <div key={action?.id} className="relative group">
                <Button
                  variant={action?.variant}
                  size="lg"
                  onClick={action?.action}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="floating-action shadow-organic-lg min-w-[140px] justify-start"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {action?.label}
                </Button>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-popover text-popover-foreground text-xs font-caption px-3 py-2 rounded-lg shadow-organic whitespace-nowrap">
                    <div className="font-medium">{action?.description}</div>
                    <div className="text-muted-foreground mt-1">Press {action?.shortcut}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Break Options Menu */}
          {isBreakMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-xl shadow-organic-xl z-50">
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-caption text-muted-foreground border-b border-border">
                  Choose Break Type
                </div>
                {breakOptions?.map((option) => (
                  <button
                    key={option?.label}
                    onClick={() => handleBreakOption(option)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{option?.duration}m</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Toggle Button */}
          <Button
            variant="default"
            size="lg"
            onClick={toggleExpanded}
            iconName={isExpanded ? "X" : "Zap"}
            className="floating-action shadow-organic-xl animate-breathe"
          >
            {isExpanded ? 'Close' : 'Quick'}
          </Button>
        </div>
      </div>
      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 z-40 px-4">
        <div className={`bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-organic-lg transition-all duration-300 ${
          isExpanded ? 'py-4' : 'py-2'
        }`}>
          {isExpanded ? (
            <div className="space-y-3 px-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-medium text-foreground">Quick Actions</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  iconName="ChevronDown"
                  iconSize={16}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.id}
                    variant={action?.variant}
                    size="sm"
                    onClick={action?.action}
                    iconName={action?.icon}
                    className="flex-col h-16 space-y-1"
                  >
                    <span className="text-xs">{action?.label}</span>
                  </Button>
                ))}
              </div>
              
              {isBreakMenuOpen && (
                <div className="border-t border-border pt-3 space-y-2">
                  <h4 className="text-sm font-caption text-muted-foreground">Break Options</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {breakOptions?.map((option) => (
                      <button
                        key={option?.label}
                        onClick={() => handleBreakOption(option)}
                        className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg text-sm font-body text-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name={option?.icon} size={14} />
                        <span className="truncate">{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                iconName="ChevronUp"
                iconPosition="left"
                className="text-muted-foreground"
              >
                Quick Actions
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickActionPanel;