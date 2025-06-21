
-- Create a table for community stories
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  skill TEXT NOT NULL,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for story replies
CREATE TABLE public.story_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for story likes
CREATE TABLE public.story_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(story_id, user_id)
);

-- Add Row Level Security (RLS) for stories
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read stories (public community)
CREATE POLICY "Anyone can view stories" 
  ON public.stories 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to create stories
CREATE POLICY "Authenticated users can create stories" 
  ON public.stories 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own stories
CREATE POLICY "Users can update their own stories" 
  ON public.stories 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own stories
CREATE POLICY "Users can delete their own stories" 
  ON public.stories 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS for story replies
ALTER TABLE public.story_replies ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read replies
CREATE POLICY "Anyone can view replies" 
  ON public.story_replies 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to create replies
CREATE POLICY "Authenticated users can create replies" 
  ON public.story_replies 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to update their own replies
CREATE POLICY "Users can update their own replies" 
  ON public.story_replies 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to delete their own replies
CREATE POLICY "Users can delete their own replies" 
  ON public.story_replies 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add RLS for story likes
ALTER TABLE public.story_likes ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read likes
CREATE POLICY "Anyone can view likes" 
  ON public.story_likes 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to manage their likes
CREATE POLICY "Authenticated users can manage their likes" 
  ON public.story_likes 
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
