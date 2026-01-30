'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ActionControlsProps {
  onRegenerate: () => void;
  onEdit: () => void;
  onShare: () => void;
  onExport: () => void;
}

const ActionControls = ({
  onRegenerate,
  onEdit,
  onShare,
  onExport,
}: ActionControlsProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-md font-caption font-medium transition-smooth hover:opacity-90 active:scale-[0.97]"
      >
        <Icon name="ArrowPathIcon" size={18} variant="outline" />
        <span>Regenerate</span>
      </button>

      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-md font-caption font-medium transition-smooth hover:bg-muted/80 active:scale-[0.97]"
      >
        <Icon name="PencilSquareIcon" size={18} variant="outline" />
        <span>Edit Preferences</span>
      </button>

      <div className="relative">
        <button
          onClick={() => {
            setShowShareMenu(!showShareMenu);
            setShowExportMenu(false);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-md font-caption font-medium transition-smooth hover:bg-muted/80 active:scale-[0.97]"
        >
          <Icon name="ShareIcon" size={18} variant="outline" />
          <span>Share</span>
        </button>

        {showShareMenu && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg overflow-hidden z-10 animate-fade-in">
            <button
              onClick={() => {
                onShare();
                setShowShareMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-caption text-foreground transition-smooth hover:bg-muted"
            >
              <Icon name="LinkIcon" size={16} variant="outline" />
              <span>Copy Link</span>
            </button>
            <button
              onClick={() => {
                setShowShareMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-caption text-foreground transition-smooth hover:bg-muted"
            >
              <Icon name="EnvelopeIcon" size={16} variant="outline" />
              <span>Email</span>
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setShowExportMenu(!showExportMenu);
            setShowShareMenu(false);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-md font-caption font-medium transition-smooth hover:bg-muted/80 active:scale-[0.97]"
        >
          <Icon name="ArrowDownTrayIcon" size={18} variant="outline" />
          <span>Export</span>
        </button>

        {showExportMenu && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg overflow-hidden z-10 animate-fade-in">
            <button
              onClick={() => {
                onExport();
                setShowExportMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-caption text-foreground transition-smooth hover:bg-muted"
            >
              <Icon name="DocumentTextIcon" size={16} variant="outline" />
              <span>Export as PDF</span>
            </button>
            <button
              onClick={() => {
                setShowExportMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-caption text-foreground transition-smooth hover:bg-muted"
            >
              <Icon name="DocumentIcon" size={16} variant="outline" />
              <span>Export as JSON</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionControls;