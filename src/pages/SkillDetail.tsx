
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Play, BookOpen, Lightbulb, FileText } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-mario-blue to-mario-light-blue flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg border-4 border-mario-red">
          <h1 className="text-2xl font-mario text-mario-red mb-4">Mamma Mia! Skill Not Found!</h1>
          <Link to="/">
            <Button className="bg-mario-red hover:bg-mario-dark-red text-white font-mario-text">
              Back to Home
            </Button>
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
      return { category: 'Career Skills', color: 'mario-blue', bgGradient: 'from-mario-blue to-mario-dark-blue' };
    } else if (lifeSkills.includes(skill)) {
      return { category: 'Life Skills', color: 'mario-green', bgGradient: 'from-mario-green to-green-600' };
    } else {
      return { category: 'Hobby Skills', color: 'mario-purple', bgGradient: 'from-mario-purple to-purple-600' };
    }
  };

  const { category, color, bgGradient } = getCategoryInfo();

  const getColorClasses = (colorName: string) => {
    const colorMap = {
      'mario-blue': {
        bg: 'from-mario-blue to-mario-dark-blue',
        button: 'bg-mario-blue hover:bg-mario-dark-blue',
        border: 'border-mario-blue',
        accent: 'bg-mario-light-blue'
      },
      'mario-green': {
        bg: 'from-mario-green to-green-600',
        button: 'bg-mario-green hover:bg-green-600',
        border: 'border-mario-green',
        accent: 'bg-green-100'
      },
      'mario-purple': {
        bg: 'from-mario-purple to-purple-600',
        button: 'bg-mario-purple hover:bg-purple-600',
        border: 'border-mario-purple',
        accent: 'bg-purple-100'
      }
    };
    return colorMap[colorName as keyof typeof colorMap] || colorMap['mario-blue'];
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mario-yellow via-mario-orange to-mario-red">
      {/* Header with Mario theme */}
      <div className={`bg-gradient-to-r ${colorClasses.bg} text-white py-8 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl animate-bounce-mario">🍄</div>
          <div className="absolute top-8 right-8 text-4xl animate-bounce-mario" style={{animationDelay: '0.5s'}}>⭐</div>
          <div className="absolute bottom-4 left-1/4 text-5xl animate-bounce-mario" style={{animationDelay: '1s'}}>🎮</div>
          <div className="absolute bottom-8 right-1/4 text-3xl animate-bounce-mario" style={{animationDelay: '1.5s'}}>🏆</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-mario-yellow mb-4 font-mario-text transition-colors">
            <ArrowLeft size={20} />
            Back to Skills
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-sm opacity-90 font-mario-text">{category}</span>
            <h1 className="text-4xl font-mario text-mario-white drop-shadow-lg">{skill.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Skill Information */}
          <Card className="border-4 border-mario-red shadow-lg">
            <CardHeader className={`${colorClasses.accent} rounded-t-lg`}>
              <CardTitle className="text-xl flex items-center gap-2 font-mario-text">
                <BookOpen size={20} />
                About This Skill
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6 font-mario-text">
                {skill.description}
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 font-mario-text">Why This Skill Matters:</h3>
                <div className="bg-mario-yellow bg-opacity-20 p-4 rounded-lg border-2 border-mario-yellow">
                  <p className="text-sm text-gray-600 font-mario-text">
                    This skill will help you in many areas of your life. Learning {skill.title.toLowerCase()} 
                    can open new opportunities and make daily tasks easier.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className={`border-l-4 ${colorClasses.border} border-4 border-mario-blue shadow-lg`}>
            <CardHeader className="bg-mario-light-blue bg-opacity-30 rounded-t-lg">
              <CardTitle className="text-xl font-mario-text">Test Your Knowledge 🎯</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-mario-blue">
                  <h4 className="font-medium text-gray-800 mb-4 font-mario-text">
                    {skill.quiz.question}
                  </h4>
                  <div className="space-y-3">
                    {skill.quiz.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 font-mario-text ${
                          showResult
                            ? index === skill.quiz.correctAnswer
                              ? 'bg-mario-green text-white border-mario-green shadow-lg'
                              : index === selectedAnswer
                              ? 'bg-mario-red text-white border-mario-red'
                              : 'bg-gray-100 border-gray-300 text-gray-600'
                            : 'bg-white border-mario-blue hover:border-mario-red hover:bg-mario-yellow hover:bg-opacity-30 hover:scale-105'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && (
                            <>
                              {index === skill.quiz.correctAnswer && (
                                <CheckCircle className="text-white" size={20} />
                              )}
                              {index === selectedAnswer && index !== skill.quiz.correctAnswer && (
                                <XCircle className="text-white" size={20} />
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {showResult && (
                  <div className={`p-4 rounded-lg border-2 ${
                    selectedAnswer === skill.quiz.correctAnswer
                      ? 'bg-mario-green bg-opacity-20 border-mario-green'
                      : 'bg-mario-blue bg-opacity-20 border-mario-blue'
                  }`}>
                    <p className="text-sm text-gray-700 mb-4 font-mario-text">
                      {skill.quiz.explanation}
                    </p>
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      size="sm"
                      className="w-full border-2 border-mario-red text-mario-red hover:bg-mario-red hover:text-white font-mario-text"
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

        {/* How to Learn This Skill Section */}
        <Card className="mt-8 border-4 border-mario-green shadow-lg">
          <CardHeader className="bg-mario-green bg-opacity-20 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2 font-mario text-mario-green">
              <Lightbulb size={20} />
              How to Learn This Skill 🚀
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800 font-mario-text">Getting Started 🌟</h4>
                <div className="space-y-3">
                  {skill.learningSteps.gettingStarted.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-mario-blue bg-opacity-10 rounded-lg border-2 border-mario-blue">
                      <span className="bg-mario-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold font-mario">
                        {index + 1}
                      </span>
                      <p className="text-sm text-gray-700 font-mario-text">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800 font-mario-text">Practice Tips 💡</h4>
                <div className="space-y-3">
                  {skill.learningSteps.practiceTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-mario-green bg-opacity-10 rounded-lg border-2 border-mario-green">
                      <span className="text-mario-green text-xl">🍄</span>
                      <p className="text-sm text-gray-700 font-mario-text">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* YouTube Videos Section */}
        <Card className="mt-8 border-4 border-mario-red shadow-lg">
          <CardHeader className="bg-mario-red bg-opacity-20 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2 font-mario text-mario-red">
              <Play size={20} />
              Recommended YouTube Videos 📺
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {skill.youtubeVideos.map((video, index) => (
                <div key={index} className="border-2 border-mario-red rounded-lg p-4 hover:shadow-lg transition-shadow bg-white hover:scale-105 duration-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-mario-red text-white rounded-lg p-3 shadow-md">
                      <Play size={20} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800 mb-2 font-mario-text">{video.title}</h5>
                      <p className="text-sm text-gray-600 mb-3 font-mario-text">{video.description}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-mario-red hover:text-mario-dark-red text-sm font-medium font-mario-text transition-colors"
                      >
                        Watch Video
                        <Play size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Articles Section */}
        <Card className="mt-8 border-4 border-mario-purple shadow-lg">
          <CardHeader className="bg-mario-purple bg-opacity-20 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2 font-mario text-mario-purple">
              <FileText size={20} />
              Helpful Articles & Blogs 📚
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {skill.articles.map((article, index) => (
                <div key={index} className="border-2 border-mario-purple rounded-lg p-4 hover:shadow-lg transition-shadow bg-white hover:scale-105 duration-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-mario-purple text-white rounded-lg p-3 shadow-md">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800 mb-2 font-mario-text">{article.title}</h5>
                      <p className="text-sm text-gray-600 mb-3 font-mario-text">{article.description}</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-mario-purple hover:text-purple-700 text-sm font-medium font-mario-text transition-colors"
                      >
                        Read Article
                        <FileText size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Learning Section */}
        <Card className="mt-8 border-4 border-mario-orange shadow-lg">
          <CardHeader className="bg-mario-orange bg-opacity-20 rounded-t-lg">
            <CardTitle className="text-xl font-mario text-mario-orange">Ready to Learn More? 🎮</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-mario-yellow bg-opacity-20 rounded-lg border-2 border-mario-yellow">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-medium text-gray-800 mb-2 font-mario-text">Practice</h4>
                <p className="text-sm text-gray-600 font-mario-text">
                  Try using this skill in your daily life for real experience.
                </p>
              </div>
              <div className="text-center p-4 bg-mario-blue bg-opacity-20 rounded-lg border-2 border-mario-blue">
                <div className="text-3xl mb-2">❓</div>
                <h4 className="font-medium text-gray-800 mb-2 font-mario-text">Ask Questions</h4>
                <p className="text-sm text-gray-600 font-mario-text">
                  Talk to teachers, friends, or family about what you've learned.
                </p>
              </div>
              <div className="text-center p-4 bg-mario-green bg-opacity-20 rounded-lg border-2 border-mario-green">
                <div className="text-3xl mb-2">🌟</div>
                <h4 className="font-medium text-gray-800 mb-2 font-mario-text">Keep Learning</h4>
                <p className="text-sm text-gray-600 font-mario-text">
                  Explore other skills that work well together with this one.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/">
                <Button className={`${colorClasses.button} text-white font-mario-text shadow-lg hover:scale-105 transition-transform duration-200`}>
                  🍄 Explore More Skills 🍄
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
