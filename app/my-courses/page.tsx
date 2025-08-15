import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function MyCoursesPage() {
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

  // Get all user's enrolled courses with progress
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
    .order("enrolled_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">My Courses</h1>
            <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
          </div>

          {enrollments && enrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => {
                const course = enrollment.courses
                return (
                  <Card key={enrollment.id} className="border-border hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <Image
                        src={course.thumbnail_url || "/placeholder.svg"}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{course.level}</Badge>
                      {enrollment.completed_at && (
                        <Badge className="absolute top-3 right-3 bg-green-600 text-white">Completed</Badge>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.categories?.name}
                        </Badge>
                      </div>

                      <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration_hours} hours
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{enrollment.progress_percentage}%</span>
                        </div>
                        <Progress value={enrollment.progress_percentage} className="h-2" />
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Link href={`/course/${course.id}`} className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          {enrollment.progress_percentage === 100
                            ? "Review Course"
                            : enrollment.progress_percentage > 0
                              ? "Continue Learning"
                              : "Start Course"}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No courses enrolled yet</h3>
                <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course</p>
                <Link href="/courses">
                  <Button className="bg-primary hover:bg-primary/90">Browse Courses</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
