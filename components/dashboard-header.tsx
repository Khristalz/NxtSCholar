import { Button } from "@/components/ui/button"
import { BookOpen, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
  profile: any
}

export default function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground">NXTSCHOLAR</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
              <Link href="/courses" className="text-foreground hover:text-primary transition-colors">
                Browse Courses
              </Link>
              <Link href="/my-courses" className="text-foreground hover:text-primary transition-colors">
                My Courses
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10 w-64 bg-muted/50 border-border" />
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {profile?.full_name || user.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-xs text-muted-foreground">{profile?.role || "student"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
