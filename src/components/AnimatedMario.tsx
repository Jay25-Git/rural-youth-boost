
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const marioPhrases = [
  "🍄 It's-a me, Mario! Wahoo!",
  "⭐ Let's-a go learn something new!",
  "🎯 Mamma mia! You're doing great!",
  "🌟 Power up your skills!",
  "🍄 Here we go! Ask me anything!",
  "⭐ Yahoo! Ready for an adventure?",
  "🎮 Game on! Let's level up!",
  "🍄 Wahoo! Click me for help!"
];

export const AnimatedMario = () => {
  const [position, setPosition] = useState(20);
  const [direction, setDirection] = useState(1);
  const [showSpeech, setShowSpeech] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(marioPhrases[0]);
  const [isMoving, setIsMoving] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMoving) return;
      
      setPosition(prev => {
        const newPos = prev + (direction * 2);
        
        // Change direction when hitting edges
        if (newPos >= window.innerWidth - 100) {
          setDirection(-1);
          return window.innerWidth - 100;
        } else if (newPos <= 20) {
          setDirection(1);
          return 20;
        }
        
        return newPos;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction, isMoving]);

  const handleMarioClick = () => {
    // Stop moving temporarily
    setIsMoving(false);
    
    // Show random phrase
    const randomPhrase = marioPhrases[Math.floor(Math.random() * marioPhrases.length)];
    setCurrentPhrase(randomPhrase);
    setShowSpeech(true);
    
    // Hide speech after 3 seconds and resume moving
    setTimeout(() => {
      setShowSpeech(false);
      setTimeout(() => {
        setIsMoving(true);
      }, 500);
    }, 3000);
  };

  const handleDoubleClick = () => {
    navigate('/smart-mario');
  };

  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none z-40">
      {/* Speech bubble */}
      {showSpeech && (
        <div 
          className="absolute bottom-20 bg-mario-white border-4 border-mario-black rounded-lg p-4 shadow-lg animate-scale-in pointer-events-none"
          style={{ 
            left: `${position}px`,
            transform: direction === -1 ? 'translateX(-80%)' : 'translateX(20%)',
            minWidth: '200px',
            maxWidth: '300px'
          }}
        >
          <div className="font-mario-text font-bold text-mario-red text-base whitespace-normal">
            {currentPhrase}
          </div>
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-mario-black"
          />
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-mario-white mt-px"
          />
        </div>
      )}
      
      {/* Mario character */}
      <div 
        className="absolute bottom-4 cursor-pointer hover:scale-110 transition-all duration-300 pointer-events-auto"
        style={{ 
          left: `${position}px`,
          transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
        }}
        onClick={handleMarioClick}
        onDoubleClick={handleDoubleClick}
        title="Click me! Double-click to chat!"
      >
        <div className="bg-mario-red p-4 rounded-full border-4 border-mario-black shadow-lg hover:shadow-xl">
          <div className={`text-4xl ${isMoving ? 'animate-bounce-mario' : ''}`}>
            🐢
          </div>
        </div>
        
        {/* Movement indicator */}
        {isMoving && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="text-xs text-mario-yellow animate-pulse">💨</div>
          </div>
        )}
      </div>

      {/* Instructions tooltip */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-mario-black text-mario-white text-xs font-mario-text font-bold px-3 py-1 rounded pointer-events-none opacity-70">
        Click Mario to hear him speak! Double-click to chat! 🍄
      </div>
    </div>
  );
};
