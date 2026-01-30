'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Resource {
  type: string;
  title: string;
  url: string;
}

interface Step {
  id: string;
  topic: string;
  importance: string;
  estimatedHours: number;
  resources: Resource[];
  completed: boolean;
  completedAt?: string;
  notRequired?: boolean;
}

interface Week {
  weekNumber: number;
  steps: Step[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  weeks: Week[];
}

interface PhaseCardProps {
  phase: Phase;
  phaseIndex: number;
  onStepToggle: (phaseId: string, stepId: string) => void;
}

const PhaseCard = ({ phase, phaseIndex, onStepToggle }: PhaseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(phaseIndex === 0);

  const totalSteps = phase.weeks.reduce((acc, week) => acc + week.steps.length, 0);
  const completedSteps = phase.weeks.reduce(
    (acc, week) => acc + week.steps.filter((step) => step.completed).length,
    0
  );
  const phaseProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const getProgressColor = () => {
    if (phaseProgress >= 75) return 'bg-success';
    if (phaseProgress >= 50) return 'bg-primary';
    if (phaseProgress >= 25) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden transition-smooth hover:glow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-smooth hover:bg-muted/30"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary font-heading font-semibold text-sm">
              {phaseIndex + 1}
            </span>
            <h3 className="text-xl font-heading font-semibold text-foreground">
              {phase.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="ClockIcon" size={14} variant="outline" />
              {phase.duration}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="BookOpenIcon" size={14} variant="outline" />
              {totalSteps} steps
            </span>
            <span className="flex items-center gap-1">
              <Icon name="CheckCircleIcon" size={14} variant="outline" />
              {completedSteps}/{totalSteps} completed
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <div className="flex flex-col items-end gap-2">
            <span className="text-2xl font-heading font-semibold text-primary">
              {phaseProgress}%
            </span>
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor()} transition-all duration-500`}
                style={{ width: `${phaseProgress}%` }}
              />
            </div>
          </div>
          <Icon
            name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={24}
            variant="outline"
            className="text-muted-foreground"
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          {phase.prerequisites.length > 0 && (
            <div className="mt-4 p-4 bg-muted/30 rounded-md">
              <div className="flex items-start gap-2">
                <Icon
                  name="InformationCircleIcon"
                  size={20}
                  variant="outline"
                  className="text-primary mt-0.5"
                />
                <div>
                  <p className="text-sm font-caption font-medium text-foreground mb-1">
                    Prerequisites:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {phase.prerequisites.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-6">
            {phase.weeks.map((week) => (
              <div key={week.weekNumber} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm font-caption font-medium text-muted-foreground px-3">
                    Week {week.weekNumber}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-3">
                  {week.steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-md border transition-smooth ${
                        step.notRequired
                          ? 'bg-muted/20 border-muted opacity-60'
                          : step.completed
                          ? 'bg-success/5 border-success/30' :'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onStepToggle(phase.id, step.id)}
                          disabled={step.notRequired}
                          className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 transition-smooth ${
                            step.notRequired
                              ? 'border-muted cursor-not-allowed'
                              : step.completed
                              ? 'bg-success border-success' :'border-muted-foreground hover:border-primary'
                          }`}
                        >
                          {step.completed && (
                            <Icon
                              name="CheckIcon"
                              size={16}
                              variant="solid"
                              className="text-success-foreground"
                            />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4
                              className={`text-base font-heading font-medium ${
                                step.notRequired
                                  ? 'text-muted-foreground line-through'
                                  : 'text-foreground'
                              }`}
                            >
                              {step.topic}
                            </h4>
                            <span className="text-sm font-caption text-muted-foreground whitespace-nowrap">
                              {step.estimatedHours}h
                            </span>
                          </div>

                          {step.notRequired ? (
                            <div className="flex items-center gap-2 mb-2">
                              <Icon
                                name="XCircleIcon"
                                size={16}
                                variant="outline"
                                className="text-muted-foreground"
                              />
                              <p className="text-sm text-muted-foreground italic">
                                Not required for your specific goal
                              </p>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm text-muted-foreground mb-3">
                                {step.importance}
                              </p>

                              {step.resources.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-xs font-caption font-medium text-foreground">
                                    Recommended Resources:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.resources.map((resource, idx) => (
                                      <a
                                        key={idx}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-xs font-caption font-medium transition-smooth hover:bg-primary/20"
                                      >
                                        <Icon
                                          name={
                                            resource.type === 'video' ?'PlayCircleIcon'
                                              : resource.type === 'article' ?'DocumentTextIcon' :'BookOpenIcon'
                                          }
                                          size={14}
                                          variant="outline"
                                        />
                                        {resource.title}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {step.completed && step.completedAt && (
                                <p className="text-xs text-success mt-2">
                                  Completed on {step.completedAt}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseCard;