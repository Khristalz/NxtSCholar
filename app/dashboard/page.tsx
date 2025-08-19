import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import EnrolledCourses from "@/components/enrolled-courses"
import LearningStats from "@/components/learning-stats"
import RecommendedCourses from "@/components/recommended-courses"

export default async function DashboardPage() {
  const supabase = createClient()

  try {
    console.log("[v0] Attempting to get user from Supabase...")

    // Check if user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    console.log("[v0] User fetch result:", { user: user?.id, error: userError })

    if (userError) {
      console.error("[v0] Error fetching user:", userError)
      redirect("/auth/login")
    }

    if (!user) {
      console.log("[v0] No user found, redirecting to login")
      redirect("/auth/login")
    }

    console.log("[v0] User authenticated, fetching profile and data...")

    let profile = null
    let enrollments = null
    let completedLessons = null
    let totalEnrollments = null

    try {
      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("[v0] Profile fetch error:", profileError)
      } else {
        profile = profileData
        console.log("[v0] Profile fetched successfully")
      }
    } catch (error) {
      console.error("[v0] Profile fetch failed:", error)
    }

    try {
      // Get user's enrolled courses with progress
      const { data: enrollmentData, error: enrollmentError } = await supabase
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

      if (enrollmentError) {
        console.error("[v0] Enrollments fetch error:", enrollmentError)
      } else {
        enrollments = enrollmentData
        console.log("[v0] Enrollments fetched:", enrollmentData?.length || 0)
      }
    } catch (error) {
      console.error("[v0] Enrollments fetch failed:", error)
    }

    try {
      // Get learning statistics
      const { data: lessonsData, error: lessonsError } = await supabase
        .from("lesson_progress")
        .select("id")
        .eq("user_id", user.id)

      if (lessonsError) {
        console.error("[v0] Lessons progress fetch error:", lessonsError)
      } else {
        completedLessons = lessonsData
        console.log("[v0] Completed lessons fetched:", lessonsData?.length || 0)
      }
    } catch (error) {
      console.error("[v0] Lessons progress fetch failed:", error)
    }

    try {
      const { data: totalEnrollmentData, error: totalError } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)

      if (totalError) {
        console.error("[v0] Total enrollments fetch error:", totalError)
      } else {
        totalEnrollments = totalEnrollmentData
        console.log("[v0] Total enrollments fetched:", totalEnrollmentData?.length || 0)
      }
    } catch (error) {
      console.error("[v0] Total enrollments fetch failed:", error)
    }

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

    console.log("[v0] Dashboard stats calculated:", stats)

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
  } catch (error) {
    console.error("[v0] Dashboard page error:", error)

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Connection Error</h1>
          <p className="text-muted-foreground">
            Unable to connect to the database. Please check your connection and try again.
          </p>
          <a
            href="/auth/login"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Return to Login
          </a>
        </div>
      </div>
    )
  }
}
