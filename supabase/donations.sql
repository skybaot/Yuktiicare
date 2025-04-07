
-- Create the donations table to track donations
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT,
  payment_id TEXT,
  status TEXT DEFAULT 'pending',
  is_anonymous BOOLEAN DEFAULT false,
  donor_name TEXT,
  donor_email TEXT,
  donor_message TEXT,
  donation_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS donations_user_id_idx ON donations (user_id);
CREATE INDEX IF NOT EXISTS donations_donation_date_idx ON donations (donation_date DESC);
CREATE INDEX IF NOT EXISTS donations_status_idx ON donations (status);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anonymous donations are visible to admins only
CREATE POLICY "Admins can view all donations"
  ON donations FOR SELECT
  TO authenticated
  USING (pg_has_role(auth.uid(), 'admin', 'member'));

-- Users can view their own donations
CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own donations
CREATE POLICY "Users can insert their own donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Only admins can update donations
CREATE POLICY "Only admins can update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (pg_has_role(auth.uid(), 'admin', 'member'));

-- Only admins can delete donations
CREATE POLICY "Only admins can delete donations"
  ON donations FOR DELETE
  TO authenticated
  USING (pg_has_role(auth.uid(), 'admin', 'member'));
