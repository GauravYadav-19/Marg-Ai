'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

// --- DATA ---
const CAREER_GOALS = [
  { 
    id: 'faang-sde', 
    title: 'FAANG SDE', 
    desc: 'Master DSA, System Design, and behavioral patterns for top-tier tech interviews.',
    icon: 'BriefcaseIcon',
    activeColor: 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
  },
  { 
    id: 'ai-engineer', 
    title: 'AI Engineer', 
    desc: 'Deep Dive into Neural Networks, PyTorch, LLMs, and Computer Vision pipelines.',
    icon: 'CpuChipIcon',
    activeColor: 'border-blue-500 bg-blue-500/10 text-blue-500'
  },
  { 
    id: 'web-dev', 
    title: 'Full Stack Dev', 
    desc: 'Build production-ready apps using React, Next.js, Node, and modern databases.',
    icon: 'CodeBracketIcon',
    activeColor: 'border-purple-500 bg-purple-500/10 text-purple-500'
  },
  { 
    id: 'hackathon', 
    title: 'Hackathon Winner', 
    desc: 'Rapid prototyping, MVP strategies, and high-impact presentation skills.',
    icon: 'RocketLaunchIcon',
    activeColor: 'border-orange-500 bg-orange-500/10 text-orange-500'
  }
];

