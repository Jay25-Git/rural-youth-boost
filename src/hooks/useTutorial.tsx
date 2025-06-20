
import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Check if user has seen tutorial before
    const tutorialSeen = localStorage.getItem('skillsynq-tutorial-seen');
    if (tutorialSeen) {
      setHasSeenTutorial(true);
    }
  }, []);

  const startTutorial = () => {
    setIsOpen(true);
  };

  const closeTutorial = () => {
    setIsOpen(false);
    localStorage.setItem('skillsynq-tutorial-seen', 'true');
    setHasSeenTutorial(true);
    // Clear the new user flag after tutorial is completed
    localStorage.removeItem('skillsynq-new-user');
  };

  const resetTutorial = () => {
    localStorage.removeItem('skillsynq-tutorial-seen');
    setHasSeenTutorial(false);
  };

  const isNewUser = () => {
    return localStorage.getItem('skillsynq-new-user') === 'true';
  };

  return {
    isOpen,
    hasSeenTutorial,
    startTutorial,
    closeTutorial,
    resetTutorial,
    isNewUser
  };
};
