-- Create profile for existing user if it doesn't exist
INSERT INTO public.profiles (user_id, name, age, gender, user_type)
SELECT 
  '2b12db58-a25f-4bca-9c58-9ef90f31cf33',
  'Jay',
  19,
  'male',
  'student'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE user_id = '2b12db58-a25f-4bca-9c58-9ef90f31cf33'
);