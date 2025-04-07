
-- Create the user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  job_alerts BOOLEAN DEFAULT true,
  event_reminders BOOLEAN DEFAULT true,
  matchmaking_suggestions BOOLEAN DEFAULT true,
  newsletter_subscription BOOLEAN DEFAULT true,
  accessibility_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Add a trigger to update the updated_at column
CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON user_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only view their own settings
CREATE POLICY "Users can only view their own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only insert their own settings
CREATE POLICY "Users can only insert their own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own settings
CREATE POLICY "Users can only update their own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only delete their own settings
CREATE POLICY "Users can only delete their own settings"
  ON user_settings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
