import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabaseUrl = "https://khyqmssuchivbrufloxs.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeXFtc3N1Y2hpdmJydWZsb3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODk5OTUsImV4cCI6MjA3MDc2NTk5NX0.QIm_dT3XWghpvk6wUOHdG3g0NbOM8n4kI5X2jkEHRLw"

// Check if Supabase is configured
export const isSupabaseConfigured = true

// Create a singleton instance of the Supabase client for Client Components
export const supabase = createClientComponentClient({
  supabaseUrl,
  supabaseKey: supabaseAnonKey,
})
