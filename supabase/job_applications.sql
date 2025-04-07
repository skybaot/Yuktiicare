
-- Create the job_applications table for tracking user applications
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS job_applications_user_id_idx ON job_applications (user_id);
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications (job_id);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications (status);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON job_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only view their own applications
CREATE POLICY "Users can only view their own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only insert their own applications
CREATE POLICY "Users can only insert their own applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own applications
CREATE POLICY "Users can only update their own applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only delete their own applications
CREATE POLICY "Users can only delete their own applications"
  ON job_applications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
