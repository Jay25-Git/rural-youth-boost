
import React from 'react';
import { GraduationCap, Heart, Lightbulb } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-5xl font-bold">SkillSync+</h1>
        </div>
        <p className="text-xl mb-4 max-w-2xl mx-auto">
          Learn new skills that will help you succeed in life, work, and follow your dreams!
        </p>
        <p className="text-lg opacity-90 max-w-xl mx-auto">
          Simple lessons, fun quizzes, and practical skills for rural youth
        </p>
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-yellow-300" size={24} />
            <span>Easy to Learn</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="text-red-300" size={24} />
            <span>Made with Care</span>
          </div>
        </div>
      </div>
    </div>
  );
};
