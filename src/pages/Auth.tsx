import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Star, Crown, Zap, Trophy, GraduationCap, Users } from 'lucide-react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [userType, setUserType] = useState<'student' | 'mentor' | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) {
      setError('Please select if you are a Student or Mentor');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Update user type in profile if different
      if (user) {
        await supabase
          .from('profiles')
          .update({ user_type: userType })
          .eq('id', user.id);
      }
      
      // Redirect will be handled by useAuth
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType) {
      setError('Please select if you are a Student or Mentor');
      return;
    }

    setLoading(true);
    setError('');

    if (!name || !age || !gender) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/home`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            age: parseInt(age),
            gender,
            user_type: userType,
          }
        }
      });

      if (error) throw error;
      
      // Mark user as new for role selection
      localStorage.setItem('skillsynq-new-user', 'true');
      localStorage.setItem('skillsynq-needs-role-selection', 'true');
      
      setError('Please check your email for a confirmation link!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mario-blue font-mario-text flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mario decorative elements */}
      <div className="absolute top-8 left-8 text-mario-yellow text-4xl animate-bounce-mario">🍄</div>
      <div className="absolute top-16 right-16 text-mario-white text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute bottom-16 left-16 text-mario-green text-3xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎯</div>
      <div className="absolute bottom-8 right-8 text-mario-yellow text-4xl animate-bounce-mario" style={{animationDelay: '1.5s'}}>🏆</div>
      
      {/* Floating coins pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-mario-yellow text-2xl animate-bounce-mario"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            🪙
          </div>
        ))}
      </div>

      {/* SkillSync+ Title - Same as Hero component */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-center items-center gap-3">
          <div className="bg-mario-white text-mario-red p-3 rounded-lg shadow-lg border-4 border-mario-black">
            <Trophy size={32} />
          </div>
          <h1 className="text-5xl font-mario text-shadow-lg text-white">SkillSynq+</h1>
        </div>
      </div>

      <Card className="w-full max-w-md bg-mario-white border-8 border-mario-black shadow-2xl relative z-10 mt-20">
        <CardHeader className="text-center bg-mario-red text-white border-b-4 border-mario-black">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Crown className="text-mario-yellow" size={32} />
            <CardTitle className="text-2xl font-mario text-shadow-lg">
              {isSignUp ? '🎮 JOIN THE QUEST' : '🎮 WELCOME BACK'}
            </CardTitle>
            <Crown className="text-mario-yellow" size={32} />
          </div>
          <p className="font-mario-text font-bold">
            {isSignUp ? 'CREATE YOUR MARIO PROFILE!' : 'CONTINUE YOUR ADVENTURE!'}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {error && (
            <div className="bg-mario-red text-white p-3 rounded-lg border-4 border-mario-black font-mario-text font-bold text-center">
              {error}
            </div>
          )}

          {/* User Type Selection */}
          <div className="space-y-3">
            <Label className="font-mario-text font-bold text-mario-red flex items-center gap-2">
              <Star size={16} className="text-mario-yellow" />
              ARE YOU A...
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`p-3 border-4 rounded-lg font-mario-text font-bold transition-all duration-300 ${
                  userType === 'student'
                    ? 'border-mario-green bg-mario-green text-white shadow-lg'
                    : 'border-mario-black bg-white text-mario-black hover:border-mario-green'
                }`}
              >
                <GraduationCap className="mx-auto mb-1" size={20} />
                STUDENT
              </button>
              <button
                type="button"
                onClick={() => setUserType('mentor')}
                className={`p-3 border-4 rounded-lg font-mario-text font-bold transition-all duration-300 ${
                  userType === 'mentor'
                    ? 'border-mario-blue bg-mario-blue text-white shadow-lg'
                    : 'border-mario-black bg-white text-mario-black hover:border-mario-blue'
                }`}
              >
                <Users className="mx-auto mb-1" size={20} />
                MENTOR
              </button>
            </div>
          </div>
          
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                <Star size={16} className="text-mario-yellow" />
                EMAIL ADDRESS
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-4 border-mario-black font-mario-text font-bold"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                <Zap size={16} className="text-mario-blue" />
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-4 border-mario-black font-mario-text font-bold"
                placeholder="••••••••"
              />
            </div>
            
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                    <span className="text-mario-green">👤</span>
                    YOUR NAME
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-4 border-mario-black font-mario-text font-bold"
                    placeholder="Mario"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                    <span className="text-mario-purple">🎂</span>
                    YOUR AGE
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min="1"
                    max="120"
                    className="border-4 border-mario-black font-mario-text font-bold"
                    placeholder="25"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                    <span className="text-mario-orange">🌟</span>
                    GENDER
                  </Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full border-4 border-mario-black rounded-lg p-2 font-mario-text font-bold"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </>
            )}
            
            <Button
              type="submit"
              disabled={loading || !userType}
              className="w-full bg-mario-red hover:bg-mario-dark-red text-white font-mario-text font-bold text-lg py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🎮</span>
                  LOADING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isSignUp ? '🚀 START ADVENTURE' : '🎯 CONTINUE QUEST'}
                </span>
              )}
            </Button>
          </form>
          
          <div className="text-center pt-4 border-t-4 border-mario-black">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setUserType('');
              }}
              className="font-mario-text font-bold text-mario-blue hover:text-mario-dark-blue transition-colors"
            >
              {isSignUp ? (
                <span className="flex items-center justify-center gap-2">
                  <span>🎮</span>
                  ALREADY HAVE AN ACCOUNT? SIGN IN!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  NEW PLAYER? CREATE ACCOUNT!
                </span>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
