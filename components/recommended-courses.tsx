import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

interface RecommendedCoursesProps {
  userId: string
}

export default async function RecommendedCourses({ userId }: RecommendedCoursesProps) {
  const supabase = createClient()

  // Get courses the user is not enrolled in
  const { data: recommendedCourses } = await supabase
    .from("courses")
    .select(`
      *,
      categories (name),
      profiles (full_name)
    `)
    .eq("is_published", true)
    .not(
      "id",
      "in",
      `(
      SELECT course_id FROM enrollments WHERE user_id = '${userId}'
    )`,
    )
    .limit(3)

  if (!recommendedCourses || recommendedCourses.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">Recommended for You</h2>
        <Link href="/courses">
          <Button variant="outline">Browse All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCourses.map((course) => (
          <Card key={course.id} className="border-border hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <Image
                src={course.thumbnail_url || "/placeholder.svg"}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{course.level}</Badge>
              <Badge variant="secondary" className="absolute top-3 right-3">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </Badge>
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

              <p className="text-sm font-medium text-foreground mb-4">
                by {course.profiles?.full_name || "Instructor"}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration_hours} hours
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  1.2k students
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  4.8
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Link href={`/course/${course.id}`} className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90">Enroll Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
