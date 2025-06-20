
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Home, Bot, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mario';
  timestamp: Date;
}

const SmartMario = () => {
  const { user } = useAuth();
  const { getDisplayName } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🍄 It's-a me, Smart Mario! Welcome to my knowledge kingdom! Ask me anything and I'll help you power-up your learning! 🌟",
      sender: 'mario',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateMarioResponse = (userMessage: string): string => {
    const responses = [
      "🍄 Mamma mia! That's a great question! Let me think... Based on my experience in the Mushroom Kingdom and beyond, here's what I know about that!",
      "🌟 Wahoo! I love helping with questions like this! You know, Princess Peach always says that learning is the greatest power-up of all!",
      "⭐ Super! That reminds me of my adventures through different worlds. Here's what I've learned that might help you:",
      "🎮 Let's-a go! That's exactly the kind of curiosity that makes a true hero! From my experience jumping through levels of knowledge:",
      "🏆 Excellent question, my friend! Luigi and I have faced many challenges, and here's what we've discovered:",
      "🔥 Fire Flower power activated! I'm ready to help you with that. In all my quests, I've learned that:",
      "🎯 Bullseye! That's a question worth 1000 coins! Let me share some wisdom from the Super Mario knowledge database:"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simple keyword-based responses for demonstration
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "🍄 Hello there, brave adventurer! It's-a me, Smart Mario! Ready for some super knowledge quests? What would you like to learn about today?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "🌟 You're welcome! Remember, helping others is what makes a true hero! Keep learning and growing, just like collecting power-ups! Wahoo!";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      return "🎮 Learning new skills is like collecting power-ups! Each skill you master makes you stronger and opens up new worlds of possibility! What skill adventure would you like to embark on?";
    }
    
    if (lowerMessage.includes('help')) {
      return "🏆 Of course I'll help you! That's what I'm here for! Just like how I help save Princess Peach, I'm here to help save you from confusion! What do you need assistance with?";
    }
    
    return `${randomResponse} While I'd love to give you a detailed answer, remember that I'm still learning too! For the most accurate information, consider checking reliable sources or asking specific experts in that field. But I'm always here to encourage your curiosity! 🍄`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const marioResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateMarioResponse(inputText),
        sender: 'mario',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, marioResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-mario-blue">
      {/* Header */}
      <div className="bg-mario-red text-white p-4 border-b-8 border-mario-black">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/home')}
              className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold border-4 border-mario-black"
            >
              <Home size={20} className="mr-2" />
              HOME
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-mario-white text-mario-red p-3 rounded-lg border-4 border-mario-black">
                <Bot size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-mario">🍄 SMART MARIO</h1>
                <p className="text-sm font-mario-text font-bold">YOUR AI KNOWLEDGE COMPANION</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-mario-text font-bold">PLAYER: {getDisplayName().toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-200px)] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="w-10 h-10 border-4 border-mario-black">
                {message.sender === 'mario' ? (
                  <AvatarFallback className="bg-mario-red text-white text-lg">
                    🍄
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-mario-yellow text-mario-red font-mario font-bold">
                    <User size={20} />
                  </AvatarFallback>
                )}
              </Avatar>
              <Card className={`max-w-[70%] border-4 border-mario-black ${
                message.sender === 'user' 
                  ? 'bg-mario-yellow text-mario-red' 
                  : 'bg-mario-white text-mario-black'
              }`}>
                <CardContent className="p-3">
                  <p className="font-mario-text font-bold text-sm leading-relaxed">
                    {message.text}
                  </p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 border-4 border-mario-black">
                <AvatarFallback className="bg-mario-red text-white text-lg">
                  🍄
                </AvatarFallback>
              </Avatar>
              <Card className="border-4 border-mario-black bg-mario-white">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-bounce">🤔</div>
                    <p className="font-mario-text font-bold text-sm">
                      Mario is thinking...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <Card className="border-4 border-mario-black bg-mario-white">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Smart Mario anything! 🍄"
                className="flex-1 border-4 border-mario-black font-mario-text font-bold"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-mario-red hover:bg-mario-dark-red text-white font-mario-text font-bold border-4 border-mario-black px-6"
              >
                <Send size={20} />
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-mario-text">
              💡 TIP: Press Enter to send your message quickly!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartMario;
