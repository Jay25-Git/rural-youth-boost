
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SkillCategories } from '../components/SkillCategories';
import { Tutorial } from '../components/Tutorial';
import { useAuth } from '../hooks/useAuth';
import { useTutorial } from '../hooks/useTutorial';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isOpen, hasSeenTutorial, startTutorial, closeTutorial, isNewUser } = useTutorial();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Auto-start tutorial only for brand new users who haven't seen it before
    if (user && !hasSeenTutorial && isNewUser()) {
      setTimeout(() => startTutorial(), 1000);
    }
  }, [user, hasSeenTutorial, startTutorial, isNewUser]);

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-mario-blue font-mario-text">
      <div className="hero-section">
        <Hero />
      </div>
      
      <div className="skill-categories">
        <SkillCategories />
      </div>
      
      {/* Mentor Mode Section */}
      <div className="bg-mario-red py-12 border-t-8 border-mario-black mentor-section">
        <div className="max-w-6xl mx-auto px-4 text-center">
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
