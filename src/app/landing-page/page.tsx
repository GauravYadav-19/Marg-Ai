import type { Metadata } from 'next';
import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata: Metadata = {
  title: 'MargAI - AI-Powered Personalized Learning Roadmaps',
  description: 'Eliminate learning overwhelm with personalized roadmaps that tell you exactly what to learn, in what order, and what to ignore for your tech career goals.',
};

export default function LandingPage() {
  return <LandingPageInteractive />;
}