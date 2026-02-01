'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import GoalSelectionStep from './GoalSelectionStep';
import SkillLevelStep from './SkillLevelStep';
import TimeCommitmentStep from './TimeCommitmentStep';
import TechPreferencesStep from './TechPreferencesStep';
import SummaryStep from './SummaryStep';
import LoadingState from './LoadingState';

interface FormData {
  goal: string;
  level: string;
  hoursPerDay: number;
  deadline: string;
  languages: string[];
  focusAreas: string[];
}

const RoadmapGeneratorInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    goal: '',
    level: '',
    hoursPerDay: 2,
    deadline: '',
    languages: [],
    focusAreas: []
  });

  const totalSteps = 5;
  const stepTitles = ['Goal', 'Level', 'Time', 'Tech Stack', 'Review'];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGoalSelect = (goal: string) => {
    setFormData({ ...formData, goal });
  };

  const handleLevelSelect = (level: string) => {
    setFormData({ ...formData, level });
  };

  const handleHoursChange = (hours: number) => {
    setFormData({ ...formData, hoursPerDay: hours });
  };

  const handleDeadlineChange = (deadline: string) => {
    setFormData({ ...formData, deadline });
  };

  const handleLanguageToggle = (languageId: string) => {
    const languages = formData.languages.includes(languageId)
      ? formData.languages.filter(id => id !== languageId)
      : [...formData.languages, languageId];
    setFormData({ ...formData, languages });
  };

  const handleFocusAreaToggle = (areaId: string) => {
    const focusAreas = formData.focusAreas.includes(areaId)
      ? formData.focusAreas.filter(id => id !== areaId)
      : [...formData.focusAreas, areaId];
    setFormData({ ...formData, focusAreas });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.goal !== '';
      case 1:
        return formData.level !== '';
      case 2:
        return formData.hoursPerDay > 0;
      case 3:
        return formData.languages.length > 0 && formData.focusAreas.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // 1. Send the user's choices to your new API
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate roadmap');
      }

      // 2. Save the REAL AI response to local storage
      if (isHydrated) {
        // We save the 'data' (the AI response), not just 'formData' (the user input)
        localStorage.setItem('generatedRoadmapData', JSON.stringify(data));
        // We can also keep the user input if you want
        localStorage.setItem('roadmapFormData', JSON.stringify(formData));
      }

      // 3. Navigate to the results page
      router.push('/generated-roadmap');

    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate roadmap. Please check your API key.");
      setIsGenerating(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <LoadingState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Create Your Roadmap
            </h1>
            <span className="text-sm font-caption text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <ProgressIndicator
            completionData={{
              current: currentStep + 1,
              total: totalSteps,
              label: stepTitles[currentStep]
            }}
            displayMode="form"
          />
        </div>

        <div className="bg-card rounded-lg border border-border p-8 mb-6">
          {currentStep === 0 && (
            <GoalSelectionStep
              selectedGoal={formData.goal}
              onGoalSelect={handleGoalSelect}
            />
          )}
          {currentStep === 1 && (
            <SkillLevelStep
              selectedLevel={formData.level}
              onLevelSelect={handleLevelSelect}
            />
          )}
          {currentStep === 2 && (
            <TimeCommitmentStep
              hoursPerDay={formData.hoursPerDay}
              deadline={formData.deadline}
              onHoursChange={handleHoursChange}
              onDeadlineChange={handleDeadlineChange}
            />
          )}
          {currentStep === 3 && (
            <TechPreferencesStep
              selectedLanguages={formData.languages}
              selectedFocusAreas={formData.focusAreas}
              onLanguageToggle={handleLanguageToggle}
              onFocusAreaToggle={handleFocusAreaToggle}
            />
          )}
          {currentStep === 4 && (
            <SummaryStep formData={formData} onEdit={handleEdit} />
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-caption font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Icon name="ArrowLeftIcon" size={20} variant="outline" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-caption font-medium transition-smooth hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed glow-sm"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <Icon name="SparklesIcon" size={20} variant="outline" />
                Generate Roadmap
              </>
            ) : (
              <>
                Next
                <Icon name="ArrowRightIcon" size={20} variant="outline" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGeneratorInteractive;