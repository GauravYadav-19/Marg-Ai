'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CompletionEntry {
  id: string;
  topicName: string;
  phaseName: string;
  completedAt: string;
  timeSpent: number;
  note?: string;
}

interface CompletionLogCardProps {
  entries: CompletionEntry[];
}

const CompletionLogCard = ({ entries }: CompletionLogCardProps) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  const getFilteredEntries = () => {
    if (filter === 'all') return entries;

    const now = new Date('2026-01-29');
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    return entries.filter((entry) => {
      const entryDate = new Date(entry.completedAt);
      if (filter === 'today') {
        return entryDate >= today;
      }
      return entryDate >= weekAgo;
    });
  };

  const filteredEntries = getFilteredEntries();

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Completion Log
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-caption font-medium transition-smooth ${
                filter === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setFilter('week')}
              className={`px-4 py-2 rounded-md text-sm font-caption font-medium transition-smooth ${
                filter === 'week' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-md text-sm font-caption font-medium transition-smooth ${
                filter === 'today' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Today
            </button>
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Icon
              name="DocumentTextIcon"
              size={48}
              variant="outline"
              className="text-muted-foreground"
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-heading font-medium text-foreground">
                No completions yet
              </span>
              <span className="text-sm font-caption text-muted-foreground text-center max-w-md">
                Start completing topics from your roadmap to see your progress here
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 bg-muted rounded-md hover:bg-muted/80 transition-smooth"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Icon
                    name="CheckIcon"
                    size={20}
                    variant="solid"
                    className="text-success"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-heading font-medium text-foreground">
                      {entry.topicName}
                    </span>
                    <span className="text-sm font-caption text-muted-foreground">
                      {entry.phaseName}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="CalendarIcon" size={16} variant="outline" />
                      <span className="text-xs font-caption">
                        {entry.completedAt}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="ClockIcon" size={16} variant="outline" />
                      <span className="text-xs font-caption">
                        {entry.timeSpent}h spent
                      </span>
                    </div>
                  </div>
                  {entry.note && (
                    <p className="text-sm font-caption text-foreground mt-2 p-3 bg-background rounded-md">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletionLogCard;