
import React from 'react';
import { SkillCategory } from './SkillCategory';
import { careerSkills, lifeSkills, hobbySkills } from '../data/skillsData';
import { Briefcase, Heart, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const SkillCategories = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-mario-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mario text-mario-red mb-4 drop-shadow-lg">🌟 {t('choosePath')} 🌟</h2>
        <p className="text-xl text-mario-blue max-w-2xl mx-auto font-mario-text font-bold border-4 border-mario-black bg-mario-white p-4 rounded-lg">
          {t('eachSkillAdventure')} 🪙
        </p>
      </div>
      
      <div className="space-y-16">
        <SkillCategory
          title={`🔧 ${t('careerPowerUps')}`}
          description={`${t('careerDescription')} 💼✨`}
          icon={Briefcase}
          skills={careerSkills}
          bgColor="mario-red"
          accentColor="red"
        />
        
        <SkillCategory
          title={`💚 ${t('lifeSkillCoins')}`}
          description={`${t('lifeDescription')} 🏠🌱`}
          icon={Heart}
          skills={lifeSkills}
          bgColor="mario-blue"
          accentColor="blue"
        />
        
        <SkillCategory
          title={`🎨 ${t('creativeStarWorld')}`}
          description={`${t('creativeDescription')} 🎭🎪`}
          icon={Camera}
          skills={hobbySkills}
          bgColor="mario-red"
          accentColor="mixed"
        />
      </div>
    </div>
  );
};
