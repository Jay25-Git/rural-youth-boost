
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { User, Camera, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    nickname: '',
    bio: '',
    job: '',
    location: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          nickname: data.nickname || '',
          bio: data.bio || '',
          job: data.job || '',
          location: data.location || '',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}/avatar.${fileExt}`;
      const filePath = `${fileName}`;

      // Remove old avatar if exists
      if (profile.avatar_url) {
        await supabase.storage.from('avatars').remove([profile.avatar_url]);
      }

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      setProfile(prev => ({ ...prev, avatar_url: filePath }));
      
      toast({
        title: "Success",
        description: "Avatar uploaded successfully!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .update({
          nickname: profile.nickname,
          bio: profile.bio,
          job: profile.job,
          location: profile.location,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user!.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = () => {
    if (profile.avatar_url) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_url);
      return data.publicUrl;
    }
    return null;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-mario-blue font-mario-text p-4">
      {/* Mario decorative elements */}
      <div className="absolute top-8 left-8 text-mario-yellow text-4xl animate-bounce-mario">👑</div>
      <div className="absolute top-16 right-16 text-mario-white text-3xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute bottom-16 left-16 text-mario-green text-3xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎯</div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/home')}
            className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold border-4 border-mario-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            BACK TO HOME
          </Button>
        </div>

        <Card className="bg-mario-white border-8 border-mario-black shadow-2xl">
          <CardHeader className="text-center bg-mario-red text-white border-b-4 border-mario-black">
            <CardTitle className="text-2xl font-mario text-shadow-lg flex items-center justify-center gap-2">
              <User size={32} />
              🎮 PLAYER PROFILE 🎮
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-8 border-mario-black shadow-lg">
                  <AvatarImage src={getAvatarUrl() || undefined} alt="Player Avatar" />
                  <AvatarFallback className="bg-mario-yellow text-mario-red text-3xl font-mario font-bold">
                    {profile.nickname ? profile.nickname.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-mario-red hover:bg-mario-dark-red text-white p-2 rounded-full border-4 border-mario-black cursor-pointer shadow-lg">
                  <Camera size={20} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </div>
              {uploading && (
                <p className="text-mario-red font-mario-text font-bold">UPLOADING AVATAR... 📸</p>
              )}
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                  <span className="text-mario-purple">🏷️</span>
                  NICKNAME
                </Label>
                <Input
                  id="nickname"
                  value={profile.nickname}
                  onChange={(e) => setProfile(prev => ({ ...prev, nickname: e.target.value }))}
                  placeholder="Enter your gaming nickname..."
                  className="border-4 border-mario-black font-mario-text font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                  <span className="text-mario-blue">📝</span>
                  BIO
                </Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full border-4 border-mario-black rounded-lg p-2 font-mario-text font-bold resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                  <span className="text-mario-green">💼</span>
                  JOB
                </Label>
                <Input
                  id="job"
                  value={profile.job}
                  onChange={(e) => setProfile(prev => ({ ...prev, job: e.target.value }))}
                  placeholder="What's your job or profession?"
                  className="border-4 border-mario-black font-mario-text font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="font-mario-text font-bold text-mario-red flex items-center gap-2">
                  <span className="text-mario-orange">📍</span>
                  LOCATION
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where do you live?"
                  className="border-4 border-mario-black font-mario-text font-bold"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-mario-green hover:bg-mario-dark-green text-white font-mario-text font-bold text-lg py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚡</span>
                  SAVING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save size={20} />
                  SAVE PROFILE
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
