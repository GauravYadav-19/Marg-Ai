import type { Metadata } from 'next';
import ProgressTrackerInteractive from './components/ProgressTrackerInteractive';

export const metadata: Metadata = {
  title: 'Progress Tracker - MargAI',
  description:
    'Monitor your learning journey with comprehensive progress tracking, completion logs, analytics, and achievement milestones for your personalized roadmap.',
};

export default function ProgressTrackerPage() {
  return <ProgressTrackerInteractive />;
}