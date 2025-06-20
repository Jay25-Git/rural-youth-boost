
import React from 'react';
import { Star, Zap, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthButton } from './AuthButton';
import { useProfile } from '@/hooks/useProfile';

export const Hero = () => {
  const { getDisplayName } = useProfile();
  const navigate = useNavigate();

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
        <p className="text-lg max-w-xl mx-auto font-mario-text font-bold mb-6">
          CONTINUE YOUR EPIC QUEST TO MASTER SKILLS!
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to="/collected">
            <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-lg px-6 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
              <Star size={20} className="mr-2" />
              VIEW YOUR ACHIEVEMENTS 🏆
            </Button>
          </Link>
        </div>
        
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

      {/* Floating Pixelated Mario */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={() => navigate('/smart-mario')}
      >
        <div className="bg-mario-white p-4 rounded-lg border-4 border-mario-black shadow-lg hover:shadow-xl">
          <div className="text-4xl animate-bounce-mario">
            🍄
          </div>
        </div>
        <div className="absolute -top-2 -left-2 bg-mario-red text-white text-xs font-mario-text font-bold px-2 py-1 rounded border-2 border-mario-black">
          ASK ME!
        </div>
      </div>
    </div>
  );
};
