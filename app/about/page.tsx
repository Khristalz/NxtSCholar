export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-primary">NXTSCHOLAR</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Malawian students with practical skills and knowledge to build a better Malawi
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              NXTSCHOLAR is dedicated to transforming Malawi through education by providing accessible,
              locally-relevant, and practical learning experiences that develop the skills needed to drive Malawi's
              economic growth and social development.
            </p>
            <p className="text-muted-foreground">
              We believe every Malawian deserves access to quality education that prepares them for meaningful careers
              and entrepreneurship opportunities. Our platform is designed for Malawi's infrastructure while maintaining
              international educational standards.
            </p>
          </div>
          <div className="bg-primary/5 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Building a Better Malawi</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Skills aligned with Malawi's Vision 2063 development goals</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Focus on agriculture, technology, and entrepreneurship</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Practical training for local job market needs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Affordable education accessible across all regions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Umunthu</h3>
              <p className="text-muted-foreground">
                Education rooted in Malawian values of humanity, respect, and community development.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Skills Excellence</h3>
              <p className="text-muted-foreground">
                Practical skills training that directly contributes to Malawi's economic transformation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Local Innovation</h3>
              <p className="text-muted-foreground">
                Fostering innovation and entrepreneurship to solve Malawi's unique challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-muted/30 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Impact on Malawi</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Malawian Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Skills-Based Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">28</div>
              <div className="text-muted-foreground">Districts Reached</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
