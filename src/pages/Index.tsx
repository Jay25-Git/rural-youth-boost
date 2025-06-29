
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SkillCategories } from '../components/SkillCategories';
import { Tutorial } from '../components/Tutorial';
import { RoleSelection } from '../components/RoleSelection';
import { useAuth } from '../hooks/useAuth';
import { useTutorial } from '../hooks/useTutorial';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isOpen, hasSeenTutorial, startTutorial, closeTutorial, isNewUser } = useTutorial();
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Check if user needs role selection
    const needsRoleSelection = localStorage.getItem('skillsynq-needs-role-selection') === 'true';
    if (user && needsRoleSelection) {
      setShowRoleSelection(true);
    }
  }, [user]);

  useEffect(() => {
    // Auto-start tutorial only for brand new users who haven't seen it before
    if (user && !hasSeenTutorial && isNewUser() && !showRoleSelection) {
      setTimeout(() => startTutorial(), 1000);
    }
  }, [user, hasSeenTutorial, startTutorial, isNewUser, showRoleSelection]);

  const handleRoleSelectionComplete = () => {
    localStorage.removeItem('skillsynq-needs-role-selection');
    setShowRoleSelection(false);
  };

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  // Show role selection if needed
  if (showRoleSelection) {
    return <RoleSelection onComplete={handleRoleSelectionComplete} />;
  }

  return (
    <div className="min-h-screen w-full bg-white font-mario-text">
      <div className="hero-section w-full">
        <Hero />
      </div>
      
      <div className="skill-categories w-full">
        <SkillCategories />
      </div>
      
      {/* Mentor Mode Section */}
      <div className="bg-mario-red py-12 border-t-8 border-mario-black mentor-section w-full">
        <div className="w-full px-4 text-center">
          <h3 className="text-3xl font-mario text-white mb-4 drop-shadow-lg">🎓 Ready to Share Your Skills? 🎓</h3>
          <p className="text-lg font-mario-text font-bold text-mario-white mb-6 max-w-2xl mx-auto">
            Join our mentor community and help others learn while earning rewards! 🌟
          </p>
          <Link to="/mentor-mode">
            <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-xl px-8 py-4 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
              <Users size={24} className="mr-2" />
              Become a Mentor! 🎯
            </Button>
          </Link>
        </div>
      </div>

      {/* Tutorial Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <Button
          onClick={startTutorial}
          className="bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          title="Take Tutorial"
        >
          <HelpCircle size={24} />
        </Button>
      </div>

      {/* Tutorial Component */}
      <Tutorial isOpen={isOpen} onClose={closeTutorial} />
    </div>
  );
};

export default Index;
