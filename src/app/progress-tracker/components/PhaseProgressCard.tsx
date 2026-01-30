'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProgressIndicator from '@/components/common/ProgressIndicator';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  timeSpent: number;
  completedAt?: string;
}

interface Phase {
  id: string;
  name: string;
  topics: Topic[];
}

interface PhaseProgressCardProps {
  phase: Phase;
  onTopicToggle: (phaseId: string, topicId: string) => void;
}

const PhaseProgressCard = ({ phase, onTopicToggle }: PhaseProgressCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedTopics = phase.topics.filter((t) => t.completed).length;
  const totalTopics = phase.topics.length;
  const percentage = Math.round((completedTopics / totalTopics) * 100);

  const getPhaseIcon = () => {
    if (percentage === 100) return 'CheckCircleIcon';
    if (percentage > 0) return 'ClockIcon';
    return 'PlayIcon';
  };

  const getPhaseIconVariant = () => {
    return percentage === 100 ? 'solid' : 'outline';
  };

  const getPhaseIconColor = () => {
    if (percentage === 100) return 'text-success';
    if (percentage > 0) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Icon
              name={getPhaseIcon() as any}
              size={24}
              variant={getPhaseIconVariant() as any}
              className={getPhaseIconColor()}
            />
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {phase.name}
              </h3>
              <span className="text-sm font-caption text-muted-foreground">
                {completedTopics} of {totalTopics} topics completed
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label={isExpanded ? 'Collapse phase' : 'Expand phase'}
          >
            <Icon
              name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              size={20}
              variant="outline"
              className="text-muted-foreground"
            />
          </button>
        </div>

        <ProgressIndicator
          completionData={{
            current: completedTopics,
            total: totalTopics,
            percentage,
          }}
          displayMode="summary"
          showLabel={false}
        />

        {isExpanded && (
          <div className="flex flex-col gap-2 pt-2 border-t border-border animate-fade-in">
            {phase.topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-smooth"
              >
                <button
                  onClick={() => onTopicToggle(phase.id, topic.id)}
                  className="flex-shrink-0"
                  aria-label={
                    topic.completed
                      ? `Mark ${topic.name} as incomplete`
                      : `Mark ${topic.name} as complete`
                  }
                >
                  <Icon
                    name={topic.completed ? 'CheckCircleIcon' : 'CircleStackIcon'}
                    size={20}
                    variant={topic.completed ? 'solid' : 'outline'}
                    className={
                      topic.completed ? 'text-success' : 'text-muted-foreground'
                    }
                  />
                </button>
                <div className="flex flex-col gap-1 flex-1">
                  <span
                    className={`text-sm font-caption font-medium ${
                      topic.completed
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {topic.name}
                  </span>
                  {topic.completed && topic.completedAt && (
                    <span className="text-xs font-caption text-muted-foreground">
                      Completed on {topic.completedAt} • {topic.timeSpent}h spent
                    </span>
                  )}
                </div>
                {topic.completed && (
                  <Icon
                    name="CheckBadgeIcon"
                    size={16}
                    variant="solid"
                    className="text-success"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaseProgressCard;