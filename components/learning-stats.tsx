import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"

interface LearningStatsProps {
  stats: {
    totalCourses: number
    completedLessons: number
    totalHours: number
    averageProgress: number
  }
}

export default function LearningStats({ stats }: LearningStatsProps) {
  const statItems = [
    {
      label: "Enrolled Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Completed Lessons",
      value: stats.completedLessons,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Learning Hours",
      value: stats.totalHours,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Average Progress",
      value: `${stats.averageProgress}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-foreground">Your Learning Journey</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Card key={item.label} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{item.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${item.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
