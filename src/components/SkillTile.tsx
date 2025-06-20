
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Play } from 'lucide-react';

interface Skill {
  id: string;
  title: string;
  description: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

interface SkillTileProps {
  skill: Skill;
  accentColor: string;
}

export const SkillTile: React.FC<SkillTileProps> = ({ skill, accentColor }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getAccentClasses = (color: string) => {
    const colorMap = {
      blue: 'border-blue-500 hover:border-blue-600',
      green: 'border-green-500 hover:border-green-600',
      purple: 'border-purple-500 hover:border-purple-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getButtonClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-lg border-l-4 ${getAccentClasses(accentColor)}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {skill.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed">
          {skill.description}
        </p>
        
        {!showQuiz ? (
          <Button 
            onClick={() => setShowQuiz(true)}
            className={`w-full ${getButtonClasses(accentColor)} text-white`}
          >
            <Play size={16} className="mr-2" />
            Take Quick Quiz
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-3">
                {skill.quiz.question}
              </h4>
              <div className="space-y-2">
                {skill.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      showResult
                        ? index === skill.quiz.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : index === selectedAnswer
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300 text-gray-600'
                        : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <>
                          {index === skill.quiz.correctAnswer && (
                            <CheckCircle className="text-green-600" size={20} />
                          )}
                          {index === selectedAnswer && index !== skill.quiz.correctAnswer && (
                            <XCircle className="text-red-600" size={20} />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {showResult && (
              <div className={`p-4 rounded-lg ${
                selectedAnswer === skill.quiz.correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className="text-sm text-gray-700 mb-3">
                  {skill.quiz.explanation}
                </p>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Try Another Skill
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
