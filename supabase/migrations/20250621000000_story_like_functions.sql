
-- Function to increment story likes
CREATE OR REPLACE FUNCTION increment_story_likes(story_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.stories 
  SET likes = likes + 1 
  WHERE id = story_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement story likes
CREATE OR REPLACE FUNCTION decrement_story_likes(story_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.stories 
  SET likes = GREATEST(likes - 1, 0)
  WHERE id = story_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
