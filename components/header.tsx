"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, User, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/lib/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false)
    router.push(href)
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground">NXTSCHOLAR</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses"
              className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
            >
              Courses
            </Link>
            <Link
              href="/categories"
              className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-105">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-courses" className="cursor-pointer">
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={signOut}>
                      <button type="submit" className="w-full text-left cursor-pointer">
                        Sign Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="hidden sm:inline-flex transition-all duration-200 hover:scale-105">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-all duration-200 hover:scale-105"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <nav className="px-4 py-4 space-y-3">
              <button
                onClick={() => handleNavigation("/courses")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigation("/categories")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                Categories
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                About
              </button>

              {!loading && !user && (
                <div className="pt-3 border-t border-border space-y-2">
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation("/auth/sign-up")}
                    className="block w-full text-left bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2 px-4 rounded-md"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
