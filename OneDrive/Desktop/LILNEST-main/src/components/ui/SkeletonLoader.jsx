import React from 'react';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="bg-card rounded-xl p-5 shadow-soft border border-border animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-secondary/50 rounded-xl" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-secondary/50 rounded w-2/3" />
            <div className="h-4 bg-secondary/50 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-4 w-16 bg-secondary/50 rounded" />
              <div className="h-4 w-16 bg-secondary/50 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-secondary/50 rounded w-full" />
        <div className="h-4 bg-secondary/50 rounded w-5/6" />
        <div className="h-4 bg-secondary/50 rounded w-4/6" />
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className="w-full h-64 bg-secondary/50 rounded-xl animate-pulse" />
    );
  }

  return null;
};

export default SkeletonLoader;
