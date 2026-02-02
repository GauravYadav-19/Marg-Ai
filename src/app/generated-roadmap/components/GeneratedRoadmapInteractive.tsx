'use client';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhaseCard from './PhaseCard';
import ProgressSidebar from './ProgressSidebar';
import ActionControls from './ActionControls';
import RoadmapHeader from './RoadmapHeader';

// --- Interfaces ---
interface Resource {
  type: string;
  title: string;
  url: string;
}

interface Step {
  id: string;
  topic: string;
  importance: string;
  estimatedHours: number;
  resources: Resource[];
  completed: boolean;
  completedAt?: string;
  notRequired?: boolean;
}

interface Week {
  weekNumber: number;
  steps: Step[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  weeks: Week[];
}

interface RoadmapData {
  goalTitle: string;
  skillLevel: string;
  timeCommitment: string;
  preferredStack: string;
  generatedDate: string;
  phases: Phase[];
}

const GeneratedRoadmapInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);

  // 1. Handle Hydration (Prevents hydration mismatch errors)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 2. Load Data & Save to Supabase
  useEffect(() => {
    const saveToDb = async (data: RoadmapData) => {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log("Saving to Supabase...");
        // Insert into 'roadmaps' table
        const { error } = await supabase
          .from('roadmaps')
          .insert({
            user_id: user.id,
            title: data.goalTitle,
            content: data, // Save the whole JSON object
            created_at: new Date().toISOString()
          });

        if (error) {
          console.error("❌ Error saving to DB:", error);
        } else {
          console.log("✅ Roadmap saved to Cloud!");
        }
      } else {
        console.log("User not logged in. Roadmap saved to LocalStorage only.");
      }
    };

    if (typeof window !== 'undefined') {
      // Check if we already have progress saved (e.g. on refresh)
      const savedProgress = localStorage.getItem('roadmapProgress');
      
      if (savedProgress) {
        setRoadmapData(JSON.parse(savedProgress));
      } else {
        // If no progress, look for fresh generation data
        const aiDataRaw = localStorage.getItem('generatedRoadmapData');
        const userInputRaw = localStorage.getItem('roadmapUserInput');

        if (aiDataRaw && userInputRaw && !roadmapData) {
          try {
            const aiData = JSON.parse(aiDataRaw);
            const userInput = JSON.parse(userInputRaw);
            
            // --- DATA TRANSFORMATION LOGIC ---
            const transformedData: RoadmapData = {
               goalTitle: aiData.roadmapTitle || userInput.goal,
               skillLevel: userInput.level,
               timeCommitment: `${userInput.hoursPerDay} hours/day`,
               preferredStack: userInput.languages?.join(', ') || 'General',
               generatedDate: new Date().toLocaleDateString(),
               phases: aiData.phases.map((phase: any, index: number) => ({
                  id: `phase-${index + 1}`,
                  title: phase.phaseTitle,
                  duration: phase.duration,
                  description: phase.summary || "Key Phase",
                  weeks: [{
                      weekNumber: 1,
                      steps: phase.topics.map((t: any, i: number) => {
                           const topicName = t.topicName || t.topic || t;
                           const query = t.search_query || topicName;
                           return {
                               id: `step-${index}-${i}`,
                               topic: topicName,
                               importance: "Core concept", 
                               estimatedHours: 2,
                               completed: false,
                               resources: [
                                  { 
                                    type: 'article', 
                                    title: '📄 Documentation (GFG/W3)', 
                                    url: `https://www.google.com/search?q=site:geeksforgeeks.org+OR+site:w3schools.com+${encodeURIComponent(query)}` 
                                  },
                                  { 
                                    type: 'video', 
                                    title: '▶️ Watch Tutorial', 
                                    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " tutorial")}`
                                  }
                               ]
                           };
                      })
                  }]
               }))
            };
            // --- END TRANSFORMATION ---

            setRoadmapData(transformedData);
            
            // Trigger the Cloud Save
            saveToDb(transformedData);

          } catch (e) {
            console.error("Error parsing data", e);
          }
        }
      }
    }
  }, []); // Run once on mount

  // 3. Save progress to LocalStorage whenever it changes
  useEffect(() => {
    if (isHydrated && roadmapData) {
      localStorage.setItem('roadmapProgress', JSON.stringify(roadmapData));
    }
  }, [roadmapData, isHydrated]);

  // --- Handlers ---
  const handleStepToggle = (phaseId: string, stepId: string) => {
    if (!roadmapData) return;
    setRoadmapData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                weeks: phase.weeks.map((week) => ({
                  ...week,
                  steps: week.steps.map((step) =>
                    step.id === stepId
                      ? {
                          ...step,
                          completed: !step.completed,
                          completedAt: !step.completed
                            ? new Date().toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : undefined,
                        }
                      : step
                  ),
                })),
              }
            : phase
        ),
      };
    });
  };

  const handlePhaseClick = (phaseId: string) => {
    const element = document.getElementById(phaseId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegenerate = () => {
    if (confirm('Regenerate roadmap? Current progress will be lost.')) {
      localStorage.removeItem('generatedRoadmapData');
      localStorage.removeItem('roadmapProgress');
      router.push('/roadmap-generator');
    }
  };

  const handleEdit = () => router.push('/roadmap-generator');
  
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  const handleExport = () => alert('Export to PDF coming soon!');

  if (!isHydrated || !roadmapData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-caption">Loading your custom roadmap...</p>
        </div>
      </div>
    );
  }

  // --- Calculations ---
  const calculateOverallProgress = () => {
    let total = 0;
    let completed = 0;
    roadmapData.phases.forEach(p => p.weeks.forEach(w => w.steps.forEach(s => {
      if (!s.notRequired) { total++; if (s.completed) completed++; }
    })));
    return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const getPhaseStatuses = () => {
    return roadmapData.phases.map(p => {
      let t = 0, c = 0;
      p.weeks.forEach(w => w.steps.forEach(s => {
        if (!s.notRequired) { t++; if (s.completed) c++; }
      }));
      return { id: p.id, title: p.title, progress: t > 0 ? Math.round((c / t) * 100) : 0, completed: c, total: t };
    });
  };

  const progress = calculateOverallProgress();
  const phaseStatuses = getPhaseStatuses();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <RoadmapHeader
            goalTitle={roadmapData.goalTitle}
            skillLevel={roadmapData.skillLevel}
            timeCommitment={roadmapData.timeCommitment}
            preferredStack={roadmapData.preferredStack}
            generatedDate={roadmapData.generatedDate}
          />
        </div>

        <div className="mb-6">
          <ActionControls
            onRegenerate={handleRegenerate}
            onEdit={handleEdit}
            onShare={handleShare}
            onExport={handleExport}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {roadmapData.phases.map((phase, index) => (
              <div key={phase.id} id={phase.id}>
                <PhaseCard phase={phase} phaseIndex={index} onStepToggle={handleStepToggle} />
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <ProgressSidebar
              overallProgress={progress.percentage}
              totalSteps={progress.total}
              completedSteps={progress.completed}
              phases={phaseStatuses}
              onPhaseClick={handlePhaseClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedRoadmapInteractive;