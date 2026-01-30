'use client';

import Icon from '@/components/ui/AppIcon';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  outcomes: string[];
}

interface GoalSelectionStepProps {
  selectedGoal: string;
  onGoalSelect: (goalId: string) => void;
}

const GoalSelectionStep = ({ selectedGoal, onGoalSelect }: GoalSelectionStepProps) => {
  const careerPaths: CareerPath[] = [
    {
      id: 'faang-sde',
      title: 'FAANG SDE',
      description: 'Master data structures, algorithms, and system design for top tech companies',
      icon: 'BriefcaseIcon',
      outcomes: ['Crack coding interviews', 'Build scalable systems', 'Competitive programming']
    },
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      description: 'Deep learning, NLP, computer vision, and ML engineering fundamentals',
      icon: 'CpuChipIcon',
      outcomes: ['Build ML models', 'Deploy AI systems', 'Research & development']
    },
    {
      id: 'web-developer',
      title: 'Web Developer',
      description: 'Full-stack development with modern frameworks and best practices',
      icon: 'CodeBracketIcon',
      outcomes: ['Build web apps', 'Frontend & backend', 'Production deployment']
    },
    {
      id: 'hackathon-builder',
      title: 'Hackathon Builder',
      description: 'Rapid prototyping, MVP development, and winning hackathon strategies',
      icon: 'RocketLaunchIcon',
      outcomes: ['Ship fast', 'Win competitions', 'Build portfolio']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          What's your career goal?
        </h2>
        <p className="text-base font-caption text-muted-foreground">
          Choose the path that aligns with your aspirations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerPaths.map((path) => (
          <button
            key={path.id}
            onClick={() => onGoalSelect(path.id)}
            className={`group relative p-6 rounded-lg border-2 transition-smooth text-left ${
              selectedGoal === path.id
                ? 'border-primary bg-primary/5 glow-border' :'border-border bg-card hover:border-primary/50 hover:bg-muted'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-md transition-smooth ${
                  selectedGoal === path.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                }`}
              >
                <Icon name={path.icon as any} size={24} variant="outline" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {path.title}
                </h3>
                <p className="text-sm font-caption text-muted-foreground">
                  {path.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {path.outcomes.map((outcome, index) => (
                    <span
                      key={index}
                      className={`text-xs font-caption px-2 py-1 rounded-md transition-smooth ${
                        selectedGoal === path.id
                          ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
              {selectedGoal === path.id && (
                <div className="absolute top-4 right-4">
                  <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-primary" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoalSelectionStep;