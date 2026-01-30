interface RoadmapHeaderProps {
  goalTitle: string;
  skillLevel: string;
  timeCommitment: string;
  preferredStack: string;
  generatedDate: string;
}

const RoadmapHeader = ({
  goalTitle,
  skillLevel,
  timeCommitment,
  preferredStack,
  generatedDate,
}: RoadmapHeaderProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h1 className="text-3xl font-heading font-semibold text-foreground mb-4">
        {goalTitle}
      </h1>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-caption font-medium text-foreground">Level:</span>
          <span className="font-caption">{skillLevel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-caption font-medium text-foreground">Time:</span>
          <span className="font-caption">{timeCommitment}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-caption font-medium text-foreground">Stack:</span>
          <span className="font-caption">{preferredStack}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-caption font-medium text-foreground">Generated:</span>
          <span className="font-caption">{generatedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;