"use server"

import { createServerClient } from "./supabase/server"
import { redirect } from "next/navigation"

// Sign in action
export async function signIn(prevState: any, formData: FormData) {
  console.log("[v0] Sign in attempt started")

  // Check if formData is valid
  if (!formData) {
    console.log("[v0] Form data is missing")
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  console.log("[v0] Email:", email ? "provided" : "missing")
  console.log("[v0] Password:", password ? "provided" : "missing")

  // Validate required fields
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createServerClient()

  try {
    console.log("[v0] Attempting Supabase sign in")
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      console.log("[v0] Supabase auth error:", error.message)
      return { error: error.message }
    }

    console.log("[v0] Sign in successful, user:", data.user?.email)
    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign up action
export async function signUp(prevState: any, formData: FormData) {
  console.log("[v0] Sign up attempt started")

  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  // Validate required fields
  if (!email || !password || !fullName) {
    return { error: "All fields are required" }
  }

  const supabase = createServerClient()

  try {
    console.log("[v0] Attempting Supabase sign up")
    const { data, error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || "http://localhost:3000/dashboard",
        data: {
          full_name: fullName.toString(),
        },
      },
    })

    if (error) {
      console.log("[v0] Supabase signup error:", error.message)
      return { error: error.message }
    }

    // Create profile in our custom table
    if (data.user) {
      console.log("[v0] Creating user profile")
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          email: email.toString(),
          full_name: fullName.toString(),
          role: "student",
        },
      ])

      if (profileError) {
        console.error("[v0] Profile creation error:", profileError)
        return { error: "Account created but profile setup failed. Please contact support." }
      }
    }

    console.log("[v0] Sign up successful")
    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("[v0] Unexpected signup error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign out action
export async function signOut() {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  redirect("/")
}
