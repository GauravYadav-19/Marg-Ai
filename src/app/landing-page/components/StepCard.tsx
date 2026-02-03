'use client';
import Icon from '@/components/ui/AppIcon';

interface ProcessStep {
  id: string;
  title: string;
  desc: string;
  icon: string;
  stepNumber: string;
}

interface StepCardProps {
  step: ProcessStep;
}

const StepCard = ({ step }: StepCardProps) => {
  return (
    <div className="relative bg-[#1F2937] rounded-2xl p-8 border border-gray-800 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 group">
      
      {/* Big Background Number */}
      <div className="absolute top-4 right-6 text-6xl font-bold text-gray-800 group-hover:text-gray-700/50 transition-colors select-none">
        {step.stepNumber}
      </div>

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 mb-6 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
        <Icon name={step.icon as any} size={24} />
      </div>
      
      {/* Title */}
      <h3 className="relative z-10 text-xl font-bold text-white mb-3">
        {step.title}
      </h3>
      
      {/* Description */}
      <p className="relative z-10 text-sm text-gray-400 leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
};

export default StepCard;