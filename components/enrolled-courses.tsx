import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EnrolledCoursesProps {
  enrollments: any[]
}

export default function EnrolledCourses({ enrollments }: EnrolledCoursesProps) {
  if (enrollments.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-foreground">My Courses</h2>
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No courses enrolled yet</h3>
            <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course</p>
            <Link href="/courses">
              <Button className="bg-primary hover:bg-primary/90">Browse Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">My Courses</h2>
        <Link href="/my-courses">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.slice(0, 6).map((enrollment) => {
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

                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration_hours} hours
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
                    {enrollment.progress_percentage > 0 ? "Continue Learning" : "Start Course"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
