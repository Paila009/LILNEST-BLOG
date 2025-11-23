import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GardenCanvas from './components/GardenCanvas';
import WellnessMetrics from './components/WellnessMetrics';
import AchievementCards from './components/AchievementCards';
import GardenCustomization from './components/GardenCustomization';
import GrowthAnimationSystem from './components/GrowthAnimationSystem';

const VirtualGarden = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('garden');
  const [selectedTheme, setSelectedTheme] = useState('forest');
  const [selectedLayout, setSelectedLayout] = useState('natural');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock wellness data
  const [wellnessData] = useState({
    focusStreak: 12,
    breakStreak: 18,
    meditationMinutes: 145,
    totalSessions: 67,
    achievements: 8,
    gardenLevel: 6,
    weeklyProgress: [85, 92, 78, 95, 88, 90, 94],
    lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
    totalPoints: 1250
  });

  const views = [
    { id: 'garden', label: 'Garden', icon: 'Flower2' },
    { id: 'metrics', label: 'Metrics', icon: 'BarChart3' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { id: 'customize', label: 'Customize', icon: 'Settings' }
  ];

  // Handle element click in garden
  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  // Handle metric click
  const handleMetricClick = (metric) => {
    // Could navigate to detailed view or show modal
    console.log('Metric clicked:', metric);
  };

  // Handle achievement click
  const handleAchievementClick = (achievement) => {
    setSelectedElement(achievement);
  };

  // Handle share achievement
  const handleShareAchievement = (achievement) => {
    setShowShareModal(true);
    setSelectedElement(achievement);
  };

  // Handle theme change
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  // Handle layout change
  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
  };

  // Handle element toggle
  const handleElementToggle = (elementId, enabled) => {
    console.log('Element toggled:', elementId, enabled);
  };

  // Handle animation complete
  const handleAnimationComplete = (elementId, animationType) => {
    console.log('Animation completed:', elementId, animationType);
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Export garden screenshot
  const exportGardenScreenshot = () => {
    // Mock export functionality
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Create gradient background
    const gradient = ctx?.createLinearGradient(0, 0, 800, 600);
    gradient?.addColorStop(0, '#f0fdf4');
    gradient?.addColorStop(1, '#dcfce7');
    ctx.fillStyle = gradient;
    ctx?.fillRect(0, 0, 800, 600);
    
    // Add text
    ctx.fillStyle = '#166534';
    ctx.font = '24px Inter';
    ctx?.fillText('My NeuroSync Garden', 50, 50);
    ctx.font = '16px Inter';
    ctx?.fillText(`Level ${wellnessData?.gardenLevel} • ${wellnessData?.totalPoints} points`, 50, 80);
    
    // Convert to blob and download
    canvas?.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neurosync-garden-${new Date()?.toISOString()?.split('T')?.[0]}.png`;
      a?.click();
      URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    // Set page title
    document.title = 'Virtual Garden - NeuroSync';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigation('/dashboard-home')}
              iconName="ArrowLeft"
              iconSize={20}
            />
            <div>
              <h1 className="text-xl font-heading font-semibold text-foreground">
                Virtual Garden
              </h1>
              <p className="text-sm font-caption text-muted-foreground">
                Level {wellnessData?.gardenLevel} • {wellnessData?.totalPoints} points
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportGardenScreenshot}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              iconName={isFullscreen ? "Minimize2" : "Maximize2"}
              iconSize={18}
            />
          </div>
        </div>

        {/* View Navigation */}
        <div className="flex items-center space-x-1 px-6 pb-4">
          {views?.map((view) => (
            <Button
              key={view?.id}
              variant={activeView === view?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView(view?.id)}
              iconName={view?.icon}
              iconPosition="left"
              iconSize={16}
              className="organic-hover"
            >
              {view?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'container mx-auto px-6 py-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Primary Content Area */}
          <div className={`${isFullscreen ? 'col-span-3' : 'lg:col-span-2'} space-y-6`}>
            {activeView === 'garden' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    Your Wellness Oasis
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Leaf" size={16} className="text-success" />
                    <span className="font-caption">Growing since Jan 2025</span>
                  </div>
                </div>
                
                <GardenCanvas
                  wellnessData={wellnessData}
                  onElementClick={handleElementClick}
                  selectedTheme={selectedTheme}
                />
              </div>
            )}

            {activeView === 'metrics' && (
              <WellnessMetrics
                wellnessData={wellnessData}
                onMetricClick={handleMetricClick}
              />
            )}

            {activeView === 'achievements' && (
              <AchievementCards
                achievements={wellnessData?.achievements}
                onAchievementClick={handleAchievementClick}
                onShareAchievement={handleShareAchievement}
              />
            )}

            {activeView === 'customize' && (
              <GardenCustomization
                currentTheme={selectedTheme}
                onThemeChange={handleThemeChange}
                onLayoutChange={handleLayoutChange}
                onElementToggle={handleElementToggle}
              />
            )}
          </div>

          {/* Sidebar */}
          {!isFullscreen && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="p-6 bg-card rounded-xl border border-border shadow-organic">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Garden Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="TreePine" size={16} className="text-success" />
                      <span className="text-sm font-caption text-muted-foreground">Elements</span>
                    </div>
                    <span className="text-sm font-mono text-foreground">5/8</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingUp" size={16} className="text-primary" />
                      <span className="text-sm font-caption text-muted-foreground">Growth</span>
                    </div>
                    <span className="text-sm font-mono text-foreground">85%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-accent" />
                      <span className="text-sm font-caption text-muted-foreground">Health</span>
                    </div>
                    <span className="text-sm font-mono text-foreground">Flourishing</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-6 bg-card rounded-xl border border-border shadow-organic">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Recent Growth
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-success/10 rounded-lg">
                    <Icon name="Sprout" size={16} className="text-success" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">New bloom appeared</p>
                      <p className="text-xs font-caption text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded-lg">
                    <Icon name="TreePine" size={16} className="text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">Focus Oak grew taller</p>
                      <p className="text-xs font-caption text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 bg-accent/10 rounded-lg">
                    <Icon name="Award" size={16} className="text-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">Achievement unlocked</p>
                      <p className="text-xs font-caption text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 bg-card rounded-xl border border-border shadow-organic">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation('/pomodoro-timer')}
                    iconName="Timer"
                    iconPosition="left"
                    fullWidth
                  >
                    Start Focus Session
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation('/break-session')}
                    iconName="Coffee"
                    iconPosition="left"
                    fullWidth
                  >
                    Take a Break
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveView('achievements')}
                    iconName="Trophy"
                    iconPosition="left"
                    fullWidth
                  >
                    View Achievements
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Growth Animation System */}
      <GrowthAnimationSystem
        wellnessData={wellnessData}
        onAnimationComplete={handleAnimationComplete}
      />
      {/* Element Detail Modal */}
      {selectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-organic-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {selectedElement?.name || selectedElement?.title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedElement(null)}
                iconName="X"
                iconSize={18}
              />
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-caption text-muted-foreground leading-relaxed">
                {selectedElement?.description}
              </p>
              
              {selectedElement?.requirement && (
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-caption text-muted-foreground">
                    <strong>Requirement:</strong> {selectedElement?.requirement}
                  </p>
                </div>
              )}
              
              {selectedElement?.gardenReward && (
                <div className="flex items-center space-x-2 p-3 bg-accent/10 rounded-lg">
                  <Icon name="Gift" size={16} className="text-accent" />
                  <span className="text-sm font-caption text-accent-foreground">
                    Unlocks: {selectedElement?.gardenReward}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Share Modal */}
      {showShareModal && selectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-organic-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Share Achievement
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareModal(false)}
                iconName="X"
                iconSize={18}
              />
            </div>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Icon name={selectedElement?.icon} size={48} className="text-accent mx-auto mb-2" />
                <h4 className="font-heading font-semibold text-foreground">
                  {selectedElement?.title}
                </h4>
                <p className="text-sm font-caption text-muted-foreground mt-1">
                  {selectedElement?.description}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(`I just unlocked "${selectedElement?.title}" in NeuroSync! 🌱`);
                    setShowShareModal(false);
                  }}
                  iconName="Copy"
                  iconPosition="left"
                  fullWidth
                >
                  Copy Text
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={exportGardenScreenshot}
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  Save Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualGarden;