import Icon from '@/components/ui/AppIcon';

interface Phase {
  name: string;
  duration: string;
  topics: number;
}

interface RoadmapExample {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  phases: Phase[];
  difficulty: string;
  color: string;
}

interface RoadmapExampleCardProps {
  example: RoadmapExample;
}

const RoadmapExampleCard = ({ example }: RoadmapExampleCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border transition-smooth hover:glow-md hover:border-primary group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-md ${example.color} flex items-center justify-center transition-smooth group-hover:scale-110`}>
          <Icon name={example.icon as any} size={24} variant="solid" className="text-primary-foreground" />
        </div>
        <span className={`text-sm font-caption font-medium ${getDifficultyColor(example.difficulty)}`}>
          {example.difficulty}
        </span>
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
        {example.title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {example.description}
      </p>
      
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="ClockIcon" size={16} variant="outline" className="text-muted-foreground" />
          <span className="text-sm font-caption text-muted-foreground">{example.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="AcademicCapIcon" size={16} variant="outline" className="text-muted-foreground" />
          <span className="text-sm font-caption text-muted-foreground">{example.phases.length} Phases</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {example.phases.slice(0, 3).map((phase, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-caption font-medium text-foreground">{index + 1}</span>
              </div>
              <span className="font-caption text-foreground">{phase.name}</span>
            </div>
            <span className="text-xs font-caption text-muted-foreground">{phase.duration}</span>
          </div>
        ))}
        {example.phases.length > 3 && (
          <div className="text-xs font-caption text-muted-foreground text-center pt-2">
            +{example.phases.length - 3} more phases
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapExampleCard;