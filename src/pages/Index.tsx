
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SkillCategories } from '../components/SkillCategories';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-mario-blue font-mario-text">
      <Hero />
      <SkillCategories />
    </div>
  );
};

export default Index;
