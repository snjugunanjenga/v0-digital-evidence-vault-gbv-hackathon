import { Upload, Hash, Check } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Select Your Evidence",
    description:
      "Choose photos, videos, messages, or documents from your device. Files are processed locally and never uploaded.",
    image: "/images/injured-20and-20vulnerable-20in-20hospital-20bed.png",
  },
  {
    number: "02",
    icon: Hash,
    title: "Generate Cryptographic Proof",
    description:
      "Our system creates a unique SHA-256 hash — a digital fingerprint that proves your evidence hasn&#39;t been altered.",
    image: "/digital-fingerprint-hash-visualization-cybersecuri.jpg",
  },
  {
    number: "03",
    icon: Check,
    title: "Record on Blockchain",
    description:
      "The hash and timestamp are permanently recorded on Hedera Hashgraph, creating irrefutable proof of when your evidence existed.",
    image: "/blockchain-network-visualization-with-timestamp-da.jpg",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How It <span className="text-primary neon-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to secure your evidence with legally admissible blockchain proof.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 neon-border flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Image */}
              <div className="flex-1 max-w-lg">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card neon-border relative">
                  <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
