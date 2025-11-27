-- Create user_data table to store user progress and data
CREATE TABLE IF NOT EXISTS user_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  name TEXT,
  streak_start TIMESTAMPTZ,
  last_check_in TIMESTAMPTZ,
  relapse_date TIMESTAMPTZ,
  urge_history JSONB DEFAULT '[]'::jsonb,
  quiz_answers JSONB DEFAULT '{}'::jsonb,
  plan_progress TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_onboarded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only read their own data
CREATE POLICY "Users can view own data"
  ON user_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own data
CREATE POLICY "Users can insert own data"
  ON user_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON user_data
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own data
CREATE POLICY "Users can delete own data"
  ON user_data
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_data_updated_at
  BEFORE UPDATE ON user_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

