import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminHeader from "@/components/admin-header"
import AdminStats from "@/components/admin-stats"
import RecentActivity from "@/components/recent-activity"
import QuickActions from "@/components/quick-actions"

export default async function AdminDashboard() {
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

  // Get platform statistics
  const [{ data: totalUsers }, { data: totalCourses }, { data: totalEnrollments }, { data: publishedCourses }] =
    await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("courses").select("id", { count: "exact" }),
      supabase.from("enrollments").select("id", { count: "exact" }),
      supabase.from("courses").select("id", { count: "exact" }).eq("is_published", true),
    ])

  const stats = {
    totalUsers: totalUsers?.length || 0,
    totalCourses: totalCourses?.length || 0,
    publishedCourses: publishedCourses?.length || 0,
    totalEnrollments: totalEnrollments?.length || 0,
  }

  // Get recent enrollments
  const { data: recentEnrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      profiles (full_name, email),
      courses (title)
    `)
    .order("enrolled_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your e-learning platform</p>
          </div>

          <AdminStats stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentActivity enrollments={recentEnrollments || []} />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
