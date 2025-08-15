import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react"

interface AdminStatsProps {
  stats: {
    totalUsers: number
    totalCourses: number
    publishedCourses: number
    totalEnrollments: number
  }
}

export default function AdminStats({ stats }: AdminStatsProps) {
  const statItems = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
    },
    {
      label: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
    },
    {
      label: "Published Courses",
      value: stats.publishedCourses,
      icon: GraduationCap,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+5%",
    },
    {
      label: "Total Enrollments",
      value: stats.totalEnrollments,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+23%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => {
        const IconComponent = item.icon
        return (
          <Card key={item.label} className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{item.value.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">{item.change} from last month</p>
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
  )
}
