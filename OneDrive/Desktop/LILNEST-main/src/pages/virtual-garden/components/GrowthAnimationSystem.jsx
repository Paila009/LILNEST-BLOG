import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const GrowthAnimationSystem = ({ wellnessData, onAnimationComplete }) => {
  const [activeAnimations, setActiveAnimations] = useState([]);
  const [particles, setParticles] = useState([]);
  const [celebrationMode, setCelebrationMode] = useState(false);

  // Animation types
  const animationTypes = {
    SPROUT: 'sprout',
    GROW: 'grow',
    BLOOM: 'bloom',
    FLOURISH: 'flourish',
    ACHIEVEMENT: 'achievement',
    LEVEL_UP: 'levelUp'
  };

  // Particle effects
  const createParticles = useCallback((x, y, type, count = 8) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles?.push({
        id: `particle-${Date.now()}-${i}`,
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        decay: 0.02,
        type,
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Trigger growth animation
  const triggerGrowthAnimation = useCallback((elementId, animationType, position) => {
    const animation = {
      id: `anim-${Date.now()}`,
      elementId,
      type: animationType,
      position,
      startTime: Date.now(),
      duration: getAnimationDuration(animationType)
    };

    setActiveAnimations(prev => [...prev, animation]);
    
    // Create particles
    createParticles(position?.x, position?.y, animationType);

    // Auto-remove animation after duration
    setTimeout(() => {
      setActiveAnimations(prev => prev?.filter(a => a?.id !== animation?.id));
      onAnimationComplete?.(elementId, animationType);
    }, animation?.duration);
  }, [createParticles, onAnimationComplete]);

  // Get animation duration based on type
  const getAnimationDuration = (type) => {
    switch (type) {
      case animationTypes?.SPROUT: return 1500;
      case animationTypes?.GROW: return 2000;
      case animationTypes?.BLOOM: return 2500;
      case animationTypes?.FLOURISH: return 3000;
      case animationTypes?.ACHIEVEMENT: return 4000;
      case animationTypes?.LEVEL_UP: return 5000;
      default: return 2000;
    }
  };

  // Update particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev?.map(particle => ({
          ...particle,
          x: particle?.x + particle?.vx,
          y: particle?.y + particle?.vy,
          life: particle?.life - particle?.decay,
          rotation: particle?.rotation + 2
        }))?.filter(particle => particle?.life > 0)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Celebration mode for major achievements
  const triggerCelebration = useCallback(() => {
    setCelebrationMode(true);
    
    // Create celebration particles across the screen
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createParticles(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          animationTypes?.ACHIEVEMENT,
          3
        );
      }, i * 100);
    }

    setTimeout(() => {
      setCelebrationMode(false);
    }, 3000);
  }, [createParticles, animationTypes?.ACHIEVEMENT]);

  // Auto-trigger animations based on wellness data changes
  useEffect(() => {
    // Mock animation triggers based on data changes
    if (wellnessData?.focusStreak > 0 && wellnessData?.focusStreak % 7 === 0) {
      triggerGrowthAnimation('tree-1', animationTypes?.FLOURISH, { x: 200, y: 300 });
    }
    
    if (wellnessData?.meditationMinutes > 0 && wellnessData?.meditationMinutes % 30 === 0) {
      triggerGrowthAnimation('flower-1', animationTypes?.BLOOM, { x: 600, y: 400 });
    }
    
    if (wellnessData?.achievements > 0 && wellnessData?.achievements % 5 === 0) {
      triggerCelebration();
    }
  }, [wellnessData, triggerGrowthAnimation, triggerCelebration, animationTypes]);

  // Get particle icon based on type
  const getParticleIcon = (type) => {
    switch (type) {
      case animationTypes?.SPROUT: return 'Sprout';
      case animationTypes?.GROW: return 'Leaf';
      case animationTypes?.BLOOM: return 'Flower';
      case animationTypes?.FLOURISH: return 'Sparkles';
      case animationTypes?.ACHIEVEMENT: return 'Star';
      case animationTypes?.LEVEL_UP: return 'Crown';
      default: return 'Sparkles';
    }
  };

  // Get particle color based on type
  const getParticleColor = (type) => {
    switch (type) {
      case animationTypes?.SPROUT: return 'text-success';
      case animationTypes?.GROW: return 'text-primary';
      case animationTypes?.BLOOM: return 'text-accent';
      case animationTypes?.FLOURISH: return 'text-warning';
      case animationTypes?.ACHIEVEMENT: return 'text-warning';
      case animationTypes?.LEVEL_UP: return 'text-primary';
      default: return 'text-success';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Celebration Background */}
      {celebrationMode && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 animate-pulse"></div>
      )}
      {/* Active Animations */}
      {activeAnimations?.map((animation) => (
        <div
          key={animation?.id}
          className="absolute"
          style={{
            left: animation?.position?.x,
            top: animation?.position?.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Growth Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
          
          {/* Central Icon */}
          <div className="relative z-10 p-4 bg-card/80 backdrop-blur-sm rounded-full shadow-organic-lg animate-bounce">
            <Icon
              name={getParticleIcon(animation?.type)}
              size={32}
              className={`${getParticleColor(animation?.type)} animate-gentle-pulse`}
            />
          </div>

          {/* Animation Text */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-popover/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-organic">
            <span className="text-sm font-caption text-popover-foreground capitalize">
              {animation?.type}!
            </span>
          </div>
        </div>
      ))}
      {/* Floating Particles */}
      {particles?.map((particle) => (
        <div
          key={particle?.id}
          className="absolute pointer-events-none"
          style={{
            left: particle?.x,
            top: particle?.y,
            opacity: particle?.life,
            transform: `rotate(${particle?.rotation}deg) scale(${particle?.life})`,
            transition: 'all 0.1s ease-out'
          }}
        >
          <Icon
            name={getParticleIcon(particle?.type)}
            size={particle?.size}
            className={getParticleColor(particle?.type)}
          />
        </div>
      ))}
      {/* Growth Notification Toast */}
      {activeAnimations?.length > 0 && (
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-organic-lg animate-organic-grow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h4 className="font-heading font-medium text-foreground">
                Garden Growing!
              </h4>
              <p className="text-sm font-caption text-muted-foreground">
                Your wellness activities are nurturing growth
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Manual Animation Triggers (for testing) */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <button
          onClick={() => triggerGrowthAnimation('test', animationTypes?.SPROUT, { x: 400, y: 300 })}
          className="block px-3 py-1 bg-success/20 text-success rounded-lg text-xs font-caption hover:bg-success/30 transition-colors duration-200 pointer-events-auto"
        >
          Test Sprout
        </button>
        <button
          onClick={() => triggerGrowthAnimation('test', animationTypes?.BLOOM, { x: 500, y: 300 })}
          className="block px-3 py-1 bg-accent/20 text-accent rounded-lg text-xs font-caption hover:bg-accent/30 transition-colors duration-200 pointer-events-auto"
        >
          Test Bloom
        </button>
        <button
          onClick={triggerCelebration}
          className="block px-3 py-1 bg-warning/20 text-warning rounded-lg text-xs font-caption hover:bg-warning/30 transition-colors duration-200 pointer-events-auto"
        >
          Celebrate
        </button>
      </div>
    </div>
  );
};

export default GrowthAnimationSystem;