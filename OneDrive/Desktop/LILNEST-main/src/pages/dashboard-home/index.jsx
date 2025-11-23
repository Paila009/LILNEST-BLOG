import React from 'react';
import Header from '../../components/ui/Header';
import WellnessOverviewPanel from './components/WellnessOverviewPanel';
import QuickActionsGrid from './components/QuickActionsGrid';
import MindfulnessFeed from './components/MindfulnessFeed';
import StatusIndicatorPanel from './components/StatusIndicatorPanel';
import HydrationWidget from '../../components/ui/HydrationWidget';

const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-background theme-transition">
      <Header />
      
      {/* Main Content - Simplified layout */}
      <main className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        {/* Welcome Section - Simplified */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            {new Date()?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Dashboard Grid - Simplified */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <WellnessOverviewPanel />
            <QuickActionsGrid />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <MindfulnessFeed />
            <StatusIndicatorPanel />
            <HydrationWidget />
          </div>
        </div>

        {/* Stats Section - Simplified */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg shadow-soft p-4 theme-transition">
            <div className="text-lg font-semibold text-foreground">85%</div>
            <div className="text-sm text-muted-foreground">Focus Quality</div>
          </div>

          <div className="bg-card rounded-lg shadow-soft p-4 theme-transition">
            <div className="text-lg font-semibold text-foreground">12/15</div>
            <div className="text-sm text-muted-foreground">Weekly Goal</div>
          </div>

          <div className="bg-card rounded-lg shadow-soft p-4 theme-transition">
            <div className="text-lg font-semibold text-foreground">4.2h</div>
            <div className="text-sm text-muted-foreground">Deep Work</div>
          </div>

          <div className="bg-card rounded-lg shadow-soft p-4 theme-transition">
            <div className="text-lg font-semibold text-foreground">Level 3</div>
            <div className="text-sm text-muted-foreground">Garden</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;