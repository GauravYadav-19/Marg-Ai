'use client';

import { useState, useEffect } from 'react';
import NavigationBar from '@/components/common/NavigationBar';
import HeroSection from './HeroSection';
import RoadmapExampleCard from './RoadmapExampleCard';
import BenefitCard from './BenefitCard';
import TestimonialCard from './TestimonialCard';
import StatsSection from './StatsSection';
import CTASection from './CTASection';

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

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  content: string;
  rating: number;
}

const LandingPageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const roadmapExamples: RoadmapExample[] = [
  {
    id: '1',
    title: 'FAANG SDE Preparation',
    description: 'Complete roadmap for cracking top tech company interviews with focus on DSA, system design, and behavioral rounds.',
    icon: 'BriefcaseIcon',
    duration: '6-8 months',
    difficulty: 'Advanced',
    color: 'bg-primary',
    phases: [
    { name: 'DSA Fundamentals', duration: '8 weeks', topics: 45 },
    { name: 'Advanced Algorithms', duration: '10 weeks', topics: 38 },
    { name: 'System Design', duration: '6 weeks', topics: 22 },
    { name: 'Mock Interviews', duration: '4 weeks', topics: 15 }]

  },
  {
    id: '2',
    title: 'AI/ML Engineer Path',
    description: 'From Python basics to deploying production ML models, covering mathematics, frameworks, and real-world projects.',
    icon: 'CpuChipIcon',
    duration: '8-10 months',
    difficulty: 'Intermediate',
    color: 'bg-accent',
    phases: [
    { name: 'Python & Math Foundations', duration: '6 weeks', topics: 32 },
    { name: 'Machine Learning Basics', duration: '8 weeks', topics: 28 },
    { name: 'Deep Learning', duration: '10 weeks', topics: 35 },
    { name: 'MLOps & Deployment', duration: '6 weeks', topics: 18 }]

  },
  {
    id: '3',
    title: 'Full Stack Web Developer',
    description: 'Build production-ready web applications with modern frameworks, databases, and deployment strategies.',
    icon: 'CodeBracketIcon',
    duration: '5-7 months',
    difficulty: 'Beginner',
    color: 'bg-success',
    phases: [
    { name: 'HTML, CSS & JavaScript', duration: '6 weeks', topics: 40 },
    { name: 'React & Frontend', duration: '8 weeks', topics: 35 },
    { name: 'Backend & Databases', duration: '8 weeks', topics: 30 },
    { name: 'DevOps & Deployment', duration: '4 weeks', topics: 20 }]

  },
  {
    id: '4',
    title: 'Hackathon Builder',
    description: 'Rapid prototyping skills, tech stack versatility, and project execution for winning hackathons consistently.',
    icon: 'LightBulbIcon',
    duration: '3-4 months',
    difficulty: 'Intermediate',
    color: 'bg-warning',
    phases: [
    { name: 'Quick Stack Mastery', duration: '4 weeks', topics: 25 },
    { name: 'API Integration', duration: '3 weeks', topics: 18 },
    { name: 'UI/UX Essentials', duration: '3 weeks', topics: 15 },
    { name: 'Pitch & Demo Skills', duration: '2 weeks', topics: 10 }]

  }];


  const benefits: Benefit[] = [
  {
    id: '1',
    icon: 'UserIcon',
    title: 'Personalized for You',
    description: 'Every roadmap is tailored to your specific goal, current skill level, and time commitment. No generic advice.'
  },
  {
    id: '2',
    icon: 'MapIcon',
    title: 'Clear Progression',
    description: 'Know exactly what to learn next with phase-based structure and weekly breakdowns. No more confusion.'
  },
  {
    id: '3',
    icon: 'ClockIcon',
    title: 'Time Optimized',
    description: 'Focus only on what matters for your goal. Skip irrelevant topics and save months of wasted effort.'
  },
  {
    id: '4',
    icon: 'ChartBarIcon',
    title: 'Track Progress',
    description: 'Visual progress tracking keeps you motivated and accountable throughout your learning journey.'
  },
  {
    id: '5',
    icon: 'AcademicCapIcon',
    title: 'Resource Recommendations',
    description: 'Get curated learning resources for each topic - courses, articles, practice problems, and projects.'
  },
  {
    id: '6',
    icon: 'ArrowPathIcon',
    title: 'Adaptive Learning',
    description: 'Regenerate your roadmap anytime as your goals evolve or circumstances change. Always stay on track.'
  }];


  const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'SDE at Google',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19205d2aa-1763296356182.png",
    alt: 'Young Indian woman with long black hair wearing white shirt smiling at camera in office setting',
    content: 'MargAI eliminated my FOMO completely. Instead of jumping between random tutorials, I followed the roadmap and cracked Google in 7 months. The phase-based approach kept me focused.',
    rating: 5
  },
  {
    id: '2',
    name: 'Rahul Verma',
    role: 'ML Engineer at Microsoft',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1517d7869-1763294003686.png",
    alt: 'Young Indian man with beard wearing blue shirt and glasses looking at camera in modern workspace',
    content: 'The AI/ML roadmap was exactly what I needed. It told me to skip certain math topics that weren\'t relevant for my goal, saving me 2 months. Now I\'m building production models at Microsoft.',
    rating: 5
  },
  {
    id: '3',
    name: 'Ananya Patel',
    role: 'Full Stack Developer',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15f9ae39c-1763296100160.png",
    alt: 'Young professional woman with shoulder-length brown hair in navy blazer smiling confidently at camera',
    content: 'As a self-taught developer, I was overwhelmed with choices. MargAI gave me a clear path from basics to deployment. I landed my first job in 6 months following the roadmap.',
    rating: 5
  }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <main className="pt-16">
          <HeroSection />
          <StatsSection />
          <section id="roadmap-examples" className="py-16 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Example Roadmaps
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See how MargAI creates structured, phase-based learning paths for different career goals
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {roadmapExamples.map((example) =>
                <RoadmapExampleCard key={example.id} example={example} />
                )}
              </div>
            </div>
          </section>
          <section className="py-16 px-6 bg-card">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Why Choose MargAI?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your personal learning mentor that eliminates overwhelm and provides clear direction
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) =>
                <BenefitCard key={benefit.id} benefit={benefit} index={index} />
                )}
              </div>
            </div>
          </section>
          <section className="py-16 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Success Stories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Real learners who found their path and achieved their goals with MargAI
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial) =>
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                )}
              </div>
            </div>
          </section>
          <CTASection />
          <footer className="py-8 px-6 bg-card border-t border-border">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-sm font-caption text-muted-foreground">
                © 2026 MargAI. Your AI-powered learning companion.
              </p>
            </div>
          </footer>
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-16">
        <HeroSection />
        <StatsSection />
        <section id="roadmap-examples" className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Example Roadmaps
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how MargAI creates structured, phase-based learning paths for different career goals
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {roadmapExamples.map((example) =>
              <RoadmapExampleCard key={example.id} example={example} />
              )}
            </div>
          </div>
        </section>
        <section className="py-16 px-6 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Why Choose MargAI?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your personal learning mentor that eliminates overwhelm and provides clear direction
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) =>
              <BenefitCard key={benefit.id} benefit={benefit} index={index} />
              )}
            </div>
          </div>
        </section>
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real learners who found their path and achieved their goals with MargAI
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) =>
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              )}
            </div>
          </div>
        </section>
        <CTASection />
        <footer className="py-8 px-6 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-caption text-muted-foreground">
              © 2026 MargAI. Your AI-powered learning companion.
            </p>
          </div>
        </footer>
      </main>
    </div>);

};

export default LandingPageInteractive;