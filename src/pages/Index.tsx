
import React from 'react';
import { Hero } from '../components/Hero';
import { SkillCategories } from '../components/SkillCategories';

const Index = () => {
  return (
    <div className="min-h-screen bg-mario-blue font-mario-text">
      <Hero />
      <SkillCategories />
    </div>
  );
};

export default Index;
