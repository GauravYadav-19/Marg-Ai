'use client';

import Icon from '@/components/ui/AppIcon';
import ProgressIndicator from '@/components/common/ProgressIndicator';

interface PhaseStatus {
  id: string;
  title: string;
  progress: number;
  completed: number;
  total: number;
}

interface ProgressSidebarProps {
  overallProgress: number;
  totalSteps: number;
  completedSteps: number;
  phases: PhaseStatus[];
  onPhaseClick: (phaseId: string) => void;
}

const ProgressSidebar = ({
  overallProgress,
  totalSteps,
  completedSteps,
  phases,
  onPhaseClick,
}: ProgressSidebarProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Overall Progress
        </h3>
        <ProgressIndicator
          completionData={{
            current: completedSteps,
            total: totalSteps,
            percentage: overallProgress,
          }}
          displayMode="detailed"
          showLabel={false}
        />
      </div>

      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-caption font-medium text-foreground mb-4">
          Phase Status
        </h4>
        <div className="space-y-3">
          {phases.map((phase, index) => (
            <button
              key={phase.id}
              onClick={() => onPhaseClick(phase.id)}
              className="w-full text-left p-3 rounded-md bg-muted/30 transition-smooth hover:bg-muted/50 hover:glow-border"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-primary/10 text-primary font-heading font-semibold text-xs">
                  {index + 1}
                </span>
                <span className="text-sm font-caption font-medium text-foreground flex-1">
                  {phase.title}
                </span>
                {phase.progress === 100 && (
                  <Icon
                    name="CheckCircleIcon"
                    size={18}
                    variant="solid"
                    className="text-success"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      phase.progress >= 75
                        ? 'bg-success'
                        : phase.progress >= 50
                        ? 'bg-primary'
                        : phase.progress >= 25
                        ? 'bg-warning' :'bg-muted-foreground'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
                <span className="text-xs font-caption text-muted-foreground">
                  {phase.completed}/{phase.total}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6 mt-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="CalendarIcon" size={16} variant="outline" />
            <span className="font-caption">Started: Jan 15, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="ClockIcon" size={16} variant="outline" />
            <span className="font-caption">Est. Completion: Apr 30, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="FireIcon" size={16} variant="outline" />
            <span className="font-caption">7-day streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;