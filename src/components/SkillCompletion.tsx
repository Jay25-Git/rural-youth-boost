
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Star } from 'lucide-react';
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
  const navigate = useNavigate();

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
              <p className="text-sm text-gray-600 font-mario-text mb-4">
                🌟 Great job! You've mastered this skill! 🌟
              </p>
              <Button
                onClick={() => navigate('/collected')}
                className="bg-mario-purple hover:bg-mario-purple text-white font-mario-text font-bold shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <Star size={20} className="mr-2" />
                VIEW ALL ACHIEVEMENTS
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
