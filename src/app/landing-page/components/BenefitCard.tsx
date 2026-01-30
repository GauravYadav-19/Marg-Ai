import Icon from '@/components/ui/AppIcon';

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

const BenefitCard = ({ benefit, index }: BenefitCardProps) => {
  return (
    <div 
      className="bg-card rounded-lg p-6 border border-border transition-smooth hover:glow-md hover:border-primary group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-14 h-14 rounded-md bg-primary flex items-center justify-center mb-4 transition-smooth group-hover:scale-110 group-hover:glow-lg">
        <Icon name={benefit.icon as any} size={28} variant="solid" className="text-primary-foreground" />
      </div>
      
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {benefit.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
};

export default BenefitCard;