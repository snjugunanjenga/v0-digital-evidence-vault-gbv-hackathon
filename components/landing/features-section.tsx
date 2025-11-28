import { Shield, Fingerprint, FolderLock, Search, Clock, FileText } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Complete Privacy",
    description:
      "Your files never upload to any server. All processing happens locally on your device using military-grade encryption.",
  },
  {
    icon: Fingerprint,
    title: "SHA-256 Hashing",
    description:
      "Generate unique cryptographic fingerprints for each piece of evidence, ensuring tamper-proof verification.",
  },
  {
    icon: Clock,
    title: "Blockchain Timestamps",
    description:
      "Record immutable timestamps on Hedera Hashgraph, providing legally admissible proof of when evidence existed.",
  },
  {
    icon: FolderLock,
    title: "Case Management",
    description:
      "Organize evidence by case with custom categories, tags, and descriptions for easy retrieval during legal proceedings.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Quickly find evidence across all your cases with powerful search and filtering by date, type, or category.",
  },
  {
    icon: FileText,
    title: "Legal Reports",
    description: "Generate comprehensive PDF reports with verification certificates ready for court submission.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Built for <span className="text-primary neon-text">Protection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every feature designed with survivor safety and legal admissibility in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
