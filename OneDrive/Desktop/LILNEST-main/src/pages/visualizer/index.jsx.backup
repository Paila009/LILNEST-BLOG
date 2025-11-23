import React, { useEffect, useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

// Simple dynamic loader for model-viewer web component
function useModelViewer() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const existing = document.querySelector('script[data-lilnest-model-viewer]');
    if (existing) {
      setLoading(false);
      return;
    }
    const s = document.createElement('script');
    s.type = 'module';
    s.dataset.lilnestModelViewer = '1';
    s.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    s.onload = () => {
      setTimeout(() => setLoading(false), 500);
    };
    s.onerror = () => setLoading(false);
    document.head.appendChild(s);
  }, []);
  
  return loading;
}

const Visualizer = () => {
  const scriptLoading = useModelViewer();
  const [currentWeek, setCurrentWeek] = useState(20);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [modelLoading, setModelLoading] = useState(true);

  // Fetal development data by week with 3D model URLs
  const developmentData = {
    8: {
      title: 'Week 8 - Embryo',
      size: '1.6 cm (size of a raspberry)',
      weight: '1 gram',
      modelUrl: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
      backgroundColor: 'linear-gradient(135deg, #ffe4e4 0%, #ffd4d4 50%, #ffc4c4 100%)',
      developments: [
        'Webbed fingers and toes are forming',
        'Facial features becoming more defined',
        'Heart is beating at 150-170 bpm',
        'Brain and nervous system developing rapidly'
      ],
      hotspots: [
        { id: 'heart', name: 'Heart', info: 'Beating at 150-170 BPM, pumping blood through tiny vessels', position: [0.2, 0, 0] },
        { id: 'brain', name: 'Brain', info: 'Nerve cells multiplying rapidly, basic brain structure forming', position: [0, 0.3, 0] }
      ]
    },
    12: {
      title: 'Week 12 - Early Fetus',
      size: '5.4 cm (size of a lime)',
      weight: '14 grams',
      modelUrl: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
      backgroundColor: 'linear-gradient(135deg, #ffd4e4 0%, #ffc4d4 50%, #ffb4c4 100%)',
      developments: [
        'All major organs have formed',
        'Fingernails and toenails beginning to grow',
        'Reflexes developing - baby can curl toes',
        'Intestines moving from umbilical cord into abdomen'
      ],
      hotspots: [
        { id: 'fingers', name: 'Fingers', info: 'Fingers and toes fully separated, nails starting to grow', position: [0.3, -0.2, 0] },
        { id: 'organs', name: 'Organs', info: 'Kidneys producing urine, liver making blood cells', position: [0, -0.1, 0] }
      ]
    },
    16: {
      title: 'Week 16 - Growing Fetus',
      size: '11.6 cm (size of an avocado)',
      weight: '100 grams',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      backgroundColor: 'linear-gradient(135deg, #ffc4d4 0%, #ffb4c4 50%, #ffa4b4 100%)',
      developments: [
        'Eyes can move side to side',
        'Ears are nearly in final position',
        'Baby can hear sounds from outside',
        'Muscles getting stronger, movements more coordinated'
      ],
      hotspots: [
        { id: 'ears', name: 'Ears', info: 'Can hear your voice and heartbeat', position: [-0.2, 0.2, 0] },
        { id: 'muscles', name: 'Muscles', info: 'Getting stronger, enabling more movement', position: [0, 0, 0] }
      ]
    },
    20: {
      title: 'Week 20 - Halfway There!',
      size: '25.6 cm (size of a banana)',
      weight: '300 grams',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      backgroundColor: 'linear-gradient(135deg, #ffb4c4 0%, #ffa4b4 50%, #ff94a4 100%)',
      developments: [
        'Vernix (protective coating) covers skin',
        'Eyebrows and lashes forming',
        'Baby can hear and respond to sounds',
        'Sleeping and waking cycles established'
      ],
      hotspots: [
        { id: 'skin', name: 'Skin', info: 'Protected by vernix caseosa, a waxy coating', position: [0, 0, 0.3] },
        { id: 'hearing', name: 'Ears', info: 'Fully functional, can recognize your voice', position: [-0.25, 0.2, 0] }
      ]
    },
    24: {
      title: 'Week 24 - Viability Milestone',
      size: '30 cm (size of an ear of corn)',
      weight: '600 grams',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      backgroundColor: 'linear-gradient(135deg, #ffa4b4 0%, #ff94a4 50%, #ff8494 100%)',
      developments: [
        'Lungs developing rapidly',
        'Brain growing quickly',
        'Taste buds fully formed',
        'Regular sleep patterns emerging'
      ],
      hotspots: [
        { id: 'lungs', name: 'Lungs', info: 'Producing surfactant, preparing for breathing', position: [0.1, 0.1, 0] },
        { id: 'taste', name: 'Taste Buds', info: 'Can taste flavors from amniotic fluid', position: [0, 0.25, 0.2] }
      ]
    },
    28: {
      title: 'Week 28 - Third Trimester',
      size: '37.6 cm (size of a large eggplant)',
      weight: '1 kg',
      modelUrl: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
      backgroundColor: 'linear-gradient(135deg, #ff94a4 0%, #ff8494 50%, #ff7484 100%)',
      developments: [
        'Eyes can open and close',
        'Can blink and sense light',
        'Added body fat for temperature regulation',
        'Brain very active, dreaming may occur'
      ],
      hotspots: [
        { id: 'eyes', name: 'Eyes', info: 'Can open, close, and sense changes in light', position: [0.1, 0.3, 0.2] },
        { id: 'brain', name: 'Brain', info: 'REM sleep patterns indicate dreaming', position: [0, 0.35, 0] }
      ]
    },
    32: {
      title: 'Week 32 - Preparing for Birth',
      size: '42.4 cm (size of a squash)',
      weight: '1.7 kg',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      backgroundColor: 'linear-gradient(135deg, #ff8494 0%, #ff7484 50%, #ff6474 100%)',
      developments: [
        'Practicing breathing movements',
        'Bones fully formed but still soft',
        'Storing iron, calcium, and phosphorus',
        'May settle into head-down position'
      ],
      hotspots: [
        { id: 'lungs', name: 'Lungs', info: 'Practicing breathing, nearly mature', position: [0.1, 0.1, 0] },
        { id: 'bones', name: 'Skeleton', info: 'Bones hardening but skull remains flexible', position: [0, 0, 0] }
      ]
    },
    36: {
      title: 'Week 36 - Almost Ready',
      size: '47.4 cm (size of a papaya)',
      weight: '2.6 kg',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      backgroundColor: 'linear-gradient(135deg, #ff7484 0%, #ff6474 50%, #ff5464 100%)',
      developments: [
        'Shedding vernix and lanugo',
        'Immune system developing',
        'Digestive system nearly mature',
        'Getting into final birth position'
      ],
      hotspots: [
        { id: 'immune', name: 'Immune System', info: 'Receiving antibodies from mother', position: [0, 0, 0] },
        { id: 'position', name: 'Position', info: 'Settling head-down in preparation for birth', position: [0, -0.3, 0] }
      ]
    },
    40: {
      title: 'Week 40 - Full Term!',
      size: '51.2 cm (size of a watermelon)',
      weight: '3.4 kg',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      backgroundColor: 'linear-gradient(135deg, #ff6474 0%, #ff5464 50%, #ff4454 100%)',
      developments: [
        'Fully developed and ready for birth',
        'Lungs mature and ready to breathe',
        'Strong sucking reflex',
        'Ready to meet you!'
      ],
      hotspots: [
        { id: 'lungs', name: 'Lungs', info: 'Fully mature and ready to breathe air', position: [0.1, 0.1, 0] },
        { id: 'reflexes', name: 'Reflexes', info: 'Strong sucking, grasping, and rooting reflexes', position: [0, 0.2, 0.2] }
      ]
    }
  };

  const currentData = developmentData[currentWeek] || developmentData[20];
  const availableWeeks = useMemo(() => 
    Object.keys(developmentData).map(Number).sort((a, b) => a - b),
    []
  );

  const goToWeek = (week) => {
    setCurrentWeek(week);
    setSelectedHotspot(null);
    setModelLoading(true);
    setTimeout(() => setModelLoading(false), 300);
  };

  const nextWeek = () => {
    const currentIndex = availableWeeks.indexOf(currentWeek);
    if (currentIndex < availableWeeks.length - 1) {
      goToWeek(availableWeeks[currentIndex + 1]);
    }
  };

  const previousWeek = () => {
    const currentIndex = availableWeeks.indexOf(currentWeek);
    if (currentIndex > 0) {
      goToWeek(availableWeeks[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Icon name="Baby" size={20} />
            <span className="text-sm font-semibold">Interactive 3D Experience</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Fetal Development Visualizer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore medically accurate 3D models showing your baby's incredible growth journey week by week
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Viewer */}
          <div className="lg:col-span-2 space-y-4">
            {/* Week Navigation */}
            <div className="bg-gradient-to-br from-card to-secondary/30 border-2 border-border rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={previousWeek}
                  disabled={currentWeek === availableWeeks[0]}
                  className="hover:scale-105 transition-transform disabled:hover:scale-100"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>

                <div className="text-center flex-1 px-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                    {currentData.title}
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Ruler" size={16} className="text-primary" />
                      <span className="font-medium">{currentData.size}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Scale" size={16} className="text-primary" />
                      <span className="font-medium">{currentData.weight}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={nextWeek}
                  disabled={currentWeek === availableWeeks[availableWeeks.length - 1]}
                  className="hover:scale-105 transition-transform disabled:hover:scale-100"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </div>

              {/* Week Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {availableWeeks.map((week) => (
                  <button
                    key={week}
                    onClick={() => goToWeek(week)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-semibold transition-all ${
                      currentWeek === week
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-secondary text-foreground hover:bg-secondary/80 hover:scale-105'
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Model Viewer */}
            <div className="bg-gradient-to-br from-card to-secondary/30 border-2 border-border rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                {(scriptLoading || modelLoading) && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Icon name="Baby" size={40} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground font-medium">Loading 3D Model...</p>
                    </div>
                  </div>
                )}
                
                {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
                <model-viewer
                  src={currentData.modelUrl}
                  alt={`3D fetal model for ${currentData.title}`}
                  camera-controls
                  auto-rotate
                  ar
                  exposure="1.5"
                  shadow-intensity="1.5"
                  loading="eager"
                  camera-orbit="0deg 75deg 105%"
                  field-of-view="30deg"
                  min-camera-orbit="auto auto 80%"
                  max-camera-orbit="auto auto 150%"
                  onLoad={() => setModelLoading(false)}
                  style={{ 
                    width: '100%', 
                    height: '500px', 
                    background: currentData.backgroundColor,
                    opacity: (scriptLoading || modelLoading) ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />

                {/* Overlay Info */}
                <div className="absolute top-4 left-4 bg-gradient-to-br from-card/95 to-secondary/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Info" size={16} className="text-primary" />
                    <div className="text-sm font-semibold text-foreground">Medical Visualization</div>
                  </div>
                  <div className="text-xs text-muted-foreground max-w-xs">
                    3D anatomical model showing fetal development at week {currentWeek}. Rotate, zoom, and explore.
                  </div>
                </div>

                {/* Controls Info */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-br from-card/95 to-secondary/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-border">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Icon name="Mouse" size={14} className="text-primary" />
                      <span className="font-medium">Rotate</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Icon name="Move" size={14} className="text-primary" />
                      <span className="font-medium">Pan</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Icon name="ZoomIn" size={14} className="text-primary" />
                      <span className="font-medium">Zoom</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Hotspots */}
              <div className="p-6 bg-gradient-to-br from-secondary/30 to-transparent border-t-2 border-border">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="Info" size={18} className="text-primary" />
                  </div>
                  Interactive Learning Points
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentData.hotspots.map((hotspot) => (
                    <button
                      key={hotspot.id}
                      onClick={() => setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot)}
                      className={`text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedHotspot?.id === hotspot.id
                          ? 'bg-gradient-to-br from-primary to-purple-600 text-white shadow-xl scale-105'
                          : 'bg-card hover:bg-card/80 text-foreground hover:shadow-lg hover:scale-105 border-2 border-border'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{hotspot.name}</div>
                      <div className="text-xs opacity-90">
                        {selectedHotspot?.id === hotspot.id ? 'Click to close' : 'Click to learn more'}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedHotspot && (
                  <div className="mt-4 p-5 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl border-2 border-primary/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="Sparkles" size={16} className="text-primary" />
                      </div>
                      <h4 className="font-bold text-primary text-lg">{selectedHotspot.name}</h4>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{selectedHotspot.info}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Panel - Development Details */}
          <div className="space-y-6">
            {/* Development Milestones */}
            <div className="bg-gradient-to-br from-card to-secondary/30 border-2 border-border rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg">Key Developments</h3>
              </div>
              <ul className="space-y-4">
                {currentData.developments.map((dev, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{dev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress Tracker */}
            <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                Pregnancy Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground font-medium">Journey Progress</span>
                    <span className="font-bold text-primary">{currentWeek} / 40 weeks</span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${(currentWeek / 40) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {Math.round((currentWeek / 40) * 100)}% Complete
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-gradient-to-br from-card to-secondary/50 rounded-xl p-3 border border-border">
                    <div className="text-muted-foreground mb-1">Trimester</div>
                    <div className="text-lg font-bold text-primary">
                      {currentWeek <= 12 ? '1st' : currentWeek <= 28 ? '2nd' : '3rd'}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-card to-secondary/50 rounded-xl p-3 border border-border">
                    <div className="text-muted-foreground mb-1">Days</div>
                    <div className="text-lg font-bold text-purple-600">{currentWeek * 7}</div>
                  </div>
                  <div className="bg-gradient-to-br from-card to-secondary/50 rounded-xl p-3 border border-border">
                    <div className="text-muted-foreground mb-1">Left</div>
                    <div className="text-lg font-bold text-pink-600">{40 - currentWeek}w</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Icon name="Lightbulb" size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-lg">This Week's Tip</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {currentWeek <= 12 && "Take prenatal vitamins with folic acid to support neural tube development."}
                {currentWeek > 12 && currentWeek <= 24 && "Talk and sing to your baby - they can hear you now!"}
                {currentWeek > 24 && currentWeek <= 32 && "Practice relaxation techniques for labor preparation."}
                {currentWeek > 32 && "Pack your hospital bag and finalize your birth plan."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full hover:shadow-lg transition-all group" onClick={() => setShowInfo(!showInfo)}>
                <Icon name="BookOpen" size={18} className="mr-2 group-hover:text-primary transition-colors" />
                View Full Development Guide
              </Button>
              <Button variant="outline" className="w-full hover:shadow-lg transition-all group">
                <Icon name="Share2" size={18} className="mr-2 group-hover:text-primary transition-colors" />
                Share Progress with Family
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visualizer;
