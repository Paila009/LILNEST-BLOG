import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStreak, 
  todayBreaks, 
  weeklyGoal, 
  sessionCount,
  className = "" 
}) => {
  const weeklyProgress = (todayBreaks / weeklyGoal) * 100;
  const streakMilestones = [7, 14, 30, 60, 100];
  const nextMilestone = streakMilestones?.find(m => m > currentStreak) || streakMilestones?.[streakMilestones?.length - 1];

  const achievements = [
    {
      id: 'first-break',
      title: 'First Break',
      description: 'Completed your first wellness break',
      icon: 'Award',
      unlocked: sessionCount >= 1,
      color: 'text-accent'
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: '7 day break streak',
      icon: 'Flame',
      unlocked: currentStreak >= 7,
      color: 'text-orange-500'
    },
    {
      id: 'mindful-master',
      title: 'Mindful Master',
      description: '30 day break streak',
      icon: 'Crown',
      unlocked: currentStreak >= 30,
      color: 'text-yellow-500'
    },
    {
      id: 'wellness-champion',
      title: 'Wellness Champion',
      description: '100 total break sessions',
      icon: 'Trophy',
      unlocked: sessionCount >= 100,
      color: 'text-primary'
    }
  ];

  const unlockedAchievements = achievements?.filter(a => a?.unlocked);
  const nextAchievement = achievements?.find(a => !a?.unlocked);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Current Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card/50 border border-border rounded-xl p-4 text-center space-y-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <Icon name="Flame" size={20} className="text-primary" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {currentStreak}
          </div>
          <div className="text-xs text-muted-foreground">
            Day Streak
          </div>
        </div>

        <div className="bg-card/50 border border-border rounded-xl p-4 text-center space-y-2">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
            <Icon name="Coffee" size={20} className="text-secondary" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {todayBreaks}
          </div>
          <div className="text-xs text-muted-foreground">
            Today's Breaks
          </div>
        </div>

        <div className="bg-card/50 border border-border rounded-xl p-4 text-center space-y-2">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
            <Icon name="Target" size={20} className="text-accent" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {weeklyGoal}
          </div>
          <div className="text-xs text-muted-foreground">
            Weekly Goal
          </div>
        </div>

        <div className="bg-card/50 border border-border rounded-xl p-4 text-center space-y-2">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
            <Icon name="BarChart3" size={20} className="text-success" />
          </div>
          <div className="text-2xl font-mono font-bold text-foreground">
            {sessionCount}
          </div>
          <div className="text-xs text-muted-foreground">
            Total Sessions
          </div>
        </div>
      </div>
      {/* Weekly Progress */}
      <div className="bg-card/30 border border-border rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-body font-medium text-foreground">Weekly Progress</h4>
          <span className="text-sm text-muted-foreground">
            {todayBreaks}/{weeklyGoal} breaks
          </span>
        </div>
        
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-organic"
            style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
          />
        </div>
        
        <div className="text-xs text-muted-foreground">
          {weeklyProgress >= 100 ? 'Goal achieved! 🎉' : `${Math.round(weeklyProgress)}% complete`}
        </div>
      </div>
      {/* Streak Progress */}
      <div className="bg-card/30 border border-border rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-body font-medium text-foreground">Streak Progress</h4>
          <span className="text-sm text-muted-foreground">
            Next: {nextMilestone} days
          </span>
        </div>
        
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 ease-organic"
            style={{ width: `${(currentStreak / nextMilestone) * 100}%` }}
          />
        </div>
        
        <div className="text-xs text-muted-foreground">
          {nextMilestone - currentStreak} days until next milestone
        </div>
      </div>
      {/* Recent Achievements */}
      {unlockedAchievements?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-body font-medium text-foreground">Recent Achievements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {unlockedAchievements?.slice(-2)?.map((achievement) => (
              <div
                key={achievement?.id}
                className="bg-card/50 border border-border rounded-lg p-3 flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name={achievement?.icon} size={16} className={achievement?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-body font-medium text-sm text-foreground">
                    {achievement?.title}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {achievement?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Next Achievement */}
      {nextAchievement && (
        <div className="bg-muted/20 border border-dashed border-muted-foreground/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-muted-foreground" />
            <h4 className="font-body font-medium text-foreground">Next Achievement</h4>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon name={nextAchievement?.icon} size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h5 className="font-body font-medium text-foreground">
                {nextAchievement?.title}
              </h5>
              <p className="text-sm text-muted-foreground">
                {nextAchievement?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;