
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
import { supabase } from '@/integrations/supabase/client';
import VoiceRecorder from '@/components/VoiceRecorder';

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

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      console.log('Sending message to Smart Mario:', currentMessage);
      
      const { data, error } = await supabase.functions.invoke('smart-mario-chat', {
        body: { message: currentMessage }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received response from Smart Mario:', data);

      const marioResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "🍄 Mamma mia! I had trouble understanding that. Could you try asking again?",
        sender: 'mario',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, marioResponse]);
    } catch (error) {
      console.error('Error calling Smart Mario:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🍄 Mamma mia! I'm having trouble connecting to my brain right now. Please try again in a moment! 🌟",
        sender: 'mario',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Smart Mario is having trouble right now. Please try again!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceTranscription = (transcribedText: string) => {
    setInputText(transcribedText);
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
                  <p className="font-mario-text font-bold text-sm leading-relaxed whitespace-pre-wrap">
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
              <VoiceRecorder
                onTranscription={handleVoiceTranscription}
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
              💡 TIP: Press Enter to send or use the microphone to speak! 🎙️
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartMario;
