
import React from 'react';
import { Star, Zap, Trophy } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { useProfile } from '@/hooks/useProfile';

export const Hero = () => {
  const { getDisplayName } = useProfile();

  return (
    <div className="relative overflow-hidden bg-mario-red text-white py-16 border-b-8 border-mario-black">
      {/* Floating Mario elements */}
      <div className="absolute top-4 left-4 text-mario-yellow text-2xl animate-bounce-mario">🍄</div>
      <div className="absolute top-8 right-8 text-mario-white text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute bottom-4 left-1/4 text-mario-yellow text-2xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎯</div>
      
      {/* Auth button in top right */}
      <div className="absolute top-6 right-6 z-10">
        <AuthButton />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="bg-mario-white text-mario-red p-3 rounded-lg shadow-lg border-4 border-mario-black">
            <Trophy size={32} />
          </div>
          <h1 className="text-5xl font-mario text-shadow-lg">SkillSynq+</h1>
        </div>
        <p className="text-xl mb-4 max-w-2xl mx-auto font-mario-text font-bold">
          🎮 WELCOME BACK, {getDisplayName().toUpperCase()}! 🎮
        </p>
        <p className="text-lg max-w-xl mx-auto font-mario-text font-bold">
          CONTINUE YOUR EPIC QUEST TO MASTER SKILLS!
        </p>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="flex items-center gap-2 bg-mario-white text-mario-red px-4 py-2 rounded-lg border-4 border-mario-black font-mario-text font-bold">
            <Zap className="text-mario-blue" size={24} />
            <span>POWER-UP LEARNING</span>
          </div>
          <div className="flex items-center gap-2 bg-mario-white text-mario-blue px-4 py-2 rounded-lg border-4 border-mario-black font-mario-text font-bold">
            <Star className="text-mario-red" size={24} />
            <span>COLLECT STARS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
