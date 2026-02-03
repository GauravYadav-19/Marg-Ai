'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Icon from '@/components/ui/AppIcon';
import NavigationBar from '@/components/common/NavigationBar'; // 👈 IMPORTED NAVBAR

// Define what a "Roadmap" looks like coming from the DB
interface SavedRoadmap {
  id: string;
  title: string;
  created_at: string;
  content: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      // 1. Check User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
        return;
      }
      setUser(user);

      // 2. Fetch Data
      console.log("Fetching roadmaps...");
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRoadmaps(data || []);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenRoadmap = (roadmap: SavedRoadmap) => {
    // 1. Save Content for the viewer to render
    localStorage.setItem('generatedRoadmapData', JSON.stringify(roadmap.content));
    
    // 2. NEW: Save the ID so we can update the database later!
    localStorage.setItem('currentRoadmapId', roadmap.id); 
    
    // 3. Set flags
    localStorage.setItem('roadmapAlreadySaved', 'true'); // Don't duplicate it
    
    router.push('/generated-roadmap');
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this roadmap?")) return;

    // Optimistic UI Update (Remove it from screen immediately)
    setRoadmaps(prev => prev.filter(r => r.id !== id));

    const { error } = await supabase.from('roadmaps').delete().eq('id', id);
    if (error) {
      alert("Failed to delete. Please try again.");
      fetchRoadmaps(); // Revert if failed
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 1. THE NAVBAR (Fixes the "Empty" feeling) */}
      <NavigationBar />

      <main className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Roadmaps</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, <span className="text-primary">{user?.email?.split('@')[0]}</span>
              </p>
            </div>
            <button
              onClick={() => router.push('/roadmap-generator')}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20"
            >
              <Icon name="PlusIcon" size={20} variant="outline" />
              Create New
            </button>
          </div>

          {/* Empty State */}
          {roadmaps.length === 0 ? (
            <div className="text-center py-20 bg-card/50 rounded-2xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="DocumentIcon" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">No roadmaps yet</h3>
              <p className="text-muted-foreground mb-6">Create your first AI-powered learning path.</p>
              <button
                onClick={() => router.push('/roadmap-generator')}
                className="text-primary hover:underline font-medium"
              >
                Get Started &rarr;
              </button>
            </div>
          ) : (
            /* Grid of Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((roadmap, index) => (
                <div
                  // FIX: Use fallback index if ID is missing to prevent React Warning
                  key={roadmap.id || index}
                  onClick={() => handleOpenRoadmap(roadmap)}
                  className="group relative bg-card hover:bg-muted/50 border border-border rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, roadmap.id)}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 rounded-md backdrop-blur-sm"
                    title="Delete Roadmap"
                  >
                    <Icon name="TrashIcon" size={18} variant="outline" />
                  </button>

                  {/* Card Content */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {roadmap.content.skillLevel || 'Learning Path'}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground line-clamp-2 min-h-[3.5rem]">
                      {roadmap.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Icon name="CalendarIcon" size={14} variant="outline" />
                      {roadmap.created_at ? new Date(roadmap.created_at).toLocaleDateString() : 'Just now'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="ClockIcon" size={14} variant="outline" />
                      {roadmap.content.timeCommitment || 'Flexible'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}