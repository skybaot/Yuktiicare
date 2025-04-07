
-- Create the event_attendees table to track event registrations
CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'registered',
  accommodation_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS event_attendees_event_id_idx ON event_attendees (event_id);
CREATE INDEX IF NOT EXISTS event_attendees_user_id_idx ON event_attendees (user_id);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_event_attendees_updated_at
BEFORE UPDATE ON event_attendees
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only view their own registrations
CREATE POLICY "Users can only view their own registrations"
  ON event_attendees FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Event organizers can view all registrations for their events
CREATE POLICY "Event organizers can view all registrations"
  ON event_attendees FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM events
    WHERE events.id = event_id AND events.organizer = auth.uid()::text
  ));

-- Users can only register themselves
CREATE POLICY "Users can only register themselves"
  ON event_attendees FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own registrations
CREATE POLICY "Users can only update their own registrations"
  ON event_attendees FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only cancel their own registrations
CREATE POLICY "Users can only cancel their own registrations"
  ON event_attendees FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
