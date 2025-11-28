import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Clock, FileCheck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card neon-border mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Trusted by 2,500+ survivors across Kenya</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <span className="text-foreground">Your Evidence.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
              Your Power.
            </span>
            <br />
            <span className="text-foreground">Your Justice.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Securely preserve digital evidence of gender-based violence with blockchain-verified timestamps. Your files
            never leave your device — only cryptographic proof is recorded.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground animate-glow"
            >
              <Link href="/signup">
                Start Protecting Evidence
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto neon-border bg-transparent hover:bg-primary/10"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 glass-card rounded-xl p-4">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Files Never Leave Your Device</span>
            </div>
            <div className="flex items-center justify-center gap-3 glass-card rounded-xl p-4">
              <FileCheck className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">SHA-256 Cryptographic Proof</span>
            </div>
            <div className="flex items-center justify-center gap-3 glass-card rounded-xl p-4">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Hedera Blockchain Timestamps</span>
            </div>
          </div>
        </div>

        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden neon-border">
            <img
              src="/images/gemini-generated-image-g1db6sg1db6sg1db.jpeg"
              alt="Community standing together against gender-based violence - women holding signs saying Stop Violence and Help Her"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating Stats */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <div className="glass-card rounded-xl px-6 py-3 neon-border">
              <p className="text-2xl font-bold text-primary">15,000+</p>
              <p className="text-xs text-muted-foreground">Evidence Records</p>
            </div>
            <div className="glass-card rounded-xl px-6 py-3 neon-border">
              <p className="text-2xl font-bold text-secondary">98%</p>
              <p className="text-xs text-muted-foreground">Court Acceptance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
