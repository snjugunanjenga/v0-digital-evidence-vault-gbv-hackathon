import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 28, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Our Commitment to Privacy</h2>
              <p className="text-muted-foreground">
                At GBV Digital Evidence Vault, we understand that privacy is paramount for survivors of gender-based
                violence. Our entire platform is built on the principle that your sensitive files should never leave
                your device. We employ client-side encryption and hashing to ensure your evidence remains private.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. What We Collect</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Account information (email, name) for authentication</li>
                <li>SHA-256 cryptographic hashes of your evidence files</li>
                <li>Metadata you choose to provide (dates, descriptions, categories)</li>
                <li>Hedera transaction IDs for verification purposes</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong className="text-foreground">We NEVER collect or store your actual files.</strong> All hashing
                occurs in your browser using the Web Crypto API.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Data</h2>
              <p className="text-muted-foreground">
                Your data is used solely to provide our evidence preservation services. We do not sell, rent, or share
                your information with third parties except when required by law or with your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We employ industry-standard security measures including encrypted database connections, secure
                authentication, and regular security audits. Your hash data is stored on Hedera Hashgraph, providing
                immutable, tamper-proof timestamping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, correct, or delete your account data at any time. Note that blockchain
                records are immutable and cannot be deleted, but they contain only cryptographic hashes, not your actual
                files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                For privacy concerns, contact our Data Protection Officer at privacy@gbvvault.org
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
