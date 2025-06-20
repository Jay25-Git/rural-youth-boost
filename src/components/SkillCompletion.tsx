
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SkillCompletionProps {
  skillId: string;
  skillTitle: string;
  badgeName: string;
  colorClasses: {
    button: string;
    border: string;
    accent: string;
  };
}

export const SkillCompletion: React.FC<SkillCompletionProps> = ({ 
  skillId, 
  skillTitle, 
  badgeName, 
  colorClasses 
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load completion status from localStorage
    const completedSkills = JSON.parse(localStorage.getItem('completedSkills') || '[]');
    const userStars = parseInt(localStorage.getItem('userStars') || '0');
    const userBadges = JSON.parse(localStorage.getItem('userBadges') || '[]');
    
    setIsCompleted(completedSkills.includes(skillId));
    setStars(userStars);
    setBadges(userBadges);
  }, [skillId]);

  const completeSkill = () => {
    if (isCompleted) return;

    // Update completed skills
    const completedSkills = JSON.parse(localStorage.getItem('completedSkills') || '[]');
    completedSkills.push(skillId);
    localStorage.setItem('completedSkills', JSON.stringify(completedSkills));

    // Add star
    const newStars = stars + 1;
    setStars(newStars);
    localStorage.setItem('userStars', newStars.toString());

    // Add badge
    const newBadges = [...badges, badgeName];
    setBadges(newBadges);
    localStorage.setItem('userBadges', JSON.stringify(newBadges));

    setIsCompleted(true);

    toast({
      title: "🎉 Skill Completed!",
      description: `You earned a star and the "${badgeName}" badge!`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Completion Button */}
      <Card className="border-4 border-mario-yellow shadow-lg">
        <CardContent className="p-6 text-center">
          {!isCompleted ? (
            <div className="space-y-4">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-lg font-mario text-mario-red">Ready to Complete This Skill?</h3>
              <p className="text-sm text-gray-600 font-mario-text mb-4">
                Complete this skill to earn a star ⭐ and the "{badgeName}" badge!
              </p>
              <Button
                onClick={completeSkill}
                className={`${colorClasses.button} text-white font-mario-text font-bold shadow-lg hover:scale-105 transition-transform duration-200`}
              >
                <CheckCircle size={20} className="mr-2" />
                🎮 COMPLETE THIS SKILL 🎮
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="text-lg font-mario text-mario-green">Skill Completed!</h3>
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-mario-yellow text-mario-red font-mario-text font-bold">
                  <Award size={16} className="mr-1" />
                  {badgeName}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 font-mario-text">
                🌟 Great job! You've mastered this skill! 🌟
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Collected Stars and Badges */}
      <Card className="border-4 border-mario-purple shadow-lg">
        <CardHeader className="bg-mario-purple bg-opacity-20 rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2 font-mario text-mario-purple">
            <Sparkles size={20} />
            Collected Stars & Badges ✨
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Stars Section */}
            <div className="flex items-center gap-3 p-4 bg-mario-yellow bg-opacity-20 rounded-lg border-2 border-mario-yellow">
              <Star size={24} className="text-mario-yellow" />
              <div>
                <h4 className="font-mario-text font-bold text-mario-red">Total Stars</h4>
                <p className="text-2xl font-mario text-mario-blue">{stars} ⭐</p>
              </div>
            </div>

            {/* Badges Section */}
            <div className="space-y-3">
              <h4 className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                <Award size={20} />
                Earned Badges
              </h4>
              {badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <Badge 
                      key={index}
                      className="bg-mario-blue text-white font-mario-text font-bold border-2 border-mario-black"
                    >
                      🏅 {badge}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 font-mario-text italic">
                  Complete skills to start earning badges! 🎯
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
