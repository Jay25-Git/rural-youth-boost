
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
      red: 'border-mario-red hover:border-mario-orange',
      green: 'border-mario-green hover:border-mario-blue',
      purple: 'border-mario-purple hover:border-mario-yellow',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  const getButtonClasses = (color: string) => {
    const colorMap = {
      red: 'bg-mario-red hover:bg-mario-orange',
      green: 'bg-mario-green hover:bg-mario-blue',
      purple: 'bg-mario-purple hover:bg-mario-yellow',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-l-4 ${getAccentClasses(accentColor)} bg-white rounded-2xl shadow-lg border-2 border-gray-200`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-mario text-gray-800">
          {skill.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed font-mario-text">
          {skill.description}
        </p>
        
        <Link to={`/skill/${skill.id}`} className="block">
          <Button 
            className={`w-full ${getButtonClasses(accentColor)} text-white font-mario-text font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            🎮 Start Adventure
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
