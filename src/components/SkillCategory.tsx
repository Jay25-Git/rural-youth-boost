
import React from 'react';
import { SkillTile } from './SkillTile';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className={`bg-${bgColor} text-white p-6 rounded-lg shadow-xl border-4 border-mario-black cursor-pointer hover:shadow-2xl transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-mario-white text-mario-red p-3 rounded-lg shadow-lg border-4 border-mario-black">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-mario drop-shadow-lg">{title}</h3>
                  <p className="text-lg font-mario-text font-bold drop-shadow-lg">{description}</p>
                </div>
              </div>
              <ChevronDown 
                size={32} 
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {skills.map((skill) => (
              <SkillTile key={skill.id} skill={skill} accentColor={accentColor} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
