'use client';
import StepCard from './StepCard'; // 👈 IMPORTING THE NEW NAME CORRECTLY

const HowItWorks = () => {
  const steps = [
    {
      id: '1',
      stepNumber: '01',
      title: "Define Goal",
      desc: "Enter your career target (e.g. 'Full Stack Dev') and available hours.",
      icon: "PencilSquareIcon"
    },
    {
      id: '2',
      stepNumber: '02',
      title: "AI Analysis",
      desc: "Gemini AI scans thousands of resources to build your custom path.",
      icon: "CpuChipIcon"
    },
    {
      id: '3',
      stepNumber: '03',
      title: "Start Learning",
      desc: "Follow the week-by-week plan and track your progress instantly.",
      icon: "PlayCircleIcon"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <StepCard key={item.id} step={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;