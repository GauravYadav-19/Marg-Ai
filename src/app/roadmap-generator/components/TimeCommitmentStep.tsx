'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimeCommitmentStepProps {
  hoursPerDay: number;
  deadline: string;
  onHoursChange: (hours: number) => void;
  onDeadlineChange: (deadline: string) => void;
}

const TimeCommitmentStep = ({
  hoursPerDay,
  deadline,
  onHoursChange,
  onDeadlineChange
}: TimeCommitmentStepProps) => {
  const [showDeadline, setShowDeadline] = useState(deadline !== '');

  const hourOptions = [
    { value: 1, label: '1 hour', description: 'Light learning' },
    { value: 2, label: '2 hours', description: 'Steady progress' },
    { value: 3, label: '3 hours', description: 'Focused growth' },
    { value: 4, label: '4+ hours', description: 'Intensive learning' }
  ];

  const handleDeadlineToggle = () => {
    if (showDeadline) {
      onDeadlineChange('');
    }
    setShowDeadline(!showDeadline);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          How much time can you commit?
        </h2>
        <p className="text-base font-caption text-muted-foreground">
          We'll create a realistic schedule based on your availability
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-caption font-medium text-foreground">
            Daily learning hours
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hourOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onHoursChange(option.value)}
                className={`p-4 rounded-lg border-2 transition-smooth text-left ${
                  hoursPerDay === option.value
                    ? 'border-primary bg-primary/5 glow-border' :'border-border bg-card hover:border-primary/50 hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-base font-heading font-semibold text-foreground">
                      {option.label}
                    </p>
                    <p className="text-sm font-caption text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  {hoursPerDay === option.value && (
                    <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-caption font-medium text-foreground">
              Target deadline (optional)
            </label>
            <button
              onClick={handleDeadlineToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-caption transition-smooth ${
                showDeadline
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={showDeadline ? 'CheckIcon' : 'PlusIcon'} size={16} variant="outline" />
              {showDeadline ? 'Added' : 'Add deadline'}
            </button>
          </div>

          {showDeadline && (
            <div className="space-y-2 animate-fade-in">
              <input
                type="date"
                value={deadline}
                onChange={(e) => onDeadlineChange(e.target.value)}
                min={getMinDate()}
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-card text-foreground font-caption focus:border-primary focus:outline-none transition-smooth"
              />
              <p className="text-xs font-caption text-muted-foreground flex items-center gap-1">
                <Icon name="InformationCircleIcon" size={14} variant="outline" />
                We'll optimize your roadmap to meet this deadline
              </p>
            </div>
          )}
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="LightBulbIcon" size={20} variant="outline" className="text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-caption font-medium text-foreground">
                Pro tip: Consistency beats intensity
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Learning {hoursPerDay} {hoursPerDay === 1 ? 'hour' : 'hours'} daily is more effective than cramming. We'll help you build a sustainable habit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeCommitmentStep;