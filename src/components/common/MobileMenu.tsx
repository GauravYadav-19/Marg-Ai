'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

const MobileMenu = ({ isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { label: 'Home', path: '/landing-page', icon: 'HomeIcon' },
    { label: 'Generate', path: '/roadmap-generator', icon: 'SparklesIcon' },
    { label: 'My Roadmap', path: '/generated-roadmap', icon: 'MapIcon' },
    { label: 'Progress', path: '/progress-tracker', icon: 'ChartBarIcon' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNavClick = (path: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const isActive = (path: string) => pathname === path;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] md:hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute top-16 left-0 right-0 bottom-0 bg-card overflow-y-auto animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-6 gap-2">
          {navigationItems.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center gap-3 px-6 py-4 rounded-md font-caption font-medium transition-smooth active:scale-[0.97] ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground glow-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              style={{
                animation: `slide-in 0.25s ease-out ${index * 0.05}s both`,
              }}
            >
              <Icon
                name={item.icon as any}
                size={24}
                variant={isActive(item.path) ? 'solid' : 'outline'}
              />
              <span className="text-base">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary-foreground" />
              )}
            </Link>
          ))}
        </div>

        <div className="px-6 py-4 mt-8 border-t border-border">
          <p className="text-xs font-caption text-muted-foreground text-center">
            © 2026 MargAI. Your AI-powered learning companion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;