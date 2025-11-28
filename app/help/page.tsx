import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, Phone, Mail, FileText, Shield, Upload } from "lucide-react"

const faqs = [
  {
    question: "How does evidence hashing work?",
    answer:
      "When you upload a file, our system generates a unique SHA-256 cryptographic hash directly in your browser. This hash is like a digital fingerprint - any change to the file will result in a completely different hash. We then timestamp this hash on the Hedera blockchain, creating an immutable record that the file existed at that specific time.",
  },
  {
    question: "Does my file get uploaded to your servers?",
    answer:
      "No. Your files NEVER leave your device. All hashing is performed locally in your browser using the Web Crypto API. We only store the cryptographic hash and metadata you provide - never the actual file content.",
  },
  {
    question: "Is this evidence admissible in court?",
    answer:
      "The blockchain-verified timestamps and cryptographic hashes can serve as strong supporting evidence. However, admissibility varies by jurisdiction. We recommend consulting with a legal professional in your area. Our system is designed to meet evidence integrity standards.",
  },
  {
    question: "What if I lose my original file?",
    answer:
      "The hash we store cannot be used to reconstruct your original file. You must retain your original evidence files. We recommend storing them in multiple secure locations and using our platform to verify their integrity over time.",
  },
  {
    question: "How do I verify my evidence later?",
    answer:
      "Simply upload the same file again. If the file hasn't been modified, it will generate the same hash, which you can compare against your stored records and the blockchain timestamp.",
  },
  {
    question: "Is my account information safe?",
    answer:
      "Yes. We use industry-standard encryption and security practices. Your account data is protected, and we never share your information with third parties without your consent.",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-muted-foreground">
              Find answers to common questions or get in touch with our support team.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <Card className="glass-card neon-border">
              <CardContent className="p-6 text-center">
                <Upload className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Upload Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to securely upload and hash your evidence.
                </p>
                <Button variant="outline" size="sm" className="neon-border bg-transparent">
                  View Guide
                </Button>
              </CardContent>
            </Card>
            <Card className="glass-card neon-border">
              <CardContent className="p-6 text-center">
                <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Security Info</h3>
                <p className="text-sm text-muted-foreground mb-4">Understand how we protect your privacy.</p>
                <Button variant="outline" size="sm" className="neon-border bg-transparent" asChild>
                  <Link href="/security">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="glass-card neon-border">
              <CardContent className="p-6 text-center">
                <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Legal Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">Access guides for legal proceedings.</p>
                <Button variant="outline" size="sm" className="neon-border bg-transparent" asChild>
                  <Link href="/legal-guide">View Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-lg px-6 border-border">
                  <AccordionTrigger className="text-foreground hover:text-primary">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Options */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Still Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 8am-6pm EAT</p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">+254 800 723 253</p>
                  <p className="text-xs text-muted-foreground">24/7 Helpline</p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">support@gbvvault.org</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
