"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { enrollInCourse } from "@/lib/course-actions"

interface EnrollmentCardProps {
  course: any
  enrollment: any
  user: any
}

export default function EnrollmentCard({ course, enrollment, user }: EnrollmentCardProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)

  const handleEnroll = async () => {
    if (!user) return

    setIsEnrolling(true)
    try {
      await enrollInCourse(course.id, user.id)
      window.location.reload()
    } catch (error) {
      console.error("Enrollment error:", error)
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <Card className="border-border shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-foreground mb-2">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </div>
          {course.price > 0 && <p className="text-sm text-muted-foreground">One-time payment</p>}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-foreground">Duration</span>
            </div>
            <span className="text-sm font-medium text-foreground">{course.duration_hours} hours</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-foreground">Students</span>
            </div>
            <span className="text-sm font-medium text-foreground">1,200+</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-foreground">Level</span>
            </div>
            <Badge variant="secondary">{course.level}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Play className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-foreground">Access</span>
            </div>
            <span className="text-sm font-medium text-foreground">Lifetime</span>
          </div>
        </div>

        {enrollment && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Enrolled</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-green-700">Progress: {enrollment.progress_percentage}%</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {enrollment ? (
          <Link href={`/learn/${course.id}`} className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
              <Play className="h-4 w-4 mr-2" />
              {enrollment.progress_percentage > 0 ? "Continue Learning" : "Start Course"}
            </Button>
          </Link>
        ) : user ? (
          <Button
            onClick={handleEnroll}
            disabled={isEnrolling}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </Button>
        ) : (
          <Link href="/auth/sign-up" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
              Sign Up to Enroll
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
