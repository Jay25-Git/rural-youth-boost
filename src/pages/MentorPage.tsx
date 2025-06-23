
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Award, MessageSquare, Heart, ExternalLink, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const MentorPage = () => {
  const { t } = useLanguage();

  const mentors = [
    {
      name: "Dr. Priya Sharma",
      designation: "Senior Trainer & Innovation Coach",
      institution: "NxtWave",
      expertise: "Educational Technology, Rural Development, Gamification",
      image: "/placeholder.svg",
      linkedin: "#",
      email: "priya.sharma@nxtwave.com",
      insight: "The SkillSync+ team brought together creativity and purpose in a unique way. Their use of gamification to solve real-world skill gaps among rural youth is inspiring. Proud to mentor such a driven team."
    },
    {
      name: "Rajesh Kumar",
      designation: "Hackathon Judge & Industry Expert",
      institution: "Tech Innovators Hub",
      expertise: "Web Development, UI/UX Design, Product Strategy",
      image: "/placeholder.svg",
      linkedin: "#",
      email: "rajesh.kumar@techinnovators.com",
      insight: "What impressed me most about SkillSync+ was their deep understanding of user needs. They didn't just build a platform; they created an experience that truly resonates with their target audience."
    }
  ];

  const mentorshipAreas = [
    {
      icon: <MessageSquare className="text-mario-yellow" size={24} />,
      title: "Ideation & Feasibility",
      description: "Guidance on concept development and technical feasibility assessment"
    },
    {
      icon: <Users className="text-mario-yellow" size={24} />,
      title: "UI/UX & User Journey",
      description: "Feedback on user interface design and overall user experience flow"
    },
    {
      icon: <Award className="text-mario-yellow" size={24} />,
      title: "Pitch & Presentation",
      description: "Support with presentation skills and final deployment strategies"
    },
    {
      icon: <Heart className="text-mario-yellow" size={24} />,
      title: "Tech Stack & Best Practices",
      description: "Mentorship on technology choices and development best practices"
    }
  ];

  const teamTestimonials = [
    "Our mentor helped us fine-tune our gamification logic and make it more engaging for rural users.",
    "We gained clarity on how to simplify the platform for rural users without losing core functionality.",
    "The real-world examples and continuous feedback made a big difference in our approach.",
    "Having industry experts guide us gave us confidence in our technical decisions."
  ];

  return (
    <div className="min-h-screen bg-mario-blue">
      {/* Header */}
      <div className="bg-mario-red text-white py-6 border-b-8 border-mario-black">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/home" className="inline-flex items-center gap-2 text-mario-white hover:text-mario-yellow transition-colors mb-4">
            <ArrowLeft size={20} />
            <span className="font-mario-text font-bold">Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-mario text-shadow-lg mb-2">🧠 SkillSync+ Mentors 🧠</h1>
            <p className="text-xl font-mario-text font-bold">Meet the Amazing Mentors Who Guided Our Adventure!</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Mentor Details Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-mario text-mario-red text-center mb-8">🎓 Our Incredible Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentors.map((mentor, index) => (
              <Card key={index} className="bg-mario-white border-4 border-mario-black shadow-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="w-24 h-24 rounded-full border-4 border-mario-yellow shadow-lg mx-auto"
                    />
                  </div>
                  <CardTitle className="text-2xl font-mario text-mario-red">{mentor.name}</CardTitle>
                  <p className="text-mario-blue font-mario-text font-bold">{mentor.designation}</p>
                  <p className="text-mario-blue font-mario-text">{mentor.institution}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-mario text-mario-red mb-2">Expertise:</h4>
                      <p className="font-mario-text font-bold text-mario-blue text-sm">{mentor.expertise}</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-mario-blue text-mario-blue hover:bg-mario-blue hover:text-white"
                      >
                        <Linkedin size={16} className="mr-1" />
                        LinkedIn
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-mario-green text-mario-green hover:bg-mario-green hover:text-white"
                      >
                        <Mail size={16} className="mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mentor Insights Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-mario text-mario-red text-center mb-8">💬 Words from Our Mentors</h2>
          <div className="space-y-6">
            {mentors.map((mentor, index) => (
              <Card key={index} className="bg-mario-yellow border-4 border-mario-black shadow-xl">
                <CardContent className="p-6">
                  <blockquote className="text-lg font-mario-text font-bold text-mario-red italic mb-4">
                    "{mentor.insight}"
                  </blockquote>
                  <footer className="text-mario-blue font-mario text-right">
                    — {mentor.name}
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Role of Mentors Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-mario text-mario-red text-center mb-8">👨‍🏫 How Our Mentors Supported Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorshipAreas.map((area, index) => (
              <Card key={index} className="bg-mario-white border-4 border-mario-black shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {area.icon}
                    <h3 className="text-xl font-mario text-mario-blue">{area.title}</h3>
                  </div>
                  <p className="font-mario-text font-bold text-mario-blue text-sm">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Testimonials Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-mario text-mario-red text-center mb-8">🛠️ How Mentorship Helped Us</h2>
          <Card className="bg-mario-green text-white border-4 border-mario-black shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamTestimonials.map((testimonial, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-mario-yellow text-mario-red w-8 h-8 rounded-full flex items-center justify-center font-mario font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="font-mario-text font-bold text-sm italic">"{testimonial}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visuals Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-mario text-mario-red text-center mb-8">📸 Mentorship Moments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
              <CardContent className="p-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Mentor Team Interaction"
                  className="w-full h-48 object-cover rounded-lg border-2 border-mario-yellow mb-3"
                />
                <p className="font-mario-text font-bold text-mario-blue text-sm text-center">
                  Mentor & Team Interaction Session
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
              <CardContent className="p-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Live Feedback Session"
                  className="w-full h-48 object-cover rounded-lg border-2 border-mario-yellow mb-3"
                />
                <p className="font-mario-text font-bold text-mario-blue text-sm text-center">
                  Live Feedback & Code Review
                </p>
              </CardContent>
            </Card>

            <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
              <CardContent className="p-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Presentation Practice"
                  className="w-full h-48 object-cover rounded-lg border-2 border-mario-yellow mb-3"
                />
                <p className="font-mario-text font-bold text-mario-blue text-sm text-center">
                  Final Presentation Practice
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Optional Add-ons Section */}
        <div className="text-center">
          <h2 className="text-3xl font-mario text-mario-red mb-8">✨ Recognition & Connect</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Card className="bg-mario-yellow border-4 border-mario-black shadow-xl p-6">
              <div className="flex items-center gap-3">
                <Award size={32} className="text-mario-red" />
                <div>
                  <h3 className="font-mario text-mario-red">Mentorship Certificate</h3>
                  <p className="font-mario-text font-bold text-mario-blue text-sm">Recognized Excellence in Guidance</p>
                </div>
              </div>
            </Card>
            
            <Button className="bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold border-4 border-mario-black shadow-lg">
              <ExternalLink size={20} className="mr-2" />
              Connect with Our Mentors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
