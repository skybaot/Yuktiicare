
-- Create the success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_location TEXT,
  author_image TEXT,
  cover_image TEXT,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS success_stories_publish_date_idx ON success_stories (publish_date DESC);
CREATE INDEX IF NOT EXISTS success_stories_is_featured_idx ON success_stories (is_featured);
CREATE INDEX IF NOT EXISTS success_stories_is_approved_idx ON success_stories (is_approved);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_success_stories_updated_at
BEFORE UPDATE ON success_stories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can read approved success stories
CREATE POLICY "Anyone can read approved success stories"
  ON success_stories FOR SELECT
  USING (is_approved = true);

-- Authors can read their own non-approved stories
CREATE POLICY "Authors can read their own non-approved stories"
  ON success_stories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can insert success stories
CREATE POLICY "Authenticated users can insert success stories"
  ON success_stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authors can update their own stories
CREATE POLICY "Authors can update their own stories"
  ON success_stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Authors can delete their own stories
CREATE POLICY "Authors can delete their own stories"
  ON success_stories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can manage all stories
CREATE POLICY "Admins can manage all stories"
  ON success_stories FOR ALL
  TO authenticated
  USING (pg_has_role(auth.uid(), 'admin', 'member'));
