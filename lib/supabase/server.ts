import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = "https://khyqmssuchivbrufloxs.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeXFtc3N1Y2hpdmJydWZsb3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODk5OTUsImV4cCI6MjA3MDc2NTk5NX0.QIm_dT3XWghpvk6wUOHdG3g0NbOM8n4kI5X2jkEHRLw"

// Check if Supabase is configured
export const isSupabaseConfigured = true

export function createServerClient() {
  const cookieStore = cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookie setting errors in server actions
          console.error("Error setting cookie:", error)
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // Handle cookie removal errors in server actions
          console.error("Error removing cookie:", error)
        }
      },
    },
  })
}

// Legacy export for backward compatibility
export const createClient = createServerClient
