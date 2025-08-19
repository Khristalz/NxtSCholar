import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

const supabaseUrl = "https://khyqmssuchivbrufloxs.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeXFtc3N1Y2hpdmJydWZsb3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODk5OTUsImV4cCI6MjA3MDc2NTk5NX0.QIm_dT3XWghpvk6wUOHdG3g0NbOM8n4kI5X2jkEHRLw"

export const isSupabaseConfigured = true

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(() => {
  const cookieStore = cookies()

  return createServerComponentClient({
    cookies: () => cookieStore,
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })
})

export const createServerClient = createClient
