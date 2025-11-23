import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementCards = ({ achievements, onAchievementClick, onShareAchievement }) => {
  const [filter, setFilter] = useState('all');

  const mockAchievements = [
    {
      id: 'first-focus',
      title: 'First Focus',
      description: 'Complete your first focus session',
      icon: 'Timer',
      category: 'focus',
      unlocked: true,
      unlockedDate: '2025-01-10',
      rarity: 'common',
      points: 10,
      gardenReward: 'Sprouting Seed'
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Maintain a 7-day focus streak',
      icon: 'Flame',
      category: 'streak',
      unlocked: true,
      unlockedDate: '2025-01-12',
      rarity: 'rare',
      points: 50,
      gardenReward: 'Focus Oak Tree'
    },
    {
      id: 'meditation-master',
      title: 'Meditation Master',
      description: 'Complete 100 minutes of meditation',
      icon: 'Brain',
      category: 'meditation',
      unlocked: true,
      unlockedDate: '2025-01-11',
      rarity: 'epic',
      points: 100,
      gardenReward: 'Mindfulness Bloom'
    },
    {
      id: 'break-buddy',
      title: 'Break Buddy',
      description: 'Take 50 mindful breaks',
      icon: 'Coffee',
      category: 'breaks',
      unlocked: true,
      unlockedDate: '2025-01-09',
      rarity: 'uncommon',
      points: 25,
      gardenReward: 'Break Berry Bush'
    },
    {
      id: 'zen-master',
      title: 'Zen Master',
      description: 'Reach garden level 10',
      icon: 'Crown',
      category: 'garden',
      unlocked: false,
      progress: 0.8,
      rarity: 'legendary',
      points: 200,
      gardenReward: 'Golden Lotus'
    },
    {
      id: 'consistency-king',
      title: 'Consistency King',
      description: 'Maintain 30-day wellness streak',
      icon: 'Trophy',
      category: 'streak',
      unlocked: false,
      progress: 0.4,
      rarity: 'legendary',
      points: 300,
      gardenReward: 'Eternal Fountain'
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Complete 10 morning sessions',
      icon: 'Sunrise',
      category: 'focus',
      unlocked: false,
      progress: 0.6,
      rarity: 'rare',
      points: 75,
      gardenReward: 'Dawn Flower'
    },
    {
      id: 'night-owl',
      title: 'Night Owl',
      description: 'Complete 10 evening sessions',
      icon: 'Moon',
      category: 'focus',
      unlocked: false,
      progress: 0.3,
      rarity: 'rare',
      points: 75,
      gardenReward: 'Moonlight Vine'
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: 'Grid3X3' },
    { id: 'focus', label: 'Focus', icon: 'Timer' },
    { id: 'breaks', label: 'Breaks', icon: 'Coffee' },
    { id: 'meditation', label: 'Meditation', icon: 'Brain' },
    { id: 'streak', label: 'Streaks', icon: 'Flame' },
    { id: 'garden', label: 'Garden', icon: 'Flower2' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-muted text-muted-foreground';
      case 'uncommon': return 'border-success text-success';
      case 'rare': return 'border-primary text-primary';
      case 'epic': return 'border-accent text-accent';
      case 'legendary': return 'border-warning text-warning';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-muted/10';
      case 'uncommon': return 'bg-success/10';
      case 'rare': return 'bg-primary/10';
      case 'epic': return 'bg-accent/10';
      case 'legendary': return 'bg-warning/10';
      default: return 'bg-muted/10';
    }
  };

  const filteredAchievements = filter === 'all' 
    ? mockAchievements 
    : mockAchievements?.filter(achievement => achievement?.category === filter);

  const unlockedCount = mockAchievements?.filter(a => a?.unlocked)?.length;
  const totalPoints = mockAchievements?.filter(a => a?.unlocked)?.reduce((sum, a) => sum + a?.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Achievements
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            {unlockedCount}/{mockAchievements?.length} unlocked • {totalPoints} points
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1.5 bg-accent/10 rounded-lg">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-mono text-accent-foreground">{totalPoints}</span>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={filter === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            iconSize={16}
            className="whitespace-nowrap"
          >
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            onClick={() => onAchievementClick(achievement)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer organic-hover transition-all duration-300 ${
              achievement?.unlocked 
                ? `${getRarityColor(achievement?.rarity)} ${getRarityBg(achievement?.rarity)} hover:shadow-organic`
                : 'border-muted bg-muted/5 opacity-60 hover:opacity-80'
            }`}
          >
            {/* Rarity Badge */}
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-caption capitalize ${
              achievement?.unlocked ? getRarityBg(achievement?.rarity) : 'bg-muted/20'
            } ${achievement?.unlocked ? getRarityColor(achievement?.rarity) : 'text-muted-foreground'}`}>
              {achievement?.rarity}
            </div>

            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${
                achievement?.unlocked 
                  ? getRarityBg(achievement?.rarity)
                  : 'bg-muted/20'
              }`}>
                <Icon
                  name={achievement?.icon}
                  size={24}
                  className={achievement?.unlocked 
                    ? getRarityColor(achievement?.rarity)?.split(' ')?.[1]
                    : 'text-muted-foreground'
                  }
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-heading font-semibold ${
                  achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement?.title}
                </h4>
                <p className="text-sm font-caption text-muted-foreground mt-1 leading-relaxed">
                  {achievement?.description}
                </p>
                
                {/* Garden Reward */}
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="Gift" size={14} className="text-accent" />
                  <span className="text-xs font-caption text-accent-foreground">
                    {achievement?.gardenReward}
                  </span>
                </div>

                {/* Progress Bar for Locked Achievements */}
                {!achievement?.unlocked && achievement?.progress && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-caption text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {Math.round(achievement?.progress * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${achievement?.progress * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Unlock Date */}
                {achievement?.unlocked && achievement?.unlockedDate && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="Calendar" size={12} className="text-muted-foreground" />
                    <span className="text-xs font-caption text-muted-foreground">
                      Unlocked {new Date(achievement.unlockedDate)?.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Points */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent" />
                <span className="text-sm font-mono text-accent-foreground">
                  {achievement?.points} pts
                </span>
              </div>
              
              {achievement?.unlocked && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onShareAchievement(achievement);
                  }}
                  iconName="Share"
                  iconSize={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  Share
                </Button>
              )}
            </div>

            {/* Unlock Animation */}
            {achievement?.unlocked && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 w-2 h-2 bg-accent rounded-full animate-gentle-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-heading font-medium text-foreground mb-2">
            No achievements in this category
          </h4>
          <p className="text-sm font-caption text-muted-foreground">
            Try a different filter to see more achievements
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementCards;