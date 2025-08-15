import Link from "next/link"
import { BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Technical Skills */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Technical Skills</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses/programming"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/web-development"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/mobile-development"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/cybersecurity"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/database"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Database Management
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/networking"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Networking
                </Link>
              </li>
            </ul>
          </div>

          {/* Agricultural & Business Skills */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Agricultural Skills</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses/modern-farming"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Modern Farming
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/agribusiness"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Agribusiness
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/crop-management"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Crop Management
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/livestock"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Livestock Management
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/irrigation"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Irrigation Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/food-processing"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Food Processing
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Skills */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Business Skills</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses/entrepreneurship"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Entrepreneurship
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/digital-marketing"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/accounting"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Accounting
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/project-management"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Project Management
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/finance"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Finance
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/leadership"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Career Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/certifications"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Professional Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/job-placement"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Job Placement Support
                </Link>
              </li>
              <li>
                <Link
                  href="/career-guidance"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/internships"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Internship Programs
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Apps */}
          <div className="flex flex-col space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="#" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="#" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-border pt-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">NXTSCHOLAR</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learners" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Learners
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-start">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-foreground">NXTSCHOLAR</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 NXTSCHOLAR. All rights reserved. Empowering Malawi through education.
          </p>
        </div>
      </div>
    </footer>
  )
}
