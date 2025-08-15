import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import LearningInterface from "@/components/learning-interface"

interface LearnPageProps {
  params: {
    id: string
  }
  searchParams: {
    lesson?: string
  }
}

export default async function LearnPage({ params, searchParams }: LearnPageProps) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is enrolled in the course
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", params.id)
    .single()

  if (!enrollment) {
    redirect(`/course/${params.id}`)
  }

  // Get course details
  const { data: course } = await supabase
    .from("courses")
    .select(`
      *,
      categories (name),
      profiles (full_name)
    `)
    .eq("id", params.id)
    .single()

  if (!course) {
    notFound()
  }

  // Get course lessons
  const { data: lessons } = await supabase.from("lessons").select("*").eq("course_id", params.id).order("order_index")

  // Get user's lesson progress
  const { data: userProgress } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .in("lesson_id", lessons?.map((lesson) => lesson.id) || [])

  const completedLessons = userProgress?.map((p) => p.lesson_id) || []

  // Determine current lesson
  const currentLessonId = searchParams.lesson || lessons?.[0]?.id
  const currentLesson = lessons?.find((lesson) => lesson.id === currentLessonId)

  if (!currentLesson) {
    notFound()
  }

  return (
    <LearningInterface
      course={course}
      lessons={lessons || []}
      currentLesson={currentLesson}
      completedLessons={completedLessons}
      enrollment={enrollment}
      user={user}
    />
  )
}
