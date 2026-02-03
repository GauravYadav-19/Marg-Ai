'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { supabase } from '@/lib/supabaseClient';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

interface NavigationBarProps {
  onNavigate?: (path: string) => void;
}

const NavigationBar = ({ onNavigate }: NavigationBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 1. DYNAMIC NAVIGATION: Only show Roadmap/Progress if logged in
 // 1. STRATEGIC NAVIGATION PLAN
  const navigationItems: NavigationItem[] = [
    // --- Public Links ---
    { label: 'Home', path: '/landing-page', icon: 'HomeIcon' },
    { label: 'Explore', path: '/explore', icon: 'GlobeAltIcon' },
    
    // --- Feature Links ---
    { label: 'Generate', path: '/roadmap-generator', icon: 'SparklesIcon' },

    // --- Private Links ---
    ...(!user ? [
       { label: 'Pricing', path: '/pricing', icon: 'CurrencyDollarIcon' },
    ] : []),

    ...(user ? [
      // CHANGE: Renamed "Dashboard" to "My Roadmaps" and removed the old single link
      { label: 'My Roadmaps', path: '/dashboard', icon: 'Squares2X2Icon' }, 
      { label: 'Settings', path: '/settings', icon: 'Cog6ToothIcon' },
    ] : [])
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) onNavigate(path);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'bg-card shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* LOGO SECTION */}
            <Link
              href="/landing-page"
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
              onClick={() => handleNavClick('/landing-page')}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500 text-white shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                MargAI
              </span>
            </Link>

            {/* NAVIGATION CAPSULE (Now Dynamic) */}
            <div className="hidden md:flex items-center gap-1 bg-gray-800/50 backdrop-blur-md p-1.5 rounded-full border border-gray-700/50">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon name={item.icon as any} size={16} variant="outline" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* AUTH BUTTONS */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                     <span className="text-xs text-gray-400">Signed in as</span>
                     <span className="text-sm font-medium text-emerald-400">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm border border-gray-600 px-4 py-2 rounded-lg hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-gray-800 transition-colors"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} variant="outline" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
          <div
            className="absolute top-20 left-4 right-4 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4 gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive(item.path)
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} variant="outline" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <div className="h-px bg-gray-700 my-2" />

              {/* Mobile Auth */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-3 rounded-xl text-red-400 font-medium hover:bg-red-500/10 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;