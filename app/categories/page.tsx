import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"

async function getCategories() {
  const supabase = createServerClient()

  const { data: categories, error } = await supabase
    .from("categories")
    .select(`
      *,
      courses:courses(count)
    `)
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return categories || []
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  const categoryIcons = {
    Technology: "💻",
    Business: "💼",
    "Creative Arts": "🎨",
    "Health & Medicine": "🏥",
    Education: "📚",
    Agriculture: "🌱",
    Engineering: "⚙️",
    Languages: "🗣️",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Course <span className="text-primary">Categories</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of courses designed to build practical skills for the African job market
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/courses?category=${category.slug}`}
              className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/50"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{categoryIcons[category.name as keyof typeof categoryIcons] || "📖"}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{category.courses?.[0]?.count || 0} courses</span>
                    <span className="text-primary text-sm font-medium group-hover:underline">Explore →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Categories */}
        <div className="bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Most Popular Categories</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">💻</div>
              <div className="font-semibold text-foreground">Technology</div>
              <div className="text-sm text-muted-foreground">150+ courses</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">💼</div>
              <div className="font-semibold text-foreground">Business</div>
              <div className="text-sm text-muted-foreground">120+ courses</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold text-foreground">Creative Arts</div>
              <div className="text-sm text-muted-foreground">80+ courses</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">🏥</div>
              <div className="font-semibold text-foreground">Health</div>
              <div className="text-sm text-muted-foreground">60+ courses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
