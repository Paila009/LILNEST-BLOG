import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GardenCanvas = ({ wellnessData, onElementClick, selectedTheme }) => {
  const [animatingElements, setAnimatingElements] = useState(new Set());
  const [gardenElements, setGardenElements] = useState([]);

  // Mock garden elements based on wellness progress
  const mockGardenElements = [
    {
      id: 'tree-1',
      type: 'tree',
      name: 'Focus Oak',
      position: { x: 20, y: 30 },
      size: Math.min(100, 40 + (wellnessData?.focusStreak * 8)),
      health: wellnessData?.focusStreak >= 7 ? 'flourishing' : wellnessData?.focusStreak >= 3 ? 'growing' : 'sprouting',
      unlocked: wellnessData?.focusStreak >= 1,
      requirement: 'Complete 7-day focus streak'
    },
    {
      id: 'flower-1',
      type: 'flower',
      name: 'Mindfulness Bloom',
      position: { x: 60, y: 60 },
      size: Math.min(80, 30 + (wellnessData?.meditationMinutes * 0.5)),
      health: wellnessData?.meditationMinutes >= 100 ? 'flourishing' : wellnessData?.meditationMinutes >= 30 ? 'growing' : 'sprouting',
      unlocked: wellnessData?.meditationMinutes >= 10,
      requirement: 'Complete 100 minutes of meditation'
    },
    {
      id: 'bush-1',
      type: 'bush',
      name: 'Break Berry Bush',
      position: { x: 80, y: 40 },
      size: Math.min(90, 35 + (wellnessData?.breakStreak * 6)),
      health: wellnessData?.breakStreak >= 14 ? 'flourishing' : wellnessData?.breakStreak >= 5 ? 'growing' : 'sprouting',
      unlocked: wellnessData?.breakStreak >= 3,
      requirement: 'Maintain 14-day break streak'
    },
    {
      id: 'grass-1',
      type: 'grass',
      name: 'Wellness Meadow',
      position: { x: 40, y: 80 },
      size: Math.min(120, 50 + (wellnessData?.totalSessions * 2)),
      health: wellnessData?.totalSessions >= 50 ? 'flourishing' : wellnessData?.totalSessions >= 20 ? 'growing' : 'sprouting',
      unlocked: true,
      requirement: 'Always available'
    },
    {
      id: 'pond-1',
      type: 'pond',
      name: 'Reflection Pool',
      position: { x: 15, y: 70 },
      size: Math.min(100, 40 + (wellnessData?.achievements * 10)),
      health: wellnessData?.achievements >= 10 ? 'flourishing' : wellnessData?.achievements >= 5 ? 'growing' : 'sprouting',
      unlocked: wellnessData?.achievements >= 3,
      requirement: 'Unlock 10 achievements'
    }
  ];

  useEffect(() => {
    setGardenElements(mockGardenElements);
  }, [wellnessData]);

  const triggerGrowthAnimation = (elementId) => {
    setAnimatingElements(prev => new Set([...prev, elementId]));
    setTimeout(() => {
      setAnimatingElements(prev => {
        const newSet = new Set(prev);
        newSet?.delete(elementId);
        return newSet;
      });
    }, 2000);
  };

  const getElementIcon = (type, health) => {
    const iconMap = {
      tree: health === 'flourishing' ? 'TreePine' : 'Sprout',
      flower: health === 'flourishing' ? 'Flower2' : 'Flower',
      bush: 'Trees',
      grass: 'Grass',
      pond: 'Waves'
    };
    return iconMap?.[type] || 'Leaf';
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'flourishing': return 'text-success';
      case 'growing': return 'text-primary';
      case 'sprouting': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getThemeBackground = () => {
    switch (selectedTheme) {
      case 'forest':
        return 'bg-gradient-to-br from-green-100 via-emerald-50 to-green-200';
      case 'desert':
        return 'bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-200';
      case 'ocean':
        return 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200';
      default:
        return 'bg-gradient-to-br from-green-100 via-emerald-50 to-green-200';
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden ${getThemeBackground()}`}>
      {/* Sky/Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-8 w-16 h-16 bg-yellow-300 rounded-full opacity-80 animate-gentle-pulse"></div>
        <div className="absolute top-12 left-12 w-8 h-8 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-8 left-24 w-6 h-6 bg-white rounded-full opacity-40"></div>
      </div>
      {/* Garden Elements */}
      <div className="absolute inset-0 p-8">
        {gardenElements?.map((element) => (
          <div
            key={element?.id}
            className={`absolute cursor-pointer transition-all duration-500 ${
              animatingElements?.has(element?.id) ? 'animate-organic-grow' : ''
            } ${element?.unlocked ? 'opacity-100' : 'opacity-30'}`}
            style={{
              left: `${element?.position?.x}%`,
              top: `${element?.position?.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => onElementClick(element)}
          >
            <div className="relative group">
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-300 organic-hover ${
                  element?.unlocked ? 'hover:scale-110' : ''
                }`}
                style={{
                  width: `${element?.size}px`,
                  height: `${element?.size}px`,
                  backgroundColor: element?.unlocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <Icon
                  name={getElementIcon(element?.type, element?.health)}
                  size={Math.max(24, element?.size * 0.4)}
                  className={`${getHealthColor(element?.health)} ${
                    element?.unlocked ? '' : 'opacity-50'
                  }`}
                />
              </div>

              {/* Growth particles */}
              {animatingElements?.has(element?.id) && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)]?.map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-success rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 200}ms`,
                        animationDuration: '1s'
                      }}
                    ></div>
                  ))}
                </div>
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-popover text-popover-foreground text-xs font-caption px-3 py-2 rounded-lg shadow-organic whitespace-nowrap">
                  <div className="font-medium">{element?.name}</div>
                  <div className="text-muted-foreground mt-1 capitalize">{element?.health}</div>
                  {!element?.unlocked && (
                    <div className="text-warning text-xs mt-1">{element?.requirement}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Garden Stats Overlay */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-organic">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Sprout" size={16} className="text-success" />
            <span className="font-mono">{gardenElements?.filter(e => e?.unlocked)?.length}/{gardenElements?.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="font-mono">{wellnessData?.gardenLevel}</span>
          </div>
        </div>
      </div>
      {/* Growth Animation Trigger */}
      <button
        onClick={() => {
          const randomElement = gardenElements?.[Math.floor(Math.random() * gardenElements?.length)];
          if (randomElement?.unlocked) {
            triggerGrowthAnimation(randomElement?.id);
          }
        }}
        className="absolute top-4 left-4 p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors duration-200"
        title="Trigger growth animation"
      >
        <Icon name="Sparkles" size={16} className="text-primary" />
      </button>
    </div>
  );
};

export default GardenCanvas;