const SKILL_LEVELS = [
  { id: 'Beginner', label: 'Beginner', desc: 'Starting from scratch. Need fundamentals.', icon: 'AcademicCapIcon' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Built a few projects. Ready for depth.', icon: 'BeakerIcon' },
  { id: 'Advanced', label: 'Advanced', desc: 'Professional experience. Need mastery.', icon: 'TrophyIcon' }
];

const FOCUS_AREAS_OPTIONS = [
  'System Design', 'Algorithms', 'Testing', 'Deployment', 'Security', 'Performance', 'UI/UX', 'Database Design'
];

const LOADING_STEPS = [
  "Analyzing industry requirements...",
  "Scanning 500+ top-rated resources...",
  "Structuring learning phases...",
  "Personalizing your timeline...",
  "Finalizing your roadmap..."
];

export default function RoadmapGeneratorInteractive() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    goal: '',
    goalId: '',
    level: 'Beginner',
    hoursPerDay: 2,
    deadline: '',
    languages: [] as string[],
    focusAreas: [] as string[]
  });

  // Loading Animation Loop
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // --- HANDLERS ---
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  
  const handleBack = () => {
    if (step === 1) {
      router.push('/dashboard');
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleExit = () => {
    if (confirm("Exit roadmap creation? Progress will be lost.")) {
      router.push('/dashboard');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem('generatedRoadmapData', JSON.stringify(data));
        localStorage.setItem('roadmapUserInput', JSON.stringify(formData));
        localStorage.removeItem('roadmapAlreadySaved'); 
      }
      router.push('/generated-roadmap');
    } catch (error) {
      console.error("Generation failed", error);
      setIsGenerating(false);
      alert("Something went wrong.");
    }
  };

  // --- ANIMATION VARIANTS ---
  const fadeIn = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 }
  };

  // --- RENDER ---
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-8 relative">
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="SparklesIcon" size={32} className="text-primary animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Building Your Path</h2>
          
          <div className="h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p 
                key={loadingMsgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400 text-lg"
              >
                {LOADING_STEPS[loadingMsgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col font-sans">
      {/* HEADER */}
      <header className="px-6 py-6 border-b border-gray-800 flex items-center justify-between bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                <Icon name="MapIcon" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Create Roadmap</h1>
              <p className="text-xs text-gray-400">Step {step} of 5</p>
            </div>
         </div>
         
         <button 
           onClick={handleExit}
           className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
         >
            <Icon name="XMarkIcon" size={24} />
         </button>
      </header>

      {/* PROGRESS BAR */}
      <div className="w-full h-1 bg-gray-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col items-center justify-start pt-12 pb-24 px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GOAL */}
          {step === 1 && (
            <motion.div key="step1" {...fadeIn} className="w-full max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-3">What is your career goal?</h2>
                <p className="text-gray-400 text-lg">Choose the path that aligns with your aspirations.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-2">
                {CAREER_GOALS.map((goal) => {
                  const isActive = formData.goalId === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setFormData({...formData, goal: goal.title, goalId: goal.id})}
                      className={`relative group p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-1 ${
                        isActive 
                          ? `${goal.activeColor} shadow-2xl` // Active State
                          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? 'bg-white/10' : 'bg-gray-700/50 group-hover:bg-gray-700'
                        }`}>
                          <Icon name={goal.icon as any} size={28} />
                        </div>
                        {isActive && (
                          <div className="bg-white/20 p-1 rounded-full animate-scale-in">
                            <Icon name="CheckCircleIcon" size={24} variant="solid" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{goal.title}</h3>
                      <p className={`text-sm leading-relaxed ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {goal.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: LEVEL */}
          {step === 2 && (
            <motion.div key="step2" {...fadeIn} className="w-full max-w-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">What's your experience level?</h2>
                <p className="text-gray-400">We'll adjust the curriculum depth accordingly.</p>
              </div>

              <div className="space-y-4">
                {SKILL_LEVELS.map((level) => {
                  const isActive = formData.level === level.id;
                  return (
                    <button
                      key={level.id}
                      onClick={() => setFormData({...formData, level: level.id})}
                      className={`w-full p-6 rounded-2xl border-2 flex items-center gap-6 transition-all ${
                        isActive
                          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10'
                          : 'bg-gray-800/30 border-gray-700 hover:border-gray-500 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 ${
                         isActive ? 'border-primary bg-primary text-white' : 'border-gray-600 text-gray-500'
                      }`}>
                         <Icon name={level.icon as any} size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className={`text-xl font-bold ${isActive ? 'text-primary' : 'text-white'}`}>
                          {level.label}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">{level.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: TIME & DEADLINE */}
          {step === 3 && (
            <motion.div key="step3" {...fadeIn} className="w-full max-w-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">Time & Availability</h2>
                {/* 🔴 FIXED: Changed > to &gt; to prevent syntax error */}
                <p className="text-gray-400">Be realistic. Consistency &gt; Intensity.</p>
              </div>

              <div className="space-y-10 bg-gray-800/30 p-8 rounded-3xl border border-gray-700">
                {/* Slider */}
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <label className="text-lg font-medium">Daily Commitment</label>
                    <span className="text-3xl font-bold text-primary">{formData.hoursPerDay} hrs</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="10" step="1"
                    value={formData.hoursPerDay}
                    onChange={(e) => setFormData({...formData, hoursPerDay: parseInt(e.target.value)})}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span>1 hr (Relaxed)</span>
                    <span>10 hrs (Bootcamp Mode)</span>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                   <label className="block text-lg font-medium mb-4">Target Deadline (Optional)</label>
                   <div className="relative">
                     <input 
                       type="date"
                       style={{ colorScheme: 'dark' }} 
                       className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-500"
                       onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                     />
                   </div>
                   <p className="text-sm text-gray-500 mt-2">Leave blank if you want a flexible schedule.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: TECH STACK & FOCUS AREAS */}
          {step === 4 && (
            <motion.div key="step4" {...fadeIn} className="w-full max-w-2xl">
               <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Preferences</h2>
                <p className="text-gray-400">Tailor the roadmap to your needs.</p>
              </div>

              <div className="space-y-8">
                {/* Section 1: Languages */}
                <div>
                   <h3 className="text-xl font-semibold mb-4 text-gray-200">Tech Stack</h3>
                   <div className="flex flex-wrap gap-3">
                    {['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map(lang => {
                      const isSelected = formData.languages.includes(lang);
                      return (
                        <button
                          key={lang}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              languages: isSelected 
                                ? formData.languages.filter(l => l !== lang)
                                : [...formData.languages, lang]
                            });
                          }}
                          className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:scale-105 ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          {lang}
                        </button>
                      );
                    })}
                   </div>
                </div>

                {/* Section 2: Focus Areas (RESTORED) */}
                <div>
                   <h3 className="text-xl font-semibold mb-4 text-gray-200">Focus Areas</h3>
                   <div className="flex flex-wrap gap-3">
                    {FOCUS_AREAS_OPTIONS.map(area => {
                      const isSelected = formData.focusAreas.includes(area);
                      return (
                        <button
                          key={area}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              focusAreas: isSelected 
                                ? formData.focusAreas.filter(a => a !== area)
                                : [...formData.focusAreas, area]
                            });
                          }}
                          className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:scale-105 ${
                            isSelected
                              ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          {area}
                        </button>
                      );
                    })}
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <motion.div key="step5" {...fadeIn} className="w-full max-w-xl">
               <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Review & Generate</h2>
                <p className="text-gray-400">Ready to build your {formData.goal} roadmap?</p>
              </div>

              <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden divide-y divide-gray-700/50">
                 {[
                   { label: 'Career Goal', value: formData.goal, icon: 'BriefcaseIcon' },
                   { label: 'Skill Level', value: formData.level, icon: 'AcademicCapIcon' },
                   { label: 'Daily Time', value: `${formData.hoursPerDay} hours`, icon: 'ClockIcon' },
                   { label: 'Tech Stack', value: formData.languages.join(', ') || 'AI Recommended', icon: 'CodeBracketIcon' },
                   // 🔴 FIX: Show Focus Areas and handle empty case gracefully
                   { label: 'Focus Areas', value: formData.focusAreas.join(', ') || 'Comprehensive', icon: 'LightBulbIcon' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-5 hover:bg-gray-800/80 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="text-gray-400"><Icon name={item.icon as any} size={22} /></div>
                         <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{item.label}</p>
                            <p className="text-lg font-medium text-white">{item.value}</p>
                         </div>
                      </div>
                      <button onClick={() => setStep(i + 1)} className="text-primary hover:text-primary/80">
                        <Icon name="PencilSquareIcon" size={20} />
                      </button>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER ACTIONS */}
      <footer className="px-6 py-6 border-t border-gray-800 bg-[#0B1120]/90 backdrop-blur-md fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-8 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white font-medium transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.goal}
              className="px-10 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/10"
            >
              Next Step &rarr;
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="px-10 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 animate-pulse-slow"
            >
              <Icon name="SparklesIcon" size={20} />
              Generate My Roadmap
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}