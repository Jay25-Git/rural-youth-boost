
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Crown } from 'lucide-react';

export const AuthButton = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-mario-white text-mario-red px-3 py-2 rounded-lg border-4 border-mario-black font-mario-text font-bold">
          <User size={16} />
          <span className="text-sm">PLAYER</span>
        </div>
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
