"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCourse(formData: FormData) {
  const supabase = createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const courseData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category_id: formData.get("category_id") as string,
    duration_hours: Number.parseInt(formData.get("duration_hours") as string),
    level: formData.get("level") as string,
    price: Number.parseFloat(formData.get("price") as string) || 0,
    is_featured: formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "on",
    instructor_id: user.id,
  }

  const { error } = await supabase.from("courses").insert([courseData])

  if (error) {
    throw new Error("Failed to create course")
  }

  revalidatePath("/admin/courses")
}

export async function toggleCoursePublished(courseId: string, isPublished: boolean) {
  const supabase = createClient()

  const { error } = await supabase.from("courses").update({ is_published: !isPublished }).eq("id", courseId)

  if (error) {
    throw new Error("Failed to update course")
  }

  revalidatePath("/admin/courses")
}

export async function deleteCourse(courseId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("courses").delete().eq("id", courseId)

  if (error) {
    throw new Error("Failed to delete course")
  }

  revalidatePath("/admin/courses")
}
