'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhaseCard from './PhaseCard';
import ProgressSidebar from './ProgressSidebar';
import ActionControls from './ActionControls';
import RoadmapHeader from './RoadmapHeader';

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
  const [roadmapData, setRoadmapData] = useState<RoadmapData>({
    goalTitle: 'FAANG SDE Preparation Roadmap',
    skillLevel: 'Intermediate',
    timeCommitment: '3 hours/day',
    preferredStack: 'C++',
    generatedDate: 'Jan 29, 2026',
    phases: [
      {
        id: 'phase-1',
        title: 'Foundation & Core Concepts',
        description:
          'Build strong fundamentals in data structures and algorithmic thinking',
        duration: '4 weeks',
        prerequisites: [],
        weeks: [
          {
            weekNumber: 1,
            steps: [
              {
                id: 'step-1-1',
                topic: 'Arrays and Strings Mastery',
                importance:
                  'Essential for 40% of FAANG interview questions. Master two-pointer technique, sliding window, and string manipulation patterns.',
                estimatedHours: 12,
                resources: [
                  {
                    type: 'video',
                    title: 'Arrays Deep Dive',
                    url: 'https://youtube.com/watch?v=example1',
                  },
                  {
                    type: 'article',
                    title: 'String Algorithms Guide',
                    url: 'https://leetcode.com/explore/learn/card/array-and-string/',
                  },
                ],
                completed: true,
                completedAt: 'Jan 22, 2026',
              },
              {
                id: 'step-1-2',
                topic: 'Hash Tables and Hash Maps',
                importance:
                  'Critical for optimizing time complexity. Used in 30% of coding problems to achieve O(1) lookups.',
                estimatedHours: 10,
                resources: [
                  {
                    type: 'video',
                    title: 'Hash Table Implementation',
                    url: 'https://youtube.com/watch?v=example2',
                  },
                  {
                    type: 'book',
                    title: 'Hash Functions Explained',
                    url: 'https://example.com/hash-guide',
                  },
                ],
                completed: true,
                completedAt: 'Jan 24, 2026',
              },
            ],
          },
          {
            weekNumber: 2,
            steps: [
              {
                id: 'step-2-1',
                topic: 'Linked Lists Operations',
                importance:
                  'Fundamental pointer manipulation skills. Required for understanding advanced data structures like trees and graphs.',
                estimatedHours: 14,
                resources: [
                  {
                    type: 'video',
                    title: 'Linked List Patterns',
                    url: 'https://youtube.com/watch?v=example3',
                  },
                  {
                    type: 'article',
                    title: 'Reverse Linked List Techniques',
                    url: 'https://leetcode.com/problems/reverse-linked-list/',
                  },
                ],
                completed: false,
              },
              {
                id: 'step-2-2',
                topic: 'Stack and Queue Implementation',
                importance:
                  'Core for BFS/DFS traversals and expression evaluation. Appears in 20% of system design discussions.',
                estimatedHours: 11,
                resources: [
                  {
                    type: 'video',
                    title: 'Stack & Queue Deep Dive',
                    url: 'https://youtube.com/watch?v=example4',
                  },
                ],
                completed: false,
              },
            ],
          },
        ],
      },
      {
        id: 'phase-2',
        title: 'Advanced Data Structures',
        description:
          'Master complex data structures used in production systems',
        duration: '5 weeks',
        prerequisites: ['Arrays', 'Linked Lists', 'Hash Tables'],
        weeks: [
          {
            weekNumber: 3,
            steps: [
              {
                id: 'step-3-1',
                topic: 'Binary Trees and BST',
                importance:
                  'Foundation for database indexing and file systems. Critical for 25% of FAANG interviews.',
                estimatedHours: 16,
                resources: [
                  {
                    type: 'video',
                    title: 'Tree Traversal Techniques',
                    url: 'https://youtube.com/watch?v=example5',
                  },
                  {
                    type: 'article',
                    title: 'BST Operations Guide',
                    url: 'https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/',
                  },
                ],
                completed: false,
              },
              {
                id: 'step-3-2',
                topic: 'Heaps and Priority Queues',
                importance:
                  'Essential for scheduling algorithms and finding k-th elements. Used in real-time systems.',
                estimatedHours: 13,
                resources: [
                  {
                    type: 'video',
                    title: 'Heap Implementation',
                    url: 'https://youtube.com/watch?v=example6',
                  },
                ],
                completed: false,
              },
            ],
          },
          {
            weekNumber: 4,
            steps: [
              {
                id: 'step-4-1',
                topic: 'Graph Representations',
                importance:
                  'Core for social networks, maps, and recommendation systems. Appears in 30% of system design rounds.',
                estimatedHours: 15,
                resources: [
                  {
                    type: 'video',
                    title: 'Graph Theory Basics',
                    url: 'https://youtube.com/watch?v=example7',
                  },
                  {
                    type: 'article',
                    title: 'Adjacency List vs Matrix',
                    url: 'https://example.com/graph-representations',
                  },
                ],
                completed: false,
              },
              {
                id: 'step-4-2',
                topic: 'Trie Data Structure',
                importance:
                  'Specialized for autocomplete and spell checkers. Not critical for your SDE role but good to know.',
                estimatedHours: 8,
                resources: [
                  {
                    type: 'video',
                    title: 'Trie Implementation',
                    url: 'https://youtube.com/watch?v=example8',
                  },
                ],
                completed: false,
                notRequired: true,
              },
            ],
          },
        ],
      },
      {
        id: 'phase-3',
        title: 'Algorithm Patterns',
        description:
          'Learn problem-solving patterns that solve 80% of coding questions',
        duration: '6 weeks',
        prerequisites: ['Binary Trees', 'Graphs', 'Dynamic Programming Basics'],
        weeks: [
          {
            weekNumber: 5,
            steps: [
              {
                id: 'step-5-1',
                topic: 'Two Pointers Technique',
                importance:
                  'Solves array problems in O(n) time. Used in 15% of FAANG coding rounds.',
                estimatedHours: 10,
                resources: [
                  {
                    type: 'video',
                    title: 'Two Pointers Patterns',
                    url: 'https://youtube.com/watch?v=example9',
                  },
                  {
                    type: 'article',
                    title: 'Common Two Pointer Problems',
                    url: 'https://leetcode.com/tag/two-pointers/',
                  },
                ],
                completed: false,
              },
              {
                id: 'step-5-2',
                topic: 'Sliding Window Pattern',
                importance:
                  'Optimizes substring and subarray problems. Critical for string manipulation questions.',
                estimatedHours: 12,
                resources: [
                  {
                    type: 'video',
                    title: 'Sliding Window Explained',
                    url: 'https://youtube.com/watch?v=example10',
                  },
                ],
                completed: false,
              },
            ],
          },
          {
            weekNumber: 6,
            steps: [
              {
                id: 'step-6-1',
                topic: 'Binary Search Variations',
                importance:
                  'Reduces search space from O(n) to O(log n). Appears in 20% of interviews.',
                estimatedHours: 14,
                resources: [
                  {
                    type: 'video',
                    title: 'Binary Search Mastery',
                    url: 'https://youtube.com/watch?v=example11',
                  },
                  {
                    type: 'article',
                    title: 'Binary Search Templates',
                    url: 'https://leetcode.com/explore/learn/card/binary-search/',
                  },
                ],
                completed: false,
              },
            ],
          },
        ],
      },
    ],
  });

  useEffect(() => {
    setIsHydrated(true);
    const savedRoadmap = localStorage.getItem('roadmapProgress');
    if (savedRoadmap) {
      setRoadmapData(JSON.parse(savedRoadmap));
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('roadmapProgress', JSON.stringify(roadmapData));
    }
  }, [roadmapData, isHydrated]);

  const handleStepToggle = (phaseId: string, stepId: string) => {
    setRoadmapData((prev) => ({
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
    }));
  };

  const handlePhaseClick = (phaseId: string) => {
    const element = document.getElementById(phaseId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegenerate = () => {
    if (
      confirm(
        'Are you sure you want to regenerate your roadmap? This will reset all progress.'
      )
    ) {
      router.push('/roadmap-generator');
    }
  };

  const handleEdit = () => {
    router.push('/roadmap-generator');
  };

  const handleShare = () => {
    if (isHydrated && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Roadmap link copied to clipboard!');
    }
  };

  const handleExport = () => {
    alert('Export functionality will download your roadmap as PDF');
  };

  const calculateOverallProgress = () => {
    let totalSteps = 0;
    let completedSteps = 0;

    roadmapData.phases.forEach((phase) => {
      phase.weeks.forEach((week) => {
        week.steps.forEach((step) => {
          if (!step.notRequired) {
            totalSteps++;
            if (step.completed) completedSteps++;
          }
        });
      });
    });

    return {
      totalSteps,
      completedSteps,
      percentage:
        totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
    };
  };

  const getPhaseStatuses = () => {
    return roadmapData.phases.map((phase) => {
      let totalSteps = 0;
      let completedSteps = 0;

      phase.weeks.forEach((week) => {
        week.steps.forEach((step) => {
          if (!step.notRequired) {
            totalSteps++;
            if (step.completed) completedSteps++;
          }
        });
      });

      return {
        id: phase.id,
        title: phase.title,
        progress:
          totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
        completed: completedSteps,
        total: totalSteps,
      };
    });
  };

  const progress = calculateOverallProgress();
  const phaseStatuses = getPhaseStatuses();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-caption">
            Loading your roadmap...
          </p>
        </div>
      </div>
    );
  }

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
                <PhaseCard
                  phase={phase}
                  phaseIndex={index}
                  onStepToggle={handleStepToggle}
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <ProgressSidebar
              overallProgress={progress.percentage}
              totalSteps={progress.totalSteps}
              completedSteps={progress.completedSteps}
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