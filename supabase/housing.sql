
-- Create the senior_livings table for storing housing options
CREATE TABLE IF NOT EXISTS senior_livings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  price TEXT,
  image TEXT,
  amenities TEXT[],
  accessibility TEXT[],
  rating NUMERIC(3,2),
  review_count INTEGER DEFAULT 0,
  description TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  contact_website TEXT,
  openings BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS senior_livings_rating_idx ON senior_livings (rating DESC);
CREATE INDEX IF NOT EXISTS senior_livings_location_idx ON senior_livings (location);
CREATE INDEX IF NOT EXISTS senior_livings_type_idx ON senior_livings (type);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_senior_livings_updated_at
BEFORE UPDATE ON senior_livings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE senior_livings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can view senior livings
CREATE POLICY "Anyone can view senior livings"
  ON senior_livings FOR SELECT
  USING (true);

-- Only authenticated users can insert senior livings
CREATE POLICY "Authenticated users can insert senior livings"
  ON senior_livings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update senior livings
CREATE POLICY "Authenticated users can update senior livings"
  ON senior_livings FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete senior livings
CREATE POLICY "Authenticated users can delete senior livings"
  ON senior_livings FOR DELETE
  TO authenticated
  USING (true);
