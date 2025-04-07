
-- Create the events table for community events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  address TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  image TEXT,
  organizer TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  is_accessible BOOLEAN DEFAULT true,
  accessibility_features TEXT[],
  is_free BOOLEAN DEFAULT true,
  price TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS events_start_date_idx ON events (start_date);
CREATE INDEX IF NOT EXISTS events_location_idx ON events (location);
CREATE INDEX IF NOT EXISTS events_is_accessible_idx ON events (is_accessible);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can view events
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- Only authenticated users can insert events
CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update events
CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete events
CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);
