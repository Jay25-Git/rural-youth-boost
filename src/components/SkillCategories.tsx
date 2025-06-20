
import React from 'react';
import { SkillCategory } from './SkillCategory';
import { careerSkills, lifeSkills, hobbySkills } from '../data/skillsData';
import { Briefcase, Heart, Camera } from 'lucide-react';

export const SkillCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-mario-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mario text-mario-red mb-4 drop-shadow-lg">🌟 CHOOSE YOUR PATH! 🌟</h2>
        <p className="text-xl text-mario-blue max-w-2xl mx-auto font-mario-text font-bold border-4 border-mario-black bg-mario-white p-4 rounded-lg">
          EACH SKILL IS A NEW ADVENTURE! PICK YOUR WORLD AND START COLLECTING COINS! 🪙
        </p>
      </div>
      
      <div className="space-y-16">
        <SkillCategory
          title="🔧 CAREER POWER-UPS"
          description="MASTER THESE SKILLS TO UNLOCK CAREER ACHIEVEMENTS! 💼✨"
          icon={Briefcase}
          skills={careerSkills}
          bgColor="mario-red"
          accentColor="red"
        />
        
        <SkillCategory
          title="💚 LIFE SKILL COINS"
          description="ESSENTIAL LIFE SKILLS TO HELP YOU WIN! 🏠🌱"
          icon={Heart}
          skills={lifeSkills}
          bgColor="mario-blue"
          accentColor="blue"
        />
        
        <SkillCategory
          title="🎨 CREATIVE STAR WORLD"
          description="EXPLORE FUN SKILLS THAT MAKE LIFE COLORFUL! 🎭🎪"
          icon={Camera}
          skills={hobbySkills}
          bgColor="mario-red"
          accentColor="mixed"
        />
      </div>
    </div>
  );
};
