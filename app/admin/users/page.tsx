import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminHeader from "@/components/admin-header"
import UserManagement from "@/components/user-management"

export default async function AdminUsersPage() {
  const supabase = createClient()

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  // Get all users with enrollment counts
  const { data: users } = await supabase
    .from("profiles")
    .select(`
      *,
      enrollments (id)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserManagement users={users || []} />
      </main>
    </div>
  )
}
