import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Award } from "lucide-react"

interface CourseInstructorProps {
  instructor: any
}

export default function CourseInstructor({ instructor }: CourseInstructorProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-4">Your Instructor</h3>

        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary">{instructor?.full_name?.charAt(0) || "I"}</span>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-lg">{instructor?.full_name || "Instructor"}</h4>
            <p className="text-muted-foreground mb-4">
              Experienced educator with expertise in practical skills development and career-focused learning.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-sm font-semibold text-foreground">4.9</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">5,200</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-1">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
