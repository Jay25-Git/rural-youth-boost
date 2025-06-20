
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
      red: 'border-mario-red hover:border-mario-dark-red',
      blue: 'border-mario-blue hover:border-mario-dark-blue',
      mixed: 'border-mario-red hover:border-mario-blue',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  const getButtonClasses = (color: string) => {
    const colorMap = {
      red: 'bg-mario-red hover:bg-mario-dark-red border-2 border-mario-white',
      blue: 'bg-mario-blue hover:bg-mario-dark-blue border-2 border-mario-white',
      mixed: 'bg-mario-red hover:bg-mario-blue border-2 border-mario-white',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-l-4 ${getAccentClasses(accentColor)} bg-mario-white rounded-lg shadow-lg border-4 border-mario-blue`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-mario text-mario-red drop-shadow-sm">
          {skill.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-mario-blue leading-relaxed font-mario-text font-bold">
          {skill.description}
        </p>
        
        <Link to={`/skill/${skill.id}`} className="block">
          <Button 
            className={`w-full ${getButtonClasses(accentColor)} text-white font-mario-text font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            🎮 START ADVENTURE
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
