import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MindfulnessFeed = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const mindfulnessContent = [
    {
      type: 'affirmation',
      title: 'Daily Affirmation',
      content: `I am capable of maintaining healthy digital habits.\nI choose to take breaks that nourish my mind and body.\nEvery moment of mindfulness strengthens my well-being.`,
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      type: 'gratitude',
      title: 'Gratitude Prompt',
      content: `Take a moment to appreciate:\n• The technology that connects you to meaningful work\n• Your body's ability to rest and recover\n• The opportunity to practice mindfulness today`,icon: 'Sparkles',color: 'text-success',bgColor: 'bg-success/10'
    },
    {
      type: 'meditation',title: 'Micro Meditation',content: `Close your eyes and take three deep breaths.\nWith each exhale, release any tension in your shoulders.\nNotice the feeling of your feet on the ground.\nReturn to this moment of presence.`,icon: 'Brain',color: 'text-secondary',bgColor: 'bg-secondary/10'
    },
    {
      type: 'tip',title: 'Wellness Tip',
      content: `The 20-20-20 rule for eye health:\nEvery 20 minutes, look at something 20 feet away for 20 seconds.\nThis simple practice can significantly reduce eye strain and improve focus.`,
      icon: 'Lightbulb',color: 'text-primary',bgColor: 'bg-primary/10'
    },
    {
      type: 'breathing',title: 'Breathing Exercise',
      content: `Try the 4-7-8 breathing technique:\nInhale for 4 counts through your nose\nHold for 7 counts\nExhale for 8 counts through your mouth\nRepeat 3-4 times for instant calm.`,
      icon: 'Wind',color: 'text-warning',bgColor: 'bg-warning/10'
    }
  ];

  const currentItem = mindfulnessContent?.[currentContent];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentContent((prev) => (prev + 1) % mindfulnessContent?.length);
        setIsAnimating(false);
      }, 300);
    }, 30000); // Change content every 30 seconds

    return () => clearInterval(interval);
  }, [mindfulnessContent?.length]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentContent((prev) => (prev + 1) % mindfulnessContent?.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentContent((prev) => (prev - 1 + mindfulnessContent?.length) % mindfulnessContent?.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Mindfulness Feed
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Content Card */}
      <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        <div className={`p-6 rounded-xl ${currentItem?.bgColor} border border-border/30`}>
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center`}>
              <Icon name={currentItem?.icon} size={20} className={currentItem?.color} />
            </div>
            <div>
              <h3 className="font-heading font-medium text-foreground">
                {currentItem?.title}
              </h3>
              <span className="text-xs font-caption text-muted-foreground capitalize">
                {currentItem?.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <p className="text-sm font-body text-foreground leading-relaxed whitespace-pre-line">
              {currentItem?.content}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/20">
            <div className="flex items-center space-x-2">
              {mindfulnessContent?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentContent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentContent 
                      ? `${currentItem?.color?.replace('text-', 'bg-')}` 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            {currentItem?.type === 'breathing' && (
              <button className={`text-sm font-caption ${currentItem?.color} hover:opacity-80 transition-opacity flex items-center space-x-1`}>
                <Icon name="Play" size={14} />
                <span>Try Now</span>
              </button>
            )}
            
            {currentItem?.type === 'meditation' && (
              <button className={`text-sm font-caption ${currentItem?.color} hover:opacity-80 transition-opacity flex items-center space-x-1`}>
                <Icon name="Headphones" size={14} />
                <span>Start Session</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Today's Schedule */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <h3 className="font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span>Today's Wellness Schedule</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <div className="text-sm font-body text-foreground">Morning Focus Block</div>
                <div className="text-xs text-muted-foreground">9:00 AM - 11:00 AM</div>
              </div>
            </div>
            <span className="text-xs font-caption text-success">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div>
                <div className="text-sm font-body text-foreground">Mindful Lunch Break</div>
                <div className="text-xs text-muted-foreground">12:30 PM - 1:00 PM</div>
              </div>
            </div>
            <span className="text-xs font-caption text-muted-foreground">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessFeed;