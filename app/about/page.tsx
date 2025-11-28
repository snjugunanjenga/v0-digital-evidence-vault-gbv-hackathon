import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Shield, Target, Heart, Users, Award, Globe } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary neon-text">GBV Vault</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We are dedicated to empowering survivors of gender-based violence with secure, private, and legally
              admissible digital evidence preservation tools.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                GBV Digital Evidence Vault was founded with a singular purpose: to provide survivors of gender-based
                violence with the tools they need to document, preserve, and protect evidence of abuse.
              </p>
              <p className="text-muted-foreground mb-4">
                We understand that survivors often face significant barriers when seeking justice. Evidence can be lost,
                tampered with, or dismissed. Our blockchain-backed technology ensures that every piece of evidence is
                timestamped, verified, and legally defensible.
              </p>
              <p className="text-muted-foreground">
                Operating in Kenya and across East Africa, we work closely with legal aid organizations, women's
                shelters, and law enforcement to ensure our platform meets the needs of those we serve.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/gemini-generated-image-g1db6sg1db6sg1db.jpeg"
                alt="Community standing against violence"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your files never leave your device. We only store cryptographic hashes.",
              },
              {
                icon: Heart,
                title: "Survivor-Centered",
                description: "Every feature is designed with survivors' safety and needs in mind.",
              },
              {
                icon: Target,
                title: "Justice-Focused",
                description: "We create legally admissible evidence that holds up in court.",
              },
            ].map((value, i) => (
              <div key={i} className="glass-card neon-border p-8 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Wachira Muchiri Rosalyne", role: "Founder & CEO", icon: Users },
              { name: "Captain", role: "Chief Technology Officer", icon: Globe },
              { name: "Joy Wanjiru", role: "Head of Survivors", icon: Heart },
              { name: "Brian Ouma", role: "Legal Director", icon: Award },
            ].map((member, i) => (
              <div key={i} className="glass-card p-6 rounded-xl text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <member.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
