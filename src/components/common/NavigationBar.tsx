'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Home', path: '/landing-page', icon: 'HomeIcon' },
    { label: 'Generate', path: '/roadmap-generator', icon: 'SparklesIcon' },
    { label: 'My Roadmap', path: '/generated-roadmap', icon: 'MapIcon' },
    { label: 'Progress', path: '/progress-tracker', icon: 'ChartBarIcon' },
  ];

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

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-smooth ${
          scrolled ? 'bg-card glow-sm' : 'bg-card'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/landing-page"
              className="flex items-center gap-3 transition-smooth hover:opacity-80"
              onClick={() => handleNavClick('/landing-page')}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">
                MargAI
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md font-caption font-medium transition-smooth ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} variant="outline" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon
                name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
                size={24}
                variant="outline"
              />
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[200] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-background" />
          <div
            className="absolute top-16 left-0 right-0 bottom-0 bg-card overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-6 gap-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-md font-caption font-medium transition-smooth ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  style={{
                    animation: `slide-in 0.25s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <Icon name={item.icon as any} size={24} variant="outline" />
                  <span className="text-base">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;