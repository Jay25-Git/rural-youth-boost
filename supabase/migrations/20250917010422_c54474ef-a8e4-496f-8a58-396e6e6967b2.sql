-- Add missing columns to stories table for skill category and image URL
ALTER TABLE public.stories 
ADD COLUMN skill TEXT,
ADD COLUMN image_url TEXT;