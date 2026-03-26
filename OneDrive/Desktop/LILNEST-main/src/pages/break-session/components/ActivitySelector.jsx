import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActivitySelector = ({ 
  selectedActivity, 
  onActivityChange, 
  isSessionActive = false,
  className = "" 
}) => {
  const activities = [
    {
      id: 'breathing',
      name: 'Breathing',
      icon: 'Wind',
      description: 'Guided breathing exercises',
      duration: '2-5 min',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      id: 'power-nap',
      name: 'Power Nap',
      icon: 'Moon',
      description: 'Quick rejuvenating rest',
      duration: '10 min',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30'
    },
    {
      id: 'snack',
      name: 'Nourish Break',
      icon: 'Apple',
      description: 'Quick snack or hydration',
      duration: '5-15 min',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'posture',
      name: 'Posture',
      icon: 'User',
      description: 'Posture check & corrections',
      duration: '1-3 min',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/30'
    },
    {
      id: 'eyes',
      name: 'Eye Rest',
      icon: 'Eye',
      description: '20-20-20 rule exercises',
      duration: '1-2 min',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      id: 'stretching',
      name: 'Stretching',
      icon: 'Move',
      description: 'Quick desk stretches',
      duration: '3-5 min',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30'
    },
    {
      id: 'meditation',
      name: 'Meditation',
      icon: 'Brain',
      description: 'Mindful micro-meditation',
      duration: '2-10 min',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Choose Your Break Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          Select the type of wellness break you'd like to take
        </p>
      </div>
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {activities?.map((activity) => (
          <button
            key={activity?.id}
            onClick={() => onActivityChange(activity?.id)}
            disabled={isSessionActive}
            className={`p-4 rounded-xl border-2 transition-all duration-300 organic-hover text-left space-y-3 ${
              selectedActivity === activity?.id
                ? `${activity?.bgColor} ${activity?.borderColor} shadow-organic`
                : 'bg-card border-border hover:border-muted-foreground/30'
            } ${isSessionActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${activity?.bgColor} flex items-center justify-center`}>
                <Icon 
                  name={activity?.icon} 
                  size={20} 
                  className={activity?.color}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-foreground">
                  {activity?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {activity?.duration}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activity?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {activities?.map((activity) => (
            <button
              key={activity?.id}
              onClick={() => onActivityChange(activity?.id)}
              disabled={isSessionActive}
              className={`flex-shrink-0 w-32 p-3 rounded-xl border-2 transition-all duration-300 text-center space-y-2 ${
                selectedActivity === activity?.id
                  ? `${activity?.bgColor} ${activity?.borderColor} shadow-organic`
                  : 'bg-card border-border'
              } ${isSessionActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-8 h-8 rounded-lg ${activity?.bgColor} flex items-center justify-center mx-auto`}>
                <Icon 
                  name={activity?.icon} 
                  size={16} 
                  className={activity?.color}
                />
              </div>
              <div>
                <h4 className="font-body font-medium text-sm text-foreground">
                  {activity?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {activity?.duration}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Quick Action Buttons */}
      <div className="flex items-center justify-center space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onActivityChange('breathing')}
          disabled={isSessionActive}
          iconName="Zap"
          iconPosition="left"
          className="organic-hover"
        >
          Quick Breathing
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onActivityChange('eyes')}
          disabled={isSessionActive}
          iconName="Eye"
          iconPosition="left"
          className="organic-hover"
        >
          Eye Break
        </Button>
      </div>
    </div>
  );
};

export default ActivitySelector;