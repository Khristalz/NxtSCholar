import { createClient } from "@/lib/supabase/server"
import Header from "@/components/header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, Users, Star, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function CoursesPage() {
  const supabase = createClient()

  // Get all published courses
  const { data: courses } = await supabase
    .from("courses")
    .select(`
      *,
      categories (name),
      profiles (full_name)
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  // Get all categories for filtering
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">All Courses</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive collection of courses designed for African learners
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
            <select className="px-4 py-2 border border-border rounded-md bg-background text-foreground">
              <option value="all">All Categories</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Courses Grid */}
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-border hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <Image
                      src={course.thumbnail_url || "/placeholder.svg?height=200&width=300&query=course thumbnail"}
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
                        1.2k
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        4.8
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Link href={`/course/${course.id}`} className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">View Course</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No courses available</h3>
                <p className="text-muted-foreground">Check back soon for new courses!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
