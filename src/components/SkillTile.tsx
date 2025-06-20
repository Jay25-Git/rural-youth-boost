
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap } from 'lucide-react';

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
      red: 'bg-mario-red hover:bg-mario-dark-red border-4 border-mario-black',
      blue: 'bg-mario-blue hover:bg-mario-dark-blue border-4 border-mario-black',
      mixed: 'bg-mario-red hover:bg-mario-blue border-4 border-mario-black',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  const getDecorationElements = (color: string) => {
    const decorations = {
      red: ['🔥', '⚡', '💎'],
      blue: ['💧', '🌟', '🔵'],
      mixed: ['🎨', '🌈', '✨'],
    };
    return decorations[color as keyof typeof decorations] || decorations.red;
  };

  const decorativeElements = getDecorationElements(accentColor);

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-l-8 ${getAccentClasses(accentColor)} bg-mario-white rounded-lg shadow-lg border-4 border-mario-black relative overflow-hidden`}>
      {/* Decorative corner elements */}
      <div className="absolute top-2 right-2 text-lg opacity-70">
        {decorativeElements[0]}
      </div>
      <div className="absolute top-2 left-2 text-lg opacity-70">
        {decorativeElements[1]}
      </div>
      
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 gap-2 h-full p-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="text-xs flex items-center justify-center">
              {decorativeElements[i % decorativeElements.length]}
            </div>
          ))}
        </div>
      </div>

      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-lg font-mario text-mario-red drop-shadow-sm flex items-center gap-2">
          <Star size={16} className="text-mario-yellow" />
          {skill.title}
          <Zap size={16} className="text-mario-blue" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        <p className="text-mario-blue leading-relaxed font-mario-text font-bold">
          {skill.description}
        </p>
        
        {/* Decorative divider */}
        <div className="flex items-center gap-2 py-2">
          <div className="flex-1 h-1 bg-mario-red rounded"></div>
          <span className="text-mario-yellow text-lg">{decorativeElements[2]}</span>
          <div className="flex-1 h-1 bg-mario-blue rounded"></div>
        </div>
        
        <Link to={`/skill/${skill.id}`} className="block">
          <Button 
            className={`w-full ${getButtonClasses(accentColor)} text-white font-mario-text font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
          >
            {/* Button decorative sparkles */}
            <span className="absolute top-1 left-2 text-xs">✨</span>
            <span className="absolute bottom-1 right-2 text-xs">✨</span>
            
            🎮 START ADVENTURE
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
