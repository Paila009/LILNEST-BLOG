import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductivityInsights = ({ todayStats, weeklyData }) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProductivityScore = () => {
    const targetMinutes = 240; // 4 hours target
    const score = Math.min((todayStats?.totalFocusTime / targetMinutes) * 100, 100);
    return Math.round(score);
  };

  const getStreakColor = () => {
    if (todayStats?.currentStreak >= 7) return 'text-success';
    if (todayStats?.currentStreak >= 3) return 'text-accent';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Today's Progress
        </h3>
      </div>
      {/* Today's Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2">
            <Icon name="Timer" size={20} className="text-primary" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {todayStats?.completedSessions}
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Sessions
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg mx-auto mb-2">
            <Icon name="Clock" size={20} className="text-secondary" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {formatTime(todayStats?.totalFocusTime)}
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Focus Time
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mx-auto mb-2">
            <Icon name="Coffee" size={20} className="text-accent" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {todayStats?.breaksCompleted}
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Breaks
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg mx-auto mb-2">
            <Icon name="Flame" size={20} className={getStreakColor()} />
          </div>
          <div className={`text-2xl font-mono font-bold ${getStreakColor()}`}>
            {todayStats?.currentStreak}
          </div>
          <div className="text-xs font-caption text-muted-foreground">
            Day Streak
          </div>
        </div>
      </div>
      {/* Productivity Score */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-body font-medium text-foreground">
            Productivity Score
          </h4>
          <span className="text-2xl font-mono font-bold text-primary">
            {getProductivityScore()}%
          </span>
        </div>
        
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-1000 ease-organic"
            style={{ width: `${getProductivityScore()}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs font-caption text-muted-foreground">
          <span>Target: 4h focus time</span>
          <span>{formatTime(todayStats?.totalFocusTime)} completed</span>
        </div>
      </div>
      {/* Weekly Pattern */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h4 className="font-body font-medium text-foreground mb-4">
          This Week's Pattern
        </h4>
        
        <div className="space-y-3">
          {weeklyData?.map((day, index) => (
            <div key={day?.day} className="flex items-center space-x-3">
              <div className="w-12 text-xs font-caption text-muted-foreground">
                {day?.day}
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((day?.focusMinutes / 240) * 100, 100)}%`,
                    transitionDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
              <div className="w-16 text-xs font-mono text-muted-foreground text-right">
                {formatTime(day?.focusMinutes)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Smart Suggestions */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={18} className="text-accent" />
          <h4 className="font-body font-medium text-foreground">
            Smart Suggestion
          </h4>
        </div>
        <p className="text-sm font-body text-foreground/80 mb-3">
          Based on your patterns, you're most productive between 9-11 AM. 
          Consider scheduling your most challenging tasks during this window.
        </p>
        <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
          <Icon name="Brain" size={14} />
          <span>AI-powered insight</span>
        </div>
      </div>
    </div>
  );
};

export default ProductivityInsights;