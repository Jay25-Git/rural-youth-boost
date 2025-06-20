
import React from 'react';
import { Hero } from '../components/Hero';
import { SkillCategories } from '../components/SkillCategories';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mario-blue via-mario-green to-mario-yellow font-mario-text">
      <Hero />
      <SkillCategories />
    </div>
  );
};

export default Index;
