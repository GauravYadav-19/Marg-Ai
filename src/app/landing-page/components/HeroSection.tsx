'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const HeroSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16 bg-gradient-to-b from-background via-card to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-8">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm font-caption text-muted-foreground">AI-Powered Learning Paths</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            Stop Learning Everything.
            <br />
            <span className="text-primary">Start Learning Right.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Get a personalized roadmap that tells you exactly what to learn, in what order, and what to ignore for your tech career goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-caption font-medium text-lg">
              Generate My Roadmap
            </div>
            <div className="px-8 py-4 rounded-md bg-muted text-foreground font-caption font-medium text-lg">
              See Examples
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16 bg-gradient-to-b from-background via-card to-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-caption text-muted-foreground">AI-Powered Learning Paths</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight animate-fade-in">
          Stop Learning Everything.
          <br />
          <span className="text-primary">Start Learning Right.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Get a personalized roadmap that tells you exactly what to learn, in what order, and what to ignore for your tech career goals.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Link
            href="/roadmap-generator"
            className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-caption font-medium text-lg transition-smooth hover:glow-md active:scale-[0.97] flex items-center gap-2"
          >
            <Icon name="SparklesIcon" size={24} variant="solid" />
            <span>Generate My Roadmap</span>
          </Link>
          <button
            onClick={() => {
              const examplesSection = document.getElementById('roadmap-examples');
              if (examplesSection) {
                examplesSection?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 rounded-md bg-muted text-foreground font-caption font-medium text-lg transition-smooth hover:bg-secondary active:scale-[0.97] flex items-center gap-2"
          >
            <Icon name="MapIcon" size={24} variant="outline" />
            <span>See Examples</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" size={32} variant="outline" className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;