import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BreakActivityDisplay = ({ 
  activityType, 
  isActive, 
  sessionDuration, 
  timeRemaining,
  onComplete 
}) => {
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [postureStep, setPostureStep] = useState(0);
  const [eyeExerciseStep, setEyeExerciseStep] = useState(0);

  const breathingCycle = {
    inhale: { duration: 4000, next: 'hold' },
    hold: { duration: 2000, next: 'exhale' },
    exhale: { duration: 6000, next: 'pause' },
    pause: { duration: 1000, next: 'inhale' }
  };

  const postureSteps = [
    {
      title: "Shoulder Rolls",
      instruction: "Roll your shoulders backward 5 times, then forward 5 times",
      icon: "RotateCcw",
      duration: 15
    },
    {
      title: "Neck Stretch",
      instruction: "Gently tilt your head to each side, hold for 10 seconds",
      icon: "Move",
      duration: 20
    },
    {
      title: "Spine Alignment",
      instruction: "Sit up straight, imagine a string pulling you upward",
      icon: "ArrowUp",
      duration: 10
    },
    {
      title: "Deep Breath",
      instruction: "Take 3 deep breaths and return to work refreshed",
      icon: "Wind",
      duration: 15
    }
  ];

  const eyeExercises = [
    {
      title: "Look Away",
      instruction: "Look at something 20 feet away for 20 seconds",
      icon: "Eye",
      duration: 20
    },
    {
      title: "Blink Exercise",
      instruction: "Blink slowly 10 times to refresh your eyes",
      icon: "EyeOff",
      duration: 10
    },
    {
      title: "Eye Circles",
      instruction: "Move your eyes in slow circles - 5 clockwise, 5 counter-clockwise",
      icon: "RotateCw",
      duration: 15
    },
    {
      title: "Palm Rest",
      instruction: "Cover your eyes with palms for 15 seconds of darkness",
      icon: "Hand",
      duration: 15
    }
  ];

  const stretchingExercises = [
    {
      title: "Arm Stretch",
      instruction: "Extend arms overhead, interlace fingers, stretch upward",
      icon: "ArrowUp",
      duration: 15
    },
    {
      title: "Side Bend",
      instruction: "Lean gently to each side, feel the stretch along your torso",
      icon: "Move",
      duration: 20
    },
    {
      title: "Wrist Circles",
      instruction: "Rotate wrists in circles, then flex fingers",
      icon: "RotateCw",
      duration: 10
    },
    {
      title: "Ankle Rolls",
      instruction: "Lift feet slightly and rotate ankles to improve circulation",
      icon: "RotateCcw",
      duration: 15
    }
  ];

  // Breathing animation cycle
  useEffect(() => {
    if (activityType === 'breathing' && isActive) {
      const timer = setTimeout(() => {
        const currentPhase = breathingCycle?.[breathingPhase];
        setBreathingPhase(currentPhase?.next);
        
        if (breathingPhase === 'exhale') {
          setBreathingCount(prev => prev + 1);
        }
      }, breathingCycle?.[breathingPhase]?.duration);

      return () => clearTimeout(timer);
    }
  }, [breathingPhase, isActive, activityType]);

  // Auto-advance posture steps
  useEffect(() => {
    if (activityType === 'posture' && isActive && postureStep < postureSteps?.length - 1) {
      const timer = setTimeout(() => {
        setPostureStep(prev => prev + 1);
      }, postureSteps?.[postureStep]?.duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [postureStep, isActive, activityType]);

  // Auto-advance eye exercise steps
  useEffect(() => {
    if (activityType === 'eyes' && isActive && eyeExerciseStep < eyeExercises?.length - 1) {
      const timer = setTimeout(() => {
        setEyeExerciseStep(prev => prev + 1);
      }, eyeExercises?.[eyeExerciseStep]?.duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [eyeExerciseStep, isActive, activityType]);

  const renderBreathingActivity = () => (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div 
          className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-primary/30 flex items-center justify-center transition-all duration-1000 ease-in-out ${
            breathingPhase === 'inhale' ? 'scale-125 bg-primary/10' : 
            breathingPhase === 'hold' ? 'scale-125 bg-primary/20' :
            breathingPhase === 'exhale' ? 'scale-75 bg-primary/5' : 'scale-100 bg-primary/10'
          }`}
        >
          <Icon 
            name="Wind" 
            size={48} 
            className={`text-primary transition-all duration-1000 ${
              breathingPhase === 'inhale' || breathingPhase === 'hold' ? 'scale-110' : 'scale-90'
            }`}
          />
        </div>
        
        {/* Breathing rings */}
        <div className={`absolute inset-0 rounded-full border-2 border-primary/20 transition-all duration-1000 ${
          breathingPhase === 'inhale' ? 'scale-150' : 'scale-100'
        }`}></div>
        <div className={`absolute inset-0 rounded-full border border-primary/10 transition-all duration-1000 ${
          breathingPhase === 'exhale' ? 'scale-50' : 'scale-125'
        }`}></div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground capitalize">
          {breathingPhase === 'pause' ? 'Rest' : breathingPhase}
        </h3>
        <p className="text-lg text-muted-foreground">
          {breathingPhase === 'inhale' && "Breathe in slowly through your nose"}
          {breathingPhase === 'hold' && "Hold your breath gently"}
          {breathingPhase === 'exhale' && "Exhale slowly through your mouth"}
          {breathingPhase === 'pause' && "Brief pause before next breath"}
        </p>
        <div className="text-sm text-muted-foreground">
          Breath cycle: {breathingCount}
        </div>
      </div>
    </div>
  );

  const renderPostureActivity = () => {
    const currentStep = postureSteps?.[postureStep];
    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-secondary/10 border-4 border-secondary/30 flex items-center justify-center animate-gentle-pulse">
          <Icon name={currentStep?.icon} size={48} className="text-secondary" />
        </div>
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
            {currentStep?.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentStep?.instruction}
          </p>
          
          <div className="flex items-center justify-center space-x-2 mt-6">
            {postureSteps?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === postureStep ? 'bg-secondary scale-125' : 
                  index < postureStep ? 'bg-secondary/60' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderEyeActivity = () => {
    const currentExercise = eyeExercises?.[eyeExerciseStep];
    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-accent/10 border-4 border-accent/30 flex items-center justify-center animate-breathe">
          <Icon name={currentExercise?.icon} size={48} className="text-accent" />
        </div>
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
            {currentExercise?.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentExercise?.instruction}
          </p>
          
          <div className="flex items-center justify-center space-x-2 mt-6">
            {eyeExercises?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === eyeExerciseStep ? 'bg-accent scale-125' : 
                  index < eyeExerciseStep ? 'bg-accent/60' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStretchingActivity = () => {
    const currentStretch = stretchingExercises?.[Math.floor((sessionDuration - timeRemaining) / 15) % stretchingExercises?.length];
    
    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-success/10 border-4 border-success/30 flex items-center justify-center animate-organic-grow">
          <Icon name={currentStretch?.icon} size={48} className="text-success" />
        </div>
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
            {currentStretch?.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentStretch?.instruction}
          </p>
          
          <div className="text-sm text-muted-foreground mt-4">
            Hold for 15 seconds, then move to next stretch
          </div>
        </div>
      </div>
    );
  };

  const renderMeditationActivity = () => (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-primary/30 flex items-center justify-center animate-breathe">
          <Icon name="Brain" size={48} className="text-primary" />
        </div>
        
        {/* Meditation ripples */}
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Mindful Moment
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Close your eyes and focus on your breath. Let thoughts pass by like clouds in the sky.
        </p>
        <div className="text-sm text-muted-foreground italic">
          "In this moment, you are exactly where you need to be"
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {activityType === 'breathing' && renderBreathingActivity()}
        {activityType === 'posture' && renderPostureActivity()}
        {activityType === 'eyes' && renderEyeActivity()}
        {activityType === 'stretching' && renderStretchingActivity()}
        {activityType === 'meditation' && renderMeditationActivity()}
      </div>
    </div>
  );
};

export default BreakActivityDisplay;