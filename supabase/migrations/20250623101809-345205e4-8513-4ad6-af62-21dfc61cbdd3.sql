
-- Add columns to profiles table for user type and role
ALTER TABLE public.profiles 
ADD COLUMN user_type TEXT CHECK (user_type IN ('student', 'mentor')),
ADD COLUMN user_role TEXT CHECK (user_role IN ('learner', 'teacher'));

-- Update the handle_new_user function to include the new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, age, gender, user_type, user_role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    (new.raw_user_meta_data->>'age')::integer,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'user_type',
    new.raw_user_meta_data->>'user_role'
  );
  RETURN new;
END;
$$;
