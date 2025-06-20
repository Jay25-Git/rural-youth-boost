
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { LogOut, User, Crown, Settings } from 'lucide-react';

export const AuthButton = () => {
  const { user, signOut } = useAuth();
  const { getDisplayName, getAvatarUrl } = useProfile();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/profile">
          <div className="flex items-center gap-3 bg-mario-white text-mario-red px-3 py-2 rounded-lg border-4 border-mario-black font-mario-text font-bold hover:bg-mario-yellow transition-colors cursor-pointer">
            <Avatar className="w-8 h-8 border-2 border-mario-black">
              <AvatarImage src={getAvatarUrl() || undefined} alt="Player Avatar" />
              <AvatarFallback className="bg-mario-yellow text-mario-red text-sm font-mario font-bold">
                {getDisplayName().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-xs">PLAYER</span>
              <span className="text-sm">{getDisplayName().toUpperCase()}</span>
            </div>
            <Settings size={14} className="hidden sm:block" />
          </div>
        </Link>
        <Button
          onClick={signOut}
          className="bg-mario-red hover:bg-mario-dark-red text-white font-mario-text font-bold border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <LogOut size={16} className="mr-2" />
          <span className="hidden sm:inline">SIGN OUT</span>
          <span className="sm:hidden">OUT</span>
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-lg px-6 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        {/* Button decorative sparkles */}
        <span className="absolute top-1 left-2 text-xs">✨</span>
        <span className="absolute bottom-1 right-2 text-xs">✨</span>
        
        <Crown size={20} className="mr-2" />
        <span className="hidden sm:inline">SIGN IN / SIGN UP</span>
        <span className="sm:hidden">LOGIN</span>
      </Button>
    </Link>
  );
};
