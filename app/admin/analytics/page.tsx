import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminHeader from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, TrendingUp, Award, UserCheck } from "lucide-react"

export default async function AdminAnalyticsPage() {
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

  // Get analytics data
  const { data: totalUsers } = await supabase.from("profiles").select("id", { count: "exact" })
  const { data: totalCourses } = await supabase.from("courses").select("id", { count: "exact" })
  const { data: totalEnrollments } = await supabase.from("enrollments").select("id", { count: "exact" })
  const { data: completedCourses } = await supabase
    .from("enrollments")
    .select("id", { count: "exact" })
    .not("completed_at", "is", null)

  // Get recent enrollments
  const { data: recentEnrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      profiles (full_name),
      courses (title)
    `)
    .order("enrolled_at", { ascending: false })
    .limit(10)

  // Get popular courses
  const { data: popularCourses } = await supabase
    .from("courses")
    .select(`
      *,
      enrollments (id)
    `)
    .eq("is_published", true)
    .limit(5)

  const coursesWithEnrollmentCount = popularCourses
    ?.map((course) => ({
      ...course,
      enrollment_count: course.enrollments?.length || 0,
    }))
    .sort((a, b) => b.enrollment_count - a.enrollment_count)

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Platform insights and performance metrics</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers?.length || 0}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCourses?.length || 0}</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrollments?.length || 0}</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalEnrollments?.length
                    ? Math.round(((completedCourses?.length || 0) / totalEnrollments.length) * 100)
                    : 0}
                  %
                </div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Enrollments */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Recent Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEnrollments && recentEnrollments.length > 0 ? (
                    recentEnrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{enrollment.profiles?.full_name}</p>
                          <p className="text-sm text-muted-foreground">{enrollment.courses?.title}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{new Date(enrollment.enrolled_at).toLocaleDateString()}</Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No recent enrollments</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Popular Courses */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Popular Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coursesWithEnrollmentCount && coursesWithEnrollmentCount.length > 0 ? (
                    coursesWithEnrollmentCount.map((course, index) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">{course.title}</p>
                            <p className="text-sm text-muted-foreground">{course.enrollment_count} students</p>
                          </div>
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No course data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
