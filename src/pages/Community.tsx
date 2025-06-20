
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { AuthButton } from '@/components/AuthButton';

interface Story {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
  skill: string;
}

const sampleStories: Story[] = [
  {
    id: '1',
    author: 'Mario Rodriguez',
    authorAvatar: '🍄',
    title: 'My Journey Learning to Code',
    content: 'Started my coding adventure 6 months ago with SkillSynq+! Today I built my first full-stack application. The journey wasn\'t easy, but breaking it down into daily quests made it feel like a game. Every bug I fixed felt like collecting coins! 🪙',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop',
    likes: 42,
    comments: 8,
    timestamp: '2 hours ago',
    skill: 'Programming'
  },
  {
    id: '2',
    author: 'Princess Peach',
    authorAvatar: '👑',
    title: 'Mastering Public Speaking',
    content: 'Used to be terrified of speaking in front of people. Thanks to the confidence-building exercises here, I just gave my first presentation at work! The fear is gone and I feel like I unlocked a new superpower! ✨',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=300&fit=crop',
    likes: 67,
    comments: 15,
    timestamp: '5 hours ago',
    skill: 'Communication'
  },
  {
    id: '3',
    author: 'Luigi Green',
    authorAvatar: '🟢',
    title: 'Learning Guitar at 35',
    content: 'Never thought I could learn an instrument at my age. But the step-by-step approach here made it possible! Just played my first song for my family. Their smiles were worth all the practice sessions! 🎸',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    likes: 89,
    comments: 23,
    timestamp: '1 day ago',
    skill: 'Music'
  },
  {
    id: '4',
    author: 'Bowser Chef',
    authorAvatar: '🔥',
    title: 'From Takeout to Home Cooking',
    content: 'Went from ordering takeout every night to cooking amazing meals! Tonight I made pasta from scratch. My family couldn\'t believe it was homemade. Cooking has become my new passion! 👨‍🍳',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
    likes: 134,
    comments: 31,
    timestamp: '2 days ago',
    skill: 'Cooking'
  },
  {
    id: '5',
    author: 'Yoshi Explorer',
    authorAvatar: '🦕',
    title: 'Photography Changed My Perspective',
    content: 'Started learning photography to capture my travels better. Now I see beauty everywhere! This sunset shot was taken during my morning walk. Photography taught me to slow down and appreciate the moment. 📸',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    likes: 98,
    comments: 19,
    timestamp: '3 days ago',
    skill: 'Photography'
  }
];

const Community = () => {
  const [stories, setStories] = useState<Story[]>(sampleStories);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const handleLike = (storyId: string) => {
    const newLikedStories = new Set(likedStories);
    const newStories = stories.map(story => {
      if (story.id === storyId) {
        if (likedStories.has(storyId)) {
          newLikedStories.delete(storyId);
          return { ...story, likes: story.likes - 1 };
        } else {
          newLikedStories.add(storyId);
          return { ...story, likes: story.likes + 1 };
        }
      }
      return story;
    });
    
    setLikedStories(newLikedStories);
    setStories(newStories);
  };

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
            <Button className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold text-lg px-6 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus size={20} className="mr-2" />
              Share Your Story! 📖
            </Button>
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
        <div className="space-y-8">
          {stories.map((story) => (
            <Card key={story.id} className="border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-4 border-mario-black">
                    <AvatarFallback className="bg-mario-yellow text-mario-red text-xl font-mario">
                      {story.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-mario text-mario-red">{story.author}</h3>
                      <span className="bg-mario-blue text-white text-xs px-2 py-1 rounded font-mario-text font-bold">
                        {story.skill}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-mario-text">{story.timestamp}</p>
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
                
                <div className="rounded-lg overflow-hidden border-4 border-mario-black">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
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
                  
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-mario-blue font-mario-text font-bold">
                    <MessageCircle size={20} />
                    {story.comments} 💬
                  </Button>
                  
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-mario-green font-mario-text font-bold">
                    <Share2 size={20} />
                    Share 🔗
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold text-lg px-8 py-3 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300">
            Load More Stories 📚
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
