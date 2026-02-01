import { redirect } from 'next/navigation';
// Import at top
import { supabase } from '@/lib/supabaseClient';

// Inside the component
console.log("Supabase Connection:", supabase ? "Active" : "Failed");
export default function Home() {
  redirect('/landing-page');
}