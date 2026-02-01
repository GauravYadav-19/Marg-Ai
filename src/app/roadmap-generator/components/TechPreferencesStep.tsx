import React from 'react';

// This interface must match exactly what the Parent is passing down
interface TechPreferencesStepProps {
  selectedLanguages: string[];
  selectedFocusAreas: string[];
  onLanguageToggle: (id: string) => void;
  onFocusAreaToggle: (id: string) => void;
}

export default function TechPreferencesStep({
  selectedLanguages,
  selectedFocusAreas,
  onLanguageToggle,
  onFocusAreaToggle
}: TechPreferencesStepProps) {
  
  const languages = [
    { id: 'python', label: 'Python' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'java', label: 'Java' },
    { id: 'cpp', label: 'C++' },
    { id: 'go', label: 'Go' },
  ];

  const focusAreas = [
    { id: 'frontend', label: 'Frontend Dev' },
    { id: 'backend', label: 'Backend Dev' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'mobile', label: 'Mobile App Dev' },
  ];

  return (
    <div className="space-y-8">
      {/* Language Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Preferred Languages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {languages.map((lang) => (
            <label
              key={lang.id}
              className={`
                cursor-pointer relative flex items-center justify-center px-4 py-3 rounded-lg border transition-all
                ${selectedLanguages.includes(lang.id)
                  ? 'border-primary bg-primary/10 text-primary font-medium ring-1 ring-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground bg-card'
                }
              `}
            >
              <input
                type="checkbox"
                className="sr-only" // Hidden visually but accessible
                checked={selectedLanguages.includes(lang.id)}
                onChange={() => onLanguageToggle(lang.id)}
              />
              <span>{lang.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Focus Area Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Focus Areas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {focusAreas.map((area) => (
            <label
              key={area.id}
              className={`
                cursor-pointer relative flex items-center justify-center px-4 py-3 rounded-lg border transition-all
                ${selectedFocusAreas.includes(area.id)
                  ? 'border-primary bg-primary/10 text-primary font-medium ring-1 ring-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground bg-card'
                }
              `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedFocusAreas.includes(area.id)}
                onChange={() => onFocusAreaToggle(area.id)}
              />
              <span>{area.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}