import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Lock, CheckCircle, Clock } from "lucide-react"

interface CourseCurriculumProps {
  lessons: any[]
  userProgress: string[] | null
  isEnrolled: boolean
}

export default function CourseCurriculum({ lessons, userProgress, isEnrolled }: CourseCurriculumProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Course Curriculum</CardTitle>
        <p className="text-muted-foreground">{lessons.length} lessons</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {lessons.map((lesson, index) => {
          const isCompleted = userProgress?.includes(lesson.id)
          const isAccessible = isEnrolled || lesson.is_free
          const isLocked = !isAccessible

          return (
            <div
              key={lesson.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                isLocked
                  ? "bg-muted/30 border-border"
                  : isCompleted
                    ? "bg-green-50 border-green-200"
                    : "bg-background border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isLocked ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Play className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className={`font-medium ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
                    {index + 1}. {lesson.title}
                  </h4>
                  {lesson.description && (
                    <p className={`text-sm ${isLocked ? "text-muted-foreground" : "text-muted-foreground"}`}>
                      {lesson.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {lesson.is_free && <Badge variant="secondary">Free</Badge>}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {lesson.duration_minutes}m
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
