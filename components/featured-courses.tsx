import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import Image from "next/image"

const featuredCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, and JavaScript to build modern websites. Perfect for beginners starting their tech journey.",
    thumbnail: "/web-development-coding-laptop.png",
    instructor: "Dr. Amara Banda",
    duration: "40 hours",
    students: 1250,
    rating: 4.8,
    price: "Free",
    level: "Beginner",
    category: "Technology & IT",
  },
  {
    id: 2,
    title: "Small Business Management",
    description:
      "Essential skills for managing and growing a small business in Africa. Covers finance, marketing, and operations.",
    thumbnail: "/african-business-meeting.png",
    instructor: "Dr. Amara Banda",
    duration: "25 hours",
    students: 890,
    rating: 4.9,
    price: "Free",
    level: "Intermediate",
    category: "Business",
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    description: "Master social media marketing, content creation, and online advertising to grow your business.",
    thumbnail: "/digital-marketing-social-media-phone.png",
    instructor: "Dr. Amara Banda",
    duration: "30 hours",
    students: 2100,
    rating: 4.7,
    price: "Free",
    level: "Beginner",
    category: "Business",
  },
  {
    id: 4,
    title: "Traditional African Art & Crafts",
    description: "Explore the rich heritage of African art and learn traditional crafting techniques.",
    thumbnail: "/african-pottery-crafts.png",
    instructor: "Dr. Amara Banda",
    duration: "20 hours",
    students: 650,
    rating: 4.9,
    price: "Free",
    level: "Beginner",
    category: "Arts & Culture",
  },
]

export default function FeaturedCourses() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Featured Courses</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners and take the next step in your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border hover:border-primary/20"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{course.level}</Badge>
                <Badge variant="secondary" className="absolute top-3 right-3">
                  {course.price}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{course.description}</p>
                <p className="text-sm font-medium text-foreground mb-4">by {course.instructor}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-primary hover:bg-primary/90">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
