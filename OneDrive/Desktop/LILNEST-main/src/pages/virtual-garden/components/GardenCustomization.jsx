import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GardenCustomization = ({ currentTheme, onThemeChange, onLayoutChange, onElementToggle }) => {
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedElements, setSelectedElements] = useState(new Set(['tree-1', 'flower-1', 'grass-1']));

  const themes = [
    {
      id: 'forest',
      name: 'Enchanted Forest',
      description: 'Lush greens and mystical atmosphere',
      preview: 'bg-gradient-to-br from-green-100 via-emerald-50 to-green-200',
      colors: ['#22c55e', '#16a34a', '#15803d'],
      icon: 'TreePine'
    },
    {
      id: 'desert',
      name: 'Desert Oasis',
      description: 'Warm sands and golden sunsets',
      preview: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-200',
      colors: ['#f59e0b', '#d97706', '#b45309'],
      icon: 'Sun'
    },
    {
      id: 'ocean',
      name: 'Ocean Breeze',
      description: 'Calming blues and gentle waves',
      preview: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200',
      colors: ['#3b82f6', '#2563eb', '#1d4ed8'],
      icon: 'Waves'
    },
    {
      id: 'mountain',
      name: 'Mountain Peak',
      description: 'Majestic heights and crisp air',
      preview: 'bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200',
      colors: ['#64748b', '#475569', '#334155'],
      icon: 'Mountain'
    },
    {
      id: 'cherry',
      name: 'Cherry Blossom',
      description: 'Delicate pinks and spring vibes',
      preview: 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200',
      colors: ['#ec4899', '#db2777', '#be185d'],
      icon: 'Flower2'
    },
    {
      id: 'autumn',
      name: 'Autumn Leaves',
      description: 'Warm oranges and golden hues',
      preview: 'bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200',
      colors: ['#f97316', '#ea580c', '#c2410c'],
      icon: 'Leaf'
    }
  ];

  const layouts = [
    {
      id: 'natural',
      name: 'Natural Growth',
      description: 'Organic, scattered placement',
      icon: 'Shuffle',
      preview: 'Random positioning'
    },
    {
      id: 'symmetrical',
      name: 'Symmetrical',
      description: 'Balanced, organized layout',
      icon: 'Grid3X3',
      preview: 'Structured grid'
    },
    {
      id: 'circular',
      name: 'Circular Garden',
      description: 'Elements arranged in circles',
      icon: 'Circle',
      preview: 'Concentric circles'
    },
    {
      id: 'zen',
      name: 'Zen Garden',
      description: 'Minimalist, peaceful arrangement',
      icon: 'Minimize2',
      preview: 'Clean spacing'
    }
  ];

  const gardenElements = [
    {
      id: 'tree-1',
      name: 'Focus Oak',
      icon: 'TreePine',
      category: 'trees',
      unlocked: true,
      description: 'Grows with focus sessions'
    },
    {
      id: 'flower-1',
      name: 'Mindfulness Bloom',
      icon: 'Flower2',
      category: 'flowers',
      unlocked: true,
      description: 'Blooms with meditation'
    },
    {
      id: 'bush-1',
      name: 'Break Berry Bush',
      icon: 'Trees',
      category: 'bushes',
      unlocked: true,
      description: 'Fruits with regular breaks'
    },
    {
      id: 'grass-1',
      name: 'Wellness Meadow',
      icon: 'Grass',
      category: 'ground',
      unlocked: true,
      description: 'Base layer of growth'
    },
    {
      id: 'pond-1',
      name: 'Reflection Pool',
      icon: 'Waves',
      category: 'water',
      unlocked: true,
      description: 'Mirrors your progress'
    },
    {
      id: 'butterfly-1',
      name: 'Serenity Butterfly',
      icon: 'Bug',
      category: 'creatures',
      unlocked: false,
      description: 'Unlocked at level 5'
    },
    {
      id: 'bird-1',
      name: 'Wisdom Bird',
      icon: 'Bird',
      category: 'creatures',
      unlocked: false,
      description: 'Unlocked with 50 sessions'
    },
    {
      id: 'mushroom-1',
      name: 'Magic Mushroom',
      icon: 'Mushroom',
      category: 'special',
      unlocked: false,
      description: 'Rare achievement unlock'
    }
  ];

  const tabs = [
    { id: 'themes', label: 'Themes', icon: 'Palette' },
    { id: 'layout', label: 'Layout', icon: 'Layout' },
    { id: 'elements', label: 'Elements', icon: 'Layers' }
  ];

  const handleElementToggle = (elementId) => {
    const newSelected = new Set(selectedElements);
    if (newSelected?.has(elementId)) {
      newSelected?.delete(elementId);
    } else {
      newSelected?.add(elementId);
    }
    setSelectedElements(newSelected);
    onElementToggle(elementId, newSelected?.has(elementId));
  };

  const categories = [...new Set(gardenElements.map(e => e.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Garden Customization
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => {
            onThemeChange('forest');
            onLayoutChange('natural');
            setSelectedElements(new Set(['tree-1', 'flower-1', 'grass-1']));
          }}
        >
          Reset
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Themes Tab */}
        {activeTab === 'themes' && (
          <div className="space-y-4">
            <p className="text-sm font-caption text-muted-foreground">
              Choose a theme that matches your mood and preferences
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themes?.map((theme) => (
                <div
                  key={theme?.id}
                  onClick={() => onThemeChange(theme?.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer organic-hover transition-all duration-300 ${
                    currentTheme === theme?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-lg ${theme?.preview} flex items-center justify-center`}>
                      <Icon name={theme?.icon} size={24} className="text-foreground/60" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-foreground">
                        {theme?.name}
                      </h4>
                      <p className="text-sm font-caption text-muted-foreground mt-1">
                        {theme?.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        {theme?.colors?.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {currentTheme === theme?.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <p className="text-sm font-caption text-muted-foreground">
              Select how your garden elements are arranged
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {layouts?.map((layout) => (
                <div
                  key={layout?.id}
                  onClick={() => onLayoutChange(layout?.id)}
                  className="p-4 rounded-xl border-2 border-border cursor-pointer organic-hover transition-all duration-300 hover:border-primary/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <Icon name={layout?.icon} size={24} className="text-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-foreground">
                        {layout?.name}
                      </h4>
                      <p className="text-sm font-caption text-muted-foreground mt-1">
                        {layout?.description}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground mt-2">
                        {layout?.preview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Elements Tab */}
        {activeTab === 'elements' && (
          <div className="space-y-6">
            <p className="text-sm font-caption text-muted-foreground">
              Toggle garden elements on or off. Some elements require achievements to unlock.
            </p>
            
            {categories?.map((category) => (
              <div key={category} className="space-y-3">
                <h4 className="text-sm font-heading font-medium text-foreground capitalize">
                  {category}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gardenElements?.filter(element => element?.category === category)?.map((element) => (
                      <div
                        key={element?.id}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          element?.unlocked
                            ? 'border-border cursor-pointer hover:border-primary/50' :'border-muted bg-muted/20 opacity-60'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            element?.unlocked ? 'bg-primary/10' : 'bg-muted/30'
                          }`}>
                            <Icon
                              name={element?.icon}
                              size={20}
                              className={element?.unlocked ? 'text-primary' : 'text-muted-foreground'}
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className={`font-medium ${
                                element?.unlocked ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {element?.name}
                              </h5>
                              
                              {element?.unlocked && (
                                <button
                                  onClick={() => handleElementToggle(element?.id)}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                                    selectedElements?.has(element?.id)
                                      ? 'bg-primary border-primary' :'border-muted hover:border-primary'
                                  }`}
                                >
                                  {selectedElements?.has(element?.id) && (
                                    <Icon name="Check" size={12} className="text-primary-foreground" />
                                  )}
                                </button>
                              )}
                            </div>
                            
                            <p className="text-xs font-caption text-muted-foreground mt-1">
                              {element?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenCustomization;