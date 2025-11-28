import { Shield, Lock, FileCheck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="p-4 bg-primary/10 rounded-full">
          <Shield className="h-12 w-12 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          Digital Evidence Vault
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Secure, private, and immutable timestamping for digital evidence. Your files never leave your device — only
          cryptographic proof is recorded.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4 text-primary" />
          <span>Client-side encryption</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileCheck className="h-4 w-4 text-primary" />
          <span>SHA-256 integrity</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          <span>Hedera timestamping</span>
        </div>
      </div>
    </section>
  )
}
