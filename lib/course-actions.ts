"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function enrollInCourse(courseId: string, userId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("enrollments").insert([
    {
      user_id: userId,
      course_id: courseId,
      progress_percentage: 0,
    },
  ])

  if (error) {
    throw new Error("Failed to enroll in course")
  }

  revalidatePath(`/course/${courseId}`)
}

export async function updateLessonProgress(lessonId: string, userId: string, watchTimeSeconds = 0) {
  const supabase = createClient()

  const { error } = await supabase
    .from("lesson_progress")
    .upsert([
      {
        user_id: userId,
        lesson_id: lessonId,
        watch_time_seconds: watchTimeSeconds,
      },
    ])
    .select()

  if (error) {
    throw new Error("Failed to update lesson progress")
  }

  // Update course progress
  await updateCourseProgress(userId, lessonId)
}

async function updateCourseProgress(userId: string, lessonId: string) {
  const supabase = createClient()

  // Get the course ID from the lesson
  const { data: lesson } = await supabase.from("lessons").select("course_id").eq("id", lessonId).single()

  if (!lesson) return

  // Get total lessons in the course
  const { data: totalLessons } = await supabase.from("lessons").select("id").eq("course_id", lesson.course_id)

  // Get completed lessons for this user in this course
  const { data: completedLessons } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .in("lesson_id", totalLessons?.map((l) => l.id) || [])

  if (totalLessons && completedLessons) {
    const progressPercentage = Math.round((completedLessons.length / totalLessons.length) * 100)

    // Update enrollment progress
    await supabase
      .from("enrollments")
      .update({
        progress_percentage: progressPercentage,
        completed_at: progressPercentage === 100 ? new Date().toISOString() : null,
      })
      .eq("user_id", userId)
      .eq("course_id", lesson.course_id)
  }
}
