
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Users, BookOpen, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoleSelectionProps {
  onComplete: () => void;
}

export const RoleSelection = ({ onComplete }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<'learner' | 'teacher' | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRoleSelection = async () => {
    if (!selectedRole || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_role: selectedRole })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Role Selected! 🎉",
        description: `Welcome ${selectedRole === 'learner' ? 'Student' : 'Teacher'}! Let's start your journey!`,
      });

      onComplete();
    } catch (error: any) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to save your role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mario-blue font-mario-text flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 text-mario-yellow text-4xl animate-bounce-mario">🎓</div>
      <div className="absolute top-16 right-16 text-mario-white text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>📚</div>
      <div className="absolute bottom-16 left-16 text-mario-green text-3xl animate-bounce-mario" style={{animationDelay: '1s'}}>💡</div>
      <div className="absolute bottom-8 right-8 text-mario-yellow text-4xl animate-bounce-mario" style={{animationDelay: '1.5s'}}>🌟</div>

      <Card className="w-full max-w-2xl bg-mario-white border-8 border-mario-black shadow-2xl relative z-10">
        <CardHeader className="text-center bg-mario-red text-white border-b-4 border-mario-black">
          <CardTitle className="text-3xl font-mario text-shadow-lg">
            🎮 CHOOSE YOUR ADVENTURE! 🎮
          </CardTitle>
          <p className="font-mario-text font-bold text-lg mt-2">
            What kind of player are you?
          </p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learner Option */}
            <div
              onClick={() => setSelectedRole('learner')}
              className={`cursor-pointer border-4 rounded-lg p-6 transition-all duration-300 ${
                selectedRole === 'learner'
                  ? 'border-mario-green bg-mario-green/10 shadow-xl scale-105'
                  : 'border-mario-black bg-white hover:border-mario-green hover:shadow-lg'
              }`}
            >
              <div className="text-center space-y-4">
                <div className="bg-mario-green text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto border-4 border-mario-black">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-2xl font-mario text-mario-red">LEARNER</h3>
                <p className="font-mario-text font-bold text-gray-700">
                  🎯 I want to learn new skills<br/>
                  📚 Explore different topics<br/>
                  🌟 Earn badges and stars
                </p>
                {selectedRole === 'learner' && (
                  <div className="text-mario-green font-mario-text font-bold">
                    ✅ SELECTED!
                  </div>
                )}
              </div>
            </div>

            {/* Teacher Option */}
            <div
              onClick={() => setSelectedRole('teacher')}
              className={`cursor-pointer border-4 rounded-lg p-6 transition-all duration-300 ${
                selectedRole === 'teacher'
                  ? 'border-mario-blue bg-mario-blue/10 shadow-xl scale-105'
                  : 'border-mario-black bg-white hover:border-mario-blue hover:shadow-lg'
              }`}
            >
              <div className="text-center space-y-4">
                <div className="bg-mario-blue text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto border-4 border-mario-black">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-2xl font-mario text-mario-red">TEACHER</h3>
                <p className="font-mario-text font-bold text-gray-700">
                  🎓 I want to share my knowledge<br/>
                  👥 Help others learn<br/>
                  💰 Earn rewards for teaching
                </p>
                {selectedRole === 'teacher' && (
                  <div className="text-mario-blue font-mario-text font-bold">
                    ✅ SELECTED!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button
              onClick={handleRoleSelection}
              disabled={!selectedRole || loading}
              className="bg-mario-red hover:bg-mario-dark-red text-white font-mario-text font-bold text-xl px-8 py-4 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🎮</span>
                  SAVING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  🚀 START MY JOURNEY!
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
