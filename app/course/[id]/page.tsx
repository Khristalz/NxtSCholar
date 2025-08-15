import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import CourseHero from "@/components/course-hero"
import CourseCurriculum from "@/components/course-curriculum"
import CourseInstructor from "@/components/course-instructor"
import EnrollmentCard from "@/components/enrollment-card"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const supabase = createClient()

  // Get course details
  const { data: course, error } = await supabase
    .from("courses")
    .select(`
      *,
      categories (name),
      profiles (full_name, avatar_url)
    `)
    .eq("id", params.id)
    .eq("is_published", true)
    .single()

  if (error || !course) {
    notFound()
  }

  // Get course lessons
  const { data: lessons } = await supabase.from("lessons").select("*").eq("course_id", params.id).order("order_index")

  // Check if user is authenticated and enrolled
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let enrollment = null
  let userProgress = null

  if (user) {
    const { data: enrollmentData } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .eq("course_id", params.id)
      .single()

    enrollment = enrollmentData

    if (enrollment) {
      // Get user's lesson progress
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .in("lesson_id", lessons?.map((lesson) => lesson.id) || [])

      userProgress = progressData?.map((p) => p.lesson_id) || []
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <CourseHero course={course} enrollment={enrollment} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">About This Course</h2>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </div>

              <CourseCurriculum lessons={lessons || []} userProgress={userProgress} isEnrolled={!!enrollment} />
              <CourseInstructor instructor={course.profiles} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <EnrollmentCard course={course} enrollment={enrollment} user={user} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
