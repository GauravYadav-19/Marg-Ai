'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface WeeklyData {
  week: string;
  completed: number;
  timeSpent: number;
}

interface LearningAnalyticsCardProps {
  weeklyData: WeeklyData[];
  averageTimePerTopic: number;
  mostProductiveDay: string;
  totalWeeksActive: number;
}

const LearningAnalyticsCard = ({
  weeklyData,
  averageTimePerTopic,
  mostProductiveDay,
  totalWeeksActive,
}: LearningAnalyticsCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeChart, setActiveChart] = useState<'completion' | 'time'>(
    'completion'
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-6 glow-sm">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Learning Analytics
          </h2>
          <div className="h-64 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Learning Analytics
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChart('completion')}
              className={`px-4 py-2 rounded-md text-sm font-caption font-medium transition-smooth ${
                activeChart === 'completion'
                  ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Completions
            </button>
            <button
              onClick={() => setActiveChart('time')}
              className={`px-4 py-2 rounded-md text-sm font-caption font-medium transition-smooth ${
                activeChart === 'time' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Time Spent
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'completion' ? (
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="week"
                  stroke="#94A3B8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="week"
                  stroke="#94A3B8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="timeSpent"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="ChartBarIcon" size={20} variant="outline" />
              <span className="text-sm font-caption">Avg. Time/Topic</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {averageTimePerTopic}h
            </span>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="CalendarDaysIcon" size={20} variant="outline" />
              <span className="text-sm font-caption">Most Productive</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {mostProductiveDay}
            </span>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="ClockIcon" size={20} variant="outline" />
              <span className="text-sm font-caption">Weeks Active</span>
            </div>
            <span className="text-2xl font-heading font-semibold text-foreground">
              {totalWeeksActive}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAnalyticsCard;