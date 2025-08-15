import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Award } from "lucide-react"
import Image from "next/image"

interface CourseHeroProps {
  course: any
  enrollment: any
}

export default function CourseHero({ course, enrollment }: CourseHeroProps) {
  return (
    <section className="bg-gradient-to-br from-muted/30 to-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary">{course.categories?.name}</Badge>
              <h1 className="font-heading text-4xl font-bold text-foreground leading-tight">{course.title}</h1>
              <p className="text-xl text-muted-foreground">{course.description}</p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
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
                4.8 rating
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {course.level}
              </div>
            </div>

            {enrollment && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    You're enrolled! Progress: {enrollment.progress_percentage}%
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Image
              src={course.thumbnail_url || "/placeholder.svg"}
              alt={course.title}
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
