
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Star, BookOpen, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';

const MentorMode = () => {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect mentors to their dashboard
    if (profile?.user_type === 'mentor') {
      navigate('/mentor-page');
    }
  }, [profile, navigate]);

  // Show loading while checking profile
  if (!profile) {
    return (
      <div className="min-h-screen bg-mario-blue flex items-center justify-center">
        <div className="text-white font-mario text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mario-blue">
      {/* Header */}
      <div className="bg-mario-red text-white py-6 border-b-8 border-mario-black">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/home" className="inline-flex items-center gap-2 text-mario-white hover:text-mario-yellow transition-colors mb-4">
            <ArrowLeft size={20} />
            <span className="font-mario-text font-bold">Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-mario text-shadow-lg mb-2">🎓 Mentor Mode 🎓</h1>
            <p className="text-xl font-mario-text font-bold">Become a Skill Master & Help Others Learn!</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-mario-white rounded-lg shadow-xl border-4 border-mario-black p-8 mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="bg-mario-yellow text-mario-red p-3 rounded-lg shadow-lg border-4 border-mario-black">
              <Users size={32} />
            </div>
            <h2 className="text-3xl font-mario text-mario-red">Learn from Amazing Mentors!</h2>
          </div>
          <p className="text-lg font-mario-text font-bold text-mario-blue mb-6 max-w-2xl mx-auto">
            Connect with expert mentors who can guide you through your learning journey and help you master new skills! 🌟
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-mario-red text-white p-6 rounded-lg shadow-xl border-4 border-mario-black">
            <div className="flex items-center gap-3 mb-4">
              <Star size={24} className="text-mario-yellow" />
              <h3 className="text-xl font-mario">Learn from Experts</h3>
            </div>
            <p className="font-mario-text font-bold">Get guidance from industry professionals and experienced mentors! ⭐</p>
          </div>

          <div className="bg-mario-blue text-white p-6 rounded-lg shadow-xl border-4 border-mario-black">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={24} className="text-mario-yellow" />
              <h3 className="text-xl font-mario">Access Premium Content</h3>
            </div>
            <p className="font-mario-text font-bold">Unlock exclusive courses and tutorials created by mentors! 📚</p>
          </div>

          <div className="bg-mario-green text-white p-6 rounded-lg shadow-xl border-4 border-mario-black">
            <div className="flex items-center gap-3 mb-4">
              <Award size={24} className="text-mario-yellow" />
              <h3 className="text-xl font-mario">Earn Certificates</h3>
            </div>
            <p className="font-mario-text font-bold">Complete mentor-guided courses and earn valuable certificates! 🏆</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-mario-white rounded-lg shadow-xl border-4 border-mario-black p-8 mb-8">
          <h3 className="text-2xl font-mario text-mario-red text-center mb-6">🚀 How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-mario-yellow text-mario-red w-12 h-12 rounded-full flex items-center justify-center font-mario text-xl mx-auto mb-4 border-4 border-mario-black">1</div>
              <h4 className="font-mario text-mario-blue mb-2">Browse Mentors</h4>
              <p className="font-mario-text font-bold text-sm text-mario-blue">Explore available mentors and their expertise</p>
            </div>
            <div className="text-center">
              <div className="bg-mario-yellow text-mario-red w-12 h-12 rounded-full flex items-center justify-center font-mario text-xl mx-auto mb-4 border-4 border-mario-black">2</div>
              <h4 className="font-mario text-mario-blue mb-2">Choose Content</h4>
              <p className="font-mario-text font-bold text-sm text-mario-blue">Select courses, tutorials, or challenges</p>
            </div>
            <div className="text-center">
              <div className="bg-mario-yellow text-mario-red w-12 h-12 rounded-full flex items-center justify-center font-mario text-xl mx-auto mb-4 border-4 border-mario-black">3</div>
              <h4 className="font-mario text-mario-blue mb-2">Learn & Grow</h4>
              <p className="font-mario-text font-bold text-sm text-mario-blue">Complete content and earn rewards</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-xl px-8 py-4 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
            <Users size={24} className="mr-2" />
            Explore Mentors! 🎯
          </Button>
          <p className="mt-4 text-mario-white font-mario-text font-bold">
            Start your learning journey with expert guidance! 💫
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorMode;
