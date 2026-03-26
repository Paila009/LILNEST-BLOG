import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MoodCheck from './components/MoodCheck';
import GratitudeJournal from './components/GratitudeJournal';
import HydrationTracker from './components/HydrationTracker';
import MiniWorkout from './components/MiniWorkout';
import SleepTracker from './components/SleepTracker';
import DailyAffirmation from './components/DailyAffirmation';

const WellnessActions = () => {
  const { actionType } = useParams();

  const renderComponent = () => {
    switch (actionType) {
      case 'mood-check':
        return <MoodCheck />;
      case 'gratitude':
        return <GratitudeJournal />;
      case 'hydration':
        return <HydrationTracker />;
      case 'workout':
        return <MiniWorkout />;
      case 'sleep':
        return <SleepTracker />;
      case 'affirmation':
        return <DailyAffirmation />;
      default:
        return <div>Feature not found</div>;
    }
  };

  const getTitle = () => {
    const titles = {
      'mood-check': 'Mood Check-in',
      'gratitude': 'Gratitude Journal',
      'hydration': 'Hydration Tracker',
      'workout': 'Mini Workout',
      'sleep': 'Sleep Tracker',
      'affirmation': 'Daily Affirmation'
    };
    return titles[actionType] || 'Wellness Action';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header title={getTitle()} />
      <div className="mt-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default WellnessActions;