import Image from "next/image"

export default function PartnerInstitutions() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Learn from 50+ top institutions and companies</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {/* Malawian and International Institutions */}
          <div className="flex items-center justify-center h-16">
            <Image
              src="/university-of-malawi-logo.png"
              alt="University of Malawi"
              width={120}
              height={60}
              className="max-h-12 w-auto grayscale"
            />
          </div>
          <div className="flex items-center justify-center h-16">
            <Image
              src="/must-logo.png"
              alt="MUST"
              width={120}
              height={60}
              className="max-h-12 w-auto grayscale"
            />
          </div>
          <div className="flex items-center justify-center h-16">
            <Image
              src="/google-logo.png"
              alt="Google"
              width={120}
              height={60}
              className="max-h-12 w-auto grayscale"
            />
          </div>
          <div className="flex items-center justify-center h-16">
            <Image
              src="/microsoft-logo.png"
              alt="Microsoft"
              width={120}
              height={60}
              className="max-h-12 w-auto grayscale"
            />
          </div>
          <div className="flex items-center justify-center h-16">
            <Image
              src="/ibm-logo.png"
              alt="IBM"
              width={120}
              height={60}
              className="max-h-12 w-auto grayscale"
            />
          </div>
          <div className="flex items-center justify-center h-16">
            <Image
              src="/world-bank-logo.png"
              alt="World Bank"
              width={120}
              height={60}
              className="max-h-12 w-auto grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
