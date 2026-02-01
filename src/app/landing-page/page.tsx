import type { Metadata } from 'next';
import LandingPageInteractive from './components/LandingPageInteractive';
// Import the Supabase client
import { supabase } from '@/lib/supabaseClient';

export const metadata: Metadata = {
  title: 'MargAI - AI-Powered Personalized Learning Roadmaps',
  description: 'Eliminate learning overwhelm with personalized roadmaps that tell you exactly what to learn, in what order, and what to ignore for your tech career goals.',
};

export default function LandingPage() {
  // THIS Log will appear in your VS Code Terminal (Black Window)
  console.log("Supabase Check (Server):", supabase ? "Active" : "Failed");

  return <LandingPageInteractive />;
}