'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

const StatsSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const stats: Stat[] = [
    {
      id: '1',
      value: '10,000+',
      label: 'Roadmaps Generated',
      icon: 'MapIcon'
    },
    {
      id: '2',
      value: '95%',
      label: 'Success Rate',
      icon: 'CheckBadgeIcon'
    },
    {
      id: '3',
      value: '40%',
      label: 'Time Saved',
      icon: 'ClockIcon'
    },
    {
      id: '4',
      value: '4.9/5',
      label: 'User Rating',
      icon: 'StarIcon'
    }
  ];

  if (!isHydrated) {
    return (
      <section className="py-16 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center">
                    <Icon name={stat.icon as any} size={24} variant="solid" className="text-primary-foreground" />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-caption text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center transition-smooth hover:scale-110 hover:glow-lg">
                  <Icon name={stat.icon as any} size={24} variant="solid" className="text-primary-foreground" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-sm font-caption text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;