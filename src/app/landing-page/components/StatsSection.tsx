'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const StatsSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => { setIsHydrated(true); }, []);

  // REAL FEATURES (Honest Marketing)
  const features = [
    { id: '1', label: 'Powered By', value: 'Gemini 1.5', icon: 'SparklesIcon', desc: 'Latest AI Model' },
    { id: '2', label: 'Generation Time', value: 'Instant', icon: 'BoltIcon', desc: 'Under 10 Seconds' },
    { id: '3', label: 'Cost', value: 'Free', icon: 'CurrencyDollarIcon', desc: 'No Credit Card' },
    { id: '4', label: 'Availability', value: '24/7', icon: 'GlobeAltIcon', desc: 'Always Online' }
  ];

  if (!isHydrated) return null;

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              // ✨ VISUAL FIX: Uses the "Greyish" card style from your screenshot
              className="flex flex-col items-center text-center p-6 bg-[#1F2937] border border-gray-800 rounded-2xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Green Icon Bubble */}
              <div className="w-14 h-14 mb-4 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Icon name={feature.icon as any} size={28} variant="solid" />
              </div>

              {/* Text Content */}
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {feature.value}
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {feature.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;