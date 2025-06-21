
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface Reply {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface StoryRepliesProps {
  storyId: string;
  commentsCount: number;
  onCommentCountChange: (newCount: number) => void;
}

export const StoryReplies: React.FC<StoryRepliesProps> = ({ 
  storyId, 
  commentsCount, 
  onCommentCountChange 
}) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { getDisplayName } = useProfile();
  const { toast } = useToast();

  const fetchReplies = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('story_replies')
        .select('*')
        .eq('story_id', storyId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching replies:', error);
        return;
      }

      setReplies(data || []);
      onCommentCountChange(data?.length || 0);
    } catch (error) {
      console.error('Error in fetchReplies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to reply to stories.",
        variant: "destructive",
      });
      return;
    }

    if (!newReply.trim()) {
      toast({
        title: "Empty Reply",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('story_replies')
        .insert({
          story_id: storyId,
          user_id: user.id,
          author_name: getDisplayName(),
          content: newReply.trim(),
        });

      if (error) {
        console.error('Error submitting reply:', error);
        toast({
          title: "Error",
          description: "Failed to submit your reply. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setNewReply('');
      await fetchReplies();
      
      toast({
        title: "Success!",
        description: "Your reply has been added! 💬",
      });
    } catch (error) {
      console.error('Error in handleSubmitReply:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies && replies.length === 0) {
      fetchReplies();
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

  return (
    <div className="space-y-4">
      {/* Comments Button */}
      <Button 
        variant="ghost" 
        onClick={toggleReplies}
        className="flex items-center gap-2 text-gray-600 hover:text-mario-blue font-mario-text font-bold"
      >
        <MessageCircle size={20} />
        {commentsCount} 💬 {showReplies ? 'Hide' : 'Show'} Comments
      </Button>

      {/* Replies Section */}
      {showReplies && (
        <div className="space-y-4 ml-4 border-l-4 border-mario-yellow pl-4">
          {/* Reply Form */}
          {user && (
            <form onSubmit={handleSubmitReply} className="space-y-2">
              <Textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Share your thoughts on this story..."
                className="border-4 border-mario-black font-mario-text min-h-[80px]"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting || !newReply.trim()}
                className="bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold"
              >
                {isSubmitting ? (
                  'Posting... ⏳'
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Post Reply 💬
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Replies List */}
          {loading ? (
            <div className="text-center py-4">
              <p className="text-mario-blue font-mario-text">Loading comments... 🔄</p>
            </div>
          ) : replies.length > 0 ? (
            <div className="space-y-3">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-mario-white border-2 border-mario-black rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-mario-blue" />
                    <span className="font-mario-text font-bold text-mario-red">
                      {reply.author_name}
                    </span>
                    <span className="text-sm text-gray-500 font-mario-text">
                      {formatDate(reply.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-700 font-mario-text leading-relaxed">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 font-mario-text">
                No comments yet. Be the first to share your thoughts! 💭
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
