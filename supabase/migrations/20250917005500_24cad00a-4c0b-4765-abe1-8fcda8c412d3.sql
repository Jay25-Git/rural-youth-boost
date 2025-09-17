-- Create RLS policies for avatar storage (bucket already exists)
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Fix handle_new_user function to use correct metadata field
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, age, gender, user_type)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    CASE WHEN NEW.raw_user_meta_data ->> 'age' IS NOT NULL 
         THEN (NEW.raw_user_meta_data ->> 'age')::integer 
         ELSE NULL END,
    NEW.raw_user_meta_data ->> 'gender',
    NEW.raw_user_meta_data ->> 'user_type'
  );
  RETURN NEW;
END;
$$;

-- Manually create profile for current user if it doesn't exist
INSERT INTO public.profiles (user_id, name, age, gender, user_type)
SELECT '2b12db58-a25f-4bca-9c58-9ef90f31cf33', 'Jay', 19, 'male', 'student'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE user_id = '2b12db58-a25f-4bca-9c58-9ef90f31cf33'
);