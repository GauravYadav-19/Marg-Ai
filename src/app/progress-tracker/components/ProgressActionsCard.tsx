'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProgressActionsCardProps {
  onExportProgress: () => void;
  onResetProgress: () => void;
  onGenerateCertificate: () => void;
}

const ProgressActionsCard = ({
  onExportProgress,
  onResetProgress,
  onGenerateCertificate,
}: ProgressActionsCardProps) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleResetConfirm = () => {
    onResetProgress();
    setShowResetConfirm(false);
  };

  const handleResetCancel = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 glow-sm">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={onExportProgress}
            className="flex flex-col items-center gap-3 p-6 bg-muted rounded-md hover:bg-muted/80 transition-smooth active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon
                name="ArrowDownTrayIcon"
                size={24}
                variant="outline"
                className="text-primary"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-heading font-medium text-foreground">
                Export Progress
              </span>
              <span className="text-sm font-caption text-muted-foreground text-center">
                Download your progress report
              </span>
            </div>
          </button>

          <button
            onClick={onGenerateCertificate}
            className="flex flex-col items-center gap-3 p-6 bg-muted rounded-md hover:bg-muted/80 transition-smooth active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <Icon
                name="AcademicCapIcon"
                size={24}
                variant="outline"
                className="text-success"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-heading font-medium text-foreground">
                Get Certificate
              </span>
              <span className="text-sm font-caption text-muted-foreground text-center">
                Generate completion certificate
              </span>
            </div>
          </button>

          <button
            onClick={handleResetClick}
            className="flex flex-col items-center gap-3 p-6 bg-muted rounded-md hover:bg-muted/80 transition-smooth active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
              <Icon
                name="ArrowPathIcon"
                size={24}
                variant="outline"
                className="text-error"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-base font-heading font-medium text-foreground">
                Reset Progress
              </span>
              <span className="text-sm font-caption text-muted-foreground text-center">
                Start fresh with new roadmap
              </span>
            </div>
          </button>
        </div>

        {showResetConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-card rounded-lg p-6 max-w-md w-full glow-md animate-scale-in">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
                    <Icon
                      name="ExclamationTriangleIcon"
                      size={24}
                      variant="outline"
                      className="text-error"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      Reset Progress?
                    </h3>
                    <p className="text-sm font-caption text-muted-foreground">
                      This will permanently delete all your progress, completion
                      history, and achievements. This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetCancel}
                    className="flex-1 px-6 py-3 rounded-md bg-muted text-foreground font-caption font-medium hover:bg-muted/80 transition-smooth"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetConfirm}
                    className="flex-1 px-6 py-3 rounded-md bg-error text-white font-caption font-medium hover:bg-error/90 transition-smooth"
                  >
                    Reset Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressActionsCard;