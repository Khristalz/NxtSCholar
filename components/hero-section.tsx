import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="mb-6">
              <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                NXTSCHOLAR <span className="ml-2 bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold">PLUS</span>
              </div>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
              Achieve your career goals with NXTSCHOLAR Plus
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Subscribe to build job-ready skills from Malawi's leading institutions and international partners.
            </p>

            <p className="mt-4 text-gray-900 font-medium">MK15,000/month, cancel anytime</p>

            <div className="mt-8">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg"
                >
                  Start 7-day Free Trial
                </Button>
              </Link>
              <p className="mt-3 text-sm text-blue-600">or MK120,000/year with 14-day money-back guarantee</p>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/placeholder-obrke.png"
                alt="Malawian student learning"
                width={500}
                height={400}
                className="rounded-lg"
              />
              {/* Blue geometric shapes */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500 rounded-lg transform rotate-12 opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400 rounded-lg transform -rotate-12 opacity-60"></div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-300 rounded-lg transform rotate-45 opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
