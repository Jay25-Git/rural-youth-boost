
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'student' | 'mentor';
  requiredUserRole?: 'learner' | 'teacher';
}

export const ProtectedRoute = ({ 
  children, 
  requiredUserType, 
  requiredUserRole 
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const { profile, loading } = useProfile();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mario-blue flex items-center justify-center">
        <div className="text-white font-mario text-2xl">Loading...</div>
      </div>
    );
  }

  if (requiredUserType && profile?.user_type !== requiredUserType) {
    return <Navigate to="/home" replace />;
  }

  if (requiredUserRole && profile?.user_role !== requiredUserRole) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};
