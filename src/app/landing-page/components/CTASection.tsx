'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="py-24 px-6 bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of learners who have eliminated overwhelm and found their clear path to success.
          </p>
          <div className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-caption font-medium text-lg">
            Generate Your Roadmap Now
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 animate-fade-in">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in">
          Join thousands of learners who have eliminated overwhelm and found their clear path to success.
        </p>
        <Link
          href="/roadmap-generator"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-caption font-medium text-lg transition-smooth hover:glow-lg active:scale-[0.97] animate-fade-in"
        >
          <Icon name="SparklesIcon" size={24} variant="solid" />
          <span>Generate Your Roadmap Now</span>
          <Icon name="ArrowRightIcon" size={20} variant="outline" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;