'use client';

import Icon from '@/components/ui/AppIcon';

interface SkillLevel {
  id: string;
  title: string;
  description: string;
  icon: string;
  indicators: string[];
}

interface SkillLevelStepProps {
  selectedLevel: string;
  onLevelSelect: (levelId: string) => void;
}

const SkillLevelStep = ({ selectedLevel, onLevelSelect }: SkillLevelStepProps) => {
  const skillLevels: SkillLevel[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Just starting out or learning fundamentals',
      icon: 'AcademicCapIcon',
      indicators: ['New to programming', 'Learning basics', 'First projects']
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Comfortable with basics, building projects',
      icon: 'CodeBracketSquareIcon',
      indicators: ['Built 2-3 projects', 'Know core concepts', 'Ready to level up']
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Strong foundation, seeking specialization',
      icon: 'TrophyIcon',
      indicators: ['Multiple projects', 'Deep understanding', 'Career-focused']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          What's your current skill level?
        </h2>
        <p className="text-base font-caption text-muted-foreground">
          Be honest - this helps us personalize your roadmap
        </p>
      </div>

      <div className="space-y-4">
        {skillLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelSelect(level.id)}
            className={`group w-full p-6 rounded-lg border-2 transition-smooth text-left ${
              selectedLevel === level.id
                ? 'border-primary bg-primary/5 glow-border' :'border-border bg-card hover:border-primary/50 hover:bg-muted'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-md transition-smooth ${
                  selectedLevel === level.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                }`}
              >
                <Icon name={level.icon as any} size={24} variant="outline" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {level.title}
                  </h3>
                  {selectedLevel === level.id && (
                    <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-primary" />
                  )}
                </div>
                <p className="text-sm font-caption text-muted-foreground">
                  {level.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {level.indicators.map((indicator, index) => (
                    <span
                      key={index}
                      className={`text-xs font-caption px-2 py-1 rounded-md transition-smooth ${
                        selectedLevel === level.id
                          ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillLevelStep;