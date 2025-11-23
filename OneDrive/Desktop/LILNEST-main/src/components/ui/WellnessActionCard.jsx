import React from 'react';
import Icon from '../../components/AppIcon';

const WellnessActionCard = ({ icon, title, description, duration, category, onClick }) => {
  const getCategoryColor = (category) => {
    const colors = {
      energy: 'bg-yellow-500/10 text-yellow-500',
      nutrition: 'bg-green-500/10 text-green-500',
      mindfulness: 'bg-purple-500/10 text-purple-500',
      focus: 'bg-blue-500/10 text-blue-500',
      break: 'bg-pink-500/10 text-pink-500',
      health: 'bg-red-500/10 text-red-500',
      movement: 'bg-orange-500/10 text-orange-500',
      progress: 'bg-emerald-500/10 text-emerald-500'
    };
    return colors[category] || colors.focus;
  };

  return (
    <div
      onClick={onClick}
      className="relative group rounded-xl p-4 hover:bg-foreground/5 transition-all cursor-pointer"
    >
      <div className={`w-10 h-10 ${getCategoryColor(category)} rounded-lg flex items-center justify-center mb-3`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex items-center text-xs text-muted-foreground">
        <Icon name="Clock" className="w-3 h-3 mr-1" />
        <span>{duration}</span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="ChevronRight" className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default WellnessActionCard;