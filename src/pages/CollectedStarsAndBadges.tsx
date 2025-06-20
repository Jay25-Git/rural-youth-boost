
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, ArrowLeft, Trophy, Sparkles, Crown } from 'lucide-react';

const CollectedStarsAndBadges = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const userStars = parseInt(localStorage.getItem('userStars') || '0');
    const userBadges = JSON.parse(localStorage.getItem('userBadges') || '[]');
    
    setStars(userStars);
    setBadges(userBadges);
  }, []);

  return (
    <div className="min-h-screen bg-mario-blue font-mario-text p-4">
      {/* Mario decorative elements */}
      <div className="absolute top-8 left-8 text-mario-yellow text-4xl animate-bounce-mario">⭐</div>
      <div className="absolute top-16 right-16 text-mario-white text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>🏆</div>
      <div className="absolute bottom-16 left-16 text-mario-green text-3xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎖️</div>
      <div className="absolute bottom-8 right-8 text-mario-yellow text-2xl animate-bounce-mario" style={{animationDelay: '1.5s'}}>👑</div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/home')}
            className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold border-4 border-mario-black shadow-lg"
          >
            <ArrowLeft size={16} className="mr-2" />
            BACK TO HOME
          </Button>
        </div>

        {/* Header */}
        <Card className="bg-mario-white border-8 border-mario-black shadow-2xl mb-6">
          <CardHeader className="text-center bg-mario-red text-white border-b-4 border-mario-black">
            <CardTitle className="text-3xl font-mario text-shadow-lg flex items-center justify-center gap-3">
              <Trophy size={40} />
              🌟 COLLECTED STARS & BADGES 🌟
              <Crown size={40} />
            </CardTitle>
            <p className="text-lg font-mario-text font-bold mt-2">
              YOUR AMAZING ACHIEVEMENTS!
            </p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Stars Section */}
          <Card className="border-8 border-mario-yellow shadow-2xl bg-mario-white">
            <CardHeader className="bg-mario-yellow bg-opacity-20 rounded-t-lg border-b-4 border-mario-yellow">
              <CardTitle className="text-2xl flex items-center gap-3 font-mario text-mario-yellow">
                <Star size={32} className="text-mario-yellow" />
                TOTAL STARS ⭐
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="text-8xl font-mario text-mario-blue mb-4">{stars}</div>
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: Math.min(stars, 10) }).map((_, index) => (
                  <span key={index} className="text-3xl animate-pulse" style={{animationDelay: `${index * 0.1}s`}}>
                    ⭐
                  </span>
                ))}
                {stars > 10 && (
                  <span className="text-2xl font-mario text-mario-purple">
                    +{stars - 10} more!
                  </span>
                )}
              </div>
              <p className="text-lg font-mario-text font-bold text-mario-red">
                {stars === 0 ? 'Complete skills to earn stars!' : 
                 stars === 1 ? 'Your first star! Keep going!' :
                 stars < 5 ? 'Great start! Keep collecting!' :
                 stars < 10 ? 'Awesome progress! You\'re a star collector!' :
                 'WOW! You\'re a SUPERSTAR! 🌟'}
              </p>
            </CardContent>
          </Card>

          {/* Badges Section */}
          <Card className="border-8 border-mario-purple shadow-2xl bg-mario-white">
            <CardHeader className="bg-mario-purple bg-opacity-20 rounded-t-lg border-b-4 border-mario-purple">
              <CardTitle className="text-2xl flex items-center gap-3 font-mario text-mario-purple">
                <Award size={32} />
                EARNED BADGES 🏅
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-mario text-mario-blue">{badges.length}</div>
                <p className="text-sm font-mario-text font-bold text-mario-red">
                  BADGES COLLECTED
                </p>
              </div>
              
              {badges.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {badges.map((badge, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-mario-yellow bg-opacity-20 rounded-lg border-2 border-mario-yellow"
                    >
                      <div className="text-2xl">🏅</div>
                      <Badge className="bg-mario-blue text-white font-mario-text font-bold border-2 border-mario-black flex-1 justify-center py-2">
                        {badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-gray-600 font-mario-text font-bold">
                    Complete skills to start earning badges!
                  </p>
                  <p className="text-sm text-gray-500 font-mario-text mt-2">
                    Each skill gives you a unique badge! 🏆
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Achievement Levels */}
        {stars > 0 && (
          <Card className="border-8 border-mario-green shadow-2xl bg-mario-white mt-6">
            <CardHeader className="bg-mario-green bg-opacity-20 rounded-t-lg border-b-4 border-mario-green">
              <CardTitle className="text-2xl flex items-center gap-3 font-mario text-mario-green">
                <Sparkles size={32} />
                ACHIEVEMENT LEVEL 🎖️
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                {stars >= 20 ? (
                  <div>
                    <div className="text-4xl mb-2">👑</div>
                    <h3 className="text-2xl font-mario text-mario-purple">SKILL MASTER!</h3>
                    <p className="font-mario-text font-bold text-mario-red">You are truly exceptional! 🌟</p>
                  </div>
                ) : stars >= 15 ? (
                  <div>
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="text-2xl font-mario text-mario-blue">SKILL CHAMPION!</h3>
                    <p className="font-mario-text font-bold text-mario-red">Outstanding achievements! 🎉</p>
                  </div>
                ) : stars >= 10 ? (
                  <div>
                    <div className="text-4xl mb-2">🎖️</div>
                    <h3 className="text-2xl font-mario text-mario-green">SKILL EXPERT!</h3>
                    <p className="font-mario-text font-bold text-mario-red">You're getting really good! 💪</p>
                  </div>
                ) : stars >= 5 ? (
                  <div>
                    <div className="text-4xl mb-2">🥉</div>
                    <h3 className="text-2xl font-mario text-mario-orange">SKILL ENTHUSIAST!</h3>
                    <p className="font-mario-text font-bold text-mario-red">Keep up the great work! 🚀</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">🌱</div>
                    <h3 className="text-2xl font-mario text-mario-yellow">SKILL BEGINNER!</h3>
                    <p className="font-mario-text font-bold text-mario-red">Every expert was once a beginner! 🌟</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CollectedStarsAndBadges;
