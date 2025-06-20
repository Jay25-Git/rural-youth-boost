
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { careerSkills, lifeSkills, hobbySkills } from '../data/skillsData';

const SkillDetail = () => {
  const { skillId } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Find the skill across all categories
  const allSkills = [...careerSkills, ...lifeSkills, ...hobbySkills];
  const skill = allSkills.find(s => s.id === skillId);

  if (!skill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Skill Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getCategoryInfo = () => {
    if (careerSkills.includes(skill)) {
      return { category: 'Career Skills', color: 'blue' };
    } else if (lifeSkills.includes(skill)) {
      return { category: 'Life Skills', color: 'green' };
    } else {
      return { category: 'Hobby Skills', color: 'purple' };
    }
  };

  const { category, color } = getCategoryInfo();

  const getColorClasses = (colorName: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-500 to-blue-600',
        button: 'bg-blue-500 hover:bg-blue-600',
        border: 'border-blue-500'
      },
      green: {
        bg: 'from-green-500 to-green-600',
        button: 'bg-green-500 hover:bg-green-600',
        border: 'border-green-500'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        button: 'bg-purple-500 hover:bg-purple-600',
        border: 'border-purple-500'
      }
    };
    return colorMap[colorName as keyof typeof colorMap] || colorMap.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClasses.bg} text-white py-8`}>
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-4">
            <ArrowLeft size={20} />
            Back to Skills
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-sm opacity-90">{category}</span>
            <h1 className="text-4xl font-bold">{skill.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Skill Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">About This Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6">
                {skill.description}
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Why This Skill Matters:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    This skill will help you in many areas of your life. Learning {skill.title.toLowerCase()} 
                    can open new opportunities and make daily tasks easier.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className={`border-l-4 ${colorClasses.border}`}>
            <CardHeader>
              <CardTitle className="text-xl">Test Your Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-4">
                    {skill.quiz.question}
                  </h4>
                  <div className="space-y-3">
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
                    <p className="text-sm text-gray-700 mb-4">
                      {skill.quiz.explanation}
                    </p>
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <RotateCcw size={16} className="mr-2" />
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Learning Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Ready to Learn More?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Practice</h4>
                <p className="text-sm text-gray-600">
                  Try using this skill in your daily life for real experience.
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Ask Questions</h4>
                <p className="text-sm text-gray-600">
                  Talk to teachers, friends, or family about what you've learned.
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Keep Learning</h4>
                <p className="text-sm text-gray-600">
                  Explore other skills that work well together with this one.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/">
                <Button className={`${colorClasses.button} text-white`}>
                  Explore More Skills
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillDetail;
