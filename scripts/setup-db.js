// Create user_profiles table in Supabase
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbGJxb3JucHB5dWZlaGdzd3V6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg5OTI3MiwiZXhwIjoyMDkwNDc1MjcyfQ.gbhZ7uAvYnt7TGKc6AH6tlMXSl1DqcwkJ76XQRGuBJA';
const DB_URL = 'https://cmlbqornppyufehgswuz.supabase.co';

async function run() {
  // Use the Supabase Management API to run SQL
  const token = 'sbp_f587baac786503495aebb879c2e954d10bf7d43b';
  const projectRef = 'cmlbqornppyufehgswuz';
  
  const sql = `
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      cefr_level TEXT DEFAULT 'A1',
      goals TEXT,
      streak INT DEFAULT 0,
      total_sessions INT DEFAULT 0,
      total_phrases INT DEFAULT 0,
      last_session JSONB,
      sessions JSONB DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

    DO $$ BEGIN
      CREATE POLICY "Users can read own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `;

  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  console.log('Status:', res.status);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

run().catch(console.error);
