
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

interface SkillTileProps {
  skill: Skill;
  accentColor: string;
}

export const SkillTile: React.FC<SkillTileProps> = ({ skill, accentColor }) => {
  const getAccentClasses = (color: string) => {
    const colorMap = {
      blue: 'border-blue-500 hover:border-blue-600',
      green: 'border-green-500 hover:border-green-600',
      purple: 'border-purple-500 hover:border-purple-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getButtonClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-lg border-l-4 ${getAccentClasses(accentColor)}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {skill.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          {skill.description}
        </p>
        
        <Link to={`/skill/${skill.id}`} className="block">
          <Button 
            className={`w-full ${getButtonClasses(accentColor)} text-white`}
          >
            Learn More
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
