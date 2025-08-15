import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallback() {
  const supabase = createClient()

  // The middleware should handle the code exchange, but this is a fallback
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  } else {
    redirect("/auth/login")
  }
}
