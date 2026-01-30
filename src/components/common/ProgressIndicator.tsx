'use client';

import { useEffect, useState } from 'react';

type DisplayMode = 'form' | 'summary' | 'detailed';

interface CompletionData {
  current: number;
  total: number;
  percentage?: number;
  label?: string;
}

interface ProgressIndicatorProps {
  completionData: CompletionData;
  displayMode?: DisplayMode;
  className?: string;
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressIndicator = ({
  completionData,
  displayMode = 'summary',
  className = '',
  showLabel = true,
  animated = true,
}: ProgressIndicatorProps) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const percentage =
    completionData.percentage ??
    Math.round((completionData.current / completionData.total) * 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercentage(percentage);
    }
  }, [percentage, animated]);

  const getProgressColor = () => {
    if (percentage >= 75) return 'bg-success';
    if (percentage >= 50) return 'bg-primary';
    if (percentage >= 25) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  const getProgressGlow = () => {
    if (percentage >= 75) return 'shadow-[0_0_20px_rgba(34,197,94,0.3)]';
    if (percentage >= 50) return 'shadow-[0_0_20px_rgba(16,185,129,0.3)]';
    if (percentage >= 25) return 'shadow-[0_0_20px_rgba(245,158,11,0.3)]';
    return '';
  };

  if (displayMode === 'form') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 ease-out ${getProgressGlow()}`}
            style={{ width: `${displayPercentage}%` }}
          />
        </div>
        <span className="text-sm font-caption font-medium text-muted-foreground min-w-[3rem] text-right">
          {completionData.current} / {completionData.total}
        </span>
      </div>
    );
  }

  if (displayMode === 'summary') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {showLabel && completionData.label && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption font-medium text-foreground">
              {completionData.label}
            </span>
            <span className="text-sm font-caption font-medium text-primary">
              {displayPercentage}%
            </span>
          </div>
        )}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 ease-out ${getProgressGlow()}`}
            style={{ width: `${displayPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {showLabel && completionData.label && (
            <span className="text-base font-heading font-medium text-foreground">
              {completionData.label}
            </span>
          )}
          <span className="text-sm font-caption text-muted-foreground">
            {completionData.current} of {completionData.total} completed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-heading font-semibold text-primary">
            {displayPercentage}
          </span>
          <span className="text-lg font-caption text-muted-foreground">%</span>
        </div>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-500 ease-out ${getProgressGlow()}`}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
      {percentage === 100 && (
        <div className="flex items-center gap-2 text-success animate-fade-in">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-caption font-medium">
            Congratulations! You've completed this milestone.
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;