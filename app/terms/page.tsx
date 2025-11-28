import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 28, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using GBV Digital Evidence Vault, you agree to be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
              <p className="text-muted-foreground">
                GBV Digital Evidence Vault provides digital evidence preservation services for survivors of gender-based
                violence. Our platform enables you to create cryptographic hashes of digital evidence and timestamp them
                on the Hedera Hashgraph blockchain.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You must be at least 18 years old to use this service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must not use the service for any illegal purposes</li>
                <li>You must retain your original evidence files as we only store hashes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitations</h2>
              <p className="text-muted-foreground">
                While we provide tools for evidence preservation, we do not guarantee legal outcomes. We recommend
                consulting with legal professionals regarding the admissibility of evidence in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimer</h2>
              <p className="text-muted-foreground">
                Our services are provided "as is" without warranties of any kind. We are not responsible for any damages
                arising from the use of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi,
                Kenya.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
