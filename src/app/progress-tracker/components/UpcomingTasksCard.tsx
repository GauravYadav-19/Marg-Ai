import Icon from '@/components/ui/AppIcon';

interface UpcomingTask {
  id: string;
  name: string;
  phaseName: string;
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface UpcomingTasksCardProps {
  tasks: UpcomingTask[];
}

const UpcomingTasksCard = ({ tasks }: UpcomingTasksCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 border-error';
      case 'medium':
        return 'bg-warning/10 border-warning';
      case 'low':
        return 'bg-primary/10 border-primary';
      default:
        return 'bg-muted border-border';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Upcoming Tasks
          </h2>
          <span className="text-sm font-caption text-muted-foreground">
            {tasks.length} tasks remaining
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Icon
              name="CheckBadgeIcon"
              size={48}
              variant="solid"
              className="text-success"
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-heading font-medium text-foreground">
                All caught up!
              </span>
              <span className="text-sm font-caption text-muted-foreground text-center max-w-md">
                You've completed all your tasks. Great work!
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className={`flex items-start gap-4 p-4 rounded-md border transition-smooth hover:shadow-md ${getPriorityBg(
                  task.priority
                )}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <Icon
                    name="BookOpenIcon"
                    size={20}
                    variant="outline"
                    className={getPriorityColor(task.priority)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-heading font-medium text-foreground">
                        {task.name}
                      </span>
                      <span className="text-sm font-caption text-muted-foreground">
                        {task.phaseName}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-caption font-medium px-2 py-1 rounded ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="ClockIcon" size={16} variant="outline" />
                      <span className="text-xs font-caption">
                        ~{task.estimatedTime}h estimated
                      </span>
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="CalendarIcon" size={16} variant="outline" />
                        <span className="text-xs font-caption">
                          Due: {task.dueDate}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasksCard;