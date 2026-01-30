import Icon from '@/components/ui/AppIcon';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementMilestoneCardProps {
  achievements: Achievement[];
}

const AchievementMilestoneCard = ({
  achievements,
}: AchievementMilestoneCardProps) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Achievements
          </h2>
          <span className="text-sm font-caption text-muted-foreground">
            {unlockedCount} / {totalCount} unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex flex-col gap-3 p-4 rounded-md border transition-smooth ${
                achievement.unlocked
                  ? 'bg-primary/10 border-primary hover:shadow-md'
                  : 'bg-muted border-border opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted-foreground/20 text-muted-foreground'
                  }`}
                >
                  <Icon
                    name={achievement.icon as any}
                    size={24}
                    variant={achievement.unlocked ? 'solid' : 'outline'}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-base font-heading font-medium text-foreground">
                    {achievement.title}
                  </span>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <span className="text-xs font-caption text-muted-foreground">
                      Unlocked {achievement.unlockedAt}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm font-caption text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementMilestoneCard;