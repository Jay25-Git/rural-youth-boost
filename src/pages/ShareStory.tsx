
import React, { useState } from 'react';
import { Camera, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { AuthButton } from '@/components/AuthButton';

const ShareStory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [skill, setSkill] = useState('');
  const [image, setImage] = useState<string>('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !skill || !authorName) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - in a real app, this would save to database
    setTimeout(() => {
      console.log('Story submitted:', { title, content, skill, image, authorName });
      setIsSubmitting(false);
      alert('Your story has been shared successfully! 🎉');
      navigate('/community');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white font-mario-text">
      {/* Header */}
      <div className="bg-mario-red text-white py-8 border-b-8 border-mario-black">
        <div className="absolute top-6 right-6">
          <AuthButton />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-mario-white text-mario-red p-3 rounded-lg shadow-lg border-4 border-mario-black">
              <Camera size={32} />
            </div>
            <h1 className="text-4xl font-mario">Share Your Story</h1>
          </div>
          <p className="text-lg font-mario-text font-bold">
            🌟 Inspire others with your learning journey! 🌟
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-mario-white border-b-4 border-mario-black py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/community" className="text-mario-blue hover:text-mario-red font-mario-text font-bold flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Community
          </Link>
        </div>
      </div>

      {/* Story Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-4 border-mario-black shadow-lg">
          <CardHeader className="bg-mario-yellow border-b-4 border-mario-black">
            <CardTitle className="text-2xl font-mario text-mario-red text-center">
              Tell Your Story! 📖
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Author Name */}
              <div>
                <label className="block text-mario-red font-mario-text font-bold mb-2">
                  Your Name *
                </label>
                <Input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter your name..."
                  className="border-4 border-mario-black font-mario-text"
                  required
                />
              </div>

              {/* Story Title */}
              <div>
                <label className="block text-mario-red font-mario-text font-bold mb-2">
                  Story Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story an inspiring title..."
                  className="border-4 border-mario-black font-mario-text"
                  required
                />
              </div>

              {/* Skill Category */}
              <div>
                <label className="block text-mario-red font-mario-text font-bold mb-2">
                  Skill Category *
                </label>
                <Input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g., Programming, Cooking, Photography..."
                  className="border-4 border-mario-black font-mario-text"
                  required
                />
              </div>

              {/* Story Content */}
              <div>
                <label className="block text-mario-red font-mario-text font-bold mb-2">
                  Your Story *
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your learning journey, challenges you overcame, achievements you're proud of..."
                  className="border-4 border-mario-black font-mario-text min-h-[120px]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-mario-red font-mario-text font-bold mb-2">
                  Add a Photo 📸
                </label>
                <div className="border-4 border-mario-black border-dashed rounded-lg p-8 text-center">
                  {image ? (
                    <div className="space-y-4">
                      <img 
                        src={image} 
                        alt="Preview" 
                        className="max-w-full h-64 object-cover mx-auto rounded-lg border-4 border-mario-black"
                      />
                      <Button
                        type="button"
                        onClick={() => setImage('')}
                        className="bg-mario-red hover:bg-mario-dark-red text-white font-mario-text font-bold"
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera size={48} className="mx-auto text-mario-blue" />
                      <p className="text-mario-blue font-mario-text font-bold">
                        Click to upload an image
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-block bg-mario-blue hover:bg-mario-dark-blue text-white font-mario-text font-bold px-6 py-3 rounded-lg border-4 border-mario-black cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Choose Image
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-mario-green hover:bg-mario-dark-green text-white font-mario-text font-bold text-lg px-8 py-4 border-4 border-mario-black shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    'Sharing Your Story... ⏳'
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Share Your Story! 🚀
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareStory;
