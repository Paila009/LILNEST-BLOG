import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Visualizer = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(22);
  const [viewMode, setViewMode] = useState('explore'); // explore, guided, timeline
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showCompare, setShowCompare] = useState(false);
  const [showTimeCapsulePrompt, setShowTimeCapsulePrompt] = useState(false);
  const modelRef = useRef(null);

  // Week data with comprehensive information
  const weekData = {
    8: { size: 'Raspberry', length: '1.6 cm', weight: '1 g', fruit: '🫐', color: 'from-red-400 to-pink-400' },
    12: { size: 'Lime', length: '5.4 cm', weight: '14 g', fruit: '🍋', color: 'from-green-400 to-emerald-400' },
    16: { size: 'Avocado', length: '11.6 cm', weight: '100 g', fruit: '🥑', color: 'from-green-500 to-lime-500' },
    20: { size: 'Banana', length: '16.4 cm', weight: '300 g', fruit: '🍌', color: 'from-yellow-400 to-amber-400' },
    22: { size: 'Papaya', length: '27.8 cm', weight: '430 g', fruit: '🥭', color: 'from-orange-400 to-amber-400' },
    24: { size: 'Cantaloupe', length: '30 cm', weight: '600 g', fruit: '🍈', color: 'from-orange-400 to-orange-500' },
    28: { size: 'Eggplant', length: '37.6 cm', weight: '1 kg', fruit: '🍆', color: 'from-purple-400 to-indigo-400' },
    32: { size: 'Pineapple', length: '42.4 cm', weight: '1.7 kg', fruit: '🍍', color: 'from-yellow-500 to-orange-500' },
    36: { size: 'Watermelon', length: '47.4 cm', weight: '2.6 kg', fruit: '🍉', color: 'from-red-400 to-pink-500' },
    40: { size: 'Pumpkin', length: '51.2 cm', weight: '3.4 kg', fruit: '🎃', color: 'from-orange-500 to-red-500' }
  };

  const currentData = weekData[currentWeek] || weekData[22];

  // Hotspot data for interactive points
  const hotspots = [
    {
      id: 'heart',
      icon: 'Heart',
      position: { top: '35%', left: '48%' },
      title: 'Heart Development',
      description: 'Your baby\'s heart is now beating at approximately 140-150 beats per minute. The four chambers are fully formed and working together to pump blood throughout the tiny body.',
      fact: 'The heart began beating at around 5-6 weeks!'
    },
    {
      id: 'brain',
      icon: 'Brain',
      position: { top: '15%', left: '50%' },
      title: 'Brain Growth',
      description: 'Billions of neurons are forming every day. The brain is developing rapidly, creating the foundation for all future learning, emotions, and bodily functions.',
      fact: 'By birth, the brain will have 100 billion neurons!'
    },
    {
      id: 'hands',
      icon: 'Hand',
      position: { top: '50%', left: '30%' },
      title: 'Hands & Fingers',
      description: 'Fingers and toes are now fully separated with tiny nails forming. Your baby can grasp, suck their thumb, and make small movements.',
      fact: 'Fingerprints are completely unique and permanent!'
    },
    {
      id: 'ears',
      icon: 'Ear',
      position: { top: '22%', left: '35%' },
      title: 'Hearing Development',
      description: 'Your baby can now hear sounds from outside the womb! They recognize your voice and may respond to music or loud noises.',
      fact: 'Babies prefer their mother\'s voice at birth!'
    },
    {
      id: 'eyes',
      icon: 'Eye',
      position: { top: '18%', left: '60%' },
      title: 'Vision Development',
      description: 'Eyelids can open and close. Your baby can sense light and may turn toward bright lights shining on your belly.',
      fact: 'Babies can see light through the womb!'
    },
    {
      id: 'lungs',
      icon: 'Wind',
      position: { top: '40%', left: '52%' },
      title: 'Lung Development',
      description: 'Lungs are practicing breathing movements with amniotic fluid. Air sacs (alveoli) are forming to prepare for breathing air after birth.',
      fact: 'Babies practice breathing even before birth!'
    }
  ];

  // Weekly highlights
  const weeklyHighlights = {
    22: [
      'Baby can now hear your voice clearly',
      'Eyebrows and eyelashes are forming',
      'Lungs are developing air sacs',
      'Skin is becoming less transparent',
      'Baby weighs about as much as a papaya'
    ]
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
  };

  const handleWeekChange = (newWeek) => {
    setCurrentWeek(newWeek);
    setSelectedHotspot(null);
  };

  const handleSaveToTimeCapsule = () => {
    navigate('/time-capsule');
  };

  const handleFindExpert = () => {
    navigate('/marketplace');
  };

  const handleJoinCommunity = () => {
    navigate('/community');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-6">
        {/* Hero Section - Week Overview */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card to-card/80 border border-border p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                  <Icon name="Baby" className="w-4 h-4" />
                  Week {currentWeek} of 40
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Your Baby This Week
                </h1>
                <p className="text-lg text-muted-foreground">
                  About the size of a {currentData.size}
                </p>
              </div>
              
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${currentData.color} flex items-center justify-center text-5xl shadow-xl`}>
                {currentData.fruit}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-1">Length</div>
                <div className="text-2xl font-bold text-foreground">{currentData.length}</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-1">Weight</div>
                <div className="text-2xl font-bold text-foreground">{currentData.weight}</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-1">Heartbeat</div>
                <div className="text-2xl font-bold text-foreground">140-150 bpm</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-1">Progress</div>
                <div className="text-2xl font-bold text-foreground">{Math.round((currentWeek/40)*100)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="bg-card rounded-2xl p-2 border border-border inline-flex gap-2">
          <button
            onClick={() => setViewMode('explore')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'explore'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Move3D" className="w-5 h-5 inline mr-2" />
            Explore
          </button>
          <button
            onClick={() => setViewMode('guided')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'guided'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="PlayCircle" className="w-5 h-5 inline mr-2" />
            Guided Tour
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'timeline'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="CalendarDays" className="w-5 h-5 inline mr-2" />
            Timeline
          </button>
        </div>

        {/* Main 3D Viewer Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Model Viewer */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-card to-card/50 rounded-3xl border-2 border-primary/20 overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
              
              {/* Model Container */}
              <div ref={modelRef} className="relative aspect-square flex items-center justify-center p-8">
                {/* Placeholder Baby Illustration */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl"></div>
                  
                  {/* Baby Silhouette */}
                  <div className="relative">
                    <svg
                      className="w-64 h-64 opacity-90 animate-pulse-slow"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="babyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      {/* Baby shape */}
                      <ellipse cx="100" cy="60" rx="35" ry="40" fill="url(#babyGradient)" className="text-primary" />
                      <ellipse cx="100" cy="120" rx="30" ry="50" fill="url(#babyGradient)" className="text-primary" />
                      <ellipse cx="85" cy="95" rx="12" ry="25" fill="url(#babyGradient)" className="text-primary" />
                      <ellipse cx="115" cy="95" rx="12" ry="25" fill="url(#babyGradient)" className="text-primary" />
                    </svg>

                    {/* Hotspot Markers */}
                    {hotspots.map((hotspot) => (
                      <button
                        key={hotspot.id}
                        onClick={() => handleHotspotClick(hotspot)}
                        className="absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-125 transition-transform cursor-pointer group"
                        style={{ top: hotspot.position.top, left: hotspot.position.left, transform: 'translate(-50%, -50%)' }}
                      >
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
                        <Icon name={hotspot.icon} className="w-4 h-4 text-white relative z-10" />
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 px-3 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {hotspot.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md rounded-2xl px-6 py-3 border border-border shadow-xl">
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Rotate Left">
                    <Icon name="RotateCcw" className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Zoom In">
                    <Icon name="ZoomIn" className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Zoom Out">
                    <Icon name="ZoomOut" className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Reset View">
                    <Icon name="Home" className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Rotate Right">
                    <Icon name="RotateCw" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Compare Button */}
              <button
                onClick={() => setShowCompare(!showCompare)}
                className="absolute top-6 right-6 px-4 py-2 bg-card/80 backdrop-blur-md hover:bg-card rounded-xl border border-border shadow-lg transition-colors"
              >
                <Icon name="Scale" className="w-5 h-5 inline mr-2" />
                Size Compare
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Weekly Highlights */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Sparkles" className="w-5 h-5 text-primary" />
                This Week's Highlights
              </h3>
              <ul className="space-y-3">
                {(weeklyHighlights[currentWeek] || weeklyHighlights[22]).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotspot Info Card */}
            {selectedHotspot && (
              <div className="bg-gradient-to-br from-primary/10 to-card rounded-2xl p-6 border-2 border-primary/30 animate-slide-up">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Icon name={selectedHotspot.icon} className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{selectedHotspot.title}</h3>
                  </div>
                  <button onClick={() => setSelectedHotspot(null)} className="p-2 hover:bg-card rounded-lg transition-colors">
                    <Icon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {selectedHotspot.description}
                </p>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Icon name="Lightbulb" className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-amber-500 mb-1">Did you know?</div>
                      <p className="text-sm text-muted-foreground">{selectedHotspot.fact}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="BookOpen" className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                  <Button size="sm" onClick={() => setShowTimeCapsulePrompt(true)} className="flex-1">
                    <Icon name="Gift" className="w-4 h-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleSaveToTimeCapsule}
                  className="w-full flex items-center gap-3 p-3 bg-muted hover:bg-muted/70 rounded-xl transition-colors text-left"
                >
                  <Icon name="Gift" className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground text-sm">Save to Time Capsule</div>
                    <div className="text-xs text-muted-foreground">Write a note about this week</div>
                  </div>
                </button>

                <button
                  onClick={handleFindExpert}
                  className="w-full flex items-center gap-3 p-3 bg-muted hover:bg-muted/70 rounded-xl transition-colors text-left"
                >
                  <Icon name="UserCheck" className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground text-sm">Find an Expert</div>
                    <div className="text-xs text-muted-foreground">Connect with specialists</div>
                  </div>
                </button>

                <button
                  onClick={handleJoinCommunity}
                  className="w-full flex items-center gap-3 p-3 bg-muted hover:bg-muted/70 rounded-xl transition-colors text-left"
                >
                  <Icon name="Users" className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground text-sm">Join Discussion</div>
                    <div className="text-xs text-muted-foreground">Connect with Week {currentWeek} moms</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Mode */}
        {viewMode === 'timeline' && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Growth Timeline</h3>
            
            {/* Week Selector */}
            <div className="mb-6">
              <input
                type="range"
                min="8"
                max="40"
                step="4"
                value={currentWeek}
                onChange={(e) => handleWeekChange(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Week 8</span>
                <span>Week 20</span>
                <span>Week 32</span>
                <span>Week 40</span>
              </div>
            </div>

            {/* Week Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(weekData).map(([week, data]) => (
                <button
                  key={week}
                  onClick={() => handleWeekChange(parseInt(week))}
                  className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                    currentWeek === parseInt(week)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{data.fruit}</div>
                  <div className="text-sm font-bold text-foreground">Week {week}</div>
                  <div className="text-xs text-muted-foreground">{data.size}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Comparison Modal */}
        {showCompare && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-3xl max-w-2xl w-full p-8 border-2 border-primary/20 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Size Comparison</h2>
                <button onClick={() => setShowCompare(false)} className="p-2 hover:bg-muted rounded-lg">
                  <Icon name="X" className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center justify-around py-8">
                <div className="text-center">
                  <div className="text-8xl mb-4">{currentData.fruit}</div>
                  <div className="text-lg font-bold text-foreground">{currentData.size}</div>
                  <div className="text-sm text-muted-foreground">{currentData.length}</div>
                </div>

                <Icon name="ArrowLeftRight" className="w-8 h-8 text-primary" />

                <div className="text-center">
                  <div className="text-8xl mb-4">👶</div>
                  <div className="text-lg font-bold text-foreground">Your Baby</div>
                  <div className="text-sm text-muted-foreground">{currentData.weight}</div>
                </div>
              </div>

              <Button onClick={() => setShowCompare(false)} className="w-full">
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Time Capsule Prompt */}
        {showTimeCapsulePrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-3xl max-w-lg w-full p-8 border-2 border-primary/20 animate-slide-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Gift" className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Save This Moment</h2>
                <p className="text-muted-foreground">
                  Capture your thoughts and feelings about Week {currentWeek} in your Time Capsule
                </p>
              </div>

              <div className="space-y-4">
                <Button onClick={handleSaveToTimeCapsule} className="w-full">
                  <Icon name="Plus" className="w-5 h-5 mr-2" />
                  Create Memory
                </Button>
                <Button onClick={() => setShowTimeCapsulePrompt(false)} variant="outline" className="w-full">
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Educational Footer */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="Info" className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Educational Purpose Only</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                This 3D visualization is designed for educational and emotional connection purposes. All information is medically reviewed but should not replace professional medical advice, diagnosis, or treatment. Always consult with your healthcare provider for medical concerns.
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2);
        }
      `}</style>
    </div>
  );
};

export default Visualizer;
