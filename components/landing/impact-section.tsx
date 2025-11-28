const stats = [
  { value: "2,500+", label: "Survivors Supported" },
  { value: "15,000+", label: "Evidence Records" },
  { value: "98%", label: "Court Acceptance Rate" },
  { value: "47", label: "Counties Reached" },
]

export function ImpactSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-16 neon-border relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Making <span className="text-primary neon-text">Impact</span> Across Kenya
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every number represents a survivor who took a step toward justice.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 aspect-[2/1] rounded-2xl overflow-hidden">
              <img
                src="/images/gemini-generated-image-u9b4gku9b4gku9b4.jpeg"
                alt="Woman wearing Stop GBV shirt raising hand in resistance - community empowerment against gender-based violence"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
