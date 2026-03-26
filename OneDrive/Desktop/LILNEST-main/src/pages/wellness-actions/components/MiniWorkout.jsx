import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MiniWorkout = () => {
  const [intensity, setIntensity] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const intensityLevels = [
    { value: 'low', label: 'Low', icon: 'Feather', color: 'text-green-500' },
    { value: 'moderate', label: 'Moderate', icon: 'Activity', color: 'text-yellow-500' },
    { value: 'high', label: 'High', icon: 'Zap', color: 'text-red-500' }
  ];

  const workoutTypes = {
    stretching: {
      name: 'Stretching',
      icon: 'Move',
      exercises: [
        { name: 'Neck Rolls', duration: 30 },
        { name: 'Shoulder Circles', duration: 30 },
        { name: 'Wrist Stretches', duration: 30 },
        { name: 'Ankle Rotations', duration: 30 }
      ]
    },
    yoga: {
      name: 'Desk Yoga',
      icon: 'User',
      exercises: [
        { name: 'Seated Cat-Cow', duration: 45 },
        { name: 'Chair Pigeon', duration: 45 },
        { name: 'Seated Twist', duration: 45 },
        { name: 'Wrist Release', duration: 45 }
      ]
    },
    deskWorkout: {
      name: 'Desk Workout',
      icon: 'Box',
      exercises: [
        { name: 'Chair Squats', duration: 30 },
        { name: 'Desk Push-ups', duration: 30 },
        { name: 'Standing Calf Raises', duration: 30 },
        { name: 'Seated Leg Raises', duration: 30 }
      ]
    },
    cardio: {
      name: 'Quick Cardio',
      icon: 'Heart',
      exercises: [
        { name: 'Jumping Jacks', duration: 30 },
        { name: 'High Knees', duration: 30 },
        { name: 'Mountain Climbers', duration: 30 },
        { name: 'Burpees', duration: 30 }
      ]
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
        // Update calories burned based on intensity
        const caloriesPerSecond = {
          low: 0.05,
          moderate: 0.08,
          high: 0.12
        }[intensity];
        setCaloriesBurned(cal => cal + caloriesPerSecond);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, intensity]);

  const handleStartWorkout = (type) => {
    setSelectedWorkout(workoutTypes[type]);
    const totalDuration = workoutTypes[type].exercises.reduce((acc, curr) => acc + curr.duration, 0);
    setTimeLeft(totalDuration);
    setIsActive(true);
    setCaloriesBurned(0);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Mini Workout</h2>
        <p className="text-muted-foreground">Quick 5-10 minute activity boost</p>
      </div>

      {!intensity ? (
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">Choose your intensity</h3>
          <div className="grid grid-cols-3 gap-4">
            {intensityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setIntensity(level.value)}
                className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all text-center space-y-2"
              >
                <Icon name={level.icon} className={`w-8 h-8 mx-auto ${level.color}`} />
                <span className="block font-medium">{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : !selectedWorkout ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Select workout type</h3>
            <Button
              variant="ghost"
              onClick={() => setIntensity('')}
              className="text-sm"
            >
              <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(workoutTypes).map(([key, workout]) => (
              <button
                key={key}
                onClick={() => handleStartWorkout(key)}
                className="p-4 rounded-xl border-2 border-border hover:border-primary transition-all text-center space-y-2"
              >
                <Icon name={workout.icon} className="w-8 h-8 mx-auto text-primary" />
                <span className="block font-medium">{workout.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-muted-foreground">
              Calories burned: {Math.round(caloriesBurned)}
            </p>
          </div>

          <div className="space-y-4">
            {selectedWorkout.exercises.map((exercise, index) => {
              const isActive = Math.floor(timeLeft / exercise.duration) === index;
              return (
                <div
                  key={exercise.name}
                  className={`p-4 rounded-lg border ${
                    isActive ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{exercise.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {exercise.duration}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={() => {
              setSelectedWorkout(null);
              setIsActive(false);
              setTimeLeft(0);
            }}
            variant="outline"
            className="w-full"
          >
            End Workout
          </Button>
        </div>
      )}
    </div>
  );
};

export default MiniWorkout;