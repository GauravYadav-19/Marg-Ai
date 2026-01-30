'use client';

import Icon from '@/components/ui/AppIcon';

interface SummaryStepProps {
  formData: {
    goal: string;
    level: string;
    hoursPerDay: number;
    deadline: string;
    languages: string[];
    focusAreas: string[];
  };
  onEdit: (step: number) => void;
}

const SummaryStep = ({ formData, onEdit }: SummaryStepProps) => {
  const goalLabels: Record<string, string> = {
    'faang-sde': 'FAANG SDE',
    'ai-engineer': 'AI Engineer',
    'web-developer': 'Web Developer',
    'hackathon-builder': 'Hackathon Builder'
  };

  const levelLabels: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  };

  const languageLabels: Record<string, string> = {
    cpp: 'C++',
    python: 'Python',
    javascript: 'JavaScript'
  };

  const focusAreaLabels: Record<string, string> = {
    ai: 'AI/ML',
    web: 'Web Development',
    'core-cs': 'Core CS'
  };

  const formatDeadline = (deadline: string) => {
    if (!deadline) return 'No deadline set';
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const summaryItems = [
    {
      icon: 'BriefcaseIcon',
      label: 'Career Goal',
      value: goalLabels[formData.goal] || 'Not selected',
      step: 0
    },
    {
      icon: 'AcademicCapIcon',
      label: 'Skill Level',
      value: levelLabels[formData.level] || 'Not selected',
      step: 1
    },
    {
      icon: 'ClockIcon',
      label: 'Time Commitment',
      value: `${formData.hoursPerDay} ${formData.hoursPerDay === 1 ? 'hour' : 'hours'} per day`,
      step: 2
    },
    {
      icon: 'CalendarIcon',
      label: 'Target Deadline',
      value: formatDeadline(formData.deadline),
      step: 2
    },
    {
      icon: 'CodeBracketIcon',
      label: 'Languages',
      value: formData.languages.length > 0
        ? formData.languages.map(lang => languageLabels[lang]).join(', ')
        : 'None selected',
      step: 3
    },
    {
      icon: 'CpuChipIcon',
      label: 'Focus Areas',
      value: formData.focusAreas.length > 0
        ? formData.focusAreas.map(area => focusAreaLabels[area]).join(', ')
        : 'None selected',
      step: 3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Review your preferences
        </h2>
        <p className="text-base font-caption text-muted-foreground">
          Make sure everything looks good before we generate your roadmap
        </p>
      </div>

      <div className="space-y-3">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-card hover:bg-muted transition-smooth"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted text-muted-foreground">
                  <Icon name={item.icon as any} size={20} variant="outline" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-caption font-medium text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-base font-heading font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onEdit(item.step)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-caption text-primary hover:bg-primary/10 transition-smooth"
              >
                <Icon name="PencilIcon" size={16} variant="outline" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Icon name="SparklesIcon" size={20} variant="outline" className="text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-caption font-medium text-foreground">
              Ready to generate your personalized roadmap
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              Our AI will create a step-by-step learning path tailored to your goals, skill level, and time commitment. This usually takes 10-15 seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;