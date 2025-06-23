
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, BookOpen, Users, Star, Plus, Edit, Trash2, Play, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';

const MentorPage = () => {
  const { t } = useLanguage();
  const { profile } = useProfile();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [contentType, setContentType] = useState<'course' | 'tutorial' | 'challenge'>('course');

  // Mock data for mentor's content
  const [mentorContent, setMentorContent] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      type: "course",
      students: 45,
      rating: 4.8,
      status: "published"
    },
    {
      id: 2,
      title: "React Hooks Tutorial",
      type: "tutorial",
      students: 23,
      rating: 4.9,
      status: "published"
    },
    {
      id: 3,
      title: "Build a Todo App",
      type: "challenge",
      students: 67,
      rating: 4.7,
      status: "draft"
    }
  ]);

  const stats = {
    totalStudents: mentorContent.reduce((sum, content) => sum + content.students, 0),
    totalCourses: mentorContent.filter(c => c.type === 'course').length,
    avgRating: 4.8,
    totalEarnings: 2340
  };

  return (
    <div className="min-h-screen bg-mario-blue">
      {/* Header */}
      <div className="bg-mario-red text-white py-6 border-b-8 border-mario-black">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/home" className="inline-flex items-center gap-2 text-mario-white hover:text-mario-yellow transition-colors mb-4">
            <ArrowLeft size={20} />
            <span className="font-mario-text font-bold">Back to Home</span>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-mario text-shadow-lg mb-2">🎓 Mentor Dashboard 🎓</h1>
              <p className="text-xl font-mario-text font-bold">Welcome back, {profile?.name || 'Mentor'}!</p>
            </div>
            <Button
              onClick={() => setShowUploadForm(true)}
              className="bg-mario-yellow hover:bg-mario-orange text-mario-red font-mario-text font-bold border-4 border-mario-black shadow-lg"
            >
              <Plus size={20} className="mr-2" />
              Create Content
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
            <CardContent className="p-6 text-center">
              <Users size={32} className="text-mario-blue mx-auto mb-2" />
              <div className="text-2xl font-mario text-mario-red">{stats.totalStudents}</div>
              <div className="font-mario-text font-bold text-mario-blue">Total Students</div>
            </CardContent>
          </Card>

          <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
            <CardContent className="p-6 text-center">
              <BookOpen size={32} className="text-mario-green mx-auto mb-2" />
              <div className="text-2xl font-mario text-mario-red">{stats.totalCourses}</div>
              <div className="font-mario-text font-bold text-mario-blue">Courses Created</div>
            </CardContent>
          </Card>

          <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
            <CardContent className="p-6 text-center">
              <Star size={32} className="text-mario-yellow mx-auto mb-2" />
              <div className="text-2xl font-mario text-mario-red">{stats.avgRating}</div>
              <div className="font-mario-text font-bold text-mario-blue">Avg Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-mario-white border-4 border-mario-black shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-mario-yellow text-2xl mx-auto mb-2">🪙</div>
              <div className="text-2xl font-mario text-mario-red">{stats.totalEarnings}</div>
              <div className="font-mario-text font-bold text-mario-blue">Star Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="bg-mario-white border-4 border-mario-black shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader className="bg-mario-yellow border-b-4 border-mario-black">
                <CardTitle className="text-2xl font-mario text-mario-red flex items-center gap-2">
                  <Upload size={24} />
                  Create New Content
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Content Type Selection */}
                <div className="space-y-2">
                  <Label className="font-mario-text font-bold text-mario-red">Content Type</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['course', 'tutorial', 'challenge'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setContentType(type as any)}
                        className={`p-3 border-4 rounded-lg font-mario-text font-bold transition-all duration-300 ${
                          contentType === type
                            ? 'border-mario-green bg-mario-green text-white shadow-lg'
                            : 'border-mario-black bg-white text-mario-black hover:border-mario-green'
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-mario-text font-bold text-mario-red">Title</Label>
                  <Input
                    placeholder="Enter content title"
                    className="border-4 border-mario-black font-mario-text font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-mario-text font-bold text-mario-red">Description</Label>
                  <Textarea
                    placeholder="Describe your content"
                    className="border-4 border-mario-black font-mario-text font-bold"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-mario-text font-bold text-mario-red">Skill Category</Label>
                  <select className="w-full border-4 border-mario-black rounded-lg p-2 font-mario-text font-bold">
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>Business</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="font-mario-text font-bold text-mario-red">Upload Materials</Label>
                  <div className="border-4 border-dashed border-mario-black rounded-lg p-6 text-center bg-mario-yellow bg-opacity-20">
                    <Upload size={32} className="text-mario-blue mx-auto mb-2" />
                    <p className="font-mario-text font-bold text-mario-blue">
                      Drop files here or click to upload
                    </p>
                    <p className="text-sm font-mario-text text-mario-blue">
                      Videos, PDFs, Images, Code files
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowUploadForm(false)}
                    variant="outline"
                    className="flex-1 border-4 border-mario-black font-mario-text font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-mario-green hover:bg-mario-dark-green text-white font-mario-text font-bold border-4 border-mario-black shadow-lg"
                  >
                    Create Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Management */}
        <div className="space-y-6">
          <h2 className="text-3xl font-mario text-mario-red">📚 Your Content</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {mentorContent.map((content) => (
              <Card key={content.id} className="bg-mario-white border-4 border-mario-black shadow-xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-mario text-mario-red">{content.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-mario-text font-bold border-2 ${
                          content.type === 'course' ? 'bg-mario-blue text-white border-mario-blue' :
                          content.type === 'tutorial' ? 'bg-mario-green text-white border-mario-green' :
                          'bg-mario-yellow text-mario-red border-mario-yellow'
                        }`}>
                          {content.type.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-mario-text font-bold border-2 ${
                          content.status === 'published' ? 'bg-mario-green text-white border-mario-green' :
                          'bg-mario-orange text-white border-mario-orange'
                        }`}>
                          {content.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm font-mario-text font-bold text-mario-blue">
                        <span className="flex items-center gap-1">
                          <Users size={16} />
                          {content.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={16} className="text-mario-yellow" />
                          {content.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-mario-blue text-mario-blue hover:bg-mario-blue hover:text-white">
                        <Play size={16} className="mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="border-mario-green text-mario-green hover:bg-mario-green hover:text-white">
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-mario-red text-mario-red hover:bg-mario-red hover:text-white">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
