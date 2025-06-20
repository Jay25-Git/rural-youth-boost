
import React from 'react';
import { Star, Zap, Trophy } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-mario-red to-mario-orange text-white py-16">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      {/* Floating Mario elements */}
      <div className="absolute top-4 left-4 text-mario-yellow text-2xl animate-bounce-mario">🍄</div>
      <div className="absolute top-8 right-8 text-mario-yellow text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute bottom-4 left-1/4 text-mario-yellow text-2xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎯</div>
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="bg-mario-yellow text-mario-red p-3 rounded-full shadow-lg">
            <Trophy size={32} />
          </div>
          <h1 className="text-5xl font-mario text-shadow-lg">Mario SkillSync+ Adventure!</h1>
        </div>
        <p className="text-xl mb-4 max-w-2xl mx-auto font-mario-text font-semibold">
          🎮 Level up your skills and power-up your future! 🎮
        </p>
        <p className="text-lg opacity-90 max-w-xl mx-auto font-mario-text">
          Join Mario on an epic quest to master career, life, and hobby skills!
        </p>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <Zap className="text-mario-yellow" size={24} />
            <span className="font-mario-text font-bold">Power-Up Learning</span>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
            <Star className="text-mario-yellow" size={24} />
            <span className="font-mario-text font-bold">Collect Skill Stars</span>
          </div>
        </div>
      </div>
    </div>
  );
};
