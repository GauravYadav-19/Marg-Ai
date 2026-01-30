'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OverallProgressCardProps {
  totalTopics: number;
  completedTopics: number;
  currentStreak: number;
  totalTimeSpent: number;
}

const OverallProgressCard = ({
  totalTopics,
  completedTopics,
  currentStreak,
  totalTimeSpent,
}: OverallProgressCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const percentage = Math.round((completedTopics / totalTopics) * 100);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        setDisplayPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [percentage, isHydrated]);

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

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-6 glow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              Overall Progress
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-heading font-bold text-primary">
                0
              </span>
              <span className="text-xl font-caption text-muted-foreground">
                %
              </span>
            </div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-muted-foreground w-0 transition-all duration-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="CheckCircleIcon" size={20} variant="outline" />
                <span className="text-sm font-caption">Completed</span>
              </div>
              <span className="text-2xl font-heading font-semibold text-foreground">
                0 / 0
              </span>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="FireIcon" size={20} variant="outline" />
                <span className="text-sm font-caption">Current Streak</span>
              </div>
              <span className="text-2xl font-heading font-semibold text-foreground">
                0 days
              </span>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="ClockIcon" size={20} variant="outline" />
                <span className="text-sm font-caption">Time Spent</span>
              </div>
              <span className="text-2xl font-heading font-semibold text-foreground">
                0h
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Overall Progress
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-heading font-bold text-primary">
              {displayPercentage}
            </span>
            <span className="text-xl font-caption text-muted-foreground">%</span>
          </div>
        </div>

        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 ease-out ${getProgressGlow()}`}
            style={{ width: `${displayPercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="CheckCircleIcon" size={20} variant="outline" />
              <span className="text-sm font-caption">Completed</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {completedTopics} / {totalTopics}
            </span>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="FireIcon" size={20} variant="outline" />
              <span className="text-sm font-caption">Current Streak</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {currentStreak} days
            </span>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="ClockIcon" size={20} variant="outline" />
              <span className="text-sm font-caption">Time Spent</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {totalTimeSpent}h
            </span>
          </div>
        </div>

        {percentage === 100 && (
          <div className="flex items-center gap-3 p-4 bg-success/10 border border-success rounded-md animate-fade-in">
            <Icon name="TrophyIcon" size={24} variant="solid" className="text-success" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-heading font-semibold text-success">
                Congratulations! 🎉
              </span>
              <span className="text-sm font-caption text-foreground">
                You've completed your entire learning roadmap!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallProgressCard;