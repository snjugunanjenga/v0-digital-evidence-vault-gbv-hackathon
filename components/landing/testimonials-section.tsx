"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "When I finally had the courage to report, the police questioned the authenticity of my screenshots. With GBV Vault, I had blockchain-verified proof that my evidence existed months before the investigation began. It changed everything.",
    name: "Anonymous",
    location: "Nairobi County",
    caseType: "Domestic Violence Survivor",
    image: "/silhouette-woman-portrait-hope-dark-background.jpg",
  },
  {
    quote:
      "My ex-husband tried to claim the threatening messages were fabricated. The timestamp verification from Hedera proved otherwise. The judge accepted the evidence without question.",
    name: "Mary W.",
    location: "Mombasa County",
    caseType: "Protection Order Case",
    image: "/silhouette-woman-strength-dark-background.jpg",
  },
  {
    quote:
      "As a legal aid provider, I've seen how crucial digital evidence has become. GBV Vault gives survivors a way to preserve evidence that courts trust. It's been instrumental in several of our cases.",
    name: "Advocate Jane M.",
    location: "Kisumu",
    caseType: "Legal Aid Provider",
    image: "/professional-woman-silhouette-lawyer-dark-backgrou.jpg",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Stories of <span className="text-secondary">Strength</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from survivors and advocates who have used GBV Vault to secure justice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 neon-border relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/50 flex-shrink-0">
                <img
                  src={current.image || "/placeholder.svg"}
                  alt="Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">"{current.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{current.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.location} • {current.caseType}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full neon-border bg-transparent hover:bg-primary/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full neon-border bg-transparent hover:bg-primary/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
