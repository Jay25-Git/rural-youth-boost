
import React from 'react';
import { SkillCategory } from './SkillCategory';
import { careerSkills, lifeSkills, hobbySkills } from '../data/skillsData';
import { Briefcase, Heart, Camera } from 'lucide-react';

export const SkillCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Learning Path</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start with any skill that interests you. Each lesson is designed to be simple and helpful.
        </p>
      </div>
      
      <div className="space-y-16">
        <SkillCategory
          title="Career Skills"
          description="Build skills that will help you get a good job and succeed at work"
          icon={Briefcase}
          skills={careerSkills}
          bgColor="from-blue-500 to-blue-600"
          accentColor="blue"
        />
        
        <SkillCategory
          title="Life Skills"
          description="Learn important skills for everyday life and personal growth"
          icon={Heart}
          skills={lifeSkills}
          bgColor="from-green-500 to-green-600"
          accentColor="green"
        />
        
        <SkillCategory
          title="Hobby Skills"
          description="Explore fun activities and creative skills for your free time"
          icon={Camera}
          skills={hobbySkills}
          bgColor="from-purple-500 to-purple-600"
          accentColor="purple"
        />
      </div>
    </div>
  );
};
