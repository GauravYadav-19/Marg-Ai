'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/common/NavigationBar';
import OverallProgressCard from './OverallProgressCard';
import PhaseProgressCard from './PhaseProgressCard';
import CompletionLogCard from './CompletionLogCard';
import UpcomingTasksCard from './UpcomingTasksCard';
import LearningAnalyticsCard from './LearningAnalyticsCard';
import AchievementMilestoneCard from './AchievementMilestoneCard';
import ProgressActionsCard from './ProgressActionsCard';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  timeSpent: number;
  completedAt?: string;
}

interface Phase {
  id: string;
  name: string;
  topics: Topic[];
}

interface CompletionEntry {
  id: string;
  topicName: string;
  phaseName: string;
  completedAt: string;
  timeSpent: number;
  note?: string;
}

interface UpcomingTask {
  id: string;
  name: string;
  phaseName: string;
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface WeeklyData {
  week: string;
  completed: number;
  timeSpent: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const ProgressTrackerInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [completionLog, setCompletionLog] = useState<CompletionEntry[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setIsHydrated(true);

    const mockPhases: Phase[] = [
      {
        id: 'phase-1',
        name: 'Foundation Phase',
        topics: [
          {
            id: 'topic-1',
            name: 'Programming Fundamentals',
            completed: true,
            timeSpent: 12,
            completedAt: 'Jan 15, 2026',
          },
          {
            id: 'topic-2',
            name: 'Data Structures Basics',
            completed: true,
            timeSpent: 15,
            completedAt: 'Jan 20, 2026',
          },
          {
            id: 'topic-3',
            name: 'Algorithm Analysis',
            completed: false,
            timeSpent: 0,
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Intermediate Concepts',
        topics: [
          {
            id: 'topic-4',
            name: 'Advanced Data Structures',
            completed: false,
            timeSpent: 0,
          },
          {
            id: 'topic-5',
            name: 'Dynamic Programming',
            completed: false,
            timeSpent: 0,
          },
          {
            id: 'topic-6',
            name: 'Graph Algorithms',
            completed: false,
            timeSpent: 0,
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Advanced Topics',
        topics: [
          {
            id: 'topic-7',
            name: 'System Design Fundamentals',
            completed: false,
            timeSpent: 0,
          },
          {
            id: 'topic-8',
            name: 'Distributed Systems',
            completed: false,
            timeSpent: 0,
          },
        ],
      },
    ];

    const mockCompletionLog: CompletionEntry[] = [
      {
        id: 'log-1',
        topicName: 'Data Structures Basics',
        phaseName: 'Foundation Phase',
        completedAt: 'Jan 20, 2026',
        timeSpent: 15,
        note: 'Covered arrays, linked lists, stacks, and queues. Need to practice more problems.',
      },
      {
        id: 'log-2',
        topicName: 'Programming Fundamentals',
        phaseName: 'Foundation Phase',
        completedAt: 'Jan 15, 2026',
        timeSpent: 12,
      },
    ];

    const mockUpcomingTasks: UpcomingTask[] = [
      {
        id: 'task-1',
        name: 'Algorithm Analysis',
        phaseName: 'Foundation Phase',
        estimatedTime: 10,
        priority: 'high',
        dueDate: 'Feb 5, 2026',
      },
      {
        id: 'task-2',
        name: 'Advanced Data Structures',
        phaseName: 'Intermediate Concepts',
        estimatedTime: 18,
        priority: 'medium',
      },
      {
        id: 'task-3',
        name: 'Dynamic Programming',
        phaseName: 'Intermediate Concepts',
        estimatedTime: 20,
        priority: 'medium',
      },
    ];

    const mockWeeklyData: WeeklyData[] = [
      { week: 'Week 1', completed: 3, timeSpent: 8 },
      { week: 'Week 2', completed: 5, timeSpent: 12 },
      { week: 'Week 3', completed: 4, timeSpent: 10 },
      { week: 'Week 4', completed: 6, timeSpent: 15 },
    ];

    const mockAchievements: Achievement[] = [
      {
        id: 'ach-1',
        title: 'First Steps',
        description: 'Complete your first topic',
        icon: 'RocketLaunchIcon',
        unlocked: true,
        unlockedAt: 'Jan 15, 2026',
      },
      {
        id: 'ach-2',
        title: 'Week Warrior',
        description: 'Complete 5 topics in one week',
        icon: 'FireIcon',
        unlocked: true,
        unlockedAt: 'Jan 22, 2026',
      },
      {
        id: 'ach-3',
        title: 'Phase Master',
        description: 'Complete an entire phase',
        icon: 'TrophyIcon',
        unlocked: false,
      },
      {
        id: 'ach-4',
        title: 'Consistency King',
        description: 'Maintain a 7-day streak',
        icon: 'BoltIcon',
        unlocked: false,
      },
      {
        id: 'ach-5',
        title: 'Speed Learner',
        description: 'Complete 10 topics in one month',
        icon: 'SparklesIcon',
        unlocked: false,
      },
      {
        id: 'ach-6',
        title: 'Roadmap Champion',
        description: 'Complete your entire roadmap',
        icon: 'StarIcon',
        unlocked: false,
      },
    ];

    setPhases(mockPhases);
    setCompletionLog(mockCompletionLog);
    setUpcomingTasks(mockUpcomingTasks);
    setWeeklyData(mockWeeklyData);
    setAchievements(mockAchievements);
  }, []);

  const handleTopicToggle = (phaseId: string, topicId: string) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            topics: phase.topics.map((topic) => {
              if (topic.id === topicId) {
                const newCompleted = !topic.completed;
                return {
                  ...topic,
                  completed: newCompleted,
                  completedAt: newCompleted ? 'Jan 29, 2026' : undefined,
                  timeSpent: newCompleted ? 8 : 0,
                };
              }
              return topic;
            }),
          };
        }
        return phase;
      })
    );
  };

  const handleExportProgress = () => {
    alert('Progress report exported successfully!');
  };

  const handleResetProgress = () => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) => ({
        ...phase,
        topics: phase.topics.map((topic) => ({
          ...topic,
          completed: false,
          timeSpent: 0,
          completedAt: undefined,
        })),
      }))
    );
    setCompletionLog([]);
  };

  const handleGenerateCertificate = () => {
    alert('Certificate generated successfully!');
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const totalTopics = phases.reduce(
    (sum, phase) => sum + phase.topics.length,
    0
  );
  const completedTopics = phases.reduce(
    (sum, phase) => sum + phase.topics.filter((t) => t.completed).length,
    0
  );
  const totalTimeSpent = phases.reduce(
    (sum, phase) =>
      sum + phase.topics.reduce((s, t) => s + t.timeSpent, 0),
    0
  );

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 bg-muted rounded w-64 animate-pulse mb-8" />
            <div className="grid grid-cols-1 gap-6">
              <div className="h-64 bg-card rounded-lg animate-pulse" />
              <div className="h-96 bg-card rounded-lg animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar onNavigate={handleNavigate} />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-heading font-bold text-foreground">
                Progress Tracker
              </h1>
              <p className="text-base font-caption text-muted-foreground">
                Monitor your learning journey and celebrate your achievements
              </p>
            </div>

            <OverallProgressCard
              totalTopics={totalTopics}
              completedTopics={completedTopics}
              currentStreak={7}
              totalTimeSpent={totalTimeSpent}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Phase Progress
                </h2>
                {phases.map((phase) => (
                  <PhaseProgressCard
                    key={phase.id}
                    phase={phase}
                    onTopicToggle={handleTopicToggle}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <CompletionLogCard entries={completionLog} />
                <UpcomingTasksCard tasks={upcomingTasks} />
              </div>
            </div>

            <LearningAnalyticsCard
              weeklyData={weeklyData}
              averageTimePerTopic={8.5}
              mostProductiveDay="Monday"
              totalWeeksActive={4}
            />

            <AchievementMilestoneCard achievements={achievements} />

            <ProgressActionsCard
              onExportProgress={handleExportProgress}
              onResetProgress={handleResetProgress}
              onGenerateCertificate={handleGenerateCertificate}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressTrackerInteractive;