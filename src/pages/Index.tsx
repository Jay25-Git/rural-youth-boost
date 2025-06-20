
import React from 'react';
import { Hero } from '../components/Hero';
import { SkillCategories } from '../components/SkillCategories';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Hero />
      <SkillCategories />
    </div>
  );
};

export default Index;
