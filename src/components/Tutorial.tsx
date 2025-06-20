
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  route?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: '🎮 Welcome to SkillSynq+!',
    description: 'Let\'s take a quick tour to help you master all the features! This is your learning adventure hub where you can develop skills in a fun, Mario-themed environment.',
    position: 'center'
  },
  {
    id: 'hero-section',
    title: '🏰 Your Personal Dashboard',
    description: 'This is your main dashboard! Here you can see your progress and navigate to different sections. Notice the Mario-themed design that makes learning fun!',
    targetSelector: '.hero-section',
    position: 'bottom'
  },
  {
    id: 'achievements-button',
    title: '🏆 View Your Achievements',
    description: 'Click here to see all the stars and badges you\'ve collected! Track your progress and celebrate your victories.',
    targetSelector: '[data-tutorial="achievements-button"]',
    position: 'bottom'
  },
  {
    id: 'skill-categories',
    title: '📚 Skill Categories',
    description: 'These are your skill categories! Each category contains different skills you can learn. Click on any category to explore the skills inside.',
    targetSelector: '.skill-categories',
    position: 'top'
  },
  {
    id: 'mentor-section',
    title: '🎓 Become a Mentor',
    description: 'Ready to share your knowledge? This section allows you to become a mentor and help others learn while earning rewards!',
    targetSelector: '.mentor-section',
    position: 'top'
  },
  {
    id: 'profile-access',
    title: '👤 Your Profile',
    description: 'Access your profile settings and personal information from the top-right corner. You can also log out from here.',
    route: '/home',
    targetSelector: '[data-tutorial="auth-button"]',
    position: 'left'
  },
  {
    id: 'smart-mario',
    title: '🤖 Smart Mario Assistant',
    description: 'Meet your AI learning companion! Smart Mario can help answer questions and guide you through your learning journey.',
    route: '/smart-mario',
    position: 'center'
  },
  {
    id: 'complete',
    title: '🎉 Tutorial Complete!',
    description: 'Congratulations! You\'re now ready to start your learning adventure. Remember, you can always explore different skills and track your progress. Happy learning!',
    position: 'center'
  }
];

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const step = tutorialSteps[currentStep];
    if (step.route) {
      navigate(step.route);
    }

    // Wait a bit for navigation and DOM updates
    setTimeout(() => {
      if (step.targetSelector) {
        const element = document.querySelector(step.targetSelector) as HTMLElement;
        if (element) {
          setHighlightedElement(element);
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setHighlightedElement(null);
      }
    }, 500);
  }, [currentStep, isOpen, navigate]);

  useEffect(() => {
    if (!isOpen) {
      setHighlightedElement(null);
      return;
    }

    // Add tutorial overlay class to body
    document.body.classList.add('tutorial-active');
    
    return () => {
      document.body.classList.remove('tutorial-active');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStepData = tutorialSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTooltipPosition = () => {
    if (!highlightedElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    
    const rect = highlightedElement.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    
    switch (currentStepData.position) {
      case 'top':
        return {
          top: `${rect.top - tooltipHeight - 20}px`,
          left: `${rect.left + rect.width / 2 - tooltipWidth / 2}px`
        };
      case 'bottom':
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2 - tooltipWidth / 2}px`
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2 - tooltipHeight / 2}px`,
          left: `${rect.left - tooltipWidth - 20}px`
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2 - tooltipHeight / 2}px`,
          left: `${rect.right + 20}px`
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Highlight */}
      {highlightedElement && (
        <div
          className="fixed border-4 border-mario-yellow rounded-lg z-50 pointer-events-none animate-pulse"
          style={{
            top: `${highlightedElement.getBoundingClientRect().top - 4}px`,
            left: `${highlightedElement.getBoundingClientRect().left - 4}px`,
            width: `${highlightedElement.getBoundingClientRect().width + 8}px`,
            height: `${highlightedElement.getBoundingClientRect().height + 8}px`,
          }}
        />
      )}
      
      {/* Tutorial Tooltip */}
      <div
        className="fixed bg-mario-white border-4 border-mario-black rounded-lg p-6 shadow-2xl z-50 max-w-sm"
        style={getTooltipPosition()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-mario text-mario-red">{currentStepData.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-mario-red hover:bg-mario-red hover:text-white"
          >
            <X size={16} />
          </Button>
        </div>
        
        <p className="text-sm font-mario-text font-bold text-mario-blue mb-6">
          {currentStepData.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs font-mario-text font-bold text-mario-blue">
            Step {currentStep + 1} of {tutorialSteps.length}
          </span>
          
          <div className="flex gap-2">
            {!isFirstStep && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="border-mario-blue text-mario-blue hover:bg-mario-blue hover:text-white font-mario-text font-bold"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className="bg-mario-red hover:bg-mario-dark-red text-white font-mario-text font-bold border-2 border-mario-black"
            >
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ArrowRight size={16} className="ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
