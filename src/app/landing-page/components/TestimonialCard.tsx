import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  content: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border transition-smooth hover:glow-md">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            size={20}
            variant={index < testimonial.rating ? 'solid' : 'outline'}
            className={index < testimonial.rating ? 'text-warning' : 'text-muted-foreground'}
          />
        ))}
      </div>
      
      <p className="text-sm text-foreground leading-relaxed mb-6 italic">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
          <AppImage
            src={testimonial.image}
            alt={testimonial.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-caption font-medium text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;