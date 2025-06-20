
import React from 'react';
import { SkillTile } from './SkillTile';
import { LucideIcon } from 'lucide-react';

interface Skill {
  id: string;
  title: string;
  description: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

interface SkillCategoryProps {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
  bgColor: string;
  accentColor: string;
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  description,
  icon: Icon,
  skills,
  bgColor,
  accentColor,
}) => {
  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${bgColor} text-white p-6 rounded-xl shadow-lg`}>
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Icon size={28} />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-lg opacity-90">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillTile key={skill.id} skill={skill} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
};
