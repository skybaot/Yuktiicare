
-- Create the jobs table for storing scraped job listings
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  salary TEXT,
  posted_date TIMESTAMP WITH TIME ZONE,
  logo TEXT,
  description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  accessibility TEXT[],
  featured BOOLEAN DEFAULT false,
  application_url TEXT,
  source_name TEXT,
  source_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS jobs_posted_date_idx ON jobs (posted_date DESC);
CREATE INDEX IF NOT EXISTS jobs_company_idx ON jobs (company);
CREATE INDEX IF NOT EXISTS jobs_location_idx ON jobs (location);
CREATE INDEX IF NOT EXISTS jobs_type_idx ON jobs (type);

-- Add a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add a trigger to call the function before update
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can view jobs
CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  USING (true);

-- Only authenticated users can insert jobs
CREATE POLICY "Authenticated users can insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update jobs
CREATE POLICY "Authenticated users can update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete jobs
CREATE POLICY "Authenticated users can delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (true);
