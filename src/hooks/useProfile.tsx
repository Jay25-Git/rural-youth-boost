
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  nickname?: string;
  bio?: string;
  job?: string;
  location?: string;
  avatar_url?: string;
  age?: number;
  gender?: string;
  user_type?: 'student' | 'mentor';
  user_role?: 'learner' | 'teacher';
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        const profileData: Profile = {
          ...data,
          user_type: data.user_type as 'student' | 'mentor' | undefined,
          user_role: data.user_role as 'learner' | 'teacher' | undefined,
        } as Profile;
        setProfile(profileData);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayName = () => {
    if (!profile) return user?.email?.split('@')[0] || 'Player';
    return profile.nickname || profile.name || user?.email?.split('@')[0] || 'Player';
  };

  const getAvatarUrl = () => {
    if (profile?.avatar_url) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(profile.avatar_url);
      // Add small cache buster tied to updated_at if available
      const base = data.publicUrl;
      return base;
    }
    return null;
  };

  return {
    profile,
    loading,
    getDisplayName,
    getAvatarUrl,
    refetch: fetchProfile
  };
};
