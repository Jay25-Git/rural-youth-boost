
import React from 'react';
import { Star, Zap, Trophy } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-mario-red to-mario-blue text-white py-16">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      {/* Floating Mario elements */}
      <div className="absolute top-4 left-4 text-mario-yellow text-2xl animate-bounce-mario">🍄</div>
      <div className="absolute top-8 right-8 text-mario-white text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute bottom-4 left-1/4 text-mario-yellow text-2xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎯</div>
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="bg-mario-white text-mario-red p-3 rounded-lg shadow-lg border-2 border-mario-blue">
            <Trophy size={32} />
          </div>
          <h1 className="text-5xl font-mario text-shadow-lg">MARIO SKILLSYNC+</h1>
        </div>
        <p className="text-xl mb-4 max-w-2xl mx-auto font-mario-text font-bold">
          🎮 LEVEL UP YOUR SKILLS! 🎮
        </p>
        <p className="text-lg opacity-90 max-w-xl mx-auto font-mario-text font-bold">
          JOIN MARIO ON AN EPIC QUEST TO MASTER SKILLS!
        </p>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="flex items-center gap-2 bg-mario-white text-mario-red px-4 py-2 rounded-lg border-2 border-mario-blue font-mario-text font-bold">
            <Zap className="text-mario-blue" size={24} />
            <span>POWER-UP LEARNING</span>
          </div>
          <div className="flex items-center gap-2 bg-mario-white text-mario-blue px-4 py-2 rounded-lg border-2 border-mario-red font-mario-text font-bold">
            <Star className="text-mario-red" size={24} />
            <span>COLLECT STARS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
