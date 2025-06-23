
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Star, BookOpen, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const MentorMode = () => {
  const { t } = useLanguage();

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
            <h2 className="text-3xl font-mario text-mario-red">Share Your Skills!</h2>
          </div>
          <p className="text-lg font-mario-text font-bold text-mario-blue mb-6 max-w-2xl mx-auto">
            Do you have expertise in any skill? Join our mentor community and help fellow learners master new abilities while earning recognition and rewards! 🌟
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-mario-red text-white p-6 rounded-lg shadow-xl border-4 border-mario-black">
            <div className="flex items-center gap-3 mb-4">
              <Star size={24} className="text-mario-yellow" />
              <h3 className="text-xl font-mario">Earn Star Points</h3>
            </div>
            <p className="font-mario-text font-bold">Get rewarded for every student you help succeed! ⭐</p>
          </div>

          <div className="bg-mario-blue text-white p-6 rounded-lg shadow-xl border-4 border-mario-black">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={24} className="text-mario-yellow" />
              <h3 className="text-xl font-mario">Share Knowledge</h3>
            </div>
            <p className="font-mario-text font-bold">Create courses and tutorials in your expertise area! 📚</p>
          </div>

          <div className="bg-mario-green text-white p-6 rounded-lg shadow-xl border-4 border-mario-black">
            <div className="flex items-center gap-3 mb-4">
              <Award size={24} className="text-mario-yellow" />
              <h3 className="text-xl font-mario">Get Recognition</h3>
            </div>
            <p className="font-mario-text font-bold">Build your reputation as a skill master! 🏆</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-mario-white rounded-lg shadow-xl border-4 border-mario-black p-8 mb-8">
          <h3 className="text-2xl font-mario text-mario-red text-center mb-6">🚀 How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-mario-yellow text-mario-red w-12 h-12 rounded-full flex items-center justify-center font-mario text-xl mx-auto mb-4 border-4 border-mario-black">1</div>
              <h4 className="font-mario text-mario-blue mb-2">Apply to Mentor</h4>
              <p className="font-mario-text font-bold text-sm text-mario-blue">Submit your skills and experience</p>
            </div>
            <div className="text-center">
              <div className="bg-mario-yellow text-mario-red w-12 h-12 rounded-full flex items-center justify-center font-mario text-xl mx-auto mb-4 border-4 border-mario-black">2</div>
              <h4 className="font-mario text-mario-blue mb-2">Create Content</h4>
              <p className="font-mario-text font-bold text-sm text-mario-blue">Design courses and challenges</p>
            </div>
            <div className="text-center">
              <div className="bg-mario-yellow text-mario-red w-12 h-12 rounded-full flex items-center justify-center font-mario text-xl mx-auto mb-4 border-4 border-mario-black">3</div>
              <h4 className="font-mario text-mario-blue mb-2">Help & Earn</h4>
              <p className="font-mario-text font-bold text-sm text-mario-blue">Guide students and earn rewards</p>
            </div>
          </div>
        </div>

        {/* Meet Our Mentors Section */}
        <div className="bg-mario-yellow rounded-lg shadow-xl border-4 border-mario-black p-8 mb-8 text-center">
          <h3 className="text-2xl font-mario text-mario-red mb-4">👥 Meet Our Amazing Mentors</h3>
          <p className="font-mario-text font-bold text-mario-blue mb-6">
            Learn about the incredible mentors who have guided our SkillSync+ journey!
          </p>
          <Link to="/mentor-page">
            <Button className="bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold text-lg px-6 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
              <ExternalLink size={20} className="mr-2" />
              View Mentor Stories 📖
            </Button>
          </Link>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-xl px-8 py-4 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
            <Users size={24} className="mr-2" />
            Become a Mentor! 🎯
          </Button>
          <p className="mt-4 text-mario-white font-mario-text font-bold">
            Join our community of skill masters and make a difference! 💫
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorMode;
