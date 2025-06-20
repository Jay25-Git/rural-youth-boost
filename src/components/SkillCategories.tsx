
import React from 'react';
import { SkillCategory } from './SkillCategory';
import { careerSkills, lifeSkills, hobbySkills } from '../data/skillsData';
import { Briefcase, Heart, Camera } from 'lucide-react';

export const SkillCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mario text-mario-red mb-4">🌟 Choose Your Power-Up Path! 🌟</h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto font-mario-text font-semibold">
          Each skill is a new adventure waiting for you! Pick your world and start collecting skill coins! 🪙
        </p>
      </div>
      
      <div className="space-y-16">
        <SkillCategory
          title="🔧 Career Power-Ups"
          description="Master these skills to unlock career achievements and boss-level success! 💼✨"
          icon={Briefcase}
          skills={careerSkills}
          bgColor="from-mario-red to-mario-orange"
          accentColor="red"
        />
        
        <SkillCategory
          title="💚 Life Skill Coins"
          description="Essential life skills to help you navigate the real world like a true hero! 🏠🌱"
          icon={Heart}
          skills={lifeSkills}
          bgColor="from-mario-green to-mario-blue"
          accentColor="green"
        />
        
        <SkillCategory
          title="🎨 Creative Star World"
          description="Explore fun and creative skills that make life more colorful and exciting! 🎭🎪"
          icon={Camera}
          skills={hobbySkills}
          bgColor="from-mario-purple to-mario-yellow"
          accentColor="purple"
        />
      </div>
    </div>
  );
};
