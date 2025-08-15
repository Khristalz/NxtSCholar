import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Briefcase, Heart, Palette } from "lucide-react"

const categories = [
  {
    name: "Technology & IT",
    description: "Learn programming, web development, and digital skills",
    icon: Laptop,
    courseCount: 25,
  },
  {
    name: "Business & Entrepreneurship",
    description: "Develop business skills and entrepreneurial mindset",
    icon: Briefcase,
    courseCount: 18,
  },
  {
    name: "Health & Wellness",
    description: "Courses on health, nutrition, and personal wellness",
    icon: Heart,
    courseCount: 12,
  },
  {
    name: "Arts & Culture",
    description: "Explore creative arts and African cultural heritage",
    icon: Palette,
    courseCount: 15,
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Explore Our Course Categories</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover courses tailored to your interests and career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/20"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <span className="text-xs font-medium text-primary">{category.courseCount} courses</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
