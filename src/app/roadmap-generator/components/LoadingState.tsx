'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const LoadingState = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    'Analyzing your career goals...',
    'Mapping learning pathways...',
    'Optimizing for your schedule...',
    'Selecting best resources...',
    'Finalizing your roadmap...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages?.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-muted animate-spin" style={{
          borderTopColor: 'var(--color-primary)',
          animationDuration: '1s'
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="SparklesIcon" size={32} variant="solid" className="text-primary" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-heading font-semibold text-foreground">
          Creating your personalized roadmap
        </h3>
        <p className="text-base font-caption text-primary animate-pulse">
          {loadingMessages?.[currentMessage]}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {loadingMessages?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentMessage ? 'bg-primary w-8' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="max-w-md text-center">
        <p className="text-sm font-caption text-muted-foreground">
          We're analyzing thousands of learning paths to find the perfect one for you. This won't take long!
        </p>
      </div>
    </div>
  );
};

export default LoadingState;