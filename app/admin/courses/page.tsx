import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminHeader from "@/components/admin-header"
import CourseManagement from "@/components/course-management"

export default async function AdminCoursesPage() {
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

  // Get all courses with instructor and category info
  const { data: courses } = await supabase
    .from("courses")
    .select(`
      *,
      categories (name),
      profiles (full_name)
    `)
    .order("created_at", { ascending: false })

  // Get categories for the form
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseManagement courses={courses || []} categories={categories || []} />
      </main>
    </div>
  )
}
