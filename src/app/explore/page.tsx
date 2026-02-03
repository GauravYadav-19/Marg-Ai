'use client';
import NavigationBar from '@/components/common/NavigationBar';
import Icon from '@/components/ui/AppIcon';
import { useRouter } from 'next/navigation';

export default function ExplorePage() {
  const router = useRouter();

  // HARDCODED "Gold Standard" Examples (Honest Marketing)
  const examples = [
    {
      title: "Full Stack Developer 2026",
      level: "Beginner",
      duration: "6 Months",
      tags: ["React", "Node.js", "PostgreSQL"],
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "AI Engineer Path",
      level: "Intermediate",
      duration: "4 Months",
      tags: ["Python", "TensorFlow", "RAG"],
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "DevOps & Cloud Architect",
      level: "Advanced",
      duration: "3 Months",
      tags: ["AWS", "Docker", "Kubernetes"],
      color: "bg-orange-500/10 text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-32 px-6 pb-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore <span className="text-primary">Paths</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See examples of what MargAI can generate. These are structure-optimized learning paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((ex, i) => (
            <div key={i} className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${ex.color}`}>
                <Icon name="MapIcon" size={24} />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {ex.title}
              </h3>
              
              <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <Icon name="ChartBarIcon" size={14} /> {ex.level}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ClockIcon" size={14} /> {ex.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {ex.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => router.push('/roadmap-generator')}
                className="w-full py-3 rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
              >
                Generate This
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}