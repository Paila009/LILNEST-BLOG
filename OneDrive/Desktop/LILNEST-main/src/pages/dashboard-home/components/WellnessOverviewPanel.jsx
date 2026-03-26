import React from 'react';
import Icon from '../../../components/AppIcon';

const WellnessOverviewPanel = () => {
  const wellnessData = {
    currentStreak: 7,
    todayFocusTime: 125,
    wellnessScore: 78,
    weeklyGoal: 180,
    breaksTaken: 8,
    targetBreaks: 12,
    lastBreakTime: "2:30 PM",
    nextBreakIn: 15
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    return 'text-warning';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-accent/10';
    return 'bg-warning/10';
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Wellness Overview
        </h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span className="text-sm font-caption">Today</span>
        </div>
      </div>
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wellness Score */}
        <div className={`relative p-4 rounded-xl ${getScoreBgColor(wellnessData?.wellnessScore)} border border-border/50`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-muted-foreground">Wellness Score</span>
            <Icon name="TrendingUp" size={16} className={getScoreColor(wellnessData?.wellnessScore)} />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className={`text-2xl font-heading font-bold ${getScoreColor(wellnessData?.wellnessScore)}`}>
              {wellnessData?.wellnessScore}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <div className="mt-2 w-full bg-muted/30 rounded-full h-1.5">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                wellnessData?.wellnessScore >= 80 ? 'bg-success' : 
                wellnessData?.wellnessScore >= 60 ? 'bg-accent' : 'bg-warning'
              }`}
              style={{ width: `${wellnessData?.wellnessScore}%` }}
            ></div>
          </div>
        </div>

        {/* Focus Time */}
        <div className="p-4 rounded-xl bg-primary/10 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-muted-foreground">Focus Time</span>
            <Icon name="Timer" size={16} className="text-primary" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-heading font-bold text-primary">
              {formatTime(wellnessData?.todayFocusTime)}
            </span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex-1 bg-muted/30 rounded-full h-1.5">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((wellnessData?.todayFocusTime / wellnessData?.weeklyGoal) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatTime(wellnessData?.weeklyGoal)} goal
            </span>
          </div>
        </div>

        {/* Break Streak */}
        <div className="p-4 rounded-xl bg-accent/10 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-muted-foreground">Break Streak</span>
            <Icon name="Flame" size={16} className="text-accent animate-gentle-pulse" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-heading font-bold text-accent">
              {wellnessData?.currentStreak}
            </span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Keep it going! 🌱
          </div>
        </div>
      </div>
      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name="Coffee" size={16} className="text-secondary" />
          </div>
          <div>
            <div className="text-sm font-mono text-foreground">
              {wellnessData?.breaksTaken}/{wellnessData?.targetBreaks}
            </div>
            <div className="text-xs text-muted-foreground">Breaks</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-mono text-foreground">
              {wellnessData?.lastBreakTime}
            </div>
            <div className="text-xs text-muted-foreground">Last Break</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={16} className="text-warning" />
          </div>
          <div>
            <div className="text-sm font-mono text-foreground">
              {wellnessData?.nextBreakIn}m
            </div>
            <div className="text-xs text-muted-foreground">Next Break</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
          <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={16} className="text-success" />
          </div>
          <div>
            <div className="text-sm font-mono text-foreground">
              {Math.round((wellnessData?.todayFocusTime / wellnessData?.weeklyGoal) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Goal</div>
          </div>
        </div>
      </div>
      {/* Status Indicator */}
      <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-success rounded-full animate-gentle-pulse"></div>
          <div>
            <div className="text-sm font-body text-foreground">Break reminders active</div>
            <div className="text-xs text-muted-foreground">Every 25 minutes • Gentle notifications</div>
          </div>
        </div>
        <button className="text-sm font-caption text-success hover:text-success/80 transition-colors">
          Adjust
        </button>
      </div>
    </div>
  );
};

export default WellnessOverviewPanel;