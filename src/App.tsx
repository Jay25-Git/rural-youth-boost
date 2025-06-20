
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import SkillDetail from "./pages/SkillDetail";
import CollectedStarsAndBadges from "./pages/CollectedStarsAndBadges";
import SmartMario from "./pages/SmartMario";
import MentorMode from "./pages/MentorMode";
import Community from "./pages/Community";
import ShareStory from "./pages/ShareStory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/home" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/skill/:skillId" element={<SkillDetail />} />
              <Route path="/collected" element={<CollectedStarsAndBadges />} />
              <Route path="/smart-mario" element={<SmartMario />} />
              <Route path="/mentor-mode" element={<MentorMode />} />
              <Route path="/community" element={<Community />} />
              <Route path="/" element={<Navigate to="/auth" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/share-story" element={<ShareStory />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
