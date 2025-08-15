import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PartnerInstitutions from "@/components/partner-institutions"
import CategoriesSection from "@/components/categories-section"
import FeaturedCourses from "@/components/featured-courses"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PartnerInstitutions />
        <CategoriesSection />
        <FeaturedCourses />
      </main>
      <Footer />
    </div>
  )
}
