import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, CheckCircle, AlertTriangle, BookOpen } from "lucide-react"

export default function LegalGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Legal Guide</h1>
            <p className="text-muted-foreground">
              Understanding how to use digital evidence in legal proceedings in Kenya.
            </p>
          </div>

          {/* Guide Sections */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Understanding Digital Evidence</h2>
                    <p className="text-muted-foreground mb-4">
                      Digital evidence includes any information stored or transmitted in digital form that may be used
                      in court. This can include screenshots, photos, videos, audio recordings, text messages, emails,
                      and social media posts.
                    </p>
                    <p className="text-muted-foreground">
                      In Kenya, the Evidence Act (Cap 80) and the Kenya Information and Communications Act recognize
                      electronic evidence. Our blockchain-based timestamping helps establish the authenticity and
                      integrity of your digital evidence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Principles */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Key Legal Principles</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Authenticity</h3>
                        <p className="text-muted-foreground">
                          Evidence must be proven to be what it claims to be. Our SHA-256 hashing provides a
                          cryptographic guarantee that files haven't been altered.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Chain of Custody</h3>
                        <p className="text-muted-foreground">
                          Documentation of who handled evidence and when. Our blockchain timestamps create an immutable
                          record of when evidence was first documented.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Integrity</h3>
                        <p className="text-muted-foreground">
                          Evidence must remain unchanged from collection to presentation. Hash verification proves your
                          files haven't been modified.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="glass-card neon-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Best Practices</h2>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Document evidence as soon as possible after an incident</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Include detailed metadata (dates, sources, context)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Keep original files in multiple secure backup locations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Never edit or modify evidence files after documenting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Organize evidence by case and category for easy retrieval</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card className="glass-card border-chart-4/30">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-chart-4" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Important Disclaimer</h2>
                    <p className="text-muted-foreground">
                      This guide is for informational purposes only and does not constitute legal advice. Every case is
                      unique, and legal requirements vary. We strongly recommend consulting with a qualified legal
                      professional in Kenya who specializes in gender-based violence cases before proceeding with any
                      legal action.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
