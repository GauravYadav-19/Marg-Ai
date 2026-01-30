'use client';

import Icon from '@/components/ui/AppIcon';

interface TechOption {
  id: string;
  label: string;
  icon: string;
}

interface TechPreferencesStepProps {
  selectedLanguages: string[];
  selectedFocusAreas: string[];
  onLanguageToggle: (languageId: string) => void;
  onFocusAreaToggle: (areaId: string) => void;
}

const TechPreferencesStep = ({
  selectedLanguages,
  selectedFocusAreas,
  onLanguageToggle,
  onFocusAreaToggle
}: TechPreferencesStepProps) => {
  const languages: TechOption[] = [
    { id: 'cpp', label: 'C++', icon: 'CodeBracketIcon' },
    { id: 'python', label: 'Python', icon: 'CommandLineIcon' },
    { id: 'javascript', label: 'JavaScript', icon: 'CursorArrowRaysIcon' }
  ];

  const focusAreas: TechOption[] = [
    { id: 'ai', label: 'AI/ML', icon: 'CpuChipIcon' },
    { id: 'web', label: 'Web Development', icon: 'GlobeAltIcon' },
    { id: 'core-cs', label: 'Core CS', icon: 'AcademicCapIcon' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Choose your tech stack
        </h2>
        <p className="text-base font-caption text-muted-foreground">
          Select languages and focus areas that align with your goals
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-caption font-medium text-foreground">
            Preferred programming languages
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onLanguageToggle(lang.id)}
                className={`p-4 rounded-lg border-2 transition-smooth ${
                  selectedLanguages.includes(lang.id)
                    ? 'border-primary bg-primary/5 glow-border' :'border-border bg-card hover:border-primary/50 hover:bg-muted'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-md transition-smooth ${
                      selectedLanguages.includes(lang.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon name={lang.icon as any} size={24} variant="outline" />
                  </div>
                  <span className="text-sm font-caption font-medium text-foreground">
                    {lang.label}
                  </span>
                  {selectedLanguages.includes(lang.id) && (
                    <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-caption font-medium text-foreground">
            Focus areas
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {focusAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => onFocusAreaToggle(area.id)}
                className={`p-4 rounded-lg border-2 transition-smooth ${
                  selectedFocusAreas.includes(area.id)
                    ? 'border-primary bg-primary/5 glow-border' :'border-border bg-card hover:border-primary/50 hover:bg-muted'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-md transition-smooth ${
                      selectedFocusAreas.includes(area.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon name={area.icon as any} size={24} variant="outline" />
                  </div>
                  <span className="text-sm font-caption font-medium text-foreground">
                    {area.label}
                  </span>
                  {selectedFocusAreas.includes(area.id) && (
                    <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="InformationCircleIcon" size={20} variant="outline" className="text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-caption font-medium text-foreground">
                Multiple selections allowed
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Choose all that apply. We'll create a roadmap that covers your selected areas without overwhelming you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechPreferencesStep;
