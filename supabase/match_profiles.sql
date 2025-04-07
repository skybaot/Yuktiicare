
-- Create the match_profiles table for storing matchmaking profiles
CREATE TABLE IF NOT EXISTS match_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  location TEXT,
  about TEXT,
  looking_for TEXT[],
  interests TEXT[],
  photos TEXT[],
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS match_profiles_last_active_idx ON match_profiles (last_active DESC);
CREATE INDEX IF NOT EXISTS match_profiles_location_idx ON match_profiles (location);
CREATE INDEX IF NOT EXISTS match_profiles_gender_idx ON match_profiles (gender);
CREATE INDEX IF NOT EXISTS match_profiles_age_idx ON match_profiles (age);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_match_profiles_updated_at
BEFORE UPDATE ON match_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE match_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can view match profiles
CREATE POLICY "Anyone can view match profiles"
  ON match_profiles FOR SELECT
  USING (true);

-- Users can only insert their own profile
CREATE POLICY "Users can only insert their own profile"
  ON match_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own profile
CREATE POLICY "Users can only update their own profile"
  ON match_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only delete their own profile
CREATE POLICY "Users can only delete their own profile"
  ON match_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
