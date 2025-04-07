
-- Create the job_scrapers table for tracking scraping sources and jobs
CREATE TABLE IF NOT EXISTS job_scrapers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  last_run_at TIMESTAMP WITH TIME ZONE,
  last_run_status TEXT,
  last_run_jobs_added INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_job_scrapers_updated_at
BEFORE UPDATE ON job_scrapers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE job_scrapers ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can view job scrapers
CREATE POLICY "Anyone can view job scrapers"
  ON job_scrapers FOR SELECT
  USING (true);

-- Only authenticated users can manage job scrapers
CREATE POLICY "Only authenticated users can manage job scrapers"
  ON job_scrapers FOR ALL
  TO authenticated
  USING (true);
