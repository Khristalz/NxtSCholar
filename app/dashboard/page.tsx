import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import EnrolledCourses from "@/components/enrolled-courses"
import LearningStats from "@/components/learning-stats"
import RecommendedCourses from "@/components/recommended-courses"

export default async function DashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get user's enrolled courses with progress
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url,
        duration_hours,
        level,
        categories (name)
      )
    `)
    .eq("user_id", user.id)

  // Get learning statistics
  const { data: completedLessons } = await supabase.from("lesson_progress").select("id").eq("user_id", user.id)

  const { data: totalEnrollments } = await supabase.from("enrollments").select("id").eq("user_id", user.id)

  const stats = {
    totalCourses: totalEnrollments?.length || 0,
    completedLessons: completedLessons?.length || 0,
    totalHours:
      enrollments?.reduce((acc, enrollment) => {
        return acc + (enrollment.courses?.duration_hours || 0)
      }, 0) || 0,
    averageProgress: enrollments?.length
      ? Math.round(
          enrollments.reduce((acc, enrollment) => acc + enrollment.progress_percentage, 0) / enrollments.length,
        )
      : 0,
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <LearningStats stats={stats} />
          <EnrolledCourses enrollments={enrollments || []} />
          <RecommendedCourses userId={user.id} />
        </div>
      </main>
    </div>
  )
}
