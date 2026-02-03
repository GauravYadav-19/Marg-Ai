'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Icon from '@/components/ui/AppIcon';
import NavigationBar from '@/components/common/NavigationBar';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push('/login');
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleDeleteHistory = async () => {
    if (!confirm("Are you sure? This will delete ALL your saved roadmaps permanently.")) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('roadmaps')
      .delete()
      .eq('user_id', user.id);

    setLoading(false);
    
    if (error) alert("Error deleting data.");
    else alert("History cleared!");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-24 px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Account Settings</h1>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Icon name="UserIcon" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {user?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Actions Grid */}
          <div className="space-y-6">
            
            {/* Preferences Section */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Preferences</h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                      <Icon name="SparklesIcon" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">AI Model</p>
                      <p className="text-xs text-muted-foreground">Gemini 1.5 Flash (Standard)</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full font-medium">Active</span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div>
              <h3 className="text-lg font-medium text-red-500 mb-4">Danger Zone</h3>
              <div className="bg-card border border-red-900/20 rounded-xl overflow-hidden">
                <button 
                  onClick={handleDeleteHistory}
                  disabled={loading}
                  className="w-full p-4 flex items-center justify-between hover:bg-red-500/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                      <Icon name="TrashIcon" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Clear Roadmap History</p>
                      <p className="text-xs text-muted-foreground">Delete all your generated roadmaps</p>
                    </div>
                  </div>
                  <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
                </button>
                
                <div className="h-px bg-border/50" />
                
                <button 
                  onClick={handleSignOut}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted text-foreground rounded-lg">
                      <Icon name="ArrowRightIcon" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sign Out</p>
                      <p className="text-xs text-muted-foreground">Log out of your account</p>
                    </div>
                  </div>
                  <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}