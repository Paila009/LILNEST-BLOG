import React from 'react';
import Icon from '../../../components/AppIcon';

const WellnessMetrics = ({ wellnessData, onMetricClick }) => {
  const metrics = [
    {
      id: 'focus-streak',
      label: 'Focus Streak',
      value: wellnessData?.focusStreak,
      unit: 'days',
      icon: 'Timer',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Consecutive days with focus sessions',
      trend: wellnessData?.focusStreak > 5 ? 'up' : wellnessData?.focusStreak > 2 ? 'stable' : 'down'
    },
    {
      id: 'break-streak',
      label: 'Break Streak',
      value: wellnessData?.breakStreak,
      unit: 'days',
      icon: 'Coffee',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Consecutive days taking regular breaks',
      trend: wellnessData?.breakStreak > 10 ? 'up' : wellnessData?.breakStreak > 5 ? 'stable' : 'down'
    },
    {
      id: 'meditation-minutes',
      label: 'Meditation',
      value: wellnessData?.meditationMinutes,
      unit: 'min',
      icon: 'Brain',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Total meditation time this month',
      trend: wellnessData?.meditationMinutes > 80 ? 'up' : wellnessData?.meditationMinutes > 30 ? 'stable' : 'down'
    },
    {
      id: 'total-sessions',
      label: 'Sessions',
      value: wellnessData?.totalSessions,
      unit: 'total',
      icon: 'Activity',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Total wellness sessions completed',
      trend: wellnessData?.totalSessions > 40 ? 'up' : wellnessData?.totalSessions > 20 ? 'stable' : 'down'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      value: wellnessData?.achievements,
      unit: 'unlocked',
      icon: 'Award',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Wellness milestones achieved',
      trend: wellnessData?.achievements > 8 ? 'up' : wellnessData?.achievements > 4 ? 'stable' : 'down'
    },
    {
      id: 'garden-level',
      label: 'Garden Level',
      value: wellnessData?.gardenLevel,
      unit: 'level',
      icon: 'Flower2',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Current garden development stage',
      trend: wellnessData?.gardenLevel > 8 ? 'up' : wellnessData?.gardenLevel > 4 ? 'stable' : 'down'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Wellness Metrics
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span className="font-caption">This Month</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics?.map((metric) => (
          <div
            key={metric?.id}
            onClick={() => onMetricClick(metric)}
            className={`p-4 rounded-xl border border-border ${metric?.bgColor} cursor-pointer organic-hover transition-all duration-300 hover:shadow-organic`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-card ${metric?.color}`}>
                  <Icon name={metric?.icon} size={20} />
                </div>
                <div>
                  <p className="text-sm font-caption text-muted-foreground">
                    {metric?.label}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-heading font-bold text-foreground">
                      {metric?.value}
                    </span>
                    <span className="text-sm font-caption text-muted-foreground">
                      {metric?.unit}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <Icon
                  name={getTrendIcon(metric?.trend)}
                  size={16}
                  className={getTrendColor(metric?.trend)}
                />
              </div>
            </div>
            
            <p className="text-xs font-caption text-muted-foreground mt-3 leading-relaxed">
              {metric?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Weekly Progress Chart */}
      <div className="mt-6 p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-heading font-medium text-foreground">
            Weekly Progress
          </h4>
          <Icon name="BarChart3" size={16} className="text-muted-foreground" />
        </div>
        
        <div className="flex items-end justify-between space-x-2 h-24">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.map((day, index) => {
            const height = Math.random() * 80 + 20; // Mock data
            const isToday = index === 4; // Mock Thursday as today
            
            return (
              <div key={day} className="flex flex-col items-center space-y-2 flex-1">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isToday ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
                <span className={`text-xs font-caption ${
                  isToday ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Quick Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-lg font-heading font-bold text-success">
            {Math.round((wellnessData?.focusStreak / 30) * 100)}%
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Monthly Goal
          </div>
        </div>
        
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <div className="text-lg font-heading font-bold text-primary">
            {wellnessData?.totalSessions}
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Total Sessions
          </div>
        </div>
        
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="text-lg font-heading font-bold text-accent">
            {wellnessData?.gardenLevel}
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Garden Level
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessMetrics;