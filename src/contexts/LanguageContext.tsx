
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcomeBack: "WELCOME BACK",
    continueQuest: "CONTINUE YOUR EPIC QUEST TO MASTER SKILLS!",
    viewAchievements: "VIEW YOUR ACHIEVEMENTS",
    powerUpLearning: "POWER-UP LEARNING",
    collectStars: "COLLECT STARS",
    choosePath: "CHOOSE YOUR PATH!",
    eachSkillAdventure: "EACH SKILL IS A NEW ADVENTURE! PICK YOUR WORLD AND START COLLECTING COINS!",
    careerPowerUps: "CAREER POWER-UPS",
    careerDescription: "MASTER THESE SKILLS TO UNLOCK CAREER ACHIEVEMENTS!",
    lifeSkillCoins: "LIFE SKILL COINS",
    lifeDescription: "ESSENTIAL LIFE SKILLS TO HELP YOU WIN!",
    creativeStarWorld: "CREATIVE STAR WORLD",
    creativeDescription: "EXPLORE FUN SKILLS THAT MAKE LIFE COLORFUL!"
  },
  te: {
    welcomeBack: "తిరిగి స్వాగతం",
    continueQuest: "నైపుణ్యాలను మాస్టర్ చేయడానికి మీ అద్భుతమైన అన్వేషణను కొనసాగించండి!",
    viewAchievements: "మీ విజయాలను చూడండి",
    powerUpLearning: "పవర్-అప్ లెర్నింగ్",
    collectStars: "నక్షత్రాలను సేకరించండి",
    choosePath: "మీ మార్గాన్ని ఎంచుకోండి!",
    eachSkillAdventure: "ప్రతి నైపుణ్యం ఒక కొత్త సాహసం! మీ ప్రపంచాన్ని ఎంచుకుని నాణేలను సేకరించడం ప్రారంభించండి!",
    careerPowerUps: "కెరీర్ పవర్-అప్స్",
    careerDescription: "కెరీర్ విజయాలను అన్లాక్ చేయడానికి ఈ నైపుణ్యాలను మాస్టర్ చేయండి!",
    lifeSkillCoins: "జీవిత నైపుణ్య నాణేలు",
    lifeDescription: "మీరు గెలవడానికి అవసరమైన జీవిత నైపుణ్యాలు!",
    creativeStarWorld: "సృజనాత్మక స్టార్ వరల్డ్",
    creativeDescription: "జీవితాన్ని రంగురంగులగా చేసే సరదా నైపుణ్యాలను అన్వేషించండి!"
  },
  hi: {
    welcomeBack: "वापसी पर स्वागत है",
    continueQuest: "कौशल में महारत हासिल करने के लिए अपनी महान खोज जारी रखें!",
    viewAchievements: "अपनी उपलब्धियां देखें",
    powerUpLearning: "पावर-अप लर्निंग",
    collectStars: "सितारे इकट्ठा करें",
    choosePath: "अपना रास्ता चुनें!",
    eachSkillAdventure: "हर कौशल एक नया साहसिक कार्य है! अपनी दुनिया चुनें और सिक्के इकट्ठा करना शुरू करें!",
    careerPowerUps: "करियर पावर-अप्स",
    careerDescription: "करियर की उपलब्धियों को अनलॉक करने के लिए इन कौशलों में महारत हासिल करें!",
    lifeSkillCoins: "जीवन कौशल सिक्के",
    lifeDescription: "जीतने में आपकी मदद करने वाले आवश्यक जीवन कौशल!",
    creativeStarWorld: "रचनात्मक स्टार वर्ल्ड",
    creativeDescription: "मजेदार कौशलों का अन्वेषण करें जो जीवन को रंगीन बनाते हैं!"
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
