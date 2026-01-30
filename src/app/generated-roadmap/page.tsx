import type { Metadata } from 'next';
import NavigationBar from '@/components/common/NavigationBar';
import GeneratedRoadmapInteractive from './components/GeneratedRoadmapInteractive';

export const metadata: Metadata = {
  title: 'Generated Roadmap - MargAI',
  description:
    'View your personalized AI-generated learning roadmap with phase-based structure, weekly breakdowns, and progress tracking for your tech career goals.',
};

export default function GeneratedRoadmapPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <GeneratedRoadmapInteractive />
      </div>
    </main>
  );
}