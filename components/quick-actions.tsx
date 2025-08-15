import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      label: "Add New Course",
      icon: Plus,
      href: "/admin/courses/new",
      description: "Create a new course",
    },
    {
      label: "Upload Content",
      icon: Upload,
      href: "/admin/upload",
      description: "Upload videos and resources",
    },
    {
      label: "Manage Users",
      icon: Users,
      href: "/admin/users",
      description: "View and manage users",
    },
    {
      label: "View Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      description: "Platform insights",
    },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => {
            const IconComponent = action.icon
            return (
              <Link key={action.label} href={action.href}>
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{action.label}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
