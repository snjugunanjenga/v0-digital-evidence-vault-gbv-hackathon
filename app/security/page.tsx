import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, Server, FileCheck, Globe } from "lucide-react"

const securityFeatures = [
  {
    icon: Eye,
    title: "Client-Side Processing",
    description:
      "Your files are hashed directly in your browser using the Web Crypto API. They never leave your device or touch our servers.",
  },
  {
    icon: Lock,
    title: "SHA-256 Encryption",
    description:
      "We use the same cryptographic standard trusted by banks and governments worldwide to create unique file fingerprints.",
  },
  {
    icon: Globe,
    title: "Hedera Hashgraph",
    description:
      "Hash timestamps are stored on Hedera's enterprise-grade distributed ledger, making them immutable and publicly verifiable.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Our servers run on enterprise-grade cloud infrastructure with encryption at rest and in transit.",
  },
  {
    icon: FileCheck,
    title: "Zero-Knowledge Design",
    description:
      "We store only cryptographic hashes and metadata. Even we cannot see or reconstruct your original files.",
  },
  {
    icon: Shield,
    title: "Regular Audits",
    description: "Our security practices are regularly audited by independent security professionals.",
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Security & Privacy</h1>
            <p className="text-muted-foreground">
              Your safety is our top priority. Learn how we protect your sensitive information.
            </p>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {securityFeatures.map((feature, i) => (
              <Card key={i} className="glass-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <div className="max-w-4xl mx-auto glass-card neon-border rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How Your Data Stays Private</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">You select a file</h3>
                  <p className="text-muted-foreground">Choose any image, video, or document from your device.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Browser hashes locally</h3>
                  <p className="text-muted-foreground">
                    Your browser generates a SHA-256 hash. The file stays on your device.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hash sent to server</h3>
                  <p className="text-muted-foreground">Only the hash (a 64-character string) is sent to our servers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Recorded on Hedera</h3>
                  <p className="text-muted-foreground">
                    The hash is timestamped on the blockchain, creating permanent proof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
