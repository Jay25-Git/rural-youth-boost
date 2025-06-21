import React, { useState, useEffect } from 'react';
import { Heart, Share2, Plus, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { AuthButton } from '@/components/AuthButton';
import { StoryReplies } from '@/components/StoryReplies';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Story {
  id: string;
  author_name: string;
  title: string;
  content: string;
  image_url: string | null;
  likes: number;
  skill: string;
  created_at: string;
  user_id: string;
}

const Community = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
        toast({
          title: "Error",
          description: "Failed to load stories. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }

      setStories(data || []);
    } catch (error) {
      console.error('Error in fetchStories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLikes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('story_likes')
        .select('story_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user likes:', error);
        return;
      }

      const likedStoryIds = new Set(data?.map(like => like.story_id) || []);
      setLikedStories(likedStoryIds);
    } catch (error) {
      console.error('Error in fetchUserLikes:', error);
    }
  };

  const handleLike = async (storyId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like stories.",
        variant: "destructive",
      });
      return;
    }

    const isLiked = likedStories.has(storyId);
    const newLikedStories = new Set(likedStories);

    try {
      if (isLiked) {
        // Unlike the story
        const { error } = await supabase
          .from('story_likes')
          .delete()
          .eq('story_id', storyId)
          .eq('user_id', user.id);

        if (error) throw error;

        newLikedStories.delete(storyId);
        
        // Update likes count in stories
        await (supabase as any).rpc('decrement_story_likes', { story_id: storyId });
      } else {
        // Like the story
        const { error } = await supabase
          .from('story_likes')
          .insert({
            story_id: storyId,
            user_id: user.id,
          });

        if (error) throw error;

        newLikedStories.add(storyId);
        
        // Update likes count in stories
        await (supabase as any).rpc('increment_story_likes', { story_id: storyId });
      }

      setLikedStories(newLikedStories);
      
      // Update local state
      setStories(prev => prev.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.likes + (isLiked ? -1 : 1) }
          : story
      ));
    } catch (error) {
      console.error('Error handling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getAvatarEmoji = (authorName: string) => {
    const emojis = ['🍄', '👑', '🟢', '🔥', '🦕', '⭐', '🎯', '🌟'];
    const index = authorName.length % emojis.length;
    return emojis[index];
  };

  const handleCommentCountChange = (storyId: string, newCount: number) => {
    setCommentCounts(prev => ({
      ...prev,
      [storyId]: newCount
    }));
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserLikes();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white font-mario-text">
      {/* Header */}
      <div className="bg-mario-red text-white py-8 border-b-8 border-mario-black">
        <div className="absolute top-6 right-6">
          <AuthButton />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-mario-white text-mario-red p-3 rounded-lg shadow-lg border-4 border-mario-black">
              <Camera size={32} />
            </div>
            <h1 className="text-4xl font-mario">Community Stories</h1>
          </div>
          <p className="text-lg font-mario-text font-bold">
            🌟 Share your learning journey and inspire others! 🌟
          </p>
          
          <div className="mt-6">
            <Link to="/share-story">
              <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-lg px-6 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus size={20} className="mr-2" />
                Share Your Story! 📖
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-mario-white border-b-4 border-mario-black py-4">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/home" className="text-mario-blue hover:text-mario-red font-mario-text font-bold">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Stories Feed */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-2xl font-mario text-mario-blue">Loading amazing stories... 🔄</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl font-mario text-mario-blue mb-4">No stories yet! 📚</p>
            <p className="text-lg font-mario-text text-gray-600 mb-6">
              Be the first to share your learning journey with the community!
            </p>
            <Link to="/share-story">
              <Button className="bg-mario-green hover:bg-mario-dark-green text-white font-mario-text font-bold text-lg px-6 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus size={20} className="mr-2" />
                Share the First Story! 🚀
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {stories.map((story) => (
              <Card key={story.id} className="border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-4 border-mario-black">
                      <AvatarFallback className="bg-mario-yellow text-mario-red text-xl font-mario">
                        {getAvatarEmoji(story.author_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mario text-mario-red">{story.author_name}</h3>
                        <span className="bg-mario-blue text-white text-xs px-2 py-1 rounded font-mario-text font-bold">
                          {story.skill}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-mario-text">{formatDate(story.created_at)}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-mario-text font-bold text-mario-red mt-3">
                    {story.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-700 font-mario-text leading-relaxed">
                    {story.content}
                  </p>
                  
                  {story.image_url && (
                    <div className="rounded-lg overflow-hidden border-4 border-mario-black">
                      <img 
                        src={story.image_url} 
                        alt={story.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 pt-4 border-t-2 border-mario-black">
                    <Button
                      variant="ghost"
                      onClick={() => handleLike(story.id)}
                      className={`flex items-center gap-2 font-mario-text font-bold ${
                        likedStories.has(story.id) 
                          ? 'text-mario-red hover:text-mario-red' 
                          : 'text-gray-600 hover:text-mario-red'
                      }`}
                    >
                      <Heart 
                        size={20} 
                        className={likedStories.has(story.id) ? 'fill-current' : ''} 
                      />
                      {story.likes} ❤️
                    </Button>
                    
                    <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-mario-green font-mario-text font-bold">
                      <Share2 size={20} />
                      Share 🔗
                    </Button>
                  </div>

                  {/* Story Replies Component */}
                  <StoryReplies 
                    storyId={story.id}
                    commentsCount={commentCounts[story.id] || 0}
                    onCommentCountChange={(newCount) => handleCommentCountChange(story.id, newCount)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Load More Button - for future pagination */}
        {!loading && stories.length > 0 && (
          <div className="text-center mt-12">
            <Button className="bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold text-lg px-8 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
              Load More Stories 📚
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
