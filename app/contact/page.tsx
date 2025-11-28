import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { EmergencyResources } from "@/components/contact/emergency-resources"
import { PartnerOrganizations } from "@/components/contact/partner-organizations"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In <span className="text-primary neon-text">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're here to help. Reach out for support, partnerships, or any questions about GBV Vault.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details Card */}
              <div className="glass-card rounded-2xl p-6 neon-border">
                <h3 className="font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">support@gbvvault.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">24/7 Helpline</p>
                      <p className="text-foreground">+254 800 723 253</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Office</p>
                      <p className="text-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Support Hours</p>
                      <p className="text-foreground">24/7 Emergency Support</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri 8AM-6PM (General)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="rounded-2xl p-6 bg-destructive/10 border border-destructive/20">
                <h3 className="font-semibold text-destructive mb-2">In Immediate Danger?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you are in immediate danger, please contact emergency services right away.
                </p>
                <div className="space-y-2">
                  <p className="text-foreground font-medium">
                    Kenya Police: <span className="text-destructive">999</span>
                  </p>
                  <p className="text-foreground font-medium">
                    Emergency: <span className="text-destructive">112</span>
                  </p>
                  <p className="text-foreground font-medium">
                    GBV Hotline: <span className="text-primary">1195</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <EmergencyResources />

      {/* Partner Organizations */}
      <PartnerOrganizations />

      <Footer />
    </main>
  )
}
